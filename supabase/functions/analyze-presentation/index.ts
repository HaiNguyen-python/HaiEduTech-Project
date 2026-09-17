import "../_shared/ai-fallback.ts";
// Edge function: AI coaching for the Presentation & Public Speaking Studio.
// Takes a transcript plus locally measured telemetry and returns strengths,
// high-impact fixes and two tough audience counter-questions.
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
    const transcript = String(body.transcript ?? "").trim().slice(0, 6000);
    const scenario = String(body.scenario ?? "presentation").slice(0, 160);
    const audience = String(body.audience ?? "a professional audience").slice(0, 160);
    const mode = body.mode === "impromptu" ? "impromptu Q&A defence" : "scripted delivery";
    const telemetry = {
      wpm: Number(body.wpm) || 0,
      durationSec: Number(body.durationSec) || 0,
      fillers: Number(body.fillerTotal) || 0,
      eyeContact: Number(body.eyeContact) || 0,
      signposts: strList(body.signposts, 12),
    };
    const bl = body.bodyLanguage && typeof body.bodyLanguage === "object" ? body.bodyLanguage : null;
    const bodyLine = bl
      ? `Body language (measured locally from webcam): confidence ${Number(bl.confidence) || 0}/100, naturalness ${Number(bl.naturalness) || 0}/100, framing ${Number(bl.framing) || 0}/100, movement ${Number(bl.movement) || 0}/100, expression ${Number(bl.expression) || 0}/100.`
      : "Body language: not measured (camera off).";
    const structureLine = `Structure covered: ${strList(body.structureDone, 8).join(", ") || "none"}. Structure missing: ${strList(body.structureMissing, 8).join(", ") || "none"}.`;


    if (transcript.split(/\s+/).filter(Boolean).length < 12) {
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

    const prompt = `You are an elite public speaking coach (IELTS 9.0 examiner + startup pitch coach).
Scenario: ${scenario}. Audience: ${audience}. Mode: ${mode}.
Measured telemetry: ${telemetry.wpm} WPM, ${Math.round(telemetry.durationSec)}s long, ${telemetry.fillers} filler words, ${telemetry.eyeContact}% camera eye contact, signposts used: ${telemetry.signposts.join(", ") || "none"}.
${bodyLine}
${structureLine}


TRANSCRIPT:
"""${transcript}"""

Return ONLY JSON:
{
  "strengths": ["3 specific things the speaker did great, each quoting their own words"],
  "fixes": ["2 high-impact fixes, each concrete and rewritten for them, e.g. replace 'very important' with 'pivotal'"],
  "qaQuestions": ["2 tough audience counter-questions grounded strictly in what they actually said"],
  "modelUpgrade": "One rewritten sentence from their transcript at Band 8.0+ / executive register",
  "summary": "2 sentences of honest overall verdict"
}
Rules: no em dashes, use hyphens. Be specific, never generic. English only.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are a precise, encouraging public speaking coach. Reply with JSON only." },
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

    return new Response(JSON.stringify({
      strengths: strList(parsed.strengths, 3),
      fixes: strList(parsed.fixes, 2),
      qaQuestions: strList(parsed.qaQuestions, 2),
      modelUpgrade: typeof parsed.modelUpgrade === "string" ? parsed.modelUpgrade.slice(0, 500) : "",
      summary: typeof parsed.summary === "string" ? parsed.summary.slice(0, 700) : "",
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
