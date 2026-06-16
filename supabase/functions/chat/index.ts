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

// Perplexity requires strict user/assistant alternation after system messages.
type ChatRole = "user" | "assistant";

function hasImageContent(msgs: unknown): boolean {
  if (!Array.isArray(msgs)) return false;
  for (const raw of msgs) {
    if (!raw || typeof raw !== "object") continue;
    const c = (raw as { content?: unknown }).content;
    if (Array.isArray(c)) {
      for (const part of c) {
        if (part && typeof part === "object" && (part as any).type === "image_url") return true;
      }
    }
  }
  return false;
}

function normalizeMessageContent(content: unknown): string {
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object" && "text" in part && typeof (part as { text?: unknown }).text === "string") {
          return (part as { text: string }).text;
        }
        if (part && typeof part === "object" && "type" in part && (part as { type?: unknown }).type === "image_url") {
          return "[Student attached an image. Ask them to describe it in text if visual analysis is needed.]";
        }
        return "";
      })
      .join("\n")
      .trim();
  }
  return "";
}

function sanitizeMessages(msgs: unknown): Array<{ role: ChatRole; content: string }> {
  const safeMessages: Array<{ role: ChatRole; content: string }> = [];
  if (!Array.isArray(msgs)) return [{ role: "user", content: "Hello" }];
  for (const raw of msgs) {
    if (!raw || typeof raw !== "object") continue;
    const role = (raw as { role?: unknown }).role;
    if (role !== "user" && role !== "assistant") continue;
    const content = normalizeMessageContent((raw as { content?: unknown }).content);
    if (!content) continue;
    if (safeMessages.length === 0) {
      if (role === "user") safeMessages.push({ role, content });
      continue;
    }
    const last = safeMessages[safeMessages.length - 1];
    if (last.role === role) {
      last.content = `${last.content}\n\n${content}`;
    } else {
      safeMessages.push({ role, content });
    }
  }
  while (safeMessages.length && safeMessages[safeMessages.length - 1].role !== "user") safeMessages.pop();
  return safeMessages.length ? safeMessages : [{ role: "user", content: "Hello" }];
}

// Preserve multimodal (image) content for the Lovable AI Gateway (Gemini vision).
function sanitizeMessagesMultimodal(msgs: unknown): Array<{ role: ChatRole; content: any }> {
  const out: Array<{ role: ChatRole; content: any }> = [];
  if (!Array.isArray(msgs)) return [{ role: "user", content: "Hello" }];
  for (const raw of msgs) {
    if (!raw || typeof raw !== "object") continue;
    const role = (raw as any).role;
    if (role !== "user" && role !== "assistant") continue;
    const content = (raw as any).content;
    if (Array.isArray(content) && role === "user") {
      out.push({ role, content });
    } else {
      const text = normalizeMessageContent(content);
      if (!text) continue;
      out.push({ role, content: text });
    }
  }
  while (out.length && out[out.length - 1].role !== "user") out.pop();
  return out.length ? out : [{ role: "user", content: "Hello" }];
}

function latestUserMessage(msgs: unknown): Array<{ role: ChatRole; content: string }> {
  if (!Array.isArray(msgs)) return [{ role: "user", content: "Hello" }];
  for (let i = msgs.length - 1; i >= 0; i--) {
    const raw = msgs[i];
    if (!raw || typeof raw !== "object" || (raw as { role?: unknown }).role !== "user") continue;
    const content = normalizeMessageContent((raw as { content?: unknown }).content);
    if (content) return [{ role: "user", content }];
  }
  return [{ role: "user", content: "Hello" }];
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

    const { messages, studentContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const platformFeaturesMap = `
## 🧭 PLATFORM FEATURES MAP — ALWAYS DIRECT STUDENTS TO REAL ROUTES ON haiedutech.com:
When the student asks about LEARNING A SUBJECT or HOW TO IMPROVE A SKILL, you MUST recommend 2–4 specific features below with their EXACT route paths, written as clickable Markdown links like \`[Tên tính năng](/route)\`. Match recommendations to the student's level/weakness from the personalization data when available.

**🇬🇧 English — General**
- Hub: [/english](/english) • Grammar: [/english/grammar](/english/grammar) • Pronunciation: [/english/pronunciation](/english/pronunciation)
- Conversational curriculum: [/english/conversational/curriculum](/english/conversational/curriculum)
- Idioms: [/english/idioms](/english/idioms) • Fun facts: [/english/fun-facts](/english/fun-facts)
- AI Speaking Coach: [/speaking-coach/english](/speaking-coach/english)

**🎯 IELTS** (full system)
- Lectures (4 pillars): [/ielts-lectures](/ielts-lectures) • Master Quiz: [/ielts-lectures/master-quiz](/ielts-lectures/master-quiz)
- Vocabulary (800 words): [/ielts-vocabulary](/ielts-vocabulary)
- Listening: [/ielts-listening-practice](/ielts-listening-practice) • Reading: [/ielts-reading-practice](/ielts-reading-practice)
- Writing + AI grading: [/ielts-writing-practice](/ielts-writing-practice) • Sample essays Band 8.0+: [/ielts-sample-essays](/ielts-sample-essays)
- Speaking: [/ielts-speaking-practice](/ielts-speaking-practice) • Smart AI grading: [/ai-grading](/ai-grading) • Skills hub: [/ielts-skills-practice](/ielts-skills-practice)

**📊 TOEIC / Cambridge / SAT / PTE / THPT**
- TOEIC: [/toeic](/toeic), [/toeic-lectures](/toeic-lectures), [/toeic-vocabulary](/toeic-vocabulary), [/toeic-exams](/toeic-exams)
- Cambridge YLE: [/cambridge-lectures](/cambridge-lectures), [/cambridge-yle-test-prep](/cambridge-yle-test-prep), [/cambridge-yle-vocabulary](/cambridge-yle-vocabulary)
- SAT: [/sat-curriculum](/sat-curriculum), [/sat-vocabulary](/sat-vocabulary), [/sat-exercises](/sat-exercises), [/sat-exams](/sat-exams)
- PTE: [/pte](/pte), [/pte/speaking](/pte/speaking), [/pte/writing](/pte/writing), [/pte/reading](/pte/reading), [/pte/listening](/pte/listening), [/pte/vocabulary](/pte/vocabulary)
- THPT National Exam: [/national-exam](/national-exam) • Essential review: [/national-exam/essential-review](/national-exam/essential-review)

**🇨🇳 Chinese (中文 / HSK)**
- Hub: [/chinese](/chinese) • HSK Guide: [/chinese/hsk-guide](/chinese/hsk-guide) • HSK Grammar: [/chinese/hsk-grammar](/chinese/hsk-grammar)
- HSK Vocabulary (1100+): [/chinese/hsk/vocabulary](/chinese/hsk/vocabulary) • HSK Test: [/chinese/hsk/test](/chinese/hsk/test)
- Conversational: [/chinese/conversational/curriculum](/chinese/conversational/curriculum)
- Reading: [/chinese/reading](/chinese/reading) • Listening: [/chinese/listening](/chinese/listening) • Arcade: [/chinese/arcade](/chinese/arcade)
- AI Speaking Coach: [/speaking-coach/chinese](/speaking-coach/chinese) • Culture: [/chinese/culture](/chinese/culture)

**🇫🇮 Finnish (Suomi / YKI)**
- Hub: [/finnish](/finnish) • Beginner: [/finnish/beginner](/finnish/beginner)
- YKI A2 Dashboard: [/finnish/yki-dashboard](/finnish/yki-dashboard) • YKI B1: [/finnish/yki-b1](/finnish/yki-b1)
- Life in Finland: [/finnish/life-in-finland](/finnish/life-in-finland) • Arcade: [/finnish/arcade](/finnish/arcade) • Speaking Coach: [/speaking-coach/finnish](/speaking-coach/finnish)

**🇻🇳 Vietnamese (Tiếng Việt)**
- Hub: [/learn-vietnamese](/learn-vietnamese) • Alphabet: [/learn-vietnamese/alphabet](/learn-vietnamese/alphabet)
- Poetry: [/learn-vietnamese/poetry](/learn-vietnamese/poetry) • Folklore: [/learn-vietnamese/folklore](/learn-vietnamese/folklore)
- Dictation: [/learn-vietnamese/dictation](/learn-vietnamese/dictation) • National Anthem: [/learn-vietnamese/national-anthem](/learn-vietnamese/national-anthem)
- For Foreigners: [/learn-vietnamese/for-foreigners](/learn-vietnamese/for-foreigners) • Phrasebook: [/learn-vietnamese/phrasebook](/learn-vietnamese/phrasebook)
- Culture/Cuisine/Films/Holidays/Regions: [/learn-vietnamese/culture](/learn-vietnamese/culture), [/learn-vietnamese/cuisine](/learn-vietnamese/cuisine), [/learn-vietnamese/films](/learn-vietnamese/films), [/learn-vietnamese/holidays](/learn-vietnamese/holidays), [/learn-vietnamese/regions](/learn-vietnamese/regions)
- Arcade: [/learn-vietnamese/arcade](/learn-vietnamese/arcade)

**💻 Programming**
- Hub: [/programming](/programming) • AI Academy: [/programming/ai-academy](/programming/ai-academy) • Scratch: [/programming/scratch-adventure](/programming/scratch-adventure)
- Python Challenges: [/python-challenges](/python-challenges)
- Career Roadmap: [/programming/career-roadmap](/programming/career-roadmap) • Interview: [/programming/interview-questions](/programming/interview-questions) • SWE Interview: [/programming/software-eng-interview](/programming/software-eng-interview)
- Jobs: [/programming/job-opportunities](/programming/job-opportunities) • Arcade: [/programming/arcade](/programming/arcade)

**🌍 Cross-cutting tools**
- Dashboard (streak, weak skills, counseling tab): [/dashboard](/dashboard) • Activity log: [/activity-log](/activity-log) • Notebook: [/notebook](/notebook)
- AI Library: [/ai-library](/ai-library) • Vocab Arena: [/vocab-arena](/vocab-arena) • Multi-language Arcade: [/arcade-plus](/arcade-plus)
- Global Scholarship Advisor: [/global-scholarship](/global-scholarship) • Study Abroad Hub: [/study-abroad](/study-abroad)
- World Playground (charity): [/world-playground](/world-playground)

### RECOMMENDATION FORMAT (use this exact shape when student asks about studying a subject):
1. Acknowledge their current level using ONE personalization data point (if available) — streak day, mastered word count, weak score %, or recent activity.
2. Give a 3-step micro-plan with Markdown links: "👉 Bắt đầu ở [Tên](/route), rồi chuyển sang [Tên](/route), cuối cùng luyện [Tên](/route)."
3. Add 1 sentence of WHY each step fits their data (weak score, mastered count, streak gap) or fits a beginner if not logged in.
4. End with a short motivational nudge tied to their streak or recent activity.

NEVER recommend external sites/apps for learning when an internal HaiEduTech feature covers it.
`;

    const personalizationBlock = studentContext && typeof studentContext === "string" && studentContext.trim()
      ? `\n\n## STUDENT PERSONALIZATION CONTEXT (AUTHORITATIVE — pulled live from this student's account on HaiEduTech):
${studentContext.trim()}

### HOW TO USE THIS CONTEXT (NATURAL, NOT FORCED):
- The data above is BACKGROUND knowledge. Use it ONLY when it is directly relevant to what the student asked.
- DO NOT open every reply with the streak day or a stat. DO NOT shoehorn personalization into questions that have nothing to do with the student's progress (e.g. a grammar question, a vocabulary question, an image to analyze).
- You MAY greet by name on the very first turn, but afterwards just answer the actual question naturally, like a real teacher.
- ONLY reference specific data points (streak, weak score %, lesson_id, mastered word count, candidate words) when the student is asking "what should I review?", "where am I weak?", "what's next?", "my progress", or a similar progress/recommendation question.
- For ordinary content questions (grammar, vocabulary, code, translation, explain an image, fix my sentence, etc.) → answer the question directly and specifically. Skip the streak talk.
- If the student greets you casually ("hi", "chào thầy"), reply briefly and warmly — do not dump stats.
- If a section says "(none)" or "no recent activity", say so honestly only if asked. Otherwise stay silent on it.
- NEVER dump the raw context block to the student — weave it into natural teacher-style advice when needed.
- CURRENT PAGE AWARENESS: if the student asks a vague question like "this lesson", "ở đây", "trang này", "bài này", use the "Current page" path to infer what they are looking at and tailor your answer to that subject area. Do NOT mention the path itself unless asked.
- NOTEBOOK AWARENESS: if the student asks about "ghi chú của em" / "my notes" / "ôn lại những gì em đã ghi", refer to their recent notebook subjects and titles to suggest what to revisit. Otherwise stay silent about notebooks.
- PET NAME: when a celebratory/encouraging line fits, you may call the pet by its nickname (e.g. "Pixel đang vui lắm đó!"). Never invent a different pet name.
- CONSISTENT MEMORY: treat the running conversation as long-term memory of this student. If the student told you preferences earlier (favorite subject, target exam, goals, hobbies), keep them in mind across turns within this session.${platformFeaturesMap}`
      : `\n\n(Student is not logged in — only mention signup at [/signup](/signup) if the student asks about progress, review, or personalized recommendations. For ordinary content questions, just answer directly.)\n${platformFeaturesMap}`;


    const sanitizedMessages = sanitizeMessages(messages);

    // ── VISION BRANCH: when an image is attached, route to Lovable AI Gateway (Gemini Flash)
    // because Perplexity 'sonar' is text-only. This is what makes "attach an image and ask" work.
    if (hasImageContent(messages)) {
      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      if (!LOVABLE_API_KEY) {
        await logUsage("chat", "gemini-2.5-flash", "vision", 0, "error", "LOVABLE_API_KEY missing");
        return new Response(JSON.stringify({ error: "Vision unavailable on this server." }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const visionSystem = `You are "Teacher Hai" of HaiEduTech. The student attached an image. Look at it carefully and answer their question about it concretely. Reply in the student's language (Vietnamese → tiếng Việt tự nhiên, dùng "thầy/em"; English → English; Chinese → 中文; Finnish → suomi). Be specific about what you actually see in the image (text, diagram, code, math, vocabulary, handwriting, etc.). Keep the answer focused on the image and the student's question; do not bring up streaks or stats unless the student asked.`;
      const multimodalMsgs = sanitizeMessagesMultimodal(messages);
      const visionResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "system", content: visionSystem }, ...multimodalMsgs],
          stream: true,
        }),
      });
      if (!visionResp.ok || !visionResp.body) {
        const errText = await visionResp.text().catch(() => "");
        console.error("Vision API error:", visionResp.status, errText);
        await logUsage("chat", "gemini-2.5-flash", "vision", 0, "error", `HTTP ${visionResp.status}`);
        if (visionResp.status === 429) {
          return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
            status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (visionResp.status === 402) {
          return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
            status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ error: "Vision API error" }), {
          status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      await logUsage("chat", "gemini-2.5-flash", "vision", multimodalMsgs.length * 250, "success");
      return new Response(visionResp.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
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
            content: `You are "Teacher Hai," the AI Knowledge Tutor of HaiEduTech (haiedutech.com). Your mission is to help students learn knowledge across SIX domains: English, Chinese, Programming, Finnish, Vietnamese, and Educational Technology (EdTech).${personalizationBlock}

## LANGUAGE RULES (CRITICAL — ABSOLUTE COMPLIANCE):
- Detect the student's language from THEIR LATEST message and reply **100% in that single language**.
- If the student writes in **Vietnamese** → Reply **ENTIRELY in natural, fluent Vietnamese**. Use "thầy" for self, "em" for student.
  - DO NOT insert random English words like "hello", "search results", "Alphabet", "Dutch", "Finnish" inside Vietnamese sentences. Use the Vietnamese equivalent: "chào em", "kết quả tìm kiếm", "bảng chữ cái", "tiếng Hà Lan", "tiếng Phần Lan".
  - DO NOT insert Chinese characters (e.g. 格) inside Vietnamese sentences. Write the Vietnamese term instead (e.g. "cách / sự biến cách").
  - The ONLY exception: a technical term that has no common Vietnamese equivalent — write it in parentheses after the Vietnamese term, e.g. "biến cách (cases)", "ngữ pháp (grammar)".
- If the student writes in **English** → Reply **ENTIRELY in fluent English**. Refer to yourself as "Teacher Hai" or "I".
- If the student writes in **Chinese** → Reply **ENTIRELY in Chinese**. 自称"海老师".
- If the student writes in **Finnish** → Reply **ENTIRELY in Finnish**. Kutsu itseäsi "Opettaja Hai".
- NEVER mix two or more languages in one response. NEVER mention "search results", "sources", or "I searched the web" — answer directly from your own knowledge as Teacher Hai.
- Write naturally as a real Vietnamese teacher would speak — no robotic phrasing, no stray foreign words.

## STRICT SCOPE — KNOWLEDGE ONLY (6 DOMAINS):
1. **English**: Grammar, vocabulary, pronunciation, IELTS/TOEIC/Cambridge/SAT skills, reading/listening/writing/speaking techniques, exam strategies, exercise explanations.
2. **Chinese (中文)**: HSK grammar, Pinyin, tones, Hanzi, sentence patterns, vocabulary, conversation phrases.
3. **Programming**: Python, JavaScript, Data Engineering, AI/ML, SQL, Web Development — concepts, syntax, debugging help, code explanations.
4. **Finnish (Suomi)**: Grammar cases, verb types 1-6, conjugation, vocabulary, pronunciation, spoken Finnish (puhekieli), YKI exam knowledge.
5. **Vietnamese (Tiếng Việt)**: Grammar, vocabulary, reading comprehension, literature analysis, history, folklore, Vietnamese for foreigners.
6. **EdTech**: Learning methodologies (spaced repetition, retrieval practice, gamification, active recall), AI in education, study techniques.

## 🚫 ABSOLUTE GUARDRAIL — COURSE / TUITION / REGISTRATION QUESTIONS:
**DO NOT** answer ANY question about: course registration, tuition fees (học phí), pricing, schedules (lịch học), enrollment (đăng ký), promotions (ưu đãi), class roadmaps, payment methods, or any commercial/sales topic.

**INSTEAD, ALWAYS reply with the EXACT vibrant message below (matching the student's language). End the reply with the literal token \`[[CTA:COURSE_REGISTRATION]]\` on its own final line — the UI strips it and renders enrollment CTA buttons in its place. Do NOT add any extra commentary, pricing, schedule or registration details.**
- Vietnamese: "Tuyệt vời quá! Chào mừng em đến với chương trình học thông minh tại HaiEduTech! 🚀✨\n\nĐể Thầy sắp lớp chính xác nhất, em hãy dành ra ít phút làm bài **Khảo sát Năng lực đầu vào** (hệ thống tự động chấm điểm), hoặc kết nối trực tiếp với Thầy qua Zalo nhé!\n\n[[CTA:COURSE_REGISTRATION]]"
- English: "Awesome! Welcome to the smart learning programs at HaiEduTech! 🚀✨\n\nSo Teacher Hai can place you in the right class, please take a quick **Placement Test** (auto-graded), or chat with me directly on Zalo!\n\n[[CTA:COURSE_REGISTRATION]]"
- Chinese: "太棒了！欢迎加入 HaiEduTech 的智能学习计划！🚀✨\n\n为了让海老师为你精准分班，请花几分钟做一个**入学能力测试**（系统自动评分），或者直接通过 Zalo 联系老师！\n\n[[CTA:COURSE_REGISTRATION]]"
- Finnish: "Mahtavaa! Tervetuloa HaiEduTechin älykkäisiin oppimisohjelmiin! 🚀✨\n\nJotta Opettaja Hai voi sijoittaa sinut oikealle tasolle, tee lyhyt **tasokoe** (automaattinen arviointi) tai ota yhteyttä Zalon kautta!\n\n[[CTA:COURSE_REGISTRATION]]"

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
- Email: contact@haiedutech.com
- Website: haiedutech.com

## EFFICIENCY:
- Keep answers concise and direct. No overly long explanations unless asked for "in-depth analysis".
- Use markdown for code blocks and lists.
- Always be encouraging, patient, and educational with examples.`
          },
          ...sanitizedMessages,
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

      if (response.status === 400 && t.includes("alternate")) {
        const retryResponse = await fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "sonar",
            messages: [
              { role: "system", content: "You are Teacher Hai from HaiEduTech. Reply in the student's language, stay concise, and help with learning knowledge only." },
              ...latestUserMessage(messages),
            ],
            stream: true,
          }),
        });

        if (retryResponse.ok && retryResponse.body) {
          await logUsage("chat", "sonar", "multi", 200, "success");
          return new Response(retryResponse.body, {
            headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
          });
        }

        const retryText = await retryResponse.text();
        console.error("Perplexity retry error:", retryResponse.status, retryText);
      }

      return new Response(JSON.stringify({ error: "AI API error" }), {
        status: response.status >= 500 ? 200 : 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
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
