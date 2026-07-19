import { SWEDISH_WORDS } from "../src/data/swedishVocabBank.ts";
const bad = [];
const patterns = [
  /I texten om\b/i, /I kursen\b/i, /På lektionen\b/i, /I uppgiften\b/i,
  /Skriv ordet\b/i, /Ordet ['"]/i, /I ordlistan\b/i, /tavlan\b/i,
  /hobbygruppen\b/i, /använder vi ofta ordet\b/i, /Vi använder ['"]/i,
  /Kan du säga ['"]/i, /Läraren (skriver|förklarar|säger)\b/i,
  /varje dag hemma\b/i, /i klassen\b/i,
];
for (const w of SWEDISH_WORDS) {
  const ex = w.example || "";
  for (const p of patterns) if (p.test(ex)) { bad.push({sv:w.sv,level:w.level,ex}); break; }
}
console.log("Bad count:", bad.length);
for (const b of bad.slice(0,80)) console.log(`[${b.level}] ${b.sv} :: ${b.ex}`);
