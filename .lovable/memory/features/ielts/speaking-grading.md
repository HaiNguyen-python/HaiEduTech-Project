---
name: IELTS Speaking grading fairness
description: grade-speaking calibration rules (no word-count caps, ASR tolerance) and the Band 8 self-upgrade panel on /ielts-speaking-practice
type: feature
---
`supabase/functions/grade-speaking/index.ts`:
- No word-count band ceilings. Part 1 answers of 20-40 words are normal and may reach Band 7+; length only limits Fluency & Coherence when undeveloped (Part 2/3).
- ASR tolerance block: ignore punctuation, casing, single missing articles/plural-s, mis-heard homophones. Only report errors the speaker certainly made.
- Pronunciation is an estimate from pacing/rhythm, no 6.5 ceiling, normally Band 5-8, and the feedback must say it is transcript-based.
- Overall = round-to-0.5 average of the four criteria, no manual adjustment. A confident accurate short answer must not drop below 6.0 for shortness alone.
- Calibration check: weak answer ~5.0, strong short Part 1 answer ~7.0.
- Quick fallback scores set `fastScore` and the page labels them as an estimate, not a band.

`src/pages/SpeakingPractice.tsx`: post-grade "Nâng cấp bài nói của bạn (Band 8.0+)" panel calls `upgrade-speaking` with `{ question, part, transcript }`, renders `**bold**` upgrades via DOMPurify, and offers Listen / Regenerate.
