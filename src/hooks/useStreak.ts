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

const todayKey = () => new Date().toISOString().split("T")[0];

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
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
          (data || []).map((r) => new Date(r.created_at).toISOString().split("T")[0])
        );

        let count = 0;
        const cursor = new Date();
        // Allow streak to start from today OR yesterday (timezone tolerant).
        if (!dateSet.has(cursor.toISOString().split("T")[0])) {
          cursor.setDate(cursor.getDate() - 1);
          if (!dateSet.has(cursor.toISOString().split("T")[0])) {
            if (!cancelled) { setStreak(0); setLoading(false); }
            return;
          }
        }
        for (let i = 0; i < 400; i++) {
          const k = cursor.toISOString().split("T")[0];
          if (dateSet.has(k)) {
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
  }, []);

  return { streak, loading };
}
