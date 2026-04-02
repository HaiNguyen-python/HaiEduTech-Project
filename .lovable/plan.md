

## Plan: Add Leaderboard and Sentence Count to Speaking Coach

### What we're building
1. A leaderboard sidebar in the Speaking Coach that shows top performers, using the existing `game_scores` table with a new game type (e.g., `speaking_english`, `speaking_finnish`, `speaking_chinese`)
2. Display total sentence count prominently in the theme selection view

### Changes

**1. Save speaking scores to database**
- In `src/components/AISpeakingCoach.tsx`, after computing accuracy and updating local stats, insert a record into `game_scores` table for authenticated users
- Use `game_type` = `speaking_{language}` (e.g., `speaking_english`)
- Store cumulative session score and max streak

**2. Add Leaderboard to Speaking Coach UI**
- Import and render `GameLeaderboard` component in `src/components/AISpeakingCoach.tsx`
- Place it in the theme selection view (right side or below stats bar)
- Pass `gameType="speaking_{language}"` and `currentScore` from current session stats
- The existing `GameLeaderboard` already handles realtime updates, profile name fetching, and ranking display

**3. Display total sentence count**
- In the theme selection view of `AISpeakingCoach.tsx`, add a summary badge/card showing total available sentences across all themes (e.g., "100 sentences available")
- Calculate by summing `theme.sentences.length` across all themes in `config.themes`

### Files to modify
- `src/components/AISpeakingCoach.tsx` — add score saving to DB, import GameLeaderboard, add sentence count display

### Technical details
- Score insertion uses `supabase.from("game_scores").insert(...)` with `user_id`, `score`, `max_streak`, `game_type`, `accuracy`, and `metadata`
- Only authenticated users get their scores saved (check `supabase.auth.getUser()`)
- The `game_scores` table already has appropriate RLS policies (users can insert own, all authenticated can view)
- No database migration needed — reuses existing `game_scores` table

