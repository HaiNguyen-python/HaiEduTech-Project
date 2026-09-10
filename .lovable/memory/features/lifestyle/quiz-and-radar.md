---
name: Lifestyle quizzes and soft-skills radar
description: Every Lifestyle Academy lesson dialog ends with a 4-question bilingual quiz; results feed a 6-pillar soft-skills radar on the Lifestyle page and student dashboard
type: feature
---
- Quizzes are generated deterministically per lesson by `src/lib/lifestyleQuizBuilder.ts` (4 bilingual MCQs, 4 options, hidden answers until submit, explanation after submit, retry). Hand-written exceptions go in `src/data/lifestyleQuizzes.ts` (`LIFESTYLE_QUIZ_OVERRIDES`).
- Pass mark 3/4 (`LIFESTYLE_QUIZ_PASS_RATIO = 0.75`) marks the lesson complete; the card shows a "Done" badge and best score. Below 75% the card shows "Chưa đạt - làm lại" and the lesson does NOT count anywhere.
- Progress: `src/hooks/useLifestyleProgress.ts` - localStorage (`het:lifestyle-quiz-progress-v1`) for guests, `public.lifestyle_lesson_progress` (owner-only RLS, unique user_id+lesson_id) for signed-in users. `completed` is always re-derived from the score (`isPassed`), so legacy rows below 75% are ignored. Best attempt is kept locally AND upserted remotely. Activity logged as `lifestyle_quiz`.
- `src/components/lifestyle/SoftSkillsRadar.tsx`: 6 axes (Finance, Etiquette, Presence, Wellness, Self-Study, Events). Axis value = percentage of lessons PASSED (75%+) in that pillar; quiz average is over passed lessons only; empty state until at least one lesson passes.
- Lesson cards are whole-card clickable (Enter/Space) flex columns so the open button is never clipped.
- `LessonDialog`: `max-w-5xl max-h-[90vh]` flex column with cover image inside the single scroll area, so the pop-up never overflows the top of the screen.
- Deep-dive depth: `src/data/lifestyleDeepDive/*` (one file per pillar, `LIFESTYLE_DEEP_DIVE_BOOST`) appends 2 extra bilingual paragraphs (real situation + apply-this-week) to every lesson; merged in `withDepth` in `lifestyleAcademyLessons.ts`.
- `scripts/audit_lifestyle.ts` validates quiz shape plus deep dive >= 4 paragraphs and >= 1000 chars per language for all 102 lessons; must stay at issues 0.

- All view groups lessons into 6 collapsible pillar sections (order: finance, etiquette, presence, wellness, selfstudy, partying) in `LifestyleAcademy.tsx` (`PillarLessonGroup`); open/closed state persists in localStorage `het:lifestyle-groups-open-v1`, with Expand/Collapse all. Filtered or search views stay a flat grid.
- `scripts/audit_lifestyle.ts` also enforces one illustration pointer per lesson id in `src/assets/lifestyle/`.
