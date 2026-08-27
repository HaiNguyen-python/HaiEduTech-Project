// English TTS helper - proxies Google Translate via the `english-tts` edge
// function and falls back to the native en-US/en-GB SpeechSynthesis voice.
// Mirrors swedishTts.ts. Ensures audio works even when the browser lacks an
// installed English voice (preview sandbox, headless Chromium, etc.).
import { invokeTtsFunction, waitForAudioForeground } from "@/lib/ttsFunctionFetch";

export type EnglishAccent = "en-US" | "en-GB";

interface EnglishTtsOptions {
  playbackRate?: number;
  speechRate?: number;
  accent?: EnglishAccent;
}

export interface EnglishDialogueTurn {
  speaker: string;
  text: string;
}

interface EnglishTtsProxyResponse {
  audioBase64?: string;
  mimeType?: string;
}

const buildDirectEndpoints = (accent: EnglishAccent) => {
  const tl = accent === "en-GB" ? "en-gb" : "en";
  return [
    (text: string) =>
      `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=${tl}&q=${encodeURIComponent(text)}`,
    (text: string) =>
      `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${encodeURIComponent(text)}`,
  ];
};

let activeAudio: HTMLAudioElement | null = null;
// Incremented on every stop/new playback so long chunked reads abort cleanly.
let playToken = 0;

const stopActiveAudio = () => {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
};

export const stopEnglishTts = () => {
  playToken += 1;
  stopActiveAudio();
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

// The english-tts proxy (and Google translate_tts) truncate long input, so any
// passage must be split into short chunks and played back to back.
const MAX_TTS_CHUNK = 180;

const splitIntoChunks = (text: string, max = MAX_TTS_CHUNK): string[] => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  if (clean.length <= max) return [clean];
  const sentences = clean.split(/(?<=[.!?…])\s+/);
  const chunks: string[] = [];
  let buf = "";
  const push = (s: string) => { const v = s.trim(); if (v) chunks.push(v); };
  for (const sentence of sentences) {
    if (sentence.length > max) {
      push(buf); buf = "";
      let sub = "";
      for (const word of sentence.split(/\s+/)) {
        if ((sub + " " + word).trim().length > max) { push(sub); sub = word; }
        else sub = (sub ? `${sub} ${word}` : word);
      }
      push(sub);
      continue;
    }
    if ((buf + " " + sentence).trim().length > max) { push(buf); buf = sentence; }
    else buf = buf ? `${buf} ${sentence}` : sentence;
  }
  push(buf);
  return chunks;
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
        if (activeAudio !== audio) {
          reject(new Error("stale_audio"));
          return;
        }
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

const playFromProxy = async (text: string, accent: EnglishAccent, playbackRate: number) => {
  const payload = await invokeTtsFunction<EnglishTtsProxyResponse | null>("english-tts", { text, accent });
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

const speakWithNativeEnglishVoice = async (text: string, accent: EnglishAccent, speechRate: number) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) throw new Error("unavailable");
  window.speechSynthesis.cancel();
  const voices = await loadSpeechVoices();
  const lc = accent.toLowerCase();
  const englishVoice =
    voices.find((v) => v.lang.toLowerCase() === lc) ||
    voices.find((v) => v.lang.toLowerCase().startsWith("en"));
  if (!englishVoice) throw new Error("no_english_voice");
  await new Promise<void>((resolve, reject) => {
    const u = new SpeechSynthesisUtterance(text);
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    const fail = () => {
      if (settled) return;
      settled = true;
      reject(new Error("speech_error"));
    };
    u.lang = accent;
    u.rate = speechRate;
    u.voice = englishVoice;
    u.onend = finish;
    u.onerror = fail;
    window.setTimeout(finish, Math.min(30000, Math.max(6000, text.length * 110)));
    try { window.speechSynthesis.resume(); } catch { /* noop */ }
    window.speechSynthesis.speak(u);
  });
};

const playOneChunk = async (
  chunk: string,
  accent: EnglishAccent,
  playbackRate: number,
  speechRate: number,
) => {
  try { await playFromProxy(chunk, accent, playbackRate); return true; } catch { /* fallthrough */ }
  for (const build of buildDirectEndpoints(accent)) {
    try { await playFromUrl(build(chunk), playbackRate); return true; } catch { /* try next */ }
  }
  try { await speakWithNativeEnglishVoice(chunk, accent, speechRate); return true; } catch { return false; }
};

export const playEnglishTts = async (text: string, options: EnglishTtsOptions = {}) => {
  if (typeof window === "undefined") return false;
  const normalized = text.trim();
  if (!normalized) return false;
  const accent: EnglishAccent = options.accent ?? "en-US";
  const playbackRate = options.playbackRate ?? 0.95;
  const speechRate = options.speechRate ?? 0.85;

  const chunks = splitIntoChunks(normalized);
  playToken += 1;
  const token = playToken;
  let any = false;
  for (const chunk of chunks) {
    if (token !== playToken) return any;
    const ok = await playOneChunk(chunk, accent, playbackRate, speechRate);
    any = any || ok;
    if (token !== playToken) return any;
  }
  return any;
};

/** Read a dialogue one turn at a time, with a natural pause between speakers. */
export const playEnglishDialogueTts = async (
  turns: EnglishDialogueTurn[],
  options: EnglishTtsOptions = {},
) => {
  if (typeof window === "undefined" || turns.length === 0) return false;
  playToken += 1;
  const token = playToken;
  const baseRate = options.playbackRate ?? 0.9;
  const speechRate = options.speechRate ?? 0.85;
  let any = false;

  for (const turn of turns) {
    if (token !== playToken) return any;
    const speaker = turn.speaker.toLowerCase();
    const rateOffset = /boy|girl|student/.test(speaker) ? 0.03 : /man|expert|guest/.test(speaker) ? -0.02 : 0;
    const chunks = splitIntoChunks(turn.text);
    for (const chunk of chunks) {
      if (token !== playToken) return any;
      const ok = await playOneChunk(
        chunk,
        options.accent ?? "en-GB",
        Math.max(0.7, baseRate + rateOffset),
        Math.max(0.7, speechRate + rateOffset),
      );
      any = any || ok;
    }
    if (token !== playToken) return any;
    await new Promise<void>(resolve => window.setTimeout(resolve, speaker === "narrator" ? 320 : 220));
  }
  return any;
};

