import { cambridgeMockExams } from "../src/data/cambridgeMockExamData";
const NEEDS = /(according to|\bthe text\b|\bthe passage\b|\bthe notice\b|\bthe sign\b|\bthe story\b|\bthe email\b|\bthe message\b|\bthe advert|\bthe poster\b|\bthe article\b|\bthe writer\b|\bthe author\b|best title|main purpose|open on|opening (hours|time)|library|where is the|what time (is|does) the|how much (is|does) the|who (won|wrote|called|sent))/i;
for (const ex of cambridgeMockExams) for (const q of ex.questions) {
  if (q.section !== "Reading & Writing") continue;
  if (q.passage && q.passage.trim()) continue;
  if (NEEDS.test(q.question)) console.log(`${ex.id}\t${q.question}\t[${q.options.join(" | ")}]\tans=${q.correctAnswer}`);
}
