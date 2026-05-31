/**
 * @file satTeachingSequence.ts
 * @description Builds a flat, ordered list of every SAT lesson across all
 * SAT modules so the SAT Curriculum page can be taught as a single
 * continuous series (Lesson 1, 2, 3 … N) without the teacher needing to
 * pick a module / lesson at each step.
 *
 * The order matches the visual order on /sat-curriculum: modules in the
 * order they appear in `allEnglishModules`, and inside each module lessons
 * are sorted by difficulty (beginner → intermediate → advanced) then by
 * their original index - exactly the same sort SatCurriculum applies.
 */
import { allEnglishModules } from "@/data/languageCurriculum";

const DIFFICULTY_ORDER: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

export interface SatTeachingStop {
  moduleId: string;
  lessonId: string;
  moduleTitle: string;
  moduleTitleEn: string;
  moduleIcon: string;
  lessonTitle: string;
  lessonTitleEn: string;
}

export const satTeachingSequence: SatTeachingStop[] = (() => {
  const out: SatTeachingStop[] = [];
  const satModules = allEnglishModules.filter((m) => m.category === "sat");
  for (const mod of satModules) {
    const lessons = [...mod.lessons].sort((a, b) => {
      const da = DIFFICULTY_ORDER[a.difficulty ?? "advanced"] ?? 99;
      const db = DIFFICULTY_ORDER[b.difficulty ?? "advanced"] ?? 99;
      if (da !== db) return da - db;
      return (a.level ?? 0) - (b.level ?? 0);
    });
    for (const l of lessons) {
      out.push({
        moduleId: mod.id,
        lessonId: l.id,
        moduleTitle: mod.title,
        moduleTitleEn: mod.titleEn,
        moduleIcon: mod.icon,
        lessonTitle: l.title,
        lessonTitleEn: l.titleEn,
      });
    }
  }
  return out;
})();

export const findSatSequenceIndex = (moduleId?: string, lessonId?: string) => {
  if (!moduleId || !lessonId) return -1;
  return satTeachingSequence.findIndex(
    (s) => s.moduleId === moduleId && s.lessonId === lessonId,
  );
};

export const satSequenceUrl = (index: number) => {
  const stop = satTeachingSequence[index];
  if (!stop) return "/sat-curriculum";
  return `/english/learn/${stop.moduleId}/${stop.lessonId}?seq=sat`;
};
