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

// Escape raw control characters that models put inside JSON strings.
const escapeInStrings = (text: string) => {
  let out = "", inStr = false, esc = false;
  for (const ch of text) {
    if (inStr) {
      if (esc) { out += ch; esc = false; continue; }
      if (ch === "\\") { out += ch; esc = true; continue; }
      if (ch === '"') { inStr = false; out += ch; continue; }
      if (ch === "\n") { out += "\\n"; continue; }
      if (ch === "\r") continue;
      if (ch === "\t") { out += "\\t"; continue; }
      out += ch;
    } else {
      if (ch === '"') inStr = true;
      out += ch;
    }
  }
  return out;
};

// Fix mismatched/extra/missing closing brackets (models often miscount "}]}}").
const balanceBrackets = (text: string) => {
  const stack: string[] = [];
  let out = "", inStr = false, esc = false;
  for (const ch of text) {
    if (inStr) {
      out += ch;
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') { inStr = true; out += ch; continue; }
    if (ch === "{" || ch === "[") { stack.push(ch === "{" ? "}" : "]"); out += ch; continue; }
    if (ch === "}" || ch === "]") {
      if (stack[stack.length - 1] === ch) { stack.pop(); out += ch; continue; }
      const deeper = stack.lastIndexOf(ch);
      if (deeper >= 0) {
        while (stack.length > deeper + 1) out += stack.pop();
        stack.pop();
        out += ch;
      }
      // else: stray closer, drop it
      continue;
    }
    out += ch;
  }
  if (inStr) out += '"';
  while (stack.length) out += stack.pop();
  return out;
};

const repairJson = (raw: string): any => {
  let text = raw.trim();
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, "");
  text = text.replace(/^```(?:json)?/i, "").replace(/```\s*$/, "").trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) text = text.slice(start, end + 1);
  text = text.replace(/[\u201C\u201D]/g, '\\"');
  text = escapeInStrings(text);
  try {
    return JSON.parse(text.replace(/,\s*([}\]])/g, "$1"));
  } catch {
    return JSON.parse(balanceBrackets(text).replace(/,\s*([}\]])/g, "$1"));
  }
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
    const quizCount = Number(body?.quizCount) === 10 ? 10 : 5;
    const includePractice = body?.includePractice !== false;

    const shape =
      kind === "article"
        ? `{"title":"Vietnamese title","title_en":"English title","summary":"2-3 sentence Vietnamese summary","summary_en":"English summary","tags":["tag1","tag2","tag3"],"body":{"html":"<h2>...</h2><p>...</p> full Vietnamese article, 700-1000 words, semantic HTML only (h2,h3,p,ul,li,ol,strong,em,blockquote)","html_en":"same article in English"}}`
        : `{"title":"Vietnamese lesson title","title_en":"English lesson title","summary":"Vietnamese summary","summary_en":"English summary","tags":["tag1","tag2"],"body":{"blocks":[{"id":"b1","type":"objective","heading":"Mục tiêu","heading_en":"Objectives","text":"Vietnamese text","text_en":"English text"},{"id":"b2","type":"vocabulary","heading":"Từ vựng","heading_en":"Vocabulary","vocabulary":[{"term":"","meaning":"","example":""}]},{"id":"b3","type":"dialogue","heading":"Hội thoại","heading_en":"Dialogue","dialogue":[{"speaker":"A","line":"","translation":""}]},{"id":"b4","type":"explanation","heading":"Lý thuyết","heading_en":"Theory","text":"Vietnamese theory","text_en":"English theory"},{"id":"b5","type":"practice","heading":"Bài tập","heading_en":"Practice","text":"short Vietnamese instructions","text_en":"English instructions","practice":[{"prompt":"sentence with ___ blank","answer":"exact answer","accepted":["alternative"],"hint":"Vietnamese hint"}]},{"id":"b6","type":"quiz","heading":"Quiz","heading_en":"Quiz","quiz":[{"question":"","options":["","","",""],"correctIndex":0,"explanation":"Vietnamese + English explanation of why correct and why others are wrong"}]}]}}`;

    const rules =
      kind === "lesson"
        ? `The lesson must include these blocks in order: objective (3-4 measurable goals), vocabulary (10-12 entries; term, meaning in Vietnamese with IPA or pinyin in brackets when relevant, a realistic example sentence), dialogue (at least 8 lines with Vietnamese translation), explanation (deep theory: rules, formulas, common mistakes with corrections, and a section starting with "Mẹo vàng của thầy Hải:"), ${includePractice ? 'practice (6-8 fill-in-the-blank or rewrite items; each prompt contains ___ and has one exact short answer plus accepted alternatives),' : 'practice (short text only, practice array empty),'} quiz (exactly ${quizCount} questions, each with exactly 4 plausible options, varied correctIndex values 0-3, and a bilingual explanation). Use plain text with line breaks in text fields, no HTML.`
        : "Write a well-structured article with an introduction, 3-5 sections with h2 headings, concrete examples, and a short conclusion. Use only semantic HTML tags, never inline styles or scripts.";

    const prompt = `Create a bilingual (Vietnamese + English) teaching ${kind} for HaiEduTech.
Topic: ${topic}
Subject: ${subject}
Learner level: ${level}

${rules}
Content must be specific, practical and accurate. Do not use em-dash characters; use a plain hyphen.
Return ONLY minified JSON with exactly this shape, no markdown fences, no commentary:
${shape}`;

    let draft: any = null;
    for (let attempt = 0; attempt < 2 && !draft; attempt++) {
      const res = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${PERPLEXITY_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "sonar-pro",
          messages: [
            { role: "system", content: "You are an expert bilingual curriculum writer. Answer with one valid JSON object only. Never put raw line breaks inside strings; use \\n. Never use double quotes inside string values; use single quotes." },
            { role: "user", content: attempt === 0 ? prompt : prompt + "\nKeep every text field concise so the whole JSON stays complete and valid." },
          ],
          temperature: 0.3,
          max_tokens: 9000,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error("perplexity error", res.status, detail.slice(0, 400));
        if (res.status === 429 || res.status >= 500) continue;
        return json({ error: "ai_failed", status: res.status }, 502);
      }
      const payload = await res.json();
      const raw = payload?.choices?.[0]?.message?.content ?? "";
      try {
        draft = repairJson(raw);
      } catch (e) {
        console.error("invalid json attempt", attempt, String(e), raw.slice(-300));
      }
    }
    if (!draft) return json({ error: "invalid_ai_json" }, 502);

    // Replace em-dashes everywhere (project rule).
    const clean = (v: any): any =>
      typeof v === "string" ? v.replace(/\u2014/g, "-")
      : Array.isArray(v) ? v.map(clean)
      : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, clean(x)]))
      : v;
    draft = clean(draft);

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
        practice: Array.isArray(b?.practice)
          ? b.practice
              .filter((p: any) => p?.prompt && p?.answer)
              .map((p: any) => ({
                prompt: String(p.prompt),
                answer: String(p.answer),
                accepted: Array.isArray(p.accepted) ? p.accepted.map(String).slice(0, 5) : [],
                hint: p.hint ? String(p.hint) : "",
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
