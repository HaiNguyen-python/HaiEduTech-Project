/**
 * @file PythonPathwayHub.tsx
 * @description Grid of 6 module cards with progress + lessons preview.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Award, BookOpen, Terminal, Repeat2, Layers3, FileCode2, PanelsTopLeft, Database } from "lucide-react";
import { pythonModules, pythonLessons, getLessonsByModule, getBookChapter, supplementaryPythonLessons } from "@/data/curriculum/pythonPathway";
import { isPathwayLessonUnlocked, isPythonProgramComplete } from "@/lib/pythonPathwayLock";
import { usePythonChallengeProgress } from "@/hooks/usePythonChallengeProgress";
import { LockKeyhole } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import basicsBackground from "@/assets/python-module-basics.jpg";
import loopsBackground from "@/assets/python-module-loops.jpg";
import dataBackground from "@/assets/python-module-data.jpg";
import functionsBackground from "@/assets/python-module-functions.jpg";
import interfacesBackground from "@/assets/python-module-interfaces.jpg";
import projectsBackground from "@/assets/python-module-projects.jpg";

const PROGRESS_KEY = "haiedu_python_pathway_progress";
const moduleIcons = [Terminal, Repeat2, Layers3, FileCode2, PanelsTopLeft, Database];
const moduleBackgrounds = [basicsBackground, loopsBackground, dataBackground, functionsBackground, interfacesBackground, projectsBackground];
const moduleTones = ["python-module--blue", "python-module--gold", "python-module--coral", "python-module--blue", "python-module--coral", "python-module--gold"];

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
  const reducedMotion = useReducedMotion();
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

  const { ids: challengeIds } = usePythonChallengeProgress();
  const certReady = isPythonProgramComplete(progress, challengeIds.size);
  const totalCompleted = pythonLessons.filter(lesson => progress[lesson.id]).length;
  const totalLessons = pythonLessons.length;
  const overallPct = Math.round((totalCompleted / totalLessons) * 100);

  return (
    <div className="python-lab space-y-6">
      {/* Hero header */}
      <div className="border-b border-border pb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-1">
              💻 Introduction to Programming
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Python by Example · 19 chapters · 150 challenges
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display font-bold text-primary">{overallPct}%</div>
            <div className="text-xs text-muted-foreground">
              {totalCompleted}/{totalLessons} lessons
            </div>
          </div>
        </div>
      </div>

      <Link to="/programming/python-certificate" className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm hover:bg-primary/10">
        <span className="flex items-center gap-2 font-semibold text-foreground"><Award className="h-5 w-5 text-primary" /> Python Programming Certificate</span>
        <span className="text-xs text-muted-foreground">{certReady ? "Ready to download" : `Lessons ${totalCompleted}/${totalLessons} · Challenges ${challengeIds.size}/150`}</span>
      </Link>

      {/* Module grid */}
      <div className="grid auto-rows-fr gap-4 md:grid-cols-2" aria-label="Python learning modules">
        {pythonModules.map((m, idx) => {
          const lessons = getLessonsByModule(m.id);
          const completed = lessons.filter((l) => progress[l.id]).length;
          const certified = completed === lessons.length && lessons.length > 0;
          const firstLesson = lessons[0];
          const lastLesson = lessons[lessons.length - 1];
          const firstChapter = firstLesson ? getBookChapter(firstLesson.id) : undefined;
          const lastChapter = lastLesson ? getBookChapter(lastLesson.id) : undefined;
          const Icon = moduleIcons[idx] ?? Terminal;
          const moduleLocked = !!firstLesson && !isPathwayLessonUnlocked(firstLesson.id, progress);
          const target = lessons.find(l => !progress[l.id]) ?? firstLesson;
          return (
            <motion.div
              key={m.id}
              className="min-w-0 h-full"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : idx * 0.05, duration: reducedMotion ? 0 : 0.4 }}
            >
              {firstLesson ? (
                <Link
                  to={moduleLocked ? "#" : `/programming/python/${target.id}`}
                  onClick={e => { if (moduleLocked) e.preventDefault(); }}
                  aria-disabled={moduleLocked || undefined}
                  title={moduleLocked ? "Complete the previous module to unlock" : undefined}
                  className={cn(
                      "python-module-tile relative isolate group glass-card flex h-full min-h-[320px] flex-col overflow-hidden rounded-lg border p-5 sm:p-6",
                     moduleTones[idx],
                     certified && "python-module--complete",
                     moduleLocked && "cursor-not-allowed opacity-60 grayscale",
                  )}
                >
                  <img src={moduleBackgrounds[idx]} alt="" aria-hidden="true" loading="lazy" decoding="async" width={1024} height={640} className="python-module-background pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-right" />
                  <div className="python-module-background-overlay pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="python-module-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="python-module-accent font-mono text-xs mb-1">MODULE {String(idx + 1).padStart(2, "0")} / 06</p>
                      <p className="text-xs text-muted-foreground">{m.level} · {lessons.length} chapters</p>
                    </div>
                    {moduleLocked ? <LockKeyhole className="h-5 w-5 shrink-0 text-muted-foreground" aria-label="Locked" /> : certified ? <Award className="python-module-accent h-5 w-5 shrink-0" aria-label="Certified" /> : <ChevronRight className="python-module-accent h-5 w-5 shrink-0 group-hover:translate-x-1 transition-transform" />}
                  </div>

                  <h3 className="max-w-[75%] min-h-14 font-display text-xl font-bold leading-7 text-foreground mb-2">
                    {m.titleEn.replace(/^\d+\.\s*/, "")}
                  </h3>
                  <p className="max-w-[70%] min-h-12 text-sm leading-6 text-muted-foreground mb-4">
                    {m.descriptionEn}
                  </p>

                  <div className="mt-auto border-t border-border pt-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground"><BookOpen className="h-3.5 w-3.5" />
                        {firstChapter && lastChapter ? `Challenges ${String(firstChapter.first).padStart(3, "0")}-${String(lastChapter.last).padStart(3, "0")}` : `${lessons.length} lessons`}
                      </span>
                      <span className="font-mono text-foreground">{completed}/{lessons.length}</span>
                    </div>
                    <Progress value={lessons.length ? completed / lessons.length * 100 : 0} className="h-1.5" />
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex gap-1.5" aria-label={`${completed} of ${lessons.length} chapters complete`}>
                        {lessons.map(l => <span key={l.id} className={cn("h-2 w-2 rounded-full", progress[l.id] ? "bg-primary" : "bg-primary/20")} />)}
                      </div>
                      <span className="python-module-accent text-xs font-semibold">{moduleLocked ? "Locked" : certified ? "Review module" : completed ? "Continue learning" : "Start learning"}</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  className={cn(
                    "block rounded-lg p-5 border bg-card opacity-70 cursor-not-allowed",
                    "border-border",
                  )}
                  aria-disabled="true"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl shadow grayscale`}>
                      {m.emoji}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      Coming soon
                    </span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    {m.level}
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-1">
                    {m.titleEn}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                    {m.descriptionEn}
                  </p>
                  <p className="text-[11px] text-muted-foreground italic">
                    Content is being prepared, coming soon.
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* All lessons list */}
      <div className="border-t border-border pt-5">
        <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
          📚 Book chapters
        </h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {pythonLessons.map((l) => {
            const done = progress[l.id];
             const chapter = getBookChapter(l.id);
            const m = pythonModules.find((mm) => mm.id === l.moduleId);
            const moduleEmoji = m?.emoji ?? "📘";
            const moduleTitle = m?.titleEn ?? "Module updating";
            const locked = !isPathwayLessonUnlocked(l.id, progress);
            if (locked) return (
              <div key={l.id} aria-disabled="true" title="Complete the previous lesson to unlock" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm border border-dashed border-border opacity-60 cursor-not-allowed">
                <span className="text-lg shrink-0">{l.emoji}</span>
                <div className="min-w-0 flex-1"><div className="font-medium text-foreground">{l.titleEn}</div><div className="text-xs text-muted-foreground">Locked</div></div>
                <LockKeyhole className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            );

            return (
              <Link
                key={l.id}
                to={`/programming/python/${l.id}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm border transition-all",
                  done ? "bg-primary/5 border-primary/20" : "bg-background border-border hover:border-primary/30",
                )}
              >
                <span className="text-lg shrink-0">{l.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground">
                    {l.titleEn}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {chapter ? `Challenges ${String(chapter.first).padStart(3, "0")}-${String(chapter.last).padStart(3, "0")}` : `${moduleEmoji} ${moduleTitle}`}
                  </div>
                </div>
                {done && <Award className="w-4 h-4 text-primary shrink-0" />}
              </Link>
            );
          })}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Source: Nichola Lacey, Python by Example: Learning to Program in 150 Challenges (2019). Teaching notes adapted for HaiEduTech.</p>
      <details className="border-t border-border pt-5">
        <summary className="cursor-pointer font-medium text-foreground">Supplementary reference ({supplementaryPythonLessons.length})</summary>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {supplementaryPythonLessons.map(lesson => <Link key={lesson.id} to={`/programming/python/${lesson.id}`} className="py-2 text-sm text-primary hover:underline">{lesson.titleEn}</Link>)}
        </div>
      </details>
    </div>
  );
};

export default PythonPathwayHub;
