---
name: Game score and brain integration
description: All arcades/mini-games save runs via finishGame (submitGameScore + recordVocabReviewTracked); replay remounts instead of page reload
type: feature
---
Shared helper: `src/lib/gameSession.ts`
- `finishGame({ gameType, score, maxStreak?, accuracy?, difficulty?, subject?, correctWords? })` writes the run to `game_scores` and, when `subject` + `correctWords` are given, records those words as reviews so the 3D Vocabulary Brain and SRS see arcade practice.
- `useGameAudioCleanup()` cancels speech synthesis on unmount for any game that speaks.

Rules for every game:
- Never use `window.location.reload()` for "Play again". Games take an `onRetry` prop; the hub bumps a `runId` and passes `key={...}` to remount.
- Submit each run exactly once (guarded by a `savedRef`/`scoreSubmittedRef`), reset the guard when the player replays.
- Subject keys by language: en/IELTS -> `ielts`, zh -> `hsk`, vi -> `vietnamese`, fi -> `finnish-vocab`.
- Game type ids in use: `hanzi_shooter_*`, `hotpot_chef_*`, `pinyin_runner_*`, `sentence_builder_*`, `meteor_zh_*`, `vi_pho_match`, `vi_bong_nuoc_pop`, `vi_fact_or_myth`, `fi_sauna_match`, `fi_reindeer_runner`, `fi_inflection_detective`, `arcade_plus_meteor_*`, `code_galaxy_*`, `prog_sql_dungeon`, `prog_pipeline_plumber`, `prog_ai_tuner`.
- SQL Dungeon has 10 bilingual riddles; Code Galaxy has 14 snippets per track. Code snippets and tokens stay English-only.
