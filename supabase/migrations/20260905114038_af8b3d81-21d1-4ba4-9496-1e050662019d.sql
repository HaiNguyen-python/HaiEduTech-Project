-- 1. Pinned posts
ALTER TABLE public.your_corner_posts
  ADD COLUMN IF NOT EXISTS pinned_at timestamptz,
  ADD COLUMN IF NOT EXISTS pinned_by uuid;

CREATE INDEX IF NOT EXISTS idx_yc_posts_pinned ON public.your_corner_posts (pinned_at DESC NULLS LAST, created_at DESC);

DROP POLICY IF EXISTS "Staff can pin posts" ON public.your_corner_posts;
CREATE POLICY "Staff can pin posts"
ON public.your_corner_posts FOR UPDATE TO authenticated
USING (public.is_staff(auth.uid()))
WITH CHECK (public.is_staff(auth.uid()));

-- 2. Multi reactions
ALTER TABLE public.your_corner_reactions
  ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'like';

DROP POLICY IF EXISTS "Users can change own reaction" ON public.your_corner_reactions;
CREATE POLICY "Users can change own reaction"
ON public.your_corner_reactions FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 3. In-app notification triggers
CREATE OR REPLACE FUNCTION public.notify_corner_comment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_owner uuid;
  v_parent_author uuid;
  v_name text;
  v_route text;
BEGIN
  SELECT user_id INTO v_owner FROM public.your_corner_posts WHERE id = NEW.post_id;
  v_route := '/your-corner#post-' || NEW.post_id::text;
  SELECT COALESCE(NULLIF(TRIM(full_name), ''), 'Một học viên') INTO v_name
  FROM public.profiles WHERE id = NEW.user_id;

  IF NEW.parent_id IS NOT NULL THEN
    SELECT user_id INTO v_parent_author FROM public.your_corner_comments WHERE id = NEW.parent_id;
    IF v_parent_author IS NOT NULL AND v_parent_author <> NEW.user_id THEN
      INSERT INTO public.assignment_notifications (user_id, title, body, route)
      VALUES (v_parent_author, v_name || ' đã trả lời bình luận của bạn', LEFT(NEW.content, 160), v_route);
    END IF;
  END IF;

  IF v_owner IS NOT NULL AND v_owner <> NEW.user_id AND (v_parent_author IS NULL OR v_parent_author <> v_owner) THEN
    INSERT INTO public.assignment_notifications (user_id, title, body, route)
    VALUES (v_owner, v_name || ' đã bình luận bài viết của bạn', LEFT(NEW.content, 160), v_route);
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_corner_comment ON public.your_corner_comments;
CREATE TRIGGER trg_notify_corner_comment
AFTER INSERT ON public.your_corner_comments
FOR EACH ROW EXECUTE FUNCTION public.notify_corner_comment();

CREATE OR REPLACE FUNCTION public.notify_corner_reaction()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_owner uuid;
  v_name text;
BEGIN
  SELECT user_id INTO v_owner FROM public.your_corner_posts WHERE id = NEW.post_id;
  IF v_owner IS NULL OR v_owner = NEW.user_id THEN
    RETURN NEW;
  END IF;
  SELECT COALESCE(NULLIF(TRIM(full_name), ''), 'Một học viên') INTO v_name
  FROM public.profiles WHERE id = NEW.user_id;

  INSERT INTO public.assignment_notifications (user_id, title, body, route)
  VALUES (v_owner, v_name || ' đã bày tỏ cảm xúc với bài viết của bạn', 'Xem bài viết của bạn trong Your Corner',
          '/your-corner#post-' || NEW.post_id::text);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_corner_reaction ON public.your_corner_reactions;
CREATE TRIGGER trg_notify_corner_reaction
AFTER INSERT ON public.your_corner_reactions
FOR EACH ROW EXECUTE FUNCTION public.notify_corner_reaction();

CREATE OR REPLACE FUNCTION public.notify_corner_comment_reaction()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_author uuid;
  v_post uuid;
  v_name text;
BEGIN
  SELECT user_id, post_id INTO v_author, v_post
  FROM public.your_corner_comments WHERE id = NEW.comment_id;
  IF v_author IS NULL OR v_author = NEW.user_id THEN
    RETURN NEW;
  END IF;
  SELECT COALESCE(NULLIF(TRIM(full_name), ''), 'Một học viên') INTO v_name
  FROM public.profiles WHERE id = NEW.user_id;

  INSERT INTO public.assignment_notifications (user_id, title, body, route)
  VALUES (v_author, v_name || ' đã thả tim bình luận của bạn', 'Xem bình luận trong Your Corner',
          '/your-corner#post-' || v_post::text);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_corner_comment_reaction ON public.your_corner_comment_reactions;
CREATE TRIGGER trg_notify_corner_comment_reaction
AFTER INSERT ON public.your_corner_comment_reactions
FOR EACH ROW EXECUTE FUNCTION public.notify_corner_comment_reaction();

-- 4. Feed RPC: pinned first + reaction type breakdown
CREATE OR REPLACE FUNCTION public.get_your_corner_feed(_limit integer DEFAULT 15, _offset integer DEFAULT 0)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  WITH me AS (SELECT auth.uid() AS uid),
  base AS (
    SELECT p.*
    FROM public.your_corner_posts p
    ORDER BY p.pinned_at DESC NULLS LAST, p.created_at DESC
    OFFSET GREATEST(_offset, 0)
    LIMIT GREATEST(_limit, 1)
  ),
  rx AS (
    SELECT r.post_id,
           count(*)::bigint AS reaction_count,
           bool_or(r.user_id = (SELECT uid FROM me)) AS liked_by_me,
           max(CASE WHEN r.user_id = (SELECT uid FROM me) THEN r.type END) AS my_reaction,
           jsonb_object_agg(t.type, t.cnt) AS reaction_types
    FROM public.your_corner_reactions r
    JOIN (
      SELECT post_id, type, count(*) AS cnt
      FROM public.your_corner_reactions
      WHERE post_id IN (SELECT id FROM base)
      GROUP BY post_id, type
    ) t ON t.post_id = r.post_id
    WHERE r.post_id IN (SELECT id FROM base)
    GROUP BY r.post_id
  ),
  cm AS (
    SELECT c.post_id, count(*)::bigint AS comment_count
    FROM public.your_corner_comments c
    WHERE c.post_id IN (SELECT id FROM base)
    GROUP BY c.post_id
  ),
  bk AS (
    SELECT b.post_id, bool_or(b.user_id = (SELECT uid FROM me)) AS bookmarked_by_me
    FROM public.your_corner_bookmarks b
    WHERE b.post_id IN (SELECT id FROM base)
    GROUP BY b.post_id
  ),
  pv AS (
    SELECT v.post_id,
           jsonb_object_agg(v.option_index::text, v.cnt) AS poll_votes,
           max(v.my_vote) AS my_vote
    FROM (
      SELECT post_id, option_index, count(*) AS cnt,
             max(CASE WHEN user_id = (SELECT uid FROM me) THEN option_index END) AS my_vote
      FROM public.your_corner_poll_votes
      WHERE post_id IN (SELECT id FROM base)
      GROUP BY post_id, option_index
    ) v
    GROUP BY v.post_id
  ),
  agg AS (
    SELECT
      b.id, b.user_id, b.content, b.image_url, b.image_urls, b.subject, b.mood, b.visibility,
      b.created_at, b.poll, b.pinned_at,
      COALESCE(rx.reaction_count, 0) AS reaction_count,
      COALESCE(rx.liked_by_me, false) AS liked_by_me,
      rx.my_reaction,
      COALESCE(rx.reaction_types, '{}'::jsonb) AS reaction_types,
      COALESCE(cm.comment_count, 0) AS comment_count,
      COALESCE(bk.bookmarked_by_me, false) AS bookmarked_by_me,
      pv.poll_votes,
      pv.my_vote
    FROM base b
    LEFT JOIN rx ON rx.post_id = b.id
    LEFT JOIN cm ON cm.post_id = b.id
    LEFT JOIN bk ON bk.post_id = b.id
    LEFT JOIN pv ON pv.post_id = b.id
  ),
  authors AS (
    SELECT pr.id, pr.full_name, pr.avatar_url
    FROM public.profiles pr
    WHERE pr.id IN (SELECT user_id FROM base)
  )
  SELECT jsonb_build_object(
    'posts', COALESCE((SELECT jsonb_agg(to_jsonb(agg) ORDER BY agg.pinned_at DESC NULLS LAST, agg.created_at DESC) FROM agg), '[]'::jsonb),
    'authors', COALESCE((SELECT jsonb_agg(to_jsonb(a)) FROM authors a), '[]'::jsonb)
  );
$$;