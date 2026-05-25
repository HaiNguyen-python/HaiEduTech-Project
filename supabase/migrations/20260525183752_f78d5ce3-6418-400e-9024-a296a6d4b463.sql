CREATE POLICY "Users can update own page views"
ON public.page_view_log
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);