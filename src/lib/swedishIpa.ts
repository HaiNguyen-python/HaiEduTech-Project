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

  // ── Extended common vocabulary (hand-checked) ──
  // Pronouns / function words
  "du": "dʉː", "han": "han", "hon": "hʊn", "vi": "viː", "ni": "niː",
  "min": "miːn", "din": "diːn", "sin": "siːn", "vår": "voːr", "er": "eːr",
  "eller": "ˈɛlːɛr", "men": "mɛn", "om": "ɔm", "av": "ɑːv", "efter": "ˈɛftɛr",
  "före": "ˈføːrɛ", "under": "ˈɵndɛr", "över": "ˈøːvɛr", "mellan": "ˈmɛlːan",
  "utan": "ˈʉːtan", "andra": "ˈandra", "alla": "ˈalːa", "ingen": "ˈɪŋːɛn",
  "något": "ˈnoːɡɔt", "någon": "ˈnoːɡɔn", "detta": "ˈdɛtːa", "den": "dɛn",
  "denna": "ˈdɛnːa", "dessa": "ˈdɛsːa",

  // High-frequency verbs
  "gå": "ɡoː", "gick": "jɪk", "göra": "ˈjøːra", "gör": "jœr", "gjorde": "ˈjuːɖɛ",
  "säga": "ˈsɛːja", "sa": "sɑː", "sagt": "sakt",
  "se": "seː", "ser": "seːr", "såg": "soːɡ",
  "komma": "ˈkɔmːa", "kom": "kɔm", "kommer": "ˈkɔmːɛr",
  "ta": "tɑː", "tar": "tɑːr", "tog": "tuːɡ",
  "ge": "jeː", "ger": "jeːr", "gav": "ɡɑːv",
  "veta": "ˈveːta", "vet": "veːt", "visste": "ˈvɪsːtɛ",
  "tro": "truː", "tror": "truːr",
  "tycka": "ˈtʏkːa", "tänka": "ˈtɛŋːka",
  "höra": "ˈhøːra", "hör": "høːr",
  "läsa": "ˈlɛːsa", "skriva": "ˈskriːva", "prata": "ˈprɑːta", "tala": "ˈtɑːla",
  "titta": "ˈtɪtːa", "lyssna": "ˈlʏsːna",
  "sova": "ˈsoːva", "vakna": "ˈvakːna",
  "äta": "ˈɛːta", "dricka": "ˈdrɪkːa",
  "köpa": "ˈɕøːpa", "sälja": "ˈsɛlːja", "betala": "bɛˈtɑːla",
  "arbeta": "ˈarːˌbeːta", "jobba": "ˈjɔbːa",
  "bo": "buː", "bor": "buːr",
  "resa": "ˈreːsa", "åka": "ˈoːka", "köra": "ˈɕøːra",
  "springa": "ˈsprɪŋːa", "simma": "ˈsɪmːa", "cykla": "ˈsʏklːa",
  "börja": "ˈbœrːja", "sluta": "ˈslʉːta",
  "hjälpa": "ˈjɛlːpa", "vänta": "ˈvɛnːta",
  "öppna": "ˈœpːna", "stänga": "ˈstɛŋːa",
  "träffa": "ˈtrɛfːa", "möta": "ˈmøːta",
  "laga": "ˈlɑːɡa", "städa": "ˈstɛːda", "tvätta": "ˈtvɛtːa", "diska": "ˈdɪskːa",

  // Adjectives
  "stor": "stuːr", "liten": "ˈliːtɛn", "lång": "lɔŋ", "kort": "kʊʈ",
  "hög": "høːɡ", "låg": "loːɡ", "ny": "nyː", "gammal": "ˈɡamːal",
  "ung": "ɵŋ", "snabb": "snab", "långsam": "ˈlɔŋːsam",
  "god": "ɡuːd", "dålig": "ˈdoːlɪɡ", "fin": "fiːn", "ful": "fʉːl",
  "vacker": "ˈvakːɛr", "rolig": "ˈruːlɪɡ", "tråkig": "ˈtroːkɪɡ",
  "svår": "svoːr", "lätt": "lɛt", "enkel": "ˈɛŋːkɛl",
  "trött": "trœt", "pigg": "pɪɡ", "frisk": "frɪsk",
  "rik": "riːk", "fattig": "ˈfatːɪɡ", "dyr": "dyːr", "billig": "ˈbɪlːɪɡ",
  "viktig": "ˈvɪktːɪɡ", "farlig": "ˈfɑːɭɪɡ", "säker": "ˈsɛːkɛr",
  "rätt": "rɛt", "fel": "feːl", "sann": "san",
  "svensk": "svɛnsk", "engelsk": "ˈɛŋːɛlsk",

  // Nouns — body
  "huvud": "ˈhʉːvɵd", "hår": "hoːr", "öga": "ˈøːɡa", "öra": "ˈøːra",
  "näsa": "ˈnɛːsa", "mun": "mɵn", "tand": "tand", "hals": "hals",
  "arm": "arm", "hand": "hand", "finger": "ˈfɪŋːɛr", "ben": "beːn",
  "fot": "fuːt", "rygg": "rʏɡ", "mage": "ˈmɑːɡɛ", "ansikte": "ˈansɪktɛ",

  // Nouns — home / daily
  "dörr": "dœr", "fönster": "ˈfœnːstɛr", "bord": "buːɖ", "stol": "stuːl",
  "säng": "sɛŋ", "soffa": "ˈsɔfːa", "lampa": "ˈlampa",
  "kök": "ɕøːk", "badrum": "ˈbɑːdrɵm", "sovrum": "ˈsoːvrɵm", "rum": "rɵm",
  "lägenhet": "ˈlɛːɡɛnˌheːt", "trädgård": "ˈtrɛːdˌɡoːɖ",

  // Nouns — food
  "bröd": "brøːd", "smör": "smœr", "ost": "ʊst", "ägg": "ɛɡ", "mjölk": "mjœlk",
  "kaffe": "ˈkafːɛ", "te": "teː", "juice": "jʊs", "öl": "øːl", "vin": "viːn",
  "fisk": "fɪsk", "kyckling": "ˈɕʏklɪŋ",
  "frukt": "frɵkt", "grönsak": "ˈɡrøːnsak", "äpple": "ˈɛplːɛ", "banan": "baˈnɑːn",
  "potatis": "pʊˈtɑːtɪs", "ris": "riːs", "pasta": "ˈpasta", "sallad": "ˈsalːad",
  "socker": "ˈsɔkːɛr", "salt": "salt", "peppar": "ˈpɛpːar",

  // Nouns — nature / weather
  "sol": "suːl", "måne": "ˈmoːnɛ", "himmel": "ˈhɪmːɛl", "moln": "mʊln",
  "regn": "rɛŋn", "snö": "snøː", "vind": "vɪnd", "väder": "ˈvɛːdɛr",
  "sommar": "ˈsɔmːar", "vinter": "ˈvɪntɛr", "höst": "hœst",
  "sjö": "ɧøː", "hav": "hɑːv", "berg": "bærj", "skog": "skuːɡ", "träd": "trɛːd",

  // Nouns — transport / places
  "bil": "biːl", "buss": "bɵs", "tåg": "toːɡ", "cykel": "ˈsʏkːɛl",
  "flygplan": "ˈflyːɡˌplɑːn", "båt": "boːt",
  "gata": "ˈɡɑːta", "väg": "vɛːɡ", "bro": "bruː", "torg": "tɔrj",
  "affär": "aˈfæːr", "butik": "bʉˈtiːk", "restaurang": "ˌrɛstɔˈraŋ",

  // Numbers
  "noll": "nɔl", "två": "tvoː", "tre": "treː", "fyra": "ˈfyːra",
  "fem": "fɛm", "sex": "sɛks", "åtta": "ˈɔtːa", "nio": "ˈniːʊ",
  "tio": "ˈtiːʊ", "elva": "ˈɛlːva", "tolv": "tɔlv", "tretton": "ˈtrɛtːɔn",
  "hundra": "ˈhɵndra", "tusen": "ˈtʉːsɛn",

  // Time / days
  "måndag": "ˈmɔnːˌdɑːɡ", "tisdag": "ˈtiːsˌdɑːɡ", "onsdag": "ˈuːnsˌdɑːɡ",
  "torsdag": "ˈtuːʂˌdɑːɡ", "fredag": "ˈfreːˌdɑːɡ", "lördag": "ˈlœːɖɑːɡ",
  "söndag": "ˈsœnːˌdɑːɡ",
  "idag": "ɪˈdɑːɡ", "imorgon": "ɪˈmɔrːɔn", "igår": "ɪˈɡoːr",
  "vecka": "ˈvɛkːa", "månad": "ˈmoːnad",
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


/* Inflectional endings that are always unstressed. Soft k/g must NOT apply to
   the front vowel of these endings: "köket" is /ˈɕøːkɛt/, not /ˈɕøːɕɛt/. */
const UNSTRESSED_ENDINGS = new Set([
  "e", "en", "et", "er", "ern", "ens", "ets", "erna", "ena",
  "or", "orna", "ar", "arna", "arne", "ad", "at", "as", "an", "ande", "andet",
]);

/* Prefixes that push the main stress onto the second syllable (betala, förklara). */
const UNSTRESSED_PREFIXES = ["be", "för", "ge", "åter", "miss"];

export function generateSwedishIpa(input: string): string {
  const word = input.trim().toLowerCase();
  if (!word) return "";
  if (OVERRIDES[word]) return `/${OVERRIDES[word]}/`;

  const chars = word.split("");
  const out: string[] = [];

  /* ---- Syllable structure: index of the first vowel of every vowel group ---- */
  const groupVowelStart: number[] = [];
  for (let k = 0; k < chars.length; k++) {
    if (isVowel(chars[k]) && !(k > 0 && isVowel(chars[k - 1]))) groupVowelStart.push(k);
  }
  const syllables = groupVowelStart.length;

  // Which syllable carries the main stress (0-based).
  let stressedGroup = 0;
  if (syllables >= 3 && UNSTRESSED_PREFIXES.some((p) => word.startsWith(p))) stressedGroup = 1;

  // Character index where the stressed syllable's onset begins.
  let stressOnsetIndex = 0;
  if (stressedGroup > 0) {
    const prevVowel = groupVowelStart[stressedGroup - 1];
    let end = prevVowel;
    while (end + 1 < chars.length && isVowel(chars[end + 1])) end++;
    stressOnsetIndex = end + 1;
  }

  const groupOf = (idx: number): number => {
    let g = -1;
    for (let k = 0; k < groupVowelStart.length; k++) if (groupVowelStart[k] <= idx) g = k;
    return g;
  };

  /* Long vowel only in the stressed syllable with at most one following consonant.
     Unstressed syllables (especially inflectional endings) keep short vowels:
     "varje" → /ˈvarjɛ/, "kyrka" → /ˈɕʏrka/, not /varjeː/, /ɕʏrkɑː/. */
  const vowelIsLong = (idx: number): boolean => {
    if (groupOf(idx) !== stressedGroup) return false;
    let j = idx + 1;
    let cons = 0;
    while (j < chars.length && !isVowel(chars[j])) { cons++; j++; }
    return cons <= 1;
  };

  /* True when the front vowel at `idx` opens an unstressed inflectional ending,
     which blocks the soft-k / soft-g rule. */
  const startsUnstressedEnding = (idx: number): boolean =>
    UNSTRESSED_ENDINGS.has(word.slice(idx));

  let i = 0;
  while (i < chars.length) {
    // Main stress marker (only meaningful for polysyllabic words).
    if (syllables > 1 && i === stressOnsetIndex) out.push("ˈ");

    const c = chars[i];
    const c2 = chars[i + 1] ?? "";
    const c3 = chars[i + 2] ?? "";
    const next = chars[i + 1] ?? "";

    // Word-initial silent consonant before j: hj-, lj-, dj-, gj- → /j/.
    if (i === 0 && c2 === "j" && (c === "h" || c === "l" || c === "d" || c === "g")) {
      out.push("j"); i += 2; continue;
    }

    // 3-letter digraphs
    if (c === "s" && c2 === "k" && c3 === "j") { out.push("ɧ"); i += 3; continue; }
    if (c === "s" && c2 === "t" && c3 === "j") { out.push("ɧ"); i += 3; continue; }
    if (c === "s" && c2 === "c" && c3 === "h") { out.push("ɧ"); i += 3; continue; }

    // 2-letter digraphs
    if (c === "s" && c2 === "j") { out.push("ɧ"); i += 2; continue; }
    if (c === "s" && c2 === "k" && FRONT_VOWELS.has(c3) && !startsUnstressedEnding(i + 2)) { out.push("ɧ"); i += 2; continue; }
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

    // Soft k / g / c before a front vowel — skipped when that vowel belongs to
    // an unstressed inflectional ending (köket, boken, taket).
    if (FRONT_VOWELS.has(next) && !startsUnstressedEnding(i + 1)) {
      if (c === "k") { out.push("ɕ"); i++; continue; }
      if (c === "g") { out.push("j"); i++; continue; }
      if (c === "c") { out.push("s"); i++; continue; }
    }

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

    // Doubled consonant = geminate: mark it with the length sign instead of
    // repeating the letter ("veckan" → /ˈvɛkːan/, not /ˈvɛkkan/).
    if (!isVowel(c) && c === c2) { out.push("ː"); i += 2; }
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
