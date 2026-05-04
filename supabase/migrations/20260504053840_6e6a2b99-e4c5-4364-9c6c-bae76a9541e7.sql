-- Strengthen role helper functions and add safe CRUD RPCs for branch/role management
CREATE OR REPLACE FUNCTION public.get_user_branch_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT branch_id
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY CASE role WHEN 'super_admin' THEN 0 WHEN 'branch_admin' THEN 1 ELSE 2 END
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.can_manage_role(_actor_id uuid, _target_role app_role, _target_branch_id uuid, _target_user_id uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT
    _actor_id IS NOT NULL
    AND (
      public.has_role(_actor_id, 'super_admin')
      OR (
        NOT public.has_any_super_admin()
        AND _target_role = 'super_admin'
        AND (_target_user_id IS NULL OR _target_user_id = _actor_id)
      )
      OR (
        public.has_role(_actor_id, 'branch_admin')
        AND _target_role IN ('secretary', 'teacher', 'member')
        AND _target_branch_id IS NOT NULL
        AND _target_branch_id = public.get_user_branch_id(_actor_id)
      )
    )
$$;

CREATE OR REPLACE FUNCTION public.assign_user_role_by_email(_email text, _role app_role, _branch_id uuid DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  target_user_id uuid;
  saved_role_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'You must be logged in to assign roles.';
  END IF;

  SELECT id INTO target_user_id
  FROM auth.users
  WHERE lower(email) = lower(trim(_email))
  LIMIT 1;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found. Ask the person to sign up first, then assign their role.';
  END IF;

  IF _role <> 'super_admin' AND _branch_id IS NULL THEN
    RAISE EXCEPTION 'Please select a branch for this role.';
  END IF;

  IF NOT public.can_manage_role(auth.uid(), _role, _branch_id, target_user_id) THEN
    RAISE EXCEPTION 'You do not have permission to assign this role.';
  END IF;

  INSERT INTO public.user_roles (user_id, role, branch_id)
  VALUES (target_user_id, _role, CASE WHEN _role = 'super_admin' THEN NULL ELSE _branch_id END)
  ON CONFLICT (user_id, role)
  DO UPDATE SET branch_id = EXCLUDED.branch_id
  RETURNING id INTO saved_role_id;

  RETURN saved_role_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_user_role_by_id(_role_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  target_role app_role;
  target_branch_id uuid;
  target_user_id uuid;
  bishop_count integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'You must be logged in to remove roles.';
  END IF;

  SELECT role, branch_id, user_id INTO target_role, target_branch_id, target_user_id
  FROM public.user_roles
  WHERE id = _role_id;

  IF target_role IS NULL THEN
    RAISE EXCEPTION 'Role not found.';
  END IF;

  IF NOT public.can_manage_role(auth.uid(), target_role, target_branch_id, target_user_id) THEN
    RAISE EXCEPTION 'You do not have permission to remove this role.';
  END IF;

  IF target_role = 'super_admin' THEN
    SELECT count(*) INTO bishop_count FROM public.user_roles WHERE role = 'super_admin';
    IF bishop_count <= 1 THEN
      RAISE EXCEPTION 'You cannot remove the last Bishop role.';
    END IF;
  END IF;

  DELETE FROM public.user_roles WHERE id = _role_id;
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.save_branch(_branch_id uuid, _branch_name text, _location text DEFAULT NULL, _pastor_name text DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  saved_branch_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'You must be logged in to save branches.';
  END IF;

  IF NOT (public.has_role(auth.uid(), 'super_admin') OR NOT public.has_any_super_admin()) THEN
    RAISE EXCEPTION 'Only the Bishop can create or edit branches.';
  END IF;

  IF nullif(trim(_branch_name), '') IS NULL THEN
    RAISE EXCEPTION 'Branch name is required.';
  END IF;

  IF _branch_id IS NULL THEN
    INSERT INTO public.branches (branch_name, location, pastor_name)
    VALUES (trim(_branch_name), nullif(trim(coalesce(_location, '')), ''), nullif(trim(coalesce(_pastor_name, '')), ''))
    RETURNING id INTO saved_branch_id;
  ELSE
    UPDATE public.branches
    SET branch_name = trim(_branch_name),
        location = nullif(trim(coalesce(_location, '')), ''),
        pastor_name = nullif(trim(coalesce(_pastor_name, '')), ''),
        updated_at = now()
    WHERE id = _branch_id
    RETURNING id INTO saved_branch_id;

    IF saved_branch_id IS NULL THEN
      RAISE EXCEPTION 'Branch not found.';
    END IF;
  END IF;

  RETURN saved_branch_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_branch_by_id(_branch_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'You must be logged in to delete branches.';
  END IF;

  IF NOT (public.has_role(auth.uid(), 'super_admin') OR NOT public.has_any_super_admin()) THEN
    RAISE EXCEPTION 'Only the Bishop can delete branches.';
  END IF;

  DELETE FROM public.branches WHERE id = _branch_id;
  RETURN true;
END;
$$;

DROP POLICY IF EXISTS "Users can read own role" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated can manage roles" ON public.user_roles;

CREATE POLICY "Users can read relevant roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  OR public.has_role(auth.uid(), 'super_admin')
  OR (
    public.has_role(auth.uid(), 'branch_admin')
    AND branch_id = public.get_user_branch_id(auth.uid())
  )
);

CREATE POLICY "Authorized users can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.can_manage_role(auth.uid(), role, branch_id, user_id))
WITH CHECK (public.can_manage_role(auth.uid(), role, branch_id, user_id));

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_branch_id ON public.user_roles(branch_id);
CREATE INDEX IF NOT EXISTS idx_branches_branch_name ON public.branches(branch_name);

GRANT EXECUTE ON FUNCTION public.can_manage_role(uuid, app_role, uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.assign_user_role_by_email(text, app_role, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_user_role_by_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.save_branch(uuid, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_branch_by_id(uuid) TO authenticated;