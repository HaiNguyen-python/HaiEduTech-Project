/**
 * @file pteLessonProgress.ts
 * @description Local progress store for PTE strategy lessons (quiz best score + pass flag).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
const KEY = "pte-lessons-v1";

export interface PteLessonRecord {
  best: number;
  total: number;
  passed: boolean;
}

export type PteLessonProgressMap = Record<string, PteLessonRecord>;

export const readPteLessonProgress = (): PteLessonProgressMap => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PteLessonProgressMap) : {};
  } catch {
    return {};
  }
};

/** Stores the attempt, keeping the best score. Pass threshold is 75%. */
export const savePteLessonAttempt = (lessonId: string, score: number, total: number): PteLessonRecord => {
  const map = readPteLessonProgress();
  const prevBest = map[lessonId]?.best ?? 0;
  const best = Math.max(prevBest, score);
  const record: PteLessonRecord = { best, total, passed: total > 0 && best / total >= 0.75 };
  map[lessonId] = record;
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* storage unavailable - progress stays in memory for this session */
  }
  return record;
};
