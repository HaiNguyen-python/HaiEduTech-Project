/**
 * @file PythonPathwayHub.tsx
 * @description Grid of 6 module cards with progress + lessons preview.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Award, BookOpen } from "lucide-react";
import { pythonModules, pythonLessons, getLessonsByModule } from "@/data/curriculum/pythonPathway";
import { useLanguage } from "@/contexts/LanguageContext";
import ModuleProgressBar from "./ModuleProgressBar";
import { cn } from "@/lib/utils";

const PROGRESS_KEY = "haiedu_python_pathway_progress";

export const getPythonPathwayProgress = (): Record<string, boolean> => {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch {
    return {};
  }
};

export const setLessonComplete = (lessonId: string) => {
  const p = getPythonPathwayProgress();
  if (!p[lessonId]) {
    p[lessonId] = true;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    window.dispatchEvent(new CustomEvent("python-pathway-progress"));
  }
};

const PythonPathwayHub = () => {
  const { lang: language } = useLanguage();
  const [progress, setProgress] = useState<Record<string, boolean>>(getPythonPathwayProgress());

  useEffect(() => {
    const sync = () => setProgress(getPythonPathwayProgress());
    window.addEventListener("python-pathway-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("python-pathway-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const totalCompleted = Object.values(progress).filter(Boolean).length;
  const totalLessons = pythonLessons.length;
  const overallPct = Math.round((totalCompleted / totalLessons) * 100);

  return (
    <div className="space-y-6">
      {/* Hero header */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-cyan-500/10 border border-emerald-500/20">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-1">
              💻 Introduction to Programming: Beginner → Mastery
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              {language === "vi"
                ? "Lộ trình lập trình 6 module (~47 bài) bằng Python chạy thật trong trình duyệt — quiz, dự án nhỏ, badge và AI giải thích code."
                : "Programming pathway with 6 modules (~47 lessons) running real Python in your browser — quizzes, mini-projects, badges, and AI code explainer."}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display font-bold text-emerald-600">{overallPct}%</div>
            <div className="text-xs text-muted-foreground">
              {totalCompleted}/{totalLessons} {language === "vi" ? "bài" : "lessons"}
            </div>
          </div>
        </div>
      </div>

      {/* Module grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pythonModules.map((m, idx) => {
          const lessons = getLessonsByModule(m.id);
          const completed = lessons.filter((l) => progress[l.id]).length;
          const certified = completed === lessons.length && lessons.length > 0;
          const firstLesson = lessons[0];
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              <Link
                to={firstLesson ? `/programming/python/${firstLesson.id}` : "#"}
                className={cn(
                  "group block rounded-2xl p-5 border bg-card hover:shadow-lg transition-all active:scale-[0.99]",
                  certified ? "border-emerald-500/40 shadow-md" : "border-border hover:border-primary/30",
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl shadow`}>
                    {m.emoji}
                  </div>
                  {certified && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">
                      <Award className="w-3 h-3" /> Certified
                    </div>
                  )}
                </div>

                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  {m.level}
                </div>
                <h3 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {language === "vi" ? m.title : m.titleEn}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                  {language === "vi" ? m.description : m.descriptionEn}
                </p>

                <ModuleProgressBar
                  completed={completed}
                  total={lessons.length}
                  moduleEmoji={m.emoji}
                  moduleTitle={`${lessons.length} ${language === "vi" ? "bài" : "lessons"}`}
                  certified={certified}
                />

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {firstLesson ? (language === "vi" ? "Bắt đầu" : "Start") : "Coming soon"}
                  </span>
                  <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* All lessons list */}
      <div className="rounded-2xl p-5 border border-border bg-card">
        <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
          📚 {language === "vi" ? "Tất cả bài học" : "All lessons"}
        </h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {pythonLessons.map((l) => {
            const done = progress[l.id];
            const m = pythonModules.find((mm) => mm.id === l.moduleId);
            const moduleEmoji = m?.emoji ?? "📘";
            const moduleTitle = m
              ? language === "vi"
                ? m.title
                : m.titleEn
              : language === "vi"
                ? "Module đang cập nhật"
                : "Module updating";

            return (
              <Link
                key={l.id}
                to={`/programming/python/${l.id}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm border transition-all",
                  done ? "bg-emerald-500/5 border-emerald-500/20" : "bg-background border-border hover:border-primary/30",
                )}
              >
                <span className="text-lg shrink-0">{l.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground truncate">
                    {language === "vi" ? l.title : l.titleEn}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {moduleEmoji} {moduleTitle}
                  </div>
                </div>
                {done && <Award className="w-4 h-4 text-emerald-600 shrink-0" />}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PythonPathwayHub;
