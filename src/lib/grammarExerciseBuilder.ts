/**
 * @file grammarExerciseBuilder.ts
 * @description Guarantees that every English Grammar lesson offers a rich, varied
 *              practice set (fill-in-blank, reorder, error correction, sentence
 *              transformation, multiple choice, matching, dictation). Generated
 *              items are derived deterministically from the lesson's own theory,
 *              vocabulary and quiz, so no content is invented.
 */
import type {
  DictationExercise,
  ErrorCorrectionExercise,
  FillInBlankExercise,
  InteractiveExercise,
  LanguageLesson,
  LanguageModule,
  MatchingExercise,
  MultipleChoiceExercise,
  SentenceReorderExercise,
  TransformationExercise,
} from "@/data/languageCurriculum/types";

const MIN_EXERCISES = 8;

const VIETNAMESE_CHAR_RE =
  /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;

const isEnglishOnly = (value: string) => !VIETNAMESE_CHAR_RE.test(value);

const clean = (value: string) =>
  value
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();

const wordCount = (value: string) => value.split(/\s+/).filter(Boolean).length;

/* ------------------------------------------------------------------ parsing */

interface BoldSentence {
  sentence: string;
  bold: string;
}

/** Model sentences (bulleted, bolded target form) from a markdown theory block. */
const extractBoldSentences = (theory: string): BoldSentence[] => {
  const result: BoldSentence[] = [];

  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith("-") && !line.startsWith("*")) continue;
    if (line.includes("|")) continue;
    const body = line.replace(/^[-*]\s+/, "");
    const bolds = [...body.matchAll(/\*\*([^*]+)\*\*/g)].map((match) => match[1].trim());
    if (bolds.length === 0) continue;
    const sentence = clean(body.replace(/\s*\([^)]*\)/g, ""));
    if (!/^[A-Z]/.test(sentence)) continue;
    if (!/[.!?]$/.test(sentence)) continue;
    if (sentence.includes("→") || sentence.includes(":")) continue;
    const count = wordCount(sentence);
    if (count < 5 || count > 16) continue;
    if (!isEnglishOnly(sentence)) continue;
    const bold = bolds[0];
    if (!sentence.includes(bold)) continue;
    result.push({ sentence, bold });
  }

  const seen = new Set<string>();
  return result.filter((item) => {
    if (seen.has(item.sentence)) return false;
    seen.add(item.sentence);
    return true;
  });
};

const extractPlainSentences = (theory: string): string[] => {
  const sentences: string[] = [];
  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith("-") && !line.startsWith("*")) continue;
    if (line.includes("|")) continue;
    const sentence = clean(line.replace(/^[-*]\s+/, "").replace(/\s*\([^)]*\)/g, ""));
    if (!/^[A-Z]/.test(sentence) || !/[.!?]$/.test(sentence)) continue;
    if (sentence.includes("→") || sentence.includes(":")) continue;
    const count = wordCount(sentence);
    if (count < 5 || count > 14) continue;
    if (!isEnglishOnly(sentence)) continue;
    sentences.push(sentence);
  }
  return Array.from(new Set(sentences));
};

interface ContrastRow {
  sentence: string;
  bold: string;
  note: string;
}

/** Rows of the contrast box tables: | sentence | meaning/focus | */
const extractContrastRows = (theory: string): ContrastRow[] => {
  const rows: ContrastRow[] = [];

  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith("|") || !line.endsWith("|")) continue;
    if (/^\|[\s:-]+\|/.test(line.replace(/[^|:\-\s]/g, ""))) {
      // separator row like |---|---|
      if (!/[A-Za-z]/.test(line)) continue;
    }
    const cells = line
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());
    if (cells.length < 2) continue;
    if (cells.some((cell) => /^[-: ]+$/.test(cell))) continue;
    const rawSentence = cells[0];
    const note = clean(cells[1]);
    if (!note || !isEnglishOnly(note)) continue;
    const bolds = [...rawSentence.matchAll(/\*\*([^*]+)\*\*/g)].map((match) => match[1].trim());
    const sentence = clean(rawSentence);
    if (!/^[A-Z]/.test(sentence) || !/[.!?]$/.test(sentence)) continue;
    if (!isEnglishOnly(sentence)) continue;
    const count = wordCount(sentence);
    if (count < 4 || count > 18) continue;
    // Skip header rows such as "| Sentence | Meaning |"
    if (/^(sentence|form|structure|example)$/i.test(sentence.replace(/[.!?]$/, ""))) continue;
    rows.push({ sentence, bold: bolds[0] || "", note });
  }

  const seen = new Set<string>();
  return rows.filter((row) => {
    if (seen.has(row.sentence)) return false;
    seen.add(row.sentence);
    return true;
  });
};

/* --------------------------------------------------------------- generators */

const vocabSentences = (lesson: LanguageLesson) =>
  (lesson.vocabulary ?? [])
    .map((entry) => ({
      sentence: (entry.exampleEn || entry.example || "").trim(),
      word: entry.word.trim(),
      meaning: (entry.meaningEn || entry.meaning || "").trim(),
    }))
    .filter((item) => {
      if (!item.sentence || !item.word || !isEnglishOnly(item.sentence)) return false;
      const count = wordCount(item.sentence);
      return count >= 4 && count <= 16;
    });

const buildFillInBlanks = (lesson: LanguageLesson): FillInBlankExercise[] => {
  const exercises: FillInBlankExercise[] = [];

  // 1) Blank the bolded target form inside the lesson's own model sentences.
  const bold = extractBoldSentences(lesson.theoryEn || "");
  if (bold.length >= 3) {
    exercises.push({
      type: "fill-in-blank",
      instruction: "Điền dạng đúng vào chỗ trống (theo câu mẫu của bài).",
      instructionEn: "Complete each model sentence with the correct grammar form.",
      sentences: bold.slice(0, 4).map((item) => ({
        text: item.sentence.replace(item.bold, "___"),
        textEn: item.sentence.replace(item.bold, "___"),
        answer: item.bold,
        hint: `${wordCount(item.bold)} word(s) - focus on the target structure of this lesson.`,
      })),
    });
  }

  // 2) Blank the key word inside vocabulary examples.
  const vocabItems = vocabSentences(lesson)
    .map((item) => {
      const pattern = new RegExp(item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      if (!pattern.test(item.sentence)) return null;
      return {
        text: item.sentence.replace(pattern, "___"),
        textEn: item.sentence.replace(pattern, "___"),
        answer: item.word,
        hint: item.meaning || "Recall the key phrase from this lesson.",
      };
    })
    .filter(Boolean) as FillInBlankExercise["sentences"];

  if (vocabItems.length >= 3) {
    exercises.push({
      type: "fill-in-blank",
      instruction: "Điền cụm từ đúng vào chỗ trống.",
      instructionEn: "Complete each sentence with the correct word or phrase.",
      sentences: vocabItems.slice(0, 4),
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

const collectSentences = (lesson: LanguageLesson): string[] => {
  const fromTheory = extractPlainSentences(lesson.theoryEn || "");
  const fromVocab = vocabSentences(lesson).map((item) => item.sentence);
  return Array.from(new Set([...fromTheory, ...fromVocab]));
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

const isFullSentenceOption = (option: string) =>
  wordCount(option) >= 4 && /^[A-Z]/.test(option.trim()) && isEnglishOnly(option);

/**
 * Error correction items come from the lesson quiz:
 * - "choose the correct sentence" items give a wrong sentence + the right one;
 * - gap-fill items are rebuilt with a wrong option to create a faulty sentence.
 */
const buildErrorCorrection = (lesson: LanguageLesson): ErrorCorrectionExercise | null => {
  const items: ErrorCorrectionExercise["items"] = [];

  for (const question of lesson.quiz) {
    if (items.length >= 4) break;
    const correctOption = question.options[question.answer];
    if (!correctOption) continue;
    const wrongOption = question.options.find((option, idx) => idx !== question.answer && option.trim());
    if (!wrongOption) continue;

    const allFullSentences = question.options.every(isFullSentenceOption);
    if (allFullSentences && !question.question.includes("___")) {
      if (!isEnglishOnly(correctOption) || !isEnglishOnly(wrongOption)) continue;
      items.push({
        wrong: clean(wrongOption),
        correct: clean(correctOption),
        explanation: isEnglishOnly(question.explanation) ? clean(question.explanation) : undefined,
      });
      continue;
    }

    const stem = clean(question.question.replace(/^['"]|['"]\s*-.*$/g, ""));
    if (!stem.includes("___")) continue;
    if (!isEnglishOnly(stem)) continue;
    const base = stem.replace(/\s*\([^)]*\)/g, "");
    const wrongSentence = clean(base.replace("___", wrongOption));
    const rightSentence = clean(base.replace("___", correctOption));
    if (wrongSentence === rightSentence) continue;
    if (wordCount(rightSentence) < 4) continue;
    items.push({
      wrong: wrongSentence,
      correct: rightSentence,
      explanation: isEnglishOnly(question.explanation) ? clean(question.explanation) : undefined,
    });
  }

  if (items.length < 2) return null;

  return {
    type: "error-correction",
    instruction: "Tìm lỗi ngữ pháp và viết lại câu đúng.",
    instructionEn: "Each sentence has one grammar mistake. Rewrite it correctly.",
    items: items.slice(0, 4),
  };
};

/** Transformations come from the contrast box: same base sentence, different form. */
const buildTransformation = (lesson: LanguageLesson): TransformationExercise | null => {
  const rows = extractContrastRows(lesson.theoryEn || "");
  if (rows.length < 2) return null;

  const base = rows[0];
  const items = rows
    .slice(1)
    .filter((row) => row.sentence !== base.sentence)
    .slice(0, 3)
    .map((row) => ({
      prompt: base.sentence,
      target: row.sentence,
      cue: row.bold || undefined,
      goal: row.note,
    }));

  if (items.length === 0) return null;

  return {
    type: "transformation",
    instruction: "Viết lại câu để diễn đạt đúng ý được yêu cầu.",
    instructionEn: "Rewrite the sentence so that it expresses the meaning shown.",
    items,
  };
};

/** MCQ built from the lesson's model sentences: pick the correct target form. */
const buildMultipleChoice = (lesson: LanguageLesson): MultipleChoiceExercise | null => {
  const bold = extractBoldSentences(lesson.theoryEn || "");
  const forms = Array.from(new Set(bold.map((item) => item.bold))).filter((form) => wordCount(form) <= 5);
  if (bold.length < 3 || forms.length < 3) return null;

  const questions = bold
    .slice(0, 4)
    .map((item, index) => {
      const distractors = forms.filter((form) => form.toLowerCase() !== item.bold.toLowerCase()).slice(0, 3);
      if (distractors.length < 2) return null;
      const options = [...distractors.slice(0, 3), item.bold];
      // Rotate so the key is not always in the same slot.
      const shift = index % options.length;
      const rotated = [...options.slice(shift), ...options.slice(0, shift)];
      return {
        question: item.sentence.replace(item.bold, "______"),
        options: rotated,
        answer: rotated.findIndex((option) => option === item.bold),
        explanation: `"${item.bold}" is the form used in this lesson's model sentence.`,
      };
    })
    .filter(Boolean) as MultipleChoiceExercise["questions"];

  if (questions.length < 3) return null;

  return {
    type: "multiple-choice",
    instruction: "Chọn dạng đúng cho mỗi câu.",
    instructionEn: "Choose the correct form for each sentence.",
    questions,
  };
};

/** Matching pairs come from vocabulary (word - meaning) or the contrast box. */
const buildMatching = (lesson: LanguageLesson): MatchingExercise | null => {
  const vocabPairs = (lesson.vocabulary ?? [])
    .map((entry) => ({
      left: entry.word.trim(),
      right: clean(entry.meaningEn || ""),
    }))
    .filter((pair) => pair.left && pair.right && isEnglishOnly(pair.right));

  if (vocabPairs.length >= 4) {
    return {
      type: "matching",
      instruction: "Nối từ/cụm từ với nghĩa đúng.",
      instructionEn: "Match each word or phrase with its meaning.",
      pairs: vocabPairs.slice(0, 5),
    };
  }

  const rows = extractContrastRows(lesson.theoryEn || "");
  if (rows.length >= 3) {
    return {
      type: "matching",
      instruction: "Nối câu với cách hiểu đúng.",
      instructionEn: "Match each sentence with the meaning it expresses.",
      pairs: rows.slice(0, 4).map((row) => ({ left: row.sentence, right: row.note })),
    };
  }

  return null;
};

/* ------------------------------------------------------------------- merging */

const signature = (exercise: InteractiveExercise) => JSON.stringify(exercise).slice(0, 400);

const enhanceLesson = (lesson: LanguageLesson): LanguageLesson => {
  if (lesson.exercises.length >= MIN_EXERCISES) return lesson;

  const existing = new Set(lesson.exercises.map(signature));
  const pool: (InteractiveExercise | null)[] = [
    ...buildFillInBlanks(lesson),
    buildErrorCorrection(lesson),
    buildMultipleChoice(lesson),
    buildTransformation(lesson),
    buildMatching(lesson),
    ...buildReorders(lesson),
    buildDictation(lesson),
  ];

  const additions: InteractiveExercise[] = [];
  for (const candidate of pool) {
    if (!candidate) continue;
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
