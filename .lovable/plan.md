# IELTS Speaking: fairer grading + show the upgraded answer

## Why scores are coming out too low

Reading the current grading service and the practice page shows four things that all push scores down at the same time:

1. **Word-count caps.** The examiner instructions say a 25-word answer can never pass Band 5.0 and a 45-word answer sits around 6.0. Part 1 answers are meant to be short, so a good short answer is capped before content is even considered.
2. **Pronunciation is capped.** Pronunciation "cannot exceed Band 6.5 from a transcript alone". Since the overall band is the plain average of four criteria, that single cap drags every result down by up to half a band, even for strong speakers.
3. **No allowance for speech-to-text errors.** The score is based on the text the browser heard. That text has no punctuation, drops words and mis-hears names, and the examiner is told to treat it literally and never round up, so normal listening mistakes are counted as the student's grammar mistakes.
4. **The quick backup score can quietly replace the real one.** If the full examiner is slow, a simple length-and-speed estimate is shown instead, which tops out around Band 6.5 - and the student sees it as their band.

## What will change in grading

- Remove the word-count band caps and replace them with part-aware expectations: Part 1 answers of 20-40 words are normal and can reach Band 7+ if the language is strong; Part 2 keeps a length expectation, Part 3 rewards development.
- Judge pronunciation from pacing, rhythm and word clarity without the hard 6.5 ceiling, and state clearly that it is an estimate.
- Tell the examiner explicitly that the text comes from automatic speech recognition: ignore missing punctuation, capitalisation, obvious mis-hearings and single dropped articles, and score only real language errors.
- Keep the official band descriptors and the "overall = average, rounded to 0.5" rule, but drop the "never round up" and "penalise heavily" wording that biases every criterion downward.
- Make the backup score obvious: label it clearly as an estimate, not a band, and keep the one-tap re-grade.
- Add a short calibration check after the change: run several sample answers (weak, mid, strong) through the grader and confirm the bands land where a teacher would put them.

## Show the upgraded answer after grading

The upgrade service already exists but the panel was removed from the page. It comes back:

- After a score appears, an "Upgrade my answer / Nâng cấp bài nói của tôi" section shows the student's own answer rewritten to Band 8 level, with the improved phrases highlighted.
- It runs on their real transcript, so it keeps their ideas and only improves language.
- Bilingual labels, a loading state, a clear message if it cannot run, plus buttons to listen to the upgraded version and save it to the notebook alongside the feedback.

## Technical notes

- `supabase/functions/grade-speaking/index.ts`: rewrite the CALIBRATION ANCHORS block into part-aware guidance, remove the pronunciation ceiling, add an ASR-tolerance rule, soften rules 1 and 7, keep the `roundBand` average enforcement, redeploy.
- `src/pages/SpeakingPractice.tsx`: re-add the upgrade panel (removed at the comments near lines 723 and 1634), call `upgrade-speaking` with `{ question, part, transcript }`, store `upgradedAnswer` in the existing result state (already typed and already included in the notebook export), render `**bold**` upgrades as highlights, and relabel the fallback score.
- Verify with: `npx tsgo --noEmit`, direct calls to `grade-speaking` and `upgrade-speaking` with sample transcripts of three ability levels, and a browser pass at 1280x1800 that records, grades and opens the upgrade panel.
