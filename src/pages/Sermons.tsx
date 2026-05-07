import { CardTitle } from "@/components/ui/card";
import { ModernCard } from "@/components/ui/modern-card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, ChevronRight, BookOpen, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";

const Sermons = () => {
  const { settings } = useSiteSettings();
  const [sermons, setSermons] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("sermons").select("*").order("date", { ascending: false }).then(({ data }) => { if (data) setSermons(data); });
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
            Spiritual Nourishment
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-foreground animate-fade-in leading-[0.95]">
            Recent <span className="gradient-text">Messages</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed font-medium">
            Be encouraged by powerful, spirit-filled sermons from Bishop Paul Ndolo Mulu. Explore our library of life-changing truths.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105">
                <Play className="mr-3 h-6 w-6 fill-current" /> Watch on YouTube
              </Button>
            </a>
            <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-primary/20 text-primary hover:bg-primary/5 rounded-2xl font-bold">
                <ExternalLink className="mr-3 h-6 w-6" /> Join Community
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Sermons Content */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          {sermons.length > 0 ? (
            <div className="space-y-12">
              <div className="flex items-center justify-between">
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Full Archive</h2>
                 <div className="hidden md:block h-px flex-1 mx-10 bg-zinc-100 dark:bg-zinc-800" />
                 <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 font-bold uppercase tracking-widest">{sermons.length} Sermons</Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {sermons.map((s) => (
                  <ModernCard 
                    key={s.id} 
                    variant="glow"
                    className="group flex flex-col h-full"
                  >
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                           <Calendar className="w-3.5 h-3.5" />
                           {s.date}
                         </div>
                      </div>
                      
                      <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors leading-tight">
                        {s.title}
                      </CardTitle>
                      
                      <div className="space-y-3">
                         <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                            <User className="w-4 h-4 text-primary opacity-50" />
                            {s.speaker}
                         </div>
                         {s.topic && (
                           <div className="flex items-center gap-3 text-sm font-medium text-primary">
                              <BookOpen className="w-4 h-4 opacity-50" />
                              {s.topic}
                           </div>
                         )}
                      </div>
                    </div>

                    <div className="pt-8 mt-auto border-t border-zinc-50 dark:border-zinc-800">
                      {s.video_url ? (
                        <a href={s.video_url} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-lg shadow-primary/10 group-hover:scale-[1.02] transition-all">
                            <Play className="mr-2 h-4 w-4 fill-current" /> Watch Sermon
                          </Button>
                        </a>
                      ) : (
                        <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full h-14 border-primary/20 text-primary hover:bg-primary/5 rounded-2xl font-bold">
                            View on YouTube <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </ModernCard>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-12">
               <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Weekly Broadcasts</h2>
                  <p className="text-xl text-muted-foreground font-medium">Catch our latest uploads directly from YouTube.</p>
               </div>
               
               <ModernCard variant="glow" className="p-0 overflow-hidden shadow-2xl border-none">
                  <div className="aspect-video bg-zinc-900 overflow-hidden group">
                     <iframe 
                       className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" 
                       src="https://www.youtube.com/embed?listType=user_uploads&list=GLOBALPOWERCHURCH" 
                       title="GPC Sermons" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                       allowFullScreen
                     ></iframe>
                  </div>
                  <div className="p-10 text-center space-y-6">
                     <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                        Stay connected with every new word by subscribing to our official YouTube channel.
                     </p>
                     <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="h-16 px-12 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105">
                           Explore YouTube Channel <ChevronRight className="ml-2 h-6 w-6" />
                        </Button>
                     </a>
                  </div>
               </ModernCard>
            </div>
          )}
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="py-32 px-4 bg-zinc-50 dark:bg-zinc-900/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Study & Grow</h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  Each sermon is designed to provide spiritual points and daily themes that will help you dive deeper into God's Word.
                </p>
                <ul className="space-y-4">
                   {[
                     "Scripture-based teaching",
                     "Practical applications for life",
                     "Prophetic insight and direction",
                     "Anointed prayer and worship"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 font-bold text-foreground/80">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                           <ChevronRight className="w-4 h-4" />
                        </div>
                        {item}
                     </li>
                   ))}
                </ul>
             </div>
             
             <ModernCard variant="elevated" className="bg-primary text-white border-none p-10 flex flex-col justify-center text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center">
                   <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Themes of the Week</h3>
                <p className="text-lg opacity-80 font-medium">
                  Stay updated with our weekly spiritual themes and focus points shared during our Saturday devotion.
                </p>
                <Button variant="secondary" className="h-14 rounded-2xl font-bold text-base shadow-xl">
                   Learn More
                </Button>
             </ModernCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sermons;
