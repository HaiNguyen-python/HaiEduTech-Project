---
name: Cambridge Speaking Practice
description: Cambridge Starters-PET speaking module - 482 audited tasks, official part structure, AI exam pictures, star grading
type: feature
---
Route `/cambridge-speaking-practice` (menu Cambridge Starters -> PET + button on Cambridge Lectures).

- Task bank: `src/data/cambridgeSpeakingTasks.ts` (core) + expansion files 1-7 + `cambridgeSpeakingTasksGapFill.ts` (12 PET Part 1 Interview, 10 Flyers Part 2 Information exchange). 482 tasks after sanitising, 17-21 topics per level.
- Sanitiser `src/data/cambridgeSpeakingSanitize.ts`: dedupes exact + near-duplicate prompts (content-word similarity >= 0.78 in the same level/part), keyword topic buckets (~20 themes) so the picker stays short, retags Flyers odd-one-out as Movers (no such Flyers part), strips fixed counts from "find the differences" prompts, caps Starters/Movers cards at 2 questions, and forces official part labels per level.
- Exam pictures: `src/assets/cambridge-speaking/` mapped in `src/data/cambridgeSpeakingImages.ts`. Odd-one-out tasks show no picture; the page renders the word set from the prompt as tappable cards instead.
- Grading: edge function `grade-cambridge-speaking` (Gemini 2.5 Flash), 4 criteria x 1-5 stars + heuristic fallback.
- Recorder rules: mimeType detection (Safari mp4), `start(1000)`, mic-level meter, 180s auto-stop, recogniser restart preserves earlier text, full cleanup on unmount.
- UI rules: English-only prompt (no Vietnamese subtitle), one question per box with a listen button, examiner follow-ups one per box.
- Guardrail: `bunx tsx scripts/audit_cambridge_speaking.ts` must exit 0 (valid parts, >=10 tasks per part, no near-duplicates, no fixed difference counts).
