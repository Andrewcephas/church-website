import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, KeyRound, Trash2, RefreshCw, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/use-user-role";

const Accounts = () => {
  const { isSuperAdmin } = useUserRole();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [me, setMe] = useState<any>(null);
  const [emailDialog, setEmailDialog] = useState<{ open: boolean; user: any | null }>({ open: false, user: null });
  const [pwdDialog, setPwdDialog] = useState<{ open: boolean; user: any | null }>({ open: false, user: null });
  const [emailVal, setEmailVal] = useState("");
  const [pwdVal, setPwdVal] = useState("");
  const { toast } = useToast();

  const fetchMe = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setMe(user);
  };

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("manage-accounts", { body: { action: "list_users" } });
    if (error || data?.error) toast({ title: "Could not load accounts", description: error?.message || data?.error, variant: "destructive" });
    else setUsers(data?.users || []);
    setLoading(false);
  };

  useEffect(() => { fetchMe(); if (isSuperAdmin) fetchUsers(); else setLoading(false); }, [isSuperAdmin]);

  const callFn = async (body: any, successMsg: string) => {
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-accounts", { body });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: successMsg });
      return true;
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
      return false;
    } finally { setSaving(false); }
  };

  const submitEmail = async () => {
    if (!emailVal.trim()) return;
    const target = emailDialog.user;
    const ok = await callFn(
      target.id === me?.id
        ? { action: "update_self_email", email: emailVal.trim() }
        : { action: "update_email", user_id: target.id, email: emailVal.trim() },
      "Email updated"
    );
    if (ok) { setEmailDialog({ open: false, user: null }); setEmailVal(""); fetchUsers(); }
  };

  const submitPwd = async () => {
    if (pwdVal.length < 6) { toast({ title: "Password must be at least 6 characters", variant: "destructive" }); return; }
    const target = pwdDialog.user;
    const ok = await callFn(
      target.id === me?.id
        ? { action: "update_self_password", password: pwdVal }
        : { action: "update_password", user_id: target.id, password: pwdVal },
      "Password updated"
    );
    if (ok) { setPwdDialog({ open: false, user: null }); setPwdVal(""); }
  };

  const deleteUser = async (u: any) => {
    if (!confirm(`Delete account ${u.email}?`)) return;
    const ok = await callFn({ action: "delete_user", user_id: u.id }, "Account deleted");
    if (ok) fetchUsers();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Accounts</h2>
        <p className="text-sm text-muted-foreground">Manage login emails and passwords.</p>
      </div>

      {/* My account card - everyone can edit themselves */}
      {me && (
        <Card className="animate-fade-in">
          <CardHeader><CardTitle className="flex items-center gap-2"><UserIcon className="h-5 w-5 text-primary" />My Account</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{me.email}</p>
                <p className="text-xs text-muted-foreground">User ID: {me.id.slice(0, 8)}…</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" onClick={() => { setEmailVal(me.email); setEmailDialog({ open: true, user: me }); }}><Mail className="h-4 w-4 mr-2" />Change Email</Button>
                <Button variant="outline" onClick={() => { setPwdVal(""); setPwdDialog({ open: true, user: me }); }}><KeyRound className="h-4 w-4 mr-2" />Change Password</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isSuperAdmin && (
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2"><UserIcon className="h-5 w-5 text-primary" />All Accounts</CardTitle>
              <Button variant="ghost" size="sm" onClick={fetchUsers} disabled={loading}><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /></Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : (
              <>
                <div className="grid gap-3 sm:hidden">
                  {users.map(u => (
                    <div key={u.id} className="border rounded-lg p-3 bg-card animate-fade-in">
                      <p className="font-medium text-foreground break-all">{u.email}</p>
                      {u.phone && <p className="text-xs text-muted-foreground">📱 {u.phone}</p>}
                      <p className="text-xs text-muted-foreground">Last login: {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : "Never"}</p>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        <Button size="sm" variant="outline" onClick={() => { setEmailVal(u.email); setEmailDialog({ open: true, user: u }); }}><Mail className="h-3 w-3 mr-1" />Email</Button>
                        <Button size="sm" variant="outline" onClick={() => { setPwdVal(""); setPwdDialog({ open: true, user: u }); }}><KeyRound className="h-3 w-3 mr-1" />Password</Button>
                        {u.id !== me?.id && <Button size="sm" variant="ghost" onClick={() => deleteUser(u)}><Trash2 className="h-3 w-3 text-destructive" /></Button>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden sm:block overflow-x-auto">
                  <Table>
                    <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Last Login</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {users.map(u => (
                        <TableRow key={u.id} className="hover:bg-muted/40 transition-colors">
                          <TableCell className="font-medium">{u.email}</TableCell>
                          <TableCell>{u.phone || "—"}</TableCell>
                          <TableCell>{u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : "Never"}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => { setEmailVal(u.email); setEmailDialog({ open: true, user: u }); }}><Mail className="h-4 w-4 text-primary" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => { setPwdVal(""); setPwdDialog({ open: true, user: u }); }}><KeyRound className="h-4 w-4 text-primary" /></Button>
                              {u.id !== me?.id && <Button variant="ghost" size="icon" onClick={() => deleteUser(u)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={emailDialog.open} onOpenChange={(o) => setEmailDialog({ open: o, user: o ? emailDialog.user : null })}>
        <DialogContent>
          <DialogHeader><DialogTitle>Change Email</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>New Email</Label><Input type="email" value={emailVal} onChange={e => setEmailVal(e.target.value)} /></div>
            <Button onClick={submitEmail} disabled={saving} className="w-full">{saving ? "Saving..." : "Update Email"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={pwdDialog.open} onOpenChange={(o) => setPwdDialog({ open: o, user: o ? pwdDialog.user : null })}>
        <DialogContent>
          <DialogHeader><DialogTitle>Change Password</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>New Password</Label><Input type="password" value={pwdVal} onChange={e => setPwdVal(e.target.value)} placeholder="At least 6 characters" /></div>
            <Button onClick={submitPwd} disabled={saving} className="w-full">{saving ? "Saving..." : "Update Password"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Accounts;
