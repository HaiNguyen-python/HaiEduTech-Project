/**
 * Cross-device mastered-vocab hook.
 * - Persists mastered words in localStorage for guests + offline use.
 * - Syncs the full set into the `user_vocab_mastered` table when signed in.
 * - On mount, merges the DB set (source of truth) with local set so stars are
 *   restored on a fresh device / after logout-login.
 * - Notifies leaderboard via a window event so the BXH refreshes immediately.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const MASTERY_UPDATED_EVENT = "vocab-mastery-updated";

const storageKey = (subject: string) => `vocab_mastered_${subject}`;

const readLocal = (subject: string): Set<string> => {
  try {
    const raw = localStorage.getItem(storageKey(subject));
    if (raw) return new Set(JSON.parse(raw));
    // Backward compat with legacy keys
    const legacy = localStorage.getItem(`${subject}_mastered`);
    if (legacy) return new Set(JSON.parse(legacy));
  } catch {/* noop */}
  return new Set();
};

const writeLocal = (subject: string, set: Set<string>) => {
  try {
    localStorage.setItem(storageKey(subject), JSON.stringify([...set]));
  } catch {/* noop */}
};

export function useMasteredVocab(subject: string) {
  const [mastered, setMastered] = useState<Set<string>>(() => readLocal(subject));
  const userIdRef = useRef<string | null>(null);
  const loadedFromDbRef = useRef(false);

  // Initial DB load + merge
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      userIdRef.current = user.id;
      const { data, error } = await (supabase as any)
        .from("user_vocab_mastered")
        .select("word")
        .eq("user_id", user.id)
        .eq("subject", subject)
        .limit(10000);
      if (error || cancelled) return;
      const dbSet = new Set<string>((data || []).map((r: any) => r.word as string));
      const local = readLocal(subject);
      // Merge: any word marked locally but not yet synced should be pushed up
      const toInsert = [...local].filter(w => !dbSet.has(w));
      if (toInsert.length > 0) {
        await (supabase as any).from("user_vocab_mastered").insert(
          toInsert.map(word => ({ user_id: user.id, subject, word }))
        );
        toInsert.forEach(w => dbSet.add(w));
      }
      writeLocal(subject, dbSet);
      if (!cancelled) {
        setMastered(dbSet);
        loadedFromDbRef.current = true;
        window.dispatchEvent(new CustomEvent(MASTERY_UPDATED_EVENT, { detail: { subject } }));
      }
    })();
    return () => { cancelled = true; };
  }, [subject]);

  const toggle = useCallback((word: string) => {
    setMastered(prev => {
      const next = new Set(prev);
      const wasMastered = next.has(word);
      if (wasMastered) next.delete(word);
      else next.add(word);
      writeLocal(subject, next);
      // Fire-and-forget DB sync
      const uid = userIdRef.current;
      if (uid) {
        if (wasMastered) {
          (supabase as any)
            .from("user_vocab_mastered")
            .delete()
            .eq("user_id", uid)
            .eq("subject", subject)
            .eq("word", word)
            .then(() => {
              window.dispatchEvent(new CustomEvent(MASTERY_UPDATED_EVENT, { detail: { subject } }));
            });
        } else {
          (supabase as any)
            .from("user_vocab_mastered")
            .insert({ user_id: uid, subject, word })
            .then(() => {
              window.dispatchEvent(new CustomEvent(MASTERY_UPDATED_EVENT, { detail: { subject } }));
            });
        }
      } else {
        window.dispatchEvent(new CustomEvent(MASTERY_UPDATED_EVENT, { detail: { subject } }));
      }
      return next;
    });
  }, [subject]);

  return { mastered, setMastered, toggle };
}
