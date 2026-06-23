import LessonFeedback from "@/components/LessonFeedback";
import { boldAndSanitize } from "@/lib/utils";
import { useState, useEffect } from "react";
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
import { edtechQuizEn } from "@/data/curriculum/edtechQuizI18n";
import { nlpQuizEn } from "@/data/curriculum/nlpQuizI18n";
import { programmingQuizExtraEn } from "@/data/curriculum/programmingQuizExtraI18n";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import SqlEditor from "@/components/SqlEditor";
import PythonIDEPanel from "@/components/PythonIDEPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserRole } from "@/hooks/useUserRole";
import CodeBlock from "@/components/CodeBlock";
import LessonFloatingSymbols from "@/components/programming/LessonFloatingSymbols";
import mascotPythonPathway from "@/assets/programming/mascot-python-pathway.png";
import mascotPython from "@/assets/programming/mascot-python.png";
import mascotSoftwareEng from "@/assets/programming/mascot-software-eng.png";
import mascotAiFoundation from "@/assets/programming/mascot-ai-foundation.png";
import mascotPromptEng from "@/assets/programming/mascot-prompt-engineering.png";
import mascotSql from "@/assets/programming/mascot-sql.png";
import mascotDataEng from "@/assets/programming/mascot-data-eng.png";
import mascotMl from "@/assets/programming/mascot-ml.png";
import mascotCloud from "@/assets/programming/mascot-cloud.png";
import mascotDeepLearning from "@/assets/programming/mascot-deep-learning.png";
import mascotNlp from "@/assets/programming/mascot-nlp.png";
import mascotRl from "@/assets/programming/mascot-rl.png";
import mascotCybersecurity from "@/assets/programming/mascot-cybersecurity.png";
import mascotEdtech from "@/assets/programming/mascot-edtech.png";
import mascotProjects from "@/assets/programming/mascot-professional-projects.png";

const PILLAR_MASCOTS: Record<string, string> = {
  "python-pathway": mascotPythonPathway,
  python: mascotPython,
  "software-eng": mascotSoftwareEng,
  "ai-foundation": mascotAiFoundation,
  "prompt-engineering": mascotPromptEng,
  sql: mascotSql,
  "data-eng": mascotDataEng,
  ml: mascotMl,
  cloud: mascotCloud,
  "deep-learning": mascotDeepLearning,
  nlp: mascotNlp,
  "reinforcement-learning": mascotRl,
  cybersecurity: mascotCybersecurity,
  edtech: mascotEdtech,
  "professional-projects": mascotProjects,
};

/**
 * Pick a Prism language id for syntax highlighting. Prefer the lesson's
 * declared `codeLanguage`; otherwise sniff the snippet for obvious markers
 * so JS/TS/SQL/Bash blocks don't render under a misleading "PYTHON" label.
 */
const detectCodeLanguage = (code = "", declared?: string): string => {
  const d = (declared || "").toLowerCase().trim();
  if (d && d !== "text" && d !== "plain") return d;
  const c = code || "";
  if (/^\s*(SELECT|WITH|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/im.test(c)) return "sql";
  if (/\b(interface|: number|: string|: boolean|as const|<[A-Z]\w*>)\b/.test(c)) return "typescript";
  if (/\b(const|let|var|function|=>)\b/.test(c) && /[;{}]/.test(c)) return "javascript";
  if (/^#!\/.*\b(bash|sh)\b/m.test(c) || /^\s*(echo|cd|ls|grep|curl|sudo)\s+/m.test(c)) return "bash";
  if (/^\s*(def |import |from |print\(|class .*:)/m.test(c)) return "python";
  return "python";
};
import CodeTypingRace from "@/components/programming/CodeTypingRace";
import TheorySections from "@/components/TheorySections";
import GitBranchingSimulator from "@/components/se/GitBranchingSimulator";
import { trackLessonCompletion, LEAD_ENGINEER_BADGE } from "@/lib/badgeAwards";
import { useProgrammingXP, BADGE_DEFS } from "@/hooks/useProgrammingXP";
import imgScratch from "@/assets/programming-modules/m-scratch.jpg";
import imgPyBasic from "@/assets/programming-modules/m-python-basic.jpg";
import imgDS from "@/assets/programming-modules/m-data-structures.jpg";
import imgPygame from "@/assets/programming-modules/m-pygame.jpg";
import imgSQL from "@/assets/programming-modules/m-sql.jpg";
import imgPipeline from "@/assets/programming-modules/m-data-pipeline.jpg";
import imgML from "@/assets/programming-modules/m-ml.jpg";
import imgAI from "@/assets/programming-modules/m-ai-foundation.jpg";
import imgSE from "@/assets/programming-modules/m-software-engineering.jpg";
import imgNLP from "@/assets/programming-modules/m-nlp.jpg";
import imgDL from "@/assets/programming-modules/m-deep-learning.jpg";
import imgCyber from "@/assets/programming-modules/m-cybersecurity.jpg";
import imgWeb from "@/assets/programming-modules/m-web-dev.jpg";
import imgCloud from "@/assets/programming-modules/m-cloud.jpg";
import imgEdTech from "@/assets/programming-modules/m-edtech.jpg";
import imgDataEng from "@/assets/programming-modules/m-data-engineering.jpg";
import imgPrompt from "@/assets/programming-modules/m-prompt-eng.jpg";
import imgRL from "@/assets/programming-modules/m-rl.jpg";
import { injectLessonImage } from "@/data/lessonInlineImages";

const MODULE_HERO_IMAGES: Record<string, string> = {
  "prog-scratch": imgScratch,
  "prog-python-basic": imgPyBasic,
  "prog-data-structures": imgDS,
  "prog-pygame": imgPygame,
  "prog-sql": imgSQL,
  "prog-data-pipeline": imgPipeline,
  "prog-ml": imgML,
  "prog-ai-foundation": imgAI,
  "se-foundations": imgSE,
  "prog-cybersecurity": imgCyber,
  "web-dev-foundations": imgWeb,
  "dl-foundations": imgDL,
  "nlp-foundations": imgNLP,
  "nlp-advanced": imgNLP,
  "nlp-advanced-2026": imgNLP,
  "nlp-production": imgNLP,
  "edtech-advanced-2026": imgEdTech,
  "edtech-research-2026": imgEdTech,
  "prog-prompt-engineering": imgPrompt,
  "prog-python-powerups": imgPyBasic,
  "prog-realworld-projects": imgPipeline,
  "prog-mastery-labs": imgPyBasic,
};

// Prefix-based fallback so families of modules share a coherent hero
// (e.g. all cloud-*, sql-*, ml-*, de-* modules show the right illustration).
const MODULE_HERO_PREFIX: Array<{ prefix: string; src: string }> = [
  { prefix: "cloud-", src: imgCloud },
  { prefix: "de-", src: imgDataEng },
  { prefix: "sql-", src: imgSQL },
  { prefix: "ml-", src: imgML },
  { prefix: "dl-", src: imgDL },
  { prefix: "nlp-", src: imgNLP },
  { prefix: "edtech-", src: imgEdTech },
  { prefix: "se-", src: imgSE },
  { prefix: "rl-", src: imgRL },
  { prefix: "web-", src: imgWeb },
  { prefix: "m1-", src: imgPyBasic },
  { prefix: "m2-", src: imgPyBasic },
  { prefix: "m3-", src: imgDS },
  { prefix: "m4-", src: imgPyBasic },
  { prefix: "m5-", src: imgPyBasic },
  { prefix: "m6-", src: imgAI },
];

function getModuleHero(moduleId: string): string | undefined {
  if (MODULE_HERO_IMAGES[moduleId]) return MODULE_HERO_IMAGES[moduleId];
  const hit = MODULE_HERO_PREFIX.find(p => moduleId.startsWith(p.prefix));
  return hit?.src;
}

// IDs of every lesson inside the Software Engineering module - used to auto-award
// the "Lead Engineer" badge once a learner completes the full set.
const SE_LESSON_IDS = [
  "se-sdlc",
  "se-system-design",
  "se-git",
  "se-clean-code",
  "se-testing",
  "se-cicd",
  "se-security-patterns",
];

// Map module IDs to their pillar/course for grouping
const PILLAR_COURSES: Record<string, string[]> = {
  "python": ["kids"],
  "ai-foundation": ["data-ai"],
  "sql": ["sql"],
  "data-eng": ["data-eng"],
  "ml": ["ml"],
  "cloud": ["cloud"],
  "deep-learning": ["dl"],
  "reinforcement-learning": ["rl"],
  "nlp": ["nlp"],
  "edtech": ["edtech"],
  "cybersecurity": ["cybersecurity"],
  "prompt-engineering": ["prompt-eng"],
};

function getPillarForModule(moduleId: string): string | null {
  // Check direct ID match first
  const directMap: Record<string, string> = {
    "prog-ai-foundation": "ai-foundation",
    "prog-sql": "sql",
    "prog-data-pipeline": "data-eng",
    "prog-ml": "ml",
    "prog-cybersecurity": "cybersecurity",
    "prog-prompt-engineering": "prompt-engineering",
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
    "cybersecurity": ["prog-cybersecurity"],
    "cloud": [
      "cloud-fundamentals",
      "cloud-compute-storage",
      "cloud-network-security",
      "cloud-serverless-devops",
      "cloud-architecture-cost",
      "cloud-ops-resilience",
      "cloud-strategy-cost",
    ],
    "deep-learning": ["dl-foundations"],
    "reinforcement-learning": ["reinforcement-learning"],
    "prompt-engineering": ["prog-prompt-engineering"],
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
  // Set of cached lesson keys "moduleId::lessonId" - drives the sidebar ✨ Enhanced badge
  const [cachedLessonKeys, setCachedLessonKeys] = useState<Set<string>>(new Set());
  // Admin batch illustration generation
  const { isTeacher } = useUserRole();
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ done: 0, total: 0 });
  // Track if learner has had a wrong attempt - used to award Bug Slayer badge
  const [hadWrongAttempt, setHadWrongAttempt] = useState(false);
  // Unified Programming gamification - XP, streak, badges across all pillars
  const { awardXP, markPillarLesson, awardBadge, touchStreak } = useProgrammingXP();

  const isSQL = mod?.id === "prog-sql" || mod?.course === "sql";

  // Load cached AI theory whenever the lesson changes.
  // Auto-trigger Enhance with AI when:
  //   (a) no cached entry exists at all, OR
  //   (b) cached markdown exists but is missing inline illustrations.
  // This guarantees every lesson (especially NLP) opens with the AI Deep-Dive
  // and cute infographic illustrations rendered.
  useEffect(() => {
    if (!mod || !lesson) return;
    setEnhancedMd(null);
    // Show ORIGINAL theory by default. Students can opt into AI Deep-Dive
    // explicitly via the toggle button - do NOT auto-switch them.
    setUseEnhanced(false);
    supabase
      .from("programming_theory_cache")
      .select("enhanced_markdown, illustrations")
      .eq("module_id", mod.id)
      .eq("lesson_id", lesson.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data?.enhanced_markdown) {
          // Pre-warm cache in background so Deep-Dive is ready when clicked,
          // but DO NOT switch the view away from Original.
          handleEnhanceTheory(false, { autoSwitch: false, silent: true });
          return;
        }
        const cleaned = data.enhanced_markdown
          .replace(/\s*\[\d+(?:\s*[,\s]\s*\d+)*\]/g, "")
          .replace(/\n#{1,6}\s*(References|Sources|Citations|Tham khảo|Nguồn)[\s\S]*$/i, "")
          .replace(/[ \t]+([.,;:!?])/g, "$1")
          .replace(/[ \t]{2,}/g, " ");
        setEnhancedMd(cleaned);
        // If cached markdown is missing inline illustrations, refresh in background.
        const hasIllustrations = /!\[[^\]]*\]\([^)]+\)/.test(cleaned);
        if (!hasIllustrations) {
          handleEnhanceTheory(true, { autoSwitch: false, silent: true });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mod, lesson]);

  const handleEnhanceTheory = async (forceRefresh = false, opts: { autoSwitch?: boolean; silent?: boolean } = {}) => {
    if (!mod || !lesson) return;
    const { autoSwitch = true, silent = false } = opts;
    if (!silent) setEnhanceLoading(true);
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
        if (autoSwitch) setUseEnhanced(true);
        if (!silent) toast.success(data.cached ? "Loaded enhanced theory from cache" : "AI Deep-Dive ready!");
      }
    } catch (e) {
      if (!silent) toast.error("Could not enhance theory. Please try again later.");
    }
    if (!silent) setEnhanceLoading(false);
  };

  // Admin-only: pre-generate AI illustrations for every Programming lesson.
  // Loops through all modules sequentially with a 4s delay to avoid 429 limits.
  // Skips lessons already cached (the edge function returns cached results
  // instantly so re-runs are safe and free).
  const generateAllIllustrations = async () => {
    if (batchRunning) return;
    const allLessons: { mod: ProgrammingModule; lesson: PLType }[] = [];
    for (const m of allProgrammingModules) {
      for (const l of m.lessons) allLessons.push({ mod: m, lesson: l });
    }
    if (allLessons.length === 0) return;

    setBatchRunning(true);
    setBatchProgress({ done: 0, total: allLessons.length });
    toast.info(`🎨 Starting illustration generation for ${allLessons.length} lessons. This will take ~${Math.ceil(allLessons.length * 4 / 60)} min.`);

    let successCount = 0;
    let failCount = 0;
    for (let i = 0; i < allLessons.length; i++) {
      const { mod: m, lesson: l } = allLessons[i];
      try {
        const { data, error } = await supabase.functions.invoke("enhance-programming-theory", {
          body: {
            module_id: m.id,
            lesson_id: l.id,
            lesson_title: l.titleEn || l.title,
            module_title: m.titleEn || m.title,
            base_theory: l.theoryEn || l.theory || "",
            code_language: l.codeLanguage,
            force_refresh: false,
          },
        });
        if (error) throw error;
        if (data) successCount++;
      } catch (e) {
        // Silently track failures in batch run; surfaced via toast at end
        failCount++;
      }
      setBatchProgress({ done: i + 1, total: allLessons.length });
      // Throttle: skip the wait on the last item
      if (i < allLessons.length - 1) {
        await new Promise((r) => setTimeout(r, 4000));
      }
    }

    setBatchRunning(false);
    toast.success(`🎨 Illustrations done - ${successCount} ok, ${failCount} failed.`);
    // Refresh sidebar badges
    const moduleIds = pillarModules.map((mm) => mm.id);
    if (moduleIds.length > 0) {
      const { data } = await supabase
        .from("programming_theory_cache")
        .select("module_id,lesson_id")
        .in("module_id", moduleIds);
      if (data) setCachedLessonKeys(new Set(data.map((r: any) => `${r.module_id}::${r.lesson_id}`)));
    }
    // Reload current lesson's enhanced markdown if user is viewing one
    if (mod && lesson) {
      const { data: cur } = await supabase
        .from("programming_theory_cache")
        .select("enhanced_markdown")
        .eq("module_id", mod.id)
        .eq("lesson_id", lesson.id)
        .maybeSingle();
      if (cur?.enhanced_markdown) setEnhancedMd(cur.enhanced_markdown);
    }
  };

  // Get all sibling modules for same pillar
  const pillar = moduleId ? getPillarForModule(moduleId) : null;
  const pillarModules = pillar ? getPillarModules(pillar) : [];

  // Sidebar badge: load all cached (module_id, lesson_id) for the current pillar in one query
  useEffect(() => {
    const moduleIds = pillarModules.map((m) => m.id);
    if (moduleIds.length === 0) return;
    let cancelled = false;
    supabase
      .from("programming_theory_cache")
      .select("module_id,lesson_id")
      .in("module_id", moduleIds)
      .then(({ data }) => {
        if (cancelled || !data) return;
        setCachedLessonKeys(new Set(data.map((r: any) => `${r.module_id}::${r.lesson_id}`)));
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pillar]);

  useEffect(() => {
    const m = allProgrammingModules.find(m => m.id === moduleId);
    if (m) {
      setMod(m);
      const l = lessonId ? m.lessons.find(l => l.id === lessonId) : m.lessons[0];
      if (l) setLesson(l);
      // Auto-expand the current module
      setExpandedModules(prev => new Set(prev).add(m.id));
      // Touch the daily learning streak on every lesson visit
      touchStreak();
    }
  }, [moduleId, lessonId, touchStreak]);

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
      toast.error("Could not generate challenge. Please try again.");
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LessonFloatingSymbols pillarId={pillar} count={90} />
      <LessonFloatingSymbols pillarId={pillar} count={45} className="opacity-50 blur-[1px]" />
      <Navbar />
      <div className="pt-6 pb-16 relative">
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
              {!isMobile && isTeacher && (
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={generateAllIllustrations}
                    disabled={batchRunning}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] shadow-sm border border-border bg-background text-foreground hover:bg-muted disabled:opacity-60 disabled:cursor-not-allowed"
                    title="Generate cute infographic illustrations for every Programming lesson (admin only)"
                  >
                    {batchRunning ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        🎨 {batchProgress.done} / {batchProgress.total}
                      </>
                    ) : (
                      <>🎨 Generate All Illustrations</>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Main 2-column layout: Content + IDE (60% theory / 40% IDE for readability) */}
            <div className={`flex gap-6 ${showIDE && !isMobile ? "flex-row" : "flex-col"}`}>
              {/* Left side: Sidebar + Lesson content */}
              <div className={`${showIDE && !isMobile ? "w-3/5 xl:w-[62%]" : "w-full"} min-w-0`}>
            <div className="flex flex-col lg:flex-row gap-6 programming-lesson-shell">
              {/* Sidebar - Roadmap with ALL pillar modules - visually lighter than main lesson body */}
              <div className="lg:w-72 shrink-0">
                <div className="rounded-xl border-2 border-emerald-500/50 bg-muted/30 p-4 overflow-visible shadow-[0_4px_14px_-6px_rgba(16,185,129,0.3)]">
                  {pillar && PILLAR_MASCOTS[pillar] && (
                    <div className="flex justify-center mb-2">
                      <img
                        src={PILLAR_MASCOTS[pillar]}
                        alt="Pillar mascot"
                        width={96}
                        height={96}
                        loading="lazy"
                        className="w-20 h-20 object-contain drop-shadow-md"
                      />
                    </div>
                  )}
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
                                const isEnhanced = cachedLessonKeys.has(`${pm.id}::${l.id}`);
                                return (
                                  <button
                                    key={l.id}
                                    onClick={() => {
                                      if (pm.id !== mod.id) {
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
                                    <span className="truncate flex-1">{t(l.title, l.titleEn)}</span>
                                    {isEnhanced && (
                                      <span
                                        title="AI Deep-Dive ready"
                                        className="shrink-0 text-[10px] leading-none text-violet-500 dark:text-violet-300"
                                      >
                                        ✨
                                      </span>
                                    )}
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
              <div className="flex-1 min-w-0 relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-3 sm:p-4">
                <LessonFloatingSymbols pillarId={pillar} count={120} className="opacity-90" />
                <LessonFloatingSymbols pillarId={pillar} count={60} className="opacity-50 blur-[1px]" />
                <div className="absolute inset-0 z-0 bg-background/25" aria-hidden="true" />

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 space-y-8" key={lesson.id}>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">
                    {mod.icon} {t(lesson.title, lesson.titleEn)}
                  </h1>

                  {/* Theory - document-style reading card with extra breathing room */}
                  <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/60 bg-card/90 shadow-[0_8px_30px_-10px_rgba(16,185,129,0.35)] p-6 sm:p-8 lg:p-10 ring-1 ring-emerald-500/10">
                    <LessonFloatingSymbols pillarId={pillar} count={70} className="opacity-30" />
                    <div className="relative z-10">
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
                        {enhancedMd && (
                          <button
                            onClick={() => setUseEnhanced((v) => !v)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-secondary text-foreground hover:bg-muted transition-all active:scale-[0.97]"
                            title={useEnhanced ? "Show original theory" : "Show AI Deep-Dive"}
                          >
                            {useEnhanced ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            {useEnhanced ? "Original" : "Deep-Dive"}
                          </button>
                        )}
                      </div>
                    </div>
                    {getModuleHero(mod.id) && (
                      <img
                        src={getModuleHero(mod.id)!}
                        alt={`${mod.titleEn} illustration`}
                        loading="lazy"
                        width={1024}
                        height={576}
                        className="w-full max-h-[28rem] object-contain rounded-xl mb-6 bg-muted/30"
                      />
                    )}
                    <TheorySections
                      markdown={injectLessonImage(
                        (useEnhanced && enhancedMd
                          ? enhancedMd
                          : (lang === "vi" ? (lesson.theory || lesson.theoryEn || "") : (lesson.theoryEn || lesson.theory || "")))
                          .replace(/\\\$/g, "$")
                          // Strip a leading single "# Lesson Title" since the page already shows the title
                          .replace(/^\s*#\s+[^\n]+\n+/, ""),
                        lesson.id,
                        lang === "vi" ? "vi" : "en"
                      )}
                      storageKey={`theory-read:${mod.id}:${lesson.id}:${useEnhanced && enhancedMd ? "ai" : "orig"}`}
                      defaultCodeLanguage={lesson.codeLanguage || "text"}
                    />
                    </div>
                  </div>

                  {/* Interactive Git simulator - only on the Git lesson */}
                  {lesson.id === "se-git" && (
                    <div className="space-y-3">
                      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        🌿 Interactive Git Playground
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Bấm các nút bên dưới để commit, tạo branch, hoặc merge - rồi xem đồ thị Gitflow tự cập nhật cùng terminal log JetBrains Mono.
                      </p>
                      <GitBranchingSimulator />
                    </div>
                  )}

                  {/* Code Example - use the lesson's declared language so syntax
                      highlighting matches (Python / TS / JS / SQL / Bash, etc.). */}
                  <CodeBlock code={lesson.code} language={detectCodeLanguage(lesson.code, lesson.codeLanguage)} />


                  {/* Exercise */}
                  <div className="glass-card rounded-xl p-6 border-l-4 border-amber-500">
                    <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      Practice Exercise
                    </h2>
                    <p className="text-sm text-secondary-foreground mb-4">{t(lesson.exercise, lesson.exerciseEn || lesson.exercise)}</p>
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
                      {lesson.quiz.map((q, qi) => {
                        const en = lang === "en" ? (edtechQuizEn[q.question] ?? nlpQuizEn[q.question] ?? programmingQuizExtraEn[q.question]) : undefined;
                        const questionText = lang === "en" ? ((q as any).questionEn ?? en?.q ?? q.question) : q.question;
                        const optionTexts = lang === "en" ? ((q as any).optionsEn ?? en?.opts ?? q.options) : q.options;
                        const explanationText = lang === "en" ? ((q as any).explanationEn ?? en?.exp ?? q.explanation) : q.explanation;
                        return (
                        <div key={qi} className="space-y-2">
                          <p className="text-sm font-medium text-foreground">{qi + 1}. {questionText}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {optionTexts.map((opt, oi) => {
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
                                <button
                                  key={oi}
                                  onClick={() => handleAnswer(qi, oi)}
                                  role="radio"
                                  aria-checked={selected}
                                  aria-label={`${t("Đáp án", "Option")} ${String.fromCharCode(65 + oi)}: ${opt}${showResults ? (isCorrect ? ` - ${t("đúng", "correct")}` : selected ? ` - ${t("sai", "wrong")}` : "") : ""}`}
                                  disabled={showResults}
                                  className={cls}
                                >
                                  {showResults && isCorrect && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                                  {showResults && selected && !isCorrect && <XCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                                  <span className="font-semibold mr-1">{String.fromCharCode(65 + oi)}.</span> {opt}
                                </button>
                              );
                            })}
                          </div>
                          {showResults && <p className="text-xs text-muted-foreground ml-1 mt-1">💬 {explanationText}</p>}
                        </div>
                        );
                      })}
                    </div>
                    {!showResults && Object.keys(answers).length > 0 && (
                      <button onClick={async () => {
                        setShowResults(true);
                        // Track skill score
                        if (mod) {
                          const quizScore = lesson.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
                          updateSkillScore(mod.id, quizScore, lesson.quiz.length);
                          const passed = quizScore / lesson.quiz.length >= 0.6;

                          // Unified Programming XP - award when learner passes (>=60%)
                          if (passed) {
                            const pillarId = pillar || mod.course || mod.id;
                            awardXP(50);
                            markPillarLesson(pillarId);
                            toast.success(t("🎉 +50 XP! Tuyệt vời!", "🎉 +50 XP! Great work!"));
                            // Bug Slayer badge: passed after having wrong answers earlier
                            const hadWrongNow = Object.entries(answers).some(([i, v]) => lesson.quiz[+i]?.answer !== v);
                            if ((hadWrongAttempt || hadWrongNow) && awardBadge("bug-slayer")) {
                              const def = BADGE_DEFS["bug-slayer"];
                              toast(`${def.emoji} ${lang === "vi" ? def.nameVi : def.name}`, {
                                description: lang === "vi" ? def.descriptionVi : def.description,
                              });
                            }
                          } else {
                            setHadWrongAttempt(true);
                          }

                          // Auto-award the "Lead Engineer" badge when learners pass
                          // every Software Engineering lesson (≥60% on this quiz counts as completed).
                          if (mod.id === "se-foundations" && passed) {
                            try {
                              const { awarded } = await trackLessonCompletion(
                                mod.id,
                                lesson.id,
                                SE_LESSON_IDS,
                                LEAD_ENGINEER_BADGE
                              );
                              if (awarded) {
                                toast.success("⚙️ Bạn đã nhận huy hiệu Lead Engineer!", {
                                  description: "Hoàn thành toàn bộ module Software Engineering.",
                                  duration: 6000,
                                });
                              }
                            } catch {
                              // Non-blocking: badge award failure shouldn't break quiz flow
                            }
                          }
                        }
                      }} className="mt-6 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all active:scale-[0.97]">
                        Submit
                      </button>
                    )}
                    {/* Next Lesson CTA - shows after quiz is submitted so learners don't think the lesson is over */}
                    {showResults && mod && (() => {
                      const currentIdx = mod.lessons.findIndex(l => l.id === lesson.id);
                      const nextLesson = currentIdx >= 0 ? mod.lessons[currentIdx + 1] : null;
                      if (nextLesson) {
                        return (
                          <Link
                            to={`/programming/${mod.id}/${nextLesson.id}`}
                            onClick={() => { resetQuiz(); setAiChallenge(null); setShowSolution(false); setShowHints(false); }}
                            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm hover:brightness-110 transition-all active:scale-[0.97] shadow-md"
                            aria-label={t("Đi tới bài học tiếp theo", "Go to next lesson")}
                          >
                            {t("Bài tiếp theo", "Next lesson")}: {lang === "vi" ? nextLesson.title : (nextLesson.titleEn || nextLesson.title)}
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        );
                      }
                      return (
                        <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold text-sm border border-emerald-500/30">
                          <Trophy className="w-4 h-4" />
                          {t("Bạn đã hoàn thành module này!", "You completed this module!")}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Code Typing Race - fun game replacing the redundant 1-minute quiz */}
                  <CodeTypingRace source={lesson.code || lesson.titleEn} language={lesson.codeLanguage} />

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
                            </div>
                            <CodeBlock code={aiChallenge.starterCode} language="python" showHeader={false} className="!my-0 !rounded-none !border-0" />
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
                                  <CodeBlock code={aiChallenge.solution} language="python" showHeader={false} className="mb-3" />
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

                  {/* Lesson Feedback widget rendered globally in App.tsx - do not double-mount here */}
                </motion.div>
              </div>
            </div>
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
