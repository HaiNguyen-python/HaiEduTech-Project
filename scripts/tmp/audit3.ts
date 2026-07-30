import { allIeltsLectures } from "../../src/data/ieltsLecturesData";
const rows = allIeltsLectures.filter(l => l.skill === "writing" || l.skill === "speaking");
const gen = ["Diagnose your weakness","Review and refine","Understand the goal of this lesson","Apply in exam conditions","Practise deliberately","Drill the technique"];
const hits = rows.filter(l => l.strategySteps.some(s => gen.includes(s.title.trim())));
console.log("generic-step lectures:", hits.length);
hits.forEach(l=>console.log(l.id, "||", l.strategySteps.map(s=>s.title).join(" / ")));
