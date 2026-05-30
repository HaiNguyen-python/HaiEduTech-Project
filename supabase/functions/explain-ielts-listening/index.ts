// explain-ielts-listening — Perplexity-powered explanation for a wrong listening answer.
// Locates the answer in the transcript, explains the keyword cue, and flags the distractor trap.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const repairJson = (s: string) =>
  s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();

const schema = {
  type: "object",
  properties: {
    quote: { type: "string", description: "Exact sentence from the transcript that contains the answer." },
    keyword: { type: "string", description: "The specific keyword or phrase that gave the answer." },
    why: { type: "string", description: "Short explanation in the user's language." },
    trap: { type: "string", description: "What distractor the user may have fallen for (can be empty)." },
    tip: { type: "string", description: "One quick listening-strategy tip for this question type." },
  },
  required: ["quote", "keyword", "why", "trap", "tip"],
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY missing");

    const body = await req.json();
    const {
      transcript,
      question,
      correctAnswer,
      userAnswer,
      questionType,
      language = "vi",
    } = body || {};

    if (!transcript || !question || !correctAnswer) {
      return new Response(JSON.stringify({ error: "missing_fields" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lang = language === "vi" ? "Vietnamese" : "English";

    const systemPrompt = `You are an IELTS Listening coach. Given a transcript and one question the candidate got wrong, find the exact sentence containing the answer, explain why, and warn about typical distractors. Reply ONLY with valid JSON. Keep each field under 35 words. Reply in ${lang} for the "why", "trap", and "tip" fields. "quote" and "keyword" must be in English (original transcript).`;

    const userPrompt = `Transcript:
"""
${String(transcript).slice(0, 4000)}
"""

Question type: ${questionType || "unknown"}
Question: ${question}
Correct answer: ${correctAnswer}
Candidate's answer: ${userAnswer || "(blank)"}

Tasks:
1. "quote": copy the single sentence from the transcript that signals the correct answer.
2. "keyword": the exact word/phrase in that sentence carrying the answer.
3. "why": explain in ${lang} how that sentence proves the answer.
4. "trap": if the candidate's wrong answer matches a distractor in the transcript, point it out in ${lang}; else empty string.
5. "tip": one IELTS Listening strategy tip in ${lang} for this question type.`;

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
        response_format: { type: "json_schema", json_schema: { name: "explain", schema } },
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "rate_limited" }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("Perplexity err", aiRes.status, t);
      throw new Error(`AI error ${aiRes.status}`);
    }
    const data = await aiRes.json();
    const raw = data.choices?.[0]?.message?.content || "{}";
    let parsed: Record<string, unknown>;
    try { parsed = JSON.parse(repairJson(raw)); }
    catch {
      const m = raw.match(/\{[\s\S]*\}/);
      parsed = m ? JSON.parse(m[0]) : {};
    }
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("explain-ielts-listening error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
