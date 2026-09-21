/**
 * @file programmingReadProgress.ts
 * @description Shared helpers for the per-module "Mark as read" progress
 * stored by LessonReadToggle (localStorage `haiedu_prog_read_<moduleId>`).
 * Lets the roadmap sidebar highlight lessons and modules that are done.
 */
import { useCallback, useEffect, useState } from "react";

export const readStorageKey = (moduleId: string) => `haiedu_prog_read_${moduleId}`;

export const loadModuleRead = (moduleId: string): Set<string> => {
  try {
    const raw = localStorage.getItem(readStorageKey(moduleId));
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch {
    return new Set();
  }
};

export const READ_CHANGE_EVENT = "haiedu-prog-read-change";

export const notifyReadChange = (moduleId: string) => {
  try {
    window.dispatchEvent(new CustomEvent(READ_CHANGE_EVENT, { detail: { moduleId } }));
  } catch {
    /* ignore */
  }
};

export interface ReadProgress {
  completed: number;
  total: number;
  pct: number;
}

/** Compute {completed,total,pct} for one module from its read set. */
export const getReadProgress = (readSet: Set<string>, lessonIds: string[]): ReadProgress => {
  const total = lessonIds.length;
  const completed = total === 0 ? 0 : lessonIds.filter((id) => readSet.has(id)).length;
  return { completed, total, pct: total === 0 ? 0 : Math.round((completed / total) * 100) };
};

/**
 * Reactive map of moduleId -> read set for the given modules.
 * Updates on cross-tab storage events, same-tab read toggles, and remount.
 */
export const useReadProgressMap = (moduleIds: string[]): Record<string, Set<string>> => {
  const [readMap, setReadMap] = useState<Record<string, Set<string>>>(() => {
    const initial: Record<string, Set<string>> = {};
    moduleIds.forEach((id) => {
      initial[id] = loadModuleRead(id);
    });
    return initial;
  });

  const refresh = useCallback((ids: string[]) => {
    setReadMap((prev) => {
      const next = { ...prev };
      ids.forEach((id) => {
        next[id] = loadModuleRead(id);
      });
      return next;
    });
  }, []);

  useEffect(() => {
    refresh(moduleIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleIds.join("|"), refresh]);

  useEffect(() => {
    const onCustom = () => refresh(moduleIds);
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith("haiedu_prog_read_")) refresh(moduleIds);
    };
    window.addEventListener(READ_CHANGE_EVENT, onCustom);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(READ_CHANGE_EVENT, onCustom);
      window.removeEventListener("storage", onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleIds.join("|"), refresh]);

  return readMap;
};
