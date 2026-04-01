

# Plan: Finnish Vocabulary Exercises, Chatbot Expansion & Finnish Content Boost

## Overview
Three changes: (1) add new interactive exercise types for Finnish vocabulary, (2) expand chatbot to cover Vietnamese, Finnish, and EdTech topics, (3) massively increase Finnish vocabulary, grammar lessons, and exercises.

---

## Part 1: New Finnish Vocabulary Exercise Types

**Current state**: Finnish vocab only has quiz (multiple-choice) and verb conjugation popups. The `FinnishExercise` type supports `fill-in-blank | multiple-choice | matching | conjugation` but matching and conjugation exercises are not rendered in the UI.

**Changes**:

### File: `src/components/FinnishVocabExercises.tsx` (NEW)
Create a dedicated component with 4 interactive exercise types:
- **Word Matching**: Finnish word on left, English meaning on right — drag or click to match pairs
- **Sentence Gap Fill**: Finnish sentences with blanks, user types the correct word from vocabulary
- **Translation Challenge**: Show English meaning, user types Finnish word (with audio check)
- **Flashcard Rapid Fire**: Timed mode showing word cards, user selects correct meaning from 4 options

### File: `src/pages/YkiDashboard.tsx` (EDIT)
- Add a new "Harjoitukset" (Exercises) tab or section within the vocabulary view
- Render `FinnishVocabExercises` with current module's vocabulary data
- Link exercise completion to the Skier progress system

### File: `src/data/finnishCurriculum/vocabularyData.ts` & `vocabularyExpansion.ts` (EDIT)
- Add exercise data (fill-in-blank sentences, matching pairs) to each vocabulary lesson

---

## Part 2: Expand Chatbot Scope

**Current state**: Chat function only allows English, Chinese, and Programming topics. Rejects all other queries.

### File: `supabase/functions/chat/index.ts` (EDIT)
Update the system prompt to add:
- **Finnish (Suomi)**: YKI prep (A1-A2), Finnish grammar (cases, verb types), vocabulary, pronunciation, culture
- **Vietnamese (Tiếng Việt)**: Vietnamese grammar, vocabulary, reading comprehension, literature, history, folklore
- **EdTech**: Educational technology, learning methodologies, online teaching strategies, AI in education, curriculum design

Update the scope section:
```
4. **Finnish (Suomi)**: YKI (A1-A2), grammar cases, verb conjugation, vocabulary, Finnish culture.
5. **Vietnamese (Tiếng Việt)**: Grammar, vocabulary, literature, history, folklore, reading.
6. **EdTech**: Educational technology, learning methods, AI in education, online teaching.
```

Update guardrails to reference all 6 domains instead of 3.

---

## Part 3: Massive Finnish Content Expansion

### File: `src/data/finnishCurriculum/vocabularyExpansion2.ts` (NEW)
Add 6+ new vocabulary modules (~150+ new words):
- **Työ ja ammatti** (Work & Professions): 20+ words
- **Liikenne ja matkustaminen** (Transport & Travel): 20+ words
- **Ruoka ja ravintola** (Food & Restaurant): 20+ words
- **Terveys ja hyvinvointi** (Health & Wellness): 20+ words
- **Luonto ja sää** (Nature & Weather): 20+ words
- **Vapaa-aika ja harrastukset** (Leisure & Hobbies): 20+ words
- **Koulutus ja opiskelu** (Education & Studies): 20+ words

Each module includes vocabulary cards with all fields (word, ipa, meaningEn, meaningVi, example, exampleEn, puhekieli, category) plus 10-15 quiz questions.

### File: `src/data/finnishCurriculum/lessonsExpansion.ts` (NEW)
Add 4+ new grammar/lesson modules:
- **Verbityypit 1-6** (Verb Types): Theory + conjugation exercises
- **Mennyt aika** (Past Tense): Imperfekti rules + practice
- **Konditionaali** (Conditional): Would/could in Finnish
- **Objektin sijat** (Object Cases): Partitive vs accusative

Each with theory, grammar points, exercises, and 7+ quiz questions.

### File: `src/data/finnishCurriculum/index.ts` (EDIT)
Export new modules: `finnishVocabExpansion2Modules`, `finnishLessonExpansionModules`

### File: `src/pages/YkiDashboard.tsx` (EDIT)
Merge new expansion data into `allVocabModules` and lesson modules.

### File: `src/data/finnishCurriculum/finnishDictData.ts` (EDIT)
Add 50+ new dictionary entries for all new vocabulary words.

### File: `src/components/FinnishSkier.tsx` (EDIT)
Recalculate milestones based on new total word count (~400+ words).

---

## Summary of Files

| Action | File |
|--------|------|
| CREATE | `src/components/FinnishVocabExercises.tsx` |
| CREATE | `src/data/finnishCurriculum/vocabularyExpansion2.ts` |
| CREATE | `src/data/finnishCurriculum/lessonsExpansion.ts` |
| EDIT | `supabase/functions/chat/index.ts` |
| EDIT | `src/pages/YkiDashboard.tsx` |
| EDIT | `src/data/finnishCurriculum/index.ts` |
| EDIT | `src/data/finnishCurriculum/finnishDictData.ts` |
| EDIT | `src/components/FinnishSkier.tsx` |
| EDIT | `src/data/finnishCurriculum/vocabularyData.ts` |
| EDIT | `src/data/finnishCurriculum/vocabularyExpansion.ts` |

