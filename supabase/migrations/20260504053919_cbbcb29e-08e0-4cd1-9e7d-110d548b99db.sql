REVOKE EXECUTE ON FUNCTION public.assign_user_role_by_email(text, app_role, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_manage_role(uuid, app_role, uuid, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.delete_branch_by_id(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.delete_user_role_by_id(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.save_branch(uuid, text, text, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_any_super_admin() FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.assign_user_role_by_email(text, app_role, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_branch_by_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_user_role_by_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.save_branch(uuid, text, text, text) TO authenticated;