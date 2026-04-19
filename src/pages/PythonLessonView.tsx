/**
 * @file PythonLessonView.tsx
 * @description Split view: explanation (left) + Pyodide playground (right) + quiz.
 *              Refreshed layout with color callouts, step badges and sticky playground.
 */
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ChevronLeft, ChevronRight, Trophy, AlertTriangle, Wrench, Sparkles, Target,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  pythonModules,
  getLessonById,
  getLessonsByModule,
} from "@/data/curriculum/pythonPathway";
import CodePlayground from "@/components/python/CodePlayground";
import { preloadPyodide } from "@/components/python/PyodideRunner";
import LessonQuiz from "@/components/python/LessonQuiz";
import { setLessonComplete, getPythonPathwayProgress } from "@/components/python/PythonPathwayHub";
import { cn } from "@/lib/utils";

const levelStyles: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  Intermediate: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/30",
  Advanced: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
  Mastery: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30",
};

const StepBadge = ({ n, label, color }: { n: number; label: string; color: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <span className={cn(
      "inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs shadow-sm",
      color,
    )}>
      {n}
    </span>
    <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
      {label}
    </span>
  </div>
);

const PythonLessonView = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { lang: language } = useLanguage();
  const lesson = useMemo(() => (lessonId ? getLessonById(lessonId) : undefined), [lessonId]);
  const module = useMemo(() => pythonModules.find((m) => m.id === lesson?.moduleId), [lesson]);
  const moduleLessons = useMemo(() => (module ? getLessonsByModule(module.id) : []), [module]);
  const idx = lesson ? moduleLessons.findIndex((l) => l.id === lesson.id) : -1;
  const prev = idx > 0 ? moduleLessons[idx - 1] : null;
  const next = idx >= 0 && idx < moduleLessons.length - 1 ? moduleLessons[idx + 1] : null;

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (lesson) setCompleted(!!getPythonPathwayProgress()[lesson.id]);
  }, [lesson]);

  // Preload Pyodide in background as soon as a lesson opens — makes Run feel instant.
  useEffect(() => {
    preloadPyodide();
  }, []);

  const handleQuizComplete = async (passed: boolean, score: number) => {
    if (!lesson) return;
    if (passed && !completed) {
      setLessonComplete(lesson.id);
      setCompleted(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
      toast({
        title: language === "vi" ? "🎉 Hoàn thành bài học!" : "🎉 Lesson complete!",
        description: language === "vi" ? `Điểm: ${score}/${lesson.quiz.length}` : `Score: ${score}/${lesson.quiz.length}`,
      });

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("student_activity_log").insert({
            user_id: user.id,
            activity_type: "python_pathway_lesson",
            activity_id: lesson.id,
            domain: "programming",
            score,
            max_score: lesson.quiz.length,
            metadata: { module_id: lesson.moduleId, module_title: module?.titleEn },
          });
        }
      } catch (_e) { /* ignore */ }

      if (module) {
        const all = getLessonsByModule(module.id);
        const progress = getPythonPathwayProgress();
        const done = all.every((l) => progress[l.id]);
        if (done) {
          confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
          toast({
            title: language === "vi" ? `🏆 Programming Certified: ${module.titleEn}` : `🏆 Programming Certified: ${module.titleEn}`,
            description: language === "vi" ? "Bạn đã chinh phục module này!" : "You've conquered this module!",
          });
          window.dispatchEvent(new CustomEvent("python-module-certified", { detail: { moduleId: module.id } }));
        }
      }
    }
  };

  if (!lesson || !module) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground mb-4">Lesson not found.</p>
          <Button asChild><Link to="/programming?pillar=python-pathway">Back to Programming</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 flex-wrap">
            <Link to="/programming?pillar=python-pathway" className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> {language === "vi" ? "Lập trình" : "Programming"}
            </Link>
            <span>/</span>
            <span>💻 Introduction to Programming</span>
            <span>/</span>
            <span>{module.emoji} {language === "vi" ? module.title : module.titleEn}</span>
            <span>/</span>
            <span className="text-foreground font-medium">{lesson.emoji} {language === "vi" ? lesson.title : lesson.titleEn}</span>
          </div>

          {/* Hero header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl p-6 bg-gradient-to-br from-primary/5 via-fuchsia-500/5 to-purple-500/10 border border-primary/15"
          >
            <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
              <div className="flex flex-wrap gap-2">
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border",
                  `bg-gradient-to-r ${module.color} text-white border-transparent shadow-sm`,
                )}>
                  {module.emoji} {language === "vi" ? module.title : module.titleEn}
                </span>
                <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border",
                  levelStyles[module.level] ?? levelStyles.Beginner,
                )}>
                  {module.level}
                </span>
                {completed && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                    <Trophy className="w-3 h-3" /> {language === "vi" ? "Đã hoàn thành" : "Completed"}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {language === "vi" ? "Bài" : "Lesson"} {idx + 1}/{moduleLessons.length}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight">
              {lesson.emoji} {language === "vi" ? lesson.title : lesson.titleEn}
            </h1>
          </motion.div>

          {/* Split view */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: explanation */}
            <div className="space-y-4">
              {/* Step 1: Concept */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="p-5 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 shadow-sm"
              >
                <StepBadge n={1} label={language === "vi" ? "Khái niệm" : "Concept"} color="bg-gradient-to-br from-blue-500 to-cyan-600" />
                <h2 className="font-display font-bold text-foreground mb-3 flex items-center gap-2 text-base">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  📘 {language === "vi" ? "Hiểu khái niệm" : "Understand the concept"}
                </h2>
                <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert leading-relaxed [&>*]:my-4 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-4 [&>ol]:my-4 [&>ul]:my-4 [&>pre]:my-4 [&>table]:my-4 [&_strong]:text-foreground [&_strong]:font-bold [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-blue-500/10 [&_code]:text-blue-700 dark:[&_code]:text-blue-300 [&_code]:before:content-none [&_code]:after:content-none [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre]:rounded-lg [&_th]:bg-blue-500/10 [&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {language === "vi" ? lesson.concept : lesson.conceptEn}
                  </ReactMarkdown>
                </div>
              </motion.div>

              {/* Step 2: Pitfalls */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-2xl border-l-4 border-red-500 border-y border-r border-red-500/20 bg-red-500/5"
              >
                <StepBadge n={2} label={language === "vi" ? "Cạm bẫy" : "Pitfalls"} color="bg-gradient-to-br from-red-500 to-rose-600" />
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  ⚠️ {language === "vi" ? "Cạm bẫy thường gặp" : "Common pitfalls"}
                </h3>
                <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-strong:text-foreground prose-strong:font-bold prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:bg-red-500/10 prose-code:before:content-none prose-code:after:content-none text-foreground/90 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {(language === "vi" ? lesson.pitfalls : lesson.pitfallsEn).replace(/\n(?!\n)/g, "\n\n")}
                  </ReactMarkdown>
                </div>
              </motion.div>

              {/* Step 3: Practice */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="p-5 rounded-2xl border-l-4 border-emerald-500 border-y border-r border-emerald-500/20 bg-emerald-500/5"
              >
                <StepBadge n={3} label={language === "vi" ? "Thực hành" : "Practice"} color="bg-gradient-to-br from-emerald-500 to-green-600" />
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-600" />
                  🛠️ {language === "vi" ? "Bài tập thực hành" : "Practice task"}
                </h3>
                <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-strong:text-foreground prose-strong:font-bold prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:bg-emerald-500/10 prose-code:before:content-none prose-code:after:content-none text-foreground/90 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {(language === "vi" ? lesson.practiceTask : lesson.practiceTaskEn).replace(/\n(?!\n)/g, "\n\n")}
                  </ReactMarkdown>
                </div>
              </motion.div>
            </div>

            {/* Right: playground (sticky on desktop) */}
            <div className="space-y-4 lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
              <div className="p-5 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 shadow-sm">
                <StepBadge n={4} label={language === "vi" ? "Chạy thử" : "Try it"} color="bg-gradient-to-br from-violet-500 to-fuchsia-600" />
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                  ▶️ {language === "vi" ? "Sân chơi Code" : "Code Playground"}
                </h3>
                <CodePlayground
                  initialCode={lesson.codeExample}
                  needsScientific={module.needsScientific}
                  lessonContext={`${module.titleEn} → ${lesson.titleEn}`}
                  storageKey={`haiedu_python_pw_${lesson.id}`}
                />
              </div>

              {lesson.miniProject && (
                <div className="p-5 rounded-2xl border-l-4 border-amber-500 border-y border-r border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    <div className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-500 font-bold">
                      🎯 {language === "vi" ? "Mini Project" : "Mini Project"}
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">
                    {language === "vi" ? lesson.miniProject.title : lesson.miniProject.titleEn}
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                    {language === "vi" ? lesson.miniProject.description : lesson.miniProject.descriptionEn}
                  </p>
                  <CodePlayground
                    initialCode={lesson.miniProject.starterCode}
                    needsScientific={module.needsScientific}
                    lessonContext={`Mini-project: ${lesson.miniProject.titleEn}`}
                    storageKey={`haiedu_python_pw_${lesson.id}_mp`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quiz */}
          <div className="mt-8 p-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-emerald-500/5">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-primary to-emerald-500 text-white font-bold text-xs shadow-sm">
                5
              </span>
              <h2 className="font-display font-bold text-foreground text-base flex items-center gap-2">
                ✅ {language === "vi" ? "Kiểm tra kiến thức" : "Knowledge Check"}
              </h2>
            </div>
            <LessonQuiz questions={lesson.quiz} onComplete={handleQuizComplete} />
          </div>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
            <Button variant="outline" disabled={!prev} onClick={() => prev && navigate(`/programming/python/${prev.id}`)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> <span className="truncate max-w-[200px]">{prev ? (language === "vi" ? prev.title : prev.titleEn) : "—"}</span>
            </Button>
            <Button asChild variant="ghost"><Link to="/programming?pillar=python-pathway">{language === "vi" ? "Tất cả module" : "All modules"}</Link></Button>
            <Button disabled={!next} onClick={() => next && navigate(`/programming/python/${next.id}`)}>
              <span className="truncate max-w-[200px]">{next ? (language === "vi" ? next.title : next.titleEn) : "—"}</span> <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PythonLessonView;
