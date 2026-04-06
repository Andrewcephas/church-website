import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, DollarSign, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FinanceRecord {
  id: string; type: string; amount: number; date: string; giver: string; method: string; notes: string;
}

const Finance = () => {
  const [records, setRecords] = useState<FinanceRecord[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ type: "", amount: "", date: "", giver: "", method: "", notes: "" });
  const { toast } = useToast();

  const types = ["Tithe", "Offering", "Donation", "Seed", "Building Fund", "Mission Support"];
  const methods = ["Cash", "M-Pesa", "Bank Transfer", "WhatsApp"];

  const handleAdd = () => {
    if (!form.type || !form.amount || !form.date) { toast({ title: "Fill required fields", variant: "destructive" }); return; }
    setRecords([...records, { ...form, amount: parseFloat(form.amount), id: crypto.randomUUID() }]);
    setForm({ type: "", amount: "", date: "", giver: "", method: "", notes: "" });
    setDialogOpen(false);
    toast({ title: "Finance record added" });
  };

  const total = records.reduce((sum, r) => sum + r.amount, 0);

  const handleExport = () => {
    const csv = "Date,Type,Giver,Amount,Method,Notes\n" + records.map(r => `${r.date},${r.type},${r.giver},${r.amount},${r.method},${r.notes}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "finance.csv"; a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Finance Management</h2>
          <p className="text-muted-foreground text-sm">Track tithes, offerings, and donations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} disabled={!records.length}><Download className="h-4 w-4 mr-2" />Export</Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add Record</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Finance Record</DialogTitle></DialogHeader>
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
                <Button onClick={handleAdd} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Save Record</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" />Total: KES {total.toLocaleString()}</CardTitle></CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No finance records yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow><TableHead>Date</TableHead><TableHead>Type</TableHead><TableHead>Giver</TableHead><TableHead>Amount</TableHead><TableHead>Method</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {records.sort((a, b) => b.date.localeCompare(a.date)).map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.date}</TableCell>
                    <TableCell><Badge variant="secondary">{r.type}</Badge></TableCell>
                    <TableCell>{r.giver || "Anonymous"}</TableCell>
                    <TableCell className="font-bold">KES {r.amount.toLocaleString()}</TableCell>
                    <TableCell>{r.method || "—"}</TableCell>
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
