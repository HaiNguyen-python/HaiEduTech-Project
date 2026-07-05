/**
 * useChatHistory - Persist the AI Study Pet chat history per student.
 *
 * Loads the saved conversation on login and upserts the full transcript
 * (capped to the last 200 messages) after each new turn so the student
 * never loses context when closing the tab, switching device or logging
 * back in. Teachers/admins can review the same row server-side.
 *
 * Also mirrors to localStorage so guests (and logged-in users between
 * debounced writes / network failures) never lose their conversation.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ChatMsg = { role: "user" | "assistant"; content: string };

const MAX_PERSIST = 200;
const GUEST_KEY = "chatbot-history-guest";
const userKey = (uid: string) => `chatbot-history-${uid}`;

function readLocal(key: string): ChatMsg[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ChatMsg[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(key: string, messages: ChatMsg[]) {
  try {
    localStorage.setItem(key, JSON.stringify(messages.slice(-MAX_PERSIST)));
  } catch {
    // quota or disabled storage — ignore
  }
}

export function useChatHistory(petName?: string, petLevel?: number) {
  const [userId, setUserId] = useState<string | null>(null);
  const [initial, setInitial] = useState<ChatMsg[] | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestRef = useRef<ChatMsg[]>([]);

  // Resolve auth user
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUserId(data.user?.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  // Hydrate the saved conversation when the user becomes known.
  // Prefer the server transcript; fall back to localStorage so guests and
  // users on flaky networks still see their previous messages.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!userId) {
        // Guest: local-only history
        setInitial(readLocal(GUEST_KEY));
        return;
      }
      const localBackup = readLocal(userKey(userId));
      const { data, error } = await (supabase as any)
        .from("chatbot_conversations")
        .select("messages")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled) return;
      const remote = Array.isArray(data?.messages) ? (data!.messages as ChatMsg[]) : [];
      // Server is the source of truth so the same account sees the same
      // conversation on iPhone / iPad / desktop. Fall back to the local
      // mirror only if the server call failed OR the server has no history
      // yet (first-time login on a device that already had guest chat).
      const chosen = error ? localBackup : (remote.length > 0 ? remote : localBackup);
      setInitial(chosen);

    })();
    return () => { cancelled = true; };
  }, [userId]);

  // Cross-device sync: when the tab becomes visible again (e.g. user switches
  // from iPhone to iPad), refetch the server transcript so both devices show
  // the same conversation instead of a stale local copy.
  useEffect(() => {
    if (!userId) return;
    const refresh = async () => {
      if (document.visibilityState !== "visible") return;
      const { data } = await (supabase as any)
        .from("chatbot_conversations")
        .select("messages")
        .eq("user_id", userId)
        .maybeSingle();
      const remote = Array.isArray(data?.messages) ? (data!.messages as ChatMsg[]) : [];
      if (remote.length > latestRef.current.length) {
        writeLocal(userKey(userId), remote);
        setInitial(remote);
      }
    };
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [userId]);


  /** Persist (debounced server, immediate localStorage) the latest transcript. */
  const persist = useCallback((messages: ChatMsg[]) => {
    latestRef.current = messages;
    // Immediate local mirror so nothing is lost on reload / tab close
    writeLocal(userId ? userKey(userId) : GUEST_KEY, messages);
    if (!userId) return; // guests stay local-only

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const trimmed = messages.slice(-MAX_PERSIST);
      await (supabase as any)
        .from("chatbot_conversations")
        .upsert(
          {
            user_id: userId,
            messages: trimmed,
            message_count: trimmed.length,
            pet_name: petName ?? null,
            pet_level: petLevel ?? null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
    }, 800);
  }, [userId, petName, petLevel]);

  // Flush pending debounce when the tab is hidden / closed so the very last
  // turn always reaches the server even if the user navigates away quickly.
  useEffect(() => {
    const flush = () => {
      if (!userId) return;
      const messages = latestRef.current;
      if (!messages.length) return;
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
        saveTimer.current = null;
      }
      const trimmed = messages.slice(-MAX_PERSIST);
      // Fire-and-forget; supabase-js queues this through fetch keepalive.
      void (supabase as any)
        .from("chatbot_conversations")
        .upsert(
          {
            user_id: userId,
            messages: trimmed,
            message_count: trimmed.length,
            pet_name: petName ?? null,
            pet_level: petLevel ?? null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
    };
    const onVis = () => { if (document.visibilityState === "hidden") flush(); };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [userId, petName, petLevel]);

  /** Wipe the saved transcript (called from a "Clear chat" button). */
  const clear = useCallback(async () => {
    latestRef.current = [];
    try { localStorage.removeItem(GUEST_KEY); } catch { /* ignore */ }
    if (userId) {
      try { localStorage.removeItem(userKey(userId)); } catch { /* ignore */ }
      await (supabase as any).from("chatbot_conversations").delete().eq("user_id", userId);
    }
    setInitial([]);
  }, [userId]);

  return { initial, persist, clear, userId };
}
