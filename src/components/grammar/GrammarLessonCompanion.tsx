import type { LanguageLesson, LanguageModule } from "@/data/languageCurriculum";
import { BookMarked, CheckCircle2, CircleAlert, Lightbulb, ListChecks, ScanSearch, Shapes } from "lucide-react";
import { getEnhancedGrammarTheory } from "@/lib/grammarTheoryEnhancer";
import { pickEnglishGrammarCopy } from "@/lib/englishGrammarCopy";

interface GrammarLessonCompanionProps {
  lesson: LanguageLesson;
  module: LanguageModule;
}

interface TheorySection {
  title: string;
  body: string;
}

interface CompanionExample {
  label: string;
  value: string;
  note?: string;
}

interface FillBlankExampleSource {
  prompt: string;
  answer: string;
  hint?: string;
}

interface RulePattern {
  pattern: string;
  use: string;
}

const stripMarkdown = (input: string) =>
  input
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

const cleanLine = (line: string) => stripMarkdown(line.replace(/^[-•]\s*/, "").replace(/^\d+\.\s*/, "")).trim();

const extractRulePatterns = (markdown: string): RulePattern[] =>
  markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /\*\*Structure:|\*\*Form:|\*\*Cấu trúc:/i.test(line))
    .map((line) => cleanLine(line))
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return {
        pattern: rest.join(":").trim(),
        use: /structure|form/i.test(label) ? "Core grammar frame" : label.trim(),
      };
    })
    .filter((item) => item.pattern.length > 0)
    .slice(0, 4);

const extractRecognitionSignals = (markdown: string) => {
  const lines = markdown.split("\n").map((line) => line.trim());
  const signals: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^#{1,3}\s+(Signal Words|Signals|Time Signal Cheatsheet|Dấu hiệu|Lưu ý|Key Differences|Common triggers)/i.test(line)) {
      for (let j = i + 1; j < lines.length; j += 1) {
        const next = lines[j];
        if (!next) continue;
        if (/^#{1,3}\s+/.test(next)) break;
        if (/^[-•]/.test(next) || /^\|/.test(next)) {
          signals.push(cleanLine(next));
        }
      }
    }
  }

  return signals.filter(Boolean).slice(0, 5);
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

const buildWorkedExamples = (lesson: LanguageLesson): CompanionExample[] => {
  const fillBlankExamples = lesson.exercises
    .filter((exercise) => exercise.type === "fill-in-blank")
    .flatMap((exercise) =>
      exercise.sentences.map((sentence): FillBlankExampleSource => ({
        prompt: sentence.textEn || sentence.text,
        answer: sentence.answer,
        hint: pickEnglishGrammarCopy(
          ((sentence as { hintEn?: string }).hintEn) || undefined,
          sentence.hint,
          "Focus on the grammar role in this sentence."
        ),
      }))
    )
    .slice(0, 3)
    .map((item): CompanionExample => ({
      label: "Model answer",
      value: stripMarkdown(item.prompt.replace("___", item.answer)),
      note: item.hint,
    }));

  const reorderExamples = lesson.exercises
    .filter((exercise) => exercise.type === "sentence-reorder")
    .flatMap((exercise) =>
      exercise.items.map((item): CompanionExample => ({
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
    .map((question) => {
      const questionText = pickEnglishGrammarCopy(question.question, undefined, "Review this grammar question.");
      const explanationText = pickEnglishGrammarCopy(
        question.explanation,
        undefined,
        "Check why the correct option matches the grammar rule."
      );

      return `${stripMarkdown(questionText)} — ${stripMarkdown(explanationText)}`;
    });

  const proTips = (lesson.proTipsEn || lesson.proTips || [])
    .map((tip) => pickEnglishGrammarCopy(tip, undefined, "Check the rule carefully before you answer."))
    .filter((tip) => /not|don't|do not|must|always|never/i.test(tip))
    .slice(0, Math.max(0, 4 - explicitMistakes.length - quizTraps.length));

  return [...explicitMistakes, ...quizTraps, ...proTips].slice(0, 4);
};

const buildWrongVsRight = (theoryText: string): CompanionExample[] => {
  const lines = theoryText.split("\n").map((line) => line.trim());
  const pairs: CompanionExample[] = [];

  for (let i = 0; i < lines.length - 1; i += 1) {
    const current = lines[i];
    const next = lines[i + 1];
    if (current.includes("❌") && next.includes("✅")) {
      pairs.push({
        label: "Wrong → Right",
        value: `${cleanLine(current.replace(/.*❌\s*/, ""))} → ${cleanLine(next.replace(/.*✅\s*/, ""))}`,
      });
    }
  }

  return pairs.slice(0, 3);
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

  const theoryText = getEnhancedGrammarTheory(lesson, module);
  const sections = splitTheorySections(theoryText);
  const coreRules = extractRuleBullets(sections);
  const rulePatterns = extractRulePatterns(theoryText);
  const workedExamples = buildWorkedExamples(lesson);
  const commonMistakes = buildCommonMistakes(lesson, theoryText);
  const wrongVsRight = buildWrongVsRight(theoryText);
  const recognitionSignals = extractRecognitionSignals(theoryText);
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
            <Shapes className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Rule patterns</h3>
          </div>
          <div className="space-y-3 text-sm leading-7 text-foreground">
            {rulePatterns.length > 0 ? rulePatterns.map((item) => (
              <div key={item.pattern} className="rounded-lg border border-border bg-secondary/40 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.use}</p>
                <p className="font-medium">{item.pattern}</p>
              </div>
            )) : (
              <p className="text-muted-foreground">Read the section headings and example sentences to identify the main grammar frame.</p>
            )}
          </div>
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
            <ScanSearch className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Recognition signals</h3>
          </div>
          <ul className="space-y-3 text-sm leading-7 text-foreground">
            {recognitionSignals.length > 0 ? recognitionSignals.map((item) => (
              <li key={item} className="rounded-lg border border-border bg-secondary/40 p-4">{item}</li>
            )) : (
              <li className="rounded-lg border border-border bg-secondary/40 p-4 text-muted-foreground">
                Use the examples, time references, and sentence position clues in the lesson to detect when this rule is needed.
              </li>
            )}
          </ul>
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
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Right vs wrong models</h3>
          </div>
          <div className="space-y-3 text-sm leading-7 text-foreground">
            {wrongVsRight.length > 0 ? wrongVsRight.map((item) => (
              <div key={item.value} className="rounded-lg border border-border bg-secondary/40 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</p>
                <p>{item.value}</p>
              </div>
            )) : (
              <p className="rounded-lg border border-border bg-secondary/40 p-4 text-muted-foreground">
                Compare the quiz distractors with the worked examples to notice how small grammar choices change the sentence.
              </p>
            )}
          </div>
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