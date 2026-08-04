/**
 * SandboxBonusGames - two compact, reusable mini-games used across every
 * AI Academy sandbox so each lesson always has 3+ hands-on activities.
 *
 *  • TrueFalseRapid - 5-question lightning round. +10 points per correct answer.
 *  • MatchPairs     - flip-cards memory game matching concepts to examples.
 *
 * Both are data-driven (pass topic-specific content in via props) and live
 * 100% on the client.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, RefreshCcw, Trophy, Sparkles, CheckCircle2, XCircle, Layers, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  playSuccessSound,
  playFailureSound,
  bounceVariant,
} from "@/lib/aiAcademyFx";

/* ───────────────────────────── True / False Rapid ───────────────────────────── */

export type TFItem = { q: string; a: boolean; why?: string };

export const TrueFalseRapid = ({
  title,
  accent = "from-amber-500 to-orange-600",
  border = "border-amber-400/40",
  items,
}: {
  title?: string;
  accent?: string;
  border?: string;
  items: TFItem[];
}) => {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const cur = items[idx];
  const headerTitle = title ?? t("⚡ True / False Lightning", "⚡ True / False Lightning");

  const pick = (ans: boolean) => {
    if (picked !== null) return;
    setPicked(ans);
    if (ans === cur.a) {
      setScore((s) => s + 10);
      playSuccessSound();
    } else {
      playFailureSound();
    }
    // No auto-advance - user reads explanation, then clicks Next.
  };

  const goNext = () => {
    if (picked === null) return;
    if (idx + 1 >= items.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const reset = () => {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  const isLast = idx + 1 >= items.length;

  return (
    <div className={`rounded-2xl border-2 ${border} bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-3 space-y-2`}>
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-600" />
        <h4 className="font-bold text-sm uppercase tracking-wide text-amber-700 dark:text-amber-300">
          {headerTitle}
        </h4>
        <span className="ml-auto text-xs font-bold text-amber-700 dark:text-amber-300">
          {t("Score", "Score")}: {score}
        </span>
      </div>

      {!done ? (
        <>
          <div className="text-[11px] text-muted-foreground">
            {t("Question", "Sentence")} {idx + 1} / {items.length}
          </div>
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-card border border-border text-sm font-semibold text-foreground min-h-[60px]"
          >
            {cur.q}
          </motion.div>

          {picked !== null && cur.why && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-xs p-2 rounded-lg ${
                picked === cur.a
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-400/40"
                  : "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-400/40"
              }`}
            >
              {picked === cur.a ? t("✅ Correct - ", "✅ Correct - ") : t("❌ Not quite - ", "❌ Not quite - ")}
              {cur.why}
            </motion.div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              disabled={picked !== null}
              onClick={() => pick(true)}
              className={`min-h-[48px] rounded-xl text-sm font-extrabold border-2 transition active:scale-95 ${
                picked === true && cur.a
                  ? "bg-emerald-500 border-emerald-300 text-white"
                  : picked === true
                  ? "bg-rose-500 border-rose-300 text-white"
                  : "bg-emerald-500/15 border-emerald-400/60 text-emerald-700 dark:text-emerald-200 hover:bg-emerald-500/25"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 inline mr-1" /> {t("True", "True")}
            </button>
            <button
              disabled={picked !== null}
              onClick={() => pick(false)}
              className={`min-h-[48px] rounded-xl text-sm font-extrabold border-2 transition active:scale-95 ${
                picked === false && !cur.a
                  ? "bg-emerald-500 border-emerald-300 text-white"
                  : picked === false
                  ? "bg-rose-500 border-rose-300 text-white"
                  : "bg-rose-500/15 border-rose-400/60 text-rose-700 dark:text-rose-200 hover:bg-rose-500/25"
              }`}
            >
              <XCircle className="w-4 h-4 inline mr-1" /> {t("False", "False")}
            </button>
          </div>

          {picked !== null && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end pt-1"
            >
              <Button
                onClick={goNext}
                size="sm"
                className={`bg-gradient-to-r ${accent} text-white font-bold`}
              >
                {isLast ? t("See results", "See results") : t("Next question", "Next question")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-4 space-y-2"
        >
          <Trophy className="w-10 h-10 mx-auto text-amber-500" />
          <div className="text-2xl font-black text-amber-700 dark:text-amber-300">
            {score} / {items.length * 10} {t("points", "points")}
          </div>
          <p className="text-sm text-muted-foreground">
            {score === items.length * 10
              ? t("🌟 Perfect! You are a master!", "🌟 Perfect! You are a master!")
              : score >= items.length * 6
              ? t("👏 Well done - replay to get full marks!", "👏 Well done - replay to get full marks!")
              : t("💪 Review the theory and try again.", "💪 Review the theory and try again.")}
          </p>
          <Button onClick={reset} className={`bg-gradient-to-r ${accent} text-white`}>
            <RefreshCcw className="w-4 h-4 mr-1" /> {t("Play again", "Play again")}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

/* ──────────────────────────────── Match Pairs ──────────────────────────────── */

export type Pair = { a: string; b: string };

type Card = { id: string; pairKey: string; text: string; side: "a" | "b" };

export const MatchPairs = ({
  title,
  accent = "from-violet-500 to-fuchsia-600",
  border = "border-violet-400/40",
  pairs,
}: {
  title?: string;
  accent?: string;
  border?: string;
  pairs: Pair[];
}) => {
  const { t } = useLanguage();
  const headerTitle = title ?? t("🧩 Match the pairs", "🧩 Match the pairs");
  const [round, setRound] = useState(0);
  const cards = useMemo<Card[]>(() => {
    const list: Card[] = [];
    pairs.forEach((p, i) => {
      list.push({ id: `${i}-a`, pairKey: `p${i}`, text: p.a, side: "a" });
      list.push({ id: `${i}-b`, pairKey: `p${i}`, text: p.b, side: "b" });
    });
    return list.sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, pairs]);

  const [selected, setSelected] = useState<Card | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<Set<string>>(new Set());

  const clickCard = (c: Card) => {
    if (matched.has(c.pairKey)) return;
    if (selected?.id === c.id) return;
    if (!selected) {
      setSelected(c);
      return;
    }
    if (selected.pairKey === c.pairKey && selected.side !== c.side) {
      const next = new Set(matched);
      next.add(c.pairKey);
      setMatched(next);
      setSelected(null);
      playSuccessSound();
    } else {
      const w = new Set<string>([selected.id, c.id]);
      setWrong(w);
      playFailureSound();
      window.setTimeout(() => {
        setWrong(new Set());
        setSelected(null);
      }, 700);
    }
  };

  const done = matched.size === pairs.length;
  const reset = () => {
    setMatched(new Set());
    setWrong(new Set());
    setSelected(null);
    setRound((r) => r + 1);
  };

  return (
    <div className={`rounded-2xl border-2 ${border} bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-3 space-y-2`}>
      <div className="flex items-center gap-2">
        <Layers className="w-4 h-4 text-violet-600" />
        <h4 className="font-bold text-sm uppercase tracking-wide text-violet-700 dark:text-violet-300">
          {headerTitle}
        </h4>
        <span className="ml-auto text-xs font-bold text-violet-700 dark:text-violet-300">
          {matched.size} / {pairs.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {cards.map((c) => {
          const isMatched = matched.has(c.pairKey);
          const isSel = selected?.id === c.id;
          const isWrong = wrong.has(c.id);
          return (
            <motion.button
              key={c.id}
              animate={isMatched ? bounceVariant : undefined}
              onClick={() => clickCard(c)}
              disabled={isMatched}
              className={`min-h-[58px] px-3 py-2 rounded-xl text-[13px] font-semibold border-2 transition text-left active:scale-95 ${
                isMatched
                  ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-100 opacity-80"
                  : isWrong
                  ? "border-rose-500 bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-100"
                  : isSel
                  ? "border-violet-500 bg-violet-200/70 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100"
                  : "border-border bg-card hover:border-violet-400 text-foreground"
              }`}
            >
              {c.text}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between gap-2 p-2 rounded-lg bg-emerald-500/15 border border-emerald-400/40"
          >
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-200 flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> {t(`Perfect! Matched all ${pairs.length} pairs.`, `Perfect! Matched all ${pairs.length} pairs.`)}
            </span>
            <Button size="sm" onClick={reset} className={`bg-gradient-to-r ${accent} text-white`}>
              <RefreshCcw className="w-3.5 h-3.5 mr-1" /> {t("New round", "New round")}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!done && (
        <button
          onClick={reset}
          className="text-[11px] text-violet-600 hover:underline"
        >
          {t("↻ Shuffle deck", "↻ Shuffle deck")}
        </button>
      )}
    </div>
  );
};

/* ─────────────────────── Convenience: bundle for one topic ─────────────────── */

export const BonusGames = ({
  tfItems,
  matchPairs,
  accent,
  border,
}: {
  tfItems: TFItem[];
  matchPairs: Pair[];
  accent?: string;
  border?: string;
}) => (
  <div className="space-y-4 sm:space-y-5 pt-4 mt-3 border-t-4 border-border">
    <TrueFalseRapid items={tfItems} accent={accent} border={border} />
    <MatchPairs pairs={matchPairs} accent={accent} border={border} />
  </div>
);

export default BonusGames;
