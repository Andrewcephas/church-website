import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar, Trash2, Pencil, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole, useBranches } from "@/hooks/use-user-role";
import BranchSelector from "@/components/admin/BranchSelector";

const emptyForm = { title: "", date: "", time: "", description: "", branch_id: "" };

const AdminEvents = () => {
  const { isSuperAdmin, branchId: userBranch } = useUserRole();
  const branches = useBranches();
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [events, setEvents] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const branchFilter = isSuperAdmin ? (selectedBranch === "all" ? null : selectedBranch) : userBranch;

  const fetchEvents = async () => {
    let q = supabase.from("events").select("*").order("date", { ascending: false });
    if (branchFilter) q = q.eq("branch_id", branchFilter);
    const { data } = await q;
    if (data) setEvents(data);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, [selectedBranch, userBranch]);

  const handleSave = async () => {
    if (!form.title || !form.date) { toast({ title: "Title and date required", variant: "destructive" }); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const payload: any = { title: form.title, date: form.date, time: form.time, description: form.description, branch_id: form.branch_id || userBranch || null };

    if (editId) {
      await supabase.from("events").update(payload).eq("id", editId);
      toast({ title: "Event updated" });
    } else {
      await supabase.from("events").insert({ ...payload, user_id: user.id });
      toast({ title: "Event created" });
    }
    setForm(emptyForm); setEditId(null); setDialogOpen(false); fetchEvents();
  };

  const handleEdit = (e: any) => {
    setForm({ title: e.title, date: e.date, time: e.time || "", description: e.description || "", branch_id: e.branch_id || "" });
    setEditId(e.id); setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("events").delete().eq("id", id);
    toast({ title: "Event deleted" }); fetchEvents();
  };

  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          {isSuperAdmin && <BranchSelector value={selectedBranch} onChange={setSelectedBranch} />}
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditId(null); setForm(emptyForm); } }}>
          <DialogTrigger asChild><Button onClick={() => { setForm(emptyForm); setEditId(null); setDialogOpen(true); }} className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add Event</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editId ? "Edit Event" : "Create Event"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div><Label>Date *</Label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
              <div><Label>Time</Label><Input value={form.time} onChange={e => setForm({...form, time: e.target.value})} placeholder="e.g. 10:00 AM" /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              {isSuperAdmin && (
                <div><Label>Branch</Label>
                  <Select value={form.branch_id} onValueChange={v => setForm({...form, branch_id: v})}>
                    <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
                    <SelectContent>{branches.map(b => <SelectItem key={b.id} value={b.id}>{b.branch_name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              )}
              <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">{editId ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Events</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : filtered.length === 0 ? <p className="text-center text-muted-foreground py-8">No events yet.</p> : (
            <Table><TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Title</TableHead><TableHead>Time</TableHead><TableHead>Description</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>{filtered.map(e => (<TableRow key={e.id}><TableCell>{e.date}</TableCell><TableCell className="font-medium">{e.title}</TableCell><TableCell>{e.time || "—"}</TableCell><TableCell className="text-muted-foreground">{e.description || "—"}</TableCell><TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => handleEdit(e)}><Pencil className="h-4 w-4 text-primary" /></Button><Button variant="ghost" size="icon" onClick={() => handleDelete(e.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></TableCell></TableRow>))}</TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEvents;
