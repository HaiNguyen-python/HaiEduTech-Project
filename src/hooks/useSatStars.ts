/**
 * @file useSatStars.ts
 * @description Local-storage backed star marker for "studied/completed" SAT items
 * (lessons, exercises, mock exams). Synchronized across components via a custom
 * window event so toggling on one card updates every place that reads the same key.
 */
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sat-stars-v1";
const EVENT_NAME = "sat-stars-updated";

const readSet = (): Set<string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
};

const writeSet = (s: Set<string>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(s)));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    /* noop */
  }
};

export const useSatStar = (key: string | undefined) => {
  const [marked, setMarked] = useState<boolean>(() =>
    key ? readSet().has(key) : false,
  );

  useEffect(() => {
    if (!key) return;
    const sync = () => setMarked(readSet().has(key));
    sync();
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, [key]);

  const toggle = useCallback(() => {
    if (!key) return;
    const set = readSet();
    if (set.has(key)) set.delete(key);
    else set.add(key);
    writeSet(set);
  }, [key]);

  return { marked, toggle };
};

export const useSatStarsCount = (prefix?: string) => {
  const [count, setCount] = useState<number>(() => {
    const s = readSet();
    if (!prefix) return s.size;
    return Array.from(s).filter((k) => k.startsWith(prefix)).length;
  });
  useEffect(() => {
    const sync = () => {
      const s = readSet();
      setCount(prefix ? Array.from(s).filter((k) => k.startsWith(prefix)).length : s.size);
    };
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, [prefix]);
  return count;
};
