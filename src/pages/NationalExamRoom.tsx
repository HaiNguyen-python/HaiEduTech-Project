import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { categoryLabels } from "@/data/thptExamData";
import { loadExamById } from "@/data/thptExamIndex";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw, Award, ArrowLeft, BookOpen, TimerOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import TechTeacherIcon from "@/components/TechTeacherIcon";
import type { ThptExam } from "@/data/thptExamData";
import { logStudentActivity } from "@/hooks/useActivityLogger";

type ExamPhase = "loading" | "taking" | "result" | "review";

const NationalExamRoom = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const isTimed = searchParams.get("mode") !== "untimed";

  const [exam, setExam] = useState<ThptExam | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [phase, setPhase] = useState<ExamPhase>("loading");
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [score, setScore] = useState(0);
  const [categoryStats, setCategoryStats] = useState<Record<string, { correct: number; total: number }>>({});

  // Dynamic load exam data
  useEffect(() => {
    if (!examId) return;
    let cancelled = false;
    setPhase("loading");
    loadExamById(examId).then((data) => {
      if (cancelled) return;
      if (!data) {
        setExam(null);
        setPhase("taking");
        return;
      }
      setExam(data);
      setTimeLeft(data.duration * 60);
      // Restore auto-saved answers
      try {
        const saved = localStorage.getItem(`thpt-progress-${data.id}`);
        if (saved) setAnswers(JSON.parse(saved));
      } catch {}
      setPhase("taking");
    });
    return () => { cancelled = true; };
  }, [examId]);

  // Timer - only runs in timed mode
  useEffect(() => {
    if (phase !== "taking" || !exam || !isTimed) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, exam, isTimed]);

  // Auto-save answers
  useEffect(() => {
    if (exam && phase === "taking") {
      localStorage.setItem(`thpt-progress-${exam.id}`, JSON.stringify(answers));
    }
  }, [answers, exam, phase]);

  const handleAnswer = useCallback((qId: number, optIdx: number) => {
    if (phase !== "taking") return;
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  }, [phase]);

  const handleSubmit = useCallback(() => {
    if (!exam) return;
    if (timerRef.current) clearInterval(timerRef.current);

    let correct = 0;
    const stats: Record<string, { correct: number; total: number }> = {};

    exam.questions.forEach((q) => {
      const cat = q.category;
      if (!stats[cat]) stats[cat] = { correct: 0, total: 0 };
      stats[cat].total++;
      if (answers[q.id] === q.correct) {
        correct++;
        stats[cat].correct++;
      }
    });

    const finalScore = (correct / exam.totalQuestions) * 10;
    setScore(finalScore);
    setCategoryStats(stats);
    setPhase("result");

    // Save best score
    const rounded = Math.round(finalScore * 10) / 10;
    try {
      const prev = localStorage.getItem(`thpt-result-${exam.id}`);
      const prevScore = prev ? JSON.parse(prev).score : 0;
      if (rounded > prevScore) {
        localStorage.setItem(`thpt-result-${exam.id}`, JSON.stringify({ score: rounded, date: new Date().toISOString() }));
      }
    } catch {
      localStorage.setItem(`thpt-result-${exam.id}`, JSON.stringify({ score: rounded, date: new Date().toISOString() }));
    }

    // Remove progress
    localStorage.removeItem(`thpt-progress-${exam.id}`);

    // Log activity to database for admin analytics
    logStudentActivity({
      activityType: "thpt_exam",
      activityId: exam.id,
      score: finalScore,
      maxScore: 10,
      timeSpentSeconds: exam.duration * 60 - timeLeft,
      metadata: { categoryStats: stats, answeredCount: Object.keys(answers).length, totalQuestions: exam.totalQuestions },
    });

    if (finalScore >= 9) {
      confetti({ particleCount: 150, spread: 90 });
      toast.success(t("Xuất sắc! Tiếp tục phát huy! 🎉", "Excellent! Keep it up! 🎉"));
    } else if (finalScore >= 7) {
      toast.success(t("Tốt lắm! Cố gắng thêm nhé!", "Good job! Keep practicing!"));
    }
  }, [exam, answers, t]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // ========== LOADING ==========
  if (phase === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">{t("Đang tải đề thi...", "Loading exam...")}</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{t("Không tìm thấy đề thi", "Exam not found")}</p>
          <Button onClick={() => navigate("/national-exam")}><ArrowLeft className="w-4 h-4 mr-2" />{t("Quay lại", "Go back")}</Button>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  // ========== RESULT PHASE ==========
  if (phase === "result") {
    const correct = exam.questions.filter((q) => answers[q.id] === q.correct).length;
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-8">
            <TechTeacherIcon size={64} />
            <h1 className="text-3xl font-display font-bold text-foreground mt-4 mb-2">{t("Kết Quả Thi Thử", "Exam Results")}</h1>
            <p className="text-muted-foreground">{t(exam.title, exam.titleEn)} — {t("Mã đề", "Code")}: {exam.code}</p>
          </motion.div>

          {/* Score card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-8 text-center mb-8">
            <div className={`text-6xl font-display font-bold mb-2 ${score >= 8 ? "text-green-600" : score >= 6 ? "text-yellow-600" : "text-destructive"}`}>
              {score.toFixed(1)}<span className="text-2xl text-muted-foreground">/10</span>
            </div>
            <p className="text-muted-foreground">{correct}/{exam.totalQuestions} {t("câu đúng", "correct")}</p>
            <p className="text-sm mt-2 font-medium">
              {score >= 9 ? t("🏆 Xuất sắc! Tiếp tục phát huy nhé!", "🏆 Excellent work! Keep it up!") :
               score >= 7 ? t("👍 Tốt lắm! Cần cải thiện thêm một chút.", "👍 Good! A little more practice needed.") :
               score >= 5 ? t("💪 Cố gắng hơn nữa nhé!", "💪 Keep working hard!") :
               t("📚 Cần ôn tập lại kiến thức cơ bản.", "📚 Review the basics and try again.")}
            </p>
          </motion.div>

          {/* Category breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6 mb-8">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> {t("Phân tích theo kỹ năng", "Skill Breakdown")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(categoryStats).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)).map(([cat, data]) => {
                const pct = Math.round((data.correct / data.total) * 100);
                const label = categoryLabels[cat] ? t(categoryLabels[cat].vi, categoryLabels[cat].en) : cat;
                return (
                  <div key={cat} className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">{label}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div className={`h-2 rounded-full ${pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-destructive"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-bold">{data.correct}/{data.total}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={() => setPhase("review")} className="gap-2"><BookOpen className="w-4 h-4" /> {t("Xem lại bài làm", "Review Answers")}</Button>
            <Button variant="outline" onClick={() => { setAnswers({}); setPhase("taking"); setTimeLeft(exam.duration * 60); setCurrentQ(0); }} className="gap-2">
              <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Retake")}
            </Button>
            <Button variant="outline" onClick={() => navigate("/national-exam")} className="gap-2"><ArrowLeft className="w-4 h-4" /> {t("Danh sách đề", "All Exams")}</Button>
          </div>
        </div>
      </div>
    );
  }

  // ========== REVIEW PHASE ==========
  if (phase === "review") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setPhase("result")}><ArrowLeft className="w-4 h-4 mr-1" /> {t("Kết quả", "Results")}</Button>
            <h1 className="text-xl font-bold text-foreground">{t("Xem lại bài làm", "Review Answers")} — {t(exam.title, exam.titleEn)}</h1>
          </div>

          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-4 pb-8">
              {/* Show passages */}
              {exam.passages.map((passage) => (
                <div key={passage.id} className="glass-card rounded-xl p-5 mb-4">
                  <h3 className="font-bold text-foreground mb-2">{passage.title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{passage.text}</p>
                </div>
              ))}

              {exam.questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correct;
                const cat = categoryLabels[q.category] ? t(categoryLabels[q.category].vi, categoryLabels[q.category].en) : q.category;

                return (
                  <motion.div key={q.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }}
                    className={`rounded-xl p-5 border-2 ${isCorrect ? "border-green-300 bg-green-50/50 dark:bg-green-950/20" : "border-destructive/30 bg-red-50/50 dark:bg-red-950/20"}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{q.id}</span>
                      <div className="flex-1">
                        <p className="text-foreground font-medium">{q.text}</p>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded mt-1 inline-block">{cat}</span>
                      </div>
                      {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-11">
                      {q.options.map((opt, oi) => {
                        const isSelected = userAnswer === oi;
                        const isRight = q.correct === oi;
                        let cls = "border rounded-lg px-3 py-2 text-sm ";
                        if (isRight) cls += "border-green-500 bg-green-100/60 dark:bg-green-900/30 text-foreground font-medium";
                        else if (isSelected && !isRight) cls += "border-destructive bg-red-100/60 dark:bg-red-900/30 text-foreground line-through";
                        else cls += "border-border text-muted-foreground";
                        return (
                          <div key={oi} className={cls}>
                            <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                          </div>
                        );
                      })}
                    </div>

                    {!isCorrect && q.explanation && (
                      <div className="mt-3 ml-11 bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
                        💡 {q.explanation}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

  // ========== TAKING PHASE ==========
  const currentQuestion = exam.questions[currentQ];
  const relatedPassage = exam.passages.find(
    (p) => currentQuestion && currentQuestion.id >= p.questionRange[0] && currentQuestion.id <= p.questionRange[1]
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/national-exam")}><ArrowLeft className="w-4 h-4" /></Button>
            <div>
              <h1 className="text-sm font-bold text-foreground">{t(exam.title, exam.titleEn)}</h1>
              <p className="text-xs text-muted-foreground">{t("Mã đề", "Code")}: {exam.code}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {answeredCount}/{exam.totalQuestions} {t("đã trả lời", "answered")}
            </div>
            {isTimed ? (
              <div className={`flex items-center gap-1.5 font-mono font-bold text-lg ${timeLeft < 300 ? "text-destructive animate-pulse" : "text-foreground"}`}>
                <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <TimerOff className="w-4 h-4" /> {t("Không giới hạn", "Untimed")}
              </div>
            )}
            <Button size="sm" onClick={handleSubmit} disabled={answeredCount === 0} className="bg-primary hover:bg-primary/90">
              {t("Nộp bài", "Submit")}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 container mx-auto max-w-6xl flex gap-4 p-4">
        {/* Left: Question area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }}>
              {/* Passage if applicable */}
              {relatedPassage && (
                <div className="glass-card rounded-xl p-6 mb-4">
                  <h3 className="font-extrabold text-foreground text-lg md:text-xl mb-3">{relatedPassage.title}</h3>
                  <p className="text-lg md:text-xl font-medium text-foreground/80 whitespace-pre-line leading-loose">{relatedPassage.text}</p>
                </div>
              )}

              {/* Question */}
              {currentQuestion && (
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-5">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">{currentQuestion.id}</span>
                    <p className="text-foreground text-lg md:text-xl font-medium pt-1.5">{currentQuestion.text}</p>
                  </div>
                  <div className="space-y-3 ml-13">
                    {currentQuestion.options.map((opt, oi) => {
                      const isSelected = answers[currentQuestion.id] === oi;
                      return (
                        <button
                          key={oi}
                          onClick={() => handleAnswer(currentQuestion.id, oi)}
                          className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-base ${
                            isSelected
                              ? "border-primary bg-primary/10 text-foreground font-medium"
                              : "border-border hover:border-primary/40 text-foreground"
                          }`}
                        >
                          <span className="font-bold mr-3">{String.fromCharCode(65 + oi)}.</span>{opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" disabled={currentQ === 0} onClick={() => setCurrentQ((p) => p - 1)}>
                      <ChevronLeft className="w-4 h-4 mr-1" /> {t("Câu trước", "Previous")}
                    </Button>
                    <span className="text-sm text-muted-foreground">{currentQ + 1} / {exam.totalQuestions}</span>
                    <Button variant="outline" size="sm" disabled={currentQ >= exam.totalQuestions - 1} onClick={() => setCurrentQ((p) => p + 1)}>
                      {t("Câu sau", "Next")} <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Bubble grid */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="glass-card rounded-xl p-4 sticky top-24">
            <h3 className="text-sm font-bold text-foreground mb-3">{t("Phiếu trả lời", "Answer Sheet")}</h3>
            <div className="grid grid-cols-5 gap-2">
              {exam.questions.map((q, idx) => {
                const answered = answers[q.id] !== undefined;
                const isCurrent = idx === currentQ;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQ(idx)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-primary text-primary-foreground ring-2 ring-primary/50"
                        : answered
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary/20" /> {t("Đã trả lời", "Answered")}</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-muted" /> {t("Chưa trả lời", "Unanswered")}</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary ring-1 ring-primary/50" /> {t("Câu hiện tại", "Current")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalExamRoom;
