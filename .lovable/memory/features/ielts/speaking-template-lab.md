---
name: IELTS Speaking Template Lab
description: Template Practice is its own mode next to Shadowing Practice, with per-question-type frameworks and annotated Band 7.5 examples
type: feature
---
- "Template Practice" is a standalone mode button on /ielts-speaking-practice, placed next to Shadowing Practice. It must NOT be embedded inside the Part 1/2/3 question view (keeps that UI clean - only Quick Notes there).
- `src/components/ielts/SpeakingTemplateLab.tsx` + `src/data/speakingTemplateTypes.ts`: question types per part (Part 1: like/frequency/past-now/would; Part 2: person/place/object/event/activity; Part 3: opinion/why/compare/future/pros-cons).
- Each type: framework steps (PREP / cue-card blocks / AREA + Balance from `speakingAnswerTemplates.ts`), Band 7.0+ starters, teacher tip, annotated Band 7.5 model answer, 4 extra practice questions.
- Student drafts persist in localStorage key `speaking-template-lab-{typeId}`.
