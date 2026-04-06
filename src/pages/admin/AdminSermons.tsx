import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Book } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Sermon { id: string; title: string; speaker: string; date: string; videoUrl: string; topic: string; }

const AdminSermons = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", speaker: "Bishop Paul Ndolo Mulu", date: "", videoUrl: "", topic: "" });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!form.title || !form.date) { toast({ title: "Title and date required", variant: "destructive" }); return; }
    setSermons([...sermons, { ...form, id: crypto.randomUUID() }]);
    setForm({ title: "", speaker: "Bishop Paul Ndolo Mulu", date: "", videoUrl: "", topic: "" });
    setDialogOpen(false);
    toast({ title: "Sermon added" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">Sermon Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add Sermon</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Sermon</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div><Label>Speaker</Label><Input value={form.speaker} onChange={e => setForm({...form, speaker: e.target.value})} /></div>
              <div><Label>Date *</Label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
              <div><Label>Topic</Label><Input value={form.topic} onChange={e => setForm({...form, topic: e.target.value})} /></div>
              <div><Label>Video URL (YouTube)</Label><Input value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} placeholder="https://youtube.com/..." /></div>
              <Button onClick={handleAdd} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Add Sermon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Book className="h-5 w-5 text-primary" />Sermons</CardTitle></CardHeader>
        <CardContent>
          {sermons.length === 0 ? <p className="text-center text-muted-foreground py-8">No sermons added yet.</p> : (
            <Table><TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Title</TableHead><TableHead>Speaker</TableHead><TableHead>Topic</TableHead><TableHead>Link</TableHead></TableRow></TableHeader>
              <TableBody>{sermons.map(s => (<TableRow key={s.id}><TableCell>{s.date}</TableCell><TableCell className="font-medium">{s.title}</TableCell><TableCell>{s.speaker}</TableCell><TableCell>{s.topic || "—"}</TableCell><TableCell>{s.videoUrl ? <a href={s.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Watch</a> : "—"}</TableCell></TableRow>))}</TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSermons;
