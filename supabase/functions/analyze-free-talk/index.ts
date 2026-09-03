// Edge function: AI feedback for Speaking Coach Free Talk answers.
// Takes the learner transcript plus locally measured telemetry and returns
// fluency notes, grammar fixes, an upgraded model answer and follow-ups.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MODEL = "google/gemini-2.5-flash";

function parseJson(content: string) {
  let cleaned = content.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found");
  cleaned = cleaned.slice(start, end + 1).replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
  return JSON.parse(cleaned);
}

const strList = (v: unknown, max: number) =>
  Array.isArray(v)
    ? v.filter((x) => typeof x === "string" && x.trim()).slice(0, max).map((s: string) => s.trim().slice(0, 400))
    : [];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const transcript = String(body.transcript ?? "").trim().slice(0, 4000);
    const languageName = String(body.languageName ?? "English").slice(0, 40);
    const topic = String(body.topic ?? "").slice(0, 300);
    const level = String(body.level ?? "B1").slice(0, 4);
    const wpm = Number(body.wpm) || 0;
    const durationSec = Number(body.durationSec) || 0;
    const fillers = strList(body.fillers, 12);

    if (transcript.split(/\s+/).filter(Boolean).length < 6 && transcript.length < 12) {
      return new Response(JSON.stringify({ error: "transcript_too_short" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "missing_api_key" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const prompt = `You are an expert ${languageName} speaking examiner and coach.
Target language: ${languageName}. Learner level: ${level}.
Topic: "${topic}".
Measured telemetry: ${wpm} words per minute, ${Math.round(durationSec)} seconds long, filler words heard: ${fillers.join(", ") || "none"}.

LEARNER TRANSCRIPT (auto speech recognition, punctuation may be missing):
"""${transcript}"""

Return ONLY JSON with this shape:
{
  "score": 0-100 overall speaking score,
  "fluency": "1-2 sentences on pace, hesitation and flow",
  "vocabulary": "1-2 sentences on range, with one stronger word they could have used",
  "grammarFixes": ["up to 3 items in the form 'they said X -> better Y'"],
  "strengths": ["2 specific things they did well, quoting their own words"],
  "modelAnswer": "A 3-4 sentence model answer in ${languageName} at one level above ${level}",
  "followUps": ["2 follow-up questions in ${languageName} grounded in what they actually said"]
}
Rules: never use em dashes, use hyphens. Write the analysis fields in English, but modelAnswer and followUps in ${languageName}. Be specific, never generic.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are a precise, encouraging speaking examiner. Reply with JSON only." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return new Response(JSON.stringify({ error: "ai_error", status: res.status, detail: text.slice(0, 500) }), {
        status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content ?? "";
    let parsed: Record<string, unknown>;
    try {
      parsed = parseJson(content);
    } catch {
      return new Response(JSON.stringify({ error: "parse_error" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const score = Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0)));
    return new Response(JSON.stringify({
      score,
      fluency: typeof parsed.fluency === "string" ? parsed.fluency.slice(0, 600) : "",
      vocabulary: typeof parsed.vocabulary === "string" ? parsed.vocabulary.slice(0, 600) : "",
      grammarFixes: strList(parsed.grammarFixes, 3),
      strengths: strList(parsed.strengths, 2),
      modelAnswer: typeof parsed.modelAnswer === "string" ? parsed.modelAnswer.slice(0, 900) : "",
      followUps: strList(parsed.followUps, 2),
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
