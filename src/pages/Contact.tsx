import { CardTitle, CardContent } from "@/components/ui/card";
import { ModernCard } from "@/components/ui/modern-card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, MessageSquare, ExternalLink, ChevronRight, MapPin } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";
import Navigation from "@/components/Navigation";

const Contact = () => {
  const { settings } = useSiteSettings();
  const whatsappLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Hello Global Power Church, I would like to get in touch.")}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase mb-8 animate-fade-in">
            Connect With Us
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight text-foreground animate-fade-in leading-tight">
            Get <span className="gradient-text">Connected</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in leading-relaxed font-medium">
            Have questions or need prayer? We're here for you. Reach out to the Global Power Church family anytime.
          </p>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <a href={`tel:+${settings.whatsapp}`} className="group">
              <ModernCard variant="glow" className="text-center h-full">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 transform group-hover:scale-110">
                  <Phone className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold mb-4 tracking-tight">Call Us</CardTitle>
                <p className="text-lg text-foreground font-bold mb-2">{settings.phone}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Office Line</p>
              </ModernCard>
            </a>

            <a href={`mailto:${settings.email}`} className="group">
              <ModernCard variant="glow" className="text-center h-full">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 transform group-hover:scale-110">
                  <Mail className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold mb-4 tracking-tight">Email Us</CardTitle>
                <p className="text-lg text-foreground font-bold mb-2 break-all">{settings.email}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Inquiries</p>
              </ModernCard>
            </a>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group">
              <ModernCard variant="glow" className="text-center h-full">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 transform group-hover:scale-110">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold mb-4 tracking-tight">WhatsApp</CardTitle>
                <p className="text-lg text-foreground font-bold mb-2">Live Chat</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Instant Support</p>
              </ModernCard>
            </a>
          </div>
        </div>
      </section>

      {/* Service Schedule */}
      <section className="py-32 px-4 bg-zinc-50 dark:bg-zinc-900/20 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Service Times</h2>
            <p className="text-xl text-muted-foreground font-medium">Join us for worship at these times.</p>
          </div>
          
          <ModernCard variant="elevated" className="overflow-hidden">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {settings.services?.map((s, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-8 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50">
                  <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">{s.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm">
                      {s.day}
                    </span>
                    <span className="text-lg font-medium text-muted-foreground">
                      {s.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ModernCard>
        </div>
      </section>

      {/* Social & Community */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Follow Our Journey</h2>
            <p className="text-xl text-muted-foreground font-medium">Stay updated with the latest news, services, and community events.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-10">
            <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="group">
              <ModernCard variant="glass" className="h-full transition-all duration-500 hover:border-red-500/30">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                    <Play className="w-8 h-8 fill-current" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-red-500 transition-colors">YouTube Channel</h3>
                    <p className="text-muted-foreground font-medium">Watch live services & sermons</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-zinc-300 group-hover:translate-x-1 transition-transform" />
                </div>
              </ModernCard>
            </a>

            <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="group">
              <ModernCard variant="glass" className="h-full transition-all duration-500 hover:border-blue-500/30">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-blue-500 transition-colors">Facebook Group</h3>
                    <p className="text-muted-foreground font-medium">Join our online community</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-zinc-300 group-hover:translate-x-1 transition-transform" />
                </div>
              </ModernCard>
            </a>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 bg-primary text-white text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-white/5 skew-x-[-20deg] translate-x-1/3" />
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">Ready to Visit Us?</h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto font-medium">We can't wait to welcome you to one of our services and experience the power of God together.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="h-16 px-12 text-lg rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all">
                  Chat on WhatsApp
                </Button>
             </a>
             <Button variant="outline" className="h-16 px-12 text-lg rounded-2xl font-bold border-white/20 hover:bg-white/10 text-white transition-all">
                Find Directions <MapPin className="ml-2 h-5 w-5" />
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
