/**
 * SandboxMiniActivity — 2 reusable mini-activities for AI Academy sandboxes.
 *
 *  • ChipFilter    — toggle chips, watch a metric react in real time
 *  • BestMatchPick — pair every prompt with the correct option (multi-pair quiz)
 *
 * Both are 100% client-side, data-driven, and animated. Drop into any sandbox
 * to fill empty whitespace and give students one more hands-on activity.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle, RefreshCcw, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playSuccessSound, playFailureSound, bounceVariant } from "@/lib/aiAcademyFx";

/* ─────────────────────────── ChipFilter ─────────────────────────── */

export type ChipOption = { id: string; label: string; weight: number };

export const ChipFilter = ({
  title,
  hint,
  options,
  baseline = 50,
  positive = true,
  goal,
  goodLabel = "Tốt",
  badLabel = "Cảnh báo",
  accent = "from-emerald-500 to-teal-600",
  border = "border-emerald-400/40",
  metricLabel = "Điểm fairness",
}: {
  title: string;
  hint?: string;
  options: ChipOption[];
  baseline?: number;
  /** If true, each selected chip ADDS its weight; if false, each chip SUBTRACTS. */
  positive?: boolean;
  /** Target threshold (0-100) to be "good". */
  goal: number;
  goodLabel?: string;
  badLabel?: string;
  accent?: string;
  border?: string;
  metricLabel?: string;
}) => {
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const score = useMemo(() => {
    let s = baseline;
    options.forEach((o) => {
      if (picked.has(o.id)) s += positive ? o.weight : -o.weight;
    });
    return Math.max(0, Math.min(100, Math.round(s)));
  }, [picked, options, baseline, positive]);

  const passed = positive ? score >= goal : score >= goal;
  const toggle = (id: string) => {
    setPicked((p) => {
      const next = new Set(p);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    playSuccessSound();
  };

  return (
    <div className={`rounded-2xl border-2 ${border} bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-3 space-y-2`}>
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-600" />
        <h4 className="font-bold text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          {title}
        </h4>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}

      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = picked.has(o.id);
          return (
            <button
              key={o.id}
              onClick={() => toggle(o.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition active:scale-95 ${
                on
                  ? `bg-gradient-to-r ${accent} text-white border-transparent shadow`
                  : "bg-card text-foreground border-border hover:border-emerald-400/60"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{metricLabel}</span>
          <span className={`font-black text-lg ${passed ? "text-emerald-600" : "text-rose-600"}`}>
            {score}%
          </span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            animate={{ width: `${score}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`h-full rounded-full ${passed ? "bg-gradient-to-r from-emerald-400 to-teal-500" : "bg-gradient-to-r from-rose-400 to-orange-500"}`}
          />
        </div>
        <motion.div
          key={passed ? "ok" : "bad"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-[11px] font-bold flex items-center gap-1 ${passed ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}
        >
          {passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
          {passed ? goodLabel : badLabel}
        </motion.div>
      </div>
    </div>
  );
};

/* ─────────────────────────── BestMatchPick ─────────────────────────── */

export type MatchItem = { prompt: string; correctId: string };

export const BestMatchPick = ({
  title,
  hint,
  items,
  options,
  accent = "from-indigo-500 to-purple-600",
  border = "border-indigo-400/40",
}: {
  title: string;
  hint?: string;
  items: MatchItem[];
  options: { id: string; label: string }[];
  accent?: string;
  border?: string;
}) => {
  const [round, setRound] = useState(0);
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);

  const score = useMemo(
    () => items.reduce((s, it, i) => s + (picks[i] === it.correctId ? 1 : 0), 0),
    [picks, items],
  );

  const pick = (i: number, id: string) => {
    if (revealed) return;
    setPicks((p) => ({ ...p, [i]: id }));
  };

  const check = () => {
    setRevealed(true);
    const right = items.reduce((s, it, i) => s + (picks[i] === it.correctId ? 1 : 0), 0);
    right === items.length ? playSuccessSound() : playFailureSound();
  };

  const reset = () => {
    setPicks({});
    setRevealed(false);
    setRound((r) => r + 1);
  };

  const allPicked = Object.keys(picks).length === items.length;

  return (
    <div className={`rounded-2xl border-2 ${border} bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-3 space-y-2`} key={round}>
      <div className="flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-indigo-600" />
        <h4 className="font-bold text-sm uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          {title}
        </h4>
        <span className="ml-auto text-xs font-bold text-indigo-700 dark:text-indigo-300">
          {revealed ? `${score} / ${items.length}` : `${Object.keys(picks).length} / ${items.length}`}
        </span>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}

      <div className="space-y-2">
        {items.map((it, i) => {
          const sel = picks[i];
          const isRight = revealed && sel === it.correctId;
          const isWrong = revealed && sel && sel !== it.correctId;
          return (
            <motion.div
              key={i}
              animate={isRight ? bounceVariant : undefined}
              className={`p-3 rounded-xl border-2 ${
                isRight
                  ? "border-emerald-500 bg-emerald-500/10"
                  : isWrong
                  ? "border-rose-500 bg-rose-500/10"
                  : "border-border bg-card"
              }`}
            >
              <div className="text-sm font-semibold text-foreground mb-2">{it.prompt}</div>
              <div className="flex flex-wrap gap-1.5">
                {options.map((o) => {
                  const isSel = sel === o.id;
                  const isCorrectAnswer = revealed && o.id === it.correctId;
                  return (
                    <button
                      key={o.id}
                      onClick={() => pick(i, o.id)}
                      disabled={revealed}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold border-2 transition active:scale-95 ${
                        isCorrectAnswer
                          ? "bg-emerald-500 text-white border-emerald-300"
                          : isSel && isWrong
                          ? "bg-rose-500 text-white border-rose-300"
                          : isSel
                          ? `bg-gradient-to-r ${accent} text-white border-transparent`
                          : "bg-card text-foreground border-border hover:border-indigo-400/60"
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-sm font-bold p-2 rounded-lg ${
              score === items.length
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 border border-emerald-400/40"
                : "bg-amber-500/15 text-amber-700 dark:text-amber-200 border border-amber-400/40"
            }`}
          >
            {score === items.length
              ? "🌟 Hoàn hảo! Bạn đã hiểu rất rõ phần này."
              : `Đúng ${score}/${items.length}. Xem lại đáp án đúng (xanh) rồi thử lại nhé!`}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        {!revealed ? (
          <Button
            disabled={!allPicked}
            onClick={check}
            className={`flex-1 bg-gradient-to-r ${accent} text-white`}
          >
            <CheckCircle2 className="w-4 h-4 mr-1" /> Chấm điểm
          </Button>
        ) : (
          <Button onClick={reset} className={`flex-1 bg-gradient-to-r ${accent} text-white`}>
            <RefreshCcw className="w-4 h-4 mr-1" /> Thử lại
          </Button>
        )}
      </div>
    </div>
  );
};
