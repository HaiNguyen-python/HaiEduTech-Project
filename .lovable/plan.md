# Cambridge Speaking Practice - match every picture to its question

## What the check found

The bank has 482 tasks; 193 of them are picture-based, but the whole module shares only **25 stock images**, chosen by keyword from the prompt text. So on average one picture is reused for ~8 different questions, and the wording rarely matches what is actually in the image:

- Starters Part 1 Scene card (18) + Part 2 Object cards (24) share 6 kid images (toys, animals, food, fruit, clothes, bedroom), so a card about "my school bag" or "the park" lands on a teddy-bear photo.
- Find the differences: 33 tasks (Movers 18, Flyers 15) share 5 A/B sheets; a "kitchen" prompt often gets the park sheet.
- Picture story: 37 tasks share 5 story strips, so most stories are told over a strip about a different event.
- KET Part 2 Discussion (42) and PET Part 2 Long turn (29) share 8 adult photos - each photo carries 8-9 unrelated prompts.
- 4 personal-question tasks (Movers/Flyers Part 4) wrongly get a picture because the wording contains "photo"/"picture" by accident.

Cause is structural: the picture is guessed from keywords instead of being assigned per task. No amount of keyword tuning fixes it at a 193-to-25 ratio.

## What I will do

**A. Assign a picture to each task explicitly**
- Build an explicit `taskId -> image` map for all 193 picture tasks, so nothing is ever keyword-guessed. Keyword rules stay only as a last-resort fallback, and the audit forbids relying on it.
- Fix the 4 tasks that should show no picture (personal questions with an accidental "photo"/"picture" word), same as odd-one-out already does.

**B. Create the missing exam pictures**
- Generate roughly 45-55 new exam-style images so each picture backs at most ~4 tasks that genuinely share the same scene:
  - Starters/Movers scene + object cards: school bag, classroom, park, playground, family meal, birthday party, pets, weather, sports, transport, beach, farm.
  - Find the differences: proper two-panel A/B sheets for kitchen, bedroom, park, classroom, shop, beach, zoo, street, birthday, sports field.
  - Picture story: 4-panel strips for lost cat, rainy day, beach day, camping, football match, helping a neighbour, school project, bike ride.
  - KET/PET photographs: cafe, market, station, library, teamwork/office, gym, cooking, family at home, city street, park volunteering, classroom presentation, travel.
- Kid levels get a bright, friendly illustration style; KET/PET get realistic photo-style images, in line with the real exam booklets.

**C. Align prompt wording with the picture**
- Where a prompt names things the assigned picture cannot show ("How many cats are there?", "What is the boy in the red hat doing?"), rewrite it to what is visible, or move the task to a picture that matches.
- Difference sheets: prompts stay in the open form ("tell me the differences you can see"), since the A/B panels are drawn with a handful of real differences.
- Story strips: prompts refer to panels in order (1-4) and match the drawn events.

**D. Guardrail**
- Extend `scripts/audit_cambridge_speaking.ts` so it fails when a picture task has no explicit mapping, when a diff task gets a non-diff image (and vice versa for stories/scenes), when one image serves more than 4 tasks in the same level, or when a non-picture task resolves an image. Run it to zero errors.
- Spot-check the page in the browser across all five levels to confirm each shown picture fits its prompt.

## Technical notes

Files touched: `src/data/cambridgeSpeakingImages.ts` (explicit map + type-safe fallback + exclusion rules), a new `src/data/cambridgeSpeakingImageMap.ts` holding the per-task assignments, new assets under `src/assets/cambridge-speaking/`, targeted prompt edits in `src/data/cambridgeSpeakingTasks.ts` and its expansion files, and `scripts/audit_cambridge_speaking.ts`. No backend or grading changes; the grading edge function stays as is.

Image generation is the bulk of the work (~50 images), so this runs as one long pass; task count stays 482.
