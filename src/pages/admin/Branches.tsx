import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Building2, Trash2, Pencil, Eye, EyeOff, Sparkles, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const emptyForm = {
  branch_name: "", location: "", pastor_name: "",
  create_account: true, pastor_email: "", pastor_phone: "", pastor_password: "",
};
const emptyAccount = { email: "", phone: "", password: "" };

const withTimeout = <T,>(promise: Promise<T>, ms = 15000) =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Request timed out.")), ms)),
  ]);

const Branches = () => {
  const [branches, setBranches] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [acctBranch, setAcctBranch] = useState<any | null>(null);
  const [acctForm, setAcctForm] = useState(emptyAccount);
  const [acctSaving, setAcctSaving] = useState(false);
  const { toast } = useToast();

  const fetchBranches = async () => {
    const { data, error } = await supabase.from("branches").select("*").order("branch_name");
    if (error) toast({ title: "Could not load branches", description: error.message, variant: "destructive" });
    else setBranches(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBranches(); }, []);

  // Auto-fill password from phone when phone changes (and not edited manually)
  const onPhoneChange = (phone: string) => {
    setForm((f) => ({
      ...f,
      pastor_phone: phone,
      pastor_password: f.pastor_password === "" || f.pastor_password === f.pastor_phone ? phone : f.pastor_password,
    }));
  };

  const handleSave = async () => {
    if (!form.branch_name) { toast({ title: "Branch name is required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const { data: branchId, error } = await withTimeout<any>((supabase as any).rpc("save_branch", {
        _branch_id: editId,
        _branch_name: form.branch_name,
        _location: form.location || null,
        _pastor_name: form.pastor_name || null,
      }));
      if (error) throw error;

      // Create pastor account on new branch creation
      if (!editId && form.create_account && form.pastor_email && form.pastor_password) {
        if (form.pastor_password.length < 6) throw new Error("Password must be at least 6 characters.");
        const { data, error: fnErr } = await withTimeout<any>(
          supabase.functions.invoke("manage-accounts", {
            body: {
              action: "create_user",
              email: form.pastor_email.trim(),
              password: form.pastor_password,
              phone: form.pastor_phone || null,
              role: "branch_admin",
              branch_id: branchId,
            },
          })
        );
        if (fnErr) throw fnErr;
        if (data?.error) throw new Error(data.error);
        toast({ title: "Branch + Pastor account created", description: `${form.pastor_email} can now log in.` });
      } else {
        toast({ title: editId ? "Branch updated" : "Branch created" });
      }
      setForm(emptyForm); setEditId(null); setDialogOpen(false); fetchBranches();
    } catch (error: any) {
      toast({ title: "Save failed", description: error.message || "Please try again.", variant: "destructive" });
    } finally { setSaving(false); }
  };

  const handleEdit = (b: any) => {
    setForm({ ...emptyForm, branch_name: b.branch_name, location: b.location || "", pastor_name: b.pastor_name || "", create_account: false });
    setEditId(b.id); setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this branch?")) return;
    const { error } = await withTimeout<any>((supabase as any).rpc("delete_branch_by_id", { _branch_id: id }));
    if (error) { toast({ title: "Delete failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Branch deleted" }); fetchBranches();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Branch Management</h2>
          <p className="text-sm text-muted-foreground">Create branches and pastor accounts in one step.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditId(null); setForm(emptyForm); } }}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm(emptyForm); setEditId(null); setDialogOpen(true); }} className="bg-primary hover:bg-primary/90 text-primary-foreground hover-scale">
              <Plus className="h-4 w-4 mr-2" />Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {editId ? "Edit Branch" : "Add Branch"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2"><Label>Branch Name *</Label><Input value={form.branch_name} onChange={e => setForm({ ...form, branch_name: e.target.value })} /></div>
                <div><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
                <div><Label>Pastor Name</Label><Input value={form.pastor_name} onChange={e => setForm({ ...form, pastor_name: e.target.value })} /></div>
              </div>

              {!editId && (
                <div className="border rounded-lg p-4 space-y-3 bg-muted/30 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <Label className="font-semibold">Create Pastor Login</Label>
                    </div>
                    <Switch checked={form.create_account} onCheckedChange={(v) => setForm({ ...form, create_account: v })} />
                  </div>
                  {form.create_account && (
                    <div className="space-y-3">
                      <div><Label>Pastor Email *</Label><Input type="email" value={form.pastor_email} onChange={e => setForm({ ...form, pastor_email: e.target.value })} placeholder="pastor@example.com" /></div>
                      <div><Label>Phone Number</Label><Input value={form.pastor_phone} onChange={e => onPhoneChange(e.target.value)} placeholder="+254..." /></div>
                      <div>
                        <Label>Password (default: phone)</Label>
                        <div className="relative">
                          <Input type={showPwd ? "text" : "password"} value={form.pastor_password} onChange={e => setForm({ ...form, pastor_password: e.target.value })} placeholder="At least 6 characters" />
                          <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Pastor will log in with email + password. Minimum 6 characters.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Button onClick={handleSave} disabled={saving} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {saving ? "Saving..." : editId ? "Update Branch" : "Create Branch"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="animate-fade-in">
        <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" />Branches</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : branches.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No branches yet.</p>
          ) : (
            <>
              {/* Mobile cards */}
              <div className="grid gap-3 sm:hidden">
                {branches.map(b => (
                  <div key={b.id} className="border rounded-lg p-3 bg-card animate-fade-in">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{b.branch_name}</p>
                        <p className="text-xs text-muted-foreground">{b.location || "—"}</p>
                        <p className="text-xs text-muted-foreground">Pastor: {b.pastor_name || "—"}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(b)}><Pencil className="h-4 w-4 text-primary" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <Table>
                  <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Location</TableHead><TableHead>Pastor</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {branches.map(b => (
                      <TableRow key={b.id} className="hover:bg-muted/40 transition-colors">
                        <TableCell className="font-medium">{b.branch_name}</TableCell>
                        <TableCell>{b.location || "—"}</TableCell>
                        <TableCell>{b.pastor_name || "—"}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(b)}><Pencil className="h-4 w-4 text-primary" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
    </div>
  );
};

export default Branches;
