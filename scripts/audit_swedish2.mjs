import { SWEDISH_WORDS } from "../src/data/swedishVocabBank.ts";
const checks = ["fönster","första","för sent","för tidigt","för","följa","följande","föräldrar","förening","förändra","förbereda","förklara","förlora","försöka","förstå","förstås","färsk","fördel","förlåt","fråga","främst","frukt","fri","fritid","frukost","framtid","framför","frånvarande"];
for (const c of checks) {
  const w = SWEDISH_WORDS.find(x=>x.sv.toLowerCase()===c);
  if (w) console.log(`[${w.level}] ${w.sv} :: ${w.example} | ${w.exampleVi}`);
}
