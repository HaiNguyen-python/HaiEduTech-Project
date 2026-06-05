DELETE FROM public.game_participants WHERE room_id IN (SELECT id FROM public.game_rooms WHERE room_code IN ('L2V8F8','TESTRM'));
DELETE FROM public.game_rooms WHERE room_code IN ('L2V8F8','TESTRM');