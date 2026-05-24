/**
 * DragDropQuiz — drag a label into the correct bucket.
 * Mobile-friendly: also supports tap-to-select then tap-bucket.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export type DDQuestion = {
  prompt: string;
  items: { id: string; label: string; bucket: string }[];
  buckets: { id: string; label: string }[];
};

type Props = {
  questions: DDQuestion[];
  onComplete?: (passed: boolean, score: number) => void;
};

const DragDropQuiz = ({ questions, onComplete }: Props) => {
  const [qIdx, setQIdx] = useState(0);
  const [placements, setPlacements] = useState<Record<string, string>>({}); // itemId -> bucketId
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[qIdx];

  const place = (itemId: string, bucketId: string) => {
    if (submitted) return;
    setPlacements((p) => ({ ...p, [itemId]: bucketId }));
    setSelected(null);
  };

  const handleSubmit = () => {
    const correct = q.items.filter((it) => placements[it.id] === it.bucket).length;
    const allCorrect = correct === q.items.length;
    setSubmitted(true);
    setTotalScore((s) => s + (allCorrect ? 1 : 0));
    setTimeout(() => {
      if (qIdx + 1 < questions.length) {
        setQIdx(qIdx + 1);
        setPlacements({});
        setSubmitted(false);
      } else {
        const finalScore = totalScore + (allCorrect ? 1 : 0);
        setFinished(true);
        onComplete?.(finalScore >= Math.ceil(questions.length * 0.66), finalScore);
      }
    }, 1400);
  };

  const allPlaced = q && q.items.every((it) => placements[it.id]);

  if (finished) {
    return (
      <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-2 border-emerald-400/40">
        <Trophy className="w-12 h-12 mx-auto text-amber-500 mb-2" />
        <h4 className="font-display font-bold text-lg">Hoàn thành Quiz! 🎉</h4>
        <p className="text-sm text-muted-foreground">
          Điểm: <b>{totalScore}/{questions.length}</b>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{q.prompt}</p>
        <span className="text-[11px] text-muted-foreground">Câu {qIdx + 1}/{questions.length}</span>
      </div>

      {/* Items pool */}
      <div className="flex flex-wrap gap-2">
        {q.items
          .filter((it) => !placements[it.id])
          .map((it) => (
            <button
              key={it.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
              onClick={() => setSelected(selected === it.id ? null : it.id)}
              className={`px-3 py-2 rounded-xl border-2 text-sm font-medium transition active:scale-95 ${
                selected === it.id
                  ? "border-purple-500 bg-purple-500/15 text-purple-700 dark:text-purple-300"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {it.label}
            </button>
          ))}
      </div>

      {/* Buckets */}
      <div className="grid sm:grid-cols-2 gap-3">
        {q.buckets.map((b) => {
          const placed = q.items.filter((it) => placements[it.id] === b.id);
          return (
            <div
              key={b.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = e.dataTransfer.getData("text/plain");
                if (id) place(id, b.id);
              }}
              onClick={() => selected && place(selected, b.id)}
              className="min-h-[110px] rounded-2xl border-2 border-dashed border-cyan-400/40 bg-cyan-500/5 p-3 cursor-pointer hover:bg-cyan-500/10 transition"
            >
              <div className="text-xs uppercase tracking-wider font-bold text-cyan-700 dark:text-cyan-300 mb-2">
                📦 {b.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {placed.map((it) => {
                  const isCorrect = submitted && it.bucket === b.id;
                  const isWrong = submitted && it.bucket !== b.id;
                  return (
                    <motion.div
                      key={it.id}
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1 ${
                        isCorrect
                          ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                          : isWrong
                          ? "bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300"
                          : "bg-background border-border"
                      }`}
                    >
                      {it.label}
                      {isCorrect && <Check className="w-3 h-3" />}
                      {isWrong && <X className="w-3 h-3" />}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        disabled={!allPlaced || submitted}
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
      >
        {submitted ? "Đang chấm..." : "Kiểm tra"}
      </Button>
    </div>
  );
};

export default DragDropQuiz;
