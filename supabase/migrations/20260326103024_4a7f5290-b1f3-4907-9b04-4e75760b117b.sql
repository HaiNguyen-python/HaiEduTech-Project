
-- Table to store per-course access grants for students
CREATE TABLE public.course_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  granted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.course_access ENABLE ROW LEVEL SECURITY;

-- Users can check their own access
CREATE POLICY "Users can view own access"
  ON public.course_access
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Teachers/admins can view all access records
CREATE POLICY "Teachers can view all access"
  ON public.course_access
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- Teachers/admins can grant access
CREATE POLICY "Teachers can insert access"
  ON public.course_access
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- Teachers/admins can revoke access
CREATE POLICY "Teachers can delete access"
  ON public.course_access
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));
