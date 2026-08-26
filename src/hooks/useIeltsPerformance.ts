/**
 * @file useIeltsPerformance.ts
 * @description Aggregates every IELTS result the student already produces
 *   (Listening, Reading, Writing, Speaking, vocabulary, speaking SRS) into one
 *   typed snapshot for the "Your IELTS Performance" dashboard. Read-only.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { readHistory as readReadingHistory } from "@/lib/ieltsReadingHistory";
import { readListeningHistory } from "@/lib/ieltsListeningHistory";
import {
  buildSkillStat, predictOverall, improvementPerWeek, readiness, rankWeaknesses,
  studyPlan, type CriteriaScore, type SkillAttempt, type SkillKey, type SkillStat,
} from "@/lib/ieltsPerformanceModel";

const SPEAKING_HISTORY_KEY = "ielts-speaking-score-history-v1";
const SPEAKING_SRS_KEY = "ielts-speaking-srs-v1";
const VOCAB_KEY = "vocab_mastered_ielts";
const TARGET_KEY = "ielts-performance-target-v1";

interface SpeakingEntry {
  ts: number;
  overall: number;
  fluency?: number;
  lexical?: number;
  grammar?: number;
  pronunciation?: number;
  part: 1 | 2 | 3;
  topic?: string;
}

interface WritingRow {
  created_at: string;
  overall_score: number | null;
  task_type: number | null;
  result: unknown;
}

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const matchWritingCriterion = (label: string): { key: string; label: string } | null => {
  const l = label.toLowerCase();
  if (l.includes("task") && (l.includes("response") || l.includes("achievement")))
    return { key: "TR", label: "Task Response" };
  if (l.includes("coher") || l.includes("cohesion")) return { key: "CC", label: "Coherence & Cohesion" };
  if (l.includes("lexical") || l.includes("vocab")) return { key: "LR", label: "Lexical Resource" };
  if (l.includes("grammat") || l.includes("grammar") || l.includes("accuracy") || l.includes("range"))
    return { key: "GR", label: "Grammatical Range & Accuracy" };
  return null;
};

export interface VocabSnapshot {
  mastered: number;
  /** null when only local data exists (no timestamps to compute the window). */
  last7: number | null;
  last30: number | null;
  dueForReview: number | null;
  lexicalBand: number | null;
  /** true when the timed metrics come from the cloud. */
  hasTimeline: boolean;
}

export interface PerformanceSnapshot {
  loading: boolean;
  signedIn: boolean;
  target: number;
  setTarget: (v: number) => void;
  stats: Record<SkillKey, SkillStat>;
  prediction: ReturnType<typeof predictOverall>;
  ready: ReturnType<typeof readiness>;
  ratePerWeek: number | null;
  criteria: CriteriaScore[];
  grammarBand: number | null;
  vocab: VocabSnapshot;
  srsDueByType: Record<string, number>;
  weaknesses: ReturnType<typeof rankWeaknesses>;
  plan: ReturnType<typeof studyPlan>;
  refresh: () => void;
}

/** Estimated lexical band from the number of mastered academic words. */
const lexicalBandFromCount = (n: number): number | null => {
  if (n <= 0) return null;
  if (n >= 900) return 8.5;
  if (n >= 700) return 8.0;
  if (n >= 550) return 7.5;
  if (n >= 400) return 7.0;
  if (n >= 260) return 6.5;
  if (n >= 150) return 6.0;
  if (n >= 70) return 5.5;
  return 5.0;
};

export function useIeltsPerformance(): PerformanceSnapshot {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [tick, setTick] = useState(0);
  const [target, setTargetState] = useState<number>(() => {
    const v = Number(localStorage.getItem(TARGET_KEY));
    return v >= 4 && v <= 9 ? v : 7.5;
  });
  const [writing, setWriting] = useState<WritingRow[]>([]);
  const [vocabCloud, setVocabCloud] = useState<VocabRow[] | null>(null);
  const [srsCloud, setSrsCloud] = useState<{ item_type: string; due_at: string; mastered: boolean }[] | null>(null);
  const [activityCloud, setActivityCloud] = useState<ActivityRow[]>([]);

  const setTarget = useCallback((v: number) => {
    setTargetState(v);
    try { localStorage.setItem(TARGET_KEY, String(v)); } catch { /* noop */ }
  }, []);

  const refresh = useCallback(() => setTick((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;
      setSignedIn(!!user);
      if (!user) {
        setWriting([]); setVocabCloud(null); setSrsCloud(null); setLoading(false);
        return;
      }
      const [w, v, s] = await Promise.all([
        supabase.from("writing_attempts")
          .select("created_at, overall_score, task_type, result")
          .eq("user_id", user.id).order("created_at", { ascending: true }).limit(60),
        supabase.from("user_vocab_mastered")
          .select("created_at, reviewed_at").eq("user_id", user.id).eq("subject", "ielts").limit(3000),
        supabase.from("speaking_srs_items")
          .select("item_type, due_at, mastered").eq("user_id", user.id).limit(500),
      ]);
      if (cancelled) return;
      setWriting((w.data as WritingRow[]) || []);
      setVocabCloud((v.data as { created_at: string; reviewed_at: string }[]) || []);
      setSrsCloud((s.data as { item_type: string; due_at: string; mastered: boolean }[]) || []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [tick]);

  const snapshot = useMemo(() => {
    // Listening + Reading come from the local-first attempt histories.
    const listeningRaw = readListeningHistory();
    const readingRaw = readReadingHistory();

    const listening: SkillAttempt[] = listeningRaw.map((h) => ({
      at: h.at, band: h.band, percent: h.percent, label: h.title,
    }));
    const reading: SkillAttempt[] = readingRaw.map((h) => ({
      at: h.at, band: h.band, percent: h.percent, label: h.title,
    }));

    // Speaking from the graded practice history (localStorage).
    const speakingRaw = readJson<SpeakingEntry[]>(SPEAKING_HISTORY_KEY, []);
    const speaking: SkillAttempt[] = speakingRaw
      .filter((e) => typeof e.overall === "number")
      .map((e) => ({ at: e.ts, band: e.overall, label: `Part ${e.part}${e.topic ? ` - ${e.topic}` : ""}` }));

    // Writing from the cloud grading log.
    const writingAttempts: SkillAttempt[] = writing
      .filter((r) => typeof r.overall_score === "number")
      .map((r) => ({
        at: new Date(r.created_at).getTime(),
        band: Number(r.overall_score),
        label: `Task ${r.task_type ?? 2}`,
      }));

    const stats: Record<SkillKey, SkillStat> = {
      listening: buildSkillStat("listening", listening),
      reading: buildSkillStat("reading", reading),
      writing: buildSkillStat("writing", writingAttempts),
      speaking: buildSkillStat("speaking", speaking),
    };

    const prediction = predictOverall(stats);
    const ratePerWeek = improvementPerWeek(stats);
    const ready = readiness(prediction.overall, target, ratePerWeek);

    // Sub-criteria averages.
    const critBuckets: Record<string, { label: string; scores: number[]; source: "writing" | "speaking" }> = {};
    writing.slice(-10).forEach((r) => {
      const res = r.result as { criteria?: { label: string; score: number }[] } | null;
      (res?.criteria || []).forEach((c) => {
        const m = matchWritingCriterion(c.label || "");
        if (!m || typeof c.score !== "number") return;
        const id = `writing-${m.key}`;
        critBuckets[id] ||= { label: m.label, scores: [], source: "writing" };
        critBuckets[id].scores.push(c.score);
      });
    });
    const spk = speakingRaw.slice(-10);
    const spkCrit: [string, string, keyof SpeakingEntry][] = [
      ["FC", "Fluency & Coherence", "fluency"],
      ["LR", "Lexical Resource", "lexical"],
      ["GR", "Grammatical Range & Accuracy", "grammar"],
      ["PR", "Pronunciation", "pronunciation"],
    ];
    spkCrit.forEach(([key, label, field]) => {
      const scores = spk.map((e) => e[field]).filter((n): n is number => typeof n === "number");
      if (!scores.length) return;
      critBuckets[`speaking-${key}`] = { label, scores, source: "speaking" };
    });

    const criteria: CriteriaScore[] = Object.entries(critBuckets).map(([id, b]) => ({
      key: id,
      label: b.label,
      score: Number((b.scores.reduce((a, c) => a + c, 0) / b.scores.length).toFixed(1)),
      source: b.source,
    })).sort((a, b) => a.score - b.score);

    const grammarScores = criteria.filter((c) => c.key.endsWith("GR")).map((c) => c.score);
    const grammarBand = grammarScores.length
      ? Number((grammarScores.reduce((a, b) => a + b, 0) / grammarScores.length).toFixed(1))
      : null;

    // Vocabulary: cloud rows carry timestamps, the local set only carries words.
    const localVocab = readJson<string[]>(VOCAB_KEY, []);
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const cloudRows = vocabCloud || [];
    const hasTimeline = cloudRows.length > 0;
    const mastered = Math.max(cloudRows.length, Array.isArray(localVocab) ? localVocab.length : 0);
    const countSince = (ms: number) =>
      cloudRows.filter((r) => now - new Date(r.created_at).getTime() <= ms).length;
    // Due = reviewed_at + the interval the SRS actually scheduled (7 days default).
    const dueForReview = cloudRows.filter((r) => {
      const base = new Date(r.reviewed_at || r.created_at).getTime();
      const interval = (r.last_interval_days && r.last_interval_days > 0 ? r.last_interval_days : 7) * day;
      return now - base > interval;
    }).length;
    const vocab: VocabSnapshot = {
      mastered,
      last7: hasTimeline ? countSince(7 * day) : null,
      last30: hasTimeline ? countSince(30 * day) : null,
      dueForReview: hasTimeline ? dueForReview : null,
      lexicalBand: lexicalBandFromCount(mastered),
      hasTimeline,
    };

    // Speaking SRS due counts grouped by weak-point type.
    const srsDueByType: Record<string, number> = {};
    const srsRows = srsCloud
      ?? readJson<{ itemType: string; dueAt: string; mastered: boolean }[]>(SPEAKING_SRS_KEY, [])
        .map((i) => ({ item_type: i.itemType, due_at: i.dueAt, mastered: i.mastered }));
    (srsRows || []).forEach((r) => {
      if (r.mastered) return;
      if (new Date(r.due_at).getTime() > now) return;
      srsDueByType[r.item_type] = (srsDueByType[r.item_type] || 0) + 1;
    });

    // Weakest listening section (parsed from set titles) and weakest reading set.
    const sectionBuckets: Record<number, number[]> = {};
    listeningRaw.forEach((h) => {
      const m = /section\s*([1-4])/i.exec(h.title) || /part\s*([1-4])/i.exec(h.title);
      if (!m) return;
      const s = Number(m[1]);
      (sectionBuckets[s] ||= []).push(h.percent);
    });
    const sectionAvgs = Object.entries(sectionBuckets)
      .map(([s, arr]) => ({ section: Number(s), percent: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) }))
      .sort((a, b) => a.percent - b.percent);
    const weakestListeningSection = sectionAvgs.length && sectionAvgs[0].percent < 85 ? sectionAvgs[0] : null;

    const sortedReading = [...readingRaw].sort((a, b) => a.percent - b.percent);
    const weakestReadingSet = sortedReading.length && sortedReading[0].percent < 85
      ? { title: sortedReading[0].title, percent: sortedReading[0].percent }
      : null;

    const weaknesses = rankWeaknesses({
      stats, prediction, target, criteria,
      vocabMastered: vocab.mastered,
      srsDueByType,
      weakestListeningSection,
      weakestReadingSet,
    });

    return {
      stats, prediction, ready, ratePerWeek, criteria, grammarBand, vocab, srsDueByType,
      weaknesses, plan: studyPlan(prediction, target),
    };
  }, [writing, vocabCloud, srsCloud, target, tick]);

  return { loading, signedIn, target, setTarget, refresh, ...snapshot };
}
