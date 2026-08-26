/**
 * @file useCambridgeCefr.ts
 * @description Reads the saved best score of every Cambridge mock paper from
 *              localStorage and turns it into a CEFR competency snapshot.
 *              Refreshes on window focus and on storage events so a finished
 *              paper is reflected as soon as the student returns to the board.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";
import { cambridgeMockExams } from "@/data/cambridgeMockExamData";
import {
  buildCefrLevels,
  buildCefrSnapshot,
  CEFR_LEVEL_ORDER,
  type CambridgeLevelKey,
  type CefrAttempt,
  type CefrSnapshot,
} from "@/lib/cambridgeCefrModel";

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

export const useCambridgeCefr = (): CefrSnapshot => {
  const compute = useCallback(
    () => buildCefrSnapshot(buildCefrLevels(readAttempts(), papersPerLevel())),
    []
  );
  const [snapshot, setSnapshot] = useState<CefrSnapshot>(compute);

  useEffect(() => {
    const refresh = () => setSnapshot(compute());
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [compute]);

  return snapshot;
};
