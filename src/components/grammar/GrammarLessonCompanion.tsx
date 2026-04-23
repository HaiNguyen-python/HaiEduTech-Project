import type { LanguageLesson, LanguageModule } from "@/data/languageCurriculum";
import { BookMarked, CheckCircle2, CircleAlert, Lightbulb, ListChecks } from "lucide-react";

interface GrammarLessonCompanionProps {
  lesson: LanguageLesson;
  module: LanguageModule;
}

interface TheorySection {
  title: string;
  body: string;
}

const stripMarkdown = (input: string) =>
  input
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/^>\s*/gm, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .trim();

const splitTheorySections = (markdown: string): TheorySection[] => {
  const parts = markdown.split(/\n(?=###\s+)/g).map((part) => part.trim()).filter(Boolean);

  if (parts.length <= 1) {
    return markdown
      .split(/\n{2,}/)
      .map((part, index) => ({
        title: index === 0 ? "Core idea" : `Point ${index}`,
        body: part.trim(),
      }))
      .filter((section) => section.body.length > 0);
  }

  return parts.map((part, index) => {
    const lines = part.split("\n");
    const firstLine = lines[0] ?? "";
    const title = stripMarkdown(firstLine.replace(/^###\s*/, "")) || `Point ${index + 1}`;
    const body = lines.slice(1).join("\n").trim();
    return { title, body };
  });
};

const extractRuleBullets = (sections: TheorySection[]) =>
  sections
    .flatMap((section) => {
      const bulletLines = section.body
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => /^[-•]/.test(line) || /^\d+\./.test(line))
        .map((line) => stripMarkdown(line.replace(/^[-•]\s*/, "").replace(/^\d+\.\s*/, "")));

      if (bulletLines.length > 0) {
        return bulletLines.map((line) => `${section.title}: ${line}`);
      }

      const plain = stripMarkdown(section.body)
        .split(/\.\s+/)
        .map((line) => line.trim())
        .filter(Boolean);

      return plain.slice(0, 2).map((line) => `${section.title}: ${line}`);
    })
    .filter(Boolean)
    .slice(0, 6);

const buildWorkedExamples = (lesson: LanguageLesson) => {
  const fillBlankExamples = lesson.exercises
    .filter((exercise) => exercise.type === "fill-in-blank")
    .flatMap((exercise) =>
      exercise.sentences.map((sentence) => ({
        prompt: sentence.textEn || sentence.text,
        answer: sentence.answer,
        hint: sentence.hint,
      }))
    )
    .slice(0, 3)
    .map((item) => ({
      label: "Model answer",
      value: stripMarkdown(item.prompt.replace("___", item.answer)),
      note: item.hint,
    }));

  const reorderExamples = lesson.exercises
    .filter((exercise) => exercise.type === "sentence-reorder")
    .flatMap((exercise) =>
      exercise.items.map((item) => ({
        label: "Correct word order",
        value: item.correctEn || item.correct,
      }))
    )
    .slice(0, Math.max(0, 3 - fillBlankExamples.length));

  return [...fillBlankExamples, ...reorderExamples].slice(0, 3);
};

const buildCommonMistakes = (lesson: LanguageLesson, theoryText: string) => {
  const explicitMistakes = theoryText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- ❌") || line.startsWith("❌"))
    .map((line) => stripMarkdown(line.replace(/^[- ]*❌\s*/, "")));

  const quizTraps = lesson.quiz
    .slice(0, Math.max(0, 4 - explicitMistakes.length))
    .map((question) => `${stripMarkdown(question.question)} — ${stripMarkdown(question.explanation)}`);

  const proTips = (lesson.proTipsEn || lesson.proTips || [])
    .filter((tip) => /not|don't|do not|must|always|never/i.test(tip))
    .slice(0, Math.max(0, 4 - explicitMistakes.length - quizTraps.length));

  return [...explicitMistakes, ...quizTraps, ...proTips].slice(0, 4);
};

const buildSummaryChecklist = (lesson: LanguageLesson, module: LanguageModule) => {
  const practiceTypes = lesson.exercises.map((exercise) => exercise.type.replace(/-/g, " "));

  return [
    `Focus area: ${lesson.titleEn || lesson.title}`,
    `Module: ${module.titleEn || module.title}`,
    `Difficulty: ${lesson.difficulty}`,
    `Practice included: ${practiceTypes.length ? practiceTypes.join(", ") : "quiz review"}`,
    `Quiz review: ${lesson.quiz.length} check questions`,
  ];
};

const GrammarLessonCompanion = ({ lesson, module }: GrammarLessonCompanionProps) => {
  if (module.category !== "grammar" || module.language !== "english") return null;

  const theoryText = lesson.theoryEn || lesson.theory || "";
  const sections = splitTheorySections(theoryText);
  const coreRules = extractRuleBullets(sections);
  const workedExamples = buildWorkedExamples(lesson);
  const commonMistakes = buildCommonMistakes(lesson, theoryText);
  const summaryChecklist = buildSummaryChecklist(lesson, module);

  return (
    <section className="space-y-4" aria-label="Grammar lesson companion">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2 text-foreground">
          <BookMarked className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Grammar Companion</h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          This lesson guide turns the theory into a clearer study path with core rules, ready-made models,
          common traps, and a short review checklist.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-foreground">
            <ListChecks className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Core rules</h3>
          </div>
          <ul className="space-y-3 text-sm leading-7 text-foreground">
            {coreRules.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-foreground">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Correct models</h3>
          </div>
          <div className="space-y-3">
            {workedExamples.map((example) => (
              <div key={`${example.label}-${example.value}`} className="rounded-lg border border-border bg-secondary/40 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{example.label}</p>
                <p className="text-sm font-medium leading-7 text-foreground">{example.value}</p>
                {example.note ? <p className="mt-2 text-xs text-muted-foreground">{example.note}</p> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-foreground">
            <CircleAlert className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Common mistakes to avoid</h3>
          </div>
          <ul className="space-y-3 text-sm leading-7 text-foreground">
            {commonMistakes.map((item) => (
              <li key={item} className="rounded-lg border border-border bg-secondary/40 p-4">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-foreground">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Quick review summary</h3>
          </div>
          <ul className="space-y-3 text-sm leading-7 text-foreground">
            {summaryChecklist.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 text-primary">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GrammarLessonCompanion;