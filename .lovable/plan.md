

## Fix Super Dictionary — make all 3 tabs (Dictionary, Ozdic/Collocation, Thesaurus) reliable

### Root cause
From the network log: the browser request `GET https://api.dictionaryapi.dev/api/v2/entries/en/go` is failing with **"Failed to fetch"** (the server responded fine when I tested it directly). This is a classic browser-side issue with `dictionaryapi.dev` — the public API is known to be flaky from browser origins (intermittent CORS / TLS / 5xx). The tab silently catches the error and shows "Word not found.", which is what the user is seeing.

The Ozdic and Thesaurus tabs use `api.datamuse.com`, which is more stable, but they were never reachable in the user's session because (a) they're separate tabs and (b) the same fetch reliability problem can hit any third-party API at any time. Plus the MyMemory translation calls inside the Dictionary tab are rate-limited and add another point of failure.

### Fix strategy
Stop calling third-party APIs directly from the browser. Route all 3 lookups through a single new edge function that proxies and shapes the responses, so:
- CORS is always correct (we set it).
- Failures are retried server-side with a fallback.
- "Word not found." only appears when the word truly doesn't exist, not when the network blips.
- We can later swap providers without touching the UI.

### Implementation

1. **New edge function `supabase/functions/dictionary-lookup/index.ts`** (public, `verify_jwt = false`):
   - Accepts `{ type: "dictionary" | "collocation" | "thesaurus", word: string }`.
   - `dictionary`: calls `api.dictionaryapi.dev`; on failure or 404, falls back to a Datamuse-based shape (definitions via `md=d`, phonetics via `md=r`) so we always return something useful for valid English words. Also returns up to 6 Vietnamese translations using MyMemory (server-side, no browser rate-limit pain) — wrapped in try/catch so a translation outage never breaks the lookup.
   - `collocation`: calls Datamuse `lc`, `rc`, `rel_jja`, `rel_trg` in parallel and returns the same `{ left, right }` shape the UI already expects.
   - `thesaurus`: calls Datamuse `rel_syn` and returns `{ word, score }[]`.
   - Each upstream call wrapped with a 6s timeout + one retry.
   - Standard CORS headers + JSON error responses (never throw).
   - Register in `supabase/config.toml` with `verify_jwt = false`.

2. **Refactor `src/components/SuperDictionary.tsx`**:
   - Replace the 3 direct `fetch(...)` calls in `handleDictLookup`, `handleCollocationLookup`, `handleThesaurusLookup` with `supabase.functions.invoke("dictionary-lookup", { body: {...} })`.
   - Remove the in-component `translateToVi` / MyMemory calls (now done server-side; UI just consumes `viTranslations` from the response).
   - Add a clear distinguishable error state for each tab: "Word not found" vs. "Lookup service is busy, please retry" — based on the response payload (`{ notFound: true }` vs `{ error: true }`), so the user understands when to retry.
   - Add a small "Retry" button next to the error message for transient failures.
   - Keep all existing UI/markup, animations, tab structure, and Vietnamese labels — only the data-fetching layer changes.

3. **No DB changes, no new secrets.** The function only calls public APIs.

### Files touched
- **Created**: `supabase/functions/dictionary-lookup/index.ts`
- **Modified**: `supabase/config.toml` (add function block with `verify_jwt = false`), `src/components/SuperDictionary.tsx` (swap 3 fetch sites, add retry button, clearer error states)

### Verification after build
Open `/ielts-writing-practice`, open Super Dictionary, and confirm:
- Dictionary tab: "go", "ambiguous", "xyznotaword" → first two return definitions + Vietnamese, third shows "Word not found".
- Ozdic tab: "make" returns left + right collocation chips.
- Thesaurus tab: "happy" returns synonyms with opacity gradient.

