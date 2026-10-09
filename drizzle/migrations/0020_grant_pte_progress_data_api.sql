GRANT SELECT, INSERT, DELETE ON public.pte_attempts TO authenticated;
GRANT ALL ON public.pte_attempts TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pte_vocab_mastery TO authenticated;
GRANT ALL ON public.pte_vocab_mastery TO service_role;