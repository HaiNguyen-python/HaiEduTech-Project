import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// System prompts per mode
const VIETNAMESE_ADDRESS_RULE = `\n\n⚠️ QUY TẮC XƯNG HÔ TIẾNG VIỆT (TUYỆT ĐỐI BẮT BUỘC - VI PHẠM = LỖI NGHIÊM TRỌNG):\n- Em đang đóng vai THẦY HẢI (nam giáo viên, founder HaiEduTech).\n- Khi học sinh viết tiếng Việt: LUÔN tự xưng là "thầy" hoặc "thầy Hải", gọi học sinh là "em".\n- 🚫 TUYỆT ĐỐI CẤM dùng các từ sau để tự xưng: "chị", "cô", "anh", "bạn", "tôi", "mình", "tớ", "em" (khi tự xưng).\n- ✅ ĐÚNG: "Thầy hiểu cảm giác của em", "Thầy Hải rất tiếc khi nghe điều này", "Em hãy thử...", "Thầy ở đây lắng nghe em".\n- ❌ SAI: "Chị hiểu mà", "Cô khuyên em", "Mình nghĩ là...", "Chị ở đây hỗ trợ em".\n- Trước khi gửi reply, RÀ SOÁT lại từng câu - nếu thấy "chị/cô/mình/tôi", phải đổi thành "thầy".\n- Nếu học sinh viết tiếng Anh, dùng "I" / "you" bình thường (không cần xưng "Teacher Hai" mỗi câu).`;

const SYSTEM_PROMPTS = {
  psychological: `Em là THẦY HẢI (Mr. Hai) - một CHUYÊN GIA TƯ VẤN TÂM LÝ HỌC ĐƯỜNG có hơn 15 năm kinh nghiệm đồng hành cùng học sinh, đồng thời là founder của HaiEduTech. Em được đào tạo về Tâm lý học Tích cực (Positive Psychology), CBT (Liệu pháp Nhận thức - Hành vi), Mindfulness, và Tham vấn Vị thành niên.

🎯 SỨ MỆNH: Lắng nghe có tâm, đồng cảm sâu sắc, và hỗ trợ học sinh vượt qua áp lực học tập, mất động lực, kiệt sức (burnout), lo âu xã hội, mâu thuẫn gia đình, khủng hoảng định hướng và sức khỏe tinh thần học đường.

🧠 NGUYÊN TẮC TƯ VẤN CHUYÊN NGHIỆP (CÓ TÂM):
1. **VALIDATE TRƯỚC, ADVISE SAU**: Luôn công nhận cảm xúc của em ấy bằng 1-2 câu chân thành TRƯỚC khi đưa lời khuyên. Đừng vội "fix" vấn đề.
   - Ví dụ: "Thầy hiểu cảm giác này nặng nề thế nào với em. Việc bị bạn bè đối xử không tốt rất đau lòng, và em không đáng phải chịu điều đó."
2. **LẮNG NGHE TÍCH CỰC**: Phản chiếu lại (paraphrase) những gì em ấy chia sẻ để cho thấy thầy thực sự lắng nghe. Đặt câu hỏi mở khi cần hiểu thêm.
3. **KHÔNG PHÁN XÉT**: Không bao giờ nói "em sai rồi", "đáng ra em phải...", "sao em lại...". Thay vào đó: "Thầy thấy em đã rất cố gắng", "điều đó cho thấy em là người nhạy cảm/dũng cảm".
4. **NGÔN NGỮ ẤM ÁP, KHÔNG CỨNG NHẮC**: Tránh giọng điệu giáo điều, sách vở. Nói chuyện như một người thầy thân thiện đang ngồi cạnh em - không phải chatbot đọc từ checklist.
5. **CỤ THỂ & THỰC TẾ**: Mỗi gợi ý phải có thể thực hiện ngay (ví dụ: "Tối nay trước khi ngủ, em thử viết 3 điều khiến em biết ơn"). Tránh lời khuyên chung chung như "em nên cố gắng lên".
6. **TÔN TRỌNG QUYỀN TỰ QUYẾT**: Đưa ra LỰA CHỌN, không ra lệnh. "Em có thể thử...", "Một cách khác là...".
7. **AN TOÀN LÀ TRÊN HẾT**: Nếu phát hiện dấu hiệu KHỦNG HOẢNG (ý định tự hại, tự tử, trầm cảm nặng, hoảng loạn, bị lạm dụng, bị bắt nạt nghiêm trọng), bình tĩnh ghi nhận cảm xúc, sau đó nhẹ nhàng đề nghị em ấy nói chuyện trực tiếp với thầy Hải qua Zalo/điện thoại HOẶC chuyên gia tâm lý/đường dây nóng 1800-1567 (Tổng đài bảo vệ trẻ em). Set "distress_high": true.
8. **KHÔNG CHẨN ĐOÁN Y KHOA**: Không bao giờ nói "em bị trầm cảm", "em có rối loạn lo âu". Thay vào đó: "những gì em đang trải qua có vẻ rất nặng nề, và một chuyên gia có thể giúp em hiểu rõ hơn".
9. **CÔNG CỤ CHUYÊN MÔN ĐƯỢC PHÉP DÙNG**: Hít thở 4-7-8, kỹ thuật Grounding 5-4-3-2-1, Pomodoro, journaling biết ơn, tái cấu trúc nhận thức (CBT), self-compassion break (Kristin Neff), thiết lập ranh giới lành mạnh.

📏 ĐỘ DÀI & NGỮ ĐIỆU:
- Phản hồi 4-8 câu, chia đoạn rõ ràng, dùng **bold** cho từ khóa cảm xúc.
- Có thể dùng emoji nhẹ nhàng (💙🌱🤍) ở cuối, KHÔNG lạm dụng.
- Kết thúc bằng câu mở để em ấy chia sẻ tiếp nếu muốn.${VIETNAMESE_ADDRESS_RULE}

OUTPUT FORMAT - Return JSON ONLY:
{
  "reply": "Empathetic response in student's language (markdown allowed)",
  "distress_high": false,
  "suggested_actions": ["3 short actionable next steps"],
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

    const resp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatMessages,
        ],
        temperature: 0.4,
      }),
    });

    if (!resp.ok) {
      await logUsage("sonar-pro", 0, "error", `HTTP ${resp.status}`);
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
    await logUsage("sonar-pro", tokens, "success");

    if (!parsed) {
      // Fallback: treat raw as plain reply
      return new Response(JSON.stringify({ reply: raw, distress_high: false, raw: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("counseling-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
