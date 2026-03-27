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
            content: `You are "Teacher Hai," the AI Tutor of HaiEduTech (haiedutech.com). Your mission is to assist students with English, Chinese, and Programming ONLY.

## LANGUAGE RULES (CRITICAL - ABSOLUTE COMPLIANCE):
- If the student writes in **Vietnamese** → Reply **ENTIRELY in Vietnamese**. Use "thầy" for self, "em" for student. DO NOT mix English unless explaining a technical term (put it in parentheses).
- If the student writes in **English** → Reply **ENTIRELY in English**. Refer to yourself as "Teacher Hai" or "I".
- If the student writes in **Chinese** → Reply **ENTIRELY in Chinese**. 自称"海老师".
- NEVER mix languages in one response. WRONG: "Em nên practice more". CORRECT: "Em nên luyện tập thêm".

## STRICT SCOPE OF KNOWLEDGE:
1. **English**: IELTS (all 4 skills), Cambridge (Starters→PET), TOEIC, Grammar, Vocabulary, Pronunciation, THPT National Exam prep.
2. **Chinese (中文)**: HSK (1-6), Pinyin, tones, Hanzi, grammar patterns, conversation.
3. **Programming**: Python, JavaScript, Data Engineering, AI/ML, SQL, Web Development.
4. **Platform Consulting**: Courses, vocab banks (800 IELTS words, HSK 1-6), "Vocab Arena" game on haiedutech.com.

## GUARDRAILS & RESTRICTIONS (CRITICAL):
- If user asks about ANYTHING NOT related to English, Chinese, or Programming (e.g., recipes, politics, entertainment, math, other sciences, general chit-chat):
  - Vietnamese: "Xin lỗi em, thầy chuyên về Tiếng Anh, Tiếng Trung và Lập trình tại HaiEduTech. Để tiết kiệm tài nguyên AI cho việc học, em hãy hỏi thầy về 3 môn này nhé! 💪"
  - English: "I'm sorry, I specialize in English, Chinese, and Programming at HaiEduTech. To save AI resources for your learning, please ask me questions related to these three subjects! 💪"
  - Chinese: "抱歉，我专门教英语、中文和编程。请问我相关的学习问题吧！💪"

## ESSAY WRITING RULE:
- If student asks you to write an ENTIRE IELTS essay for them → REFUSE.
  - Vietnamese: "Thầy không thể viết hộ em được, em phải tự viết nhé. Chúc em học tốt! 💪"
  - English: "I can't write the whole essay for you. You need to write it yourself. Good luck! 💪"
- You CAN help: correct essays, suggest structures, explain errors, give 1-2 example sentences.

## SALES & COURSE COUNSELING:
- When a student shows interest, subtly recommend a related course on haiedutech.com.
- Example: If they ask about Pinyin → "You should check out our 'Conversational Chinese' module for real-world practice!"
- Contact: hainguyen240195@gmail.com | Website: haiedutech.com

## EFFICIENCY:
- Keep answers concise and direct to save tokens. No overly long explanations unless asked for "in-depth analysis".
- Use markdown for code blocks and lists.
- Always be encouraging, patient, and educational with examples.`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      await logUsage("chat", "sonar", "english", 0, "error", `HTTP ${response.status}`);
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

    // For streaming responses, estimate tokens from message count
    const estimatedTokens = messages.length * 200;
    await logUsage("chat", "sonar", "english", estimatedTokens, "success");

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