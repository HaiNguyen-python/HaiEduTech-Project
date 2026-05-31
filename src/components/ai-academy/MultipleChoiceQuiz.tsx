/**
 * MultipleChoiceQuiz - 1 prompt, 4 options, post-answer explanation.
 * Mobile-friendly buttons (min-h 48px). Plays juicy FX on each pick.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  playSuccessSound,
  playFailureSound,
  bounceVariant,
  shakeVariant,
} from "@/lib/aiAcademyFx";

export type MCQuestion = {
  prompt: string;
  options: string[];
  answer: number; // index of correct option
  explanation: string;
};

type Props = {
  questions: MCQuestion[];
  onComplete?: (passed: boolean, score: number) => void;
};

const MultipleChoiceQuiz = ({ questions, onComplete }: Props) => {
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [pulse, setPulse] = useState<"ok" | "no" | null>(null);

  const q = questions[qIdx];

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) {
      setScore((s) => s + 1);
      playSuccessSound();
      setPulse("ok");
    } else {
      playFailureSound();
      setPulse("no");
    }
  };

  const next = () => {
    setPulse(null);
    if (qIdx + 1 < questions.length) {
      setQIdx(qIdx + 1);
      setPicked(null);
    } else {
      setFinished(true);
      onComplete?.(score >= Math.ceil(questions.length * 0.66), score);
    }
  };

  const reset = () => {
    setQIdx(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
    setPulse(null);
  };

  if (finished) {
    return (
      <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border-2 border-indigo-400/40">
        <Trophy className="w-10 h-10 mx-auto text-amber-500 mb-2" />
        <h4 className="font-display font-bold text-lg">Hoàn thành! 🎉</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Điểm: <b>{score}/{questions.length}</b>
        </p>
        <Button size="sm" variant="outline" onClick={reset}>
          <RotateCcw className="w-3 h-3 mr-1" /> Làm lại
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      animate={pulse === "ok" ? bounceVariant : pulse === "no" ? shakeVariant : {}}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold leading-relaxed">{q.prompt}</p>
        <span className="text-[11px] text-muted-foreground whitespace-nowrap ml-2">
          {qIdx + 1}/{questions.length}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-2.5">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = picked !== null && i === q.answer;
          const isWrongPick = isPicked && i !== q.answer;
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={picked !== null}
              className={`min-h-12 px-3 py-3 rounded-xl border-2 text-sm text-left font-medium transition active:scale-[0.98] flex items-start gap-2 ${
                isCorrect
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                  : isWrongPick
                  ? "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300"
                  : picked !== null
                  ? "border-border bg-muted/30 text-muted-foreground"
                  : "border-border bg-card hover:border-indigo-400/60 hover:bg-indigo-500/5"
              }`}
            >
              <span className="font-bold text-indigo-500 shrink-0">{String.fromCharCode(65 + i)}.</span>
              <span className="flex-1">{opt}</span>
              {isCorrect && <Check className="w-4 h-4 shrink-0" />}
              {isWrongPick && <X className="w-4 h-4 shrink-0" />}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border-2 border-indigo-400/40 bg-indigo-500/5 p-3"
        >
          <p className="text-xs leading-relaxed">
            <span className="font-bold text-indigo-700 dark:text-indigo-300">💬 Giải thích: </span>
            {q.explanation}
          </p>
          <Button
            size="sm"
            onClick={next}
            className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
          >
            {qIdx + 1 < questions.length ? "Câu tiếp →" : "Xem kết quả"}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MultipleChoiceQuiz;
