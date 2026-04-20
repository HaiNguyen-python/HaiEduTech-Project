import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Session Tracker
 * Logs a "session_heartbeat" activity every minute the user is actively on the platform.
 * - Only counts time when tab is visible (document.visibilityState === "visible").
 * - Stops counting if user is idle (no mouse/keyboard activity for 5 minutes).
 * - Each heartbeat = 60 seconds of platform usage time.
 *
 * Used by Dashboard "Study Time" metric to reflect TOTAL time spent on the platform,
 * not just time spent inside specific scored exercises.
 */
const HEARTBEAT_INTERVAL_MS = 60_000; // 1 minute
const IDLE_THRESHOLD_MS = 5 * 60_000; // 5 minutes of no activity

export const useSessionTracker = () => {
  const lastActivityRef = useRef<number>(Date.now());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const markActive = () => {
      lastActivityRef.current = Date.now();
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, markActive, { passive: true }));

    const sendHeartbeat = async () => {
      if (cancelled) return;
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastActivityRef.current > IDLE_THRESHOLD_MS) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from("student_activity_log").insert({
        user_id: user.id,
        activity_type: "session_heartbeat",
        domain: "platform",
        time_spent_seconds: 60,
        score: null,
        max_score: null,
        metadata: { source: "session_tracker" },
      });
    };

    intervalRef.current = window.setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);

    return () => {
      cancelled = true;
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      events.forEach((e) => window.removeEventListener(e, markActive));
    };
  }, []);
};
