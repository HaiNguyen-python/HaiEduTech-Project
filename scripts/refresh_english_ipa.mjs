#!/usr/bin/env node
/**
 * Refresh (overwrite) `ipa` for every English SpeakingCoach sentence.
 * Uses CMU pronouncing dictionary via text-to-ipa, plus a curated override
 * table and post-processing rules to fix common transcription artifacts
 * (misplaced stress marks, ʌ used for unstressed schwas, etc.).
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
  "src/data/speakingCoachTopUp.ts",
  "src/data/speakingCoachExpansion6.ts",
];

// Curated overrides — used verbatim, no post-processing.
const overrides = {
  "a": "ə", "an": "ən", "the": "ðə", "to": "tə", "of": "əv", "and": "ənd",
  "for": "fɔːr", "or": "ɔːr", "at": "æt", "in": "ɪn", "on": "ɑːn",
  "is": "ɪz", "are": "ɑːr", "was": "wəz", "were": "wɜːr",
  "be": "bi", "been": "bɪn", "being": "ˈbiːɪŋ",
  "have": "hæv", "has": "hæz", "had": "hæd",
  "do": "duː", "does": "dʌz", "did": "dɪd",
  "will": "wɪl", "would": "wʊd", "should": "ʃʊd", "could": "kʊd", "can": "kæn",
  "my": "maɪ", "your": "jɔːr", "his": "hɪz", "her": "hɜːr", "our": "ˈaʊər", "their": "ðɛər",
  "me": "mi", "you": "juː", "he": "hi", "she": "ʃi", "we": "wi", "they": "ðeɪ", "it": "ɪt", "i": "aɪ",
  "this": "ðɪs", "that": "ðæt", "these": "ðiːz", "those": "ðoʊz",
  "there": "ðɛər", "here": "hɪər", "where": "wɛər", "when": "wɛn", "why": "waɪ", "how": "haʊ", "what": "wʌt", "who": "huː",
  "little": "ˈlɪtəl", "middle": "ˈmɪdəl", "people": "ˈpiːpəl",
  "credit": "ˈkrɛdɪt", "budget": "ˈbʌdʒɪt", "tomorrow": "təˈmɔːroʊ",
  "gratitude": "ˈɡrætɪtuːd", "overwhelmed": "ˌoʊvərˈwɛlmd",
  "presentation": "ˌprɛzənˈteɪʃən", "mindset": "ˈmaɪndˌsɛt",
  "nervous": "ˈnɜːrvəs", "anxious": "ˈæŋkʃəs", "future": "ˈfjuːtʃər",
  "prefer": "prɪˈfɜːr", "compare": "kəmˈpɛər", "financial": "fɪˈnænʃəl",
  "literacy": "ˈlɪtərəsi", "inflation": "ɪnˈfleɪʃən", "affected": "əˈfɛktɪd",
  "groceries": "ˈɡroʊsəriz", "expensive": "ɪkˈspɛnsɪv",
  "position": "pəˈzɪʃən", "interested": "ˈɪntrəstɪd", "experience": "ɪkˈspɪəriəns",
  "marketing": "ˈmɑːrkɪtɪŋ", "ability": "əˈbɪləti",
  "hello": "həˈloʊ", "okay": "ˌoʊˈkeɪ", "ok": "ˌoʊˈkeɪ",
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
  "gonna": "ˈɡɒnə", "wanna": "ˈwɒnə", "gotta": "ˈɡɒtə",
  "yeah": "jɛə", "yep": "jɛp", "yes": "jɛs", "no": "noʊ",
  "hi": "haɪ", "hey": "heɪ", "bye": "baɪ",
  "thanks": "θæŋks", "thank": "θæŋk",
  "0":"ˈzɪəroʊ","1":"wʌn","2":"tuː","3":"θriː","4":"fɔːr","5":"faɪv",
  "6":"sɪks","7":"ˈsɛvən","8":"eɪt","9":"naɪn","10":"tɛn","11":"ɪˈlɛvən","12":"twɛlv",
  "am":"eɪ ɛm","pm":"piː ɛm",
};

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[""'']/g, "'")
    .split(/(\s+|[.,!?;:()"–—-])/)
    .filter(Boolean);

// Post-process a raw text-to-ipa string into cleaner IPA.
const cleanIpa = (s) => {
  let x = s
    .replace(/aj/g, "aɪ")
    .replace(/ej/g, "eɪ")
    .replace(/oj/g, "ɔɪ")
    .replace(/aw/g, "aʊ")
    .replace(/ow/g, "oʊ")
    .replace(/ɚ/g, "ər");

  // Collapse duplicated stress marks.
  x = x.replace(/ˈˈ+/g, "ˈ").replace(/ˌˌ+/g, "ˌ");

  // Remove stress marks that trail a vowel (misplaced) or sit at the end.
  x = x.replace(/([ʌɪæɛɔɑʊieɪoʊaʊɔɪɜəu])ˌ/g, "$1");
  x = x.replace(/([ʌɪæɛɔɑʊieɪoʊaʊɔɪɜəu])ˈ(?![aeɪɛæʌɔɑʊoʊiu])/g, "$1");
  x = x.replace(/[ˈˌ]+$/g, "");

  // If the word has no primary stress marker, treat any ʌ as unstressed schwa.
  // Otherwise, only ʌ that is not immediately preceded by ˈ becomes ə.
  if (!x.includes("ˈ")) {
    x = x.replace(/ʌ/g, "ə");
  } else {
    // Replace ʌ not directly after primary stress marker with ə.
    x = x.replace(/(^|[^ˈ])ʌ/g, "$1ə");
  }

  // "ɪ" at word end that came from unstressed "-ed"/"-es" often reads as "ɪ"; keep.
  // Tidy accidental double schwa.
  x = x.replace(/əə+/g, "ə");
  return x.trim();
};

const lookupWord = (raw) => {
  const w = raw.replace(/[^a-z0-9']/g, "");
  if (!w) return null;
  if (overrides[w]) return overrides[w];
  const r = TextToIPA.lookup(w);
  if (r && r.text && r.error !== "notfound") {
    const first = r.text.split(" OR ")[0].trim();
    return cleanIpa(first);
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
  /(\{\s*id:\s*["'](?:en\d*|tu-en\d*)-[^"']+["'][^}]*?text:\s*(["'])((?:\\.|(?!\2).)*)\2[^}]*?)(,\s*ipa:\s*"[^"]*")?(\s*,\s*difficulty:)/g;

let patched = 0;
let skipped = 0;
const skippedSamples = [];

for (const rel of files) {
  const abs = path.resolve(rel);
  if (!fs.existsSync(abs)) continue;
  const src = fs.readFileSync(abs, "utf8");
  let fileCount = 0;
  const out = src.replace(entryRegex, (_m, pre, _q, textRaw, oldIpa, tail) => {
    const text = textRaw.replace(/\\(['"\\])/g, "$1");
    const ipa = sentenceToIpa(text);
    if (!ipa) {
      skipped++;
      if (skippedSamples.length < 20) skippedSamples.push(text);
      return `${pre}${oldIpa ?? ""}${tail}`;
    }
    fileCount++;
    patched++;
    return `${pre}, ipa: "${ipa}"${tail}`;
  });
  fs.writeFileSync(abs, out, "utf8");
  console.log(`${rel}: refreshed ${fileCount}`);
}

console.log(`\nTotal refreshed: ${patched}, skipped (unknown word): ${skipped}`);
if (skippedSamples.length) {
  console.log("Skipped samples:");
  skippedSamples.forEach((s) => console.log("  -", s));
}
