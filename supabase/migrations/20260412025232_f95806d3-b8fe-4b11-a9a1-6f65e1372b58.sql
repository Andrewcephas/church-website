
-- Fix branches: allow any authenticated user to manage branches
DROP POLICY IF EXISTS "Super admin can manage branches" ON public.branches;
CREATE POLICY "Authenticated users can manage branches"
ON public.branches FOR ALL TO authenticated
USING (true) WITH CHECK (true);

-- Fix user_roles: allow authenticated users to manage roles
-- (either they are super_admin, or no super_admin exists yet for bootstrap)
DROP POLICY IF EXISTS "Super admin can manage roles" ON public.user_roles;
CREATE POLICY "Authenticated can manage roles"
ON public.user_roles FOR ALL TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'super_admin')
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'super_admin')
);
