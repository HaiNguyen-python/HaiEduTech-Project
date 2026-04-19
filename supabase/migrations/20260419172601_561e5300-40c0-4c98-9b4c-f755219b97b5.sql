-- Helper function for auto-updating updated_at columns
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Class schedules table
CREATE TABLE public.class_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_name TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT 'english',
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  recurring TEXT NOT NULL DEFAULT 'none',
  recurring_days INTEGER[] DEFAULT '{}',
  platform_link TEXT,
  location TEXT,
  max_students INTEGER NOT NULL DEFAULT 20,
  status TEXT NOT NULL DEFAULT 'upcoming',
  color TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.class_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view class schedules"
ON public.class_schedules FOR SELECT
USING (true);

CREATE POLICY "Teachers can insert class schedules"
ON public.class_schedules FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Teachers can update class schedules"
ON public.class_schedules FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Teachers can delete class schedules"
ON public.class_schedules FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_class_schedules_updated_at
BEFORE UPDATE ON public.class_schedules
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_class_schedules_start_time ON public.class_schedules(start_time);
CREATE INDEX idx_class_schedules_subject ON public.class_schedules(subject);

-- Reminders / RSVP table
CREATE TABLE public.class_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.class_schedules(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (class_id, user_id)
);

ALTER TABLE public.class_reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reminders"
ON public.class_reminders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all reminders"
ON public.class_reminders FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can insert own reminders"
ON public.class_reminders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reminders"
ON public.class_reminders FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX idx_class_reminders_user ON public.class_reminders(user_id);
CREATE INDEX idx_class_reminders_class ON public.class_reminders(class_id);