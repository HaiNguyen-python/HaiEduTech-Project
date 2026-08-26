/**
 * @file ieltsPerformanceModel.ts
 * @description Pure scoring / prediction math for the "Your IELTS Performance"
 *   dashboard. Kept free of React and data access so it stays testable.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type SkillKey = "listening" | "reading" | "writing" | "speaking";

export interface SkillAttempt {
  at: number;          // epoch ms
  band: number;        // 0-9
  percent?: number;    // accuracy where available
  label: string;       // exam / task title
}

export interface SkillStat {
  key: SkillKey;
  attempts: number;
  latest: number | null;
  best: number | null;
  avgBand: number | null;
  avgPercent: number | null;
  /** latest half average minus earlier half average (band points) */
  trend: number;
  history: SkillAttempt[];
}

export interface CriteriaScore {
  key: string;
  label: string;
  score: number;
  source: "writing" | "speaking";
}

export interface Weakness {
  id: string;
  titleVi: string;
  titleEn: string;
  detailVi: string;
  detailEn: string;
  score: number | null;
  severity: "high" | "medium" | "low";
  link: string;
  actionVi: string;
  actionEn: string;
}

/** Round to the nearest official IELTS half band. */
export const roundHalfBand = (v: number): number => Math.round(v * 2) / 2;

export const clampBand = (v: number): number => Math.min(9, Math.max(0, v));

export const mean = (nums: number[]): number | null =>
  nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null;

/** Build a SkillStat from a raw attempt list (chronological or not). */
export function buildSkillStat(key: SkillKey, raw: SkillAttempt[]): SkillStat {
  const history = [...raw].sort((a, b) => a.at - b.at);
  const bands = history.map((h) => h.band);
  const percents = history.map((h) => h.percent).filter((p): p is number => typeof p === "number");
  const half = Math.floor(history.length / 2);
  const early = mean(bands.slice(0, half || 1));
  const late = mean(bands.slice(half));
  return {
    key,
    attempts: history.length,
    latest: bands.length ? bands[bands.length - 1] : null,
    best: bands.length ? Math.max(...bands) : null,
    avgBand: mean(bands),
    avgPercent: percents.length ? Math.round(mean(percents) as number) : null,
    trend: history.length >= 4 && early != null && late != null ? Number((late - early).toFixed(2)) : 0,
    history,
  };
}

/**
 * Current band for a skill: weighted towards recent work (last 3 attempts count
 * double) so the prediction reacts to real improvement without over-reacting to
 * a single lucky test.
 */
export function currentSkillBand(stat: SkillStat): number | null {
  if (!stat.history.length) return null;
  const recent = stat.history.slice(-3).map((h) => h.band);
  const all = stat.history.map((h) => h.band);
  const weighted = ((mean(recent) as number) * 2 + (mean(all) as number)) / 3;
  return clampBand(Number(weighted.toFixed(2)));
}

export interface Prediction {
  overall: number | null;
  perSkill: Record<SkillKey, number | null>;
  confidence: "none" | "low" | "medium" | "high";
  skillsWithData: number;
  totalAttempts: number;
}

export function predictOverall(stats: Record<SkillKey, SkillStat>): Prediction {
  const perSkill = {
    listening: currentSkillBand(stats.listening),
    reading: currentSkillBand(stats.reading),
    writing: currentSkillBand(stats.writing),
    speaking: currentSkillBand(stats.speaking),
  } as Record<SkillKey, number | null>;

  const values = Object.values(perSkill).filter((v): v is number => v != null);
  const totalAttempts = (Object.values(stats) as SkillStat[]).reduce((a, s) => a + s.attempts, 0);
  const skillsWithData = values.length;

  let confidence: Prediction["confidence"] = "none";
  if (skillsWithData >= 4 && totalAttempts >= 12) confidence = "high";
  else if (skillsWithData >= 3 && totalAttempts >= 6) confidence = "medium";
  else if (skillsWithData >= 1) confidence = "low";

  return {
    overall: values.length ? roundHalfBand(mean(values) as number) : null,
    perSkill,
    confidence,
    skillsWithData,
    totalAttempts,
  };
}

/** Measured band gain per week across every skill, capped to a realistic range. */
export function improvementPerWeek(stats: Record<SkillKey, SkillStat>): number | null {
  const rates: number[] = [];
  (Object.values(stats) as SkillStat[]).forEach((s) => {
    if (s.history.length < 4) return;
    const first = s.history[0];
    const last = s.history[s.history.length - 1];
    const weeks = (last.at - first.at) / (1000 * 60 * 60 * 24 * 7);
    if (weeks < 1) return;
    rates.push((last.band - first.band) / weeks);
  });
  if (!rates.length) return null;
  const r = mean(rates) as number;
  return Math.min(0.25, Math.max(0, Number(r.toFixed(3))));
}

export interface Readiness {
  weeks: number | null;
  gap: number;
  ratePerWeek: number;
  estimated: boolean;   // true when we fell back to the default model
  ready: boolean;
}

/** Weeks until the target band, from the measured rate or a conservative default. */
export function readiness(
  predictedOverall: number | null,
  target: number,
  measuredRate: number | null,
): Readiness {
  const DEFAULT_RATE = 0.5 / 7; // 0.5 band per ~7 weeks of steady practice
  const rate = measuredRate && measuredRate > 0.01 ? measuredRate : DEFAULT_RATE;
  if (predictedOverall == null) {
    return { weeks: null, gap: target, ratePerWeek: rate, estimated: true, ready: false };
  }
  const gap = Number((target - predictedOverall).toFixed(1));
  if (gap <= 0) return { weeks: 0, gap, ratePerWeek: rate, estimated: false, ready: true };
  return {
    weeks: Math.max(1, Math.ceil(gap / rate)),
    gap,
    ratePerWeek: rate,
    estimated: !measuredRate || measuredRate <= 0.01,
    ready: false,
  };
}

const SKILL_LINKS: Record<SkillKey, string> = {
  listening: "/ielts-listening-practice",
  reading: "/ielts-reading-practice",
  writing: "/ielts-writing-practice",
  speaking: "/ielts-speaking-practice",
};

const SKILL_LABELS: Record<SkillKey, { vi: string; en: string }> = {
  listening: { vi: "Nghe", en: "Listening" },
  reading: { vi: "Đọc", en: "Reading" },
  writing: { vi: "Viết", en: "Writing" },
  speaking: { vi: "Nói", en: "Speaking" },
};

export const skillLabel = (k: SkillKey) => SKILL_LABELS[k];
export const skillLink = (k: SkillKey) => SKILL_LINKS[k];

const severityFor = (gap: number): Weakness["severity"] =>
  gap >= 1 ? "high" : gap >= 0.5 ? "medium" : "low";

export interface WeaknessInput {
  stats: Record<SkillKey, SkillStat>;
  prediction: Prediction;
  target: number;
  criteria: CriteriaScore[];
  vocabMastered: number;
  srsDueByType: Record<string, number>;
  weakestListeningSection?: { section: number; percent: number } | null;
  /** Fallback when set titles do not expose a section number. */
  weakestListeningSet?: { title: string; percent: number } | null;
  weakestReadingSet?: { title: string; percent: number } | null;

}

/** Ranked, actionable improvement list. Highest severity first. */
export function rankWeaknesses(input: WeaknessInput): Weakness[] {
  const out: Weakness[] = [];
  const { prediction, target, stats, criteria } = input;

  // 1) Skills without data - the student cannot be assessed at all.
  (Object.keys(stats) as SkillKey[]).forEach((k) => {
    if (stats[k].attempts === 0) {
      const l = SKILL_LABELS[k];
      out.push({
        id: `no-data-${k}`,
        titleVi: `Chưa có dữ liệu ${l.vi}`,
        titleEn: `No ${l.en} data yet`,
        detailVi: `Bạn chưa hoàn thành bài ${l.vi} nào nên dự đoán band chưa đầy đủ.`,
        detailEn: `You have not completed any ${l.en} task, so the prediction is incomplete.`,
        score: null,
        severity: "high",
        link: SKILL_LINKS[k],
        actionVi: `Làm 1 bài ${l.vi} để mở phần phân tích này.`,
        actionEn: `Complete one ${l.en} task to unlock this analysis.`,
      });
    }
  });

  // 2) Skills below target.
  (Object.keys(stats) as SkillKey[]).forEach((k) => {
    const band = prediction.perSkill[k];
    if (band == null) return;
    const gap = Number((target - band).toFixed(1));
    if (gap <= 0) return;
    const l = SKILL_LABELS[k];
    out.push({
      id: `skill-${k}`,
      titleVi: `${l.vi}: ${band.toFixed(1)} / mục tiêu ${target.toFixed(1)}`,
      titleEn: `${l.en}: ${band.toFixed(1)} vs target ${target.toFixed(1)}`,
      detailVi: `Còn thiếu ${gap.toFixed(1)} band. Trung bình ${stats[k].avgPercent != null ? `${stats[k].avgPercent}% câu đúng` : "chưa đủ dữ liệu"} qua ${stats[k].attempts} lượt.`,
      detailEn: `${gap.toFixed(1)} band below target. Average ${stats[k].avgPercent != null ? `${stats[k].avgPercent}% accuracy` : "not enough data"} over ${stats[k].attempts} attempts.`,
      score: band,
      severity: severityFor(gap),
      link: SKILL_LINKS[k],
      actionVi: `Luyện thêm ${l.vi} 2-3 lượt/tuần và xem lại phần giải thích đáp án.`,
      actionEn: `Practise ${l.en} 2-3 times a week and review every answer explanation.`,
    });
  });

  // 3) Sub-criteria from Writing / Speaking grading.
  criteria.forEach((c) => {
    const gap = Number((target - c.score).toFixed(1));
    if (gap <= 0) return;
    out.push({
      id: `crit-${c.source}-${c.key}`,
      titleVi: `${c.label} (${c.source === "writing" ? "Viết" : "Nói"}): ${c.score.toFixed(1)}`,
      titleEn: `${c.label} (${c.source === "writing" ? "Writing" : "Speaking"}): ${c.score.toFixed(1)}`,
      detailVi: `Tiêu chí này đang kéo band ${c.source === "writing" ? "Viết" : "Nói"} xuống ${gap.toFixed(1)} band so với mục tiêu.`,
      detailEn: `This criterion holds your ${c.source} band ${gap.toFixed(1)} below target.`,
      score: c.score,
      severity: severityFor(gap),
      link: c.source === "writing" ? "/ielts-writing-practice" : "/ielts-speaking-practice",
      actionVi: "Tập trung riêng tiêu chí này trong 5 bài kế tiếp.",
      actionEn: "Target this single criterion in your next 5 tasks.",
    });
  });

  // 4) Question-type level diagnosis where the data allows.
  if (input.weakestListeningSection) {
    const { section, percent } = input.weakestListeningSection;
    out.push({
      id: "listening-section",
      titleVi: `Listening Section ${section} yếu nhất (${percent}%)`,
      titleEn: `Listening Section ${section} is weakest (${percent}%)`,
      detailVi: "Section này thường mất điểm do distractors và thông tin bị sửa lại giữa câu.",
      detailEn: "This section usually leaks marks through distractors and corrected information.",
      score: null,
      severity: percent < 60 ? "high" : "medium",
      link: "/ielts-listening-practice",
      actionVi: `Làm lại 3 đề Section ${section} và đọc transcript sau khi chấm.`,
      actionEn: `Redo 3 Section ${section} sets and read the transcript after grading.`,
    });
  }
  if (input.weakestReadingSet) {
    const { title, percent } = input.weakestReadingSet;
    out.push({
      id: "reading-set",
      titleVi: `Đề Reading thấp nhất: ${title} (${percent}%)`,
      titleEn: `Lowest Reading set: ${title} (${percent}%)`,
      detailVi: "Xem lại dạng câu hỏi TRUE/FALSE/NOT GIVEN và Matching Headings ở đề này.",
      detailEn: "Revisit the TRUE/FALSE/NOT GIVEN and Matching Headings items in this set.",
      score: null,
      severity: percent < 60 ? "high" : "medium",
      link: "/ielts-reading-practice",
      actionVi: "Làm lại đề này và ghi lý do sai cho từng câu.",
      actionEn: "Retake this set and note why each wrong answer was wrong.",
    });
  }

  // 5) Vocabulary volume.
  const vocabTarget = target >= 7.5 ? 800 : target >= 7 ? 600 : 400;
  if (input.vocabMastered < vocabTarget) {
    out.push({
      id: "vocab-volume",
      titleVi: `Từ vựng: ${input.vocabMastered}/${vocabTarget} từ đã thuộc`,
      titleEn: `Vocabulary: ${input.vocabMastered}/${vocabTarget} words mastered`,
      detailVi: "Lexical Resource là tiêu chí chung của cả Viết và Nói, cần đủ vốn từ theo chủ đề.",
      detailEn: "Lexical Resource drives both Writing and Speaking, so topic coverage matters.",
      score: null,
      severity: input.vocabMastered < vocabTarget / 2 ? "high" : "medium",
      link: "/ielts-vocabulary",
      actionVi: "Thuộc 15 từ mới mỗi tuần và ôn lại bằng Vocab Brain.",
      actionEn: "Master 15 new words a week and review them in the Vocab Brain.",
    });
  }

  // 6) Overdue speaking SRS items.
  const dueTotal = Object.values(input.srsDueByType).reduce((a, b) => a + b, 0);
  if (dueTotal > 0) {
    const worst = Object.entries(input.srsDueByType).sort((a, b) => b[1] - a[1])[0];
    out.push({
      id: "srs-due",
      titleVi: `${dueTotal} lỗi Speaking đang chờ ôn lại`,
      titleEn: `${dueTotal} Speaking weak points are due for review`,
      detailVi: `Nhóm nhiều nhất: ${worst[0]} (${worst[1]} mục).`,
      detailEn: `Largest group: ${worst[0]} (${worst[1]} items).`,
      score: null,
      severity: dueTotal >= 10 ? "high" : "medium",
      link: "/ielts-speaking-practice",
      actionVi: "Mở Spaced Repetition Review và xử lý hết mục đến hạn.",
      actionEn: "Open Spaced Repetition Review and clear every due item.",
    });
  }

  const order = { high: 0, medium: 1, low: 2 };
  return out.sort((a, b) => order[a.severity] - order[b.severity]).slice(0, 10);
}

/** Suggested weekly practice volume per skill, weighted by the gap to target. */
export function studyPlan(
  prediction: Prediction,
  target: number,
): { key: SkillKey; sessions: number; minutes: number }[] {
  return (Object.keys(prediction.perSkill) as SkillKey[]).map((k) => {
    const band = prediction.perSkill[k];
    const gap = band == null ? 1.5 : Math.max(0, target - band);
    const sessions = gap >= 1.5 ? 4 : gap >= 1 ? 3 : gap >= 0.5 ? 2 : 1;
    const perSession = k === "writing" ? 45 : k === "speaking" ? 25 : 35;
    return { key: k, sessions, minutes: sessions * perSession };
  });
}
