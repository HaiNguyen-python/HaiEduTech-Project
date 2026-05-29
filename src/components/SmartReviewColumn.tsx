/**
 * SmartReviewColumn — "Góc Ôn Tập Thông Minh"
 *
 * Persistent right-hand sidebar (desktop) / floating drawer (mobile) that
 * surfaces vocabulary words a student last reviewed >= 14 days ago and
 * provides two micro-interactions:
 *   A) Flashcard mode (click card → flip → "Đã nhớ" resets reviewed_at)
 *   B) Compact 3-question multiple-choice quiz with local confetti
 *
 * Usage:
 *   <SmartReviewColumn
 *     subject="ielts"
 *     lang="en-US"
 *     lookupWord={(w) => allWords.find(x => x.word === w) ? {...} : null}
 *     allWordsForQuiz={allWords.map(w => ({ word: w.word, definition: w.definition.vi }))}
 *   />
 */
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, Volume2, Check, ChevronRight, X, Sparkles, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReviewQueue } from "@/hooks/useReviewQueue";
import { cn } from "@/lib/utils";

export interface ReviewWordDetails {
  word: string;
  phonetic?: string;
  definitionVi: string;
  definitionEn?: string;
}

export interface QuizCandidate {
  word: string;
  definition: string; // Vietnamese meaning used as the correct answer
}

interface SmartReviewColumnProps {
  subject: string;
  lang?: string; // BCP-47 for SpeechSynthesis (e.g. "en-US", "zh-CN")
  lookupWord: (word: string) => ReviewWordDetails | null;
  allWordsForQuiz?: QuizCandidate[];
  className?: string;
}

const speak = (text: string, lang = "en-US") => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = lang.startsWith("zh") ? 0.7 : 0.9;
    window.speechSynthesis.speak(u);
  } catch {/* noop */}
};

// Lightweight particle burst confined to the widget frame.
const Confetti = ({ trigger }: { trigger: number }) => {
  if (!trigger) return null;
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const dx = Math.cos(angle) * 70;
        const dy = Math.sin(angle) * 70;
        const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7"];
        return (
          <motion.span
            key={`${trigger}-${i}`}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
            style={{ backgroundColor: colors[i % colors.length] }}
          />
        );
      })}
    </div>
  );
};

// Single flippable flashcard for the queue.
const FlashCard = ({
  item,
  details,
  lang,
  onMarkReviewed,
}: {
  item: { word: string; daysOverdue: number };
  details: ReviewWordDetails | null;
  lang: string;
  onMarkReviewed: () => void;
}) => {
  const [flipped, setFlipped] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleMark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRemoving(true);
    setTimeout(onMarkReviewed, 280);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={removing ? { opacity: 0, x: 80 } : { opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.28 }}
      onClick={() => setFlipped(f => !f)}
      className="cursor-pointer rounded-xl border border-amber-200/70 dark:border-amber-900/40 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 p-3 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
          ⏳ {item.daysOverdue}d quá hạn
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); speak(item.word, lang); }}
          className="p-1 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
          aria-label={`Play ${item.word}`}
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
        </button>
      </div>
      <div className="text-lg font-bold text-foreground leading-tight">{item.word}</div>
      {details?.phonetic && (
        <div className="text-xs text-muted-foreground italic">{details.phonetic}</div>
      )}

      {/* Meaning: blurred by default, revealed on flip */}
      <div className="mt-2 min-h-[2.5rem] relative">
        <div
          className={cn(
            "text-sm text-foreground/90 transition-all duration-300",
            flipped ? "blur-0 opacity-100" : "blur-sm opacity-60 select-none"
          )}
        >
          {details?.definitionVi || "—"}
        </div>
        {!flipped && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
              Bấm để xem nghĩa
            </span>
          </div>
        )}
      </div>

      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex justify-end"
        >
          <Button
            size="sm"
            variant="default"
            onClick={handleMark}
            className="h-7 px-3 text-xs bg-emerald-600 hover:bg-emerald-700"
          >
            <Check className="w-3 h-3 mr-1" /> Đã nhớ
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

// Compact 3-question micro quiz pulled from the review queue.
const MicroQuiz = ({
  queueWords,
  allWords,
  lookupWord,
  lang,
  onCorrect,
}: {
  queueWords: string[];
  allWords: QuizCandidate[];
  lookupWord: (w: string) => ReviewWordDetails | null;
  lang: string;
  onCorrect: (word: string) => void;
}) => {
  const [round, setRound] = useState(0); // 0..2
  const [picked, setPicked] = useState<number | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);

  // Build a stable set of 3 questions from the current queue
  const questions = useMemo(() => {
    const pool = queueWords.slice(0, 10);
    const picks = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    return picks
      .map(word => {
        const correct = lookupWord(word);
        if (!correct) return null;
        const distractors = allWords
          .filter(c => c.word !== word && c.definition && c.definition !== correct.definitionVi)
          .sort(() => Math.random() - 0.5)
          .slice(0, 2)
          .map(c => c.definition);
        const options = [correct.definitionVi, ...distractors].sort(() => Math.random() - 0.5);
        return {
          word,
          correctIndex: options.indexOf(correct.definitionVi),
          options,
        };
      })
      .filter(Boolean) as { word: string; correctIndex: number; options: string[] }[];
    // Rebuild when queue head changes or queue length changes meaningfully
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queueWords.join("|"), allWords.length]);

  useEffect(() => {
    setRound(0);
    setPicked(null);
  }, [questions.length]);

  if (questions.length === 0) return null;
  const q = questions[round];
  if (!q) {
    return (
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 p-3 text-center">
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">🎉 Hoàn thành 3 câu!</p>
        <Button size="sm" variant="ghost" className="mt-1 h-7 text-xs" onClick={() => { setRound(0); setPicked(null); }}>
          <RefreshCcw className="w-3 h-3 mr-1" /> Thử lại
        </Button>
      </div>
    );
  }

  const handlePick = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.correctIndex) {
      setConfettiKey(k => k + 1);
      onCorrect(q.word);
      setTimeout(() => {
        setPicked(null);
        setRound(r => r + 1);
      }, 1100);
    } else {
      setTimeout(() => {
        setPicked(null);
        setRound(r => r + 1);
      }, 1100);
    }
  };

  return (
    <div className="relative rounded-xl border border-primary/20 bg-card p-3 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wide text-primary flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Thử thách nhanh
        </span>
        <span className="text-[10px] text-muted-foreground">Câu {round + 1}/3</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="text-base font-bold text-foreground">{q.word}</div>
        <button
          type="button"
          onClick={() => speak(q.word, lang)}
          className="p-1 rounded-full hover:bg-muted transition-colors"
          aria-label={`Play ${q.word}`}
        >
          <Volume2 className="w-3.5 h-3.5 text-primary" />
        </button>
      </div>
      <div className="space-y-1.5">
        {q.options.map((opt, i) => {
          const isCorrect = picked !== null && i === q.correctIndex;
          const isWrongPick = picked === i && i !== q.correctIndex;
          return (
            <button
              key={i}
              type="button"
              disabled={picked !== null}
              onClick={() => handlePick(i)}
              className={cn(
                "w-full text-left text-xs px-2.5 py-1.5 rounded-md border transition-all",
                "hover:border-primary/40 hover:bg-primary/5",
                isCorrect && "bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-semibold",
                isWrongPick && "bg-red-100 dark:bg-red-950/40 border-red-400 text-red-900 dark:text-red-200",
                picked === null && "border-border bg-background"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <Confetti trigger={confettiKey} />
    </div>
  );
};

const ReviewBody = ({
  subject,
  lang,
  lookupWord,
  allWordsForQuiz,
}: Required<Omit<SmartReviewColumnProps, "className" | "allWordsForQuiz">> & { allWordsForQuiz: QuizCandidate[] }) => {
  const { queue, loading, markReviewed } = useReviewQueue(subject);

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl bg-gradient-to-br from-primary/10 via-emerald-500/10 to-amber-500/10 border border-primary/20 p-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <BookOpenCheck className="w-4 h-4 text-primary" /> Góc Ôn Tập
          </h3>
          {queue.length > 0 && (
            <Badge className="bg-amber-500 hover:bg-amber-500 text-white text-[10px] px-2 py-0">
              {queue.length} từ cần ôn
            </Badge>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground leading-snug">
          Các từ bạn đã học hơn 2 tuần — ôn lại ngay để khắc sâu trí nhớ!
        </p>
      </div>

      {loading && (
        <div className="text-xs text-muted-foreground text-center py-4">Đang tải...</div>
      )}

      {!loading && queue.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center">
          <p className="text-2xl mb-1">🌱</p>
          <p className="text-xs text-muted-foreground">
            Tuyệt vời! Hiện chưa có từ nào quá hạn ôn tập.
          </p>
        </div>
      )}

      {!loading && queue.length > 0 && (
        <>
          <div
            className="flex flex-col gap-2 max-h-[55vh] overflow-y-auto pr-1"
            style={{ scrollbarWidth: "thin" }}
          >
            <AnimatePresence initial={false}>
              {queue.map(item => (
                <FlashCard
                  key={item.word}
                  item={item}
                  details={lookupWord(item.word)}
                  lang={lang}
                  onMarkReviewed={() => markReviewed(item.word)}
                />
              ))}
            </AnimatePresence>
          </div>

          {allWordsForQuiz.length > 3 && (
            <MicroQuiz
              queueWords={queue.map(q => q.word)}
              allWords={allWordsForQuiz}
              lookupWord={lookupWord}
              lang={lang}
              onCorrect={(word) => markReviewed(word)}
            />
          )}
        </>
      )}
    </div>
  );
};

const SmartReviewColumn = ({
  subject,
  lang = "en-US",
  lookupWord,
  allWordsForQuiz = [],
  className,
}: SmartReviewColumnProps) => {
  const isMobile = useIsMobile();
  const { queue } = useReviewQueue(subject);

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <button
            type="button"
            className="fixed bottom-24 right-4 z-40 flex items-center gap-1.5 rounded-full bg-gradient-to-br from-primary to-emerald-500 text-white shadow-lg px-3 py-2.5 active:scale-95 transition-transform"
            aria-label="Open smart review"
          >
            <RefreshCcw className="w-4 h-4" />
            <span className="text-xs font-bold">Ôn tập</span>
            {queue.length > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center bg-amber-400 text-amber-950 text-[10px] font-extrabold rounded-full min-w-[18px] h-[18px] px-1">
                {queue.length}
              </span>
            )}
          </button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>🔄 Góc Ôn Tập Thông Minh</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">
            <ReviewBody
              subject={subject}
              lang={lang}
              lookupWord={lookupWord}
              allWordsForQuiz={allWordsForQuiz}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <aside className={cn("w-80 shrink-0 hidden xl:block", className)}>
      <div className="sticky top-24">
        <ReviewBody
          subject={subject}
          lang={lang}
          lookupWord={lookupWord}
          allWordsForQuiz={allWordsForQuiz}
        />
      </div>
    </aside>
  );
};

export default SmartReviewColumn;
