import type { LanguageLesson, LanguageModule } from "@/data/languageCurriculum";
import { BadgeCheck, BookOpenText, ListTree, Sparkles, Target } from "lucide-react";
import grammarChibiBeginner from "@/assets/grammar-chibi-beginner.png";
import grammarChibiIntermediate from "@/assets/grammar-chibi-intermediate.png";
import grammarChibiAdvanced from "@/assets/grammar-chibi-advanced.png";

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

const chibiByDifficulty = {
  beginner: {
    src: grammarChibiBeginner,
    alt: "Cute chibi study buddy holding alphabet cards for a beginner grammar lesson",
    badge: "Warm-up buddy",
    note: "A friendly helper to make first grammar steps feel less intimidating.",
  },
  intermediate: {
    src: grammarChibiIntermediate,
    alt: "Cute chibi study buddy reading a grammar book for an intermediate lesson",
    badge: "Practice buddy",
    note: "A cheerful review partner for pattern spotting and sentence building.",
  },
  advanced: {
    src: grammarChibiAdvanced,
    alt: "Cute chibi study buddy with a magnifying glass for an advanced grammar lesson",
    badge: "Challenge buddy",
    note: "An encouraging coach for deeper analysis, comparison, and precise grammar use.",
  },
} as const;

const GrammarLessonOverview = ({ lesson, module }: GrammarLessonOverviewProps) => {
  const intro = getIntro(lesson);
  const practiceLabels = getPracticeLabels(lesson);
  const vocabCount = lesson.vocabulary?.length ?? 0;
  const quickGoal = lesson.proTipsEn?.[0] || lesson.proTips?.[0] || "Review the model sentences, then apply the rule in full sentences.";
  const chibi = chibiByDifficulty[lesson.difficulty];

  return (
    <section className="rounded-xl border border-border bg-card p-6" aria-label="Grammar lesson overview">
      <div className="flex flex-col gap-5">
        <div className="grid gap-5 rounded-xl border border-border bg-secondary/30 p-4 md:grid-cols-[minmax(0,1fr)_200px] md:items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {chibi.badge}
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Your grammar study buddy is here.</h2>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                {chibi.note} Use this lesson to notice the pattern, read the examples closely, and then apply the rule in real sentences.
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={chibi.src}
              alt={chibi.alt}
              loading="lazy"
              width={768}
              height={768}
              className="h-40 w-40 object-contain drop-shadow-sm md:h-44 md:w-44"
            />
          </div>
        </div>

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