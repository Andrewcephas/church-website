import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "super_admin" | "branch_admin";

export interface UserRole {
  role: AppRole | null;
  branchId: string | null;
  loading: boolean;
  isSuperAdmin: boolean;
}

export const useUserRole = (): UserRole => {
  const [role, setRole] = useState<AppRole | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      const { data } = await supabase
        .from("user_roles")
        .select("role, branch_id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setRole(data.role as AppRole);
        setBranchId(data.branch_id);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { role, branchId, loading, isSuperAdmin: role === "super_admin" };
};

export const useBranches = () => {
  const [branches, setBranches] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("branches").select("*").order("branch_name").then(({ data }) => {
      if (data) setBranches(data);
    });
  }, []);
  return branches;
};
