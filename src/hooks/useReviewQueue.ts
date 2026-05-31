/**
 * useReviewQueue - Spaced repetition queue for vocabulary modules.
 *
 * Reads `user_vocab_mastered` for the current user + subject and returns
 * the words whose `reviewed_at` is older than `staleDays` (default: 14 days),
 * sorted oldest-first so the most overdue word surfaces at the top.
 *
 * `markReviewed(word)` bumps the row's `reviewed_at` to now() and removes the
 * word from the local queue with optimistic update.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ReviewQueueItem {
  word: string;
  reviewedAt: string; // ISO timestamp
  daysOverdue: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function useReviewQueue(subject: string, staleDays = 14) {
  const [queue, setQueue] = useState<ReviewQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const userIdRef = useRef<string | null>(null);

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      userIdRef.current = null;
      setQueue([]);
      setLoading(false);
      return;
    }
    userIdRef.current = user.id;
    const threshold = new Date(Date.now() - staleDays * DAY_MS).toISOString();
    const { data, error } = await (supabase as any)
      .from("user_vocab_mastered")
      .select("word, reviewed_at")
      .eq("user_id", user.id)
      .eq("subject", subject)
      .lte("reviewed_at", threshold)
      .order("reviewed_at", { ascending: true })
      .limit(200);
    if (!error && data) {
      const now = Date.now();
      setQueue(
        data.map((r: any) => ({
          word: r.word as string,
          reviewedAt: r.reviewed_at as string,
          daysOverdue: Math.floor((now - new Date(r.reviewed_at).getTime()) / DAY_MS),
        }))
      );
    }
    setLoading(false);
  }, [subject, staleDays]);

  useEffect(() => {
    load();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
        load();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const markReviewed = useCallback(async (word: string) => {
    // Optimistic removal from local queue
    setQueue(prev => prev.filter(it => it.word !== word));
    const uid = userIdRef.current;
    if (!uid) return;
    await (supabase as any)
      .from("user_vocab_mastered")
      .update({ reviewed_at: new Date().toISOString() })
      .eq("user_id", uid)
      .eq("subject", subject)
      .eq("word", word);
  }, [subject]);

  return { queue, loading, markReviewed, reload: load };
}
