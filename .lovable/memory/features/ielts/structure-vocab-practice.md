---
name: IELTS Structure & Vocabulary Practice
description: Drill mode in /ielts-speaking-practice generating vocabulary and structure exercises from the topic banks
type: feature
---
/ielts-speaking-practice mode `drills` -> `src/components/speaking/StructureVocabPractice.tsx`.
- Generator: `src/lib/speaking/structureVocabDrills.ts`. Vocabulary kinds: meaningEn2Vi, meaningVi2En, gapFill (blank mined from model answers), listenChoose, orderWords, sayIt. Structure kinds: functionMatch (7 function tags), completeFrame, rebuild, applyIt (spoken, checked with usedStructure).
- Content comes only from `getMergedVocabulary` + `getMergedStructures`; no new content files. Options deduplicated with a punctuation-insensitive key; answer must never appear in the prompt.
- Progress (mastered / best score / rounds) in safeStorage key `ielts-speaking-drills:progress`, keyed `part|track|topic`. Sticky top bar holds the Next button.
- `scripts/audit_speaking_drills.ts` must report 0 issues (checks every part/topic across 3 seeds, min 4 vocab items and 4 structures per topic).
