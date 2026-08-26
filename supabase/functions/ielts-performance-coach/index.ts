// AI commentary for the "Your IELTS Performance" dashboard.
// Takes the aggregated numbers and returns a short bilingual narrative analysis.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const payload = await req.json();
    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) throw new Error("Missing PERPLEXITY_API_KEY");

    const systemPrompt = [
      "You are an experienced IELTS examiner and coach at HaiEduTech.",
      "Write a concise analysis for one student, in Vietnamese first then English,",
      "separated by a blank line. Around 120 words per language.",
      "Cover: current standing, the single biggest bottleneck, two concrete weekly actions,",
      "and whether the target band is realistic in the estimated timeframe.",
      "Never use the em dash character. Plain text only, no markdown headings.",
    ].join(" ");

    const userPrompt = `Student data (JSON):\n${JSON.stringify(payload).slice(0, 2000)}`;

    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 700,
      }),
    });

    if (!res.ok) throw new Error(`Perplexity error: ${res.status}`);
    const data = await res.json();
    const analysis = (data.choices?.[0]?.message?.content || "")
      .replace(/\u2014/g, "-")
      .replace(/```[a-z]*\n?/g, "")
      .trim();
    if (!analysis) throw new Error("Empty analysis");

    return json({ analysis });
  } catch (err) {
    // The client renders its own rule-based fallback when analysis is null.
    return json({ analysis: null, error: String(err) }, 200);
  }
});
