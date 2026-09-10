---
name: Word Quest vocabulary mode
description: Shared game-style vocabulary mode - Sets of 10 stages, 10 exercise types, interleaved rounds of 3 words, mic "say it back"
type: feature
---

`src/components/vocab/WordQuest.tsx` is shared by IELTS/English, Vietnamese, HSK,
Japanese, Finnish and Swedish vocabulary pages (tab "Word Quest").

## Map structure (2026-09)
- words -> stages of 8 (`STAGE_SIZE`) -> **Sets of 10 stages** (`SET_SIZE`), so long
  banks (1800 words) show ~23 compact Set cards instead of 200+ stage cards.
- Default view = Set list (progress %, words done, medals). Open a Set to see its
  10 stages. A Set unlocks when the previous Set's last stage is complete.
- Progress key per subject (`ielts_word_quest_v1`, `hsk_word_quest_v1`, ...),
  backward compatible: `{ stages, medals, resume }` in `safeStorage`.

## Exercise engine
- 10 `StepKind`s: meet, meaning, listen, type, gap, speak (mic), recall, build,
  usage, reverse.
- Each stage runs in **interleaved rounds of 3 words**: intro ("meet") steps
  first, then exercises round-robin so the same word is never asked twice in a
  row. New words get meet + 2 easy kinds; already-mastered words (`knownKeys`)
  skip the intro and get 3 harder kinds.
- Kinds are filtered by available data (gap/usage need an example, speak needs
  Web Speech support) and avoid repeating the previous kind.
- A wrong answer queues **one** pending retry per word with a *different* kind.
- `speak` step uses `useSpeechRecognizer` with a per-page `speechLang`
  (en-US, vi-VN, zh-CN, ja-JP, fi-FI, sv-SE); falls back to listen-and-repeat
  text when the browser has no speech recognition.
- Stars/combo, bronze/silver/gold medal by stage mistakes, celebration overlay.
  No timer, no penalties. Mastery still flows through `onWordLearned`.

## Multi-language rollout
Word Quest and Daily Word Mission are driven by `QuestItem` adapters in
`src/lib/vocab/vocabAdapter.ts`. Typing/build answers use romanization for
Chinese (pinyin) and Japanese (romaji). Progress is local only; no DB changes.
