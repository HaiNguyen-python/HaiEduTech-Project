/**
 * @file XPStreakHUD.tsx
 * @description Top HUD showing Level, XP bar, Daily Streak, and Daily Quest
 * progress with a claim button when all sub-goals are met.
 */
import { motion } from "framer-motion";
import { Flame, Sparkles, Trophy, CheckCircle2, Circle, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAIAcademyXP } from "@/hooks/useAIAcademyXP";
import { useEffect, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

const XPStreakHUD = () => {
  const { state, levelInfo, claimDailyReward } = useAIAcademyXP();
  const { current, next, pct } = levelInfo;
  const [prevLevel, setPrevLevel] = useState(current.level);
  const prevXP = useRef(state.xp);

  // Level-up celebration
  useEffect(() => {
    if (current.level > prevLevel) {
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
      toast({
        title: `🎉 Level up! You are now ${current.emoji} ${current.name}`,
        description: `Level ${current.level} - keep conquering AI!`,
      });
      setPrevLevel(current.level);
    }
  }, [current, prevLevel]);

  // XP gain pulse animation trigger
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    if (state.xp > prevXP.current) {
      setPulse((n) => n + 1);
    }
    prevXP.current = state.xp;
  }, [state.xp]);

  const quest = state.quest;
  const questDone = quest.lessonDone && quest.quizDone && quest.starDone;
  const canClaim = questDone && !quest.rewardClaimed;

  const handleClaim = () => {
    const granted = claimDailyReward();
    if (granted > 0) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });
      toast({
        title: `🎁 +${granted} XP daily quest!`,
        description: "Come back tomorrow to keep your streak going 🔥",
      });
    }
  };

  const QuestItem = ({ done, label }: { done: boolean; label: string }) => (
    <div className={`flex items-center gap-1.5 text-xs ${done ? "text-emerald-600 dark:text-emerald-300" : "text-muted-foreground"}`}>
      {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
      <span className={done ? "line-through opacity-80" : ""}>{label}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid md:grid-cols-3 gap-3 mb-5"
    >
      {/* Level + XP */}
      <div className="rounded-2xl border-2 border-purple-300/40 dark:border-purple-500/30 bg-gradient-to-br from-purple-500/15 via-fuchsia-500/10 to-indigo-500/15 backdrop-blur p-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{current.emoji}</span>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Level {current.level}</div>
              <div className="text-sm font-black text-foreground">{current.name}</div>
            </div>
          </div>
          <motion.div
            key={pulse}
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-right"
          >
            <div className="text-[10px] text-muted-foreground">XP</div>
            <div className="text-sm font-black text-purple-600 dark:text-purple-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />{state.xp}
            </div>
          </motion.div>
        </div>
        <Progress value={pct} className="h-2" />
        <div className="text-[10px] text-muted-foreground mt-1 text-right">
          {next ? `${next.xpRequired - state.xp} XP → ${next.emoji} ${next.name}` : "You have reached the max level! 👑"}
        </div>
      </div>

      {/* Streak */}
      <div className="rounded-2xl border-2 border-orange-300/50 dark:border-orange-500/30 bg-gradient-to-br from-orange-500/15 via-red-500/10 to-amber-500/15 backdrop-blur p-3 flex items-center gap-3">
        <motion.div
          animate={state.streak > 0 ? { scale: [1, 1.15, 1], rotate: [-5, 5, -5] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-4xl"
        >
          🔥
        </motion.div>
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1">
            <Flame className="w-3 h-3" /> Daily Streak
          </div>
          <div className="text-2xl font-black text-orange-600 dark:text-orange-300">
            {state.streak} <span className="text-sm font-bold">days</span>
          </div>
          <div className="text-[10px] text-muted-foreground">
            {state.streak === 0 ? "Study today to start your streak!" : "Come back every day to keep your streak 💪"}
          </div>
        </div>
      </div>

      {/* Daily Quest */}
      <div className="rounded-2xl border-2 border-emerald-300/50 dark:border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-cyan-500/15 backdrop-blur p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1">
            <Trophy className="w-3 h-3" /> Today's Quest
          </div>
          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300">
            {[quest.lessonDone, quest.quizDone, quest.starDone].filter(Boolean).length}/3
          </div>
        </div>
        <div className="space-y-1 mb-2">
          <QuestItem done={quest.lessonDone} label="Open 1 lesson" />
          <QuestItem done={quest.quizDone} label="Complete 1 quiz" />
          <QuestItem done={quest.starDone} label="Earn 1 star ⭐" />
        </div>
        {canClaim ? (
          <Button
            size="sm"
            onClick={handleClaim}
            className="w-full h-7 text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold"
          >
            <Gift className="w-3 h-3 mr-1" /> Claim +50 XP
          </Button>
        ) : quest.rewardClaimed ? (
          <div className="text-[11px] text-center text-emerald-600 dark:text-emerald-300 font-semibold">
            ✓ Reward claimed today
          </div>
        ) : (
          <div className="text-[11px] text-center text-muted-foreground">
            Complete all 3 to unlock +50 XP 🎁
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default XPStreakHUD;
