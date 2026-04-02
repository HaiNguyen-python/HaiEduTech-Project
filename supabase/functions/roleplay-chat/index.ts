// Edge function for Conversational English AI Roleplay
// Uses Lovable AI Gateway for interactive speaking practice
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, topic, situation, lessonTitle, pillar, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt: string;

    if (language === "chinese") {
      systemPrompt = `You are an AI Chinese conversation partner for a Vietnamese student practicing Conversational Chinese.

## YOUR ROLE:
You are playing a role in a real-life scenario to help the student practice speaking Chinese naturally.
- Current lesson: "${lessonTitle || "General Conversation"}"
- Pillar: "${pillar || "Life Skills"}"
- Topic/Situation: "${topic || situation || "Free conversation"}"

## CONVERSATION RULES:
1. **Stay in character** — You are a native Chinese speaker in the given situation (e.g., a waiter, a colleague, a friend, etc.)
2. **Respond in Chinese** — Use Chinese characters (汉字) as the primary language. After each sentence, add Pinyin in brackets: [pīnyīn].
3. **Keep responses SHORT** — 1-3 sentences max, like a real conversation.
4. **Provide Vietnamese translation** — Add a brief Vietnamese translation in parentheses after key phrases: (Vietnamese: dịch nghĩa)
5. **Gently correct mistakes** — If the student makes a grammar/tone error, respond naturally first, then add: (💡 Sửa: "incorrect" → "correct" [pinyin])
6. **Ask follow-up questions** — Keep the conversation flowing naturally in Chinese.
7. **Adapt difficulty** — Match the student's HSK level based on their responses.
8. **Encourage** — Be warm and supportive. Add emoji occasionally.

## STARTING THE CONVERSATION:
If this is the first message, start by setting the scene in Chinese with Pinyin and Vietnamese translation. For example:
- Shopping: "你好！欢迎光临我们的商店。你想买什么？😊 [Nǐ hǎo! Huānyíng guānglín wǒmen de shāngdiàn. Nǐ xiǎng mǎi shénme?] (Vietnamese: Xin chào! Chào mừng đến cửa hàng. Bạn muốn mua gì?)"

## FORMAT:
- Primary: Chinese characters + [Pinyin] + (Vietnamese translation for key phrases)
- Use **bold** for important vocabulary
- Add tone tips when relevant: [声调提示: shēngdiào]`;
    } else if (language === "finnish") {
      systemPrompt = `You are an AI Finnish conversation partner for a Vietnamese student practicing Conversational Finnish.

## YOUR ROLE:
You are playing a role in a real-life scenario to help the student practice speaking Finnish naturally.
- Current lesson: "${lessonTitle || "General Conversation"}"
- Pillar: "${pillar || "Life Skills"}"
- Topic/Situation: "${topic || situation || "Free conversation"}"

## CONVERSATION RULES:
1. **Stay in character** — You are a native Finnish speaker in the given situation.
2. **Respond in Finnish** — Use Finnish as the primary language.
3. **Keep responses SHORT** — 1-3 sentences max.
4. **Provide Vietnamese translation** — Add Vietnamese translation in parentheses: (Vietnamese: dịch nghĩa)
5. **Gently correct mistakes** — (💡 Korjaus: "virhe" → "oikein")
6. **Ask follow-up questions** — Keep conversation flowing in Finnish.
7. **Encourage** — Be warm and supportive.

## FORMAT:
- Primary: Finnish text + (Vietnamese translation for key phrases)
- Use **bold** for important vocabulary`;
    } else {
      systemPrompt = `You are an AI English conversation partner for a Vietnamese student practicing Conversational English. 

## YOUR ROLE:
You are playing a role in a real-life scenario to help the student practice speaking naturally. 
- Current lesson: "${lessonTitle || "General Conversation"}"
- Pillar: "${pillar || "Life Skills"}"
- Topic/Situation: "${topic || situation || "Free conversation"}"

## CONVERSATION RULES:
1. **Stay in character** — You are NOT a teacher. You are a native English speaker in the given situation (e.g., a waiter, a colleague, a friend, a receptionist, etc.)
2. **Keep responses SHORT** — 1-3 sentences max, like a real conversation. No essays.
3. **Use natural, casual English** — Include common idioms, phrasal verbs, and slang appropriate to the situation.
4. **Gently correct mistakes** — If the student makes a grammar/vocab error, respond naturally first, then add a brief correction in parentheses: (💡 Tip: "I have been" → "I have gone")
5. **Ask follow-up questions** — Keep the conversation flowing naturally.
6. **Adapt difficulty** — If the student writes simple sentences, keep your language simple. If they use advanced English, match their level.
7. **Encourage** — Be warm and supportive. Add emoji occasionally to feel friendly.

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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
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
      return new Response(JSON.stringify({ error: "AI service error" }), {
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
