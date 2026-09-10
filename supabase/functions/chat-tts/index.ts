/**
 * chat-tts - reads Teacher Hai's chat answers aloud.
 *
 * The client posts a short text chunk plus a language hint; we call the Lovable
 * AI text-to-speech endpoint and stream the finished mp3 back. The API key
 * never leaves the server.
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type Lang = "vi" | "en" | "zh" | "ja" | "fi" | "sv";

const VOICE: Record<Lang, string> = {
  vi: "alloy",
  en: "alloy",
  zh: "alloy",
  ja: "alloy",
  fi: "alloy",
  sv: "alloy",
};

const INSTRUCTIONS: Record<Lang, string> = {
  vi: "Speak Vietnamese as a warm, encouraging male Vietnamese teacher talking to his student. Calm, clear, slightly slower than normal, friendly.",
  en: "Speak English as a warm, encouraging teacher explaining to a student. Clear and friendly, natural pace.",
  zh: "Speak Mandarin Chinese as a patient, friendly teacher. Clear tones, moderate pace.",
  ja: "Speak Japanese as a polite, friendly teacher. Clear and calm, moderate pace.",
  fi: "Speak Finnish as a friendly, patient teacher. Clear and calm.",
  sv: "Speak Swedish as a friendly, patient teacher. Clear and calm.",
};

const SPEED: Record<Lang, number> = { vi: 0.92, en: 1, zh: 0.95, ja: 0.95, fi: 0.95, sv: 0.95 };

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => null);
    const rawText = typeof body?.text === "string" ? body.text.trim() : "";
    const langInput = typeof body?.lang === "string" ? body.lang.toLowerCase() : "vi";
    const lang: Lang = (["vi", "en", "zh", "ja", "fi", "sv"] as string[]).includes(langInput)
      ? (langInput as Lang)
      : "vi";

    if (!rawText) {
      return new Response(JSON.stringify({ error: "text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    // Keep each request well under the model input cap; the client chunks long answers.
    const text = rawText.slice(0, 1800);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini-tts",
        input: text,
        voice: VOICE[lang],
        instructions: INSTRUCTIONS[lang],
        speed: SPEED[lang],
        response_format: "mp3",
        stream_format: "audio",
      }),
    });

    if (!resp.ok || !resp.body) {
      const detail = await resp.text().catch(() => "");
      console.error("chat-tts gateway error", resp.status, detail);
      const status = resp.status === 429 || resp.status === 402 ? resp.status : 502;
      return new Response(JSON.stringify({ error: "tts_failed", status: resp.status }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(resp.body, {
      headers: { ...corsHeaders, "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
    });
  } catch (e) {
    console.error("chat-tts error", e);
    return new Response(JSON.stringify({ error: "unexpected_error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
