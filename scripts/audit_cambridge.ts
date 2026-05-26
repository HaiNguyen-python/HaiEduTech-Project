import { CAMBRIDGE_KIDS_WORDS_MASTER } from "../src/data/cambridgeKidsVocabMaster";
import { CAMBRIDGE_KIDS_WORDS_MASTER_2 } from "../src/data/cambridgeKidsVocabMaster2";
import { CAMBRIDGE_KIDS_WORDS_MASTER_3 } from "../src/data/cambridgeKidsVocabMaster3";
import { CAMBRIDGE_KIDS_WORDS_MASTER_4 } from "../src/data/cambridgeKidsVocabMaster4";
import { CAMBRIDGE_KIDS_WORDS_MASTER_5 } from "../src/data/cambridgeKidsVocabMaster5";
import { CAMBRIDGE_KIDS_WORDS_MASTER_6 } from "../src/data/cambridgeKidsVocabMaster6";
import { CAMBRIDGE_KIDS_WORDS_MASTER_7 } from "../src/data/cambridgeKidsVocabMaster7";
import { CAMBRIDGE_KIDS_WORDS_MASTER_8 } from "../src/data/cambridgeKidsVocabMaster8";
import { CAMBRIDGE_KIDS_WORDS_MASTER_9 } from "../src/data/cambridgeKidsVocabMaster9";
import { CAMBRIDGE_KIDS_WORDS_MASTER_10 } from "../src/data/cambridgeKidsVocabMaster10";
import { CAMBRIDGE_KIDS_WORDS_KET_EXPANSION } from "../src/data/cambridgeKidsVocabKetExpansion";
import { CAMBRIDGE_KIDS_WORDS_ALL_EXPANSION } from "../src/data/cambridgeKidsVocabAllExpansion";
import { CAMBRIDGE_KIDS_WORDS_KET_PET_EXPANSION_2 } from "../src/data/cambridgeKidsVocabKetPetExpansion2";
import { CAMBRIDGE_KIDS_WORDS_KET_PET_EXPANSION_3 } from "../src/data/cambridgeKidsVocabKetPetExpansion3";
import { CAMBRIDGE_KIDS_WORDS_EXPANSION_4 } from "../src/data/cambridgeKidsVocabExpansion4";
import { CAMBRIDGE_KIDS_WORDS_EXPANSION_5 } from "../src/data/cambridgeKidsVocabExpansion5";
import { CAMBRIDGE_KIDS_WORDS_EXPANSION_6 } from "../src/data/cambridgeKidsVocabExpansion6";
import { CAMBRIDGE_KIDS_WORDS_EXPANSION_7 } from "../src/data/cambridgeKidsVocabExpansion7";
import { CAMBRIDGE_KIDS_WORDS_EXPANSION_8 } from "../src/data/cambridgeKidsVocabExpansion8";
import { CAMBRIDGE_KIDS_WORDS_EXPANSION_9 } from "../src/data/cambridgeKidsVocabExpansion9";
import { CAMBRIDGE_KIDS_WORDS_EXPANSION_10 } from "../src/data/cambridgeKidsVocabExpansion10";
import { CAMBRIDGE_KIDS_WORDS_DEDUPED } from "../src/data/cambridgeKidsVocabMaster";

const all = [
  ...CAMBRIDGE_KIDS_WORDS_MASTER, ...CAMBRIDGE_KIDS_WORDS_MASTER_2, ...CAMBRIDGE_KIDS_WORDS_MASTER_3,
  ...CAMBRIDGE_KIDS_WORDS_MASTER_4, ...CAMBRIDGE_KIDS_WORDS_MASTER_5, ...CAMBRIDGE_KIDS_WORDS_MASTER_6,
  ...CAMBRIDGE_KIDS_WORDS_MASTER_7, ...CAMBRIDGE_KIDS_WORDS_MASTER_8, ...CAMBRIDGE_KIDS_WORDS_MASTER_9,
  ...CAMBRIDGE_KIDS_WORDS_MASTER_10,
  ...CAMBRIDGE_KIDS_WORDS_KET_EXPANSION, ...CAMBRIDGE_KIDS_WORDS_ALL_EXPANSION,
  ...CAMBRIDGE_KIDS_WORDS_KET_PET_EXPANSION_2, ...CAMBRIDGE_KIDS_WORDS_KET_PET_EXPANSION_3,
  ...CAMBRIDGE_KIDS_WORDS_EXPANSION_4, ...CAMBRIDGE_KIDS_WORDS_EXPANSION_5,
  ...CAMBRIDGE_KIDS_WORDS_EXPANSION_6, ...CAMBRIDGE_KIDS_WORDS_EXPANSION_7,
  ...CAMBRIDGE_KIDS_WORDS_EXPANSION_8, ...CAMBRIDGE_KIDS_WORDS_EXPANSION_9,
  ...CAMBRIDGE_KIDS_WORDS_EXPANSION_10,
];

// 1) intra-level duplicates (same word appears 2+ times within the SAME level)
const byLevelWord = new Map<string, number>();
for (const w of all) {
  const k = w.level + "|" + w.word.toLowerCase().trim();
  byLevelWord.set(k, (byLevelWord.get(k) ?? 0) + 1);
}
const intraDup: Record<string, string[]> = {};
for (const [k, c] of byLevelWord) if (c > 1) {
  const [lv, word] = k.split("|");
  (intraDup[lv] ??= []).push(`${word}(${c})`);
}
console.log("=== Intra-level duplicates ===");
for (const lv of Object.keys(intraDup)) console.log(lv, intraDup[lv].length, intraDup[lv].slice(0,20).join(", "));

// 2) cross-level duplicates (same word listed at multiple different levels)
const wordLevels = new Map<string, Set<string>>();
for (const w of all) {
  const k = w.word.toLowerCase().trim();
  if (!wordLevels.has(k)) wordLevels.set(k, new Set());
  wordLevels.get(k)!.add(w.level);
}
const cross: string[] = [];
for (const [w, ls] of wordLevels) if (ls.size > 1) cross.push(`${w}=${[...ls].join("/")}`);
console.log("=== Cross-level duplicates ===", cross.length);
console.log(cross.slice(0, 40).join("\n"));

// 3) deduped counts
const byLv: Record<string, number> = {};
for (const w of CAMBRIDGE_KIDS_WORDS_DEDUPED) byLv[w.level] = (byLv[w.level] ?? 0) + 1;
console.log("=== Deduped totals ===", CAMBRIDGE_KIDS_WORDS_DEDUPED.length, byLv);
