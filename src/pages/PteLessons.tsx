/**
 * @file PteLessons.tsx
 * @description PTE Academic strategy lessons hub - 12 lessons grouped by skill.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, CheckCircle2, Clock, Target, ListChecks } from "lucide-react";
import PteShell from "@/components/pte/PteShell";
import {
  PTE_LESSONS,
  PTE_SKILL_META,
  PTE_LESSON_QUIZ_TOTAL,
  type PteLessonSkill,
} from "@/data/pteLessonsData";
import { readPteLessonProgress } from "@/lib/pteLessonProgress";

const SKILLS: PteLessonSkill[] = ["speaking", "writing", "reading", "listening"];

const PteLessons = () => {
  const [filter, setFilter] = useState<"all" | PteLessonSkill>("all");
  const progress = useMemo(() => readPteLessonProgress(), []);
  const passedCount = Object.values(progress).filter((p) => p.passed).length;

  const groups = SKILLS.filter((s) => filter === "all" || filter === s).map((skill) => ({
    skill,
    lessons: PTE_LESSONS.filter((l) => l.skill === skill),
  }));

  return (
    <PteShell
      title="PTE Strategy Lessons"
      subtitle="12 method lessons across all four skills, each with a worked example and a 5-question check."
    >
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: GraduationCap, label: "Lessons", value: `${PTE_LESSONS.length}` },
          { icon: ListChecks, label: "Quiz questions", value: `${PTE_LESSON_QUIZ_TOTAL}` },
          { icon: CheckCircle2, label: "Passed", value: `${passedCount}/${PTE_LESSONS.length}` },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#003580]/15 p-4 text-center shadow-sm">
            <s.icon className="mx-auto text-[#003580] mb-1" size={20} />
            <div className="text-xl font-bold text-[#003580]">{s.value}</div>
            <div className="text-[11px] text-slate-600">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", ...SKILLS] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              filter === s
                ? "bg-[#003580] text-white border-[#003580]"
                : "bg-white text-[#003580] border-[#003580]/25 hover:bg-[#e8eef7]"
            }`}
          >
            {s === "all" ? "All skills" : PTE_SKILL_META[s].label}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {groups.map((g) => (
          <section key={g.skill}>
            <h2 className="text-lg font-bold text-[#003580] mb-3">
              {PTE_SKILL_META[g.skill].label}
              <span className="ml-2 text-xs font-semibold text-slate-500">{g.lessons.length} lessons</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {g.lessons.map((lesson, i) => {
                const p = progress[lesson.id];
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/pte/lessons/${lesson.id}`}
                      className="block h-full bg-white rounded-2xl border border-[#003580]/15 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-[#003580] text-base leading-snug">{lesson.title}</h3>
                        {p?.passed && <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{lesson.taskTypes}</p>
                      <p className="text-sm text-slate-700 mt-2 leading-relaxed line-clamp-3">{lesson.overview}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#003580]/10 text-[#003580] font-semibold">
                          <Clock size={11} /> {lesson.minutes} min
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-semibold">
                          <Target size={11} /> Band {lesson.targetBand}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                          <ListChecks size={11} /> {lesson.quiz.length} questions
                        </span>
                        {p && !p.passed && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                            Best {p.best}/{lesson.quiz.length}
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </PteShell>
  );
};

export default PteLessons;
