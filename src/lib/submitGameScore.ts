/**
 * Shared helper to persist a single game score row into `game_scores`.
 * Silently no-ops when the user is not authenticated.
 */
import { supabase } from "@/integrations/supabase/client";

export async function submitGameScore(params: {
  gameType: string;
  score: number;
  maxStreak?: number;
  accuracy?: number;
  difficulty?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await (supabase as any).from("game_scores").insert({
      user_id: user.id,
      game_type: params.gameType,
      score: Math.max(0, Math.round(params.score)),
      max_streak: params.maxStreak ?? 0,
      accuracy: params.accuracy ?? null,
      difficulty: params.difficulty ?? "normal",
      metadata: params.metadata ?? {},
    });
  } catch (e) {
    // non-fatal
    console.warn("submitGameScore failed", e);
  }
}
