// Game 2: "Vocab Arena: Shadow Fight" - Fast-paced falling word matching game
// Words fall from top; player clicks matching Vietnamese-English pairs before they hit bottom

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Heart, Flame, Snowflake, Star, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { playGameSound, toggleMute, isMuted } from "./soundManager";
import TeacherHaiCommentary from "./TeacherHaiCommentary";
import confetti from "canvas-confetti";
import { supabase } from "@/integrations/supabase/client";

// Word pairs for the game
const WORD_PAIRS = [
  { vi: "Xin chào", en: "Hello" }, { vi: "Cảm ơn", en: "Thank you" },
  { vi: "Tạm biệt", en: "Goodbye" }, { vi: "Yêu thương", en: "Love" },
  { vi: "Gia đình", en: "Family" }, { vi: "Bạn bè", en: "Friends" },
  { vi: "Trường học", en: "School" }, { vi: "Giáo viên", en: "Teacher" },
  { vi: "Học sinh", en: "Student" }, { vi: "Sách vở", en: "Books" },
  { vi: "Hạnh phúc", en: "Happiness" }, { vi: "Ước mơ", en: "Dream" },
  { vi: "Tương lai", en: "Future" }, { vi: "Quê hương", en: "Homeland" },
  { vi: "Thiên nhiên", en: "Nature" }, { vi: "Mặt trời", en: "Sun" },
  { vi: "Ngôi sao", en: "Star" }, { vi: "Biển cả", en: "Ocean" },
  { vi: "Núi rừng", en: "Mountains" }, { vi: "Hòa bình", en: "Peace" },
  { vi: "Tự do", en: "Freedom" }, { vi: "Công lý", en: "Justice" },
  { vi: "Dũng cảm", en: "Brave" }, { vi: "Khôn ngoan", en: "Wise" },
  { vi: "Sáng tạo", en: "Creative" }, { vi: "Kiên nhẫn", en: "Patient" },
  { vi: "Chăm chỉ", en: "Hardworking" }, { vi: "Trung thực", en: "Honest" },
  { vi: "Lịch sử", en: "History" }, { vi: "Văn hóa", en: "Culture" },
];

interface FallingWord {
  id: string;
  text: string;
  lang: "vi" | "en";
  pairId: number;
  x: number;
  y: number;
  speed: number;
  matched: boolean;
}

interface PowerUp {
  type: "freeze" | "double";
  active: boolean;
  timeLeft: number;
}

interface VocabShadowFightProps {
  onBack: () => void;
}

const VocabShadowFight = ({ onBack }: VocabShadowFightProps) => {
  const { t } = useLanguage();
  const [muted, setMuted] = useState(isMuted());
  const [phase, setPhase] = useState<"playing" | "gameover">("playing");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [matched, setMatched] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [words, setWords] = useState<FallingWord[]>([]);
  const [powerUp, setPowerUp] = useState<PowerUp>({ type: "freeze", active: false, timeLeft: 0 });
  const [showPowerUp, setShowPowerUp] = useState<{ type: "freeze" | "double"; x: number; y: number } | null>(null);
  const [doublePoints, setDoublePoints] = useState(false);
  const [commentEvent, setCommentEvent] = useState<"correct" | "wrong" | "streak5" | "powerup" | "gameover" | null>(null);
  const [sparkle, setSparkle] = useState<{ x: number; y: number } | null>(null);
  const startTime = useRef(Date.now());
  const gameLoop = useRef<number>();
  const spawnTimer = useRef<number>();
  const nextPairId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const CONTAINER_HEIGHT = 500;
  const BASE_SPEED = 0.4;

  // Spawn new word pair
  const spawnPair = useCallback(() => {
    if (phase !== "playing") return;
    const pair = WORD_PAIRS[nextPairId.current % WORD_PAIRS.length];
    nextPairId.current++;

    const viWord: FallingWord = {
      id: `vi-${nextPairId.current}-${Date.now()}`,
      text: pair.vi,
      lang: "vi",
      pairId: nextPairId.current,
      x: 5 + Math.random() * 35,
      y: -10,
      speed: BASE_SPEED + level * 0.08,
      matched: false,
    };

    const enWord: FallingWord = {
      id: `en-${nextPairId.current}-${Date.now()}`,
      text: pair.en,
      lang: "en",
      pairId: nextPairId.current,
      x: 55 + Math.random() * 35,
      y: -10 - Math.random() * 30,
      speed: BASE_SPEED + level * 0.08,
      matched: false,
    };

    setWords((prev) => [...prev, viWord, enWord]);

    // Random power-up spawn (10% chance)
    if (Math.random() < 0.1 && !showPowerUp) {
      setShowPowerUp({
        type: Math.random() > 0.5 ? "freeze" : "double",
        x: 20 + Math.random() * 60,
        y: 10,
      });
    }
  }, [phase, level, showPowerUp]);

  // Game loop - update word positions
  useEffect(() => {
    if (phase !== "playing") return;

    const update = () => {
      setWords((prev) => {
        const updated = prev
          .map((w) => ({
            ...w,
            y: w.matched ? w.y : w.y + w.speed * (powerUp.active && powerUp.type === "freeze" ? 0.3 : 1),
          }))
          .filter((w) => {
            if (w.y > 100 && !w.matched) {
              // Word hit bottom
              setLives((l) => {
                const newLives = l - 1;
                if (newLives <= 0) {
                  setPhase("gameover");
                  playGameSound("gameover");
                  setCommentEvent("gameover");
                }
                return newLives;
              });
              setStreak(0);
              return false;
            }
            // Remove matched words after animation
            if (w.matched && w.y < -20) return false;
            return true;
          });
        return updated;
      });
      gameLoop.current = requestAnimationFrame(update);
    };

    gameLoop.current = requestAnimationFrame(update);
    return () => {
      if (gameLoop.current) cancelAnimationFrame(gameLoop.current);
    };
  }, [phase, powerUp]);

  // Spawn timer
  useEffect(() => {
    if (phase !== "playing") return;
    const interval = Math.max(1500 - level * 100, 600);
    spawnPair();
    spawnTimer.current = window.setInterval(spawnPair, interval);
    return () => {
      if (spawnTimer.current) clearInterval(spawnTimer.current);
    };
  }, [phase, level, spawnPair]);

  // Level up
  useEffect(() => {
    const newLevel = Math.floor(matched / 5) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      playGameSound("levelup");
    }
  }, [matched]);

  // Power-up timer
  useEffect(() => {
    if (!powerUp.active) return;
    const timer = setInterval(() => {
      setPowerUp((p) => {
        if (p.timeLeft <= 1) return { ...p, active: false, timeLeft: 0 };
        return { ...p, timeLeft: p.timeLeft - 1 };
      });
      if (powerUp.type === "double" && powerUp.timeLeft <= 1) {
        setDoublePoints(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [powerUp.active]);

  const handleWordClick = (word: FallingWord) => {
    if (phase !== "playing" || word.matched) return;
    playGameSound("click");

    if (!selected) {
      setSelected(word.id);
      return;
    }

    // Check if same word clicked
    if (selected === word.id) {
      setSelected(null);
      return;
    }

    // Find selected word
    const selectedWord = words.find((w) => w.id === selected);
    if (!selectedWord) {
      setSelected(word.id);
      return;
    }

    // Check if pair matches
    if (selectedWord.pairId === word.pairId && selectedWord.lang !== word.lang) {
      // Correct match!
      playGameSound("correct");
      const points = (doublePoints ? 20 : 10) + streak * 2;
      setScore((s) => s + points);
      setStreak((s) => {
        const newStreak = s + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        if (newStreak === 5) {
          playGameSound("streak");
          setCommentEvent("streak5");
        } else {
          setCommentEvent("correct");
        }
        return newStreak;
      });
      setMatched((m) => m + 1);

      // Sparkle effect at word position
      setSparkle({ x: word.x, y: word.y });
      setTimeout(() => setSparkle(null), 500);

      // Mark words as matched (they'll fly up and disappear)
      setWords((prev) =>
        prev.map((w) =>
          w.pairId === word.pairId ? { ...w, matched: true, speed: -2 } : w
        )
      );
    } else {
      // Wrong match
      playGameSound("wrong");
      setStreak(0);
      setCommentEvent("wrong");
    }

    setSelected(null);
  };

  const handlePowerUpClick = () => {
    if (!showPowerUp) return;
    playGameSound("powerup");
    setCommentEvent("powerup");
    setPowerUp({ type: showPowerUp.type, active: true, timeLeft: 8 });
    if (showPowerUp.type === "double") setDoublePoints(true);
    setShowPowerUp(null);
  };

  const handleToggleMute = () => setMuted(toggleMute());

  const saveScore = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await (supabase as any).from("game_scores").insert({
        user_id: user.id,
        game_type: "vocab_shadow",
        score,
        max_streak: maxStreak,
        accuracy: matched > 0 ? Math.round((matched / (matched + (5 - lives))) * 100) : 0,
        time_spent_seconds: Math.round((Date.now() - startTime.current) / 1000),
        difficulty: `level-${level}`,
        metadata: { matched, level, lives_remaining: lives },
      });
    } catch (e) {
      console.error("Failed to save score:", e);
    }
  };

  const restart = () => {
    setPhase("playing");
    setScore(0);
    setLives(5);
    setStreak(0);
    setMaxStreak(0);
    setLevel(1);
    setMatched(0);
    setSelected(null);
    setWords([]);
    setDoublePoints(false);
    setPowerUp({ type: "freeze", active: false, timeLeft: 0 });
    setShowPowerUp(null);
    setCommentEvent(null);
    nextPairId.current = 0;
    startTime.current = Date.now();
  };

  // Game Over screen
  if (phase === "gameover") {
    saveScore();
    if (score > 200) confetti({ particleCount: 80, spread: 70 });

    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4">
          <span className="text-6xl">{score > 300 ? "🏆" : score > 100 ? "⭐" : "💪"}</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2 neon-text">
          {t("Kết thúc!", "Game Over!")}
        </h2>
        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="p-3 rounded-xl bg-card border border-border">
            <p className="text-2xl font-bold text-primary">{score}</p>
            <p className="text-xs text-muted-foreground">{t("Điểm", "Score")}</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border">
            <p className="text-2xl font-bold text-amber-400">{maxStreak}</p>
            <p className="text-xs text-muted-foreground">{t("Chuỗi tối đa", "Max Streak")}</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border">
            <p className="text-2xl font-bold text-green-400">Lv.{level}</p>
            <p className="text-xs text-muted-foreground">{t("Cấp độ", "Level")}</p>
          </div>
        </div>
        <TeacherHaiCommentary streak={maxStreak} score={score} event="gameover" />
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

  return (
    <div className="max-w-3xl mx-auto">
      {/* HUD */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-4">
          {/* Lives */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${i < lives ? "text-red-500 fill-red-500" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          {/* Score */}
          <span className="font-bold text-primary text-lg">{score}</span>
          {/* Level */}
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold">
            Lv.{level}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak */}
          {streak >= 3 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-sm font-bold text-orange-400"
            >
              <Flame className="w-4 h-4" /> {streak}
            </motion.span>
          )}
          {/* Power-up indicator */}
          {powerUp.active && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center gap-1">
              {powerUp.type === "freeze" ? <Snowflake className="w-3 h-3" /> : <Star className="w-3 h-3" />}
              {powerUp.timeLeft}s
            </span>
          )}
          {/* Double points indicator */}
          {doublePoints && (
            <span className="text-xs font-bold text-amber-400">×2</span>
          )}
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

      {/* Game area */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl border border-border/50 overflow-hidden"
        style={{ height: CONTAINER_HEIGHT, background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.3) 100%)" }}
      >
        {/* Center divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30" />
        <div className="absolute left-[10%] top-2 text-xs text-muted-foreground/50 font-bold">🇻🇳 Tiếng Việt</div>
        <div className="absolute right-[10%] top-2 text-xs text-muted-foreground/50 font-bold">🇬🇧 English</div>

        {/* Bottom danger zone */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-red-500/20 to-transparent border-t border-red-500/30" />

        {/* Falling words */}
        <AnimatePresence>
          {words.map((word) => (
            <motion.button
              key={word.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: word.matched ? 0 : 1,
                scale: word.matched ? 1.5 : 1,
                top: `${word.y}%`,
                left: `${word.x}%`,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "tween", duration: 0.1 }}
              onClick={() => handleWordClick(word)}
              className={`absolute px-3 py-1.5 rounded-lg text-sm font-bold cursor-pointer transition-colors whitespace-nowrap ${
                word.matched
                  ? "bg-green-500/30 border-green-500 text-green-400"
                  : selected === word.id
                  ? "bg-primary/30 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.4)] scale-110"
                  : word.lang === "vi"
                  ? "bg-card/90 border border-amber-500/40 text-amber-300 hover:border-amber-400 hover:shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                  : "bg-card/90 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              }`}
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {word.text}
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Power-up pickup */}
        {showPowerUp && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: [1, 1.2, 1], rotate: 0 }}
            transition={{ duration: 0.5, scale: { repeat: Infinity, duration: 1 } }}
            onClick={handlePowerUpClick}
            className="absolute z-20 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer"
            style={{ left: `${showPowerUp.x}%`, top: `${showPowerUp.y}%` }}
          >
            {showPowerUp.type === "freeze" ? "❄️" : "⭐"}
          </motion.button>
        )}

        {/* Sparkle effect */}
        {sparkle && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-8 h-8 rounded-full bg-green-400/30 border border-green-400"
            style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%`, transform: "translate(-50%, -50%)" }}
          />
        )}

        {/* Freeze overlay */}
        {powerUp.active && powerUp.type === "freeze" && (
          <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none border-2 border-cyan-500/20 rounded-2xl" />
        )}
      </div>

      {/* Instructions */}
      <p className="text-center text-xs text-muted-foreground mt-3">
        {t(
          "Nhấn vào một từ tiếng Việt 🇻🇳, rồi nhấn vào nghĩa tiếng Anh 🇬🇧 tương ứng",
          "Click a Vietnamese word 🇻🇳, then click its English match 🇬🇧"
        )}
      </p>

      <div className="flex justify-center mt-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          {t("Thoát", "Exit")}
        </Button>
      </div>
    </div>
  );
};

export default VocabShadowFight;
