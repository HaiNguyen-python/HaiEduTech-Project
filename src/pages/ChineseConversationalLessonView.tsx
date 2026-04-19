// Interactive Chinese Conversational lesson view with situations, vocab, structures, listening, and roleplay
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { icons, ArrowLeft, BookOpen, Volume2, ChevronRight, CheckCircle, Award, Play, MessageCircle, Lock, Loader2, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getChineseConvLessonById, getChinesePillarByLessonId, chineseConversationalPillars } from "@/data/chineseConversationalCurriculum";
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
const STORAGE_KEY = "conv-cn-progress";

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

// Speak Chinese text using TTS
const speakChinese = (text: string, rate = 0.85) => {
  speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "zh-CN";
  utt.rate = rate;
  speechSynthesis.speak(utt);
};

const ChineseConversationalLessonView = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("situations");
  const [listeningRevealed, setListeningRevealed] = useState(false);
  const [listeningAnswers, setListeningAnswers] = useState<Record<number, number>>({});
  const [fibAnswers, setFibAnswers] = useState<Record<number, string>>({});
  const [fibChecked, setFibChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { hasAccess, loading: accessLoading } = useCourseAccess("conversational-chinese");
  const [showAccessModal, setShowAccessModal] = useState(false);

  const lesson = lessonId ? getChineseConvLessonById(lessonId) : null;
  const pillar = lessonId ? getChinesePillarByLessonId(lessonId) : null;

  useEffect(() => {
    if (lesson && pillar && hasAccess) {
      setIsCompleted(getCompletedLessons().includes(lesson.id));
    }
  }, [lesson, pillar, hasAccess]);

  if (accessLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
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
          <AccessDeniedModal open={showAccessModal} onOpenChange={(open) => { setShowAccessModal(open); if (!open) navigate("/chinese/conversational"); }} />
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
          <Button asChild className="mt-4"><Link to="/chinese/conversational/curriculum">← {t("Quay lại", "Go back")}</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const LIcon = getIcon(lesson.icon);
  const pillarLessons = pillar.lessons;
  const currentIndex = pillarLessons.findIndex(l => l.id === lesson.id);
  const nextLesson = currentIndex < pillarLessons.length - 1 ? pillarLessons[currentIndex + 1] : null;

  const handleComplete = () => {
    markLessonComplete(lesson.id);
    setIsCompleted(true);
    logStudentActivity({
      activityType: "conv_chinese",
      activityId: lesson.id,
      score: 10,
      maxScore: 10,
      metadata: { pillar: pillar.id, lessonTitle: lesson.title },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <Link to="/chinese/conversational/curriculum" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4" />
          {t("Chương trình Tương tác 中文", "Interactive 中文 Curriculum")}
        </Link>

        {/* Lesson header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white`}>
              <LIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{t(pillar.titleVi, pillar.title)} · {pillar.titleZh}</p>
              <h1 className="text-2xl sm:text-3xl font-bold">{t(lesson.titleVi, lesson.title)} <span className="text-lg text-muted-foreground">({lesson.titleZh})</span></h1>
            </div>
            <Badge variant="outline" className="ml-auto">HSK {lesson.hskLevel}</Badge>
            {isCompleted && (
              <Badge className="bg-red-100 text-red-700 border-red-200">
                <Award className="h-3 w-3 mr-1" /> {t(lesson.badgeVi, lesson.badge)}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{t(lesson.descriptionVi, lesson.description)}</p>
        </motion.div>

        {/* Content tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full flex mb-6 h-auto flex-wrap gap-1">
            <TabsTrigger value="situations" className="flex-1 text-xs sm:text-sm py-2">🎯 {t("Tình huống", "Situations")}</TabsTrigger>
            <TabsTrigger value="vocabulary" className="flex-1 text-xs sm:text-sm py-2">📚 {t("Từ vựng", "Vocabulary")}</TabsTrigger>
            <TabsTrigger value="structures" className="flex-1 text-xs sm:text-sm py-2">📐 {t("Cấu trúc", "Structures")}</TabsTrigger>
            {lesson.fillInBlankExercises && lesson.fillInBlankExercises.length > 0 && (
              <TabsTrigger value="exercises" className="flex-1 text-xs sm:text-sm py-2">✏️ {t("Bài tập", "Exercises")}</TabsTrigger>
            )}
            <TabsTrigger value="listening" className="flex-1 text-xs sm:text-sm py-2">🎧 {t("Nghe", "Listening")}</TabsTrigger>
            <TabsTrigger value="roleplay" className="flex-1 text-xs sm:text-sm py-2">🎤 {t("Luyện nói", "Roleplay")}</TabsTrigger>
          </TabsList>

          {/* SITUATIONS TAB */}
          <TabsContent value="situations">
            <div className="space-y-6">
              {lesson.keySituations.map((situation, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-red-500" />
                        {t(situation.titleVi, situation.title)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{t(situation.descriptionVi, situation.description)}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Cultural note */}
                      {situation.culturalNote && (
                        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 rounded-lg">
                          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1">
                            <Globe className="h-3 w-3" /> {t("Ghi chú Văn hóa", "Cultural Note")}
                          </p>
                          <p className="text-sm text-amber-800 dark:text-amber-300">{t(situation.culturalNoteVi || "", situation.culturalNote)}</p>
                        </div>
                      )}

                      {/* Sample dialogue — chat bubble style */}
                      <div className="space-y-4">
                        {situation.sampleDialogue.map((line, i) => {
                          // Alternate sides: even index = left, odd = right (zig-zag for readability)
                          const isRight = i % 2 === 1;
                          const palette = [
                            { bubble: "bg-gradient-to-br from-blue-500 to-blue-600 text-white", label: "bg-blue-600 text-white" },
                            { bubble: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white", label: "bg-emerald-600 text-white" },
                          ];
                          const { bubble: bubbleColor, label: labelColor } = palette[i % 2];

                          return (
                            <div key={i} className={`flex gap-3 ${isRight ? "flex-row-reverse" : ""}`}>
                              {/* Avatar circle */}
                              <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${labelColor}`}>
                                {line.speaker.charAt(0)}
                              </div>
                              {/* Bubble */}
                              <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${isRight ? "rounded-tr-sm" : "rounded-tl-sm"} ${bubbleColor}`}>
                                <p className="text-xs font-bold opacity-80 mb-1">{line.speaker}</p>
                                <p className="text-lg font-bold leading-relaxed">{line.line}</p>
                                <p className="text-sm opacity-80 mt-1 italic">{line.pinyin}</p>
                                {line.translationVi && (
                                  <p className="text-sm mt-1 font-medium opacity-90 border-t border-white/20 pt-1">🇻🇳 {line.translationVi}</p>
                                )}
                                <button
                                  onClick={() => speakChinese(line.line)}
                                  className="mt-2 opacity-70 hover:opacity-100 transition-opacity"
                                  title="Listen"
                                >
                                  <Volume2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* VOCABULARY TAB */}
          <TabsContent value="vocabulary">
            <div className="space-y-3">
              {lesson.vocabulary.map((v, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <button onClick={() => speakChinese(v.hanzi)} className="text-red-500 hover:text-red-600 transition-colors">
                            <Volume2 className="h-6 w-6" />
                          </button>
                          <div>
                            <h4 className="font-bold text-2xl sm:text-3xl text-red-600">{v.hanzi}</h4>
                            <p className="text-base text-primary font-medium">{v.pinyin}</p>
                            <p className="text-sm text-muted-foreground">{t(v.meaning, v.meaningEn)}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs capitalize shrink-0">{v.type}</Badge>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg mt-3">
                        <p className="text-base sm:text-lg font-semibold">{v.example}</p>
                        <p className="text-sm text-primary/80 italic mt-1">{v.examplePinyin}</p>
                        <p className="text-sm text-muted-foreground mt-1">→ {v.exampleVi}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* STRUCTURES TAB */}
          <TabsContent value="structures">
            <div className="space-y-4">
              {lesson.commonStructures.map((struct, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-red-600">{struct.pattern}</CardTitle>
                      <p className="text-sm text-primary/80 italic">{struct.patternPinyin}</p>
                      <p className="text-sm text-muted-foreground">{t(struct.explanationVi, struct.explanation)}</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {struct.examples.map((ex, i) => (
                        <div key={i} className="bg-muted/50 p-3 rounded-lg flex items-start gap-2">
                          <button onClick={() => speakChinese(ex.zh)} className="text-red-500 hover:text-red-600 mt-0.5 shrink-0">
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <div>
                            <p className="text-sm font-medium">{ex.zh}</p>
                            <p className="text-xs text-primary/80 italic">{ex.pinyin}</p>
                            <p className="text-xs text-muted-foreground">→ {ex.vi}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* EXERCISES TAB - Fill in the blank */}
          {lesson.fillInBlankExercises && lesson.fillInBlankExercises.length > 0 && (
            <TabsContent value="exercises">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    {t("Bài tập điền từ", "Fill in the Blank")}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t("Điền từ tiếng Trung phù hợp vào chỗ trống.", "Fill in the correct Chinese word for each blank.")}
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  {lesson.fillInBlankExercises.map((ex, idx) => {
                    const userAns = (fibAnswers[idx] || "").trim();
                    const correct = userAns === ex.answer;
                    return (
                      <div key={idx} className="border rounded-lg p-4 bg-card space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-bold text-purple-600 min-w-[28px]">{idx + 1}.</span>
                          <div className="flex-1">
                            <p className="text-lg font-semibold leading-relaxed">{ex.sentence}</p>
                            <p className="text-sm text-muted-foreground italic mt-1">{ex.pinyin}</p>
                            <p className="text-sm text-muted-foreground mt-1">🇻🇳 {ex.translationVi}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pl-9">
                          <input
                            type="text"
                            value={fibAnswers[idx] || ""}
                            onChange={(e) => setFibAnswers({ ...fibAnswers, [idx]: e.target.value })}
                            placeholder={t("Nhập đáp án...", "Type answer...")}
                            className="border rounded-md px-3 py-2 text-base bg-background min-w-[140px]"
                            disabled={fibChecked}
                          />
                          {ex.hint && !fibChecked && (
                            <span className="text-xs text-amber-600 dark:text-amber-400">💡 {ex.hint}</span>
                          )}
                          {fibChecked && (
                            <span className={`text-sm font-semibold ${correct ? "text-emerald-600" : "text-red-600"}`}>
                              {correct ? `✅ ${t("Đúng", "Correct")}` : `❌ ${t("Đáp án", "Answer")}: ${ex.answer}`}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex gap-2 pt-2">
                    {!fibChecked ? (
                      <Button onClick={() => setFibChecked(true)} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {t("Kiểm tra", "Check Answers")}
                      </Button>
                    ) : (
                      <Button onClick={() => { setFibChecked(false); setFibAnswers({}); }} variant="outline">
                        {t("Làm lại", "Try Again")}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* LISTENING TAB */}
          <TabsContent value="listening">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-red-500" />
                  {t(lesson.listeningChallenge.titleVi, lesson.listeningChallenge.title)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Button variant="default" size="sm" onClick={() => speakChinese(lesson.listeningChallenge.transcript, 0.85)} className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                      <Play className="h-4 w-4 mr-1" /> {t("▶ Nghe bài", "▶ Play Audio")}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => speakChinese(lesson.listeningChallenge.transcript, 0.6)}>
                      🐢 {t("Nghe chậm", "Slow")}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => speechSynthesis.cancel()}>
                      ⏹ {t("Dừng", "Stop")}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setListeningRevealed(!listeningRevealed)}>
                      {listeningRevealed ? t("👁 Ẩn lời thoại", "👁 Hide Transcript") : t("📝 Xem lời thoại", "📝 Show Transcript")}
                    </Button>
                  </div>
                  <AnimatePresence>
                    {listeningRevealed && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <p className="text-sm leading-relaxed">{lesson.listeningChallenge.transcript}</p>
                        <p className="text-xs text-primary/70 italic leading-relaxed">{lesson.listeningChallenge.transcriptPinyin}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

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
                              className={`p-3 rounded-lg text-left text-sm border transition-all ${answered
                                ? isCorrect ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                  : selected ? "bg-red-50 border-red-300 text-red-800"
                                    : "bg-muted/30 border-border text-muted-foreground"
                                : "bg-card border-border hover:border-red-400 hover:shadow-sm cursor-pointer"
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
              lessonTitle={lesson.title + " (" + lesson.titleZh + ")"}
              pillar={pillar.title}
              speakingTopics={lesson.speakingTopics}
              keySituationTitles={lesson.keySituations.map(s => s.title)}
              language="chinese"
            />
          </TabsContent>
        </Tabs>

        {/* Complete & Navigate */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          {!isCompleted ? (
            <Button onClick={handleComplete} className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white" size="lg">
              <CheckCircle className="h-5 w-5 mr-2" />
              {t("Hoàn thành Bài học", "Mark as Complete")}
            </Button>
          ) : (
            <div className="flex-1 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 justify-center text-red-700">
              <Award className="h-5 w-5" />
              <span className="font-medium">{t("Đã hoàn thành! Huy hiệu: ", "Completed! Badge: ")}{t(lesson.badgeVi, lesson.badge)}</span>
            </div>
          )}
          {nextLesson && (
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to={`/chinese/conversational/learn/${nextLesson.id}`}>
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

export default ChineseConversationalLessonView;
