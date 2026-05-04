
CREATE OR REPLACE FUNCTION public.has_any_super_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'super_admin')
$$;

DROP POLICY IF EXISTS "Authenticated can manage roles" ON public.user_roles;
CREATE POLICY "Authenticated can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR NOT public.has_any_super_admin())
  WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR NOT public.has_any_super_admin());

DROP POLICY IF EXISTS "Super admin manages branches" ON public.branches;
CREATE POLICY "Super admin manages branches" ON public.branches
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR NOT public.has_any_super_admin())
  WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR NOT public.has_any_super_admin());
