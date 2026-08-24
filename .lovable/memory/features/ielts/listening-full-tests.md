---
name: IELTS Listening Full Tests
description: Listening practice page has Full Test tab (13 tests x 40 questions) plus legacy By Question Type drills
type: feature
---

- `/ielts-listening-practice` has 2 tabs: "Full Tests" (default) and "By Question Type".
- 13 full tests in `src/data/ieltsFullListeningTests.ts`: each = 4 sets (Section 1+2+3+4) with exactly 10 questions each = 40 questions, 30-minute timer.
- Only sets with exactly 10 questions may be used in a full test. Shorter sets (5-8 Qs) stay in the By Question Type tab until expanded to 10.
- `ListeningFullTestEngine.tsx` owns answers/timer/submission; it renders `ListeningPracticeSetCard` in controlled mode (`controlled` prop: answers, setAnswers, submitted, numberOffset, forceExamMode) so audio + rendering stay in one component.
- Continuous numbering Q1-Q40 via `numberOffset`. Band score via `ieltsListeningBand(score, 40)`. Attempts stored in `src/lib/ieltsListeningHistory.ts` (localStorage, mode "single" | "full").
