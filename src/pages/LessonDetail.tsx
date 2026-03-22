import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, CheckCircle, XCircle, Clock, Trophy, ChevronRight, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { englishResources, chineseResources, type LessonItem, type SeedLesson, type QuizQuestion } from "@/data/lessonData";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

const LessonDetail = () => {
  const { resourceId, lessonId } = useParams();
  const { t } = useLanguage();
  const [selectedLesson, setSelectedLesson] = useState<SeedLesson | null>(null);
  const [resource, setResource] = useState<LessonItem | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiLesson, setAiLesson] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState<number | null>(null);
  const [showChallengeResult, setShowChallengeResult] = useState(false);
  const [challengeTimer, setChallengeTimer] = useState(60);
  const [challengeActive, setChallengeActive] = useState(false);

  const allResources = [...englishResources, ...chineseResources];
  const isChinese = chineseResources.some(r => r.id === resourceId);

  useEffect(() => {
    const res = allResources.find(r => r.id === resourceId);
    if (res) {
      setResource(res);
      if (lessonId) {
        const lesson = res.lessons.find(l => l.id === lessonId);
        if (lesson) setSelectedLesson(lesson);
      } else {
        setSelectedLesson(res.lessons[0]);
      }
    }
  }, [resourceId, lessonId]);

  useEffect(() => {
    if (selectedLesson) {
      const totalQuestions = selectedLesson.content.quiz.length;
      const answered = Object.keys(answers).length;
      setProgress(totalQuestions > 0 ? (answered / totalQuestions) * 100 : 0);
    }
  }, [answers, selectedLesson]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (challengeActive && challengeTimer > 0) {
      interval = setInterval(() => setChallengeTimer(t => t - 1), 1000);
    } else if (challengeTimer === 0) {
      setChallengeActive(false);
      setShowChallengeResult(true);
    }
    return () => clearInterval(interval);
  }, [challengeActive, challengeTimer]);

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => setShowResults(true);

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
    setProgress(0);
  };

  const generateAiLesson = async () => {
    if (!resource) return;
    setAiLoading(true);
    setAiLesson(null);
    try {
      const language = isChinese ? "chinese" : "english";
      const lessonType = resource.id.includes("grammar") ? "grammar" : resource.id.includes("vocab") || resource.id.includes("idiom") || resource.id.includes("chengyu") ? "vocabulary" : "reading";
      const { data, error } = await supabase.functions.invoke("generate-lesson", {
        body: { language, topic: resource.title, lessonType },
      });
      if (error) throw error;
      setAiLesson(data);
    } catch (e) {
      console.error(e);
    }
    setAiLoading(false);
  };

  const startChallenge = () => {
    setChallengeActive(true);
    setChallengeTimer(60);
    setChallengeAnswer(null);
    setShowChallengeResult(false);
  };

  if (!resource || !selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const content = selectedLesson.content;
  const score = showResults ? content.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0) : 0;

  // Build a challenge question from AI or last quiz question
  const challengeQ: QuizQuestion | undefined = aiLesson?.challenge || content.quiz[content.quiz.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to={isChinese ? "/chinese" : "/english"} className="hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                {isChinese ? t("Tiếng Trung", "Chinese") : t("Tiếng Anh", "English")}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{t(resource.title, resource.titleEn)}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar - lesson list */}
              <div className="lg:w-64 shrink-0">
                <div className="glass-card rounded-xl p-4 sticky top-28">
                  <h3 className="font-semibold text-foreground mb-3 text-sm">{t("Danh sách bài học", "Lessons")}</h3>
                  <div className="space-y-1">
                    {resource.lessons.map((l, i) => (
                      <button key={l.id} onClick={() => { setSelectedLesson(l); resetQuiz(); setAiLesson(null); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedLesson.id === l.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                        {i + 1}. {t(l.title, l.titleEn)}
                      </button>
                    ))}
                  </div>
                  <button onClick={generateAiLesson} disabled={aiLoading}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-50">
                    {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {t("Tạo bài học mới với AI", "Generate AI Lesson")}
                  </button>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                {/* Progress bar */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{t("Tiến độ bài học", "Lesson Progress")}</span>
                    <span className="text-sm text-primary font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    {resource.icon} {t(selectedLesson.title, selectedLesson.titleEn)}
                  </h1>

                  {/* Passage */}
                  {content.passage && (
                    <div className="glass-card rounded-xl p-6">
                      <h2 className="font-semibold text-foreground mb-3">📖 {t("Bài đọc", "Reading Passage")}</h2>
                      <div className="prose prose-sm max-w-none text-secondary-foreground whitespace-pre-line leading-relaxed">{content.passage}</div>
                    </div>
                  )}

                  {/* Grammar points */}
                  {content.points && content.points.length > 0 && (
                    <div className="space-y-4">
                      {content.points.map((p, i) => (
                        <div key={i} className="glass-card rounded-xl p-6">
                          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold">{i + 1}</span>
                            {p.rule}
                          </h3>
                          <div className="space-y-2 ml-9">
                            {p.examples.map((ex, j) => (
                              <p key={j} className="text-sm text-secondary-foreground" dangerouslySetInnerHTML={{ __html: ex.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-primary">$1</span>') }} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Vocabulary */}
                  {content.vocabulary && content.vocabulary.length > 0 && (
                    <div className="glass-card rounded-xl p-6">
                      <h2 className="font-semibold text-foreground mb-4">📚 {t("Từ vựng", "Vocabulary")}</h2>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {content.vocabulary.map((v, i) => (
                          <div key={i} className="bg-secondary rounded-lg p-4">
                            <div className="flex items-baseline gap-3 mb-1">
                              <span className={`font-bold text-foreground ${isChinese ? 'text-2xl' : 'text-lg'}`}>{v.word}</span>
                              {v.pinyin && <span className="text-primary text-sm font-medium">{v.pinyin}</span>}
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">{v.meaning}</p>
                            <p className="text-xs text-secondary-foreground" dangerouslySetInnerHTML={{ __html: v.example.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-primary">$1</span>') }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  {content.tips && content.tips.length > 0 && (
                    <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
                      <h2 className="font-semibold text-foreground mb-3">💡 {t("Tips ghi nhớ", "Memory Tips")}</h2>
                      <ul className="space-y-2">
                        {content.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                            <span className="text-primary mt-0.5">•</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Quiz */}
                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-foreground">✏️ {t("Bài tập trắc nghiệm", "Quiz")}</h2>
                      {showResults && (
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-bold ${score === content.quiz.length ? 'text-green-500' : score >= content.quiz.length / 2 ? 'text-yellow-500' : 'text-destructive'}`}>
                            {score}/{content.quiz.length} {t("đúng", "correct")}
                          </span>
                          <button onClick={resetQuiz} className="text-sm text-primary hover:underline">{t("Làm lại", "Retry")}</button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-5">
                      {content.quiz.map((q, qi) => (
                        <div key={qi} className="space-y-2">
                          <p className="text-sm font-medium text-foreground">{qi + 1}. {q.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, oi) => {
                              const selected = answers[qi] === oi;
                              const isCorrect = q.answer === oi;
                              let cls = "px-3 py-2 rounded-lg text-sm text-left transition-all border ";
                              if (showResults) {
                                if (isCorrect) cls += "border-green-500 bg-green-500/10 text-green-700";
                                else if (selected) cls += "border-destructive bg-destructive/10 text-destructive";
                                else cls += "border-border text-muted-foreground";
                              } else {
                                cls += selected ? "border-primary bg-primary/10 text-primary" : "border-border text-secondary-foreground hover:border-primary/50 hover:bg-primary/5";
                              }
                              return (
                                <button key={oi} onClick={() => handleAnswer(qi, oi)} className={cls}>
                                  {showResults && isCorrect && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                                  {showResults && selected && !isCorrect && <XCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {showResults && (
                            <p className="text-xs text-muted-foreground ml-1 mt-1">💬 {q.explanation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    {!showResults && Object.keys(answers).length > 0 && (
                      <button onClick={handleSubmit} className="mt-6 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all">
                        {t("Nộp bài", "Submit")}
                      </button>
                    )}
                  </div>

                  {/* 1-Minute Challenge */}
                  <div className="glass-card rounded-xl p-6 border-t-4 border-yellow-500">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        {t("Thử thách 1 phút", "1-Minute Challenge")}
                      </h2>
                      {challengeActive && (
                        <span className="flex items-center gap-1 text-sm font-mono font-bold text-yellow-600">
                          <Clock className="w-4 h-4" /> {challengeTimer}s
                        </span>
                      )}
                    </div>
                    {!challengeActive && !showChallengeResult ? (
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground mb-4">{t("Trả lời nhanh trong 60 giây để kiểm tra kiến thức!", "Answer quickly in 60 seconds to test your knowledge!")}</p>
                        <button onClick={startChallenge} className="px-6 py-2.5 rounded-lg bg-yellow-500 text-white font-semibold text-sm hover:bg-yellow-600 transition-colors">
                          {t("Bắt đầu thử thách!", "Start Challenge!")}
                        </button>
                      </div>
                    ) : challengeQ ? (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">{challengeQ.question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {challengeQ.options.map((opt, oi) => {
                            let cls = "px-3 py-2 rounded-lg text-sm text-left transition-all border ";
                            if (showChallengeResult) {
                              if (challengeQ.answer === oi) cls += "border-green-500 bg-green-500/10 text-green-700";
                              else if (challengeAnswer === oi) cls += "border-destructive bg-destructive/10 text-destructive";
                              else cls += "border-border text-muted-foreground";
                            } else {
                              cls += challengeAnswer === oi ? "border-primary bg-primary/10 text-primary" : "border-border text-secondary-foreground hover:border-primary/50";
                            }
                            return (
                              <button key={oi} disabled={showChallengeResult} onClick={() => { setChallengeAnswer(oi); setChallengeActive(false); setShowChallengeResult(true); }} className={cls}>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {showChallengeResult && (
                          <div className="mt-3">
                            <p className={`text-sm font-semibold ${challengeAnswer === challengeQ.answer ? 'text-green-600' : 'text-destructive'}`}>
                              {challengeAnswer === challengeQ.answer ? '🎉 ' + t('Chính xác!', 'Correct!') : '❌ ' + t('Chưa đúng!', 'Incorrect!')}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">💬 {challengeQ.explanation}</p>
                            <button onClick={startChallenge} className="mt-3 text-sm text-primary hover:underline">{t("Thử lại", "Try again")}</button>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>

                  {/* AI Generated Lesson */}
                  {aiLesson && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 border-l-4 border-purple-500">
                      <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        {t("Bài học AI", "AI Lesson")}: {aiLesson.title}
                      </h2>
                      {aiLesson.passage && <p className="text-sm text-secondary-foreground whitespace-pre-line mb-4">{aiLesson.passage}</p>}
                      {aiLesson.points?.map((p: any, i: number) => (
                        <div key={i} className="mb-4">
                          <h4 className="font-medium text-foreground text-sm mb-2">{p.rule}</h4>
                          {p.examples?.map((ex: string, j: number) => (
                            <p key={j} className="text-xs text-secondary-foreground ml-4" dangerouslySetInnerHTML={{ __html: ex.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-primary">$1</span>') }} />
                          ))}
                        </div>
                      ))}
                      {aiLesson.vocabulary?.map((v: any, i: number) => (
                        <div key={i} className="inline-block bg-secondary rounded-lg p-3 mr-2 mb-2">
                          <span className={`font-bold ${isChinese ? 'text-xl' : 'text-base'}`}>{v.word}</span>
                          {v.pinyin && <span className="text-primary text-xs ml-2">{v.pinyin}</span>}
                          <span className="text-muted-foreground text-xs ml-2">{v.meaning}</span>
                        </div>
                      ))}
                      {aiLesson.tips?.map((tip: string, i: number) => (
                        <p key={i} className="text-xs text-secondary-foreground mt-1">💡 {tip}</p>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LessonDetail;
