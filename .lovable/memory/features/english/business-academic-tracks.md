---
name: Business English and Academic English tracks
description: /english/business and /english/academic - 6 topics x 4 bilingual lessons each, vocab audio, reveal-after-choice quizzes
type: feature
---
- Routes `/english/business` and `/english/academic`, listed in the English dropdown right below "Foundational English" (labels: 💼 Business English / 💼 Tiếng Anh Thương mại, 🎓 Academic English / 🎓 Tiếng Anh Học thuật).
- Shared UI: `src/components/PurposeEnglishHub.tsx` (collapsible topic cards, lesson view, vocab list with normal/slow English TTS, model text, 5-question practice that reveals the answer + bilingual explanation only after a choice). Types in `src/data/purposeEnglishTypes.ts`.
- Data: `businessEnglishLessons.ts` + `businessEnglishLessons2.ts`, `academicEnglishLessons.ts` + `academicEnglishLessons2.ts`. Each track: 6 topics, 24 lessons, 240 vocab items, 120 questions. Rules: min 10 vocab per lesson, exactly 5 questions with 4 unique options, no duplicate terms, no em-dash.
- Business topics: emails, meetings, presenting data, calls/small talk, negotiation and complaints, CV and interviews (STAR).
- Academic topics: academic vocabulary, style/hedging/nominalisation, paragraph writing, reading strategies, lectures and Cornell notes, integrity/referencing/seminar presenting.
- Progress: localStorage `haiedu-business-english-v1` / `haiedu-academic-english-v1` via `safeStorage`; completions log `business_english_lesson` / `academic_english_lesson` activities.
- Upgraded course shell: Roadmap, Core Lessons, and Communication Lab tabs with combined progress, search, category filters, status, and Continue Learning.
- Business Communication Lab uses the 23 former Professional Communication lessons; Academic Communication Lab uses the 20 former Academic Communication lessons. Interactive Curriculum now displays Life Skills only.
- Communication lessons follow Learn, Listen, Speak, Challenge with photo scenarios, phrase audio, multi-voice dialogues, roleplay, hidden transcripts, reveal-after-choice questions, badges, and previous/next navigation.
- Legacy `/english/conversational/learn/pro-*` and `/english/conversational/learn/acad-*` links redirect into the matching dedicated track. Existing `conv-eng-progress` is merged idempotently without deleting legacy data.
