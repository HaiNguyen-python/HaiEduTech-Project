

## Plan: Fix Speaking AI bugs, Finnish exercise issues & expand vocabulary

### Issue 1: Speaking AI — Infinite notification/streak loop

**Root cause**: In `AISpeakingCoach.tsx` line 267-352, the `useEffect` that processes transcripts includes `stats`, `perfectStreak`, `themeScores`, and `sessionScore` in its dependency array. These state variables are **updated inside the same effect**, causing it to re-trigger infinitely — each run increments streak, fires toast notifications, saves scores to DB, and triggers confetti in an endless loop.

**Fix**:
- Convert `stats`, `perfectStreak`, `themeScores`, `sessionScore` to `useRef` instead of `useState` (they don't need to trigger re-renders from this effect)
- OR add a processing guard ref (`hasProcessed`) that prevents re-entry after the first processing of a given transcript
- The simplest reliable fix: add a `processedTranscript` ref that tracks the last processed transcript string, and skip if it matches the current one

**File**: `src/components/AISpeakingCoach.tsx`

---

### Issue 2a: Finnish vocab — Gap Fill shows Finnish answer matching Finnish question

**Root cause**: Line 132 in `FinnishVocabExercises.tsx` uses `v.example.replace(new RegExp(v.word, "i"), "___")`. Finnish words are heavily inflected (e.g., "koti" → "kotini", "keittiössä"), so if the base word doesn't appear verbatim in the example sentence, the replace fails silently — the sentence shows unchanged with the word still visible, making the answer obvious.

**Fix**:
- Filter out vocabulary entries where the word doesn't actually appear in the example sentence (case-insensitive)
- Only include sentences where `v.example` contains the exact base word `v.word`

**File**: `src/components/FinnishVocabExercises.tsx` (line ~128)

---

### Issue 2b: Finnish mock exam listening — audio cuts off mid-sentence

**Root cause**: In `YkiDashboard.tsx` line 1443, when there are no dialogue lines, the theory text is truncated to 500 characters (`substring(0, 500)`). This cuts sentences mid-word. Additionally, `playFinnishTts` uses Google Translate TTS which has a character limit (~200 chars per request) and will silently truncate longer text.

**Fix**:
- Split theory text into individual sentences (by `.`, `!`, `?`) before passing to TTS
- Play each sentence sequentially with a pause between them (like the dialogue branch does)
- Remove the arbitrary 500-char truncation

**File**: `src/pages/YkiDashboard.tsx` (line ~1441-1451)

---

### Issue 2c: Finnish Gap Fill — some sentences pre-filled

**Root cause**: Same as 2a — when `replace()` doesn't find the base word, the sentence appears complete with no blank, so it looks "pre-filled." Filtering these out solves both issues.

**Fix**: Covered by fix 2a.

---

### Issue 3: Add more A1-A2 Finnish vocabulary

**Current state**: ~1400 lines across 4 vocabulary files (8 themes in main + 4 expansion modules). 

**Plan**: Create `vocabularyExpansion4.ts` with 4 new A1-A2 themed modules:
- **Perhe ja ihmissuhteet** (Family & Relationships) — A1
- **Ruoka ja juomat** (Food & Drinks) — A1  
- **Harrastukset ja vapaa-aika** (Hobbies & Free time) — A2
- **Terveys ja keho** (Health & Body) — A2

Each module with 1 lesson containing 15 vocabulary entries + 5 quiz questions. Update `index.ts` to export the new module.

**Files**: 
- New: `src/data/finnishCurriculum/vocabularyExpansion4.ts`
- Edit: `src/data/finnishCurriculum/index.ts`
- Edit: `src/pages/YkiDashboard.tsx` (import and include in allVocabModules)

---

### Summary of files to change
1. `src/components/AISpeakingCoach.tsx` — Fix infinite loop with processed transcript guard
2. `src/components/FinnishVocabExercises.tsx` — Filter vocab where word doesn't appear in example
3. `src/pages/YkiDashboard.tsx` — Fix listening TTS to split by sentences
4. `src/data/finnishCurriculum/vocabularyExpansion4.ts` — New A1-A2 vocab modules
5. `src/data/finnishCurriculum/index.ts` — Export new module

