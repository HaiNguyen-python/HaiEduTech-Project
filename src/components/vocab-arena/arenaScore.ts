// Single place where a Vocab Arena mini game reports its result.
// Before this, mini-game scores lived only in localStorage: the class
// leaderboard, the activity log and the 3D Vocabulary Brain never saw them.
import { supabase } from "@/integrations/supabase/client";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { recordVocabReviewTracked } from "@/lib/vocabReview";
import type { GameKey } from "./gameFx";

export interface ArenaGameLog {
  game: GameKey;
  score: number;
  /** 0..1 */
  accuracy?: number;
  maxStreak?: number;
  timeSpentSeconds?: number;
  /** Words answered correctly - they count as a spaced-repetition review. */
  correctWords?: string[];
}

export const logArenaGame = async ({
  game,
  score,
  accuracy,
  maxStreak,
  timeSpentSeconds,
  correctWords,
}: ArenaGameLog) => {
  try {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) return;

    await (supabase as any).from("game_scores").insert({
      user_id: user.id,
      game_type: `vocab-arena-${game}`,
      score,
      max_streak: maxStreak ?? 0,
      accuracy: accuracy ?? null,
      time_spent_seconds: timeSpentSeconds ?? null,
    });

    void logStudentActivity({
      activityType: "vocab_arena_minigame",
      score: Math.round((accuracy ?? 0) * 10),
      maxScore: 10,
      timeSpentSeconds: timeSpentSeconds ?? 0,
      domain: "english",
      metadata: { game, score, maxStreak: maxStreak ?? 0 },
    });

    if (correctWords?.length) {
      await recordVocabReviewTracked("ielts", [...new Set(correctWords)]);
    }
  } catch (e) {
    console.warn("[VocabArena] failed to log game result", e);
  }
};
