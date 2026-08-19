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
const pendingKey = (subject: string) => `vocab_mastered_pending_${subject}`;

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

/**
 * Words that could not reach the database yet (offline, or rejected by the
 * server-side burst limiter of max 8 marks / 60s). Without this queue the word
 * stayed in localStorage only, so the leaderboard score was permanently lower
 * than the "You mastered N words" number shown to the student.
 */
const readPending = (subject: string): string[] => {
  try {
    const raw = localStorage.getItem(pendingKey(subject));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch { return []; }
};

const writePending = (subject: string, words: string[]) => {
  try {
    if (words.length === 0) localStorage.removeItem(pendingKey(subject));
    else localStorage.setItem(pendingKey(subject), JSON.stringify([...new Set(words)]));
  } catch {/* noop */}
};

const queuePending = (subject: string, word: string) => {
  writePending(subject, [...readPending(subject), word]);
};

const isRateLimit = (error: any) =>
  String(error?.message || "").includes("rate_limit");


export function useMasteredVocab(subject: string) {
  const [mastered, setMastered] = useState<Set<string>>(() => readLocal(subject));
  const userIdRef = useRef<string | null>(null);
  const loadedFromDbRef = useRef(false);

  // Initial DB load + merge. Also re-runs when auth state changes so a user
  // who marks words while signed out gets them pushed up the moment they log in.
  useEffect(() => {
    let cancelled = false;
    let drainTimer: number | undefined;

    /** Push queued words one by one; a rate-limited word stays queued for later. */
    const drainPending = async (uid: string) => {
      const queue = readPending(subject);
      if (queue.length === 0 || cancelled) return;
      const word = queue[0];
      const { error } = await (supabase as any)
        .from("user_vocab_mastered")
        .insert({ user_id: uid, subject, word });
      if (cancelled) return;
      if (!error || !isRateLimit(error)) {
        // Success, or a permanent error (e.g. duplicate) — stop retrying it.
        writePending(subject, queue.slice(1));
        window.dispatchEvent(new CustomEvent(MASTERY_UPDATED_EVENT, { detail: { subject } }));
      }
    };

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
      const missing = [...local].filter(w => !dbSet.has(w));
      if (missing.length > 0) {
        // Insert what the burst limiter allows now, queue the rest so no word
        // is ever lost (previously one rejected row aborted the whole insert).
        const first = missing.slice(0, 5);
        const { error: insertError } = await (supabase as any)
          .from("user_vocab_mastered")
          .insert(first.map(word => ({ user_id: user.id, subject, word })));
        const inserted = insertError ? [] : first;
        inserted.forEach(w => dbSet.add(w));
        writePending(subject, [
          ...readPending(subject),
          ...missing.filter(w => !inserted.includes(w)),
        ]);
      }
      // Local set = DB set + anything still waiting to sync.
      const localSet = new Set<string>([...dbSet, ...readPending(subject)]);
      writeLocal(subject, localSet);
      if (!cancelled) {
        setMastered(localSet);
        loadedFromDbRef.current = true;
        window.dispatchEvent(new CustomEvent(MASTERY_UPDATED_EVENT, { detail: { subject } }));
      }
      drainTimer = window.setInterval(() => { void drainPending(user.id); }, 12_000);
    };
    sync();
    // Re-sync on sign-in (covers guest → logged-in transitions)
    const { data: authSub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") sync();
      if (event === "SIGNED_OUT") userIdRef.current = null;
    });
    return () => {
      cancelled = true;
      window.clearInterval(drainTimer);
      authSub.subscription.unsubscribe();
    };
  }, [subject]);

  const toggle = useCallback((word: string) => {
    setMastered(prev => {
      const next = new Set(prev);
      const wasMastered = next.has(word);

      // Anti-gaming: marking words faster than every 3s skips the XP reward,
      // but the word is still queued for the database so the leaderboard score
      // and the local count stay in sync.
      if (!wasMastered && isOnCooldown()) {
        next.add(word);
        writeLocal(subject, next);
        if (userIdRef.current) queuePending(subject, word);
        return next;
      }


      if (wasMastered) next.delete(word);
      else {
        next.add(word);
        stampCooldown();
      }
      writeLocal(subject, next);
      if (!wasMastered) {
        awardPetXP(5, `vocab:${subject}`, { celebrate: false });
      }
      const uid = userIdRef.current;
      if (uid) {
        if (wasMastered) {
          writePending(subject, readPending(subject).filter(w => w !== word));
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
            .then(({ error }: { error: any }) => {
              // Burst limiter rejected it: retry later instead of losing the word.
              if (error && isRateLimit(error)) queuePending(subject, word);
              else if (error) console.debug("vocab mastery insert error:", error?.message);
              window.dispatchEvent(new CustomEvent(MASTERY_UPDATED_EVENT, { detail: { subject } }));
            });

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
