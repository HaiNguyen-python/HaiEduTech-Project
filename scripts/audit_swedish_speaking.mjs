// Audit the Swedish Speaking Coach content: duplicate theme/sentence IDs,
// duplicate theme names, themes with fewer than 10 sentences, missing fields
// and IPA coverage. Run: npx tsx scripts/audit_swedish_speaking.mjs
import { speakingCoachLanguages } from "../src/data/speakingCoachData.ts";
import { transcribeSwedishSentence } from "../src/lib/swedishSentenceIpa.ts";

const themes = speakingCoachLanguages.swedish.themes;
const problems = [];
const themeIds = new Map();
const themeNames = new Map();
const sentenceIds = new Map();
const byLevel = {};
let total = 0;

for (const th of themes) {
  themeIds.set(th.id, (themeIds.get(th.id) || 0) + 1);
  themeNames.set(th.name, (themeNames.get(th.name) || 0) + 1);
  byLevel[th.level || "none"] = (byLevel[th.level || "none"] || 0) + th.sentences.length;
  if (!th.level) problems.push(`theme ${th.id}: missing level`);
  if (th.sentences.length < 10) problems.push(`theme ${th.id}: only ${th.sentences.length} sentences`);
  for (const s of th.sentences) {
    total++;
    sentenceIds.set(s.id, (sentenceIds.get(s.id) || 0) + 1);
    if (!s.text?.trim()) problems.push(`${s.id}: empty text`);
    if (!s.translation?.trim()) problems.push(`${s.id}: missing Vietnamese translation`);
    if (!["easy", "medium", "hard"].includes(s.difficulty)) problems.push(`${s.id}: bad difficulty`);
    const ipa = s.ipa || transcribeSwedishSentence(s.text);
    if (!ipa || ipa === "//") problems.push(`${s.id}: no IPA produced`);
  }
}

for (const [id, c] of themeIds) if (c > 1) problems.push(`duplicate theme id: ${id} (x${c})`);
for (const [n, c] of themeNames) if (c > 1) problems.push(`duplicate theme name: ${n} (x${c})`);
for (const [id, c] of sentenceIds) if (c > 1) problems.push(`duplicate sentence id: ${id} (x${c})`);

console.log(`Themes: ${themes.length} · Sentences: ${total}`);
console.log("By level:", byLevel);
if (problems.length === 0) {
  console.log("OK - no problems found.");
} else {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(" -", p);
  process.exitCode = 1;
}
