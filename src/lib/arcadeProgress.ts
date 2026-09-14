/**
 * @file arcadeProgress.ts
 * @description Local progress, daily streak, personal records and badges for the
 * Tech & Code Game Hub. Guest-friendly: everything lives in localStorage, while
 * scores keep flowing to the existing leaderboard through finishGame().
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

const STORAGE_KEY = "prog_arcade_progress_v1";

export interface ArcadeProgress {
  /** Best XP per game type. */
  best: Record<string, number>;
  /** Completed runs per game type. */
  plays: Record<string, number>;
  /** Lifetime XP earned in the hub. */
  totalXp: number;
  /** Completed runs across all games. */
  runs: number;
  /** Current consecutive-day streak. */
  streak: number;
  /** Longest streak ever reached. */
  bestStreak: number;
  /** Last played day, formatted YYYY-MM-DD. */
  lastPlayed: string | null;
  /** Unlocked badge ids. */
  badges: string[];
  /** Sound effects preference. */
  sound: boolean;
}

export interface ArcadeBadge {
  id: string;
  emoji: string;
  vi: string;
  en: string;
}

/** Every badge that can be unlocked in the hub. */
export const ARCADE_BADGES: ArcadeBadge[] = [
  { id: "first_run", emoji: "🎮", vi: "Lần chơi đầu tiên", en: "First mission" },
  { id: "perfect", emoji: "💯", vi: "Điểm hoàn hảo", en: "Perfect round" },
  { id: "record", emoji: "📈", vi: "Phá kỷ lục cá nhân", en: "New personal record" },
  { id: "streak_3", emoji: "🔥", vi: "Chuỗi 3 ngày", en: "3-day streak" },
  { id: "streak_7", emoji: "⚡", vi: "Chuỗi 7 ngày", en: "7-day streak" },
  { id: "streak_14", emoji: "🌟", vi: "Chuỗi 14 ngày", en: "14-day streak" },
  { id: "streak_30", emoji: "👑", vi: "Chuỗi 30 ngày", en: "30-day streak" },
  { id: "explorer", emoji: "🧭", vi: "Chơi đủ mọi nhiệm vụ", en: "Played every mission" },
  { id: "xp_1000", emoji: "🏆", vi: "1000 XP tích lũy", en: "1000 lifetime XP" },
];

const EMPTY: ArcadeProgress = {
  best: {},
  plays: {},
  totalXp: 0,
  runs: 0,
  streak: 0,
  bestStreak: 0,
  lastPlayed: null,
  badges: [],
  sound: true,
};

/** Local calendar day key, so streaks follow the learner's own timezone. */
export const dayKey = (date = new Date()) => {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const daysBetween = (from: string, to: string) => {
  const a = new Date(`${from}T00:00:00`).getTime();
  const b = new Date(`${to}T00:00:00`).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return Number.NaN;
  return Math.round((b - a) / 86_400_000);
};

export function loadArcadeProgress(): ArcadeProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<ArcadeProgress>;
    return {
      ...EMPTY,
      ...parsed,
      best: { ...(parsed.best ?? {}) },
      plays: { ...(parsed.plays ?? {}) },
      badges: [...(parsed.badges ?? [])],
      sound: parsed.sound !== false,
    };
  } catch {
    return { ...EMPTY };
  }
}

function persist(progress: ArcadeProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    /* storage can be unavailable in private mode */
  }
}

export function setArcadeSound(enabled: boolean): ArcadeProgress {
  const progress = loadArcadeProgress();
  progress.sound = enabled;
  persist(progress);
  return progress;
}

export interface RunResult {
  progress: ArcadeProgress;
  /** Badges unlocked by this run only. */
  newBadges: ArcadeBadge[];
  /** True when this run beat the previous personal best. */
  isRecord: boolean;
  /** Previous personal best before this run. */
  previousBest: number;
}

/**
 * Record one finished run: updates best score, streak and badges.
 * @param gameType leaderboard game code, e.g. prog_bug_hunter
 * @param xp XP earned this run
 * @param perfect true when the learner answered everything correctly
 * @param totalGames number of games in the hub, used for the explorer badge
 */
export function recordArcadeRun(gameType: string, xp: number, perfect: boolean, totalGames: number): RunResult {
  const progress = loadArcadeProgress();
  const previousBest = progress.best[gameType] ?? 0;
  const isRecord = progress.runs > 0 && xp > previousBest;

  progress.best[gameType] = Math.max(previousBest, xp);
  progress.plays[gameType] = (progress.plays[gameType] ?? 0) + 1;
  progress.totalXp += Math.max(0, xp);
  progress.runs += 1;

  const today = dayKey();
  if (progress.lastPlayed !== today) {
    const gap = progress.lastPlayed ? daysBetween(progress.lastPlayed, today) : Number.NaN;
    progress.streak = gap === 1 ? progress.streak + 1 : 1;
    progress.lastPlayed = today;
  }
  if (progress.streak < 1) progress.streak = 1;
  progress.bestStreak = Math.max(progress.bestStreak, progress.streak);

  const unlocked = new Set(progress.badges);
  const add = (id: string) => unlocked.add(id);
  add("first_run");
  if (perfect) add("perfect");
  if (isRecord) add("record");
  if (progress.streak >= 3) add("streak_3");
  if (progress.streak >= 7) add("streak_7");
  if (progress.streak >= 14) add("streak_14");
  if (progress.streak >= 30) add("streak_30");
  if (Object.keys(progress.plays).length >= totalGames) add("explorer");
  if (progress.totalXp >= 1000) add("xp_1000");

  const newIds = [...unlocked].filter((id) => !progress.badges.includes(id));
  progress.badges = [...unlocked];
  persist(progress);

  return {
    progress,
    newBadges: ARCADE_BADGES.filter((badge) => newIds.includes(badge.id)),
    isRecord,
    previousBest,
  };
}

/** Level model shared with the hub header: 100 XP per level. */
export const arcadeLevel = (xp: number) => Math.max(1, Math.floor(xp / 100) + 1);
