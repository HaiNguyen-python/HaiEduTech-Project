import { CAMBRIDGE_KIDS_WORDS_DEDUPED } from "../src/data/cambridgeKidsVocabMaster";
import { getCategory } from "../src/data/cambridgeKidsCategories";

const byLevel: Record<string, string[]> = {};
for (const w of CAMBRIDGE_KIDS_WORDS_DEDUPED) {
  if (getCategory(w.word) === "Other") {
    (byLevel[w.level] ||= []).push(`${w.word}|${w.vi}`);
  }
}
for (const lvl of Object.keys(byLevel).sort()) {
  console.log(`\n=== ${lvl} (${byLevel[lvl].length}) ===`);
  console.log(byLevel[lvl].sort().join("\n"));
}
console.log("\n\nTOTAL OTHER:", Object.values(byLevel).flat().length);
console.log("TOTAL WORDS:", CAMBRIDGE_KIDS_WORDS_DEDUPED.length);
