UPDATE public.programming_theory_cache
SET enhanced_markdown = REGEXP_REPLACE(
  REGEXP_REPLACE(enhanced_markdown, '^```(markdown|md)?[[:space:]]*\n', '', 'i'),
  '\n?```[[:space:]]*$', '', 'i'
)
WHERE enhanced_markdown LIKE '```%';