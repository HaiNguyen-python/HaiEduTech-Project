/**
 * @file ieltsListeningHistory.ts
 * @description Local-first attempt history for IELTS Listening practice
 * (single set or full 40-question test), used for progress charts.
 */
import { ieltsListeningBand } from "@/lib/ieltsListeningBand";

export interface ListeningAttempt {
  id: string;              // setId or fullTestId
  title: string;
  mode: "single" | "full";
  score: number;
  total: number;
  percent: number;
  band: number;
  at: number;              // epoch ms
}

const KEY = "ielts-listening-history-v1";

export const readListeningHistory = (): ListeningAttempt[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.slice(-100) : [];
  } catch {
    return [];
  }
};

export const pushListeningAttempt = (
  a: Omit<ListeningAttempt, "band" | "percent" | "at"> & { at?: number },
): void => {
  try {
    const percent = Math.round((a.score / Math.max(a.total, 1)) * 100);
    const entry: ListeningAttempt = {
      ...a,
      percent,
      band: ieltsListeningBand(a.score, a.total),
      at: a.at ?? Date.now(),
    };
    const list = readListeningHistory();
    list.push(entry);
    localStorage.setItem(KEY, JSON.stringify(list.slice(-100)));
  } catch {
    /* noop */
  }
};

export const clearListeningHistory = (): void => {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
};
