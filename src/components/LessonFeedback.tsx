// Floating lesson Attendance & Feedback widget.
// Only renders when a student is logged in. Combines:
//   - Attendance check-in (Present / Absent) -> lesson_attendance table
//   - Likert ratings + free-form suggestion  -> lesson_feedback table
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart, X, Star, Send, CheckCircle2, XCircle, Heart } from "lucide-react";
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

type Attendance = "present" | "absent" | null;

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
    <span className="text-sm font-bold text-foreground leading-tight">{label}</span>
    <div className="flex gap-1 shrink-0">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
          aria-label={`${label} ${n}`}
        >
          <Star
            className={`w-5 h-5 ${
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
  const [authed, setAuthed] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState<Attendance>(null);
  // Single combined rating per user request — replaces three separate Likert rows.
  const [overall, setOverall] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Only show widget for logged-in students
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setAuthed(!!data.user);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session?.user);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const canSubmit =
    !submitting && (attendance !== null || overall > 0 || suggestion.trim().length > 0);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: t("Cần đăng nhập", "Login required"),
          description: t("Vui lòng đăng nhập để điểm danh.", "Please log in to check in."),
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      const path = typeof window !== "undefined" ? window.location.pathname : "/";
      const resolvedLessonId = lessonId || path;
      const resolvedType = lessonType || "general";
      const resolvedTitle = lessonTitle || (typeof document !== "undefined" ? document.title : null);

      const hasFeedback = overall > 0 || suggestion.trim().length > 0;
      const fbType: "like" | "dislike" = overall >= 3 ? "like" : "dislike";
      const attendanceSnapshot = attendance;
      const overallSnapshot = overall;
      const suggestionSnapshot = suggestion.trim();

      // Optimistic UI: show success immediately, run writes in the background.
      setSubmitted(true);
      toast({
        title: t("Đã ghi nhận! 💛", "Recorded! 💛"),
        description: attendanceSnapshot
          ? t("Cảm ơn bạn đã điểm danh hôm nay.", "Thanks for checking in today.")
          : t("Cảm ơn phản hồi của bạn.", "Thanks for your feedback."),
      });
      setAttendance(null);
      setOverall(0);
      setSuggestion("");
      setSubmitting(false);

      void (async () => {
        try {
          const tasks: Promise<unknown>[] = [];
          const run = (q: any) => Promise.resolve(q);
          if (attendanceSnapshot) {
            tasks.push(
              supabase.from("lesson_attendance").upsert(
                {
                  user_id: user.id,
                  lesson_id: resolvedLessonId,
                  lesson_title: resolvedTitle,
                  lesson_type: resolvedType,
                  subject: subject || resolvedType,
                  status: attendanceSnapshot,
                } as never,
                { onConflict: "user_id,lesson_id,attendance_date" } as never,
              ),
            );
          }
          if (hasFeedback) {
            tasks.push(
              supabase.from("lesson_feedback").insert({
                lesson_id: resolvedLessonId,
                module_id: moduleId || null,
                lesson_type: resolvedType,
                feedback_type: fbType,
                subject: subject || resolvedType,
                user_id: user.id,
                rating_clarity: overallSnapshot || null,
                rating_ai_tool: overallSnapshot || null,
                rating_confidence: overallSnapshot || null,
                suggestion: suggestionSnapshot || null,
                lesson_title: resolvedTitle,
              } as never),
            );
          }
          await Promise.allSettled(tasks);
        } catch (err) {
          console.error("Feedback background error:", err);
        }
      })();
    } catch (err) {
      console.error("Feedback error:", err);
      toast({
        title: t("Gửi thất bại", "Submit failed"),
        description: t("Vui lòng thử lại sau.", "Please try again."),
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };


  // Hide entirely for guests
  if (!authed) return null;

  return (
    <>
      {/* Floating tab on right edge — compact "Feedback" only */}
      <motion.button
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed right-0 top-[40%] -translate-y-1/2 z-[60] flex flex-col items-center gap-1 px-1.5 py-2 rounded-l-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/30 border-l border-y border-amber-300/50 hover:shadow-xl"
        aria-label={t("Phản hồi", "Feedback")}
      >
        <MessageSquareHeart className="w-4 h-4 shrink-0" />
        <span
          className="text-[11px] font-bold tracking-wide leading-tight"
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
              onClick={() => { setOpen(false); setSubmitted(false); }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed right-6 sm:right-10 top-[20%] z-50 w-[min(420px,calc(100vw-3.5rem))] max-h-[calc(100vh-6rem)] flex flex-col overflow-hidden rounded-2xl bg-card border-2 border-amber-300/40 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between gap-2 px-5 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-t-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🧑‍🏫</span>
                  <div className="flex flex-col">
                    <span className="text-base font-bold">
                      {t("Điểm danh & Phản hồi bài học", "Attendance & Lesson Feedback")}
                    </span>
                    <span className="text-sm font-extrabold tracking-wide flex items-center gap-1 whitespace-nowrap text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                      {t("Mr. Hai luôn lắng nghe bạn!", "Mr. Hai always listens to you!")}
                      <Heart className="w-4 h-4 fill-red-500 text-red-500 shrink-0" />
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => { setOpen(false); setSubmitted(false); }}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <div className="p-4 space-y-4">
                  {submitted ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-2 py-8 text-center"
                    >
                      <div className="text-5xl">🎉</div>
                      <p className="font-semibold text-foreground text-base">
                        {t("Cảm ơn phản hồi của bạn!", "Thank you for your feedback.")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("Mr. Hai rất trân trọng ý kiến của bạn.", "Mr. Hai truly values your input.")}
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {/* Attendance check-in (moved up & relabeled) */}
                      <div>
                        <p className="text-sm font-bold text-foreground mb-2">
                          {t("📋 Điểm danh hôm nay", "📋 Check in for today")}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setAttendance("present")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                              attendance === "present"
                                ? "bg-green-500/15 border-green-500/50 text-green-600"
                                : "bg-muted border-transparent hover:border-green-500/30 text-muted-foreground"
                            }`}
                          >
                            <CheckCircle2 className={`w-4 h-4 ${attendance === "present" ? "fill-green-500/30" : ""}`} />
                            {t("Có mặt", "Present")}
                          </button>
                          <button
                            onClick={() => setAttendance("absent")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                              attendance === "absent"
                                ? "bg-orange-500/15 border-orange-500/50 text-orange-600"
                                : "bg-muted border-transparent hover:border-orange-500/30 text-muted-foreground"
                            }`}
                          >
                            <XCircle className={`w-4 h-4 ${attendance === "absent" ? "fill-orange-500/30" : ""}`} />
                            {t("Vắng mặt", "Absent")}
                          </button>
                        </div>
                      </div>

                      {/* Single combined Likert per user request */}
                      <div className="p-3 rounded-xl bg-muted/40 border border-border">
                        <StarRow
                          label={t(
                            "Tôi cảm thấy vui và tự tin sau bài học hôm nay.",
                            "I feel happy and confident after my lesson today.",
                          )}
                          value={overall}
                          onChange={setOverall}
                        />
                      </div>

                      {/* Prompt + suggestion (moved DOWN, right next to Likert) */}
                      <p className="text-sm font-bold text-foreground leading-snug pt-1">
                        {t(
                          "Bạn thấy bài học hôm nay thế nào?",
                          "How was this lesson today?",
                        )}
                      </p>
                      <div className="flex flex-col gap-1">
                        <textarea
                          value={suggestion}
                          onChange={(e) => setSuggestion(e.target.value.slice(0, 500))}
                          rows={3}
                          placeholder={t("Viết cảm nhận của bạn...", "Write your thoughts...")}
                          className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none"
                        />
                        <span className="text-[11px] text-muted-foreground text-right">
                          {suggestion.length}/500
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Sticky submit footer */}
              <div className="shrink-0 p-4 border-t-2 border-amber-300/40 bg-card rounded-b-2xl shadow-[0_-10px_24px_-18px_hsl(var(--foreground))]">
                <button
                  onClick={handleSubmit}
                  disabled={submitted || !canSubmit}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-base shadow-lg shadow-orange-500/30 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Send className="w-4 h-4" />
                  {submitted
                    ? t("Đã gửi", "Submitted")
                    : submitting
                      ? t("Đang gửi...", "Sending...")
                      : t("Gửi", "Submit")}
                </button>
                {!submitted && !canSubmit && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {t(
                      "Hãy điểm danh hoặc đánh giá để gửi",
                      "Check in or rate to submit",
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
