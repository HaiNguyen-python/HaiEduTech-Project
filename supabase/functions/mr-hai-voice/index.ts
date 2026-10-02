// Male voice for Mr. Hai across the six Speaking Coach languages.
// Uses the Lovable AI text-to-speech endpoint and returns base64 mp3 so the
// client can reuse the same audio playback path as the other TTS helpers.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod";

const LANGUAGE_STYLE: Record<string, string> = {
  english: "Speak as a warm, encouraging male English teacher. Clear neutral accent, steady pace.",
  chinese: "以温和自信的男老师声音说标准普通话，语速平稳清晰。",
  japanese: "落ち着いた男性の先生の声で、標準的な日本語をはっきり話してください。",
  finnish: "Puhu selkeää suomea rauhallisen, ystävällisen miesopettajan äänellä.",
  swedish: "Tala tydlig svenska med en lugn och vänlig manlig lärarröst.",
  vietnamese: "Nói tiếng Việt giọng nam trầm ấm, thân thiện, tốc độ chậm rãi và rõ ràng.",
};

// Gemini reads steering from the text itself; it is not spoken aloud.
const GEMINI_STYLE: Record<string, string> = {
  english: "Say this warmly and naturally, like a friendly male teacher chatting with a student, with lively intonation and relaxed pacing:",
  chinese: "用温暖自然、像朋友聊天一样的男老师语气，语调生动，用标准普通话说：",
  japanese: "親しみやすい男性の先生が雑談するように、自然で温かい抑揚で話してください：",
  finnish: "Sano lämpimästi ja luontevasti, kuin ystävällinen miesopettaja juttelisi oppilaan kanssa:",
  swedish: "Säg det varmt och naturligt, som en vänlig manlig lärare som pratar med en elev:",
  vietnamese: "Nói thật tự nhiên, ấm áp như một thầy giáo thân thiện đang trò chuyện với học sinh, ngữ điệu sinh động:",
};

const BodySchema = z.object({
  text: z.string().min(1).max(1200),
  language: z.enum(["english", "chinese", "japanese", "finnish", "swedish", "vietnamese"]).default("english"),
  speed: z.number().min(0.5).max(1.5).optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (payload: unknown, status = 200) =>
    new Response(JSON.stringify(payload), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "missing_api_key" }, 500);

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
    const { text, language, speed } = parsed.data;

    // Primary: Gemini expressive voice (natural intonation). Steering goes in the text.
    const toBase64 = (bytes: Uint8Array) => {
      let binary = "";
      for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
      return btoa(binary);
    };
    const gemini = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-tts-preview",
        stream_format: "audio",
        contents: [{ role: "user", parts: [{ text: `${GEMINI_STYLE[language] ?? GEMINI_STYLE.english}\n${text}` }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Charon" } } },
        },
      }),
    });
    if (gemini.ok) {
      const bytes = new Uint8Array(await gemini.arrayBuffer());
      if (bytes.length > 1000) return json({ audioBase64: toBase64(bytes), mimeType: "audio/wav" });
    } else {
      console.error(`mr-hai-voice gemini failed [${gemini.status}]: ${await gemini.text().catch(() => "")}`);
      if (gemini.status === 402 || gemini.status === 403) return json({ error: "tts_failed", status: gemini.status }, gemini.status);
    }

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini-tts",
        input: text,
        voice: "ash",
        instructions: LANGUAGE_STYLE[language] ?? LANGUAGE_STYLE.english,
        response_format: "mp3",
        stream_format: "audio",
        speed: speed ?? 1,
      }),
    });

    if (!upstream.ok) {
      const details = await upstream.text().catch(() => "");
      console.error(`mr-hai-voice upstream failed [${upstream.status}]: ${details}`);
      return json({ error: "tts_failed", status: upstream.status, details }, upstream.status);
    }

    const bytes = new Uint8Array(await upstream.arrayBuffer());
    return json({ audioBase64: toBase64(bytes), mimeType: "audio/mpeg" });
  } catch (err) {
    console.error("mr-hai-voice error", err);
    return json({ error: "unexpected", message: err instanceof Error ? err.message : "unknown" }, 500);
  }
});
