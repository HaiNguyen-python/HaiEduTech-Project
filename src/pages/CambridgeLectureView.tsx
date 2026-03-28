// Cambridge Lecture Detail View — Kid-friendly, Exam-ready
import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ChevronRight, AlertTriangle, BookOpen, Lightbulb,
  CheckCircle, XCircle, Download, Star, Info, Eye, EyeOff
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
      <div className="min-h-screen bg-[#0F172A]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <BookOpen className="w-16 h-16 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-white">{t("Không tìm thấy bài giảng", "Lecture not found")}</h2>
          <Button onClick={() => navigate("/cambridge-lectures")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t("Quay lại", "Go back")}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const levelCfg = LEVEL_CONFIG[lecture.level];
  const quizScore = quizSubmitted ? Object.entries(quizAnswers).filter(([i, a]) => a === lecture.quiz[Number(i)]?.answer).length : 0;

  const handleQuizSubmit = () => setQuizSubmitted(true);
  const handleQuizReset = () => { setQuizAnswers({}); setQuizSubmitted(false); };
  const revealPractice = (idx: number) => setPracticeRevealed(prev => new Set(prev).add(idx));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1a1040] to-[#0F172A]">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <Button variant="ghost" onClick={() => navigate("/cambridge-lectures")} className="text-[#94A3B8] hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t("Quay lại danh sách", "Back to lectures")}
          </Button>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            {/* Level ribbon */}
            <div className="h-1.5 rounded-full mb-6 max-w-xs" style={{ background: `linear-gradient(90deg, ${levelCfg.gradientFrom}, ${levelCfg.gradientTo})` }} />
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-3xl">{lecture.icon}</span>
              <Badge variant="outline" className={`${levelCfg.bgClass} ${levelCfg.textClass} ${levelCfg.borderClass} text-sm`}>
                {levelCfg.label}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontSize: "20px", lineHeight: "1.8" }}>
              {t(lecture.titleVi, lecture.title)}
            </h1>
            <p className="text-[#94A3B8] text-base" style={{ fontSize: "20px", lineHeight: "1.8" }}>
              {t(lecture.descriptionVi, lecture.description)}
            </p>
          </motion.div>

          {/* Welcome message */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="rounded-2xl p-5 mb-8 border border-white/10 backdrop-blur-md"
            style={{ background: `linear-gradient(135deg, ${levelCfg.gradientFrom}15, ${levelCfg.gradientTo}10)` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">👨‍🏫</span>
              <div>
                <p className="text-sm font-medium text-[#C4B5FD] mb-1">Teacher Hai says:</p>
                <p className="text-white" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                  {t(lecture.welcomeMessageVi, lecture.welcomeMessage)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Parent Info toggle */}
          <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <Info className="w-5 h-5 text-[#A78BFA]" />
            <span className="text-sm text-[#94A3B8] flex-1">{t("Thông tin cho phụ huynh", "Information for Parents")}</span>
            <Switch checked={showParentInfo} onCheckedChange={setShowParentInfo} />
          </div>
          {showParentInfo && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 p-4 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/20">
              <p className="text-sm text-[#D8B4FE]" style={{ lineHeight: "1.8" }}>
                {t(lecture.parentInfoVi, lecture.parentInfo)}
              </p>
            </motion.div>
          )}

          {/* Tabs: Rules / Watch Out / Practice / Vocab / Quiz */}
          <Tabs defaultValue="rules" className="space-y-6">
            <TabsList className="bg-white/[0.05] border border-white/10 flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="rules" className="data-[state=active]:bg-[#A855F7]/20 data-[state=active]:text-[#C4B5FD] text-[#94A3B8] text-xs sm:text-sm">
                📐 {t("Quy tắc", "Rules")}
              </TabsTrigger>
              <TabsTrigger value="watchout" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300 text-[#94A3B8] text-xs sm:text-sm">
                🐉 {t("Cảnh báo bẫy", "Watch Out!")}
              </TabsTrigger>
              <TabsTrigger value="practice" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 text-[#94A3B8] text-xs sm:text-sm">
                ✏️ {t("Luyện tập", "Practice")}
              </TabsTrigger>
              <TabsTrigger value="vocab" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 text-[#94A3B8] text-xs sm:text-sm">
                📖 {t("Từ vựng", "Vocab")}
              </TabsTrigger>
              <TabsTrigger value="quiz" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 text-[#94A3B8] text-xs sm:text-sm">
                ⭐ Quiz
              </TabsTrigger>
            </TabsList>

            {/* Rules tab — Illustrated Rules */}
            <TabsContent value="rules">
              <div className="space-y-4">
                {lecture.illustratedRules.map((rule, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="rounded-xl p-4 border border-white/10 bg-white/[0.03] backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{rule.icon}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium mb-1" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                          {t(rule.ruleVi, rule.rule)}
                        </p>
                        <p className="text-sm text-[#64748B] italic">💡 {rule.example}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Watch Out tab — Mascot warnings */}
            <TabsContent value="watchout">
              <div className="space-y-4">
                {lecture.watchOut.map((w, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="rounded-xl p-4 border border-red-500/20 bg-red-500/[0.05]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">🐉</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-red-300 font-semibold text-sm">{t("Lỗi thường gặp", "Common Mistake")}</span>
                        </div>
                        <p className="text-red-200 mb-2" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                          ❌ {t(w.mistakeVi, w.mistake)}
                        </p>
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
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

            {/* Practice tab */}
            <TabsContent value="practice">
              <div className="space-y-6">
                {lecture.practiceSet.map((p, i) => (
                  <Card key={i} className="bg-white/[0.03] border-white/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-base flex items-center gap-2">
                        <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-xs font-bold">Q{i + 1}</span>
                        {t(p.instructionVi, p.instruction)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#CBD5E1] mb-4" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                        {p.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {p.options.map((opt, optIdx) => {
                          const isSelected = practiceAnswers[i] === optIdx;
                          const isRevealed = practiceRevealed.has(i);
                          const isCorrect = optIdx === p.answer;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => !isRevealed && setPracticeAnswers(prev => ({ ...prev, [i]: optIdx }))}
                              className={`text-left p-3 rounded-lg border text-sm transition-all ${
                                isRevealed
                                  ? isCorrect
                                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-200"
                                    : isSelected
                                      ? "bg-red-500/20 border-red-500/30 text-red-200"
                                      : "bg-white/[0.02] border-white/10 text-[#64748B]"
                                  : isSelected
                                    ? "bg-blue-500/20 border-blue-500/30 text-blue-200"
                                    : "bg-white/[0.02] border-white/10 text-[#CBD5E1] hover:bg-white/[0.05]"
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
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-white/[0.03] border border-white/10 mt-3">
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

            {/* Vocab tab */}
            <TabsContent value="vocab">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lecture.vocabulary.map((v, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
                  >
                    <p className="text-white font-bold text-lg mb-1">{v.word}</p>
                    <p className="text-[#A78BFA] text-sm mb-1">{t(v.meaningVi, v.meaning)}</p>
                    <p className="text-[#64748B] text-xs italic">"{v.example}"</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Quiz tab */}
            <TabsContent value="quiz">
              {quizSubmitted && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-center p-6 mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20"
                >
                  <div className="text-4xl mb-2">
                    {quizScore === lecture.quiz.length ? "🌟" : quizScore >= lecture.quiz.length / 2 ? "⭐" : "💪"}
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{quizScore}/{lecture.quiz.length}</p>
                  <p className="text-amber-200 text-sm">
                    {quizScore === lecture.quiz.length
                      ? t("Xuất sắc! Bạn giỏi lắm!", "Excellent! Great job!")
                      : quizScore >= lecture.quiz.length / 2
                        ? t("Tốt lắm! Cố gắng thêm nhé!", "Good job! Keep practicing!")
                        : t("Cố lên! Bạn làm được mà!", "Try again, you can do it!")}
                  </p>
                  <Button size="sm" variant="outline" onClick={handleQuizReset} className="mt-3 border-amber-500/30 text-amber-200 hover:bg-amber-500/20">
                    {t("Làm lại", "Try Again")}
                  </Button>
                </motion.div>
              )}

              <div className="space-y-4">
                {lecture.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <p className="text-white font-medium mb-3" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                      <span className="text-amber-400 font-bold mr-2">Q{qIdx + 1}.</span>
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        const isCorrect = optIdx === q.answer;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                            className={`text-left p-3 rounded-lg border text-sm transition-all ${
                              quizSubmitted
                                ? isCorrect
                                  ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-200"
                                  : isSelected
                                    ? "bg-red-500/20 border-red-500/30 text-red-200"
                                    : "bg-white/[0.02] border-white/10 text-[#64748B]"
                                : isSelected
                                  ? "bg-amber-500/20 border-amber-500/30 text-amber-200"
                                  : "bg-white/[0.02] border-white/10 text-[#CBD5E1] hover:bg-white/[0.05]"
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
                      <p className="text-xs text-[#94A3B8] mt-2">
                        <Lightbulb className="inline w-3 h-3 mr-1 text-amber-400" /> {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {!quizSubmitted && Object.keys(quizAnswers).length > 0 && (
                <Button onClick={handleQuizSubmit} className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white">
                  <Star className="w-4 h-4 mr-2" /> {t("Nộp bài", "Submit Quiz")}
                </Button>
              )}
            </TabsContent>
          </Tabs>

          {/* Next lecture */}
          {nextLecture && (
            <div className="mt-10 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <p className="text-xs text-[#64748B] mb-2">{t("Bài tiếp theo", "Next Lecture")}</p>
              <Link to={`/cambridge-lectures/${nextLecture.id}`} className="flex items-center justify-between group">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{nextLecture.icon}</span>
                  <span className="text-white group-hover:text-[#C4B5FD] transition-colors">{t(nextLecture.titleVi, nextLecture.title)}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#64748B] group-hover:text-[#C4B5FD]" />
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
