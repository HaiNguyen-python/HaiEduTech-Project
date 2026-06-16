// Batch Vietnamese → English translator for AI Academy runtime i18n.
// Stateless. Uses Lovable AI Gateway (google/gemini-3-flash-preview) with
// tool calling to guarantee a JSON array of translations aligned by index.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface Body { texts: string[] }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { texts } = (await req.json()) as Body;
    if (!Array.isArray(texts) || texts.length === 0) {
      return new Response(JSON.stringify({ translations: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (texts.length > 80) {
      return new Response(JSON.stringify({ error: "Max 80 texts per call" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Numbered prompt so Gemini keeps the order. Tool calling enforces shape.
    const numbered = texts.map((t, i) => `${i + 1}. ${t.replace(/\\n/g, " ")}`).join("\n");
    const system =
      "You translate Vietnamese educational content for middle/high school students into clear, friendly English. " +
      "OUTPUT MUST BE ENGLISH ONLY. Do NOT include any Chinese, Japanese, Korean, or other non-Latin script characters under any circumstance. " +
      "Preserve emojis, numbers, brand names (VinAI, Zalo, Tesla, ChatGPT…), markdown, and any HTML tags. " +
      "Keep tone playful but informative. Do NOT translate code, English brand names, or technical acronyms (CNN, NLP, GPT, RL, IoT…). " +
      "If a string is already English, return it unchanged. Return exactly one translation per numbered input, in order. " +
      "CRITICAL: The leading 'N.' index (e.g. '1. ', '2. ') is ONLY a routing marker — DO NOT include it in your translation. Return just the translated text without any leading number or dot prefix.";

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        max_tokens: 400,
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Translate each line to English:\n${numbered}` },
        ],
        tools: [{
          type: "function",
          function: {
            name: "return_translations",
            description: "Return one English translation per input line, in the same order.",
            parameters: {
              type: "object",
              properties: {
                translations: {
                  type: "array",
                  items: { type: "string" },
                  description: `Exactly ${texts.length} English strings`,
                },
              },
              required: ["translations"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "return_translations" } },
      }),
    });

    if (resp.status === 429 || resp.status === 402) {
      return new Response(JSON.stringify({ error: resp.status === 429 ? "rate_limited" : "payment_required" }), {
        status: resp.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error", resp.status, t);
      return new Response(JSON.stringify({ error: "ai_gateway_error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const data = await resp.json();
    const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    let translations: string[] = [];
    try {
      translations = JSON.parse(args)?.translations ?? [];
    } catch {
      translations = [];
    }
    // Defensive: if the model leaked CJK characters into a translation,
    // fall back to the original VN text — the client will retry next session.
    // Also strip any leading "N." numbering the model may have echoed back
    // from our numbered prompt (root cause of stray sequential numbers in UI).
    const CJK = /[\u3400-\u9FFF\uF900-\uFAFF\u3040-\u30FF\uAC00-\uD7AF]/;
    const LEADING_NUM = /^\s*\d{1,3}\.\s+/;
    translations = translations.map((t, i) => {
      if (typeof t !== "string" || CJK.test(t)) return texts[i];
      return t.replace(LEADING_NUM, "");
    });
    // Pad / trim defensively so client never crashes
    if (translations.length < texts.length) {
      translations = [...translations, ...texts.slice(translations.length)];
    }
    translations = translations.slice(0, texts.length);

    return new Response(JSON.stringify({ translations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("translate-vi-en error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
