/**
 * @file useSwedishReadPassages.ts
 * @description Tracks which Swedish reading passages the learner has finished,
 *              persisted in localStorage so progress survives reloads.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "swedish-reading-done";

const load = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
};

export const useSwedishReadPassages = () => {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    setDone(load());
  }, []);

  const persist = useCallback((next: string[]) => {
    setDone(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable (private mode) - keep in-memory state only.
    }
  }, []);

  const isDone = useCallback((id: string) => done.includes(id), [done]);

  const toggle = useCallback(
    (id: string) => {
      const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
      persist(next);
      return !done.includes(id);
    },
    [done, persist],
  );

  return { done, isDone, toggle, count: done.length };
};
