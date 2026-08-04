/**
 * ScenarioQuiz - real-life situation; student picks the right action.
 * Each option carries its own feedback (good / risky / wrong) so students
 * learn the *reasoning*, not just the right letter.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, AlertTriangle, X, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  playSuccessSound,
  playFailureSound,
  bounceVariant,
  shakeVariant,
} from "@/lib/aiAcademyFx";

export type ScenarioChoice = {
  label: string;
  verdict: "good" | "risky" | "wrong";
  feedback: string;
};

export type ScenarioQuestion = {
  situation: string;
  prompt: string;
  choices: ScenarioChoice[];
};

type Props = {
  questions: ScenarioQuestion[];
  onComplete?: (passed: boolean, score: number) => void;
};

const verdictMeta: Record<
  ScenarioChoice["verdict"],
  { Icon: typeof Sparkles; ring: string; bg: string; label: string; tone: string }
> = {
  good: {
    Icon: Sparkles,
    ring: "border-emerald-500",
    bg: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    label: "Smart choice!",
    tone: "text-emerald-700 dark:text-emerald-300",
  },
  risky: {
    Icon: AlertTriangle,
    ring: "border-amber-500",
    bg: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    label: "A bit risky...",
    tone: "text-amber-700 dark:text-amber-300",
  },
  wrong: {
    Icon: X,
    ring: "border-rose-500",
    bg: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
    label: "Not quite right!",
    tone: "text-rose-700 dark:text-rose-300",
  },
};

const ScenarioQuiz = ({ questions, onComplete }: Props) => {
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [pulse, setPulse] = useState<"ok" | "no" | null>(null);

  const q = questions[qIdx];

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    const v = q.choices[idx].verdict;
    if (v === "good") {
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
      <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-violet-500/10 border-2 border-teal-400/40">
        <Trophy className="w-10 h-10 mx-auto text-amber-500 mb-2" />
        <h4 className="font-display font-bold text-lg">Scenarios complete! 🌟</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Correct choices: <b>{score}/{questions.length}</b>
        </p>
        <Button size="sm" variant="outline" onClick={reset}>
          <RotateCcw className="w-3 h-3 mr-1" /> Try again
        </Button>
      </div>
    );
  }

  const pickedChoice = picked !== null ? q.choices[picked] : null;
  const pickedMeta = pickedChoice ? verdictMeta[pickedChoice.verdict] : null;

  return (
    <motion.div
      className="space-y-4"
      animate={pulse === "ok" ? bounceVariant : pulse === "no" ? shakeVariant : {}}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          🎬 Scenario {qIdx + 1}/{questions.length}
        </span>
      </div>

      <div className="rounded-2xl border-2 border-teal-400/40 bg-gradient-to-br from-teal-500/10 to-violet-500/10 p-4">
        <p className="text-sm leading-relaxed mb-2">{q.situation}</p>
        <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">→ {q.prompt}</p>
      </div>

      <div className="space-y-2">
        {q.choices.map((c, i) => {
          const isPicked = picked === i;
          const meta = verdictMeta[c.verdict];
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={picked !== null}
              className={`w-full min-h-12 px-3 py-3 rounded-xl border-2 text-sm text-left font-medium transition active:scale-[0.98] flex items-start gap-2 ${
                isPicked
                  ? `${meta.ring} ${meta.bg}`
                  : picked !== null
                  ? "border-border bg-muted/30 text-muted-foreground"
                  : "border-border bg-card hover:border-teal-400/60 hover:bg-teal-500/5"
              }`}
            >
              <span className="font-bold text-teal-500 shrink-0">{String.fromCharCode(65 + i)}.</span>
              <span className="flex-1">{c.label}</span>
            </button>
          );
        })}
      </div>

      {pickedChoice && pickedMeta && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border-2 p-3 ${pickedMeta.ring} bg-card`}
        >
          <div className={`flex items-center gap-2 mb-1 font-bold text-sm ${pickedMeta.tone}`}>
            <pickedMeta.Icon className="w-4 h-4" />
            {pickedMeta.label}
          </div>
          <p className="text-xs leading-relaxed text-foreground/90">{pickedChoice.feedback}</p>
          <Button
            size="sm"
            onClick={next}
            className="mt-3 w-full bg-gradient-to-r from-teal-500 to-violet-500 text-white"
          >
            {qIdx + 1 < questions.length ? "Next scenario →" : "See results"}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ScenarioQuiz;
