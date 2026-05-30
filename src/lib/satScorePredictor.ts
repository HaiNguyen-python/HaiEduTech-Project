/**
 * @file satScorePredictor.ts
 * @description Client-side SAT band predictor. Maps overall accuracy from
 * sat_mistakes + game_scores into an approximate Digital SAT band, with a
 * per-section breakdown and the biggest gap to next milestone.
 *
 * NOTE: This is heuristic, not an official scoring algorithm. It exists to
 * motivate students with a directional estimate ("you're around 1280–1340,
 * push Algebra +60 to break 1400").
 */
import { supabase } from "@/integrations/supabase/client";

export interface SatPrediction {
  band: [number, number]; // e.g. [1280, 1340]
  rw: number; // 200-800
  math: number; // 200-800
  total: number; // mid of band
  totalAttempts: number;
  totalCorrect: number;
  weakestType: { name: string; accuracy: number } | null;
  nextMilestone: { target: number; gap: number } | null;
  sampleSize: "low" | "ok" | "good";
}

const milestones = [1200, 1300, 1400, 1500, 1600];

const accuracyToScaled = (acc: number) => {
  // Roughly: 30% acc → 300, 60% → 540, 80% → 680, 100% → 800
  const v = 200 + Math.round(600 * Math.pow(acc, 0.85));
  return Math.max(200, Math.min(800, v));
};

export const predictSatBand = async (): Promise<SatPrediction | null> => {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return null;

  const { data: mistakes } = await supabase
    .from("sat_mistakes")
    .select("section, question_type, correct_streak")
    .eq("user_id", uid)
    .limit(500);

  const list = mistakes ?? [];
  if (list.length === 0) return null;

  // Each mistake = 1 wrong attempt; if mastered (streak >= 2) we count as recovered.
  let rwAttempts = 0, rwCorrect = 0, mathAttempts = 0, mathCorrect = 0;
  const byType: Record<string, { att: number; ok: number }> = {};

  for (const m of list) {
    const att = 1;
    const ok = (m.correct_streak ?? 0) >= 2 ? 1 : 0; // mastered after retry
    if (m.section === "math") {
      mathAttempts += att;
      mathCorrect += ok;
    } else {
      rwAttempts += att;
      rwCorrect += ok;
    }
    const key = m.question_type || "general";
    byType[key] = byType[key] || { att: 0, ok: 0 };
    byType[key].att += att;
    byType[key].ok += ok;
  }

  // Pad with "assumed correct on un-logged questions" using a conservative 70% baseline,
  // weighted by the number of logged mistakes so very few mistakes → near baseline.
  const rwAcc = rwAttempts > 0 ? Math.max(0.4, 0.7 - rwAttempts * 0.01 + rwCorrect / rwAttempts * 0.3) : 0.7;
  const mathAcc = mathAttempts > 0 ? Math.max(0.4, 0.7 - mathAttempts * 0.01 + mathCorrect / mathAttempts * 0.3) : 0.7;

  const rw = accuracyToScaled(Math.min(1, rwAcc));
  const math = accuracyToScaled(Math.min(1, mathAcc));
  const total = rw + math;
  const band: [number, number] = [Math.max(400, total - 30), Math.min(1600, total + 30)];

  let weakestType: SatPrediction["weakestType"] = null;
  for (const [k, v] of Object.entries(byType)) {
    if (v.att < 3) continue;
    const a = v.ok / v.att;
    if (!weakestType || a < weakestType.accuracy) {
      weakestType = { name: k, accuracy: a };
    }
  }

  const next = milestones.find((m) => m > total);
  const nextMilestone = next ? { target: next, gap: next - total } : null;
  const totalAttempts = rwAttempts + mathAttempts;
  const sampleSize: SatPrediction["sampleSize"] =
    totalAttempts < 20 ? "low" : totalAttempts < 60 ? "ok" : "good";

  return {
    band,
    rw,
    math,
    total,
    totalAttempts,
    totalCorrect: rwCorrect + mathCorrect,
    weakestType,
    nextMilestone,
    sampleSize,
  };
};
