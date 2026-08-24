/**
 * @file audit_ielts_reading.ts
 * @description Content audit for IELTS Reading Practice. Checks passage length,
 *              answer-label distribution (anti-predictability), heading
 *              distractor counts, answer validity per question type, duplicate
 *              questions and forbidden em/en dashes.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { IELTS_FULL_READING_EXAMS } from "../src/data/ieltsFullReadingExams";
import { IELTS_FULL_READING_EXAMS_EXPANSION } from "../src/data/ieltsFullReadingExamsExpansion";
import { IELTS_FULL_READING_EXAMS_EXPANSION2 } from "../src/data/ieltsFullReadingExamsExpansion2";
import { IELTS_FULL_READING_EXAMS_EXPANSION3 } from "../src/data/ieltsFullReadingExamsExpansion3";
import { IELTS_FULL_READING_EXAMS_EXPANSION4 } from "../src/data/ieltsFullReadingExamsExpansion4";
import { IELTS_FULL_READING_EXAMS_EXPANSION5 } from "../src/data/ieltsFullReadingExamsExpansion5";
import { IELTS_FULL_READING_EXAMS_HARD } from "../src/data/ieltsFullReadingExamsHard";
import { IELTS_FULL_READING_EXAMS_HARD2 } from "../src/data/ieltsFullReadingExamsHard2";
import { READING_PASSAGE_EXTENSIONS } from "../src/data/ieltsReadingPassageExtensions";
import { READING_QUESTION_EXTENSIONS } from "../src/data/ieltsReadingQuestionExtensions";
import { shuffleHeadingsInExam } from "../src/lib/ieltsReadingShuffle";
import { IELTS_FULL_TESTS } from "../src/data/ieltsFullTests";

const exams = [
  ...IELTS_FULL_READING_EXAMS,
  ...IELTS_FULL_READING_EXAMS_EXPANSION,
  ...IELTS_FULL_READING_EXAMS_EXPANSION2,
  ...IELTS_FULL_READING_EXAMS_EXPANSION3,
  ...IELTS_FULL_READING_EXAMS_EXPANSION4,
  ...IELTS_FULL_READING_EXAMS_EXPANSION5,
  ...IELTS_FULL_READING_EXAMS_HARD,
  ...IELTS_FULL_READING_EXAMS_HARD2,
].map((e) => {
  const extra = READING_PASSAGE_EXTENSIONS[e.id];
  const extraQs = READING_QUESTION_EXTENSIONS[e.id];
  let merged = extra ? { ...e, passage: e.passage + extra } : { ...e };
  if (extraQs?.length) merged = { ...merged, questions: [...merged.questions, ...extraQs] };
  return shuffleHeadingsInExam(merged);
});

const issues: string[] = [];
const info: string[] = [];
const labelCount = new Map<string, number>();
const typeCount = new Map<string, number>();
const wordCounts: { id: string; n: number }[] = [];
const ids = new Set<string>();

const words = (s: string) => (s.match(/\S+/g) ?? []).length;

for (const exam of exams) {
  if (ids.has(exam.id)) issues.push(`${exam.id}: duplicate exam id`);
  ids.add(exam.id);

  const n = words(exam.passage);
  wordCounts.push({ id: exam.id, n });
  const min = exam.level === "Hard" ? 800 : 650;
  if (n < min) info.push(`${exam.id}: passage only ${n} words (target ${min}+ for ${exam.level})`);

  if (exam.questions.length < 13) issues.push(`${exam.id}: only ${exam.questions.length} questions`);

  const numbers = new Set<number>();
  const prompts = new Set<string>();
  let headingQs = 0;
  let headingListSize = 0;

  for (const q of exam.questions) {
    const at = `${exam.id} q${q.number}`;
    if (numbers.has(q.number)) issues.push(`${at}: duplicate question number`);
    numbers.add(q.number);

    const key = q.prompt.trim().toLowerCase();
    if (prompts.has(key)) issues.push(`${at}: duplicate prompt`);
    prompts.add(key);

    typeCount.set(q.type, (typeCount.get(q.type) ?? 0) + 1);

    const text = [q.prompt, q.explanation ?? "", q.instruction ?? "", ...(q.options ?? [])].join(" ");
    if (/[—–]/.test(text)) issues.push(`${at}: contains em/en dash`);

    if (!q.answer || !q.answer.trim()) issues.push(`${at}: empty answer`);

    switch (q.type) {
      case "multiple-choice":
        if (!q.options?.length) issues.push(`${at}: no options`);
        else if (!q.options.some((o) => o.trim().toLowerCase() === q.answer.trim().toLowerCase()))
          issues.push(`${at}: answer not among options`);
        break;
      case "mcq-multi":
        if (!q.answers || q.answers.length !== 2) issues.push(`${at}: mcq-multi needs exactly 2 answers`);
        if (!q.options || q.options.length < 4) issues.push(`${at}: mcq-multi needs >= 4 options`);
        break;
      case "tfng":
        if (!["true", "false", "not given"].includes(q.answer.trim().toLowerCase()))
          issues.push(`${at}: invalid TFNG answer "${q.answer}"`);
        break;
      case "ynng":
        if (!["yes", "no", "not given"].includes(q.answer.trim().toLowerCase()))
          issues.push(`${at}: invalid YNNG answer "${q.answer}"`);
        break;
      case "matching-headings": {
        headingQs += 1;
        headingListSize = Math.max(headingListSize, q.headings?.length ?? 0);
        if (!q.headings?.some((h) => h.label === q.answer))
          issues.push(`${at}: answer label not in heading list`);
        labelCount.set(q.answer, (labelCount.get(q.answer) ?? 0) + 1);
        break;
      }
      case "matching-features":
      case "matching-endings":
      case "summary-completion": {
        const list = q.features ?? q.endings ?? q.wordBank;
        if (!list?.length) issues.push(`${at}: missing option list`);
        else if (!list.some((o) => o.label === q.answer)) issues.push(`${at}: answer label not in list`);
        break;
      }
      case "fill-blank":
        if (!/_{2,}/.test(q.prompt)) info.push(`${at}: fill-blank prompt has no gap marker`);
        break;
    }

    if (!q.explanation || q.explanation.trim().length < 20) info.push(`${at}: thin explanation`);
  }

  if (headingQs > 0 && headingListSize < headingQs + 3)
    issues.push(`${exam.id}: heading list ${headingListSize} for ${headingQs} questions (need >= ${headingQs + 3} distractors included)`);
}

// Full-test referential integrity
for (const ft of IELTS_FULL_TESTS) {
  for (const pid of ft.passageIds) {
    if (!ids.has(pid)) issues.push(`${ft.id}: references unknown passage ${pid}`);
  }
}

wordCounts.sort((a, b) => a.n - b.n);
console.log("Exams:", exams.length, "| Full tests:", IELTS_FULL_TESTS.length);
console.log("Shortest passages:", wordCounts.slice(0, 6).map((w) => `${w.id}=${w.n}`).join(" "));
console.log("Longest passages:", wordCounts.slice(-4).map((w) => `${w.id}=${w.n}`).join(" "));
console.log("Question types:", [...typeCount.entries()].map(([t, c]) => `${t}=${c}`).join(" "));
const totalLabels = [...labelCount.values()].reduce((a, b) => a + b, 0);
console.log(
  "Matching-headings answer spread:",
  [...labelCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([l, c]) => `${l}=${((c / totalLabels) * 100).toFixed(1)}%`)
    .join(" ")
);
console.log("Info:", info.length);
console.log("Issues:", issues.length);
issues.slice(0, 60).forEach((i) => console.log(" -", i));
