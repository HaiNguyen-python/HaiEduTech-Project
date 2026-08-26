/**
 * @file grammarExerciseBuilder.ts
 * @description Guarantees that every English Grammar lesson offers at least
 *              three interactive exercises. Missing exercises are generated
 *              deterministically from the lesson's own vocabulary examples and
 *              the model sentences inside its theory, so nothing is invented.
 */
import type {
  DictationExercise,
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

const collectSentences = (lesson: LanguageLesson): string[] => {
  const fromTheory = extractModelSentences(lesson.theoryEn || "");
  const fromVocab = (lesson.vocabulary ?? [])
    .map((entry) => (entry.exampleEn || entry.example || "").trim())
    .filter((sentence) => {
      if (!sentence || !isEnglishOnly(sentence)) return false;
      const count = sentence.split(/\s+/).length;
      return count >= 5 && count <= 14;
    });
  return Array.from(new Set([...fromTheory, ...fromVocab]));
};

const buildFillInBlanks = (lesson: LanguageLesson): FillInBlankExercise[] => {
  const items = (lesson.vocabulary ?? [])
    .map((entry) => {
      const sentence = (entry.exampleEn || entry.example || "").trim();
      const target = entry.word.trim();
      if (!sentence || !target || !isEnglishOnly(sentence)) return null;
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

  const exercises: FillInBlankExercise[] = [];
  for (let i = 0; i + 3 <= items.length && exercises.length < 2; i += 3) {
    exercises.push({
      type: "fill-in-blank",
      instruction: "Điền từ đúng vào chỗ trống.",
      instructionEn: "Complete each sentence with the correct word.",
      sentences: items.slice(i, i + 4),
    });
  }
  return exercises;
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

const buildReorders = (lesson: LanguageLesson): SentenceReorderExercise[] => {
  const sentences = collectSentences(lesson);
  if (sentences.length < 3) return [];
  const seedBase = lesson.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const chunks: SentenceReorderExercise[] = [];
  for (let i = 0; i + 3 <= sentences.length && chunks.length < 2; i += 3) {
    chunks.push({
      type: "sentence-reorder",
      instruction: "Sắp xếp các từ thành câu đúng.",
      instructionEn: "Put the words in the correct order.",
      items: sentences.slice(i, i + 4).map((sentence, index) => ({
        scrambled: scramble(sentence.replace(/[.?!]$/, "").split(/\s+/), seedBase + (i + index) * 17),
        correct: sentence,
        correctEn: sentence,
      })),
    });
  }
  return chunks;
};

const buildDictation = (lesson: LanguageLesson): DictationExercise | null => {
  const sentences = collectSentences(lesson);
  if (sentences.length < 3) return null;
  return {
    type: "dictation",
    instruction: "Nghe và viết lại câu mẫu.",
    instructionEn: "Listen and type the model sentence.",
    sentences: sentences.slice(0, 4).map((sentence) => ({ text: sentence })),
  };
};

const signature = (exercise: InteractiveExercise) => JSON.stringify(exercise).slice(0, 400);

const enhanceLesson = (lesson: LanguageLesson): LanguageLesson => {
  if (lesson.exercises.length >= MIN_EXERCISES) return lesson;

  const existing = new Set(lesson.exercises.map(signature));
  const pool: InteractiveExercise[] = [
    ...buildFillInBlanks(lesson),
    ...buildReorders(lesson),
  ];
  const dictation = buildDictation(lesson);
  if (dictation) pool.push(dictation);

  const additions: InteractiveExercise[] = [];
  for (const candidate of pool) {
    if (lesson.exercises.length + additions.length >= MIN_EXERCISES) break;
    const key = signature(candidate);
    if (existing.has(key)) continue;
    existing.add(key);
    additions.push(candidate);
  }

  if (additions.length === 0) return lesson;
  return { ...lesson, exercises: [...lesson.exercises, ...additions] };
};

export const enhanceGrammarModulesWithExercises = (
  modules: LanguageModule[]
): LanguageModule[] =>
  modules.map((mod) => ({ ...mod, lessons: mod.lessons.map(enhanceLesson) }));
