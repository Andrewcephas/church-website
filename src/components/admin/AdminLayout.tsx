import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserRole, type ModuleKey } from "@/hooks/use-user-role";
import LogoLoader from "@/components/LogoLoader";
import {
  LayoutDashboard, Users, ClipboardCheck, DollarSign, Calendar, Book,
  MessageSquare, Heart, BarChart3, LogOut, Menu, ChevronLeft, Settings, Sparkles,
  Building2, GraduationCap, Shield, Bell, Mail, X, KeyRound
} from "lucide-react";

const sidebarItems: { title: string; href: string; icon: any; key: ModuleKey }[] = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard, key: "dashboard" },
  { title: "Branches", href: "/admin/branches", icon: Building2, key: "branches" },
  { title: "Members", href: "/admin/members", icon: Users, key: "members" },
  { title: "Attendance", href: "/admin/attendance", icon: ClipboardCheck, key: "attendance" },
  { title: "Finance", href: "/admin/finance", icon: DollarSign, key: "finance" },
  { title: "Events", href: "/admin/events", icon: Calendar, key: "events" },
  { title: "Sermons", href: "/admin/sermons", icon: Book, key: "sermons" },
  { title: "Sunday School", href: "/admin/sunday-school", icon: GraduationCap, key: "sunday_school" },
  { title: "Notices", href: "/admin/notices", icon: Bell, key: "notices" },
  { title: "Messages", href: "/admin/messages", icon: Mail, key: "messages" },
  { title: "Communications", href: "/admin/communications", icon: MessageSquare, key: "communications" },
  { title: "Prayer Requests", href: "/admin/prayer-requests", icon: Heart, key: "prayer_requests" },
  { title: "Social Quotes", href: "/admin/social-quotes", icon: Sparkles, key: "social_quotes" },
  { title: "User Roles", href: "/admin/user-roles", icon: Shield, key: "user_roles" },
  { title: "Accounts", href: "/admin/accounts", icon: KeyRound, key: "accounts" },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3, key: "analytics" },
  { title: "Settings", href: "/admin/settings", icon: Settings, key: "settings" },
];

const AdminLayout = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { role, can } = useUserRole();

  const visibleItems = sidebarItems.filter(i => can(i.key));
  const roleLabel: Record<string, string> = {
    super_admin: "Bishop", branch_admin: "Pastor", secretary: "Secretary",
    teacher: "Teacher", member: "Member"
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) navigate("/login");
      if (_event === "SIGNED_IN" && session?.user) {
        await supabase.from("login_activity").insert({ user_id: session.user.id, user_email: session.user.email });
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) navigate("/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("private_messages").select("id", { count: "exact", head: true })
      .eq("receiver_id", user.id).eq("is_read", false)
      .then(({ count }) => setUnreadMessages(count || 0));
  }, [user, location]);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/login"); };

  if (loading) return <LogoLoader label="Loading admin..." />;
  if (!user) return null;

  const SidebarInner = () => (
    <>
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <img src="/images/gpc-logo.png" alt="GPC" className="w-8 h-8 rounded-full" />
            <span className="font-bold text-sm">GPC Admin</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }} className="text-sidebar-foreground hover:bg-sidebar-accent hidden lg:inline-flex">
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} className="text-sidebar-foreground hover:bg-sidebar-accent lg:hidden">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.href} to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 hover:translate-x-1 ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
              {!collapsed && item.href === "/admin/messages" && unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-auto text-xs h-5 px-1.5 animate-pulse">{unreadMessages}</Badge>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" onClick={handleLogout} className={`text-sidebar-foreground hover:bg-sidebar-accent w-full ${collapsed ? 'justify-center' : 'justify-start'}`}>
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
        {!collapsed && (
          <Link to="/" className="block text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground mt-2 text-center transition-colors">← Back to Website</Link>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Desktop sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-sidebar text-sidebar-foreground flex-col transition-all duration-300 fixed h-full z-40 hidden lg:flex shadow-xl`}>
        <SidebarInner />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-sidebar text-sidebar-foreground flex flex-col shadow-2xl animate-slide-in-right" style={{ animationName: 'slide-in-right', animationDuration: '0.3s' }}>
            <SidebarInner />
          </aside>
        </div>
      )}

      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-64'} ml-0`}>
        <header className="h-14 bg-background/95 backdrop-blur border-b border-border flex items-center px-4 sm:px-6 sticky top-0 z-30 shadow-sm">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} className="lg:hidden mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">
            {sidebarItems.find(i => i.href === location.pathname)?.title || "Dashboard"}
          </h1>
          <div className="ml-auto flex items-center gap-2 sm:gap-3 text-sm text-muted-foreground">
            {role && <Badge variant="secondary" className="hidden sm:inline-flex">{roleLabel[role] || role}</Badge>}
            <span className="hidden md:inline truncate max-w-[200px]">{user.email}</span>
          </div>
        </header>
        <div className="p-4 sm:p-6 animate-fade-in"><Outlet /></div>
      </main>
    </div>
  );
};

export default AdminLayout;
