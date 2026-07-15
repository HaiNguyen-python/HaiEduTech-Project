# Supabase Security Guide — HaiEduTech

Developer-facing checklist for keeping the HaiEduTech backend secure. Not a
user-facing document.

## 1. Row-Level Security (RLS)

**Every table in `public` has RLS enabled.** RLS is the primary access
control mechanism — the anon and publishable keys are meant to ship in the
browser bundle; RLS is what protects the data.

Standard per-user table pattern:

```sql
create table public.example (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- MUST come in the same migration as CREATE TABLE.
grant select, insert, update, delete on public.example to authenticated;
grant all on public.example to service_role;

alter table public.example enable row level security;

create policy "example_select_own" on public.example
  for select to authenticated using (auth.uid() = user_id);
create policy "example_insert_own" on public.example
  for insert to authenticated with check (auth.uid() = user_id);
create policy "example_update_own" on public.example
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "example_delete_own" on public.example
  for delete to authenticated using (auth.uid() = user_id);
```

Tables that currently follow this pattern include `profiles`,
`student_profiles`, `student_submissions`, `student_notebooks`,
`writing_drafts`, `daily_reports`, `user_vocab_mastered`, `mood_checkins`,
`career_assessments`, and every `your_corner_*` table.

**Never** rely on `USING (true)` for mutation policies. `SELECT (true)` is only
used on intentionally-public reference tables (dictionaries, published
lessons, marketing content).

## 2. Roles

Roles live in a **separate** `user_roles` table, never on `profiles`. RLS
policies reference roles through the security-definer helper
`public.has_role(_user_id, _role)`. This prevents recursive RLS lookups and
privilege-escalation via profile updates.

```sql
create policy "admins_can_view_all" on public.some_table
  for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
```

## 3. Keys

| Key                       | Where                                     | Notes                                                                                   |
|---------------------------|-------------------------------------------|-----------------------------------------------------------------------------------------|
| `anon` / `publishable`    | Browser bundle (via `VITE_SUPABASE_*`)    | Safe to expose. RLS gates all access. Rotate only if compromised.                        |
| `service_role`            | Edge functions only — never the client    | Bypasses RLS. Access via `Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")` in edge functions. |
| Third-party (Perplexity…) | Lovable Cloud secrets                     | Managed via `add_secret` tool. Never in code, never in `.env`.                          |

**Verify:** run `rg "SERVICE_ROLE" src` — this must return zero matches. The
service role key must exist only inside `supabase/functions/**`.

## 4. Storage

- Public buckets (`vocab-images`, `marketing-images`, `lesson-illustrations`,
  `song-images`) are intentionally readable — they hold non-sensitive assets
  used across the site.
- Private buckets (`student-documents`, `report-attachments`,
  `placement-audio`) must be accessed through signed URLs generated
  server-side, and RLS policies on `storage.objects` restrict listing/writing
  to the owning user.

## 5. Edge functions

- Always import CORS headers and return them on every response, including
  errors.
- Validate the caller with `supabase.auth.getUser()` using the request
  `Authorization` header before performing any privileged action.
- Validate request bodies with Zod or a manual schema before use.
- Never accept or execute raw SQL. Use RPC to typed, security-definer
  functions with checked arguments.

## 6. Content sanitization

- All user-generated HTML is passed through `sanitizeHtml()` in
  `src/lib/utils.ts` (DOMPurify) before rendering with
  `dangerouslySetInnerHTML`.
- Free-text form fields are trimmed, length-capped, and stripped of control
  characters via `sanitizeText()` before insert.

## 7. Local storage

- Never store PII or raw access tokens in the app's own localStorage keys.
  Use the `safeStorage` wrapper in `src/lib/safeStorage.ts`, which refuses to
  persist email addresses, phone numbers, or JWT-shaped strings.
- Supabase's own auth session (`sb-…-auth-token`) is managed by the client
  library and is disclosed in the Privacy Policy.

## 8. GDPR helpers

- `public.delete_user_data(_uid uuid)` — security definer, deletes every row
  the given user owns across all public tables. Only callable by
  `authenticated` (guarded by `auth.uid() = _uid`) and by `service_role`.
- `supabase/functions/delete-my-account/index.ts` — invokes the helper,
  scrubs the user's storage prefixes, and calls
  `auth.admin.deleteUser(uid)` to erase the account.

## 9. Rate limiting & abuse

- Vocabulary mastery inserts are throttled by the
  `prevent_vocab_mastered_burst` trigger (max 8/min).
- Chatbot and AI-grading endpoints use per-user timers on the client and
  edge-function-side sanity checks.
- Moderation actions are logged to `moderation_logs`.

## 10. Reviewing new tables

For any new `public` table, confirm in the same migration:
1. `CREATE TABLE`
2. `GRANT` to the roles that policies allow (never grant `anon` unless a
   policy explicitly permits it)
3. `ALTER TABLE … ENABLE ROW LEVEL SECURITY`
4. One `CREATE POLICY` per action (SELECT/INSERT/UPDATE/DELETE)

A migration without GRANT statements is incorrect and will fail at runtime
with a permission error.
