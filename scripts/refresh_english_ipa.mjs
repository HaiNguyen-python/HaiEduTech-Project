#!/usr/bin/env node
/**
 * Refresh (overwrite) `ipa` for every English SpeakingCoach sentence so all
 * transcriptions are consistent, slash-wrapped, and derived from the CMU
 * pronouncing dictionary plus a curated override table for contractions and
 * common words the CMU dict misses.
 */
import fs from "node:fs";
import path from "node:path";
import TextToIPA from "text-to-ipa";

TextToIPA.loadDict();

const files = [
  "src/data/speakingCoachData.ts",
  "src/data/speakingCoachExpansion.ts",
  "src/data/speakingCoachExpansion2.ts",
  "src/data/speakingCoachExpansion3.ts",
  "src/data/speakingCoachExpansion4.ts",
  "src/data/speakingCoachExpansion5.ts",
];

const overrides = {
  "a": "ə", "the": "ðə", "to": "tə", "of": "əv", "and": "ənd", "for": "fɔːr",
  "i'm": "aɪm", "im": "ɪm",
  "you're": "jʊər", "we're": "wɪər", "they're": "ðɛər",
  "he's": "hiːz", "she's": "ʃiːz", "it's": "ɪts", "that's": "ðæts",
  "what's": "wʌts", "there's": "ðɛərz", "here's": "hɪərz", "let's": "lɛts",
  "who's": "huːz", "how's": "haʊz", "where's": "wɛərz",
  "don't": "doʊnt", "doesn't": "ˈdʌzənt", "didn't": "ˈdɪdənt",
  "won't": "woʊnt", "wouldn't": "ˈwʊdənt", "can't": "kænt", "cant": "kænt",
  "couldn't": "ˈkʊdənt", "shouldn't": "ˈʃʊdənt",
  "isn't": "ˈɪzənt", "aren't": "ɑːrnt", "wasn't": "ˈwʌzənt",
  "weren't": "wɜːrnt", "haven't": "ˈhævənt", "hasn't": "ˈhæzənt",
  "hadn't": "ˈhædənt",
  "i've": "aɪv", "you've": "juːv", "we've": "wiːv", "they've": "ðeɪv",
  "i'd": "aɪd", "you'd": "juːd", "he'd": "hiːd", "she'd": "ʃiːd",
  "we'd": "wiːd", "they'd": "ðeɪd",
  "i'll": "aɪl", "you'll": "juːl", "he'll": "hiːl", "she'll": "ʃiːl",
  "we'll": "wiːl", "they'll": "ðeɪl",
  "ok": "ˌoʊˈkeɪ", "okay": "ˌoʊˈkeɪ",
  "gonna": "ˈɡɒnə", "wanna": "ˈwɒnə", "gotta": "ˈɡɒtə",
  "yeah": "jɛə", "yep": "jɛp", "yes": "jɛs", "no": "noʊ",
  "hi": "haɪ", "hello": "həˈloʊ", "hey": "heɪ", "bye": "baɪ",
  "thanks": "θæŋks", "thank": "θæŋk",
  "0":"ˈzɪəroʊ","1":"wʌn","2":"tuː","3":"θriː","4":"fɔːr","5":"faɪv","6":"sɪks","7":"ˈsɛvən","8":"eɪt","9":"naɪn","10":"tɛn","11":"ɪˈlɛvən","12":"twɛlv","am":"eɪ ɛm","pm":"piː ɛm",
};

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[""'']/g, "'")
    .split(/(\s+|[.,!?;:()"–—-])/)
    .filter(Boolean);

const lookupWord = (raw) => {
  const w = raw.replace(/[^a-z0-9']/g, "");
  if (!w) return null;
  if (overrides[w]) return overrides[w];
  const r = TextToIPA.lookup(w);
  if (r && r.text && r.error !== "notfound") {
    let raw = r.text.split(" OR ")[0].replace(/ˈˈ/g, "ˈ").trim();
    // Normalise text-to-ipa quirks -> standard IPA notation.
    raw = raw
      .replace(/aj/g, "aɪ")
      .replace(/ej/g, "eɪ")
      .replace(/oj/g, "ɔɪ")
      .replace(/aw/g, "aʊ")
      .replace(/ow/g, "oʊ")
      
      .replace(/ɚ/g, "ər")
      .replace(/ʌˈ/g, "ʌ")
      .replace(/ɪˈ/g, "ɪ")
      .replace(/æˈ/g, "æ")
      .replace(/ɛˈ/g, "ɛ")
      .replace(/ɔˈ/g, "ɔ")
      .replace(/ɑˈ/g, "ɑ")
      .replace(/ʊˈ/g, "ʊ")
      .replace(/eɪˈ/g, "eɪ")
      .replace(/aɪˈ/g, "aɪ")
      .replace(/oʊˈ/g, "oʊ")
      .replace(/aʊˈ/g, "aʊ")
      .replace(/ɔɪˈ/g, "ɔɪ")
      .replace(/iˈ/g, "i")
      .replace(/uˈ/g, "u");
    return raw;
  }
  return null;
};

const sentenceToIpa = (text) => {
  const tokens = tokenize(text);
  const out = [];
  let prevWasWord = false;
  for (const t of tokens) {
    if (/^\s+$/.test(t)) {
      if (prevWasWord) out.push(" ");
      prevWasWord = false;
      continue;
    }
    if (/^[.,!?;:()"–—-]$/.test(t)) continue;
    const ipa = lookupWord(t);
    if (!ipa) return null;
    out.push(ipa);
    prevWasWord = true;
  }
  const joined = out.join("").replace(/\s+/g, " ").trim();
  return "/" + joined + "/";
};

// Match every entry with an English id, capturing the whole `ipa: "..."` field
// (with optional surrounding whitespace and trailing comma).
const entryRegex =
  /(\{\s*id:\s*["']en-[^"']+["'][^}]*?text:\s*(["'])((?:\\.|(?!\2).)*)\2[^}]*?)(,\s*ipa:\s*"[^"]*")?(\s*,\s*difficulty:)/g;

let patched = 0;
let skipped = 0;

for (const rel of files) {
  const abs = path.resolve(rel);
  if (!fs.existsSync(abs)) continue;
  const src = fs.readFileSync(abs, "utf8");
  let fileCount = 0;
  const out = src.replace(entryRegex, (_m, pre, _q, textRaw, _oldIpa, tail) => {
    const text = textRaw.replace(/\\(['"\\])/g, "$1");
    const ipa = sentenceToIpa(text);
    if (!ipa) {
      skipped++;
      // Preserve any pre-existing IPA if we can't build a fresh one.
      return `${pre}${_oldIpa ?? ""}${tail}`;
    }
    fileCount++;
    patched++;
    return `${pre}, ipa: "${ipa}"${tail}`;
  });
  fs.writeFileSync(abs, out, "utf8");
  console.log(`${rel}: refreshed ${fileCount}`);
}

console.log(`\nTotal refreshed: ${patched}, skipped (unknown word): ${skipped}`);
