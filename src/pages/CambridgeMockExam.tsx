import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw, Award, ArrowLeft, BookOpen, TimerOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { cambridgeMockExams, CAMBRIDGE_LEVEL_LABELS, type CambridgeMockExam as ExamType, type CambridgeMockQuestion } from "@/data/cambridgeMockExamData";
import { logStudentActivity } from "@/hooks/useActivityLogger";

type ExamPhase = "loading" | "taking" | "result" | "review";

const CambridgeMockExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const isTimed = searchParams.get("mode") !== "untimed";

  const [exam, setExam] = useState<ExamType | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [phase, setPhase] = useState<ExamPhase>("loading");
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [score, setScore] = useState(0);
  const [sectionStats, setSectionStats] = useState<Record<string, { correct: number; total: number }>>({});

  useEffect(() => {
    if (!examId) return;
    const found = cambridgeMockExams.find(e => e.id === examId);
    if (found) {
      setExam(found);
      setTimeLeft(found.duration * 60);
      const saved = localStorage.getItem(`cambridge-mock-${examId}-answers`);
      if (saved) {
        try { setAnswers(JSON.parse(saved)); } catch {}
      }
    }
    setPhase("taking");
  }, [examId]);

  // Timer
  useEffect(() => {
    if (phase !== "taking" || !isTimed || !exam) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, isTimed, exam]);

  // Auto-save
  useEffect(() => {
    if (phase === "taking" && examId && Object.keys(answers).length > 0) {
      localStorage.setItem(`cambridge-mock-${examId}-answers`, JSON.stringify(answers));
    }
  }, [answers, phase, examId]);

  const handleAnswer = useCallback((qId: number, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!exam) return;
    if (timerRef.current) clearInterval(timerRef.current);

    let correct = 0;
    const stats: Record<string, { correct: number; total: number }> = {};

    exam.questions.forEach(q => {
      const section = q.section;
      if (!stats[section]) stats[section] = { correct: 0, total: 0 };
      stats[section].total++;
      if (answers[q.id] === q.correctAnswer) {
        correct++;
        stats[section].correct++;
      }
    });

    setScore(correct);
    setSectionStats(stats);
    setPhase("result");

    localStorage.removeItem(`cambridge-mock-${examId}-answers`);

    const pct = Math.round((correct / exam.totalQuestions) * 100);
    const prev = localStorage.getItem(`cambridge-mock-best-${examId}`);
    if (!prev || correct > parseInt(prev)) {
      localStorage.setItem(`cambridge-mock-best-${examId}`, String(correct));
    }

    logStudentActivity({ activityType: "cambridge_mock_exam", activityId: examId || "", score: pct, maxScore: 100 });

    if (pct >= 80) {
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
      toast.success(t("🎉 Xuất sắc! Bạn đạt " + pct + "%!", "🎉 Excellent! You scored " + pct + "%!"));
    } else if (pct >= 60) {
      toast.success(t("👍 Tốt lắm! " + pct + "%", "👍 Good job! " + pct + "%"));
    } else {
      toast.info(t("Cố gắng thêm nhé! " + pct + "%", "Keep practicing! " + pct + "%"));
    }
  }, [exam, answers, examId, t]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  if (!exam && phase !== "loading") {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">{t("Không tìm thấy đề thi.", "Exam not found.")}</p>
          <Button onClick={() => navigate("/cambridge-lectures")} variant="outline" className="border-white/20 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t("Quay lại", "Go back")}
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "loading" || !exam) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C4B5FD]" />
      </div>
    );
  }

  const levelCfg = CAMBRIDGE_LEVEL_LABELS[exam.level];
  const questions = exam.questions;
  const currentQuestion = questions[currentQ];
  const answeredCount = Object.keys(answers).length;

  // RESULT
  if (phase === "result") {
    const pct = Math.round((score / exam.totalQuestions) * 100);
    return (
      <div className="min-h-screen bg-[#0A0E1A] text-white p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <Award className="w-16 h-16 mx-auto mb-4" style={{ color: levelCfg.color }} />
            <h1 className="text-3xl font-bold mb-2">{t("Kết quả thi", "Exam Results")}</h1>
            <p className="text-[#94A3B8]">{t(exam.titleVi, exam.title)}</p>
          </motion.div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 mb-6 text-center">
            <div className="text-6xl font-black mb-2" style={{ color: pct >= 80 ? "#4ade80" : pct >= 60 ? "#facc15" : "#f87171" }}>
              {pct}%
            </div>
            <p className="text-[#94A3B8] text-lg">{score}/{exam.totalQuestions} {t("câu đúng", "correct")}</p>
          </div>

          {/* Section breakdown */}
          <div className="grid gap-3 mb-8">
            {Object.entries(sectionStats).map(([section, stats]) => (
              <div key={section} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <span className="font-medium text-[#C4B5FD]">{section}</span>
                <span className="text-white font-bold">{stats.correct}/{stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={() => setPhase("review")} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <BookOpen className="w-4 h-4 mr-2" /> {t("Xem đáp án", "Review Answers")}
            </Button>
            <Button onClick={() => { setAnswers({}); setCurrentQ(0); setTimeLeft(exam.duration * 60); setPhase("taking"); }} className="bg-gradient-to-r from-[#A78BFA] to-[#7C3AED]">
              <RotateCcw className="w-4 h-4 mr-2" /> {t("Làm lại", "Retake")}
            </Button>
            <Button onClick={() => navigate("/cambridge-lectures")} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" /> {t("Quay lại", "Back")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // REVIEW
  if (phase === "review") {
    return (
      <div className="min-h-screen bg-[#0A0E1A] text-white p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Button onClick={() => setPhase("result")} variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" /> {t("Kết quả", "Results")}
            </Button>
            <h1 className="text-xl font-bold">{t("Xem đáp án", "Review Answers")}</h1>
          </div>

          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className={`p-5 rounded-xl border ${isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-sm font-bold text-[#94A3B8] shrink-0">Q{idx + 1}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-[#94A3B8]">{q.section}</span>
                      {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-auto" /> : <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-auto" />}
                    </div>
                    {q.passage && <p className="text-sm text-[#64748B] italic mb-2">{q.passage}</p>}
                    <p className="font-medium mb-3">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className={`px-3 py-2 rounded-lg text-sm ${oi === q.correctAnswer ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : oi === userAns && !isCorrect ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-white/5 text-[#94A3B8]"}`}>
                          {String.fromCharCode(65 + oi)}. {opt}
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-[#94A3B8]">💡 {q.explanation}</p>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

  // TAKING
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-[#0A0E1A]/95 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/cambridge-lectures")} variant="ghost" size="sm" className="text-[#94A3B8] hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="font-bold text-sm md:text-base truncate">{t(exam.titleVi, exam.title)}</h1>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${levelCfg.color}20`, color: levelCfg.color }}>{levelCfg.emoji} {levelCfg.label}</span>
                <span className="text-xs text-[#64748B]">{answeredCount}/{exam.totalQuestions}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isTimed ? (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${timeLeft < 60 ? "bg-red-500/20 text-red-300 animate-pulse" : timeLeft < 300 ? "bg-amber-500/20 text-amber-300" : "bg-white/10 text-white"}`}>
                <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-[#94A3B8] text-sm">
                <TimerOff className="w-4 h-4" /> {t("Không giới hạn", "Untimed")}
              </div>
            )}
            <Button onClick={handleSubmit} size="sm" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white" disabled={answeredCount === 0}>
              {t("Nộp bài", "Submit")}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex max-w-6xl mx-auto w-full">
        <div className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-bold" style={{ color: levelCfg.color }}>Q{currentQ + 1}/{exam.totalQuestions}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-[#94A3B8]">{currentQuestion.section}</span>
                </div>

                {currentQuestion.passage && (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-4 text-[#94A3B8] text-sm leading-relaxed italic">
                    {currentQuestion.passage}
                  </div>
                )}

                <h2 className="text-lg md:text-xl font-semibold mb-6 leading-relaxed">{currentQuestion.question}</h2>

                <div className="space-y-3">
                  {currentQuestion.options.map((opt, oi) => {
                    const selected = answers[currentQuestion.id] === oi;
                    return (
                      <button
                        key={oi}
                        onClick={() => handleAnswer(currentQuestion.id, oi)}
                        className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-base ${selected ? "border-[#A78BFA] bg-[#A78BFA]/15 text-white" : "border-white/10 bg-white/[0.03] text-[#CBD5E1] hover:bg-white/[0.06] hover:border-white/20"}`}
                      >
                        <span className="font-bold mr-3 text-[#A78BFA]">{String.fromCharCode(65 + oi)}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} variant="ghost" disabled={currentQ === 0} className="text-[#94A3B8] hover:text-white hover:bg-white/10">
                  <ChevronLeft className="w-4 h-4 mr-1" /> {t("Trước", "Prev")}
                </Button>
                <Button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))} variant="ghost" disabled={currentQ === questions.length - 1} className="text-[#94A3B8] hover:text-white hover:bg-white/10">
                  {t("Sau", "Next")} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Answer grid sidebar — desktop */}
        <div className="hidden lg:block w-64 border-l border-white/10 p-4">
          <h3 className="text-sm font-bold text-[#94A3B8] mb-3">{t("Bảng đáp án", "Answer Grid")}</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const answered = answers[q.id] !== undefined;
              const isCurrent = idx === currentQ;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQ(idx)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${isCurrent ? "ring-2 ring-[#A78BFA] bg-[#A78BFA]/20 text-white" : answered ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-white/5 text-[#475569] border border-white/10 hover:bg-white/10"}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CambridgeMockExam;
