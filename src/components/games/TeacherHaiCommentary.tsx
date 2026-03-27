// Teacher Hai mascot commentary that reacts to game state
// Shows encouraging messages based on score, streak, and game events

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface TeacherHaiCommentaryProps {
  streak: number;
  score: number;
  event?: "correct" | "wrong" | "streak5" | "gameover" | "win" | "powerup" | null;
}

const TeacherHaiCommentary = ({ streak, score, event }: TeacherHaiCommentaryProps) => {
  const { t } = useLanguage();

  const getMessage = (): string => {
    if (event === "win") return t("🎉 Xuất sắc! Bạn là nhà vô địch!", "🎉 Amazing! You're a champion!");
    if (event === "gameover") return t("💪 Đừng bỏ cuộc! Thử lại nhé!", "💪 Don't give up! Try again!");
    if (event === "powerup") return t("⚡ Power-up! Tận dụng ngay!", "⚡ Power-up! Use it wisely!");
    if (event === "streak5") return t("🔥 Chuỗi 5! Không thể cản nổi!", "🔥 5 streak! Unstoppable!");
    if (streak >= 10) return t("🌟 Siêu sao! Kỷ lục mới đang chờ!", "🌟 Superstar! A new record awaits!");
    if (streak >= 5) return t("🔥 Cố lên! Bạn gần phá kỷ lục rồi!", "🔥 Keep going! You're almost at the record!");
    if (event === "correct") return t("✅ Đúng rồi! Giỏi lắm!", "✅ Correct! Well done!");
    if (event === "wrong") return t("😅 Sai rồi, nhưng không sao!", "😅 Wrong, but it's okay!");
    if (score > 500) return t("🚀 Điểm cao quá! Thầy tự hào!", "🚀 High score! I'm proud!");
    return t("🎮 Let's go! Bạn làm được!", "🎮 Let's go! You can do it!");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${event}-${streak}-${score}`}
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/80 border border-primary/30 backdrop-blur-sm"
      >
        <span className="text-xl">🧑‍🏫</span>
        <span className="text-sm font-medium text-foreground">{getMessage()}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default TeacherHaiCommentary;
