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
  [/kk([aouyäöi])$/, "k$1"],
  [/pp([aouyäöi])$/, "p$1"],
  [/tt([aouyäöi])$/, "t$1"],
  [/nk([aouyäöi])$/, "ng$1"],
  [/mp([aouyäöi])$/, "mm$1"],
  [/lt([aouyäöi])$/, "ll$1"],
  [/nt([aouyäöi])$/, "nn$1"],
  [/rt([aouyäöi])$/, "rr$1"],
];

/** Single k/p/t between vowels is irregular (katu->kadun, lupa->luvan, aika->ajan). */
const IRREGULAR_SINGLE_STOP = new RegExp(`[${ALL_VOWELS}][kpt][aouyäöi]$`);

/** Consonant right before a final -e (parveke, kide -> unpredictable stems). */
const RISKY_E_STEM = /[kptd]e$/;

/**
 * Common native -i nouns whose oblique stem is irregular (ovi -> oven,
 * vesi -> veden, käsi -> käden). We never inflect these automatically.
 */
const NATIVE_I_STEMS = new Set([
  "ovi", "kivi", "järvi", "meri", "vesi", "käsi", "uusi", "kuusi", "susi", "vuosi", "kuukausi",
  "tosi", "lapsi", "hirsi", "jälki", "kaikki", "lehti", "tunti", "veitsi", "yksi", "kaksi",
  "hetki", "onni", "nimi", "lumi", "tuli", "suomi", "salmi", "niemi", "toimi", "loppu",
  "kieli", "tuoli", "nuori", "suuri", "pieni", "sieni", "hiiri", "tyyni", "ääni", "juuri",
  "koti", "tähti", "sääri", "vieri", "ilmi", "veri", "hiili", "tuuli", "puoli", "puoli",
]);

interface StemSet {
  /** Stem used by genitive / inessive / elative / illative, or null when unsafe. */
  oblique: string | null;
  /** Ready-made partitive singular, or null when unsafe. */
  partitive: string | null;
  /** Ready-made illative singular, or null when unsafe. */
  illative: string | null;
}

/** Applies strong -> weak consonant gradation to the final syllable. */
function weaken(stem: string): string {
  for (const [re, rep] of GRADATION) {
    if (re.test(stem)) return stem.replace(re, rep);
  }
  return stem;
}

/** Analyses a noun/adjective and returns the forms we can build confidently. */
export function analyse(word: string): StemSet {
  const none: StemSet = { oblique: null, partitive: null, illative: null };
  if (unsupported(word)) return none;
  const w = word.toLowerCase();
  const a = harmA(w);

  // -nen words: punainen -> punaista / punaisen / punaiseen
  if (/nen$/.test(w) && w.length > 4) {
    const base = w.slice(0, -3);
    return { oblique: base + "se", partitive: base + "s" + "t" + a, illative: base + "seen" };
  }

  // -uus / -yys abstract nouns: kauneus -> kauneutta / kauneuden
  if (/(uus|yys)$/.test(w)) {
    const base = w.slice(0, -2) + (w.endsWith("uus") ? "ude" : "yde");
    return { oblique: base, partitive: w.slice(0, -1) + "tt" + a, illative: base + "en" };
  }

  // -us / -ys / -os / -ös / -es verbal nouns: vastaus -> vastausta / vastauksen
  if (/(us|ys|os|ös|es)$/.test(w)) {
    const base = w.slice(0, -1) + "kse";
    return { oblique: base, partitive: w + "t" + a, illative: base + "en" };
  }

  // -in tool nouns: puhelin -> puhelinta / puhelimen
  if (/in$/.test(w) && w.length > 4) {
    const base = w.slice(0, -2) + "me";
    return { oblique: base, partitive: w + "t" + a, illative: base + "en" };
  }

  // Other -s / -l / -r / -t / -n endings: partitive only (oppilas -> oppilasta)
  if (/[slrtn]$/.test(w)) {
    return { oblique: null, partitive: w + "t" + a, illative: null };
  }

  // -e nouns: huone -> huonetta / huoneen / huoneeseen
  if (/e$/.test(w)) {
    const safe = !RISKY_E_STEM.test(w);
    return {
      oblique: safe ? w + "e" : null,
      partitive: w + "tt" + a,
      illative: safe ? w + "eseen" : null,
    };
  }

  // -i nouns: loanwords are regular (bussi -> bussia / bussin); native stems are not
  if (/i$/.test(w)) {
    if (NATIVE_I_STEMS.has(w) || /si$/.test(w)) return none;
    const oblique = IRREGULAR_SINGLE_STOP.test(w) ? null : weaken(w);
    return { oblique, partitive: w + a, illative: w + "in" };
  }

  // Plain vowel-final nouns: talo -> taloa / talon / taloon
  if (/[aouyäö]$/.test(w)) {
    const oblique = IRREGULAR_SINGLE_STOP.test(w) ? null : weaken(w);
    return { oblique, partitive: w + a, illative: w + w.slice(-1) + "n" };
  }

  return none;
}

/** Weak-grade oblique stem (kept for backwards compatibility). */
export function weakStem(word: string): string | null {
  return analyse(word).oblique;
}

/** Partitive singular: talo -> taloa, huone -> huonetta, oppilas -> oppilasta. */
export function partitiveSg(word: string): string | null {
  return analyse(word).partitive;
}

/** Genitive singular: talo -> talon, kauppa -> kaupan, huone -> huoneen. */
export function genitiveSg(word: string): string | null {
  const s = analyse(word).oblique;
  return s ? s + "n" : null;
}

/** Inessive singular (in ...): keittiö -> keittiössä, katto -> katossa. */
export function inessiveSg(word: string): string | null {
  const s = analyse(word).oblique;
  return s ? s + "ss" + harmA(word) : null;
}

/** Elative singular (from / about ...): kauppa -> kaupasta, huone -> huoneesta. */
export function elativeSg(word: string): string | null {
  const s = analyse(word).oblique;
  return s ? s + "st" + harmA(word) : null;
}

/** Adessive singular (on / with ...): talo -> talolla. */
export function adessiveSg(word: string): string | null {
  const s = analyse(word).oblique;
  return s ? s + "ll" + harmA(word) : null;
}

/** Illative singular (into ...): talo -> taloon, huone -> huoneeseen. */
export function illativeSg(word: string): string | null {
  return analyse(word).illative;
}


/** Translative-free helper used by templates that need "-n" possessor form. */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const HARMONY = { harmA, harmO };
