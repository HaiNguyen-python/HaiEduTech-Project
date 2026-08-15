import { SWEDISH_WORDS } from "../src/data/swedishVocabBank";
const out = SWEDISH_WORDS.map(w => ({ id: w.id, sv: w.sv, en: w.en, vi: w.vi, pos: w.pos, cat: w.category, lvl: (w as any).level, ex: w.example, exEn: w.exampleEn, exVi: w.exampleVi }));
console.log(JSON.stringify(out));
