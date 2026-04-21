-- Replace 6 broken YouTube IDs in language_songs with verified working IDs

-- 童话 (Tóng Huà) - Michael Wong - replaced with official MV by Rock Records
UPDATE public.language_songs 
SET youtube_id = 'bBcp_ljCBGU', updated_at = now()
WHERE id = '4cced62c-2c63-4507-a50f-39d0cb152cd2';

-- Lòng Mẹ - Y Vân - replaced with Hương Lan version with lyrics
UPDATE public.language_songs 
SET youtube_id = 'rUIb2OBhn5E', updated_at = now()
WHERE id = '4c10841a-b3fc-42ad-89d0-7dcd0c9ae994';

-- Quê Hương - Giáp Văn Thạch / Đỗ Trung Quân - verified working ID
UPDATE public.language_songs 
SET youtube_id = 'tcYodQoapMg', updated_at = now()
WHERE id = '91e0c99b-4409-40dc-ad93-248c4372a385';

-- Cháu Yêu Bà - Xuân Giao - replaced with Bé Xuân Mai liên khúc (contains this song)
UPDATE public.language_songs 
SET youtube_id = 'iLD9zqLhLW8', updated_at = now()
WHERE id = 'b1d45b0f-8ce0-4816-ae30-834978b4289f';

-- Một Con Vịt - replaced with BHmedia version
UPDATE public.language_songs 
SET youtube_id = '6cyMgHsXuJs', updated_at = now()
WHERE id = 'c2002cc1-02c6-43be-880b-dd6690f44ae2';

-- Bắc Kim Thang - replaced with BHmedia version
UPDATE public.language_songs 
SET youtube_id = 'Ej-R0ErUN34', updated_at = now()
WHERE id = '43943a7e-d16e-486e-99bb-76f85267b17b';