import { cambridgeMockExams } from "../src/data/cambridgeMockExamData";
let total=0, orphans=0;
const byExam: Record<string, string[]> = {};
for (const ex of cambridgeMockExams) {
  for (const q of ex.questions) {
    if (q.section !== "Reading & Writing") continue;
    total++;
    if (!q.passage || !q.passage.trim()) { orphans++; (byExam[ex.id] ||= []).push(q.question); }
  }
}
console.log("reading questions", total, "orphans", orphans, "exams affected", Object.keys(byExam).length);
for (const [k,v] of Object.entries(byExam)) console.log(k, v.length);
