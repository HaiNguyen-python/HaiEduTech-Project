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

/** Calendar date key (YYYY-MM-DD) in Vietnam time — the same day boundary the
 * server-side streak functions use (`get_user_streak`, `get_streak_leaderboard`).
 * Using the device timezone here made a student abroad skip the daily_login row
 * for a Vietnam day, which broke the streak. */
const dateKey = (d: Date = new Date()) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
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

        // 2) Compute the streak server-side over the full history.
        // (A client-side query is unreliable: heavy users have tens of thousands
        // of activity rows, so any row limit truncates the date set and caps the streak.)
        const { data: rpcStreak, error } = await supabase.rpc("get_user_streak", { _user_id: user.id });
        if (error) throw error;

        if (!cancelled) { setStreak(Number(rpcStreak) || 0); setLoading(false); }

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
