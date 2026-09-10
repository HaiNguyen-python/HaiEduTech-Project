/**
 * @file gameSession.ts
 * @description Shared helpers for every mini game / arcade on the site.
 *  - `finishGame` writes the run into `game_scores` and (for vocabulary games)
 *    records the words answered correctly as a spaced-repetition review so the
 *    3D Vocabulary Brain and the daily mission see arcade practice too.
 *  - `useGameAudioCleanup` stops any speech synthesis when a game unmounts, so
 *    leaving a game mid-utterance does not keep talking on the next page.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect } from "react";
import { submitGameScore } from "@/lib/submitGameScore";
import { recordVocabReviewTracked } from "@/lib/vocabReview";

export interface FinishGameParams {
  gameType: string;
  score: number;
  maxStreak?: number;
  accuracy?: number;
  difficulty?: string;
  metadata?: Record<string, unknown>;
  /** Vocabulary subject key (ielts, hsk, vietnamese, finnish-vocab, ...). */
  subject?: string;
  /** Words the learner answered correctly during the run. */
  correctWords?: string[];
}

/** Persist a finished run. Never throws - a logging failure must not break play. */
export const finishGame = async ({
  subject,
  correctWords,
  ...score
}: FinishGameParams): Promise<void> => {
  try {
    await submitGameScore(score);
    if (subject && correctWords?.length) {
      await recordVocabReviewTracked(subject, [...new Set(correctWords)]);
    }
  } catch (e) {
    console.warn("finishGame failed", e);
  }
};

/** Cancel pending speech when the game screen goes away. */
export const useGameAudioCleanup = () => {
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
};
