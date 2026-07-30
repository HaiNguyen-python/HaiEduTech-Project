import { allIeltsLectures } from "../../src/data/ieltsLecturesData";
const rows = allIeltsLectures.filter(l => l.skill === "writing" || l.skill === "speaking");
console.log("total", rows.length);
const bad: string[] = [];
for (const l of rows) {
  const issues: string[] = [];
  if ((l.strategySteps?.length ?? 0) < 4) issues.push(`steps=${l.strategySteps?.length}`);
  if ((l.practicalExamples?.length ?? 0) < 3) issues.push(`ex=${l.practicalExamples?.length}`);
  if ((l.vocabHighlights?.length ?? 0) < 6) issues.push(`vocab=${l.vocabHighlights?.length}`);
  if ((l.mistakesToAvoid?.length ?? 0) < 3) issues.push(`mist=${l.mistakesToAvoid?.length}`);
  if ((l.quiz?.length ?? 0) < 4) issues.push(`quiz=${l.quiz?.length}`);
  if ((l.cheatSheetPoints?.length ?? 0) < 5) issues.push(`cheat=${l.cheatSheetPoints?.length}`);
  const avgStep = (l.strategySteps||[]).reduce((a,s)=>a+(s.description?.length||0),0)/Math.max(1,(l.strategySteps||[]).length);
  if (avgStep < 140) issues.push(`thinTheory=${Math.round(avgStep)}`);
  const genericEx = (l.practicalExamples||[]).some(e => /Apply the framework above/.test(e.example||""));
  if (genericEx) issues.push("genericExample");
  if (issues.length) bad.push(`${l.skill} | ${l.id} :: ${issues.join(", ")}`);
}
console.log("problem lectures:", bad.length);
bad.forEach(b=>console.log(b));
