# Plan: Expand Swedish lesson content across all sections (≤ 5 credits)

## Constraint

Budget capped at ~5 daily credits, so this is a lean, high-impact append pass. No refactors, no new components, no AI generation. All additions are hand-authored appends to existing data files so they surface automatically through the current UI.

## Scope: one meaningful addition per major section


| #   | Section                    | File                                                                    | Addition                                                                                   |
| --- | -------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1   | Beginner (A1) - Vocabulary | `src/data/swedishVocabExpansion.ts`                                     | +15 A1 words: weather, seasons, weekdays (with EN gloss, En/Ett article, example sentence) |
| 2   | YKI A2 - Reading           | `src/data/swedishReadingPassages.ts`                                    | +1 A2 passage "På vårdcentralen" (doctor visit, ~180 words) with 5 comprehension Qs        |
| 3   | YKI A2 - Listening         | `src/data/swedishListeningExercises.ts`                                 | +1 A2 dialogue "Bokning av tid" (booking an appointment) with transcript + 4 Qs            |
| 4   | YKI B1 - Writing           | `src/data/swedishWritingPrompts.ts`                                     | +2 B1 opinion-letter prompts (miljö, kollektivtrafik) with outline + sample band-hint      |
| 5   | Speaking Lab               | `src/data/swedishSpeakingPrompts.ts` + `swedishSpeakingModelAnswers.ts` | +3 monologue prompts (family, hometown, favourite season) with 60-90s model answers        |


Sections that already have deep content (Alphabet, Daily Plan, Interactive Curriculum, Svenskfinland, Vocab Mega 1-7) are intentionally NOT touched this pass to stay within budget - they'll be next-batch candidates.

## Content quality rules (applied to every item)

- Swedish text is authentic (En/Ett correct, V2 word order, standard rikssvenska spelling).
- Every new item has an English gloss/translation (no Vietnamese in new Swedish learning content, matching the recent AI Academy EN-only rule for foreign-language labs).
- Reading + listening passages include 4-5 comprehension questions with answer keys.
- Writing prompts include a 3-bullet outline + one band-B1 sample opener.
- Speaking model answers are 60-90 seconds spoken length (~110-160 words).
- No em-dashes (project rule); use hyphens.

## Out of scope this pass

- No new files, no new routes, no UI changes.
- No AI/edge-function calls (keeps credit use to the file edits themselves).
- No changes to translation, cache, or streak systems.

## Verification

After edits: read each modified file's tail to confirm arrays parse, then rely on the running dev server (no manual build) - Vite will surface any syntax error immediately in the preview.

chỉ làm trong 3 credits thôi 