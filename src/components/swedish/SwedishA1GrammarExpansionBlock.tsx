/**
 * @file SwedishA1GrammarExpansionBlock.tsx
 * @description Block hiển thị phần ngữ pháp mở rộng + bài tập ngắn (điền/đáp án)
 *              cho mỗi ngày trong lộ trình A1 Thuỵ Điển. Tự chấm phía client:
 *              học viên gõ đáp án → bấm "Kiểm tra" → hiển thị đúng/sai +
 *              đáp án chuẩn để đối chiếu.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import { CheckCircle2, XCircle, RefreshCw, BookOpen, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { SWEDISH_A1_GRAMMAR_EXPANSION, type GrammarExpansion } from "@/data/swedishA1GrammarExpansion";
import { SwedishAudioButton } from "@/components/swedish/SwedishAudioButton";

const norm = (s: string) =>
  s.trim().toLowerCase().replace(/[.,!?;:"'()]/g, "").replace(/\s+/g, " ");

interface Props {
  day: number;
}

export function SwedishA1GrammarExpansionBlock({ day }: Props) {
  const { t } = useLanguage();
  const data: GrammarExpansion | undefined = SWEDISH_A1_GRAMMAR_EXPANSION[day];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  if (!data) return null;

  const check = (i: number, expected: string) => {
    setChecked((prev) => ({ ...prev, [i]: true }));
  };
  const isCorrect = (i: number, expected: string) => {
    const user = norm(answers[i] || "");
    return user && norm(expected).includes(user) || user === norm(expected);
  };
  const reset = () => { setAnswers({}); setChecked({}); };

  return (
    <div className="space-y-3">
      {/* Deep grammar explanation */}
      <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-3">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <BookOpen className="h-3.5 w-3.5" />
          {t("Giải thích ngữ pháp mở rộng", "Extended grammar explanation")}
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {t(data.deepVi, data.deepEn)}
        </p>
        {data.examples.length > 0 && (
          <div className="mt-3 space-y-1.5">
            <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
              {t("Ví dụ", "Examples")}:
            </div>
            {data.examples.map((ex, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2 text-sm">
                <SwedishAudioButton text={ex.sv} size="xs" />
                <span className="font-medium">{ex.sv}</span>
                <span className="text-muted-foreground">— {t(ex.vi, ex.en)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exercises */}
      <div className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/5 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-300">
            <Dumbbell className="h-3.5 w-3.5" />
            {t("Bài tập củng cố", "Practice exercises")} ({data.exercises.length})
          </div>
          <Button size="sm" variant="ghost" onClick={reset} className="h-7 px-2 text-xs">
            <RefreshCw className="mr-1 h-3 w-3" /> {t("Làm lại", "Reset")}
          </Button>
        </div>
        <div className="space-y-3">
          {data.exercises.map((ex, i) => {
            const done = checked[i];
            const ok = done && isCorrect(i, ex.answer);
            return (
              <div key={i} className="rounded-md border border-fuchsia-500/20 bg-background/60 p-2.5">
                <div className="mb-1.5 text-sm font-medium">
                  {i + 1}. {t(ex.qVi, ex.qEn)}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    value={answers[i] || ""}
                    onChange={(e) => setAnswers((p) => ({ ...p, [i]: e.target.value }))}
                    placeholder={t("Nhập đáp án...", "Type your answer...")}
                    className="h-8 max-w-sm text-sm"
                    onKeyDown={(e) => { if (e.key === "Enter") check(i, ex.answer); }}
                  />
                  <Button size="sm" onClick={() => check(i, ex.answer)} className="h-8">
                    {t("Kiểm tra", "Check")}
                  </Button>
                  {done && (
                    ok ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" /> {t("Chính xác!", "Correct!")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                        <XCircle className="h-3.5 w-3.5" /> {t("Đáp án:", "Answer:")} <span className="font-mono">{ex.answer}</span>
                      </span>
                    )
                  )}
                </div>
                {ex.hintVi && (
                  <div className="mt-1 text-xs text-muted-foreground">
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
}
