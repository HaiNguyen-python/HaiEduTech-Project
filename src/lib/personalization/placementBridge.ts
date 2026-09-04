/**
 * @file placementBridge.ts
 * @description Pure helpers that turn a placement-test outcome into a
 *   personalized learning path: which subjects the bank feeds, where the
 *   student sits on each subject ladder, the next target and the practice
 *   route for each weak skill.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { Cefr } from "@/data/placementTest";
import { SUBJECTS, type SubjectDef, type SubjectId } from "./subjectRegistry";

/** Bank slug used on /placement-test -> subjects that the result seeds. */
export const BANK_SUBJECTS: Record<string, SubjectId[]> = {
  english: ["english", "ielts", "cambridge", "toeic"],
  chinese: ["chinese"],
  vietnamese: ["vietnamese"],
  finnish: ["finnish"],
  japanese: ["japanese"],
  swedish: ["swedish"],
  programming: ["programming"],
};

export const subjectsForBank = (bank: string): SubjectId[] => BANK_SUBJECTS[bank] ?? ["english"];

/** Relative position of a CEFR band on a 0-1 scale. */
const BAND_POS: Record<Cefr, number> = {
  A1: 0.08, A2: 0.28, B1: 0.48, B2: 0.68, C1: 0.86, C2: 1,
};

/**
 * Position on a subject ladder from the placement band plus the weighted
 * score, so two students on the same band are still separated a little.
 */
export const ladderLevelFrom = (
  subject: SubjectId,
  cefr: Cefr,
  total: number,
  def: SubjectDef = SUBJECTS[subject],
): string => {
  // The band decides the rung; the score only nudges it inside the band.
  const pos = Math.max(0, Math.min(1, BAND_POS[cefr] + (total / 100 - 0.5) * 0.08));
  const index = Math.round(pos * (def.ladder.length - 1));
  return def.ladder[Math.max(0, Math.min(def.ladder.length - 1, index))];
};

/** One step up the ladder, or the top rung when already there. */
export const nextTarget = (
  subject: SubjectId,
  level: string,
  def: SubjectDef = SUBJECTS[subject],
): string => {
  const i = def.ladder.indexOf(level);
  if (i < 0) return def.ladder[Math.min(1, def.ladder.length - 1)];
  return def.ladder[Math.min(i + 1, def.ladder.length - 1)];
};

/** Default target date: three months from now, as an ISO date. */
export const defaultTargetDate = (from: Date = new Date()): string => {
  const d = new Date(from);
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().slice(0, 10);
};

export interface WeaknessLink {
  skill: string;
  pct: number;
  titleVi: string;
  titleEn: string;
  route: string;
}

/**
 * Rank the placement skill scores and attach the matching practice route of
 * the subject, so the result screen can link straight into remediation.
 */
export const weaknessLinks = (
  subject: SubjectId,
  skills: Record<string, number>,
  def: SubjectDef = SUBJECTS[subject],
): WeaknessLink[] =>
  Object.entries(skills)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([skill, pct]) => {
      const track = def.tracks.find((x) => x.skill === skill) ?? def.tracks[0];
      return {
        skill,
        pct,
        titleVi: track?.titleVi ?? def.labelVi,
        titleEn: track?.titleEn ?? def.labelEn,
        route: track?.route ?? def.hub,
      };
    });

export const DEFAULT_HOURS_PER_WEEK = 5;
export const DEFAULT_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export interface OutlineWeek {
  week: number;
  focusVi: string;
  focusEn: string;
  items: { titleVi: string; titleEn: string; route: string; minutes: number }[];
}

/**
 * Four-week study outline right after a placement test: week 1 and 2 attack the
 * two weakest skills, week 3 mixes skills, week 4 rehearses under exam
 * conditions. Each week is filled up to the weekly minute budget.
 */
export const fourWeekOutline = (
  subject: SubjectId,
  skills: Record<string, number>,
  hoursPerWeek: number,
  def: SubjectDef = SUBJECTS[subject],
): OutlineWeek[] => {
  const budget = Math.max(60, Math.round(hoursPerWeek * 60));
  const ranked = weaknessLinks(subject, skills, def);
  const tracks = def.tracks;
  const pick = (skill?: string) => {
    const first = skill ? tracks.filter((tk) => tk.skill === skill) : [];
    return first.length > 0 ? first : tracks;
  };
  const fill = (pool: typeof tracks): OutlineWeek["items"] => {
    const items: OutlineWeek["items"] = [];
    let used = 0;
    let i = 0;
    const all = [...pool, ...tracks.filter((tk) => !pool.includes(tk))];
    while (used < budget && i < all.length * 2) {
      const tk = all[i % all.length];
      if (used + tk.minutes > budget && items.length > 0) break;
      items.push({ titleVi: tk.titleVi, titleEn: tk.titleEn, route: tk.route, minutes: tk.minutes });
      used += tk.minutes;
      i += 1;
    }
    return items;
  };

  const w1 = ranked[0]?.skill;
  const w2 = ranked[1]?.skill ?? w1;
  return [
    { week: 1, focusVi: "Xây nền cho kỹ năng yếu nhất", focusEn: "Build the weakest skill", items: fill(pick(w1)) },
    { week: 2, focusVi: "Củng cố kỹ năng yếu thứ hai", focusEn: "Strengthen the second weak skill", items: fill(pick(w2)) },
    { week: 3, focusVi: "Kết hợp mọi kỹ năng và ôn từ vựng", focusEn: "Mix all skills and review vocabulary", items: fill(tracks.filter((tk) => tk.kind === "vocab" || tk.kind === "practice")) },
    { week: 4, focusVi: "Luyện như thi thật rồi tự đánh giá", focusEn: "Practise under exam conditions, then self-review", items: fill(tracks.filter((tk) => tk.kind === "practice" || tk.kind === "review")) },
  ];
};
