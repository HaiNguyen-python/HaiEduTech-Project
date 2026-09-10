/**
 * @file LessonQuiz.tsx
 * @description End-of-lesson knowledge check: 4 bilingual multiple-choice
 *              questions. Answers stay hidden until the student submits.
 *              Passing (3/4) marks the lesson complete and feeds the
 *              soft-skills radar.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, ClipboardCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLessonQuiz, LIFESTYLE_QUIZ_PASS_RATIO } from "@/lib/lifestyleQuizBuilder";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import type { LifestyleLesson } from "@/data/lifestyleAcademyLessons";
import type { LifestyleLessonResult } from "@/hooks/useLifestyleProgress";

interface LessonQuizProps {
  lesson: LifestyleLesson;
  onFinish?: (result: LifestyleLessonResult) => void;
  previousScore?: number;
}

const LETTERS = ["A", "B", "C", "D"];

const LessonQuiz = ({ lesson, onFinish, previousScore }: LessonQuizProps) => {
  const { t, lang } = useLanguage();
  const vi = lang === "vi";
  const questions = useMemo(() => getLessonQuiz(lesson), [lesson]);
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredAll = Object.keys(picked).length === questions.length;
  const score = questions.reduce((s, q, i) => (picked[i] === q.answer ? s + 1 : s), 0);
  const passed = score / questions.length >= LIFESTYLE_QUIZ_PASS_RATIO;

  const submit = () => {
    setSubmitted(true);
    const result: LifestyleLessonResult = {
      lessonId: lesson.id,
      pillar: lesson.pillar,
      score,
      maxScore: questions.length,
      completed: score / questions.length >= LIFESTYLE_QUIZ_PASS_RATIO,
    };
    onFinish?.(result);
    void logStudentActivity({
      activityType: "lifestyle_quiz",
      activityId: lesson.id,
      score,
      maxScore: questions.length,
      metadata: { pillar: lesson.pillar },
    });
  };

  const reset = () => {
    setPicked({});
    setSubmitted(false);
  };

  return (
    <section className="rounded-xl border-2 border-primary/25 bg-primary/5 px-4 py-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
          <ClipboardCheck className="h-4 w-4" />
          {t("Kiểm tra kiến thức", "Knowledge check")}
        </h3>
        {typeof previousScore === "number" && !submitted && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Trophy className="h-3.5 w-3.5" />
            {t("Điểm tốt nhất", "Best")}: {previousScore}/{questions.length}
          </span>
        )}
      </div>

      <div className="mt-4 space-y-5">
        {questions.map((q, qi) => (
          <div key={qi}>
            <p className="text-base font-semibold leading-relaxed text-slate-900 dark:text-slate-50">
              {qi + 1}. {vi ? q.questionVi : q.questionEn}
            </p>
            <div className="mt-2 space-y-2">
              {q.options.map((opt, oi) => {
                const isPicked = picked[qi] === oi;
                const isCorrect = q.answer === oi;
                let tone =
                  "border-border bg-background hover:border-primary/50 hover:bg-primary/5";
                if (submitted && isCorrect) {
                  tone = "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15";
                } else if (submitted && isPicked && !isCorrect) {
                  tone = "border-rose-500 bg-rose-50 dark:bg-rose-500/15";
                } else if (!submitted && isPicked) {
                  tone = "border-primary bg-primary/10";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                    className={`flex w-full items-start gap-3 rounded-lg border-2 px-3 py-2.5 text-left text-base leading-relaxed transition-colors ${tone}`}
                  >
                    <span className="mt-0.5 shrink-0 text-xs font-bold text-muted-foreground">
                      {LETTERS[oi]}
                    </span>
                    <span className="text-slate-800 dark:text-slate-100">{vi ? opt.vi : opt.en}</span>
                    {submitted && isCorrect && (
                      <CheckCircle2 className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    )}
                    {submitted && isPicked && !isCorrect && (
                      <XCircle className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                    )}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-2 rounded-lg bg-muted px-3 py-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                <span className="font-semibold">{t("Giải thích: ", "Why: ")}</span>
                {vi ? q.explanationVi : q.explanationEn}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <Button onClick={submit} disabled={!answeredAll} className="font-semibold">
            {answeredAll
              ? t("Kiểm tra", "Check answers")
              : t("Hãy trả lời hết các câu", "Answer every question")}
          </Button>
        ) : (
          <>
            <span
              className={`rounded-full px-3 py-1.5 text-sm font-bold ${
                passed
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
              }`}
            >
              {score}/{questions.length} ·{" "}
              {passed ? t("Hoàn thành bài học", "Lesson completed") : t("Hãy thử lại nhé", "Try again")}
            </span>
            <Button variant="outline" onClick={reset} className="font-semibold">
              <RotateCcw className="mr-1.5 h-4 w-4" />
              {t("Làm lại", "Retry")}
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default LessonQuiz;
