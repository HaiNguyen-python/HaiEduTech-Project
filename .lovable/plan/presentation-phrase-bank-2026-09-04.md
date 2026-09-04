# Presentation Phrase Bank

Add a "Useful phrases & sentence patterns" section to the Presentation & Public Speaking Studio so students can rehearse the language of a real presentation.

## What the student sees

A new card below the workspace (full width, collapsible) with phrases grouped by presentation stage:

1. Opening & greeting
2. Stating the purpose / agenda
3. Signposting & transitions
4. Describing data and visuals
5. Emphasising and giving evidence
6. Handling questions & objections
7. Closing & call to action

Each group shows 8-12 phrases. Every phrase has:
- The English pattern, with a blank slot where students insert their own content (e.g. "Let me start by ...")
- A short Vietnamese meaning
- One example sentence in context
- Listen buttons at normal and slow speed (same behaviour as the Useful Language panel used in IELTS Speaking)
- A "Listen to all" button per group

Extras:
- Tabs or chips to switch group, plus a search box to find a phrase.
- "Insert into my script" button that appends the phrase into the custom-script box so it can be practised straight away on the teleprompter.
- A small practice drill: pick a stage, the app shows the Vietnamese meaning and the student says or types the English phrase, then reveals the answer. Score and streak kept locally.
- Phrases the student has used during a recorded session get a "used" tick, based on matching the live transcript against the bank.

## Technical notes

- New data file `src/data/presentationPhrases.ts`: grouped bank (`id`, `stage`, `en`, `vi`, `example`), roughly 70-80 items, no invented statistics.
- New component `src/components/presentation/PresentationPhraseBank.tsx`: group chips, search, per-item audio through the existing `useUsefulLanguageAudio` / `PhraseAudio` helpers in `src/components/speaking/UsefulLanguageAudio.tsx`, insert-into-script callback, and the reveal drill.
- Mount it in `src/pages/PresentationStudio.tsx` above Practice progress; wire the insert callback to the existing custom-script state.
- Extend `src/lib/presentationStudio.ts` with a helper that detects which bank phrases appear in a transcript, and feed the count into the existing signposting/report logic without changing scoring formulas.
- Drill score and last-used stage persisted with `safeStorage` under a new key; no database changes.
- Bilingual labels via `useLanguage`, hyphens only in copy, no em dashes.
