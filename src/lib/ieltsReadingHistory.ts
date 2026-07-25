/**
 * @file ieltsReadingHistory.ts
 * @description Local-first attempt history for IELTS Reading practice.
 * Stores every submission (single exam or full test) so we can visualize
 * the student's progress over time with a chart.
 */
import { ieltsListeningBand } from "@/lib/ieltsListeningBand";

export interface ReadingAttempt {
  id: string;              // examId or fullTestId
  title: string;
  mode: "single" | "full";
  score: number;
  total: number;
  percent: number;
  band: number;
  at: number;              // epoch ms
}

const KEY = "ielts-reading-history-v1";

export const readHistory = (): ReadingAttempt[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.slice(-100) : [];
  } catch {
    return [];
  }
};

export const pushAttempt = (a: Omit<ReadingAttempt, "band" | "percent" | "at"> & { at?: number }): void => {
  try {
    const percent = Math.round((a.score / Math.max(a.total, 1)) * 100);
    const band = ieltsListeningBand(a.score, a.total); // reading band ≈ listening band chart
    const entry: ReadingAttempt = {
      ...a,
      percent,
      band,
      at: a.at ?? Date.now(),
    };
    const list = readHistory();
    list.push(entry);
    localStorage.setItem(KEY, JSON.stringify(list.slice(-100)));
  } catch {
    /* noop */
  }
};

export const clearHistory = (): void => {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
};
