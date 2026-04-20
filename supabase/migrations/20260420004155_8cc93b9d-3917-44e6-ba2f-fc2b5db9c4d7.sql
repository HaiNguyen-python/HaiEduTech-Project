-- Remove direct insert capability for authenticated users.
-- Inserts now happen exclusively through the edge function using the service role.
DROP POLICY IF EXISTS "Authenticated can upsert theory cache" ON public.programming_theory_cache;