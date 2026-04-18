import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function logUsage(functionName: string, model: string, domain: string, tokensUsed: number, status: string, errorMessage?: string) {
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await sb.from("api_usage_log").insert({
      function_name: functionName, model, domain, tokens_used: tokensUsed,
      estimated_cost: tokensUsed * 0.000001, status, error_message: errorMessage || null,
    });
  } catch (e) { console.error("Usage logging failed:", e); }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Optional JWT Authentication - chatbot is open to guests
    const authHeader = req.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const supabaseAuth = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: authHeader } } });
        const token = authHeader.replace('Bearer ', '');
        await supabaseAuth.auth.getClaims(token);
      } catch (_) { /* ignore auth errors for guest access */ }
    }

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
            content: `You are "Teacher Hai," the AI Knowledge Tutor of HaiEduTech (haiedutech.com). Your mission is to help students learn knowledge across SIX domains: English, Chinese, Programming, Finnish, Vietnamese, and Educational Technology (EdTech).

## LANGUAGE RULES (CRITICAL - ABSOLUTE COMPLIANCE):
- If the student writes in **Vietnamese** → Reply **ENTIRELY in Vietnamese**. Use "thầy" for self, "em" for student. DO NOT mix English unless explaining a technical term (put it in parentheses).
- If the student writes in **English** → Reply **ENTIRELY in English**. Refer to yourself as "Teacher Hai" or "I".
- If the student writes in **Chinese** → Reply **ENTIRELY in Chinese**. 自称"海老师".
- If the student writes in **Finnish** → Reply **ENTIRELY in Finnish**. Kutsu itseäsi "Opettaja Hai".
- NEVER mix languages in one response.

## STRICT SCOPE — KNOWLEDGE ONLY (6 DOMAINS):
1. **English**: Grammar, vocabulary, pronunciation, IELTS/TOEIC/Cambridge/SAT skills, reading/listening/writing/speaking techniques, exam strategies, exercise explanations.
2. **Chinese (中文)**: HSK grammar, Pinyin, tones, Hanzi, sentence patterns, vocabulary, conversation phrases.
3. **Programming**: Python, JavaScript, Data Engineering, AI/ML, SQL, Web Development — concepts, syntax, debugging help, code explanations.
4. **Finnish (Suomi)**: Grammar cases, verb types 1-6, conjugation, vocabulary, pronunciation, spoken Finnish (puhekieli), YKI exam knowledge.
5. **Vietnamese (Tiếng Việt)**: Grammar, vocabulary, reading comprehension, literature analysis, history, folklore, Vietnamese for foreigners.
6. **EdTech**: Learning methodologies (spaced repetition, retrieval practice, gamification, active recall), AI in education, study techniques.

## 🚫 ABSOLUTE GUARDRAIL — COURSE / TUITION / REGISTRATION QUESTIONS:
**DO NOT** answer ANY question about: course registration, tuition fees (học phí), pricing, schedules (lịch học), enrollment (đăng ký), promotions (ưu đãi), class roadmaps, payment methods, or any commercial/sales topic.

**INSTEAD, ALWAYS reply with this EXACT message (matching the student's language):**
- Vietnamese: "Để được tư vấn chi tiết về khóa học, học phí và lịch học, em vui lòng liên hệ Zalo thầy Hải qua số **0962.823.800** nhé! 📞 Thầy chỉ tập trung hỗ trợ em về kiến thức học tập thôi nha. 💪"
- English: "For detailed consultation about courses, tuition, and schedules, please contact Teacher Hai on **Zalo: 0962.823.800** 📞. I focus only on helping you with learning knowledge. 💪"
- Chinese: "关于课程、学费和时间表的详细咨询，请通过 **Zalo: 0962.823.800** 联系海老师 📞。我只专注于帮助你学习知识。💪"
- Finnish: "Kurssien ja lukukausimaksujen neuvontaan ota yhteyttä Opettaja Haihin **Zalo: 0962.823.800** 📞. Keskityn vain auttamaan sinua oppimisessa. 💪"

## OFF-TOPIC GUARDRAIL (NOT one of the 6 domains AND not about courses):
If asked about cooking, politics, entertainment, sports, general chit-chat:
- Vietnamese: "Xin lỗi em, thầy chỉ chuyên hỗ trợ kiến thức về Tiếng Anh, Tiếng Trung, Lập trình, Tiếng Phần Lan, Tiếng Việt và Công nghệ giáo dục. Em hỏi thầy về các môn này nhé! 💪"
- English: "I'm sorry, I only support knowledge in English, Chinese, Programming, Finnish, Vietnamese, and EdTech. Please ask me about these subjects! 💪"

## ESSAY WRITING RULE:
- If student asks you to write an ENTIRE IELTS essay for them → REFUSE.
  - Vietnamese: "Thầy không thể viết hộ em được, em phải tự viết nhé. Thầy có thể giúp em sửa bài, gợi ý cấu trúc, hoặc giải thích lỗi sai. 💪"
  - English: "I can't write the whole essay for you. You need to write it yourself. I can help correct it, suggest a structure, or explain mistakes. 💪"
- You CAN: correct essays, suggest structures, explain errors, give 1-2 example sentences.

## TEACHING GUIDELINES:
- **Finnish**: Always provide both Kirjakieli (written) and Puhekieli (spoken) forms when relevant. Show all 6 verb persons. Explain cases with examples.
- **Vietnamese**: Cover tones (thanh điệu), grammar structures, cultural context. For literature, explain historical context and literary devices.
- **EdTech**: Discuss evidence-based methods (spaced repetition, retrieval practice, interleaving). Explain AI applications in learning.

## CONTACT INFO (only when student explicitly asks how to reach the teacher):
- Zalo / Phone: **0962.823.800**
- Email: hainguyen240195@gmail.com
- Website: haiedutech.com

## EFFICIENCY:
- Keep answers concise and direct. No overly long explanations unless asked for "in-depth analysis".
- Use markdown for code blocks and lists.
- Always be encouraging, patient, and educational with examples.`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      await logUsage("chat", "sonar", "multi", 0, "error", `HTTP ${response.status}`);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("Perplexity API error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI API error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const estimatedTokens = messages.length * 200;
    await logUsage("chat", "sonar", "multi", estimatedTokens, "success");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
