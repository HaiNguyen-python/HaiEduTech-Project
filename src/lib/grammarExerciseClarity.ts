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

const clarifyFillInBlank = (
  exercise: Extract<InteractiveExercise, { type: "fill-in-blank" }>
): InteractiveExercise => {
  const sentences = exercise.sentences.map((sentence) => {
    const answer = squash(sentence.answer);
    let text = normalizeGapText(sentence.text, answer);
    let textEn = normalizeGapText(sentence.textEn || sentence.text, answer);

    // Carry an authored cue over to the English rendering so both languages match.
    const cueMatch = text.match(/\(([^()]+)\)/);
    if (cueMatch && !hasInlineCue(textEn)) {
      textEn = withEnd(textEn, `(${squash(cueMatch[1])})`);
    }

    const category = answerCategory(answer);
    if (!hasInlineCue(textEn) && category) {
      const marker = `(${category.en})`;
      textEn = withEnd(textEn, marker);
      if (!hasInlineCue(text)) text = withEnd(text, `(${category.vi})`);
    }

    const clues = [
      `${wordCount(answer)} word(s)`,
      letterClue(answer) ? `shape: ${letterClue(answer)}` : "",
      category ? `word type: ${category.en}` : "",
    ].filter(Boolean);

    const existingHint = squash(sentence.hint || "");
    const generic = /^\d+ word\(s\)/.test(existingHint) || !existingHint;
    const hint = generic ? clues.join(" · ") : `${existingHint} (${clues.join(" · ")})`;

    return { ...sentence, text, textEn, hint };
  });

  const guide = "Write one answer per gap. Use the cue in brackets - it tells you which word type is expected.";
  const guideVi = "Điền một đáp án cho mỗi chỗ trống. Dùng gợi ý trong ngoặc - nó cho biết loại từ cần điền.";

  // Reading-passage drills keep their authored instruction untouched.
  if (exercise.instruction.includes("Passage:") || exercise.instructionEn.includes("Passage:")) {
    return { ...exercise, sentences };
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
  };
};

const clarifyReorder = (
  exercise: Extract<InteractiveExercise, { type: "sentence-reorder" }>
): InteractiveExercise => {
  const guide = "Use every word exactly once. Start with a capital letter and keep the final punctuation.";
  const guideVi = "Dùng mỗi từ đúng một lần. Viết hoa đầu câu và giữ dấu câu cuối.";
  return {
    ...exercise,
    instruction: exercise.instruction.includes(guideVi) ? exercise.instruction : `${squash(exercise.instruction)}\n${guideVi}`,
    instructionEn: exercise.instructionEn.includes(guide) ? exercise.instructionEn : `${squash(exercise.instructionEn)}\n${guide}`,
  };
};

/** Keeps only the first sentence of a multi-sentence sample so one item = one mistake. */
const firstSample = (value: string) => squash(value.split(" / ")[0]);

const clarifyErrorCorrection = (
  exercise: Extract<InteractiveExercise, { type: "error-correction" }>
): InteractiveExercise => {
  const guide = "Each sentence has exactly one grammar mistake. Rewrite the whole sentence correctly.";
  const guideVi = "Mỗi câu chỉ có một lỗi ngữ pháp. Viết lại toàn bộ câu cho đúng.";
  return {
    ...exercise,
    instruction: exercise.instruction.includes(guideVi) ? exercise.instruction : `${squash(exercise.instruction)}\n${guideVi}`,
    instructionEn: exercise.instructionEn.includes(guide) ? exercise.instructionEn : `${squash(exercise.instructionEn)}\n${guide}`,
    items: exercise.items.map((item) => {
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
          ? squash(item.explanation)
          : `Correct version: ${correct}`,
      };
    }),
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

const clarifyMultipleChoice = (
  exercise: Extract<InteractiveExercise, { type: "multiple-choice" }>
): InteractiveExercise => ({
  ...exercise,
  questions: exercise.questions.map((question) => ({
    ...question,
    explanation: question.explanation && squash(question.explanation)
      ? squash(question.explanation)
      : `Correct answer: ${squash(question.options[question.answer] ?? "")}.`,
  })),
});

const clarifyMatching = (
  exercise: Extract<InteractiveExercise, { type: "matching" }>
): InteractiveExercise => {
  const guide = "Match every item on the left with exactly one item on the right.";
  const guideVi = "Nối mỗi mục bên trái với đúng một mục bên phải.";
  return {
    ...exercise,
    instruction: exercise.instruction.includes(guideVi) ? exercise.instruction : `${squash(exercise.instruction)}\n${guideVi}`,
    instructionEn: exercise.instructionEn.includes(guide) ? exercise.instructionEn : `${squash(exercise.instructionEn)}\n${guide}`,
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

const clarifyExercise = (exercise: InteractiveExercise): InteractiveExercise => {
  switch (exercise.type) {
    case "fill-in-blank":
      return clarifyFillInBlank(exercise);
    case "sentence-reorder":
      return clarifyReorder(exercise);
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

const clarifyLesson = (lesson: LanguageLesson): LanguageLesson => ({
  ...lesson,
  exercises: lesson.exercises.map(clarifyExercise),
});

export const clarifyGrammarModules = (modules: LanguageModule[]): LanguageModule[] =>
  modules.map((mod) => ({ ...mod, lessons: mod.lessons.map(clarifyLesson) }));
