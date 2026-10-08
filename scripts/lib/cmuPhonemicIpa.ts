/** Convert CMU's lossless ARPAbet to broad General American phonemic IPA.
 * Keep stress attached to its original vowel; never reconstruct it from IPA.
 * Affricates are atomic phones, and diphthongs count as one vowel nucleus.
 */
const PHONES: Record<string, string> = {
  AA: "ɑ", AE: "æ", AH: "ʌ", AO: "ɔ", AW: "aʊ", AY: "aɪ",
  EH: "ɛ", ER: "ɝ", EY: "eɪ", IH: "ɪ", IY: "i", OW: "oʊ",
  OY: "ɔɪ", UH: "ʊ", UW: "u", B: "b", CH: "tʃ", D: "d",
  DH: "ð", F: "f", G: "ɡ", HH: "h", JH: "dʒ", K: "k", L: "l",
  M: "m", N: "n", NG: "ŋ", P: "p", R: "ɹ", S: "s", SH: "ʃ",
  T: "t", TH: "θ", V: "v", W: "w", Y: "j", Z: "z", ZH: "ʒ",
};
const ONSETS = new Set([
  "p", "b", "t", "d", "k", "ɡ", "f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ",
  "h", "tʃ", "dʒ", "m", "n", "l", "ɹ", "w", "j",
  "pɹ", "bɹ", "tɹ", "dɹ", "kɹ", "ɡɹ", "fɹ", "θɹ", "ʃɹ",
  "pl", "bl", "kl", "ɡl", "fl", "sl", "tw", "dw", "kw", "ɡw", "sw", "θw",
  "sp", "st", "sk", "sm", "sn", "sf", "spr", "str", "skr",
  "spɹ", "stɹ", "skɹ", "spl", "skw", "skj", "pj", "bj", "kj", "ɡj",
  "fj", "mj", "vj", "hj", "nj", "lj", "tj", "dj",
]);

export function cmuPhonemicIpa(pronunciation: string): string {
  const phones = pronunciation.trim().split(/\s+/).map((phone) => {
    const match = /^([A-Z]+)([012])?$/.exec(phone);
    if (!match || !PHONES[match[1]]) throw new Error(`Unknown ARPAbet phone: ${phone}`);
    const base = match[1];
    const stress = match[2] === undefined ? null : Number(match[2]);
    const ipa = base === "AH" && stress === 0 ? "ə"
      : base === "ER" && stress === 0 ? "ɚ" : PHONES[base];
    return { ipa, stress };
  });
  const vowelCount = phones.filter((phone) => phone.stress !== null).length;
  const marks = new Map<number, string>();
  for (let i = 0; i < phones.length; i++) {
    const phone = phones[i];
    if (vowelCount <= 1 || (phone.stress !== 1 && phone.stress !== 2)) continue;
    let start = i;
    while (start > 0 && phones[start - 1].stress === null) start--;
    let onset = i;
    if (start === 0) onset = 0;
    else {
      for (let candidate = start; candidate < i; candidate++) {
        if (ONSETS.has(phones.slice(candidate, i).map((p) => p.ipa).join(""))) {
          onset = candidate;
          break;
        }
      }
    }
    marks.set(onset, phone.stress === 1 ? "ˈ" : "ˌ");
  }
  return phones.map((phone, index) => `${marks.get(index) ?? ""}${phone.ipa}`).join("");
}