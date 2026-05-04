import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Building2, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const emptyForm = { branch_name: "", location: "", pastor_name: "" };
const withTimeout = <T,>(promise: Promise<T>, ms = 12000) =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("The request timed out. Please check your connection and try again.")), ms)),
  ]);

const Branches = () => {
  const [branches, setBranches] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBranches = async () => {
    const { data, error } = await supabase.from("branches").select("*").order("branch_name");
    if (error) toast({ title: "Could not load branches", description: error.message, variant: "destructive" });
    else setBranches(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBranches(); }, []);

  const handleSave = async () => {
    if (!form.branch_name) { toast({ title: "Branch name is required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const { error } = await withTimeout<any>((supabase as any).rpc("save_branch", {
        _branch_id: editId,
        _branch_name: form.branch_name,
        _location: form.location || null,
        _pastor_name: form.pastor_name || null,
      }));
      if (error) throw error;
      toast({ title: editId ? "Branch updated" : "Branch created" });
      setForm(emptyForm); setEditId(null); setDialogOpen(false); fetchBranches();
    } catch (error: any) {
      toast({ title: "Branch save failed", description: error.message || "Please check your role permission and try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (b: any) => {
    setForm({ branch_name: b.branch_name, location: b.location || "", pastor_name: b.pastor_name || "" });
    setEditId(b.id); setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await withTimeout<any>((supabase as any).rpc("delete_branch_by_id", { _branch_id: id }));
    if (error) { toast({ title: "Delete failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Branch deleted" }); fetchBranches();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">Branch Management</h2>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditId(null); setForm(emptyForm); } }}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm(emptyForm); setEditId(null); setDialogOpen(true); }} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editId ? "Edit Branch" : "Add Branch"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Branch Name *</Label><Input value={form.branch_name} onChange={e => setForm({ ...form, branch_name: e.target.value })} /></div>
              <div><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
              <div><Label>Pastor Name</Label><Input value={form.pastor_name} onChange={e => setForm({ ...form, pastor_name: e.target.value })} /></div>
              <Button onClick={handleSave} disabled={saving} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">{saving ? "Saving..." : editId ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" />Branches</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : branches.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No branches yet.</p>
          ) : (
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Location</TableHead><TableHead>Pastor</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {branches.map(b => (
                  <TableRow key={b.id}>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Branches;
