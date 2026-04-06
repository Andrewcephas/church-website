import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Download, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id: string; name: string; phone: string; email: string; gender: string; department: string; joinDate: string;
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", gender: "", department: "" });
  const { toast } = useToast();

  const departments = ["Choir", "Praise & Worship", "Dance", "Youth", "Women", "Men", "Hospitality", "Crusades"];

  const handleAdd = () => {
    if (!form.name || !form.phone) { toast({ title: "Name and phone are required", variant: "destructive" }); return; }
    setMembers([...members, { ...form, id: crypto.randomUUID(), joinDate: new Date().toISOString().split("T")[0] }]);
    setForm({ name: "", phone: "", email: "", gender: "", department: "" });
    setDialogOpen(false);
    toast({ title: "Member added successfully" });
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
    toast({ title: "Member removed" });
  };

  const handleExport = () => {
    const csv = "Name,Phone,Email,Gender,Department,Join Date\n" + members.map(m => `${m.name},${m.phone},${m.email},${m.gender},${m.department},${m.joinDate}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "members.csv"; a.click();
  };

  const filtered = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.department.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} disabled={!members.length}>
            <Download className="h-4 w-4 mr-2" />Export
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add Member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Member</DialogTitle></DialogHeader>
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
                <Button onClick={handleAdd} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Add Member</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Members ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No members yet. Click "Add Member" to get started.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead><TableHead>Phone</TableHead><TableHead>Email</TableHead>
                    <TableHead>Gender</TableHead><TableHead>Department</TableHead><TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(m => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell>{m.phone}</TableCell>
                      <TableCell>{m.email || "—"}</TableCell>
                      <TableCell>{m.gender || "—"}</TableCell>
                      <TableCell><Badge variant="secondary">{m.department || "Unassigned"}</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
