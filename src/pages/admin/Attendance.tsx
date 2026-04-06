import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ClipboardCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttendanceRecord {
  id: string; service: string; date: string; count: number; notes: string;
}

const Attendance = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ service: "", date: "", count: "", notes: "" });
  const { toast } = useToast();

  const services = ["Sunday Service", "Thursday Prayers", "Friday Kesha", "Saturday Devotion", "Special Event"];

  const handleAdd = () => {
    if (!form.service || !form.date || !form.count) { toast({ title: "Fill required fields", variant: "destructive" }); return; }
    setRecords([...records, { ...form, count: parseInt(form.count), id: crypto.randomUUID() }]);
    setForm({ service: "", date: "", count: "", notes: "" });
    setDialogOpen(false);
    toast({ title: "Attendance recorded" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-foreground">Attendance Records</h2>
          <p className="text-muted-foreground text-sm">Track attendance for each service</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Record Attendance</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Record Attendance</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Service *</Label>
                <Select value={form.service} onValueChange={v => setForm({...form, service: v})}>
                  <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                  <SelectContent>{services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Date *</Label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
              <div><Label>Head Count *</Label><Input type="number" value={form.count} onChange={e => setForm({...form, count: e.target.value})} /></div>
              <div><Label>Notes</Label><Input value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>
              <Button onClick={handleAdd} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Save Record</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardCheck className="h-5 w-5 text-primary" />Attendance History</CardTitle></CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No attendance records. Click "Record Attendance" to start.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow><TableHead>Date</TableHead><TableHead>Service</TableHead><TableHead>Count</TableHead><TableHead>Notes</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {records.sort((a, b) => b.date.localeCompare(a.date)).map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.date}</TableCell>
                    <TableCell><Badge variant="secondary">{r.service}</Badge></TableCell>
                    <TableCell className="font-bold">{r.count}</TableCell>
                    <TableCell className="text-muted-foreground">{r.notes || "—"}</TableCell>
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

export default Attendance;
