/**
 * @file PteReading.tsx
 * @description PTE Reading module — Fill in the Blanks (drag-drop) & Re-order Paragraphs.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Shuffle, ChevronRight, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import PteShell from "@/components/pte/PteShell";
import PteTimer from "@/components/pte/PteTimer";
import { Button } from "@/components/ui/button";
import { FILL_BLANK_BANK, REORDER_BANK, type PteFillBlank, type PteReorderItem } from "@/data/pteData";
import { similarityToBand, bandLabel } from "@/lib/pteScoring";
import { usePteProgress } from "@/hooks/usePteProgress";

type Mode = "fillBlank" | "reorder";

// Shuffle helper
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const PteReading = () => {
  const { recordCompletion } = usePteProgress();
  const [mode, setMode] = useState<Mode>("fillBlank");
  const [idx, setIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  // Fill-in-blank state: blank index -> selected option
  const [blanks, setBlanks] = useState<Record<number, string>>({});

  // Reorder state: ordered indices into paragraphs array
  const [order, setOrder] = useState<number[]>([]);
  const [shuffled, setShuffled] = useState<number[]>([]);

  const fbItem = FILL_BLANK_BANK[idx];
  const roItem = REORDER_BANK[idx];

  // Reset on change
  useEffect(() => {
    setSubmitted(false);
    setBlanks({});
    setTimerKey(k => k + 1);
    if (mode === "reorder" && roItem) {
      const indices = roItem.paragraphs.map((_, i) => i);
      const sh = shuffle(indices);
      // Ensure shuffle is not already correct
      const isCorrect = sh.every((v, i) => v === roItem.correctOrder[i]);
      setShuffled(isCorrect ? sh.reverse() : sh);
      setOrder([]);
    }
  }, [mode, idx, roItem]);

  // ============= FILL IN THE BLANKS =============
  const fbScore = useMemo(() => {
    if (!fbItem) return 0;
    let correct = 0;
    fbItem.answers.forEach((ans, i) => {
      if (blanks[i] === ans) correct++;
    });
    return correct / fbItem.answers.length;
  }, [blanks, fbItem]);

  const fbBand = similarityToBand(fbScore);

  const renderPassage = (item: PteFillBlank) => {
    const parts = item.passage.split(/\{\{(\d+)\}\}/);
    return (
      <p className="text-base leading-relaxed text-slate-800">
        {parts.map((part, i) => {
          if (i % 2 === 0) return <span key={i}>{part}</span>;
          const blankIdx = parseInt(part) - 1;
          const value = blanks[blankIdx];
          const isCorrect = submitted && value === item.answers[blankIdx];
          const isWrong = submitted && value !== item.answers[blankIdx];
          return (
            <select
              key={i}
              value={value || ""}
              disabled={submitted}
              onChange={(e) => setBlanks(prev => ({ ...prev, [blankIdx]: e.target.value }))}
              className={`mx-1 px-2 py-1 rounded border text-sm font-medium bg-white outline-none transition-colors ${
                isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-700" :
                isWrong ? "border-red-500 bg-red-50 text-red-700" :
                "border-[#003580]/30 focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/20"
              }`}
            >
              <option value="">— select —</option>
              {item.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          );
        })}
      </p>
    );
  };

  // ============= REORDER PARAGRAPHS =============
  const remaining = shuffled.filter(i => !order.includes(i));

  const addToOrder = (i: number) => {
    if (submitted) return;
    setOrder(prev => [...prev, i]);
  };
  const removeFromOrder = (pos: number) => {
    if (submitted) return;
    setOrder(prev => prev.filter((_, p) => p !== pos));
  };
  const moveUp = (pos: number) => {
    if (submitted || pos === 0) return;
    setOrder(prev => {
      const next = [...prev];
      [next[pos - 1], next[pos]] = [next[pos], next[pos - 1]];
      return next;
    });
  };
  const moveDown = (pos: number) => {
    if (submitted || pos >= order.length - 1) return;
    setOrder(prev => {
      const next = [...prev];
      [next[pos], next[pos + 1]] = [next[pos + 1], next[pos]];
      return next;
    });
  };

  const roScore = useMemo(() => {
    if (!roItem) return 0;
    let correct = 0;
    roItem.correctOrder.forEach((expected, i) => {
      if (order[i] === expected) correct++;
    });
    return correct / roItem.correctOrder.length;
  }, [order, roItem]);

  const roBand = similarityToBand(roScore);

  const handleSubmit = () => {
    if (mode === "fillBlank" && Object.keys(blanks).length < fbItem.answers.length) {
      toast.error("Please fill all blanks before submitting.");
      return;
    }
    if (mode === "reorder" && order.length < (roItem?.correctOrder.length || 0)) {
      toast.error("Please order all paragraphs before submitting.");
      return;
    }
    setSubmitted(true);
    const id = mode === "fillBlank" ? fbItem.id : roItem.id;
    const band = mode === "fillBlank" ? fbBand : roBand;
    recordCompletion(id, band);
    toast.success(`Submitted! Band ${band}`);
  };

  const handleNext = () => {
    const max = mode === "fillBlank" ? FILL_BLANK_BANK.length : REORDER_BANK.length;
    if (idx < max - 1) setIdx(idx + 1);
    else toast.success("🎉 You've completed all tasks in this set!");
  };

  const handleReset = () => {
    setSubmitted(false);
    setBlanks({});
    setOrder([]);
    if (mode === "reorder") setShuffled(shuffle(roItem.paragraphs.map((_, i) => i)));
    setTimerKey(k => k + 1);
  };

  const currentScore = mode === "fillBlank" ? fbScore : roScore;
  const currentBand = mode === "fillBlank" ? fbBand : roBand;

  return (
    <PteShell title="Reading" subtitle="Fill in the Blanks · Re-order Paragraphs">
      {/* Mode tabs */}
      <div className="flex gap-2 mb-4">
        {([
          { id: "fillBlank" as Mode, label: "Fill in the Blanks", icon: BookOpen },
          { id: "reorder" as Mode, label: "Re-order Paragraphs", icon: Shuffle },
        ]).map(t => (
          <button
            key={t.id}
            onClick={() => { setMode(t.id); setIdx(0); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              mode === t.id ? "bg-[#003580] text-white shadow-md" : "bg-white text-[#003580] border border-[#003580]/20 hover:bg-[#e8eef7]"
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      <motion.div
        key={`${mode}-${idx}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#003580]/15 shadow-sm p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span className="text-xs font-semibold text-[#003580] bg-[#e8eef7] px-2 py-1 rounded-full">
            {mode === "fillBlank" ? "Fill in the Blanks" : "Re-order Paragraphs"} · {idx + 1}/{mode === "fillBlank" ? FILL_BLANK_BANK.length : REORDER_BANK.length}
          </span>
          <PteTimer
            seconds={mode === "fillBlank" ? 120 : 150}
            label="Time"
            running={!submitted}
            resetKey={timerKey}
            onComplete={() => { toast.warning("Time's up!"); }}
          />
        </div>

        {mode === "fillBlank" && (
          <div className="bg-[#f4f7fb] border border-[#003580]/10 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-[#003580] font-semibold mb-3">Choose the best word for each blank</p>
            {renderPassage(fbItem)}
          </div>
        )}

        {mode === "reorder" && roItem && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Source pool */}
            <div>
              <p className="text-xs uppercase tracking-wide text-[#003580] font-semibold mb-2">📦 Source (click to add)</p>
              <div className="space-y-2 min-h-[200px] bg-slate-50 border border-dashed border-slate-300 rounded-lg p-3">
                {remaining.length === 0 && (
                  <p className="text-xs text-slate-400 italic text-center py-6">All paragraphs used</p>
                )}
                {remaining.map(i => (
                  <button
                    key={i}
                    onClick={() => addToOrder(i)}
                    disabled={submitted}
                    className="w-full text-left text-sm bg-white hover:bg-[#e8eef7] border border-[#003580]/20 rounded-lg p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {roItem.paragraphs[i]}
                  </button>
                ))}
              </div>
            </div>

            {/* Target order */}
            <div>
              <p className="text-xs uppercase tracking-wide text-[#003580] font-semibold mb-2">🎯 Your Order</p>
              <div className="space-y-2 min-h-[200px] bg-[#e8eef7] border-2 border-[#003580]/30 rounded-lg p-3">
                {order.length === 0 && (
                  <p className="text-xs text-slate-500 italic text-center py-6">Click paragraphs to add them here in order</p>
                )}
                {order.map((i, pos) => {
                  const isCorrect = submitted && roItem.correctOrder[pos] === i;
                  const isWrong = submitted && roItem.correctOrder[pos] !== i;
                  return (
                    <div
                      key={`${i}-${pos}`}
                      className={`flex items-start gap-2 text-sm bg-white rounded-lg p-3 border ${
                        isCorrect ? "border-emerald-500 bg-emerald-50" :
                        isWrong ? "border-red-500 bg-red-50" :
                        "border-[#003580]/20"
                      }`}
                    >
                      <span className="font-bold text-[#003580] min-w-[20px]">{pos + 1}.</span>
                      <span className="flex-1">{roItem.paragraphs[i]}</span>
                      {!submitted && (
                        <div className="flex flex-col gap-0.5">
                          <button onClick={() => moveUp(pos)} className="text-xs text-[#003580] hover:underline">↑</button>
                          <button onClick={() => moveDown(pos)} className="text-xs text-[#003580] hover:underline">↓</button>
                          <button onClick={() => removeFromOrder(pos)} className="text-xs text-red-500 hover:underline">✕</button>
                        </div>
                      )}
                      {submitted && (isCorrect ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-red-500" />)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 mt-4">
          {!submitted ? (
            <Button onClick={handleSubmit} className="bg-[#003580] hover:bg-[#002b66] text-white" size="sm">
              Submit
            </Button>
          ) : (
            <>
              <Button onClick={handleReset} variant="outline" size="sm">
                <RotateCcw size={14} className="mr-1" /> Retry
              </Button>
              <Button onClick={handleNext} className="bg-[#003580] hover:bg-[#002b66] text-white" size="sm">
                Next <ChevronRight size={14} className="ml-1" />
              </Button>
            </>
          )}
        </div>
      </motion.div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 bg-white rounded-2xl border border-[#003580]/15 shadow-sm p-5"
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl font-extrabold text-[#003580]">{currentBand}</div>
            <div>
              <div className={`text-sm font-semibold ${bandLabel(currentBand).color}`}>{bandLabel(currentBand).label}</div>
              <div className="text-xs text-slate-500">Accuracy: {Math.round(currentScore * 100)}%</div>
            </div>
          </div>
          {mode === "fillBlank" && (
            <div className="mt-3 text-sm text-slate-700">
              <strong>Correct answers:</strong> {fbItem.answers.join(", ")}
            </div>
          )}
        </motion.div>
      )}
    </PteShell>
  );
};

export default PteReading;
