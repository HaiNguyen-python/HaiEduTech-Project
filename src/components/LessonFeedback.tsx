// Micro-survey component for lesson rating (Like/Dislike)
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface LessonFeedbackProps {
  lessonId: string;
  moduleId?: string;
  lessonType: "english" | "chinese" | "programming";
  subject?: string;
}

const LessonFeedback = ({ lessonId, moduleId, lessonType, subject }: LessonFeedbackProps) => {
  const { t } = useLanguage();
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFeedback = async (type: "like" | "dislike") => {
    if (feedback) return; // Already submitted
    setSubmitting(true);
    setFeedback(type);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      await supabase.from("lesson_feedback").insert({
        lesson_id: lessonId,
        module_id: moduleId || null,
        lesson_type: lessonType,
        feedback_type: type,
        subject: subject || lessonType,
        user_id: user?.id || null,
      });

      toast({
        title: type === "like"
          ? t("Cảm ơn bạn! 🎉", "Thank you! 🎉")
          : t("Cảm ơn phản hồi! 💪", "Thanks for the feedback! 💪"),
        description: type === "like"
          ? t("Rất vui vì bạn thấy bài học hữu ích!", "Glad you found this lesson helpful!")
          : t("Chúng tôi sẽ cải thiện nội dung này.", "We'll work on improving this content."),
      });
    } catch (err) {
      console.error("Feedback error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col items-center gap-3 py-6 mt-6 border-t border-border"
    >
      <p className="text-sm text-muted-foreground font-medium">
        {t("Bạn có thấy phần này bổ ích không?", "Did you find this lesson helpful?")}
      </p>

      <div className="flex items-center gap-4">
        <AnimatePresence>
          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleFeedback("like")}
            disabled={!!feedback || submitting}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              feedback === "like"
                ? "bg-green-500/20 text-green-600 border-2 border-green-500/40 scale-110"
                : feedback
                  ? "opacity-40 cursor-not-allowed bg-muted text-muted-foreground"
                  : "bg-muted hover:bg-green-500/10 hover:text-green-600 text-muted-foreground border border-border hover:border-green-500/30"
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${feedback === "like" ? "fill-green-500" : ""}`} />
            {t("Hữu ích", "Helpful")}
            {feedback === "like" && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                ✓
              </motion.span>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleFeedback("dislike")}
            disabled={!!feedback || submitting}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              feedback === "dislike"
                ? "bg-orange-500/20 text-orange-600 border-2 border-orange-500/40 scale-110"
                : feedback
                  ? "opacity-40 cursor-not-allowed bg-muted text-muted-foreground"
                  : "bg-muted hover:bg-orange-500/10 hover:text-orange-600 text-muted-foreground border border-border hover:border-orange-500/30"
            }`}
          >
            <ThumbsDown className={`w-4 h-4 ${feedback === "dislike" ? "fill-orange-500" : ""}`} />
            {t("Cần cải thiện", "Needs improvement")}
            {feedback === "dislike" && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        </AnimatePresence>
      </div>

      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-muted-foreground italic"
        >
          {t("Phản hồi đã được ghi nhận. Cảm ơn bạn!", "Feedback recorded. Thank you!")}
        </motion.p>
      )}
    </motion.div>
  );
};

export default LessonFeedback;
