import "../_shared/ai-fallback.ts";
/**
 * Startup Pitch Critic - simulates a tough VC investor reviewing a founder's pitch deck.
 * Returns per-slide feedback and 5-criterion scores (Problem, Solution, Market, Traction, Team).
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PitchInput {
  startupName: string;
  oneLiner: string;
  problem: string;
  solution: string;
  market: string;
  product: string;
  traction: string;
  businessModel: string;
  competition: string;
  team: string;
  ask: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const body = (await req.json()) as PitchInput;
    if (!body || typeof body.problem !== "string") {
      return new Response(JSON.stringify({ error: "Invalid pitch payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are a skeptical Series A investor (mix of Y Combinator, 500 Global, Do Ventures partner).
You are reviewing a Vietnamese founder's pitch. Be direct, specific, and actionable - do not be flattering.
Score 5 dimensions 0-100:
- problemScore: is the problem real, painful, and quantified?
- solutionScore: is the solution 10x better, feasible, and defensible?
- marketScore: TAM/SAM/SOM realistic, bottom-up?
- tractionScore: metrics (revenue, retention, growth) credible for stage?
- teamScore: founder-market fit, complementary team, execution ability?
Overall = weighted avg (problem 20%, solution 20%, market 20%, traction 25%, team 15%).
Return a JSON object exactly matching this shape (no markdown, no code fences):
{
 "overallScore": number,
 "verdict": "Pass" | "Maybe" | "Would invest",
 "scores": { "problem": n, "solution": n, "market": n, "traction": n, "team": n },
 "strengths": string[],
 "concerns": string[],
 "toughQuestions": string[],
 "nextSteps": string[]
}
Keep each array 3-5 items, each item under 25 words. Reply in the same language the founder used (Vietnamese or English).`;

    const userPrompt = `Pitch Deck:
Startup: ${body.startupName}
One-liner: ${body.oneLiner}
Problem: ${body.problem}
Solution: ${body.solution}
Market: ${body.market}
Product: ${body.product}
Traction: ${body.traction}
Business Model: ${body.businessModel}
Competition: ${body.competition}
Team: ${body.team}
Ask: ${body.ask}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 1200,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a minute." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact the admin." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const errText = await aiRes.text();
      throw new Error(`AI gateway error: ${aiRes.status} ${errText}`);
    }

    const aiData = await aiRes.json();
    const content = aiData?.choices?.[0]?.message?.content ?? "{}";
    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : { error: "Malformed AI response" };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("startup-pitch-critic error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message ?? "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
