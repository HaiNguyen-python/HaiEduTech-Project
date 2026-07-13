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
 *
 * Cross-device sync: exposes a `syncVersion` counter that ticks whenever
 * a fresh server transcript is pulled (login, tab focus, visibility). The
 * ChatBot re-hydrates its local `messages` state whenever this counter
 * changes so the same account sees the same conversation on phone / iPad
 * / laptop.
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

function sameTranscript(a: ChatMsg[], b: ChatMsg[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i].role !== b[i].role || a[i].content !== b[i].content) return false;
  }
  return true;
}

export function useChatHistory(petName?: string, petLevel?: number) {
  const [userId, setUserId] = useState<string | null>(null);
  const [initial, setInitial] = useState<ChatMsg[] | null>(null);
  const [syncVersion, setSyncVersion] = useState(0);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestRef = useRef<ChatMsg[]>([]);
  const lastLoadedRef = useRef<ChatMsg[]>([]);

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

  // Hydrate saved conversation when userId changes (login/logout/switch).
  // Reset `initial` to null first so the consumer clearly sees "loading"
  // and doesn't reuse a previous account's transcript.
  useEffect(() => {
    let cancelled = false;
    setInitial(null);
    (async () => {
      if (!userId) {
        const local = readLocal(GUEST_KEY);
        if (cancelled) return;
        lastLoadedRef.current = local;
        setInitial(local);
        setSyncVersion((v) => v + 1);
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
      // Server is source of truth. Fall back to local mirror only if server
      // call failed OR server has no history yet (first-time login on a
      // device that already had guest chat).
      const chosen = error ? localBackup : (remote.length > 0 ? remote : localBackup);
      lastLoadedRef.current = chosen;
      // Keep the local mirror aligned with what we just loaded so a later
      // reload without network still shows the same conversation.
      writeLocal(userKey(userId), chosen);
      setInitial(chosen);
      setSyncVersion((v) => v + 1);
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
      // Only overwrite when remote is strictly newer/different than what we
      // currently have locally. If our in-memory transcript is longer (user
      // just typed a message that hasn't finished streaming/saving yet), keep
      // it — the debounced save will push it upstream shortly.
      if (remote.length === 0) return;
      if (remote.length < latestRef.current.length) return;
      if (sameTranscript(remote, latestRef.current)) return;
      lastLoadedRef.current = remote;
      writeLocal(userKey(userId), remote);
      setInitial(remote);
      setSyncVersion((v) => v + 1);
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
    lastLoadedRef.current = [];
    try { localStorage.removeItem(GUEST_KEY); } catch { /* ignore */ }
    if (userId) {
      try { localStorage.removeItem(userKey(userId)); } catch { /* ignore */ }
      await (supabase as any).from("chatbot_conversations").delete().eq("user_id", userId);
    }
    setInitial([]);
    setSyncVersion((v) => v + 1);
  }, [userId]);

  return { initial, persist, clear, userId, syncVersion };
}
