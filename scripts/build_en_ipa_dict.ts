/**
 * Builds a compact English IPA dictionary for runtime lookup.
 * Source: text-to-ipa (CMU dict converted to IPA).
 * Output: public/ipa/en-ipa.json  { "word": "ˈwɝd", ... }
 *
 * The source marks stress AFTER the stressed vowel (e.g. "ejˈ").
 * We reposition the stress mark to the start of the stressed syllable,
 * which is the standard IPA convention learners see in dictionaries.
 */
import fs from "node:fs";
import path from "node:path";

const VOWELS = new Set([
  "ɑ", "æ", "ʌ", "ɔ", "a", "e", "ɛ", "ɝ", "ɚ", "ɪ", "i", "o", "ʊ", "u", "ə", "ɜ", "ɒ", "ɐ", "y", "j",
]);
// j/w are glides: treat as consonants unless part of a diphthong tail.
const GLIDES = new Set(["j", "w"]);

function isVowel(ch: string): boolean {
  return VOWELS.has(ch) && !GLIDES.has(ch);
}

function repositionStress(ipa: string): string {
  let out = ipa;
  for (const mark of ["ˈ", "ˌ"]) {
    let index = out.indexOf(mark);
    while (index !== -1) {
      const before = out.slice(0, index);
      const after = out.slice(index + 1);
      // Walk back across the vowel cluster.
      let i = before.length - 1;
      while (i >= 0 && (isVowel(before[i]) || GLIDES.has(before[i]))) i--;
      // Walk back across the onset consonant cluster.
      while (i >= 0 && !isVowel(before[i]) && before[i] !== "ˈ" && before[i] !== "ˌ") i--;
      const insertAt = i + 1;
      out = before.slice(0, insertAt) + mark + before.slice(insertAt) + after;
      const next = out.indexOf(mark, out.indexOf(mark) + 1);
      index = next;
    }
  }
  return out;
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
  // Keep only the primary variant, drop CMU alternatives like "a(1)".
  if (/\(\d\)$/.test(word)) continue;
  if (dict[word]) continue;
  if (!/^[a-z'.-]+$/.test(word)) continue;
  dict[word] = repositionStress(ipaRaw);
}

const outDir = path.join(process.cwd(), "public", "ipa");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "en-ipa.json");
fs.writeFileSync(outFile, JSON.stringify(dict));

const size = (fs.statSync(outFile).size / 1024 / 1024).toFixed(2);
console.log(`Wrote ${Object.keys(dict).length} entries to public/ipa/en-ipa.json (${size} MB)`);
console.log("samples:", ["retainer", "jurisdiction", "liable", "settlement", "schedule", "clarify"].map((w) => `${w}=/${dict[w]}/`).join("  "));
