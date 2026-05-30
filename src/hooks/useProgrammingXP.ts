/**
 * @file useProgrammingXP.ts
 * @description Unified gamification engine for the entire Programming section
 * (Python, SQL, ML, AI, Cloud, Data Eng, NLP, EdTech, Software Eng…).
 *
 * Provides:
 * - XP & Level (8 ranks tailored for programmers)
 * - Daily streak (consecutive days of code activity)
 * - Achievement badges (First Run, Bug Slayer, Speed Coder, Polyglot…)
 * - Daily Code Challenge tracker (per-day seed + completion flag)
 *
 * Stored entirely in localStorage so guest students keep their progress.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "haiedu_programming_xp_v1";

export type ProgrammingLevel = {
  level: number;
  name: string;
  emoji: string;
  xpRequired: number;
};

export const PROGRAMMING_LEVELS: ProgrammingLevel[] = [
  { level: 1, name: "Hello World", emoji: "👋", xpRequired: 0 },
  { level: 2, name: "Junior Coder", emoji: "🔧", xpRequired: 120 },
  { level: 3, name: "Bug Hunter", emoji: "🐛", xpRequired: 300 },
  { level: 4, name: "Stack Builder", emoji: "🧱", xpRequired: 600 },
  { level: 5, name: "Algorithm Knight", emoji: "⚔️", xpRequired: 1000 },
  { level: 6, name: "System Architect", emoji: "🏗️", xpRequired: 1600 },
  { level: 7, name: "Tech Lead", emoji: "🚀", xpRequired: 2400 },
  { level: 8, name: "Code Sensei", emoji: "🧙‍♂️", xpRequired: 3500 },
];

export type BadgeId =
  | "first-run"
  | "bug-slayer"
  | "speed-coder"
  | "polyglot"
  | "sql-ninja"
  | "ml-pioneer"
  | "streak-7"
  | "streak-30"
  | "daily-warrior";

export type BadgeDef = {
  id: BadgeId;
  name: string;
  nameVi: string;
  emoji: string;
  description: string;
  descriptionVi: string;
};

export const BADGE_DEFS: Record<BadgeId, BadgeDef> = {
  "first-run": {
    id: "first-run",
    name: "First Run",
    nameVi: "Khởi đầu",
    emoji: "🎬",
    description: "Completed your first programming lesson.",
    descriptionVi: "Hoàn thành bài lập trình đầu tiên.",
  },
  "bug-slayer": {
    id: "bug-slayer",
    name: "Bug Slayer",
    nameVi: "Diệt bug",
    emoji: "🪲",
    description: "Passed a quiz after a wrong attempt — persistence wins.",
    descriptionVi: "Vượt qua quiz sau khi sai — kiên trì là chìa khoá.",
  },
  "speed-coder": {
    id: "speed-coder",
    name: "Speed Coder",
    nameVi: "Tốc độ ánh sáng",
    emoji: "⚡",
    description: "Finished a daily challenge in under 2 minutes.",
    descriptionVi: "Hoàn thành thử thách hằng ngày dưới 2 phút.",
  },
  polyglot: {
    id: "polyglot",
    name: "Polyglot",
    nameVi: "Đa ngôn ngữ",
    emoji: "🌐",
    description: "Completed lessons in at least 3 different pillars.",
    descriptionVi: "Hoàn thành bài học ở ít nhất 3 pillar khác nhau.",
  },
  "sql-ninja": {
    id: "sql-ninja",
    name: "SQL Ninja",
    nameVi: "Ninja SQL",
    emoji: "🥷",
    description: "Mastered 5+ SQL lessons.",
    descriptionVi: "Hoàn thành ít nhất 5 bài SQL.",
  },
  "ml-pioneer": {
    id: "ml-pioneer",
    name: "ML Pioneer",
    nameVi: "Tiên phong ML",
    emoji: "🤖",
    description: "Mastered 5+ Machine Learning lessons.",
    descriptionVi: "Hoàn thành ít nhất 5 bài Machine Learning.",
  },
  "streak-7": {
    id: "streak-7",
    name: "On Fire",
    nameVi: "Bừng cháy",
    emoji: "🔥",
    description: "7-day learning streak.",
    descriptionVi: "Học liên tục 7 ngày.",
  },
  "streak-30": {
    id: "streak-30",
    name: "Unstoppable",
    nameVi: "Bất khả chiến bại",
    emoji: "💎",
    description: "30-day learning streak.",
    descriptionVi: "Học liên tục 30 ngày.",
  },
  "daily-warrior": {
    id: "daily-warrior",
    name: "Daily Warrior",
    nameVi: "Chiến binh hằng ngày",
    emoji: "🏆",
    description: "Completed 10 daily code challenges.",
    descriptionVi: "Hoàn thành 10 thử thách code hằng ngày.",
  },
};

export type DailyChallengeRecord = {
  date: string; // YYYY-MM-DD
  challengeId: string;
  passed: boolean;
  startedAt?: number; // epoch ms
  durationMs?: number;
};

export type ProgrammingXPState = {
  xp: number;
  streak: number;
  lastActiveDate: string;
  badges: BadgeId[];
  pillarsCompleted: Record<string, number>; // pillarId -> lessons completed
  challengesPassed: number;
  daily: DailyChallengeRecord | null;
};

const todayStr = () => new Date().toISOString().slice(0, 10);

const defaultState = (): ProgrammingXPState => ({
  xp: 0,
  streak: 0,
  lastActiveDate: "",
  badges: [],
  pillarsCompleted: {},
  challengesPassed: 0,
  daily: null,
});

const load = (): ProgrammingXPState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as ProgrammingXPState;
    if (!parsed || typeof parsed.xp !== "number") return defaultState();
    return {
      ...defaultState(),
      ...parsed,
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      pillarsCompleted: parsed.pillarsCompleted || {},
    };
  } catch {
    return defaultState();
  }
};

const save = (s: ProgrammingXPState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore quota errors */
  }
};

export const getProgrammingLevelInfo = (xp: number) => {
  let current = PROGRAMMING_LEVELS[0];
  let next: ProgrammingLevel | null = PROGRAMMING_LEVELS[1] ?? null;
  for (let i = 0; i < PROGRAMMING_LEVELS.length; i++) {
    if (xp >= PROGRAMMING_LEVELS[i].xpRequired) {
      current = PROGRAMMING_LEVELS[i];
      next = PROGRAMMING_LEVELS[i + 1] ?? null;
    }
  }
  const progressInLevel = xp - current.xpRequired;
  const span = next ? next.xpRequired - current.xpRequired : 1;
  const pct = next ? Math.min(100, Math.round((progressInLevel / span) * 100)) : 100;
  return { current, next, pct, progressInLevel, span };
};

export const useProgrammingXP = () => {
  const [state, setState] = useState<ProgrammingXPState>(() => load());

  useEffect(() => {
    save(state);
  }, [state]);

  /**
   * Update streak. Call this whenever the student does any meaningful action
   * (open lesson, run code, pass quiz). Same-day calls are idempotent.
   */
  const touchStreak = useCallback(() => {
    setState((s) => {
      const today = todayStr();
      if (s.lastActiveDate === today) return s;
      const y = new Date();
      y.setDate(y.getDate() - 1);
      const yesterday = y.toISOString().slice(0, 10);
      const nextStreak = s.lastActiveDate === yesterday ? s.streak + 1 : 1;
      const badges = [...s.badges];
      if (nextStreak >= 7 && !badges.includes("streak-7")) badges.push("streak-7");
      if (nextStreak >= 30 && !badges.includes("streak-30")) badges.push("streak-30");
      return { ...s, lastActiveDate: today, streak: nextStreak, badges };
    });
  }, []);

  /** Generic XP grant. */
  const awardXP = useCallback((amount: number) => {
    if (amount <= 0) return;
    setState((s) => ({ ...s, xp: s.xp + amount }));
  }, []);

  /** Award a badge if not already owned. Returns true if newly awarded. */
  const awardBadge = useCallback((badgeId: BadgeId): boolean => {
    let newly = false;
    setState((s) => {
      if (s.badges.includes(badgeId)) return s;
      newly = true;
      return { ...s, badges: [...s.badges, badgeId] };
    });
    return newly;
  }, []);

  /**
   * Mark a lesson completed in a pillar. Auto-awards pillar-specific badges
   * (sql-ninja, ml-pioneer) and the cross-pillar Polyglot badge.
   */
  const markPillarLesson = useCallback((pillarId: string) => {
    setState((s) => {
      const pillarsCompleted = { ...s.pillarsCompleted };
      pillarsCompleted[pillarId] = (pillarsCompleted[pillarId] || 0) + 1;
      const badges = [...s.badges];
      if (!badges.includes("first-run")) badges.push("first-run");
      if (pillarId === "sql" && pillarsCompleted.sql >= 5 && !badges.includes("sql-ninja"))
        badges.push("sql-ninja");
      if (pillarId === "ml" && pillarsCompleted.ml >= 5 && !badges.includes("ml-pioneer"))
        badges.push("ml-pioneer");
      const distinctPillars = Object.values(pillarsCompleted).filter((v) => v > 0).length;
      if (distinctPillars >= 3 && !badges.includes("polyglot")) badges.push("polyglot");
      return { ...s, pillarsCompleted, badges };
    });
  }, []);

  /** Record start of a daily challenge attempt for timing. */
  const startDailyChallenge = useCallback((challengeId: string) => {
    setState((s) => {
      const today = todayStr();
      if (s.daily?.date === today && s.daily.challengeId === challengeId && s.daily.startedAt) {
        return s; // already started today
      }
      return {
        ...s,
        daily: {
          date: today,
          challengeId,
          passed: s.daily?.date === today ? !!s.daily.passed : false,
          startedAt: Date.now(),
        },
      };
    });
  }, []);

  /**
   * Record a successful daily challenge completion. Awards bonus XP + badges.
   * Returns { newBadges: BadgeId[], bonusXP: number } for toast feedback.
   */
  const completeDailyChallenge = useCallback(
    (challengeId: string): { newBadges: BadgeId[]; bonusXP: number } => {
      const result = { newBadges: [] as BadgeId[], bonusXP: 0 };
      setState((s) => {
        const today = todayStr();
        // Don't double-count same-day completion
        if (s.daily?.date === today && s.daily.passed) return s;

        const startedAt = s.daily?.startedAt;
        const durationMs = startedAt ? Date.now() - startedAt : undefined;
        const bonus = 100;
        result.bonusXP = bonus;

        const badges = [...s.badges];
        if (durationMs && durationMs < 120_000 && !badges.includes("speed-coder")) {
          badges.push("speed-coder");
          result.newBadges.push("speed-coder");
        }
        const newCount = s.challengesPassed + 1;
        if (newCount >= 10 && !badges.includes("daily-warrior")) {
          badges.push("daily-warrior");
          result.newBadges.push("daily-warrior");
        }
        return {
          ...s,
          xp: s.xp + bonus,
          challengesPassed: newCount,
          badges,
          daily: {
            date: today,
            challengeId,
            passed: true,
            startedAt,
            durationMs,
          },
        };
      });
      return result;
    },
    [],
  );

  /** Reset everything. Useful for testing / "Restart progress" button. */
  const reset = useCallback(() => setState(defaultState()), []);

  const levelInfo = getProgrammingLevelInfo(state.xp);

  return {
    state,
    levelInfo,
    touchStreak,
    awardXP,
    awardBadge,
    markPillarLesson,
    startDailyChallenge,
    completeDailyChallenge,
    reset,
  };
};
