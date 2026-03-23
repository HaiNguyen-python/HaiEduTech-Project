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
  quiz: { question: string; options: string[]; answer: number; explanation: string }[];
  level?: 1 | 2 | 3 | 4 | 5;
  difficulty?: "beginner" | "intermediate" | "advanced";
  testCases?: TestCase[];
  solutionExplanation?: string;
}

export interface ExtendedProgrammingModule {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  course: "kids" | "data-ai" | "python" | "sql" | "data-eng" | "ml";
  lessons: ExtendedProgrammingLesson[];
}
