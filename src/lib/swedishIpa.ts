/**
 * @file swedishIpa.ts
 * @description Rule-based Swedish → IPA transcriber. Approximate but consistent
 *              phonemic output used as a fallback when a vocab entry lacks an
 *              explicit `ipa` field. Covers the core Central Standard Swedish
 *              (rikssvenska) sound patterns:
 *                - Soft/hard k, g, sk (k/g + e,i,y,ä,ö → ɕ/j; sk → ɧ)
 *                - Digraphs: sj, skj, stj, sch, ch → ɧ; tj, kj → ɕ; ng → ŋ
 *                - Retroflex from r+dental (rs → ʂ, rt → ʈ, rd → ɖ, rn → ɳ, rl → ɭ)
 *                - Vowel length by following consonant cluster
 *                - Common exceptions (och, jag, mig, dig, sig, det, de, dem, är…)
 *
 *              Not perfect (Swedish tone/pitch accent isn't marked, and loanwords
 *              vary), but reliable enough to give learners a usable pronunciation
 *              hint for every entry in the vocab bank.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

/* -------------------- Manual overrides (common irregulars) -------------------- */
const OVERRIDES: Record<string, string> = {
  "och": "ɔk",
  "jag": "jɑː",
  "mig": "mɛj",
  "dig": "dɛj",
  "sig": "sɛj",
  "de": "dɔm",
  "dem": "dɔm",
  "det": "deː",
  "är": "ɛːr",
  "har": "hɑːr",
  "var": "vɑːr",
  "här": "hæːr",
  "där": "dæːr",
  "vem": "vɛm",
  "vad": "vɑːd",
  "hur": "hʉːr",
  "när": "nɛːr",
  "sjuk": "ɧʉːk",
  "själv": "ɧɛlv",
  "sju": "ɧʉː",
  "kött": "ɕœt",
  "tjugo": "ɕʉːɡʊ",
  "sked": "ɧeːd",
  "skön": "ɧøːn",
  "ok": "uːk",
  "tack": "tak",
  "hej": "hɛj",
  "nej": "nɛj",
  "ja": "jɑː",
  "en": "ɛn",
  "ett": "ɛt",
  "till": "tɪl",
  "på": "poː",
  "att": "at",
  "med": "meːd",
  "för": "fœr",
  "från": "froːn",
  "som": "sɔm",
  "kan": "kan",
  "ska": "skɑː",
  "vill": "vɪl",
  "inte": "ˈɪntɛ",
  "också": "ˈɔkˌsoː",
  "mycket": "ˈmʏkɛ",
  "nu": "nʉː",
  "bra": "brɑː",
  "hus": "hʉːs",
  "man": "man",
  "kvinna": "ˈkvɪnːa",
  "barn": "bɑːɳ",
  "familj": "faˈmɪlj",
  "vatten": "ˈvatːɛn",
  "mat": "mɑːt",
  "bok": "buːk",
  "böcker": "ˈbœkɛr",
  "stad": "stɑːd",
  "land": "land",
  "år": "oːr",
  "dag": "dɑːɡ",
  "natt": "nat",
  "morgon": "ˈmɔrːɔn",
  "kväll": "kvɛl",
  "tid": "tiːd",
};

const FRONT_VOWELS = new Set(["e", "i", "y", "ä", "ö"]);

/* -------------------- Character-level mappers -------------------- */
const shortVowelMap: Record<string, string> = {
  a: "a", e: "ɛ", i: "ɪ", o: "ɔ", u: "ɵ", y: "ʏ",
  å: "ɔ", ä: "ɛ", ö: "œ",
};
const longVowelMap: Record<string, string> = {
  a: "ɑː", e: "eː", i: "iː", o: "uː", u: "ʉː", y: "yː",
  å: "oː", ä: "ɛː", ö: "øː",
};

const isVowel = (c: string) => c in shortVowelMap;

/* -------------------- Main transcriber -------------------- */
export function generateSwedishIpa(input: string): string {
  const word = input.trim().toLowerCase();
  if (!word) return "";
  if (OVERRIDES[word]) return `/${OVERRIDES[word]}/`;

  const chars = word.split("");
  const out: string[] = [];
  let i = 0;

  // Determine vowel length: for each vowel we look at the following consonant cluster
  // until next vowel or end. If cluster length === 1 → long, ≥ 2 → short, 0 → long.
  const vowelIsLong = (idx: number): boolean => {
    let j = idx + 1;
    let cons = 0;
    while (j < chars.length && !isVowel(chars[j])) { cons++; j++; }
    if (cons === 0) return true;
    if (cons === 1) return true;
    return false;
  };

  while (i < chars.length) {
    const c = chars[i];
    const c2 = chars[i + 1] ?? "";
    const c3 = chars[i + 2] ?? "";
    const next = chars[i + 1] ?? "";

    // 3-letter digraphs
    if (c === "s" && c2 === "k" && c3 === "j") { out.push("ɧ"); i += 3; continue; }
    if (c === "s" && c2 === "t" && c3 === "j") { out.push("ɧ"); i += 3; continue; }
    if (c === "s" && c2 === "c" && c3 === "h") { out.push("ɧ"); i += 3; continue; }

    // 2-letter digraphs
    if (c === "s" && c2 === "j") { out.push("ɧ"); i += 2; continue; }
    if (c === "s" && c2 === "k" && FRONT_VOWELS.has(c3)) { out.push("ɧ"); i += 2; continue; }
    if (c === "t" && c2 === "j") { out.push("ɕ"); i += 2; continue; }
    if (c === "k" && c2 === "j") { out.push("ɕ"); i += 2; continue; }
    if (c === "c" && c2 === "h") { out.push("ɕ"); i += 2; continue; }
    if (c === "n" && c2 === "g") { out.push("ŋ"); i += 2; continue; }
    if (c === "g" && c2 === "n") { out.push("ŋn"); i += 2; continue; }

    // Retroflex from historical r + dental (marks r as retroflex quality on the dental)
    if (c === "r" && c2 === "s") { out.push("ʂ"); i += 2; continue; }
    if (c === "r" && c2 === "t") { out.push("ʈ"); i += 2; continue; }
    if (c === "r" && c2 === "d") { out.push("ɖ"); i += 2; continue; }
    if (c === "r" && c2 === "n") { out.push("ɳ"); i += 2; continue; }
    if (c === "r" && c2 === "l") { out.push("ɭ"); i += 2; continue; }

    // Double consonant collapses to single phoneme (length shortens preceding vowel already)
    if (!isVowel(c) && c === c2) {
      // skip second letter
      // fallthrough to single-consonant mapping using c
    }

    // Soft k / g before front vowel
    if (c === "k" && FRONT_VOWELS.has(next)) { out.push("ɕ"); i++; continue; }
    if (c === "g" && FRONT_VOWELS.has(next)) { out.push("j"); i++; continue; }
    if (c === "c" && FRONT_VOWELS.has(next)) { out.push("s"); i++; continue; }

    // Vowels with length calculation
    if (isVowel(c)) {
      const long = vowelIsLong(i);
      out.push(long ? longVowelMap[c] : shortVowelMap[c]);
      i++;
      continue;
    }

    // Simple consonants
    switch (c) {
      case "b": out.push("b"); break;
      case "c": out.push("k"); break;
      case "d": out.push("d"); break;
      case "f": out.push("f"); break;
      case "g": out.push("ɡ"); break;
      case "h": out.push("h"); break;
      case "j": out.push("j"); break;
      case "k": out.push("k"); break;
      case "l": out.push("l"); break;
      case "m": out.push("m"); break;
      case "n": out.push("n"); break;
      case "p": out.push("p"); break;
      case "q": out.push("k"); break;
      case "r": out.push("r"); break;
      case "s": out.push("s"); break;
      case "t": out.push("t"); break;
      case "v": case "w": out.push("v"); break;
      case "x": out.push("ks"); break;
      case "z": out.push("s"); break;
      case "'": case "-": break;
      default: out.push(c);
    }

    // Skip second half of doubled consonants
    if (!isVowel(c) && c === c2) i += 2;
    else i++;
  }

  // Collapse accidental doubles
  const raw = out.join("").replace(/(.)\1+/g, "$1$1").replace(/ːː+/g, "ː");
  return `/${raw}/`;
}

/**
 * Return the entry's own IPA if present, otherwise derive one from the Swedish
 * form. Supports multi-word phrases (transcribes each token).
 */
export function ensureSwedishIpa(sv: string, existing?: string): string {
  if (existing && existing.trim()) return existing;
  const tokens = sv.split(/\s+/).filter(Boolean);
  if (tokens.length === 1) return generateSwedishIpa(tokens[0]);
  const parts = tokens.map((t) => generateSwedishIpa(t).replace(/^\/|\/$/g, ""));
  return `/${parts.join(" ")}/`;
}
