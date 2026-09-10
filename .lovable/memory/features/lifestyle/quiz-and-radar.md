---
name: Lifestyle quizzes and soft-skills radar
description: Every Lifestyle Academy lesson dialog ends with a 4-question bilingual quiz; results feed a 6-pillar soft-skills radar on the Lifestyle page and student dashboard
type: feature
---
- Quizzes are generated deterministically per lesson by `src/lib/lifestyleQuizBuilder.ts` (4 bilingual MCQs, 4 options, hidden answers until submit, explanation after submit, retry). Hand-written exceptions go in `src/data/lifestyleQuizzes.ts` (`LIFESTYLE_QUIZ_OVERRIDES`).
- Pass mark 3/4 (`LIFESTYLE_QUIZ_PASS_RATIO = 0.75`) marks the lesson complete; the card shows a "Done" badge and best score.
- Progress: `src/hooks/useLifestyleProgress.ts` - localStorage for guests, `public.lifestyle_lesson_progress` (owner-only RLS, unique user_id+lesson_id) for signed-in users. Best attempt is kept. Activity logged as `lifestyle_quiz`.
- `src/components/lifestyle/SoftSkillsRadar.tsx`: 6 axes (Finance, Etiquette, Presence, Wellness, Self-Study, Events), value = quiz accuracy averaged over all lessons of the pillar; shows quiz average and weakest pillar; `compact` variant used on the dashboard overview.
- Lesson cards are whole-card clickable (Enter/Space) flex columns so the open button is never clipped.
- `scripts/audit_lifestyle.ts` also validates quiz shape for all 102 lessons; must stay at issues 0.
