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
  const pushBoldChunk = (chunk: BoldSentence[]) =>
    exercises.push({
      type: "fill-in-blank",
      instruction: "Điền dạng đúng vào chỗ trống (theo câu mẫu của bài).",
      instructionEn: "Complete each model sentence with the correct grammar form.",
      sentences: chunk.map((item) => ({
        text: item.sentence.replace(item.bold, "___"),
        textEn: item.sentence.replace(item.bold, "___"),
        answer: item.bold,
        hint: `${wordCount(item.bold)} word(s) - focus on the target structure of this lesson.`,
      })),
    });

  if (bold.length >= 3) pushBoldChunk(bold.slice(0, 4));
  if (bold.length >= 7) pushBoldChunk(bold.slice(4, 8));

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
  for (let i = 0; i + 3 <= sentences.length && chunks.length < 3; i += 3) {
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

const buildDictations = (lesson: LanguageLesson): DictationExercise[] => {
  const sentences = collectSentences(lesson);
  const chunks: DictationExercise[] = [];
  for (let i = 0; i + 3 <= sentences.length && chunks.length < 2; i += 4) {
    chunks.push({
      type: "dictation",
      instruction: "Nghe và viết lại câu mẫu.",
      instructionEn: "Listen and type the model sentence.",
      sentences: sentences.slice(i, i + 4).map((sentence) => ({ text: sentence })),
    });
  }
  return chunks;
};

const BAD_STEM_RE =
  /(complete the sentence|fill in the blank|choose the correct|which (sentence|verb|option)|__|→|\*|\||^[a-z])/i;

/** A usable practice sentence: real sentence, no scaffolding text, no markers. */
const isCleanSentence = (value: string) => {
  const text = value.trim();
  if (!text) return false;
  if (!/^[A-Z"']/.test(text)) return false;
  if (!/[.!?]["']?$/.test(text)) return false;
  if (BAD_STEM_RE.test(text)) return false;
  if (!isEnglishOnly(text)) return false;
  const count = wordCount(text);
  return count >= 4 && count <= 22;
};

/** Strip quiz scaffolding around a gap-fill stem: quotes and trailing prompts. */
const sanitizeStem = (raw: string) => {
  let stem = raw.trim().replace(/_{2,}/g, "___");
  stem = stem.replace(/\s*-\s*(choose|select|pick)[^.]*:?\s*$/i, "");
  stem = stem.replace(/^(complete the sentence correctly|fill in the blank|complete the sentence)\s*:?\s*/i, "");
  stem = stem.replace(/^["'“”']+/, "").replace(/["'“”']+$/, "");
  stem = stem.replace(/\s*\([^)]*\)/g, "");
  return clean(stem);
};

const isInlineForm = (option: string) => {
  const text = option.trim();
  if (!text) return false;
  if (/[→*|]/.test(text)) return false;
  if (!isEnglishOnly(text)) return false;
  return wordCount(text) <= 6;
};

const differsIgnoringCase = (a: string, b: string) =>
  a.replace(/\s+/g, " ").trim().toLowerCase() !== b.replace(/\s+/g, " ").trim().toLowerCase();

/**
 * Error correction items come from the lesson quiz:
 * - "choose the correct sentence" items give a wrong sentence + the right one;
 * - clean gap-fill items are rebuilt with a wrong option to create a faulty sentence.
 */
const buildErrorCorrection = (lesson: LanguageLesson): ErrorCorrectionExercise | null => {
  const items: ErrorCorrectionExercise["items"] = [];
  const seen = new Set<string>();

  const push = (wrong: string, correct: string, explanation?: string) => {
    if (!isCleanSentence(wrong) || !isCleanSentence(correct)) return;
    if (!differsIgnoringCase(wrong, correct)) return;
    if (seen.has(correct)) return;
    seen.add(correct);
    items.push({
      wrong,
      correct,
      explanation: explanation && isEnglishOnly(explanation) && !BAD_STEM_RE.test(explanation)
        ? clean(explanation)
        : undefined,
    });
  };

  for (const question of lesson.quiz) {
    if (items.length >= 4) break;
    const correctOption = question.options[question.answer];
    if (!correctOption) continue;
    const wrongOption = question.options.find((option, idx) => idx !== question.answer && option.trim());
    if (!wrongOption) continue;

    const stem = question.question.trim();

    // Case A: options are complete sentences.
    if (isCleanSentence(correctOption) && isCleanSentence(wrongOption)) {
      push(clean(wrongOption), clean(correctOption), question.explanation);
      continue;
    }

    // Case B: a clean gap-fill stem plus short inline forms.
    if (!/_{2,}/.test(stem)) continue;
    const base = sanitizeStem(stem);
    if (!base.includes("___")) continue;
    if (BAD_STEM_RE.test(base.replace("___", "x"))) continue;
    if (!isInlineForm(correctOption) || !isInlineForm(wrongOption)) continue;
    push(clean(base.replace("___", wrongOption)), clean(base.replace("___", correctOption)), question.explanation);
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
      const options = Array.from(
        new Map([...distractors.slice(0, 3), item.bold].map((option) => [option.toLowerCase(), option])).values()
      );
      if (options.length < 3 || !options.includes(item.bold)) return null;
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

  const seenRight = new Set<string>();
  const uniqueVocabPairs = vocabPairs.filter((pair) => {
    const key = pair.right.toLowerCase();
    if (seenRight.has(key) || pair.left.toLowerCase() === key) return false;
    seenRight.add(key);
    return true;
  });

  if (uniqueVocabPairs.length >= 4) {
    return {
      type: "matching",
      instruction: "Nối từ/cụm từ với nghĩa đúng.",
      instructionEn: "Match each word or phrase with its meaning.",
      pairs: uniqueVocabPairs.slice(0, 5),
    };
  }

  const rows = extractContrastRows(lesson.theoryEn || "").filter((row) => {
    const key = row.note.toLowerCase();
    if (seenRight.has(key)) return false;
    seenRight.add(key);
    return true;
  });
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

/** Fill-in-blank drill rebuilt from clean gap-fill quiz stems. */
const buildQuizFillInBlank = (lesson: LanguageLesson): FillInBlankExercise | null => {
  const sentences = lesson.quiz
    .map((question) => {
      const answer = question.options[question.answer];
      if (!/_{2,}/.test(question.question) || !answer) return null;
      const text = sanitizeStem(question.question);
      if (!text.includes("___")) return null;
      if (BAD_STEM_RE.test(text.replace("___", "x"))) return null;
      if (!isInlineForm(answer)) return null;
      if (!isEnglishOnly(text)) return null;
      return {
        text,
        textEn: text,
        answer: answer.trim(),
        hint: isEnglishOnly(question.explanation) && !BAD_STEM_RE.test(question.explanation)
          ? clean(question.explanation)
          : "Choose the form this lesson focuses on.",
      };
    })
    .filter(Boolean) as FillInBlankExercise["sentences"];

  if (sentences.length < 3) return null;

  return {
    type: "fill-in-blank",
    instruction: "Điền dạng đúng vào chỗ trống (ôn tập).",
    instructionEn: "Review drill: complete each sentence with the correct form.",
    sentences: sentences.slice(0, 4),
  };
};

/** "Which sentence is correct?" drill built from the error-correction pairs. */
const buildCorrectSentenceMcq = (lesson: LanguageLesson): MultipleChoiceExercise | null => {
  const source = buildErrorCorrection(lesson);
  if (!source || source.items.length < 3) return null;

  const questions = source.items.slice(0, 4).map((item, index) => {
    const wrongs = source.items
      .filter((other) => other.correct !== item.correct)
      .map((other) => other.wrong)
      .slice(0, 2);
    const options = [item.correct, item.wrong, ...wrongs];
    const shift = index % options.length;
    const rotated = [...options.slice(shift), ...options.slice(0, shift)];
    return {
      question: "Which sentence is grammatically correct?",
      options: rotated,
      answer: rotated.indexOf(item.correct),
      explanation: item.explanation || `Correct version: ${item.correct}`,
    };
  });

  return {
    type: "multiple-choice",
    instruction: "Chọn câu đúng ngữ pháp.",
    instructionEn: "Choose the grammatically correct sentence.",
    questions,
  };
};

/** Matching drill: key phrase paired with the sentence it belongs to. */
const buildSentenceMatching = (lesson: LanguageLesson): MatchingExercise | null => {
  const items = vocabSentences(lesson)
    .map((item) => {
      const pattern = new RegExp(item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      if (!pattern.test(item.sentence)) return null;
      return { left: item.word, right: item.sentence.replace(pattern, "______") };
    })
    .filter(Boolean) as MatchingExercise["pairs"];

  const seenRight = new Set<string>();
  const pairs = items.filter((pair) => {
    const key = pair.right.toLowerCase();
    if (seenRight.has(key)) return false;
    seenRight.add(key);
    return true;
  });

  if (pairs.length < 3) return null;

  return {
    type: "matching",
    instruction: "Nối từ khoá với câu chứa từ đó.",
    instructionEn: "Match each key phrase with the sentence it completes.",
    pairs: pairs.slice(0, 5),
  };
};

/** Bold noun phrases (no sentence punctuation) used by phrase-level drills. */
const extractBoldPhrases = (theory: string) => {
  const items: { line: string; bold: string }[] = [];
  for (const rawLine of theory.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!/^[-*]\s+/.test(line)) continue;
    const match = line.match(/\*\*(.+?)\*\*/);
    if (!match) continue;
    const text = clean(line.replace(/^[-*]\s+/, ""));
    const bold = clean(match[1]);
    if (!isEnglishOnly(text) || /[|→]/.test(text)) continue;
    if (wordCount(text) < 3 || wordCount(text) > 18) continue;
    if (wordCount(bold) < 2) continue;
    if (!text.includes(bold)) continue;
    items.push({ line: text, bold });
  }
  return items;
};

/** Phrase-level practice for lessons whose models are noun phrases, not sentences. */
const buildPhraseDrills = (lesson: LanguageLesson): InteractiveExercise[] => {
  const phrases = extractBoldPhrases(lesson.theoryEn || "");
  if (phrases.length < 3) return [];
  const seedBase = lesson.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const drills: InteractiveExercise[] = [
    {
      type: "fill-in-blank",
      instruction: "Điền cụm từ đúng vào chỗ trống.",
      instructionEn: "Complete each phrase with the correct words in the correct order.",
      sentences: phrases.slice(0, 4).map((item) => ({
        text: item.line.replace(item.bold, "___"),
        textEn: item.line.replace(item.bold, "___"),
        answer: item.bold,
        hint: `${wordCount(item.bold)} word(s) in the order this lesson teaches.`,
      })),
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp các từ theo đúng trật tự.",
      instructionEn: "Put the words in the correct order.",
      items: phrases.slice(0, 4).map((item, index) => ({
        scrambled: scramble(item.line.split(/\s+/), seedBase + index * 23),
        correct: item.line,
        correctEn: item.line,
      })),
    },
  ];

  const seen = new Set<string>();
  const pairs = phrases
    .map((item) => ({ left: item.bold, right: item.line.replace(item.bold, "______") }))
    .filter((pair) => {
      const key = pair.right.toLowerCase();
      if (seen.has(key) || pair.left.toLowerCase() === key) return false;
      seen.add(key);
      return true;
    });
  if (pairs.length >= 3) {
    drills.push({
      type: "matching",
      instruction: "Nối cụm từ với vị trí đúng của nó.",
      instructionEn: "Match each phrase with the slot it belongs to.",
      pairs: pairs.slice(0, 5),
    });
  }

  return drills;
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
    ...buildDictations(lesson),
    buildQuizFillInBlank(lesson),
    buildCorrectSentenceMcq(lesson),
    buildSentenceMatching(lesson),
    ...buildPhraseDrills(lesson),
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
