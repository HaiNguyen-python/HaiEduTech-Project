// Swedish TTS helper — proxies Google Translate via the `swedish-tts` edge
// function and falls back to the native sv-SE SpeechSynthesis voice when the
// proxy is unreachable. Mirrors `finnishTts.ts`.
import { supabase } from "@/integrations/supabase/client";

interface SwedishTtsOptions {
  playbackRate?: number;
  speechRate?: number;
}

interface SwedishTtsProxyResponse {
  audioBase64?: string;
  mimeType?: string;
}

const SWEDISH_TTS_ENDPOINTS = [
  (text: string) =>
    `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=sv&q=${encodeURIComponent(text)}`,
  (text: string) =>
    `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=sv&q=${encodeURIComponent(text)}`,
];

let activeAudio: HTMLAudioElement | null = null;

const stopActiveAudio = () => {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
};

export const stopSwedishTts = () => {
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
  const { data, error } = await supabase.functions.invoke("swedish-tts", { body: { text } });
  if (error) throw new Error("proxy_error");
  const payload = data as SwedishTtsProxyResponse | null;
  if (!payload?.audioBase64) throw new Error("proxy_no_audio");
  const blob = decodeBase64ToBlob(payload.audioBase64, payload.mimeType || "audio/mpeg");
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

  // Try Google direct URLs FIRST - the Audio element starts loading synchronously,
  // preserving the user-gesture token (critical inside sandboxed preview iframes
  // where any await before .play() causes the browser to block autoplay).
  for (const build of SWEDISH_TTS_ENDPOINTS) {
    try { await playFromUrl(build(normalized), playbackRate); return true; } catch { /* try next */ }
  }
  // Proxy fallback (works when Google direct is blocked by network/CORS).
  try { await playFromProxy(normalized, playbackRate); return true; } catch { /* fallthrough */ }
  try { await speakWithNativeSwedishVoice(normalized, speechRate); return true; } catch { return false; }
};

