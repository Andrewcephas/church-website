import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Book, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminSermons = () => {
  const [sermons, setSermons] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", speaker: "Bishop Paul Ndolo Mulu", date: "", video_url: "", topic: "" });
  const { toast } = useToast();

  const fetchSermons = async () => {
    const { data } = await supabase.from("sermons").select("*").order("date", { ascending: false });
    if (data) setSermons(data);
    setLoading(false);
  };

  useEffect(() => { fetchSermons(); }, []);

  const handleAdd = async () => {
    if (!form.title || !form.date) { toast({ title: "Title and date required", variant: "destructive" }); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("sermons").insert({ ...form, user_id: user.id });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setForm({ title: "", speaker: "Bishop Paul Ndolo Mulu", date: "", video_url: "", topic: "" });
    setDialogOpen(false);
    toast({ title: "Sermon added" });
    fetchSermons();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("sermons").delete().eq("id", id);
    toast({ title: "Sermon deleted" });
    fetchSermons();
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
              <div><Label>Video URL (YouTube)</Label><Input value={form.video_url} onChange={e => setForm({...form, video_url: e.target.value})} placeholder="https://youtube.com/..." /></div>
              <Button onClick={handleAdd} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Add Sermon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Book className="h-5 w-5 text-primary" />Sermons</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-center text-muted-foreground py-8">Loading...</p> : sermons.length === 0 ? <p className="text-center text-muted-foreground py-8">No sermons yet.</p> : (
            <Table><TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Title</TableHead><TableHead>Speaker</TableHead><TableHead>Topic</TableHead><TableHead>Link</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>{sermons.map(s => (<TableRow key={s.id}><TableCell>{s.date}</TableCell><TableCell className="font-medium">{s.title}</TableCell><TableCell>{s.speaker}</TableCell><TableCell>{s.topic || "—"}</TableCell><TableCell>{s.video_url ? <a href={s.video_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Watch</a> : "—"}</TableCell><TableCell><Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell></TableRow>))}</TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSermons;
