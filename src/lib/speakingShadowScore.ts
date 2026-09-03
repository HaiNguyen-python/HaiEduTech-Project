// Pace scoring for Shadowing mode: compares how long the learner spoke with
// how long the model sentence should take.
export type PaceVerdict = "tooSlow" | "good" | "tooFast";

export interface PaceResult {
  verdict: PaceVerdict;
  ratio: number; // learner duration / model duration
  learnerWpm: number;
  modelWpm: number;
  score: number; // 0-100, 100 = same pace as the model
  tipVi: string;
  tipEn: string;
}

// Comfortable reference speeds per language (words / syllables per minute).
const REFERENCE_WPM: Record<string, number> = {
  english: 130,
  finnish: 110,
  swedish: 120,
  vietnamese: 120,
  chinese: 150, // characters per minute
  japanese: 150, // mora-ish per minute
};

const countUnits = (text: string, language: string): number => {
  if (language === "chinese" || language === "japanese") {
    const cjk = text.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/g);
    if (cjk && cjk.length) return cjk.length;
  }
  return (text.match(/\S+/g) ?? []).length;
};

export const modelDurationMs = (text: string, language: string): number => {
  const units = countUnits(text, language);
  const wpm = REFERENCE_WPM[language] ?? 130;
  return Math.max(1200, (units / wpm) * 60_000);
};

export function scorePace(text: string, language: string, learnerMs: number): PaceResult {
  const modelMs = modelDurationMs(text, language);
  const units = countUnits(text, language);
  const safeLearnerMs = Math.max(400, learnerMs);
  const ratio = safeLearnerMs / modelMs;
  const learnerWpm = Math.round((units / (safeLearnerMs / 60_000)) || 0);
  const modelWpm = Math.round(units / (modelMs / 60_000));

  // 1.0 is perfect; 100% score band is 0.85 - 1.25 (natural variation).
  let verdict: PaceVerdict = "good";
  if (ratio < 0.75) verdict = "tooFast";
  else if (ratio > 1.4) verdict = "tooSlow";

  const deviation = ratio < 0.85 ? 0.85 - ratio : ratio > 1.25 ? ratio - 1.25 : 0;
  const score = Math.max(0, Math.min(100, Math.round(100 - deviation * 110)));

  const tips: Record<PaceVerdict, { vi: string; en: string }> = {
    tooFast: {
      vi: "Bạn nói nhanh hơn mẫu. Hãy giữ nhịp và ngắt hơi ở dấu phẩy.",
      en: "You spoke faster than the model. Hold the rhythm and pause at commas.",
    },
    good: {
      vi: "Nhịp nói rất tự nhiên, giống tốc độ mẫu.",
      en: "Your pace matches the model nicely.",
    },
    tooSlow: {
      vi: "Bạn nói chậm hơn mẫu. Thử nối các từ trong cùng một cụm.",
      en: "You spoke slower than the model. Try linking the words inside each phrase.",
    },
  };

  return { verdict, ratio, learnerWpm, modelWpm, score, tipVi: tips[verdict].vi, tipEn: tips[verdict].en };
}
