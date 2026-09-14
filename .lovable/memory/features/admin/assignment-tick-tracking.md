---
name: Assignment Tick Tracking
description: Notebook "Bài tập" tab with student checkboxes feeding realtime completion charts in Assignment Management
type: feature
---
- Student side: 4th tab "Bài tập" in FloatingNotebook (`NotebookAssignments.tsx`) lists assignments where `auth.uid()` is in `assignments.target_student_ids`; checkbox toggles `student_submissions.status` between `assigned` and `completed` with `submitted_at`, via upsert on unique index `(assignment_id, student_id)` so legacy assignments without a progress row still work.
- Optimistic tick rolls back with a destructive toast when the write fails; no fake ticks. Badge on the tab shows pending count. Sorting: not-done by soonest deadline, done at the bottom.
- Realtime enabled on `assignments` and `student_submissions` (`supabase_realtime` publication). Admin page debounces refetch by 800ms.
- Teacher side: `AssignmentCompletionCharts.tsx` (Recharts) - per-assignment completion %, top-10 student done/remaining stacked bars, done/pending/overdue donut. Detail sheet lists who ticked vs who has not. Helper `buildStudentCompletion` in `assignmentMetrics.ts`.
- NotificationBell shakes gently every ~4s while unread exist (stronger single shake on a new insert), disabled under `prefers-reduced-motion`.
- No new tables; `student_submissions` is the single source of truth for ticks and stats.
