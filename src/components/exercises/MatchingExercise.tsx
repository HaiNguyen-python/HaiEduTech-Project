/**
 * @file MatchingExercise.tsx
 * @description Match a structure/word on the left with its use/meaning on the right.
 */
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Pair {
  left: string;
  right: string;
}

interface Props {
  instruction: string;
  instructionEn: string;
  pairs: Pair[];
  forceEnglish?: boolean;
}

/** Deterministic shuffle so the right column order stays stable across renders. */
const shuffle = <T,>(items: T[], seed: number) => {
  const output = [...items];
  let state = seed || 7;
  for (let i = output.length - 1; i > 0; i -= 1) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const j = state % (i + 1);
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
};

const MatchingExercise = ({ instruction, instructionEn, pairs, forceEnglish = false }: Props) => {
  const { t } = useLanguage();
  const [activeLeft, setActiveLeft] = useState<number | null>(null);
  const [links, setLinks] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const label = (vi: string, en: string) => (forceEnglish ? en : t(vi, en));

  const seed = useMemo(
    () => pairs.reduce((sum, pair) => sum + pair.left.length + pair.right.length, pairs.length * 13),
    [pairs]
  );
  const rightOrder = useMemo(() => shuffle(pairs.map((_pair, idx) => idx), seed), [pairs, seed]);

  const score = pairs.reduce((acc, _pair, idx) => acc + (links[idx] === idx ? 1 : 0), 0);
  const usedRight = new Set(Object.values(links));

  const pickRight = (rightIdx: number) => {
    if (submitted || activeLeft === null) return;
    setLinks((prev) => {
      const next: Record<number, number> = {};
      Object.entries(prev).forEach(([key, value]) => {
        if (value !== rightIdx) next[Number(key)] = value;
      });
      next[activeLeft] = rightIdx;
      return next;
    });
    setActiveLeft(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="font-semibold text-foreground text-base leading-7 flex-1 min-w-0 bg-muted/40 border border-border rounded-lg p-4">
          <span className="mr-2">🔗</span>
          {forceEnglish ? instructionEn : t(instruction, instructionEn)}
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-sm font-bold",
                score === pairs.length ? "text-green-500" : score >= pairs.length / 2 ? "text-yellow-500" : "text-destructive"
              )}
            >
              {score}/{pairs.length} {label("đúng", "correct")}
            </span>
            <button
              onClick={() => {
                setLinks({});
                setSubmitted(false);
                setActiveLeft(null);
              }}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> {label("Làm lại", "Retry")}
            </button>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          {pairs.map((pair, idx) => {
            const linked = links[idx];
            const correct = linked === idx;
            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => !submitted && setActiveLeft(idx)}
                disabled={submitted}
                className={cn(
                  "w-full min-h-11 text-left text-base leading-6 px-3 py-2.5 rounded-lg border transition-all",
                  submitted
                    ? correct
                      ? "border-green-500 bg-green-500/10 text-green-700"
                      : "border-destructive bg-destructive/10 text-destructive"
                    : activeLeft === idx
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/60"
                )}
              >
                <span className="font-bold text-sm text-secondary-foreground mr-2">{idx + 1}</span>
                {pair.left}
                {linked !== undefined && (
                  <span className="block text-sm leading-6 mt-1">
                    → {pairs[linked].right}
                    {submitted && (correct ? " ✅" : ` ❌ (${pairs[idx].right})`)}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
        <div className="space-y-2">
          {rightOrder.map((rightIdx) => {
            const used = usedRight.has(rightIdx);
            return (
              <button
                key={rightIdx}
                onClick={() => pickRight(rightIdx)}
                disabled={submitted || activeLeft === null}
                className={cn(
                  "w-full min-h-11 text-left text-base leading-6 px-3 py-2.5 rounded-lg border transition-all",
                  used ? "border-primary/40 bg-primary/5 text-muted-foreground" : "border-border bg-background text-foreground",
                  !submitted && activeLeft !== null && "hover:border-primary hover:bg-primary/10"
                )}
              >
                {pairs[rightIdx].right}
              </button>
            );
          })}
        </div>
      </div>

      {!submitted && Object.keys(links).length === pairs.length && (
        <button
          onClick={() => setSubmitted(true)}
          className="min-h-11 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:brightness-110 transition-all inline-flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" /> {label("Kiểm tra", "Check Answers")}
        </button>
      )}
      {!submitted && Object.keys(links).length < pairs.length && (
        <p className="text-sm leading-6 text-secondary-foreground flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          {label("Chọn một mục bên trái rồi chọn mục tương ứng bên phải.", "Pick an item on the left, then its match on the right.")}
        </p>
      )}
    </div>
  );
};

export default MatchingExercise;
