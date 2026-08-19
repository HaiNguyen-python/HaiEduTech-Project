---
name: IELTS Speaking SRS
description: Spaced repetition review of speaking weak points collected from AI grading, 1/3/7 day cycle
type: feature
---
Tab "🔁 Luyện lại (SRS)" on `/ielts-speaking-practice` next to Part 1/2/3 and Shadowing.

- After each grading, weak points are auto-collected: `pronunciationFocus` words, `highlightedErrors` (pronunciation/grammar/vocabulary), `vocabularyUpgrades`, and first transcript sentences when Fluency band < 6.5. Max 8 items per grading.
- Ladder: stage 0 -> +1 day, 1 -> +3 days, 2 -> +7 days, 3 -> mastered. "Cần luyện thêm" resets to stage 0.
- Storage: `speaking_srs_items` (RLS per user, unique on user + item_type + content_key); guests use localStorage `ielts-speaking-srs-v1` and sync up on sign-in.
- Files: `src/lib/speakingSrsExtract.ts`, `src/hooks/useSpeakingSrs.ts`, `src/components/ielts/SpeakingSrsPanel.tsx`.
- Each item: TTS model reading + "Say it again" via Web Speech API with a word-match accuracy %.
