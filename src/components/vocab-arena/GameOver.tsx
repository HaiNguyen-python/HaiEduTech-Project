import { motion } from "framer-motion";
import { Trophy, Target, Zap, Clock, RotateCcw, Home, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import type { GameResult } from "./GameEngine";

interface GameOverProps {
  result: GameResult;
  onReplay: () => void;
  onHome: () => void;
  showAnalytics?: { word: string; correct: boolean; timeMs: number }[];
}

const GameOver = ({ result, onReplay, onHome, showAnalytics }: GameOverProps) => {
  const { t } = useLanguage();
  const accuracy = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;

  // Determine rank
  const rank =
    accuracy >= 90
      ? { emoji: "🏆", label: t("Bậc thầy từ vựng!", "Vocab Master!"), color: "text-amber-400" }
      : accuracy >= 70
      ? { emoji: "🌟", label: t("Rất giỏi!", "Excellent!"), color: "text-primary" }
      : accuracy >= 50
      ? { emoji: "💪", label: t("Khá tốt!", "Good effort!"), color: "text-blue-400" }
      : { emoji: "📚", label: t("Cần ôn thêm!", "Keep practicing!"), color: "text-orange-400" };

  // Find most-missed words
  const missed = showAnalytics?.filter((w) => !w.correct) || [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto text-center py-8"
    >
      {/* Rank */}
      <div className="text-7xl mb-4">{rank.emoji}</div>
      <h2 className={`text-3xl font-bold mb-2 ${rank.color}`}>{rank.label}</h2>

      {/* Score */}
      <div className="text-5xl font-black text-foreground mb-6">{result.score}</div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="rounded-xl border border-border bg-card p-4">
          <Target className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
          <p className="text-xs text-muted-foreground">{t("Chính xác", "Accuracy")}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-foreground">
            {result.correct}/{result.total}
          </p>
          <p className="text-xs text-muted-foreground">{t("Đúng", "Correct")}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Zap className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-foreground">{result.maxStreak}x</p>
          <p className="text-xs text-muted-foreground">{t("Chuỗi dài nhất", "Best Streak")}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-foreground">
            {result.wordResults.length > 0
              ? (result.wordResults.reduce((s, w) => s + w.timeMs, 0) / result.wordResults.length / 1000).toFixed(1)
              : 0}
            s
          </p>
          <p className="text-xs text-muted-foreground">{t("TB/câu", "Avg/Q")}</p>
        </div>
      </div>

      {/* Missed words */}
      {missed.length > 0 && (
        <div className="mb-8 text-left">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> {t("Từ cần ôn lại", "Words to review")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {missed.map((w) => (
              <span
                key={w.word}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20"
              >
                {w.word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <Button onClick={onReplay} className="gap-2">
          <RotateCcw className="w-4 h-4" /> {t("Chơi lại", "Play Again")}
        </Button>
        <Button variant="outline" onClick={onHome} className="gap-2">
          <Home className="w-4 h-4" /> {t("Về trang chính", "Back")}
        </Button>
      </div>
    </motion.div>
  );
};

export default GameOver;
