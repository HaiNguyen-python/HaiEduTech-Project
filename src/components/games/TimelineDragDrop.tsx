// Game 1: "The Linguistic Time Machine" - Historical timeline drag-and-drop game
// Players reorder shuffled historical events into correct chronological order

import { useState, useCallback, useEffect } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, XCircle, RotateCcw, Flame, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { historyTimeline } from "@/data/vietnameseCurriculumData";
import { playGameSound, toggleMute, isMuted } from "./soundManager";
import TeacherHaiCommentary from "./TeacherHaiCommentary";
import confetti from "canvas-confetti";
import { supabase } from "@/integrations/supabase/client";

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  titleEn: string;
  correctIndex: number;
}

interface TimelineDragDropProps {
  onBack: () => void;
  difficulty?: "easy" | "normal" | "hard";
}

const DIFFICULTIES = { easy: 5, normal: 8, hard: 12 };

const TimelineDragDrop = ({ onBack, difficulty = "normal" }: TimelineDragDropProps) => {
  const { t } = useLanguage();
  const count = DIFFICULTIES[difficulty];
  const [muted, setMuted] = useState(isMuted());
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [phase, setPhase] = useState<"playing" | "checked" | "results">("playing");
  const [results, setResults] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const [commentEvent, setCommentEvent] = useState<"correct" | "wrong" | "win" | "streak5" | null>(null);

  // Initialize shuffled events
  useEffect(() => {
    const pool = [...historyTimeline];
    const selected = pool
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .sort((a, b) => {
        const yearA = parseInt(a.year.replace(/[^-\d]/g, ""));
        const yearB = parseInt(b.year.replace(/[^-\d]/g, ""));
        return yearA - yearB;
      })
      .map((ev, idx) => ({
        id: `${ev.year}-${idx}`,
        year: ev.year,
        title: ev.title,
        titleEn: ev.titleEn,
        correctIndex: idx,
      }));

    // Shuffle for the game
    const shuffled = [...selected].sort(() => Math.random() - 0.5);
    setEvents(shuffled);
  }, [count]);

  const handleToggleMute = () => setMuted(toggleMute());

  const checkOrder = useCallback(() => {
    playGameSound("click");
    setAttempts((a) => a + 1);

    // Check which events are in the correct position
    const correctOrder = [...events].sort((a, b) => a.correctIndex - b.correctIndex);
    const checkResults = events.map((ev, i) => ev.id === correctOrder[i].id);
    setResults(checkResults);

    const correctCount = checkResults.filter(Boolean).length;
    const allCorrect = correctCount === events.length;
    const newScore = Math.round((correctCount / events.length) * 1000);
    setScore(newScore);

    if (allCorrect) {
      setStreak((s) => s + 1);
      const newStreak = streak + 1;
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      if (newStreak >= 5) {
        playGameSound("streak");
        setCommentEvent("streak5");
      } else {
        playGameSound("levelup");
        setCommentEvent("win");
      }
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      setPhase("results");
      saveScore(newScore, newStreak);
    } else {
      playGameSound("wrong");
      setCommentEvent("wrong");
      setPhase("checked");
      // Animate wrong positions
      setTimeout(() => {
        setPhase("playing");
        setResults([]);
        setCommentEvent(null);
      }, 2000);
    }
  }, [events, streak, maxStreak]);

  const saveScore = async (finalScore: number, finalStreak: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await (supabase as any).from("game_scores").insert({
        user_id: user.id,
        game_type: "timeline",
        score: finalScore,
        max_streak: finalStreak,
        accuracy: 100,
        time_spent_seconds: Math.round((Date.now() - startTime) / 1000),
        difficulty,
        metadata: { attempts, event_count: count },
      });
    } catch (e) {
      console.error("Failed to save score:", e);
    }
  };

  const restart = () => {
    setPhase("playing");
    setResults([]);
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setCommentEvent(null);
    // Re-shuffle
    const pool = [...historyTimeline];
    const selected = pool
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .sort((a, b) => {
        const yearA = parseInt(a.year.replace(/[^-\d]/g, ""));
        const yearB = parseInt(b.year.replace(/[^-\d]/g, ""));
        return yearA - yearB;
      })
      .map((ev, idx) => ({
        id: `${ev.year}-${idx}`,
        year: ev.year,
        title: ev.title,
        titleEn: ev.titleEn,
        correctIndex: idx,
      }));
    setEvents([...selected].sort(() => Math.random() - 0.5));
  };

  // Results screen
  if (phase === "results") {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
          <span className="text-6xl">🏆</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2 neon-text">
          {t("Hoàn thành xuất sắc!", "Perfectly Done!")}
        </h2>
        <p className="text-muted-foreground mb-4">
          {t(`Hoàn thành sau ${attempts} lần thử`, `Completed in ${attempts} attempt(s)`)}
        </p>
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{score}</p>
            <p className="text-xs text-muted-foreground">{t("Điểm", "Score")}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-400">{maxStreak}</p>
            <p className="text-xs text-muted-foreground">{t("Chuỗi", "Streak")}</p>
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

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground neon-text">
            {t("Dòng thời gian lịch sử", "The Linguistic Time Machine")}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <span className="flex items-center gap-1 text-sm font-bold text-orange-400">
              <Flame className="w-4 h-4" /> {streak}
            </span>
          )}
          <button onClick={handleToggleMute} className="text-muted-foreground hover:text-foreground">
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {t(
          "Kéo thả các sự kiện lịch sử theo đúng thứ tự thời gian ⬆️ sớm nhất → muộn nhất ⬇️",
          "Drag and drop historical events in chronological order ⬆️ earliest → latest ⬇️"
        )}
      </p>

      {/* Teacher Hai */}
      {commentEvent && (
        <div className="mb-4">
          <TeacherHaiCommentary streak={streak} score={score} event={commentEvent} />
        </div>
      )}

      {/* Draggable timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/60 z-0" />

        <Reorder.Group
          axis="y"
          values={events}
          onReorder={setEvents}
          className="space-y-3 relative z-10"
        >
          {events.map((event, idx) => {
            const isCorrect = results[idx] === true;
            const isWrong = results[idx] === false;

            return (
              <Reorder.Item
                key={event.id}
                value={event}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-grab active:cursor-grabbing transition-all ${
                  isCorrect
                    ? "border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                    : isWrong
                    ? "border-red-500 bg-red-500/10 animate-[shake_0.5s_ease-in-out]"
                    : "border-border/50 bg-card/80 hover:border-primary/50 hover:shadow-[0_0_10px_rgba(var(--primary),0.15)]"
                }`}
                whileDrag={{ scale: 1.03, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
              >
                {/* Timeline dot */}
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    isCorrect ? "bg-green-500" : isWrong ? "bg-red-500" : "bg-primary"
                  }`}
                />

                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground leading-tight">
                    {t(event.title, event.titleEn)}
                  </p>
                </div>

                {/* Status icon */}
                <AnimatePresence>
                  {isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                  {isWrong && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <XCircle className="w-5 h-5 text-red-500" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Drag handle */}
                <div className="text-muted-foreground/50 text-lg">⠿</div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-center mt-6">
        <Button onClick={checkOrder} className="neon-btn" disabled={phase === "checked"}>
          {t("Kiểm tra thứ tự", "Check Order")}
        </Button>
        <Button variant="outline" onClick={onBack}>
          {t("Quay lại", "Back")}
        </Button>
      </div>

      {attempts > 0 && (
        <p className="text-center text-xs text-muted-foreground mt-3">
          {t(`Lần thử: ${attempts}`, `Attempts: ${attempts}`)}
        </p>
      )}
    </div>
  );
};

export default TimelineDragDrop;
