import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ChevronRight, Sparkles, CheckCircle, XCircle, Clock, Trophy,
  Loader2, Play, ExternalLink, Lightbulb, Code2, BookOpen, ChevronDown, Eye, EyeOff
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { programmingModules, type ProgrammingModule, type ProgrammingLesson as PLType } from "@/data/programmingLessonData";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

const ProgrammingLessonPage = () => {
  const { moduleId, lessonId } = useParams();
  const { t } = useLanguage();
  const [mod, setMod] = useState<ProgrammingModule | null>(null);
  const [lesson, setLesson] = useState<PLType | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiChallenge, setAiChallenge] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [challengeTimer, setChallengeTimer] = useState(60);
  const [challengeActive, setChallengeActive] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState<number | null>(null);
  const [showChallengeResult, setShowChallengeResult] = useState(false);

  useEffect(() => {
    const m = programmingModules.find(m => m.id === moduleId);
    if (m) {
      setMod(m);
      const l = lessonId ? m.lessons.find(l => l.id === lessonId) : m.lessons[0];
      if (l) setLesson(l);
    }
  }, [moduleId, lessonId]);

  useEffect(() => {
    if (lesson) {
      const total = lesson.quiz.length;
      const answered = Object.keys(answers).length;
      setProgress(total > 0 ? (answered / total) * 100 : 0);
    }
  }, [answers, lesson]);

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

  const handleAnswer = (qi: number, oi: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qi]: oi }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
    setProgress(0);
  };

  const switchLesson = (l: PLType) => {
    setLesson(l);
    resetQuiz();
    setAiChallenge(null);
    setShowSolution(false);
    setShowHints(false);
  };

  const generateChallenge = async () => {
    if (!lesson || !mod) return;
    setAiLoading(true);
    setAiChallenge(null);
    setShowSolution(false);
    setShowHints(false);
    try {
      const { data, error } = await supabase.functions.invoke("generate-code-challenge", {
        body: {
          topic: `${mod.titleEn} - ${lesson.titleEn}`,
          language: "vi",
          codeLanguage: lesson.codeLanguage,
        },
      });
      if (error) throw error;
      setAiChallenge(data);
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

  const openInTrinket = (code: string) => {
    const encoded = encodeURIComponent(code);
    window.open(`https://trinket.io/python?outputOnly=true&runOption=run&code=${encoded}`, "_blank");
  };

  if (!mod || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const score = showResults ? lesson.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0) : 0;
  const challengeQ = lesson.quiz[lesson.quiz.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
              <Link to="/programming" className="hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                {t("Lập trình", "Programming")}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{t(mod.title, mod.titleEn)}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar - Roadmap */}
              <div className="lg:w-72 shrink-0">
                <div className="glass-card rounded-xl p-4 sticky top-28">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{mod.icon}</span>
                    <h3 className="font-semibold text-foreground text-sm">{t("Lộ trình học", "Learning Roadmap")}</h3>
                  </div>
                  <div className="space-y-1">
                    {mod.lessons.map((l, i) => {
                      const isActive = lesson.id === l.id;
                      const stepNum = i + 1;
                      return (
                        <button key={l.id} onClick={() => switchLesson(l)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                            {stepNum}
                          </span>
                          <span className="truncate">{t(l.title, l.titleEn)}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* AI Challenge button */}
                  <button onClick={generateChallenge} disabled={aiLoading}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-50 active:scale-[0.97]">
                    {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {t("Thử thách Code với AI", "AI Code Challenge")}
                  </button>

                  {/* Run code link */}
                  <a href="https://trinket.io/python" target="_blank" rel="noopener noreferrer"
                    className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-green-500/30 text-green-600 text-sm font-medium hover:bg-green-500/5 transition-all">
                    <Play className="w-4 h-4" />
                    {t("Chạy thử Code", "Run Code Online")}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                {/* Progress */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{t("Tiến độ bài học", "Lesson Progress")}</span>
                    <span className="text-sm text-primary font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6" key={lesson.id}>
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    {mod.icon} {t(lesson.title, lesson.titleEn)}
                  </h1>

                  {/* Theory */}
                  <div className="glass-card rounded-xl p-6">
                    <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      {t("Lý thuyết", "Theory")}
                    </h2>
                    <div className="prose prose-sm max-w-none text-secondary-foreground whitespace-pre-line leading-relaxed">
                      {t(lesson.theory, lesson.theoryEn).split('\n').map((line, i) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <p key={i} className="font-bold text-foreground mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
                        }
                        if (line.startsWith('- ')) {
                          return <p key={i} className="ml-4 flex items-start gap-2"><span className="text-primary mt-1 shrink-0">•</span>{line.substring(2)}</p>;
                        }
                        return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-foreground">$1</span>') }} />;
                      })}
                    </div>
                  </div>

                  {/* Code Example */}
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-900">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-mono text-green-400">{lesson.codeLanguage}</span>
                      </div>
                      <button onClick={() => openInTrinket(lesson.code)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-green-600 text-white text-xs font-medium hover:bg-green-500 transition-colors active:scale-[0.97]">
                        <Play className="w-3 h-3" />
                        {t("Chạy thử", "Run")}
                      </button>
                    </div>
                    <pre className="p-4 bg-slate-950 overflow-x-auto">
                      <code className="text-sm font-mono text-slate-300 leading-relaxed whitespace-pre">{lesson.code}</code>
                    </pre>
                  </div>

                  {/* Exercise */}
                  <div className="glass-card rounded-xl p-6 border-l-4 border-amber-500">
                    <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      {t("Bài tập thực hành", "Practice Exercise")}
                    </h2>
                    <p className="text-sm text-secondary-foreground mb-4">{t(lesson.exercise, lesson.exerciseEn)}</p>
                    <a href="https://trinket.io/python" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-400 transition-colors active:scale-[0.97]">
                      <Play className="w-4 h-4" />
                      {t("Làm bài trên Trinket", "Code on Trinket")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Quiz */}
                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-foreground">✏️ {t("Kiểm tra kiến thức", "Knowledge Check")}</h2>
                      {showResults && (
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-bold ${score === lesson.quiz.length ? 'text-green-500' : score >= lesson.quiz.length / 2 ? 'text-yellow-500' : 'text-destructive'}`}>
                            {score}/{lesson.quiz.length} {t("đúng", "correct")}
                          </span>
                          <button onClick={resetQuiz} className="text-sm text-primary hover:underline">{t("Làm lại", "Retry")}</button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-5">
                      {lesson.quiz.map((q, qi) => (
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
                          {showResults && <p className="text-xs text-muted-foreground ml-1 mt-1">💬 {q.explanation}</p>}
                        </div>
                      ))}
                    </div>
                    {!showResults && Object.keys(answers).length > 0 && (
                      <button onClick={() => setShowResults(true)} className="mt-6 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all active:scale-[0.97]">
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
                        <p className="text-sm text-muted-foreground mb-4">{t("Trả lời nhanh trong 60 giây!", "Answer quickly in 60 seconds!")}</p>
                        <button onClick={startChallenge} className="px-6 py-2.5 rounded-lg bg-yellow-500 text-white font-semibold text-sm hover:bg-yellow-600 transition-colors active:scale-[0.97]">
                          {t("Bắt đầu!", "Start!")}
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

                  {/* AI Code Challenge */}
                  <AnimatePresence>
                    {aiChallenge && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card rounded-xl p-6 border-l-4 border-purple-500">
                        <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-purple-500" />
                          {t("Thử thách AI", "AI Challenge")}: {aiChallenge.title}
                        </h2>
                        {aiChallenge.difficulty && (
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-3 ${
                            aiChallenge.difficulty === 'easy' ? 'bg-green-500/10 text-green-600' :
                            aiChallenge.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-600' :
                            'bg-red-500/10 text-red-600'
                          }`}>{aiChallenge.difficulty}</span>
                        )}
                        <p className="text-sm text-secondary-foreground whitespace-pre-line mb-4">{aiChallenge.description}</p>

                        {aiChallenge.sampleInput && (
                          <div className="bg-secondary rounded-lg p-3 mb-3">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Input:</p>
                            <code className="text-sm font-mono text-foreground">{aiChallenge.sampleInput}</code>
                            <p className="text-xs font-semibold text-muted-foreground mt-2 mb-1">Output:</p>
                            <code className="text-sm font-mono text-foreground">{aiChallenge.sampleOutput}</code>
                          </div>
                        )}

                        {aiChallenge.starterCode && (
                          <div className="rounded-lg overflow-hidden mb-4">
                            <div className="px-3 py-2 bg-slate-900 flex items-center justify-between">
                              <span className="text-xs font-mono text-green-400">Starter Code</span>
                              <button onClick={() => openInTrinket(aiChallenge.starterCode)}
                                className="flex items-center gap-1 px-2 py-1 rounded bg-green-600 text-white text-xs hover:bg-green-500">
                                <Play className="w-3 h-3" /> {t("Chạy", "Run")}
                              </button>
                            </div>
                            <pre className="p-3 bg-slate-950 overflow-x-auto">
                              <code className="text-xs font-mono text-slate-300">{aiChallenge.starterCode}</code>
                            </pre>
                          </div>
                        )}

                        {/* Hints */}
                        {aiChallenge.hints && (
                          <div className="mb-4">
                            <button onClick={() => setShowHints(!showHints)}
                              className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-500 font-medium">
                              <Lightbulb className="w-4 h-4" />
                              {showHints ? t("Ẩn gợi ý", "Hide hints") : t("Xem gợi ý", "Show hints")}
                              <ChevronDown className={`w-3 h-3 transition-transform ${showHints ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                              {showHints && (
                                <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 space-y-1 ml-6 overflow-hidden">
                                  {aiChallenge.hints.map((h: string, i: number) => (
                                    <li key={i} className="text-xs text-secondary-foreground flex items-start gap-2">
                                      <span className="text-amber-500">💡</span> {h}
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* Solution */}
                        {aiChallenge.solution && (
                          <div>
                            <button onClick={() => setShowSolution(!showSolution)}
                              className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-500 font-medium">
                              {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              {showSolution ? t("Ẩn lời giải", "Hide solution") : t("Xem lời giải", "Show solution")}
                            </button>
                            <AnimatePresence>
                              {showSolution && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden">
                                  <pre className="p-3 bg-slate-950 rounded-lg overflow-x-auto mb-3">
                                    <code className="text-xs font-mono text-slate-300">{aiChallenge.solution}</code>
                                  </pre>
                                  {aiChallenge.explanation && (
                                    <p className="text-xs text-muted-foreground whitespace-pre-line">📖 {aiChallenge.explanation}</p>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
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

export default ProgrammingLessonPage;
