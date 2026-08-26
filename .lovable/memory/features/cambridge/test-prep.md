---
name: Cambridge YLE Test Prep
description: 75 papers (15 per level), equal question counts per level, hidden listening scripts, evidence sentences in review, shared grouped board, audit script
type: feature
---
- 75 mock papers: 15 each for Starters, Movers, Flyers, KET, PET.
- Listening scripts are rebuilt by `src/data/cambridgeListeningUpgrade.ts` (last step of the
  pipeline): multi turn recordings with a narrator opener, natural chat, distractor ideas that are
  explicitly ruled out, then the authored key line verbatim, then a closer. Minimum spoken words:
  Starters 40, Movers 58, Flyers 82, KET 115, PET 130 (audit enforces this and >= 4 turns).
- Listening answerability (`src/data/cambridgeListeningClarity.ts`, runs right before the upgrade):
  if the key is not audible in the authored line, one natural spoken sentence stating the key is
  appended (shape aware: "That makes 27 altogether.", "The price is 5.50", "It is a dog.",
  "Yes, they do experiments.") and the evidence quote is added to both explanations.
  Negative stems (NOT / never) are skipped, because there the key must stay ruled out, not stated.
- Distractor rejection rules in the upgrade: never reject anything on a negative stem; numbers,
  clock times and prices use "out of date detail" wording ("The old leaflet printed 9:00, and that
  has now changed"), never "It is not 25."; a theme line drawn from the paper title keeps each
  recording specific to its topic.
- Listening scripts are hidden by default in the exam runner: students press Listen first and can
  reveal the script with "Show script" (state resets on every question change).
- Review screen shows the evidence sentence from the reading text / listening script that proves the
  key, via `src/lib/cambridgeEvidence.ts` (`findEvidenceSentence`, sentence number for reading).

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
- Content audit: run `bun run scripts/audit_cambridge_exams.ts`. It checks equal counts per level,
  answer-key spread (target ~25% each A-D), duplicate questions/options, index bounds, bilingual
  explanations, forbidden em/en dashes and listening scripts. Listening checks also cover: key audible in the script (with number, clock
  time and price equivalences from `src/data/cambridgeListeningSupport.ts`), no wrong option stated
  as fact, no bare numeric rejection, negative stems reject nothing, context framing present.
  Must report 0 issues.
- Standalone Reading & Writing items without a passage are legitimate (official R&W Parts 1-3
  word/picture and gap-fill tasks), so the audit reports them as information only.
