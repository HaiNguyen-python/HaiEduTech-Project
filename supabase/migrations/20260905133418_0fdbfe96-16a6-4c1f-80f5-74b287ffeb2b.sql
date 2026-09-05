alter table public.your_corner_posts add column if not exists is_question boolean not null default false;
alter table public.your_corner_comments add column if not exists is_helpful boolean not null default false;

drop policy if exists "Post owner or staff can mark helpful comments" on public.your_corner_comments;
create policy "Post owner or staff can mark helpful comments"
on public.your_corner_comments for update to authenticated
using (
  public.is_staff(auth.uid())
  or exists (select 1 from public.your_corner_posts p where p.id = your_corner_comments.post_id and p.user_id = auth.uid())
)
with check (
  public.is_staff(auth.uid())
  or exists (select 1 from public.your_corner_posts p where p.id = your_corner_comments.post_id and p.user_id = auth.uid())
);

create or replace function public.get_your_corner_feed(_limit integer default 15, _offset integer default 0)
returns jsonb
language sql
stable security definer
set search_path to 'public'
as $function$
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
           jsonb_object_agg(r.type, r.type_cnt) AS reaction_types
    FROM (
      SELECT r2.*, count(*) OVER (PARTITION BY r2.post_id, r2.type) AS type_cnt
      FROM public.your_corner_reactions r2
      WHERE r2.post_id IN (SELECT id FROM base)
    ) r
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
      b.created_at, b.poll, b.pinned_at, b.is_question,
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
$function$;

create or replace function public.get_post_reactors(_post_id uuid)
returns table(user_id uuid, full_name text, avatar_url text, type text)
language sql
stable security definer
set search_path to 'public'
as $$
  select r.user_id, pr.full_name, pr.avatar_url, r.type
  from public.your_corner_reactions r
  left join public.profiles pr on pr.id = r.user_id
  where r.post_id = _post_id
  order by r.created_at desc
  limit 200;
$$;

create or replace function public.get_your_corner_helpers()
returns table(user_id uuid, full_name text, avatar_url text, helpful_count bigint, heart_count bigint, score bigint)
language sql
stable security definer
set search_path to 'public'
as $$
  with c as (
    select c.id, c.user_id, c.is_helpful
    from public.your_corner_comments c
    where c.created_at > now() - interval '7 days'
  ),
  h as (
    select cr.comment_id, count(*)::bigint as hearts
    from public.your_corner_comment_reactions cr
    where cr.comment_id in (select id from c)
    group by cr.comment_id
  )
  select c.user_id,
         pr.full_name,
         pr.avatar_url,
         count(*) filter (where c.is_helpful)::bigint as helpful_count,
         coalesce(sum(h.hearts), 0)::bigint as heart_count,
         (count(*) filter (where c.is_helpful) * 5 + coalesce(sum(h.hearts), 0))::bigint as score
  from c
  left join h on h.comment_id = c.id
  left join public.profiles pr on pr.id = c.user_id
  group by c.user_id, pr.full_name, pr.avatar_url
  having (count(*) filter (where c.is_helpful) * 5 + coalesce(sum(h.hearts), 0)) > 0
  order by score desc
  limit 10;
$$;

revoke all on function public.get_post_reactors(uuid) from public;
revoke all on function public.get_your_corner_helpers() from public;
grant execute on function public.get_post_reactors(uuid) to authenticated, service_role;
grant execute on function public.get_your_corner_helpers() to authenticated, service_role;