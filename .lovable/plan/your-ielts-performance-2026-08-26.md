# Your IELTS Performance

A new page in the Cambridge IELTS menu that pulls together every result the student already produces (Listening, Reading, Writing, Speaking, vocabulary, grammar) into one analytics dashboard with a predicted band, a readiness timeline and a prioritised improvement list.

## What the student sees

1. **Overall verdict card**
   - Predicted Overall band (average of the 4 skill bands, rounded to nearest 0.5) plus a confidence label (Low / Medium / High) based on how many attempts exist per skill.
   - Target band selector (6.0 / 6.5 / 7.0 / 7.5 / 8.0) stored locally, plus gap to target.
   - "Test readiness": estimated weeks until ready, from the current gap and the measured improvement rate per week (falls back to a conservative "0.5 band per 6-8 weeks of steady practice" model when there is not enough history).

2. **4-skill dashboard**
   - Radar chart of Listening / Reading / Writing / Speaking bands.
   - One card per skill: latest band, best band, average accuracy, attempts, trend arrow vs the earlier half of the history, and a mini sparkline.

3. **Trend chart** - all attempts over time on one band axis (colour per skill) with a dashed target line.

4. **Vocabulary & Grammar block**
   - Vocabulary: mastered IELTS words, words added in the last 7/30 days, review-due count, estimated band-equivalent lexical range.
   - Grammar: derived from Writing grading criteria (Grammatical Range & Accuracy) and Speaking grammar sub-score, plus the grammar-type items in the Speaking SRS list.

5. **Deep analysis / "What to improve"**
   - Ranked weakness list: weakest skill first, then sub-criteria from Writing (Task Response, Coherence, Lexical, Grammar) and Speaking (Fluency, Lexical, Grammar, Pronunciation).
   - Concrete question-type diagnosis where the data allows (e.g. Listening sections with lowest accuracy, Reading tests with lowest accuracy).
   - Each weakness has an action line with a direct link to the matching practice page (Listening / Reading / Writing / Speaking / Vocabulary / Lectures).

6. **Study plan strip** - suggested weekly volume per skill until the target date, plus an "AI Coach commentary" panel: a short bilingual narrative analysis generated on demand from the aggregated numbers.

7. **Empty states** - each block tells the student which module to try first when no data exists yet, so the page is useful from day one.

## Technical notes

- Data sources (all already exist, read-only, nothing new to write):
  - `ielts-reading-history-v1` via `src/lib/ieltsReadingHistory.ts`
  - `ielts-listening-history-v1` via `src/lib/ieltsListeningHistory.ts`
  - `ielts-speaking-score-history-v1` (localStorage, per-criterion scores) from `SpeakingPractice.tsx`
  - `writing_attempts` (overall_score, result jsonb criteria) from the database, local fallback when signed out
  - `user_vocab_mastered` / `vocab_srs_state` filtered to the IELTS subject, plus `useMasteredVocab`
  - `speaking_srs_items` grouped by `item_type` for the grammar/pronunciation weakness signal
- New `src/hooks/useIeltsPerformance.ts` aggregates all of the above into a single typed snapshot (per-skill bands, criteria averages, trends, weakness ranking, readiness estimate). Pure functions for the scoring/prediction math go in `src/lib/ieltsPerformanceModel.ts` so they stay testable.
- New page `src/pages/IeltsPerformance.tsx` at route `/ielts-performance`, lazy-loaded in `App.tsx`, with SEO title/description and a single H1.
- Charts with the existing Recharts setup and design tokens (Royal Blue to Soft Emerald), mobile-first, collapsible sections in the existing style.
- Navbar: add "Your IELTS Performance" under the Cambridge IELTS group, in a new "Đánh giá & Tiến độ / Progress & Analysis" header above Practice & Grading. Also surface an entry link from IELTS Skills Practice.
- AI Coach commentary uses the existing AI gateway edge-function pattern with a graceful rule-based fallback text if the call fails; the numeric dashboard never depends on the AI call.
- Bilingual VI/EN throughout via `useLanguage`, English-only code comments, no em-dashes.
