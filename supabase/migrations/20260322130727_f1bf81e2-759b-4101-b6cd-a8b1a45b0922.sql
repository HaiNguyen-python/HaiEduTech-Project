
CREATE TABLE public.learning_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  language text NOT NULL CHECK (language IN ('english', 'chinese')),
  level text NOT NULL,
  material_type text NOT NULL CHECK (material_type IN ('reading', 'grammar', 'vocabulary')),
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  question_count integer NOT NULL DEFAULT 5,
  is_published boolean NOT NULL DEFAULT true
);

ALTER TABLE public.learning_materials ENABLE ROW LEVEL SECURITY;

-- Anyone can read published materials
CREATE POLICY "Anyone can view published materials"
ON public.learning_materials
FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Authenticated users can create materials
CREATE POLICY "Authenticated users can create materials"
ON public.learning_materials
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Creators can update their own materials
CREATE POLICY "Creators can update own materials"
ON public.learning_materials
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Creators can delete their own materials
CREATE POLICY "Creators can delete own materials"
ON public.learning_materials
FOR DELETE
TO authenticated
USING (auth.uid() = created_by);
