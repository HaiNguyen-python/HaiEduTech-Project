import { createClient } from "npm:@supabase/supabase-js@2";
import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";
import { generateText } from "npm:ai";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TOPICS = [
  { subject: "IELTS", topics: [
    "IELTS Writing Task 2: linking words",
    "IELTS Listening: paraphrasing traps",
    "IELTS Reading: True/False/Not Given",
    "IELTS Speaking Part 2: cue card structure",
    "IELTS Vocabulary: collocations for education",
    "IELTS Grammar: complex sentences",
  ]},
  { subject: "Programming", topics: [
    "Python: list vs tuple",
    "JavaScript: let, const, var scope",
    "Big-O complexity basics",
    "SQL: JOIN types",
    "Git: rebase vs merge",
    "React hooks: useEffect dependencies",
  ]},
  { subject: "General", topics: [
    "AI: what is a Large Language Model?",
    "AI: supervised vs unsupervised learning",
    "AI: prompt engineering basics",
    "AI ethics: bias in training data",
    "AI: neural network fundamentals",
    "AI tools for students",
  ]},
];

function extractJson(raw: string): any | null {
  if (!raw) return null;
  let s = raw.replace(/^\s*```[a-zA-Z]*\s*/m, "").replace(/```\s*$/m, "").trim();
  const start = s.indexOf("{"); const end = s.lastIndexOf("}");
  if (start !== -1 && end > start) s = s.slice(start, end + 1);
  s = s.replace(/,(\s*[}\]])/g, "$1");
  try { return JSON.parse(s); } catch { return null; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const key = Deno.env.get("LOVABLE_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  if (!key || !SUPABASE_URL || !SERVICE_ROLE) {
    return new Response(JSON.stringify({ error: "Missing env" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

  // De-dupe: skip if an auto-poll was inserted in the last 2 days
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  const { data: recent } = await admin
    .from("your_corner_posts")
    .select("id")
    .eq("subject", "IELTS")
    .gte("created_at", twoDaysAgo)
    .not("poll", "is", null)
    .limit(1);
  // If we already posted an auto-poll very recently, skip
  const { data: recentAny } = await admin
    .from("your_corner_posts")
    .select("id, content, created_at")
    .gte("created_at", twoDaysAgo)
    .not("poll", "is", null)
    .ilike("content", "%[AutoPoll]%")
    .limit(1);
  if (recentAny && recentAny.length > 0) {
    return new Response(JSON.stringify({ skipped: "recent_auto_poll_exists" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  // Pick author: first staff (admin/teacher)
  const { data: staffRoles } = await admin
    .from("user_roles")
    .select("user_id, role")
    .in("role", ["admin", "teacher"])
    .limit(5);
  const authorId = staffRoles?.[0]?.user_id;
  if (!authorId) {
    return new Response(JSON.stringify({ error: "no_staff_author" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  // Pick subject + topic randomly
  const bucket = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const topic = bucket.topics[Math.floor(Math.random() * bucket.topics.length)];
  const subject = bucket.subject;

  const prompt = `Bạn là giáo viên HaiEduTech. Tạo MỘT câu hỏi trắc nghiệm ôn tập cho cộng đồng học viên.
Môn: ${subject}
Chủ đề: ${topic}

CHỈ trả về JSON thuần theo đúng format:
{"question":"...","options":["A","B","C","D"],"correct_index":0,"explanation":"..."}

Quy tắc:
- 4 đáp án, chỉ 1 đáp án đúng.
- Câu hỏi <=220 ký tự, mỗi đáp án <=80 ký tự.
- Tiếng Việt (giữ thuật ngữ tiếng Anh nếu cần).
- explanation: 1-2 câu ngắn gọn.`;

  try {
    const provider = createOpenAICompatible({
      name: "lovable",
      baseURL: "https://ai.gateway.lovable.dev/v1",
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    const { text } = await generateText({
      model: provider("google/gemini-2.5-flash"),
      prompt,
      maxOutputTokens: 800,
      providerOptions: { lovable: { response_format: { type: "json_object" } } },
    });
    const result = extractJson(text);
    if (!result?.question || !Array.isArray(result.options) || result.options.length < 2) {
      return new Response(JSON.stringify({ error: "AI invalid", raw: text?.slice(0, 300) }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const q = String(result.question).trim();
    const options = result.options.slice(0, 6).map((o: any) => String(o).trim()).filter(Boolean);
    const correct = Number.isInteger(result.correct_index) && result.correct_index >= 0 && result.correct_index < options.length ? result.correct_index : 0;
    const expl = String(result.explanation ?? "").trim();

    const emojiMap: Record<string, string> = { IELTS: "📘", Programming: "💻", General: "🤖" };
    const label = subject === "General" ? "AI" : subject;
    const emoji = emojiMap[subject] ?? "📊";
    // Caption: chỉ giữ tiêu đề ngắn + hashtag. KHÔNG lộ đáp án/giải thích ở caption.
    const content = `${emoji} [AutoPoll] Câu hỏi ôn tập ${label} hôm nay!\n\n#${label}${subject === "General" ? " #AI" : ""} #HaiEduTech #OnTapCungThayHai`;

    const poll = { question: q, options, subject, allow_change: true, correct_index: correct, explanation: expl };

    const { data: inserted, error: insErr } = await admin
      .from("your_corner_posts")
      .insert({
        user_id: authorId,
        content,
        subject,
        visibility: "public",
        poll,
      })
      .select("id")
      .single();
    if (insErr) throw insErr;

    return new Response(JSON.stringify({ ok: true, post_id: inserted?.id, subject, topic }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error("auto-community-poll error:", e);
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
