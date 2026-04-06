import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event { id: string; title: string; date: string; time: string; description: string; }

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", time: "", description: "" });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!form.title || !form.date) { toast({ title: "Title and date required", variant: "destructive" }); return; }
    setEvents([...events, { ...form, id: crypto.randomUUID() }]);
    setForm({ title: "", date: "", time: "", description: "" });
    setDialogOpen(false);
    toast({ title: "Event created" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">Events Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add Event</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Event</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div><Label>Date *</Label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
              <div><Label>Time</Label><Input value={form.time} onChange={e => setForm({...form, time: e.target.value})} placeholder="e.g. 10:00 AM" /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <Button onClick={handleAdd} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Create Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Events</CardTitle></CardHeader>
        <CardContent>
          {events.length === 0 ? <p className="text-center text-muted-foreground py-8">No events yet.</p> : (
            <Table><TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Title</TableHead><TableHead>Time</TableHead><TableHead>Description</TableHead></TableRow></TableHeader>
              <TableBody>{events.map(e => (<TableRow key={e.id}><TableCell>{e.date}</TableCell><TableCell className="font-medium">{e.title}</TableCell><TableCell>{e.time || "—"}</TableCell><TableCell className="text-muted-foreground">{e.description || "—"}</TableCell></TableRow>))}</TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEvents;
