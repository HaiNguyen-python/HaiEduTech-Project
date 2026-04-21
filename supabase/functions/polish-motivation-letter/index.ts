/**
 * AI polish suggestions for a Motivation Letter draft.
 * Returns: structured suggestions (overall feedback, structure, tone, vocabulary, action items, sample improved opening).
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { content, target_school, target_program, title } = await req.json();
    if (!content || typeof content !== "string" || content.trim().length < 50) {
      return new Response(JSON.stringify({ error: "Draft must be at least 50 characters." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are an expert admissions consultant reviewing a Motivation Letter draft for graduate study abroad.
Provide constructive, specific feedback. Be honest about weaknesses. Suggest concrete improvements.
Focus areas: hook strength, narrative coherence, school/program-specific connection, evidence of fit, tone, vocabulary upgrades, common mistakes.
Return ONLY through the function call.`;

    const userPrompt = `Draft title: ${title || "Untitled"}
Target school: ${target_school || "Not specified"}
Target program: ${target_program || "Not specified"}

DRAFT:
${content.slice(0, 6000)}`;

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
            name: "report_polish",
            description: "Return polish suggestions for the motivation letter.",
            parameters: {
              type: "object",
              properties: {
                overall_score: { type: "integer", minimum: 0, maximum: 100, description: "Quality score 0-100" },
                strengths: { type: "array", items: { type: "string" } },
                weaknesses: { type: "array", items: { type: "string" } },
                structure_feedback: { type: "string" },
                tone_feedback: { type: "string" },
                vocabulary_upgrades: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" } }, required: ["from", "to"], additionalProperties: false } },
                action_items: { type: "array", items: { type: "string" }, description: "5-7 prioritized rewrites" },
                improved_opening: { type: "string", description: "A stronger sample opening paragraph (2-3 sentences)" },
              },
              required: ["overall_score", "strengths", "weaknesses", "structure_feedback", "tone_feedback", "vocabulary_upgrades", "action_items", "improved_opening"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "report_polish" } },
      }),
    });

    if (!aiRes.ok) {
      if (aiRes.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (aiRes.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await aiRes.text();
      console.error("AI error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "AI polish failed" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const aiData = await aiRes.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call");
    const suggestions = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ suggestions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("polish-motivation-letter error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
