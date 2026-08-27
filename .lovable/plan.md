# Word bank for fill-in-the-blank grammar exercises

## Goal
Every fill-in-the-blank exercise shows a box of ready-made words/phrasal verbs above the sentences. Students pick from the box instead of guessing what to type, which removes the current confusion.

## What the student will see
1. A "Word bank / Ngân hàng từ" panel at the top of each fill-in exercise, listing every answer of that exercise as a clickable chip, in shuffled order (never in answer order).
2. Chips include a few extra plausible distractors when the exercise has fewer than 6 gaps, so the box is not a 1:1 giveaway list.
3. Clicking a chip fills the currently selected blank (or the first empty one) and marks the chip as used; clicking the filled blank or the used chip releases it back to the box. Typing by hand still works.
4. After "Check Answers", the box is dimmed and each wrong item still shows the correct answer as today.
5. Existing hints stay, but become secondary: the cue in brackets plus the word bank should make each gap unambiguous.

## Review of the whole grammar section
- Verify every fill-in-the-blank exercise across all 28 grammar modules / 67 lessons renders a usable word bank: at least 3 chips, all answers present, no duplicate chips, no chip that leaks a different exercise's answer.
- Check multi-word answers (phrasal verbs like "put up with", "look forward to") render as single chips and match exactly on grading (case-insensitive, whitespace-tolerant).
- Confirm the passage layout variant (reading + questions two-column) also shows the box without breaking the sticky column.
- Keep the other exercise types (error correction, transformation, reorder, matching, multiple choice) unchanged.

## Technical notes
- `src/components/exercises/FillInBlankExercise.tsx`: add a word-bank panel plus chip state (selected gap index, used chips), keyboard-free interaction, and release-on-click behaviour. Grading logic stays as-is.
- `src/lib/grammarExerciseClarity.ts`: extend the fill-in-blank pass to attach an optional `wordBank: string[]` per exercise - answers plus deterministic distractors drawn from the lesson's vocabulary and other answers in the same lesson, shuffled with a stable seed so it does not reshuffle on re-render.
- `src/data/languageCurriculum/types.ts`: add the optional `wordBank` field to the fill-in-blank exercise type.
- `src/pages/LanguageLessonView.tsx`: pass `wordBank` through to the component.
- Audit script run after the change: assert every fill-in exercise has a word bank covering all its answers, minimum chip count, and no duplicates; report must be 0 issues.
