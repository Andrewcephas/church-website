import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Communications = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<{ id: string; message: string; date: string }[]>([]);
  const { toast } = useToast();

  const handleSend = () => {
    if (!message.trim()) return;
    setHistory([{ id: crypto.randomUUID(), message, date: new Date().toLocaleString() }, ...history]);
    setMessage("");
    toast({ title: "Announcement saved", description: "In a full setup, this would send SMS/email to members." });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Communications</h2>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" />Send Announcement</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Message</Label><Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your announcement..." rows={4} /></div>
          <Button onClick={handleSend} className="bg-primary hover:bg-primary/90 text-primary-foreground"><Send className="h-4 w-4 mr-2" />Send Announcement</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Announcement History</CardTitle></CardHeader>
        <CardContent>
          {history.length === 0 ? <p className="text-muted-foreground text-center py-4">No announcements sent yet.</p> : (
            <div className="space-y-3">{history.map(h => (
              <div key={h.id} className="p-3 bg-muted rounded-md">
                <p className="text-sm text-foreground">{h.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{h.date}</p>
              </div>
            ))}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Communications;
