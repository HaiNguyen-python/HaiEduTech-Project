// Translate sentences or long paragraphs between EN / ZH / FI / VI using Lovable AI Gateway.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LANG_NAMES: Record<string, string> = {
  en: "English",
  zh: "Simplified Chinese (with Pinyin in parentheses after each Chinese word group)",
  fi: "Finnish",
  vi: "Vietnamese",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const text = String(body?.text || "").trim();
    const source = String(body?.source || "auto").toLowerCase();
    const target = String(body?.target || "vi").toLowerCase();

    if (!text) {
      return Response.json({ error: true, message: "Missing text" }, { headers: corsHeaders });
    }
    if (text.length > 5000) {
      return Response.json({ error: true, message: "Text too long (max 5000 chars)" }, { headers: corsHeaders });
    }
    if (!LANG_NAMES[target]) {
      return Response.json({ error: true, message: "Invalid target language" }, { headers: corsHeaders });
    }

    const KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!KEY) {
      return Response.json({ error: true, message: "Translation service unavailable" }, { headers: corsHeaders });
    }

    const sourceLabel = source === "auto" || !LANG_NAMES[source]
      ? "auto-detect the source language"
      : `from ${LANG_NAMES[source]}`;

    const system =
      `You are a professional translator. Translate the user's text ${sourceLabel} into ${LANG_NAMES[target]}. ` +
      `Preserve meaning, tone, paragraph breaks, lists, and any HTML/markdown. ` +
      `Do NOT add commentary, romanization (except where the target spec asks for pinyin), or quotes around the result. ` +
      `Output ONLY the translation in plain text.`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: text },
        ],
        temperature: 0.2,
      }),
    });

    if (resp.status === 429) {
      return Response.json({ error: true, message: "Rate limit reached, please wait a moment." }, { headers: corsHeaders });
    }
    if (resp.status === 402) {
      return Response.json({ error: true, message: "AI credits exhausted." }, { headers: corsHeaders });
    }
    if (!resp.ok) {
      const errTxt = await resp.text().catch(() => "");
      console.error("super-translate gateway error", resp.status, errTxt);
      return Response.json({ error: true, message: "Translation service is busy" }, { headers: corsHeaders });
    }

    const data = await resp.json();
    const translation = data?.choices?.[0]?.message?.content?.trim() || "";

    return Response.json({ translation, target, source }, { headers: corsHeaders });
  } catch (e) {
    console.error("super-translate error", e);
    return Response.json({ error: true, message: "Internal error" }, { headers: corsHeaders });
  }
});
