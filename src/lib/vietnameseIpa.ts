// Vietnamese → IPA converter (Northern Hà Nội dialect, standard pronunciation).
// Produces phonetic transcription for any Vietnamese syllable using standard
// quốc-ngữ orthography. Handles tones, diphthongs, special spellings
// (gi+vowel, qu+vowel, anh/ach, ông/ôc, ong/oc), and irregular nuclei.
// Reference: Kirby (2011) "Vietnamese (Hanoi Vietnamese)", JIPA.

type Tone = "level" | "huyen" | "hoi" | "nga" | "sac" | "nang";

// Hà Nội tone contours (Chao tone letters).
const TONE_IPA: Record<Tone, string> = {
  level: "˧˧",   // ngang  (33)
  huyen: "˧˨",   // huyền  (32, slight fall)
  hoi:   "˧˩˧", // hỏi    (313, dipping)
  nga:   "˧ˀ˥", // ngã    (3ˀ5, glottalized rising)
  sac:   "˧˥",   // sắc    (35)
  nang:  "˨˩ˀ", // nặng   (21ˀ, glottalized falling-checked)
};

// Tones in checked syllables (ending in /p t k/) use short contours.
const TONE_IPA_CHECKED: Record<Tone, string> = {
  ...TONE_IPA,
  sac:  "˥",   // sắc  in checked  → high short
  nang: "˨ˀ", // nặng in checked  → low short, glottalized
};

const TONE_DIACRITICS: Array<[string, Tone]> = [
  ["\u0301", "sac"],   // ́
  ["\u0300", "huyen"], // ̀
  ["\u0309", "hoi"],   // ̉
  ["\u0303", "nga"],   // ̃
  ["\u0323", "nang"],  // ̣
];

const stripTone = (syl: string): { base: string; tone: Tone } => {
  const nfd = syl.normalize("NFD");
  let tone: Tone = "level";
  let out = "";
  for (const ch of nfd) {
    const t = TONE_DIACRITICS.find(([d]) => d === ch);
    if (t) tone = t[1];
    else out += ch;
  }
  return { base: out.normalize("NFC"), tone };
};

// Onsets (longest match first). Hà Nội merges s/x, tr/ch, r/d/gi all → /z/
// in casual speech, but in careful/standard pronunciation distinctions are
// preserved on screen for learners. We keep the careful pronunciation where
// useful (ch≠tr, s≠x optional) to better reflect the orthography for L2 learners.
const ONSETS: Array<[string, string]> = [
  ["ngh", "ŋ"],  ["ng", "ŋ"],   ["nh", "ɲ"],
  ["ch",  "tɕ"], ["tr", "ʈʂ"],
  ["gh",  "ɣ"],  ["kh", "x"],
  ["ph",  "f"],  ["th", "tʰ"],
  ["qu",  "kw"],
  ["b", "ɓ"], ["c", "k"], ["d", "z"], ["đ", "ɗ"],
  ["g", "ɣ"], ["h", "h"], ["k", "k"], ["l", "l"],
  ["m", "m"], ["n", "n"], ["p", "p"], ["q", "k"],
  ["r", "z"], ["s", "s"], ["t", "t"], ["v", "v"], ["x", "s"],
];

// Special: "gi" is ambiguous. "gi" + vowel(non-i) → onset /z/ + vowel.
// "gi" alone or "gi" + i → /zi/. Handled in matchOnset() below.

const matchOnset = (s: string): [string, string] => {
  // Special handling for "gi":
  //  - "gi" + vowel(not i)  → onset /z/, leave nucleus untouched (e.g. giếng → z+iêng)
  //  - "gi" + "i" + vowel    → onset /z/, drop one i (e.g. giếng written variants)
  //  - "gi" alone / "gi" + consonant → onset /z/ + nucleus "i"
  if (s.startsWith("gi")) {
    const rest = s.slice(2);
    if (rest.length === 0) return ["z", "i"];
    const next = rest[0];
    if ("aăâeêoôơuưy".includes(next)) {
      // gi + non-i vowel → /z/ + that nucleus
      return ["z", rest];
    }
    if (next === "i") {
      // giiêng style — rare; collapse to /z/ + rest
      return ["z", rest];
    }
    // gi + consonant (very rare) → /zi/ + rest as coda-only? Treat as /z/ + i + rest
    return ["z", "i" + rest];
  }
  for (const [k, v] of ONSETS) if (s.startsWith(k)) return [v, s.slice(k.length)];
  return ["", s];
};

// Nuclei (longest match first). Forms include glides /w/, /j/ and centering
// diphthongs /iə uə ɨə/. Non-syllabic marks omitted for legibility (j, w
// already indicate glides).
const NUCLEI: Array<[string, string]> = [
  // triphthongs
  ["uyê", "wiə"], ["uya", "wiə"],
  ["oai", "waːj"], ["oay", "waj"], ["uây", "wəj"],
  ["oao", "waːw"], ["oeo", "wɛw"], ["uyu", "wiw"],
  ["iêu", "iəw"], ["yêu", "iəw"], ["ươu", "ɨəw"], ["ươi", "ɨəj"],
  ["uôi", "uəj"],
  // centering diphthongs
  ["iê", "iə"], ["yê", "iə"], ["ia", "iə"], ["ya", "iə"],
  ["uô", "uə"], ["ua", "uə"],
  ["ươ", "ɨə"], ["ưa", "ɨə"],
  // /w/-glide + vowel
  ["oa", "waː"], ["oă", "wa"], ["oe", "wɛ"],
  ["uê", "we"],  ["uy", "wi"], ["uâ", "wə"], ["uo", "wɔ"],
  // closing diphthongs
  ["ai", "aːj"], ["ay", "aj"], ["ây", "əj"],
  ["ao", "aːw"], ["au", "aw"], ["âu", "əw"],
  ["eo", "ɛw"], ["êu", "ew"],
  ["iu", "iw"], ["ui", "uj"], ["ưu", "ɨw"], ["ưi", "ɨj"],
  ["oi", "ɔj"], ["ôi", "oj"], ["ơi", "əːj"],
  // simple vowels
  ["a", "aː"], ["ă", "a"], ["â", "ə"],
  ["e", "ɛ"],  ["ê", "e"],
  ["i", "i"],  ["y", "i"],
  ["o", "ɔ"],  ["ô", "o"], ["ơ", "əː"],
  ["u", "u"],  ["ư", "ɨ"],
];

const NUCLEUS_KEYS = NUCLEI.map(([k]) => k);

// Codas. Northern Hà Nội final stops are unreleased.
const CODAS: Array<[string, string]> = [
  ["ng", "ŋ"], ["nh", "ɲ"], ["ch", "c"],
  ["p", "p̚"], ["t", "t̚"], ["c", "k̚"], ["k", "k̚"],
  ["m", "m"], ["n", "n"],
];

const splitNucleusCoda = (rime: string): { nuc: string; coda: string } => {
  // Try longest coda first; nucleus must be a valid key.
  for (const [ck] of CODAS) {
    if (rime.length > ck.length && rime.endsWith(ck)) {
      const nucleus = rime.slice(0, rime.length - ck.length);
      if (NUCLEUS_KEYS.includes(nucleus)) return { nuc: nucleus, coda: ck };
    }
  }
  return { nuc: rime, coda: "" };
};

const mapNucleus = (n: string): string => {
  const hit = NUCLEI.find(([k]) => k === n);
  if (hit) return hit[1];
  // Fallback: char-by-char
  let out = "";
  let i = 0;
  while (i < n.length) {
    const two = n.slice(i, i + 2);
    const t = NUCLEI.find(([k]) => k === two);
    if (t) { out += t[1]; i += 2; continue; }
    const one = n.slice(i, i + 1);
    const s = NUCLEI.find(([k]) => k === one);
    out += s ? s[1] : one;
    i += 1;
  }
  return out;
};

const mapCoda = (c: string): string => {
  const hit = CODAS.find(([k]) => k === c);
  return hit ? hit[1] : "";
};

// Northern special rules: apply after raw mapping, before assembling.
//  - "anh"/"ach"  : /aːɲ aːc/ realized as [ɛŋ̟ ɛk̟] (a → ɛ, coda → fronted velar)
//  - "ênh"/"êch"  : /eɲ ec/  realized as [əjŋ̟ əjk̟]
//  - "inh"/"ich"  : /iɲ ic/  realized as [iŋ̟ ik̟]
//  - "ong"/"oc"   : /ɔŋ ɔk/  realized as [awŋ͡m awk͡p̚] (labio-velar)
//  - "ông"/"ôc"   : /oŋ ok/  realized as [əwŋ͡m əwk͡p̚]
//  - "ung"/"uc"   : /uŋ uk/  realized as [uŋ͡m uk͡p̚]
const applyNorthernRules = (nuc: string, coda: string): { nuc: string; coda: string } => {
  // Palatal-coda fronting
  if (coda === "ɲ") {
    if (nuc === "aː") return { nuc: "ɛ", coda: "ŋ" };
    if (nuc === "e")  return { nuc: "əj", coda: "ŋ" };
    if (nuc === "i")  return { nuc: "i", coda: "ŋ" };
  }
  if (coda === "c") {
    if (nuc === "aː") return { nuc: "ɛ", coda: "k̚" };
    if (nuc === "e")  return { nuc: "əj", coda: "k̚" };
    if (nuc === "i")  return { nuc: "i", coda: "k̚" };
  }
  // Labio-velar coda after back rounded vowels
  if (coda === "ŋ") {
    if (nuc === "ɔ") return { nuc: "aw", coda: "ŋ͡m" };
    if (nuc === "o") return { nuc: "əw", coda: "ŋ͡m" };
    if (nuc === "u") return { nuc: nuc,  coda: "ŋ͡m" };
  }
  if (coda === "k̚") {
    if (nuc === "ɔ") return { nuc: "aw", coda: "k͡p̚" };
    if (nuc === "o") return { nuc: "əw", coda: "k͡p̚" };
    if (nuc === "u") return { nuc: nuc,  coda: "k͡p̚" };
  }
  return { nuc, coda };
};

const syllableToIpa = (raw: string): string => {
  const lower = raw.toLowerCase();
  const { base, tone } = stripTone(lower);
  if (!base) return raw;
  const [onset, rest] = matchOnset(base);
  if (!rest) return raw;
  const { nuc, coda } = splitNucleusCoda(rest);
  const nucIpaRaw = mapNucleus(nuc);
  const codaIpaRaw = mapCoda(coda);
  const { nuc: nucIpa, coda: codaIpa } = applyNorthernRules(nucIpaRaw, codaIpaRaw);

  // Checked syllables (final stop) get short tone allophones
  const isChecked = /[p̚t̚k̚]/.test(codaIpa) || codaIpa.endsWith("p̚") || codaIpa.endsWith("t̚") || codaIpa.endsWith("k̚") || codaIpa === "k͡p̚";
  const toneStr = (isChecked ? TONE_IPA_CHECKED : TONE_IPA)[tone];

  return `${onset}${nucIpa}${codaIpa}${toneStr}`;
};

/**
 * Convert a Vietnamese word or phrase to a Northern Hà Nội IPA approximation.
 * Multi-syllable words are space-separated. Non-Vietnamese tokens are left as-is.
 */
export const vietnameseToIpa = (word: string): string => {
  if (!word) return "";
  const parts = word.trim().split(/[\s-]+/).filter(Boolean);
  const ipaParts = parts.map(p => {
    const clean = p.replace(/[.,!?;:"'()[\]{}]/g, "");
    if (!clean) return "";
    if (!/[a-zà-ỹ]/i.test(clean)) return p;
    return syllableToIpa(clean);
  }).filter(Boolean);
  return ipaParts.join(" ");
};
