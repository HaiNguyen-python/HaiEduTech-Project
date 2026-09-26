import "../_shared/ai-fallback.ts";
// Grade a Vietnamese -> English IELTS Writing translation.
// Uses Lovable AI Gateway. Returns strict JSON with 4 sub-scores + bilingual feedback.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { premiumDenied } from "../_shared/premium.ts";

interface ReqBody {
  vi: string;
  model: string;
  userAnswer: string;
  task: 1 | 2;
  category?: string;
  keywords?: string[];
}

function tryParseJson(raw: string) {
  let cleaned = (raw || "").trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const m = cleaned.match(/\{[\s\S]*\}/);
  if (m) cleaned = m[0];
  try {
    return JSON.parse(cleaned);
  } catch {
    try {
      return JSON.parse(cleaned.replace(/,(\s*[}\]])/g, "$1"));
    } catch {
      return null;
    }
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  { const denied = await premiumDenied(req, corsHeaders); if (denied) return denied; }

  try {
    const body = (await req.json()) as ReqBody;
    const vi = typeof body.vi === "string" ? body.vi.trim() : "";
    const model = typeof body.model === "string" ? body.model.trim() : "";
    const userAnswer = typeof body.userAnswer === "string" ? body.userAnswer.trim() : "";
    const task = body.task === 1 ? 1 : 2;

    if (!vi || !model || userAnswer.length < 3) {
      return new Response(JSON.stringify({ error: "vi, model and userAnswer are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (userAnswer.length > 600) {
      return new Response(JSON.stringify({ error: "answer_too_long" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!KEY) {
      return new Response(JSON.stringify({ error: "ai_not_configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const system =
      "You are a strict but encouraging IELTS Writing examiner helping Vietnamese learners translate " +
      "Vietnamese sentences into academic English suitable for IELTS Writing Task " + task + ". " +
      "Score four criteria out of 10: accuracy (does the English convey the exact Vietnamese meaning?), " +
      "grammar, vocabulary (word choice / collocation), and style (formal academic IELTS register). " +
      "Feedback bullets must be bilingual: each bullet is an object {vi, en}. Be concrete: quote the learner's " +
      "words and show the fix. Never use the em dash character; use a hyphen instead. " +
      "IMPORTANT: the reference translation is only one correct option. If the learner uses a different but " +
      "accurate and natural paraphrase, do NOT lower accuracy, and do NOT require the target structures - " +
      "mention them at most as an optional upgrade. Only mark down real errors of meaning, grammar, " +
      "collocation or register. " +
      "Reply with STRICT JSON only, no markdown.";

    const user =
      `Vietnamese source: ${vi}\n` +
      `Reference model translation (one acceptable option, not the only one): ${model}\n` +
      (body.keywords?.length ? `Optional target structures: ${body.keywords.join(", ")}\n` : "") +
      `Learner translation: ${userAnswer}\n\n` +
      `Return JSON: {"score": number 0-10, "accuracy": 0-10, "grammar": 0-10, "vocabulary": 0-10, "style": 0-10, ` +
      `"verdict": "excellent"|"good"|"needs_work", "feedback": [{"vi":"...","en":"..."}] (2-4 items), ` +
      `"corrected": "the learner sentence corrected, keeping their own wording where possible", ` +
      `"upgraded": "a Band 7.5+ version of the same sentence"}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        temperature: 0.2,
        max_tokens: 3000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (resp.status === 429 || resp.status === 402) {
      return new Response(JSON.stringify({ error: resp.status === 429 ? "rate_limited" : "payment_required" }), {
        status: resp.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const txt = await resp.text();
      console.error("AI gateway error", resp.status, txt);
      return new Response(JSON.stringify({ error: "ai_gateway_error" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const raw = data?.choices?.[0]?.message?.content ?? "";
    const parsed = tryParseJson(raw);
    if (!parsed) {
      return new Response(JSON.stringify({ error: "parse_failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const clamp = (n: unknown) => {
      const v = Number(n);
      if (!Number.isFinite(v)) return 6;
      return Math.max(0, Math.min(10, Math.round(v * 10) / 10));
    };
    const feedback = Array.isArray(parsed.feedback)
      ? parsed.feedback
          .filter((f: any) => f && (f.vi || f.en))
          .slice(0, 5)
          .map((f: any) => ({ vi: String(f.vi ?? f.en ?? ""), en: String(f.en ?? f.vi ?? "") }))
      : [];

    return new Response(
      JSON.stringify({
        score: clamp(parsed.score),
        accuracy: clamp(parsed.accuracy),
        grammar: clamp(parsed.grammar),
        vocabulary: clamp(parsed.vocabulary),
        style: clamp(parsed.style),
        verdict: ["excellent", "good", "needs_work"].includes(parsed.verdict) ? parsed.verdict : "good",
        feedback,
        corrected: String(parsed.corrected ?? userAnswer),
        upgraded: String(parsed.upgraded ?? model),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("grade-translation error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
