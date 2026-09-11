export type SpecializedLang = "english" | "chinese" | "vietnamese" | "finnish" | "swedish" | "japanese";
export type LearnerLevel = "beginner" | "elementary" | "intermediate" | "advanced";

export interface SpecializedVocab {
  term: string;
  pronunciation?: string;
  translation: string;
  partOfSpeech: string;
  example: string;
  exampleTranslation: string;
}

export interface SpecializedDialogueLine {
  speaker: string;
  line: string;
  translation: string;
  keyPhrases?: string[];
}

export interface SpecializedQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SpecializedLesson {
  id: string;
  title: string;
  subtitle: string;
  objective: string;
  estimatedMinutes: number;
  vocabulary: SpecializedVocab[];
  scenario: {
    title: string;
    context: string;
    dialogue: SpecializedDialogueLine[];
  };
  languageFocus: {
    title: string;
    explanation: string;
    examples: string[];
  };
  pronunciationTips: string[];
  culturalNote: string;
  practiceTasks: string[];
  quiz: SpecializedQuizQuestion[];
  takeaway: string;
}

export interface SpecializedCurriculum {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  language: SpecializedLang;
  level: LearnerLevel;
  totalMinutes: number;
  lessons: SpecializedLesson[];
}

export interface SpecializedProgress {
  currentLesson: number;
  bestScores: Record<string, number>;
  completedLessons: string[];
}

export const emptySpecializedProgress = (): SpecializedProgress => ({
  currentLesson: 0,
  bestScores: {},
  completedLessons: [],
});

export const isSpecializedLang = (value: string | null): value is SpecializedLang =>
  ["english", "chinese", "vietnamese", "finnish", "swedish", "japanese"].includes(value ?? "");

export const speechCodeFor = (language: SpecializedLang): string => ({
  english: "en-US",
  chinese: "zh-CN",
  vietnamese: "vi-VN",
  finnish: "fi-FI",
  swedish: "sv-SE",
  japanese: "ja-JP",
})[language];

export const validateCurriculum = (value: unknown): value is SpecializedCurriculum => {
  if (!value || typeof value !== "object") return false;
  const curriculum = value as SpecializedCurriculum;
  if (!curriculum.title?.trim() || !Array.isArray(curriculum.lessons) || curriculum.lessons.length !== 5) return false;
  return curriculum.lessons.every((lesson, lessonIndex) =>
    lesson.id === `lesson-${lessonIndex + 1}` &&
    !!lesson.title?.trim() &&
    !!lesson.objective?.trim() &&
    lesson.vocabulary?.length >= 8 &&
    lesson.vocabulary?.length <= 10 &&
    lesson.scenario?.dialogue?.length >= 4 &&
    lesson.scenario?.dialogue?.length <= 6 &&
    lesson.practiceTasks?.length === 2 &&
    lesson.quiz?.length === 5 &&
    lesson.quiz.every((question) =>
      question.options?.length === 4 &&
      Number.isInteger(question.correctIndex) &&
      question.correctIndex >= 0 &&
      question.correctIndex < 4 &&
      !!question.explanation?.trim(),
    ),
  );
};

export const curriculumToMarkdown = (curriculum: SpecializedCurriculum, citations: string[]): string => {
  const lines = [`# ${curriculum.title}`, "", `*${curriculum.subtitle}*`, "", curriculum.overview, ""];
  curriculum.lessons.forEach((lesson, lessonIndex) => {
    lines.push(`## ${lessonIndex + 1}. ${lesson.title}`, "", lesson.objective, "", "### Vocabulary");
    lesson.vocabulary.forEach((word, index) => lines.push(
      `${index + 1}. **${word.term}**${word.pronunciation ? ` (${word.pronunciation})` : ""} - ${word.translation} _(${word.partOfSpeech})_`,
      `   - ${word.example} - ${word.exampleTranslation}`,
    ));
    lines.push("", `### ${lesson.scenario.title}`, lesson.scenario.context);
    lesson.scenario.dialogue.forEach((line) => lines.push(`- **${line.speaker}:** ${line.line} _(${line.translation})_`));
    lines.push("", `### ${lesson.languageFocus.title}`, lesson.languageFocus.explanation);
    lesson.languageFocus.examples.forEach((example) => lines.push(`- ${example}`));
    lines.push("", "### Practice", ...lesson.practiceTasks.map((task) => `- ${task}`), "", `> ${lesson.takeaway}`, "");
  });
  if (citations.length) lines.push("## Sources", ...citations.slice(0, 8).map((source, index) => `${index + 1}. ${source}`));
  return lines.join("\n");
};