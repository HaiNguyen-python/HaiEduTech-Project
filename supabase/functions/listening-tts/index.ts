/**
 * listening-tts - high quality AI voices for the IELTS Listening bank.
 *
 * The client posts the lines of one recording (with the voice chosen for each
 * speaker). Generated mp3 files are cached in the public "listening-audio"
 * storage bucket, keyed by a hash of the text + voice + speed, so every line is
 * only ever paid for once and later students get instant playback.
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BUCKET = "listening-audio";
const MAX_LINES = 14;

interface LineInput {
  i: number;
  text: string;
  voice: string;
  instructions?: string;
  speed?: number;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 40);
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => null);
    const setId = typeof body?.setId === "string" ? body.setId.replace(/[^a-zA-Z0-9_-]/g, "") : "";
    const rawLines = Array.isArray(body?.lines) ? body.lines : [];
    if (!setId || rawLines.length === 0) return json({ error: "setId and lines are required" }, 400);

    const lines: LineInput[] = rawLines
      .slice(0, MAX_LINES)
      .filter((l: LineInput) => typeof l?.text === "string" && l.text.trim())
      .map((l: LineInput) => ({
        i: Number(l.i) || 0,
        text: String(l.text).trim().slice(0, 1200),
        voice: /^[a-z]+$/.test(String(l.voice ?? "")) ? String(l.voice) : "alloy",
        instructions: typeof l.instructions === "string" ? l.instructions.slice(0, 600) : undefined,
        speed: typeof l.speed === "number" && l.speed >= 0.7 && l.speed <= 1.2 ? l.speed : 1,
      }));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SERVICE_KEY) {
      return json({ error: "server_not_configured" }, 500);
    }
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    const results: { i: number; url: string }[] = [];
    let blocked: { status: number; message?: string } | null = null;

    const signed = async (path: string) => {
      const { data } = await admin.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 6);
      return data?.signedUrl ?? null;
    };

    const run = async (line: LineInput) => {
      const key = await sha256(`${line.voice}|${line.speed}|${line.text}`);
      const path = `${setId}/${key}.mp3`;

      // Cached already? Just hand back a fresh signed URL.
      const existing = await admin.storage.from(BUCKET).list(setId, { search: `${key}.mp3` });
      if (existing.data?.some((f) => f.name === `${key}.mp3`)) {
        const url = await signed(path);
        if (url) {
          results.push({ i: line.i, url });
          return;
        }
      }

      const resp = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini-tts",
          input: line.text,
          voice: line.voice,
          instructions: line.instructions,
          speed: line.speed,
          response_format: "mp3",
          stream_format: "audio",
        }),
      });

      if (!resp.ok) {
        const detail = await resp.text().catch(() => "");
        console.error("listening-tts gateway error", resp.status, detail.slice(0, 300));
        if (resp.status === 402 || resp.status === 403 || resp.status === 429) {
          blocked = { status: resp.status, message: detail.slice(0, 300) };
        }
        return;
      }

      const bytes = new Uint8Array(await resp.arrayBuffer());
      const { error } = await admin.storage
        .from(BUCKET)
        .upload(path, bytes, { contentType: "audio/mpeg", upsert: true });
      if (error) {
        console.error("listening-tts upload error", error.message);
        return;
      }
      results.push({ i: line.i, url: `${publicBase}/${path}` });
    };

    // Small concurrency keeps us inside the gateway rate limit.
    const queue = [...lines];
    const workers = Array.from({ length: 3 }, async () => {
      while (queue.length) {
        const next = queue.shift();
        if (!next || blocked) return;
        await run(next);
      }
    });
    await Promise.all(workers);

    if (blocked && results.length === 0) {
      return json({ error: "tts_unavailable", status: blocked.status, detail: blocked.message }, blocked.status);
    }

    results.sort((a, b) => a.i - b.i);
    return json({ urls: results });
  } catch (e) {
    console.error("listening-tts error", e);
    return json({ error: "unexpected_error" }, 500);
  }
});
