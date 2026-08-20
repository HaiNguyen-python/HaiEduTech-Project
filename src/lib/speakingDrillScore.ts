/**
 * @file speakingDrillScore.ts
 * @description Lightweight English word-matching scorer for the Template Lab
 *   speaking drills. Compares what the student said with the model sentence and
 *   returns a per-word status plus an accuracy percentage.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type DrillWordStatus = "correct" | "close" | "wrong" | "missing";

export interface DrillWordResult {
  expected: string;
  spoken?: string;
  status: DrillWordStatus;
}

const CONTRACTIONS: Record<string, string> = {
  "i'd": "i would",
  "i'm": "i am",
  "i've": "i have",
  "it's": "it is",
  "isn't": "is not",
  "don't": "do not",
  "doesn't": "does not",
  "didn't": "did not",
  "can't": "can not",
  "couldn't": "could not",
  "wouldn't": "would not",
  "there's": "there is",
  "that's": "that is",
  "he's": "he is",
  "she's": "she is",
  "they're": "they are",
  "we're": "we are",
  "you're": "you are",
  "i'll": "i will",
  "he'd": "he would",
  "she'd": "she would",
};

export const normalizeDrillText = (text: string): string[] => {
  let cleaned = text.toLowerCase().replace(/[’`]/g, "'");
  for (const [variant, expansion] of Object.entries(CONTRACTIONS)) {
    cleaned = cleaned.replace(new RegExp(`\\b${variant.replace("'", "['’]")}\\b`, "g"), expansion);
  }
  cleaned = cleaned
    .replace(/[.,!?;:"()\[\]{}…]/g, " ")
    .replace(/[-–—]/g, " ")
    .replace(/'/g, "");
  return cleaned.split(/\s+/).filter(Boolean);
};

const levenshtein = (a: string, b: string): number => {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[a.length][b.length];
};

const status = (spoken: string, expected: string): DrillWordStatus | null => {
  if (spoken === expected) return "correct";
  if (expected.length >= 4 && (spoken.startsWith(expected.slice(0, expected.length - 2)) ||
      expected.startsWith(spoken.slice(0, Math.max(3, spoken.length - 2))))) return "close";
  const dist = levenshtein(spoken, expected);
  const threshold = expected.length <= 3 ? 1 : expected.length <= 5 ? 2 : expected.length <= 8 ? 3 : 4;
  return dist <= threshold ? "close" : null;
};

/** Forward-searching comparison so extra words do not shift everything to wrong. */
export const compareDrillWords = (target: string, spoken: string): DrillWordResult[] => {
  const targetWords = normalizeDrillText(target);
  const spokenWords = normalizeDrillText(spoken);
  let cursor = 0;

  return targetWords.map((expected) => {
    let bestIndex = -1;
    let bestStatus: DrillWordStatus | null = null;
    for (let i = cursor; i < spokenWords.length; i++) {
      const s = status(spokenWords[i], expected);
      if (s) {
        bestIndex = i;
        bestStatus = s;
        if (s === "correct") break;
      }
    }
    if (bestIndex >= 0 && bestStatus) {
      cursor = bestIndex + 1;
      return { expected, spoken: spokenWords[bestIndex], status: bestStatus };
    }
    const fallback = spokenWords[cursor];
    if (fallback) cursor += 1;
    return { expected, spoken: fallback, status: fallback ? "wrong" : "missing" };
  });
};

export const drillAccuracy = (results: DrillWordResult[]): number => {
  if (results.length === 0) return 0;
  const score = results.reduce(
    (acc, r) => acc + (r.status === "correct" ? 1 : r.status === "close" ? 0.75 : 0),
    0,
  );
  const raw = (score / results.length) * 100;
  return Math.min(100, Math.round(raw + (raw >= 80 ? 3 : raw >= 50 ? 2 : 0)));
};

export const isSpeechRecognitionSupported = (): boolean =>
  typeof window !== "undefined" &&
  ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
