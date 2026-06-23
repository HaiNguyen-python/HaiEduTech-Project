
CREATE INDEX IF NOT EXISTS idx_ycm_recipient_created ON public.your_corner_messages (recipient_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ycm_sender_created ON public.your_corner_messages (sender_id, created_at DESC);
