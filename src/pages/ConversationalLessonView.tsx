// Interactive Conversational English lesson view with situations, vocab, listening, and roleplay
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { icons, ArrowLeft, BookOpen, Mic, Volume2, ChevronRight, CheckCircle, Award, Play, MessageCircle, Lock, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getConvLessonById, getPillarByLessonId, allConversationalLessons, conversationalPillars } from "@/data/conversationalCurriculum";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ConversationalRoleplay from "@/components/ConversationalRoleplay";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { useCourseAccess } from "@/hooks/useCourseAccess";
import AccessDeniedModal from "@/components/AccessDeniedModal";

const getIcon = (name: string) => (icons as Record<string, any>)[name] ?? BookOpen;
const STORAGE_KEY = "conv-eng-progress";

const getCompletedLessons = (): string[] => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
};

const markLessonComplete = (id: string) => {
  const list = getCompletedLessons();
  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event("storage"));
  }
};

// Log topic choice for RL engine
const logTopicChoice = (lessonId: string, pillarId: string) => {
  try {
    const key = "conv-eng-topic-log";
    const log = JSON.parse(localStorage.getItem(key) || "[]");
    log.push({ lessonId, pillarId, timestamp: Date.now() });
    // Keep last 100 entries
    if (log.length > 100) log.splice(0, log.length - 100);
    localStorage.setItem(key, JSON.stringify(log));
  } catch {}
};

const ConversationalLessonView = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("situations");
  const [listeningRevealed, setListeningRevealed] = useState(false);
  const [listeningAnswers, setListeningAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { hasAccess, loading: accessLoading } = useCourseAccess("conversational-english");
  const [showAccessModal, setShowAccessModal] = useState(false);

  const lesson = lessonId ? getConvLessonById(lessonId) : null;
  const pillar = lessonId ? getPillarByLessonId(lessonId) : null;

  // Reset listening state when switching lessons
  useEffect(() => {
    setListeningAnswers({});
    setListeningRevealed(false);
  }, [lessonId]);

  useEffect(() => {
    if (lesson && pillar && hasAccess) {
      logTopicChoice(lesson.id, pillar.id);
      setIsCompleted(getCompletedLessons().includes(lesson.id));
    }
  }, [lesson, pillar, hasAccess]);

  // Access guard - after all hooks
  if (accessLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h1 className="text-2xl font-bold mb-2">{t("Nội dung bị khóa", "Content Locked")}</h1>
          <p className="text-muted-foreground mb-4">{t("Bạn chưa có quyền truy cập bài học này.", "You don't have access to this lesson.")}</p>
          <Button onClick={() => setShowAccessModal(true)}>{t("Xem hướng dẫn đăng ký", "Learn how to enroll")}</Button>
          <AccessDeniedModal open={showAccessModal} onOpenChange={(open) => { setShowAccessModal(open); if (!open) navigate("/english/conversational"); }} />
        </div>
        <Footer />
      </div>
    );
  }

  if (!lesson || !pillar) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">{t("Không tìm thấy bài học", "Lesson not found")}</p>
          <Button asChild className="mt-4"><Link to="/english/conversational/curriculum">← {t("Quay lại", "Go back")}</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const LIcon = getIcon(lesson.icon);

  // Find next lesson
  const pillarLessons = pillar.lessons;
  const currentIndex = pillarLessons.findIndex(l => l.id === lesson.id);
  const nextLesson = currentIndex < pillarLessons.length - 1 ? pillarLessons[currentIndex + 1] : null;

  const handleComplete = () => {
    markLessonComplete(lesson.id);
    setIsCompleted(true);
    logStudentActivity({
      activityType: "conv_english",
      activityId: lesson.id,
      score: 10,
      maxScore: 10,
      metadata: { pillar: pillar.id, lessonTitle: lesson.title },
    });
  };

  const allListeningCorrect = lesson.listeningChallenge.questions.every(
    (q, i) => listeningAnswers[i] === q.answer
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <Link to="/english/conversational/curriculum" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4" />
          {t("Chương trình Tương tác", "Interactive Curriculum")}
        </Link>

        {/* Lesson header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white`}>
              <LIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{t(pillar.titleVi, pillar.title)}</p>
              <h1 className="text-2xl sm:text-3xl font-bold">{t(lesson.titleVi, lesson.title)}</h1>
            </div>
            {isCompleted && (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 ml-auto">
                <Award className="h-3 w-3 mr-1" /> {t(lesson.badgeVi, lesson.badge)}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{t(lesson.descriptionVi, lesson.description)}</p>
        </motion.div>

        {/* Content tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full flex mb-6 h-auto flex-wrap gap-1">
            <TabsTrigger value="situations" className="flex-1 text-xs sm:text-sm py-2">
              🎯 {t("Tình huống", "Situations")}
            </TabsTrigger>
            <TabsTrigger value="vocabulary" className="flex-1 text-xs sm:text-sm py-2">
              📚 {t("Từ vựng", "Vocab & Slang")}
            </TabsTrigger>
            <TabsTrigger value="listening" className="flex-1 text-xs sm:text-sm py-2">
              🎧 {t("Nghe", "Listening")}
            </TabsTrigger>
            <TabsTrigger value="roleplay" className="flex-1 text-xs sm:text-sm py-2">
              🎤 {t("Luyện nói", "Roleplay")}
            </TabsTrigger>
          </TabsList>

          {/* SITUATIONS TAB */}
          <TabsContent value="situations">
            <div className="space-y-6">
              {lesson.keySituations.map((situation, idx) => {
                // Build speaker style map: "You" always on right with brand gradient; others alternate sides + colors
                const otherPalette = [
                  { side: "left", bubble: "bg-gradient-to-br from-purple-100 to-fuchsia-100 dark:from-purple-900/40 dark:to-fuchsia-900/40 text-foreground border border-purple-200/60 dark:border-purple-800/40", avatar: "bg-purple-500", emoji: "🧑" },
                  { side: "right", bubble: "bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-foreground border border-amber-200/60 dark:border-amber-800/40", avatar: "bg-amber-500", emoji: "👤" },
                  { side: "left", bubble: "bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 text-foreground border border-pink-200/60 dark:border-pink-800/40", avatar: "bg-pink-500", emoji: "🧒" },
                  { side: "right", bubble: "bg-gradient-to-br from-cyan-100 to-sky-100 dark:from-cyan-900/40 dark:to-sky-900/40 text-foreground border border-cyan-200/60 dark:border-cyan-800/40", avatar: "bg-cyan-500", emoji: "🧓" },
                  { side: "left", bubble: "bg-gradient-to-br from-lime-100 to-green-100 dark:from-lime-900/40 dark:to-green-900/40 text-foreground border border-lime-200/60 dark:border-lime-800/40", avatar: "bg-lime-600", emoji: "🧔" },
                ];
                const youStyle = {
                  side: "right" as const,
                  bubble: "bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-md shadow-emerald-500/20",
                  avatar: "bg-emerald-600",
                  emoji: "😎",
                };
                const uniqueOthers: string[] = [];
                situation.sampleDialogue.forEach((l) => {
                  if (l.speaker !== "You" && !uniqueOthers.includes(l.speaker)) uniqueOthers.push(l.speaker);
                });
                const styleFor = (speaker: string) => {
                  if (speaker === "You") return youStyle;
                  const i = uniqueOthers.indexOf(speaker);
                  return otherPalette[i % otherPalette.length];
                };

                return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        {t(situation.titleVi, situation.title)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{t(situation.descriptionVi, situation.description)}</p>
                    </CardHeader>
                    <CardContent>
                      {/* Sample dialogue — alternating chat bubbles */}
                      <div className="space-y-3">
                        {situation.sampleDialogue.map((line, i) => {
                          const s = styleFor(line.speaker);
                          const isRight = s.side === "right";
                          return (
                            <div key={i} className={`flex items-end gap-2 ${isRight ? "flex-row-reverse" : ""}`}>
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${s.avatar} text-white flex items-center justify-center text-sm shadow-sm`}>
                                {s.emoji}
                              </div>
                              <div className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-sm ${s.bubble} ${isRight ? "rounded-br-sm" : "rounded-bl-sm"}`}>
                                <p className={`text-[10px] font-bold mb-0.5 ${line.speaker === "You" ? "text-white/80" : "text-muted-foreground"}`}>{line.speaker}</p>
                                <p className="leading-snug">{line.line}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* VOCABULARY TAB */}
          <TabsContent value="vocabulary">
            <div className="space-y-3">
              {lesson.vocabulary.map((v, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-base text-primary">{v.term}</h4>
                          <p className="text-xs text-muted-foreground">{t(v.meaning, v.meaningEn)}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] capitalize shrink-0">
                          {v.type}
                        </Badge>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg mt-2">
                        <p className="text-sm italic">"{v.example}"</p>
                        <p className="text-xs text-muted-foreground mt-1">→ {v.exampleVi}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* LISTENING TAB */}
          <TabsContent value="listening">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  {t(lesson.listeningChallenge.titleVi, lesson.listeningChallenge.title)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Audio playback + transcript */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        speechSynthesis.cancel();
                        const utt = new SpeechSynthesisUtterance(lesson.listeningChallenge.transcript);
                        utt.lang = "en-US";
                        utt.rate = 0.85;
                        speechSynthesis.speak(utt);
                      }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {t("▶ Nghe bài", "▶ Play Audio")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        speechSynthesis.cancel();
                        const utt = new SpeechSynthesisUtterance(lesson.listeningChallenge.transcript);
                        utt.lang = "en-US";
                        utt.rate = 0.65;
                        speechSynthesis.speak(utt);
                      }}
                    >
                      🐢 {t("Nghe chậm", "Slow")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => speechSynthesis.cancel()}
                    >
                      ⏹ {t("Dừng", "Stop")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setListeningRevealed(!listeningRevealed)}
                    >
                      {listeningRevealed
                        ? t("👁 Ẩn lời thoại", "👁 Hide Transcript")
                        : t("📝 Xem lời thoại", "📝 Show Transcript")}
                    </Button>
                  </div>
                  <AnimatePresence>
                    {listeningRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-muted/50 p-4 rounded-lg"
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {lesson.listeningChallenge.transcript}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {lesson.listeningChallenge.questions.map((q, qi) => (
                    <div key={qi} className="p-4 bg-muted/30 rounded-xl">
                      <p className="font-medium text-sm mb-3">{t(q.qVi, q.q)}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oi) => {
                          const selected = listeningAnswers[qi] === oi;
                          const isCorrect = oi === q.answer;
                          const answered = listeningAnswers[qi] !== undefined;

                          return (
                            <button
                              key={oi}
                              onClick={() => !answered && setListeningAnswers(prev => ({ ...prev, [qi]: oi }))}
                              disabled={answered}
                              className={`p-3 rounded-lg text-left text-sm border transition-all ${
                                answered
                                  ? isCorrect
                                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                    : selected
                                      ? "bg-red-50 border-red-300 text-red-800"
                                      : "bg-muted/30 border-border text-muted-foreground"
                                  : "bg-card border-border hover:border-primary hover:shadow-sm cursor-pointer"
                              }`}
                            >
                              <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>
                              {opt}
                              {answered && isCorrect && <CheckCircle className="h-4 w-4 inline ml-2 text-emerald-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ROLEPLAY TAB */}
          <TabsContent value="roleplay">
            <ConversationalRoleplay
              lessonTitle={lesson.title}
              pillar={pillar.title}
              speakingTopics={lesson.speakingTopics}
              keySituationTitles={lesson.keySituations.map(s => s.title)}
            />
          </TabsContent>

        </Tabs>

        {/* Complete & Navigate */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          {!isCompleted ? (
            <Button
              onClick={handleComplete}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              size="lg"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              {t("Hoàn thành Bài học", "Mark as Complete")}
            </Button>
          ) : (
            <div className="flex-1 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 justify-center text-emerald-700">
              <Award className="h-5 w-5" />
              <span className="font-medium">{t("Đã hoàn thành! Huy hiệu: ", "Completed! Badge: ")}{t(lesson.badgeVi, lesson.badge)}</span>
            </div>
          )}
          {nextLesson && (
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to={`/english/conversational/learn/${nextLesson.id}`}>
                {t("Bài tiếp theo: ", "Next: ")}{t(nextLesson.titleVi, nextLesson.title)}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>
      </main>

      <Footer />
      
    </div>
  );
};

export default ConversationalLessonView;
