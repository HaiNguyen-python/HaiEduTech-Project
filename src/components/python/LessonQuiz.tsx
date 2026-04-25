/**
 * @file LessonQuiz.tsx
 * @description 3-question quiz (MCQ + fill-code). Pass = ≥2/3.
 */
import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// useLanguage intentionally not used - Knowledge Check is forced to English.
import type { QuizQuestion } from "@/data/curriculum/pythonPathway";
import { cn } from "@/lib/utils";

interface Props {
  questions: QuizQuestion[];
  onComplete: (passed: boolean, score: number) => void;
}

const LessonQuiz = ({ questions, onComplete }: Props) => {
  // Knowledge Check is always rendered in English for Programming lessons.
  const language = "en" as "vi" | "en";
  const [answers, setAnswers] = useState<(string | number | null)[]>(questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = (q: QuizQuestion, a: string | number | null) => {
    if (a === null) return false;
    if (q.type === "mcq") return a === q.answer;
    return typeof a === "string" && a.trim().toLowerCase() === q.answer.trim().toLowerCase();
  };

  const score = questions.filter((q, i) => isCorrect(q, answers[i])).length;
  const passed = score >= 2;

  const handleSubmit = () => {
    setSubmitted(true);
    onComplete(passed, score);
  };

  const handleReset = () => {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
  };

  return (
    <div className="space-y-5">
      {questions.map((q, i) => {
        const a = answers[i];
        const correct = isCorrect(q, a);
        return (
          <div key={i} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-start gap-2 mb-3">
              <span className="text-xs font-bold text-primary shrink-0 mt-0.5">Q{i + 1}.</span>
              <p className="text-sm font-medium text-foreground">
                {language === "vi" ? q.q : q.qEn}
              </p>
            </div>

            {q.type === "mcq" && (
              <div className="space-y-2">
                {(language === "vi" ? q.options : q.optionsEn).map((opt, idx) => {
                  const selected = a === idx;
                  const showCorrect = submitted && idx === q.answer;
                  const showWrong = submitted && selected && idx !== q.answer;
                  return (
                    <button
                      key={idx}
                      onClick={() => !submitted && setAnswers((p) => p.map((x, j) => (j === i ? idx : x)))}
                      disabled={submitted}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg border text-sm transition-all",
                        showCorrect && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                        showWrong && "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400",
                        !submitted && selected && "border-primary bg-primary/10",
                        !submitted && !selected && "border-border hover:border-primary/40",
                      )}
                    >
                      <span className="font-mono text-xs mr-2 text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                      {showCorrect && <Check className="inline w-4 h-4 ml-2" />}
                      {showWrong && <X className="inline w-4 h-4 ml-2" />}
                    </button>
                  );
                })}
              </div>
            )}

            {q.type === "fill" && (
              <div>
                <div className="font-mono text-sm bg-muted/50 p-3 rounded-lg flex items-center flex-wrap gap-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="whitespace-pre">{q.codeBefore}</span>
                  <Input
                    value={(a as string) ?? ""}
                    onChange={(e) => setAnswers((p) => p.map((x, j) => (j === i ? e.target.value : x)))}
                    disabled={submitted}
                    placeholder="?"
                    className={cn(
                      "inline-flex w-32 h-7 font-mono text-sm",
                      submitted && correct && "border-emerald-500 bg-emerald-500/10",
                      submitted && !correct && "border-red-500 bg-red-500/10",
                    )}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  />
                  <span className="whitespace-pre">{q.codeAfter}</span>
                </div>
                {submitted && !correct && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    ✓ Correct answer: <code className="text-emerald-600 font-mono">{q.answer}</code>
                  </p>
                )}
              </div>
            )}

            {submitted && q.explanation && (
              <p className="mt-2 text-xs text-muted-foreground italic">💡 {q.explanation}</p>
            )}
          </div>
        );
      })}

      <div className="flex items-center gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={answers.some((a) => a === null || a === "")} className="flex-1">
            {language === "vi" ? "Nộp bài" : "Submit"}
          </Button>
        ) : (
          <>
            <div className={cn(
              "flex-1 px-4 py-2 rounded-lg text-sm font-bold text-center",
              passed ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-amber-500/10 text-amber-700 dark:text-amber-400",
            )}>
              {passed ? "🎉 " : "📝 "}
              {language === "vi" ? `Điểm: ${score}/${questions.length}` : `Score: ${score}/${questions.length}`}
              {passed ? (language === "vi" ? " - Đạt!" : " - Passed!") : (language === "vi" ? " - Cần ≥2" : " - Need ≥2")}
            </div>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1" /> {language === "vi" ? "Làm lại" : "Retry"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonQuiz;
