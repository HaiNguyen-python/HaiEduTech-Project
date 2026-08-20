---
name: IELTS Speaking Template Lab
description: Template Practice is its own mode next to Shadowing Practice - per-question-type frameworks drilled by listening to and recording complete model sentences (no typing)
type: feature
---
- "Template Practice" is a standalone mode button on /ielts-speaking-practice, next to Shadowing Practice. It must NOT be embedded inside the Part 1/2/3 question view.
- `src/components/ielts/SpeakingTemplateLab.tsx` + `src/data/speakingTemplateTypes.ts`: question types per part (Part 1: like/frequency/past-now/would; Part 2: person/place/object/event/activity; Part 3: opinion/why/compare/future/pros-cons).
- No text inputs in the Lab. Each framework step is a speaking drill: 2 complete model sentences (main from the Band 7.5 example + a variation in `src/data/speakingTemplateDrills.ts`), the trained grammar pattern bolded, "Structure to memorise" note, Listen / Slow (englishTts, en-GB) and Record buttons.
- `src/components/ielts/TemplateSentenceDrill.tsx` records via Web Speech API (en-GB, continuous) and scores with `src/lib/speakingDrillScore.ts`; step counts as practised at >= 80%. Best score per step persists in localStorage key `speaking-template-drill-{typeId}`.
- Each step now drills 4 model sentences: Model 1 (Band 7.5 example), Model 2 (variation, same structure), plus 2 variants from `src/data/speakingTemplateVariants.ts` that each train a DIFFERENT grammar structure (cleft, inversion, conditionals, passives...) with their own bilingual "Another structure" note.
- Scoring uses Needleman-Wunsch alignment in `src/lib/speakingDrillScore.ts` (never greedy) so one missed word does not cascade; short words (<= 3 chars) must match exactly. Recording keeps listening across Chrome's silence auto-stop until the student presses Stop, and shows the live interim transcript.
- Worked example card: labels ("Sample question", step badges) bold, and key structure chunks bolded via `src/lib/highlightStructure.tsx` (shared with the drills).
