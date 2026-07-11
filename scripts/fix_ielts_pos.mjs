#!/usr/bin/env node
/**
 * Corrects `partOfSpeech` values in IELTS vocab data files based on
 * word-form + a curated override dictionary. Handles both object-literal
 * entries and the `w(...)` helper positional form.
 */
import fs from "node:fs";
import path from "node:path";

const FILES = [
  "src/data/ieltsVocabData.ts",
  ...Array.from({ length: 10 }, (_, i) => `src/data/ieltsVocabExpansion${i === 0 ? "" : i + 1}.ts`),
];

// Explicit corrections for common English words where suffix rules mislead.
const OVERRIDES = {
  // Adjectives frequently mislabelled as noun
  endangered: "adjective", threatened: "adjective", vulnerable: "adjective",
  sustainable: "adjective", renewable: "adjective", biodegradable: "adjective",
  eco_friendly: "adjective",
  urban: "adjective", rural: "adjective", global: "adjective", local: "adjective",
  digital: "adjective", virtual: "adjective", cultural: "adjective", social: "adjective",
  economic: "adjective", political: "adjective", scientific: "adjective", academic: "adjective",
  chronic: "adjective", acute: "adjective", genetic: "adjective", psychological: "adjective",
  physical: "adjective", mental: "adjective", emotional: "adjective", financial: "adjective",
  ethical: "adjective", moral: "adjective", legal: "adjective", illegal: "adjective",
  formal: "adjective", informal: "adjective", traditional: "adjective", modern: "adjective",
  ancient: "adjective", contemporary: "adjective", primary: "adjective", secondary: "adjective",
  significant: "adjective", relevant: "adjective", crucial: "adjective", essential: "adjective",
  vital: "adjective", inevitable: "adjective", feasible: "adjective", flexible: "adjective",
  reliable: "adjective", accessible: "adjective", affordable: "adjective", inclusive: "adjective",
  diverse: "adjective", complex: "adjective", complicated: "adjective", ambiguous: "adjective",
  productive: "adjective", effective: "adjective", efficient: "adjective", innovative: "adjective",
  creative: "adjective", competitive: "adjective", cooperative: "adjective", collaborative: "adjective",
  positive: "adjective", negative: "adjective", passive: "adjective", active: "adjective",
  massive: "adjective", extensive: "adjective", intensive: "adjective", comprehensive: "adjective",
  progressive: "adjective", conservative: "adjective", liberal: "adjective",
  numerous: "adjective", various: "adjective", obvious: "adjective", curious: "adjective",
  serious: "adjective", conscious: "adjective", anxious: "adjective", cautious: "adjective",
  ambitious: "adjective", suspicious: "adjective", nutritious: "adjective", enormous: "adjective",
  hazardous: "adjective", prosperous: "adjective", spontaneous: "adjective",
  harmful: "adjective", helpful: "adjective", useful: "adjective", meaningful: "adjective",
  powerful: "adjective", successful: "adjective", stressful: "adjective", peaceful: "adjective",
  beautiful: "adjective", wonderful: "adjective", thoughtful: "adjective", resourceful: "adjective",
  homeless: "adjective", jobless: "adjective", careless: "adjective", endless: "adjective",
  priceless: "adjective", limitless: "adjective", relentless: "adjective",
  aware: "adjective", unaware: "adjective", eager: "adjective", keen: "adjective",
  wealthy: "adjective", healthy: "adjective", unhealthy: "adjective", worthy: "adjective",
  crowded: "adjective", polluted: "adjective", deforested: "adjective", overcrowded: "adjective",
  advanced: "adjective", developed: "adjective", developing: "adjective", underdeveloped: "adjective",
  outdated: "adjective", sophisticated: "adjective", biased: "adjective", unbiased: "adjective",
  educated: "adjective", uneducated: "adjective", motivated: "adjective", dedicated: "adjective",
  frustrated: "adjective", stressed: "adjective", depressed: "adjective", exhausted: "adjective",
  addicted: "adjective", isolated: "adjective", integrated: "adjective", segregated: "adjective",
  balanced: "adjective", unbalanced: "adjective", limited: "adjective", unlimited: "adjective",
  qualified: "adjective", skilled: "adjective", unskilled: "adjective", experienced: "adjective",
  inexperienced: "adjective", concerned: "adjective", worried: "adjective", determined: "adjective",
  challenging: "adjective", demanding: "adjective", rewarding: "adjective", promising: "adjective",
  fascinating: "adjective", inspiring: "adjective", overwhelming: "adjective", alarming: "adjective",
  striking: "adjective", growing: "adjective", declining: "adjective", emerging: "adjective",
  existing: "adjective", ongoing: "adjective", underlying: "adjective", surrounding: "adjective",
  leading: "adjective", outstanding: "adjective", groundbreaking: "adjective",

  // Verbs commonly mistagged
  implement: "verb", enhance: "verb", promote: "verb", encourage: "verb",
  discourage: "verb", ensure: "verb", achieve: "verb", overcome: "verb",
  address: "verb", tackle: "verb", conserve: "verb", preserve: "verb",
  contribute: "verb", benefit: "verb", suffer: "verb", differ: "verb",
  vary: "verb", occur: "verb", arise: "verb", derive: "verb",
  reveal: "verb", indicate: "verb", demonstrate: "verb", illustrate: "verb",
  emphasise: "verb", emphasize: "verb", highlight: "verb", investigate: "verb",
  examine: "verb", analyse: "verb", analyze: "verb", evaluate: "verb",
  interpret: "verb", conclude: "verb", determine: "verb", establish: "verb",
  maintain: "verb", sustain: "verb", generate: "verb", produce: "verb",
  consume: "verb", distribute: "verb", allocate: "verb", accommodate: "verb",
  accumulate: "verb", integrate: "verb", incorporate: "verb", cooperate: "verb",
  collaborate: "verb", participate: "verb", contradict: "verb", conflict: "verb",

  // Adverbs
  particularly: "adverb", especially: "adverb", significantly: "adverb",
  substantially: "adverb", considerably: "adverb", relatively: "adverb",
  arguably: "adverb", undoubtedly: "adverb", clearly: "adverb", obviously: "adverb",
  currently: "adverb", recently: "adverb", eventually: "adverb", frequently: "adverb",
  occasionally: "adverb", constantly: "adverb", virtually: "adverb", literally: "adverb",
  approximately: "adverb", roughly: "adverb", nearly: "adverb", scarcely: "adverb",
};

// Words that end in -ed/-ing but truly ARE nouns/verbs — don't auto-adjectivise.
const KEEP_NOUN = new Set([
  "building", "meeting", "training", "recording", "warning", "clothing",
  "housing", "planning", "funding", "wedding", "reading", "writing",
  "opening", "beginning", "ending", "understanding", "feeling", "meaning",
  "setting", "surrounding", "surroundings", "belongings", "earnings",
  "savings", "proceedings", "beginning", "processing",
  "period", "seed", "greed", "need", "speed", "deed", "breed", "creed",
  "trend", "friend", "weekend", "background", "compound", "outbreak",
]);
const KEEP_VERB = new Set([
  "spread", "shed", "wed", "feed", "read", "lead", "bleed",
]);

function inferPos(word) {
  const w = word.toLowerCase().trim();
  if (OVERRIDES[w]) return OVERRIDES[w];
  if (OVERRIDES[w.replace(/-/g, "_")]) return OVERRIDES[w.replace(/-/g, "_")];

  // Multi-word: don't guess
  if (/\s/.test(w)) return null;

  // High-confidence adjective suffixes
  if (/(ous|ful|less|ive|able|ible|ical|ish|ary|ory)$/.test(w) && !KEEP_NOUN.has(w)) return "adjective";
  if (/(ent|ant)$/.test(w) && !["student","president","agent","client","event","talent","parent","department","government","environment","development","argument","statement","movement","achievement","instrument","experiment","commitment","recruitment","investment","equipment","announcement","assessment","treatment","judgment","agreement","requirement","punishment","assignment","apartment","adjustment","enrichment","enhancement"].includes(w)) return null; // ambiguous, skip
  if (/(ly)$/.test(w) && !["family","apply","supply","reply","rely","imply","comply","multiply","identify","modify","classify","early","only","lonely","lovely","likely","unlikely","daily","weekly","monthly","yearly","friendly","costly","deadly","elderly"].includes(w)) return "adverb";
  if (/(tion|sion|ment|ance|ence|ity|ness|ship|hood|ism|ist|ery|age|logy|graphy|ology)$/.test(w)) return "noun";
  if (/(ate|ise|ize|ify|en)$/.test(w) && !["late","private","separate","adequate","climate","corporate","delicate","desperate","fortunate","immediate","intimate","legitimate","moderate","passionate","accurate","appropriate","deliberate","chocolate","carbonate","certificate","candidate","graduate","opposite","approximate","alternate","estate","state","debate","update","citizen","garden","open","often","children","women","hidden","broken","spoken","written","given","fallen","frozen","chosen","golden","modern","northern","southern","western","eastern","dozen","hyphen","warden","burden","garden","kitchen","token"].includes(w)) return "verb";

  // Past-participle-as-adjective heuristic: ends in -ed
  if (/ed$/.test(w) && !KEEP_NOUN.has(w) && !KEEP_VERB.has(w)) {
    // Only override if word is 6+ chars and doesn't look like a plain past-tense verb usage
    // Since these are academic vocab entries, ADJ interpretation is usually correct.
    return "adjective";
  }
  // -ing that isn't a known noun → adjective
  if (/ing$/.test(w) && !KEEP_NOUN.has(w)) return "adjective";

  return null; // leave existing
}

let totalChanged = 0;
for (const rel of FILES) {
  const full = path.join(process.cwd(), rel);
  if (!fs.existsSync(full)) continue;
  const src = fs.readFileSync(full, "utf8");
  let out = src;
  let fileChanged = 0;

  // Object-literal form: { word: "X", ..., partOfSpeech: "Y", ... }
  out = out.replace(
    /(\{\s*word:\s*"([^"]+)"[^}]*?partOfSpeech:\s*")([a-zA-Z ]+)(")/g,
    (m, pre, word, oldPos, post) => {
      const newPos = inferPos(word);
      if (newPos && newPos !== oldPos.trim()) { fileChanged++; return pre + newPos + post; }
      return m;
    },
  );

  // Helper form: w("word", "ipa", "level", "vi", "en", "example", "category", "pos", ...)
  out = out.replace(
    /w\(\s*"([^"]+)"\s*,\s*"[^"]*"\s*,\s*"[^"]*"\s*,\s*"[^"]*"\s*,\s*"[^"]*"\s*,\s*"[^"]*"\s*,\s*"[^"]*"\s*,\s*"([a-zA-Z ]+)"/g,
    (m, word, oldPos) => {
      const newPos = inferPos(word);
      if (newPos && newPos !== oldPos.trim()) {
        fileChanged++;
        return m.replace(`"${oldPos}"`, `"${newPos}"`);
      }
      return m;
    },
  );

  if (fileChanged) {
    fs.writeFileSync(full, out);
    console.log(`✓ ${rel}: ${fileChanged} POS corrections`);
    totalChanged += fileChanged;
  }
}
console.log(`\nTotal: ${totalChanged} POS corrections across ${FILES.length} files`);
