import { CardTitle } from "@/components/ui/card";
import { ModernCard } from "@/components/ui/modern-card";
import { Mail, Phone, ChevronRight, MessageSquare, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";

const Leadership = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase mb-8 animate-fade-in">
            God's Servants
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-foreground animate-fade-in leading-tight">
            Our <span className="gradient-text">Leadership</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed font-medium">
            Meet the anointed leaders who guide Global Power Church with wisdom, faith, and a commitment to God's purpose.
          </p>
        </div>
      </section>

      {/* Bishop's Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <ModernCard variant="glow" className="overflow-hidden p-0 border-none shadow-2xl">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-2/5 relative h-80 md:h-auto overflow-hidden">
                <img src="/images/gpc-logo.png" alt="Bishop Paul Ndolo Mulu" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-overlay" />
              </div>
              <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Bishop Paul Ndolo Mulu</h2>
                  <p className="text-xl font-bold text-primary uppercase tracking-widest">Founder & Senior Bishop</p>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  Bishop Paul Ndolo Mulu is the founder and spiritual leader of Global Power Church. Called by God to demonstrate His power and transform lives, Bishop Mulu has dedicated his life to preaching the uncompromised Gospel and raising empowered believers.
                </p>
                
                <div className="pt-6 grid sm:grid-cols-2 gap-6 border-t border-zinc-100 dark:border-zinc-800">
                  <a href="mailto:paulndolo1972@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Email</p>
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors break-all">paulndolo1972@gmail.com</p>
                    </div>
                  </a>
                  <a href="tel:+254704129211" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Phone</p>
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">0704 129 211</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </ModernCard>
        </div>
      </section>

      {/* Ministry Leaders Grid */}
      <section className="py-32 px-4 bg-zinc-50 dark:bg-zinc-900/20">
        <div className="container mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ministry Directors</h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Leading with passion and excellence in every area of our church life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { dept: "Choir Ministry", role: "Choir Director" },
              { dept: "Praise & Worship", role: "Worship Leader" },
              { dept: "Dance Ministry", role: "Dance Coordinator" },
              { dept: "Youth Ministry", role: "Youth Leader" },
              { dept: "Women Ministry", role: "Women Leader" },
              { dept: "Men Ministry", role: "Men Leader" },
              { dept: "Hospitality", role: "Hospitality Coordinator" },
              { dept: "Crusades & Outreach", role: "Outreach Director" },
            ].map((leader, i) => (
              <ModernCard key={i} variant="elevated" className="text-center h-full group">
                <div className="mx-auto w-16 h-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center text-primary mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <span className="text-2xl font-bold">{leader.dept[0]}</span>
                </div>
                <CardTitle className="text-xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">{leader.dept}</CardTitle>
                <p className="text-primary/70 font-bold text-sm uppercase tracking-widest">{leader.role}</p>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Connect CTA */}
      <section className="py-32 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-10 transform -rotate-3">
             <MessageSquare className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Speak with Our Leaders</h2>
          <p className="text-xl text-muted-foreground mb-12 font-medium leading-relaxed">
            Our leadership team is here to support, pray, and guide you. Reach out to any of our ministry departments for more information.
          </p>
          <a href="tel:+254704129211">
            <Button size="lg" className="h-16 px-12 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105">
              Contact Leadership <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
