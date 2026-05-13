DROP POLICY IF EXISTS "Users can read relevant roles" ON public.user_roles;

CREATE POLICY "Users can read relevant roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  OR public.has_role(auth.uid(), 'super_admin')
  OR public.has_role(auth.uid(), 'branch_admin')
  OR public.has_role(auth.uid(), 'secretary')
  OR public.has_role(auth.uid(), 'teacher')
);