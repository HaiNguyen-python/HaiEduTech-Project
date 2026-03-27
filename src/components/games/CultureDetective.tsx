// Game 3: "Culture Detective" - Image-based cultural item identification game
// Players identify Vietnamese cultural items by selecting correct descriptive keywords

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, CheckCircle, Flame, Volume2, VolumeX, RotateCcw, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { culturalItems, type CulturalItem } from "@/data/cultureDetectiveData";
import { playGameSound, toggleMute, isMuted } from "./soundManager";
import TeacherHaiCommentary from "./TeacherHaiCommentary";
import confetti from "canvas-confetti";
import { supabase } from "@/integrations/supabase/client";

interface CultureDetectiveProps {
  onBack: () => void;
}

const TIME_LIMIT = 20; // seconds per round

const CultureDetective = ({ onBack }: CultureDetectiveProps) => {
  const { t } = useLanguage();
  const [muted, setMuted] = useState(isMuted());
  const [phase, setPhase] = useState<"playing" | "revealed" | "results">("playing");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledItems, setShuffledItems] = useState<CulturalItem[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
  const [shuffledKeywords, setShuffledKeywords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [roundScores, setRoundScores] = useState<number[]>([]);
  const [commentEvent, setCommentEvent] = useState<"correct" | "wrong" | "win" | "streak5" | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [startTime] = useState(Date.now());

  // Initialize items
  useEffect(() => {
    const shuffled = [...culturalItems].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
    prepareKeywords(shuffled[0]);
  }, []);

  const prepareKeywords = (item: CulturalItem) => {
    const all = [...item.correctKeywords, ...item.wrongKeywords].sort(() => Math.random() - 0.5);
    setShuffledKeywords(all);
    setSelectedKeywords(new Set());
    setTimeLeft(TIME_LIMIT);
    setUnlocked(false);
  };

  const currentItem = shuffledItems[currentIdx];

  // Timer
  useEffect(() => {
    if (phase !== "playing" || !currentItem) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, phase, currentItem]);

  const toggleKeyword = (keyword: string) => {
    if (phase !== "playing") return;
    playGameSound("click");
    setSelectedKeywords((prev) => {
      const next = new Set(prev);
      if (next.has(keyword)) next.delete(keyword);
      else next.add(keyword);
      return next;
    });
  };

  const handleSubmit = useCallback(() => {
    if (!currentItem) return;

    const correct = currentItem.correctKeywords;
    const selectedArr = Array.from(selectedKeywords);

    // Calculate accuracy
    const correctSelected = selectedArr.filter((k) => correct.includes(k)).length;
    const wrongSelected = selectedArr.filter((k) => !correct.includes(k)).length;
    const accuracy = correct.length > 0 ? Math.max(0, (correctSelected - wrongSelected) / correct.length) : 0;
    const timeBonus = Math.round(timeLeft * 5);
    const roundScore = Math.round(accuracy * 100) + timeBonus;

    setRoundScores((prev) => [...prev, roundScore]);
    setScore((s) => s + roundScore);

    if (accuracy >= 0.75) {
      playGameSound("correct");
      setStreak((s) => {
        const newStreak = s + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        if (newStreak === 5) setCommentEvent("streak5");
        else setCommentEvent("correct");
        return newStreak;
      });
      setUnlocked(true);
    } else {
      playGameSound("wrong");
      setStreak(0);
      setCommentEvent("wrong");
      setUnlocked(false);
    }

    setPhase("revealed");
  }, [currentItem, selectedKeywords, timeLeft, maxStreak]);

  const nextRound = () => {
    if (currentIdx + 1 >= shuffledItems.length) {
      // Game complete
      setPhase("results");
      confetti({ particleCount: 150, spread: 100 });
      playGameSound("levelup");
      setCommentEvent("win");
      saveScore();
      return;
    }

    setCurrentIdx((i) => i + 1);
    prepareKeywords(shuffledItems[currentIdx + 1]);
    setPhase("playing");
    setCommentEvent(null);
  };

  const saveScore = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await (supabase as any).from("game_scores").insert({
        user_id: user.id,
        game_type: "culture_detective",
        score,
        max_streak: maxStreak,
        accuracy: roundScores.length > 0 ? Math.round(roundScores.reduce((a, b) => a + b, 0) / roundScores.length) : 0,
        time_spent_seconds: Math.round((Date.now() - startTime) / 1000),
        metadata: { rounds_played: currentIdx + 1, total_items: shuffledItems.length },
      });
    } catch (e) {
      console.error("Failed to save score:", e);
    }
  };

  const restart = () => {
    const shuffled = [...culturalItems].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
    setCurrentIdx(0);
    prepareKeywords(shuffled[0]);
    setPhase("playing");
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setRoundScores([]);
    setCommentEvent(null);
  };

  const handleToggleMute = () => setMuted(toggleMute());

  // Results screen
  if (phase === "results") {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4">
          <span className="text-6xl">🕵️</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2 neon-text">
          {t("Thám tử xuất sắc!", "Master Detective!")}
        </h2>
        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="p-3 rounded-xl bg-card border border-border">
            <p className="text-2xl font-bold text-primary">{score}</p>
            <p className="text-xs text-muted-foreground">{t("Tổng điểm", "Total Score")}</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border">
            <p className="text-2xl font-bold text-amber-400">{maxStreak}</p>
            <p className="text-xs text-muted-foreground">{t("Chuỗi tối đa", "Max Streak")}</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border">
            <p className="text-2xl font-bold text-green-400">{shuffledItems.length}</p>
            <p className="text-xs text-muted-foreground">{t("Vật phẩm", "Items")}</p>
          </div>
        </div>
        <TeacherHaiCommentary streak={maxStreak} score={score} event="win" />
        <div className="flex gap-3 justify-center mt-6">
          <Button onClick={restart} className="neon-btn gap-2">
            <RotateCcw className="w-4 h-4" /> {t("Chơi lại", "Play Again")}
          </Button>
          <Button variant="outline" onClick={onBack}>
            {t("Quay lại", "Back")}
          </Button>
        </div>
      </div>
    );
  }

  if (!currentItem) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground neon-text">
            {t("Thám tử văn hóa", "Culture Detective")}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {currentIdx + 1}/{shuffledItems.length}
          </span>
          {streak >= 3 && (
            <span className="flex items-center gap-1 text-sm font-bold text-orange-400">
              <Flame className="w-4 h-4" /> {streak}
            </span>
          )}
          <span className="font-bold text-primary">{score}</span>
          <button onClick={handleToggleMute} className="text-muted-foreground hover:text-foreground">
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Teacher Hai */}
      {commentEvent && (
        <div className="mb-3">
          <TeacherHaiCommentary streak={streak} score={score} event={commentEvent} />
        </div>
      )}

      {/* Cultural item card */}
      <motion.div
        key={currentItem.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-card border border-border/50 mb-4 text-center"
      >
        <span className="text-6xl mb-3 block">{currentItem.emoji}</span>
        <h3 className="text-xl font-bold text-foreground mb-1">???</h3>
        <p className="text-sm text-muted-foreground italic">
          {t(currentItem.hint, currentItem.hintEn)}
        </p>

        {/* Timer */}
        {phase === "playing" && (
          <div className="flex items-center justify-center gap-2 mt-3">
            <Clock className={`w-4 h-4 ${timeLeft <= 5 ? "text-red-500" : "text-muted-foreground"}`} />
            <span className={`font-mono font-bold ${timeLeft <= 5 ? "text-red-500" : "text-foreground"}`}>
              {timeLeft}s
            </span>
          </div>
        )}
      </motion.div>

      {/* Keywords grid */}
      <p className="text-sm text-muted-foreground mb-3 text-center">
        {t("Chọn 4 từ khóa mô tả đúng vật phẩm này:", "Select 4 keywords that correctly describe this item:")}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {shuffledKeywords.map((keyword) => {
          const isSelected = selectedKeywords.has(keyword);
          const isCorrect = currentItem.correctKeywords.includes(keyword);
          const isRevealed = phase === "revealed";

          return (
            <motion.button
              key={keyword}
              whileHover={phase === "playing" ? { scale: 1.05 } : {}}
              whileTap={phase === "playing" ? { scale: 0.95 } : {}}
              onClick={() => toggleKeyword(keyword)}
              disabled={phase !== "playing"}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                isRevealed
                  ? isCorrect
                    ? "border-green-500 bg-green-500/15 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                    : isSelected
                    ? "border-red-500 bg-red-500/15 text-red-400"
                    : "border-border/30 bg-card/30 text-muted-foreground"
                  : isSelected
                  ? "border-primary bg-primary/15 text-primary shadow-[0_0_10px_rgba(var(--primary),0.2)]"
                  : "border-border/50 bg-card/80 text-foreground hover:border-primary/50 hover:shadow-[0_0_8px_rgba(var(--primary),0.1)]"
              }`}
            >
              {isRevealed && isCorrect && <CheckCircle className="w-3 h-3 inline mr-1" />}
              {keyword}
            </motion.button>
          );
        })}
      </div>

      {/* Submit / Next */}
      {phase === "playing" ? (
        <div className="flex justify-center gap-3">
          <Button onClick={handleSubmit} className="neon-btn" disabled={selectedKeywords.size === 0}>
            {t("Xác nhận", "Submit")}
          </Button>
          <Button variant="outline" onClick={onBack}>
            {t("Thoát", "Exit")}
          </Button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Revealed cultural item */}
            <div
              className={`p-4 rounded-xl border mb-4 ${
                unlocked
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-red-500/30 bg-red-500/5"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {unlocked ? (
                  <Unlock className="w-4 h-4 text-green-500" />
                ) : (
                  <Lock className="w-4 h-4 text-red-500" />
                )}
                <span className="font-bold text-foreground">
                  {currentItem.emoji} {t(currentItem.name, currentItem.nameEn)}
                </span>
              </div>
              {unlocked && (
                <p className="text-sm text-muted-foreground">
                  🔓 {t(currentItem.secret, currentItem.secretEn)}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <Button onClick={nextRound} className="neon-btn">
                {currentIdx + 1 >= shuffledItems.length
                  ? t("Xem kết quả", "See Results")
                  : t("Vật phẩm tiếp theo →", "Next Item →")}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CultureDetective;
