import "../_shared/ai-fallback.ts";
// Edge function: Grade Cambridge Speaking (Starters -> PET) with kid-friendly stars.
// Returns 4 criteria scored 1-5 stars plus warm, actionable feedback for young learners.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MODEL = "google/gemini-2.5-flash";
const TIMEOUT_MS = 14_000;

const LEVEL_GUIDE: Record<string, string> = {
  starters: "Cambridge Starters (Pre-A1). Expect 1-2 very short sentences, present simple, colours, numbers, family, toys, animals. Reward any clear attempt. Full 5 stars for a clear, on-topic answer of 2 short sentences.",
  movers: "Cambridge Movers (A1). Expect 2-4 simple sentences, sequencing words (first, then), present continuous for pictures. 5 stars for a clear story or description with 3+ sentences.",
  flyers: "Cambridge Flyers (A2). Expect 4-6 sentences, reasons with because, past simple for stories, some connectors. 5 stars for a developed answer with reasons.",
  ket: "A2 Key for Schools. Expect short but complete answers with reasons, basic photo description language, 40+ words for the photo turn. 5 stars for accurate, developed answers with linking words.",
  pet: "B1 Preliminary. Expect an extended turn (~1 minute), speculation (it looks as if), opinions with reasons, agreeing/disagreeing in the collaborative task. 5 stars only for fluent, well-organised, largely accurate speech.",
};

const clampStar = (n: number) => Math.max(1, Math.min(5, Math.round(Number(n) || 1)));

function parseJsonResult(content: string) {
  let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const start = cleaned.search(/[\{\[]/);
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found");
  cleaned = cleaned.slice(start, end + 1).replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/[\x00-\x1F\x7F]/g, "");
  return JSON.parse(cleaned);
}

// Heuristic fallback so a child always gets encouraging feedback.
function buildFallback(level: string, transcript: string, duration: number, reason: string) {
  const words = transcript ? transcript.split(/\s+/).filter(Boolean).length : 0;
  const target = level === "pet" ? 70 : level === "ket" ? 45 : level === "flyers" ? 30 : level === "movers" ? 20 : 12;
  const ratio = words / target;
  const base = words < 3 ? 1 : ratio < 0.4 ? 2 : ratio < 0.7 ? 3 : ratio < 1 ? 4 : 5;
  const connectors = /\b(because|and|then|but|first|after that|finally|so)\b/i.test(transcript);
  return {
    stars: base,
    fastScore: true,
    fallbackReason: reason,
    criteria: [
      { label: "Task & Ideas", stars: base, feedback: `You said about ${words} words. Try to give ${target} words so the examiner hears your full idea.` },
      { label: "Grammar", stars: Math.max(1, base - (connectors ? 0 : 1)), feedback: connectors ? "Nice linking words - keep joining your ideas." : "Join two ideas with 'and', 'but' or 'because'." },
      { label: "Vocabulary", stars: base, feedback: "Add two topic words from the task card to sound more exact." },
      { label: "Fluency & Pronunciation", stars: duration >= 10 ? base : Math.max(1, base - 1), feedback: "Speak slowly and clearly, and try not to stop in the middle of a sentence." },
    ],
    tips: [
      "Listen to the model answer, then record again.",
      "Say your answer twice: once slowly, once at normal speed.",
      "Use one word from the Useful language box.",
    ],
    modelAnswer: "",
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const level = typeof body.level === "string" ? body.level : "starters";
    const part = typeof body.part === "string" ? body.part.slice(0, 80) : "Part 1";
    const question = typeof body.question === "string" ? body.question.slice(0, 600) : "";
    const transcript = typeof body.transcript === "string" ? body.transcript.trim().slice(0, 4000) : "";
    const duration = Number(body.duration) || 0;

    if (!LEVEL_GUIDE[level]) {
      return new Response(JSON.stringify({ error: "Invalid level" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const words = transcript ? transcript.split(/\s+/).filter(Boolean).length : 0;
    if (words < 3) {
      return new Response(JSON.stringify(buildFallback(level, transcript, duration, "short_transcript")), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify(buildFallback(level, transcript, duration, "no_key")), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are a friendly Cambridge English Speaking examiner for young learners.
Level standard: ${LEVEL_GUIDE[level]}

Grade ONLY what the child actually said. Score each criterion from 1 to 5 stars against the level above (not against adult standards).
Feedback rules:
- Warm, simple, encouraging English a child or teenager can read.
- Quote one thing they actually said.
- Give one concrete next step per criterion.
- 12-30 words per feedback item.
Also write a short model answer at the correct level (2 sentences for Starters/Movers, 3-4 for Flyers/KET, 5-6 for PET).

TASK
- Level: ${level}
- ${part}
- Examiner prompt: "${question}"
- Duration: ${duration}s | Words: ${words}
- Child's answer:
"""
${transcript}
"""

Return ONLY compact JSON:
{
  "stars": <1-5 overall>,
  "criteria": [
    {"label":"Task & Ideas","stars":<1-5>,"feedback":"..."},
    {"label":"Grammar","stars":<1-5>,"feedback":"..."},
    {"label":"Vocabulary","stars":<1-5>,"feedback":"..."},
    {"label":"Fluency & Pronunciation","stars":<1-5>,"feedback":"..."}
  ],
  "tips": ["...","...","..."],
  "modelAnswer": "..."
}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Lovable-API-Key": LOVABLE_API_KEY,
          "X-Lovable-AIG-SDK": "edge-fetch",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          temperature: 0.2,
          max_tokens: 1000,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: "Score this Cambridge speaking answer. Return JSON only." },
          ],
          response_format: { type: "json_object" },
        }),
      });
    } catch (err) {
      clearTimeout(timeoutId);
      const aborted = (err as { name?: string })?.name === "AbortError";
      return new Response(JSON.stringify(buildFallback(level, transcript, duration, aborted ? "timeout" : "network")), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      console.error("grade-cambridge-speaking upstream", status, (await response.text().catch(() => "")).slice(0, 300));
      if (status === 429 || status === 402) {
        return new Response(JSON.stringify({ error: status === 402 ? "credits_exhausted" : "rate_limited" }), {
          status, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify(buildFallback(level, transcript, duration, `HTTP_${status}`)), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    let parsed;
    try {
      parsed = parseJsonResult(content);
      if (!Array.isArray(parsed?.criteria) || parsed.criteria.length < 3) throw new Error("bad shape");
      parsed.criteria = parsed.criteria.map((c: { label?: string; stars?: number; feedback?: string }) => ({
        label: String(c.label || "Speaking"),
        stars: clampStar(Number(c.stars)),
        feedback: String(c.feedback || ""),
      }));
      const avg = parsed.criteria.reduce((s: number, c: { stars: number }) => s + c.stars, 0) / parsed.criteria.length;
      parsed.stars = clampStar(parsed.stars ?? avg);
      if (Math.abs(parsed.stars - avg) > 1) parsed.stars = clampStar(avg);
      parsed.tips = Array.isArray(parsed.tips) ? parsed.tips.slice(0, 4).map(String) : [];
      parsed.modelAnswer = typeof parsed.modelAnswer === "string" ? parsed.modelAnswer : "";
    } catch {
      return new Response(JSON.stringify(buildFallback(level, transcript, duration, "parse_error")), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("grade-cambridge-speaking error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
