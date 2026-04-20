UPDATE public.programming_theory_cache
SET enhanced_markdown = regexp_replace(
  regexp_replace(
    enhanced_markdown,
    '\s*\[\d+(\s*[,\s]\s*\d+)*\]',
    '',
    'g'
  ),
  E'\n#{1,6}\\s*(References|Sources|Citations|Tham khảo|Nguồn)[\\s\\S]*$',
  '',
  'gi'
)
WHERE enhanced_markdown ~ '\[\d+\]';