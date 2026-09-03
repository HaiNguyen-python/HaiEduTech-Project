---
name: IELTS Writing Grammar Practice - Task 1 vs Task 2
description: Grammar Practice tab filters structures by task; Task 1 uses a dedicated data-description bank, Task 2 uses the advanced essay bank
type: feature
---

- `src/data/ieltsGrammarBank.ts`: 34 Task 2 essay structures. `IELTSGrammarItem.task?: 1 | 2 | "both"`; `grammarItemTask` / `grammarItemMatchesTask` resolve the tag (default 2, 12 ids tagged "both").
- `src/data/ieltsGrammarBankTask1.ts`: 57 Task 1 structures in 7 categories (t1-trend, t1-comparison, t1-figures, t1-overview, t1-process, t1-map, t1-participle) + `TASK1_GRAMMAR_CATEGORIES`. Task 1 practice pool = 69.
- `GrammarPractice.tsx` swaps pool + category chips by `taskType`, resets selection on task switch, and passes task context to `grade-phrase-sentence`.
- Idea Practice stays Task 2 only (labelled in the UI).
- Audit: `bunx tsx scripts/audit_ielts_writing_banks.ts` must report 0 issues (grammar, 322 phrases, 93 linkers, 15 idea topics, 128 translation items; checks duplicates, categories, task tags, punctuation, Vietnamese leaks, em-dashes, Task 1 coverage min 6/category).
