import { cambridgeMockExams } from "../../src/data/cambridgeMockExamData";
const stems = new Map<string, string[]>();
const short: string[] = [];
const MIN: Record<string, number> = { starters: 45, movers: 80, flyers: 100, ket: 100, pet: 100 };
for (const e of cambridgeMockExams) for (const q of e.questions) {
  if (q.section !== "Reading & Writing") continue;
  const k = q.question.trim().toLowerCase();
  const arr = stems.get(k) ?? []; arr.push(`${e.id} q${q.id}`); stems.set(k, arr);
  if (q.passage) { const wc = q.passage.split(/\s+/).filter(Boolean).length; if (wc < (MIN[e.level]??100)) short.push(`${e.id} q${q.id} ${wc}`); }
}
const dupes = [...stems].filter(([,v]) => new Set(v.map(x=>x.split(" ")[0])).size > 1);
console.log("dupe stems:", dupes.length);
dupes.forEach(([k,v]) => console.log(" -", JSON.stringify(k), v.join(", ")));
console.log("short passages:", short.length);
const byExam = new Map<string, number>();
short.forEach(s => byExam.set(s.split(" ")[0], (byExam.get(s.split(" ")[0])??0)+1));
console.log([...byExam].map(([a,b])=>`${a}:${b}`).join(" "));
