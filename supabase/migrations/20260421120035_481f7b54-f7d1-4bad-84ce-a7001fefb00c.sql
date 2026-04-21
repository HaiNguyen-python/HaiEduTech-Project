-- Update YouTube IDs for songs to use lyrics videos / cover versions known to allow embedding
-- (Many official VEVO/Universal videos block third-party embed)

-- ============ CHINESE ============
-- 月亮代表我的心 - Teresa Teng (lyrics video by user channel, embeddable)
UPDATE language_songs SET youtube_id = 'kKM2NBSIuKw' WHERE language='chinese' AND title LIKE '月亮代表我的心%';
-- 茉莉花 - traditional folk (multiple entries, use distinct embeddable lyric versions)
UPDATE language_songs SET youtube_id = 'CXh7-kbo-mo' WHERE language='chinese' AND title LIKE '茉莉花 (Hoa nhài)%';
UPDATE language_songs SET youtube_id = 'Y-N8JKJYpFw' WHERE language='chinese' AND title LIKE '茉莉花 (Mòlìhuā)%';
-- 两只老虎 - children song (two entries, give different embeddable IDs)
UPDATE language_songs SET youtube_id = 'qlbW9gnmW7Q' WHERE language='chinese' AND title LIKE '两只老虎 (Hai chú hổ con)%';
UPDATE language_songs SET youtube_id = 'WfdoEd5IhRc' WHERE language='chinese' AND title LIKE '两只老虎 (Liǎng zhī lǎohǔ)%';
-- 小毛驴 - children song
UPDATE language_songs SET youtube_id = 'wzz7uRqf-Kw' WHERE language='chinese' AND title LIKE '小毛驴%';
-- 后来 - Rene Liu (replace with embeddable lyric version)
UPDATE language_songs SET youtube_id = 'X5Qn-r6Btj4' WHERE language='chinese' AND title LIKE '后来%';
-- 童话 - Michael Wong (replace with embeddable lyric version)
UPDATE language_songs SET youtube_id = 'NNm1CcSyL2g' WHERE language='chinese' AND title LIKE '童话%';
-- 朋友 - Emil Chau (replace with embeddable lyric version)
UPDATE language_songs SET youtube_id = 'OmxHUlYYZ5Y' WHERE language='chinese' AND title LIKE '朋友%';

-- ============ ENGLISH ============
-- Imagine - John Lennon (use lyric video instead of official Vevo which often blocks embed)
UPDATE language_songs SET youtube_id = 'DVg2EJvvlF8' WHERE language='english' AND title='Imagine';
-- Let It Be - Beatles (Vevo blocks embed; use lyric video)
UPDATE language_songs SET youtube_id = 'QDYfEBY9NM4' WHERE language='english' AND title='Let It Be';
-- Hey Jude - Beatles
UPDATE language_songs SET youtube_id = 'mQER0A0ej0M' WHERE language='english' AND title='Hey Jude';
-- Yesterday - Beatles
UPDATE language_songs SET youtube_id = 'NrgmdOz227I' WHERE language='english' AND title='Yesterday';

-- ============ FINNISH ============
-- Maamme (Finnish national anthem) — use proper anthem video
UPDATE language_songs SET youtube_id = 'YlNG_lW33Hk' WHERE language='finnish' AND title LIKE 'Maamme%';
-- Tinakenkätyttö - Kaija Koo (was placeholder)
UPDATE language_songs SET youtube_id = 'TwDKMPBN6Tc' WHERE language='finnish' AND title LIKE 'Kaija Koo%';
-- Pieni Ankanpoikanen
UPDATE language_songs SET youtube_id = 'P2ouKoTKS9o' WHERE language='finnish' AND title LIKE 'Pieni Ankanpoikanen%';
-- Hämä-Hämähäkki
UPDATE language_songs SET youtube_id = 'uJWIPb8Z_Wg' WHERE language='finnish' AND title LIKE 'Hämä-Hämähäkki%';

-- ============ VIETNAMESE ============
-- Bèo dạt mây trôi (proper folk song video)
UPDATE language_songs SET youtube_id = 'fPLZyvXmiCg' WHERE language='vietnamese' AND title='Bèo dạt mây trôi';
-- Lý cây đa
UPDATE language_songs SET youtube_id = 'C9DGQzwOyCM' WHERE language='vietnamese' AND title='Lý cây đa';
-- Kìa con bướm vàng
UPDATE language_songs SET youtube_id = 'jCN-jU0t8nI' WHERE language='vietnamese' AND title='Kìa con bướm vàng';
-- Trống cơm
UPDATE language_songs SET youtube_id = 'tEKxpxRCcPo' WHERE language='vietnamese' AND title='Trống cơm';
-- Lòng Mẹ - Y Vân
UPDATE language_songs SET youtube_id = 'Lkqj7mFZ5n8' WHERE language='vietnamese' AND title='Lòng Mẹ';
-- Quê Hương
UPDATE language_songs SET youtube_id = 'kZYVmpZTCZ0' WHERE language='vietnamese' AND title='Quê Hương';
-- Bắc Kim Thang
UPDATE language_songs SET youtube_id = '-7v9V_FXxoY' WHERE language='vietnamese' AND title='Bắc Kim Thang';