/**
 * @file audit_vietnamese_content.ts
 * @description Audit chuẩn nội dung tiếng Việt: tối thiểu 10 từ vựng + 5 câu hỏi mỗi bài,
 * không trùng mã bài, quiz hợp lệ, có bản song ngữ.
 * Chạy: bun scripts/audit_vietnamese_content.ts
 */
import { vietnameseLanguageModules } from "../src/data/vietnameseCurriculumData";
import { vffLevelA1, vffLevelB1 } from "../src/data/vietnamese/vffLevels";
import { vffLevelA2 } from "../src/data/vietnamese/vffLevelA2";
import { dailyMicroLessons as dailyBase } from "../src/data/vietnamese/dailyVietnameseData";
import { dailyMicroLessonsExpansion } from "../src/data/vietnamese/dailyVietnameseExpansion";
import { dailyMicroLessonsV10 } from "../src/data/vietnamese/expansionV10Practice";
import { VFF_VIDEO_BANK } from "../src/data/vietnamese/vffVideoBank";
import {
  vietnameseAlphabet,
  vietnameseAlphabetPronunciations,
  vietnameseTones,
} from "../src/data/vietnamese/alphabetData";

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

const vffLevels = [vffLevelA1, vffLevelA2, vffLevelB1];
const vffIds = new Set<string>();
for (const level of vffLevels) {
  for (const lesson of level.lessons) {
    const where = `${level.id}/${lesson.id}`;
    if (vffIds.has(lesson.id)) issues.push(`VFF_DUPLICATE_ID ${where}`);
    vffIds.add(lesson.id);
    if (lesson.quiz.length < MIN_QUIZ) issues.push(`VFF_QUIZ_TOO_FEW ${where} (${lesson.quiz.length})`);
    if (!lesson.title.trim() || !lesson.titleEn.trim() || !lesson.goal.trim() || !lesson.goalEn.trim()) {
      issues.push(`VFF_BILINGUAL_LESSON ${where}`);
    }
    lesson.quiz.forEach((item, index) => {
      if (!item.question.trim() || !item.questionEn.trim() || !item.explanationEn.trim()) {
        issues.push(`VFF_BILINGUAL_QUIZ ${where} #${index}`);
      }
      if (item.answer < 0 || item.answer >= item.options.length) issues.push(`VFF_QUIZ_ANSWER_RANGE ${where} #${index}`);
      if (new Set(item.options.map((option) => option.trim().toLowerCase())).size !== item.options.length) {
        issues.push(`VFF_QUIZ_OPTION_DUPLICATE ${where} #${index}`);
      }
    });
  }
}

const dailyLessons = [...dailyBase, ...dailyMicroLessonsExpansion, ...dailyMicroLessonsV10];
const dailyDays = dailyLessons.map((lesson) => lesson.day);
if (new Set(dailyDays).size !== dailyDays.length) issues.push("DAILY_DUPLICATE_DAY");
if (Math.min(...dailyDays) !== 1 || Math.max(...dailyDays) !== dailyDays.length) issues.push("DAILY_NON_CONTIGUOUS");

const invalidVideoIds = new Set(["0m5v-K3JlZI", "GgQTG3B4RQ4", "gN0Zsm3XPXk"]);
for (const clip of VFF_VIDEO_BANK) {
  if (!clip.youtubeId.trim() || invalidVideoIds.has(clip.youtubeId)) issues.push(`VFF_VIDEO_INVALID ${clip.id}`);
  if (!clip.transcript.length || !clip.glossary.length || !clip.quiz.length) issues.push(`VFF_VIDEO_CONTENT_MISSING ${clip.id}`);
}

const alphabetLetters = new Set(vietnameseAlphabet.map((item) => item.letter));
const pronunciationLetters = vietnameseAlphabetPronunciations.map((item) => item.letter);
if (vietnameseAlphabet.length !== 29) issues.push(`ALPHABET_COUNT (${vietnameseAlphabet.length})`);
if (vietnameseTones.length !== 6) issues.push(`TONE_COUNT (${vietnameseTones.length})`);
if (new Set(pronunciationLetters).size !== 29) issues.push("ALPHABET_PRONUNCIATION_DUPLICATE");
for (const item of vietnameseAlphabetPronunciations) {
  if (!alphabetLetters.has(item.letter)) issues.push(`ALPHABET_PRONUNCIATION_UNKNOWN ${item.letter}`);
  if (!item.nameText.trim() || !item.soundLabel.trim() || !item.soundText.trim()) {
    issues.push(`ALPHABET_PRONUNCIATION_EMPTY ${item.letter}`);
  }
}
for (const letter of vietnameseAlphabet) {
  if (!pronunciationLetters.includes(letter.letter)) issues.push(`ALPHABET_PRONUNCIATION_MISSING ${letter.letter}`);
  if (!letter.exampleWord.trim()) issues.push(`ALPHABET_EXAMPLE_MISSING ${letter.letter}`);
}

console.log(`Modules: ${vietnameseLanguageModules.length}`);
console.log(`Lessons: ${lessonCount}`);
console.log(`VFF lessons: ${vffLevels.reduce((sum, level) => sum + level.lessons.length, 0)}`);
console.log(`Daily lessons: ${dailyLessons.length}`);
console.log(`VFF videos: ${VFF_VIDEO_BANK.length}`);
console.log(`Alphabet pronunciations: ${vietnameseAlphabetPronunciations.length}`);
console.log(`Issues: ${issues.length}`);
issues.slice(0, 80).forEach((issue) => console.log(` - ${issue}`));
if (issues.length > 80) console.log(` ... and ${issues.length - 80} more`);
if (issues.length > 0) process.exit(1);
