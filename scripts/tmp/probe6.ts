import { cambridgeMockExams } from "../../src/data/cambridgeMockExamData";
const MIN: Record<string, number> = { starters: 45, movers: 80, flyers: 100, ket: 110, pet: 120 };
for (const e of cambridgeMockExams) for (const q of e.questions) {
  if (q.section !== "Reading & Writing" || !q.passage) continue;
  const wc = q.passage.split(/\s+/).filter(Boolean).length;
  if (wc < (MIN[e.level]??100)) console.log(e.id, "q"+q.id, wc, "|", q.passage.slice(0,160));
}
