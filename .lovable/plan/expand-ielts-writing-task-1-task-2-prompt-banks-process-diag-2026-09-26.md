# Expand IELTS Writing Task 1 & Task 2 prompt banks + process diagrams

## Current state (checked)
- Only 25 prompts in the built-in bank: Task 1 = 11 (line 3, bar 3, pie 2, table 1, process 1, map 1), Task 2 = 14 (opinion 6, discussion 2, advantage-disadvantage 2, problem-solution 2, direct-question 2).
- "Generate New Topic" asks the AI for text only. The page draws charts, maps and process diagrams only from built-in data, so AI-generated Task 1 topics (including process) show no picture.

## What I will do

### 1. Bigger built-in bank
- Task 1: at least 8 prompts per type (line, bar, pie, table, process, map, mixed) - about 56 total. Every one gets its own drawn visual: chart data, map data, or a step-by-step process diagram (natural cycles like the water cycle, and man-made processes like making bricks, recycling glass, producing coffee).
- Task 2: at least 8 per essay type (opinion, discussion, advantage-disadvantage, problem-solution, direct-question) - about 40+ total, spread across common IELTS themes (education, environment, technology, work, health, city life, crime, culture, media, travel).
- Each prompt keeps the existing parts: writing guide, Band 7+ vocabulary, brainstorming ideas. Existing prompt ids stay unchanged so saved drafts still load.

### 2. Generated topics always come with a visual
- The AI topic generator will also return the data for the visual (process steps, chart numbers, or map features) in the same format the page already draws.
- The data is checked before showing. If it is missing or broken, the page picks an unused built-in prompt of the same type instead of showing text only.
- Picking random topics avoids repeating the one just shown.

### 3. Review for quality and duplicates
- New audit script checks: duplicate ids, duplicate or near-identical questions (word-overlap), each type meets its minimum, every Task 1 prompt has a valid visual (process has 5-12 connected steps, chart numbers match labels), required fields filled, no em-dashes, no Vietnamese leaks. Must report 0 issues.
- Manual read-through of question wording against real IELTS style.

### 4. Verification
- Type check, audit script, one live "Generate New Topic" call for process, and a browser check that the process diagram appears for both built-in and generated topics.

## Technical notes
- Files: `src/data/ieltsWritingPrompts.ts` (plus split files e.g. `ieltsWritingPromptsTask1Extra.ts`, `ieltsWritingPromptsTask2Extra.ts` merged into `writingPrompts`), `getRandomPrompt` gets an exclude-id option.
- `supabase/functions/generate-writing-prompt/index.ts`: request `processData` / `chartData` / `mapData` matching existing types, with validation; keeps current AI provider.
- `src/pages/IeltsWritingPractice.tsx` `handleAIPrompt`: pass visual data through, fallback to built-in when invalid.
- New `scripts/audit_ielts_writing_prompts.ts`. No database changes.
