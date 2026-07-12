import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";
import { generateText } from "npm:ai";
import { z } from "npm:zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BodySchema = z.object({
  subject: z.string().min(1).max(40).optional().nullable(),
  topic: z.string().max(280).optional().nullable(),
  lang: z.enum(["vi", "en"]).optional().default("vi"),
});

function extractJson(raw: string): any | null {
  if (!raw) return null;
  // Strip markdown fences using ```, ''' or """ (any language tag).
  let cleaned = raw
    .replace(/^\s*(?:`{3,}|'{3,}|"{3,})\s*[a-zA-Z]*\s*/m, "")
    .replace(/(?:`{3,}|'{3,}|"{3,})\s*$/m, "")
    .trim();

  const tryParse = (s: string) => { try { return JSON.parse(s); } catch { return null; } };
  const repair = (s: string) => s
    .replace(/,(\s*[}\]])/g, "$1")      // trailing commas
    .replace(/[\x00-\x1F\x7F]/g, " ");  // control chars

  // Isolate the outermost JSON object if there's surrounding text.
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end > start) cleaned = cleaned.slice(start, end + 1);

  let out = tryParse(cleaned) ?? tryParse(repair(cleaned));
  if (out) return out;

  // Truncation recovery: close unbalanced brackets and retry.
  let s = repair(cleaned);
  // If the last option string is unterminated, close the quote.
  const quotes = (s.match(/"/g) || []).length;
  if (quotes % 2 === 1) s += '"';
  // Close open arrays/objects.
  const opens = (s.match(/\{/g) || []).length - (s.match(/\}/g) || []).length;
  const openArr = (s.match(/\[/g) || []).length - (s.match(/\]/g) || []).length;
  s = s + "]".repeat(Math.max(0, openArr)) + "}".repeat(Math.max(0, opens));
  s = s.replace(/,(\s*[}\]])/g, "$1");
  return tryParse(s);
}


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  let body: any;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const { subject, topic, lang } = parsed.data;

  const subjectLabel = subject || "General study";
  const topicLine = topic?.trim() ? `Chủ đề cụ thể: ${topic.trim()}` : "Chọn một chủ đề ôn tập hữu ích.";

  const prompt = lang === "vi"
    ? `Bạn là giáo viên HaiEduTech. Tạo MỘT câu hỏi trắc nghiệm ôn tập.
Môn: ${subjectLabel}
${topicLine}

CHỈ trả về JSON thuần (không markdown, không lời dẫn) theo đúng format:
{"question":"...","options":["A","B","C","D"],"correct_index":0,"explanation":"..."}

Quy tắc:
- 4 đáp án, chỉ 1 đáp án đúng.
- Câu hỏi <=220 ký tự, mỗi đáp án <=80 ký tự.
- Tiếng Việt (giữ thuật ngữ tiếng Anh nếu cần).
- explanation: 1-2 câu.`
    : `You are a HaiEduTech teacher. Create ONE review multiple-choice question.
Subject: ${subjectLabel}
${topicLine}

Return ONLY pure JSON (no markdown, no preamble) in this exact format:
{"question":"...","options":["A","B","C","D"],"correct_index":0,"explanation":"..."}

Rules:
- 4 options, only 1 correct.
- Question <=220 chars, each option <=80 chars.
- explanation: 1-2 short sentences.`;

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
    if (!result || typeof result.question !== "string" || !Array.isArray(result.options) || result.options.length < 2) {
      return new Response(JSON.stringify({ error: "AI trả về dữ liệu không hợp lệ", code: "AI_ERROR", raw: text?.slice(0, 400) }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const options = result.options.slice(0, 6).map((o: any) => String(o).trim()).filter(Boolean);
    const correct_index = Number.isInteger(result.correct_index) && result.correct_index >= 0 && result.correct_index < options.length ? result.correct_index : 0;
    return new Response(JSON.stringify({
      question: String(result.question).trim(),
      options,
      correct_index,
      explanation: String(result.explanation ?? "").trim(),
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    const msg = String(e?.message || e);
    const rawStatus = Number(e?.statusCode ?? e?.status ?? e?.cause?.statusCode ?? 0);
    const isPayment = rawStatus === 402 || /402|payment required|credit/i.test(msg);
    const isRate = rawStatus === 429 || /429|rate.?limit|too many/i.test(msg);
    const status = isPayment ? 402 : isRate ? 429 : 500;
    const userMsg = isPayment
      ? "Hết credit AI Gateway - vui lòng nạp thêm credit cho workspace để tiếp tục dùng tính năng AI."
      : isRate
        ? "AI đang quá tải, thử lại sau ít phút."
        : msg;
    return new Response(JSON.stringify({ error: userMsg, code: isPayment ? "PAYMENT_REQUIRED" : isRate ? "RATE_LIMITED" : "AI_ERROR" }), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
