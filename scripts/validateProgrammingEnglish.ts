import { allProgrammingModules } from "../src/data/programmingLessonData";
import { programmingQuizEnglishById } from "../src/data/curriculum/programmingQuizEnglishById";
import { edtechQuizEn } from "../src/data/curriculum/edtechQuizI18n";
import { nlpQuizEn } from "../src/data/curriculum/nlpQuizI18n";
import { programmingQuizExtraEn } from "../src/data/curriculum/programmingQuizExtraI18n";
import { pythonLessons } from "../src/data/curriculum/pythonPathway";
import { dsaLessons } from "../src/data/dsaLessons";

const errors: string[] = [];
const hasLongDash = (value: string) => /[—–]/.test(value);
const withoutCodeFences = (value: string) =>
  value.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
const required = (value: unknown, path: string) => {
  if (typeof value !== "string" || !value.trim()) errors.push(`${path}: missing English content`);
};

const standardKeys = new Set<string>();
let standardQuestions = 0;
for (const module of allProgrammingModules) {
  required(module.titleEn, `${module.id}.titleEn`);
  for (const lesson of module.lessons) {
    required(lesson.titleEn, `${module.id}/${lesson.id}.titleEn`);
    required(lesson.theoryEn || lesson.theory, `${module.id}/${lesson.id}.theory`);
    const theory = lesson.theoryEn || lesson.theory;
    if (hasLongDash(withoutCodeFences(theory))) {
      errors.push(`${module.id}/${lesson.id}.theory: contains an em dash or en dash in prose`);
    }
    required(lesson.exerciseEn || lesson.exercise, `${module.id}/${lesson.id}.exercise`);
    lesson.quiz.forEach((question, index) => {
      standardQuestions++;
      const key = `${module.id}::${lesson.id}::${index}`;
      standardKeys.add(key);
      const stable = programmingQuizEnglishById[key];
      const legacy = edtechQuizEn[question.question] ?? nlpQuizEn[question.question] ?? programmingQuizExtraEn[question.question];
      const prompt = stable?.question ?? question.questionEn ?? legacy?.q ?? question.question;
      const options = stable?.options ?? question.optionsEn ?? legacy?.opts ?? question.options;
      const explanation = stable?.explanation ?? question.explanationEn ?? legacy?.exp ?? question.explanation;
      required(prompt, `${key}.question`);
      required(explanation, `${key}.explanation`);
      if (!Array.isArray(options) || options.length < 2) errors.push(`${key}: fewer than two options`);
      if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= options.length) {
        errors.push(`${key}: answer index ${question.answer} is outside ${options.length} options`);
      }
    });
  }
}

for (const [key, value] of Object.entries(programmingQuizEnglishById)) {
  if (!standardKeys.has(key)) errors.push(`${key}: orphan English override`);
  if (!value.options.length) errors.push(`${key}: empty override options`);
}

let pythonQuestions = 0;
for (const lesson of pythonLessons) {
  required(lesson.titleEn, `python/${lesson.id}.titleEn`);
  required(lesson.conceptEn, `python/${lesson.id}.conceptEn`);
  required(lesson.pitfallsEn, `python/${lesson.id}.pitfallsEn`);
  required(lesson.practiceTaskEn, `python/${lesson.id}.practiceTaskEn`);
  lesson.quiz.forEach((question, index) => {
    pythonQuestions++;
    required(question.qEn, `python/${lesson.id}/quiz/${index}.qEn`);
    if (question.type === "mcq") {
      if (question.optionsEn.length !== question.options.length) errors.push(`python/${lesson.id}/quiz/${index}: option translation mismatch`);
      if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.optionsEn.length) {
        errors.push(`python/${lesson.id}/quiz/${index}: invalid answer index`);
      }
    } else required(question.answer, `python/${lesson.id}/quiz/${index}.answer`);
  });
}

let dsaQuestions = 0;
for (const lesson of dsaLessons) {
  required(lesson.titleEn, `dsa/${lesson.id}.titleEn`);
  required(lesson.summaryEn, `dsa/${lesson.id}.summaryEn`);
  required(lesson.theoryEn, `dsa/${lesson.id}.theoryEn`);
  required(lesson.complexityEn, `dsa/${lesson.id}.complexityEn`);
  dsaQuestions++;
  required(lesson.quiz.questionEn, `dsa/${lesson.id}.quiz.questionEn`);
  required(lesson.quiz.explanationEn, `dsa/${lesson.id}.quiz.explanationEn`);
  if (lesson.quiz.answer < 0 || lesson.quiz.answer >= lesson.quiz.options.length) errors.push(`dsa/${lesson.id}: invalid answer index`);
}

if (errors.length) {
  console.error(`Programming English audit failed (${errors.length} issues):\n${errors.join("\n")}`);
  process.exit(1);
}

console.log(`Programming English audit passed: ${allProgrammingModules.length} standard modules, ${standardQuestions} standard questions, ${pythonLessons.length} Python lessons/${pythonQuestions} questions, and ${dsaLessons.length} DSA lessons/${dsaQuestions} questions.`);