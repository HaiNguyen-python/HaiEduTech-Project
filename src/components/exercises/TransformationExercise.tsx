/**
 * @file TransformationExercise.tsx
 * @description Learners rewrite a sentence to reach a target meaning, using a cue word.
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Item {
  prompt: string;
  target: string;
  cue?: string;
  goal?: string;
}

interface Props {
  instruction: string;
  instructionEn: string;
  items: Item[];
  forceEnglish?: boolean;
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[.,!?;:"'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const TransformationExercise = ({ instruction, instructionEn, items, forceEnglish = false }: Props) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const label = (vi: string, en: string) => (forceEnglish ? en : t(vi, en));
  const isRight = (idx: number) => normalize(answers[idx] || "") === normalize(items[idx].target);
  const score = items.reduce((acc, _item, idx) => acc + (isRight(idx) ? 1 : 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="font-semibold text-foreground text-[15px] leading-7 flex-1 min-w-0 bg-muted/40 border border-border rounded-lg p-4">
          <span className="mr-2">🔁</span>
          {forceEnglish ? instructionEn : t(instruction, instructionEn)}
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-sm font-bold",
                score === items.length ? "text-green-500" : score >= items.length / 2 ? "text-yellow-500" : "text-destructive"
              )}
            >
              {score}/{items.length} {label("đúng", "correct")}
            </span>
            <button
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> {label("Làm lại", "Retry")}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="glass-card rounded-xl p-4 space-y-2"
          >
            <div className="flex items-start gap-2 text-sm text-foreground">
              <span className="font-medium text-muted-foreground w-6">{idx + 1}.</span>
              <span>{item.prompt}</span>
            </div>
            <div className="ml-8 flex flex-wrap items-center gap-2 text-xs">
              {item.goal && (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">🎯 {item.goal}</span>
              )}
              {item.cue && (
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
                  {label("Dùng", "Use")}: {item.cue}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 ml-8">
              <input
                type="text"
                value={answers[idx] || ""}
                onChange={(e) => !submitted && setAnswers((prev) => ({ ...prev, [idx]: e.target.value }))}
                disabled={submitted}
                placeholder={label("Viết lại câu...", "Rewrite the sentence...")}
                className={cn(
                  "flex-1 px-3 py-2 rounded-lg border text-sm transition-all outline-none",
                  submitted
                    ? isRight(idx)
                      ? "border-green-500 bg-green-500/10 text-green-700"
                      : "border-destructive bg-destructive/10 text-destructive"
                    : "border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                )}
              />
              {submitted &&
                (isRight(idx) ? (
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive shrink-0" />
                ))}
            </div>
            {submitted && (
              <p className="text-xs text-muted-foreground ml-8">
                ✅ {label("Đáp án", "Answer")}: <span className="font-bold text-primary">{item.target}</span>
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {!submitted && Object.keys(answers).length > 0 && (
        <button
          onClick={() => setSubmitted(true)}
          className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
        >
          {label("Kiểm tra", "Check Answers")}
        </button>
      )}
    </div>
  );
};

export default TransformationExercise;
