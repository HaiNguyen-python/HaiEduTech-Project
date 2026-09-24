import { invokeTtsFunction, waitForAudioForeground } from "@/lib/ttsFunctionFetch";
import { playVietnameseTts, stopVietnameseTts } from "@/lib/vietnameseTts";

export type AlphabetAudioKind = "letter-name" | "letter-sound" | "example" | "tone";

interface AlphabetTtsResponse {
  audioBase64?: string;
  mimeType?: string;
  error?: string;
}

const audioCache = new Map<string, string>();
let activeAudio: HTMLAudioElement | null = null;
let finishActivePlayback: (() => void) | null = null;

const stopActive = () => {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
  finishActivePlayback?.();
  finishActivePlayback = null;
};

export const stopVietnameseAlphabetTts = () => {
  stopActive();
  stopVietnameseTts();
};

const playUrl = async (url: string) => {
  stopVietnameseAlphabetTts();
  const audio = new Audio(url);
  activeAudio = audio;
  audio.preload = "auto";
  await waitForAudioForeground();
  if (activeAudio !== audio) throw new DOMException("Playback superseded", "AbortError");
  await new Promise<void>((resolve, reject) => {
    finishActivePlayback = resolve;
    audio.onended = () => {
      if (activeAudio === audio) activeAudio = null;
      finishActivePlayback = null;
      resolve();
    };
    audio.onerror = () => {
      finishActivePlayback = null;
      reject(new Error("audio_error"));
    };
    audio.play().catch(reject);
  });
};

export const playVietnameseAlphabetTts = async (
  text: string,
  kind: AlphabetAudioKind,
): Promise<void> => {
  const normalized = text.normalize("NFC").replace(/\s+/g, " ").trim();
  if (!normalized) throw new Error("empty_audio_text");

  // Whole example words are more reliable through the dedicated Vietnamese
  // voice. The generative alphabet voice is reserved for isolated letter
  // readings, where explicit phonics guidance is needed.
  if (kind === "example") {
    stopVietnameseAlphabetTts();
    const played = await playVietnameseTts(normalized, {
      playbackRate: 0.9,
      speechRate: 0.78,
      pitch: 1,
    });
    if (!played) throw new Error("audio_unavailable");
    return;
  }

  const key = `hanoi-v6:${kind}:${normalized}`;
  try {
    let dataUrl = audioCache.get(key);
    if (!dataUrl) {
      const payload = await invokeTtsFunction<AlphabetTtsResponse>("vietnamese-alphabet-tts", {
        text: normalized,
        kind,
      });
      if (!payload.audioBase64) throw new Error(payload.error || "audio_unavailable");
      dataUrl = `data:${payload.mimeType || "audio/wav"};base64,${payload.audioBase64}`;
      audioCache.set(key, dataUrl);
    }
    await playUrl(dataUrl);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    const fallbackPlayed = await playVietnameseTts(normalized, {
      playbackRate: 0.95,
      speechRate: 0.82,
      pitch: 1.05,
    });
    if (!fallbackPlayed) throw new Error("audio_unavailable");
  }
};