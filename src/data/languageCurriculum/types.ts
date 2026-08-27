// Extended types for the multi-language curriculum system

export interface FillInBlankExercise {
  type: "fill-in-blank";
  instruction: string;
  instructionEn: string;
  /** Clickable words/phrases students can drop into the gaps (shuffled, may contain distractors). */
  wordBank?: string[];
  sentences: {
    text: string; // Use ___ for blanks
    textEn: string;
    answer: string;
    hint?: string;
  }[];
}

export interface SentenceReorderExercise {
  type: "sentence-reorder";
  instruction: string;
  instructionEn: string;
  items: {
    scrambled: string[];
    correct: string;
    correctEn?: string;
  }[];
}

export interface DictationExercise {
  type: "dictation";
  instruction: string;
  instructionEn: string;
  sentences: {
    text: string; // The correct sentence
    audioPlaceholder?: string;
    hint?: string;
  }[];
}

export interface MCQExercise {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

/** Spot the grammar mistake in a sentence and rewrite it correctly. */
export interface ErrorCorrectionExercise {
  type: "error-correction";
  instruction: string;
  instructionEn: string;
  items: {
    wrong: string;
    correct: string;
    explanation?: string;
  }[];
}

/** Rewrite a sentence to a target meaning using a required cue word. */
export interface TransformationExercise {
  type: "transformation";
  instruction: string;
  instructionEn: string;
  items: {
    prompt: string;
    target: string;
    cue?: string;
    goal?: string;
  }[];
}

/** Multiple-choice grammar drill with per-question explanation. */
export interface MultipleChoiceExercise {
  type: "multiple-choice";
  instruction: string;
  instructionEn: string;
  questions: {
    question: string;
    options: string[];
    answer: number;
    explanation?: string;
  }[];
}

/** Match a left item (structure/word/sentence) with its right item (use/meaning). */
export interface MatchingExercise {
  type: "matching";
  instruction: string;
  instructionEn: string;
  pairs: {
    left: string;
    right: string;
  }[];
}

export type InteractiveExercise =
  | FillInBlankExercise
  | SentenceReorderExercise
  | DictationExercise
  | ErrorCorrectionExercise
  | TransformationExercise
  | MultipleChoiceExercise
  | MatchingExercise;

export interface VocabEntry {
  word: string;
  pinyin?: string;
  ipa?: string;
  meaning: string;
  meaningEn?: string;
  example: string;
  exampleEn?: string;
  partOfSpeech?: string;
}

export interface LanguageLesson {
  id: string;
  title: string;
  titleEn: string;
  level: 1 | 2 | 3 | 4 | 5;
  difficulty: "beginner" | "intermediate" | "advanced";
  theory: string;
  theoryEn: string;
  proTips?: string[];
  proTipsEn?: string[];
  vocabulary?: VocabEntry[];
  exercises: InteractiveExercise[];
  quiz: MCQExercise[];
}

export interface LanguageModule {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  category: "ielts" | "toeic" | "cambridge" | "national-exam" | "hsk" | "chinese-conv" | "grammar" | "sat";
  language: "english" | "chinese";
  lessons: LanguageLesson[];
}
