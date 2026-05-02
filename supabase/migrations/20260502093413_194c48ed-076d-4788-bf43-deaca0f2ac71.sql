
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.get_user_branch_id(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.can_access_branch(uuid, uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_class_teacher(uuid, uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.find_user_by_email(text) FROM anon, public;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_branch_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_branch(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_class_teacher(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.find_user_by_email(text) TO authenticated;
