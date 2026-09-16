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
- Flow: each part/topic/track starts in a **study phase** (full list of words with VI meaning, or structures with function tag, each with normal/slow audio) then "Start the quiz"; a "Study list" button in the sticky bar returns to it.
- Quiz options are labelled A/B/C/D and the explanation states the correct letter + text.
- Extra shared items per part come from `src/data/speakingDrillsSupplement.ts` (10-12 phrases and 6 structures per part) merged on top of the topic banks.
- Vocabulary study cards must contain usable multi-word collocations, never isolated words. `expandToCollocation` normalizes legacy single-word entries at merge time; the phrase-example audit enforces 0 single-word items and rejects generic repeated examples such as `whenever it is appropriate`.
