/**
 * @file vocabReview.ts
 * @description Single place that records a spaced-repetition review of a
 * mastered vocabulary word. Before this helper existed only the 14-day
 * "Smart review" column ever bumped `review_count`, so no word could ever reach
 * long-term memory in the Vocabulary Brain. Every practice/flashcard path now
 * funnels through here.
 *
 * For each word it updates `public.user_vocab_mastered`:
 *  - `reviewed_at`        -> now()
 *  - `review_count`       -> +1 (repetition number, drives memory stability)
 *  - `last_interval_days` -> days since the previous review (spacing effect)
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";

/** Fired after at least one review row was written, so the brain can refresh. */
export const VOCAB_REVIEW_EVENT = "vocab-review-recorded";

const DAY_MS = 24 * 60 * 60 * 1000;

/** How the learner performed on this review. */
export interface ReviewOutcome {
  /** False = the word was not recalled (a lapse). Defaults to true. */
  correct?: boolean;
  /** Optional self-rating, used to nudge the ease factor. */
  grade?: "forgot" | "hard" | "good" | "easy";
}

/** SM-2 style ease update, clamped to the useful 1.3 - 3.0 range. */
const nextEase = (current: number, { correct = true, grade }: ReviewOutcome): number => {
  const base = Number.isFinite(current) ? current : 2.5;
  const delta = !correct || grade === "forgot" ? -0.25
    : grade === "hard" ? -0.12
    : grade === "easy" ? 0.1
    : 0.02;
  return Math.min(3, Math.max(1.3, Number((base + delta).toFixed(2))));
};

/**
 * Record a review for the given words. Words that are not in the mastered table
 * are silently skipped (nothing to consolidate yet). Never throws: a failed
 * review must not break the practice session.
 *
 * A wrong answer is recorded too: it bumps `lapse_count` and lowers `ease`, so
 * the memory model can push the word back towards short-term memory instead of
 * only ever rewarding the learner.
 *
 * @returns number of rows actually updated.
 */
export async function recordVocabReview(
  subject: string,
  words: string[],
  outcome: ReviewOutcome = {},
): Promise<number> {
  const unique = [...new Set(words.map(w => w.trim()).filter(Boolean))];
  if (unique.length === 0) return 0;
  const failed = outcome.correct === false || outcome.grade === "forgot";
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { data: rows, error } = await (supabase as any)
      .from("user_vocab_mastered")
      .select("word, reviewed_at, review_count, lapse_count, ease")
      .eq("user_id", user.id)
      .eq("subject", subject)
      .in("word", unique);
    if (error || !rows || rows.length === 0) return 0;

    const nowIso = new Date().toISOString();
    let updated = 0;
    type Row = {
      word: string;
      reviewed_at: string | null;
      review_count: number | null;
      lapse_count: number | null;
      ease: number | null;
    };
    for (const row of rows as Row[]) {
      const previous = row.reviewed_at ? new Date(row.reviewed_at).getTime() : Date.now();
      const gapDays = Math.max(0, Math.floor((Date.now() - previous) / DAY_MS));
      const { error: upErr } = await (supabase as any)
        .from("user_vocab_mastered")
        .update({
          reviewed_at: nowIso,
          review_count: Math.max(1, row.review_count ?? 1) + 1,
          last_interval_days: gapDays,
          lapse_count: Math.max(0, row.lapse_count ?? 0) + (failed ? 1 : 0),
          ease: nextEase(Number(row.ease ?? 2.5), outcome),
        })
        .eq("user_id", user.id)
        .eq("subject", subject)
        .eq("word", row.word);
      if (!upErr) updated += 1;
    }
    if (updated > 0) {
      window.dispatchEvent(new CustomEvent(VOCAB_REVIEW_EVENT, { detail: { subject, count: updated } }));
    }
    return updated;
  } catch {
    return 0;
  }
}

/** Local key of the words already reviewed today (mission progress, Vietnam day). */
export const reviewedTodayKey = (subject: string) => `vocab_reviewed_today_${subject}`;

const vnDay = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" })
    .format(new Date());

/** Words reviewed today (used for the daily mission progress bar). */
export const readReviewedToday = (subject: string): string[] => {
  try {
    const raw = localStorage.getItem(reviewedTodayKey(subject));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { day: string; words: string[] };
    return parsed.day === vnDay() ? parsed.words : [];
  } catch { return []; }
};

/** Append words to today's reviewed list (deduplicated, resets each Vietnam day). */
export const markReviewedToday = (subject: string, words: string[]) => {
  try {
    const merged = [...new Set([...readReviewedToday(subject), ...words])];
    localStorage.setItem(reviewedTodayKey(subject), JSON.stringify({ day: vnDay(), words: merged }));
  } catch { /* ignore */ }
};

/**
 * Convenience wrapper: record the review in the database and always track it
 * locally so the daily mission progress also works for guests / offline stars.
 */
export const recordVocabReviewTracked = async (
  subject: string,
  words: string[],
  outcome: ReviewOutcome = {},
) => {
  // A forgotten word must not count towards "reviewed today" progress.
  if (outcome.correct !== false && outcome.grade !== "forgot") markReviewedToday(subject, words);
  const n = await recordVocabReview(subject, words, outcome);
  if (n === 0) {
    window.dispatchEvent(new CustomEvent(VOCAB_REVIEW_EVENT, { detail: { subject, count: 0 } }));
  }
  return n;
};
