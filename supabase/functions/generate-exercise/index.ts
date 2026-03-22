import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LANG_MAP: Record<string, string> = {
  english: "tiếng Anh",
  chinese: "tiếng Trung",
};

const TYPE_MAP: Record<string, string> = {
  reading: "bài đọc hiểu",
  grammar: "ngữ pháp",
  vocabulary: "từ vựng",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      throw new Error("PERPLEXITY_API_KEY is not configured");
    }

    const { language, level, materialType, questionCount } = await req.json();

    const langName = LANG_MAP[language] || language;
    const typeName = TYPE_MAP[materialType] || materialType;

    let prompt = "";

    if (materialType === "reading") {
      prompt = `Tạo 1 bài đọc hiểu ${langName} trình độ ${level} gồm:
1. Tiêu đề bài đọc
2. Đoạn văn khoảng 150-250 từ phù hợp trình độ ${level}
3. ${questionCount} câu hỏi trắc nghiệm (4 lựa chọn A/B/C/D) dựa trên nội dung bài đọc
4. Đáp án đúng và giải thích chi tiết cho mỗi câu

Trả về JSON với format:
{"title":"...","passage":"...","questions":[{"question":"...","options":["A","B","C","D"],"correct":0,"explanation":"..."}]}
correct là index (0-3) của đáp án đúng. Chỉ trả JSON, không giải thích thêm.`;
    } else if (materialType === "grammar") {
      prompt = `Tạo bài tập ngữ pháp ${langName} trình độ ${level} gồm:
1. Tiêu đề bài tập (ví dụ: "Ôn tập thì hiện tại đơn" hoặc "Luyện tập cấu trúc bị động")
2. Phần giải thích ngắn gọn về điểm ngữ pháp (2-3 câu)
3. ${questionCount} câu hỏi trắc nghiệm điền vào chỗ trống hoặc chọn đáp án đúng (4 lựa chọn)
4. Đáp án đúng và giải thích chi tiết

Trả về JSON với format:
{"title":"...","passage":"...","questions":[{"question":"...","options":["A","B","C","D"],"correct":0,"explanation":"..."}]}
correct là index (0-3). passage chứa phần giải thích ngữ pháp. Chỉ trả JSON.`;
    } else {
      prompt = `Tạo bài tập từ vựng ${langName} trình độ ${level} gồm:
1. Tiêu đề chủ đề từ vựng (ví dụ: "Từ vựng về Du lịch" hoặc "Từ vựng công sở")
2. Danh sách 8-12 từ vựng quan trọng với nghĩa và ví dụ
3. ${questionCount} câu hỏi trắc nghiệm kiểm tra hiểu nghĩa, cách dùng từ (4 lựa chọn)
4. Đáp án đúng và giải thích

Trả về JSON với format:
{"title":"...","passage":"...","questions":[{"question":"...","options":["A","B","C","D"],"correct":0,"explanation":"..."}]}
correct là index (0-3). passage chứa danh sách từ vựng. Chỉ trả JSON.`;
    }

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
            content:
              "Bạn là chuyên gia biên soạn giáo trình ngôn ngữ. Luôn trả về JSON hợp lệ, không kèm markdown code block hay giải thích thêm.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Perplexity error:", response.status, errText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Quá nhiều yêu cầu, vui lòng thử lại sau." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Hết hạn mức API Perplexity." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    let contentText = data.choices?.[0]?.message?.content || "";

    // Clean markdown code blocks if present
    contentText = contentText.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(contentText);
    } catch {
      console.error("Failed to parse JSON:", contentText);
      throw new Error("AI trả về format không hợp lệ. Vui lòng thử lại.");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("generate-exercise error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
