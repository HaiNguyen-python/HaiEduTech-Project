// Interactive sentence reordering exercise component
import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, XCircle, RotateCcw, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReorderItem {
  scrambled: string[];
  correct: string;
  correctEn?: string;
}

interface Props {
  instruction: string;
  instructionEn: string;
  items: ReorderItem[];
  forceEnglish?: boolean;
}

const SentenceReorderExercise = ({ instruction, instructionEn, items, forceEnglish = false }: Props) => {
  const { t } = useLanguage();
  const [selectedWords, setSelectedWords] = useState<Record<number, string[]>>(
    () => Object.fromEntries(items.map((_, i) => [i, []]))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleWordClick = (itemIdx: number, word: string) => {
    if (submitted) return;
    setSelectedWords(prev => {
      const current = prev[itemIdx] || [];
      if (current.includes(word)) {
        return { ...prev, [itemIdx]: current.filter(w => w !== word) };
      }
      return { ...prev, [itemIdx]: [...current, word] };
    });
  };

  const handleSubmit = () => setSubmitted(true);

  const handleReset = () => {
    setSelectedWords(Object.fromEntries(items.map((_, i) => [i, []])));
    setSubmitted(false);
  };

  const isCorrect = (itemIdx: number) => {
    const userSentence = (selectedWords[itemIdx] || []).join(" ");
    const expected = items[itemIdx].correctEn || items[itemIdx].correct;
    return userSentence.toLowerCase() === expected.toLowerCase();
  };

  const score = items.reduce((acc, _, i) => acc + (isCorrect(i) ? 1 : 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Shuffle className="w-4 h-4 text-primary" />
          {forceEnglish ? instructionEn : t(instruction, instructionEn)}
        </h3>
        {submitted && (
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-sm font-bold",
              score === items.length ? "text-green-500" : score >= items.length / 2 ? "text-yellow-500" : "text-destructive"
            )}>
              {score}/{items.length} {forceEnglish ? "correct" : t("đúng", "correct")}
            </span>
            <button onClick={handleReset} className="text-sm text-primary hover:underline flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> {forceEnglish ? "Retry" : t("Làm lại", "Retry")}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-5">
        {items.map((item, idx) => {
          const selected = selectedWords[idx] || [];
          const remaining = item.scrambled.filter(w => !selected.includes(w));
          const correct = isCorrect(idx);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-xl p-4 space-y-3"
            >
              <span className="text-xs font-medium text-muted-foreground">{forceEnglish ? "Sentence" : t("Câu", "Sentence")} {idx + 1}</span>

              {/* Selected words - the answer area */}
              <div className={cn(
                "min-h-[44px] rounded-lg border-2 border-dashed p-2 flex flex-wrap gap-2 transition-colors",
                submitted
                  ? correct
                    ? "border-green-500/50 bg-green-500/5"
                    : "border-destructive/50 bg-destructive/5"
                  : selected.length > 0
                    ? "border-primary/50 bg-primary/5"
                    : "border-border"
              )}>
                {selected.length === 0 && (
                  <span className="text-xs text-muted-foreground italic py-1">{forceEnglish ? "Click the words below to build the sentence." : t("Nhấn vào các từ bên dưới để sắp xếp...", "Click words below to arrange...")}</span>
                )}
                <AnimatePresence>
                  {selected.map((word, wi) => (
                    <motion.button
                      key={`${word}-${wi}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      onClick={() => handleWordClick(idx, word)}
                      disabled={submitted}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                        submitted
                          ? correct
                            ? "bg-green-500/20 text-green-700 border border-green-500/30"
                            : "bg-destructive/10 text-destructive border border-destructive/30"
                          : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                      )}
                    >
                      {word}
                    </motion.button>
                  ))}
                </AnimatePresence>
                {submitted && (
                  <span className="ml-auto self-center">
                    {correct ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-destructive" />}
                  </span>
                )}
              </div>

              {/* Available words */}
              <div className="flex flex-wrap gap-2">
                {remaining.map((word, wi) => (
                  <motion.button
                    key={`${word}-avail-${wi}`}
                    layout
                    onClick={() => handleWordClick(idx, word)}
                    disabled={submitted}
                    className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-all"
                  >
                    {word}
                  </motion.button>
                ))}
              </div>

              {/* Show correct answer if wrong */}
              {submitted && !correct && (
                <p className="text-xs text-muted-foreground">
                      ✅ {forceEnglish ? "Answer" : t("Đáp án", "Answer")}: <span className="font-semibold text-primary">{item.correctEn || item.correct}</span>
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {!submitted && items.some((_, i) => (selectedWords[i] || []).length > 0) && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
        >
          {forceEnglish ? "Check Answers" : t("Kiểm tra", "Check Answers")}
        </motion.button>
      )}
    </div>
  );
};

export default SentenceReorderExercise;
