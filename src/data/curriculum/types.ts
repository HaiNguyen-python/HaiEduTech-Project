// Shared types for the expanded curriculum system
export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface ExtendedProgrammingLesson {
  id: string;
  title: string;
  titleEn: string;
  theory: string;
  theoryEn: string;
  code: string;
  codeLanguage: string;
  exercise: string;
  exerciseEn: string;
  quiz: ProgrammingQuizQuestion[];
  level?: 1 | 2 | 3 | 4 | 5;
  difficulty?: "beginner" | "intermediate" | "advanced";
  testCases?: TestCase[];
  solutionExplanation?: string;
}

export interface ProgrammingQuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  questionEn?: string;
  optionsEn?: string[];
  explanationEn?: string;
}

export interface ExtendedProgrammingModule {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  course: "kids" | "data-ai" | "python" | "sql" | "data-eng" | "ml" | "cloud" | "dl" | "rl" | "nlp" | "edtech" | "cybersecurity" | "prompt-eng" | "startup";
  lessons: ExtendedProgrammingLesson[];
}
