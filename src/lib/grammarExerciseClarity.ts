/**
 * @file grammarExerciseClarity.ts
 * @description Final clarity pass over every English Grammar practice set.
 *              Students must always know exactly what to write: each gap gets a
 *              visible context cue, each task gets a precise instruction and each
 *              item gets a concrete hint / explanation. Nothing is invented - all
 *              cues are derived from the item's own data.
 */
import type {
  InteractiveExercise,
  LanguageLesson,
  LanguageModule,
} from "@/data/languageCurriculum/types";

const squash = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .replace(/([.!?])\1+/g, "$1")
    .replace(/\.\s*\./g, ".")
    .trim();

const PRONOUNS = new Set([
  "i", "you", "he", "she", "it", "we", "they",
  "me", "him", "her", "us", "them",
  "my", "your", "his", "its", "our", "their",
  "mine", "yours", "hers", "ours", "theirs",
  "myself", "yourself", "himself", "herself", "itself", "ourselves", "themselves",
]);

const ARTICLES = new Set(["a", "an", "the"]);

const PREPOSITIONS = new Set([
  "in", "on", "at", "to", "for", "with", "by", "from", "of", "about", "into",
  "over", "under", "after", "before", "between", "during", "since", "until",
  "up", "off", "out", "down", "through", "against", "without",
]);

const AUXILIARIES = new Set([
  "am", "is", "are", "was", "were", "be", "been", "being",
  "do", "does", "did", "have", "has", "had",
  "will", "would", "shall", "should", "can", "could", "may", "might", "must",
]);

const CONJUNCTIONS = new Set([
  "and", "but", "or", "so", "because", "although", "though", "while", "unless",
  "if", "whereas", "however", "therefore", "moreover",
]);

const RELATIVES = new Set(["who", "whom", "whose", "which", "that", "where", "when", "why"]);

/** Short, human label for the kind of word a gap expects. */
const answerCategory = (answer: string): { en: string; vi: string } | null => {
  const words = squash(answer).toLowerCase().replace(/[.,!?;:]/g, "").split(" ").filter(Boolean);
  if (words.length !== 1) return null;
  const word = words[0];
  if (PRONOUNS.has(word)) return { en: "pronoun", vi: "đại từ" };
  if (ARTICLES.has(word)) return { en: "article", vi: "mạo từ" };
  if (AUXILIARIES.has(word)) return { en: "auxiliary / modal verb", vi: "trợ động từ / động từ khiếm khuyết" };
  if (PREPOSITIONS.has(word)) return { en: "preposition or particle", vi: "giới từ / tiểu từ" };
  if (CONJUNCTIONS.has(word)) return { en: "linking word", vi: "từ nối" };
  if (RELATIVES.has(word)) return { en: "relative pronoun", vi: "đại từ quan hệ" };
  return null;
};

/** Masked shape of the answer: "give up" -> "g··· ··". */
const letterClue = (answer: string) =>
  squash(answer)
    .split(" ")
    .filter(Boolean)
    .map((word) => `${word[0]}${"·".repeat(Math.max(word.length - 1, 1))}`)
    .join(" ");

const wordCount = (value: string) => squash(value).split(" ").filter(Boolean).length;

/**
 * Legacy authored gaps sometimes carry a cue like "(the lights → them)" plus a
 * duplicated tail "→ 'Please turn ___ off.'". Keep the useful cue, drop the leak.
 */
const normalizeGapText = (raw: string, answer: string) => {
  let text = raw.replace(/\s*→\s*['"“][^'"”]*['"”]\s*$/u, "");
  text = text.replace(/\(([^()]*?)→([^()]*?)\)/g, (_match, left: string, right: string) => {
    const cue = squash(left);
    const revealed = squash(right).toLowerCase().replace(/[.,!?;:]/g, "");
    if (revealed === squash(answer).toLowerCase()) return cue ? `(${cue})` : "";
    return `(${cue}${cue && revealed ? " / " : ""}${squash(right)})`;
  });
  return squash(text);
};

const hasInlineCue = (text: string) => /\([^)]+\)/.test(text) || /\[[^\]]+\]/.test(text);

const withEnd = (text: string, suffix: string) => {
  const match = text.match(/([.!?]["']?)\s*$/);
  if (!match) return `${text} ${suffix}`;
  const head = text.slice(0, text.length - match[0].length);
  return `${squash(head)} ${suffix}${match[1]}`;
};

/** Stable pseudo-shuffle so the word bank never reorders between renders. */
const seededShuffle = (values: string[], seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 2147483647;
  const list = [...values];
  for (let i = list.length - 1; i > 0; i -= 1) {
    hash = (hash * 1103515245 + 12345) % 2147483647;
    const j = hash % (i + 1);
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

/** Answers of this exercise plus a few same-lesson distractors, shuffled. */
const buildWordBank = (answers: string[], pool: string[], seed: string) => {
  const unique: string[] = [];
  const seen = new Set<string>();
  for (const answer of answers) {
    const value = squash(answer);
    const key = value.toLowerCase();
    if (!value || seen.has(key)) continue;
    seen.add(key);
    unique.push(value);
  }
  if (unique.length < 1) return undefined;

  const target = Math.max(unique.length + 2, 4);
  for (const candidate of pool) {
    if (unique.length >= target) break;
    const value = squash(candidate);
    const key = value.toLowerCase();
    if (!value || seen.has(key) || wordCount(value) > 4) continue;
    seen.add(key);
    unique.push(value);
  }
  return seededShuffle(unique, seed);
};

const GAP_RE = /_{2,}/g;
const gapCount = (text: string) => (text.match(GAP_RE) || []).length;

/**
 * A few authored items spread one long answer over several gaps in a way that no
 * generic rule can split correctly, so the split (and sometimes a cleaner gap
 * layout) is stated explicitly. Keyed by the original English sentence.
 */
const MULTI_GAP_FIXES: Record<string, { textEn?: string; text?: string; answers: string[] }> = {
  '"I bought this yesterday." → She said she had bought ___ ___.': {
    answers: ["that", "the day before"],
  },
  "My house is ___ (not/big) ___ yours.": {
    textEn: "My house is ___ ___ yours. (not / big)",
    text: "My house is ___ ___ yours. (not / big)",
    answers: ["not as big", "as"],
  },
  "She ___ arrives ___ on time (always).": {
    textEn: "She ___ arrives on time. (always)",
    text: "She ___ arrives on time. (always)",
    answers: ["always"],
  },
  "He is ___ happy ___ (always).": {
    textEn: "He is ___ happy. (always)",
    text: "He is ___ happy. (always)",
    answers: ["always"],
  },
  "I have ___ wanted ___ to learn French (always).": {
    textEn: "I have ___ wanted to learn French. (always)",
    text: "I have ___ wanted to learn French. (always)",
    answers: ["always"],
  },
  "I'm not ___ ___ ___ working night shifts yet.": {
    textEn: "I'm not ___ ___ working night shifts yet. (be accustomed to)",
    text: "I'm not ___ ___ working night shifts yet. (be accustomed to)",
    answers: ["used", "to"],
  },
  "I'll ___ someone ___ the windows. (get/clean)": {
    answers: ["get", "to clean"],
  },
  "He asked ___ the train ___.": {
    answers: ["what time", "left"],
  },
};

/** One answer per gap: explicit fix first, then slash / word-count splitting. */
const splitAnswers = (textEn: string, answer: string): string[] => {
  const gaps = gapCount(textEn);
  if (gaps <= 1) return [answer];

  const bySlash = answer.split("/").map((part) => squash(part)).filter(Boolean);
  if (bySlash.length === gaps) return bySlash;

  const words = squash(answer.replace(/\//g, " ")).split(" ").filter(Boolean);
  if (words.length === gaps) return words;

  // Last resort: the leading words belong to the first gap, one word per gap after that.
  const head = words.slice(0, words.length - gaps + 1).join(" ");
  return [head, ...words.slice(words.length - gaps + 1)];
};

const clarifyFillInBlank = (
  exercise: Extract<InteractiveExercise, { type: "fill-in-blank" }>,
  pool: string[] = []
): InteractiveExercise => {
  const sentences = exercise.sentences.map((sentence) => {
    const answer = squash(sentence.answer);
    const fix = MULTI_GAP_FIXES[squash(sentence.textEn || sentence.text)];
    let text = normalizeGapText(fix?.text ?? sentence.text, answer);
    let textEn = normalizeGapText(fix?.textEn ?? sentence.textEn ?? sentence.text, answer);

    const gapAnswers = fix?.answers ?? splitAnswers(textEn, answer);
    // Both language renderings must expose exactly the same number of gaps.
    if (gapCount(text) !== gapAnswers.length) text = textEn;

    // Carry an authored cue over to the English rendering so both languages match.
    const cueMatch = text.match(/\(([^()]+)\)/);
    if (cueMatch && !hasInlineCue(textEn)) {
      textEn = withEnd(textEn, `(${squash(cueMatch[1])})`);
    }

    const category = gapAnswers.length === 1 ? answerCategory(answer) : null;
    if (!hasInlineCue(textEn) && category) {
      const marker = `(${category.en})`;
      textEn = withEnd(textEn, marker);
      if (!hasInlineCue(text)) text = withEnd(text, `(${category.vi})`);
    }

    const clues = gapAnswers.length > 1
      ? [
          `${gapAnswers.length} gaps`,
          gapAnswers.map((value, index) => `gap ${index + 1}: ${letterClue(value)}`).join(" · "),
        ]
      : [
          `${wordCount(answer)} word(s)`,
          letterClue(answer) ? `shape: ${letterClue(answer)}` : "",
          category ? `word type: ${category.en}` : "",
        ];

    const existingHint = squash(sentence.hint || "");
    const generic = /^\d+ (word\(s\)|gaps)/.test(existingHint) || !existingHint;
    const hint = generic
      ? clues.filter(Boolean).join(" · ")
      : `${existingHint.replace(/\s*\((?:\d+ (?:word\(s\)|gaps)[^)]*)\)\s*$/, "")} (${clues.filter(Boolean).join(" · ")})`;

    return {
      ...sentence,
      text,
      textEn,
      answer: gapAnswers.join(" "),
      answers: gapAnswers.length > 1 ? gapAnswers : undefined,
      hint,
    };
  });

  const wordBank = buildWordBank(
    sentences.flatMap((sentence) => sentence.answers ?? [sentence.answer]),
    pool,
    `${exercise.instructionEn}|${sentences.length}`
  );

  const guide = "Pick a word from the word bank (or type it) for each gap. The cue in brackets tells you which word type is expected.";
  const guideVi = "Chọn từ trong ngân hàng từ (hoặc tự gõ) cho mỗi chỗ trống. Gợi ý trong ngoặc cho biết loại từ cần điền.";

  // Reading-passage drills keep their authored instruction untouched.
  if (exercise.instruction.includes("Passage:") || exercise.instructionEn.includes("Passage:")) {
    return { ...exercise, sentences, wordBank };
  }

  return {
    ...exercise,
    instruction: exercise.instruction.includes(guideVi)
      ? exercise.instruction
      : `${squash(exercise.instruction)}\n${guideVi}`,
    instructionEn: exercise.instructionEn.includes(guide)
      ? exercise.instructionEn
      : `${squash(exercise.instructionEn)}\n${guide}`,
    sentences,
    wordBank,
  };
};


const clarifyReorder = (
  exercise: Extract<InteractiveExercise, { type: "sentence-reorder" }>,
  seed: string
): InteractiveExercise => {
  const guide = "Use every word exactly once. Start with a capital letter and keep the final punctuation.";
  const guideVi = "Dùng mỗi từ đúng một lần. Viết hoa đầu câu và giữ dấu câu cuối.";
  return {
    ...exercise,
    instruction: exercise.instruction.includes(guideVi) ? exercise.instruction : `${squash(exercise.instruction)}\n${guideVi}`,
    instructionEn: exercise.instructionEn.includes(guide) ? exercise.instructionEn : `${squash(exercise.instructionEn)}\n${guide}`,
    items: exercise.items.map((item, index) => ({
      ...item,
      scrambled: rebuildScrambled(item.correctEn || item.correct, item.scrambled, `${seed}|${index}`),
    })),
  };
};


/**
 * Tiles are a plain whitespace split of the target so joining them with single
 * spaces always reproduces the answer exactly - that is how grading compares them.
 */
const reorderTokens = (sentence: string) => squash(sentence).split(" ").filter(Boolean);


/**
 * Reorder tiles must always be exactly the words of the answer, in a different
 * order, so a shuffled copy of the target sentence is the single source of truth.
 */
const rebuildScrambled = (correct: string, authored: string[], seed: string) => {
  const tokens = reorderTokens(correct);
  if (tokens.length < 2) return authored;

  const authoredKey = [...authored].map((token) => token.toLowerCase()).sort().join(" ");
  const tokenKey = [...tokens].map((token) => token.toLowerCase()).sort().join(" ");
  const target = tokens.join(" ").toLowerCase();

  if (authoredKey === tokenKey && authored.join(" ").toLowerCase() !== target) return authored;

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const shuffled = seededShuffle(tokens, `${seed}|${attempt}`);
    if (shuffled.join(" ").toLowerCase() !== target) return shuffled;
  }
  return [...tokens].reverse();
};

/** Keeps only the first sentence of a multi-sentence sample so one item = one mistake. */
const firstSample = (value: string) => squash(value.split(" / ")[0]);


const clarifyErrorCorrection = (
  exercise: Extract<InteractiveExercise, { type: "error-correction" }>
): InteractiveExercise | null => {
  const guide = "Each sentence has exactly one grammar mistake. Rewrite the whole sentence correctly.";
  const guideVi = "Mỗi câu chỉ có một lỗi ngữ pháp. Viết lại toàn bộ câu cho đúng.";

  const items = exercise.items
    .map((item) => {
      const wrong = firstSample(item.wrong);
      const correct = firstSample(item.correct);
      // Word-swap items ("it" vs "them") are grammatical on their own, so state the referent.
      const swapMatch = item.explanation?.match(/answer is "([^"]+)"/);
      const needsContext =
        !!swapMatch && wrong.split(" ").length === correct.split(" ").length;
      const referent = needsContext
        ? item.explanation?.match(/for ([^.,]+)/)?.[1]?.trim()
        : "";
      return {
        ...item,
        wrong: referent ? `${wrong.replace(/[.?!]$/, "")} (talking about ${referent}).` : wrong,
        correct: referent ? `${correct.replace(/[.?!]$/, "")} (talking about ${referent}).` : correct,
        explanation: item.explanation && squash(item.explanation)
          // Drop the second sample from quoted forms so the note matches this single item.
          ? squash(item.explanation).replace(/"([^"]+) \/ [^"]+"/g, '"$1"')
          : `Correct version: ${correct}`,
      };
    })
    // A "find the mistake" item makes no sense when the faulty and correct
    // sentences are identical, so those legacy items are dropped.
    .filter((item) => item.wrong.toLowerCase() !== item.correct.toLowerCase());

  if (!items.length) return null;

  return {
    ...exercise,
    instruction: exercise.instruction.includes(guideVi) ? exercise.instruction : `${squash(exercise.instruction)}\n${guideVi}`,
    instructionEn: exercise.instructionEn.includes(guide) ? exercise.instructionEn : `${squash(exercise.instructionEn)}\n${guide}`,
    items,
  };
};



/** Words present in the target but not in the prompt - a natural rewrite cue. */
const deriveCue = (prompt: string, target: string) => {
  const promptWords = new Set(
    squash(prompt).toLowerCase().replace(/[.,!?;:]/g, "").split(" ").filter(Boolean)
  );
  const extra = squash(target)
    .replace(/[.,!?;:]/g, "")
    .split(" ")
    .filter((word) => word && !promptWords.has(word.toLowerCase()));
  return extra.slice(0, 3).join(" ");
};

const clarifyTransformation = (
  exercise: Extract<InteractiveExercise, { type: "transformation" }>
): InteractiveExercise => {
  const guide = "Rewrite the sentence so the meaning stays the same. You must use the cue word(s) shown.";
  const guideVi = "Viết lại câu sao cho nghĩa không đổi. Bắt buộc dùng từ/cụm từ gợi ý được cho.";
  return {
    ...exercise,
    instruction: exercise.instruction.includes(guideVi) ? exercise.instruction : `${squash(exercise.instruction)}\n${guideVi}`,
    instructionEn: exercise.instructionEn.includes(guide) ? exercise.instructionEn : `${squash(exercise.instructionEn)}\n${guide}`,
    items: exercise.items.map((item) => {
      const cue = squash(item.cue || "") || deriveCue(item.prompt, item.target);
      const goal = squash(item.goal || "") || `Same meaning, ${wordCount(item.target)} words, using "${cue || squash(item.target).split(" ")[0]}".`;
      return { ...item, cue: cue || undefined, goal };
    }),
  };
};

const GENERIC_MC_DISTRACTORS = [
  "Choose the form by translating word by word.",
  "Ignore the signal words in the sentence.",
  "Use the same structure in every context.",
];

/** A usable MCQ has 3-4 distinct, readable options and a valid answer index. */
const sanitizeChoiceQuestion = <T extends { question: string; options: string[]; answer: number; explanation?: string }>(
  question: T
): T | null => {
  const correct = squash(question.options[question.answer] ?? "");
  if (!question.question?.trim() || !correct) return null;
  // Auto-generated items sometimes pasted a whole theory block as an option.
  if (correct.length > 180) return null;

  const options: string[] = [];
  const seen = new Set<string>();
  for (const raw of question.options) {
    const value = squash(raw || "");
    if (!value || value.length > 180 || seen.has(value.toLowerCase())) continue;
    seen.add(value.toLowerCase());
    options.push(value);
  }
  for (const filler of GENERIC_MC_DISTRACTORS) {
    if (options.length >= 3) break;
    if (seen.has(filler.toLowerCase())) continue;
    seen.add(filler.toLowerCase());
    options.push(filler);
  }
  const answer = options.findIndex((option) => option.toLowerCase() === correct.toLowerCase());
  if (answer < 0) return null;

  return {
    ...question,
    options,
    answer,
    explanation: squash(question.explanation || "") || `Correct answer: ${correct}.`,
  };
};

const clarifyMultipleChoice = (
  exercise: Extract<InteractiveExercise, { type: "multiple-choice" }>
): InteractiveExercise | null => {
  const questions = exercise.questions
    .map((question) => sanitizeChoiceQuestion(question))
    .filter((question): question is typeof exercise.questions[number] => !!question);
  if (!questions.length) return null;
  return { ...exercise, questions };
};

const clarifyMatching = (
  exercise: Extract<InteractiveExercise, { type: "matching" }>
): InteractiveExercise | null => {
  const guide = "Match every item on the left with exactly one item on the right.";
  const guideVi = "Nối mỗi mục bên trái với đúng một mục bên phải.";
  const seenLeft = new Set<string>();
  const seenRight = new Set<string>();
  const pairs = exercise.pairs
    .map((pair) => ({ left: squash(pair.left), right: squash(pair.right) }))
    .filter((pair) => {
      if (!pair.left || !pair.right) return false;
      const l = pair.left.toLowerCase();
      const r = pair.right.toLowerCase();
      if (seenLeft.has(l) || seenRight.has(r)) return false;
      seenLeft.add(l);
      seenRight.add(r);
      return true;
    });
  if (pairs.length < 3) return null;
  return {
    ...exercise,
    instruction: exercise.instruction.includes(guideVi) ? exercise.instruction : `${squash(exercise.instruction)}\n${guideVi}`,
    instructionEn: exercise.instructionEn.includes(guide) ? exercise.instructionEn : `${squash(exercise.instructionEn)}\n${guide}`,
    pairs,
  };
};

const clarifyDictation = (
  exercise: Extract<InteractiveExercise, { type: "dictation" }>
): InteractiveExercise => ({
  ...exercise,
  sentences: exercise.sentences.map((sentence) => ({
    ...sentence,
    hint: squash(sentence.hint || "") || `${wordCount(sentence.text)} words · starts with "${squash(sentence.text).split(" ")[0]}"`,
  })),
});


/** Returns null when an exercise cannot be repaired into a solvable task. */
const clarifyExercise = (
  exercise: InteractiveExercise,
  pool: string[],
  seed: string
): InteractiveExercise | null => {
  switch (exercise.type) {
    case "fill-in-blank":
      return clarifyFillInBlank(exercise, pool);
    case "sentence-reorder":
      return clarifyReorder(exercise, seed);
    case "error-correction":
      return clarifyErrorCorrection(exercise);
    case "transformation":
      return clarifyTransformation(exercise);
    case "multiple-choice":
      return clarifyMultipleChoice(exercise);
    case "matching":
      return clarifyMatching(exercise);
    case "dictation":
      return clarifyDictation(exercise);
    default:
      return exercise;
  }
};

/** Distractor candidates for the word bank: other gap answers + lesson vocabulary. */
const lessonWordPool = (lesson: LanguageLesson) => {
  const pool: string[] = [];
  for (const exercise of lesson.exercises) {
    if (exercise.type !== "fill-in-blank") continue;
    for (const sentence of exercise.sentences) pool.push(sentence.answer);
  }
  for (const entry of lesson.vocabulary || []) pool.push(entry.word);
  return pool;
};

const clarifyLesson = (lesson: LanguageLesson): LanguageLesson => {
  const pool = lessonWordPool(lesson);
  const exercises = lesson.exercises
    .map((exercise, index) => clarifyExercise(exercise, pool, `${lesson.id}|${index}`))
    .filter((exercise): exercise is InteractiveExercise => !!exercise);
  return { ...lesson, exercises };
};


export const clarifyGrammarModules = (modules: LanguageModule[]): LanguageModule[] =>
  modules.map((mod) => ({ ...mod, lessons: mod.lessons.map(clarifyLesson) }));
