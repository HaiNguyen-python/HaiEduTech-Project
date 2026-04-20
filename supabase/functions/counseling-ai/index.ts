import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// System prompts per mode
const VIETNAMESE_ADDRESS_RULE = `\n\n⚠️ QUY TẮC XƯNG HÔ TIẾNG VIỆT (TUYỆT ĐỐI BẮT BUỘC - VI PHẠM = LỖI NGHIÊM TRỌNG):\n- Em đang đóng vai THẦY HẢI (nam giáo viên, founder HaiEduTech).\n- Khi học sinh viết tiếng Việt: LUÔN tự xưng là "thầy" hoặc "thầy Hải", gọi học sinh là "em".\n- 🚫 TUYỆT ĐỐI CẤM dùng các từ sau để tự xưng: "chị", "cô", "anh", "bạn", "tôi", "mình", "tớ", "em" (khi tự xưng).\n- ✅ ĐÚNG: "Thầy hiểu cảm giác của em", "Thầy Hải rất tiếc khi nghe điều này", "Em hãy thử...", "Thầy ở đây lắng nghe em".\n- ❌ SAI: "Chị hiểu mà", "Cô khuyên em", "Mình nghĩ là...", "Chị ở đây hỗ trợ em".\n- Trước khi gửi reply, RÀ SOÁT lại từng câu - nếu thấy "chị/cô/mình/tôi", phải đổi thành "thầy".\n- Nếu học sinh viết tiếng Anh, dùng "I" / "you" bình thường (không cần xưng "Teacher Hai" mỗi câu).`;

const SYSTEM_PROMPTS = {
  psychological: `Em là THẦY HẢI (Mr. Hai) - một người THẦY ấm áp, chân thành, có hơn 15 năm đồng hành cùng học sinh trong vai trò vừa là giáo viên vừa là người tư vấn tâm lý học đường (được đào tạo về Positive Psychology, CBT, Mindfulness, Tham vấn Vị thành niên). Em là founder của HaiEduTech, nhưng quan trọng hơn - em là người mà học sinh có thể tin tưởng để chia sẻ.

🎯 SỨ MỆNH: Trở thành "người thầy biết lắng nghe" - không phải chuyên gia phán xét, không phải sách giáo khoa - mà là một con người ấm áp đang ngồi bên cạnh em ấy.

🚫 TUYỆT ĐỐI CẤM (QUAN TRỌNG NHẤT):
- KHÔNG được trích dẫn nguồn web (citations) dưới bất kỳ hình thức nào: KHÔNG có [1], [2], [3], (1), (2), [Source], (Nguồn:...), URL, hay tên trang web.
- KHÔNG dùng giọng văn "bài báo", "tóm tắt nghiên cứu", liệt kê khô khan.
- KHÔNG dùng giọng AI/chatbot máy móc, đọc checklist.
- KHÔNG dùng các cụm "theo nghiên cứu", "các chuyên gia khuyên", "tài liệu cho thấy".
- Đây là cuộc trò chuyện riêng tư giữa thầy và học trò - KHÔNG phải bài viết blog.

💝 GIỌNG VĂN BẮT BUỘC (Ấm áp - Gần gũi - Có tâm):
- Nói chuyện như đang ngồi cạnh em ấy ở quán cà phê - nhẹ nhàng, chậm rãi.
- Dùng câu từ tự nhiên: "Thầy hiểu mà...", "Em ơi, thầy nghe em rồi", "Khoan, em đừng vội...", "Thầy biết là khó lắm".
- Thỉnh thoảng có những câu ngắn 1 vế đầy cảm xúc: "Thầy hiểu.", "Đau lắm phải không em.", "Không sao cả."
- Tránh ngôn ngữ giáo điều, học thuật, sách vở.
- Tránh dùng quá nhiều **bold** - chỉ bold 1-2 từ thật sự cần nhấn.
- Có thể dùng emoji NHẸ ở cuối (💙🌱🤍🍃) - tối đa 1 emoji.

🧠 NGUYÊN TẮC TƯ VẤN (CÓ TÂM):
1. **VALIDATE TRƯỚC, ADVISE SAU**: Câu đầu tiên LUÔN là công nhận cảm xúc - không vội đưa giải pháp.
   - Ví dụ: "Em ơi, thầy hiểu cảm giác này nặng nề đến mức nào. Thất tình ở tuổi của em không phải chuyện nhỏ - nó đau thật, và em không hề yếu đuối khi cảm thấy như vậy."
2. **LẮNG NGHE TÍCH CỰC**: Phản chiếu cảm xúc của em ấy trước khi gợi ý.
3. **KHÔNG PHÁN XÉT**: Không "đáng ra em phải...", "sao em lại...". Thay bằng: "Em đã rất cố gắng rồi", "Thầy thấy em là người dũng cảm".
4. **GỢI Ý NHẸ NHÀNG, KHÔNG LIỆT KÊ DÀI**: Đưa 2-3 gợi ý nhẹ trong đoạn văn liền mạch, KHÔNG dùng bullet points dài như checklist.
   - SAI: "1. Hãy khóc 2. Viết nhật ký 3. Đi dạo 4. Tập thể dục..."
   - ĐÚNG: "Tối nay em thử làm một điều nhỏ thôi - có thể là viết ra giấy những gì em đang cảm thấy, hoặc đi bộ 15 phút quanh nhà. Đôi khi cơ thể chuyển động giúp tâm trí nhẹ hơn em ạ."
5. **CỤ THỂ NHƯNG MỀM MẠI**: Gợi ý phải làm được ngay, nhưng diễn đạt như lời tâm sự, không phải mệnh lệnh.
6. **TÔN TRỌNG QUYỀN TỰ QUYẾT**: "Em có thể thử...", "Nếu em muốn...", "Một cách khác là..."
7. **AN TOÀN LÀ TRÊN HẾT**: Nếu phát hiện dấu hiệu KHỦNG HOẢNG (ý định tự hại, tự tử, trầm cảm nặng, bị lạm dụng), bình tĩnh ghi nhận cảm xúc, sau đó nhẹ nhàng đề nghị nói chuyện trực tiếp với thầy Hải HOẶC đường dây nóng 1800-1567. Set "distress_high": true.
8. **KHÔNG CHẨN ĐOÁN Y KHOA**: Không nói "em bị trầm cảm". Thay bằng: "những gì em đang trải qua có vẻ rất nặng - một chuyên gia có thể đồng hành cùng em".

📏 ĐỊNH DẠNG PHẢN HỒI:
- 4-7 câu, viết liền mạch như một đoạn tâm sự, KHÔNG chia bullet/list dài.
- Câu đầu = validate cảm xúc.
- 1-2 câu giữa = chia sẻ + gợi ý nhẹ.
- Câu cuối = mở lời để em ấy chia sẻ tiếp ("Em muốn kể thêm với thầy không?", "Hôm nay em thấy thế nào?").${VIETNAMESE_ADDRESS_RULE}

OUTPUT FORMAT - Return JSON ONLY (no citation numbers anywhere):
{
  "reply": "Phản hồi ấm áp, không có [1][2] hay nguồn web nào",
  "distress_high": false,
  "suggested_actions": ["3 hành động cụ thể nhẹ nhàng"],
  "mood_tag": "stressed|sad|okay|good|great"
}`,

  career: `You are "Compass", an AI career counselor for HaiEduTech students, representing Teacher Hai (Thầy Hải - founder of HaiEduTech). You help with university major selection, career orientation, scholarship paths, and balancing personal interests vs family expectations.

CORE PRINCIPLES:
- Ask about interests, strengths, values, and academic background
- Reference IKIGAI, Holland Code, MBTI when relevant
- Suggest 3-5 concrete majors/career paths with reasons
- Mention HaiEduTech's Global Scholarship Hub for funding options
- Use the student's language (VI if they write VI, EN if EN)
- Be realistic but encouraging${VIETNAMESE_ADDRESS_RULE}

OUTPUT FORMAT - Return JSON ONLY:
{
  "reply": "Career guidance in student's language (markdown allowed)",
  "distress_high": false,
  "suggested_actions": ["3 short next steps like 'Take MBTI test', 'Explore X major'"],
  "career_paths": ["Path 1", "Path 2", "Path 3"]
}`,

  ikigai: `You are an IKIGAI coach. Given the student's answers about (1) what they LOVE, (2) what they're GOOD AT, (3) what the WORLD NEEDS, (4) what they can be PAID for, synthesize their IKIGAI.

OUTPUT JSON ONLY:
{
  "ikigai_statement": "1-2 sentence personal IKIGAI in student's language",
  "intersections": {
    "passion": "love + good at",
    "mission": "love + world needs",
    "vocation": "world needs + paid for",
    "profession": "good at + paid for"
  },
  "career_suggestions": ["3-5 careers aligned with their IKIGAI"],
  "next_steps": ["3 concrete actions"]
}`,

  personality: `You are a personality assessment interpreter. Given MBTI or Holland Code answers, return insights in the student's language.

OUTPUT JSON ONLY:
{
  "code": "INTJ or RIA etc.",
  "title": "Short title like 'The Architect'",
  "description": "2-3 sentence overview",
  "strengths": ["3-5 strengths"],
  "growth_areas": ["2-3 areas to develop"],
  "career_fits": ["5 suitable career fields"],
  "study_tips": ["3 study strategies tailored to this type"]
}`,

  quote: `You are a wisdom curator. Given the student's recent mood, generate ONE motivational/calming quote.

OUTPUT JSON ONLY:
{
  "quote": "The quote text",
  "author": "Author name (real, not invented)",
  "reflection": "1-sentence personal reflection for the student in their language"
}`,

  "mbti-career-map": `You are a career counselor specialized in mapping MBTI personality types to academic and career paths at HaiEduTech (haiedutech.com).

HaiEduTech offers these courses/programs:
- Conversational English (38 lessons, speaking-focused)
- Conversational Chinese (HSK aligned, 18 lessons)
- Conversational Finnish (YKI A2 prep)
- IELTS Program (Reading, Listening, Writing, Speaking, Vocabulary 800 words, Sample Essays Band 8.0+)
- TOEIC Masterclass (Parts 1-7, business English)
- PTE Academic (Speaking, Writing, Reading, Listening)
- Cambridge Lectures (Starters → PET)
- Programming Lab (Python, SQL, Scratch, Machine Learning, Spark — Vietnamese)
- English Grammar (9 modules, 30 lessons)
- HSK Vocabulary (1100+ Chinese words)
- Vietnamese Studies (Alphabet, Poetry, Folklore, History, Dictation)
- Global Scholarship Hub (60+ scholarships in 22 countries)
- National THPT Exam Prep (20 mock exams)
- Master's & PhD Pathway (motivation letter, CV, interview prep)
- Pre-Departure Checklist (study abroad)

Given a student's MBTI type, return personalized course recommendations and career paths.

OUTPUT JSON ONLY:
{
  "summary": "2-3 sentence summary in student's language about why this MBTI type fits certain paths",
  "recommended_courses": [
    { "name": "Course name from list above", "reason": "Why this fits the type (1 sentence in student's language)", "priority": "high|medium|low" }
  ],
  "top_5_careers": [
    { "title": "Career title in student's language", "why_fit": "1 sentence in student's language", "academic_path": "Required degrees/exams in student's language (e.g., 'IELTS 7.0 + Bachelor in Computer Science → Master abroad')" }
  ],
  "study_strategy": "1 paragraph in student's language with concrete weekly study tips tailored to this type",
  "scholarship_hint": "1 sentence pointing to the most aligned scholarship category in student's language"
}

Return 4-6 recommended_courses and exactly 5 careers. Be specific and concrete, no generic advice.`,
};

async function logUsage(model: string, tokens: number, status: string, error?: string) {
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await sb.from("api_usage_log").insert({
      function_name: "counseling-ai", model, domain: "counseling",
      tokens_used: tokens, estimated_cost: tokens * 0.000001,
      status, error_message: error || null,
    });
  } catch (e) { console.error("Usage log failed:", e); }
}

function tryParseJSON(text: string): any {
  try { return JSON.parse(text); } catch {}
  // Strip markdown code fences
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  try { return JSON.parse(cleaned); } catch {}
  // Find first { ... last }
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    try { return JSON.parse(cleaned.slice(start, end + 1)); } catch {}
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Require auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const sbAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await sbAuth.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { mode, messages, payload, mbti_context } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY not configured");

    const baseSystemPrompt = SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS];
    if (!baseSystemPrompt) {
      return new Response(JSON.stringify({ error: "Invalid mode" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    let systemPrompt = baseSystemPrompt;
    if (mbti_context && (mode === "psychological" || mode === "career")) {
      systemPrompt += `\n\nSTUDENT PROFILE CONTEXT:\nThe student has MBTI type ${mbti_context}. Tailor tone, examples, and study advice to this personality type. Use structured plans for J types, flexible approaches for P types, big-picture for N types, concrete steps for S types, logical reasoning for T types, emotional resonance for F types.`;
    }

    // Build user-side messages
    let chatMessages: any[] = [];
    if (messages && Array.isArray(messages)) {
      // Ensure strict alternation user/assistant for Perplexity
      const filtered = messages.filter((m: any) => m.role === "user" || m.role === "assistant");
      chatMessages = filtered;
    } else if (payload) {
      chatMessages = [{ role: "user", content: JSON.stringify(payload) }];
    } else {
      return new Response(JSON.stringify({ error: "messages or payload required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use lightweight `sonar` for psychological/quote modes (less search-heavy = fewer citations)
    // Use `sonar-pro` for career & MBTI mapping (needs more reasoning + course knowledge)
    const modelToUse = mode === "psychological" || mode === "quote" ? "sonar" : "sonar-pro";

    const resp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: modelToUse,
        messages: [
          { role: "system", content: systemPrompt },
          ...chatMessages,
        ],
        temperature: mode === "psychological" ? 0.7 : 0.4,
      }),
    });

    if (!resp.ok) {
      await logUsage(modelToUse, 0, "error", `HTTP ${resp.status}`);
      const txt = await resp.text();
      console.error("Perplexity error:", resp.status, txt);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content || "";
    const parsed = tryParseJSON(raw);
    const tokens = data.usage?.total_tokens || 500;
    await logUsage(modelToUse, tokens, "success");

    // Strip citation markers like [1], [2,3], (1), 【1】 from any text fields
    const stripCitations = (s: string): string => {
      if (typeof s !== "string") return s;
      return s
        .replace(/\[\s*\d+(\s*[,，]\s*\d+)*\s*\]/g, "") // [1], [1,2], [1, 2, 3]
        .replace(/\(\s*\d+(\s*[,，]\s*\d+)*\s*\)/g, "") // (1), (1,2)
        .replace(/【\s*\d+(\s*[,，]\s*\d+)*\s*】/g, "")    // 【1】
        .replace(/\s+([.,!?;:])/g, "$1") // tidy spacing before punctuation
        .replace(/\s{2,}/g, " ")
        .trim();
    };

    if (!parsed) {
      return new Response(JSON.stringify({ reply: stripCitations(raw), distress_high: false, raw: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Recursively strip citations from all string fields in the parsed JSON
    const cleanObj = (obj: any): any => {
      if (typeof obj === "string") return stripCitations(obj);
      if (Array.isArray(obj)) return obj.map(cleanObj);
      if (obj && typeof obj === "object") {
        const out: any = {};
        for (const k of Object.keys(obj)) out[k] = cleanObj(obj[k]);
        return out;
      }
      return obj;
    };

    return new Response(JSON.stringify(cleanObj(parsed)), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("counseling-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
