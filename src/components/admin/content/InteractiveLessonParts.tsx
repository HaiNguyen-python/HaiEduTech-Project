/**
 * @file InteractiveLessonParts.tsx
 * @description Learner-side interactive practice and quiz for Content Studio lessons.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import { CheckCircle2, Volume2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import type { PracticeItem, QuizQuestion } from "@/lib/contentStudio";

const norm = (s: string) => s.trim().toLowerCase().replace(/[.!?,;:"']/g, "").replace(/\s+/g, " ");

export function speakText(text: string, subject?: string | null) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  const s = (subject || "").toLowerCase();
  u.lang = s.includes("chinese") ? "zh-CN" : s.includes("vietnam") ? "vi-VN" : "en-US";
  u.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export function SpeakButton({ text, subject }: { text: string; subject?: string | null }) {
  const { t } = useLanguage();
  return (
    <button type="button" onClick={() => speakText(text, subject)} aria-label={t("Nghe", "Listen")}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-primary hover:bg-primary/10">
      <Volume2 className="h-4 w-4" />
    </button>
  );
}

export function InteractivePractice({ items }: { items: PracticeItem[] }) {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<string[]>(() => items.map(() => ""));
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  const isRight = (i: number) => {
    const ok = [items[i].answer, ...(items[i].accepted ?? [])].map(norm);
    return ok.includes(norm(answers[i]));
  };

  return (
    <ol className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="space-y-1.5">
          <p className="font-medium">{i + 1}. {it.prompt}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Input className="max-w-xs" value={answers[i]}
              onChange={(e) => {
                const a = [...answers]; a[i] = e.target.value; setAnswers(a);
                const c = [...checked]; c[i] = false; setChecked(c);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") { const c = [...checked]; c[i] = true; setChecked(c); }
              }}
              placeholder={t("Nhập đáp án", "Type your answer")} />
            <Button type="button" size="sm" variant="outline"
              onClick={() => { const c = [...checked]; c[i] = true; setChecked(c); }}>
              {t("Kiểm tra", "Check")}
            </Button>
          </div>
          {checked[i] && (isRight(i) ? (
            <p className="flex items-center gap-1 text-sm text-primary"><CheckCircle2 className="h-4 w-4" />{t("Chính xác!", "Correct!")}</p>
          ) : (
            <p className="flex items-center gap-1 text-sm text-destructive">
              <XCircle className="h-4 w-4" />
              {t("Chưa đúng. Đáp án: ", "Not quite. Answer: ")}<strong>{it.answer}</strong>
              {it.hint && <span className="text-muted-foreground"> ({it.hint})</span>}
            </p>
          ))}
        </li>
      ))}
    </ol>
  );
}

export function InteractiveQuiz({ questions, lessonId, subject }: {
  questions: QuizQuestion[]; lessonId?: string; subject?: string | null;
}) {
  const { t } = useLanguage();
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const score = picked.filter((p, i) => p === questions[i].correctIndex).length;

  const submit = () => {
    setSubmitted(true);
    logStudentActivity({
      activityType: "content_lesson_quiz",
      activityId: lessonId,
      score,
      maxScore: questions.length,
      metadata: { subject: subject ?? undefined },
    });
  };

  return (
    <div className="space-y-4">
      <ol className="space-y-4">
        {questions.map((q, i) => (
          <li key={i} className="space-y-2">
            <p className="font-medium">{i + 1}. {q.question}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {q.options.map((o, oi) => {
                const chosen = picked[i] === oi;
                const correct = submitted && oi === q.correctIndex;
                const wrong = submitted && chosen && oi !== q.correctIndex;
                return (
                  <button key={oi} type="button" disabled={submitted}
                    onClick={() => { const p = [...picked]; p[i] = oi; setPicked(p); }}
                    className={`rounded-md border px-3 py-2 text-left text-[15px] transition-colors ${
                      correct ? "border-primary bg-primary/10"
                      : wrong ? "border-destructive bg-destructive/10"
                      : chosen ? "border-primary" : "border-border hover:border-primary/60"}`}>
                    {String.fromCharCode(65 + oi)}. {o}
                  </button>
                );
              })}
            </div>
            {submitted && q.explanation && (
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">{q.explanation}</p>
            )}
          </li>
        ))}
      </ol>
      {!submitted ? (
        <Button type="button" onClick={submit} disabled={picked.some((p) => p === null)}>
          {t("Nộp bài & chấm điểm", "Submit & grade")}
        </Button>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-primary/40 bg-primary/5 p-3">
          <strong className="text-lg">
            {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
          </strong>
          <Button type="button" size="sm" variant="outline"
            onClick={() => { setSubmitted(false); setPicked(questions.map(() => null)); }}>
            {t("Làm lại", "Try again")}
          </Button>
        </div>
      )}
    </div>
  );
}
