import { CAMBRIDGE_KIDS_WORDS_DEDUPED } from "../src/data/cambridgeKidsVocabMaster";
import { getCategory } from "../src/data/cambridgeKidsCategories";
const others = CAMBRIDGE_KIDS_WORDS_DEDUPED.filter(w => getCategory(w.word) === "Other");
console.log(`Other count: ${others.length} / ${CAMBRIDGE_KIDS_WORDS_DEDUPED.length}`);
console.log(others.map(w => `${w.word} | ${w.vi}`).join("\n"));
