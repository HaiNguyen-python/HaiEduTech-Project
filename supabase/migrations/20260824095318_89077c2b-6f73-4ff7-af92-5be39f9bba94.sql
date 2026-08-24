CREATE POLICY "Users update own mastered"
ON public.user_vocab_mastered
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);