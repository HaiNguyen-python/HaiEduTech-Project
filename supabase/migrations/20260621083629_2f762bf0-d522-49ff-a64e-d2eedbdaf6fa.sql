CREATE OR REPLACE FUNCTION public.get_your_corner_directory()
RETURNS TABLE(user_id uuid, full_name text, avatar_url text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.full_name, p.avatar_url
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
    AND p.id <> auth.uid()
    AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = p.id)
  ORDER BY (p.full_name IS NULL), p.full_name
  LIMIT 300;
$$;

GRANT EXECUTE ON FUNCTION public.get_your_corner_directory() TO authenticated;