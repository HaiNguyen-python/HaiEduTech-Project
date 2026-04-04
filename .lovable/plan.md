

## Plan: Show All Students in Vocabulary Leaderboard

### Problem
The leaderboard currently only shows students who have scores in `game_scores`. Students who haven't started yet are invisible, reducing competitive motivation.

### Solution
Fetch **all student profiles** from the `profiles` table, then merge with `game_scores` data. Students without scores appear at the bottom with score 0, so everyone sees their rank.

### Changes in `src/components/VocabMasteryLeaderboard.tsx`

1. **Fetch all profiles first** — query `profiles` table for all users (not just those with scores)
2. **Left-join with scores** — merge profile list with best scores from `game_scores`, defaulting to 0
3. **Remove `.slice(0, 10)` limit** — show all students (with scroll if many), or increase to 50
4. **Add `max-h` + scroll** — add `max-h-[400px] overflow-y-auto` to the entries container so it stays manageable with many students
5. **Highlight current user's row** — already implemented, keeps working

### Technical Detail

```typescript
// 1. Fetch ALL profiles
const { data: allProfiles } = await supabase
  .from("profiles")
  .select("id, full_name");

// 2. Fetch scores for this subject
const { data: scoreData } = await (supabase as any)
  .from("game_scores")
  .select("user_id, score")
  .eq("game_type", `mastery-${subject}`)
  .order("score", { ascending: false });

// 3. Build best-score map
const bestScores = new Map<string, number>();
for (const row of scoreData || []) {
  const existing = bestScores.get(row.user_id);
  if (!existing || row.score > existing) bestScores.set(row.user_id, row.score);
}

// 4. Merge: all profiles + their scores (default 0)
const merged = (allProfiles || []).map(p => ({
  user_id: p.id,
  score: bestScores.get(p.id) || 0,
  display_name: p.full_name || "Student",
})).sort((a, b) => b.score - a.score);
```

### Note
The `profiles` SELECT policy requires teacher/admin role OR `auth.uid() = id`. Regular students can only see their own profile. To show all names, we need to add an RLS policy allowing authenticated users to read `full_name` from all profiles. A new migration will add:

```sql
CREATE POLICY "All authenticated can view profile names"
ON public.profiles FOR SELECT TO authenticated
USING (true);
```

This is safe since profiles only contain `full_name` and `avatar_url`.

### Files to modify
- `src/components/VocabMasteryLeaderboard.tsx` — fetch all profiles, merge with scores, add scrollable container
- **Database migration** — add SELECT policy on `profiles` for all authenticated users

