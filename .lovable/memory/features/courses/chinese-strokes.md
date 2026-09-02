---
name: Chinese Stroke Order Guide
description: /chinese/strokes - 8 basic strokes, 7 stroke-order rules, animated practice sets, free character lookup, 12-question quiz
type: feature
---
Data: `src/data/chineseStrokes.ts` (basicStrokes, strokeRules, practiceSets, strokeQuizzes). Page: `src/pages/ChineseStrokeGuide.tsx`.
- Animation via existing `HanziStrokeOrder` (hanzi-writer, CDN fallbacks); audio via `playChineseTts`.
- Best quiz score saved under `chinese-stroke-progress` with `safeStorage`.
- Menu: `/chinese/pronunciation` and `/chinese/strokes` are now TOP-LEVEL items in `chineseSubs` (Navbar), not nested inside the HSK group. Both also have CTA buttons on `/chinese`.
