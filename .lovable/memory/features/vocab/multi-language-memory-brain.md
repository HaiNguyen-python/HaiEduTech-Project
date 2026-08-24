---
name: Multi-language Vocabulary Memory Brain
description: The 3D memory brain from IELTS Vocabulary is reused on HSK, Swedish, Finnish and Japanese vocabulary pages
type: feature
---

`src/components/vocab/VocabBrainPanel.tsx` is shared, never duplicated. Extra props:
- `accuracyGameType` - overrides the default `vocab-<subject>` key when reading `game_scores` (Finnish logs `vocab-finnish-vocab`).
- `labelOf(storedKey)` - maps the stored mastery key to the neuron label. Swedish stores word ids, so it maps id -> `sv`. Applied to DB rows, local stars and today's reviewed list.
- `speak(text)` - language TTS (chinese/finnish/swedish/japanese); defaults to English TTS.
- `milestones` - badge table; defaults to IELTS bands. HSK uses HSK 1-5, Finnish/Swedish use YKI A1-B2, Japanese uses JLPT N5/N4.

Subjects in `user_vocab_mastered`: `ielts`, `hsk`, `swedish`, `finnish-vocab`, `japanese`.

Japanese had no mastery stars before: `src/pages/Japanese.tsx` now uses `useMasteredVocab("japanese")`, `PhraseRow` takes optional `mastered` / `onToggleMastered` (star only rendered in the Vocab tab), and `JA_WORD_INDEX` (jp -> phrase) feeds the brain tooltips. `onPractice` jumps to the Quiz tab.
