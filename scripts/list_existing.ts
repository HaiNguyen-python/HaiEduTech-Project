import { CAMBRIDGE_KIDS_WORDS_DEDUPED } from "../src/data/cambridgeKidsVocabMaster";
const words = new Set(CAMBRIDGE_KIDS_WORDS_DEDUPED.map(w => w.word.toLowerCase()));
console.log([...words].sort().join("\n"));
