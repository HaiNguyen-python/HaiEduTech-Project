/**
 * @file useSpeakingSrs.ts
 * @description Spaced repetition store for IELTS Speaking weak points.
 *   Signed-in students are stored in `speaking_srs_items`; guests fall back to
 *   localStorage using the same shape, and the local queue is pushed to the
 *   cloud on the next sign-in.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  extractSpeakingSrsDrafts,
  nextDueAt,
  normalizeSrsKey,
  SRS_INTERVAL_DAYS,
  type GradedSpeakingLike,
  type SpeakingSrsDraft,
  type SpeakingSrsType,
} from "@/lib/speakingSrsExtract";

export interface SpeakingSrsItem {
  id: string;
  itemType: SpeakingSrsType;
  content: string;
  contentKey: string;
  target?: string | null;
  tip?: string | null;
  part?: number | null;
  topic?: string | null;
  questionId?: string | null;
  stage: number;
  dueAt: string;
  attempts: number;
  mastered: boolean;
}

const LOCAL_KEY = "ielts-speaking-srs-v1";
const MAX_STAGE = SRS_INTERVAL_DAYS.length; // stage 3 => mastered

const readLocal = (): SpeakingSrsItem[] => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as SpeakingSrsItem[]) : [];
  } catch {
    return [];
  }
};

const writeLocal = (items: SpeakingSrsItem[]) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items.slice(-200)));
  } catch {
    /* ignore quota errors */
  }
};

const fromRow = (row: any): SpeakingSrsItem => ({
  id: row.id,
  itemType: row.item_type,
  content: row.content,
  contentKey: row.content_key,
  target: row.target,
  tip: row.tip,
  part: row.part,
  topic: row.topic,
  questionId: row.question_id,
  stage: row.stage ?? 0,
  dueAt: row.due_at,
  attempts: row.attempts ?? 0,
  mastered: !!row.mastered,
});

const draftToLocalItem = (d: SpeakingSrsDraft): SpeakingSrsItem => ({
  id: `local-${d.itemType}-${d.contentKey}`,
  itemType: d.itemType,
  content: d.content,
  contentKey: d.contentKey,
  target: d.target ?? null,
  tip: d.tip ?? null,
  part: d.part ?? null,
  topic: d.topic ?? null,
  questionId: d.questionId ?? null,
  stage: 0,
  dueAt: new Date().toISOString(),
  attempts: 0,
  mastered: false,
});

export function useSpeakingSrs() {
  const [items, setItems] = useState<SpeakingSrsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const userIdRef = useRef<string | null>(null);

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    userIdRef.current = user?.id ?? null;
    if (!user) {
      setItems(readLocal());
      setLoading(false);
      return;
    }
    // Push any guest-mode items to the cloud once, then clear them locally.
    const pending = readLocal();
    if (pending.length) {
      await (supabase as any).from("speaking_srs_items").upsert(
        pending.map((it) => ({
          user_id: user.id,
          item_type: it.itemType,
          content: it.content,
          content_key: it.contentKey,
          target: it.target,
          tip: it.tip,
          part: it.part,
          topic: it.topic,
          question_id: it.questionId,
          stage: it.stage,
          due_at: it.dueAt,
        })),
        { onConflict: "user_id,item_type,content_key" }
      );
      writeLocal([]);
    }
    const { data, error } = await (supabase as any)
      .from("speaking_srs_items")
      .select("*")
      .eq("user_id", user.id)
      .order("due_at", { ascending: true })
      .limit(300);
    if (!error && data) setItems(data.map(fromRow));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") load();
    });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  /** Collect weak points from a fresh grading result into the review queue. */
  const addFromResult = useCallback(
    async (result: GradedSpeakingLike, ctx: { part?: number; topic?: string; questionId?: string }) => {
      const drafts = extractSpeakingSrsDrafts(result, ctx);
      if (!drafts.length) return 0;
      const uid = userIdRef.current;

      if (!uid) {
        setItems((prev) => {
          const map = new Map(prev.map((it) => [`${it.itemType}:${it.contentKey}`, it]));
          for (const d of drafts) {
            const key = `${d.itemType}:${d.contentKey}`;
            const existing = map.get(key);
            if (existing) {
              // A repeated mistake becomes due again today.
              map.set(key, { ...existing, dueAt: new Date().toISOString(), mastered: false, stage: 0, attempts: existing.attempts + 1 });
            } else {
              map.set(key, draftToLocalItem(d));
            }
          }
          const next = Array.from(map.values());
          writeLocal(next);
          return next;
        });
        return drafts.length;
      }

      const nowIso = new Date().toISOString();
      await (supabase as any).from("speaking_srs_items").upsert(
        drafts.map((d) => ({
          user_id: uid,
          item_type: d.itemType,
          content: d.content,
          content_key: d.contentKey,
          target: d.target ?? null,
          tip: d.tip ?? null,
          part: d.part ?? null,
          topic: d.topic ?? null,
          question_id: d.questionId ?? null,
          stage: 0,
          due_at: nowIso,
          mastered: false,
        })),
        { onConflict: "user_id,item_type,content_key" }
      );
      await load();
      return drafts.length;
    },
    [load]
  );

  const persist = useCallback(async (item: SpeakingSrsItem, patch: Partial<SpeakingSrsItem>) => {
    const merged = { ...item, ...patch };
    setItems((prev) => {
      const next = prev.map((it) => (it.id === item.id ? merged : it));
      if (!userIdRef.current) writeLocal(next);
      return next;
    });
    if (!userIdRef.current) return;
    await (supabase as any)
      .from("speaking_srs_items")
      .update({
        stage: merged.stage,
        due_at: merged.dueAt,
        attempts: merged.attempts,
        mastered: merged.mastered,
        last_reviewed_at: new Date().toISOString(),
      })
      .eq("id", item.id);
  }, []);

  /** Student handled it well -> move up the 1 / 3 / 7 day ladder. */
  const promote = useCallback(
    (item: SpeakingSrsItem) => {
      const stage = item.stage + 1;
      const mastered = stage >= MAX_STAGE;
      return persist(item, {
        stage: Math.min(stage, MAX_STAGE),
        mastered,
        attempts: item.attempts + 1,
        dueAt: mastered ? item.dueAt : nextDueAt(stage),
      });
    },
    [persist]
  );

  /** Still shaky -> back to the 1 day step. */
  const resetItem = useCallback(
    (item: SpeakingSrsItem) =>
      persist(item, { stage: 0, mastered: false, attempts: item.attempts + 1, dueAt: nextDueAt(0) }),
    [persist]
  );

  const removeItem = useCallback(async (item: SpeakingSrsItem) => {
    setItems((prev) => {
      const next = prev.filter((it) => it.id !== item.id);
      if (!userIdRef.current) writeLocal(next);
      return next;
    });
    if (userIdRef.current) {
      await (supabase as any).from("speaking_srs_items").delete().eq("id", item.id);
    }
  }, []);

  const now = Date.now();
  const due = items.filter((it) => !it.mastered && new Date(it.dueAt).getTime() <= now);
  const upcoming = items.filter((it) => !it.mastered && new Date(it.dueAt).getTime() > now);
  const mastered = items.filter((it) => it.mastered);

  return { items, due, upcoming, mastered, loading, addFromResult, promote, resetItem, removeItem, reload: load };
}

export { normalizeSrsKey };
