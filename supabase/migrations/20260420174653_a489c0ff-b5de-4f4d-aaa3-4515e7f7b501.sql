UPDATE public.programming_theory_cache
SET enhanced_markdown = TRIM(BOTH E' \n' FROM REGEXP_REPLACE(enhanced_markdown, '^```(?:markdown|md)?\s*\n([\s\S]*?)\n?```\s*$', '\1', 'i'))
WHERE enhanced_markdown LIKE '```%';