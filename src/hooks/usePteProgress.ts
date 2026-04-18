/**
 * @file usePteProgress.ts
 * @description Track completed PTE tasks across modules via localStorage.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pte-progress-v1";

interface PteProgress {
  completedIds: string[];
  scores: Record<string, number>; // taskId -> band 10..90
}

const load = (): PteProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completedIds: [], scores: {} };
  } catch {
    return { completedIds: [], scores: {} };
  }
};

const save = (p: PteProgress) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* ignore */ }
};

export const usePteProgress = () => {
  const [progress, setProgress] = useState<PteProgress>(load);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setProgress(load());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const recordCompletion = useCallback((taskId: string, band: number) => {
    setProgress(prev => {
      const next: PteProgress = {
        completedIds: prev.completedIds.includes(taskId) ? prev.completedIds : [...prev.completedIds, taskId],
        scores: { ...prev.scores, [taskId]: band },
      };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const empty: PteProgress = { completedIds: [], scores: {} };
    save(empty);
    setProgress(empty);
  }, []);

  return { progress, recordCompletion, reset };
};
