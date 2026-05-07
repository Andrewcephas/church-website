import { CardTitle } from "@/components/ui/card";
import { ModernCard } from "@/components/ui/modern-card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Book, Globe, Zap, Star, Shield, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";

const Mission = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase mb-8 animate-fade-in">
            Our Purpose
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-foreground animate-fade-in leading-[0.95]">
            Mission & <span className="gradient-text">Vision</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed font-medium">
            Guided by divine mandate, we are dedicated to demonstrating God's power and raising a generation of empowered believers.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <ModernCard variant="elevated" className="bg-primary text-white p-12 md:p-20 text-center relative border-none overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-white/5 skew-x-[-15deg] translate-x-1/4 pointer-events-none" />
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center">
                <Zap className="w-8 h-8 text-white fill-current" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] opacity-80">Our Mission</h2>
              <p className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                "To demonstrate God's power, transform lives through the Gospel of Jesus Christ, and raise a generation of empowered believers."
              </p>
            </div>
          </ModernCard>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-32 px-4 bg-zinc-50 dark:bg-zinc-900/20">
        <div className="container mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Core Pillars</h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              The four foundational values that drive every ministry at Global Power Church.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <Heart />, title: "Worship God", desc: "We worship with passion and power, creating an atmosphere for divine encounters." },
              { icon: <Users />, title: "Build Community", desc: "We nurture authentic relationships and a sense of belonging in God's family." },
              { icon: <Book />, title: "Teach the Word", desc: "We equip believers with the uncompromised truth of the Holy Scriptures." },
              { icon: <Globe />, title: "Reach the World", desc: "We spread the Gospel globally through crusades, missions, and media." },
            ].map((item, i) => (
              <ModernCard key={i} variant="glow" className="text-center h-full group">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  {item.icon}
                </div>
                <CardTitle className="text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{item.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
             <div className="md:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase">
                  Our Vision
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                   Becoming a <span className="gradient-text">Powerhouse</span> of God's Glory
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                   We envision a church where every believer walks in divine power, purpose, and destiny—transforming communities and raising leaders for the Kingdom.
                </p>
                <div className="space-y-4 pt-4">
                   {[
                     "Raising world-class leaders",
                     "Restoring hope to the hopeless",
                     "Establishing global outposts",
                     "Impacting every sphere of society"
                   ].map((point, idx) => (
                     <div key={idx} className="flex items-center gap-4 text-lg font-bold text-foreground/80">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                           <ChevronRight className="w-4 h-4" />
                        </div>
                        {point}
                     </div>
                   ))}
                </div>
             </div>
             <div className="md:w-1/2">
                <ModernCard variant="glass" className="p-0 overflow-hidden shadow-2xl relative border-none">
                   <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80" alt="Vision" className="w-full aspect-square object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent flex flex-col justify-end p-10">
                      <p className="text-white text-2xl font-bold italic">"Empowering the world through the manifestation of God's power."</p>
                      <p className="text-primary font-bold mt-2 uppercase tracking-widest text-sm">— Global Power Church</p>
                   </div>
                </ModernCard>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-zinc-950 text-white text-center">
        <div className="container mx-auto max-w-2xl">
          <Star className="w-12 h-12 mx-auto mb-8 text-primary opacity-50" />
          <h2 className="text-3xl font-bold mb-6">Join the Movement</h2>
          <p className="opacity-70 text-lg leading-relaxed font-medium mb-12">
            Be part of a vision that goes beyond the walls of a building. Experience the power of God and fulfill your destiny with us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Button size="lg" className="h-16 px-12 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-2xl transition-all hover:scale-105">
                Join Us This Sunday
             </Button>
             <Button variant="outline" className="h-16 px-12 text-lg border-white/20 hover:bg-white/10 text-white rounded-2xl font-bold transition-all">
                Learn Our Story
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
