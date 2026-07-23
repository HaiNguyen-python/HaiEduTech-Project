## Goals & To-do polish plan

### 1. Faster Add button (TaskComposer)
Problem: Add waits for the `align-study-task` AI edge function before inserting, so users wait 1-3s.
Fix: Optimistic insert first (goal_id=null, contribution_pct=0). Fire AI alignment in the background; when it returns, `UPDATE study_tasks` with goal_id / contribution_pct / ai_rationale and patch local state. Add button reflects immediately; alignment chip appears a moment later.

### 2. Clearer priority labels -> difficulty labels
Rename the Select in `TaskComposer.tsx` and the priority pills in `TaskList.tsx`:
- `low` -> "Easy Task" (VI: "Dễ")
- `medium` -> "Medium Task" (VI: "Vừa")
- `high` -> "Difficult Task" (VI: "Khó")

Keep the underlying DB `priority` values (`low|medium|high`) unchanged to avoid a migration. Only labels/copy change. Adjust `PRIO_STYLES` color mapping accordingly (Easy=emerald, Medium=amber, Difficult=rose) and drop the redundant 5-dot `difficulty` display since priority now encodes it. `weightForTask` keeps its current numeric weights.

### 3. Auto-progress from real learning activity
Data source: `student_activity_log` (already populated by every practice module: IELTS, HSK, Programming, Speaking Coach, etc.) plus `user_vocab_mastered`.

Mechanism:
- Map `StudyGoal.category` to activity buckets:
  - `ielts` -> activity_type LIKE 'ielts_%' + vocab subject IELTS
  - `hsk` -> hsk_/hskk_/conv_chinese/vocab subject HSK
  - `yki` -> conv_finnish/speaking_coach_finnish/vocab subject Finnish
  - `programming` -> python_/sql_/coding_ etc.
  - `other` -> counts any activity
- New helper `useGoalActivityProgress(goal)` fetches, since `goal.created_at`, the count of matching activities and mastered words scoped to the current user.
- Compute `activity_progress_pct = min(100, activities * 0.5% + mastered_words * 0.3%)` (tunable per category), capped so activity alone can reach ~60% of a goal - remaining ~40% comes from checked tasks.
- Display in `GoalCard`: split progress bar shows "Tasks X% + Activity Y% = Total Z%". Goal's stored `progress_pct` becomes `tasks_pct + activity_pct` clamped to 100 (computed live; DB field still stores manual/task-based number for backward-compat).
- Also surface an "Activity feed" mini list on the card (last 3 relevant activities).

### 4. Replace "Behind Schedule" warning with encouragement
In `GoalCard.tsx`, when `isLagging` is true, replace the amber "Behind schedule - add tasks today" strip with a rotating motivational line (VI/EN), e.g. "Cố lên! Mỗi bước nhỏ hôm nay là một chiến thắng lớn ngày mai." / "Keep going - small steps today build big wins tomorrow." Pick from a small pool (5-6 lines) seeded by goal.id for stability, styled indigo/emerald instead of amber.

### 5. Full QA sweep before publish
Verify and fix any of:
- Toggle-complete no longer double-adds contribution if user un-checks then re-checks (subtract on uncheck).
- Delete goal cascades: unlink tasks (`goal_id = null`) so orphan tasks remain visible.
- Empty-goal analytics: gauge/heatmap render at 0 without NaN.
- `progress_pct` never exceeds 100 or goes negative.
- Overdue goals show ETA gracefully.
- Dark mode contrast on new labels/motivation banner.
- Mobile: TaskComposer wraps, no overflow.

### 6. Suggested next-step features
Presented as a short list at the end of the plan so you can pick which to build later:
- Recurring tasks ("every Mon/Wed/Fri") + streak per goal.
- Pomodoro timer per task with time logged into `student_activity_log`.
- Weekly review card: AI summary of what worked / what to change.
- Sub-tasks / checklist inside a task.
- Shareable goal card (image export) for social motivation.
- Goal templates (IELTS 6.5 -> 7.5 in 90 days, YKI A2 in 60 days, HSK 3 in 45 days).
- Calendar view + drag-drop reschedule.
- Push/email nudge when daily completion < 40% by 20:00.

### Technical notes
- Files to edit: `TaskComposer.tsx`, `TaskList.tsx`, `GoalCard.tsx`, `useStudyGoalsTasks.ts`, `studyGoalMath.ts`, plus new hook `useGoalActivityProgress.ts`.
- No schema changes required. Activity progress is derived at read-time from `student_activity_log` + `user_vocab_mastered`.
- Toggle-uncheck fix: subtract `contribution_pct` from goal when un-completing.
