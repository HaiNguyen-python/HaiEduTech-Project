interface FinnishTtsOptions {
  playbackRate?: number;
  speechRate?: number;
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

const speakWithNativeFinnishVoice = (text: string, speechRate: number) =>
  new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      reject(new Error("speech_synthesis_unavailable"));
      return;
    }

    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const finnishVoice =
      voices.find((voice) => voice.lang.toLowerCase() === "fi-fi") ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("fi"));

    if (!finnishVoice) {
      reject(new Error("no_finnish_voice"));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fi-FI";
    utterance.rate = speechRate;
    utterance.voice = finnishVoice;
    utterance.onend = () => resolve();
    utterance.onerror = () => reject(new Error("speech_error"));
    window.speechSynthesis.speak(utterance);
  });

export const playFinnishTts = async (text: string, options: FinnishTtsOptions = {}) => {
  if (typeof window === "undefined") return false;

  const normalizedText = text.trim();
  if (!normalizedText) return false;

  const playbackRate = options.playbackRate ?? 0.85;
  const speechRate = options.speechRate ?? 0.8;

  for (const endpointBuilder of FINNISH_TTS_ENDPOINTS) {
    try {
      await playFromUrl(endpointBuilder(normalizedText), playbackRate);
      return true;
    } catch {
      // Try next endpoint
    }
  }

  try {
    await speakWithNativeFinnishVoice(normalizedText, speechRate);
    return true;
  } catch {
    return false;
  }
};
