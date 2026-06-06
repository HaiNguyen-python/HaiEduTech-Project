// Vietnamese → IPA converter (Northern Hà Nội dialect approximation).
// Produces a phonetic transcription for any Vietnamese syllable/word using
// standard quốc-ngữ orthography. Handles tones, diphthongs, common codas.
// Not 100% linguistically perfect — but accurate enough to help learners.

type Tone = "level" | "huyen" | "hoi" | "nga" | "sac" | "nang";

const TONE_IPA: Record<Tone, string> = {
  level: "˧",
  huyen: "˨˩",
  hoi: "˧˩˧",
  nga: "˧ˀ˥",
  sac: "˧˥",
  nang: "˨˩ˀ",
};

// Map each accented vowel → [base, tone]
const TONE_MAP: Record<string, [string, Tone]> = {};
const VOWELS = ["a", "ă", "â", "e", "ê", "i", "o", "ô", "ơ", "u", "ư", "y"];
const TONE_DIACRITICS: Array<[string, Tone]> = [
  ["\u0301", "sac"],   // ́
  ["\u0300", "huyen"], // ̀
  ["\u0309", "hoi"],   // ̉
  ["\u0303", "nga"],   // ̃
  ["\u0323", "nang"],  // ̣
];
for (const v of VOWELS) {
  for (const [d, t] of TONE_DIACRITICS) {
    const composed = (v + d).normalize("NFC");
    TONE_MAP[composed] = [v, t];
  }
}

const stripTone = (syl: string): { base: string; tone: Tone } => {
  const nfd = syl.normalize("NFD");
  let tone: Tone = "level";
  let out = "";
  for (const ch of nfd) {
    let matched = false;
    for (const [d, t] of TONE_DIACRITICS) {
      if (ch === d) { tone = t; matched = true; break; }
    }
    if (!matched) out += ch;
  }
  return { base: out.normalize("NFC"), tone };
};

// Onset table (longest-match first)
const ONSETS: Array<[string, string]> = [
  ["ngh", "ŋ"], ["ng", "ŋ"], ["nh", "ɲ"], ["ch", "c"], ["gh", "ɣ"],
  ["gi", "z"], ["kh", "x"], ["ph", "f"], ["th", "tʰ"], ["tr", "ʈ"],
  ["qu", "kw"],
  ["b", "ɓ"], ["c", "k"], ["d", "z"], ["đ", "ɗ"], ["g", "ɣ"],
  ["h", "h"], ["k", "k"], ["l", "l"], ["m", "m"], ["n", "n"],
  ["p", "p"], ["q", "k"], ["r", "z"], ["s", "s"], ["t", "t"],
  ["v", "v"], ["x", "s"],
];

// Nucleus table (longest-match first; pre-coda extraction)
const NUCLEI: Array<[string, string]> = [
  // triphthongs / diphthongs with glides
  ["uyê", "wiə"], ["uyế", "wiə"], ["oai", "waːj"], ["oay", "waj"],
  ["uây", "wəj"], ["oao", "waːw"], ["oeo", "wɛw"],
  ["iêu", "iəw"], ["yêu", "iəw"], ["ươu", "ɨəw"], ["ươi", "ɨəj"],
  ["uôi", "uəj"], ["uya", "wiə"], ["uyu", "wiw"],
  ["iê", "iə"], ["yê", "iə"], ["ia", "iə"], ["ya", "iə"],
  ["uô", "uə"], ["ua", "uə"],
  ["ươ", "ɨə"], ["ưa", "ɨə"],
  ["oa", "waː"], ["oă", "wa"], ["oe", "wɛ"], ["uê", "we"],
  ["uy", "wi"], ["uâ", "wə"],
  ["ai", "aːj"], ["ay", "aj"], ["ây", "əj"],
  ["ao", "aːw"], ["au", "aw"], ["âu", "əw"],
  ["eo", "ɛw"], ["êu", "ew"], ["iu", "iw"], ["ui", "uj"], ["ưu", "ɨw"], ["ưi", "ɨj"],
  ["oi", "ɔj"], ["ôi", "oj"], ["ơi", "əːj"],
  // simple vowels
  ["a", "aː"], ["ă", "a"], ["â", "ə"],
  ["e", "ɛ"], ["ê", "e"],
  ["i", "i"], ["y", "i"],
  ["o", "ɔ"], ["ô", "o"], ["ơ", "əː"],
  ["u", "u"], ["ư", "ɨ"],
];

// Coda table (longest-match)
const CODAS: Array<[string, string]> = [
  ["ng", "ŋ"], ["nh", "ɲ"], ["ch", "c"],
  ["p", "p"], ["t", "t"], ["c", "k"], ["k", "k"],
  ["m", "m"], ["n", "n"],
];

const matchOnset = (s: string): [string, string] => {
  for (const [k, v] of ONSETS) if (s.startsWith(k)) return [v, s.slice(k.length)];
  return ["", s];
};

const splitNucleusCoda = (rime: string): { nuc: string; coda: string } => {
  // Try removing a coda first (longest match), then nucleus must be in table.
  for (const [ck] of CODAS) {
    if (rime.length > ck.length && rime.endsWith(ck)) {
      const nucleus = rime.slice(0, rime.length - ck.length);
      if (NUCLEI.some(([k]) => k === nucleus)) return { nuc: nucleus, coda: ck };
    }
  }
  // No coda — full rime is nucleus
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
    const one = n.slice(i, i + 1);
    const t = NUCLEI.find(([k]) => k === two);
    if (t) { out += t[1]; i += 2; continue; }
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

const syllableToIpa = (raw: string): string => {
  const lower = raw.toLowerCase();
  const { base, tone } = stripTone(lower);
  if (!base) return raw;
  const [onset, rest] = matchOnset(base);
  if (!rest) return raw; // no vowels — leave alone
  const { nuc, coda } = splitNucleusCoda(rest);
  const nucIpa = mapNucleus(nuc);
  const codaIpa = mapCoda(coda);
  return `${onset}${nucIpa}${codaIpa}${TONE_IPA[tone]}`;
};

/**
 * Convert a Vietnamese word or phrase to an IPA approximation
 * (Northern dialect). Multi-syllable words are space-separated.
 */
export const vietnameseToIpa = (word: string): string => {
  if (!word) return "";
  // Split on whitespace / hyphen, preserve order
  const parts = word.trim().split(/[\s-]+/).filter(Boolean);
  const ipaParts = parts.map(p => {
    // Strip punctuation
    const clean = p.replace(/[.,!?;:"'()]/g, "");
    if (!clean) return "";
    // If contains non-letter chars (e.g. digits), skip
    if (!/[a-zà-ỹ]/i.test(clean)) return p;
    return syllableToIpa(clean);
  }).filter(Boolean);
  return ipaParts.join(" ");
};
