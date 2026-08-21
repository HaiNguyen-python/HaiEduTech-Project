REVOKE EXECUTE ON FUNCTION public.share_notebook(uuid, uuid[]) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.list_notebooks_shared_with_me() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.list_notebook_share_recipients(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.can_read_shared_notebook(uuid) FROM anon, public;

GRANT EXECUTE ON FUNCTION public.share_notebook(uuid, uuid[]) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.list_notebooks_shared_with_me() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.list_notebook_share_recipients(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.can_read_shared_notebook(uuid) TO authenticated, service_role;