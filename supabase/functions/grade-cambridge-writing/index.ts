import "../_shared/ai-fallback.ts";
// Edge function: Grade Cambridge writing tasks (Starters -> PET).
// Scores the four official criteria 1-5 and returns bilingual feedback plus fixes.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { premiumDenied } from "../_shared/premium.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MODEL = "google/gemini-2.5-flash";
const TIMEOUT_MS = 18_000;

const LEVEL_GUIDE: Record<string, string> = {
  starters: "Cambridge Starters (Pre-A1). Three very short present-simple sentences are a full answer. Reward any clear, on-topic attempt; ignore spelling of long words.",
  movers: "Cambridge Movers (A1). Expect 3-4 simple sentences, basic past simple or present continuous, and simple linkers (and, then, because).",
  flyers: "Cambridge Flyers (A2). Expect at least 3 developed sentences, a clear order of events, reasons with because, and some variety of tense.",
  ket: "A2 Key for Schools Writing Part 6/7. Expect 25-35 words, all three content points covered, a correct greeting and sign-off. Missing a content point costs Content marks.",
  pet: "B1 Preliminary Writing. Expect about 100 words, all bullet points covered, clear paragraphing, linking words, a consistent register and a range of structures.",
};

const clamp = (n: number) => Math.max(1, Math.min(5, Math.round(Number(n) || 1)));

function parseJsonResult(content: string) {
  let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const start = cleaned.search(/[{[]/);
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found");
  cleaned = cleaned
    .slice(start, end + 1)
    .replace(/,\s*}/g, "}")
    .replace(/,\s*]/g, "]")
    .replace(/[\x00-\x1F\x7F]/g, "");
  return JSON.parse(cleaned);
}

// Deterministic fallback so the student always gets usable feedback.
function buildFallback(level: string, text: string, minWords: number, maxWords: number, reason: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const ratio = minWords > 0 ? words / minWords : 1;
  const base = words < 5 ? 1 : ratio < 0.5 ? 2 : ratio < 0.85 ? 3 : words > maxWords * 1.6 ? 3 : 4;
  const linkers = /\b(because|and|but|then|so|however|first|after that|finally)\b/i.test(text);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 2).length;
  return {
    score: base,
    fastScore: true,
    fallbackReason: reason,
    wordCount: words,
    criteria: [
      { label: "Content", score: base, feedback: `You wrote ${words} words. The task asks for ${minWords}-${maxWords}, so check that every bullet point is answered.`, feedbackVi: `Bài viết có ${words} từ, yêu cầu ${minWords}-${maxWords} từ. Hãy kiểm tra đã trả lời hết các gạch đầu dòng chưa.` },
      { label: "Communicative Achievement", score: base, feedback: "Keep the tone right for the reader: a friendly greeting and a short sign-off for messages.", feedbackVi: "Giữ đúng giọng điệu với người đọc: có lời chào và câu kết ngắn khi viết tin nhắn hoặc email." },
      { label: "Organisation", score: linkers ? base : Math.max(1, base - 1), feedback: linkers ? "Good use of linking words to join your ideas." : "Join your ideas with and, but, because, then or however.", feedbackVi: linkers ? "Đã dùng tốt từ nối để liên kết các ý." : "Hãy nối các ý bằng and, but, because, then hoặc however." },
      { label: "Language", score: sentences >= 3 ? base : Math.max(1, base - 1), feedback: `You wrote ${sentences} sentences. Vary the length and check verb endings.`, feedbackVi: `Bài có ${sentences} câu. Hãy thay đổi độ dài câu và kiểm tra đuôi động từ.` },
    ],
    corrections: [],
    tips: ["Read the bullet points again and tick each one in your answer.", "Count your words before you finish.", "Read your answer out loud to hear missing words."],
    tipsVi: ["Đọc lại các gạch đầu dòng và đối chiếu với bài của em.", "Đếm số từ trước khi kết thúc.", "Đọc to bài viết để phát hiện từ còn thiếu."],
    improvedVersion: "",
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  { const denied = await premiumDenied(req, corsHeaders); if (denied) return denied; }

  try {
    const body = await req.json().catch(() => ({}));
    const level = typeof body.level === "string" ? body.level : "starters";
    const kind = typeof body.kind === "string" ? body.kind.slice(0, 40) : "writing";
    const prompt = typeof body.prompt === "string" ? body.prompt.slice(0, 900) : "";
    const bullets: string[] = Array.isArray(body.bullets) ? body.bullets.slice(0, 6).map(String) : [];
    const text = typeof body.text === "string" ? body.text.trim().slice(0, 4000) : "";
    const minWords = Number(body.minWords) || 20;
    const maxWords = Number(body.maxWords) || 120;

    if (!LEVEL_GUIDE[level]) {
      return new Response(JSON.stringify({ error: "Invalid level" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    if (words < 4) {
      return new Response(JSON.stringify(buildFallback(level, text, minWords, maxWords, "too_short")), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify(buildFallback(level, text, minWords, maxWords, "no_key")), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are an experienced Cambridge English Writing examiner for young learners and teenagers.
Level standard: ${LEVEL_GUIDE[level]}

Mark ONLY what the student wrote, against the level above, using the official criteria: Content, Communicative Achievement, Organisation, Language. Score each from 1 to 5.
Rules:
- Never use an em dash or en dash; use a normal hyphen.
- English feedback must be simple enough for the level; the Vietnamese version must say the same thing, not a translation of examiner jargon.
- 15-35 words per feedback item, and always name something the student actually wrote.
- corrections: up to 4 real mistakes from the text, each with the student's exact wording and the fix.
- improvedVersion: rewrite the student's own answer at the top of this level, keeping their ideas, within ${minWords}-${maxWords} words.

TASK
- Level: ${level} | Type: ${kind}
- Prompt: "${prompt}"
- Content points: ${bullets.join(" | ")}
- Target length: ${minWords}-${maxWords} words. Student wrote ${words} words.

STUDENT ANSWER
"""
${text}
"""

Return ONLY compact JSON:
{
  "score": <1-5 overall>,
  "criteria": [
    {"label":"Content","score":<1-5>,"feedback":"...","feedbackVi":"..."},
    {"label":"Communicative Achievement","score":<1-5>,"feedback":"...","feedbackVi":"..."},
    {"label":"Organisation","score":<1-5>,"feedback":"...","feedbackVi":"..."},
    {"label":"Language","score":<1-5>,"feedback":"...","feedbackVi":"..."}
  ],
  "corrections": [{"original":"...","fixed":"...","why":"...","whyVi":"..."}],
  "tips": ["...","...","..."],
  "tipsVi": ["...","...","..."],
  "improvedVersion": "..."
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
          max_tokens: 1500,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: "Mark this Cambridge writing answer. Return JSON only." },
          ],
          response_format: { type: "json_object" },
        }),
      });
    } catch (err) {
      clearTimeout(timeoutId);
      const aborted = (err as { name?: string })?.name === "AbortError";
      return new Response(JSON.stringify(buildFallback(level, text, minWords, maxWords, aborted ? "timeout" : "network")), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      console.error("grade-cambridge-writing upstream", status, (await response.text().catch(() => "")).slice(0, 300));
      if (status === 429 || status === 402) {
        return new Response(JSON.stringify({ error: status === 402 ? "credits_exhausted" : "rate_limited" }), {
          status, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify(buildFallback(level, text, minWords, maxWords, `HTTP_${status}`)), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    let parsed;
    try {
      parsed = parseJsonResult(content);
      if (!Array.isArray(parsed?.criteria) || parsed.criteria.length < 3) throw new Error("bad shape");
      const strip = (s: unknown) => String(s ?? "").replace(/[—–]/g, "-");
      parsed.criteria = parsed.criteria.map((c: Record<string, unknown>) => ({
        label: strip(c.label || "Writing"),
        score: clamp(Number(c.score)),
        feedback: strip(c.feedback),
        feedbackVi: strip(c.feedbackVi),
      }));
      const avg = parsed.criteria.reduce((s: number, c: { score: number }) => s + c.score, 0) / parsed.criteria.length;
      parsed.score = clamp(parsed.score ?? avg);
      if (Math.abs(parsed.score - avg) > 1) parsed.score = clamp(avg);
      parsed.corrections = Array.isArray(parsed.corrections)
        ? parsed.corrections.slice(0, 4).map((c: Record<string, unknown>) => ({
            original: strip(c.original), fixed: strip(c.fixed), why: strip(c.why), whyVi: strip(c.whyVi),
          }))
        : [];
      parsed.tips = Array.isArray(parsed.tips) ? parsed.tips.slice(0, 4).map(strip) : [];
      parsed.tipsVi = Array.isArray(parsed.tipsVi) ? parsed.tipsVi.slice(0, 4).map(strip) : [];
      parsed.improvedVersion = strip(parsed.improvedVersion);
      parsed.wordCount = words;
    } catch {
      return new Response(JSON.stringify(buildFallback(level, text, minWords, maxWords, "parse_error")), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("grade-cambridge-writing error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
