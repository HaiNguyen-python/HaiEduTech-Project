import type { LanguageLesson, LanguageModule } from "@/data/languageCurriculum";
import { pickEnglishGrammarCopy } from "@/lib/englishGrammarCopy";

const stripMarkdown = (value: string) =>
  value
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^\|.*\|$/gm, "")
    .replace(/^\|?[-: ]+\|[-|: ]*$/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/^>\s*/gm, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const cleanLine = (line: string) => stripMarkdown(line.replace(/^[-•]\s*/, "").replace(/^\d+\.\s*/, "")).trim();

const unique = <T,>(items: T[]) => Array.from(new Set(items));

const toSentence = (value: string) => {
  const trimmed = value.trim().replace(/[.\s]+$/, "");
  if (!trimmed) return "";
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}.`;
};

const buildWorkedExamples = (lesson: LanguageLesson) =>
  lesson.exercises
    .flatMap((exercise) => {
      if (exercise.type === "fill-in-blank") {
        return exercise.sentences.map((sentence) => ({
          prompt: sentence.textEn || sentence.text,
          answer: sentence.answer,
          note: pickEnglishGrammarCopy(
            (sentence as { hintEn?: string }).hintEn,
            sentence.hint,
            "Study the grammar role of the missing word."
          ),
        }));
      }

      if (exercise.type === "sentence-reorder") {
        return exercise.items.map((item) => ({
          prompt: item.correctEn || item.correct,
          answer: item.correctEn || item.correct,
          note: "Correct word order model",
        }));
      }

      return [];
    })
    .slice(0, 4)
    .map((item) => {
      const example = item.prompt.includes("___")
        ? item.prompt.replace(/_{3,5}/, `**${item.answer}**`)
        : item.prompt;

      return `- ${example}${item.note ? ` - ${toSentence(stripMarkdown(item.note)).replace(/\.$/, "")}` : ""}`;
    });

const extractRuleBullets = (theory: string) => {
  const lines = theory.split("\n").map((line) => line.trim());

  return unique(
    lines
      .filter((line) => /^[-•]/.test(line) || /^\d+\./.test(line))
      .map(cleanLine)
      .filter((line) => line.length > 12)
  ).slice(0, 6);
};

const extractSectionTitles = (theory: string) =>
  unique(
    [...theory.matchAll(/^###\s+(.+)$/gm)]
      .map((match) => cleanLine(match[1]))
      .filter(Boolean)
  ).slice(0, 6);

const buildQuizInsights = (lesson: LanguageLesson) =>
  lesson.quiz
    .slice(0, 4)
    .map((question) => {
      const explanation = pickEnglishGrammarCopy(
        question.explanation,
        undefined,
        `Review why the correct answer in \"${stripMarkdown(question.question)}\" works.`
      );

      return `- ${stripMarkdown(explanation)}`;
    })
    .filter((line) => line.length > 10);

const buildVocabularyPointers = (lesson: LanguageLesson) =>
  (lesson.vocabulary || [])
    .slice(0, 5)
    .map((item) => {
      const meaning = item.meaningEn || item.meaning;
      return `- **${item.word}**: ${stripMarkdown(meaning)}`;
    });

const buildUsageSummary = (lesson: LanguageLesson, module: LanguageModule) => {
  const lessonName = lesson.titleEn || lesson.title;
  const moduleName = module.titleEn || module.title;
  const practiceTypes = unique(lesson.exercises.map((exercise) => exercise.type.replace(/-/g, " ")));

  return [
    `- Focus lesson: **${lessonName}** in the **${moduleName}** module.`,
    `- Difficulty: **${lesson.difficulty}** | Lesson level: **${lesson.level}/5**.`,
    `- Practice in this lesson: ${practiceTypes.length ? practiceTypes.join(", ") : "quiz review"}.`,
    `- Goal: understand the rule, notice the pattern, and apply it accurately in full English sentences.`,
  ];
};

const buildChecklist = (lesson: LanguageLesson) => {
  const sectionTitles = extractSectionTitles(lesson.theoryEn || lesson.theory);

  return unique([
    ...(sectionTitles.length
      ? sectionTitles.slice(0, 3).map((title) => `I can explain the rule in **${title}** without translating word by word.`)
      : []),
    "I can choose the correct form in context, not only in isolated grammar drills.",
    "I can avoid the most common wrong options shown in the quiz and practice section.",
    "I can produce one original sentence of my own using this grammar pattern.",
  ]).slice(0, 4);
};

export const getEnhancedGrammarTheory = (lesson: LanguageLesson, module: LanguageModule) => {
  const source = (lesson.theoryEn || lesson.theory || "").trim();
  const sectionTitles = extractSectionTitles(source).slice(0, 3);
  const rules = extractRuleBullets(source).slice(0, 4);
  const examples = buildWorkedExamples(lesson).slice(0, 2);
  const quizInsights = buildQuizInsights(lesson).slice(0, 2);
  const fallbackIntro = stripMarkdown(source).split(/\.\s+/).filter(Boolean).slice(0, 2).join(". ");

  return [
    `## Key idea`,
    fallbackIntro ? toSentence(fallbackIntro).slice(0, 260) : `Study **${lesson.titleEn || lesson.title}** through short rules, visual cues, and practice sentences.`,
    sectionTitles.length ? `## What to notice\n${sectionTitles.map((title) => `- ${title}`).join("\n")}` : "",
    rules.length ? `## Core rules\n${rules.map((rule) => `- ${rule}`).join("\n")}` : "",
    examples.length ? `## Model examples\n${examples.join("\n")}` : "",
    quizInsights.length ? `## Quick traps\n${quizInsights.join("\n")}` : "",
  ].filter(Boolean).join("\n\n");
};