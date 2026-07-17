/**
 * Swedish Level Engine
 * Compute a 0-100 overall score across 4 skills and map to CEFR + YKI.
 * @copyright 2026 HaiEduTech, ILC.
 */
import { SWEDISH_WORDS, type SwedishLevel } from "@/data/swedishVocabBank";

export type CEFR = "Pre-A1" | "A1" | "A2" | "B1" | "B2";
export type YKI = "-" | "1" | "2" | "3" | "4";

export interface SkillBreakdown {
  vocabulary: number;
  reading: number;
  listening: number;
  speaking: number;
  writing: number;
}

export interface SwedishLevelResult {
  cefr: CEFR;
  yki: YKI;
  overallScore: number;      // 0-100
  nextCefr: CEFR | null;
  pointsToNext: number;
  breakdown: SkillBreakdown;
  vocabByLevel: Record<SwedishLevel, { mastered: number; total: number }>;
  masteredCount: number;
  totalWords: number;
}

export interface SwedishStatsInput {
  masteredIds: Set<string>;
  activityAccuracy?: {
    reading?: number[];   // 0-100
    listening?: number[]; // 0-100
    speaking?: number[];  // 0-100
    writing?: number[];   // 0-100 (from cloze/type/YKI writing*20)
  };
  ykiScores?: {
    speaking?: number[]; // 0-5 overall
    writing?: number[];  // 0-5 overall
  };
}

const LEVEL_WEIGHT: Record<SwedishLevel, number> = { A1: 1, A2: 2, B1: 4 };
// Target totals: enough weighted vocab to hit each threshold.
const VOCAB_MAX = 800; // normalized cap for weighted mastered count

const avg = (xs: number[] | undefined, fallback = 0): number => {
  if (!xs || xs.length === 0) return fallback;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
};

const clamp = (x: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, x));

export function computeSwedishLevel(input: SwedishStatsInput): SwedishLevelResult {
  const { masteredIds, activityAccuracy = {}, ykiScores = {} } = input;

  // ---- Vocabulary score with level weighting ----
  const byLevel: Record<SwedishLevel, { mastered: number; total: number }> = {
    A1: { mastered: 0, total: 0 },
    A2: { mastered: 0, total: 0 },
    B1: { mastered: 0, total: 0 },
  };
  let weighted = 0;
  for (const w of SWEDISH_WORDS) {
    const lv = (w.level ?? "A1") as SwedishLevel;
    if (!byLevel[lv]) continue;
    byLevel[lv].total += 1;
    if (masteredIds.has(w.id)) {
      byLevel[lv].mastered += 1;
      weighted += LEVEL_WEIGHT[lv];
    }
  }
  const vocabulary = clamp((weighted / VOCAB_MAX) * 100);

  // ---- Skill scores ----
  const reading = clamp(avg(activityAccuracy.reading, 0));
  const listening = clamp(avg(activityAccuracy.listening, 0));
  const speakingActivity = avg(activityAccuracy.speaking, 0);
  const speakingYki = avg(ykiScores.speaking) * 20; // 0-5 -> 0-100
  const speaking = clamp(
    ykiScores.speaking && ykiScores.speaking.length ? (speakingActivity + speakingYki) / 2 : speakingActivity
  );
  const writingActivity = avg(activityAccuracy.writing, 0);
  const writingYki = avg(ykiScores.writing) * 20;
  const writing = clamp(
    ykiScores.writing && ykiScores.writing.length ? (writingActivity + writingYki) / 2 : writingActivity
  );

  // Overall: vocabulary is the anchor (people can't fake mastery cooldown-protected)
  // 40% vocab + 15% each of 4 skills.
  const overallScore = clamp(
    vocabulary * 0.4 + reading * 0.15 + listening * 0.15 + speaking * 0.15 + writing * 0.15
  );

  // ---- Level thresholds ----
  const THRESH: { cefr: CEFR; yki: YKI; min: number }[] = [
    { cefr: "Pre-A1", yki: "-", min: 0 },
    { cefr: "A1", yki: "1", min: 25 },
    { cefr: "A2", yki: "2", min: 45 },
    { cefr: "B1", yki: "3", min: 65 },
    { cefr: "B2", yki: "4", min: 82 },
  ];
  let idx = 0;
  for (let i = THRESH.length - 1; i >= 0; i--) {
    if (overallScore >= THRESH[i].min) { idx = i; break; }
  }
  const current = THRESH[idx];
  const next = THRESH[idx + 1] ?? null;

  const masteredCount = byLevel.A1.mastered + byLevel.A2.mastered + byLevel.B1.mastered;
  const totalWords = byLevel.A1.total + byLevel.A2.total + byLevel.B1.total;

  return {
    cefr: current.cefr,
    yki: current.yki,
    overallScore: Math.round(overallScore * 10) / 10,
    nextCefr: next ? next.cefr : null,
    pointsToNext: next ? Math.max(0, Math.round((next.min - overallScore) * 10) / 10) : 0,
    breakdown: { vocabulary, reading, listening, speaking, writing },
    vocabByLevel: byLevel,
    masteredCount,
    totalWords,
  };
}
