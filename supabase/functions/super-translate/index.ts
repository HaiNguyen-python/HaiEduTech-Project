// Translate sentences or long paragraphs between EN / ZH / FI / VI using Perplexity API.
// Cached in dictionary_cache table by sha256(source|target|text) to reduce repeat calls.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const text = String(body?.text || "").trim();
    const source = String(body?.source || "auto").toLowerCase();
    const target = String(body?.target || "vi").toLowerCase();

    if (!text) return Response.json({ error: true, message: "Missing text" }, { headers: corsHeaders });
    if (text.length > 5000) return Response.json({ error: true, message: "Text too long (max 5000 chars)" }, { headers: corsHeaders });
    if (!LANG_NAMES[target]) return Response.json({ error: true, message: "Invalid target language" }, { headers: corsHeaders });

    // Cache lookup
    const cacheKey = "tr:" + (await sha256Hex(`${source}|${target}|${text}`));
    const { data: cached } = await admin
      .from("dictionary_cache")
      .select("payload")
      .eq("cache_key", cacheKey)
      .maybeSingle();
    if (cached?.payload?.translation) {
      // fire-and-forget hit counter
      admin.from("dictionary_cache")
        .update({ hit_count: (cached as any).payload.__hit ? undefined : undefined, last_hit_at: new Date().toISOString() })
        .eq("cache_key", cacheKey).then(() => {});
      return Response.json({ ...cached.payload, cached: true }, { headers: corsHeaders });
    }

    const KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!KEY) return Response.json({ error: true, message: "Translation service unavailable" }, { headers: corsHeaders });

    const sourceLabel = source === "auto" || !LANG_NAMES[source]
      ? "auto-detect the source language"
      : `from ${LANG_NAMES[source]}`;

    const system =
      `You are a professional translator. Translate the user's text ${sourceLabel} into ${LANG_NAMES[target]}. ` +
      `Preserve meaning, tone, paragraph breaks, lists, and any HTML/markdown. ` +
      `Do NOT add commentary, citations, romanization (except where the target spec asks for pinyin), or quotes around the result. ` +
      `Do NOT include any reference markers like [1], [2]. Output ONLY the plain translation.`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: text },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });

    if (resp.status === 429) return Response.json({ error: true, message: "Rate limit reached, please wait a moment." }, { headers: corsHeaders });
    if (resp.status === 402) return Response.json({ error: true, message: "AI credits exhausted." }, { headers: corsHeaders });
    if (resp.status === 401 || resp.status === 403) return Response.json({ error: true, message: "Translation service auth error" }, { headers: corsHeaders });
    if (!resp.ok) {
      const errTxt = await resp.text().catch(() => "");
      console.error("super-translate lovable AI error", resp.status, errTxt);
      return Response.json({ error: true, message: "Translation service is busy" }, { headers: corsHeaders });
    }

    const data = await resp.json();
    let translation: string = data?.choices?.[0]?.message?.content?.trim() || "";
    translation = translation.replace(/\[\d+\](?:\[\d+\])*/g, "").trim();

    const payload = { translation, target, source };
    // Cache write (fire-and-forget)
    admin.from("dictionary_cache")
      .upsert({ cache_key: cacheKey, kind: "translate", payload, last_hit_at: new Date().toISOString() })
      .then(() => {});

    return Response.json(payload, { headers: corsHeaders });
  } catch (e) {
    console.error("super-translate error", e);
    return Response.json({ error: true, message: "Internal error" }, { headers: corsHeaders });
  }
});
