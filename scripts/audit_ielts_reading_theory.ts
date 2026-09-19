import { ieltsModules } from "../src/data/languageCurriculum/englishIelts";
import { IELTS_READING_THEORY_GUIDE_IDS } from "../src/data/languageCurriculum/ieltsReadingTheoryGuides";

const module = ieltsModules.find((item) => item.id === "ielts-reading");
if (!module) throw new Error("IELTS Reading module not found");

const issues: string[] = [];
const expectedVi = ["### Mục tiêu", "### Nhận diện yêu cầu", "### Quy trình làm bài", "### Cách xác nhận bằng chứng", "### Bẫy thường gặp", "### Ví dụ có giải thích", "### Checklist trước khi chốt"];
const expectedEn = ["### What this skill tests", "### Recognise the task", "### Step-by-step method", "### Confirming the evidence", "### Common traps", "### Worked example", "### Final checklist"];

if (module.lessons.length !== 24) issues.push(`Expected 24 lessons, found ${module.lessons.length}`);
if (IELTS_READING_THEORY_GUIDE_IDS.length !== 24) issues.push(`Expected 24 theory guides, found ${IELTS_READING_THEORY_GUIDE_IDS.length}`);

const ids = new Set<string>();
for (const lesson of module.lessons) {
  if (ids.has(lesson.id)) issues.push(`${lesson.id}: duplicate lesson id`);
  ids.add(lesson.id);
  if (!IELTS_READING_THEORY_GUIDE_IDS.includes(lesson.id)) issues.push(`${lesson.id}: missing structured theory guide`);
  for (const heading of expectedVi) if (!lesson.theory.includes(heading)) issues.push(`${lesson.id}: missing Vietnamese section ${heading}`);
  for (const heading of expectedEn) if (!lesson.theoryEn.includes(heading)) issues.push(`${lesson.id}: missing English section ${heading}`);
  if (lesson.theory.length < 900 || lesson.theoryEn.length < 900) issues.push(`${lesson.id}: theory is too thin`);
}

const byId = new Map(module.lessons.map((lesson) => [lesson.id, lesson]));
const requiredDistinctions: Array<[string, string, string]> = [
  ["ielts-reading-1", "foundation skills", "Skimming foundation"],
  ["ielts-reading-18", "time-controlled locating", "Skimming speed practice"],
  ["ielts-reading-7", "specific detail", "Matching Information foundation"],
  ["ielts-reading-15", "distributed evidence", "Matching Information advanced"],
  ["ielts-reading-10", "core method", "Short Answer foundation"],
  ["ielts-reading-17", "complex instructions", "Short Answer advanced"],
];
for (const [id, phrase, label] of requiredDistinctions) {
  if (!byId.get(id)?.theoryEn.includes(phrase)) issues.push(`${label}: missing distinguishing focus '${phrase}'`);
}

const practiceIds = [20, 21, 22, 23, 24].map((number) => `ielts-reading-${number}`);
for (const id of practiceIds) {
  const lesson = byId.get(id);
  if (!lesson?.theoryEn.toLowerCase().includes("short")) issues.push(`${id}: practice length is not labelled honestly`);
  if (/\bis (?:a )?full-length\b/i.test(lesson?.theoryEn ?? "")) issues.push(`${id}: incorrectly labelled full-length`);
}

const coffee = byId.get("ielts-reading-20");
const coffeeQuestion = coffee?.quiz.find((item) => item.question.includes("over 3,000"));
if (coffeeQuestion?.options[coffeeQuestion.answer] !== "NOT GIVEN") issues.push("ielts-reading-20: lower-bound question must be NOT GIVEN");

const ynngAdvanced = byId.get("ielts-reading-16");
const ynngInstruction = ynngAdvanced?.exercises[0]?.type === "fill-in-blank" ? ynngAdvanced.exercises[0].instructionEn : "";
if (!ynngInstruction.includes("writer's views") || !ynngInstruction.includes("I disagree")) issues.push("ielts-reading-16: exercise does not test an explicit writer view");

console.log(`IELTS Reading Theory: ${module.lessons.length} lessons, ${issues.length} issues`);
for (const issue of issues) console.error(`- ${issue}`);
if (issues.length) process.exit(1);