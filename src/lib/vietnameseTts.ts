// Vietnamese TTS helper: ưu tiên giọng Google Translate (tự nhiên), fallback về speechSynthesis
import { supabase } from "@/integrations/supabase/client";

interface VietnameseTtsOptions {
  /** Tốc độ phát lại của thẻ <audio> (Google TTS gốc đã chậm sẵn). Mặc định 0.9. */
  playbackRate?: number;
  /** Tốc độ của fallback speechSynthesis. Mặc định 0.85. */
  speechRate?: number;
  /** Pitch cho fallback. Mặc định 1.05. */
  pitch?: number;
}

interface ProxyResponse {
  audioBase64?: string;
  mimeType?: string;
}

let activeAudio: HTMLAudioElement | null = null;

const stopActiveAudio = () => {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
};

export const stopVietnameseTts = () => {
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
    audio.onended = () => {
      if (activeAudio === audio) activeAudio = null;
      resolve();
    };
    audio.onerror = () => {
      if (activeAudio === audio) activeAudio = null;
      reject(new Error("audio_error"));
    };
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
  const { data, error } = await supabase.functions.invoke("vietnamese-tts", { body: { text } });
  if (error) throw new Error("proxy_error");
  const payload = data as ProxyResponse | null;
  if (!payload?.audioBase64) throw new Error("proxy_no_audio");

  const mimeType = payload.mimeType || "audio/mpeg";
  const blob = decodeBase64ToBlob(payload.audioBase64, mimeType);
  const objectUrl = URL.createObjectURL(blob);
  try {
    await playFromUrl(objectUrl, playbackRate);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const loadVoices = () =>
  new Promise<SpeechSynthesisVoice[]>((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return resolve([]);
    const synth = window.speechSynthesis;
    const v = synth.getVoices();
    if (v.length > 0) return resolve(v);
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

const speakWithNative = async (text: string, rate: number, pitch: number) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    throw new Error("speech_synthesis_unavailable");
  }
  window.speechSynthesis.cancel();
  const voices = await loadVoices();
  // Ưu tiên giọng vi-VN, sau đó bất kỳ giọng vi*
  const viVoice =
    voices.find((v) => v.lang.toLowerCase() === "vi-vn") ||
    voices.find((v) => v.lang.toLowerCase().startsWith("vi"));

  await new Promise<void>((resolve, reject) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "vi-VN";
    u.rate = rate;
    u.pitch = pitch;
    if (viVoice) u.voice = viVoice;
    u.onend = () => resolve();
    u.onerror = () => reject(new Error("speech_error"));
    window.speechSynthesis.speak(u);
  });
};

/**
 * Phát âm tiếng Việt với giọng tự nhiên.
 * Pipeline: Edge function proxy (Google TTS) → endpoint trực tiếp → speechSynthesis fallback.
 */
export const playVietnameseTts = async (
  text: string,
  options: VietnameseTtsOptions = {},
): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  const normalized = text.trim();
  if (!normalized) return false;

  const playbackRate = options.playbackRate ?? 0.9;
  const speechRate = options.speechRate ?? 0.85;
  const pitch = options.pitch ?? 1.05;

  try {
    await playFromProxy(normalized, playbackRate);
    return true;
  } catch {
    /* fallback */
  }

  try {
    await speakWithNative(normalized, speechRate, pitch);
    return true;
  } catch {
    return false;
  }
};
