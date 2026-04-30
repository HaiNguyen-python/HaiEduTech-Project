// Pads SAT lesson quizzes to a minimum of 5 questions by reusing the
// grammar quiz builder logic (vocab/theory/exercise-derived MCQs).
import type { LanguageModule, LanguageLesson, MCQExercise } from "@/data/languageCurriculum/types";
import { ensureGrammarLessonQuizDepth } from "@/lib/grammarQuizBuilder";

const MIN_SAT_QUIZ = 5;

const dedupe = (qs: MCQExercise[]) => {
  const seen = new Set<string>();
  return qs.filter((q) => {
    const k = `${q.question}__${q.options.join("||")}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

const padSatLesson = (lesson: LanguageLesson): LanguageLesson => {
  if (lesson.quiz.length >= MIN_SAT_QUIZ) return lesson;

  // Use grammar builder to generate extra context-aware questions.
  const enriched = ensureGrammarLessonQuizDepth(lesson);

  // Combine: keep original quiz first (preserves SAT-specific phrasing),
  // then append generated ones until we hit the minimum.
  const combined = dedupe([...lesson.quiz, ...enriched.quiz]);

  const finalQuiz = combined.slice(0, Math.max(MIN_SAT_QUIZ, lesson.quiz.length));

  // Last-resort filler if still short (rare).
  while (finalQuiz.length < MIN_SAT_QUIZ) {
    const i = finalQuiz.length + 1;
    const name = lesson.titleEn || lesson.title;
    finalQuiz.push({
      question: `Review check ${i}: what is the main focus of "${name}"?`,
      options: [
        "Apply the lesson's core SAT strategy carefully.",
        "Skip the question without reading.",
        "Pick the longest answer choice every time.",
        "Guess randomly to save time.",
      ],
      answer: 0,
      explanation: `Always apply the strategy taught in "${name}".`,
    });
  }

  return { ...lesson, quiz: finalQuiz };
};

export const enhanceSatModulesWithQuizDepth = (modules: LanguageModule[]): LanguageModule[] =>
  modules.map((m) => ({ ...m, lessons: m.lessons.map(padSatLesson) }));
