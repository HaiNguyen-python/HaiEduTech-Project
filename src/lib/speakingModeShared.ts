// Shared helpers for the Speaking Coach practice modes: per-language TTS and a
// lightweight word comparison used by Shadowing and Weak-word review.
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { playChineseTts, stopChineseTts } from "@/lib/chineseTts";
import { playVietnameseTts, stopVietnameseTts } from "@/lib/vietnameseTts";
import { playJapaneseTts, stopJapaneseTts } from "@/lib/japaneseTts";
import { playFinnishTts, stopFinnishTts } from "@/lib/finnishTts";
import { playSwedishTts, stopSwedishTts } from "@/lib/swedishTts";

export type SpeakingLang = "english" | "chinese" | "japanese" | "finnish" | "swedish" | "vietnamese";

let activeRequest: { key: string; promise: Promise<boolean> } | null = null;

const stopAllSpeakingTts = () => {
  stopEnglishTts();
  stopChineseTts();
  stopJapaneseTts();
  stopFinnishTts();
  stopSwedishTts();
  stopVietnameseTts();
};

export function playSpeakingTts(language: SpeakingLang, text: string, rate = 1): Promise<boolean> {
  const normalized = text.trim();
  if (!normalized) return Promise.resolve(false);
  const key = `${language}\u0000${rate}\u0000${normalized}`;
  // React state cannot disable a button until after the next render. Reuse the
  // same promise when a double-click/tap reaches us in that small window.
  if (activeRequest?.key === key) return activeRequest.promise;

  stopAllSpeakingTts();
  const opts = { playbackRate: rate, speechRate: rate * 0.95 };
  const promise = (async () => {
    try {
      switch (language) {
        case "chinese": return await playChineseTts(normalized, opts);
        case "japanese": return await playJapaneseTts(normalized, opts);
        case "finnish": return await playFinnishTts(normalized, opts);
        case "swedish": return await playSwedishTts(normalized, opts);
        case "vietnamese": return await playVietnameseTts(normalized, { playbackRate: rate * 0.8, speechRate: rate * 0.75 });
        default: return await playEnglishTts(normalized, opts);
      }
    } catch {
      return false;
    } finally {
      if (activeRequest?.promise === promise) activeRequest = null;
    }
  })();
  activeRequest = { key, promise };
  return promise;
}

export function stopSpeakingTts(language: SpeakingLang) {
  activeRequest = null;
  try {
    switch (language) {
      case "chinese": return stopChineseTts();
      case "japanese": return stopJapaneseTts();
      case "finnish": return stopFinnishTts();
      case "swedish": return stopSwedishTts();
      case "vietnamese": return stopVietnameseTts();
      default: return stopEnglishTts();
    }
  } catch { /* noop */ }
}

const strip = (s: string) => s.toLowerCase().replace(/[.,!?;:"'()¿¡…、。！？，]/g, "").trim();

export const normalizeForCompare = (text: string, language: SpeakingLang): string => {
  const cleaned = strip(text);
  if (language === "chinese" || language === "japanese") return cleaned.replace(/\s+/g, "");
  return cleaned.replace(/\s+/g, " ");
};

/** Levenshtein distance, used for "close enough" matching. */
export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = cur;
  }
  return prev[n];
}

export type WordStatus = "correct" | "close" | "wrong";

export interface SimpleWordResult {
  word: string;
  status: WordStatus;
}

/** Compare a target sentence with the recognised transcript, word by word. */
export function compareSentence(
  target: string,
  heard: string,
  language: SpeakingLang
): { results: SimpleWordResult[]; accuracy: number } {
  const splitUnits = (text: string) =>
    language === "chinese" || language === "japanese"
      ? normalizeForCompare(text, language).split("")
      : normalizeForCompare(text, language).split(" ").filter(Boolean);

  const targetUnits = splitUnits(target);
  const heardUnits = splitUnits(heard);
  const pool = [...heardUnits];

  const results: SimpleWordResult[] = targetUnits.map((unit) => {
    const exact = pool.indexOf(unit);
    if (exact !== -1) {
      pool.splice(exact, 1);
      return { word: unit, status: "correct" as WordStatus };
    }
    const nearIdx = pool.findIndex(
      (h) => editDistance(h, unit) <= Math.max(1, Math.floor(unit.length / 4))
    );
    if (nearIdx !== -1) {
      pool.splice(nearIdx, 1);
      return { word: unit, status: "close" as WordStatus };
    }
    return { word: unit, status: "wrong" as WordStatus };
  });

  const score = results.reduce((acc, r) => acc + (r.status === "correct" ? 1 : r.status === "close" ? 0.75 : 0), 0);
  const accuracy = results.length ? Math.min(100, Math.round((score / results.length) * 100)) : 0;
  return { results, accuracy };
}

/** Decide which of two candidate words the recogniser heard. */
export function matchCandidate(heard: string, a: string, b: string, language: SpeakingLang): "a" | "b" | "none" {
  const h = normalizeForCompare(heard, language);
  const na = normalizeForCompare(a, language);
  const nb = normalizeForCompare(b, language);
  if (!h) return "none";
  if (h.includes(na) && !h.includes(nb)) return "a";
  if (h.includes(nb) && !h.includes(na)) return "b";
  const da = editDistance(h, na);
  const db = editDistance(h, nb);
  if (da === db) return "none";
  const best = da < db ? "a" : "b";
  const bestDist = Math.min(da, db);
  const bestWord = best === "a" ? na : nb;
  return bestDist <= Math.max(1, Math.ceil(bestWord.length / 2)) ? best : "none";
}

export const micErrorMessage = (
  code: string | null,
  t: (vi: string, en: string) => string
): string | null => {
  if (!code) return null;
  switch (code) {
    case "unsupported":
      return t(
        "Trình duyệt này không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome hoặc Edge trên máy tính.",
        "This browser does not support speech recognition. Use Chrome or Edge on desktop."
      );
    case "insecure":
      return t("Trang cần chạy trên HTTPS để dùng microphone.", "The page must run over HTTPS to use the microphone.");
    case "denied":
      return t(
        "Vui lòng cho phép truy cập microphone trong cài đặt trình duyệt.",
        "Please allow microphone access in your browser settings."
      );
    case "nodevice":
      return t("Không tìm thấy microphone nào.", "No microphone was found.");
    default:
      return t("Không thể ghi âm. Hãy thử lại.", "Recording failed. Please try again.");
  }
};
