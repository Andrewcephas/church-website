import { TrendingUp, Users, Calendar, Book, FileText, BarChart3, Shield } from "lucide-react";
import { ModernCard } from "@/components/ui/modern-card";

export const DashboardStats = () => {
  const stats = [
    { title: "Total Members", value: "1,248", icon: <Users className="h-8 w-8" />, change: "+12%", trend: "up" as const },
    { title: "Events This Month", value: "24", icon: <Calendar className="h-8 w-8" />, change: "+4", trend: "up" as const },
    { title: "Sermons Posted", value: "89", icon: <Book className="h-8 w-8" />, change: "+8", trend: "up" as const },
    { title: "Active Groups", value: "16", icon: <FileText className="h-8 w-8" />, change: "+2", trend: "up" as const },
    { title: "Financial Growth", value: "$24.5K", icon: <TrendingUp className="h-8 w-8" />, change: "+18%", trend: "up" as const },
    { title: "Analytics", value: "View Report", icon: <BarChart3 className="h-8 w-8" />, change: "Live", trend: "up" as const },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
      {stats.map((stat, i) => (
        <ModernCard key={i} variant="glow" hoverEffect={true} icon={stat.icon}>
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              {stat.icon}
            </div>
            {stat.change && (
              <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                       'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {stat.trend === 'up' ? '?' : '?'} {stat.change}
              </span>
            )}
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        </ModernCard>
      ))}
    </div>
  );
};
