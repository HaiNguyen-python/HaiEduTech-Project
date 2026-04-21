// ============================================================
// HSK Vocabulary Index — Aggregates all HSK 1-6 data
// Lazy-loaded per level for performance optimization
// ============================================================
export type { HskWord } from "./types";
export { HSK_LEVELS, HSK_CATEGORIES } from "./types";

import { hsk1Words } from "./hsk1";
import { hsk2Words } from "./hsk2";
import { hsk3Words } from "./hsk3";
import { hsk4Words } from "./hsk4";
import { hsk5Words } from "./hsk5";
import { hsk6Words } from "./hsk6";
import { hskExpansionWords } from "./hskExpansion";

// Combined HSK 1-6 vocabulary bank (~1340 words)
export const hskVocabData = [
  ...hsk1Words,
  ...hsk2Words,
  ...hsk3Words,
  ...hsk4Words,
  ...hsk5Words,
  ...hsk6Words,
  ...hskExpansionWords,
];
