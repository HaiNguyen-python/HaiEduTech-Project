// Floating right-edge lesson feedback widget (chatbot-style tab)
// Lets students submit a quick post-lesson rating + suggestion without leaving the page.
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart, X, Star, Send, ThumbsUp, ThumbsDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface LessonFeedbackProps {
  lessonId?: string;
  moduleId?: string;
  lessonType?: "english" | "chinese" | "programming" | "vietnamese" | "finnish" | "general";
  subject?: string;
  lessonTitle?: string;
}

type Quick = "like" | "dislike" | null;

const StarRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-xs font-bold text-foreground leading-tight">{label}</span>
    <div className="flex gap-0.5 shrink-0">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
          aria-label={`${label} ${n}`}
        >
          <Star
            className={`w-4 h-4 ${
              n <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  </div>
);

const LessonFeedback = ({
  lessonId,
  moduleId,
  lessonType,
  subject,
  lessonTitle,
}: LessonFeedbackProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quick, setQuick] = useState<Quick>(null);
  const [clarity, setClarity] = useState(0);
  const [aiTool, setAiTool] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    !submitting && (quick !== null || clarity > 0 || aiTool > 0 || confidence > 0 || suggestion.trim().length > 0);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const fbType: "like" | "dislike" =
        quick ?? ((clarity + aiTool + confidence) / 3 >= 3 ? "like" : "dislike");

      const path = typeof window !== "undefined" ? window.location.pathname : "/";
      const resolvedLessonId = lessonId || path;
      const resolvedType = lessonType || "general";

      await supabase.from("lesson_feedback").insert({
        lesson_id: resolvedLessonId,
        module_id: moduleId || null,
        lesson_type: resolvedType,
        feedback_type: fbType,
        subject: subject || resolvedType,
        user_id: user?.id || null,
        rating_clarity: clarity || null,
        rating_ai_tool: aiTool || null,
        rating_confidence: confidence || null,
        suggestion: suggestion.trim() || null,
        lesson_title: lessonTitle || (typeof document !== "undefined" ? document.title : null),
      } as never);

      setSubmitted(true);
      toast({
        title: t("Cảm ơn phản hồi của bạn! 💛", "Thanks for your feedback! 💛"),
        description: t(
          "Thầy sẽ dùng phản hồi này để cải thiện bài học.",
          "We'll use this to improve future lessons.",
        ),
      });
      setTimeout(() => setOpen(false), 1200);
    } catch (err) {
      console.error("Feedback error:", err);
      toast({
        title: t("Gửi thất bại", "Submit failed"),
        description: t("Vui lòng thử lại sau.", "Please try again."),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating tab on right edge */}
      <motion.button
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed right-0 top-[40%] -translate-y-1/2 z-[60] flex flex-col items-center gap-1 px-1.5 py-2.5 rounded-l-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl shadow-orange-500/30 border-l border-y border-amber-300/50 hover:shadow-2xl"
        aria-label={t("Gửi phản hồi bài học", "Send lesson feedback")}
      >
        <MessageSquareHeart className="w-4 h-4 shrink-0" />
        <span
          className="text-[10px] font-bold tracking-wider leading-tight"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {t("PHẢN HỒI", "FEEDBACK")}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed right-14 top-[calc(40vh-3rem)] z-50 w-[min(340px,calc(100vw-4.5rem))] max-h-[calc(60vh+2rem)] flex flex-col overflow-hidden rounded-2xl bg-card border-2 border-amber-300/40 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧑‍🏫</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      {t("Phản hồi bài học", "Lesson Feedback")}
                    </span>
                    <span className="text-[10px] opacity-90">
                      {t("Mr. Hai lắng nghe bạn", "Mr. Hai is listening")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <div className="p-3 space-y-3">
                  {submitted ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-2 py-8 text-center"
                    >
                      <div className="text-5xl">🎉</div>
                      <p className="font-semibold text-foreground">
                        {t("Đã ghi nhận!", "Recorded!")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("Cảm ơn bạn rất nhiều.", "Thank you so much.")}
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <p className="text-xs font-bold text-foreground leading-snug">
                         {t(
                          "Bạn thấy bài học hôm nay thế nào? Phản hồi giúp thầy cải thiện nội dung.",
                          "How was this lesson today? Your feedback helps improve content.",
                        )}
                      </p>

                      {/* Quick reaction */}
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setQuick("like")}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                            quick === "like"
                              ? "bg-green-500/15 border-green-500/50 text-green-600"
                              : "bg-muted border-transparent hover:border-green-500/30 text-muted-foreground"
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${quick === "like" ? "fill-green-500" : ""}`} />
                          {t("Hữu ích", "Helpful")}
                        </button>
                        <button
                          onClick={() => setQuick("dislike")}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                            quick === "dislike"
                              ? "bg-orange-500/15 border-orange-500/50 text-orange-600"
                              : "bg-muted border-transparent hover:border-orange-500/30 text-muted-foreground"
                          }`}
                        >
                          <ThumbsDown className={`w-3.5 h-3.5 ${quick === "dislike" ? "fill-orange-500" : ""}`} />
                          {t("Cần cải thiện", "Needs Improvement")}
                        </button>
                      </div>

                      {/* Detailed ratings */}
                      <div className="space-y-2 p-2.5 rounded-xl bg-muted/40 border border-border">
                        <StarRow
                          label={t("Độ rõ ràng nội dung", "Content clarity")}
                          value={clarity}
                          onChange={setClarity}
                        />
                        <StarRow
                          label={t("Mức độ hấp dẫn của bài học", "Lesson Engagement")}
                          value={aiTool}
                          onChange={setAiTool}
                        />
                        <StarRow
                          label={t("Tự tin sau bài học", "Confidence after lesson")}
                          value={confidence}
                          onChange={setConfidence}
                        />
                      </div>

                      {/* Suggestion */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-foreground">
                          {t("Góp ý cho thầy (tùy chọn)", "Suggestion (optional)")}
                        </label>
                        <textarea
                          value={suggestion}
                          onChange={(e) => setSuggestion(e.target.value.slice(0, 500))}
                          rows={2}
                          placeholder={t(
                            "Bạn muốn thầy điều chỉnh điều gì?",
                            "What would you like Mr. Hai to improve?",
                          )}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none"
                        />
                        <span className="text-[10px] text-muted-foreground text-right">
                          {suggestion.length}/500
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Sticky submit footer */}
              <div className="shrink-0 p-3 border-t-2 border-amber-300/40 bg-card rounded-b-2xl shadow-[0_-10px_24px_-18px_hsl(var(--foreground))]">
                <button
                  onClick={handleSubmit}
                  disabled={submitted || !canSubmit}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-500/30 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Send className="w-4 h-4" />
                  {submitted
                    ? t("Đã gửi", "Submitted")
                    : submitting
                      ? t("Đang gửi...", "Sending...")
                      : t("Nộp feedback", "Submit")}
                </button>
                {!submitted && !canSubmit && (
                  <p className="text-[10px] text-muted-foreground text-center mt-1.5">
                    {t(
                      "Chọn ít nhất 1 mục để gửi",
                      "Select at least one item to submit",
                    )}
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LessonFeedback;
