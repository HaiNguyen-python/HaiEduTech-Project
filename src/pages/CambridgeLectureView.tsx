// Cambridge Lecture Detail View - Kid-friendly, Exam-ready with Learning Objectives
import { useState, useMemo } from "react";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ChevronRight, AlertTriangle, BookOpen, Lightbulb,
  CheckCircle, XCircle, Star, Info, Target, ListChecks, FileSearch,
  Image as ImageIcon, Headphones, PenLine, Mic, Sparkles, Clock, GraduationCap, PenTool
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBalloons from "@/components/FloatingBalloons";
import KidBullets from "@/components/cambridge/KidBullets";
import { useLanguage } from "@/contexts/LanguageContext";
import { allCambridgeLectures, LEVEL_CONFIG } from "@/data/cambridgeLecturesData";
import { enrichCambridgeLecture } from "@/lib/cambridgeEnrichment";
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
  grammar: { icon: <PenTool className="w-3.5 h-3.5" />, labelEn: "Grammar", labelVi: "Ngữ pháp" },
};

const CambridgeLectureView = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const rawLecture = useMemo(() => allCambridgeLectures.find(l => l.id === lectureId), [lectureId]);
  const lecture = useMemo(() => (rawLecture ? enrichCambridgeLecture(rawLecture) : null), [rawLecture]);
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
      <div className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-pink-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <BookOpen className="w-16 h-16 text-slate-400" />
          <h2 className="text-xl font-semibold text-slate-900">{t("Không tìm thấy bài giảng", "Lecture not found")}</h2>
          <Button onClick={() => navigate("/cambridge-lectures")} variant="outline" className="border-slate-200 text-slate-700">
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
    <div className="relative min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-pink-100 overflow-hidden">
      <FloatingBalloons count={16} />
      <div className="relative z-10">
      <Navbar />
      <main className="pt-24 pb-16 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back */}
          <Button variant="ghost" onClick={() => navigate("/cambridge-lectures")} className="text-slate-700 hover:text-slate-900 mb-6">
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
              <Badge variant="outline" className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 bg-white/80 border-slate-200 text-slate-700 flex items-center gap-1.5">
                {SKILL_META[lecture.skill].icon}
                <span>{t(SKILL_META[lecture.skill].labelVi, SKILL_META[lecture.skill].labelEn)}</span>
              </Badge>
              {/* Duration badge */}
              <Badge variant="outline" className="text-xs font-semibold px-3 py-1.5 bg-white/80 border-slate-200 text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {lecture.duration}
              </Badge>
            </div>
            <h1 className="text-slate-900 font-bold mb-3" style={{ fontSize: "26px", lineHeight: "1.4" }}>
              {t(lecture.titleVi, lecture.title)}
            </h1>
            <KidBullets
              text={t(lecture.descriptionVi, lecture.description)}
              marker="🔹"
              className="text-slate-700"
              style={{ fontSize: "18px", lineHeight: "1.8" }}
            />

            {/* Lesson context bar - short & visual */}
            <div className="mt-5 flex items-center gap-3 p-4 rounded-2xl bg-white/80 border-2 border-amber-200 shadow-sm">
              <span className="text-3xl">🎈</span>
              <p className="text-slate-700 text-sm font-semibold leading-snug">
                {t(
                  `Lộ trình bài học: 🎯 Mục tiêu → 📐 Quy tắc → 🐉 Cảnh báo → ✏️ Luyện tập → ⭐ Quiz`,
                  `Lesson flow: 🎯 Objective → 📐 Rules → 🐉 Watch Out → ✏️ Practice → ⭐ Quiz`
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
                <Target className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700 uppercase tracking-wide">{t("Mục tiêu học tập", "Learning Objective")}</span>
              </div>
              <KidBullets
                text={t(lecture.learningObjectiveVi, lecture.learningObjective)}
                marker="✅"
                className="text-slate-700"
                style={{ fontSize: "17px", lineHeight: "1.8" }}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/[0.05]"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileSearch className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">{t("Mẫu đề thi", "Exam Pattern")}</span>
              </div>
              <KidBullets
                text={t(lecture.examPatternVi, lecture.examPattern)}
                marker="📝"
                className="text-slate-700"
                style={{ fontSize: "17px", lineHeight: "1.8" }}
              />
            </motion.div>
          </div>

          {/* Welcome message */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl p-5 mb-6 border border-slate-200 backdrop-blur-md"
            style={{ background: `linear-gradient(135deg, ${levelCfg.gradientFrom}12, ${levelCfg.gradientTo}08)` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">👨‍🏫</span>
              <div>
                <p className="text-sm font-bold text-violet-700 mb-1.5">Teacher Hai says:</p>
                <KidBullets
                  text={t(lecture.welcomeMessageVi, lecture.welcomeMessage)}
                  marker="💬"
                  className="text-slate-900"
                  style={{ fontSize: "19px", lineHeight: "1.8" }}
                />
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
                className="mb-6 rounded-2xl overflow-hidden border border-slate-200 bg-white/70"
              >
                <img
                  src={src}
                  alt={`${lecture.level} fun illustration`}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="w-full h-auto object-cover"
                />
                <figcaption className="text-center text-sm italic text-slate-700 py-2">
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
              <ListChecks className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-bold text-amber-700 uppercase tracking-wide">{t("Hướng dẫn từng bước", "Step-by-Step Guide")}</span>
            </div>
            <div className="space-y-3">
              {lecture.stepByStep.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black" style={{ background: `linear-gradient(135deg, ${levelCfg.gradientFrom}, ${levelCfg.gradientTo})`, color: "#fff" }}>
                    {s.step}
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold" style={{ fontSize: "18px" }}>{t(s.titleVi, s.title)}</p>
                    <div className="mt-1">
                      <KidBullets
                        text={t(s.detailVi, s.detail)}
                        marker="👉"
                        className="text-slate-700"
                        style={{ fontSize: "16px", lineHeight: "1.75" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Parent Info toggle */}
          <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-white/70 border border-slate-200">
            <Info className="w-5 h-5 text-violet-700" />
            <span className="text-sm text-slate-700 flex-1 font-medium">{t("Thông tin cho phụ huynh", "Information for Parents")}</span>
            <Switch checked={showParentInfo} onCheckedChange={setShowParentInfo} />
          </div>
          {showParentInfo && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 p-5 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/20">
              <KidBullets
                text={t(lecture.parentInfoVi, lecture.parentInfo)}
                marker="👨‍👩‍👧"
                className="text-purple-800"
                style={{ fontSize: "17px", lineHeight: "1.8" }}
              />
            </motion.div>
          )}

          {/* Deep Dive - Collapsible by default to keep the page short & visual for kids */}
          <details
            className="mb-8 rounded-2xl border-2 border-indigo-200 bg-white/80 overflow-hidden group"
          >
            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3 bg-gradient-to-r from-indigo-100 to-purple-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-bold text-indigo-700 uppercase tracking-wide">
                  {t("Phân tích chuyên sâu (cho ai muốn đọc thêm)", "Deep Dive (optional reading)")}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-indigo-500 transition-transform group-open:rotate-90" />
            </summary>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {lecture.deepDive.map((d, i) => {
                const text = t(d.bodyVi, d.body);
                const sentences = text
                  .split(/(?<=[.!?])\s+(?=[A-ZÀ-Ỹ"“(])/)
                  .map(s => s.trim())
                  .filter(Boolean);
                return (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-white/90 border border-slate-200"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-2xl">{d.icon}</span>
                      <h3 className="text-slate-900 font-bold text-base leading-snug">
                        {t(d.headingVi, d.heading)}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {sentences.map((s, si) => (
                        <li key={si} className="flex items-start gap-2">
                          <span className="mt-[3px] text-xs opacity-70 select-none">🔹</span>
                          <span className="text-slate-700" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                            {s}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </details>


          {/* Content Tabs */}
          <Tabs defaultValue="rules" className="space-y-6">
            <TabsList className="bg-white/80 border border-slate-200 flex-wrap h-auto gap-1 p-1.5">
              <TabsTrigger value="rules" className="data-[state=active]:bg-[#A855F7]/20 data-[state=active]:text-violet-700 text-slate-700 text-sm px-4 py-2">
                📐 {t("Quy tắc", "Rules")}
              </TabsTrigger>
              <TabsTrigger value="watchout" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-700 text-slate-700 text-sm px-4 py-2">
                🐉 {t("Cảnh báo", "Watch Out!")}
              </TabsTrigger>
              <TabsTrigger value="practice" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-700 text-slate-700 text-sm px-4 py-2">
                ✏️ {t("Luyện tập", "Practice")}
              </TabsTrigger>
              <TabsTrigger value="vocab" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-700 text-slate-700 text-sm px-4 py-2">
                📖 {t("Từ vựng", "Vocab")}
              </TabsTrigger>
              <TabsTrigger value="quiz" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-700 text-slate-700 text-sm px-4 py-2">
                ⭐ Quiz
              </TabsTrigger>
            </TabsList>

            {/* Rules */}
            <TabsContent value="rules">
              <div className="mb-5 p-4 rounded-xl bg-purple-500/[0.05] border border-purple-500/20 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-purple-800 font-bold text-sm mb-1">
                    {t("Quy tắc cốt lõi", "Core Rules")}
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {t(
                      "Đây là những quy tắc và mẫu câu trọng tâm bạn cần ghi nhớ trước khi luyện đề. Mỗi quy tắc đi kèm 1 ví dụ minh họa thực tế.",
                      "These are the core patterns to remember before tackling exam-style practice. Each rule comes with one concrete example."
                    )}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {lecture.illustratedRules.map((rule, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="rounded-2xl p-5 border border-slate-200 bg-white/70 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{rule.icon}</span>
                      <div className="flex-1">
                        <p className="text-purple-700 text-xs font-bold uppercase tracking-wide mb-1">
                          {t(`Quy tắc #${i + 1}`, `Rule #${i + 1}`)}
                        </p>
                        <div className="mb-2">
                          <KidBullets
                            text={t(rule.ruleVi, rule.rule)}
                            marker="📐"
                            className="text-slate-900 font-semibold"
                            style={{ fontSize: "18px", lineHeight: "1.7" }}
                          />
                        </div>
                        <div className="p-3 rounded-lg bg-white/70 border border-slate-200">
                          <p className="text-amber-700 text-xs font-bold uppercase tracking-wide mb-1">{t("Ví dụ", "Example")}</p>
                          <p className="text-slate-700 text-sm italic">"{rule.example}"</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Watch Out */}
            <TabsContent value="watchout">
              <div className="mb-5 p-4 rounded-xl bg-red-500/[0.05] border border-red-500/20 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-bold text-sm mb-1">
                    {t("Lỗi học sinh hay mắc - đọc kỹ để tránh!", "Common Mistakes - read carefully to avoid them!")}
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {t(
                      "Mỗi mục bên dưới gồm: ❌ Lỗi sai phổ biến và ✅ Cách khắc phục mà thầy Hải đã tổng hợp từ hàng trăm bài thi thật.",
                      "Each item below shows: ❌ The common mistake and ✅ How to fix it - collected by Teacher Hai from hundreds of real exam papers."
                    )}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {lecture.watchOut.map((w, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="rounded-2xl p-5 border border-red-500/20 bg-red-500/[0.04]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">🐉</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <span className="text-red-700 font-bold text-sm uppercase tracking-wide">{t(`Lỗi #${i + 1}: Sai phổ biến`, `Mistake #${i + 1}: Common pitfall`)}</span>
                        </div>
                        <div className="mb-3">
                          <KidBullets
                            text={t(w.mistakeVi, w.mistake)}
                            marker="❌"
                            leading="❌"
                            className="text-red-800"
                            style={{ fontSize: "17px", lineHeight: "1.8" }}
                          />
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <p className="text-emerald-700 text-xs font-bold uppercase tracking-wide mb-1">
                            {t("Cách làm đúng", "The fix")}
                          </p>
                          <KidBullets
                            text={t(w.tipVi, w.tip)}
                            marker="✅"
                            leading="✅"
                            className="text-emerald-800"
                            style={{ fontSize: "17px", lineHeight: "1.8" }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Practice */}
            <TabsContent value="practice">
              {/* Context intro for the Practice tab */}
              <div className="mb-5 p-4 rounded-xl bg-blue-500/[0.05] border border-blue-500/20 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-800 font-bold text-sm mb-1">
                    {t("Luyện tập có hướng dẫn", "Guided Practice")}
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {t(
                      "Mỗi câu hỏi mô phỏng đề thi Cambridge thật. Hãy đọc phần MÔ TẢ TRANH/NGỮ CẢNH ở khung xám trước, rồi đọc câu hỏi, chọn đáp án và bấm 'Kiểm tra' để xem giải thích.",
                      "Each item mirrors a real Cambridge exam question. Read the PICTURE / CONTEXT box first, then the question, choose your answer and tap 'Check' to see the explanation."
                    )}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                {lecture.practiceSet.map((p, i) => {
                  const instructionText = t(p.instructionVi, p.instruction);
                  // Detect picture/context-style instructions vs plain prompts
                  const isContextual = /picture|tranh|sentence|câu|context|ngữ cảnh|read|nghe|listen/i.test(instructionText);
                  return (
                  <Card key={i} className="bg-white/70 border-slate-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-slate-900 text-base flex items-center gap-2 flex-wrap">
                        <span className="bg-blue-500/20 text-blue-700 px-2.5 py-0.5 rounded-lg text-xs font-bold">Q{i + 1}</span>
                        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                          {t("Yêu cầu", "Task")}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Picture / context box - visually separated */}
                      <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-amber-500/[0.06] to-orange-500/[0.03] border border-amber-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <ImageIcon className="w-4 h-4 text-amber-600" />
                          <span className="text-amber-700 text-xs font-bold uppercase tracking-wide">
                            {isContextual ? t("Ngữ cảnh / Mô tả", "Context / Picture") : t("Yêu cầu", "Instruction")}
                          </span>
                        </div>
                        <KidBullets
                          text={instructionText}
                          marker="🔸"
                          className="text-amber-900"
                          style={{ fontSize: "16px", lineHeight: "1.7" }}
                        />
                      </div>

                      {/* Actual question prompt */}
                      <div className="mb-4 p-4 rounded-xl bg-blue-500/[0.05] border border-blue-500/20">
                        <p className="text-blue-800 text-xs font-bold uppercase tracking-wide mb-1.5">
                          {t("Câu hỏi", "Question")}
                        </p>
                        <p className="text-slate-900" style={{ fontSize: "18px", lineHeight: "1.8" }}>
                          {p.question}
                        </p>
                      </div>

                      <p className="text-xs text-slate-700 mb-2 font-semibold uppercase tracking-wide">
                        {t("Chọn đáp án đúng", "Choose the correct answer")}
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
                                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-800"
                                    : isSelected
                                      ? "bg-red-500/20 border-red-500/30 text-red-800"
                                      : "bg-white/70 border-slate-200 text-slate-700"
                                  : isSelected
                                    ? "bg-blue-500/20 border-blue-500/30 text-blue-800"
                                    : "bg-white/70 border-slate-200 text-slate-700 hover:bg-white/80"
                              }`}
                            >
                              <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                              {opt}
                              {isRevealed && isCorrect && <CheckCircle className="inline w-4 h-4 ml-2 text-emerald-600" />}
                              {isRevealed && isSelected && !isCorrect && <XCircle className="inline w-4 h-4 ml-2 text-red-600" />}
                            </button>
                          );
                        })}
                      </div>
                      {!practiceRevealed.has(i) && practiceAnswers[i] !== undefined && (
                        <Button size="sm" onClick={() => revealPractice(i)} className="bg-blue-600 hover:bg-blue-700 text-slate-900">
                          {t("Kiểm tra đáp án", "Check Answer")}
                        </Button>
                      )}
                      {practiceRevealed.has(i) && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 mt-3">
                          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4 text-amber-600" />
                            {t("Giải thích của thầy Hải", "Teacher Hai's Explanation")}
                          </p>
                          <KidBullets
                            text={t(p.explanationVi, p.explanation)}
                            marker="💡"
                            className="text-emerald-900"
                            style={{ fontSize: "15px", lineHeight: "1.8" }}
                          />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Vocab */}
            <TabsContent value="vocab">
              <div className="mb-5 p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-800 font-bold text-sm mb-1">
                    {t("Từ vựng cốt lõi của bài", "Core Vocabulary of this lecture")}
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {t(
                      `${lecture.vocabulary.length} từ chính xuất hiện trong bài. Mỗi thẻ gồm: từ tiếng Anh, nghĩa tiếng Việt, và một câu ví dụ thực tế.`,
                      `${lecture.vocabulary.length} key words featured in this lecture. Each card shows the English word, its meaning, and a real example sentence.`
                    )}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lecture.vocabulary.map((v, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="p-5 rounded-2xl bg-white/70 border border-slate-200"
                  >
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-emerald-600 text-xs font-bold">#{i + 1}</span>
                      <p className="text-slate-900 font-bold" style={{ fontSize: "20px" }}>{v.word}</p>
                    </div>
                    <p className="text-violet-700 text-sm mb-2">
                      <span className="text-slate-700 uppercase text-[10px] font-bold tracking-wider mr-1.5">{t("Nghĩa", "Meaning")}</span>
                      {t(v.meaningVi, v.meaning)}
                    </p>
                    <div className="p-2.5 rounded-lg bg-white/70 border border-slate-200">
                      <p className="text-slate-700 text-[10px] uppercase font-bold tracking-wider mb-0.5">{t("Ví dụ", "Example")}</p>
                      <p className="text-slate-700 text-sm italic">"{v.example}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Quiz */}
            <TabsContent value="quiz">
              <div className="mb-5 p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-amber-800 font-bold text-sm">
                      {t("Quiz đánh giá nhanh - đã mở rộng", "Quick Assessment Quiz - expanded")}
                    </p>
                    {lecture.generatedQuizCount > 0 && (
                      <Badge variant="outline" className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-500/10 border-emerald-500/30 text-emerald-700">
                        +{lecture.generatedQuizCount} {t("câu mở rộng", "bonus questions")}
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {t(
                      `${lecture.quiz.length} câu hỏi tổng kết toàn bài (gồm câu hỏi gốc + câu hỏi mở rộng từ từ vựng, quy tắc và lỗi thường gặp). Chọn đáp án cho mỗi câu rồi bấm "Nộp bài" ở cuối - bạn sẽ thấy điểm số và giải thích cho từng câu.`,
                      `${lecture.quiz.length} questions to consolidate the lecture (original + bonus questions auto-generated from vocabulary, rules and common mistakes). Select an answer for each, then tap "Submit Quiz" at the bottom - you'll see your score and an explanation for every item.`
                    )}
                  </p>
                </div>
              </div>

              {quizSubmitted && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-center p-8 mb-6 rounded-2xl border border-amber-500/20"
                  style={{ background: `linear-gradient(135deg, ${levelCfg.gradientFrom}15, ${levelCfg.gradientTo}10)` }}
                >
                  <div className="text-5xl mb-3">
                    {quizScore === lecture.quiz.length ? "🌟" : quizScore >= lecture.quiz.length / 2 ? "⭐" : "💪"}
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-2">{quizScore}/{lecture.quiz.length}</p>
                  <p className="text-lg" style={{ color: levelCfg.color }}>
                    {quizScore === lecture.quiz.length
                      ? t("Xuất sắc! Bạn giỏi lắm! 🎉", "Excellent! Great job! 🎉")
                      : quizScore >= lecture.quiz.length / 2
                        ? t("Tốt lắm! Cố gắng thêm nhé!", "Good job! Keep practicing!")
                        : t("Cố lên! Bạn làm được mà! 💪", "Try again, you can do it! 💪")}
                  </p>
                  <Button size="sm" variant="outline" onClick={handleQuizReset} className="mt-4 border-slate-200 text-slate-700 hover:bg-white/[0.06]">
                    {t("Làm lại", "Try Again")}
                  </Button>
                </motion.div>
              )}

              <div className="space-y-4">
                {lecture.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="p-5 rounded-2xl bg-white/70 border border-slate-200">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="bg-amber-500/20 text-amber-700 px-2.5 py-0.5 rounded-lg text-xs font-bold">
                        {t(`Câu ${qIdx + 1}/${lecture.quiz.length}`, `Question ${qIdx + 1}/${lecture.quiz.length}`)}
                      </span>
                    </div>
                    <p className="text-slate-900 font-semibold mb-3" style={{ fontSize: "18px", lineHeight: "1.7" }}>
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
                                  ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-800"
                                  : isSelected
                                    ? "bg-red-500/20 border-red-500/30 text-red-800"
                                    : "bg-white/70 border-slate-200 text-slate-700"
                                : isSelected
                                  ? "bg-amber-500/20 border-amber-500/30 text-amber-800"
                                  : "bg-white/70 border-slate-200 text-slate-700 hover:bg-white/80"
                            }`}
                          >
                            <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                            {quizSubmitted && isCorrect && <CheckCircle className="inline w-4 h-4 ml-2 text-emerald-600" />}
                            {quizSubmitted && isSelected && !isCorrect && <XCircle className="inline w-4 h-4 ml-2 text-red-600" />}
                          </button>
                        );
                      })}
                    </div>
                    {quizSubmitted && (
                      <div className="mt-3 p-3.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/20">
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          {t("Giải thích", "Explanation")}
                        </p>
                        <p className="text-amber-900 text-sm leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!quizSubmitted && Object.keys(quizAnswers).length > 0 && (
                <Button onClick={handleQuizSubmit} className="mt-6 w-full h-12 text-base font-bold" style={{ background: `linear-gradient(90deg, ${levelCfg.gradientFrom}, ${levelCfg.gradientTo})` }}>
                  <Star className="w-5 h-5 mr-2" /> {t(`Nộp bài (${Object.keys(quizAnswers).length}/${lecture.quiz.length})`, `Submit Quiz (${Object.keys(quizAnswers).length}/${lecture.quiz.length})`)}
                </Button>
              )}
            </TabsContent>
          </Tabs>

          {/* Teacher Hai's Secret Tip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-8 p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.06] to-orange-500/[0.04]"
          >
            <p className="text-sm font-bold text-amber-700 mb-2 uppercase tracking-wide">🔑 Teacher Hai&apos;s Secret Tip</p>
            <p className="text-amber-800" style={{ fontSize: "20px", lineHeight: "1.8" }}>
              {t(lecture.secretTipVi, lecture.secretTip)}
            </p>
          </motion.div>

          {/* Next lecture */}
          {nextLecture && (
            <div className="mt-8 p-5 rounded-2xl bg-white/70 border border-slate-200">
              <p className="text-xs text-slate-700 mb-2 uppercase tracking-wide font-semibold">{t("Bài tiếp theo", "Next Lecture")}</p>
              <Link to={`/cambridge-lectures/${nextLecture.id}`} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{nextLecture.icon}</span>
                  <span className="text-slate-900 group-hover:text-violet-700 transition-colors font-medium" style={{ fontSize: "18px" }}>{t(nextLecture.titleVi, nextLecture.title)}</span>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-violet-700" />
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
      </div>
    </div>
  );
};

export default CambridgeLectureView;
