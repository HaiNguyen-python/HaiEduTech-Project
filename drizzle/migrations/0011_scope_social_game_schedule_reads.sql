-- Your Corner: follow the parent post's visibility
DROP POLICY IF EXISTS "yc_comments_select_authed" ON public.your_corner_comments;
CREATE POLICY "yc_comments_select_visible_post" ON public.your_corner_comments FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.your_corner_posts p WHERE p.id = post_id));

DROP POLICY IF EXISTS "yc_reactions_select_authed" ON public.your_corner_reactions;
CREATE POLICY "yc_reactions_select_visible_post" ON public.your_corner_reactions FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.your_corner_posts p WHERE p.id = post_id));

DROP POLICY IF EXISTS "Authenticated read poll votes" ON public.your_corner_poll_votes;
CREATE POLICY "Read poll votes on visible posts" ON public.your_corner_poll_votes FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.your_corner_posts p WHERE p.id = post_id));

DROP POLICY IF EXISTS "yc_comment_reactions_select_authed" ON public.your_corner_comment_reactions;
CREATE POLICY "yc_comment_reactions_select_visible" ON public.your_corner_comment_reactions FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.your_corner_comments c WHERE c.id = comment_id));

-- Game scores: own rows or staff; leaderboard via safe RPC
DROP POLICY IF EXISTS "Authenticated can view all scores" ON public.game_scores;
CREATE POLICY "Users view own scores or staff" ON public.game_scores FOR SELECT TO authenticated
USING (auth.uid() = user_id OR public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.get_game_leaderboard(_game_type text)
RETURNS TABLE(user_id uuid, score integer, max_streak integer, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT g.user_id, g.score::int, g.max_streak::int, g.created_at
  FROM public.game_scores g
  WHERE g.game_type = left(_game_type, 100)
  ORDER BY g.score DESC LIMIT 500;
$$;
REVOKE ALL ON FUNCTION public.get_game_leaderboard(text) FROM public;
GRANT EXECUTE ON FUNCTION public.get_game_leaderboard(text) TO anon, authenticated;

-- Badges: own rows or staff
DROP POLICY IF EXISTS "Authenticated can view all badges" ON public.player_badges;
CREATE POLICY "Users view own badges or staff" ON public.player_badges FOR SELECT TO authenticated
USING (auth.uid() = user_id OR public.is_staff(auth.uid()));

-- Game rooms: creator, participants, staff; join by code via RPC
DROP POLICY IF EXISTS "Anyone can view rooms" ON public.game_rooms;
CREATE POLICY "Room creator participants or staff view room" ON public.game_rooms FOR SELECT TO anon, authenticated
USING ((auth.uid() IS NOT NULL AND created_by = auth.uid()) OR public.is_room_participant(id) OR public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.find_game_room(_code text)
RETURNS SETOF public.game_rooms
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT * FROM public.game_rooms WHERE room_code = upper(trim(left(_code, 20))) LIMIT 1;
$$;
CREATE OR REPLACE FUNCTION public.get_game_room_status(_room_id uuid)
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT status FROM public.game_rooms WHERE id = _room_id;
$$;
REVOKE ALL ON FUNCTION public.find_game_room(text) FROM public;
REVOKE ALL ON FUNCTION public.get_game_room_status(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.find_game_room(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_game_room_status(uuid) TO anon, authenticated;

-- Class schedules: staff or members of a class with that name
DROP POLICY IF EXISTS "Authenticated users can view class schedules" ON public.class_schedules;
CREATE POLICY "Members or staff view class schedules" ON public.class_schedules FOR SELECT TO authenticated
USING (public.is_staff(auth.uid()) OR EXISTS (
  SELECT 1 FROM public.class_members m JOIN public.classes c ON c.id = m.class_id
  WHERE m.user_id = auth.uid() AND c.class_name = class_schedules.class_name));