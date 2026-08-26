# Progress & Analysis: menu order + reliability audit

## 1. Menu order

In the 🎯 Cambridge IELTS dropdown, move the "Đánh giá & Tiến độ / Progress & Analysis" header and the "Your IELTS Performance" item to sit **after** the "Luyện tập & Chấm điểm / Practice & Grading" block, so the order becomes:

```text
Study & Review -> Vocabulary -> Practice & Grading -> Progress & Analysis
```

## 2. Audit findings (verified against the code and the database)

Working today: Listening (single + full test), Reading (single + full test) and Speaking all write attempt history at real finish points; Writing grading rows exist in the cloud with the exact 4-criteria shape the dashboard parses; vocabulary and speaking-SRS tables have the columns the hook selects.

Gaps that make the dashboard look wrong or empty:

1. **Cross-device blindness.** Listening, Reading and Speaking history live only in this browser's localStorage. A signed-in student on a new device or after clearing the browser sees an empty dashboard even though the cloud has the results (verified: 28 listening, 24 reading, 388 speaking, 190 writing rows logged in the activity log).
2. **Vocabulary numbers for guests.** "Added in last 7/30 days" and "due for review" come only from the cloud rows, so a signed-out student with mastered words sees hard zeros instead of "no data".
3. **Review-due rule is crude.** Due count uses a fixed "older than 7 days" rule and ignores `review_count` / `last_interval_days`, so it overstates the backlog for well-reviewed words.
4. **Stale after new results.** The snapshot only reloads on mount. Finishing a test in another tab, or signing in while the page is open, does not refresh the dashboard.
5. **Null band edge case.** With no attempts at all, the target line can render a meaningless gap instead of a "not enough data yet" message.
6. **Weak-section diagnosis is fragile.** The weakest Listening section is parsed from set titles; titles without "Section N" silently produce no diagnosis.

## 3. Fixes to implement

- **Cloud merge of attempt history.** In `useIeltsPerformance`, when signed in, also read `student_activity_log` rows with `activity_type` in `ielts_listening`, `ielts_reading`, `ielts_speaking` and merge them with the local histories, de-duplicated by timestamp + score so nothing double counts. Bands come from percent for L/R and from the logged 0-9 score for Speaking. Local remains the source for guests, so nothing regresses offline.
- **Honest empty states for vocabulary.** When no cloud rows exist, show "-" with a "sign in to sync" hint for last 7/30 days and review-due instead of 0.
- **Better review-due rule.** Compute due from `reviewed_at + last_interval_days` (falling back to a 7-day interval when the column is null), so the backlog matches the real SRS schedule.
- **Live refresh.** Re-run the snapshot on `supabase.auth.onAuthStateChange`, on window focus, and on a `storage` event for the three history keys; keep the existing manual refresh button.
- **Null-safe verdict card.** When there is no prediction, replace the gap sentence with a bilingual "Chưa đủ dữ liệu / Not enough data yet" line plus links to the four practice pages.
- **Section diagnosis fallback.** When no title matches a section pattern, fall back to the lowest-percent listening set (same as Reading already does) so the weakness list is never silently empty.
- Keep the AI Coach call optional with its existing rule-based fallback; no numeric value depends on it.

## 4. Verification

- Type-check the changed files.
- Load `/ielts-performance` signed in and confirm the radar, trend chart, criteria table, vocabulary block and weakness list all render with real numbers, no console errors.
- Load it with empty local history to confirm every block shows its empty state instead of zeros or `null`.
- Confirm the dropdown order in both desktop hover menu and the mobile menu.

## Technical notes

Files touched: `src/components/Navbar.tsx` (order only), `src/hooks/useIeltsPerformance.ts` (cloud merge, refresh triggers, vocab rules), `src/pages/IeltsPerformance.tsx` (empty states), `src/lib/ieltsPerformanceModel.ts` (section fallback if needed). Read-only against the backend: no schema changes, no new tables, no writes.
