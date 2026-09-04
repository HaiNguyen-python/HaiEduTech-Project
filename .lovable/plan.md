# Structure & Vocabulary Practice (IELTS Speaking)

Add a new practice mode inside /ielts-speaking-practice so students can drill the two things they see in "Useful Language & Ideas" - topic vocabulary and model structures - instead of only reading them.

## What the student sees

A new button next to Part 1/2/3, Shadowing, Template, Review (SRS): **Structure & Vocabulary** (VI: "Luyện Cấu trúc & Từ vựng").

Inside it: a part selector (Part 1/2/3), a topic selector, and two sub-tabs.

### Vocabulary drills (5 rounds of 10 questions, drawn from the topic vocabulary bank)
- Meaning match: English phrase -> pick the correct Vietnamese gloss (and reverse).
- Gap fill in a natural sentence with the target phrase masked, plus a word bank.
- Listen & choose: audio of the phrase (normal + slow) -> pick the phrase.
- Collocation build: drag/click the scrambled words of the phrase into order.
- Say it: record the phrase, get word-by-word accuracy from the existing speech recognizer.

### Structure drills
- Complete the frame: a model structure with its ending removed, student types or picks a suitable continuation, with a sample answer shown after.
- Function match: match a structure to its use (opinion, hedging, comparing, exemplifying, concluding).
- Sentence rebuild: reorder chunks of a structure.
- Apply it: student speaks/writes a full sentence using the structure on the current topic; the app checks the structure was actually used and shows a model sentence.

Every item has normal + slow audio, an explanation after answering, and answers stay hidden until the student chooses.

### Feedback and progress
- Round score, streak/combo, mastered-phrase counter per topic, stored locally per part/topic.
- Weak items (missed twice) come back at the end of the round and feed into the existing Review (SRS) list.
- A small summary card showing phrases mastered vs remaining for the selected topic.

## Technical notes

- New mode value `"drills"` in the existing `mode` state in `src/pages/SpeakingPractice.tsx`; rendering delegated to new `src/components/speaking/StructureVocabPractice.tsx` so the page file stays manageable.
- Data comes from existing banks: `getMergedVocabulary` (`src/data/speakingVocabularyBank.ts`) and `getMergedStructures` (`src/data/speakingStructuresIdeas.ts`) - no new content files needed for coverage, only a small helper for structure "function" tags and example sentence frames (`src/lib/speaking/structureVocabDrills.ts`).
- Question generation follows the existing fairness rules: same-part distractors, no answer leakage in the prompt, masked target phrase, deduplicated options.
- Audio reuses `playEnglishTts`/`stopEnglishTts` and the `useUsefulLanguageAudio` helper; speaking checks reuse `useSpeechRecognizer` + `compareSentence` from `speakingModeShared.ts`.
- Progress persists via `safeStorage` under a namespaced key (`ielts-speaking-drills:*`); no new database tables. Sessions log through `useActivityLogger` like other modes.
- Sticky Next control at the top (same pattern as vocabulary practice) so students do not scroll up and down.
- Verify with a new `scripts/audit_speaking_drills.ts` (0 issues), typecheck, and a browser pass on the new mode.
