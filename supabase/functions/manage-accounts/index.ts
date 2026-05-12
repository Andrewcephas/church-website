// Bishop-only account management edge function.
// Actions: create_user, update_email, update_password, list_users, delete_user
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader) return json(401, { error: "Missing authorization" });

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userRes } = await userClient.auth.getUser();
    const caller = userRes?.user;
    if (!caller) return json(401, { error: "Not authenticated" });

    const admin = createClient(supabaseUrl, serviceKey);

    // Caller's role
    const { data: callerRoleRow } = await admin
      .from("user_roles").select("role").eq("user_id", caller.id);
    const callerRoles = (callerRoleRow || []).map((r: any) => r.role);
    const isBishop = callerRoles.includes("super_admin");

    // Bootstrap: if no super_admin exists, treat caller as bishop for this op
    const { count: bishopCount } = await admin
      .from("user_roles").select("*", { count: "exact", head: true }).eq("role", "super_admin");
    const bishopBootstrap = (bishopCount || 0) === 0;

    const body = await req.json().catch(() => ({}));
    const action = body.action as string;

    // Self actions (no bishop required)
    if (action === "update_self_email" || action === "update_self_password") {
      const updates: any = {};
      if (action === "update_self_email") updates.email = String(body.email || "").trim();
      if (action === "update_self_password") updates.password = String(body.password || "");
      if (action === "update_self_password" && updates.password.length < 6)
        return json(400, { error: "Password must be at least 6 characters." });
      const { error } = await admin.auth.admin.updateUserById(caller.id, updates);
      if (error) return json(400, { error: error.message });
      return json(200, { ok: true });
    }

    if (!isBishop && !bishopBootstrap) return json(403, { error: "Only the Bishop can manage accounts." });

    if (action === "list_users") {
      const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
      if (error) return json(400, { error: error.message });
      return json(200, {
        users: data.users.map((u) => ({
          id: u.id, email: u.email, phone: u.phone,
          created_at: u.created_at, last_sign_in_at: u.last_sign_in_at,
        })),
      });
    }

    if (action === "create_user") {
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const phone = body.phone ? String(body.phone).trim() : undefined;
      const role = (body.role as string) || "branch_admin";
      const branch_id = body.branch_id || null;
      if (!email || !password) return json(400, { error: "Email and password are required." });
      if (password.length < 6) return json(400, { error: "Password must be at least 6 characters." });

      const created = await admin.auth.admin.createUser({
        email, password, email_confirm: true,
        user_metadata: { phone, created_by: caller.id },
      });

      let newId = created.data.user?.id;
      if (created.error) {
        const existing = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
        const found = existing.data?.users.find((u) => u.email?.toLowerCase() === email);
        if (!found) return json(400, { error: created.error.message });
        newId = found.id;
        const { error: updateErr } = await admin.auth.admin.updateUserById(newId, { password, user_metadata: { phone, updated_by: caller.id } });
        if (updateErr) return json(400, { error: updateErr.message });
      }

      const { error: deleteOldErr } = await admin.from("user_roles").delete().eq("user_id", newId).eq("role", role);
      if (deleteOldErr) return json(400, { error: deleteOldErr.message });
      const { error: rErr } = await admin.from("user_roles").insert(
        { user_id: newId, role, branch_id: role === "super_admin" ? null : branch_id },
      );
      if (rErr) return json(400, { error: rErr.message });
      return json(200, { ok: true, user_id: newId });
    }

    if (action === "update_email" || action === "update_password") {
      const target = String(body.user_id || "");
      if (!target) return json(400, { error: "user_id required." });
      const updates: any = {};
      if (action === "update_email") updates.email = String(body.email || "").trim();
      if (action === "update_password") {
        updates.password = String(body.password || "");
        if (updates.password.length < 6) return json(400, { error: "Password must be at least 6 characters." });
      }
      const { error } = await admin.auth.admin.updateUserById(target, updates);
      if (error) return json(400, { error: error.message });
      return json(200, { ok: true });
    }

    if (action === "delete_user") {
      const target = String(body.user_id || "");
      if (!target) return json(400, { error: "user_id required." });
      if (target === caller.id) return json(400, { error: "You cannot delete your own account." });
      const { error } = await admin.auth.admin.deleteUser(target);
      if (error) return json(400, { error: error.message });
      return json(200, { ok: true });
    }

    return json(400, { error: "Unknown action" });
  } catch (e: any) {
    return json(500, { error: e.message || "Internal error" });
  }
});
