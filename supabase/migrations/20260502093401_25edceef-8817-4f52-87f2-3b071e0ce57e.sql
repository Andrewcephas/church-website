
-- 1. Add 'teacher' role to enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'teacher';

-- 2. Helper: is current user a teacher of a specific class?
CREATE OR REPLACE FUNCTION public.is_class_teacher(_user_id uuid, _class_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.sunday_school_classes c
    WHERE c.id = _class_id AND c.user_id = _user_id
  )
$$;

-- 3. Helper: lookup user_id by email (security definer to read auth.users)
CREATE OR REPLACE FUNCTION public.find_user_by_email(_email text)
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT id FROM auth.users WHERE lower(email) = lower(_email) LIMIT 1
$$;

-- 4. Tighten BRANCHES: only super_admin manages, all auth read
DROP POLICY IF EXISTS "Authenticated users can manage branches" ON public.branches;
DROP POLICY IF EXISTS "Authenticated can read branches" ON public.branches;

CREATE POLICY "All authenticated read branches" ON public.branches
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Super admin manages branches" ON public.branches
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'super_admin'));

-- 5. Tighten MEMBERS
DROP POLICY IF EXISTS "Authenticated users can manage members" ON public.members;
CREATE POLICY "Branch-scoped members access" ON public.members
  FOR ALL TO authenticated
  USING (
    public.has_role(auth.uid(), 'super_admin')
    OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
    OR branch_id IS NULL
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'super_admin')
    OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
    OR branch_id IS NULL
  );

-- 6. Tighten ATTENDANCE
DROP POLICY IF EXISTS "Authenticated users can manage attendance" ON public.attendance;
CREATE POLICY "Branch-scoped attendance access" ON public.attendance
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin')
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
         OR branch_id IS NULL)
  WITH CHECK (public.has_role(auth.uid(), 'super_admin')
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
         OR branch_id IS NULL);

-- 7. Tighten FINANCE - secretaries and teachers cannot see finance
DROP POLICY IF EXISTS "Authenticated users can manage finance" ON public.finance;
CREATE POLICY "Pastor/Bishop only finance access" ON public.finance
  FOR ALL TO authenticated
  USING (
    public.has_role(auth.uid(), 'super_admin')
    OR (public.has_role(auth.uid(), 'branch_admin') AND public.can_access_branch(auth.uid(), branch_id))
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'super_admin')
    OR (public.has_role(auth.uid(), 'branch_admin') AND public.can_access_branch(auth.uid(), branch_id))
  );

-- 8. Tighten EVENTS (keep public SELECT for anon)
DROP POLICY IF EXISTS "Authenticated users can manage events" ON public.events;
CREATE POLICY "Branch-scoped events access" ON public.events
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin')
         OR is_conference = true
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
         OR branch_id IS NULL)
  WITH CHECK (public.has_role(auth.uid(), 'super_admin')
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
         OR branch_id IS NULL);

-- 9. Tighten SERMONS (keep anon SELECT)
DROP POLICY IF EXISTS "Authenticated users can manage sermons" ON public.sermons;
CREATE POLICY "Branch-scoped sermons access" ON public.sermons
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin')
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
         OR branch_id IS NULL)
  WITH CHECK (public.has_role(auth.uid(), 'super_admin')
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
         OR branch_id IS NULL);

-- 10. Tighten COMMUNICATIONS
DROP POLICY IF EXISTS "Authenticated users can manage communications" ON public.communications;
CREATE POLICY "Branch-scoped communications" ON public.communications
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin')
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
         OR branch_id IS NULL)
  WITH CHECK (public.has_role(auth.uid(), 'super_admin')
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
         OR branch_id IS NULL);

-- 11. Tighten NOTICES (global readable by all auth, branch-scoped otherwise)
DROP POLICY IF EXISTS "Authenticated can manage notices" ON public.notices;
CREATE POLICY "Notices read" ON public.notices
  FOR SELECT TO authenticated
  USING (is_global = true OR public.has_role(auth.uid(), 'super_admin')
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id)));
CREATE POLICY "Notices write" ON public.notices
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'super_admin')
              OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id)));
CREATE POLICY "Notices update" ON public.notices
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR user_id = auth.uid());
CREATE POLICY "Notices delete" ON public.notices
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR user_id = auth.uid());

-- 12. Sunday school classes
DROP POLICY IF EXISTS "Authenticated can manage sunday school classes" ON public.sunday_school_classes;
CREATE POLICY "Sunday school classes access" ON public.sunday_school_classes
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin')
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
         OR user_id = auth.uid())
  WITH CHECK (public.has_role(auth.uid(), 'super_admin')
         OR (branch_id IS NOT NULL AND public.can_access_branch(auth.uid(), branch_id))
         OR user_id = auth.uid());

-- 13. Sunday school members
DROP POLICY IF EXISTS "Authenticated can manage sunday school members" ON public.sunday_school_members;
CREATE POLICY "Sunday school members access" ON public.sunday_school_members
  FOR ALL TO authenticated
  USING (
    public.has_role(auth.uid(), 'super_admin')
    OR EXISTS (
      SELECT 1 FROM public.sunday_school_classes c
      WHERE c.id = sunday_school_members.class_id
        AND (public.can_access_branch(auth.uid(), c.branch_id) OR c.user_id = auth.uid())
    )
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'super_admin')
    OR EXISTS (
      SELECT 1 FROM public.sunday_school_classes c
      WHERE c.id = sunday_school_members.class_id
        AND (public.can_access_branch(auth.uid(), c.branch_id) OR c.user_id = auth.uid())
    )
  );

-- 14. Sunday school attendance
DROP POLICY IF EXISTS "Authenticated can manage sunday school attendance" ON public.sunday_school_attendance;
CREATE POLICY "Sunday school attendance access" ON public.sunday_school_attendance
  FOR ALL TO authenticated
  USING (
    public.has_role(auth.uid(), 'super_admin')
    OR EXISTS (
      SELECT 1 FROM public.sunday_school_classes c
      WHERE c.id = sunday_school_attendance.class_id
        AND (public.can_access_branch(auth.uid(), c.branch_id) OR c.user_id = auth.uid())
    )
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'super_admin')
    OR EXISTS (
      SELECT 1 FROM public.sunday_school_classes c
      WHERE c.id = sunday_school_attendance.class_id
        AND (public.can_access_branch(auth.uid(), c.branch_id) OR c.user_id = auth.uid())
    )
  );
