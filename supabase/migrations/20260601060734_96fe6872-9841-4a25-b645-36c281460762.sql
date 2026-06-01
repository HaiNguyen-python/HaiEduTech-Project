-- Classes table
CREATE TABLE public.classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name text NOT NULL,
  subject_category text NOT NULL DEFAULT 'general',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.classes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.classes TO authenticated;
GRANT ALL ON public.classes TO service_role;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view classes" ON public.classes
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Teachers manage classes" ON public.classes
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER classes_set_updated_at BEFORE UPDATE ON public.classes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Class members junction
CREATE TABLE public.class_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  added_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (class_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.class_members TO authenticated;
GRANT ALL ON public.class_members TO service_role;
ALTER TABLE public.class_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own membership" ON public.class_members
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Teachers view all memberships" ON public.class_members
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Teachers manage memberships" ON public.class_members
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_class_members_class ON public.class_members(class_id);
CREATE INDEX idx_class_members_user ON public.class_members(user_id);

-- Assignment notifications
CREATE TABLE public.assignment_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  assignment_id uuid,
  title text NOT NULL,
  body text NOT NULL,
  route text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  read_at timestamptz
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assignment_notifications TO authenticated;
GRANT ALL ON public.assignment_notifications TO service_role;
ALTER TABLE public.assignment_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own notifications" ON public.assignment_notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON public.assignment_notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own notifications" ON public.assignment_notifications
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Teachers insert notifications" ON public.assignment_notifications
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_notifs_user_unread ON public.assignment_notifications(user_id, is_read, created_at DESC);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.assignment_notifications;