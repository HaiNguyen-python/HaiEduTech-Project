# Cambridge Speaking Practice - content audit and clean-up

## What the audit found (measured on the live bank)

The bank ships 511 tasks; 8 are duplicate prompts silently dropped at runtime, leaving 503 shown to students.

Per level (after clean-up): Starters 95 / Movers 102 / Flyers 101 / KET 102 / PET 103.

Real problems, not cosmetic:

1. **Wrong exam formats.** 13 Flyers tasks are "Odd one out" - that part does not exist in the Flyers exam (it is a Movers part). 3 tasks carry an invented label "Warm-up - Describe the picture". PET has **zero** Part 1 Interview tasks, so the PET exam is incomplete. Flyers Part 2 Information exchange has only 5 tasks against 46 personal-question tasks.
2. **Questions the picture cannot answer.** 19 prompts ask for a fixed number of differences ("tell me four/six differences") but the whole module shares only ~28 stock images picked by keyword, so the picture rarely contains that many. Odd-one-out prompts list the four items in text ("a T-shirt, a jacket, a skirt and a banana") yet still display an unrelated stock scene.
3. **Unbalanced practice.** Personal-question parts make up roughly 45% of every level (46-48 tasks each) while picture parts, the ones children actually struggle with, are thin.
4. **Cluttered topic picker.** 30 topics for Starters up to 58 for Flyers, many near-duplicates that the sanitiser cannot merge, so students scroll a long dropdown to find anything.
5. **Level fit.** Some Starters and Movers prompts run long or stack 3-4 questions in one card, above the Pre-A1/A1 load.

## What I will do

**A. Fix the exam structure**
- Move the 13 Flyers odd-one-out tasks to Movers (where the part is real) or convert them to Flyers Part 2 Information exchange; delete any that do not survive conversion.
- Remap the 3 "Warm-up" labels onto official parts.
- Write ~12 new PET Part 1 Interview tasks (personal/interview questions, examiner follow-ups, B1 model answers).
- Add ~10 more Flyers Information exchange tasks so the part is usable.
- Extend the part normaliser so an out-of-syllabus part label can never reach the UI again.

**B. Make every picture question answerable**
- Rewrite counted-difference prompts to the wording the shared images support ("Tell me the differences you can see" / "Find as many differences as you can"), keeping the official count only where a dedicated image really has it.
- Stop showing a stock photo on odd-one-out tasks: the four items are already listed in the prompt, so the card shows the word set instead of a mismatched scene.
- Tighten the picture matcher so a picture-story task never receives a single-scene photo and vice-versa.

**C. Trim and rebalance**
- Delete the 8 duplicates at source instead of hiding them at runtime, plus any near-duplicate personal question that only rephrases another.
- Target mix per level: roughly 40% picture/exam-specific parts, 35% personal questions, 25% discussion or collaborative, instead of today's personal-question skew.
- Shorten over-long Starters/Movers prompts to one clear instruction plus at most two questions, matching the real examiner script.

**D. Merge topics**
- Extend the topic alias map so each level lands at roughly 18-25 clean topics (Animals/My pets, School/My school, Food/Meals, etc.), which makes the topic dropdown short and logical.

**E. Guard rail**
- Add an audit script (`scripts/audit_cambridge_speaking.ts`) that fails when a task uses a non-official part, when a level is missing a part, when a prompt asks for more differences than the picture can show, when a duplicate prompt appears, or when useful language / model answer is missing. Run it and report zero errors.

## Technical notes

Files touched: `src/data/cambridgeSpeakingTasks.ts` and its 7 expansion files, `src/data/cambridgeSpeakingSanitize.ts` (part normaliser + topic aliases), `src/data/cambridgeSpeakingImages.ts` (matcher rules and odd-one-out handling), `src/data/cambridgeSpeakingWordBank.ts` (cover new tasks), `src/pages/CambridgeSpeakingPractice.tsx` (word-set card for odd-one-out only), plus the new audit script. No backend or grading-function changes; the Gemini grading edge function stays as is.

Final count will stay near 500 tasks: removals are offset by the new PET Part 1 and Flyers Information exchange tasks.
