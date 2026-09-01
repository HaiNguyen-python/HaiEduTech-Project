/**
 * @file vocabBadges.ts
 * @description Milestone badges derived from the number of mastered vocabulary
 *              words. Purely computed from the score - no database changes, so
 *              every existing learner sees their badge immediately.
 */

export interface VocabBadge {
  /** Words required to unlock */
  threshold: number;
  id: string;
  name: string;
  nameVi: string;
  emoji: string;
  /** Tailwind classes for the pill */
  pill: string;
  /** Confetti colors for the celebration */
  colors: string[];
  /** Extra glow on the highest tiers */
  glow?: boolean;
}

export const VOCAB_BADGES: VocabBadge[] = [
  {
    threshold: 20,
    id: "seedling",
    name: "Seedling",
    nameVi: "Mầm xanh",
    emoji: "🌱",
    pill: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
    colors: ["#6ee7b7", "#34d399", "#10b981"],
  },
  {
    threshold: 50,
    id: "spark",
    name: "Spark",
    nameVi: "Tia sáng",
    emoji: "✨",
    pill: "bg-yellow-400/15 text-yellow-600 dark:text-yellow-300 border-yellow-400/30",
    colors: ["#fde68a", "#facc15", "#eab308"],
  },
  {
    threshold: 100,
    id: "rising-star",
    name: "Rising Star",
    nameVi: "Ngôi sao mới",
    emoji: "⭐",
    pill: "bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30",
    colors: ["#fcd34d", "#f59e0b", "#d97706"],
  },
  {
    threshold: 200,
    id: "word-hunter",
    name: "Word Hunter",
    nameVi: "Thợ săn từ",
    emoji: "🏹",
    pill: "bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30",
    colors: ["#5eead4", "#14b8a6", "#0d9488"],
  },
  {
    threshold: 350,
    id: "scholar",
    name: "Scholar",
    nameVi: "Học giả",
    emoji: "📚",
    pill: "bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30",
    colors: ["#93c5fd", "#3b82f6", "#1d4ed8"],
  },
  {
    threshold: 500,
    id: "master",
    name: "Master",
    nameVi: "Bậc thầy",
    emoji: "🔥",
    pill: "bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30",
    colors: ["#fdba74", "#f97316", "#ea580c"],
  },
  {
    threshold: 800,
    id: "legend",
    name: "Legend",
    nameVi: "Huyền thoại",
    emoji: "👑",
    pill: "bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-600 dark:text-purple-300 border-purple-500/40",
    colors: ["#d8b4fe", "#a855f7", "#7e22ce"],
    glow: true,
  },
  {
    threshold: 1200,
    id: "immortal",
    name: "Immortal",
    nameVi: "Bất tử",
    emoji: "💎",
    pill: "bg-gradient-to-r from-sky-500/20 via-fuchsia-500/20 to-amber-400/20 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-400/40",
    colors: ["#67e8f9", "#a78bfa", "#f472b6", "#fbbf24"],
    glow: true,
  },
];

/** Highest badge earned at this score, or null below the first milestone. */
export const getBadgeForScore = (score: number): VocabBadge | null => {
  let found: VocabBadge | null = null;
  for (const b of VOCAB_BADGES) if (score >= b.threshold) found = b;
  return found;
};

/** Next badge to aim for, or null when everything is unlocked. */
export const getNextBadge = (score: number): VocabBadge | null =>
  VOCAB_BADGES.find((b) => score < b.threshold) || null;

/** Badges crossed when the count moved from `prev` to `next`. */
export const crossedBadges = (prev: number, next: number): VocabBadge[] =>
  VOCAB_BADGES.filter((b) => prev < b.threshold && next >= b.threshold);

export const VOCAB_BADGE_EVENT = "vocab-badge-earned";

export interface VocabBadgeEventDetail {
  badgeId: string;
  count: number;
  subject: string;
}

const seenKey = (subject: string) => `vocab_badge_seen_${subject}`;

const readSeen = (subject: string): string[] => {
  try {
    const raw = localStorage.getItem(seenKey(subject));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

/**
 * Fires the celebration overlay for each newly crossed milestone.
 * Each milestone celebrates only once per subject.
 */
export const announceVocabBadges = (subject: string, prev: number, next: number) => {
  if (typeof window === "undefined") return;
  const crossed = crossedBadges(prev, next);
  if (crossed.length === 0) return;
  const seen = readSeen(subject);
  const fresh = crossed.filter((b) => !seen.includes(b.id));
  if (fresh.length === 0) return;
  try {
    localStorage.setItem(seenKey(subject), JSON.stringify([...seen, ...fresh.map((b) => b.id)]));
  } catch {
    /* noop */
  }
  // Celebrate the highest new tier (avoids stacked overlays on bulk syncs).
  const top = fresh[fresh.length - 1];
  window.dispatchEvent(
    new CustomEvent<VocabBadgeEventDetail>(VOCAB_BADGE_EVENT, {
      detail: { badgeId: top.id, count: next, subject },
    }),
  );
};
