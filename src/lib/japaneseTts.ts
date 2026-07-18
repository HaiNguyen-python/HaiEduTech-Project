// Japanese (ja-JP) TTS helper — proxies Google Translate via the
// `japanese-tts` edge function and falls back to the native ja-JP voice.
// Mirrors chineseTts.ts.
import { invokeTtsFunction, waitForAudioForeground } from "@/lib/ttsFunctionFetch";

interface JapaneseTtsOptions {
  playbackRate?: number;
  speechRate?: number;
}

interface ProxyResponse {
  audioBase64?: string;
  mimeType?: string;
}

const DIRECT_ENDPOINTS = [
  (text: string) =>
    `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=ja&q=${encodeURIComponent(text)}`,
  (text: string) =>
    `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=${encodeURIComponent(text)}`,
];

let activeAudio: HTMLAudioElement | null = null;

const stopActiveAudio = () => {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
};

export const stopJapaneseTts = () => {
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
    waitForAudioForeground()
      .then(() => {
        if (activeAudio !== audio) { reject(new Error("stale_audio")); return; }
        audio.play().catch(() => {
          if (activeAudio === audio) activeAudio = null;
          reject(new Error("play_error"));
        });
      })
      .catch(() => reject(new Error("foreground_wait_error")));
  });

const decodeBase64ToBlob = (base64: string, mimeType: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType });
};

const playFromProxy = async (text: string, playbackRate: number) => {
  const payload = await invokeTtsFunction<ProxyResponse | null>("japanese-tts", { text });
  if (!payload?.audioBase64) throw new Error("proxy_no_audio");
  const mimeType = payload.mimeType || "audio/mpeg";
  try {
    await playFromUrl(`data:${mimeType};base64,${payload.audioBase64}`, playbackRate);
    return;
  } catch { /* fallthrough */ }
  const blob = decodeBase64ToBlob(payload.audioBase64, mimeType);
  const objectUrl = URL.createObjectURL(blob);
  try { await playFromUrl(objectUrl, playbackRate); } finally { URL.revokeObjectURL(objectUrl); }
};

const loadVoices = () =>
  new Promise<SpeechSynthesisVoice[]>((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) { resolve([]); return; }
    const synth = window.speechSynthesis;
    const available = synth.getVoices();
    if (available.length > 0) { resolve(available); return; }
    let done = false;
    const handler = () => {
      if (done) return;
      done = true;
      synth.removeEventListener("voiceschanged", handler);
      resolve(synth.getVoices());
    };
    synth.addEventListener("voiceschanged", handler);
    setTimeout(() => {
      if (done) return;
      done = true;
      synth.removeEventListener("voiceschanged", handler);
      resolve(synth.getVoices());
    }, 700);
  });

const speakWithNativeVoice = async (text: string, speechRate: number) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) throw new Error("unavailable");
  window.speechSynthesis.cancel();
  const voices = await loadVoices();
  const voice = voices.find((v) => v.lang.toLowerCase().startsWith("ja"));
  if (!voice) throw new Error("no_japanese_voice");
  await new Promise<void>((resolve, reject) => {
    const u = new SpeechSynthesisUtterance(text);
    let settled = false;
    u.lang = "ja-JP";
    u.rate = speechRate;
    u.voice = voice;
    u.onend = () => { if (!settled) { settled = true; resolve(); } };
    u.onerror = () => { if (!settled) { settled = true; reject(new Error("speech_error")); } };
    window.setTimeout(() => { if (!settled) { settled = true; resolve(); } }, Math.min(30000, Math.max(6000, text.length * 160)));
    try { window.speechSynthesis.resume(); } catch { /* noop */ }
    window.speechSynthesis.speak(u);
  });
};

export const playJapaneseTts = async (text: string, options: JapaneseTtsOptions = {}) => {
  if (typeof window === "undefined") return false;
  const normalized = text.trim();
  if (!normalized) return false;
  const playbackRate = options.playbackRate ?? 0.9;
  const speechRate = options.speechRate ?? 0.85;

  try { await playFromProxy(normalized, playbackRate); return true; } catch { /* fallthrough */ }
  for (const build of DIRECT_ENDPOINTS) {
    try { await playFromUrl(build(normalized), playbackRate); return true; } catch { /* try next */ }
  }
  try { await speakWithNativeVoice(normalized, speechRate); return true; } catch { return false; }
};
