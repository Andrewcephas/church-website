import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Calendar, ClipboardCheck, Heart, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [stats, setStats] = useState({ members: 0, attendance: 0, finance: 0, events: 0, prayers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [m, a, f, e, p] = await Promise.all([
        supabase.from("members").select("id", { count: "exact", head: true }),
        supabase.from("attendance").select("count").order("date", { ascending: false }).limit(5),
        supabase.from("finance").select("amount"),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("prayer_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);
      const totalFinance = (f.data || []).reduce((sum, r) => sum + Number(r.amount), 0);
      const avgAttendance = (a.data || []).length > 0 ? Math.round((a.data || []).reduce((sum, r) => sum + r.count, 0) / (a.data || []).length) : 0;
      setStats({
        members: m.count || 0,
        attendance: avgAttendance,
        finance: totalFinance,
        events: e.count || 0,
        prayers: p.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Members", value: stats.members.toString(), icon: Users, desc: "Registered members" },
    { title: "Avg Attendance", value: stats.attendance.toString(), icon: ClipboardCheck, desc: "Recent services" },
    { title: "Total Giving", value: `KES ${stats.finance.toLocaleString()}`, icon: DollarSign, desc: "All time" },
    { title: "Upcoming Events", value: stats.events.toString(), icon: Calendar, desc: "Scheduled" },
    { title: "Prayer Requests", value: stats.prayers.toString(), icon: Heart, desc: "Pending" },
    { title: "Growth Rate", value: "—", icon: TrendingUp, desc: "Track over time" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome to GPC Admin</h2>
        <p className="text-muted-foreground">Global Power Church Management Dashboard</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
