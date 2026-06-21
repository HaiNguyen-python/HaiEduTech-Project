
## 1. EdTech menu group

Combine the two existing top-level items into one dropdown in `src/components/Navbar.tsx`:

- Replace lines 295–296 with one parent entry `EdTech` (icon `FlaskConical`, key `edtech`) whose `subs` contain:
  - `🔬 EdTech Research` → `/edtech-research`
  - `🎨 EdTech Software Design` → `/dich-vu-web`
- Keep the existing `/programming/edtech` item inside the Programming menu untouched (it is a different page).

No route or page changes — both targets already exist.

## 2. Your Corner — student social feed

A Facebook-style space inside the app where students post text + optional image, react, and comment. Public read for any logged-in user; only the author can edit/delete their own content.

### Navigation
- Add `Your Corner` (icon `Users`, route `/your-corner`) to `baseLinks` in `Navbar.tsx`, placed after `EdTech`.
- Register the route in `src/App.tsx` pointing to a new page `src/pages/YourCorner.tsx`.

### Page layout (`/your-corner`)
Single-column FB-style feed, mobile-first, matches HaiEduTech brand (Royal Blue → Soft Emerald gradients, semantic tokens only):

```text
+------------------------------------------+
| Header: Your Corner — chia sẻ cùng nhau  |
+------------------------------------------+
| Composer  [avatar] What's on your mind?  |
|           [image upload] [Post button]   |
+------------------------------------------+
| Post card                                |
|   [avatar] Name · time                   |
|   body text / image                      |
|   ❤ 12   💬 3   (Edit/Delete if mine)    |
|   --- comments ---                       |
|   [comment input]                        |
+------------------------------------------+
| ... infinite list, newest first          |
+------------------------------------------+
```

Components (new, under `src/components/your-corner/`):
- `PostComposer.tsx` — textarea, optional image upload to `marketing-images` bucket (reuse existing public bucket), submit handler.
- `PostCard.tsx` — author header, body (sanitized via DOMPurify), image, reaction button, comment list + composer, owner actions.
- `CommentList.tsx` — list + inline composer.

Hooks:
- `src/hooks/useYourCornerFeed.ts` — paginated fetch (20 per page), realtime subscribe to new posts via Supabase channel.

### Backend (Lovable Cloud migration)

New tables in `public`, all with explicit GRANTs and RLS:

1. `your_corner_posts`
   - `id uuid pk default gen_random_uuid()`
   - `user_id uuid not null references auth.users(id) on delete cascade`
   - `content text not null check (char_length(content) between 1 and 5000)`
   - `image_url text`
   - `created_at timestamptz default now()`
   - `updated_at timestamptz default now()`
   - RLS: SELECT to `authenticated`; INSERT/UPDATE/DELETE only when `auth.uid() = user_id`.

2. `your_corner_comments`
   - `id`, `post_id` (fk posts cascade), `user_id` (fk auth.users cascade)
   - `content text not null check (char_length(content) between 1 and 1000)`
   - `created_at timestamptz default now()`
   - RLS: SELECT authenticated; INSERT own; DELETE own OR post owner.

3. `your_corner_reactions`
   - `post_id`, `user_id`, `created_at`; PK (post_id, user_id)
   - RLS: SELECT authenticated; INSERT/DELETE own.

GRANT block on every table:
```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON public.<table> TO authenticated;
GRANT ALL ON public.<table> TO service_role;
```

`updated_at` trigger on posts reuses existing `public.set_updated_at()`.

### Moderation & safety
- Sanitize all rendered text with DOMPurify (per project rule).
- Unauthenticated users visiting `/your-corner` see a friendly "Đăng nhập để tham gia" CTA (no anon writes, no anon reads — keeps it a closed student community).
- Owner can delete own post/comment; reuses existing `is_staff` check to let teachers/admins delete any post.

### Out of scope (can add later if you want)
- Notifications, follows, hashtags, profile pages, image gallery view, post sharing to other channels.

## Files touched
- edit `src/components/Navbar.tsx` (EdTech group + Your Corner link)
- edit `src/App.tsx` (route)
- new `src/pages/YourCorner.tsx`
- new `src/components/your-corner/PostComposer.tsx`, `PostCard.tsx`, `CommentList.tsx`
- new `src/hooks/useYourCornerFeed.ts`
- new migration: 3 tables + grants + policies
- new memory file `mem://features/your-corner` and update `mem://index.md`
