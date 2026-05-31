// ============================================================
// HSK Vocabulary Index - aggregates legacy data + HSK 3.0 official
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

// Clean each entry (strip digit suffix from char, clean CC-CEDICT annotations,
// translate common English glosses into Vietnamese, normalise pinyin), THEN
// dedupe by cleaned character and apply official re-leveling.
import { cleanHskWord } from "./cleanData";

const _seen = new Set<string>();
const _deduped: HskWord[] = [];
for (const raw of _all) {
  const w = cleanHskWord(raw);
  if (!w.character || _seen.has(w.character)) continue;
  _seen.add(w.character);
  const officialLevel = HSK30_OFFICIAL_LEVELS[w.character];
  _deduped.push(officialLevel ? { ...w, level: officialLevel } : w);
}

// Pyramid caps so the distribution stays strictly ascending (HSK1 < HSK2 < ... < HSK7-9).
// Total target = 6000. HSK 1 capped below the 300-word official limit so that
// HSK 2 can clearly exceed it after floating words are promoted upward.
const LEVEL_CAPS: Record<string, number> = {
  "HSK 1": 280,
  "HSK 2": 320,
  "HSK 3": 600,
  "HSK 4": 1020,
  "HSK 5": 1130,
  "HSK 6": 1300,
  "HSK 7-9": 1500,
};

// Officially-mapped words go to their canonical level (respecting caps).
// Unmapped words are "floating" and get promoted up the pyramid if their
// requested level is already full - this preserves the strict ascending shape.
const _buckets: Record<string, HskWord[]> = {};
for (const lvl of LEVEL_ORDER) _buckets[lvl] = [];
const _floating: HskWord[] = [];

for (const w of _deduped) {
  const isOfficial = !!HSK30_OFFICIAL_LEVELS[w.character];
  if (isOfficial && _buckets[w.level] && _buckets[w.level].length < LEVEL_CAPS[w.level]) {
    _buckets[w.level].push(w);
  } else {
    _floating.push(w);
  }
}

for (const w of _floating) {
  const startIdx = Math.max(0, LEVEL_ORDER.indexOf(w.level));
  for (let i = startIdx; i < LEVEL_ORDER.length; i++) {
    const lvl = LEVEL_ORDER[i];
    if (_buckets[lvl].length < LEVEL_CAPS[lvl]) {
      _buckets[lvl].push({ ...w, level: lvl });
      break;
    }
  }
}

const _final: HskWord[] = [];
for (const lvl of LEVEL_ORDER) _final.push(..._buckets[lvl]);

export const hskVocabData: HskWord[] = _final.slice(0, TARGET_TOTAL);
