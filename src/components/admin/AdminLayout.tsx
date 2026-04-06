import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Users, ClipboardCheck, DollarSign, Calendar, Book,
  MessageSquare, Heart, BarChart3, LogOut, Menu, ChevronLeft
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Members", href: "/admin/members", icon: Users },
  { title: "Attendance", href: "/admin/attendance", icon: ClipboardCheck },
  { title: "Finance", href: "/admin/finance", icon: DollarSign },
  { title: "Events", href: "/admin/events", icon: Calendar },
  { title: "Sermons", href: "/admin/sermons", icon: Book },
  { title: "Communications", href: "/admin/communications", icon: MessageSquare },
  { title: "Prayer Requests", href: "/admin/prayer-requests", icon: Heart },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

const AdminLayout = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) navigate("/login");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) navigate("/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-200 fixed h-full z-40`}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img src="/images/gpc-logo.jpg" alt="GPC" className="w-8 h-8 rounded-full" />
              <span className="font-bold text-sm">GPC Admin</span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-sidebar-foreground hover:bg-sidebar-accent">
            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <Button variant="ghost" onClick={handleLogout} className={`text-sidebar-foreground hover:bg-sidebar-accent ${collapsed ? 'w-full justify-center' : 'w-full justify-start'}`}>
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
          {!collapsed && (
            <Link to="/" className="block text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground mt-2 text-center">
              ← Back to Website
            </Link>
          )}
        </div>
      </aside>
      {/* Main content */}
      <main className={`flex-1 ${collapsed ? 'ml-16' : 'ml-64'} transition-all duration-200`}>
        <header className="h-14 bg-background border-b border-border flex items-center px-6 sticky top-0 z-30">
          <h1 className="text-lg font-semibold text-foreground">
            {sidebarItems.find(i => i.href === location.pathname)?.title || "Dashboard"}
          </h1>
          <div className="ml-auto text-sm text-muted-foreground">{user.email}</div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
