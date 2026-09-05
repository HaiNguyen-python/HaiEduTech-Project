# Back navigation + full review of IELTS Speaking Practice

## What students hit today

Opening Shadowing Practice, Template Practice, Structure & Vocabulary or Review (SRS) replaces the whole page: the part buttons, topics and practice-method buttons disappear and there is no way back except the browser Back button or reloading the page. Inside Template Practice and the drills there is also no way to step back from a framework/quiz to the list you came from.

## What will change

1. A consistent back bar at the top of every sub-section (Shadowing Practice, Template Practice, Structure & Vocabulary, Review): a "Back" button plus the name of the section you are in, so one tap returns to the question view with the previously selected part and topic still set.
2. Same back control inside the sub-sections' own steps:
   - Structure & Vocabulary: back from the quiz to the study list (currently only reachable by finishing or restarting).
   - Template Practice: back from an opened framework step to the list of question types.
   - Shadowing Practice: keep the existing previous-sentence control and add the section-level back.
3. Browser and phone Back button behave the same as the on-screen back (leaving a sub-section returns to the question view instead of leaving the page).
4. Back controls are bilingual (Quay lai / Back) and reachable on mobile without scrolling.

## Review of content and technique

Run the existing checks and fix whatever they surface:

- Question bank audit (679 questions, Parts 1-3) and the drills audit - confirm no empty topics, no duplicate prompts, every topic has at least the minimum number of questions, useful-language entries all have audio text.
- Recording and grading path: microphone start/stop, transcript-only grading fallback, camera auto-start, clear error notices, spinner always cleared.
- Sub-section state: switching part/topic or leaving a sub-section must not leave a recorder, speech recogniser or text-to-speech playing.
- Layout pass at phone width on the control panel, study list, quiz cards and grading result panel.
- Typecheck plus a scripted browser pass through all five sections, including one record-and-grade cycle.

Anything the audits report is fixed in the same pass; findings that need content rewriting are listed back to you.

## Technical notes

- `src/pages/SpeakingPractice.tsx`: `mode` state (`part | shadow | template | srs | drills`) currently swaps the render with no return path (lines ~815-822). Add a shared back header component and route `mode` changes through the URL hash/search param so browser Back pops the mode.
- `src/components/speaking/StructureVocabPractice.tsx`: add back from `phase === "quiz"` to `"study"`.
- `src/components/ielts/SpeakingTemplateLab.tsx`: add back from `openStep` to the type list.
- `src/components/ShadowingPractice.tsx`: add the section-level back next to the existing step controls.
- Audits: `scripts/audit_speaking_practice.ts`, `scripts/audit_speaking_drills.ts`, then `npx tsgo --noEmit` and a Playwright pass at 1280x1800.
