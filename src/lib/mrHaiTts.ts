/**
 * @file mrHaiTts.ts
 * @description Male voice playback for the "Speak with Mr. Hai" activity.
 *
 * Primary path: the `mr-hai-voice` edge function (Lovable AI male voice) for all
 * six languages. Fallback: the shared per-language TTS, which prefers a male
 * device voice when the browser exposes one.
 */
import { invokeTtsFunction, waitForAudioForeground } from "@/lib/ttsFunctionFetch";
import { playSpeakingTts, stopSpeakingTts, type SpeakingLang } from "@/lib/speakingModeShared";

interface VoiceResponse { audioBase64?: string; mimeType?: string }

let activeAudio: HTMLAudioElement | null = null;
let playToken = 0;
let inFlight: { key: string; promise: Promise<boolean> } | null = null;

const stopActiveAudio = () => {
  if (!activeAudio) return;
  try { activeAudio.pause(); activeAudio.currentTime = 0; } catch { /* noop */ }
  activeAudio = null;
};

export const stopMrHaiVoice = (language: SpeakingLang) => {
  playToken += 1;
  inFlight = null;
  stopActiveAudio();
  stopSpeakingTts(language);
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch { /* noop */ }
  }
};

const SPEECH_LANG: Record<SpeakingLang, string> = {
  english: "en-US",
  chinese: "zh-CN",
  japanese: "ja-JP",
  finnish: "fi-FI",
  swedish: "sv-SE",
  vietnamese: "vi-VN",
};

const FEMALE_HINT = /female|woman|girl|samantha|victoria|karen|moira|tessa|ting|kyoko|satu|alva|linh|zira|susan|hazel/i;
const MALE_HINT = /male|man|daniel|alex|fred|thomas|aaron|liang|yunjian|otoya|ichiro|onni|mikael|oskar|nam|david|mark|george/i;

/** Best-effort male device voice, used only when the AI voice is unavailable. */
const speakWithMaleDeviceVoice = (language: SpeakingLang, text: string, rate: number) =>
  new Promise<boolean>((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) { resolve(false); return; }
    const synth = window.speechSynthesis;
    const lang = SPEECH_LANG[language];
    const prefix = lang.slice(0, 2).toLowerCase();
    const voices = synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith(prefix));
    const voice = voices.find((v) => MALE_HINT.test(v.name)) ?? voices.find((v) => !FEMALE_HINT.test(v.name));
    if (!voice) { resolve(false); return; }
    try { synth.cancel(); } catch { /* noop */ }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang || lang;
    utterance.rate = Math.min(1.2, Math.max(0.6, rate * 0.92));
    utterance.pitch = 0.85;
    let settled = false;
    const finish = (ok: boolean) => { if (settled) return; settled = true; resolve(ok); };
    utterance.onend = () => finish(true);
    utterance.onerror = () => finish(false);
    window.setTimeout(() => finish(true), Math.min(30000, Math.max(5000, text.length * 110)));
    try { synth.resume(); } catch { /* noop */ }
    synth.speak(utterance);
  });

const playBase64 = (base64: string, mimeType: string, rate: number, token: number) =>
  new Promise<void>((resolve, reject) => {
    stopActiveAudio();
    const audio = new Audio(`data:${mimeType};base64,${base64}`);
    activeAudio = audio;
    audio.preload = "auto";
    audio.playbackRate = rate;
    audio.onended = () => { if (activeAudio === audio) activeAudio = null; resolve(); };
    audio.onerror = () => { if (activeAudio === audio) activeAudio = null; reject(new Error("audio_error")); };
    waitForAudioForeground()
      .then(() => {
        if (activeAudio !== audio || token !== playToken) { reject(new Error("stale_audio")); return; }
        audio.play().catch(() => reject(new Error("play_error")));
      })
      .catch(() => reject(new Error("foreground_wait_error")));
  });

/** Speak one line with Mr. Hai's male voice. Deduplicates identical in-flight requests. */
export const playMrHaiVoice = async (
  language: SpeakingLang,
  text: string,
  rate = 1,
): Promise<boolean> => {
  const normalized = text.trim();
  if (!normalized || typeof window === "undefined") return false;
  const key = `${language}\u0000${rate}\u0000${normalized}`;
  if (inFlight?.key === key) return inFlight.promise;

  playToken += 1;
  const token = playToken;
  stopActiveAudio();
  stopSpeakingTts(language);

  const promise = (async () => {
    try {
      const payload = await invokeTtsFunction<VoiceResponse | null>("mr-hai-voice", {
        text: normalized.slice(0, 1200),
        language,
        speed: Math.min(1.5, Math.max(0.5, rate)),
      });
      if (!payload?.audioBase64) throw new Error("no_audio");
      if (token !== playToken) return false;
      await playBase64(payload.audioBase64, payload.mimeType || "audio/mpeg", 1, token);
      return true;
    } catch {
      if (token !== playToken) return false;
      // Fallback keeps the lesson usable even when the AI voice is unavailable.
      if (await speakWithMaleDeviceVoice(language, normalized, rate)) return true;
      if (token !== playToken) return false;
      return playSpeakingTts(language, normalized, rate);
    } finally {
      if (inFlight?.promise === promise) inFlight = null;
    }
  })();

  inFlight = { key, promise };
  return promise;
};
