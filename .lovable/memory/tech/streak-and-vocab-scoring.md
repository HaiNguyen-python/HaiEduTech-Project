---
name: Streak and vocabulary scoring rules
description: Streak days count per Vietnam local day; mastered-vocab writes must never be dropped by the burst limiter.
type: feature
---

# Streak
- `get_user_streak` and `get_streak_leaderboard` bucket `student_activity_log.created_at` by `Asia/Ho_Chi_Minh` day (never raw UTC date) and skip `session_heartbeat`. Using UTC lost every session after 17:00 VN time and broke streaks.

# Mastered vocabulary score
- Trigger `prevent_vocab_mastered_burst` rejects more than 8 marks / 60s. Client must NOT drop those words: `useMasteredVocab` queues them in `vocab_mastered_pending_<subject>` and drains one word every 12s, so the leaderboard count matches the local "You mastered N words" number.
- Subject keys: `ielts`, `hsk`, `sat`, `toeic`, `swedish`, `vietnamese`, `cambridge-yle`, plus two Finnish banks (`finnish` = YKI dashboard, `finnish-vocab` = Finnish Vocabulary page).
