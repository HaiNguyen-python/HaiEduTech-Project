CREATE POLICY "Teachers can delete any lesson"
ON public.generated_lessons
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));