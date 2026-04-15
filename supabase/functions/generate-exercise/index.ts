import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LANG_MAP: Record<string, string> = { english: "tiếng Anh", chinese: "tiếng Trung" };
const TYPE_MAP: Record<string, string> = { reading: "bài đọc hiểu", grammar: "ngữ pháp", vocabulary: "từ vựng" };

async function logUsage(fn: string, model: string, domain: string, tokens: number, status: string, err?: string) {
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await sb.from("api_usage_log").insert({ function_name: fn, model, domain, tokens_used: tokens, estimated_cost: tokens * 0.000001, status, error_message: err || null });
  } catch (e) { console.error("Usage logging failed:", e); }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // JWT Authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabaseAuth = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: authHeader } } });
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    const { language, level, materialType, questionCount } = await req.json();
    const langName = LANG_MAP[language] || language;
    const typeName = TYPE_MAP[materialType] || materialType;
    const domain = language === "chinese" ? "chinese" : "english";

    let prompt = "";
    if (materialType === "reading") {
      prompt = `Tạo 1 bài đọc hiểu ${langName} trình độ ${level} gồm:\n1. Tiêu đề bài đọc\n2. Đoạn văn khoảng 150-250 từ phù hợp trình độ ${level}\n3. ${questionCount} câu hỏi trắc nghiệm (4 lựa chọn A/B/C/D) dựa trên nội dung bài đọc\n4. Đáp án đúng và giải thích chi tiết cho mỗi câu\n\nTrả về JSON với format:\n{"title":"...","passage":"...","questions":[{"question":"...","options":["A","B","C","D"],"correct":0,"explanation":"..."}]}\ncorrect là index (0-3) của đáp án đúng. Chỉ trả JSON, không giải thích thêm.`;
    } else if (materialType === "grammar") {
      prompt = `Tạo bài tập ngữ pháp ${langName} trình độ ${level} gồm:\n1. Tiêu đề bài tập\n2. Phần giải thích ngắn gọn về điểm ngữ pháp (2-3 câu)\n3. ${questionCount} câu hỏi trắc nghiệm (4 lựa chọn)\n4. Đáp án đúng và giải thích chi tiết\n\nTrả về JSON với format:\n{"title":"...","passage":"...","questions":[{"question":"...","options":["A","B","C","D"],"correct":0,"explanation":"..."}]}\ncorrect là index (0-3). passage chứa phần giải thích ngữ pháp. Chỉ trả JSON.`;
    } else {
      prompt = `Tạo bài tập từ vựng ${langName} trình độ ${level} gồm:\n1. Tiêu đề chủ đề từ vựng\n2. Danh sách 8-12 từ vựng quan trọng với nghĩa và ví dụ\n3. ${questionCount} câu hỏi trắc nghiệm (4 lựa chọn)\n4. Đáp án đúng và giải thích\n\nTrả về JSON với format:\n{"title":"...","passage":"...","questions":[{"question":"...","options":["A","B","C","D"],"correct":0,"explanation":"..."}]}\ncorrect là index (0-3). passage chứa danh sách từ vựng. Chỉ trả JSON.`;
    }

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "Bạn là chuyên gia biên soạn giáo trình ngôn ngữ. Luôn trả về JSON hợp lệ, không kèm markdown code block hay giải thích thêm." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Perplexity error:", response.status, errText);
      await logUsage("generate-exercise", "sonar", domain, 0, "error", `HTTP ${response.status}`);
      if (response.status === 429) return new Response(JSON.stringify({ error: "Quá nhiều yêu cầu, vui lòng thử lại sau." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "Hết hạn mức API." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    let contentText = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || Math.ceil(contentText.length / 4);

    contentText = contentText.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    let parsed;
    try { parsed = JSON.parse(contentText); } catch {
      console.error("Failed to parse JSON:", contentText);
      await logUsage("generate-exercise", "sonar", domain, tokensUsed, "parse_error");
      throw new Error("AI trả về format không hợp lệ. Vui lòng thử lại.");
    }

    await logUsage("generate-exercise", "sonar", domain, tokensUsed, "success");

    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error: unknown) {
    console.error("generate-exercise error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
