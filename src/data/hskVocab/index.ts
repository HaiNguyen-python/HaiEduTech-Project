// ============================================================
// HSK Vocabulary Index — aggregates legacy data + HSK 3.0 official
// Applies official re-leveling and caps total at exactly 6000 words.
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
import { hskExpansion9Words } from "./hskExpansion9";
import { hskExpansion10Words } from "./hskExpansion10";
import { hskExpansion11Words } from "./hskExpansion11";
import { hskExpansion12Words } from "./hskExpansion12";
import { hskExpansion13Words } from "./hskExpansion13";

// HSK 3.0 official expansion (auto-generated from elkmovie/hsk30 + CC-CEDICT)
import { hsk30Level1Words } from "./hsk30Level1";
import { hsk30Level2Words } from "./hsk30Level2";
import { hsk30Level3Words } from "./hsk30Level3";
import { hsk30Level4Words } from "./hsk30Level4";
import { hsk30Level5Words } from "./hsk30Level5";
import { hsk30Level6Words } from "./hsk30Level6";
import { hsk30Level79Words } from "./hsk30Level79";

import { HSK30_OFFICIAL_LEVELS } from "./hsk30LevelMap";
import type { HskWord } from "./types";

const TARGET_TOTAL = 6000;
const LEVEL_ORDER = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6", "HSK 7-9"];

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
  ...hskExpansion9Words,
  ...hskExpansion10Words,
  ...hskExpansion11Words,
  ...hskExpansion12Words,
  ...hskExpansion13Words,
  ...hsk30Level1Words,
  ...hsk30Level2Words,
  ...hsk30Level3Words,
  ...hsk30Level4Words,
  ...hsk30Level5Words,
  ...hsk30Level6Words,
  ...hsk30Level79Words,
];

// Deduplicate by character (keeps first occurrence)
const _seen = new Set<string>();
const _deduped: HskWord[] = [];
for (const w of _all) {
  if (_seen.has(w.character)) continue;
  _seen.add(w.character);
  const officialLevel = HSK30_OFFICIAL_LEVELS[w.character];
  _deduped.push(officialLevel ? { ...w, level: officialLevel } : w);
}

// Cap total at TARGET_TOTAL: take all lower levels first, trim from HSK 7-9.
const _buckets: Record<string, HskWord[]> = {};
for (const lvl of LEVEL_ORDER) _buckets[lvl] = [];
const _other: HskWord[] = [];
for (const w of _deduped) {
  if (_buckets[w.level]) _buckets[w.level].push(w);
  else _other.push(w);
}

const _final: HskWord[] = [];
for (const lvl of LEVEL_ORDER) {
  const remaining = TARGET_TOTAL - _final.length;
  if (remaining <= 0) break;
  const take = _buckets[lvl].slice(0, remaining);
  _final.push(...take);
}
// Fill any leftover slots with words that have unknown levels (rare)
if (_final.length < TARGET_TOTAL && _other.length) {
  _final.push(..._other.slice(0, TARGET_TOTAL - _final.length));
}

export const hskVocabData: HskWord[] = _final;
