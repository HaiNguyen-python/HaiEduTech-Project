/**
 * @file recentPages.ts
 * @description Tracks the last few pages the learner visited, for the Ctrl+K palette.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { safeStorage } from "@/lib/safeStorage";

const RECENT_KEY = "haiedu_recent_pages";
const RECENT_LIMIT = 5;

export const readRecentPages = (): string[] => {
  const parsed = safeStorage.get<string[]>(RECENT_KEY, []);
  return Array.isArray(parsed)
    ? parsed.filter((p) => typeof p === "string").slice(0, RECENT_LIMIT)
    : [];
};

export const rememberRecentPage = (path: string) => {
  if (!path || path === "/") return;
  const next = [path, ...readRecentPages().filter((p) => p !== path)].slice(0, RECENT_LIMIT);
  safeStorage.set(RECENT_KEY, next);
};
