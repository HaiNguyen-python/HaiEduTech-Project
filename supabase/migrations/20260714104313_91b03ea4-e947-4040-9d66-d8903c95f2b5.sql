
-- Backfill correct_index + explanation into poll jsonb, and shorten caption
WITH parsed AS (
  SELECT
    p.id,
    p.content,
    p.poll,
    -- Correct answer letter (A/B/C/D/E/F)
    substring(p.content FROM 'Đáp án đúng:\s*([A-F])') AS letter,
    -- Explanation after 📝
    trim(both E' \n\r\t' FROM substring(p.content FROM E'📝\\s*([^\\n\\r]+)')) AS expl,
    -- Subject label from header
    substring(p.content FROM 'Câu hỏi ôn tập\s+([A-Za-z]+)\s+hôm nay') AS subj_label,
    -- Emoji from first char
    left(p.content, 4) AS head
  FROM public.your_corner_posts p
  WHERE p.content ILIKE '%[AutoPoll]%' AND p.poll IS NOT NULL
)
UPDATE public.your_corner_posts t
SET
  poll = COALESCE(t.poll, '{}'::jsonb)
         || jsonb_build_object(
              'correct_index', CASE WHEN parsed.letter IS NOT NULL THEN ascii(parsed.letter) - ascii('A') END,
              'explanation', parsed.expl
            ),
  content = (
    CASE
      WHEN parsed.subj_label IS NOT NULL THEN
        (CASE WHEN parsed.subj_label ILIKE 'IELTS' THEN '📘'
              WHEN parsed.subj_label ILIKE 'Programming' THEN '💻'
              ELSE '🤖' END)
        || ' [AutoPoll] Câu hỏi ôn tập ' || parsed.subj_label || ' hôm nay!' || E'\n\n'
        || '#' || parsed.subj_label
        || CASE WHEN parsed.subj_label ILIKE 'AI' OR parsed.subj_label ILIKE 'General' THEN ' #AI' ELSE '' END
        || ' #HaiEduTech #OnTapCungThayHai'
      ELSE t.content
    END
  )
FROM parsed
WHERE t.id = parsed.id;
