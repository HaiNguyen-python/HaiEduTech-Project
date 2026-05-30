/**
 * @file useHskSRS.ts
 * @description SM-2 spaced repetition for HSK vocabulary. Supabase-backed for
 * authenticated users, with a localStorage fallback for guests.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SrsRating = 1 | 2 | 3 | 4; // Again, Hard, Good, Easy

export interface SrsCard {
  word_id: string;
  hsk_level?: number | null;
  easiness: number;
  interval_days: number;
  repetitions: number;
  next_review: string; // ISO
  last_reviewed?: string | null;
}

const LS_KEY = "hsk-srs-progress-v1";

function nowIso() {
  return new Date().toISOString();
}

/** Pure SM-2 update */
export function applySm2(card: SrsCard, rating: SrsRating): SrsCard {
  // Map 1..4 to SM-2 quality 0..5
  const quality = rating === 1 ? 1 : rating === 2 ? 3 : rating === 3 ? 4 : 5;
  let { easiness, interval_days, repetitions } = card;

  if (quality < 3) {
    repetitions = 0;
    interval_days = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) interval_days = 1;
    else if (repetitions === 2) interval_days = 3;
    else interval_days = Math.round(interval_days * easiness);
  }
  easiness = Math.max(1.3, easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  const next = new Date();
  next.setDate(next.getDate() + interval_days);
  return {
    ...card,
    easiness: Math.round(easiness * 100) / 100,
    interval_days,
    repetitions,
    next_review: next.toISOString(),
    last_reviewed: nowIso(),
  };
}

export function newCard(word_id: string, hsk_level?: number | null): SrsCard {
  return {
    word_id,
    hsk_level: hsk_level ?? null,
    easiness: 2.5,
    interval_days: 0,
    repetitions: 0,
    next_review: nowIso(),
    last_reviewed: null,
  };
}

function loadLocal(): Record<string, SrsCard> {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {}; }
}
function saveLocal(map: Record<string, SrsCard>) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(map)); } catch { /* ignore */ }
}

export function useHskSRS() {
  const [cards, setCards] = useState<Record<string, SrsCard>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load
  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!alive) return;
      setUserId(user?.id ?? null);
      if (user) {
        const { data } = await (supabase as any)
          .from("hsk_srs_progress")
          .select("word_id, hsk_level, easiness, interval_days, repetitions, next_review, last_reviewed")
          .eq("user_id", user.id);
        if (!alive) return;
        const map: Record<string, SrsCard> = {};
        (data ?? []).forEach((r: SrsCard) => { map[r.word_id] = r; });
        setCards(map);
      } else {
        setCards(loadLocal());
      }
      setLoading(false);
    })();
    return () => { alive = false; };
  }, []);

  const persist = useCallback(async (card: SrsCard) => {
    if (userId) {
      await (supabase as any).from("hsk_srs_progress").upsert({
        user_id: userId,
        word_id: card.word_id,
        hsk_level: card.hsk_level ?? null,
        easiness: card.easiness,
        interval_days: card.interval_days,
        repetitions: card.repetitions,
        next_review: card.next_review,
        last_reviewed: card.last_reviewed,
      }, { onConflict: "user_id,word_id" });
    } else {
      const next = { ...cards, [card.word_id]: card };
      saveLocal(next);
    }
  }, [userId, cards]);

  const review = useCallback(async (word_id: string, rating: SrsRating, hsk_level?: number | null) => {
    const current = cards[word_id] ?? newCard(word_id, hsk_level);
    const updated = applySm2(current, rating);
    setCards(prev => ({ ...prev, [word_id]: updated }));
    await persist(updated);
    return updated;
  }, [cards, persist]);

  const dueCount = Object.values(cards).filter(c => new Date(c.next_review).getTime() <= Date.now()).length;
  const masteredCount = Object.values(cards).filter(c => c.repetitions >= 3 && c.easiness >= 2.3).length;
  const totalSeen = Object.keys(cards).length;

  return { cards, loading, review, dueCount, masteredCount, totalSeen, userId };
}
