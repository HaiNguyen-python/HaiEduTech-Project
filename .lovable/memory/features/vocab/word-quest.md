---
name: Word Quest vocabulary mode
description: Fourth learning tab on IELTS Vocabulary - stage map of 8 words, 4 gentle steps per word, stars/combo, no timer
type: feature
---

`src/components/vocab/WordQuest.tsx` (tab "Word Quest" in `src/pages/IeltsVocabulary.tsx`, next to Vocabulary / Flashcard / Practice):
- Words split into stages of 8; stage map unlocks the next stage only when the previous one is complete.
- Each word walks 4 steps: meet word (emoji + IPA + TTS) -> pick meaning (same-topic distractors) -> listen and choose spelling -> type the word with progressive letter hints.
- Stars + combo counter, stage-complete celebration overlay. No timer, no penalties; wrong answers just retry.
- Progress persisted locally under `ielts_word_quest_v1` via `safeStorage`. Finishing a word marks it mastered through `toggleMastered` (feeds badges/leaderboards). No DB changes.
- Practice tab and Word Quest both stay mounted (hidden) so switching tabs never resets progress.
- Practice tab has a sticky top result/Next bar plus a mobile bottom Next bar, and Enter/ArrowRight shortcuts.
