---
name: Learning DNA PDF Report
description: Bilingual 2-page A4 PDF export of a student's Learning DNA from the admin dashboard, plus the activity-logging coverage it depends on.
type: feature
---

# Learning DNA PDF report

- Engine: `src/lib/learningDnaReport.ts` (`buildReportData` → `buildReportPages` → `exportLearningDnaPdf` via jsPDF + html2canvas).
- UI: `src/components/admin/LearningDnaExportButton.tsx`, lazy-loaded in the Learning DNA card of `src/pages/AdminDashboard.tsx`. Periods: 30d / 90d / all.
- Page 1: KPI cards (activities, avg score, study time, active days, streak, trend), skill radar, domain bars, estimated IELTS bands, weekly average line.
- Page 2: skill table (max 9 rows), strengths / needs-improvement chips, bilingual notes (max 3), footer facts.
- Layout is fixed A4 (`PAGE_W`/`PAGE_H`); keep the row/note caps or content overflows the footer.
- Numbers come only from `student_activity_log` / `user_vocab_mastered`. Only IELTS band values are converted estimates.

## Activity logging added for the report
`programming_lesson_quiz` (ProgrammingLesson), `ai_academy_track` (AIAcademy), `swedish_reading_review` (SwedishReadingReviewQuiz).
When adding a new module, call `logStudentActivity` at a real graded finish point, else RL treats the student as inactive.
