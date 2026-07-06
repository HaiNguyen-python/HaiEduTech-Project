/**
 * @file useStreak.ts
 * @description Tracks the user's consecutive-day login streak. On mount, ensures
 * a "daily_login" row is inserted into student_activity_log once per local day so
 * Dashboard + leaderboard streak calculations work even if the student only logs
 * in to read content. Returns the current streak (consecutive days ending today
 * or yesterday).
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** Local calendar date key (YYYY-MM-DD) — uses the browser's timezone
 * so a study session late at night doesn't get bucketed into "yesterday"
 * (which was the root cause of false "N ngày chưa học" alerts). */
const dateKey = (d: Date = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const todayKey = () => dateKey();

export function useStreak(enabled = true) {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setStreak(0);
      setLoading(false);
      return;
    }
    let cancelled = false;

    const run = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession(); const user = session?.user ?? null;
        if (!user) {
          if (!cancelled) { setStreak(0); setLoading(false); }
          return;
        }

        // 1) Insert today's login marker if not already present (per local day).
        const lastKey = `streak-login-${user.id}`;
        const lastLogged = localStorage.getItem(lastKey);
        const today = todayKey();
        if (lastLogged !== today) {
          await supabase.from("student_activity_log").insert({
            user_id: user.id,
            activity_type: "daily_login",
            score: 0,
            max_score: 0,
            domain: "english",
            metadata: { source: "navbar" },
          });
          localStorage.setItem(lastKey, today);
        }

        // 2) Fetch recent activity dates and compute streak ending today/yesterday.
        const since = new Date();
        since.setDate(since.getDate() - 400);
        const { data, error } = await supabase
          .from("student_activity_log")
          .select("created_at")
          .eq("user_id", user.id)
          .gte("created_at", since.toISOString())
          .order("created_at", { ascending: false })
          .limit(1000);
        if (error) throw error;

        const dateSet = new Set(
          (data || []).map((r) => dateKey(new Date(r.created_at)))
        );

        let count = 0;
        const cursor = new Date();
        // Allow streak to start from today OR yesterday (timezone tolerant).
        if (!dateSet.has(dateKey(cursor))) {
          cursor.setDate(cursor.getDate() - 1);
          if (!dateSet.has(dateKey(cursor))) {
            if (!cancelled) { setStreak(0); setLoading(false); }
            return;
          }
        }
        for (let i = 0; i < 400; i++) {
          if (dateSet.has(dateKey(cursor))) {
            count++;
            cursor.setDate(cursor.getDate() - 1);
          } else {
            break;
          }
        }

        if (!cancelled) { setStreak(count); setLoading(false); }
      } catch (e) {
        console.error("useStreak error:", e);
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [enabled]);

  return { streak, loading };
}
