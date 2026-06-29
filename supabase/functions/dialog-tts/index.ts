// Natural multi-voice TTS for dialog playback. Uses Lovable AI Gateway
// (openai/gpt-4o-mini-tts) so each speaker can use a distinct, human-like voice
// instead of the robotic system Web Speech voices.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_TEXT_LENGTH = 800;
const ALLOWED_VOICES = new Set([
  "alloy", "ash", "ballad", "coral", "echo",
  "fable", "onyx", "nova", "sage", "shimmer", "verse",
]);

const toBase64 = (bytes: Uint8Array) => {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const rawText = typeof body?.text === "string" ? body.text : "";
    const voiceInput = typeof body?.voice === "string" ? body.voice.toLowerCase() : "alloy";
    const voice = ALLOWED_VOICES.has(voiceInput) ? voiceInput : "alloy";
    const lang = body?.lang === "zh" ? "zh" : "en";
    const speed = typeof body?.speed === "number" && body.speed >= 0.7 && body.speed <= 1.2
      ? body.speed
      : 1.0;
    const text = rawText.replace(/\s+/g, " ").trim().slice(0, MAX_TEXT_LENGTH);
    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const instructions = lang === "zh"
      ? "Speak in clear, natural Mandarin Chinese with a warm, friendly tone. Use natural pacing and expressive intonation, as a real person would in conversation."
      : "Speak in clear, natural conversational English with a warm, friendly tone. Use natural pacing, expressive intonation, and gentle emphasis as a real person would.";

    const ttsRes = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini-tts",
        input: text,
        voice,
        instructions,
        speed,
        response_format: "mp3",
      }),
    });

    if (!ttsRes.ok) {
      const errText = await ttsRes.text().catch(() => "");
      console.error("dialog-tts upstream error", ttsRes.status, errText);
      return new Response(JSON.stringify({ error: "TTS failed", status: ttsRes.status }), {
        status: ttsRes.status === 429 || ttsRes.status === 402 ? ttsRes.status : 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const buffer = await ttsRes.arrayBuffer();
    const audioBase64 = toBase64(new Uint8Array(buffer));
    return new Response(JSON.stringify({ audioBase64, mimeType: "audio/mpeg" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("dialog-tts error", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
