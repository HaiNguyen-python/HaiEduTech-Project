import { SWEDISH_WORDS } from "../src/data/swedishVocabBank.ts";
const patterns = [
  /Jag vill \S+ efter jobbet\./,
  /Hon kommer \S+ till mötet\./,
  /^Soppan är /,
  /^Jag känner mig \S+ idag\./,
  /^Jag är \S+ efter jobbet\./,
  /^Vi \S+ ofta på helgen\./,
  /^Det är \S+ i huset\./,
];
const bad = [];
for (const w of SWEDISH_WORDS) {
  const ex = w.example || "";
  for (const p of patterns) if (p.test(ex)) { bad.push({sv:w.sv,level:w.level,ex,vi:w.exampleVi}); break; }
}
console.log("Bad:", bad.length);
for (const b of bad) console.log(`[${b.level}] ${b.sv} :: ${b.ex}`);
