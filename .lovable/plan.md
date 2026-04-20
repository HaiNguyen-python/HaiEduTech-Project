

## Goal
Pre-generate the AI "Deep-Dive" enhanced theory for **all ~238 Programming lessons** so every lesson opens with rich, AI-enhanced content already cached — no need for the user (or students) to manually click "Enhance with AI" on each one.

## Current state
- The `enhance-programming-theory` edge function already exists and uses **Perplexity `sonar-pro`** to produce a structured 800–1100-word Deep-Dive (sections, comparison table, Mermaid diagram, code blocks, deep-dive callouts) and stores it in the `programming_theory_cache` table keyed by `(module_id, lesson_id)`.
- Right now only **6 of ~238 lessons** are cached. The rest still show the original short theory until a student clicks the button.
- Each curriculum lesson already has a stable `id` plus `title/titleEn`, `theory/theoryEn`, and `codeLanguage` — exactly what the function needs.

## Plan

### 1. Build a one-shot bulk-enhancer script (`/tmp/bulk_enhance.ts`)
A Deno/Node script that:
- Imports `allProgrammingModules` from the curriculum data.
- For every `(module, lesson)` pair, checks the `programming_theory_cache` table; if no row exists, calls the deployed `enhance-programming-theory` edge function with the same payload the UI sends.
- Runs sequentially with a small delay (≈1.5s) and limited concurrency (2–3 in parallel) to respect Perplexity rate limits.
- Logs progress (`[123/238] prog-sql / sql-select-basics ✓ cached`) and a final summary with success/skip/fail counts.
- On 429/insufficient-quota, backs off and stops cleanly so we can resume; resuming is automatic since cached rows are skipped.

### 2. Run it from the sandbox
Execute the script with `code--exec` against the live edge function. Because the function already upserts into `programming_theory_cache`, no DB migration is needed. Expected runtime: ~15–25 minutes for 232 new lessons (Perplexity sonar-pro typical latency).

### 3. Tiny UX polish in `ProgrammingLesson.tsx`
- When a cached Deep-Dive exists, the page already auto-loads it via the existing `useEffect` and shows the `AI Deep-Dive` badge — so after the bulk run, every lesson will open enhanced by default. No code change strictly required, but I'll:
  - Add a small "✨ Enhanced" indicator next to lessons in the sidebar list when cached (single extra Supabase query on page load: `select lesson_id where module_id = ...`).
  - Keep the existing manual "Refresh" button for teachers who want to regenerate.

### 4. Verification
After the script finishes:
- Query `select count(*) from programming_theory_cache` — expect ~238.
- Spot-check 3 lessons in different pillars (Python, SQL, Cloud) by visiting `/programming/<module>/<lesson>` and confirming the violet "AI Deep-Dive" badge appears immediately.

## Cost & risk note
- Each call uses ≈2,400 tokens of Perplexity sonar-pro (~$0.012). 232 lessons ≈ **$2.80 total**. Monitored via the existing `api_usage_log` insert already inside the edge function.
- If the Perplexity quota is exhausted mid-run, the script stops gracefully; re-running later picks up exactly where it left off (cached rows are skipped).
- Original theory remains untouched — the toggle to "Original" view in the UI still works.

## Files touched
- **New**: `/tmp/bulk_enhance.ts` (sandbox-only, not committed).
- **Edited (small)**: `src/pages/ProgrammingLesson.tsx` — sidebar "✨ Enhanced" badge per lesson.
- **No DB migration**, **no edge-function changes**, **no new secrets** (PERPLEXITY_API_KEY already configured).

