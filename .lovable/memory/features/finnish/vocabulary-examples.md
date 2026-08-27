---
name: Finnish Vocabulary Examples
description: Rules for generated Finnish example sentences (normalizer pools, POS re-detection, overrides, audit script)
type: feature
---
Finnish vocabulary examples come from `src/data/finnishExampleNormalizer.ts` (deterministic template pools + `src/lib/finnishMorphology.ts` inflection) with hand-written wins in `src/data/finnishExampleOverrides.ts`.

Rules:
- Raw POS in `finnishVocabData.ts` is unreliable. The normalizer re-detects: adjectives (`-inen/-kas/-ton` + adjectival English gloss, with a noun-exempt list), `-minen` verbal nouns, and person nouns (`-lainen` + PERSON_GLOSS).
- `-minen` splits into SKILL_TEMPLATES (practisable: reading, writing, pronunciation...) and PROCESS_TEMPLATES (sulaminen, kaupungistuminen - never "practised").
- Adjectives use ADJ_GROUPS chosen by gloss (taste / weather / emotion / safety / tech / colour / number), falling back to neutral ADJ_TEMPLATES.
- Templates carry `needs` guards so rooms, meals, insects, people and relatives never take the wrong sentence (no "I cleaned the tenant").
- Irregular stems (käsi, vesi, lumi, porras, hetkinen, käteinen...) must be hand-written overrides - the morphology helper returns null for them.
- Verify with `node scripts/audit_finnish_examples.mjs`: target 0 problems (remaining hits are override-only false positives) and no structure used more than ~70 times.
