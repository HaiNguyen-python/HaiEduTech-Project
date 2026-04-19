// AI Strategy Optimizer — Perplexity sonar-pro powered
// Modes: forecaster | pricing | market_intel | executive_report | chat
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_BASE = `You are the senior business strategist for HaiEduTech, a Vietnam-based online language & coding center (English IELTS/PTE/TOEIC, Chinese HSK, Programming Python/ML, Finnish YKI). 
- Markets: Vietnam students aged 15-35
- Pricing tier: 30-50% below IDP/MindX
- Peak seasons: Jan-Feb (Tết resolutions), May-Jun (summer), Sep-Oct (study abroad deadlines)
- USP: AI-powered personalization, low cost, native-quality teachers
Output STRICT JSON only. No markdown, no code fences.`;

const PROMPTS: Record<string, (ctx: any) => string> = {
  forecaster: (ctx) => `Based on internal data: ${JSON.stringify(ctx).slice(0, 1200)}
Generate a 3-month enrollment calendar for HaiEduTech. Return JSON:
{
  "months": [
    {
      "month": "string (e.g. April 2026)",
      "marketingStartDate": "YYYY-MM-DD",
      "earlyBirdStartDate": "YYYY-MM-DD",
      "classLaunchDate": "YYYY-MM-DD",
      "targetCourse": "string (e.g. PTE Intensive)",
      "rationale": "1 sentence why this timing",
      "demandScore": number (0-100)
    }
  ]
}`,

  pricing: (ctx) => `Current student counts and capacity: ${JSON.stringify(ctx).slice(0, 1000)}
Suggest dynamic pricing & capacity adjustments. Return JSON:
{
  "recommendations": [
    {
      "course": "string",
      "currentPrice": number (VND),
      "suggestedPrice": number (VND),
      "changePercent": number,
      "action": "increase | decrease | open_class | flash_sale",
      "reason": "1 sentence",
      "urgency": "high | medium | low"
    }
  ]
}`,

  market_intel: () => `Search recent (last 30 days) Vietnam education news and Google Trends for these topics: "du học Phần Lan 2026", "PTE vs IELTS 2026", "HSK học online", "lập trình Python học sinh". 
Return JSON:
{
  "trends": [
    { "keyword": "string", "trendDirection": "rising | stable | declining", "insight": "1-2 sentences with concrete numbers if found", "actionForHaiEduTech": "1 sentence" }
  ],
  "competitors": [
    { "name": "string", "recentNews": "1 sentence", "threat": "high | medium | low" }
  ],
  "uniqueSellingPoints": ["3-5 USPs HaiEduTech can highlight in ads based on current market gaps"]
}`,

  executive_report: (ctx) => `Internal metrics: ${JSON.stringify(ctx).slice(0, 1200)}
Generate a Monthly Business Plan. Return JSON:
{
  "month": "string",
  "targetRevenueVnd": number,
  "starProduct": { "name": "string", "reason": "1 sentence", "expectedRevenue": number },
  "riskAlerts": [{ "area": "string", "severity": "high | medium | low", "action": "string" }],
  "topActions": ["3-5 concrete actions for the month"],
  "marketingFocus": "1-2 sentences"
}`,

  chat: (ctx) => `User question: ${ctx.question}
Context: ${JSON.stringify(ctx.metrics || {}).slice(0, 800)}
Answer as a senior consultant. Return JSON:
{
  "answer": "2-4 sentence direct answer",
  "actionItems": ["2-4 concrete next steps"],
  "confidence": "high | medium | low"
}`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mode, context } = await req.json();
    if (!mode || !PROMPTS[mode]) {
      return new Response(JSON.stringify({ success: false, error: "Invalid mode" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) throw new Error("Missing PERPLEXITY_API_KEY");

    const userPrompt = PROMPTS[mode](context || {});

    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: SYSTEM_BASE },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("[ai-strategy-optimizer] perplexity err", res.status, txt);
      throw new Error(`Perplexity error ${res.status}`);
    }

    const data = await res.json();
    let content = data.choices?.[0]?.message?.content || "{}";
    // Strip markdown fences
    content = content.replace(/```json\n?/gi, "").replace(/```\n?/g, "").trim();
    const match = content.match(/\{[\s\S]*\}/);
    let parsed: any = {};
    try {
      parsed = match ? JSON.parse(match[0]) : {};
    } catch (parseErr) {
      console.error("[ai-strategy-optimizer] JSON parse failed", parseErr, content.slice(0, 200));
      parsed = { rawContent: content };
    }

    const citations = data.citations || [];

    return new Response(
      JSON.stringify({ success: true, mode, result: parsed, citations }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("[ai-strategy-optimizer] error:", e);
    return new Response(
      JSON.stringify({ success: false, error: e instanceof Error ? e.message : String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
