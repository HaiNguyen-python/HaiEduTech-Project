// Shared types for TOEIC vocabulary modules.
// Kept in a standalone file to avoid circular imports between
// `toeicVocabData.ts` and the expansion modules.

export interface ToeicWord {
  word: string;
  wordClass: string; // n, v, adj, adv
  ipa: string;
  level: "basic" | "intermediate" | "advanced";
  definition: { en: string; vi: string };
  example: string;
  synonyms: string[];
  collocations: string[];
  category: string;
}
