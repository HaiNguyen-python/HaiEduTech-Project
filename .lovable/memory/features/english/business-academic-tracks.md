---
name: Business English and Academic English tracks
description: /english/business and /english/academic - 6 topics x 4 bilingual lessons each, vocab audio, reveal-after-choice quizzes
type: feature
---
- Routes `/english/business` and `/english/academic`, listed in the English dropdown right below "Foundational English" (labels: 💼 Business English / 💼 Tiếng Anh Thương mại, 🎓 Academic English / 🎓 Tiếng Anh Học thuật).
- Shells: `PurposeEnglishCourse.tsx` (Roadmap, Core Lessons, Lab tabs) + `PurposeCoreLearningPath.tsx` (visual learning path) + `PurposeCommunicationLab.tsx`. Legacy `PurposeEnglishHub.tsx` was deleted. Types in `src/data/purposeEnglishTypes.ts`, helpers in `src/lib/purposeEnglishLearning.ts`.
- Core data: `businessEnglishLessons.ts` + `businessEnglishLessons2.ts`, `academicEnglishLessons.ts` + `academicEnglishLessons2.ts`. Each track: 6 topics, 24 lessons, 240 vocab items, 120 questions. Rules: min 10 vocab per lesson, exactly 5 questions with 4 unique options, no duplicate terms, no em-dash.
- Core lesson flow has 5 steps (Understand, Phrases, Model, Guided, Check). Guided practice is generated deterministically from the lesson's own vocab and model lines by `buildGuidedActivities` (meaning, gap, model-function); answers reveal only after a choice. Step progress is real, not a fixed number.
- Business topics: emails, meetings, presenting data, calls/small talk, negotiation and complaints, CV and interviews (STAR).
- Academic topics: academic vocabulary, style/hedging/nominalisation, paragraph writing, reading strategies, lectures and Cornell notes, integrity/referencing/seminar presenting.
- Progress: localStorage `haiedu-business-english-v1` / `haiedu-academic-english-v1` via `safeStorage`; completions log `business_english_lesson` / `academic_english_lesson` activities.
- Business Communication Lab uses the 23 former Professional Communication lessons; Academic Communication Lab uses the 20 former Academic Communication lessons. Interactive Curriculum now displays Life Skills only.
- Extra Lab vocabulary lives in `src/data/purposeLabVocabExtra.ts` and is merged into `conversationalPillars` by lesson id (deduplicated by term), so every Lab lesson has 6 or more entries.
- Audits: `scripts/audit_purpose_english_core.ts` and `scripts/audit_purpose_english_lab.ts`, both at 0 issues. Lab audit allows monologue situations when the lesson has at least one multi-speaker dialogue, and grounds numeric answers via digits or number words in the transcript.
- Legacy `/english/conversational/learn/pro-*` and `/english/conversational/learn/acad-*` links redirect into the matching dedicated track. Existing `conv-eng-progress` is merged idempotently without deleting legacy data.
- Sequential unlocking (exception to the global "everything unlocked" rule, only for these two tracks): students must finish lesson N to unlock N+1, in both Core Lessons and Lab. Helper `sequentialUnlockedIds(orderedIds, done)` in `purposeEnglishLearning.ts`; `PurposeCoreLearningPath` takes `unlockAll`; `PurposeEnglishCourse` sets `unlockAll = isTeacher || isAdmin` from `useUserRole`. Locked cards are disabled with a Lock icon plus "Hoàn thành bài trước để mở bài này"; deep links to locked lab lessons show a toast and fall back to the list.
- All 24 Business Core lessons have explicit bilingual Foundation guidance in three blocks: Core Rule, How to Apply with three ordered steps and a workplace example, and Watch Out. Academic lessons retain their existing teaching split.
