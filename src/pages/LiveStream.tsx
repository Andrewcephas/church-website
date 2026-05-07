import { CardTitle } from "@/components/ui/card";
import { ModernCard } from "@/components/ui/modern-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock, ExternalLink, ChevronRight, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";

const YOUTUBE_URL = "https://www.youtube.com/@GLOBALPOWERCHURCH";
const FACEBOOK_URL = "https://www.facebook.com/groups/1202497280341977";

const LiveStream = () => {
  const services = [
    { title: "Sunday Main Service", day: "Every Sunday", time: "Morning Service", speaker: "Bishop Paul Ndolo Mulu" },
    { title: "Thursday Prayers", day: "Every Thursday", time: "4:00 – 6:00 PM", speaker: "Bishop Paul Ndolo Mulu" },
    { title: "Friday Kesha", day: "Every Friday", time: "Night Service", speaker: "Bishop Paul Ndolo Mulu" },
    { title: "Saturday Devotion", day: "Every Saturday", time: "6:00 – 7:00 AM", speaker: "Bishop Paul Ndolo Mulu" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold tracking-wide uppercase mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Join Us Live
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-foreground animate-fade-in leading-[0.95]">
            Watch <span className="gradient-text">Live</span> Now
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed font-medium">
            Experience God's power and transformation from anywhere in the world. Join our global community in worship and prayer.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-16 px-10 text-lg bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-2xl shadow-red-500/20 transition-all hover:scale-105">
                <Play className="mr-3 h-6 w-6 fill-current" /> YouTube Live
              </Button>
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-blue-500/20 text-blue-600 hover:bg-blue-50 rounded-2xl font-bold">
                <ExternalLink className="mr-3 h-6 w-6" /> Facebook Group
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Main Broadcast Area */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <ModernCard variant="glow" className="p-0 overflow-hidden shadow-2xl border-none">
            <div className="aspect-video bg-zinc-900 relative group">
               <iframe 
                 className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" 
                 src="https://www.youtube.com/embed?listType=user_uploads&list=GLOBALPOWERCHURCH" 
                 title="GPC Live Stream" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
               ></iframe>
               <div className="absolute top-6 right-6">
                  <Badge className="bg-red-600 text-white border-none px-4 py-1.5 font-bold animate-pulse">LIVE FEED</Badge>
               </div>
            </div>
            <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
               <div className="space-y-2">
                  <h3 className="text-3xl font-bold tracking-tight text-foreground">Global Power Church Live</h3>
                  <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                     <Zap className="w-4 h-4 fill-current" />
                     Ministering: Bishop Paul Ndolo Mulu
                  </div>
               </div>
               <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="h-14 px-8 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all hover:scale-105">
                    Open in YouTube App <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
               </a>
            </div>
          </ModernCard>
        </div>
      </section>

      {/* Broadcast Schedule */}
      <section className="py-32 px-4 bg-zinc-50 dark:bg-zinc-900/20 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Streaming Schedule</h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Don't miss a moment of God's Word. Mark your calendar for these live sessions.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((s, i) => (
              <ModernCard key={i} variant="elevated" className="text-center h-full flex flex-col justify-center py-12">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mx-auto mb-8">
                  <Clock className="w-7 h-7" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight mb-4 leading-tight">{s.title}</CardTitle>
                <div className="space-y-2">
                   <div className="flex items-center justify-center gap-2 text-foreground/80 font-bold">
                      <Calendar className="w-4 h-4 text-primary" />
                      {s.day}
                   </div>
                   <div className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-lg inline-block">
                      {s.time}
                   </div>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Online Community CTA */}
      <section className="py-32 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-10 shadow-xl transform rotate-3">
             <ExternalLink className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Join Our Facebook Group</h2>
          <p className="text-xl text-muted-foreground mb-12 font-medium leading-relaxed">
            Connect with other believers, share testimonies, and receive daily encouragement in our official Global Power Church community group.
          </p>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-16 px-12 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-2xl shadow-blue-500/20 transition-all hover:scale-105">
              Join the Conversation <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default LiveStream;
