

## Plan: IELTS Writing Practice System with AI Prompt Generator & PDF Export

### Summary

Build a dedicated IELTS Writing Practice page (`/ielts-writing-practice`) with an AI-powered prompt generator (Task 1 & Task 2), split-screen writing workspace, AI grading via existing Perplexity edge function, and professional PDF export. Save writing history to database.

### Current State

- AI Grading page (`/ai-grading`) already handles essay submission + grading via `grade-writing` edge function (Perplexity API)
- PDF export exists as HTML-based print dialog
- No dedicated prompt generator or writing workspace with guides
- No writing history persistence

### Changes

#### 1. New Edge Function: `generate-writing-prompt`
**File: `supabase/functions/generate-writing-prompt/index.ts`**
- Calls Perplexity API to generate a random IELTS Writing prompt
- Accepts `taskType` (1 or 2) and optional `essayType` (opinion/discussion/advantage-disadvantage/problem-solution/direct-question) or `chartType` (bar/line/pie/table/map/process)
- Returns structured JSON: `{ prompt, taskType, essayType, writingGuide, vocabularyBank, brainstormingIdeas, imageDescription }`
- Uses tool calling for structured output

#### 2. New Page: IELTS Writing Practice
**File: `src/pages/IeltsWritingPractice.tsx`**
- **Top section**: Task type selector (Task 1 / Task 2) + sub-type selector + "Generate New Prompt" button
- **Split-screen layout** (resizable panels):
  - **Left panel**: Prompt display + Writing Guide (collapsible) + Vocabulary Bank (collapsible) + Brainstorming Ideas (collapsible). For Task 1, show a placeholder chart image area.
  - **Right panel**: Rich text editor (textarea with real-time word counter, target word count indicator: 150 for Task 1, 250 for Task 2) + Submit button
- **After submission**: Reuse existing `grade-writing` edge function, display results inline below the editor (same format as AIGrading page: score, criteria, errors, upgraded version, advice)
- **PDF Export**: Generate professional PDF using the existing HTML-to-print approach, now including the original prompt, student essay, score breakdown, corrections, and Band 8.0+ sample
- **Timer**: Optional countdown timer (20 min for Task 1, 40 min for Task 2)

#### 3. Database: Writing History Table
**Migration SQL:**
```sql
CREATE TABLE public.writing_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_type integer NOT NULL,
  prompt text NOT NULL,
  essay text NOT NULL,
  word_count integer NOT NULL,
  result jsonb NOT NULL DEFAULT '{}'::jsonb,
  overall_score numeric(3,1)
);

ALTER TABLE public.writing_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attempts" ON public.writing_attempts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts" ON public.writing_attempts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
```

#### 4. Static Prompt Bank (Fallback & Quick Access)
**File: `src/data/ieltsWritingPrompts.ts`**
- ~30 Task 2 prompts across all essay types (Opinion, Discussion, Advantage/Disadvantage, Problem/Solution, Direct Question)
- ~15 Task 1 prompts across chart types with placeholder image descriptions
- Each includes: `prompt`, `taskType`, `essayType/chartType`, `writingGuide`, `vocabularyBank[]`, `brainstormingIdeas[]`

#### 5. Routing & Navigation
**File: `src/App.tsx`** — Add route `/ielts-writing-practice`
**File: `src/pages/English.tsx`** — Add card/link to IELTS Writing Practice in the programs section
**File: `src/pages/AIGrading.tsx`** — Add a link/banner pointing to the new Writing Practice page

#### 6. Writing History Component
**File: `src/components/WritingHistory.tsx`**
- Fetch from `writing_attempts` table
- Display list: date, task type, score, word count
- Click to expand and view full attempt details
- Shown on the Writing Practice page for logged-in users

### File Summary

| File | Action |
|------|--------|
| `supabase/functions/generate-writing-prompt/index.ts` | Create |
| `src/data/ieltsWritingPrompts.ts` | Create — static prompt bank |
| `src/pages/IeltsWritingPractice.tsx` | Create — main page |
| `src/components/WritingHistory.tsx` | Create — history component |
| `src/App.tsx` | Update — add route |
| `src/pages/English.tsx` | Update — add navigation link |
| `src/pages/AIGrading.tsx` | Update — add cross-link |
| Migration | Create `writing_attempts` table |

### Execution Order

1. Create database migration for `writing_attempts`
2. Create static prompt bank (`ieltsWritingPrompts.ts`)
3. Create edge function `generate-writing-prompt`
4. Build `IeltsWritingPractice.tsx` page with split-screen UI
5. Build `WritingHistory.tsx` component
6. Update routing and navigation links

