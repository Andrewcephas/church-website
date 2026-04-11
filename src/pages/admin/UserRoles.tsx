import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useBranches } from "@/hooks/use-user-role";

const UserRoles = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ email: "", role: "", branch_id: "" });
  const branches = useBranches();
  const { toast } = useToast();

  const fetchRoles = async () => {
    const { data } = await supabase.from("user_roles").select("*, branches(branch_name)").order("created_at", { ascending: false });
    if (data) setRoles(data);
    setLoading(false);
  };

  useEffect(() => { fetchRoles(); }, []);

  const handleAssign = async () => {
    if (!form.email || !form.role) { toast({ title: "Email and role required", variant: "destructive" }); return; }
    // Look up user by email — we need their user ID
    // Since we can't query auth.users directly, the admin should use user IDs
    // For now, insert with a placeholder approach using the email note
    toast({ title: "Note", description: "Enter the user's UUID (from their profile). Email lookup requires server function." });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("user_roles").delete().eq("id", id);
    toast({ title: "Role removed" }); fetchRoles();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">User Roles</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Assign Role</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Assign Role</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>User ID (UUID)</Label><Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Paste user UUID" /></div>
              <div><Label>Role</Label>
                <Select value={form.role} onValueChange={v => setForm({ ...form, role: v })}>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="branch_admin">Branch Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.role === "branch_admin" && (
                <div><Label>Branch</Label>
                  <Select value={form.branch_id} onValueChange={v => setForm({ ...form, branch_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
                    <SelectContent>{branches.map(b => <SelectItem key={b.id} value={b.id}>{b.branch_name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              )}
              <Button onClick={async () => {
                if (!form.email || !form.role) return;
                const payload: any = { user_id: form.email, role: form.role };
                if (form.role === "branch_admin" && form.branch_id) payload.branch_id = form.branch_id;
                const { error } = await supabase.from("user_roles").insert(payload);
                if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
                toast({ title: "Role assigned" }); setDialogOpen(false); setForm({ email: "", role: "", branch_id: "" }); fetchRoles();
              }} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Assign</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Assigned Roles</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : roles.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No roles assigned. The first user to sign up should be assigned Super Admin.</p>
          ) : (
            <Table>
              <TableHeader><TableRow><TableHead>User ID</TableHead><TableHead>Role</TableHead><TableHead>Branch</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {roles.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.user_id}</TableCell>
                    <TableCell><Badge variant={r.role === "super_admin" ? "default" : "secondary"}>{r.role}</Badge></TableCell>
                    <TableCell>{r.branches?.branch_name || "All"}</TableCell>
                    <TableCell><Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRoles;
