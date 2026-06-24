// Chinese (Mandarin) TTS helper - proxies Google Translate via the
// `chinese-tts` edge function and falls back to the native zh-CN
// SpeechSynthesis voice. Mirrors swedishTts.ts. Critical because most
// browsers / preview sandboxes ship without a zh-CN voice installed.
import { supabase } from "@/integrations/supabase/client";
import { invokeTtsFunction } from "@/lib/ttsFunctionFetch";

interface ChineseTtsOptions {
  playbackRate?: number;
  speechRate?: number;
}

interface ChineseTtsProxyResponse {
  audioBase64?: string;
  mimeType?: string;
}

const CHINESE_TTS_ENDPOINTS = [
  (text: string) =>
    `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=zh-CN&q=${encodeURIComponent(text)}`,
  (text: string) =>
    `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=zh-CN&q=${encodeURIComponent(text)}`,
];

let activeAudio: HTMLAudioElement | null = null;

const stopActiveAudio = () => {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
};

export const stopChineseTts = () => {
  stopActiveAudio();
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

const playFromProxy = async (text: string, playbackRate: number) => {
  const payload = await invokeTtsFunction<ChineseTtsProxyResponse | null>("chinese-tts", { text });
  if (!payload?.audioBase64) throw new Error("proxy_no_audio");
  const mimeType = payload.mimeType || "audio/mpeg";
  try {
    await playFromUrl(`data:${mimeType};base64,${payload.audioBase64}`, playbackRate);
    return;
  } catch { /* fall through to blob URL */ }
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

const speakWithNativeChineseVoice = async (text: string, speechRate: number) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) throw new Error("unavailable");
  window.speechSynthesis.cancel();
  const voices = await loadSpeechVoices();
  const chineseVoice =
    voices.find((v) => v.lang.toLowerCase() === "zh-cn") ||
    voices.find((v) => v.lang.toLowerCase().startsWith("zh"));
  if (!chineseVoice) throw new Error("no_chinese_voice");
  await new Promise<void>((resolve, reject) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = speechRate;
    u.voice = chineseVoice;
    u.onend = () => resolve();
    u.onerror = () => reject(new Error("speech_error"));
    window.speechSynthesis.speak(u);
  });
};

export const playChineseTts = async (text: string, options: ChineseTtsOptions = {}) => {
  if (typeof window === "undefined") return false;
  const normalized = text.trim();
  if (!normalized) return false;
  const playbackRate = options.playbackRate ?? 0.9;
  const speechRate = options.speechRate ?? 0.75;

  try { await playFromProxy(normalized, playbackRate); return true; } catch { /* fallthrough */ }
  for (const build of CHINESE_TTS_ENDPOINTS) {
    try { await playFromUrl(build(normalized), playbackRate); return true; } catch { /* try next */ }
  }
  try { await speakWithNativeChineseVoice(normalized, speechRate); return true; } catch { return false; }
};
