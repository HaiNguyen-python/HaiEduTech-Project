
-- Create tuition_records table for manual payment entries with audit trail
CREATE TABLE public.tuition_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  course text NOT NULL DEFAULT 'IELTS',
  payment_month integer NOT NULL CHECK (payment_month BETWEEN 1 AND 12),
  payment_year integer NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  payment_method text NOT NULL DEFAULT 'bank_transfer',
  note text,
  entered_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_name, payment_month, payment_year, course)
);

-- Enable RLS
ALTER TABLE public.tuition_records ENABLE ROW LEVEL SECURITY;

-- Only admins/teachers can manage tuition records
CREATE POLICY "Admins can view tuition records" ON public.tuition_records
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role));

CREATE POLICY "Admins can insert tuition records" ON public.tuition_records
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role));

CREATE POLICY "Admins can update tuition records" ON public.tuition_records
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role));

CREATE POLICY "Admins can delete tuition records" ON public.tuition_records
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role));

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.tuition_records;

-- Now clear old seed data from revenue_logs and insert accurate data from the spreadsheet
DELETE FROM public.revenue_logs;
