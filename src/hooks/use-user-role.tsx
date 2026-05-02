import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "super_admin" | "branch_admin" | "secretary" | "teacher" | "member";

export interface UserRole {
  role: AppRole | null;
  branchId: string | null;
  loading: boolean;
  isSuperAdmin: boolean;
  isBranchAdmin: boolean;
  isSecretary: boolean;
  isTeacher: boolean;
  isMember: boolean;
  /** Whether this role can access a given module key */
  can: (module: ModuleKey) => boolean;
}

export type ModuleKey =
  | "dashboard" | "branches" | "members" | "attendance" | "finance"
  | "events" | "sermons" | "sunday_school" | "notices" | "messages"
  | "communications" | "prayer_requests" | "social_quotes" | "user_roles"
  | "analytics" | "settings";

const PERMISSIONS: Record<AppRole, ModuleKey[]> = {
  super_admin: ["dashboard","branches","members","attendance","finance","events","sermons","sunday_school","notices","messages","communications","prayer_requests","social_quotes","user_roles","analytics","settings"],
  branch_admin: ["dashboard","members","attendance","finance","events","sermons","sunday_school","notices","messages","communications","prayer_requests","social_quotes","analytics","settings"],
  secretary: ["dashboard","members","attendance","events","notices","communications","prayer_requests","social_quotes"],
  teacher: ["dashboard","sunday_school","social_quotes"],
  member: ["dashboard","social_quotes"],
};

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

  const can = (module: ModuleKey) => {
    if (!role) return true; // until role is assigned, behave as full-access (bootstrap)
    return PERMISSIONS[role]?.includes(module) ?? false;
  };

  return {
    role,
    branchId,
    loading,
    isSuperAdmin: role === "super_admin" || role === null,
    isBranchAdmin: role === "branch_admin",
    isSecretary: role === "secretary",
    isTeacher: role === "teacher",
    isMember: role === "member",
    can,
  };
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
