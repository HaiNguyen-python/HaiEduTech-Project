// AI-powered business insight generator using Perplexity
// Returns recruitment timeline + expansion opportunity recommendations
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { context } = await req.json();
    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) throw new Error("Missing PERPLEXITY_API_KEY");

    const systemPrompt = `You are a senior business strategist for HaiEduTech, an online language & coding center in Vietnam (English/Chinese/Programming/Finnish). Output STRICT JSON only.`;

    const userPrompt = `Based on this internal data:
${JSON.stringify(context).slice(0, 1500)}

Return JSON with this exact shape:
{
  "expansionOpportunity": {
    "title": "string (e.g. Finnish for Nurses)",
    "rationale": "1-2 sentences why",
    "estimatedRevenue": "string"
  },
  "recruitmentTimeline": {
    "action": "specific campaign action",
    "timeline": "when to launch",
    "expectedRoi": "string"
  },
  "marketTrend": "1-sentence current Vietnam EdTech trend"
}`;

    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: 600,
      }),
    });

    if (!res.ok) throw new Error(`Perplexity error: ${res.status}`);
    const data = await res.json();
    let content = data.choices?.[0]?.message?.content || "{}";
    // Strip markdown code fences if present
    content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    // Extract JSON block
    const match = content.match(/\{[\s\S]*\}/);
    const parsed = match ? JSON.parse(match[0]) : {};

    return new Response(JSON.stringify({ success: true, insight: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[business-insight] error:", e);
    return new Response(
      JSON.stringify({ success: false, error: e instanceof Error ? e.message : String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
