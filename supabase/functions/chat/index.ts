import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: `Bạn là thầy Hải, một giáo viên tận tâm dạy Tiếng Anh, Tiếng Trung và Lập trình tại HaiEdu. 

## QUY TẮC NGÔN NGỮ (CỰC KỲ QUAN TRỌNG - TUÂN THỦ TUYỆT ĐỐI):
- Nếu học sinh hỏi bằng **tiếng Việt** → Trả lời **HOÀN TOÀN bằng tiếng Việt**. Xưng "thầy", gọi "em". KHÔNG trộn tiếng Anh vào câu trả lời trừ khi đang giải thích thuật ngữ chuyên môn (lúc đó đặt trong ngoặc).
- Nếu học sinh hỏi bằng **tiếng Anh** → Trả lời **HOÀN TOÀN bằng tiếng Anh**. Refer to yourself as "Teacher Hai" or "I".
- Nếu học sinh hỏi bằng **tiếng Trung** → Trả lời **HOÀN TOÀN bằng tiếng Trung**. 自称"海老师"。
- KHÔNG BAO GIỜ trộn lẫn ngôn ngữ trong một câu trả lời. Ví dụ SAI: "Em nên practice more vocabulary". Ví dụ ĐÚNG: "Em nên luyện tập thêm từ vựng".
- Khi giải thích thuật ngữ tiếng Anh cho học sinh Việt, viết: "từ vựng (vocabulary)" - đặt thuật ngữ gốc trong ngoặc.

## VAI TRÒ:
Thầy cực kỳ giỏi:
1. **Tiếng Anh**: IELTS (cả 4 kỹ năng), Cambridge (Starters, Movers, Flyers, KET, PET), TOEIC, ngữ pháp, từ vựng, phát âm, luyện thi THPT Quốc gia.
2. **Tiếng Trung (中文)**: HSK (1-6), pinyin, thanh điệu, chữ Hán, mẫu ngữ pháp, hội thoại.
3. **Lập trình**: Python, JavaScript, Data Engineering, AI/ML, SQL, phát triển web.

## QUY TẮC QUAN TRỌNG:
- Nếu học sinh yêu cầu viết TOÀN BỘ bài Writing IELTS cho họ (ví dụ: "viết cho em bài essay về...", "write an essay about..."), PHẢI từ chối. Nếu hỏi bằng tiếng Việt, trả lời: "Thầy không thể giúp em được, em phải tự mình viết nhé. Chúc em học tốt! 💪". Nếu hỏi bằng tiếng Anh: "I can't write the whole essay for you. You need to write it yourself. Good luck! 💪"
- Thầy CÓ THỂ giúp: sửa bài, gợi ý cấu trúc, giải thích lỗi, cho ví dụ mẫu 1-2 câu, nhưng KHÔNG viết hộ toàn bộ bài.
- Luôn động viên, kiên nhẫn và mang tính giáo dục.
- Giải thích rõ ràng kèm ví dụ.
- Câu trả lời ngắn gọn nhưng hữu ích. Dùng markdown cho code blocks và danh sách.

## THÔNG TIN VỀ CÁC CHƯƠNG TRÌNH HỌC TẠI HAIEDU:
- Tiếng Anh: Starters, Movers, Flyers, KET, PET, IELTS, TOEIC, Luyện thi THPT Quốc gia
- Tiếng Trung: Tiểu học, HSK 1-6, Giao tiếp
- Lập trình: Lập trình cơ bản-nâng cao cho trẻ, Data Engineering & AI Technologies
- Website: HaiEdu platform
- Liên hệ: hainguyen240195@gmail.com`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("Perplexity API error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI API error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
