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

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini-tts",
        input: text,
        voice: "onyx",
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
    let binary = "";
    for (let i = 0; i < bytes.length; i += 8192) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    }
    return json({ audioBase64: btoa(binary), mimeType: "audio/mpeg" });
  } catch (err) {
    console.error("mr-hai-voice error", err);
    return json({ error: "unexpected", message: err instanceof Error ? err.message : "unknown" }, 500);
  }
});
