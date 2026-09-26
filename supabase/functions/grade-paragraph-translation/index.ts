import "../_shared/ai-fallback.ts";
// Grade a Vietnamese -> English IELTS Writing PARAGRAPH translation.
// Uses Lovable AI Gateway. Returns strict JSON with 5 sub-scores + bilingual, per-sentence feedback.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { premiumDenied } from "../_shared/premium.ts";

interface ReqBody {
  vi: string;
  model: string;
  userAnswer: string;
  task: 1 | 2;
  category?: string;
  structures?: string[];
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

    if (!vi || !model || userAnswer.length < 20) {
      return new Response(JSON.stringify({ error: "vi, model and a longer userAnswer are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (userAnswer.length > 2500) {
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
      "You are a strict but encouraging IELTS Writing examiner helping Vietnamese learners translate a whole " +
      "Vietnamese PARAGRAPH into academic English suitable for IELTS Writing Task " + task + ". " +
      "Score five criteria out of 10: accuracy (does the English convey the exact Vietnamese meaning of every " +
      "sentence?), grammar, vocabulary (word choice / collocation), cohesion (linking between the sentences, " +
      "reference words, paragraph flow), and style (formal academic IELTS register). " +
      "Also give per-sentence notes: for each Vietnamese sentence, say briefly whether the learner rendered it " +
      "well and what to fix. Feedback bullets and sentence notes must be bilingual objects {vi, en}. " +
      "Be concrete: quote the learner's words and show the fix. Never use the em dash character; use a hyphen. " +
      "IMPORTANT: the reference translation is only one correct option. A different but accurate and natural " +
      "paraphrase must NOT lower accuracy, and the target structures are optional upgrades, not requirements. " +
      "Reply with STRICT JSON only, no markdown.";

    const user =
      `Vietnamese source paragraph: ${vi}\n` +
      `Reference model translation (one acceptable option): ${model}\n` +
      (body.structures?.length ? `Optional target structures: ${body.structures.join(", ")}\n` : "") +
      `Learner translation: ${userAnswer}\n\n` +
      `Return JSON: {"score": number 0-10, "accuracy": 0-10, "grammar": 0-10, "vocabulary": 0-10, ` +
      `"cohesion": 0-10, "style": 0-10, "verdict": "excellent"|"good"|"needs_work", ` +
      `"feedback": [{"vi":"...","en":"..."}] (2-4 items), ` +
      `"sentences": [{"vi":"...","en":"..."}] (one note per source sentence, max 6), ` +
      `"corrected": "the learner paragraph corrected, keeping their own wording where possible", ` +
      `"upgraded": "a Band 7.5+ version of the whole paragraph"}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        temperature: 0.2,
        max_tokens: 4000,
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
    const pairs = (arr: unknown, max: number) =>
      Array.isArray(arr)
        ? arr
            .filter((f: any) => f && (f.vi || f.en))
            .slice(0, max)
            .map((f: any) => ({ vi: String(f.vi ?? f.en ?? ""), en: String(f.en ?? f.vi ?? "") }))
        : [];

    return new Response(
      JSON.stringify({
        score: clamp(parsed.score),
        accuracy: clamp(parsed.accuracy),
        grammar: clamp(parsed.grammar),
        vocabulary: clamp(parsed.vocabulary),
        cohesion: clamp(parsed.cohesion),
        style: clamp(parsed.style),
        verdict: ["excellent", "good", "needs_work"].includes(parsed.verdict) ? parsed.verdict : "good",
        feedback: pairs(parsed.feedback, 5),
        sentences: pairs(parsed.sentences, 6),
        corrected: String(parsed.corrected ?? userAnswer),
        upgraded: String(parsed.upgraded ?? model),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("grade-paragraph-translation error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
