/**
 * AI polish suggestions for a Motivation Letter draft (Perplexity sonar-pro).
 * Returns structured suggestions via JSON schema response_format.
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const schema = {
  type: "object",
  properties: {
    overall_score: { type: "integer", minimum: 0, maximum: 100 },
    strengths: { type: "array", items: { type: "string" } },
    weaknesses: { type: "array", items: { type: "string" } },
    structure_feedback: { type: "string" },
    tone_feedback: { type: "string" },
    vocabulary_upgrades: {
      type: "array",
      items: {
        type: "object",
        properties: { from: { type: "string" }, to: { type: "string" } },
        required: ["from", "to"],
      },
    },
    action_items: { type: "array", items: { type: "string" } },
    improved_opening: { type: "string" },
  },
  required: ["overall_score", "strengths", "weaknesses", "structure_feedback", "tone_feedback", "vocabulary_upgrades", "action_items", "improved_opening"],
};

function repairJson(s: string): string {
  return s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { content, target_school, target_program, title } = await req.json();
    if (!content || typeof content !== "string" || content.trim().length < 50) {
      return new Response(JSON.stringify({ error: "Draft must be at least 50 characters." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY not configured");

    const systemPrompt = `You are an expert admissions consultant reviewing a Motivation Letter draft for graduate study abroad. Provide constructive, specific feedback. Be honest about weaknesses. Suggest concrete improvements. Return ONLY valid JSON matching the requested schema — no markdown fences, no commentary.`;

    const userPrompt = `Draft title: ${title || "Untitled"}
Target school: ${target_school || "Not specified"}
Target program: ${target_program || "Not specified"}

DRAFT:
${content.slice(0, 6000)}

Return JSON with keys: overall_score (0-100), strengths (array), weaknesses (array), structure_feedback (string), tone_feedback (string), vocabulary_upgrades (array of {from, to}), action_items (array of 5-7 prioritized rewrites), improved_opening (2-3 sentences).`;

    const aiRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        response_format: { type: "json_schema", json_schema: { name: "polish_report", schema } },
      }),
    });

    if (!aiRes.ok) {
      if (aiRes.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await aiRes.text();
      console.error("AI error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "AI polish failed" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const aiData = await aiRes.json();
    const raw = aiData.choices?.[0]?.message?.content || "{}";
    let suggestions;
    try {
      suggestions = JSON.parse(repairJson(raw));
    } catch {
      // Try to find JSON block
      const m = raw.match(/\{[\s\S]*\}/);
      suggestions = m ? JSON.parse(m[0]) : { error: "parse_failed" };
    }

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
