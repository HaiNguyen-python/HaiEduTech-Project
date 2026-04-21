-- Create language_songs table for the "Learn through Songs" feature
CREATE TABLE public.language_songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('english','chinese','finnish','vietnamese')),
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'easy' CHECK (difficulty IN ('easy','intermediate','advanced')),
  youtube_id TEXT,
  spotify_url TEXT,
  album_art_url TEXT,
  cultural_note TEXT,
  cultural_note_en TEXT,
  is_public_domain BOOLEAN NOT NULL DEFAULT false,
  -- Lyrics: array of line objects {original, translation, startTime?, words?:[{w,meaning,ipa,pinyin}]}
  lyrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- Core vocab: array of {word, ipa?, pinyin?, meaning, example}
  core_vocab JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- Fill-in-blank quiz items: array of {lineIndex, blanks:[{wordIndex, answer}]}
  blanks_quiz JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_language_songs_lang ON public.language_songs(language, display_order);

ALTER TABLE public.language_songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published songs"
ON public.language_songs FOR SELECT
USING (is_published = true);

CREATE POLICY "Teachers can insert songs"
ON public.language_songs FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(),'teacher') OR has_role(auth.uid(),'admin'));

CREATE POLICY "Teachers can update songs"
ON public.language_songs FOR UPDATE
TO authenticated
USING (has_role(auth.uid(),'teacher') OR has_role(auth.uid(),'admin'));

CREATE POLICY "Teachers can delete songs"
ON public.language_songs FOR DELETE
TO authenticated
USING (has_role(auth.uid(),'teacher') OR has_role(auth.uid(),'admin'));

CREATE TRIGGER trg_language_songs_updated_at
BEFORE UPDATE ON public.language_songs
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();