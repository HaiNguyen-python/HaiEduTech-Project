import "../_shared/ai-fallback.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { exercise, language = "python", referenceCode = "" } = await req.json();
    if (!exercise || typeof exercise !== "string" || exercise.length > 4000) {
      return new Response(JSON.stringify({ error: "Invalid exercise" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not set");

    const systemPrompt = `You are Mr. Hai, a programming tutor. For a coding exercise, return STRICT JSON (no markdown fences) shaped:
{
  "approach": string,          // 1-2 short sentences explaining the overall approach in plain English
  "hints": [string, string, string], // 3 progressive hints: hint 1 is a gentle nudge, hint 2 names the concept/structure, hint 3 is near-spoiler with key steps. Each <=25 words. English only.
  "sample": string             // a complete, runnable ${language} solution that EXACTLY satisfies the exercise. Plain code only, no markdown fences, no commentary, include short inline comments.
}
Rules: sample must solve the EXACT task described, not the reference code. Keep code idiomatic, minimal, and correct. Use 4-space indent for python.`;

    const userPrompt = `Language: ${language}
Exercise:
"""
${exercise}
"""
${referenceCode ? `Reference code from lesson (for style only, may not solve the exercise):\n\`\`\`${language}\n${referenceCode.slice(0, 2000)}\n\`\`\`` : ""}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 1200,
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit. Try again shortly." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    let approach = "";
    let hints: string[] = [];
    let sample = "";
    try {
      const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
      const parsed = JSON.parse(cleaned);
      if (typeof parsed.approach === "string") approach = parsed.approach;
      if (Array.isArray(parsed.hints)) hints = parsed.hints.slice(0, 3).map((h: any) => String(h));
      if (typeof parsed.sample === "string") {
        sample = parsed.sample.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "").trim();
      }
    } catch (e) {
      console.error("exercise-helper parse:", e, raw);
    }
    return new Response(JSON.stringify({ approach, hints, sample }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("exercise-helper error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
