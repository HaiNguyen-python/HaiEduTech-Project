/**
 * @file cambridgeKidsVocabCurated.ts
 * @description Single source of truth for the Cambridge YLE Vocabulary bank.
 *
 * It takes the large aggregated word pool from `cambridgeKidsVocabMaster`
 * (~6000 entries collected over many expansions) and filters it against the
 * official Cambridge wordlists (Starters / Movers / Flyers / KET / PET).
 *
 * Rules enforced here:
 *  1. A word is DROPPED if it isn't on any official Cambridge wordlist.
 *  2. A word is RE-LEVELLED to its lowest matching official level — so
 *     "apple" never appears as Flyers and "achievement" never as Starters.
 *  3. Within a level, words are sorted alphabetically.
 *  4. The original kid-friendly examples / emojis / Vietnamese translations
 *     are preserved verbatim.
 */
import type { CambridgeKidsWord } from "./cambridgeKidsVocab";
import { CAMBRIDGE_KIDS_WORDS_DEDUPED } from "./cambridgeKidsVocabMaster";
import { classifyCambridgeLevel } from "./cambridgeYleOfficialWordlist";

const LEVEL_RANK: Record<string, number> = {
  Starters: 1, Movers: 2, Flyers: 3, KET: 4, PET: 5,
};

const map = new Map<string, CambridgeKidsWord>();
for (const w of CAMBRIDGE_KIDS_WORDS_DEDUPED) {
  const official = classifyCambridgeLevel(w.word);
  if (!official) continue; // drop off-syllabus entries
  const reLevelled: CambridgeKidsWord = { ...w, level: official };
  const key = w.word.toLowerCase().trim();
  const cur = map.get(key);
  if (!cur || LEVEL_RANK[reLevelled.level] < LEVEL_RANK[cur.level]) {
    map.set(key, reLevelled);
  }
}

/**
 * Curated Cambridge YLE vocabulary, level-correct and on-syllabus.
 * Used by the Cambridge YLE Vocabulary page and practice modules.
 */
export const CAMBRIDGE_KIDS_WORDS_CURATED: CambridgeKidsWord[] =
  [...map.values()].sort((a, b) => {
    const r = (LEVEL_RANK[a.level] || 99) - (LEVEL_RANK[b.level] || 99);
    return r !== 0 ? r : a.word.localeCompare(b.word);
  });
