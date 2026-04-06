import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Analytics & Reports</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Member Growth", value: "0%", icon: TrendingUp, desc: "This month" },
          { title: "Avg Attendance", value: "0", icon: Users, desc: "Per service" },
          { title: "Total Giving", value: "KES 0", icon: DollarSign, desc: "This month" },
          { title: "Prayer Requests", value: "0", icon: BarChart3, desc: "Pending" },
        ].map((s, i) => (
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
          <p className="text-muted-foreground">Charts and detailed analytics will populate as you add data to members, attendance, and finance modules. Start recording data to see trends here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
