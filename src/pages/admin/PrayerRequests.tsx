import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Check, Eye } from "lucide-react";

interface PrayerRequest { id: string; name: string; email: string; request: string; date: string; status: string; }

const PrayerRequests = () => {
  const [requests, setRequests] = useState<PrayerRequest[]>([
    { id: "1", name: "Sample User", email: "user@example.com", request: "Please pray for my family's health and unity.", date: "2026-04-05", status: "new" },
  ]);

  const updateStatus = (id: string, status: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Prayer Requests</h2>
      <div className="grid gap-4">
        {requests.map(r => (
          <Card key={r.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2"><Heart className="h-4 w-4 text-primary" />{r.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{r.email} • {r.date}</p>
                </div>
                <Badge variant={r.status === "new" ? "default" : r.status === "praying" ? "secondary" : "outline"}>
                  {r.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-4">{r.request}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "praying")}><Eye className="h-3 w-3 mr-1" />Mark Praying</Button>
                <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "answered")}><Check className="h-3 w-3 mr-1" />Mark Answered</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrayerRequests;
