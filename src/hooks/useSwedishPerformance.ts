/**
 * useSwedishPerformance - aggregate Swedish learning stats client-side.
 * Fetches:
 *  - mastered Swedish word IDs (localStorage + user_vocab_mastered if signed-in)
 *  - recent activity_log entries for Swedish-related activities
 * Returns computed level, breakdown, and raw activity totals.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { computeSwedishLevel, type SwedishLevelResult, type SwedishStatsInput } from "@/lib/swedishLevelEngine";

const LS_MASTERED = "vocab_mastered_swedish";

interface Extras {
  activityCount: number;
  streakDays: number;
  onlineMinutes: number;
}

export function useSwedishPerformance() {
  const [result, setResult] = useState<SwedishLevelResult | null>(null);
  const [extras, setExtras] = useState<Extras>({ activityCount: 0, streakDays: 0, onlineMinutes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);

      // 1. Mastered IDs - local first
      const masteredIds = new Set<string>();
      try {
        const raw = localStorage.getItem(LS_MASTERED);
        if (raw) JSON.parse(raw).forEach((id: string) => masteredIds.add(id));
      } catch { /* noop */ }

      // 2. Signed-in aggregates
      const stats: SwedishStatsInput = { masteredIds, activityAccuracy: { reading: [], listening: [], speaking: [], writing: [] }, ykiScores: { speaking: [], writing: [] } };
      let activityCount = 0;
      let onlineSeconds = 0;
      const activeDays = new Set<string>();

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Mastered from DB
          const { data: dbMastered } = await (supabase as any)
            .from("user_vocab_mastered")
            .select("word")
            .eq("user_id", user.id)
            .eq("subject", "swedish")
            .limit(10000);
          (dbMastered || []).forEach((r: any) => masteredIds.add(r.word));

          // Activity log last 90d
          const since = new Date(Date.now() - 90 * 86400000).toISOString();
          const { data: acts } = await (supabase as any)
            .from("student_activity_log")
            .select("activity_type,score,max_score,time_spent_seconds,metadata,created_at")
            .eq("user_id", user.id)
            .gte("created_at", since)
            .limit(2000);

          for (const a of (acts || []) as any[]) {
            const meta = a.metadata || {};
            const isSwedish =
              a.activity_type === "speaking_coach_swedish" ||
              a.activity_type === "swedish_writing" ||
              a.activity_type === "swedish_reading" ||
              a.activity_type === "swedish_listening" ||
              a.activity_type === "swedish_vocab_review" ||
              meta.subject === "swedish" || meta.domain === "swedish" || meta.language === "swedish";
            if (!isSwedish && a.activity_type !== "session_heartbeat") continue;

            if (a.activity_type === "session_heartbeat") {
              // best-effort: count all heartbeats as generic time. Optional.
              continue;
            }

            activityCount += 1;
            activeDays.add(String(a.created_at).slice(0, 10));
            onlineSeconds += Number(a.time_spent_seconds || 0);

            const pct = a.max_score && Number(a.max_score) > 0
              ? (Number(a.score || 0) / Number(a.max_score)) * 100
              : null;

            if (a.activity_type === "speaking_coach_swedish" && pct !== null) {
              stats.activityAccuracy!.speaking!.push(pct);
            } else if (a.activity_type === "swedish_reading" && pct !== null) {
              stats.activityAccuracy!.reading!.push(pct);
            } else if (a.activity_type === "swedish_listening" && pct !== null) {
              stats.activityAccuracy!.listening!.push(pct);
            } else if (a.activity_type === "swedish_vocab_review" && pct !== null) {
              // Vocab review contributes to listening/writing depending on mode metadata
              const mode = String(meta.mode || "").toLowerCase();
              if (mode.includes("listen") || mode.includes("speed")) stats.activityAccuracy!.listening!.push(pct);
              else stats.activityAccuracy!.writing!.push(pct);
            } else if (a.activity_type === "swedish_writing" && pct !== null) {
              stats.activityAccuracy!.writing!.push(pct);
            }

            // YKI grading results stored in metadata.overall (0-5)
            const overall = Number(meta.overall);
            if (!Number.isNaN(overall) && overall > 0 && overall <= 5) {
              if (String(meta.mode).toLowerCase().includes("speak")) stats.ykiScores!.speaking!.push(overall);
              else if (String(meta.mode).toLowerCase().includes("writ")) stats.ykiScores!.writing!.push(overall);
            }
          }
        }
      } catch { /* guest path is fine */ }

      if (cancelled) return;
      const res = computeSwedishLevel(stats);
      setResult(res);
      setExtras({
        activityCount,
        streakDays: activeDays.size,
        onlineMinutes: Math.round(onlineSeconds / 60),
      });
      setLoading(false);
    };

    run();
    return () => { cancelled = true; };
  }, []);

  return { result, extras, loading };
}
