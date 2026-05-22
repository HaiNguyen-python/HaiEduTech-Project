// ============================================================
// HSK Vocabulary Index - Aggregates all HSK 1-6 data
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
import { hskExpansion2Words } from "./hskExpansion2";
import { hskExpansion3Words } from "./hskExpansion3";
import { hskExpansion4Words } from "./hskExpansion4";
import { hskExpansion5Words } from "./hskExpansion5";
import { hskExpansion6Words } from "./hskExpansion6";
import { hskExpansion7Words } from "./hskExpansion7";
import { hskExpansion8Words } from "./hskExpansion8";

import type { HskWord } from "./types";

const _all: HskWord[] = [
  ...hsk1Words,
  ...hsk2Words,
  ...hsk3Words,
  ...hsk4Words,
  ...hsk5Words,
  ...hsk6Words,
  ...hskExpansionWords,
  ...hskExpansion2Words,
  ...hskExpansion3Words,
  ...hskExpansion4Words,
  ...hskExpansion5Words,
  ...hskExpansion6Words,
  ...hskExpansion7Words,
  ...hskExpansion8Words,
];

// Deduplicate by character (keeps first occurrence)
const _seen = new Set<string>();
export const hskVocabData: HskWord[] = _all.filter((w) => {
  if (_seen.has(w.character)) return false;
  _seen.add(w.character);
  return true;
});
