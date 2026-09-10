/**
 * @file srsEngine.ts
 * @description Tiny SM-2 style spaced-repetition engine used by the Daily Word
 * Mission. Everything lives in localStorage (via safeStorage) - no database
 * changes, works for guests too.
 */
import { safeStorage } from "@/lib/safeStorage";

/**
 * Storage keys are namespaced per subject so every language keeps its own
 * review schedule. "ielts" keeps the original key names for backward
 * compatibility with progress saved before the multi-subject rollout.
 */
export const srsKey = (subject = "ielts") =>
  subject === "ielts" ? "ielts_vocab_srs_v1" : `${subject}_vocab_srs_v1`;
export const srsStreakKey = (subject = "ielts") =>
  subject === "ielts" ? "ielts_vocab_srs_streak_v1" : `${subject}_vocab_srs_streak_v1`;

export const SRS_KEY = srsKey();
export const SRS_STREAK_KEY = srsStreakKey();

/** How the learner rated their own recall. */
export type SrsGrade = "forgot" | "hard" | "good" | "easy";

export interface SrsCard {
  /** Number of successful reviews in a row. */
  streak: number;
  /** Current interval in days. */
  interval: number;
  /** ISO day (YYYY-MM-DD) when the card becomes due. */
  due: string;
  /** ISO day of the last review. */
  last: string;
  /** Total times reviewed. */
  reps: number;
  /** Total times forgotten. */
  lapses: number;
}

export type SrsStore = Record<string, SrsCard>;

export interface SrsStreak {
  /** Consecutive days with a finished mission. */
  days: number;
  /** ISO day of the last finished mission. */
  last: string;
}

/** Ladder of intervals in days - deliberately gentle for teenagers. */
export const INTERVAL_LADDER = [1, 3, 7, 16, 35, 70];

export const todayISO = (d: Date = new Date()): string => {
  const tz = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return tz.toISOString().slice(0, 10);
};

export const addDays = (iso: string, days: number): string => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return todayISO(d);
};

export const daysBetween = (a: string, b: string): number =>
  Math.round((new Date(`${b}T00:00:00`).getTime() - new Date(`${a}T00:00:00`).getTime()) / 86400000);

export const loadSrs = (subject = "ielts"): SrsStore =>
  safeStorage.get<SrsStore>(srsKey(subject), {}) || {};
export const saveSrs = (store: SrsStore, subject = "ielts") => { safeStorage.set(srsKey(subject), store); };

export const loadStreak = (subject = "ielts"): SrsStreak =>
  safeStorage.get<SrsStreak>(srsStreakKey(subject), { days: 0, last: "" }) || { days: 0, last: "" };

/** Record that a mission was completed today and return the updated streak. */
export const bumpStreak = (subject = "ielts"): SrsStreak => {
  const cur = loadStreak(subject);
  const today = todayISO();
  if (cur.last === today) return cur;
  const next: SrsStreak = {
    days: cur.last && daysBetween(cur.last, today) === 1 ? cur.days + 1 : 1,
    last: today,
  };
  safeStorage.set(srsStreakKey(subject), next);
  return next;
};

const emptyCard = (): SrsCard => ({ streak: 0, interval: 0, due: todayISO(), last: "", reps: 0, lapses: 0 });

/**
 * Apply a review result to a card. `correct` comes from the quiz answer,
 * `grade` from the learner's self-rating; both are combined.
 */
export function reviewCard(card: SrsCard | undefined, grade: SrsGrade, correct: boolean): SrsCard {
  const c = { ...(card || emptyCard()) };
  c.reps += 1;
  c.last = todayISO();

  if (!correct || grade === "forgot") {
    c.lapses += 1;
    c.streak = 0;
    c.interval = 0;
    c.due = todayISO(); // see it again in the same session / tomorrow
    return c;
  }

  if (grade === "hard") {
    // Stay on the same rung, just nudge forward a little.
    c.streak = Math.max(1, c.streak);
    c.interval = Math.max(1, Math.round((c.interval || 1) * 1.2));
  } else {
    c.streak += 1;
    const rung = Math.min(c.streak - 1, INTERVAL_LADDER.length - 1);
    c.interval = INTERVAL_LADDER[rung];
    if (grade === "easy") c.interval = Math.round(c.interval * 1.5) || 1;
  }
  c.due = addDays(todayISO(), Math.max(1, c.interval));
  return c;
}

/** A word is mastered once it has been recalled correctly 4 times in a row. */
export const MASTER_STREAK = 4;

/**
 * Short history of the days a mission was finished, used by the activity strip.
 * Stored separately so existing schedules stay untouched.
 */
export const srsDaysKey = (subject = "ielts") => `${subject}_vocab_srs_days_v1`;

export const loadDoneDays = (subject = "ielts"): string[] =>
  safeStorage.get<string[]>(srsDaysKey(subject), []) || [];

export const markDayDone = (subject = "ielts"): string[] => {
  const today = todayISO();
  const days = loadDoneDays(subject);
  if (days.includes(today)) return days;
  const next = [...days, today].slice(-90);
  safeStorage.set(srsDaysKey(subject), next);
  return next;
};

/** The last `n` calendar days as ISO strings, oldest first. */
export const lastNDays = (n: number): string[] =>
  Array.from({ length: n }, (_, i) => addDays(todayISO(), i - (n - 1)));

export interface MissionPlan<T> {
  due: T[];
  fresh: T[];
}

/**
 * Build today's mission: cards that are due first (oldest due date first),
 * then brand new words to keep the bank growing.
 */
export function buildMission<T>(
  bank: T[],
  keyOf: (w: T) => string,
  store: SrsStore,
  opts: { reviewCount: number; newCount: number; today?: string },
): MissionPlan<T> {
  const today = opts.today || todayISO();
  const seen: { w: T; card: SrsCard }[] = [];
  const fresh: T[] = [];

  for (const w of bank) {
    const card = store[keyOf(w)];
    if (card) seen.push({ w, card });
    else fresh.push(w);
  }

  const due = seen
    .filter(({ card }) => card.due <= today)
    .sort((a, b) => (a.card.due < b.card.due ? -1 : a.card.due > b.card.due ? 1 : b.card.lapses - a.card.lapses))
    .slice(0, opts.reviewCount)
    .map(({ w }) => w);

  return { due, fresh: fresh.slice(0, opts.newCount) };
}

/** How many cards are due today (used for the little tab badge). */
export function countDue(store: SrsStore, today: string = todayISO()): number {
  return Object.values(store).filter(c => c.due <= today).length;
}

/** How many cards become due tomorrow - shown in the mission summary. */
export function countDueOn(store: SrsStore, iso: string): number {
  return Object.values(store).filter(c => c.due === iso).length;
}
