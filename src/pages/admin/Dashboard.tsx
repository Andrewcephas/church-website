import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Calendar, ClipboardCheck, Heart, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Total Members", value: "0", icon: Users, change: "Add members to get started" },
    { title: "This Week's Attendance", value: "0", icon: ClipboardCheck, change: "Record attendance" },
    { title: "Monthly Giving", value: "KES 0", icon: DollarSign, change: "Record finances" },
    { title: "Upcoming Events", value: "0", icon: Calendar, change: "Create events" },
    { title: "Prayer Requests", value: "0", icon: Heart, change: "View requests" },
    { title: "Growth Rate", value: "0%", icon: TrendingUp, change: "Track over time" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome to GPC Admin</h2>
        <p className="text-muted-foreground">Global Power Church Management Dashboard</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-foreground">Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">No recent activity. Start by adding members and recording attendance.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-foreground">Quick Actions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">• Add new members in the Members tab</p>
            <p className="text-sm text-muted-foreground">• Record attendance for services</p>
            <p className="text-sm text-muted-foreground">• Manage tithes and offerings in Finance</p>
            <p className="text-sm text-muted-foreground">• View and respond to prayer requests</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
