import { CardTitle } from "@/components/ui/card";
import { ModernCard } from "@/components/ui/modern-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronRight, MapPin, Zap } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";

const Events = () => {
  const { settings } = useSiteSettings();
  const [dbEvents, setDbEvents] = useState<any[]>([]);
  const whatsappLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Hello Global Power Church, I'm interested in the upcoming events.")}`;

  useEffect(() => {
    supabase.from("events").select("*").order("date", { ascending: false }).then(({ data }) => { if (data) setDbEvents(data); });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase mb-8 animate-fade-in">
            Spiritual Calendar
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-foreground animate-fade-in leading-[0.95]">
            Events & <span className="gradient-text">Gatherings</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed font-medium">
            Join us for our weekly services and upcoming special events. Every gathering is an opportunity to encounter God's power.
          </p>
        </div>
      </section>

      {/* Weekly Services */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Weekly Schedule</h2>
              <p className="text-lg text-muted-foreground font-medium italic">"Daily & Weekly Themes with Spiritual Points shared in every service."</p>
            </div>
            <div className="hidden md:block h-px flex-1 mx-12 bg-zinc-100 dark:bg-zinc-800 mb-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {settings.services?.map((e, i) => (
              <ModernCard key={i} variant="glow" className="group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">{e.title}</CardTitle>
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Zap className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold border border-zinc-100 dark:border-zinc-800">
                      <Calendar className="h-4 w-4 text-primary" />
                      {e.day}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold border border-zinc-100 dark:border-zinc-800">
                      <Clock className="h-4 w-4 text-primary" />
                      {e.time}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed font-medium">{e.description || "Join us for a spirit-filled time of worship and word."}</p>
                  
                  <div className="pt-6">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                        Find Directions <MapPin className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Database Events */}
      {dbEvents.length > 0 && (
        <section className="py-32 px-4 bg-zinc-50 dark:bg-zinc-900/20">
          <div className="container mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Upcoming Events</h2>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">Special conferences, crusades, and community gatherings.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {dbEvents.map((e) => (
                <ModernCard key={e.id} variant="elevated" className="group">
                  <div className="space-y-6">
                    <Badge className="bg-primary text-white border-none px-4 py-1.5 font-bold rounded-lg uppercase tracking-widest text-[10px]">{e.date}</Badge>
                    <CardTitle className="text-2xl font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">{e.title}</CardTitle>
                    {e.time && (
                      <div className="flex items-center gap-3 text-muted-foreground font-bold text-sm">
                        <Clock className="h-4 w-4 text-primary opacity-50" />
                        {e.time}
                      </div>
                    )}
                    <p className="text-muted-foreground font-medium leading-relaxed line-clamp-3">{e.description || "Experience God's power and transformation in this upcoming special session. All are welcome!"}</p>
                    <div className="pt-4">
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" className="p-0 text-primary font-bold hover:bg-transparent group-hover:pl-2 transition-all">
                          Learn More <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter/Update CTA */}
      <section className="py-32 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-12 font-medium leading-relaxed">
            Don't miss out on what's happening at Global Power Church. Connect with us on WhatsApp to receive real-time updates and devotional themes.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-16 px-12 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-105">
              Subscribe via WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Events;
