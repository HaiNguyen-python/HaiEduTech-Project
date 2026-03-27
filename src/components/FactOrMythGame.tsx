// "Fact or Myth?" interactive game for Vietnamese History & Culture
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { factOrMythItems } from "@/data/vietnameseCurriculumData";
import { Button } from "@/components/ui/button";

const FactOrMythGame = () => {
  const { t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const item = factOrMythItems[currentIdx];

  const handleAnswer = useCallback(
    (isFact: boolean) => {
      if (answer !== null) return;
      setAnswer(isFact);
      setShowResult(true);
      setAnswered((p) => p + 1);
      if (isFact === item.isFact) {
        setScore((p) => p + 1);
      }
    },
    [answer, item]
  );

  const nextQuestion = () => {
    if (currentIdx + 1 >= factOrMythItems.length) {
      setGameOver(true);
    } else {
      setCurrentIdx((p) => p + 1);
      setAnswer(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setAnswer(null);
    setScore(0);
    setAnswered(0);
    setShowResult(false);
    setGameOver(false);
  };

  if (gameOver) {
    const pct = Math.round((score / factOrMythItems.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t("Hoàn thành!", "Game Over!")}
        </h3>
        <p className="text-lg text-muted-foreground mb-1">
          {t("Điểm của bạn", "Your score")}: <span className="font-bold text-primary">{score}/{factOrMythItems.length}</span> ({pct}%)
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          {pct >= 80
            ? t("Xuất sắc! Bạn hiểu rõ về Việt Nam! 🎉", "Excellent! You know Vietnam well! 🎉")
            : pct >= 50
            ? t("Khá tốt! Hãy tiếp tục học nhé!", "Good job! Keep learning!")
            : t("Hãy đọc thêm và thử lại nhé!", "Read more and try again!")}
        </p>
        <Button onClick={restart} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          {t("Chơi lại", "Play Again")}
        </Button>
      </motion.div>
    );
  }

  const isCorrect = answer === item.isFact;
  const categoryEmoji =
    item.category === "history" ? "📜" : item.category === "culture" ? "🎭" : "🌍";

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span>
          {t("Câu hỏi", "Question")} {currentIdx + 1}/{factOrMythItems.length}
        </span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-primary" />
          {score}/{answered}
        </span>
      </div>

      {/* Statement card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          className="bg-card border border-border rounded-xl p-6 mb-6 shadow-sm"
        >
          <span className="text-2xl mb-3 block">{categoryEmoji}</span>
          <p className="text-lg font-semibold text-foreground leading-relaxed">
            {t(item.statement, item.statementEn)}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Answer buttons */}
      {!showResult ? (
        <div className="flex gap-4">
          <Button
            onClick={() => handleAnswer(true)}
            className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            <CheckCircle2 className="w-5 h-5" />
            {t("Sự thật!", "Fact!")}
          </Button>
          <Button
            onClick={() => handleAnswer(false)}
            className="flex-1 gap-2 bg-red-600 hover:bg-red-700 text-white"
            size="lg"
          >
            <XCircle className="w-5 h-5" />
            {t("Huyền thoại!", "Myth!")}
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className={`p-4 rounded-lg border mb-4 ${
              isCorrect
                ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800"
                : "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"
            }`}
          >
            <p className="font-bold mb-1">
              {isCorrect
                ? t("✅ Chính xác!", "✅ Correct!")
                : t("❌ Sai rồi!", "❌ Wrong!")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t(item.explanation, item.explanationEn)}
            </p>
          </div>
          <Button onClick={nextQuestion} className="w-full">
            {currentIdx + 1 >= factOrMythItems.length
              ? t("Xem kết quả", "See Results")
              : t("Câu tiếp theo →", "Next Question →")}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default FactOrMythGame;
