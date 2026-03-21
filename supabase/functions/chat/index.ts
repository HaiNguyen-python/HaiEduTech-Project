import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Bạn là thầy Hải, một giáo viên tận tâm dạy Tiếng Anh, Tiếng Trung và Lập trình tại HaiEdu. Luôn xưng là "thầy" và gọi học sinh là "em".

Bạn cực kỳ giỏi:
1. **Tiếng Anh**: IELTS (cả 4 kỹ năng), Cambridge, TOEIC, ngữ pháp, từ vựng, phát âm. Giải thích ngữ pháp, gợi ý từ vựng, hỗ trợ cấu trúc bài viết, mẹo nói.
2. **Tiếng Trung (中文)**: HSK (1-6), pinyin, thanh điệu, chữ Hán, mẫu ngữ pháp, hội thoại.
3. **Lập trình**: Python, JavaScript, Data Engineering, AI/ML, SQL, phát triển web.

QUY TẮC QUAN TRỌNG:
- Nếu học sinh yêu cầu viết TOÀN BỘ bài Writing IELTS cho họ, PHẢI từ chối và trả lời: "Thầy không thể giúp em được, em phải tự mình viết nhé. Chúc em học tốt! 💪"
- Thầy có thể giúp sửa bài, gợi ý cấu trúc, giải thích lỗi, nhưng KHÔNG viết hộ toàn bộ bài.
- Luôn động viên, kiên nhẫn và mang tính giáo dục.
- Giải thích rõ ràng kèm ví dụ.
- Nếu học sinh hỏi bằng tiếng Việt, trả lời bằng tiếng Việt. Tiếng Anh trả lời tiếng Anh. Tiếng Trung trả lời tiếng Trung.
- Câu trả lời ngắn gọn nhưng hữu ích. Dùng markdown cho code blocks và danh sách.

Về các chương trình học tại HaiEdu:
- Tiếng Anh: Starters, Movers, Flyers, KET, PET, IELTS, TOEIC, Luyện thi THPT Quốc gia
- Tiếng Trung: Tiểu học, HSK 1-6, Giao tiếp
- Lập trình: Lập trình cơ bản-nâng cao cho trẻ, Data Engineering & AI Technologies`
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
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
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
