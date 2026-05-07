import { CardTitle, CardContent } from "@/components/ui/card";
import { ModernCard } from "@/components/ui/modern-card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, ChevronRight, Zap, Star, Shield } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";
import Navigation from "@/components/Navigation";

const Give = () => {
  const { settings } = useSiteSettings();
  const whatsappLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Hello Global Power Church, I would like to give to the ministry.")}`;

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
            Partner With Us
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-foreground animate-fade-in leading-[0.95]">
            Invest in <span className="gradient-text">Eternity</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in leading-relaxed font-medium">
            Your generosity empowers us to spread God's love, reach the lost, and impact our generation for the Kingdom of God.
          </p>
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-18 px-12 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105">
                Give Now via WhatsApp <Heart className="ml-3 h-6 w-6 fill-current" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Scriptural Inspiration */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <ModernCard variant="elevated" className="overflow-hidden bg-primary text-white p-12 md:p-20 text-center relative border-none">
            <div className="absolute inset-0 bg-white/5 skew-x-[-15deg] translate-x-1/4 pointer-events-none" />
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center">
                <Star className="w-8 h-8 text-white fill-current" />
              </div>
              <p className="text-2xl md:text-4xl font-bold italic tracking-tight leading-snug">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              </p>
              <div className="flex flex-col items-center">
                <div className="h-px w-20 bg-white/30 mb-4" />
                <span className="text-lg font-bold uppercase tracking-[0.2em]">2 Corinthians 9:7</span>
              </div>
            </div>
          </ModernCard>
        </div>
      </section>

      {/* Giving Benefits/Impact */}
      <section className="py-32 px-4 bg-zinc-50 dark:bg-zinc-900/20">
        <div className="container mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Your Impact</h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              When you give to Global Power Church, your resources are put to work immediately to fulfill the Great Commission.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Evangelism", icon: <Zap />, desc: "Supporting crusades, outreach programs, and missions to reach the unreached with the Gospel." },
              { title: "Community", icon: <Heart />, desc: "Providing support for those in need and fostering a strong family environment within the church." },
              { title: "Development", icon: <Shield />, desc: "Investing in ministry tools, facilities, and leadership training to scale our global impact." },
            ].map((item, i) => (
              <ModernCard key={i} variant="glow" className="text-center">
                 <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8">
                   {item.icon}
                 </div>
                 <CardTitle className="text-2xl font-bold mb-4 tracking-tight">{item.title}</CardTitle>
                 <p className="text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Giving Detailed */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl mb-10 border border-zinc-100 dark:border-zinc-800">
            <MessageSquare className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Simplified Giving</h2>
          <p className="text-xl text-muted-foreground mb-12 font-medium leading-relaxed">
            We've made giving simple and secure. Simply send us a message on WhatsApp, and our finance team will guide you through the process step-by-step.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
             <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 text-left">
                <div className="text-primary font-bold text-lg mb-2">1. Connect</div>
                <p className="text-sm text-muted-foreground font-medium italic leading-relaxed">Click the button below to start a chat with us.</p>
             </div>
             <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 text-left">
                <div className="text-primary font-bold text-lg mb-2">2. Instructions</div>
                <p className="text-sm text-muted-foreground font-medium italic leading-relaxed">Receive instant details on how to send your gift.</p>
             </div>
          </div>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-18 px-12 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-105">
              Get Giving Details <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
          </a>
          <p className="text-sm text-muted-foreground mt-8 font-bold uppercase tracking-widest">
            Official WhatsApp: {settings.phone}
          </p>
        </div>
      </section>

      {/* Footer Acknowledgement */}
      <section className="py-24 px-4 bg-zinc-950 text-white text-center">
        <div className="container mx-auto max-w-2xl">
          <Heart className="w-12 h-12 mx-auto mb-8 text-primary opacity-50" />
          <h2 className="text-3xl font-bold mb-6">Thank You for Your Support</h2>
          <p className="opacity-70 leading-relaxed font-medium">
            Your contributions are handled with the highest level of accountability and prayer. Together, we are making an eternal difference.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Give;
