/**
 * @file pathModel.ts
 * @description Pure math for personalized learning paths: level inference,
 *   progress velocity, readiness estimate, weakness ranking and weekly plan
 *   generation. No I/O, no React - safe to unit test.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { SUBJECTS, type SubjectDef, type SubjectId, type SubjectTrack } from "./subjectRegistry";

export interface AttemptPoint {
  /** ISO timestamp. */
  at: string;
  /** Normalised score, 0-100. */
  pct: number;
  skill: string;
}

export interface SubjectSignals {
  subject: SubjectId;
  attempts: AttemptPoint[];
  vocabMastered: number;
  minutesLast7: number;
  activeDays30: number;
  dueReviews: number;
  /** Placement percentage 0-100 when the student took a placement test. */
  placementPct?: number | null;
  placementBand?: string | null;
}

export const emptySignals = (subject: SubjectId): SubjectSignals => ({
  subject, attempts: [], vocabMastered: 0, minutesLast7: 0,
  activeDays30: 0, dueReviews: 0, placementPct: null, placementBand: null,
});

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

/** Recency-weighted average of attempt percentages (newest counts double). */
export function weightedAveragePct(attempts: AttemptPoint[]): number | null {
  if (attempts.length === 0) return null;
  const sorted = [...attempts].sort((a, b) => +new Date(a.at) - +new Date(b.at));
  const recent = sorted.slice(-3);
  let sum = 0;
  let weight = 0;
  for (const a of sorted) {
    const w = recent.includes(a) ? 2 : 1;
    sum += a.pct * w;
    weight += w;
  }
  return sum / weight;
}

/**
 * Maps signals to a mastery percentage 0-100. Attempts dominate; placement
 * seeds the value when no attempt exists; vocabulary adds a small bonus so a
 * student who only studied words still moves off the floor.
 */
export function masteryPct(signals: SubjectSignals): number {
  const avg = weightedAveragePct(signals.attempts);
  const vocabBonus = clamp(signals.vocabMastered / 40, 0, 12);
  if (avg !== null) return clamp(avg * 0.88 + vocabBonus, 0, 100);
  if (signals.placementPct != null) return clamp(signals.placementPct * 0.9 + vocabBonus, 0, 100);
  return clamp(vocabBonus, 0, 100);
}

/** Current level label on the subject ladder. */
export function inferLevel(signals: SubjectSignals, def: SubjectDef = SUBJECTS[signals.subject]): string {
  const pct = masteryPct(signals);
  const idx = clamp(Math.floor((pct / 100) * def.ladder.length), 0, def.ladder.length - 1);
  return def.ladder[idx];
}

/** Mastery points gained per week, estimated from the two most recent halves. */
export function progressPerWeek(signals: SubjectSignals): number {
  const sorted = [...signals.attempts].sort((a, b) => +new Date(a.at) - +new Date(b.at));
  if (sorted.length < 4) return sorted.length >= 2 ? 1.2 : 0.8;
  const mid = Math.floor(sorted.length / 2);
  const older = sorted.slice(0, mid);
  const newer = sorted.slice(mid);
  const avg = (xs: AttemptPoint[]) => xs.reduce((s, x) => s + x.pct, 0) / xs.length;
  const weeks = Math.max(
    1,
    (+new Date(newer[newer.length - 1].at) - +new Date(older[0].at)) / (7 * 24 * 3600 * 1000),
  );
  const delta = avg(newer) - avg(older);
  return clamp(delta / weeks, 0.3, 8);
}

export interface Readiness {
  /** Weeks until the target level is reached, at the current pace. */
  weeks: number;
  /** Estimated date, ISO yyyy-mm-dd. */
  date: string;
  /** low | medium | high - confidence in the estimate. */
  confidence: "low" | "medium" | "high";
  /** Percent of the way from the start level to the target. */
  progressPct: number;
}

export function estimateReadiness(
  signals: SubjectSignals,
  targetLevel: string | null | undefined,
  def: SubjectDef = SUBJECTS[signals.subject],
  now: Date = new Date(),
): Readiness {
  const ladder = def.ladder;
  const step = 100 / ladder.length;
  const targetIdx = targetLevel ? ladder.indexOf(targetLevel) : ladder.length - 2;
  const targetPct = ((targetIdx < 0 ? ladder.length - 2 : targetIdx) + 1) * step;
  const current = masteryPct(signals);
  const gap = Math.max(0, targetPct - current);
  const pace = progressPerWeek(signals);
  const weeks = gap === 0 ? 0 : clamp(Math.ceil(gap / pace), 1, 104);
  const date = new Date(now.getTime() + weeks * 7 * 24 * 3600 * 1000);
  const confidence: Readiness["confidence"] =
    signals.attempts.length >= 6 ? "high" : signals.attempts.length >= 3 ? "medium" : "low";
  return {
    weeks,
    date: date.toISOString().slice(0, 10),
    confidence,
    progressPct: clamp(targetPct === 0 ? 0 : Math.round((current / targetPct) * 100), 0, 100),
  };
}

export interface Weakness {
  skill: string;
  /** Average percentage on that skill, null when never practised. */
  pct: number | null;
  /** 0-100, higher = needs more attention. */
  urgency: number;
  attempts: number;
}

/**
 * Ranks the skills a subject trains. Low scores raise urgency; skills that
 * were never practised are treated as a gap rather than being ignored.
 */
export function rankWeaknesses(
  signals: SubjectSignals,
  def: SubjectDef = SUBJECTS[signals.subject],
): Weakness[] {
  const skills = Array.from(new Set(def.tracks.map((t) => t.skill))).filter((s) => s !== "review");
  const rows: Weakness[] = skills.map((skill) => {
    const xs = signals.attempts.filter((a) => a.skill === skill);
    if (xs.length === 0) {
      const seeded = skill === "vocab" && signals.vocabMastered > 0;
      return { skill, pct: null, urgency: seeded ? 55 : 70, attempts: 0 };
    }
    const pct = xs.reduce((s, x) => s + x.pct, 0) / xs.length;
    const thin = xs.length <= 1 ? 8 : 0;
    return { skill, pct, urgency: clamp(Math.round(100 - pct + thin), 0, 100), attempts: xs.length };
  });
  return rows.sort((a, b) => b.urgency - a.urgency);
}

export interface PlanStep {
  trackId: string;
  kind: SubjectTrack["kind"];
  titleVi: string;
  titleEn: string;
  route: string;
  minutes: number;
  skill: string;
  priority: number;
}

/**
 * Builds this week's plan. Minutes are allocated to the weakest skills first,
 * a review item is added when SRS work is due, and the total stays within the
 * hours the student committed to.
 */
export function buildWeeklyPlan(
  signals: SubjectSignals,
  hoursPerWeek: number,
  def: SubjectDef = SUBJECTS[signals.subject],
): PlanStep[] {
  const budget = clamp(Math.round(hoursPerWeek * 60), 30, 1200);
  const weaknesses = rankWeaknesses(signals, def);
  const order = weaknesses.map((w) => w.skill);

  const pool = [...def.tracks].sort((a, b) => {
    const ai = order.indexOf(a.skill);
    const bi = order.indexOf(b.skill);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });

  const steps: PlanStep[] = [];
  let used = 0;
  let priority = 1;

  if (signals.dueReviews > 0) {
    const reviewTrack = def.tracks.find((t) => t.kind === "review")
      || def.tracks.find((t) => t.kind === "vocab");
    if (reviewTrack) {
      steps.push({
        trackId: `${reviewTrack.id}-due`,
        kind: "review",
        titleVi: `Ôn ${signals.dueReviews} mục đến hạn`,
        titleEn: `Review ${signals.dueReviews} due items`,
        route: reviewTrack.route,
        minutes: 15,
        skill: "review",
        priority: priority++,
      });
      used += 15;
    }
  }

  // Two passes so a small budget still covers the weakest skills first, and a
  // large budget repeats the top tracks instead of stopping early.
  for (let pass = 0; pass < 3 && used < budget; pass++) {
    for (const track of pool) {
      if (used + track.minutes > budget) continue;
      if (pass === 0 && steps.some((s) => s.trackId === track.id)) continue;
      const repeat = steps.filter((s) => s.trackId.startsWith(track.id)).length;
      if (repeat > pass) continue;
      const nth = repeat + 1;
      steps.push({
        trackId: repeat === 0 ? track.id : `${track.id}-${nth}`,
        kind: track.kind,
        titleVi: repeat === 0 ? track.titleVi : `${track.titleVi} (buổi ${nth})`,
        titleEn: repeat === 0 ? track.titleEn : `${track.titleEn} (session ${nth})`,
        route: track.route,
        minutes: track.minutes,
        skill: track.skill,
        priority: priority++,
      });

      used += track.minutes;
      if (steps.length >= 10) break;
    }
    if (steps.length >= 10) break;
  }

  return steps;
}

/** The single most useful next action for a subject. */
export function nextStep(steps: PlanStep[]): PlanStep | null {
  return steps.length > 0 ? steps[0] : null;
}

/** Monday of the current week, ISO yyyy-mm-dd, in Asia/Ho_Chi_Minh. */
export function currentWeekStart(now: Date = new Date()): string {
  const vn = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  const day = vn.getDay() === 0 ? 7 : vn.getDay();
  vn.setDate(vn.getDate() - (day - 1));
  return `${vn.getFullYear()}-${String(vn.getMonth() + 1).padStart(2, "0")}-${String(vn.getDate()).padStart(2, "0")}`;
}
