---
name: Cambridge CEFR Progress Chart
description: CEFR chart at top of Cambridge Test Prep; blends mock-exam scores (70%) with Cambridge YLE vocabulary mastery (30%); 100 papers with equal question counts per level
type: feature
---
- 100 mock papers: 20 per level (Starters, Movers, Flyers, KET, PET). Equal question counts inside
  each level, enforced by `cambridgeMockExamEqualizer.ts` targets
  (Starters 25, Movers 25, Flyers 28, KET 30, PET 31).
- `src/data/cambridgeExamTopUp.ts` adds the missing Reading & Writing items to the newest papers
  (Flyers 16-20 +3, KET 16-20 +5, PET 17-21 +6) and must run BEFORE the equalizer in
  `cambridgeMockExamData.ts` pipeline: reading sets -> orphan passages -> top-up -> equalizer ->
  clarity -> normalizer.
- `src/lib/cambridgeCefrModel.ts` holds pure math. Level competency = 70% exam average
  (`EXAM_WEIGHT`) + 30% vocabulary coverage (`VOCAB_WEIGHT`). Mastery needs >= 70% average over
  >= 2 papers AND >= 50% vocabulary coverage (`VOCAB_MASTERY_MIN`).
  CEFR labels: Starters Pre-A1, Movers A1, Flyers A2, KET A2+, PET B1.
- `src/hooks/useCambridgeCefr.ts` reads `cambridge-mock-best-<examId>` plus mastered words of
  subject `cambridge-yle` (localStorage + `user_vocab_mastered` when signed in), maps words to
  levels via `CAMBRIDGE_KIDS_WORDS_CURATED`, and refreshes on focus, storage and
  `vocab-mastery-updated` events.
- `src/components/cambridge/CefrProgressChart.tsx` shows the Pre-A1 to B2 scale, per-level bars with
  both exam and vocabulary lines, and a next-step hint naming both gaps. Mounted in `TestPrepBoard`.
- Audit: `bun run scripts/audit_cambridge_exams.ts` must report `Issues: 0`.
