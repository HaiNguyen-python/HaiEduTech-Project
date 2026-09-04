/**
 * @file placementModel.ts
 * @description Band-weighted placement scoring, level-block early exit and
 *   class recommendation so teachers can group students reliably.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { Cefr, PlacementQuestion, Skill } from "@/data/placementTest";

export const BAND_ORDER: Cefr[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

/** Higher bands are worth more, so guessing on easy items cannot lift a level. */
export const BAND_WEIGHT: Record<Cefr, number> = {
  A1: 1, A2: 1.4, B1: 1.9, B2: 2.5, C1: 3.2, C2: 3.6,
};

export interface BandStat {
  cefr: Cefr;
  right: number;
  total: number;
  /** 0-100 hit rate; null when the block was never reached. */
  rate: number | null;
  reached: boolean;
}

export interface ItemOutcome {
  id: number;
  skill: Skill;
  cefr: Cefr;
  /** 0-1 partial credit (dictation, cloze, rubric-graded writing/speaking). */
  credit: number;
  reached: boolean;
}

export interface PlacementOutcome {
  /** Weighted total, 0-100. */
  total: number;
  cefr: Cefr;
  skills: Record<Skill, number>;
  bands: BandStat[];
  /** Highest band where the student scored at least 60 percent. */
  highestSecureBand: Cefr | null;
  recommendedClass: string;
  confidence: "high" | "medium" | "low";
  weakestAreas: string[];
  notes: string[];
}

/** Blocks run easiest → hardest so a weak student can stop early. */
export const bandBlocks = (bank: PlacementQuestion[]): Cefr[] => {
  const present = new Set(bank.map(q => q.cefr));
  return BAND_ORDER.filter(b => present.has(b));
};

/** Order a bank into level blocks, keeping skills mixed inside each block. */
export const orderByBand = (bank: PlacementQuestion[]): PlacementQuestion[] => {
  const blocks = bandBlocks(bank);
  const out: PlacementQuestion[] = [];
  const skillOrder: Skill[] = ["listening", "reading", "writing", "speaking"];
  for (const band of blocks) {
    const items = bank.filter(q => q.cefr === band);
    // Interleave skills so each block feels like a mini exam section.
    const buckets = skillOrder.map(s => items.filter(q => q.skill === s));
    let added = 0;
    let pos = 0;
    while (added < items.length) {
      const bucket = buckets[pos % buckets.length];
      const next = bucket.shift();
      if (next) { out.push(next); added += 1; }
      pos += 1;
    }
  }
  return out;
};

/** Minimum block hit rate (0-1) needed to unlock the next level block. */
export const BLOCK_PASS_RATE = 0.4;

/**
 * Decide whether the next band block should be shown. Called after a block is
 * completed, so beginners stop early instead of guessing through C1 items.
 */
export const shouldContinue = (blockCredit: number, blockTotal: number): boolean =>
  blockTotal === 0 ? true : blockCredit / blockTotal >= BLOCK_PASS_RATE;

const SKILL_LABELS: Record<Skill, string> = {
  listening: "Listening", reading: "Reading", writing: "Writing", speaking: "Speaking",
};

/**
 * Class name per band and per subject bank. The English list stays the source
 * of truth for the English/IELTS pathway; every other language uses its own
 * ladder wording so teachers see a class they actually run.
 */
export const CLASS_BY_SUBJECT: Record<string, Record<Cefr, string>> = {
  chinese: {
    A1: "Chinese Foundation (HSK 1)",
    A2: "Chinese Elementary (HSK 2)",
    B1: "Chinese Intermediate (HSK 3)",
    B2: "Chinese Upper-Intermediate (HSK 4)",
    C1: "Chinese Advanced (HSK 5-6)",
    C2: "Chinese Advanced (HSK 5-6)",
  },
  vietnamese: {
    A1: "Vietnamese for Beginners (A1)",
    A2: "Vietnamese Elementary (A2)",
    B1: "Vietnamese Intermediate (B1)",
    B2: "Vietnamese Upper-Intermediate (B2)",
    C1: "Vietnamese Advanced (C1)",
    C2: "Vietnamese Advanced (C1)",
  },
  finnish: {
    A1: "Finnish Starter (A1)",
    A2: "Finnish YKI A2 Prep",
    B1: "Finnish YKI B1 Prep",
    B2: "Finnish YKI B2 Prep",
    C1: "Finnish Advanced (C1)",
    C2: "Finnish Advanced (C1)",
  },
  japanese: {
    A1: "Japanese Foundation (JLPT N5)",
    A2: "Japanese Elementary (JLPT N4)",
    B1: "Japanese Intermediate (JLPT N3)",
    B2: "Japanese Upper-Intermediate (JLPT N2)",
    C1: "Japanese Advanced (JLPT N1)",
    C2: "Japanese Advanced (JLPT N1)",
  },
  swedish: {
    A1: "Swedish Starter (A1)",
    A2: "Swedish Elementary (A2)",
    B1: "Swedish Intermediate (B1)",
    B2: "Swedish Upper-Intermediate (B2)",
    C1: "Swedish Advanced (C1)",
    C2: "Swedish Advanced (C1)",
  },
};

/** Resolve the class name for a band inside a given subject bank. */
export const classForSubject = (subject: string, cefr: Cefr): string =>
  (CLASS_BY_SUBJECT[subject] ?? CLASS_BY_BAND)[cefr];

const CLASS_BY_BAND: Record<Cefr, string> = {
  A1: "English Foundation (A1)",
  A2: "Pre-Intermediate (A2)",
  B1: "Intermediate (B1)",
  B2: "Upper-Intermediate (B2) / IELTS 6.0+",
  C1: "Advanced (C1) / IELTS 7.0+",
  C2: "Advanced (C1) / IELTS 7.0+",
};

export const bandFromWeighted = (total: number, highestSecure: Cefr | null): Cefr => {
  const byScore: Cefr =
    total >= 85 ? "C1" :
    total >= 70 ? "B2" :
    total >= 52 ? "B1" :
    total >= 32 ? "A2" : "A1";
  if (!highestSecure) return byScore;
  // Never place a student above the highest band they actually handled.
  const capped = BAND_ORDER.indexOf(byScore) > BAND_ORDER.indexOf(highestSecure)
    ? highestSecure : byScore;
  return capped;
};

/** Compute the full placement outcome from per-item credit. */
export const buildOutcome = (
  outcomes: ItemOutcome[],
  subject = "english",
): PlacementOutcome => {
  const reached = outcomes.filter(o => o.reached);

  const skills = {} as Record<Skill, number>;
  (["listening", "reading", "writing", "speaking"] as Skill[]).forEach((s) => {
    const items = reached.filter(o => o.skill === s);
    const w = items.reduce((sum, o) => sum + BAND_WEIGHT[o.cefr], 0);
    const got = items.reduce((sum, o) => sum + o.credit * BAND_WEIGHT[o.cefr], 0);
    skills[s] = w === 0 ? 0 : Math.round((got / w) * 100);
  });

  const bands: BandStat[] = BAND_ORDER
    .filter(b => outcomes.some(o => o.cefr === b))
    .map((b) => {
      const items = outcomes.filter(o => o.cefr === b);
      const seen = items.filter(o => o.reached);
      const credit = seen.reduce((s, o) => s + o.credit, 0);
      return {
        cefr: b,
        right: Math.round(credit * 10) / 10,
        total: items.length,
        rate: seen.length === 0 ? null : Math.round((credit / seen.length) * 100),
        reached: seen.length > 0,
      };
    });

  // Weighted total across every item in the bank; unreached items count as 0
  // for the higher bands but never below the level the student demonstrated.
  const weightAll = reached.reduce((s, o) => s + BAND_WEIGHT[o.cefr], 0);
  const gotAll = reached.reduce((s, o) => s + o.credit * BAND_WEIGHT[o.cefr], 0);
  const rawTotal = weightAll === 0 ? 0 : (gotAll / weightAll) * 100;

  const secure = [...bands].reverse().find(b => b.reached && (b.rate ?? 0) >= 60);
  const highestSecureBand = secure?.cefr ?? null;

  // Scale by how far up the ladder the student got so an A1-only run cannot
  // score 100 overall.
  const blocks = bands.length;
  const reachedBlocks = bands.filter(b => b.reached).length;
  const coverage = blocks === 0 ? 1 : Math.max(0.45, reachedBlocks / blocks);
  const total = Math.round(rawTotal * coverage);

  const cefr = bandFromWeighted(total, highestSecureBand);

  const weakestAreas = (Object.entries(skills) as Array<[Skill, number]>)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .filter(([, v]) => v < 75)
    .map(([s, v]) => `${SKILL_LABELS[s]} (${v}/100)`);

  const spread = Math.max(...Object.values(skills)) - Math.min(...Object.values(skills));
  const confidence: PlacementOutcome["confidence"] =
    reached.length < 12 ? "low" : spread > 45 ? "medium" : "high";

  const notes: string[] = [];
  if (reachedBlocks < blocks) {
    notes.push(`Stopped after the ${bands.filter(b => b.reached).slice(-1)[0]?.cefr ?? "A1"} block - higher levels were not needed.`);
  }
  if (spread > 45) {
    notes.push("Skills are uneven, so a short interview is recommended before final placement.");
  }
  if (skills.speaking < 45 && skills.reading > 70) {
    notes.push("Strong on paper but weak in speaking - prioritise an oral-focused class.");
  }

  return {
    total,
    cefr,
    skills,
    bands,
    highestSecureBand,
    recommendedClass: classForSubject(subject, cefr),
    confidence,
    weakestAreas,
    notes,
  };
};

/** Class list shown to teachers, aligned with the recommendation above. */
export const RECOMMENDED_CLASSES = [
  "English Foundation (A1)",
  "Pre-Intermediate (A2)",
  "Intermediate (B1)",
  "Upper-Intermediate (B2) / IELTS 6.0+",
  "Advanced (C1) / IELTS 7.0+",
];
