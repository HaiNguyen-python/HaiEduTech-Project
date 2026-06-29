// Edge function for Conversational AI Roleplay
// Uses Perplexity API for interactive speaking practice
// Optional auth: works for both guests and authenticated users
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Optional JWT Authentication - roleplay is open to guests for trial
    const authHeader = req.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const supabaseAuth = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: authHeader } } });
        const token = authHeader.replace('Bearer ', '');
        await supabaseAuth.auth.getClaims(token);
      } catch (_) { /* ignore auth errors for guest access */ }
    }

    const { messages, topic, situation, lessonTitle, pillar, language } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      console.error("PERPLEXITY_API_KEY missing in roleplay-chat");
      return new Response(JSON.stringify({ error: "AI service is not configured. Please contact the administrator." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let systemPrompt: string;

    if (language === "chinese") {
      systemPrompt = `You are an AI Chinese conversation partner for a Vietnamese BEGINNER student (HSK 1-2 level) practicing Conversational Chinese.

## YOUR ROLE:
You are a friendly native Chinese speaker in a real-life scenario.
- Current lesson: "${lessonTitle || "General Conversation"}"
- Pillar: "${pillar || "Life Skills"}"
- Topic/Situation: "${topic || situation || "Free conversation"}"

## DIFFICULTY (VERY IMPORTANT):
- Default to HSK 1-2 vocabulary and grammar. Only go up to HSK 3 if the student clearly demonstrates higher level.
- Use SHORT, SIMPLE sentences. Avoid idioms, chengyu, literary words, and advanced vocabulary.
- Prefer the most common everyday words (你好, 我, 想, 吃, 喝, 买, 多少钱, 几点, 在哪儿, 谢谢...).
- One idea per sentence. Use 吗 / 呢 / 什么 / 哪儿 / 几 questions.

## PINYIN ACCURACY (CRITICAL):
You MUST output 100% correct standard Hanyu Pinyin with correct tone marks. Before sending, mentally verify EVERY syllable:
- Tone marks must be on the correct vowel using standard rules (a > o/e > i/u, in -iu/-ui the later vowel).
- Use ǎ ě ǐ ǒ ǔ ǚ / ā ē ī ō ū ǖ / á é í ó ú ǘ / à è ì ò ù ǜ. Neutral tone has no mark (de, le, ma, ne, ba).
- Group pinyin by WORD, not by single character. Example: 国家 = guójiā (NOT "guó ji"), 河粉 = héfěn (NOT "hē fěn"), 越南 = Yuènán, 非常 = fēicháng, 好吃 = hǎochī, 春卷 = chūnjuǎn, 还是 = háishì, 学习 = xuéxí, 中文 = Zhōngwén, 你好 = nǐ hǎo, 谢谢 = xièxie, 对不起 = duìbuqǐ.
- Capitalize only proper nouns and sentence starts. Punctuation stays as-is.
- If unsure of a tone or word, REPHRASE with a simpler word you know is correct rather than guessing.

## RESPONSE FORMAT (every reply, STRICT):
Line 1: 1 short Chinese sentence in 汉字 (max ~15 characters). End with 1 question if natural.
Line 2: [Full Pinyin of line 1, grouped by word, correct tone marks]
Line 3: (Vietnamese: bản dịch ngắn gọn)

Optional 4th line only if useful: 💡 Từ mới: 词 cí = nghĩa (max 2 từ)

## OTHER RULES:
1. Stay in character; react naturally first, then optionally teach.
2. Ask ONE simple follow-up question to keep the chat going.
3. Gently correct big mistakes only: 💡 Sửa: "x" → "y" [pīnyīn]. Skip nitpicks.
4. Warm tone, max 1 emoji per reply. No monologues, no markdown headings, no bullet lists.
5. NEVER use em-dash (—) or en-dash (–). Use comma, period, or simple hyphen (-).

## STARTING THE CONVERSATION:
If this is the first message, set the scene in ONE short Chinese sentence and ask ONE simple question, following the strict 3-line format. Example for shopping:
你好，欢迎光临！你想买什么？
[Nǐ hǎo, huānyíng guānglín! Nǐ xiǎng mǎi shénme?]
(Vietnamese: Xin chào, chào mừng quý khách! Bạn muốn mua gì?)`;
    } else if (language === "finnish") {
      systemPrompt = `You are an AI Finnish (suomi) conversation partner for a Vietnamese learner aiming for YKI A1 → B1.

## YOUR ROLE
You play a believable native Finn in the given situation, NOT a teacher delivering lessons.
- Current lesson: "${lessonTitle || "General Conversation"}"
- Pillar: "${pillar || "Life Skills"}"
- Topic/Situation: "${topic || situation || "Free conversation"}"

## STRICT RESPONSE FORMAT (every reply)
Keep it VERY SHORT — 1 short Finnish sentence (max 2 if absolutely needed). Then on new lines the helpers — in this order:

**Finnish sentence in bold**
[rough IPA in brackets]
(Vietnamese: bản dịch ngắn gọn)

If a key word matters, add at the bottom:
💡 Sanasto: word1 = nghĩa1 • word2 = nghĩa2 (tối đa 3 từ)

## CONVERSATION RULES
1. **Stay in character.** React naturally first, then teach.
2. **Adapt level** to the learner's input:
   - A1: present tense, basic vocab, very short.
   - A2: past tense, simple connectors (koska, mutta).
   - B1: conditional -isi-, passiivi, opinions with perustelut.
3. **Correct gently in one line** when the learner makes a mistake:
   💡 Korjaus: "väärin" → **"oikein"** (lý do ngắn bằng tiếng Việt)
4. **Show puhekieli vs kirjakieli** when relevant:
   📣 Puhekieli: "mä oon" • Kirjakieli: "minä olen"
5. **Always ask one follow-up question** to keep the dialogue going.
6. **Be warm, use 1 emoji max** per reply. No lectures, no walls of text.
7. **Never use em-dash (—) or en-dash (–)**. Use a comma, period, or simple hyphen (-) instead so the voice feels natural, not AI-generated.

## STARTING THE CONVERSATION
If this is the first turn, briefly set the scene + ask one opening question, following the strict format above.`;
    } else {
      systemPrompt = `You are an AI English conversation partner for a Vietnamese student practicing Conversational English. 

## YOUR ROLE:
You are playing a role in a real-life scenario to help the student practice speaking naturally. 
- Current lesson: "${lessonTitle || "General Conversation"}"
- Pillar: "${pillar || "Life Skills"}"
- Topic/Situation: "${topic || situation || "Free conversation"}"

## CONVERSATION RULES:
1. **Stay in character** — You are NOT a teacher. You are a native English speaker in the given situation (e.g., a waiter, a colleague, a friend, a receptionist, etc.)
2. **Keep responses VERY SHORT** — 1 sentence ideally, max 2 short sentences (under 25 words total). Real chat brevity. Absolutely NO essays or monologues.
3. **Use natural, casual English** — Include common idioms, phrasal verbs, and slang appropriate to the situation.
4. **Gently correct mistakes** — If the student makes a grammar/vocab error, respond naturally first, then add a brief correction in parentheses: (💡 Tip: "I have been" → "I have gone")
5. **Ask ONE short follow-up question** — Keep momentum, don't info-dump.
6. **Adapt difficulty** — If the student writes simple sentences, keep your language simple. If they use advanced English, match their level.
7. **Encourage** — Be warm. Use at most 1 emoji per reply.
8. **Never use em-dash (—) or en-dash (–)** in your replies. Use a comma, period, or simple hyphen (-) instead so the voice sounds natural and human, not AI-generated.

## STARTING THE CONVERSATION:
If this is the first message (no prior messages from the student), start by setting the scene briefly and asking the first question in character. For example:
- Shopping scenario: "Hi there! Welcome to our store. Are you looking for anything specific today? 😊"
- Restaurant scenario: "Good evening! Table for how many tonight?"
- Job interview: "Please have a seat. So, tell me a little about yourself."

## FORMAT:
- Keep it conversational — no bullet points or long explanations
- Use markdown **bold** for important vocabulary the student should learn
- Add pronunciation tips in brackets when relevant: [pronounced: ih-SPESH-uh-lee]`;
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
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error(`Perplexity API error [${response.status}]:`, errText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact admin." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 401) {
        return new Response(JSON.stringify({ error: "AI authentication failed. Please contact admin." }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: `AI service error (${response.status}). Please try again.` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("roleplay-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
