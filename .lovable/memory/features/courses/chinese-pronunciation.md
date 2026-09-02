---
name: Chinese Pinyin Pronunciation
description: /chinese/pronunciation - 6 bilingual lessons (syllable structure, initials, finals, tones, tone sandhi, Vietnamese traps), 61 quizzes with audio, progress in localStorage
type: feature
---
Data: `src/data/chinesePronunciation.ts` (types SoundItem, SoundGroup, PronQuiz, PronLesson). Page: `src/pages/ChinesePronunciation.tsx`.
- Audio via `playChineseTts` / `stopChineseTts`; each sound row and "Play whole group slowly" button.
- Quiz options are Vietnamese by default; descriptive (non-pinyin) options carry `optionsEn` so English mode never mixes languages.
- Progress saved with `safeStorage` under key `chinese-pronunciation-progress`.
- Entry points: Navbar Chinese submenu "🔊 Phát âm Pinyin", CTA button on `/chinese`, links out to `/chinese/tone-drill` and `/speaking-coach/chinese`.
Related fix: `HskVocabulary.tsx` must keep `hskVocabData` in the `filtered` memo deps (dynamic import) or the list shows 0 results.
