/**
 * @file cambridgeListeningFixes.ts
 * @description Manual wording overrides for listening items whose authored line
 *              could not be made unambiguous automatically (a description that
 *              fits several options, a feeling or an intention with no spoken
 *              evidence). Keyed by exam id and question id so the original exam
 *              files stay untouched. The text replaces the authored line only,
 *              the question, options and key never change.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

/** examId -> questionId -> replacement spoken line (no speaker labels). */
const LISTENING_FIXES: Record<string, Record<string, string>> = {};

export const listeningFixFor = (
  examId: string,
  questionId: string | number,
  _key: string
): string | null => LISTENING_FIXES[examId]?.[String(questionId)] ?? null;
