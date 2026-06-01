/**
 * useChatHistory - Persist the AI Study Pet chat history per student.
 *
 * Loads the saved conversation on login and upserts the full transcript
 * (capped to the last 200 messages) after each new turn so the student
 * never loses context when closing the tab, switching device or logging
 * back in. Teachers/admins can review the same row server-side.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ChatMsg = { role: "user" | "assistant"; content: string };

const MAX_PERSIST = 200;

export function useChatHistory(petName?: string, petLevel?: number) {
  const [userId, setUserId] = useState<string | null>(null);
  const [initial, setInitial] = useState<ChatMsg[] | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Hydrate the saved conversation when the user becomes known
  useEffect(() => {
    if (!userId) { setInitial([]); return; }
    let cancelled = false;
    (async () => {
      const { data } = await (supabase as any)
        .from("chatbot_conversations")
        .select("messages")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled) return;
      const msgs = Array.isArray(data?.messages) ? data!.messages as ChatMsg[] : [];
      setInitial(msgs);
    })();
    return () => { cancelled = true; };
  }, [userId]);

  /** Persist (debounced) the latest transcript. */
  const persist = useCallback((messages: ChatMsg[]) => {
    if (!userId) return;
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

  /** Wipe the saved transcript (called from a "Clear chat" button). */
  const clear = useCallback(async () => {
    if (!userId) return;
    await (supabase as any).from("chatbot_conversations").delete().eq("user_id", userId);
    setInitial([]);
  }, [userId]);

  return { initial, persist, clear, userId };
}
