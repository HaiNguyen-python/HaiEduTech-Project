

## Plan: Add Vocabulary Leaderboards Across All Subjects

### Problem
Leaderboards currently only appear after completing quiz exercises. Students cannot see their ranking while browsing vocabulary or marking words as mastered.

### Solution
Add a persistent "Mastered Words Leaderboard" sidebar/section to all vocabulary pages. When a student marks a word as mastered, their mastered count is saved to the database and displayed on the leaderboard alongside other students.

### What changes

**1. Create a new `VocabMasteryLeaderboard` component**

A reusable component that:
- Displays top 10 students by number of mastered words for a given subject
- Shows the current user's rank and mastered count
- Updates in real-time when new mastery data is saved
- Uses the existing `game_scores` table with a new `game_type` pattern like `mastery-ielts`, `mastery-hsk`, `mastery-toeic`, `mastery-finnish`

**2. Save mastered word counts to database**

Currently, mastered words are only stored in localStorage. Add a function that syncs the mastered count to `game_scores` whenever a word is marked/unmarked as mastered (for logged-in users). The `score` field = number of mastered words, `game_type` = `mastery-{subject}`.

**3. Add leaderboard to each vocabulary page**

- `src/pages/IeltsVocabulary.tsx` — add leaderboard panel next to the word list/flashcard view
- `src/pages/ToeicVocabulary.tsx` — add leaderboard panel (also add mastered word tracking, which is currently missing)
- `src/pages/HskVocabulary.tsx` — add leaderboard panel next to the word list
- `src/pages/YkiDashboard.tsx` — add leaderboard in the vocabulary pillar view

### Files to create
- `src/components/VocabMasteryLeaderboard.tsx` — new reusable leaderboard component

### Files to modify
- `src/pages/IeltsVocabulary.tsx` — sync mastered count to DB, add leaderboard
- `src/pages/HskVocabulary.tsx` — sync mastered count to DB, add leaderboard
- `src/pages/ToeicVocabulary.tsx` — add mastered word system + sync to DB + leaderboard
- `src/pages/YkiDashboard.tsx` — sync mastered count to DB, add leaderboard in vocab pillar

### Technical details

The `VocabMasteryLeaderboard` component will:
- Query `game_scores` where `game_type = 'mastery-{subject}'`, ordered by score descending, limit 10
- Use `upsert` logic: when mastered count changes, update the user's existing row (or insert if new)
- Subscribe to realtime changes on `game_scores` for live updates
- Show rank icons (crown, medal) for top 3, current user highlighted

Sync function pattern:
```typescript
async function syncMasteredCount(subject: string, count: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  // Upsert: use game_scores with game_type = `mastery-${subject}`
  await supabase.from("game_scores").upsert({
    user_id: user.id,
    game_type: `mastery-${subject}`,
    score: count,
    max_streak: 0,
  }, { onConflict: "user_id,game_type" });
}
```

Note: `game_scores` doesn't have a unique constraint on `(user_id, game_type)`, so we'll query for existing row first and update or insert accordingly.

### No database changes needed
Reuses the existing `game_scores` table.

