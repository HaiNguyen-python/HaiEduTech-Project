/**
 * Aggregated English translations for every Swedish Speaking Coach sentence,
 * keyed by sentence id. Used to render EN translations when the UI is English.
 */
import { SWEDISH_EN_1 } from "./swedishSpeakingEnglish1";
import { SWEDISH_EN_2 } from "./swedishSpeakingEnglish2";
import { SWEDISH_EN_3 } from "./swedishSpeakingEnglish3";

export const SWEDISH_SENTENCE_EN: Record<string, string> = {
  ...SWEDISH_EN_1,
  ...SWEDISH_EN_2,
  ...SWEDISH_EN_3,
};

/** Returns the English translation for a sentence id, or undefined. */
export const swedishSentenceEn = (id: string): string | undefined =>
  SWEDISH_SENTENCE_EN[id];
