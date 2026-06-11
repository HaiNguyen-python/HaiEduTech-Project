---
name: Backend Architecture
description: Supabase progress tables, RLS. Guest sync via localStorage. Notebook fetch invariants.
type: feature
---

- Supabase backend with RLS enabled on every public table. Guests sync state via localStorage.

### Notebook fetch invariants (DO NOT REGRESS)

All reads of `student_notebooks` MUST go through `src/lib/notebookService.ts → fetchUserNotebooks(userId)`:

1. NEVER write an empty array into the `notebook-snapshot-{uid}` localStorage cache. A transient auth race makes RLS return 0 rows; wiping the cache then makes students think their notes are deleted.
2. If the server returns `[]` while the cache has rows → preserve the cache and return `error: "empty_result_preserved_cache"` so the UI can show an amber "đang dùng bản sao lưu" banner.
3. Always SELECT the full superset (`id, user_id, title, content, subject, is_public, created_at, updated_at`) — the `columns` param is ignored to keep snapshots consistent across pages.
4. Merge snapshot + server rows by `id`, keeping the newer `updated_at`.
5. After a confirmed delete, call `pruneSnapshot(userId, deletedId)` so the cache stays in sync.
6. Pages (`/notebook`, `FloatingNotebook`) MUST seed `notebooks` state from `readSnapshot()` on mount before awaiting the network call.
