/**
 * Assess study-abroad profile strength using Lovable AI Gateway.
 * Reads: student_profiles, student_documents, motivation_letter_drafts.
 * Returns: 0-100 overall score, 5 sub-scores, strengths/weaknesses/recommendations, summary.
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Gather context
    const [{ data: profile }, { data: docs }, { data: drafts }] = await Promise.all([
      supabase.from("student_profiles").select("*").eq("user_id", user.id).maybeSingle(),
      supabase.from("student_documents").select("category, display_name, status, expiry_date").eq("user_id", user.id),
      supabase.from("motivation_letter_drafts").select("title, target_school, target_program, content, word_count").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(3),
    ]);

    const context = {
      profile: profile || {},
      documents: docs || [],
      letterDrafts: (drafts || []).map((d: any) => ({
        title: d.title,
        target_school: d.target_school,
        target_program: d.target_program,
        word_count: d.word_count,
        excerpt: (d.content || "").slice(0, 1500),
      })),
    };

    const systemPrompt = `You are an expert study-abroad advisor evaluating a student's application profile strength.
Score each dimension 0-100. Be honest, specific, and actionable.
Dimensions:
- Academic (GPA, field, level alignment)
- Language (IELTS/TOEFL/SAT scores)
- Experience (work years, activities)
- Documents (transcripts, identity docs, language certs, application drafts uploaded)
- Motivation (presence + quality of motivation letter drafts)
Overall = weighted average (Academic 25%, Language 20%, Experience 15%, Documents 20%, Motivation 20%).
Return ONLY through the function call. Be concise.`;

    const userPrompt = `Evaluate this student profile for study-abroad applications:\n\n${JSON.stringify(context, null, 2)}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "report_assessment",
            description: "Return profile strength assessment.",
            parameters: {
              type: "object",
              properties: {
                overall_score: { type: "integer", minimum: 0, maximum: 100 },
                academic_score: { type: "integer", minimum: 0, maximum: 100 },
                language_score: { type: "integer", minimum: 0, maximum: 100 },
                experience_score: { type: "integer", minimum: 0, maximum: 100 },
                documents_score: { type: "integer", minimum: 0, maximum: 100 },
                motivation_score: { type: "integer", minimum: 0, maximum: 100 },
                strengths: { type: "array", items: { type: "string" }, description: "3-5 specific strengths" },
                weaknesses: { type: "array", items: { type: "string" }, description: "3-5 specific gaps" },
                recommendations: { type: "array", items: { type: "string" }, description: "5-7 actionable next steps, prioritized" },
                summary: { type: "string", description: "2-3 sentence overall summary" },
              },
              required: ["overall_score", "academic_score", "language_score", "experience_score", "documents_score", "motivation_score", "strengths", "weaknesses", "recommendations", "summary"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "report_assessment" } },
      }),
    });

    if (!aiRes.ok) {
      if (aiRes.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (aiRes.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await aiRes.text();
      console.error("AI error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "AI assessment failed" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const aiData = await aiRes.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");
    const result = JSON.parse(toolCall.function.arguments);

    // Save to DB
    const { data: saved } = await supabase.from("profile_strength_assessments").insert({
      user_id: user.id,
      overall_score: result.overall_score,
      academic_score: result.academic_score,
      language_score: result.language_score,
      experience_score: result.experience_score,
      documents_score: result.documents_score,
      motivation_score: result.motivation_score,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      recommendations: result.recommendations,
      summary: result.summary,
      context_snapshot: context,
    }).select().single();

    return new Response(JSON.stringify({ assessment: saved || result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("assess-profile-strength error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
