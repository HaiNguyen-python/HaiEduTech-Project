---
name: Cambridge CEFR Progress Chart
description: CEFR competency chart at top of Cambridge Test Prep, 100 mock papers (20 per level), mastery = 70% avg over 2+ papers
type: feature
---
- Cambridge mock bank is now 100 papers: 20 each for Starters, Movers, Flyers, KET, PET
  (new files `cambridgeExams{Starters,Movers,Flyers,Ket}16to20.ts` and `cambridgeExamsPet17to21.ts`,
  registered in `cambridgeMockExamData.ts`). Each paper: 15 Reading & Writing + 10 Listening,
  bilingual explanations, listening scripts in the `passage` field.
- `src/lib/cambridgeCefrModel.ts` holds pure math (`buildCefrLevels`, `buildCefrSnapshot`).
  A level counts as mastered at 70% average across at least 2 papers (`MASTERY_THRESHOLD`,
  `MIN_PAPERS_FOR_MASTERY`). CEFR labels: Starters Pre-A1, Movers A1, Flyers A2, KET A2+, PET B1.
- `src/hooks/useCambridgeCefr.ts` reads `cambridge-mock-best-<examId>` from localStorage,
  refreshes on window focus and storage events.
- `src/components/cambridge/CefrProgressChart.tsx` renders the Pre-A1 to B2 scale bar,
  five per-level bars and a next-step hint. Mounted at the top of `TestPrepBoard.tsx`.
  Keep the model/hook free of imports from TestPrepBoard to avoid a circular import.
