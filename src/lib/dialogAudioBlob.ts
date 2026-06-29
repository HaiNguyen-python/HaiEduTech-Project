/**
 * Build a single seekable WAV blob from a dialog transcript by fetching each
 * line via the `dialog-tts` edge function (one voice per speaker, gender-aware)
 * and concatenating decoded PCM. Returned blob can be assigned to a normal
 * <audio> element to get native progress, seek, and playbackRate controls.
 */
import { supabase } from "@/integrations/supabase/client";
import {
  parseDialog,
  assignVoicesForDialog,
  type DialogLang,
} from "./multiVoiceDialog";

async function fetchLineBuffer(
  text: string,
  voice: string,
  lang: DialogLang,
  ctx: AudioContext,
): Promise<AudioBuffer | null> {
  try {
    const { data, error } = await supabase.functions.invoke("dialog-tts", {
      body: { text, voice, lang, speed: 1.0 },
    });
    if (error || !data?.audioBase64) return null;
    const bin = atob(data.audioBase64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return await ctx.decodeAudioData(bytes.buffer.slice(0));
  } catch {
    return null;
  }
}

function concatBuffers(buffers: AudioBuffer[], gapSec: number, ctx: AudioContext): AudioBuffer {
  const sr = buffers[0].sampleRate;
  const gapLen = Math.floor(gapSec * sr);
  const totalLen = buffers.reduce((s, b) => s + b.length + gapLen, 0);
  const out = ctx.createBuffer(1, totalLen, sr);
  const data = out.getChannelData(0);
  let off = 0;
  for (const b of buffers) {
    const ch = b.getChannelData(0);
    data.set(ch, off);
    off += b.length + gapLen;
  }
  return out;
}

function bufferToWavBlob(buffer: AudioBuffer): Blob {
  const sr = buffer.sampleRate;
  const len = buffer.length;
  const channel = buffer.getChannelData(0);
  const bytesPerSample = 2;
  const dataLen = len * bytesPerSample;
  const ab = new ArrayBuffer(44 + dataLen);
  const v = new DataView(ab);
  const ws = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
  };
  ws(0, "RIFF");
  v.setUint32(4, 36 + dataLen, true);
  ws(8, "WAVE");
  ws(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, sr, true);
  v.setUint32(28, sr * bytesPerSample, true);
  v.setUint16(32, bytesPerSample, true);
  v.setUint16(34, 16, true);
  ws(36, "data");
  v.setUint32(40, dataLen, true);
  let off = 44;
  for (let i = 0; i < len; i++) {
    const s = Math.max(-1, Math.min(1, channel[i]));
    v.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    off += 2;
  }
  return new Blob([ab], { type: "audio/wav" });
}

export interface DialogAudioResult {
  url: string;
  duration: number;
}

export async function prepareDialogAudio(
  transcript: string,
  lang: DialogLang,
): Promise<DialogAudioResult | null> {
  const lines = parseDialog(transcript);
  if (!lines.length) return null;
  const voices = assignVoicesForDialog(lines);
  const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
  const ctx = new AC();
  try {
    const buffers = await Promise.all(
      lines.map((l, i) => fetchLineBuffer(l.text, voices[i], lang, ctx)),
    );
    const valid = buffers.filter((b): b is AudioBuffer => !!b);
    if (!valid.length) return null;
    const merged = concatBuffers(valid, 0.25, ctx);
    const blob = bufferToWavBlob(merged);
    return { url: URL.createObjectURL(blob), duration: merged.duration };
  } finally {
    try { await ctx.close(); } catch { /* ignore */ }
  }
}
