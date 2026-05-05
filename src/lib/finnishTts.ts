import { supabase } from "@/integrations/supabase/client";

interface FinnishTtsOptions {
  playbackRate?: number;
  speechRate?: number;
}

interface FinnishTtsProxyResponse {
  audioBase64?: string;
  mimeType?: string;
}

const FINNISH_TTS_ENDPOINTS = [
  (text: string) =>
    `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=fi&q=${encodeURIComponent(text)}`,
  (text: string) =>
    `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fi&q=${encodeURIComponent(text)}`,
];

let activeAudio: HTMLAudioElement | null = null;

const stopActiveAudio = () => {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
};

export const pauseFinnishTts = () => {
  if (activeAudio && !activeAudio.paused) {
    activeAudio.pause();
    return "audio";
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
    return "speech";
  }
  return null;
};

export const resumeFinnishTts = () => {
  if (activeAudio && activeAudio.paused) {
    void activeAudio.play().catch(() => {});
    return "audio";
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    return "speech";
  }
  return null;
};

export const stopFinnishTts = () => {
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
    audio
      .play()
      .catch(() => {
        if (activeAudio === audio) activeAudio = null;
        reject(new Error("play_error"));
      });
  });

const decodeBase64ToBlob = (base64: string, mimeType: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
};

const playFromProxy = async (text: string, playbackRate: number) => {
  const { data, error } = await supabase.functions.invoke("finnish-tts", {
    body: { text },
  });

  if (error) {
    throw new Error("proxy_error");
  }

  const payload = data as FinnishTtsProxyResponse | null;
  if (!payload?.audioBase64) {
    throw new Error("proxy_no_audio");
  }

  const mimeType = payload.mimeType || "audio/mpeg";
  const blob = decodeBase64ToBlob(payload.audioBase64, mimeType);
  const objectUrl = URL.createObjectURL(blob);

  try {
    await playFromUrl(objectUrl, playbackRate);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const loadSpeechVoices = () =>
  new Promise<SpeechSynthesisVoice[]>((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }

    const synth = window.speechSynthesis;
    const availableVoices = synth.getVoices();

    if (availableVoices.length > 0) {
      resolve(availableVoices);
      return;
    }

    let finished = false;
    const handleVoicesChanged = () => {
      if (finished) return;
      finished = true;
      synth.removeEventListener("voiceschanged", handleVoicesChanged);
      resolve(synth.getVoices());
    };

    synth.addEventListener("voiceschanged", handleVoicesChanged);

    setTimeout(() => {
      if (finished) return;
      finished = true;
      synth.removeEventListener("voiceschanged", handleVoicesChanged);
      resolve(synth.getVoices());
    }, 700);
  });

const speakWithNativeFinnishVoice = async (text: string, speechRate: number) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    throw new Error("speech_synthesis_unavailable");
  }

  window.speechSynthesis.cancel();
  const voices = await loadSpeechVoices();
  const finnishVoice =
    voices.find((voice) => voice.lang.toLowerCase() === "fi-fi") ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith("fi"));

  if (!finnishVoice) {
    throw new Error("no_finnish_voice");
  }

  await new Promise<void>((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fi-FI";
    utterance.rate = speechRate;
    utterance.voice = finnishVoice;
    utterance.onend = () => resolve();
    utterance.onerror = () => reject(new Error("speech_error"));
    window.speechSynthesis.speak(utterance);
  });
};

// Split long text into chunks (≈180 chars) at sentence/phrase boundaries
const splitForTts = (text: string, maxLen = 180): string[] => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return [clean];
  const sentences = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [clean];
  const chunks: string[] = [];
  let buf = "";
  for (const s of sentences) {
    const piece = s.trim();
    if (!piece) continue;
    if (piece.length > maxLen) {
      if (buf) { chunks.push(buf.trim()); buf = ""; }
      // Split by commas / spaces
      const parts = piece.split(/(?<=,)\s+/);
      let sub = "";
      for (const p of parts) {
        if ((sub + " " + p).trim().length > maxLen) {
          if (sub) chunks.push(sub.trim());
          if (p.length > maxLen) {
            // hard split by words
            const words = p.split(" ");
            let w = "";
            for (const word of words) {
              if ((w + " " + word).trim().length > maxLen) {
                if (w) chunks.push(w.trim());
                w = word;
              } else {
                w = (w + " " + word).trim();
              }
            }
            if (w) sub = w; else sub = "";
          } else {
            sub = p;
          }
        } else {
          sub = (sub + " " + p).trim();
        }
      }
      if (sub) buf = sub;
    } else if ((buf + " " + piece).trim().length > maxLen) {
      chunks.push(buf.trim());
      buf = piece;
    } else {
      buf = (buf + " " + piece).trim();
    }
  }
  if (buf.trim()) chunks.push(buf.trim());
  return chunks.filter(Boolean);
};

export const playFinnishTts = async (text: string, options: FinnishTtsOptions = {}) => {
  if (typeof window === "undefined") return false;

  const normalizedText = text.trim();
  if (!normalizedText) return false;

  const playbackRate = options.playbackRate ?? 0.85;
  const speechRate = options.speechRate ?? 0.8;

  const chunks = splitForTts(normalizedText, 180);

  const playOne = async (chunk: string): Promise<boolean> => {
    try {
      await playFromProxy(chunk, playbackRate);
      return true;
    } catch { /* fallthrough */ }

    for (const endpointBuilder of FINNISH_TTS_ENDPOINTS) {
      try {
        await playFromUrl(endpointBuilder(chunk), playbackRate);
        return true;
      } catch { /* try next */ }
    }

    try {
      await speakWithNativeFinnishVoice(chunk, speechRate);
      return true;
    } catch {
      return false;
    }
  };

  let allOk = true;
  for (const chunk of chunks) {
    const ok = await playOne(chunk);
    if (!ok) allOk = false;
  }
  return allOk;
};

