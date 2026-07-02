#!/usr/bin/env node
// Fill missing `ipa: "..."` on English SpeakingCoach sentences using the
// CMU-derived text-to-ipa dictionary.
import fs from "node:fs";
import path from "node:path";
import TextToIPA from "text-to-ipa";

// Force-load the dictionary synchronously (package auto-loads lazily too).
TextToIPA.loadDict();

const files = [
  "src/data/speakingCoachData.ts",
  "src/data/speakingCoachExpansion.ts",
  "src/data/speakingCoachExpansion2.ts",
  "src/data/speakingCoachExpansion3.ts",
  "src/data/speakingCoachExpansion4.ts",
  "src/data/speakingCoachExpansion5.ts",
];

// Manual overrides for common contractions & tokens the CMU dict misses.
const overrides = {
  "i'm": "aɪm", "im": "ɪm",
  "you're": "jʊr", "we're": "wɪr", "they're": "ðɛr",
  "he's": "hiːz", "she's": "ʃiːz", "it's": "ɪts", "that's": "ðæts",
  "what's": "wʌts", "there's": "ðɛrz", "here's": "hɪrz", "let's": "lɛts",
  "don't": "doʊnt", "doesn't": "ˈdʌzənt", "didn't": "ˈdɪdənt",
  "won't": "woʊnt", "wouldn't": "ˈwʊdənt", "can't": "kænt",
  "couldn't": "ˈkʊdənt", "shouldn't": "ˈʃʊdənt",
  "isn't": "ˈɪzənt", "aren't": "ɑrnt", "wasn't": "ˈwʌzənt",
  "weren't": "wɜrnt", "haven't": "ˈhævənt", "hasn't": "ˈhæzənt",
  "hadn't": "ˈhædənt",
  "i've": "aɪv", "you've": "juːv", "we've": "wiːv", "they've": "ðeɪv",
  "i'd": "aɪd", "you'd": "juːd", "he'd": "hiːd", "she'd": "ʃiːd",
  "we'd": "wiːd", "they'd": "ðeɪd",
  "i'll": "aɪl", "you'll": "juːl", "he'll": "hiːl", "she'll": "ʃiːl",
  "we'll": "wiːl", "they'll": "ðeɪl",
  "ok": "ˌoʊˈkeɪ", "okay": "ˌoʊˈkeɪ",
};

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[""'']/g, "'")
    .split(/(\s+|[.,!?;:()"–—-])/)
    .filter(Boolean);

const lookupWord = (raw) => {
  const w = raw.replace(/[^a-z']/g, "");
  if (!w) return null;
  if (overrides[w]) return overrides[w];
  const r = TextToIPA.lookup(w);
  if (r && r.text && r.error !== "notfound") {
    // Take the first pronunciation, strip stress marks we don't need.
    return r.text.split(" OR ")[0].replace(/ˈˈ/g, "ˈ").trim();
  }
  return null;
};

const sentenceToIpa = (text) => {
  const tokens = tokenize(text);
  const out = [];
  let ok = true;
  for (const t of tokens) {
    if (/^\s+$/.test(t)) { out.push(" "); continue; }
    if (/^[.,!?;:()"–—-]$/.test(t)) { continue; }
    const ipa = lookupWord(t);
    if (!ipa) { ok = false; break; }
    out.push(ipa);
  }
  if (!ok) return null;
  return "/" + out.join("").replace(/\s+/g, " ").trim() + "/";
};

// Matches: { id: "en-xx", text: "...", translation: "...", difficulty: "...", theme: "..." }
// We insert `ipa: "..."` before `difficulty:` if not already present.
const lineRegex = /(\{\s*id:\s*["']en-[^"']+["'][^}]*?text:\s*(["'])((?:\\.|(?!\2).)*)\2[^}]*?)(,\s*difficulty:)/g;

let totalPatched = 0;
let totalSkipped = 0;

for (const rel of files) {
  const abs = path.resolve(rel);
  const src = fs.readFileSync(abs, "utf8");
  let patchedThisFile = 0;
  const out = src.replace(lineRegex, (match, pre, _q, textRaw, tail) => {
    if (/ipa:\s*["']/.test(pre)) return match; // already has IPA
    // Unescape the text literal
    const text = textRaw.replace(/\\(['"\\])/g, "$1");
    const ipa = sentenceToIpa(text);
    if (!ipa) { totalSkipped++; return match; }
    patchedThisFile++;
    totalPatched++;
    return `${pre}, ipa: "${ipa}"${tail}`;
  });
  if (patchedThisFile > 0) {
    fs.writeFileSync(abs, out, "utf8");
  }
  console.log(`${rel}: patched ${patchedThisFile}`);
}

console.log(`\nTotal patched: ${totalPatched}, skipped (unknown word): ${totalSkipped}`);
