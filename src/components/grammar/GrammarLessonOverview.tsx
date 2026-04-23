import type { LanguageLesson, LanguageModule } from "@/data/languageCurriculum";
import { BadgeCheck, BookOpenText, ListTree, Target } from "lucide-react";

interface GrammarLessonOverviewProps {
  lesson: LanguageLesson;
  module: LanguageModule;
}

const stripMarkdown = (value: string) =>
  value
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getIntro = (lesson: LanguageLesson) => {
  const theory = lesson.theoryEn || lesson.theory || "";
  const firstParagraph = theory.split(/\n{2,}/).find((chunk) => stripMarkdown(chunk).length > 40) || theory;
  return stripMarkdown(firstParagraph).slice(0, 220);
};

const getPracticeLabels = (lesson: LanguageLesson) => {
  const labels = lesson.exercises.map((exercise) => {
    switch (exercise.type) {
      case "fill-in-blank":
        return "sentence completion";
      case "sentence-reorder":
        return "word order building";
      case "dictation":
        return "dictation review";
      default:
        return "grammar practice";
    }
  });

  return Array.from(new Set(labels));
};

const GrammarLessonOverview = ({ lesson, module }: GrammarLessonOverviewProps) => {
  const intro = getIntro(lesson);
  const practiceLabels = getPracticeLabels(lesson);
  const vocabCount = lesson.vocabulary?.length ?? 0;
  const quickGoal = lesson.proTipsEn?.[0] || lesson.proTips?.[0] || "Review the model sentences, then apply the rule in full sentences.";

  return (
    <section className="rounded-xl border border-border bg-card p-6" aria-label="Grammar lesson overview">
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-foreground">
            <BookOpenText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Lesson snapshot</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            {intro || `Study ${lesson.titleEn || lesson.title} in ${module.titleEn || module.title} with clearer rule review, guided examples, and practice tasks.`}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-border bg-secondary/40 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Target className="h-4 w-4 text-primary" />
              Main focus
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{lesson.titleEn || lesson.title}</p>
          </div>

          <div className="rounded-lg border border-border bg-secondary/40 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <ListTree className="h-4 w-4 text-primary" />
              Practice modes
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {practiceLabels.length ? practiceLabels.join(" • ") : "quiz-based grammar review"}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-secondary/40 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Review set
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {lesson.quiz.length} quiz questions
              {vocabCount > 0 ? ` • ${vocabCount} key grammar terms` : ""}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-secondary/40 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <BookOpenText className="h-4 w-4 text-primary" />
              Study target
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{quickGoal}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrammarLessonOverview;