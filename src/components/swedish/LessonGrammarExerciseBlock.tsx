/**
 * @file LessonGrammarExerciseBlock.tsx
 * @description Hiển thị phần giải thích ngữ pháp mở rộng + 3-4 bài tập ngắn
 *              cho một bài LessonDeep. Học viên gõ đáp án và tự kiểm tra.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import { BookOpen, CheckCircle2, Dumbbell, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LESSON_GRAMMAR_EXTRA } from "@/data/swedishLessonGrammarExtra";
import { SwedishAudioButton } from "@/components/swedish/SwedishAudioButton";

const norm = (s: string) =>
  s.trim().toLowerCase().replace(/[.,!?;:"'()]/g, "").replace(/\s+/g, " ");

interface Props {
  id: string;
  t: (vi: string, en: string) => string;
}

export const LessonGrammarExerciseBlock = ({ id, t }: Props) => {
  const data = LESSON_GRAMMAR_EXTRA[id];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  if (!data) return null;

  const isCorrect = (i: number, expected: string, accepted?: string[]) => {
    const u = norm(answers[i] || "");
    if (!u) return false;
    const all = [expected, ...(accepted || [])].map(norm);
    return all.some((a) => u === a || a.includes(u));
  };
  const reset = () => { setAnswers({}); setChecked({}); };

  return (
    <div className="space-y-3">
      <div className="rounded-md border border-indigo-500/30 bg-indigo-500/5 p-3">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
          <BookOpen className="h-3 w-3" />
          {t("Giải thích ngữ pháp mở rộng", "Extended grammar explanation")}
        </div>
        <p className="whitespace-pre-wrap text-xs leading-relaxed sm:text-sm">
          {t(data.deepVi, data.deepEn)}
        </p>
        {data.examples.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {t("Ví dụ", "Examples")}
            </div>
            {data.examples.map((ex, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <SwedishAudioButton text={ex.sv} size="xs" />
                <span className="font-medium">{ex.sv}</span>
                <span className="text-muted-foreground">— {t(ex.vi, ex.en)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-md border border-fuchsia-500/30 bg-fuchsia-500/5 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-300">
            <Dumbbell className="h-3 w-3" />
            {t("Bài tập củng cố", "Practice exercises")} ({data.exercises.length})
          </div>
          <Button size="sm" variant="ghost" onClick={reset} className="h-6 px-2 text-[10px]">
            <RefreshCw className="mr-1 h-3 w-3" /> {t("Làm lại", "Reset")}
          </Button>
        </div>
        <div className="space-y-2">
          {data.exercises.map((ex, i) => {
            const done = checked[i];
            const ok = done && isCorrect(i, ex.answer, ex.answers);
            return (
              <div key={i} className="rounded-md border border-fuchsia-500/20 bg-background/60 p-2">
                <div className="mb-1.5 text-xs font-medium sm:text-sm">
                  {i + 1}. {t(ex.qVi, ex.qEn)}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    value={answers[i] || ""}
                    onChange={(e) => setAnswers((p) => ({ ...p, [i]: e.target.value }))}
                    placeholder={t("Nhập đáp án...", "Type your answer...")}
                    className="h-7 max-w-sm text-xs sm:text-sm"
                    onKeyDown={(e) => { if (e.key === "Enter") setChecked((p) => ({ ...p, [i]: true })); }}
                  />
                  <Button
                    size="sm"
                    onClick={() => setChecked((p) => ({ ...p, [i]: true }))}
                    className="h-7 text-xs"
                  >
                    {t("Kiểm tra", "Check")}
                  </Button>
                  {done && (ok ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" /> {t("Chính xác!", "Correct!")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                      <XCircle className="h-3 w-3" /> {t("Đáp án:", "Answer:")} <span className="font-mono">{ex.answer}</span>
                    </span>
                  ))}
                </div>
                {ex.hintVi && (
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    💡 {t(ex.hintVi, ex.hintEn || ex.hintVi)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LessonGrammarExerciseBlock;
