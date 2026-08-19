/**
 * @file finnishMorphology.ts
 * @description Lightweight, conservative Finnish noun inflection helpers used to
 *              build natural example sentences (A1-B1). Every function returns
 *              `null` when the word type is irregular or not confidently
 *              supported, so callers can fall back to nominative-only templates
 *              instead of producing wrong forms.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

const BACK_VOWELS = "aou";
const FRONT_VOWELS = "äöy";
const ALL_VOWELS = "aeiouyäö";

/** Vowel harmony: true when the word takes back-vowel endings (-ssa, -sta, -a). */
export function isBackHarmony(word: string): boolean {
  const w = word.toLowerCase();
  for (let i = w.length - 1; i >= 0; i--) {
    if (BACK_VOWELS.includes(w[i])) return true;
    if (FRONT_VOWELS.includes(w[i])) return false;
  }
  return true;
}

const harmA = (w: string) => (isBackHarmony(w) ? "a" : "ä");
const harmO = (w: string) => (isBackHarmony(w) ? "o" : "ö");

/** Words we never inflect automatically (multiword, hyphenated, too short). */
function unsupported(word: string): boolean {
  return !word || word.length < 3 || /[\s\-'/(),.]/.test(word);
}

/** Consonant gradation strong -> weak, applied to the final syllable only. */
const GRADATION: [RegExp, string][] = [
  [/kk([aouyäö])$/, "k$1"],
  [/pp([aouyäö])$/, "p$1"],
  [/tt([aouyäö])$/, "t$1"],
  [/nk([aouyäö])$/, "ng$1"],
  [/mp([aouyäö])$/, "mm$1"],
  [/lt([aouyäö])$/, "ll$1"],
  [/nt([aouyäö])$/, "nn$1"],
  [/rt([aouyäö])$/, "rr$1"],
];

/** Single k/p/t between vowels is irregular (katu->kadun, lupa->luvan, aika->ajan). */
const IRREGULAR_SINGLE_STOP = new RegExp(`[${ALL_VOWELS}][kpt][aouyäö]$`);

/**
 * Weak-grade stem for genitive/inessive/elative of vowel-final nouns.
 * Returns null when the gradation pattern is not safely predictable.
 */
export function weakStem(word: string): string | null {
  if (unsupported(word)) return null;
  const w = word.toLowerCase();
  if (!/[aouyäö]$/.test(w)) return null;
  if (IRREGULAR_SINGLE_STOP.test(w)) return null;
  for (const [re, rep] of GRADATION) {
    if (re.test(w)) return w.replace(re, rep);
  }
  return w;
}

/** Consonant right before a final -e (parveke, kide -> unpredictable stems). */
const RISKY_E_STEM = /[kpt]e$/;

/** Partitive singular: talo -> taloa, huone -> huonetta. */
export function partitiveSg(word: string): string | null {
  if (unsupported(word)) return null;
  const w = word.toLowerCase();
  if (/[aouyäö]$/.test(w)) return w + harmA(w);
  if (/e$/.test(w)) return w + "tt" + harmA(w);
  return null;
}

/** Genitive singular: talo -> talon, kauppa -> kaupan, huone -> huoneen. */
export function genitiveSg(word: string): string | null {
  if (unsupported(word)) return null;
  const w = word.toLowerCase();
  if (/e$/.test(w)) return RISKY_E_STEM.test(w) ? null : w + "en";
  const stem = weakStem(w);
  return stem ? stem + "n" : null;
}

/** Inessive singular (in ...): keittiö -> keittiössä, katto -> katossa. */
export function inessiveSg(word: string): string | null {
  const w = word.toLowerCase();
  if (/e$/.test(w) && !RISKY_E_STEM.test(w) && !unsupported(w)) {
    return w + "essa".replace("a", harmA(w));
  }
  const stem = weakStem(w);
  return stem ? stem + "ss" + harmA(w) : null;
}

/** Elative singular (from / about ...): kauppa -> kaupasta, huone -> huoneesta. */
export function elativeSg(word: string): string | null {
  const w = word.toLowerCase();
  if (/e$/.test(w) && !RISKY_E_STEM.test(w) && !unsupported(w)) {
    return w + "est" + harmA(w);
  }
  const stem = weakStem(w);
  return stem ? stem + "st" + harmA(w) : null;
}

/** Adessive singular (on / with ...): pöytä -> pöydällä is irregular -> null. */
export function adessiveSg(word: string): string | null {
  const stem = weakStem(word);
  return stem ? stem + "ll" + harmA(word) : null;
}

/** Illative singular (into ...): talo -> taloon, huone -> huoneeseen. */
export function illativeSg(word: string): string | null {
  if (unsupported(word)) return null;
  const w = word.toLowerCase();
  if (/e$/.test(w)) return RISKY_E_STEM.test(w) ? null : w + "eseen";
  if (/[aouyäö]$/.test(w)) return w + w.slice(-1) + "n"; // strong grade kept: taloon, kauppaan
  return null;
}

/** Translative-free helper used by templates that need "-n" possessor form. */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const HARMONY = { harmA, harmO };
