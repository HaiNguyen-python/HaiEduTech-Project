/**
 * @file MultipleChoiceExercise.tsx
 * @description Grammar multiple-choice drill with instant per-question feedback.
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Question {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface Props {
  instruction: string;
  instructionEn: string;
  questions: Question[];
  forceEnglish?: boolean;
}

const MultipleChoiceExercise = ({ instruction, instructionEn, questions, forceEnglish = false }: Props) => {
  const { t } = useLanguage();
  const [picked, setPicked] = useState<Record<number, number>>({});

  const label = (vi: string, en: string) => (forceEnglish ? en : t(vi, en));
  const answered = Object.keys(picked).length;
  const score = questions.reduce((acc, q, idx) => acc + (picked[idx] === q.answer ? 1 : 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="font-semibold text-foreground text-base leading-7 flex-1 min-w-0 bg-muted/40 border border-border rounded-lg p-4">
          <span className="mr-2">🎯</span>
          {forceEnglish ? instructionEn : t(instruction, instructionEn)}
        </div>
        {answered > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-primary">
              {score}/{questions.length} {label("đúng", "correct")}
            </span>
            <button onClick={() => setPicked({})} className="text-sm text-primary hover:underline flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> {label("Làm lại", "Retry")}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => {
          const choice = picked[idx];
          const done = choice !== undefined;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="glass-card rounded-xl p-4 space-y-3"
            >
              <p className="text-base font-medium leading-7 text-foreground">
                <span className="text-secondary-foreground mr-2 font-semibold">{idx + 1}.</span>
                {q.question}
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {q.options.map((option, oIdx) => {
                  const isAnswer = oIdx === q.answer;
                  const isChoice = choice === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => !done && setPicked((prev) => ({ ...prev, [idx]: oIdx }))}
                      disabled={done}
                      className={cn(
                        "min-h-11 text-left text-base leading-6 px-3 py-2 rounded-lg border transition-all flex items-center gap-2",
                        done && isAnswer && "border-green-500 bg-green-500/10 text-green-700",
                        done && isChoice && !isAnswer && "border-destructive bg-destructive/10 text-destructive",
                        !done && "border-border bg-background hover:border-primary hover:bg-primary/5 text-foreground",
                        done && !isAnswer && !isChoice && "border-border bg-background text-muted-foreground"
                      )}
                    >
                       <span className="font-bold text-sm w-4">{String.fromCharCode(65 + oIdx)}</span>
                      <span className="flex-1">{option}</span>
                      {done && isAnswer && <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />}
                      {done && isChoice && !isAnswer && <XCircle className="w-4 h-4 text-destructive shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {done && q.explanation && (
                <p className="text-sm leading-6 text-secondary-foreground bg-muted/50 rounded-lg p-3">💡 {q.explanation}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoiceExercise;
