/**
 * @file LessonDeepBlock.tsx
 * @description Renders the deep-dive block for a Swedish lesson:
 *              grammar table, dialogue, model text, culture note and
 *              self-check quiz. Reads data from LESSON_DEEP keyed by
 *              the lesson id. All audio uses SwedishAudioButton.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LESSON_DEEP } from "@/data/swedishLessonDeep";
import { lessonQuizEn } from "@/data/swedishLessonQuizEn";
import { shuffleQuizOptions } from "@/lib/swedishQuizShuffle";
import { SwedishAudioButton } from "@/components/swedish/SwedishAudioButton";
import { LessonGrammarExerciseBlock } from "@/components/swedish/LessonGrammarExerciseBlock";


interface Props {
  id: string;
  lang: string;
  t: (vi: string, en: string) => string;
}

export const LessonDeepBlock = ({ id, lang, t }: Props) => {
  const deep = LESSON_DEEP[id];
  if (!deep) return null;

  return (
    <div className="space-y-3">
      {deep.grammar && (
        <div className="rounded-md border border-indigo-500/30 bg-indigo-500/5 p-3">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
            {t(`📐 ${deep.grammar.titleVi}`, `📐 ${deep.grammar.titleEn}`)}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-indigo-500/40 bg-indigo-500/10 text-left">
                  {deep.grammar.headers.map((h, i) => (
                    <th key={i} className="py-2 px-2 font-semibold text-indigo-700 dark:text-indigo-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deep.grammar.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border/40 last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="py-1.5 px-2 align-top text-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(deep.grammar.noteVi || deep.grammar.noteEn) && (
            <div className="mt-2 text-xs italic text-muted-foreground">
              {t(deep.grammar.noteVi || "", deep.grammar.noteEn || "")}
            </div>
          )}
        </div>
      )}

      <LessonGrammarExerciseBlock id={id} t={t} />

      {deep.dialogue && (
        <div className="rounded-md border border-teal-500/30 bg-teal-500/5 p-3">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-300">
            {t(`💬 ${deep.dialogue.titleVi}`, `💬 ${deep.dialogue.titleEn}`)}
          </div>
          <div className="mb-2 text-xs italic text-muted-foreground">
            {t(deep.dialogue.settingVi, deep.dialogue.settingEn)}
          </div>
          <ol className="space-y-2">
            {deep.dialogue.lines.map((l, i) => (
              <li
                key={i}
                className="rounded-md bg-card/60 border border-border/40 p-2 text-xs sm:text-sm"
              >
                <div className="flex items-start gap-2">
                  <SwedishAudioButton text={l.sv} size="xs" />
                  <div className="flex-1">
                    <div className="font-semibold text-teal-700 dark:text-teal-200">{l.speaker}</div>
                    <div className="text-foreground">🇸🇪 {l.sv}</div>
                    <div className="text-muted-foreground">
                      {t(`🇻🇳 ${l.vi}`, `🇬🇧 ${l.en}`)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {deep.model && (
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300">
              {t(`📝 ${deep.model.titleVi}`, `📝 ${deep.model.titleEn}`)}
            </div>
            <SwedishAudioButton text={deep.model.sv} size="sm" />
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="font-medium text-foreground whitespace-pre-wrap">🇸🇪 {deep.model.sv}</p>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {t(`🇻🇳 ${deep.model.vi}`, `🇬🇧 ${deep.model.en}`)}
            </p>
          </div>
          {deep.model.highlights && deep.model.highlights.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {deep.model.highlights.map((h, i) => (
                <span
                  key={i}
                  className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-200"
                >
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {(deep.cultureVi || deep.cultureEn) && (
        <div className="rounded-md border border-fuchsia-500/30 bg-fuchsia-500/5 p-3">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-300">
            {t("🌍 Văn hoá Phần Lan-Thuỵ Điển", "🌍 Finland-Swedish culture")}
          </div>
          <p className="text-xs leading-relaxed text-foreground sm:text-sm">
            {t(deep.cultureVi || "", deep.cultureEn || "")}
          </p>
        </div>
      )}

      {deep.quiz && deep.quiz.length > 0 && (
        <DeepQuizBlock lessonId={id} items={deep.quiz} lang={lang} t={t} />
      )}
    </div>
  );
};

interface QuizItem {
  q: string;
  qEn?: string;
  options: string[];
  optionsEn?: string[];
  answer: number;
  explainVi: string;
  explainEn: string;
}

interface QuizProps {
  lessonId: string;
  items: QuizItem[];
  lang: string;
  t: (vi: string, en: string) => string;
}

const DeepQuizBlock = ({ lessonId, items, lang, t }: QuizProps) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  // Shuffle options once per lesson so the correct answer is not always "B".
  const prepared = useMemo(
    () =>
      items.map((q, qi) => {
        const en = lessonQuizEn(lessonId, qi);
        const optionsEn = q.optionsEn ?? en?.options;
        const shuffled = shuffleQuizOptions(`${lessonId}#${qi}`, q.options, q.answer, optionsEn);
        return {
          q: q.q,
          qEn: q.qEn ?? en?.q ?? q.q,
          options: shuffled.options,
          optionsEn: shuffled.optionsEn,
          answer: shuffled.answer,
          explainVi: q.explainVi,
          explainEn: q.explainEn,
        };
      }),
    [items, lessonId],
  );

  return (
    <div className="rounded-md border border-cyan-500/30 bg-cyan-500/5 p-3">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
        {t("✅ Tự kiểm tra cuối bài", "✅ Self-check quiz")}
      </div>
      <ol className="space-y-3">
        {prepared.map((q, qi) => {
          const chosen = answers[qi];
          const isCorrect = chosen === q.answer;
          const isAnswered = chosen !== undefined;
          const options = lang === "vi" ? q.options : q.optionsEn ?? q.options;
          return (
            <li key={qi} className="rounded-md bg-card/60 border border-border/40 p-2.5 text-xs sm:text-sm">
              <div className="mb-2 font-medium text-foreground">
                {qi + 1}. {t(q.q, q.qEn)}
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {options.map((opt, oi) => {
                  const isThisChosen = chosen === oi;
                  const correctness =
                    isAnswered && oi === q.answer
                      ? "border-emerald-500/60 bg-emerald-500/15"
                      : isAnswered && isThisChosen && oi !== q.answer
                      ? "border-rose-500/60 bg-rose-500/15"
                      : "border-border/50 hover:bg-muted/40";
                  return (
                    <Button
                      key={oi}
                      variant="outline"
                      size="sm"
                      disabled={isAnswered}
                      onClick={() => setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                      className={`justify-start text-left text-xs sm:text-sm ${correctness}`}
                    >
                      {isAnswered && oi === q.answer && (
                        <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      )}
                      {isAnswered && isThisChosen && oi !== q.answer && (
                        <XCircle className="mr-1.5 h-3.5 w-3.5 shrink-0 text-rose-600" />
                      )}
                      <span className="flex-1 whitespace-normal">{opt}</span>
                    </Button>
                  );
                })}
              </div>
              {isAnswered && (
                <div
                  className={`mt-2 rounded-md p-2 text-xs leading-relaxed ${
                    isCorrect
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-200"
                      : "bg-rose-500/10 text-rose-700 dark:text-rose-200"
                  }`}
                >
                  {isCorrect ? "✔️ " : "✘ "}
                  {t(q.explainVi, q.explainEn)}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default LessonDeepBlock;

