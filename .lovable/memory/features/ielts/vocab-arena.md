---
name: Vocab Arena
description: 9 IELTS vocabulary mini games, exit/restart rules, and system scoring via arenaScore
type: feature
---

Vocab Arena (/vocab-arena) rules:
- Every game must have an Exit control; GameEngine takes `onQuit` (confirm dialog). Students can leave a Classroom Battle waiting room (participant row deleted).
- "Play again" must never call `window.location.reload()`. Mini games restart by remounting with a new `key` (runId) so player name and Solo/Team mode survive.
- Arena screen is synced to `?screen=<phase>` so the browser Back button steps back inside the Arena.
- All mini games log through `src/components/vocab-arena/arenaScore.ts` (`logArenaGame`): game_scores row `vocab-arena-<game>`, activity log, and `recordVocabReviewTracked("ielts", correctWords)` so correct answers feed the 3D Vocabulary Brain and daily mission.
- Word pools use `pickWords` from gameFx: up to 60% starred words (localStorage `ielts_mastered`), rest random.
- 9 games: memory, hunt, sprint, synonym, scramble (MiniGames.tsx) + collocation, oddone, cloze, listen (games/ExtraGames.tsx). Collocation options mask the head word so the answer is not given away.
