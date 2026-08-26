/**
 * @file useCambridgeCefr.ts
 * @description Reads the saved best score of every Cambridge mock paper plus the
 *              Cambridge YLE vocabulary the student has mastered, and turns both
 *              into a CEFR competency snapshot. Refreshes on window focus, on
 *              storage events and when a word is marked as mastered.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";
import { cambridgeMockExams } from "@/data/cambridgeMockExamData";
import { CAMBRIDGE_KIDS_WORDS_CURATED } from "@/data/cambridgeKidsVocabCurated";
import { supabase } from "@/integrations/supabase/client";
import { MASTERY_UPDATED_EVENT } from "@/hooks/useMasteredVocab";
import {
  buildCefrLevels,
  buildCefrSnapshot,
  CEFR_LEVEL_ORDER,
  type CambridgeLevelKey,
  type CefrAttempt,
  type CefrSnapshot,
} from "@/lib/cambridgeCefrModel";

/** Subject key used by the Cambridge YLE Vocabulary page. */
const VOCAB_SUBJECT = "cambridge-yle";

type VocabTally = Record<CambridgeLevelKey, { mastered: number; total: number }>;

const emptyTally = (): VocabTally => ({
  starters: { mastered: 0, total: 0 },
  movers: { mastered: 0, total: 0 },
  flyers: { mastered: 0, total: 0 },
  ket: { mastered: 0, total: 0 },
  pet: { mastered: 0, total: 0 },
});

/** word (lower case) -> Cambridge level key, built once from the curated bank. */
const WORD_LEVEL = new Map<string, CambridgeLevelKey>();
const VOCAB_TOTALS = emptyTally();
CAMBRIDGE_KIDS_WORDS_CURATED.forEach((w) => {
  const key = String(w.level).toLowerCase() as CambridgeLevelKey;
  if (!CEFR_LEVEL_ORDER.includes(key)) return;
  const word = w.word.toLowerCase();
  if (!WORD_LEVEL.has(word)) {
    WORD_LEVEL.set(word, key);
    VOCAB_TOTALS[key].total += 1;
  }
});

const papersPerLevel = (): Record<CambridgeLevelKey, number> => {
  const out = { starters: 0, movers: 0, flyers: 0, ket: 0, pet: 0 } as Record<CambridgeLevelKey, number>;
  cambridgeMockExams.forEach((e) => {
    const level = e.level as CambridgeLevelKey;
    if (CEFR_LEVEL_ORDER.includes(level)) out[level] += 1;
  });
  return out;
};

const readAttempts = (): CefrAttempt[] => {
  if (typeof window === "undefined") return [];
  const rows: CefrAttempt[] = [];
  cambridgeMockExams.forEach((exam) => {
    const raw = localStorage.getItem(`cambridge-mock-best-${exam.id}`);
    if (raw === null) return;
    const correct = Number(raw);
    if (!Number.isFinite(correct)) return;
    const level = exam.level as CambridgeLevelKey;
    if (!CEFR_LEVEL_ORDER.includes(level)) return;
    rows.push({
      level,
      correct,
      totalQuestions: exam.questions.length || exam.totalQuestions,
    });
  });
  return rows;
};

/** Locally stored mastered words for the Cambridge YLE vocabulary bank. */
const readLocalWords = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw =
      localStorage.getItem(`vocab_mastered_${VOCAB_SUBJECT}`) ||
      localStorage.getItem(`${VOCAB_SUBJECT}_mastered`);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const tallyWords = (words: Iterable<string>): VocabTally => {
  const tally = emptyTally();
  CEFR_LEVEL_ORDER.forEach((lv) => { tally[lv].total = VOCAB_TOTALS[lv].total; });
  const seen = new Set<string>();
  for (const raw of words) {
    const word = String(raw).toLowerCase();
    if (seen.has(word)) continue;
    seen.add(word);
    const level = WORD_LEVEL.get(word);
    if (level) tally[level].mastered += 1;
  }
  return tally;
};

export const useCambridgeCefr = (): CefrSnapshot => {
  const compute = useCallback(
    (words: string[]) =>
      buildCefrSnapshot(buildCefrLevels(readAttempts(), papersPerLevel(), tallyWords(words))),
    []
  );
  const [snapshot, setSnapshot] = useState<CefrSnapshot>(() => compute(readLocalWords()));

  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) setSnapshot(compute(readLocalWords()));
    };

    /** Cloud words win on a fresh device where localStorage is still empty. */
    const syncCloud = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const { data, error } = await (supabase as any)
        .from("user_vocab_mastered")
        .select("word")
        .eq("user_id", user.id)
        .eq("subject", VOCAB_SUBJECT)
        .limit(10000);
      if (error || cancelled) return;
      const merged = new Set<string>([
        ...readLocalWords(),
        ...((data || []) as { word: string }[]).map((r) => r.word),
      ]);
      setSnapshot(compute([...merged]));
    };

    refresh();
    void syncCloud();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener(MASTERY_UPDATED_EVENT, refresh as EventListener);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener(MASTERY_UPDATED_EVENT, refresh as EventListener);
    };
  }, [compute]);

  return snapshot;
};

