---
name: Daily Word Mission (SRS)
description: Fifth tab on IELTS Vocabulary - spaced repetition daily mission with self-rating, streak and auto-mastery
type: feature
---

`src/lib/vocab/srsEngine.ts` - simplified SM-2. Ladder 1/3/7/16/35/70 days. Local only (`safeStorage`):
- `ielts_vocab_srs_v1` = card store (`streak`, `interval`, `due`, `last`, `reps`, `lapses`).
- `ielts_vocab_srs_streak_v1` = day streak.
- `buildMission(bank, keyOf, store, {reviewCount,newCount})` -> due words (oldest due first) + new words.
- `reviewCard(card, grade, correct)`; grades `forgot | hard | good | easy`.
- `MASTER_STREAK = 4` -> word auto-marked mastered via `useMasteredVocab("ielts")`.

`src/components/vocab/DailyWordMission.tsx` - setup (sliders 5-30 review / 0-20 new) -> run -> summary.
Question types: meaning MCQ, listen-and-type, sentence gap (`maskWord`), quick recall. Forgotten/wrong words are re-queued in the same session. Summary shows reviewed/correct/levelled-up/streak and "tomorrow N words due".

`src/pages/IeltsVocabulary.tsx` - tab `mission` with an orange due-count badge (polls `countDue` every 5s); the component stays mounted when switching tabs.

Word Quest upgrades: 5th step (pick the word to complete its example sentence), wrong words re-queued to the end of the stage, stage medals 🥇/🥈/🥉 by mistake count, resume button, combo bonus stars (x2 at 2, x3 at 4), slow-playback listen buttons.
