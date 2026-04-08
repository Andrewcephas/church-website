import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Download, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const departments = ["Choir", "Praise & Worship", "Dance", "Youth", "Women", "Men", "Hospitality", "Crusades"];

const emptyForm = { name: "", phone: "", email: "", gender: "", department: "" };

const Members = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMembers = async () => {
    const { data } = await supabase.from("members").select("*").order("created_at", { ascending: false });
    if (data) setMembers(data);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleSave = async () => {
    if (!form.name || !form.phone) { toast({ title: "Name and phone are required", variant: "destructive" }); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (editId) {
      const { error } = await supabase.from("members").update({ ...form, updated_at: new Date().toISOString() }).eq("id", editId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Member updated" });
    } else {
      const { error } = await supabase.from("members").insert({ ...form, user_id: user.id, join_date: new Date().toISOString().split("T")[0] });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Member added" });
    }
    setForm(emptyForm);
    setEditId(null);
    setDialogOpen(false);
    fetchMembers();
  };

  const handleEdit = (m: any) => {
    setForm({ name: m.name, phone: m.phone, email: m.email || "", gender: m.gender || "", department: m.department || "" });
    setEditId(m.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("members").delete().eq("id", id);
    toast({ title: "Member removed" });
    fetchMembers();
  };

  const handleExport = () => {
    const csv = "Name,Phone,Email,Gender,Department,Join Date\n" + members.map(m => `${m.name},${m.phone},${m.email || ""},${m.gender || ""},${m.department || ""},${m.join_date || ""}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "members.csv"; a.click();
  };

  const openAdd = () => { setForm(emptyForm); setEditId(null); setDialogOpen(true); };
  const filtered = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || (m.department || "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} disabled={!members.length}><Download className="h-4 w-4 mr-2" />Export</Button>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditId(null); setForm(emptyForm); } }}>
            <DialogTrigger asChild><Button onClick={openAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add Member</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editId ? "Edit Member" : "Add New Member"}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Full Name *</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div><Label>Phone *</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                <div><Label>Gender</Label>
                  <Select value={form.gender} onValueChange={v => setForm({...form, gender: v})}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent>
                  </Select>
                </div>
                <div><Label>Department</Label>
                  <Select value={form.department} onValueChange={v => setForm({...form, department: v})}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>{departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">{editId ? "Update Member" : "Add Member"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>Members ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No members yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Phone</TableHead><TableHead>Email</TableHead><TableHead>Gender</TableHead><TableHead>Department</TableHead><TableHead>Joined</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {filtered.map(m => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell>{m.phone}</TableCell>
                      <TableCell>{m.email || "—"}</TableCell>
                      <TableCell>{m.gender || "—"}</TableCell>
                      <TableCell><Badge variant="secondary">{m.department || "Unassigned"}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{m.join_date || "—"}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(m)}><Pencil className="h-4 w-4 text-primary" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Members;
