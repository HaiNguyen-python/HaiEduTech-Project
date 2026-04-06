// Extended types for the multi-language curriculum system

export interface FillInBlankExercise {
  type: "fill-in-blank";
  instruction: string;
  instructionEn: string;
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

export type InteractiveExercise = FillInBlankExercise | SentenceReorderExercise | DictationExercise;

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
  category: "ielts" | "toeic" | "cambridge" | "national-exam" | "hsk" | "chinese-conv" | "grammar";
  language: "english" | "chinese";
  lessons: LanguageLesson[];
}
