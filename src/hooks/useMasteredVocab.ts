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
import { awardPetXP } from "@/hooks/usePetXP";

export const MASTERY_UPDATED_EVENT = "vocab-mastery-updated";

// Anti-gaming: enforce a 3-second cooldown between marking words as mastered.
// Prevents users from clicking through 200+ words/minute just to farm XP/leaderboard.
const MASTERY_COOLDOWN_MS = 3000;
const MASTERY_COOLDOWN_KEY = "vocab_mastery_last_marked_at";

const isOnCooldown = (): boolean => {
  try {
    const last = Number(localStorage.getItem(MASTERY_COOLDOWN_KEY) || "0");
    return Date.now() - last < MASTERY_COOLDOWN_MS;
  } catch { return false; }
};

const stampCooldown = () => {
  try { localStorage.setItem(MASTERY_COOLDOWN_KEY, String(Date.now())); } catch { /* noop */ }
};

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

  // Initial DB load + merge. Also re-runs when auth state changes so a user
  // who marks words while signed out gets them pushed up the moment they log in.
  useEffect(() => {
    let cancelled = false;
    const sync = async () => {
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
    };
    sync();
    // Re-sync on sign-in (covers guest → logged-in transitions)
    const { data: authSub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") sync();
      if (event === "SIGNED_OUT") userIdRef.current = null;
    });
    return () => { cancelled = true; authSub.subscription.unsubscribe(); };
  }, [subject]);

  const toggle = useCallback((word: string) => {
    setMastered(prev => {
      const next = new Set(prev);
      const wasMastered = next.has(word);
      if (wasMastered) next.delete(word);
      else next.add(word);
      writeLocal(subject, next);
      // Award Pet XP only when a NEW word is being mastered (not when un-mastering)
      if (!wasMastered) {
        awardPetXP(5, `vocab:${subject}`, { celebrate: false });
      }
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
          // Log vocab mastery into the central activity pipeline so the RL
          // dispatcher counts vocabulary review as meaningful engagement.
          // Fire-and-forget: never blocks the UI.
          import("@/hooks/useActivityLogger").then(({ logStudentActivity }) => {
            logStudentActivity({
              activityType: "vocab_mastered",
              activityId: `${subject}:${word}`,
              score: 1,
              maxScore: 1,
              metadata: { subject, word, source: "useMasteredVocab" },
            });
          }).catch(() => { /* never crash on logging */ });
        }
      } else {
        window.dispatchEvent(new CustomEvent(MASTERY_UPDATED_EVENT, { detail: { subject } }));
      }
      return next;
    });
  }, [subject]);

  return { mastered, setMastered, toggle };
}
