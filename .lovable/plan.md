# To-do List & Study Goal Module

New Dashboard tab placed between **Overview** and **Counseling**, wiring long-term goals, daily tasks, analytics, and an AI Coach — persisted in Lovable Cloud.

## 1. Backend (migration)

Two new tables under `public`, RLS scoped to `auth.uid()`:

**`study_goals`**
- `title`, `description`, `category` (ielts / yki / hsk / programming / other)
- `target_date`, `target_metric` (text, e.g. "Band 7.5")
- `progress_pct` (numeric 0-100, user-updatable)
- `status` (active / completed / archived)

**`study_tasks`**
- `goal_id` (nullable FK → `study_goals`)
- `title`, `notes`
- `priority` (high / medium / low)
- `difficulty` (1-5)
- `contribution_pct` (numeric, AI-assigned weight toward linked goal)
- `due_date` (date), `completed_at` (timestamptz), `is_ai_suggested` (bool)

Full CRUD grants for `authenticated`, `ALL` for `service_role`, standard `updated_at` trigger. No anon access.

## 2. AI edge functions (Lovable AI Gateway, `google/gemini-2.5-flash`)

- **`align-study-task`** — input: task title + user's active goals. Output JSON `{ goal_id, contribution_pct (0-2), rationale }`. Called on task create.
- **`recommend-study-tasks`** — input: goals + last 14 days task completion stats. Output 2-3 tasks `{ title, priority, difficulty, goal_id, contribution_pct, reason }`. Called on-demand by the AI Coach widget.

Both use `streamText`/`generateText` with a small Zod `Output.object` schema, wrapped in `NoObjectGeneratedError` fallback.

## 3. Frontend components (`src/components/dashboard/todo-goal/`)

- `TodoGoalTab.tsx` — section shell, 2-column responsive grid (goals left, tasks right; analytics full-width below).
- `GoalList.tsx` + `GoalCard.tsx` — glass card, gradient progress bar, AI-estimated completion date computed from 14-day velocity vs remaining %.
- `GoalFormDialog.tsx` — create/edit goal.
- `TaskList.tsx` + `TaskItem.tsx` — checkbox, priority pill, difficulty dots, linked-goal chip with contribution badge (`+0.8% → IELTS 7.5`).
- `TaskComposer.tsx` — quick-add input; on submit calls `align-study-task`, then inserts.
- `AnalyticsPanel.tsx`:
  - **Daily Completion Gauge** (Recharts `RadialBarChart`) — weighted by task `contribution_pct` + priority.
  - **30-Day Heatmap** — CSS grid of 30 cells, opacity scaled by completion ratio; hover tooltip.
  - **Goal Bridge Chart** (`ComposedChart`) — bar = daily task contribution, line = cumulative goal progress.
- `AICoachWidget.tsx` — indigo gradient card, "Get today's plan" button → `recommend-study-tasks`; each suggestion has "One-Click Add" that inserts the task pre-linked.

Shared: `useStudyGoals`, `useStudyTasks` hooks (Supabase queries + optimistic updates); `lib/studyGoalMath.ts` for velocity / ETA / weighted completion calculations. Offline fallback via `localStorage` mirror when unauthenticated.

## 4. Dashboard wiring (`src/pages/Dashboard.tsx`)

- Add `TabsTrigger value="todo"` between `overview` and `counseling` with `Target` lucide icon, label `t("Mục tiêu & Việc cần làm", "Goals & To-do")`.
- Add matching `TabsContent value="todo"` rendering `<TodoGoalTab userId={user.id} />`.

## 5. Design system

Uses existing tokens only — `bg-card/60 backdrop-blur`, `border-border`, gradient `from-emerald-500 to-teal-500` (completion), `amber-500` (warning: goal lagging), `indigo-500` (AI). No hardcoded colors in components beyond Recharts fill props sourced from CSS vars. Full dark-mode via existing theme.

## Technical notes

- Recharts already in project; no new deps.
- AI calls debounced; task alignment is best-effort — insert succeeds even if AI errors (falls back to `contribution_pct = 0`, `goal_id = null`).
- Weighted daily completion: `Σ(completed.contribution × priorityWeight) / Σ(planned.contribution × priorityWeight)` where priority weights = {high:1.5, med:1, low:0.7}.
- ETA: `remaining_pct / avg_daily_progress_pct_last_14d` → added to today; clamped and labeled "insufficient data" when velocity is 0.
- All comments in English; Vietnamese/English UI strings via existing `useLanguage().t`.
