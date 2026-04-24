// Cambridge Lecture Detail View — Kid-friendly, Exam-ready with Learning Objectives
import { useState, useMemo } from "react";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ChevronRight, AlertTriangle, BookOpen, Lightbulb,
  CheckCircle, XCircle, Star, Info, Target, ListChecks, FileSearch,
  Image as ImageIcon, Headphones, PenLine, Mic, Sparkles, Clock, GraduationCap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { allCambridgeLectures, LEVEL_CONFIG } from "@/data/cambridgeLecturesData";
import startersFun from "@/assets/cambridge/starters-fun.jpg";
import moversFun from "@/assets/cambridge/movers-fun.jpg";
import flyersFun from "@/assets/cambridge/flyers-fun.jpg";
import ketFun from "@/assets/cambridge/ket-fun.jpg";
import petFun from "@/assets/cambridge/pet-fun.jpg";

const ILLUSTRATIONS: Record<string, string> = {
  starters: startersFun,
  movers: moversFun,
  flyers: flyersFun,
  ket: ketFun,
  pet: petFun,
};

/** Skill metadata: gives every lecture a clear context label */
const SKILL_META: Record<string, { icon: JSX.Element; labelEn: string; labelVi: string }> = {
  listening: { icon: <Headphones className="w-3.5 h-3.5" />, labelEn: "Listening", labelVi: "Nghe" },
  "reading-writing": { icon: <PenLine className="w-3.5 h-3.5" />, labelEn: "Reading & Writing", labelVi: "Đọc & Viết" },
  speaking: { icon: <Mic className="w-3.5 h-3.5" />, labelEn: "Speaking", labelVi: "Nói" },
  vocabulary: { icon: <BookOpen className="w-3.5 h-3.5" />, labelEn: "Vocabulary", labelVi: "Từ vựng" },
};

const CambridgeLectureView = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const lecture = useMemo(() => allCambridgeLectures.find(l => l.id === lectureId), [lectureId]);
  const lectureIndex = useMemo(() => allCambridgeLectures.findIndex(l => l.id === lectureId), [lectureId]);
  const nextLecture = lectureIndex >= 0 && lectureIndex < allCambridgeLectures.length - 1 ? allCambridgeLectures[lectureIndex + 1] : null;

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Practice state
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [practiceRevealed, setPracticeRevealed] = useState<Set<number>>(new Set());

  // Parent info toggle
  const [showParentInfo, setShowParentInfo] = useState(false);

  if (!lecture) {
    return (
      <div className="min-h-screen bg-[#0A0E1A]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <BookOpen className="w-16 h-16 text-[#334155]" />
          <h2 className="text-xl font-semibold text-white">{t("Không tìm thấy bài giảng", "Lecture not found")}</h2>
          <Button onClick={() => navigate("/cambridge-lectures")} variant="outline" className="border-white/10 text-[#94A3B8]">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t("Quay lại", "Go back")}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const levelCfg = LEVEL_CONFIG[lecture.level];
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([i, a]) => a === lecture.quiz[Number(i)]?.answer).length : 0;

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const score = Object.entries(quizAnswers).filter(([i, a]) => a === lecture.quiz[Number(i)]?.answer).length;
    logStudentActivity({
      activityType: "cambridge_lecture_quiz",
      activityId: lecture.id,
      score,
      maxScore: lecture.quiz.length,
      domain: "english",
    });
  };
  const handleQuizReset = () => { setQuizAnswers({}); setQuizSubmitted(false); };
  const revealPractice = (idx: number) => setPracticeRevealed(prev => new Set(prev).add(idx));

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back */}
          <Button variant="ghost" onClick={() => navigate("/cambridge-lectures")} className="text-[#64748B] hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t("Quay lại danh sách", "Back to lectures")}
          </Button>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="h-1.5 rounded-full mb-6 max-w-xs" style={{ background: `linear-gradient(90deg, ${levelCfg.gradientFrom}, ${levelCfg.gradientTo})` }} />
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-4xl">{lecture.icon}</span>
              <Badge variant="outline" className={`text-sm font-black uppercase tracking-widest px-4 py-1.5 ${levelCfg.bgClass} ${levelCfg.textClass} ${levelCfg.borderClass}`}>
                {levelCfg.label}
              </Badge>
              {/* Skill badge with icon */}
              <Badge variant="outline" className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 bg-white/[0.04] border-white/[0.08] text-[#CBD5E1] flex items-center gap-1.5">
                {SKILL_META[lecture.skill].icon}
                <span>{t(SKILL_META[lecture.skill].labelVi, SKILL_META[lecture.skill].labelEn)}</span>
              </Badge>
              {/* Duration badge */}
              <Badge variant="outline" className="text-xs font-semibold px-3 py-1.5 bg-white/[0.04] border-white/[0.08] text-[#94A3B8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {lecture.duration}
              </Badge>
            </div>
            <h1 className="text-white font-bold mb-3" style={{ fontSize: "26px", lineHeight: "1.4" }}>
              {t(lecture.titleVi, lecture.title)}
            </h1>
            <p className="text-[#94A3B8]" style={{ fontSize: "18px", lineHeight: "1.8" }}>
              {t(lecture.descriptionVi, lecture.description)}
            </p>

            {/* Lesson context bar — explains what this lecture really is */}
            <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-[#A855F7]/10 to-[#3B82F6]/5 border border-[#A855F7]/20">
              <GraduationCap className="w-5 h-5 text-[#C4B5FD] flex-shrink-0 mt-0.5" />
              <p className="text-[#CBD5E1] text-sm leading-relaxed">
                <span className="font-bold text-white">{t("Bài học này là gì?", "What is this lecture?")} </span>
                {t(
                  `Một buổi học tương tác chuẩn Cambridge ${levelCfg.label} giúp bạn hiểu chiến lược làm bài, tránh lỗi thường gặp, và luyện tập với câu hỏi mô phỏng đề thi thật. Hãy đọc theo đúng thứ tự: Mục tiêu → Quy tắc → Cảnh báo → Luyện tập → Quiz.`,
                  `An interactive Cambridge ${levelCfg.label}-style lesson that walks you through exam strategy, common pitfalls, and exam-style practice. Follow this order: Objective → Rules → Watch Out → Practice → Quiz.`
                )}
              </p>
            </div>
          </motion.div>

          {/* Learning Objective + Exam Pattern cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05]"
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-300 uppercase tracking-wide">{t("Mục tiêu học tập", "Learning Objective")}</span>
              </div>
              <p className="text-[#CBD5E1]" style={{ fontSize: "18px", lineHeight: "1.8" }}>
                {t(lecture.learningObjectiveVi, lecture.learningObjective)}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/[0.05]"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileSearch className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold text-blue-300 uppercase tracking-wide">{t("Mẫu đề thi", "Exam Pattern")}</span>
              </div>
              <p className="text-[#CBD5E1]" style={{ fontSize: "18px", lineHeight: "1.8" }}>
                {t(lecture.examPatternVi, lecture.examPattern)}
              </p>
            </motion.div>
          </div>

          {/* Welcome message */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl p-5 mb-6 border border-white/10 backdrop-blur-md"
            style={{ background: `linear-gradient(135deg, ${levelCfg.gradientFrom}12, ${levelCfg.gradientTo}08)` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">👨‍🏫</span>
              <div>
                <p className="text-sm font-bold text-[#C4B5FD] mb-1.5">Teacher Hai says:</p>
                <p className="text-white" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                  {t(lecture.welcomeMessageVi, lecture.welcomeMessage)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Kid-friendly level illustration */}
          {(() => {
            const key = lecture.illustrationKey ?? lecture.level;
            const src = ILLUSTRATIONS[key];
            if (!src) return null;
            return (
              <motion.figure
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.22 }}
                className="mb-6 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]"
              >
                <img
                  src={src}
                  alt={`${lecture.level} fun illustration`}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="w-full h-auto object-cover"
                />
                <figcaption className="text-center text-sm italic text-[#94A3B8] py-2">
                  {t(`Cùng học ${lecture.level.toUpperCase()} thật vui nhé! 🎉`, `Let's enjoy ${lecture.level.toUpperCase()} together! 🎉`)}
                </figcaption>
              </motion.figure>
            );
          })()}

          {/* Step-by-Step Guide */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="mb-6 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03]"
          >
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-amber-300 uppercase tracking-wide">{t("Hướng dẫn từng bước", "Step-by-Step Guide")}</span>
            </div>
            <div className="space-y-3">
              {lecture.stepByStep.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black" style={{ background: `linear-gradient(135deg, ${levelCfg.gradientFrom}, ${levelCfg.gradientTo})`, color: "#fff" }}>
                    {s.step}
                  </div>
                  <div>
                    <p className="text-white font-semibold" style={{ fontSize: "18px" }}>{t(s.titleVi, s.title)}</p>
                    <p className="text-[#94A3B8] text-sm mt-0.5" style={{ lineHeight: "1.8" }}>{t(s.detailVi, s.detail)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Parent Info toggle */}
          <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Info className="w-5 h-5 text-[#A78BFA]" />
            <span className="text-sm text-[#94A3B8] flex-1 font-medium">{t("Thông tin cho phụ huynh", "Information for Parents")}</span>
            <Switch checked={showParentInfo} onCheckedChange={setShowParentInfo} />
          </div>
          {showParentInfo && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 p-5 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/20">
              <p className="text-[#D8B4FE]" style={{ fontSize: "18px", lineHeight: "1.8" }}>
                {t(lecture.parentInfoVi, lecture.parentInfo)}
              </p>
            </motion.div>
          )}

          {/* Content Tabs */}
          <Tabs defaultValue="rules" className="space-y-6">
            <TabsList className="bg-white/[0.04] border border-white/[0.06] flex-wrap h-auto gap-1 p-1.5">
              <TabsTrigger value="rules" className="data-[state=active]:bg-[#A855F7]/20 data-[state=active]:text-[#C4B5FD] text-[#64748B] text-sm px-4 py-2">
                📐 {t("Quy tắc", "Rules")}
              </TabsTrigger>
              <TabsTrigger value="watchout" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300 text-[#64748B] text-sm px-4 py-2">
                🐉 {t("Cảnh báo", "Watch Out!")}
              </TabsTrigger>
              <TabsTrigger value="practice" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 text-[#64748B] text-sm px-4 py-2">
                ✏️ {t("Luyện tập", "Practice")}
              </TabsTrigger>
              <TabsTrigger value="vocab" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 text-[#64748B] text-sm px-4 py-2">
                📖 {t("Từ vựng", "Vocab")}
              </TabsTrigger>
              <TabsTrigger value="quiz" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 text-[#64748B] text-sm px-4 py-2">
                ⭐ Quiz
              </TabsTrigger>
            </TabsList>

            {/* Rules */}
            <TabsContent value="rules">
              <div className="space-y-4">
                {lecture.illustratedRules.map((rule, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{rule.icon}</span>
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-1.5" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                          {t(rule.ruleVi, rule.rule)}
                        </p>
                        <p className="text-[#64748B] text-sm italic">💡 {rule.example}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Watch Out */}
            <TabsContent value="watchout">
              <div className="space-y-4">
                {lecture.watchOut.map((w, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="rounded-2xl p-5 border border-red-500/20 bg-red-500/[0.04]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">🐉</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span className="text-red-300 font-bold text-sm uppercase tracking-wide">{t("Lỗi thường gặp", "Common Mistake")}</span>
                        </div>
                        <p className="text-red-200 mb-3" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                          ❌ {t(w.mistakeVi, w.mistake)}
                        </p>
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <p className="text-emerald-300" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                            ✅ {t(w.tipVi, w.tip)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Practice */}
            <TabsContent value="practice">
              <div className="space-y-6">
                {lecture.practiceSet.map((p, i) => (
                  <Card key={i} className="bg-white/[0.02] border-white/[0.06]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-base flex items-center gap-2">
                        <span className="bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-lg text-xs font-bold">Q{i + 1}</span>
                        {t(p.instructionVi, p.instruction)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#CBD5E1] mb-4" style={{ fontSize: "18px", lineHeight: "1.8" }}>
                        {p.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                        {p.options.map((opt, optIdx) => {
                          const isSelected = practiceAnswers[i] === optIdx;
                          const isRevealed = practiceRevealed.has(i);
                          const isCorrect = optIdx === p.answer;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => !isRevealed && setPracticeAnswers(prev => ({ ...prev, [i]: optIdx }))}
                              className={`text-left p-3.5 rounded-xl border text-sm transition-all ${
                                isRevealed
                                  ? isCorrect
                                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-200"
                                    : isSelected
                                      ? "bg-red-500/20 border-red-500/30 text-red-200"
                                      : "bg-white/[0.02] border-white/[0.06] text-[#475569]"
                                  : isSelected
                                    ? "bg-blue-500/20 border-blue-500/30 text-blue-200"
                                    : "bg-white/[0.02] border-white/[0.06] text-[#CBD5E1] hover:bg-white/[0.04]"
                              }`}
                            >
                              <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                              {opt}
                              {isRevealed && isCorrect && <CheckCircle className="inline w-4 h-4 ml-2 text-emerald-400" />}
                              {isRevealed && isSelected && !isCorrect && <XCircle className="inline w-4 h-4 ml-2 text-red-400" />}
                            </button>
                          );
                        })}
                      </div>
                      {!practiceRevealed.has(i) && practiceAnswers[i] !== undefined && (
                        <Button size="sm" onClick={() => revealPractice(i)} className="bg-blue-600 hover:bg-blue-700 text-white">
                          {t("Kiểm tra", "Check Answer")}
                        </Button>
                      )}
                      {practiceRevealed.has(i) && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mt-3">
                          <p className="text-sm text-[#94A3B8]">
                            <Lightbulb className="inline w-4 h-4 mr-1 text-amber-400" />
                            {t(p.explanationVi, p.explanation)}
                          </p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Vocab */}
            <TabsContent value="vocab">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lecture.vocabulary.map((v, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                  >
                    <p className="text-white font-bold mb-1" style={{ fontSize: "20px" }}>{v.word}</p>
                    <p className="text-[#A78BFA] text-sm mb-1.5">{t(v.meaningVi, v.meaning)}</p>
                    <p className="text-[#475569] text-sm italic">"{v.example}"</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Quiz */}
            <TabsContent value="quiz">
              {quizSubmitted && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-center p-8 mb-6 rounded-2xl border border-amber-500/20"
                  style={{ background: `linear-gradient(135deg, ${levelCfg.gradientFrom}15, ${levelCfg.gradientTo}10)` }}
                >
                  <div className="text-5xl mb-3">
                    {quizScore === lecture.quiz.length ? "🌟" : quizScore >= lecture.quiz.length / 2 ? "⭐" : "💪"}
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">{quizScore}/{lecture.quiz.length}</p>
                  <p className="text-lg" style={{ color: levelCfg.color }}>
                    {quizScore === lecture.quiz.length
                      ? t("Xuất sắc! Bạn giỏi lắm! 🎉", "Excellent! Great job! 🎉")
                      : quizScore >= lecture.quiz.length / 2
                        ? t("Tốt lắm! Cố gắng thêm nhé!", "Good job! Keep practicing!")
                        : t("Cố lên! Bạn làm được mà! 💪", "Try again, you can do it! 💪")}
                  </p>
                  <Button size="sm" variant="outline" onClick={handleQuizReset} className="mt-4 border-white/10 text-[#94A3B8] hover:bg-white/[0.06]">
                    {t("Làm lại", "Try Again")}
                  </Button>
                </motion.div>
              )}

              <div className="space-y-4">
                {lecture.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <p className="text-white font-semibold mb-3" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                      <span className="text-amber-400 font-bold mr-2">Q{qIdx + 1}.</span>
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        const isCorrect = optIdx === q.answer;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                            className={`text-left p-3.5 rounded-xl border text-sm transition-all ${
                              quizSubmitted
                                ? isCorrect
                                  ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-200"
                                  : isSelected
                                    ? "bg-red-500/20 border-red-500/30 text-red-200"
                                    : "bg-white/[0.02] border-white/[0.06] text-[#475569]"
                                : isSelected
                                  ? "bg-amber-500/20 border-amber-500/30 text-amber-200"
                                  : "bg-white/[0.02] border-white/[0.06] text-[#CBD5E1] hover:bg-white/[0.04]"
                            }`}
                          >
                            {opt}
                            {quizSubmitted && isCorrect && <CheckCircle className="inline w-4 h-4 ml-2 text-emerald-400" />}
                            {quizSubmitted && isSelected && !isCorrect && <XCircle className="inline w-4 h-4 ml-2 text-red-400" />}
                          </button>
                        );
                      })}
                    </div>
                    {quizSubmitted && (
                      <p className="text-sm text-[#94A3B8] mt-3">
                        <Lightbulb className="inline w-4 h-4 mr-1 text-amber-400" /> {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {!quizSubmitted && Object.keys(quizAnswers).length > 0 && (
                <Button onClick={handleQuizSubmit} className="mt-6 w-full h-12 text-base font-bold" style={{ background: `linear-gradient(90deg, ${levelCfg.gradientFrom}, ${levelCfg.gradientTo})` }}>
                  <Star className="w-5 h-5 mr-2" /> {t("Nộp bài", "Submit Quiz")}
                </Button>
              )}
            </TabsContent>
          </Tabs>

          {/* Teacher Hai's Secret Tip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-8 p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.06] to-orange-500/[0.04]"
          >
            <p className="text-sm font-bold text-amber-300 mb-2 uppercase tracking-wide">🔑 Teacher Hai&apos;s Secret Tip</p>
            <p className="text-amber-200" style={{ fontSize: "20px", lineHeight: "1.8" }}>
              {t(lecture.secretTipVi, lecture.secretTip)}
            </p>
          </motion.div>

          {/* Next lecture */}
          {nextLecture && (
            <div className="mt-8 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-xs text-[#475569] mb-2 uppercase tracking-wide font-semibold">{t("Bài tiếp theo", "Next Lecture")}</p>
              <Link to={`/cambridge-lectures/${nextLecture.id}`} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{nextLecture.icon}</span>
                  <span className="text-white group-hover:text-[#C4B5FD] transition-colors font-medium" style={{ fontSize: "18px" }}>{t(nextLecture.titleVi, nextLecture.title)}</span>
                </div>
                <ChevronRight className="w-6 h-6 text-[#475569] group-hover:text-[#C4B5FD]" />
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CambridgeLectureView;
