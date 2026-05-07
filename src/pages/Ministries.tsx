import { CardTitle } from "@/components/ui/card";
import { ModernCard } from "@/components/ui/modern-card";
import { Button } from "@/components/ui/button";
import { Users, ChevronRight, MessageSquare } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";
import Navigation from "@/components/Navigation";

const Ministries = () => {
  const { settings } = useSiteSettings();
  const whatsappLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Hello Global Power Church, I'm interested in joining the ministry.")}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/4" />
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase mb-8 animate-fade-in">
            Find Your Place
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-foreground animate-fade-in leading-tight">
            Our <span className="gradient-text">Ministries</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed font-medium">
            Discover where you can use your God-given gifts to serve, grow, and impact lives within our church family and community.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {settings.ministries?.map((m, i) => (
              <ModernCard 
                key={i} 
                variant="glow" 
                icon={<Users />}
                className="h-full group"
              >
                <div className="flex flex-col h-full space-y-4">
                  <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{m.title}</CardTitle>
                  <p className="text-muted-foreground leading-relaxed font-medium flex-1">{m.description}</p>
                  <div className="pt-6">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 group-hover:scale-[1.02]">
                        Join {m.title}
                      </Button>
                    </a>
                  </div>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-4 bg-zinc-50 dark:bg-zinc-900/20 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl mb-10">
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Not Sure Where to Start?</h2>
          <p className="text-xl text-muted-foreground mb-12 font-medium leading-relaxed">
            Every member of Global Power Church has a unique purpose. Reach out to us and we'll help you find the ministry that best fits your passion and gifts.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-16 px-12 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-105">
              Chat With a Leader <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Ministries;
