import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Loader2, ChevronLeft, ChevronRight, Sparkles, RotateCw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { playVietnameseTts, stopVietnameseTts } from "@/lib/vietnameseTts";

export interface FlashcardItem {
  vi: string;
  en?: string;
  emoji: string;
  example?: string;
  exampleEn?: string;
}

interface KidsFlashcardProps {
  items: FlashcardItem[];
  title?: string;
}

const KidsFlashcard = ({ items, title }: KidsFlashcardProps) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<Set<number>>(new Set());
  const [celebrate, setCelebrate] = useState(false);

  const current = items[index];
  const total = items.length;

  // Reset flip when navigating
  useEffect(() => {
    setFlipped(false);
  }, [index]);

  // Cleanup audio on unmount
  useEffect(() => () => stopVietnameseTts(), []);

  const speak = async (text: string) => {
    if (loading) {
      stopVietnameseTts();
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await playVietnameseTts(text);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    stopVietnameseTts();
    setIndex((i) => (i + 1) % total);
  };

  const handlePrev = () => {
    stopVietnameseTts();
    setIndex((i) => (i - 1 + total) % total);
  };

  const toggleStar = () => {
    setStars((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 1200);
      }
      return next;
    });
  };

  if (!current) return null;
  const starred = stars.has(index);

  return (
    <div className="bg-gradient-to-br from-sky-50 via-pink-50 to-amber-50 dark:from-sky-950/40 dark:via-pink-950/30 dark:to-amber-950/30 border-2 border-primary/20 rounded-2xl p-4 sm:p-6 shadow-lg">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {title}
          </h4>
          <Badge variant="secondary" className="text-sm font-bold">
            {index + 1} / {total}
          </Badge>
        </div>
      )}

      {/* Flashcard with 3D flip */}
      <div className="relative" style={{ perspective: "1200px" }}>
        <motion.div
          key={index}
          className="relative w-full h-72 sm:h-80 cursor-pointer select-none"
          onClick={() => setFlipped((f) => !f)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT — Big emoji + Vietnamese word */}
          <div
            className="absolute inset-0 bg-white dark:bg-card rounded-2xl shadow-xl border-4 border-pink-200 dark:border-pink-900 flex flex-col items-center justify-center p-4 sm:p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <motion.div
              key={`emoji-${index}`}
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="text-[7rem] sm:text-[9rem] leading-none mb-2"
            >
              {current.emoji}
            </motion.div>
            <div className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-wide text-center">
              {current.vi}
            </div>
            <div className="mt-3 text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5" />
              {t("Chạm để xem nghĩa", "Tap to see meaning")}
            </div>
          </div>

          {/* BACK — English meaning + example */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-950/40 dark:to-sky-950/40 rounded-2xl shadow-xl border-4 border-emerald-300 dark:border-emerald-800 flex flex-col items-center justify-center p-5 sm:p-6 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="text-5xl sm:text-6xl mb-3">{current.emoji}</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
              {current.en}
            </div>
            <div className="text-lg sm:text-xl font-semibold text-foreground mb-3">
              {current.vi}
            </div>
            {current.example && (
              <div className="bg-white/70 dark:bg-background/40 rounded-xl p-3 sm:p-4 mt-2 max-w-md">
                <p className="text-base sm:text-lg font-medium text-foreground italic leading-snug">
                  "{current.example}"
                </p>
                {current.exampleEn && (
                  <p className="text-sm text-muted-foreground italic mt-1.5">
                    "{current.exampleEn}"
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Celebration sparkles */}
        <AnimatePresence>
          {celebrate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none text-7xl"
            >
              ⭐✨🌟
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audio + Star controls */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4">
        <Button
          type="button"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            speak(current.vi);
          }}
          className="h-14 px-6 text-base sm:text-lg font-bold gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md"
          aria-label={t("Nghe phát âm", "Listen")}
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Volume2 className="w-6 h-6" />}
          {t("Nghe", "Listen")}
        </Button>

        {current.example && (
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              speak(current.example!);
            }}
            className="h-14 px-4 text-sm sm:text-base font-semibold gap-2 border-2"
            aria-label={t("Nghe ví dụ", "Listen example")}
          >
            <Volume2 className="w-5 h-5" />
            {t("Ví dụ", "Example")}
          </Button>
        )}

        <Button
          type="button"
          size="lg"
          variant={starred ? "default" : "outline"}
          onClick={(e) => {
            e.stopPropagation();
            toggleStar();
          }}
          className={`h-14 w-14 p-0 border-2 ${starred ? "bg-amber-400 hover:bg-amber-500 text-white border-amber-500" : ""}`}
          aria-label={t("Yêu thích", "Favorite")}
        >
          <Star className={`w-6 h-6 ${starred ? "fill-current" : ""}`} />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 mt-4">
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={handlePrev}
          className="h-12 flex-1 gap-2 text-base font-semibold border-2"
        >
          <ChevronLeft className="w-5 h-5" />
          {t("Trước", "Prev")}
        </Button>

        {/* Progress dots */}
        <div className="hidden sm:flex items-center gap-1 px-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                stopVietnameseTts();
                setIndex(i);
              }}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-primary" : stars.has(i) ? "w-2.5 bg-amber-400" : "w-2.5 bg-muted"
              }`}
              aria-label={`Card ${i + 1}`}
            />
          ))}
        </div>

        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={handleNext}
          className="h-12 flex-1 gap-2 text-base font-semibold border-2"
        >
          {t("Tiếp", "Next")}
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {stars.size > 0 && (
        <div className="text-center mt-3 text-sm font-semibold text-amber-600 dark:text-amber-400">
          ⭐ {stars.size} {t("thẻ yêu thích", "favorite cards")}
        </div>
      )}
    </div>
  );
};

export default KidsFlashcard;
