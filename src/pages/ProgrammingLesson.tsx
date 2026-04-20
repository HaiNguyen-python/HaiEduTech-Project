import LessonFeedback from "@/components/LessonFeedback";
import { boldAndSanitize } from "@/lib/utils";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ChevronRight, Sparkles, CheckCircle, XCircle, Clock, Trophy,
  Loader2, Play, Lightbulb, Code2, BookOpen, ChevronDown, Eye, EyeOff,
  PanelRightClose, PanelRightOpen, Wand2, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { allProgrammingModules, type ProgrammingModule, type ProgrammingLesson as PLType } from "@/data/programmingLessonData";
import { updateSkillScore } from "@/components/SkillRadarChart";
import SkillRadarChart from "@/components/SkillRadarChart";
import LearningRecommendation from "@/components/LearningRecommendation";
import { expandedModules as curriculumExpandedModules } from "@/data/curriculum";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import SqlEditor from "@/components/SqlEditor";
import PythonIDEPanel from "@/components/PythonIDEPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import CodeBlock from "@/components/CodeBlock";
import TheorySections from "@/components/TheorySections";

// Map module IDs to their pillar/course for grouping
const PILLAR_COURSES: Record<string, string[]> = {
  "python": ["kids"],
  "ai-foundation": ["data-ai"],
  "sql": ["sql"],
  "data-eng": ["data-eng"],
  "ml": ["ml"],
  "cloud": ["cloud"],
};

function getPillarForModule(moduleId: string): string | null {
  // Check direct ID match first
  const directMap: Record<string, string> = {
    "prog-ai-foundation": "ai-foundation",
    "prog-sql": "sql",
    "prog-data-pipeline": "data-eng",
    "prog-ml": "ml",
    "cloud-fundamentals": "cloud",
    "cloud-compute-storage": "cloud",
    "cloud-network-security": "cloud",
    "cloud-serverless-devops": "cloud",
    "cloud-architecture-cost": "cloud",
    "cloud-ops-resilience": "cloud",
    "cloud-strategy-cost": "cloud",
  };
  if (directMap[moduleId]) return directMap[moduleId];

  const mod = allProgrammingModules.find(m => m.id === moduleId);
  if (!mod) return null;
  for (const [pillar, courses] of Object.entries(PILLAR_COURSES)) {
    if (courses.includes(mod.course)) return pillar;
  }
  return null;
}

function getPillarModules(pillar: string): ProgrammingModule[] {
  const courses = PILLAR_COURSES[pillar] || [];
  // Also include direct ID matches
  const directIds: Record<string, string[]> = {
    "ai-foundation": ["prog-ai-foundation"],
    "sql": ["prog-sql"],
    "data-eng": ["prog-data-pipeline"],
    "ml": ["prog-ml"],
    "cloud": [
      "cloud-fundamentals",
      "cloud-compute-storage",
      "cloud-network-security",
      "cloud-serverless-devops",
      "cloud-architecture-cost",
      "cloud-ops-resilience",
      "cloud-strategy-cost",
    ],
  };
  const ids = directIds[pillar] || [];
  return allProgrammingModules.filter(m => courses.includes(m.course) || ids.includes(m.id));
}

const ProgrammingLessonPage = () => {
  const { moduleId, lessonId } = useParams();
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
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
  const [showIDE, setShowIDE] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  // AI-enhanced theory state
  const [enhancedMd, setEnhancedMd] = useState<string | null>(null);
  const [enhanceLoading, setEnhanceLoading] = useState(false);
  const [useEnhanced, setUseEnhanced] = useState(true);

  const isSQL = mod?.id === "prog-sql" || mod?.course === "sql";

  // Load cached AI theory whenever the lesson changes
  useEffect(() => {
    if (!mod || !lesson) return;
    setEnhancedMd(null);
    setUseEnhanced(true);
    supabase
      .from("programming_theory_cache")
      .select("enhanced_markdown")
      .eq("module_id", mod.id)
      .eq("lesson_id", lesson.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.enhanced_markdown) setEnhancedMd(data.enhanced_markdown);
      });
  }, [mod, lesson]);

  const handleEnhanceTheory = async (forceRefresh = false) => {
    if (!mod || !lesson) return;
    setEnhanceLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("enhance-programming-theory", {
        body: {
          module_id: mod.id,
          lesson_id: lesson.id,
          lesson_title: lesson.titleEn || lesson.title,
          module_title: mod.titleEn || mod.title,
          base_theory: lesson.theoryEn || lesson.theory || "",
          code_language: lesson.codeLanguage,
          force_refresh: forceRefresh,
        },
      });
      if (error) throw error;
      if (data?.markdown) {
        setEnhancedMd(data.markdown);
        setUseEnhanced(true);
        toast.success(data.cached ? "Loaded enhanced theory from cache" : "AI Deep-Dive ready!");
      }
    } catch (e) {
      toast.error("Could not enhance theory. Please try again later.");
      console.error(e);
    }
    setEnhanceLoading(false);
  };

  // Get all sibling modules for same pillar
  const pillar = moduleId ? getPillarForModule(moduleId) : null;
  const pillarModules = pillar ? getPillarModules(pillar) : [];

  useEffect(() => {
    const m = allProgrammingModules.find(m => m.id === moduleId);
    if (m) {
      setMod(m);
      const l = lessonId ? m.lessons.find(l => l.id === lessonId) : m.lessons[0];
      if (l) setLesson(l);
      // Auto-expand the current module
      setExpandedModules(prev => new Set(prev).add(m.id));
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


  if (!mod || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 flex justify-center items-center">
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
      <div className="pt-6 pb-16">
        <div className={`mx-auto px-4 sm:px-6 ${showIDE && !isMobile ? "max-w-[1600px]" : "container"}`}>
          <div className={showIDE && !isMobile ? "" : "max-w-5xl mx-auto"}>
            {/* Breadcrumb + IDE Toggle */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/programming" className="hover:text-foreground flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Programming
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">{t(mod.title, mod.titleEn)}</span>
              </div>
              {!isMobile && (
              <button
                  onClick={() => setShowIDE(!showIDE)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] shadow-sm ${
                    showIDE
                      ? "border border-border bg-secondary text-foreground hover:bg-muted"
                      : "bg-primary text-primary-foreground hover:brightness-110 shadow-primary/20"
                  }`}
                >
                  {showIDE ? <PanelRightClose className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                  {showIDE ? "Hide IDE" : "Open Interactive IDE"}
                </button>
              )}
            </div>

            {/* Main 2-column layout: Content + IDE (60% theory / 40% IDE for readability) */}
            <div className={`flex gap-6 ${showIDE && !isMobile ? "flex-row" : "flex-col"}`}>
              {/* Left side: Sidebar + Lesson content */}
              <div className={`${showIDE && !isMobile ? "w-3/5 xl:w-[62%]" : "w-full"} min-w-0`}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar - Roadmap with ALL pillar modules */}
              <div className="lg:w-72 shrink-0">
                <div className="glass-card rounded-xl p-4 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{mod.icon}</span>
                    <h3 className="font-semibold text-foreground text-sm">Learning Roadmap</h3>
                  </div>
                  <div className="space-y-2">
                    {pillarModules.map((pm) => {
                      const isExpanded = expandedModules.has(pm.id);
                      const isCurrentModule = pm.id === mod.id;
                      return (
                        <div key={pm.id}>
                          <button
                            onClick={() => {
                              setExpandedModules(prev => {
                                const next = new Set(prev);
                                if (next.has(pm.id)) next.delete(pm.id);
                                else next.add(pm.id);
                                return next;
                              });
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                              isCurrentModule
                                ? "bg-primary/10 text-primary"
                                : "text-foreground hover:bg-secondary"
                            }`}
                          >
                            <span className="text-base shrink-0">{pm.icon}</span>
                            <span className="truncate flex-1">{t(pm.title, pm.titleEn)}</span>
                            <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                          {isExpanded && (
                            <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-border pl-2">
                              {pm.lessons.map((l, i) => {
                                const isActive = lesson.id === l.id && mod.id === pm.id;
                                return (
                                  <button
                                    key={l.id}
                                    onClick={() => {
                                      if (pm.id !== mod.id) {
                                        // Navigate to different module
                                        window.history.pushState({}, '', `/programming/${pm.id}`);
                                        setMod(pm);
                                      }
                                      switchLesson(l);
                                    }}
                                    className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-all flex items-center gap-2 ${
                                      isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    }`}
                                  >
                                    {pm.lessons.length > 1 && (
                                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                      }`}>
                                        {i + 1}
                                      </span>
                                    )}
                                    <span className="truncate">{t(l.title, l.titleEn)}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* AI Challenge button */}
                  <button onClick={generateChallenge} disabled={aiLoading}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-50 active:scale-[0.97]">
                    {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    AI Code Challenge
                  </button>

                  {/* Run code link */}
                  <a href="https://trinket.io/python" target="_blank" rel="noopener noreferrer"
                    className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-green-500/30 text-green-600 text-sm font-medium hover:bg-green-500/5 transition-all">
                    <Play className="w-4 h-4" />
                    Run Code Online
                  </a>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                {/* Progress */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Lesson Progress</span>
                    <span className="text-sm text-primary font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6" key={lesson.id}>
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    {mod.icon} {t(lesson.title, lesson.titleEn)}
                  </h1>

                  {/* Theory */}
                  <div className="glass-card rounded-xl p-6 sm:p-7">
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-5 pb-3 border-b border-border">
                      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Theory
                        {enhancedMd && useEnhanced && (
                          <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-violet-500/15 text-violet-600 dark:text-violet-300 border border-violet-500/30">
                            <Sparkles className="w-3 h-3" />
                            AI Deep-Dive
                          </span>
                        )}
                      </h2>
                      <div className="flex items-center gap-2">
                        {enhancedMd ? (
                          <>
                            <button
                              onClick={() => setUseEnhanced((v) => !v)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-secondary text-foreground hover:bg-muted transition-all active:scale-[0.97]"
                              title={useEnhanced ? "Show original theory" : "Show AI Deep-Dive"}
                            >
                              {useEnhanced ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              {useEnhanced ? "Original" : "Deep-Dive"}
                            </button>
                            <button
                              onClick={() => handleEnhanceTheory(true)}
                              disabled={enhanceLoading}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-secondary text-foreground hover:bg-muted transition-all active:scale-[0.97] disabled:opacity-50"
                              title="Regenerate Deep-Dive with AI"
                            >
                              {enhanceLoading ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <RefreshCw className="w-3.5 h-3.5" />
                              )}
                              Refresh
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnhanceTheory(false)}
                            disabled={enhanceLoading}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:brightness-110 shadow-sm transition-all active:scale-[0.97] disabled:opacity-50"
                            title="Generate a 1000-word AI Deep-Dive"
                          >
                            {enhanceLoading ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Wand2 className="w-3.5 h-3.5" />
                            )}
                            Enhance with AI
                          </button>
                        )}
                      </div>
                    </div>
                    <TheorySections
                      markdown={(useEnhanced && enhancedMd
                        ? enhancedMd
                        : (lang === "vi" ? (lesson.theory || lesson.theoryEn || "") : (lesson.theoryEn || lesson.theory || "")))
                        .replace(/\\\$/g, "$")
                        // Strip a leading single "# Lesson Title" since the page already shows the title
                        .replace(/^\s*#\s+[^\n]+\n+/, "")}
                      storageKey={`theory-read:${mod.id}:${lesson.id}:${useEnhanced && enhancedMd ? "ai" : "orig"}`}
                      defaultCodeLanguage={lesson.codeLanguage || "text"}
                    />
                  </div>

                  {/* Code Example */}
                  <CodeBlock code={lesson.code} language={lesson.codeLanguage || "text"} />


                  {/* Exercise */}
                  <div className="glass-card rounded-xl p-6 border-l-4 border-amber-500">
                    <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      Practice Exercise
                    </h2>
                    <p className="text-sm text-secondary-foreground mb-4">{t(lesson.exercise, lesson.exerciseEn || lesson.exercise)}</p>
                    <button onClick={() => setShowIDE(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-400 transition-colors active:scale-[0.97]">
                      <Play className="w-4 h-4" />
                      Code in IDE
                    </button>
                  </div>

                  {/* Quiz */}
                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-foreground">✏️ Knowledge Check</h2>
                      {showResults && (
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-bold ${score === lesson.quiz.length ? 'text-green-500' : score >= lesson.quiz.length / 2 ? 'text-yellow-500' : 'text-destructive'}`}>
                            {score}/{lesson.quiz.length} correct
                          </span>
                          <button onClick={resetQuiz} className="text-sm text-primary hover:underline">Retry</button>
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
                      <button onClick={() => {
                        setShowResults(true);
                        // Track skill score
                        if (mod) {
                          const quizScore = lesson.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
                          updateSkillScore(mod.id, quizScore, lesson.quiz.length);
                        }
                      }} className="mt-6 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all active:scale-[0.97]">
                        Submit
                      </button>
                    )}
                  </div>

                  {/* 1-Minute Challenge */}
                  <div className="glass-card rounded-xl p-6 border-t-4 border-yellow-500">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        1-Minute Challenge
                      </h2>
                      {challengeActive && (
                        <span className="flex items-center gap-1 text-sm font-mono font-bold text-yellow-600">
                          <Clock className="w-4 h-4" /> {challengeTimer}s
                        </span>
                      )}
                    </div>
                    {!challengeActive && !showChallengeResult ? (
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground mb-4">Answer quickly in 60 seconds!</p>
                        <button onClick={startChallenge} className="px-6 py-2.5 rounded-lg bg-yellow-500 text-white font-semibold text-sm hover:bg-yellow-600 transition-colors active:scale-[0.97]">
                          Start!
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
                              {challengeAnswer === challengeQ.answer ? '🎉 Correct!' : '❌ Incorrect!'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">💬 {challengeQ.explanation}</p>
                            <button onClick={startChallenge} className="mt-3 text-sm text-primary hover:underline">Try again</button>
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
                          AI Challenge: {aiChallenge.title}
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
                          <div className="rounded-lg overflow-hidden mb-4 max-w-full">
                            <div className="px-3 py-2 bg-slate-900 flex items-center justify-between">
                              <span className="text-xs font-mono text-green-400">Starter Code</span>
                              <button onClick={() => setShowIDE(true)}
                                className="flex items-center gap-1 px-2 py-1 rounded bg-green-600 text-white text-xs hover:bg-green-500">
                                <Play className="w-3 h-3" /> Open IDE
                              </button>
                            </div>
                            <pre className="p-3 bg-slate-950 overflow-x-auto max-w-full">
                              <code className="text-xs font-mono text-slate-300 break-words">{aiChallenge.starterCode}</code>
                            </pre>
                          </div>
                        )}

                        {/* Hints */}
                        {aiChallenge.hints && (
                          <div className="mb-4">
                            <button onClick={() => setShowHints(!showHints)}
                              className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-500 font-medium">
                              <Lightbulb className="w-4 h-4" />
                              {showHints ? "Hide hints" : "Show hints"}
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
                              {showSolution ? "Hide solution" : "Show solution"}
                            </button>
                            <AnimatePresence>
                              {showSolution && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden">
                                  <pre className="p-3 bg-slate-950 rounded-lg overflow-x-auto max-w-full mb-3">
                                    <code className="text-xs font-mono text-slate-300 break-words">{aiChallenge.solution}</code>
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

                  {/* Skill Radar & Recommendation */}
                  {showResults && mod && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <SkillRadarChart pillarId={mod.course === "kids" ? "python" : mod.course === "data-ai" ? "ai-foundation" : mod.course} />
                      <LearningRecommendation
                        modules={curriculumExpandedModules as unknown as ProgrammingModule[]}
                        currentModuleId={mod.id}
                      />
                    </div>
                  )}

                  {/* Lesson Feedback */}
                  <LessonFeedback
                    lessonId={lesson.id}
                    moduleId={mod.id}
                    lessonType="programming"
                    subject={mod.course}
                  />
                </motion.div>
              </div>
            </div>
              </div>
            </div>

              {/* Right side: IDE Panel — 40% default, sticky for easy reading */}
              <AnimatePresence>
                {showIDE && !isMobile && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "40%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="xl:w-[38%] shrink-0 min-w-0 overflow-hidden"
                  >
                    <div className="sticky top-28 rounded-xl overflow-hidden border border-border shadow-md" style={{ height: "calc(100vh - 140px)" }}>
                      {isSQL ? (
                        <SqlEditor />
                      ) : (
                        <PythonIDEPanel initialCode={lesson.code} />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile IDE with toggle */}
              {isMobile && (
                <div className="w-full mt-6">
                  <button
                    onClick={() => setShowIDE(!showIDE)}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all mb-4 ${
                      showIDE
                        ? "border border-border bg-secondary text-foreground"
                        : "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    }`}
                  >
                    {showIDE ? <PanelRightClose className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                    {showIDE ? "Hide IDE" : "Open Interactive IDE"}
                  </button>
                  <AnimatePresence>
                    {showIDE && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 540, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="rounded-xl overflow-hidden border border-border shadow-md"
                      >
                        {isSQL ? (
                          <SqlEditor />
                        ) : (
                          <PythonIDEPanel initialCode={lesson.code} />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgrammingLessonPage;
