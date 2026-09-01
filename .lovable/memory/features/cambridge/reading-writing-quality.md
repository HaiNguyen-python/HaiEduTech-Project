---
name: Cambridge Reading & Writing quality
description: Evidence-based reading explanations, deduped stems, padded short passages, and the 30-task Cambridge Writing Lab with AI marking
type: feature
---

# Reading
- Reading & Writing feedback is generated in `src/data/cambridgeReadingExplanations.ts`: quote the sentence of the item's own text (via `src/lib/cambridgeEvidence.ts`) or explain the language rule. The old pasted hint ("underline the words in the text...") must never come back.
- Duplicate stems across papers are rewritten in `src/data/cambridgeReadingDedupe.ts`, keyed `examId:questionId`. Never change options, keys or ids (progress and CEFR depend on them).
- Short passages are padded in `src/data/cambridgeReadingDepth.ts`. Minimums: starters 45, movers 80, flyers 85, ket 90, pet 110 words. Signs, notices, emails and other realia are skipped on purpose. Filler sentences may not contain any option or question word of the items attached to that text.

# Writing
- `src/data/cambridgeWritingTasks.ts`: 6 tasks per level (30 total) in official formats. Every task has bilingual prompt, at least 3 content points, useful language, word range and a model answer inside that range.
- UI: `src/components/cambridge/CambridgeWritingLab.tsx` on `/cambridge-yle-test-prep`. Marking: edge function `grade-cambridge-writing` (Gemini 2.5 Flash, 4 Cambridge criteria 1-5, bilingual feedback, corrections, upgraded version, deterministic fallback).

# Audit
`scripts/audit_cambridge_exams.ts` must report `Issues: 0`. It checks reading generic hints, cross-paper stem duplication, passage length, and the writing bank.
