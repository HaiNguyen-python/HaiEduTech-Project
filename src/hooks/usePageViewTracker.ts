import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

/**
 * Page View Tracker
 * - Logs every route change to `page_view_log` (works for guests and authenticated users).
 * - Records `time_on_page_seconds` for the previous page when navigating away.
 * - Uses a stable anonymous session ID stored in localStorage so guest journeys can be analyzed.
 *
 * Mounted once globally inside <BrowserRouter> in App.tsx.
 */

const SESSION_KEY = "haiedu_anon_session";

function getSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `sess_${Date.now()}`;
  }
}

export const usePageViewTracker = () => {
  const location = useLocation();
  const enterTimeRef = useRef<number>(Date.now());
  const lastPathRef = useRef<string>("");
  const lastRowIdRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname + location.search;

    // Update time_on_page for previous row before logging the new one
    const updatePrevious = async () => {
      if (lastRowIdRef.current && lastPathRef.current) {
        const seconds = Math.round((Date.now() - enterTimeRef.current) / 1000);
        if (seconds > 0 && seconds < 60 * 60) {
          await supabase
            .from("page_view_log")
            .update({ time_on_page_seconds: seconds })
            .eq("id", lastRowIdRef.current);
        }
      }
    };

    const logView = async () => {
      try {
        await updatePrevious();

        // Use getSession (local, no network) instead of getUser (network call that
        // can stall and hold the auth lock — was blocking OAuth login completion).
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user ?? null;
        const sessionId = getSessionId();

        const { data, error } = await supabase
          .from("page_view_log")
          .insert({
            user_id: user?.id ?? null,
            session_id: sessionId,
            path: currentPath,
            title: document.title || null,
            referrer: lastPathRef.current || document.referrer || null,
            metadata: {
              isAuthenticated: !!user,
              userAgent: navigator.userAgent.slice(0, 200),
              language: navigator.language,
            },
          })
          .select("id")
          .single();

        if (!error && data) {
          lastRowIdRef.current = data.id;
          lastPathRef.current = currentPath;
          enterTimeRef.current = Date.now();
        }
      } catch (e) {
        // Silent fail — tracking should never break the app
      }
    };

    logView();
  }, [location.pathname, location.search]);

  // Flush time on unload
  useEffect(() => {
    const handleUnload = () => {
      if (!lastRowIdRef.current) return;
      const seconds = Math.round((Date.now() - enterTimeRef.current) / 1000);
      if (seconds > 0 && seconds < 60 * 60) {
        // Fire-and-forget; PostgREST PATCH via fetch with keepalive
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/page_view_log?id=eq.${lastRowIdRef.current}`;
        try {
          fetch(url, {
            method: "PATCH",
            keepalive: true,
            headers: {
              "Content-Type": "application/json",
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              Prefer: "return=minimal",
            },
            body: JSON.stringify({ time_on_page_seconds: seconds }),
          });
        } catch {
          // Ignore errors on unload
        }
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);
};
