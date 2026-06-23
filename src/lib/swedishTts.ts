// Swedish TTS helper — proxies Google Translate via the `swedish-tts` edge
// function and falls back to the native sv-SE SpeechSynthesis voice when the
// proxy is unreachable. Mirrors `finnishTts.ts`.
import { supabase } from "@/integrations/supabase/client";

export type SwedishTtsSource = "proxy" | "native";
export type SwedishTtsStatus = "loading" | "playing" | "ended" | "error";

interface SwedishTtsOptions {
  playbackRate?: number;
  speechRate?: number;
  onStatus?: (status: SwedishTtsStatus, info?: { source?: SwedishTtsSource; reason?: string }) => void;
}

interface SwedishTtsProxyResponse {
  audioBase64?: string;
  mimeType?: string;
}

let activeAudio: HTMLAudioElement | null = null;
let activeSource: AudioBufferSourceNode | null = null;
let audioContext: AudioContext | null = null;

const stopActiveAudio = () => {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
};

export const stopSwedishTts = () => {
  stopActiveAudio();
  if (activeSource) {
    try { activeSource.stop(); } catch { /* already stopped */ }
    activeSource.disconnect();
    activeSource = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

const playFromUrl = (url: string, playbackRate: number) =>
  new Promise<void>((resolve, reject) => {
    stopActiveAudio();
    const audio = new Audio(url);
    activeAudio = audio;
    audio.preload = "auto";
    audio.playbackRate = playbackRate;
    audio.onended = () => { if (activeAudio === audio) activeAudio = null; resolve(); };
    audio.onerror = () => { if (activeAudio === audio) activeAudio = null; reject(new Error("audio_error")); };
    audio.play().catch(() => {
      if (activeAudio === audio) activeAudio = null;
      reject(new Error("play_error"));
    });
  });

const decodeBase64ToBlob = (base64: string, mimeType: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType });
};

const decodeBase64ToArrayBuffer = (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};

const unlockAudioContext = () => {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  audioContext ||= new AudioCtx();
  if (audioContext.state === "suspended") void audioContext.resume().catch(() => undefined);
  return audioContext;
};

const playBuffer = async (arrayBuffer: ArrayBuffer, playbackRate: number) => {
  const ctx = unlockAudioContext();
  if (!ctx) throw new Error("web_audio_unavailable");
  if (ctx.state === "suspended") await ctx.resume();
  stopSwedishTts();
  const buffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
  await ctx.resume();
  await new Promise<void>((resolve, reject) => {
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = playbackRate;
    source.connect(ctx.destination);
    activeSource = source;
    source.onended = () => {
      if (activeSource === source) activeSource = null;
      source.disconnect();
      resolve();
    };
    try { source.start(0); } catch (error) { reject(error); }
  });
};

const playFromProxy = async (text: string, playbackRate: number) => {
  const { data, error } = await supabase.functions.invoke("swedish-tts", { body: { text } });
  if (error) throw new Error("proxy_error");
  const payload = data as SwedishTtsProxyResponse | null;
  if (!payload?.audioBase64) throw new Error("proxy_no_audio");
  const mimeType = payload.mimeType || "audio/mpeg";

  // 1) Try HTMLAudio with a data URL first — this is the most reliable path
  //    inside the Lovable sandbox preview iframe (no AudioContext gesture issues,
  //    no blob: CSP edge-cases). Data URLs always inherit the page's permissions.
  try {
    await playFromUrl(`data:${mimeType};base64,${payload.audioBase64}`, playbackRate);
    return;
  } catch { /* fall through to Web Audio */ }

  // 2) Web Audio fallback — works when HTMLAudio is blocked by autoplay policy
  //    but a user-gesture-warmed AudioContext is available.
  try {
    await playBuffer(decodeBase64ToArrayBuffer(payload.audioBase64), playbackRate);
    return;
  } catch { /* fall through to blob */ }

  // 3) Last-resort blob URL via HTMLAudio.
  const blob = decodeBase64ToBlob(payload.audioBase64, mimeType);
  const objectUrl = URL.createObjectURL(blob);
  try { await playFromUrl(objectUrl, playbackRate); } finally { URL.revokeObjectURL(objectUrl); }
};

const loadSpeechVoices = () =>
  new Promise<SpeechSynthesisVoice[]>((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) { resolve([]); return; }
    const synth = window.speechSynthesis;
    const available = synth.getVoices();
    if (available.length > 0) { resolve(available); return; }
    let finished = false;
    const handler = () => {
      if (finished) return;
      finished = true;
      synth.removeEventListener("voiceschanged", handler);
      resolve(synth.getVoices());
    };
    synth.addEventListener("voiceschanged", handler);
    setTimeout(() => {
      if (finished) return;
      finished = true;
      synth.removeEventListener("voiceschanged", handler);
      resolve(synth.getVoices());
    }, 700);
  });

const speakWithNativeSwedishVoice = async (text: string, speechRate: number) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) throw new Error("unavailable");
  window.speechSynthesis.cancel();
  const voices = await loadSpeechVoices();
  const swedishVoice =
    voices.find((v) => v.lang.toLowerCase() === "sv-se") ||
    voices.find((v) => v.lang.toLowerCase().startsWith("sv"));
  if (!swedishVoice) throw new Error("no_swedish_voice");
  await new Promise<void>((resolve, reject) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "sv-SE";
    u.rate = speechRate;
    u.voice = swedishVoice;
    u.onend = () => resolve();
    u.onerror = () => reject(new Error("speech_error"));
    window.speechSynthesis.speak(u);
  });
};

export const playSwedishTts = async (text: string, options: SwedishTtsOptions = {}) => {
  if (typeof window === "undefined") return false;
  const normalized = text.trim();
  if (!normalized) return false;
  const playbackRate = options.playbackRate ?? 0.9;
  const speechRate = options.speechRate ?? 0.85;
  unlockAudioContext();

  try { await playFromProxy(normalized, playbackRate); return true; } catch { /* fallthrough */ }
  try { await speakWithNativeSwedishVoice(normalized, speechRate); return true; } catch { return false; }
};

