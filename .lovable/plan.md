# Lifestyle: content review + new "Self-Study Skills" pillar

## What exists today
Lifestyle Academy has 4 pillars with 60 lessons total (Finance 15, Etiquette 15, Presence 15, Wellness 15). Every lesson already carries bilingual title, subtitle, takeaways, a named framework, reflection prompt, drill, "why it matters", deep dive paragraphs and emoji art. The content audit currently reports 0 issues.

## What to add

### 1. New pillar: Kỹ năng Tự học / Self-Study Skills
A fifth pillar sitting alongside the others, same card look and same lesson layout, with its own colour (indigo/violet) and icon.

15 lessons across 3 levels:

Foundation (5)
- Learning how to learn: how memory actually works
- Active recall vs re-reading
- Spaced repetition: building a personal review schedule
- Deep work blocks and the 50/10 rhythm
- Note-taking that you actually reuse (Cornell + Zettelkasten basics)

Intermediate (5)
- Feynman technique: explain it to a 12-year-old
- Interleaving and desirable difficulty
- Reading hard material: previewing, questioning, summarising
- Beating procrastination: the 2-minute start and task shaping
- Self-testing and error logs: turning mistakes into a syllabus

Mastery (5)
- Designing a 12-week self-study curriculum
- Learning from AI without outsourcing your thinking
- Metacognition: calibrating "I know this" against reality
- Focus environment and digital hygiene
- Teaching, projects and public output as the final exam

Each lesson gets: 4-5 concrete takeaways, a named framework, a reflection question, a 5-15 minute drill, "why it matters", 2-3 deep-dive paragraphs, emoji art, minutes and medium (read/audio/practice) - same standard as existing lessons, fully bilingual VI/EN, no em-dashes.

### 2. Content top-up for the 4 existing pillars
Add 3 lessons per pillar (12 new), filling gaps found in review:
- Finance: taxes and payslips for students, first job salary negotiation, avoiding online scams
- Etiquette: written etiquette in email/chat, giving and receiving feedback, dining and hosting abroad
- Presence: recovering after failure, boundary setting and saying no, energy management across a week
- Wellness: eye and posture care for screen life, hydration and simple nutrition, movement snacks for study days

### 3. Clarity pass
Re-read all 60 existing lessons for vague wording, missing concrete numbers/examples, and level mislabels; tighten anything abstract into specific, do-it-today instructions.

## Technical notes
- Extend `LifestylePillarKey` with `selfstudy` in `src/data/lifestyleAcademyLessons.ts`; add the pillar to the merge chain and to `PILLAR_STYLES` + `PILLARS` in `src/pages/LifestyleAcademy.tsx` (indigo theme, `GraduationCap`/`Brain` icon).
- New lesson data in `src/data/lifestyleSelfStudyLessons.ts` plus `src/data/lifestyleAcademyLessonsExpansion5.ts` for the 12 top-up lessons; interleave per pillar so ordering stays foundation → intermediate → mastery.
- IDs follow existing convention (`ss-01`…`ss-15`, `fin-16`…, etc.); no existing IDs change, so saved progress and links keep working.
- Add a nav/menu entry for the pillar if the Lifestyle dropdown lists pillars.
- Extend `scripts/audit_lifestyle.ts` to cover the new pillar and assert per-level counts; then run the audit, TypeScript check and a desktop + mobile browser pass before reporting done.

Total after the work: 87 lessons across 5 pillars.
