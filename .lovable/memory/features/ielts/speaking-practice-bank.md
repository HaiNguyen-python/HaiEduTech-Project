---
name: IELTS Speaking Practice bank
description: Question bank sizes, topic merging rules and per-phrase audio in /ielts-speaking-practice
type: feature
---
/ielts-speaking-practice (src/pages/SpeakingPractice.tsx):
- Bank: Part 1 = 301 Qs / 48 topics (min 5 per topic), Part 2 = 188 cue cards, Part 3 = 190 Qs / 15 topics.
- Part 3 topic chips are merged via TOPIC_ALIASES in src/data/speakingPartClassifier.ts (Work & Career -> Work, Urbanization -> Cities, Culture & Society + Globalization -> Culture, Money & Economy -> Money, Health & Lifestyle -> Health, Media & Communication -> Media, Crime & Law -> Society, Tourism -> Travel).
- Useful Language & Ideas tabs (Vocabulary / Structures / Ideas) each have per-item audio (normal + slow) plus a "Listen to all" bar via src/components/speaking/UsefulLanguageAudio.tsx. Audio stops on question change, part change and when recording starts.
- Every model answer must use at least one phrase from its own vocabulary bank and keep ** markers balanced; enforced by scripts/audit_speaking_practice.ts (must report 0 issues).
