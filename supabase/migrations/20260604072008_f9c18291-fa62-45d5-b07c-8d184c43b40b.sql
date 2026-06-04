
-- Normalize existing rows so a plain UNIQUE constraint on `word` can be added.
UPDATE public.english_dictionary
SET word = lower(trim(word))
WHERE word <> lower(trim(word));

-- Collapse any accidental duplicates produced by the normalization (keep newest).
DELETE FROM public.english_dictionary a
USING public.english_dictionary b
WHERE a.word = b.word
  AND a.created_at < b.created_at;

-- Add the missing plain unique constraint on `word` (required by upsert onConflict: "word").
ALTER TABLE public.english_dictionary
  ADD CONSTRAINT english_dictionary_word_key UNIQUE (word);
