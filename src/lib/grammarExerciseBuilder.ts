/**
 * @file grammarExerciseBuilder.ts
 * @description Guarantees that every English Grammar lesson offers at least
 *              three interactive exercises. Missing exercises are generated
 *              deterministically from the lesson's own vocabulary examples and
 *              the model sentences inside its theory, so nothing is invented.
 */
import type {
  FillInBlankExercise,
  InteractiveExercise,
  LanguageLesson,
  LanguageModule,
  SentenceReorderExercise,
} from "@/data/languageCurriculum/types";

const MIN_EXERCISES = 3;

const VIETNAMESE_CHAR_RE =
  /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;

const isEnglishOnly = (value: string) => !VIETNAMESE_CHAR_RE.test(value);

/** Pull bold model sentences out of a markdown theory block. */
const extractModelSentences = (theory: string): string[] => {
  const sentences: string[] = [];
  const lines = theory.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line.startsWith("-") && !line.startsWith("*")) continue;
    const cleaned = line
      .replace(/^[-*]\s+/, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/`/g, "")
      .replace(/\s*\([^)]*\)/g, "")
      .trim();
    if (!/^[A-Z]/.test(cleaned)) continue;
    if (!/[.!?]$/.test(cleaned)) continue;
    if (cleaned.includes("→") || cleaned.includes("|")) continue;
    const wordCount = cleaned.split(/\s+/).length;
    if (wordCount < 5 || wordCount > 14) continue;
    if (!isEnglishOnly(cleaned)) continue;
    sentences.push(cleaned);
  }

  return Array.from(new Set(sentences));
};

const buildFillInBlank = (lesson: LanguageLesson): FillInBlankExercise | null => {
  const items = (lesson.vocabulary ?? [])
    .map((entry) => {
      const sentence = (entry.exampleEn || entry.example || "").trim();
      const target = entry.word.trim();
      if (!sentence || !target) return null;
      if (!isEnglishOnly(sentence)) return null;
      const pattern = new RegExp(target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      if (!pattern.test(sentence)) return null;
      return {
        text: sentence.replace(pattern, "___"),
        textEn: sentence.replace(pattern, "___"),
        answer: target,
        hint: entry.meaningEn || entry.meaning,
      };
    })
    .filter(Boolean) as FillInBlankExercise["sentences"];

  if (items.length < 3) return null;

  return {
    type: "fill-in-blank",
    instruction: "Điền từ đúng vào chỗ trống.",
    instructionEn: "Complete each sentence with the correct word.",
    sentences: items.slice(0, 6),
  };
};

/** Deterministic scramble so the practice stays stable between renders. */
const scramble = (words: string[], seed: number) => {
  const output = [...words];
  let state = seed || 1;
  for (let i = output.length - 1; i > 0; i -= 1) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const j = state % (i + 1);
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output.join(" ") === words.join(" ") && output.length > 1
    ? [...output.slice(1), output[0]]
    : output;
};

const buildReorder = (lesson: LanguageLesson): SentenceReorderExercise | null => {
  const sentences = extractModelSentences(lesson.theoryEn || "");
  if (sentences.length < 3) return null;

  const seedBase = lesson.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return {
    type: "sentence-reorder",
    instruction: "Sắp xếp các từ thành câu đúng.",
    instructionEn: "Put the words in the correct order.",
    items: sentences.slice(0, 5).map((sentence, index) => ({
      scrambled: scramble(sentence.replace(/[.?!]$/, "").split(/\s+/), seedBase + index * 17),
      correct: sentence,
      correctEn: sentence,
    })),
  };
};

const hasType = (exercises: InteractiveExercise[], type: InteractiveExercise["type"]) =>
  exercises.some((exercise) => exercise.type === type);

const enhanceLesson = (lesson: LanguageLesson): LanguageLesson => {
  if (lesson.exercises.length >= MIN_EXERCISES) return lesson;

  const additions: InteractiveExercise[] = [];

  if (!hasType(lesson.exercises, "fill-in-blank")) {
    const fill = buildFillInBlank(lesson);
    if (fill) additions.push(fill);
  }
  if (!hasType(lesson.exercises, "sentence-reorder")) {
    const reorder = buildReorder(lesson);
    if (reorder) additions.push(reorder);
  }
  if (lesson.exercises.length + additions.length < MIN_EXERCISES) {
    const fill = buildFillInBlank(lesson);
    const reorder = buildReorder(lesson);
    if (fill && !additions.includes(fill) && !hasType(lesson.exercises, "fill-in-blank")) additions.push(fill);
    if (reorder && !additions.includes(reorder) && !hasType(lesson.exercises, "sentence-reorder")) additions.push(reorder);
  }

  if (additions.length === 0) return lesson;
  return { ...lesson, exercises: [...lesson.exercises, ...additions] };
};

export const enhanceGrammarModulesWithExercises = (
  modules: LanguageModule[]
): LanguageModule[] =>
  modules.map((mod) => ({ ...mod, lessons: mod.lessons.map(enhanceLesson) }));
