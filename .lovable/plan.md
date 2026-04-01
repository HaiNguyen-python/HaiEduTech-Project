

# Plan: Flashcard Mode + More Vocabulary + More Mock Exams

## Overview
Three additions: (1) a Flashcard study mode for vocabulary, (2) more vocabulary words per module, (3) additional mock exam sets for all 4 skills.

---

## 1. Flashcard Component (`src/pages/YkiDashboard.tsx`)

Add a **Flashcard mode** toggle alongside the existing vocabulary grid view. When active:
- Cards display one at a time, flip on click (front: Finnish word + image, back: meanings + example)
- Navigation: Previous / Next buttons + card counter (e.g., "3/15")
- Audio play button on front
- Mark as Mastered star on each card
- Keyboard support: Left/Right arrows, Space to flip
- Smooth flip animation using Framer Motion `rotateY`

**UI**: A toggle button group at the top of the vocabulary section: `📖 Cards` | `🃏 Flashcards`

## 2. Expand Vocabulary (`src/data/finnishCurriculum/vocabularyExpansion3.ts` — NEW)

Create a new expansion file with **4 new vocabulary modules** (~60 words total):
- **Tunteet ja luonne** (Emotions & Personality) — 15 words
- **Teknologia** (Technology) — 15 words  
- **Matkailu** (Travel & Tourism) — 15 words
- **Yhteiskunta** (Society & Media) — 15 words

Each module has 1 lesson with vocabulary entries (word, IPA, meanings, examples, category) + 5 quiz questions.

## 3. More Mock Exams (`src/data/finnishCurriculum/mockExamExpansion2.ts` — NEW)

Create a second expansion file with **4 new mock exam modules** (one per skill):
- **Reading** — 3 new sets (news article, rental ad, recipe)
- **Listening** — 3 new sets (phone call, radio, store)
- **Writing** — 3 new sets (complaint letter, job application, invitation)
- **Speaking** — 3 new sets (doctor visit, job interview, apartment viewing)

Each set includes Finnish-only content with theory/transcript + 5 quiz questions.

## 4. Wire Up (`src/data/finnishCurriculum/index.ts` + `src/pages/YkiDashboard.tsx`)

- Export new modules from index.ts
- Import and merge into `allVocabModules` and `allMockExamModules`
- Add VOCAB_IMAGES entries for new words

---

## Files

| Action | File |
|--------|------|
| EDIT | `src/pages/YkiDashboard.tsx` — Add Flashcard mode + import new data |
| CREATE | `src/data/finnishCurriculum/vocabularyExpansion3.ts` — 4 new vocab modules |
| CREATE | `src/data/finnishCurriculum/mockExamExpansion2.ts` — 4 new exam modules |
| EDIT | `src/data/finnishCurriculum/index.ts` — Export new modules |

