/**
 * Regenerate IPA transcriptions for the English sentences used by the AI
 * Speaking Coach.
 *
 * Hand-written IPA drifted over time (missing stress marks, wrong vowels such
 * as "Monday" -> /məndi/ instead of /ˈmʌndeɪ/). This script rebuilds every
 * English transcription from the CMU Pronouncing Dictionary (General American)
 * so the coach always shows a standard, consistent transcription.
 *
 * Safety rule: a sentence is only rewritten when EVERY word is found in CMU.
 * That keeps Finnish / Swedish / Vietnamese / Japanese / Chinese rows (which
 * share the same `ipa` field) untouched.
 *
 * Run: bunx tsx scripts/fix_english_ipa.ts   (or: bun scripts/fix_english_ipa.ts)
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { dictionary } from "cmu-pronouncing-dictionary";

/** ARPAbet -> IPA (General American). Stress digits are handled separately. */
const ARPA_TO_IPA: Record<string, string> = {
  AA: "ɑː", AE: "æ", AH: "ʌ", AO: "ɔː", AW: "aʊ", AY: "aɪ",
  EH: "ɛ", ER: "ɜːr", EY: "eɪ", IH: "ɪ", IY: "iː", OW: "oʊ",
  OY: "ɔɪ", UH: "ʊ", UW: "uː",
  B: "b", CH: "tʃ", D: "d", DH: "ð", F: "f", G: "ɡ", HH: "h",
  JH: "dʒ", K: "k", L: "l", M: "m", N: "n", NG: "ŋ", P: "p",
  R: "r", S: "s", SH: "ʃ", T: "t", TH: "θ", V: "v", W: "w",
  Y: "j", Z: "z", ZH: "ʒ",
};

/** Unstressed AH is a schwa; unstressed ER is /ər/. */
const reduce = (base: string, stress: number): string => {
  if (base === "AH" && stress === 0) return "ə";
  if (base === "ER" && stress === 0) return "ər";
  if (base === "IY" && stress === 0) return "i";
  if (base === "UW" && stress === 0) return "u";
  return ARPA_TO_IPA[base] ?? "";
};

/** Consonant clusters that can start an English syllable. */
const LEGAL_ONSETS = new Set([
  "p","b","t","d","k","ɡ","f","v","θ","ð","s","z","ʃ","ʒ","h","tʃ","dʒ",
  "m","n","l","r","w","j",
  "pr","br","tr","dr","kr","ɡr","fr","θr","ʃr",
  "pl","bl","kl","ɡl","fl","sl",
  "tw","dw","kw","ɡw","sw","θw",
  "sp","st","sk","sm","sn","sf",
  "spr","str","skr","spl","skw","skj",
  "pj","bj","kj","fj","mj","vj","hj","nj","lj",
]);

const VOWELS = new Set(["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW"]);

/** Convert one CMU pronunciation string into IPA with primary/secondary stress. */
const arpaToIpa = (pron: string): string => {
  const phones = pron.split(/\s+/).filter(Boolean);
  // Syllable boundaries are implicit: a stress mark goes before the onset
  // consonants of the stressed vowel.
  const parts: { ipa: string; stress: number | null; vowel: boolean }[] = [];
  for (const p of phones) {
    const m = /^([A-Z]+)(\d)?$/.exec(p);
    if (!m) continue;
    const base = m[1];
    const stress = m[2] !== undefined ? Number(m[2]) : null;
    const vowel = VOWELS.has(base);
    parts.push({ ipa: vowel ? reduce(base, stress ?? 0) : (ARPA_TO_IPA[base] ?? ""), stress, vowel });
  }
  const multiSyllable = parts.filter(p => p.vowel).length > 1;
  let out = "";
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p.vowel && multiSyllable && (p.stress === 1 || p.stress === 2)) {
      // Walk back over the onset consonants of this syllable.
      let j = out.length;
      const avail: string[] = [];
      for (let k = i - 1; k >= 0 && !parts[k].vowel && avail.length < 3; k--) avail.unshift(parts[k].ipa);
      // Maximal onset, but only clusters English actually allows: "ˌproʊdʌkˈtɪvəti",
      // never "ˌproʊdəˈktɪvəti".
      let onset = "";
      for (let take = Math.min(avail.length, 3); take >= 1; take--) {
        const cand = avail.slice(avail.length - take).join("");
        if (LEGAL_ONSETS.has(cand)) { onset = cand; break; }
      }
      if (onset && out.endsWith(onset)) j = out.length - onset.length;
      const mark = p.stress === 1 ? "ˈ" : "ˌ";
      out = out.slice(0, j) + mark + out.slice(j);
    }
    out += p.ipa;
  }
  return out;
};

/** Words that are normally unstressed inside a sentence. */
const FUNCTION_WORDS = new Set([
  "a","an","the","and","but","or","of","to","in","on","at","for","from","as",
  "is","am","are","was","were","be","been","being","do","does","did","has","have","had",
  "can","could","will","would","shall","should","may","might","must","that","this",
  "he","she","it","we","they","you","i","me","him","her","us","them","my","your","his",
  "its","our","their","there","with","by","not","no","so","if","than","then","when",
]);

/** Words missing from CMU (modern tech vocabulary etc.). */
const SUPPLEMENT: Record<string, string> = {
  cryptography: "krɪpˈtɑːɡrəfi",
  cyberbullying: "ˈsaɪbərˌbʊliɪŋ",
  cybersecurity: "ˈsaɪbərsɪˌkjʊrəti",
  influencer: "ˈɪnfluənsər",
  memorization: "ˌmɛmərəˈzeɪʃən",
  mindfulness: "ˈmaɪndfəlnəs",
  podcasts: "ˈpɑːdkæsts",
  reproducible: "ˌriːprəˈduːsəbəl",
  smartwatch: "ˈsmɑːrtwɑːtʃ",
  sourced: "sɔːrst",
};

const cache = new Map<string, string | null>();
export const unknown = new Set<string>();

const wordIpa = (raw: string): string | null => {
  const key = raw.toLowerCase();
  if (cache.has(key)) return cache.get(key)!;
  const pron = (dictionary as Record<string, string>)[key];
  let ipa: string | null = SUPPLEMENT[key] ?? null;
  if (!ipa && pron) ipa = null;
  if (!ipa && pron) {
    ipa = arpaToIpa(pron);
    // Function words keep their vowels but drop stress marks so the sentence
    // rhythm reads naturally.
    if (FUNCTION_WORDS.has(key)) ipa = ipa.replace(/[ˈˌ]/g, "");
  }
  cache.set(key, ipa);
  return ipa;
};

/** Build the IPA for a whole sentence, or null when a word is unknown. */
export const sentenceIpa = (text: string): string | null => {
  const tokens = text
    .replace(/[“”"‘’]/g, "")
    .split(/\s+/)
    .map(t => t.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, ""))
    .filter(Boolean);
  if (tokens.length === 0) return null;
  const words: string[] = [];
  for (const token of tokens) {
    let ipa = wordIpa(token);
    if (!ipa && token.includes("-")) {
      const pieces = token.split("-").map(wordIpa);
      if (pieces.every(Boolean)) ipa = pieces.join("");
    }
    if (!ipa) { unknown.add(token.toLowerCase()); return null; }
    words.push(ipa);
  }
  return `/${words.join(" ")}/`;
};

// ---------------------------------------------------------------------------

const DATA_DIR = join(process.cwd(), "src/data");
const files = readdirSync(DATA_DIR).filter(f => /^speakingCoach.*\.ts$/.test(f));

// text: "...", ... ipa: "/.../"  on a single object literal line
const LINE_RE = /text:\s*"((?:[^"\\]|\\.)*)"([\s\S]*?)ipa:\s*"([^"]*)"/;

let changed = 0;
let checked = 0;
let skipped = 0;

for (const file of files) {
  const path = join(DATA_DIR, file);
  const lines = readFileSync(path, "utf8").split("\n");
  let fileChanged = false;

  for (let i = 0; i < lines.length; i++) {
    const m = LINE_RE.exec(lines[i]);
    if (!m) continue;
    const [, text, between, oldIpa] = m;
    // Only touch Latin-script English rows (skips Hanzi/kana/Vietnamese rows).
    if (!/^[A-Za-z0-9 ,.'’!?;:()\-"]+$/.test(text)) continue;
    checked++;
    const next = sentenceIpa(text);
    if (!next) { skipped++; continue; }
    if (next === oldIpa) continue;
    lines[i] = lines[i].replace(
      `text: "${text}"${between}ipa: "${oldIpa}"`,
      `text: "${text}"${between}ipa: "${next}"`,
    );
    fileChanged = true;
    changed++;
  }

  if (fileChanged) writeFileSync(path, lines.join("\n"));
}

console.log(`English rows checked: ${checked}`);
console.log(`Rewritten: ${changed}`);
console.log(`Skipped (unknown word, left as-is): ${skipped}`);
if (unknown.size) console.log("Unknown words:", [...unknown].sort().join(", "));
