/**
 * @file cambridgeCefrModel.ts
 * @description Pure math for the Cambridge CEFR competency chart. Turns saved
 *              best scores per mock paper into a per-level mastery percentage
 *              and an overall CEFR position from Pre-A1 to B1/B2.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeLevelKey } from "@/components/cambridge/TestPrepBoard";

export const CEFR_LEVEL_ORDER: CambridgeLevelKey[] = ["starters", "movers", "flyers", "ket", "pet"];

/** CEFR label attached to each Cambridge level band. */
export const CEFR_LABEL: Record<CambridgeLevelKey, string> = {
  starters: "Pre-A1",
  movers: "A1",
  flyers: "A2",
  ket: "A2+",
  pet: "B1",
};

/** A level counts as mastered at 70% average across at least 2 papers. */
export const MASTERY_THRESHOLD = 70;
export const MIN_PAPERS_FOR_MASTERY = 2;

export interface CefrLevelStat {
  level: CambridgeLevelKey;
  cefr: string;
  /** Number of papers with a saved score. */
  attempted: number;
  /** Total papers available at this level. */
  total: number;
  /** Average percentage across attempted papers, 0 when none. */
  average: number;
  /** Best single percentage, 0 when none. */
  best: number;
  mastered: boolean;
}

export interface CefrAttempt {
  level: CambridgeLevelKey;
  /** Correct answers on the best attempt. */
  correct: number;
  /** Total questions in the paper. */
  totalQuestions: number;
}

export interface CefrSnapshot {
  levels: CefrLevelStat[];
  /** Highest mastered level, null when nothing is mastered yet. */
  currentLevel: CambridgeLevelKey | null;
  currentCefr: string;
  /** The level the student is actively working on. */
  workingLevel: CambridgeLevelKey;
  /** 0-100 position on the whole Pre-A1 to B1 scale. */
  scalePercent: number;
  totalAttempted: number;
  /** Percentage still needed on the working level to reach mastery. */
  gapToNext: number;
}

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

/**
 * Build the per-level statistics.
 * @param attempts Best attempt per paper, one entry per paper with a score.
 * @param papersPerLevel How many papers exist at each level.
 */
export const buildCefrLevels = (
  attempts: CefrAttempt[],
  papersPerLevel: Record<CambridgeLevelKey, number>
): CefrLevelStat[] =>
  CEFR_LEVEL_ORDER.map((level) => {
    const rows = attempts.filter((a) => a.level === level && a.totalQuestions > 0);
    const percents = rows.map((r) => clamp((r.correct / r.totalQuestions) * 100));
    const average = percents.length
      ? Math.round(percents.reduce((s, p) => s + p, 0) / percents.length)
      : 0;
    const best = percents.length ? Math.round(Math.max(...percents)) : 0;
    return {
      level,
      cefr: CEFR_LABEL[level],
      attempted: percents.length,
      total: papersPerLevel[level] ?? 0,
      average,
      best,
      mastered: percents.length >= MIN_PAPERS_FOR_MASTERY && average >= MASTERY_THRESHOLD,
    };
  });

/** Turn level statistics into an overall CEFR position. */
export const buildCefrSnapshot = (levels: CefrLevelStat[]): CefrSnapshot => {
  const masteredIdx = levels.reduce(
    (acc, l, i) => (l.mastered ? i : acc),
    -1
  );
  const currentLevel = masteredIdx >= 0 ? levels[masteredIdx].level : null;

  // The working level is the first level that is not yet mastered.
  const workingIdx = Math.min(masteredIdx + 1, levels.length - 1);
  const working = levels[workingIdx];

  // Each band is one step of the scale; partial credit inside the band comes
  // from the average score of the working level.
  const band = 100 / levels.length;
  const insideBand = working.attempted
    ? clamp(working.average / MASTERY_THRESHOLD) * band
    : 0;
  const scalePercent = Math.round(clamp((masteredIdx + 1) * band + insideBand));

  return {
    levels,
    currentLevel,
    currentCefr: currentLevel ? CEFR_LABEL[currentLevel] : "Pre-A1",
    workingLevel: working.level,
    scalePercent,
    totalAttempted: levels.reduce((s, l) => s + l.attempted, 0),
    gapToNext: Math.max(0, MASTERY_THRESHOLD - working.average),
  };
};
