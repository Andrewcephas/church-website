import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Analytics = () => {
  const [data, setData] = useState({ members: 0, avgAttendance: 0, totalGiving: 0, pendingPrayers: 0 });

  useEffect(() => {
    const fetch = async () => {
      const [m, a, f, p] = await Promise.all([
        supabase.from("members").select("id", { count: "exact", head: true }),
        supabase.from("attendance").select("count"),
        supabase.from("finance").select("amount"),
        supabase.from("prayer_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);
      setData({
        members: m.count || 0,
        avgAttendance: (a.data || []).length > 0 ? Math.round((a.data || []).reduce((s, r) => s + r.count, 0) / (a.data || []).length) : 0,
        totalGiving: (f.data || []).reduce((s, r) => s + Number(r.amount), 0),
        pendingPrayers: p.count || 0,
      });
    };
    fetch();
  }, []);

  const stats = [
    { title: "Total Members", value: data.members.toString(), icon: TrendingUp, desc: "All time" },
    { title: "Avg Attendance", value: data.avgAttendance.toString(), icon: Users, desc: "Per service" },
    { title: "Total Giving", value: `KES ${data.totalGiving.toLocaleString()}`, icon: DollarSign, desc: "All time" },
    { title: "Prayer Requests", value: data.pendingPrayers.toString(), icon: BarChart3, desc: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Analytics & Reports</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
              <s.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Reports</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Analytics update in real-time as you add data through the admin modules.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
