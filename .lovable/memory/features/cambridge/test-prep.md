---
name: Cambridge YLE Test Prep
description: 60 papers (12 per level), equal question counts per level, shared grouped board component
type: feature
---
- 60 mock papers: 12 each for Starters, Movers, Flyers, KET, PET.
- Equal question count inside each level, enforced by `src/data/cambridgeMockExamEqualizer.ts`:
  Starters 25 (15R/10L, 20m), Movers 25 (15R/10L, 25m), Flyers 28 (18R/10L, 30m),
  KET 30 (20R/10L, 40m), PET 31 (21R/10L, 45m). Extra questions in older papers are trimmed,
  keeping reading passage groups intact.
- Pipeline order in `cambridgeMockExamData.ts`: reading-set injection -> equalizer -> normalizer
  (balanced A-D keys + bilingual explanations).
- One shared UI: `src/components/cambridge/TestPrepBoard.tsx` renders the sticky level filter and
  level bands (CEFR, age, papers, Qs each). Used by both `/cambridge-lectures` (Test Prep tab) and
  `/cambridge-yle-test-prep`, so the two views never drift apart.
- Papers are sorted by trailing number, badge shows "LEVEL #n".
