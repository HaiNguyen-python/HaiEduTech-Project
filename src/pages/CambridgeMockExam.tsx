/**
 * @file CambridgeMockExam.tsx
 * @description Cambridge YLE / KET / PET mock exam runner. Reading texts stay
 *              pinned next to every question of their group, and the paper is
 *              wrapped in kid-friendly touches (progress path with mascot,
 *              stickers, cheers, optional sounds).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw, Award, ArrowLeft,
  BookOpen, TimerOff, Loader2, Volume2, Volume1, VolumeX, Headphones, ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { cambridgeMockExams, CAMBRIDGE_LEVEL_LABELS, type CambridgeMockExam as ExamType } from "@/data/cambridgeMockExamData";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import {
  ExamProgressPath, ExamCheerBubble, ExamStickerBoard, LEVEL_MASCOT,
  readSoundPref, writeSoundPref, playChime,
} from "@/components/cambridge/ExamFunLayer";

type ExamPhase = "loading" | "taking" | "result" | "review";

/** Consecutive Reading questions sharing the same passage form one text group. */
interface TextGroup {
  passage: string;
  from: number; // 1-based question number
  to: number;
  index: number; // Text 1, Text 2, ...
}

const buildTextGroups = (exam: ExamType | null): Record<number, TextGroup> => {
  const map: Record<number, TextGroup> = {};
  if (!exam) return map;
  let textIndex = 0;
  let i = 0;
  const qs = exam.questions;
  while (i < qs.length) {
    const q = qs[i];
    if (q.section === "Reading & Writing" && q.passage) {
      let j = i;
      while (j + 1 < qs.length && qs[j + 1].section === "Reading & Writing" && qs[j + 1].passage === q.passage) j += 1;
      if (j > i) {
        textIndex += 1;
        const group: TextGroup = { passage: q.passage, from: i + 1, to: j + 1, index: textIndex };
        for (let k = i; k <= j; k += 1) map[k] = group;
      }
      i = j + 1;
    } else {
      i += 1;
    }
  }
  return map;
};

const CambridgeMockExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, lang } = useLanguage();
  const isVi = lang === "vi";
  const isTimed = searchParams.get("mode") !== "untimed";

  const [exam, setExam] = useState<ExamType | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [phase, setPhase] = useState<ExamPhase>("loading");
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [score, setScore] = useState(0);
  const [sectionStats, setSectionStats] = useState<Record<string, { correct: number; total: number }>>({});
  const [soundOn, setSoundOn] = useState(false);
  const [textOpen, setTextOpen] = useState(true);
  const [pop, setPop] = useState<{ emoji: string; key: number } | null>(null);

  useEffect(() => {
    if (!examId) return;
    const found = cambridgeMockExams.find(e => e.id === examId);
    if (found) {
      setExam(found);
      setTimeLeft(found.duration * 60);
      setSoundOn(readSoundPref(found.level));
      const saved = localStorage.getItem(`cambridge-mock-${examId}-answers`);
      if (saved) {
        try { setAnswers(JSON.parse(saved)); } catch { /* ignore corrupted cache */ }
      }
    }
    setPhase("taking");
  }, [examId]);

  useEffect(() => () => stopEnglishTts(), []);

  const handleSubmit = useCallback(() => {
    if (!exam) return;
    if (timerRef.current) clearInterval(timerRef.current);
    stopEnglishTts();

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
    if (soundOn) playChime("finish");

    if (pct >= 80) {
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
      toast.success(t("🎉 Xuất sắc! Bạn đạt " + pct + "%!", "🎉 Excellent! You scored " + pct + "%!"));
    } else if (pct >= 60) {
      toast.success(t("👍 Tốt lắm! " + pct + "%", "👍 Good job! " + pct + "%"));
    } else {
      toast.info(t("Cố gắng thêm nhé! " + pct + "%", "Keep practicing! " + pct + "%"));
    }
  }, [exam, answers, examId, t, soundOn]);

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
  }, [phase, isTimed, exam, handleSubmit]);

  // Auto-save
  useEffect(() => {
    if (phase === "taking" && examId && Object.keys(answers).length > 0) {
      localStorage.setItem(`cambridge-mock-${examId}-answers`, JSON.stringify(answers));
    }
  }, [answers, phase, examId]);

  const textGroups = useMemo(() => buildTextGroups(exam), [exam]);

  const handleAnswer = useCallback((qId: number, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
    if (soundOn) playChime("select");
    const stickers = ["⭐", "🌈", "🎈", "🐣", "🍭", "🌟"];
    setPop({ emoji: stickers[Math.floor(Math.random() * stickers.length)], key: Date.now() });
    window.setTimeout(() => setPop(null), 900);
  }, [soundOn]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    writeSoundPref(next);
    if (next) playChime("cheer");
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  if (!exam && phase !== "loading") {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#0F172A] text-xl mb-4">{t("Không tìm thấy đề thi.", "Exam not found.")}</p>
          <Button onClick={() => navigate("/cambridge-yle-test-prep")} variant="outline" className="border-slate-300 bg-white text-[#0F172A]">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t("Quay lại", "Go back")}
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "loading" || !exam) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#6D28D9]" />
      </div>
    );
  }

  const levelCfg = CAMBRIDGE_LEVEL_LABELS[exam.level];
  const mascot = LEVEL_MASCOT[exam.level] || "🐣";
  const questions = exam.questions;
  const currentQuestion = questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const currentGroup = textGroups[currentQ];
  const isListening = currentQuestion.section === "Listening";
  const pageBg = "linear-gradient(180deg, #FFFDF7 0%, #FFF6FA 40%, #F1F8FF 100%)";

  // RESULT
  if (phase === "result") {
    const pct = Math.round((score / exam.totalQuestions) * 100);
    return (
      <div className="min-h-screen text-[#0F172A] p-4 md:p-8" style={{ background: pageBg }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <Award className="w-16 h-16 mx-auto mb-4" style={{ color: levelCfg.color }} />
            <h1 className="text-3xl font-bold mb-2">{t("Kết quả thi", "Exam Results")}</h1>
            <p className="text-[#475569]">{t(exam.titleVi, exam.title)}</p>
          </motion.div>

          <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 mb-6 text-center">
            <div className="text-6xl font-black mb-2" style={{ color: pct >= 80 ? "#16A34A" : pct >= 60 ? "#CA8A04" : "#DC2626" }}>
              {pct}%
            </div>
            <p className="text-[#334155] text-lg">{score}/{exam.totalQuestions} {t("câu đúng", "correct")}</p>
          </div>

          <div className="mb-6">
            <ExamStickerBoard pct={pct} vi={isVi} />
          </div>

          {/* Section breakdown */}
          <div className="grid gap-3 mb-8">
            {Object.entries(sectionStats).map(([section, stats]) => (
              <div key={section} className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 bg-white">
                <span className="font-bold text-[#6D28D9]">{section === "Listening" ? "🎧" : "📖"} {section}</span>
                <span className="text-[#0F172A] font-bold">{stats.correct}/{stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={() => setPhase("review")} variant="outline" className="border-2 border-slate-300 bg-white text-[#0F172A] hover:bg-slate-50 hover:text-[#0F172A]">
              <BookOpen className="w-4 h-4 mr-2" /> {t("Xem đáp án", "Review Answers")}
            </Button>
            <Button onClick={() => { setAnswers({}); setCurrentQ(0); setTimeLeft(exam.duration * 60); setPhase("taking"); }} className="bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white hover:from-[#8B5CF6] hover:to-[#6D28D9]">
              <RotateCcw className="w-4 h-4 mr-2" /> {t("Làm lại", "Retake")}
            </Button>
            <Button onClick={() => navigate("/cambridge-yle-test-prep")} variant="outline" className="border-2 border-slate-300 bg-white text-[#0F172A] hover:bg-slate-50 hover:text-[#0F172A]">
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
      <div className="min-h-screen text-[#0F172A] p-4 md:p-8" style={{ background: pageBg }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Button onClick={() => setPhase("result")} variant="ghost" className="text-[#0F172A] hover:bg-white">
              <ArrowLeft className="w-4 h-4 mr-2" /> {t("Kết quả", "Results")}
            </Button>
            <h1 className="text-xl font-bold">{t("Xem đáp án", "Review Answers")}</h1>
          </div>

          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-6 pr-2">
              {questions.map((q, idx) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                const group = textGroups[idx];
                const showText = group && (idx === 0 || textGroups[idx - 1] !== group);
                return (
                  <div key={q.id}>
                    {showText && (
                      <div className="mb-3 rounded-2xl border-2 border-[#93C5FD] bg-[#EFF6FF] p-4">
                        <p className="mb-2 text-sm font-black uppercase tracking-wide text-[#1D4ED8]">
                          📖 {t(`Bài đọc ${group.index} - câu ${group.from}-${group.to}`, `Text ${group.index} - questions ${group.from}-${group.to}`)}
                        </p>
                        <p className="whitespace-pre-wrap text-base leading-relaxed text-[#1E293B]">{group.passage}</p>
                      </div>
                    )}
                    <div className={`p-5 rounded-2xl border-2 ${isCorrect ? "border-emerald-300 bg-emerald-50" : "border-red-300 bg-red-50"}`}>
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-base font-bold text-[#475569] shrink-0">Q{idx + 1}</span>
                        <span className="text-sm px-2.5 py-1 rounded bg-white text-[#334155] font-semibold">{q.section}</span>
                        {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-auto" /> : <XCircle className="w-5 h-5 text-red-600 shrink-0 ml-auto" />}
                      </div>
                      {q.passage && !group && <p className="text-base text-[#475569] italic mb-2">{q.passage}</p>}
                      <p className="text-lg font-semibold mb-3">{q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className={`px-3 py-2 rounded-lg text-base ${oi === q.correctAnswer ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : oi === userAns && !isCorrect ? "bg-red-100 text-red-700 border border-red-300" : "bg-white text-[#475569] border border-slate-200"}`}>
                            {String.fromCharCode(65 + oi)}. {opt}
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-base text-[#334155]">💡 {q.explanation}</p>
                      {isVi && q.explanationVi && <p className="mt-1 text-base text-[#475569]">🇻🇳 {q.explanationVi}</p>}
                    </div>
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
    <div className="min-h-screen text-[#0F172A] flex flex-col" style={{ background: pageBg }}>
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <Button onClick={() => navigate("/cambridge-yle-test-prep")} variant="ghost" size="sm" className="text-[#334155] hover:bg-slate-100 hover:text-[#0F172A]">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="font-bold text-base md:text-lg truncate">{mascot} {t(exam.titleVi, exam.title)}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: `${levelCfg.color}20`, color: levelCfg.color }}>{levelCfg.emoji} {levelCfg.label}</span>
                  <span className="text-xs text-[#475569]">{answeredCount}/{exam.totalQuestions}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <Button
                onClick={toggleSound}
                variant="outline"
                size="sm"
                className="border-2 border-slate-200 bg-white text-[#334155] hover:bg-slate-50 hover:text-[#0F172A]"
                aria-label={t("Bật/tắt âm thanh", "Toggle sound")}
              >
                {soundOn ? <Volume1 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              {isTimed ? (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-base font-bold ${timeLeft < 60 ? "bg-red-100 text-red-700 animate-pulse" : timeLeft < 300 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-[#0F172A]"}`}>
                  <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-[#334155] text-base">
                  <TimerOff className="w-4 h-4" /> {t("Không giới hạn", "Untimed")}
                </div>
              )}
              <Button onClick={handleSubmit} size="sm" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold" disabled={answeredCount === 0}>
                {t("Nộp bài", "Submit")}
              </Button>
            </div>
          </div>

          <ExamProgressPath total={exam.totalQuestions} answered={answeredCount} current={currentQ} color={levelCfg.color} mascot={mascot} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex max-w-6xl mx-auto w-full">
        <div className="flex-1 p-4 md:p-6">
          <div className={currentGroup ? "grid gap-5 lg:grid-cols-2" : ""}>
            {/* Reading text panel - stays visible for every question of the group */}
            {currentGroup && (
              <div className="lg:sticky lg:top-40 lg:self-start">
                <div className="rounded-2xl border-2 border-[#93C5FD] bg-[#F5FAFF] p-4 md:p-5">
                  <button
                    onClick={() => setTextOpen(o => !o)}
                    className="mb-2 flex w-full items-center gap-2 text-left lg:cursor-default"
                  >
                    <span className="text-sm font-black uppercase tracking-wide text-[#1D4ED8]">
                      📖 {t(`Bài đọc ${currentGroup.index} - câu ${currentGroup.from}-${currentGroup.to}`, `Text ${currentGroup.index} - questions ${currentGroup.from}-${currentGroup.to}`)}
                    </span>
                    <ChevronDown className={`ml-auto h-4 w-4 text-[#1D4ED8] transition-transform lg:hidden ${textOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`${textOpen ? "block" : "hidden"} lg:block`}>
                    <p className="whitespace-pre-wrap text-base leading-relaxed text-[#1E293B] md:text-lg">{currentGroup.passage}</p>
                    <Button
                      onClick={() => { stopEnglishTts(); playEnglishTts(currentGroup.passage, { playbackRate: 0.9 }); }}
                      size="sm"
                      variant="outline"
                      className="mt-3 border-2 border-[#93C5FD] bg-white text-[#1D4ED8] hover:bg-[#EFF6FF] hover:text-[#1E40AF]"
                    >
                      <Volume2 className="w-4 h-4 mr-2" /> {t("Đọc to bài này", "Read aloud")}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-black" style={{ color: levelCfg.color }}>Q{currentQ + 1}/{exam.totalQuestions}</span>
                    <span className="text-sm px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[#334155] font-semibold">
                      {isListening ? "🎧" : "📖"} {currentQuestion.section}
                    </span>
                  </div>

                  {/* Listening script card */}
                  {isListening && currentQuestion.passage && (
                    <div className="p-4 rounded-2xl bg-white border-2 border-[#FBCFE8] mb-4">
                      <p className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#BE185D]">
                        <Headphones className="h-4 w-4" /> {t("Phần nghe", "Listening")}
                      </p>
                      <p className="text-[#1E293B] text-base md:text-lg leading-relaxed">{currentQuestion.passage}</p>
                      <Button
                        onClick={() => { stopEnglishTts(); playEnglishTts(currentQuestion.passage!, { playbackRate: 0.9 }); }}
                        size="sm"
                        variant="outline"
                        className="mt-3 border-2 border-[#FBCFE8] bg-white text-[#BE185D] hover:bg-[#FDF2F8] hover:text-[#9D174D]"
                      >
                        <Volume2 className="w-4 h-4 mr-2" /> {t("Nghe đoạn này", "Listen")}
                      </Button>
                    </div>
                  )}

                  <h2 className="text-xl md:text-2xl font-bold mb-6 leading-relaxed">{currentQuestion.question}</h2>

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, oi) => {
                      const selected = answers[currentQuestion.id] === oi;
                      return (
                        <motion.button
                          key={oi}
                          onClick={() => handleAnswer(currentQuestion.id, oi)}
                          whileTap={{ scale: 0.97 }}
                          animate={selected ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className={`relative w-full text-left px-5 py-4 rounded-2xl border-2 transition-colors duration-150 text-base md:text-lg font-medium ${selected ? "border-[#7C3AED] bg-[#EDE9FE] text-[#0F172A]" : "border-slate-200 bg-white text-[#0F172A] hover:border-[#C4B5FD] hover:bg-[#FAF8FF]"}`}
                        >
                          <span className="font-black mr-3 text-[#6D28D9]">{String.fromCharCode(65 + oi)}</span>
                          {opt}
                          <AnimatePresence>
                            {selected && pop && (
                              <motion.span
                                key={pop.key}
                                initial={{ opacity: 0, scale: 0.4, y: 0 }}
                                animate={{ opacity: 1, scale: 1.2, y: -18 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="pointer-events-none absolute right-4 top-2 text-2xl"
                              >
                                {pop.emoji}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} variant="ghost" disabled={currentQ === 0} className="text-[#334155] hover:bg-white hover:text-[#0F172A]">
                    <ChevronLeft className="w-4 h-4 mr-1" /> {t("Trước", "Prev")}
                  </Button>
                  <Button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))} variant="ghost" disabled={currentQ === questions.length - 1} className="text-[#334155] hover:bg-white hover:text-[#0F172A]">
                    {t("Sau", "Next")} <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Answer grid sidebar - desktop */}
        <div className="hidden lg:block w-64 border-l-2 border-slate-200 p-4">
          <h3 className="text-base font-bold text-[#475569] mb-3">{t("Bảng đáp án", "Answer Grid")}</h3>
          {(["Reading & Writing", "Listening", "Speaking"] as const).map(section => {
            const items = questions.map((q, idx) => ({ q, idx })).filter(x => x.q.section === section);
            if (items.length === 0) return null;
            return (
              <div key={section} className="mb-4">
                <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#64748B]">
                  {section === "Listening" ? "🎧" : "📖"} {section} ({items.length})
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {items.map(({ q, idx }) => {
                    const answered = answers[q.id] !== undefined;
                    const isCurrent = idx === currentQ;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQ(idx)}
                        className={`h-10 w-10 rounded-xl text-sm font-bold transition-colors ${isCurrent ? "ring-2 ring-[#7C3AED] bg-[#EDE9FE] text-[#4C1D95]" : answered ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-white text-[#64748B] border border-slate-200 hover:bg-slate-50"}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ExamCheerBubble answered={answeredCount} vi={isVi} enabled onCheer={() => { if (soundOn) playChime("cheer"); confetti({ particleCount: 40, spread: 55, origin: { y: 0.8 }, scalar: 0.7 }); }} />
    </div>
  );
};

export default CambridgeMockExam;
