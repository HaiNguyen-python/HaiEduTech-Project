/**
 * @file PythonLessonView.tsx
 * @description Split view: explanation (left) + Pyodide playground (right) + quiz.
 */
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Trophy, AlertTriangle, Wrench, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  pythonLessons,
  pythonModules,
  getLessonById,
  getLessonsByModule,
} from "@/data/curriculum/pythonPathway";
import CodePlayground from "@/components/python/CodePlayground";
import LessonQuiz from "@/components/python/LessonQuiz";
import { setLessonComplete, getPythonPathwayProgress } from "@/components/python/PythonPathwayHub";

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

      // Log activity (silent fail)
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

      // Module-complete check
      if (module) {
        const all = getLessonsByModule(module.id);
        const progress = getPythonPathwayProgress();
        const done = all.every((l) => progress[l.id]);
        if (done) {
          confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
          toast({
            title: language === "vi" ? `🏆 Python Certified: ${module.titleEn}` : `🏆 Python Certified: ${module.titleEn}`,
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
          <Button asChild><Link to="/programming">Back to Programming</Link></Button>
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
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link to="/programming" className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Programming
            </Link>
            <span>/</span>
            <span>{module.emoji} {language === "vi" ? module.title : module.titleEn}</span>
            <span>/</span>
            <span className="text-foreground font-medium">{lesson.emoji} {language === "vi" ? lesson.title : lesson.titleEn}</span>
          </div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${module.color} text-white text-xs font-bold mb-3`}>
              {module.emoji} {module.titleEn} · {module.level}
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-1">
              {lesson.emoji} {language === "vi" ? lesson.title : lesson.titleEn}
            </h1>
            {completed && (
              <div className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold mt-1">
                <Trophy className="w-3 h-3" /> {language === "vi" ? "Đã hoàn thành" : "Completed"}
              </div>
            )}
          </motion.div>

          {/* Split view */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: explanation */}
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-border bg-card">
                <h2 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> {language === "vi" ? "Khái niệm" : "Concept"}
                </h2>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{language === "vi" ? lesson.concept : lesson.conceptEn}</ReactMarkdown>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
                <h3 className="font-bold text-foreground text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> {language === "vi" ? "Cạm bẫy thường gặp" : "Common Pitfalls"}
                </h3>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {language === "vi" ? lesson.pitfalls : lesson.pitfallsEn}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                <h3 className="font-bold text-foreground text-sm mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-600" /> {language === "vi" ? "Bài tập thực hành" : "Practice Task"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "vi" ? lesson.practiceTask : lesson.practiceTaskEn}
                </p>
              </div>
            </div>

            {/* Right: playground */}
            <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
              <CodePlayground
                initialCode={lesson.codeExample}
                needsScientific={module.needsScientific}
                lessonContext={`${module.titleEn} → ${lesson.titleEn}`}
                storageKey={`haiedu_python_pw_${lesson.id}`}
              />
              {lesson.miniProject && (
                <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-500/5">
                  <div className="text-[10px] uppercase tracking-wider text-violet-600 font-bold mb-1">
                    🎉 Mini Project
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-2">
                    {language === "vi" ? lesson.miniProject.title : lesson.miniProject.titleEn}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
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
          <div className="mt-8 p-5 rounded-xl border border-border bg-card">
            <h2 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
              ✅ {language === "vi" ? "Kiểm tra kiến thức" : "Knowledge Check"}
            </h2>
            <LessonQuiz questions={lesson.quiz} onComplete={handleQuizComplete} />
          </div>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
            <Button variant="outline" disabled={!prev} onClick={() => prev && navigate(`/programming/python/${prev.id}`)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> {prev ? (language === "vi" ? prev.title : prev.titleEn) : "—"}
            </Button>
            <Button asChild variant="ghost"><Link to="/programming">{language === "vi" ? "Tất cả module" : "All modules"}</Link></Button>
            <Button disabled={!next} onClick={() => next && navigate(`/programming/python/${next.id}`)}>
              {next ? (language === "vi" ? next.title : next.titleEn) : "—"} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PythonLessonView;
