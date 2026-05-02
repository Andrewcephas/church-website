import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useBranches } from "@/hooks/use-user-role";

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin (Bishop)",
  branch_admin: "Branch Pastor",
  secretary: "Secretary",
  teacher: "Sunday School Teacher",
  member: "Member",
};

const UserRoles = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [loginActivity, setLoginActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [form, setForm] = useState({ email: "", role: "", branch_id: "" });
  const branches = useBranches();
  const { toast } = useToast();

  const fetchRoles = async () => {
    const { data } = await supabase.from("user_roles").select("*, branches(branch_name)").order("created_at", { ascending: false });
    if (data) setRoles(data);
    setLoading(false);
  };

  const fetchLoginActivity = async () => {
    const { data } = await supabase.from("login_activity").select("*").order("login_at", { ascending: false }).limit(50);
    if (data) setLoginActivity(data);
  };

  useEffect(() => { fetchRoles(); fetchLoginActivity(); }, []);

  const handleAssign = async () => {
    if (!form.email || !form.role) { toast({ title: "Email and role required", variant: "destructive" }); return; }
    // Lookup user by email
    const { data: userId, error: lookupError } = await supabase.rpc("find_user_by_email", { _email: form.email.trim() });
    if (lookupError || !userId) {
      toast({ title: "User not found", description: "Make sure they have signed up first.", variant: "destructive" });
      return;
    }
    const payload: any = { user_id: userId, role: form.role };
    if (form.role !== "super_admin" && form.branch_id) payload.branch_id = form.branch_id;
    const { error } = await supabase.from("user_roles").insert(payload);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Role assigned" }); setDialogOpen(false); setForm({ email: "", role: "", branch_id: "" }); fetchRoles();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("user_roles").delete().eq("id", id);
    toast({ title: "Role removed" }); fetchRoles();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">User Roles</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { fetchLoginActivity(); setActivityOpen(true); }}>
            <Eye className="h-4 w-4 mr-2" />Login Activity
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Assign Role</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Assign Role</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>User Email</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="user@example.com" /></div>
                <div><Label>Role</Label>
                  <Select value={form.role} onValueChange={v => setForm({ ...form, role: v })}>
                    <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin (Bishop)</SelectItem>
                      <SelectItem value="branch_admin">Branch Pastor</SelectItem>
                      <SelectItem value="secretary">Secretary</SelectItem>
                      <SelectItem value="teacher">Sunday School Teacher</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {form.role && form.role !== "super_admin" && (
                  <div><Label>Branch</Label>
                    <Select value={form.branch_id} onValueChange={v => setForm({ ...form, branch_id: v })}>
                      <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
                      <SelectContent>{branches.map(b => <SelectItem key={b.id} value={b.id}>{b.branch_name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                )}
                <Button onClick={handleAssign} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Assign</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Assigned Roles</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : roles.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No roles assigned yet.</p>
          ) : (
            <Table>
              <TableHeader><TableRow><TableHead>User ID</TableHead><TableHead>Role</TableHead><TableHead>Branch</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {roles.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.user_id}</TableCell>
                    <TableCell><Badge variant={r.role === "super_admin" ? "default" : "secondary"}>{roleLabels[r.role] || r.role}</Badge></TableCell>
                    <TableCell>{r.branches?.branch_name || "All"}</TableCell>
                    <TableCell><Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Login Activity Dialog */}
      <Dialog open={activityOpen} onOpenChange={setActivityOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Recent Login Activity</DialogTitle></DialogHeader>
          {loginActivity.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No login activity recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {loginActivity.map(a => (
                <div key={a.id} className="p-2 bg-muted rounded text-sm flex justify-between">
                  <span className="text-foreground">{a.user_email || a.user_id.slice(0, 8) + "..."}</span>
                  <span className="text-muted-foreground">{new Date(a.login_at).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserRoles;
