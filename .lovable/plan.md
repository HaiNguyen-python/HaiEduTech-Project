

## Plan: IELTS Vocabulary — 2-Column Layout + Streak Leaderboard (Public)

### Changes Overview

**1. Grid layout: 2 columns instead of 3**
- Change list grid from `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` → `grid-cols-1 lg:grid-cols-2`
- This gives each card more horizontal space, reducing cramped appearance
- Also update flashcard grid similarly

**2. Create Streak Leaderboard component**
- New component: `src/components/StudyStreakLeaderboard.tsx`
- Calculates each user's study streak from the `student_activity_log` table (consecutive days with activity counting backwards from today)
- Shows ALL profiles (including those with 0 streak) to motivate students
- Works for both logged-in and non-logged-in users (uses anon-safe query)
- Displays flame icon 🔥 and streak count

**3. Database: Add RLS policy for public read on student_activity_log**
- Need a new SELECT policy on `student_activity_log` allowing anon users to read (limited to date aggregation only)
- Alternative: Create a database function `get_streak_leaderboard()` that returns user_id + streak count, avoiding exposing raw activity data
- **Preferred approach**: Use a security-definer function that computes streaks server-side and returns only `(display_name, streak_days)` — no raw data exposed

**4. Update sidebar to show both leaderboards**
- In `IeltsVocabulary.tsx`, the sidebar (w-72) will stack:
  1. VocabMasteryLeaderboard (existing)
  2. StudyStreakLeaderboard (new)

**5. Public visibility (unauthenticated users)**
- Both leaderboards will be visible to everyone
- The profiles table already has a SELECT policy for authenticated users
- Need to add an anon SELECT policy on `profiles` for `full_name` only, OR use the security-definer function approach

### Technical Details

**Database migration** — Create a security-definer function:
```sql
CREATE OR REPLACE FUNCTION public.get_streak_leaderboard()
RETURNS TABLE(display_name text, streak_days integer)
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH user_dates AS (
    SELECT user_id, DATE(created_at) as activity_date
    FROM student_activity_log
    GROUP BY user_id, DATE(created_at)
  ),
  streaks AS (
    SELECT ud.user_id,
      (SELECT COUNT(*)::integer FROM generate_series(0, 364) AS i
       WHERE EXISTS (
         SELECT 1 FROM user_dates ud2
         WHERE ud2.user_id = ud.user_id
         AND ud2.activity_date = CURRENT_DATE - i
       )
       AND (i = 0 OR EXISTS (
         SELECT 1 FROM generate_series(0, i-1) AS j
         WHERE EXISTS (
           SELECT 1 FROM user_dates ud3
           WHERE ud3.user_id = ud.user_id
           AND ud3.activity_date = CURRENT_DATE - j
         )
       ))
      ) as days
    FROM (SELECT DISTINCT user_id FROM user_dates) ud
  )
  SELECT COALESCE(p.full_name, 'Student')::text, COALESCE(s.days, 0)
  FROM profiles p
  LEFT JOIN streaks s ON s.user_id = p.id
  ORDER BY COALESCE(s.days, 0) DESC, p.full_name
  LIMIT 50;
END;
$$;
```

Actually, a simpler approach: compute streaks client-side by calling the function via `supabase.rpc('get_streak_leaderboard')`. This avoids complex SQL. Let me simplify the function.

### Files to modify
- `src/pages/IeltsVocabulary.tsx` — change grid to 2 columns, add streak leaderboard in sidebar
- `src/components/StudyStreakLeaderboard.tsx` — new component using RPC function
- **Database migration** — create `get_streak_leaderboard()` function
- `src/components/VocabMasteryLeaderboard.tsx` — add anon support (allow fetching without auth)

### Also fix
- The `cambridgeLecturesExpansion2.ts` build errors (if they still exist) — verify and fix any `answer` fields that are strings instead of numbers

