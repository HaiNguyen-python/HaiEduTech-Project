import { CAMBRIDGE_KIDS_WORDS_DEDUPED } from "../src/data/cambridgeKidsVocabMaster";
import { getCategory } from "../src/data/cambridgeKidsCategories";

const map = new Map<string, Map<string, string[]>>();
for (const w of CAMBRIDGE_KIDS_WORDS_DEDUPED) {
  const c = getCategory(w.word);
  if (!map.has(w.level)) map.set(w.level, new Map());
  const m = map.get(w.level)!;
  if (!m.has(c)) m.set(c, []);
  m.get(c)!.push(w.word);
}
for (const [lvl, m] of map) {
  console.log(`\n=== ${lvl} ===`);
  const arr = [...m.entries()].sort((a,b)=>a[1].length-b[1].length);
  for (const [c, ws] of arr) {
    if (ws.length <= 5) console.log(`  ${c} (${ws.length}): ${ws.join(", ")}`);
  }
}
