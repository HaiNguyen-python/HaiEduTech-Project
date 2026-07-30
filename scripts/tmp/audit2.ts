import { allIeltsLectures } from "../../src/data/ieltsLecturesData";
const rows = allIeltsLectures.filter(l => l.skill === "writing" || l.skill === "speaking");
let short = 0, tot = 0;
const samples: string[] = [];
for (const l of rows) for (const s of l.strategySteps) {
  tot++;
  if ((s.description||"").length < 70) { short++; if (samples.length<12) samples.push(`${l.id} | ${s.title} | ${s.description}`); }
}
console.log("steps", tot, "short(<70)", short);
samples.forEach(s=>console.log(s));
