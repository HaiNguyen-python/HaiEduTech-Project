// Types for the YKI Finnish Prep curriculum system

export interface FinnishVocabEntry {
  word: string;
  partOfSpeech: string;
  ipa?: string;
  meaningEn: string;
  meaningVi: string;
  example: string;
  exampleEn: string;
  puhekieli?: string; // Spoken Finnish equivalent
  synonyms?: string[];
  category: string;
}

export interface FinnishGrammarPoint {
  title: string;
  titleEn: string;
  explanation: string;
  explanationEn: string;
  examples: { finnish: string; english: string }[];
}

export interface FinnishDialogue {
  situation: string;
  situationEn: string;
  lines: { speaker: string; finnish: string; english: string }[];
}

export interface FinnishExercise {
  type: "fill-in-blank" | "multiple-choice" | "matching" | "conjugation";
  instruction: string;
  instructionEn: string;
  items: {
    question: string;
    options?: string[];
    answer: string;
    hint?: string;
  }[];
}

export interface FinnishLesson {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  level: "A1" | "A2";
  theory?: string;
  theoryEn?: string;
  grammar?: FinnishGrammarPoint[];
  vocabulary?: FinnishVocabEntry[];
  dialogues?: FinnishDialogue[];
  exercises?: FinnishExercise[];
  quiz?: { question: string; options: string[]; answer: number; explanation: string }[];
  sampleAnswer?: string;
}

export interface FinnishModule {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  pillar: "vocabulary" | "lessons" | "mock-exams";
  lessons: FinnishLesson[];
}

export interface MockExamSection {
  type: "reading" | "listening" | "writing" | "speaking";
  title: string;
  titleEn: string;
  icon: string;
  timeMinutes: number;
  instructions: string;
  instructionsEn: string;
}
