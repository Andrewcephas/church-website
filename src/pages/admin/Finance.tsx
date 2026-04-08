import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, DollarSign, Download, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const types = ["Tithe", "Offering", "Donation", "Seed", "Building Fund", "Mission Support"];
const methods = ["Cash", "M-Pesa", "Bank Transfer", "WhatsApp"];
const emptyForm = { type: "", amount: "", date: "", giver: "", method: "", notes: "" };

const Finance = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRecords = async () => {
    const { data } = await supabase.from("finance").select("*").order("date", { ascending: false });
    if (data) setRecords(data);
    setLoading(false);
  };

  useEffect(() => { fetchRecords(); }, []);

  const handleSave = async () => {
    if (!form.type || !form.amount || !form.date) { toast({ title: "Fill required fields", variant: "destructive" }); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (editId) {
      const { error } = await supabase.from("finance").update({ type: form.type, amount: parseFloat(form.amount), date: form.date, giver: form.giver, method: form.method, notes: form.notes }).eq("id", editId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Record updated" });
    } else {
      const { error } = await supabase.from("finance").insert({ type: form.type, amount: parseFloat(form.amount), date: form.date, giver: form.giver, method: form.method, notes: form.notes, user_id: user.id });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Record added" });
    }
    setForm(emptyForm);
    setEditId(null);
    setDialogOpen(false);
    fetchRecords();
  };

  const handleEdit = (r: any) => {
    setForm({ type: r.type, amount: String(r.amount), date: r.date, giver: r.giver || "", method: r.method || "", notes: r.notes || "" });
    setEditId(r.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("finance").delete().eq("id", id);
    toast({ title: "Record deleted" });
    fetchRecords();
  };

  const total = records.reduce((sum, r) => sum + Number(r.amount), 0);

  const handleExport = () => {
    const csv = "Date,Type,Giver,Amount,Method,Notes\n" + records.map(r => `${r.date},${r.type},${r.giver || ""},${r.amount},${r.method || ""},${r.notes || ""}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "finance.csv"; a.click();
  };

  const openAdd = () => { setForm(emptyForm); setEditId(null); setDialogOpen(true); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Finance Management</h2>
          <p className="text-muted-foreground text-sm">Track tithes, offerings, and donations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} disabled={!records.length}><Download className="h-4 w-4 mr-2" />Export</Button>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditId(null); setForm(emptyForm); } }}>
            <DialogTrigger asChild><Button onClick={openAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add Record</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editId ? "Edit Record" : "Add Finance Record"}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Type *</Label>
                  <Select value={form.type} onValueChange={v => setForm({...form, type: v})}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>{types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Amount (KES) *</Label><Input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} /></div>
                <div><Label>Date *</Label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
                <div><Label>Giver Name</Label><Input value={form.giver} onChange={e => setForm({...form, giver: e.target.value})} /></div>
                <div><Label>Payment Method</Label>
                  <Select value={form.method} onValueChange={v => setForm({...form, method: v})}>
                    <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
                    <SelectContent>{methods.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Notes</Label><Input value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>
                <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">{editId ? "Update Record" : "Save Record"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" />Total: KES {total.toLocaleString()}</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : records.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No finance records yet.</p>
          ) : (
            <Table>
              <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Type</TableHead><TableHead>Giver</TableHead><TableHead>Amount</TableHead><TableHead>Method</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {records.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.date}</TableCell>
                    <TableCell><Badge variant="secondary">{r.type}</Badge></TableCell>
                    <TableCell>{r.giver || "Anonymous"}</TableCell>
                    <TableCell className="font-bold">KES {Number(r.amount).toLocaleString()}</TableCell>
                    <TableCell>{r.method || "—"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(r)}><Pencil className="h-4 w-4 text-primary" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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

export default Finance;
