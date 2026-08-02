# Audit: English Speaking Coach (content + mic pipeline)

I read `src/components/AISpeakingCoach.tsx` and the English data files, and ran a data-integrity script over all English themes. Below is what is actually broken, then the fix plan.

## Technical issues with capturing the learner's voice

1. **Repeating the same sentence gives no feedback.** The grading guard `lastProcessedTranscriptRef` is only cleared when the language changes. If a student says the exact same words twice, the second attempt is skipped: no score, no highlighted words - it looks like the mic failed.
2. **No cleanup on unmount.** There is no `return () => ...` teardown in the component. If a student leaves the page while recording, the recognizer keeps auto-restarting in `onend`, the mic indicator stays on, and state updates fire on an unmounted component.
3. **No microphone pre-flight.** The component only checks that `SpeechRecognition` exists. It never requests `getUserMedia` first and never checks for a secure context, so on some browsers the first tap fails with a generic "unavailable" message instead of a clear permission prompt/explanation.
4. **iOS Safari path is not handled.** `continuous = true` + auto-restart is unreliable on iOS; the fallback there should be a single-shot session plus a clear "use Chrome/Edge on desktop for best results" hint (this hint currently only shows for Finnish/Swedish).
5. **Silence budget too aggressive for English learners.** Stop requires 15 consecutive silent restarts AND >12s. In practice a hesitating learner can be cut off, or conversely the mic can idle a long time with no visual countdown. Needs a visible listening timer and a single clear stop rule.

## Scoring issues that look like "the mic didn't hear me"

6. **Contraction map is incomplete.** Missing: `didn't, haven't, hasn't, hadn't, couldn't, wouldn't, shouldn't, mustn't, we'll, you'll, he'll, she'll, they'll, we've, you've, they've, would've, could've, should've, I'd, he'd, she'd, they'd`. When the target says one form and ASR returns the other, the word is graded wrong.
7. **Wrong-direction mappings.** `its -> it is`, `were -> we are`, `ill -> i will`, `lets -> let us` corrupt legitimate words (possessive "its", past "were", "ill" = sick). These should only expand when an apostrophe is present.
8. **Symbols and numerals not normalized.** `%`, `$`, `&`, `°` are not stripped/expanded, so "50%" vs spoken "fifty percent" grades as wrong.

## Content issues in the English sentence bank

9. **Duplicate theme IDs**: `en-health`, `en-education`/`en-emotions`, `en-tech`/`en-technology`, `en-culture`, `en-environment`, `en-news` appear twice. Because per-sentence best scores are stored as `themeId -> sentenceId`, progress from two different themes overwrites each other.
10. **Duplicate sentence IDs**: `en-e1..en-e7`, `en-h1..en-h7`, `en-tech1`, and more collide across packs - same storage-collision effect.
11. **24 IPA strings contain spelled-out letter names or misplaced stress marks**, e.g. `en-g1` renders "I am" as `aɪ eɪ ɛm` (should be `aɪ æm`), plus `wɛlˈbiːɪŋ`, `lɔŋtərˈm`, `daɪvərˈs`, `əlaʊˈɪŋ`. Genuine clock times ("7 a.m.") stay as-is.

## Fix plan

**Recognition pipeline** (`src/components/AISpeakingCoach.tsx`)
- Reset `lastProcessedTranscriptRef` at the start of every recording so repeat attempts always re-grade.
- Add an unmount effect that detaches handlers and aborts the recognizer, releasing the mic.
- Add a `getUserMedia` pre-flight with distinct messages for denied permission, no device, and insecure context.
- Detect iOS/Safari and use a single-shot session there; show the browser hint for English too.
- Add a visible listening timer and a hard 60s ceiling with an explicit "Stopped - tap to record again" state.

**Scoring** (same file)
- Complete the contraction table, gate apostrophe-less expansions behind an apostrophe check, and normalize `% $ & °` plus number-word/numeral equivalence for the new symbols.

**Content**
- Renumber the colliding English theme and sentence IDs (namespaced per expansion pack) so per-sentence progress is stored correctly.
- Correct the 24 flagged IPA strings.

**Verification**
- Re-run the integrity script: zero duplicate theme/sentence IDs, zero letter-name IPA artifacts.
- Drive the English Speaking Coach in a headless browser to confirm the mic-permission path, repeat-attempt grading, and unmount cleanup behave as described (real speech input can't be synthesized, so recognition itself is verified by injecting transcripts into the scoring path).
