import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Users, Calendar, Book, Heart, Phone, ChevronDown, ChevronRight, ShieldCheck, Play } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { settings } = useSiteSettings();

  const navItems = [
    {
      name: "About", href: "/about", icon: Users, hasDropdown: true,
      dropdownItems: [
        { name: "Our Story", href: "/about/our-story" },
        { name: "Mission", href: "/about/mission" },
        { name: "Leadership", href: "/about/leadership" }
      ]
    },
    { name: "Ministries", href: "/ministries", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Sermons", href: "/sermons", icon: Book },
    { name: "Give", href: "/give", icon: Heart },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowAboutDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowAboutDropdown(false), 200);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <nav className="fixed top-3 inset-x-0 z-50 transition-all duration-500">
       <div className="container mx-auto px-4">
         <div className="bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl border border-white/30 dark:border-white/5 rounded-2xl shadow-lg shadow-black/5 px-4 sm:px-6 flex items-center justify-between h-16">
           <Link to="/" className="flex items-center gap-3 group transition-transform duration-500 hover:scale-105">
             <div className="relative">
               <img src="/images/gpc-logo.png" alt="GPC Logo" className="w-12 h-12 rounded-2xl object-cover shadow-lg transition-all duration-500 group-hover:shadow-primary/20" />
               <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(139,26,140,0.1)] pointer-events-none" />
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-xl tracking-tight text-foreground leading-none">Global Power</span>
               <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Church</span>
             </div>
           </Link>

           <div className="hidden md:flex items-center space-x-8">
             {navItems.map((item) => (
               <div key={item.name} className="relative group/nav">
                 {item.hasDropdown ? (
                   <div ref={dropdownRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                     <Link to={item.href} className="flex items-center gap-1.5 text-sm font-bold text-foreground/70 hover:text-primary transition-all duration-300">
                       {item.name}
                       <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${showAboutDropdown ? 'rotate-180 text-primary' : ''}`} />
                     </Link>
                     {showAboutDropdown && (
                       <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white dark:bg-zinc-900 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-zinc-100 dark:border-zinc-800 p-2 z-50 animate-fade-in-up">
                         {item.dropdownItems?.map((dropdownItem) => (
                           <Link key={dropdownItem.name} to={dropdownItem.href} className="flex items-center px-4 py-3 text-sm font-bold text-foreground/60 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-300" onClick={() => setShowAboutDropdown(false)}>
                             {dropdownItem.name}
                           </Link>
                         ))}
                       </div>
                     )}
                   </div>
                 ) : (
                   <Link to={item.href} className="text-sm font-bold text-foreground/70 hover:text-primary transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                     {item.name}
                   </Link>
                 )}
               </div>
             ))}
           </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="h-11 px-5 border-primary/20 text-primary hover:bg-primary/5 rounded-xl font-bold transition-all hover:scale-105">
                  <ShieldCheck className="h-4 w-4 mr-2" />Admin
                </Button>
              </Link>
             <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer">
               <Button variant="outline" className="h-11 px-6 border-primary/20 text-primary hover:bg-primary/5 rounded-xl font-bold transition-all hover:scale-105">
                 <Play className="h-4 w-4 mr-2 fill-current" />Watch Live
               </Button>
             </a>
             <Link to="/quote">
                <Button className="h-11 px-6 bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105">
                 Get a Quote
               </Button>
             </Link>
           </div>

           <Sheet open={isOpen} onOpenChange={setIsOpen}>
             <SheetTrigger asChild className="md:hidden">
               <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                 <Menu className="h-6 w-6" />
               </Button>
             </SheetTrigger>
             <SheetContent side="right" className="w-full sm:w-[400px] bg-background p-8 border-l border-zinc-100 dark:border-zinc-800">
               <div className="flex flex-col h-full">
                 <div className="flex items-center gap-3 mb-12">
                   <img src="/images/gpc-logo.png" alt="GPC Logo" className="w-12 h-12 rounded-2xl object-cover shadow-lg" />
                   <div className="flex flex-col">
                     <span className="font-bold text-xl tracking-tight leading-none">Global Power</span>
                     <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Church</span>
                   </div>
                 </div>
                 
                 <div className="flex flex-col space-y-2 overflow-y-auto flex-1">
                   {navItems.map((item, idx) => (
                     <div key={item.name} className="animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                       <Link to={item.href} className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 text-lg font-bold text-foreground transition-all" onClick={() => setIsOpen(false)}>
                         <div className="flex items-center gap-4">
                            <item.icon className="h-5 w-5 text-primary/50" />
                            {item.name}
                         </div>
                         {item.hasDropdown && <ChevronRight className="h-5 w-5 text-zinc-300" />}
                       </Link>
                       {item.hasDropdown && (
                         <div className="ml-12 mt-2 space-y-1 mb-4">
                           {item.dropdownItems?.map((dropdownItem) => (
                             <Link key={dropdownItem.name} to={dropdownItem.href} className="block p-3 text-base font-bold text-foreground/50 hover:text-primary transition-all" onClick={() => setIsOpen(false)}>
                               {dropdownItem.name}
                             </Link>
                           ))}
                         </div>
                       )}
                     </div>
                   ))}
                 </div>
                 
                 <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                   <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                     <Button variant="outline" className="w-full h-14 border-primary/20 text-primary hover:bg-primary/5 rounded-2xl font-bold">
                       <Play className="h-5 w-5 mr-3 fill-current" />Watch Live
                     </Button>
                   </a>
                   <Link to="/login" onClick={() => setIsOpen(false)}>
                     <Button className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-xl shadow-primary/20">
                       <ShieldCheck className="h-5 w-5 mr-3" />Admin Login
                     </Button>
                   </Link>
                 </div>
               </div>
             </SheetContent>
           </Sheet>
         </div>
       </div>
     </nav>
  );
};

export default Navigation;
