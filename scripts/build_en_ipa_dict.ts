/**
 * Builds a compact English (General American) IPA dictionary for runtime lookup.
 * Source: text-to-ipa (CMU pronouncing dictionary converted to IPA).
 * Output: public/ipa/en-ipa.json  { "word": "ɹɪˈteɪnɚ", ... }
 *
 * Normalisation applied to the raw source:
 *  1. Stress marks are moved from AFTER the stressed vowel to the START of the
 *     stressed syllable (standard dictionary convention), using legal English
 *     onset clusters so "jurisdiction" becomes ˌdʒʊɹɪsˈdɪkʃən, not ˌdʒʊɹʌˈsdɪkʃʌn.
 *  2. Affricates and diphthongs use standard symbols: dʒ tʃ eɪ aɪ ɔɪ aʊ oʊ.
 *  3. Unstressed ʌ (CMU AH0) becomes schwa ə.
 */
import fs from "node:fs";
import path from "node:path";

const VOWELS = new Set(["ɑ", "æ", "ʌ", "ɔ", "e", "ɛ", "ɝ", "ɚ", "ɪ", "i", "o", "ʊ", "u", "ə", "a"]);
const GLIDES = new Set(["j", "w"]);

const isVowel = (ch: string) => VOWELS.has(ch);

// Two-consonant clusters that may legally start an English syllable.
const LEGAL_ONSETS = new Set([
  "pl", "pɹ", "pj", "bl", "bɹ", "bj", "tɹ", "tw", "tj", "dɹ", "dw", "dj",
  "kl", "kɹ", "kw", "kj", "gl", "gɹ", "gw", "fl", "fɹ", "fj", "vj",
  "θɹ", "θw", "ʃɹ", "sp", "st", "sk", "sl", "sm", "sn", "sw", "sf", "sj",
  "hj", "mj", "nj", "lj", "bw", "vl", "vɹ", "ðw",
]);

function repositionStress(ipa: string): string {
  let out = ipa;
  let cursor = 0;
  while (cursor < out.length) {
    const mark = out[cursor];
    if (mark !== "ˈ" && mark !== "ˌ") {
      cursor++;
      continue;
    }
    const before = out.slice(0, cursor);
    const after = out.slice(cursor + 1);

    // Skip back over the vowel nucleus (plus any diphthong glide tail).
    let i = before.length - 1;
    while (i >= 0 && (isVowel(before[i]) || GLIDES.has(before[i]))) i--;

    // Consonants available as a syllable onset.
    let clusterEnd = i; // last consonant index
    let clusterStart = clusterEnd;
    while (clusterStart >= 0 && !isVowel(before[clusterStart]) && before[clusterStart] !== "ˈ" && before[clusterStart] !== "ˌ") {
      clusterStart--;
    }
    clusterStart++; // first consonant index

    let insertAt: number;
    const available = clusterEnd - clusterStart + 1;
    if (available <= 0) {
      insertAt = clusterEnd + 1;
    } else if (clusterStart === 0) {
      // Word-initial cluster always belongs to the first syllable.
      insertAt = clusterStart;
    } else {
      const pair = before.slice(clusterEnd - 1, clusterEnd + 1);
      if (available >= 2 && LEGAL_ONSETS.has(pair)) insertAt = clusterEnd - 1;
      else insertAt = clusterEnd;
    }

    out = before.slice(0, insertAt) + mark + before.slice(insertAt) + after;
    cursor = insertAt + 1;
  }
  return out;
}

function modernSymbols(ipa: string): string {
  return ipa
    .replace(/ʤ/g, "dʒ")
    .replace(/ʧ/g, "tʃ")
    .replace(/ej/g, "eɪ")
    .replace(/aj/g, "aɪ")
    .replace(/ɔj/g, "ɔɪ")
    .replace(/aw/g, "aʊ")
    .replace(/ow/g, "oʊ");
}

/** CMU merges AH0 (ə) and AH1 (ʌ) into ʌ; only the stressed nucleus stays ʌ. */
function schwaUnstressed(ipa: string): string {
  let result = "";
  let stressPending = false;
  let stressedNucleusDone = false;
  for (const ch of ipa) {
    if (ch === "ˈ" || ch === "ˌ") {
      stressPending = true;
      stressedNucleusDone = false;
      result += ch;
      continue;
    }
    if (ch === "ʌ") {
      const stressed = stressPending && !stressedNucleusDone;
      result += stressed ? "ʌ" : "ə";
      if (stressed) stressedNucleusDone = true;
      continue;
    }
    if (isVowel(ch)) {
      if (stressPending) stressedNucleusDone = true;
    }
    result += ch;
  }
  return result;
}

/** Single-syllable words carry no stress mark in dictionary style. */
function dropLoneStress(ipa: string): string {
  const nuclei = [...ipa].filter((ch) => isVowel(ch)).length;
  return nuclei <= 1 ? ipa.replace(/[ˈˌ]/g, "") : ipa;
}

const dictPath = path.join(process.cwd(), "node_modules", "text-to-ipa", "ipadict.txt");
const raw = fs.readFileSync(dictPath, "utf8");
const dict: Record<string, string> = {};

for (const line of raw.split("\n")) {
  if (!line.trim()) continue;
  const [wordRaw, ...rest] = line.split("\t");
  const ipaRaw = rest.join("").trim();
  if (!wordRaw || !ipaRaw) continue;
  const word = wordRaw.toLowerCase();
  if (/\(\d\)$/.test(word)) continue; // keep only the primary variant
  if (dict[word]) continue;
  if (!/^[a-z'.-]+$/.test(word)) continue;
  dict[word] = modernSymbols(dropLoneStress(schwaUnstressed(repositionStress(ipaRaw))));
}

const outDir = path.join(process.cwd(), "public", "ipa");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "en-ipa.json");
fs.writeFileSync(outFile, JSON.stringify(dict));

const size = (fs.statSync(outFile).size / 1024 / 1024).toFixed(2);
console.log(`Wrote ${Object.keys(dict).length} entries to public/ipa/en-ipa.json (${size} MB)`);
const samples = ["retainer", "jurisdiction", "liable", "settlement", "schedule", "clarify", "deadline", "dispute", "party", "claim", "confirm", "invoice", "negotiate"];
console.log(samples.map((w) => `${w}=/${dict[w]}/`).join("  "));
