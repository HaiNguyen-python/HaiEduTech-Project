/**
 * generate-content-draft
 * Creates a bilingual draft (article or structured lesson) for the admin Content Studio.
 */
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const PERPLEXITY_KEY = Deno.env.get("PERPLEXITY_API_KEY");

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const repairJson = (raw: string): any => {
  let text = raw.trim();
  text = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) text = text.slice(start, end + 1);
  text = text.replace(/,\s*([}\]])/g, "$1");
  return JSON.parse(text);
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!PERPLEXITY_KEY) return json({ error: "missing_api_key" }, 500);

    // Staff-only: validate the caller's JWT and role.
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData?.user?.id;
    if (!uid) return json({ error: "unauthorized" }, 401);
    const { data: staff } = await supabase.rpc("is_staff", { _user_id: uid });
    if (!staff) return json({ error: "forbidden" }, 403);

    const body = await req.json().catch(() => ({}));
    const kind = body?.kind === "lesson" ? "lesson" : "article";
    const topic = String(body?.topic ?? "").trim().slice(0, 300);
    const subject = String(body?.subject ?? "English").slice(0, 60);
    const level = String(body?.level ?? "All levels").slice(0, 40);
    if (!topic) return json({ error: "missing_topic" }, 400);

    const shape =
      kind === "article"
        ? `{"title":"Vietnamese title","title_en":"English title","summary":"2-3 sentence Vietnamese summary","summary_en":"English summary","tags":["tag1","tag2","tag3"],"body":{"html":"<h2>...</h2><p>...</p> full Vietnamese article, 700-1000 words, semantic HTML only (h2,h3,p,ul,li,ol,strong,em,blockquote)","html_en":"same article in English"}}`
        : `{"title":"Vietnamese lesson title","title_en":"English lesson title","summary":"Vietnamese summary","summary_en":"English summary","tags":["tag1","tag2"],"body":{"blocks":[{"id":"b1","type":"objective","heading":"Mục tiêu","heading_en":"Objectives","text":"Vietnamese text","text_en":"English text"},{"id":"b2","type":"vocabulary","heading":"Từ vựng","heading_en":"Vocabulary","vocabulary":[{"term":"","meaning":"","example":""}]},{"id":"b3","type":"dialogue","heading":"Hội thoại","heading_en":"Dialogue","dialogue":[{"speaker":"A","line":"","translation":""}]},{"id":"b4","type":"explanation","heading":"Giải thích","heading_en":"Explanation","text":"","text_en":""},{"id":"b5","type":"practice","heading":"Bài tập","heading_en":"Practice","text":"","text_en":""},{"id":"b6","type":"quiz","heading":"Quiz","heading_en":"Quiz","quiz":[{"question":"","options":["","","",""],"correctIndex":0,"explanation":""}]}]}}`;

    const rules =
      kind === "lesson"
        ? "The lesson must include exactly these six blocks in order: objective, vocabulary (at least 10 entries), dialogue (at least 8 lines), explanation, practice, quiz (at least 5 questions, each with exactly 4 options). Every quiz correctIndex must be 0-3 and point to the correct option."
        : "Write a well-structured article with an introduction, 3-5 sections with h2 headings, concrete examples, and a short conclusion. Use only semantic HTML tags, never inline styles or scripts.";

    const prompt = `Create a bilingual (Vietnamese + English) teaching ${kind} for HaiEduTech.
Topic: ${topic}
Subject: ${subject}
Learner level: ${level}

${rules}
Content must be specific, practical and accurate. Do not use em-dash characters; use a plain hyphen.
Return ONLY minified JSON with exactly this shape, no markdown fences, no commentary:
${shape}`;

    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: "You are an expert bilingual curriculum writer. You always answer with valid JSON only." },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 6000,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("perplexity error", res.status, detail.slice(0, 400));
      return json({ error: "ai_failed", status: res.status }, 502);
    }

    const payload = await res.json();
    const raw = payload?.choices?.[0]?.message?.content ?? "";
    let draft: any;
    try {
      draft = repairJson(raw);
    } catch (_e) {
      return json({ error: "invalid_ai_json" }, 502);
    }

    // Structural validation.
    if (!draft?.title || !draft?.body) return json({ error: "invalid_ai_shape" }, 502);
    if (kind === "article") {
      if (typeof draft.body.html !== "string" || draft.body.html.length < 200) {
        return json({ error: "article_too_short" }, 502);
      }
    } else {
      const blocks = Array.isArray(draft.body.blocks) ? draft.body.blocks : [];
      if (blocks.length < 4) return json({ error: "lesson_too_thin" }, 502);
      draft.body.blocks = blocks.map((b: any, i: number) => ({
        ...b,
        id: String(b?.id || `b-${Date.now()}-${i}`),
        type: ["objective", "vocabulary", "dialogue", "explanation", "practice", "quiz"].includes(b?.type)
          ? b.type
          : "explanation",
        quiz: Array.isArray(b?.quiz)
          ? b.quiz
              .filter((q: any) => q?.question && Array.isArray(q?.options))
              .map((q: any) => ({
                question: String(q.question),
                options: [0, 1, 2, 3].map((oi) => String(q.options[oi] ?? "")),
                correctIndex: Math.min(3, Math.max(0, Number(q.correctIndex) || 0)),
                explanation: q.explanation ? String(q.explanation) : "",
              }))
          : undefined,
      }));
    }
    if (!Array.isArray(draft.tags)) draft.tags = [];

    return json({ draft });
  } catch (e) {
    console.error("generate-content-draft failed", e);
    return json({ error: "unexpected_error" }, 500);
  }
});
