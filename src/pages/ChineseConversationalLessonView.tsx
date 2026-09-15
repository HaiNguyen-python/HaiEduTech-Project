// Interactive Chinese Conversational lesson view with situations, vocab, structures, listening, and roleplay
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import { icons, ArrowLeft, ArrowRight, BookOpen, Volume2, CheckCircle, Award, MessageCircle, Lock, Loader2, Globe, Target, Clock3, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getChineseConvLessonById, getChinesePillarByLessonId, chineseConversationalPillars } from "@/data/chineseConversationalCurriculum";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ConversationalRoleplay from "@/components/ConversationalRoleplay";
import { expandChineseListeningChallenge } from "@/lib/chineseListeningChallengeExpander";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { useCourseAccess } from "@/hooks/useCourseAccess";
import AccessDeniedModal from "@/components/AccessDeniedModal";
import ChineseVocabReviewQuiz from "@/components/conversational/ChineseVocabReviewQuiz";
import {
  CHINESE_CURRICULUM_PROGRESS_EVENT, estimateChineseLessonMinutes, flattenChineseLessons,
  readChineseProgress, writeChineseProgress,
} from "@/lib/chineseCurriculumProgress";
import { dialogueAvatarFor } from "@/lib/dialogueAvatars";
import { getChineseLessonIllustration } from "@/lib/chineseLessonVisuals";

const getIcon = (name: string): LucideIcon => icons[name as keyof typeof icons] ?? BookOpen;
const markLessonComplete = (id: string) => {
  const lessons = flattenChineseLessons(chineseConversationalPillars);
  const list = readChineseProgress(lessons);
  if (!list.includes(id)) writeChineseProgress([...list, id], lessons);
};

// Speak Chinese text using Google TTS proxy + native fallback.
import { playChineseTts, stopChineseTts } from "@/lib/chineseTts";
import { playMultiVoiceDialog, stopMultiVoiceDialog, parseDialog } from "@/lib/multiVoiceDialog";
import DialogAudioPlayer from "@/components/DialogAudioPlayer";
const speakChinese = (text: string, rate = 0.85) => {
  stopChineseTts();
  void playChineseTts(text, { playbackRate: rate, speechRate: rate });
};
const speakChineseDialog = (text: string, rate = 0.85) => {
  stopChineseTts();
  const lines = parseDialog(text);
  const hasMultipleSpeakers = new Set(lines.map((l) => l.speaker).filter(Boolean)).size > 1;
  if (hasMultipleSpeakers) {
    playMultiVoiceDialog(text, "zh", { rate });
  } else {
    void playChineseTts(text, { playbackRate: rate, speechRate: rate });
  }
};
const stopChineseDialog = () => {
  stopChineseTts();
  stopMultiVoiceDialog();
};

const ChineseConversationalLessonView = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const validTabs = ["situations", "vocabulary", "structures", "exercises", "listening", "roleplay"];
  const [activeTab, setActiveTab] = useState(validTabs.includes(requestedTab ?? "") ? requestedTab ?? "situations" : "situations");
  const [listeningRevealed, setListeningRevealed] = useState(false);
  const [listeningAnswers, setListeningAnswers] = useState<Record<number, number>>({});
  const [fibAnswers, setFibAnswers] = useState<Record<number, string>>({});
  const [fibChecked, setFibChecked] = useState(false);
  const [fibScore, setFibScore] = useState<{ correct: number; total: number; percent: number } | null>(null);
  const [listeningSubmitted, setListeningSubmitted] = useState(false);
  const [listeningScore, setListeningScore] = useState<{ correct: number; total: number; percent: number } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [illustrationFailed, setIllustrationFailed] = useState(false);
  const { hasAccess, loading: accessLoading } = useCourseAccess("conversational-chinese");
  const [showAccessModal, setShowAccessModal] = useState(false);

  const baseLesson = lessonId ? getChineseConvLessonById(lessonId) : null;
  const pillar = lessonId ? getChinesePillarByLessonId(lessonId) : null;
  const lesson = useMemo(() => {
    if (!baseLesson) return null;
    return { ...baseLesson, listeningChallenge: expandChineseListeningChallenge(baseLesson) };
  }, [baseLesson]);
  const allLessons = useMemo(() => flattenChineseLessons(chineseConversationalPillars), []);

  useEffect(() => {
    if (lesson && pillar && hasAccess) {
      setIsCompleted(readChineseProgress(allLessons).includes(lesson.id));
      const tabs = ["situations", "vocabulary", "structures", ...(lesson.fillInBlankExercises?.length ? ["exercises"] : []), "listening", "roleplay"];
      setActiveTab(tabs.includes(requestedTab ?? "") ? requestedTab ?? "situations" : "situations");
    }
    // Reset exercise state when lesson changes
    setFibAnswers({});
    setFibChecked(false);
    setFibScore(null);
    setListeningRevealed(false);
    setListeningAnswers({});
    setListeningSubmitted(false);
    setListeningScore(null);
    setIllustrationFailed(false);
  }, [lesson, pillar, hasAccess, allLessons, requestedTab]);

  useEffect(() => () => stopChineseDialog(), []);

  useEffect(() => {
    const sync = () => lesson && setIsCompleted(readChineseProgress(allLessons).includes(lesson.id));
    window.addEventListener("storage", sync);
    window.addEventListener(CHINESE_CURRICULUM_PROGRESS_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CHINESE_CURRICULUM_PROGRESS_EVENT, sync);
    };
  }, [allLessons, lesson]);

  // Load saved exercise scores for this lesson from localStorage
  useEffect(() => {
    if (!lesson) return;
    try {
      const saved = JSON.parse(localStorage.getItem(`conv-cn-ex-${lesson.id}`) || "null");
      if (saved?.fib) setFibScore(saved.fib);
      if (saved?.listening) setListeningScore(saved.listening);
    } catch { /* ignore */ }
  }, [lesson]);

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
  const currentIndex = allLessons.findIndex((candidate) => candidate.id === lesson.id);
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const availableTabs = ["situations", "vocabulary", "structures", ...(lesson.fillInBlankExercises?.length ? ["exercises"] : []), "listening", "roleplay"];
  const activeStep = Math.max(1, availableTabs.indexOf(activeTab) + 1);
  const lessonIllustration = getChineseLessonIllustration(lesson);

  const handleComplete = () => {
    markLessonComplete(lesson.id);
    setIsCompleted(true);
    // Use a neutral 7/10 completion marker — actual exercise scores are logged
    // separately via handleCheckFib + handleSubmitListening below.
    logStudentActivity({
      activityType: "conv_chinese",
      activityId: lesson.id,
      score: 7,
      maxScore: 10,
      metadata: { pillar: pillar.id, lessonTitle: lesson.title, completion: true },
    });
  };

  // Check fill-in-blank exercises: compute %, save to localStorage, log activity
  const handleCheckFib = () => {
    if (!lesson?.fillInBlankExercises) return;
    const total = lesson.fillInBlankExercises.length;
    const correct = lesson.fillInBlankExercises.reduce((acc, ex, idx) => {
      const userAns = (fibAnswers[idx] || "").trim();
      return acc + (userAns === ex.answer ? 1 : 0);
    }, 0);
    const percent = Math.round((correct / total) * 100);
    const result = { correct, total, percent };
    setFibChecked(true);
    setFibScore(result);
    // Save to localStorage
    try {
      const prev = JSON.parse(localStorage.getItem(`conv-cn-ex-${lesson.id}`) || "{}");
      localStorage.setItem(`conv-cn-ex-${lesson.id}`, JSON.stringify({ ...prev, fib: result, updatedAt: Date.now() }));
    } catch { /* ignore */ }
    // Log activity for dashboard
    logStudentActivity({
      activityType: "conv_chinese_exercise",
      activityId: `${lesson.id}-fib`,
      score: correct,
      maxScore: total,
      metadata: { pillar: pillar.id, lessonTitle: lesson.title, exerciseType: "fill_in_blank", percent },
    });
  };

  // Submit listening: compute %, save, log
  const handleSubmitListening = () => {
    if (!lesson) return;
    const qs = lesson.listeningChallenge.questions;
    const total = qs.length;
    const correct = qs.reduce((acc, q, qi) => acc + (listeningAnswers[qi] === q.answer ? 1 : 0), 0);
    const percent = Math.round((correct / total) * 100);
    const result = { correct, total, percent };
    setListeningSubmitted(true);
    setListeningScore(result);
    try {
      const prev = JSON.parse(localStorage.getItem(`conv-cn-ex-${lesson.id}`) || "{}");
      localStorage.setItem(`conv-cn-ex-${lesson.id}`, JSON.stringify({ ...prev, listening: result, updatedAt: Date.now() }));
    } catch { /* ignore */ }
    logStudentActivity({
      activityType: "conv_chinese_exercise",
      activityId: `${lesson.id}-listening`,
      score: correct,
      maxScore: total,
      metadata: { pillar: pillar.id, lessonTitle: lesson.title, exerciseType: "listening", percent },
    });
  };

  return (
    <div className="chinese-learning-path min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-6 lg:py-10">
        {/* Breadcrumb */}
        <Link to="/chinese/conversational/curriculum" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4" />
          Interactive 中文 Curriculum
        </Link>

        <div className="sticky top-0 z-20 mb-5 border-b border-border bg-background/95 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button asChild variant="outline"><Link to="/chinese/conversational/curriculum"><ArrowLeft className="mr-2 h-4 w-4" />{t("Về lộ trình", "Back to path")}</Link></Button>
            <div className="min-w-[190px] flex-1 sm:max-w-sm"><div className="mb-1 flex justify-between text-sm font-bold"><span>{t("Bước", "Step")} {activeStep}/{availableTabs.length}</span><span>{Math.round((activeStep / availableTabs.length) * 100)}%</span></div><Progress value={(activeStep / availableTabs.length) * 100} className="h-2" /></div>
          </div>
        </div>

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 overflow-hidden rounded-lg border border-border border-l-4 border-l-primary bg-card shadow-md">
          <div className="border-b border-border bg-primary/5 px-5 py-3 sm:px-7"><p className="text-sm font-extrabold text-primary">{pillar.title} · {pillar.titleZh} / {t("Bài", "Lesson")} {currentIndex + 1}</p></div>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="order-2 p-5 sm:p-7 lg:order-1">
              <div className="flex flex-wrap items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl font-extrabold sm:text-3xl">{lesson.title} <span className="block text-xl text-muted-foreground sm:inline">({lesson.titleZh})</span></h1>
                  <p className="mt-2 font-medium leading-7 text-muted-foreground">{lesson.description}</p>
                </div>
                <Badge variant="outline">HSK {lesson.hskLevel}</Badge>
                {isCompleted && (
                  <Badge variant="secondary">
                    <Award className="mr-1 h-3 w-3" /> {lesson.badge}
                  </Badge>
                )}
              </div>
              <div className="mt-5 grid gap-4 border border-primary/20 bg-primary/5 p-4 sm:grid-cols-[1fr_auto] sm:items-center"><div className="flex gap-3"><Target className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p className="font-bold leading-7">{t("Luyện giao tiếp thực tế qua tình huống, từ vựng, cấu trúc, nghe và nhập vai.", "Build real communication through situations, vocabulary, structures, listening and roleplay.")}</p></div><span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground/75"><Clock3 className="h-4 w-4 text-primary" />{estimateChineseLessonMinutes(lesson)} min</span></div>
            </div>
            <div className="order-1 aspect-[16/7] overflow-hidden bg-muted lg:order-2 lg:aspect-auto lg:min-h-full">
              {illustrationFailed ? (
                <div className="grid h-full min-h-40 w-full place-items-center bg-primary/5 text-primary" role="img" aria-label={t(`Minh họa bài ${lesson.titleVi}`, `Illustration for ${lesson.title}`)}>
                  <LIcon className="h-14 w-14" />
                </div>
              ) : (
                <img
                  src={lessonIllustration.src}
                  alt={t(lessonIllustration.altVi, lessonIllustration.altEn)}
                  width={1024}
                  height={640}
                  loading="eager"
                  decoding="async"
                  onError={() => setIllustrationFailed(true)}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </motion.header>

        {/* Content tabs */}
        <Tabs value={activeTab} onValueChange={(value) => { stopChineseDialog(); setActiveTab(value); }}>
          <TabsList className="mb-6 flex h-auto w-full justify-start gap-1 overflow-x-auto p-1.5">
            <TabsTrigger value="situations" className="min-h-11 shrink-0 gap-2 px-4"><span>1</span>Situations</TabsTrigger>
            <TabsTrigger value="vocabulary" className="min-h-11 shrink-0 gap-2 px-4"><span>2</span>Vocabulary</TabsTrigger>
            <TabsTrigger value="structures" className="min-h-11 shrink-0 gap-2 px-4"><span>3</span>Structures</TabsTrigger>
            {lesson.fillInBlankExercises && lesson.fillInBlankExercises.length > 0 && (
              <TabsTrigger value="exercises" className="min-h-11 shrink-0 gap-2 px-4"><span>4</span>Exercises</TabsTrigger>
            )}
            <TabsTrigger value="listening" className="min-h-11 shrink-0 gap-2 px-4"><span>{lesson.fillInBlankExercises?.length ? 5 : 4}</span>Listening</TabsTrigger>
            <TabsTrigger value="roleplay" className="min-h-11 shrink-0 gap-2 px-4"><span>{lesson.fillInBlankExercises?.length ? 6 : 5}</span>Roleplay</TabsTrigger>
          </TabsList>

          {/* SITUATIONS TAB - English-only */}
          <TabsContent value="situations">
            <div className="space-y-6">
              {lesson.keySituations.map((situation, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        {situation.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{situation.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Cultural note */}
                      {situation.culturalNote && (
                        <div className="rounded-md border border-accent/30 bg-accent/10 p-3">
                          <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-accent-foreground">
                            <Globe className="h-3 w-3" /> Cultural Note
                          </p>
                          <p className="text-sm text-foreground/80">{situation.culturalNote}</p>
                        </div>
                      )}

                      {/* Sample dialogue - chat bubble style */}
                      <div className="space-y-4">
                        {situation.sampleDialogue.map((line, i) => {
                          const speakerIndex = situation.sampleDialogue.findIndex((entry) => entry.speaker === line.speaker);
                          // Keep each named speaker on one side throughout the conversation.
                          const isRight = speakerIndex % 2 === 1;
                          const palette = [
                            { bubble: "border-primary/20 bg-primary/10 text-foreground", ring: "border-primary/30 bg-primary/10" },
                            { bubble: "border-border bg-muted text-foreground", ring: "border-secondary/40 bg-secondary/20" },
                          ];
                          const { bubble: bubbleColor, ring: avatarRing } = palette[isRight ? 1 : 0];
                          const avatarSrc = dialogueAvatarFor(`${lesson.id}::${line.speaker}`, !isRight);
                          // Prefer English translation; if absent, keep dialogue without translation rather than showing Vietnamese
                          const translationEn = line.translationEn;

                          return (
                            <div key={i} className={`flex gap-3 ${isRight ? "flex-row-reverse" : ""}`}>
                              {/* Stable chibi avatar for each speaker */}
                              <div className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 shadow-sm sm:h-14 sm:w-14 ${avatarRing}`}>
                                <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-primary" aria-hidden="true">
                                  {line.speaker.charAt(0)}
                                </span>
                                <img
                                  src={avatarSrc}
                                  alt={`${line.speaker} dialogue character`}
                                  width={56}
                                  height={56}
                                  loading="lazy"
                                  decoding="async"
                                  className="relative z-10 h-full w-full scale-125 object-cover"
                                  onError={(event) => {
                                    event.currentTarget.style.display = "none";
                                  }}
                                />
                              </div>
                              {/* Bubble */}
                              <div className={`max-w-[82%] rounded-lg border px-4 py-3 shadow-sm ${bubbleColor}`}>
                                <p className="text-xs font-bold opacity-80 mb-1">{line.speaker}</p>
                                <p className="text-lg font-bold leading-relaxed">{line.line}</p>
                                <p className="text-sm opacity-80 mt-1 italic">{line.pinyin}</p>
                                {translationEn && (
                                  <p className="mt-2 border-t border-border/60 pt-2 text-sm font-medium text-muted-foreground">🇬🇧 {translationEn}</p>
                                )}
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => speakChinese(line.line)}
                                  className="mt-2 h-8 w-8"
                                  aria-label="Listen"
                                >
                                  <Volume2 className="h-4 w-4" />
                                </Button>
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
                          <Button type="button" size="icon" variant="outline" onClick={() => speakChinese(v.hanzi)} aria-label={`Listen to ${v.hanzi}`}>
                            <Volume2 className="h-6 w-6" />
                          </Button>
                          <div>
                            <h4 className="text-2xl font-bold text-primary sm:text-3xl">{v.hanzi}</h4>
                            <p className="text-base text-primary font-medium">{v.pinyin}</p>
                            <p className="text-sm text-muted-foreground">{v.meaningEn}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs capitalize shrink-0">{v.type}</Badge>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg mt-3">
                        <p className="text-base sm:text-lg font-semibold">{v.example}</p>
                        <p className="text-sm text-primary/80 italic mt-1">{v.examplePinyin}</p>
                        {v.exampleEn && <p className="text-sm text-muted-foreground mt-1">→ {v.exampleEn}</p>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Auto-generated vocab review quiz */}
            <div className="mt-6">
              <ChineseVocabReviewQuiz vocabulary={lesson.vocabulary} />
            </div>
          </TabsContent>


          {/* STRUCTURES TAB */}
          <TabsContent value="structures">
            <div className="space-y-4">
              {lesson.commonStructures.map((struct, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-primary">{struct.pattern}</CardTitle>
                      <p className="text-sm text-primary/80 italic">{struct.patternPinyin}</p>
                      <p className="text-sm text-muted-foreground">{struct.explanation}</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {struct.examples.map((ex, i) => (
                        <div key={i} className="bg-muted/50 p-3 rounded-lg flex items-start gap-2">
                          <Button type="button" size="icon" variant="ghost" onClick={() => speakChinese(ex.zh)} className="mt-0.5 h-8 w-8 shrink-0" aria-label={`Listen to ${ex.zh}`}>
                            <Volume2 className="h-4 w-4" />
                          </Button>
                          <div>
                            <p className="text-sm font-medium">{ex.zh}</p>
                            <p className="text-xs text-primary/80 italic">{ex.pinyin}</p>
                            {ex.en && <p className="text-xs text-muted-foreground">→ {ex.en}</p>}
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
                    <BookOpen className="h-5 w-5 text-primary" />
                    Fill in the Blank
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fill in the correct Chinese word for each blank.
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  {lesson.fillInBlankExercises.map((ex, idx) => {
                    const userAns = (fibAnswers[idx] || "").trim();
                    const correct = userAns === ex.answer;
                    const trEn = ex.translationEn;
                    return (
                      <div key={idx} className="border rounded-lg p-4 bg-card space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="min-w-[28px] text-sm font-bold text-primary">{idx + 1}.</span>
                          <div className="flex-1">
                            <p className="text-lg font-semibold leading-relaxed">{ex.sentence}</p>
                            <p className="text-sm text-muted-foreground italic mt-1">{ex.pinyin}</p>
                            {trEn && <p className="text-sm text-muted-foreground mt-1">🇬🇧 {trEn}</p>}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pl-9">
                          <Input
                            type="text"
                            value={fibAnswers[idx] || ""}
                            onChange={(e) => setFibAnswers({ ...fibAnswers, [idx]: e.target.value })}
                            placeholder="Type answer..."
                            className="min-w-[140px] flex-1"
                            disabled={fibChecked}
                          />
                          {ex.hint && !fibChecked && (
                            <span className="text-xs text-amber-600 dark:text-amber-400">💡 {ex.hint}</span>
                          )}
                          {fibChecked && (
                            <span className={`text-sm font-semibold ${correct ? "text-primary" : "text-destructive"}`}>
                              {correct ? "✅ Correct" : `❌ Answer: ${ex.answer}`}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {fibChecked && fibScore && (
                    <div className={`rounded-md border-2 p-4 ${fibScore.percent >= 80 ? "border-primary/30 bg-primary/10 text-foreground" : fibScore.percent >= 50 ? "border-accent/40 bg-accent/10 text-foreground" : "border-destructive/30 bg-destructive/10 text-foreground"}`}>
                      <p className="text-base font-bold">
                        {fibScore.percent >= 80 ? "🎉" : fibScore.percent >= 50 ? "👍" : "💪"} Score: {fibScore.correct}/{fibScore.total} ({fibScore.percent}%)
                      </p>
                      <p className="text-xs opacity-80 mt-1">Saved to your Student Dashboard.</p>
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    {!fibChecked ? (
                      <Button onClick={handleCheckFib} disabled={Object.keys(fibAnswers).length === 0}>
                        Check & Score
                      </Button>
                    ) : (
                      <Button onClick={() => { setFibChecked(false); setFibAnswers({}); setFibScore(null); }} variant="outline">
                        Try Again
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
                  <Volume2 className="h-5 w-5 text-primary" />
                  {lesson.listeningChallenge.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <DialogAudioPlayer
                    transcript={lesson.listeningChallenge.transcript}
                    lang="zh"
                    accentClass="bg-primary text-primary-foreground hover:bg-primary/90"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => setListeningRevealed(!listeningRevealed)}>
                      {listeningRevealed ? "👁 Hide Transcript" : "📝 Show Transcript"}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {listeningRevealed && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <p className="text-sm leading-relaxed">{lesson.listeningChallenge.transcript}</p>
                        <p className="text-xs text-primary/70 italic leading-relaxed">{lesson.listeningChallenge.transcriptPinyin}</p>
                        {lesson.listeningChallenge.transcriptEn && (
                          <p className="text-sm text-muted-foreground border-t border-border pt-2">🇬🇧 {lesson.listeningChallenge.transcriptEn}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  {lesson.listeningChallenge.questions.map((q, qi) => (
                    <div key={qi} className="rounded-md border border-border bg-muted/30 p-4">
                      <p className="font-medium text-sm mb-3">{qi + 1}. {q.q}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oi) => {
                          const selected = listeningAnswers[qi] === oi;
                          const isCorrect = oi === q.answer;
                          const showResult = listeningSubmitted;
                          return (
                            <Button
                              type="button"
                              variant="outline"
                              key={oi}
                              onClick={() => !listeningSubmitted && setListeningAnswers(prev => ({ ...prev, [qi]: oi }))}
                              disabled={listeningSubmitted}
                              className={`h-auto min-h-12 justify-start whitespace-normal p-3 text-left text-sm transition-all ${
                                showResult
                                  ? isCorrect
                                    ? "border-primary/40 bg-primary/10 text-foreground"
                                    : selected
                                      ? "border-destructive/40 bg-destructive/10 text-foreground"
                                      : "bg-muted/30 border-border text-muted-foreground"
                                  : selected
                                    ? "border-primary bg-primary/10 text-foreground"
                                    : "border-border bg-card hover:border-primary hover:bg-primary/5"
                              }`}
                            >
                              <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>
                              {opt}
                              {showResult && isCorrect && <CheckCircle className="ml-2 inline h-4 w-4 text-primary" />}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {listeningSubmitted && listeningScore && (
                  <div className={`rounded-md border-2 p-4 ${listeningScore.percent >= 80 ? "border-primary/30 bg-primary/10 text-foreground" : listeningScore.percent >= 50 ? "border-accent/40 bg-accent/10 text-foreground" : "border-destructive/30 bg-destructive/10 text-foreground"}`}>
                    <p className="text-base font-bold">
                      {listeningScore.percent >= 80 ? "🎉" : listeningScore.percent >= 50 ? "👍" : "💪"} Listening Score: {listeningScore.correct}/{listeningScore.total} ({listeningScore.percent}%)
                    </p>
                    <p className="text-xs opacity-80 mt-1">Saved to your Student Dashboard.</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {!listeningSubmitted ? (
                    <Button
                      onClick={handleSubmitListening}
                      disabled={Object.keys(listeningAnswers).length < lesson.listeningChallenge.questions.length}
                    >
                      Submit & Score
                    </Button>
                  ) : (
                    <Button onClick={() => { setListeningSubmitted(false); setListeningAnswers({}); setListeningScore(null); }} variant="outline">
                      Try Again
                    </Button>
                  )}
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
        <div className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
          {previousLesson ? (
            <Button asChild variant="outline" size="lg"><Link to={`/chinese/conversational/learn/${previousLesson.id}`}><ArrowLeft className="mr-2 h-4 w-4" />{t("Bài trước", "Previous")}</Link></Button>
          ) : (
            <Button variant="outline" size="lg" disabled><ArrowLeft className="mr-2 h-4 w-4" />{t("Bài trước", "Previous")}</Button>
          )}
          {!isCompleted ? (
            <Button onClick={handleComplete} size="lg">
              <CheckCircle className="h-5 w-5 mr-2" />
              Mark as Complete
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-3 border border-primary/25 bg-primary/5 p-4 text-primary">
              <Award className="h-5 w-5" />
              <span className="font-medium">Completed! Badge: {lesson.badge}</span>
            </div>
          )}
          {nextLesson && (
            <Button asChild variant="outline" size="lg">
              <Link to={`/chinese/conversational/learn/${nextLesson.id}`}>
                Next: {nextLesson.title}
                <ArrowRight className="h-4 w-4 ml-1" />
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
