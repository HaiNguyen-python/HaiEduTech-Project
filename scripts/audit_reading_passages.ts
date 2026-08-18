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

const CTX = /(according to|the text|the passage|the notice|the sign|the story|the email|the message|the advert|the poster|the article|the writer|the author|does the (notice|sign|text)|open on|opening|what time|how much does|how many|who (is|are|does|did)|where (is|are|does|did)|why (is|are|does|did)|what happen)/i;
let ctx = 0; const samples: string[] = [];
for (const ex of cambridgeMockExams) for (const q of ex.questions) {
  if (q.section !== "Reading & Writing") continue;
  if (q.passage && q.passage.trim()) continue;
  if (CTX.test(q.question)) { ctx++; if (samples.length < 30) samples.push(ex.id + " | " + q.question + " | " + q.options.join(" / ") + " | ans=" + q.correctAnswer); }
}
console.log("context-dependent orphans:", ctx);
samples.forEach(s => console.log(s));
