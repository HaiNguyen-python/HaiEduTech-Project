---
name: Your Corner
description: Facebook-style social feed for HaiEduTech students to post text/images, comment, react
type: feature
---
Route `/your-corner`. Authenticated-only (no anon read/write). Posts up to 5000 chars + optional image to `marketing-images` bucket (`your-corner/{userId}/...`). Comments up to 1000 chars. Reactions are like-only (one per user per post).

Tables: `your_corner_posts`, `your_corner_comments`, `your_corner_reactions` — all RLS-protected, realtime-enabled. Owner or staff (`is_staff`) can delete posts/comments. Post owner can also delete any comment on their post.

UI: single-column FB-style feed, brand gradient (Royal Blue → Soft Emerald). Composer at top, infinite list newest-first (50 cap). Sanitize all rendered content with DOMPurify. Avatars use `get_public_profiles` RPC for author lookup.

Files: `src/pages/YourCorner.tsx`, `src/components/your-corner/PostComposer.tsx`, `src/components/your-corner/PostCard.tsx`, `src/hooks/useYourCornerFeed.ts`.

Nav: "Your Corner" entry in Navbar baseLinks (Users icon). EdTech entries combined into one dropdown with `🔬 EdTech Research` (/edtech-research) and `🎨 EdTech Software Design` (/dich-vu-web).
