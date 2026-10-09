/**
 * @file PythonLessonView.tsx
 * @description Split view: explanation (left) + Pyodide playground (right) + quiz.
 *              Refreshed layout with color callouts, step badges and sticky playground.
 */
import PremiumGate from "@/components/premium/PremiumGate";
import { FREE_LESSONS } from "@/hooks/usePremium";
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ChevronLeft, ChevronRight, Trophy, AlertTriangle, Wrench, Sparkles, Target,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "@/components/CodeBlock";
import remarkGfm from "remark-gfm";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  getModuleById,
  getBookChapter,
  getPathwaySequence,
  getLessonById,
  getLessonsByModule,
} from "@/data/curriculum/pythonPathway";
import BookChallengePractice from "@/components/python/BookChallengePractice";
import CodePlayground from "@/components/python/CodePlayground";
import { preloadPyodide } from "@/components/python/PyodideRunner";
import LessonQuiz from "@/components/python/LessonQuiz";
import { setLessonComplete, getPythonPathwayProgress } from "@/components/python/PythonPathwayHub";
import { cn } from "@/lib/utils";
import LessonReadToggle from "@/components/programming/LessonReadToggle";
import TheorySections from "@/components/TheorySections";
import pythonHeader from "@/assets/python-challenges-header.jpg";

const levelStyles: Record<string, string> = {
  Beginner: "bg-primary/10 text-primary border-primary/30",
  Intermediate: "bg-secondary text-secondary-foreground border-border",
  Advanced: "bg-accent/10 text-foreground border-accent/30",
  Mastery: "bg-secondary text-secondary-foreground border-border",
};

const StepBadge = ({ n, label, color }: { n: number; label: string; color: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <span className={cn(
      "inline-flex items-center justify-center w-7 h-7 rounded-full text-primary-foreground font-bold text-xs shadow-sm",
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
  
  const lesson = useMemo(() => (lessonId ? getLessonById(lessonId) : undefined), [lessonId]);
  const chapter = lesson ? getBookChapter(lesson.id) : undefined;
  const supplementary = !!lesson && !chapter;
  const module = useMemo(() => lesson ? getModuleById(lesson.moduleId, supplementary) : undefined, [lesson, supplementary]);
  const moduleLessons = useMemo(() => (module ? getLessonsByModule(module.id, supplementary) : []), [module, supplementary]);
  const idx = lesson ? moduleLessons.findIndex((l) => l.id === lesson.id) : -1;
  const sequence = lesson ? getPathwaySequence(lesson.id) : [];
  const sequenceIndex = sequence.findIndex(item => item.id === lesson?.id);
  const prev = sequenceIndex > 0 ? sequence[sequenceIndex - 1] : null;
  const next = sequenceIndex >= 0 ? sequence[sequenceIndex + 1] : null;

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (lesson) setCompleted(!!getPythonPathwayProgress()[lesson.id]);
  }, [lesson]);

  // Preload Pyodide in background as soon as a lesson opens - makes Run feel instant.
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
        title: "🎉 Lesson complete!",
        description: `Score: ${score}/${lesson.quiz.length}`,
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
        const all = getLessonsByModule(module.id, supplementary);
        const progress = getPythonPathwayProgress();
        const done = all.every((l) => progress[l.id]);
        if (done) {
          confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
          toast({
            title: `🏆 Programming Certified: ${module.titleEn}`,
            description: "You've conquered this module!",
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
    <div className="python-lab python-theory min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 flex-wrap">
            <Link to="/programming?pillar=python-pathway" className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> {"Programming"}
            </Link>
            <span>/</span>
            <span>💻 Introduction to Programming</span>
            <span>/</span>
            <span>{module.emoji} {module.titleEn}</span>
            <span>/</span>
            <span className="text-foreground font-medium">{lesson.emoji} {lesson.titleEn}</span>
          </div>

          {/* Hero header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="python-theory-heading relative isolate mb-6 border-b border-border py-8 sm:py-10"
          >
            <img src={pythonHeader} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
            <div className="python-lab-header-overlay absolute inset-0 -z-10" />
            <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
              <div className="flex flex-wrap gap-2">
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border",
                  "bg-primary text-primary-foreground border-transparent",
                )}>
                  {module.emoji} {module.titleEn}
                </span>
                <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border",
                  levelStyles[module.level] ?? levelStyles.Beginner,
                )}>
                  {module.level}
                </span>
                {completed && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/30">
                    <Trophy className="w-3 h-3" /> {"Completed"}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {"Lesson"} {idx + 1}/{moduleLessons.length}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-foreground leading-tight tracking-normal">
              {lesson.emoji} {lesson.titleEn}
            </h1>
            {chapter && <p className="mt-3 text-base text-muted-foreground">Python by Example · Challenges {String(chapter.first).padStart(3, "0")}-{String(chapter.last).padStart(3, "0")}</p>}
            {supplementary && <p className="mt-3 text-base text-muted-foreground">Supplementary reference</p>}
          </motion.div>

          {/* Mark-as-read + module progress bar */}
          <div className="mb-6">
            <LessonReadToggle
              moduleId={module.id}
              lessonId={lesson.id}
              allLessonIds={moduleLessons.map((l) => l.id)}
              onFirstMark={() => {
                if (!completed) {
                  setLessonComplete(lesson.id);
                  setCompleted(true);
                }
              }}
            />
          </div>

          {/* Split view */}

          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6">
            {/* Left: explanation */}
            <div className="min-w-0 space-y-4">
              {/* Step 1: Concept */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="min-w-0 py-5 border-t border-border"
              >
                <StepBadge n={1} label={"Concept"} color="bg-primary" />
                <h2 className="font-display font-bold text-foreground mb-5 flex items-center gap-2 text-xl">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {"Understand the concept"}
                </h2>
                <TheorySections
                  key={lesson.id}
                  markdown={lesson.conceptEn.replace(/^### /gm, "## ")}
                  storageKey={`python-theory-sections:${lesson.id}`}
                  defaultCodeLanguage="python"
                />
              </motion.div>

              {/* Step 2: Pitfalls */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="min-w-0 py-5 border-t border-border"
              >
                <StepBadge n={2} label={"Pitfalls"} color="bg-destructive" />
                <h3 className="font-bold text-foreground text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  {"Common pitfalls"}
                </h3>
                <div className="python-theory-prose prose prose-base max-w-none dark:prose-invert text-foreground leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {(lesson.pitfallsEn).replace(/\n(?!\n)/g, "\n\n")}
                  </ReactMarkdown>
                </div>
              </motion.div>

              {/* Step 3: Practice */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="min-w-0 py-5 border-t border-border"
              >
                <StepBadge n={3} label={"Practice"} color="bg-primary" />
                <h3 className="font-bold text-foreground text-lg mb-3 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" />
                  {"Practice task"}
                </h3>
                <div className="python-theory-prose prose prose-base max-w-none dark:prose-invert text-foreground leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {(lesson.practiceTaskEn).replace(/\n(?!\n)/g, "\n\n")}
                  </ReactMarkdown>
                </div>
                <BookChallengePractice lessonId={lesson.id} />
              </motion.div>
              {chapter?.desktopExample && <details className="border-t border-border py-4">
                <summary className="cursor-pointer font-medium text-foreground">{chapter.title === "Turtle Graphics" ? "Turtle drawing example" : "Desktop Tkinter example"}</summary>
                <div className="mt-4 min-w-0"><CodeBlock code={chapter.desktopExample} language="python" /></div>
              </details>}
            </div>

            {/* Right: playground (sticky on desktop) */}
            <div className="min-w-0 space-y-4 lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
              <div className="min-w-0 py-5 border-t border-border">
                <StepBadge n={4} label={"Try it"} color="bg-primary" />
                <h3 className="font-bold text-foreground text-lg mb-3 flex items-center gap-2">
                  {"Code Playground"}
                </h3>
                <CodePlayground
                   key={lesson.id}
                  initialCode={lesson.codeExample}
                  needsScientific={module.needsScientific}
                  lessonContext={`${module.titleEn} → ${lesson.titleEn}`}
                  storageKey={`haiedu_python_pw_${lesson.id}`}
                />
              </div>

              {lesson.miniProject && (
                <div className="min-w-0 py-5 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-primary" />
                    <div className="text-xs uppercase tracking-wider text-primary font-bold">
                      🎯 {"Mini Project"}
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">
                    {lesson.miniProject.titleEn}
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                    {lesson.miniProject.descriptionEn}
                  </p>
                  <CodePlayground
                     key={`${lesson.id}-project`}
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
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground font-bold text-xs shadow-sm">
                5
              </span>
              <h2 className="font-display font-bold text-foreground text-base flex items-center gap-2">
                ✅ Knowledge Check
              </h2>
            </div>
            <LessonQuiz questions={lesson.quiz} onComplete={handleQuizComplete} />
          </div>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
            <Button variant="outline" disabled={!prev} onClick={() => prev && navigate(`/programming/python/${prev.id}`)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> <span className="truncate max-w-[200px]">{prev?.titleEn ?? "-"}</span>
            </Button>
            <Button asChild variant="ghost"><Link to="/programming?pillar=python-pathway">{"All modules"}</Link></Button>
            <Button disabled={!next} onClick={() => next && navigate(`/programming/python/${next.id}`)}>
              <span className="truncate max-w-[200px]">{next?.titleEn ?? "-"}</span> <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const PythonLessonViewGated = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const l = lessonId ? getLessonById(lessonId) : undefined;
  const idx = l ? getLessonsByModule(l.moduleId, !getBookChapter(l.id)).findIndex((x) => x.id === l.id) : -1;
  return <PremiumGate kind="lesson" free={idx < FREE_LESSONS} backTo="/programming?tab=python-pathway"><PythonLessonView /></PremiumGate>;
};

export default PythonLessonViewGated;
