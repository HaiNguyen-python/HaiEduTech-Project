/**
 * @file useAIAcademyXP.ts
 * @description Local gamification engine for AI Academy:
 * XP + Level + Streak (days) + Daily Quest. localStorage only.
 */
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ai_academy_xp_v1";

const LEVELS = [
  { level: 1, name: "Newbie", emoji: "🌱", xpRequired: 0 },
  { level: 2, name: "Explorer", emoji: "🔭", xpRequired: 100 },
  { level: 3, name: "Apprentice", emoji: "⚡", xpRequired: 250 },
  { level: 4, name: "Engineer", emoji: "🛠️", xpRequired: 500 },
  { level: 5, name: "Scientist", emoji: "🧪", xpRequired: 900 },
  { level: 6, name: "Architect", emoji: "🏛️", xpRequired: 1400 },
  { level: 7, name: "Master", emoji: "🧙", xpRequired: 2000 },
  { level: 8, name: "AI Sensei", emoji: "👑", xpRequired: 3000 },
] as const;

export type DailyQuest = {
  date: string; // YYYY-MM-DD
  lessonDone: boolean; // visited any lesson
  quizDone: boolean;   // completed any quiz
  starDone: boolean;   // earned at least 1 star
  rewardClaimed: boolean;
};

export type XPState = {
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  quest: DailyQuest;
};

const todayStr = () => new Date().toISOString().slice(0, 10);

const freshQuest = (date: string): DailyQuest => ({
  date,
  lessonDone: false,
  quizDone: false,
  starDone: false,
  rewardClaimed: false,
});

const defaultState = (): XPState => ({
  xp: 0,
  streak: 0,
  lastActiveDate: "",
  quest: freshQuest(todayStr()),
});

const load = (): XPState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw) as XPState;
    if (!s || typeof s.xp !== "number") return defaultState();
    // Reset quest if a new day
    if (s.quest?.date !== todayStr()) {
      s.quest = freshQuest(todayStr());
    }
    return s;
  } catch {
    return defaultState();
  }
};

const save = (s: XPState) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* ignore */ }
};

export const getLevelInfo = (xp: number) => {
  let current = LEVELS[0];
  let next: typeof LEVELS[number] | null = LEVELS[1] ?? null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xpRequired) {
      current = LEVELS[i];
      next = LEVELS[i + 1] ?? null;
    }
  }
  const progressInLevel = xp - current.xpRequired;
  const span = next ? next.xpRequired - current.xpRequired : 1;
  const pct = next ? Math.min(100, Math.round((progressInLevel / span) * 100)) : 100;
  return { current, next, pct, progressInLevel, span };
};

export const useAIAcademyXP = () => {
  const [state, setState] = useState<XPState>(() => load());

  useEffect(() => { save(state); }, [state]);

  /** Update streak based on last active day vs today */
  const touchStreak = useCallback(() => {
    setState((s) => {
      const today = todayStr();
      if (s.lastActiveDate === today) return s;
      const yesterday = (() => {
        const d = new Date(); d.setDate(d.getDate() - 1);
        return d.toISOString().slice(0, 10);
      })();
      const nextStreak = s.lastActiveDate === yesterday ? s.streak + 1 : 1;
      return { ...s, lastActiveDate: today, streak: nextStreak };
    });
  }, []);

  /** Award XP with optional quest flag */
  const awardXP = useCallback((amount: number, flag?: "lesson" | "quiz" | "star") => {
    setState((s) => {
      const today = todayStr();
      const quest = s.quest?.date === today ? { ...s.quest } : freshQuest(today);
      if (flag === "lesson") quest.lessonDone = true;
      if (flag === "quiz") quest.quizDone = true;
      if (flag === "star") quest.starDone = true;
      return { ...s, xp: s.xp + Math.max(0, amount), quest };
    });
  }, []);

  /** Claim daily quest reward (all 3 sub-goals must be done) */
  const claimDailyReward = useCallback((): number => {
    let granted = 0;
    setState((s) => {
      const today = todayStr();
      const quest = s.quest?.date === today ? s.quest : freshQuest(today);
      const allDone = quest.lessonDone && quest.quizDone && quest.starDone;
      if (!allDone || quest.rewardClaimed) return s;
      granted = 50;
      return {
        ...s,
        xp: s.xp + 50,
        quest: { ...quest, rewardClaimed: true },
      };
    });
    return granted;
  }, []);

  const levelInfo = getLevelInfo(state.xp);

  return { state, levelInfo, touchStreak, awardXP, claimDailyReward };
};
