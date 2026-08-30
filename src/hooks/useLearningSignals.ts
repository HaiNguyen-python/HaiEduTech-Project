/**
 * @file useLearningSignals.ts
 * @description Aggregates real learning signals per subject from the sources
 *   the platform already writes to. Guests get an empty (never crashing) set.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  SUBJECT_IDS, skillOfActivity, subjectOfActivity, subjectOfVocab, type SubjectId,
} from "@/lib/personalization/subjectRegistry";
import { emptySignals, type SubjectSignals } from "@/lib/personalization/pathModel";

const IGNORED = new Set(["session_heartbeat", "daily_login", "page_view"]);
const DAY = 24 * 3600 * 1000;

export type SignalMap = Record<SubjectId, SubjectSignals>;

const blankMap = (): SignalMap => {
  const map = {} as SignalMap;
  for (const id of SUBJECT_IDS) map[id] = emptySignals(id);
  return map;
};

export function useLearningSignals() {
  const [userId, setUserId] = useState<string | null>(null);
  const [signals, setSignals] = useState<SignalMap>(blankMap);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth.user?.id ?? null;
    setUserId(uid);
    if (!uid) {
      setSignals(blankMap());
      setLoading(false);
      return;
    }

    const since = new Date(Date.now() - 120 * DAY).toISOString();
    const [
      acts, vocab, placements, speakingSrs, vocabSrs,
      writing, pte, sat, hskSrs, ieltsLect, toeicLect, hskk, hskWriting,
    ] = await Promise.all([
      supabase
        .from("student_activity_log")
        .select("activity_type, score, max_score, time_spent_seconds, created_at")
        .eq("user_id", uid)
        .gte("created_at", since)
        .order("created_at", { ascending: true })
        .limit(3000),
      supabase.from("user_vocab_mastered").select("subject").eq("user_id", uid).limit(20000),
      supabase
        .from("placement_test_results")
        .select("answers, cefr_band, total_score, created_at")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(20),
      supabase.from("speaking_srs_items").select("due_at").eq("user_id", uid).limit(2000),
      supabase.from("vocab_srs_state").select("subject, due_date").eq("user_id", uid).limit(5000),
      supabase.from("writing_attempts").select("overall_score, created_at").eq("user_id", uid)
        .gte("created_at", since).limit(500),
      supabase.from("pte_attempts").select("skill, score, max_score, created_at").eq("user_id", uid)
        .gte("created_at", since).limit(500),
      supabase.from("sat_mistakes").select("section, correct_streak, mastered_at, created_at")
        .eq("user_id", uid).gte("created_at", since).limit(1000),
      supabase.from("hsk_srs_progress").select("next_review").eq("user_id", uid).limit(3000),
      supabase.from("ielts_lecture_progress").select("is_completed").eq("user_id", uid)
        .eq("is_completed", true).limit(2000),
      supabase.from("toeic_lecture_progress").select("is_completed").eq("user_id", uid)
        .eq("is_completed", true).limit(2000),
      supabase.from("hskk_attempts").select("scores, created_at").eq("user_id", uid)
        .gte("created_at", since).limit(300),
      supabase.from("hsk_writing_attempts").select("grade, created_at").eq("user_id", uid)
        .gte("created_at", since).limit(300),
    ]);

    const map = blankMap();
    const now = Date.now();
    const activeDays: Record<string, Set<string>> = {};

    for (const row of acts.data ?? []) {
      if (IGNORED.has(row.activity_type)) continue;
      const subject = subjectOfActivity(row.activity_type);
      if (!subject) continue;
      const target = map[subject];
      const max = row.max_score && row.max_score > 0 ? row.max_score : 10;
      const pct = Math.max(0, Math.min(100, ((row.score ?? 0) / max) * 100));
      target.attempts.push({ at: row.created_at, pct, skill: skillOfActivity(row.activity_type) });

      const ts = +new Date(row.created_at);
      if (now - ts <= 7 * DAY) target.minutesLast7 += Math.round((row.time_spent_seconds ?? 0) / 60);
      if (now - ts <= 30 * DAY) {
        activeDays[subject] = activeDays[subject] ?? new Set();
        activeDays[subject].add(row.created_at.slice(0, 10));
      }
    }
    for (const id of SUBJECT_IDS) map[id].activeDays30 = activeDays[id]?.size ?? 0;

    for (const row of vocab.data ?? []) {
      const subject = subjectOfVocab(row.subject ?? "");
      if (subject) map[subject].vocabMastered += 1;
    }

    for (const row of placements.data ?? []) {
      const answers = (row.answers ?? {}) as Record<string, unknown>;
      const bankSubject = String(answers.__subject ?? "english");
      const targets: SubjectId[] =
        bankSubject === "english" ? ["english", "ielts", "cambridge", "toeic", "sat", "pte"]
        : bankSubject === "chinese" ? ["chinese"]
        : bankSubject === "vietnamese" ? ["vietnamese"]
        : bankSubject === "finnish" ? ["finnish"]
        : bankSubject === "programming" ? ["programming"]
        : [];
      for (const id of targets) {
        if (map[id].placementPct != null) continue; // keep the most recent run
        map[id].placementPct = Math.max(0, Math.min(100, row.total_score ?? 0));
        map[id].placementBand = row.cefr_band ?? null;
      }
    }

    const dueSpeaking = (speakingSrs.data ?? []).filter(
      (r) => !r.due_at || +new Date(r.due_at) <= now,
    ).length;
    map.ielts.dueReviews += dueSpeaking;

    for (const row of vocabSrs.data ?? []) {
      const subject = subjectOfVocab(row.subject ?? "");
      if (!subject) continue;
      if (!row.due_date || +new Date(row.due_date) <= now) map[subject].dueReviews += 1;
    }

    setSignals(map);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => void load());
    const onFocus = () => void load();
    window.addEventListener("focus", onFocus);
    return () => {
      sub.subscription.unsubscribe();
      window.removeEventListener("focus", onFocus);
    };
  }, [load]);

  return { userId, signals, loading, reload: load };
}
