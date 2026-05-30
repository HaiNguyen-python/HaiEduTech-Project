/**
 * @file index.ts (hskk-grade)
 * @description Chấm điểm HSKK Speaking dùng Lovable AI Gateway.
 *  - Phần 1: chấm độ chính xác đọc lại (pronunciation accuracy)
 *  - Phần 2 + 3: chấm 4 tiêu chí (phát âm, lưu loát, ngữ pháp, nội dung)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BodySchema = z.object({
  level: z.enum(["beginner", "intermediate", "advanced"]),
  part: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  prompt_hanzi: z.string().min(1).max(2000),
  prompt_pinyin: z.string().max(2000).optional(),
  transcript: z.string().min(1).max(3000),
  duration_seconds: z.number().int().min(0).max(600).optional(),
});

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";

function repairJson(text: string): string {
  // Loại bỏ markdown fences ```json ... ```
  let t = text.trim();
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  // Tìm object đầu tiên
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start >= 0 && end > start) t = t.slice(start, end + 1);
  return t;
}

function buildPrompt(input: z.infer<typeof BodySchema>) {
  const { level, part, prompt_hanzi, prompt_pinyin, transcript, duration_seconds } = input;
  const levelLabel = level === "beginner" ? "HSKK Sơ cấp (HSK 1-2)" : level === "intermediate" ? "HSKK Trung cấp (HSK 3-4)" : "HSKK Cao cấp (HSK 5-6)";
  if (part === 1) {
    return `Bạn là giám khảo HSKK (HSK Speaking Test). Học viên đang luyện ${levelLabel}, Phần 1 - Nghe và lặp lại nguyên văn.

CÂU MẪU (Hanzi): ${prompt_hanzi}
${prompt_pinyin ? `Pinyin: ${prompt_pinyin}\n` : ""}HỌC VIÊN ĐỌC LẠI (transcript từ Web Speech API): ${transcript}

Hãy chấm theo thang 0-100:
- pronunciation: độ trùng khớp từng âm tiết (so sánh transcript vs câu gốc).
- tone: ước tính độ chính xác thanh điệu dựa trên các từ khớp.
- overall: trung bình có trọng số (pronunciation 70%, tone 30%).

Trả về JSON THUẦN (không markdown, không giải thích ngoài JSON):
{
  "scores": { "pronunciation": number, "tone": number, "overall": number },
  "matched_words": [string],
  "missed_words": [string],
  "feedback_vi": "1-2 câu nhận xét tiếng Việt + 1 mẹo cải thiện",
  "feedback_en": "1-2 sentences in English + 1 tip"
}`;
  }
  // Part 2 hoặc 3
  return `Bạn là giám khảo HSKK (HSK Speaking Test). Học viên đang luyện ${levelLabel}, Phần ${part}.

CÂU HỎI / ĐỀ BÀI (Hanzi): ${prompt_hanzi}
HỌC VIÊN TRẢ LỜI (transcript): ${transcript}
${duration_seconds ? `Thời lượng nói: ${duration_seconds}s\n` : ""}
Hãy chấm theo rubric HSKK 4 tiêu chí, mỗi tiêu chí 0-100:
- pronunciation: phát âm + thanh điệu
- fluency: lưu loát, ít ngập ngừng, tốc độ phù hợp
- grammar: chính xác ngữ pháp, dùng cấu trúc cấp ${level}
- content: nội dung trả lời có liên quan, đầy đủ, có dẫn dắt/ví dụ
- overall: trung bình có trọng số (pron 25%, fluency 25%, grammar 25%, content 25%)

Trả về JSON THUẦN:
{
  "scores": { "pronunciation": n, "fluency": n, "grammar": n, "content": n, "overall": n },
  "strengths": [string, string],
  "improvements": [string, string],
  "sample_answer_hanzi": "1 câu trả lời mẫu phù hợp cấp ${level}",
  "sample_answer_pinyin": "pinyin của câu mẫu",
  "sample_answer_vi": "dịch tiếng Việt",
  "feedback_vi": "2-3 câu nhận xét chi tiết bằng tiếng Việt",
  "feedback_en": "2-3 sentences in English"
}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Bạn là giám khảo HSKK chuyên nghiệp. Luôn trả về JSON thuần không kèm markdown." },
          { role: "user", content: buildPrompt(parsed.data) },
        ],
        temperature: 0.3,
      }),
    });

    if (aiResp.status === 429) {
      return new Response(JSON.stringify({ error: "Đã đạt giới hạn yêu cầu. Vui lòng thử lại sau ít phút." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    if (aiResp.status === 402) {
      return new Response(JSON.stringify({ error: "Tài khoản Lovable AI cần nạp thêm credit." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    if (!aiResp.ok) {
      const errText = await aiResp.text();
      return new Response(JSON.stringify({ error: `AI error: ${errText.slice(0, 300)}` }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const data = await aiResp.json();
    const raw = data?.choices?.[0]?.message?.content ?? "";
    let result;
    try {
      result = JSON.parse(repairJson(raw));
    } catch (e) {
      return new Response(JSON.stringify({ error: "Không phân tích được JSON từ AI", raw: raw.slice(0, 500) }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
