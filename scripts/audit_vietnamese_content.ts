/**
 * @file audit_vietnamese_content.ts
 * @description Audit chuẩn nội dung tiếng Việt: tối thiểu 10 từ vựng + 5 câu hỏi mỗi bài,
 * không trùng mã bài, quiz hợp lệ, có bản song ngữ.
 * Chạy: bun scripts/audit_vietnamese_content.ts
 */
import { vietnameseLanguageModules } from "../src/data/vietnameseCurriculumData";

const MIN_VOCAB = 10;
const MIN_QUIZ = 5;

const issues: string[] = [];
const seen = new Map<string, string>();
let lessonCount = 0;

for (const mod of vietnameseLanguageModules) {
  for (const lesson of mod.lessons) {
    lessonCount += 1;
    const where = `${mod.id}/${lesson.id}`;

    const prev = seen.get(lesson.id);
    if (prev) issues.push(`DUPLICATE_ID ${lesson.id} (${prev} vs ${mod.id})`);
    else seen.set(lesson.id, mod.id);

    const vocab = lesson.vocabulary ?? [];
    const quiz = lesson.quiz ?? [];
    if (vocab.length < MIN_VOCAB) issues.push(`VOCAB_TOO_FEW ${where} (${vocab.length})`);
    if (quiz.length < MIN_QUIZ) issues.push(`QUIZ_TOO_FEW ${where} (${quiz.length})`);
    if (!lesson.theory?.trim()) issues.push(`THEORY_MISSING ${where}`);
    if (!lesson.theoryEn?.trim()) issues.push(`THEORY_EN_MISSING ${where}`);
    if (!lesson.titleEn?.trim()) issues.push(`TITLE_EN_MISSING ${where}`);

    const words = new Set<string>();
    vocab.forEach((entry, index) => {
      const key = entry.word?.trim().toLowerCase();
      if (!key) issues.push(`VOCAB_EMPTY ${where}#${index}`);
      else if (words.has(key)) issues.push(`VOCAB_DUPLICATE ${where} "${entry.word}"`);
      else words.add(key);
      if (!entry.meaning?.trim() || !entry.meaningEn?.trim()) issues.push(`VOCAB_MEANING ${where} "${entry.word}"`);
      if (!entry.example?.trim() || !entry.exampleEn?.trim()) issues.push(`VOCAB_EXAMPLE ${where} "${entry.word}"`);
    });

    const questions = new Set<string>();
    quiz.forEach((item, index) => {
      const key = item.question?.trim().toLowerCase();
      if (!key) issues.push(`QUIZ_EMPTY ${where}#${index}`);
      else if (questions.has(key)) issues.push(`QUIZ_DUPLICATE ${where} #${index}`);
      else questions.add(key);
      if (!Array.isArray(item.options) || item.options.length < 3) issues.push(`QUIZ_OPTIONS ${where} #${index}`);
      else if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer >= item.options.length) {
        issues.push(`QUIZ_ANSWER_RANGE ${where} #${index}`);
      }
      if (!item.explanation?.trim() || !item.explanationEn?.trim()) issues.push(`QUIZ_EXPLANATION ${where} #${index}`);
      if (!item.questionEn?.trim()) issues.push(`QUIZ_QUESTION_EN ${where} #${index}`);
      if (new Set(item.options?.map((option) => option.trim().toLowerCase())).size !== item.options?.length) {
        issues.push(`QUIZ_OPTION_DUPLICATE ${where} #${index}`);
      }
    });
  }
}

console.log(`Modules: ${vietnameseLanguageModules.length}`);
console.log(`Lessons: ${lessonCount}`);
console.log(`Issues: ${issues.length}`);
issues.slice(0, 80).forEach((issue) => console.log(` - ${issue}`));
if (issues.length > 80) console.log(` ... and ${issues.length - 80} more`);
if (issues.length > 0) process.exit(1);
