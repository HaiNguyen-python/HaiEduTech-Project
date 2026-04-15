// Content Quality Audit Edge Function — Admin only
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // JWT Authentication + Admin role check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authHeader } } });
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const userId = claimsData.claims.sub;

    // Check teacher/admin role
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, supabaseKey);
    const { data: roleCheck } = await sb.rpc('has_role', { _user_id: userId, _role: 'teacher' });
    const { data: adminCheck } = await sb.rpc('has_role', { _user_id: userId, _role: 'admin' });
    if (!roleCheck && !adminCheck) {
      return new Response(JSON.stringify({ error: 'Forbidden: teacher/admin role required' }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { lessonId, content, action } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    if (action === "check-grammar") {
      const textToCheck = content;
      
      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sonar",
          messages: [
            {
              role: "system",
              content: `You are an expert English grammar checker for IELTS students. Analyze the text and return JSON:
{
  "corrected": "The corrected text",
  "errors": [
    { "original": "wrong phrase", "correction": "correct phrase", "rule": "Grammar rule explanation" }
  ],
  "score": 8.5,
  "tips": ["Tip 1", "Tip 2"]
}
If the text is perfect, return empty errors array and score 9.0. Be encouraging but precise.`,
            },
            { role: "user", content: `Check this IELTS speaking note:\n\n${textToCheck}` },
          ],
        }),
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (status === 402) return new Response(JSON.stringify({ error: "Credits exhausted. Please add funds." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        throw new Error(`Perplexity API error: ${status}`);
      }

      const data = await response.json();
      const raw = data.choices?.[0]?.message?.content || "";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Could not parse grammar check result");
      
      const result = JSON.parse(jsonMatch[0]);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "audit-lesson" && lessonId) {
      const { data: lesson } = await sb
        .from("generated_lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

      if (!lesson) throw new Error("Lesson not found");

      const contentStr = JSON.stringify(lesson.content).substring(0, 3000);

      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sonar",
          messages: [
            {
              role: "system",
              content: `You are a content auditor for an educational platform. Review the lesson content for:
1. Grammar correctness in all languages used
2. Factual accuracy of educational content
3. Appropriate tone for students
4. Quiz answer correctness
5. Missing or incomplete content

Return JSON:
{
  "passed": true/false,
  "quality_score": 0-100,
  "issues": [
    { "type": "grammar|accuracy|tone|quiz|incomplete", "description": "Issue details", "severity": "low|medium|high" }
  ],
  "suggestions": ["Improvement suggestion 1"]
}`,
            },
            {
              role: "user",
              content: `Audit this ${lesson.subject} ${lesson.category} lesson (${lesson.level}):\nTitle: ${lesson.title}\n\nContent:\n${contentStr}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        const status = response.status;
        await response.text();
        if (status === 429) return new Response(JSON.stringify({ error: "Rate limited" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (status === 402) return new Response(JSON.stringify({ error: "Credits exhausted" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        throw new Error(`AI error: ${status}`);
      }

      const auditData = await response.json();
      const auditRaw = auditData.choices?.[0]?.message?.content || "";
      const auditMatch = auditRaw.match(/\{[\s\S]*\}/);
      if (!auditMatch) throw new Error("Could not parse audit result");

      const auditResult = JSON.parse(auditMatch[0]);

      if (!auditResult.passed || auditResult.quality_score < 50) {
        await sb
          .from("generated_lessons")
          .update({ is_published: false })
          .eq("id", lessonId);
      }

      return new Response(JSON.stringify({ lessonId, ...auditResult }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Invalid action. Use 'check-grammar' or 'audit-lesson'.");
  } catch (e) {
    console.error("audit-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
