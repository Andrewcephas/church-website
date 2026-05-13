import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardTitle, CardContent } from "@/components/ui/card";
import { ModernCard } from "@/components/ui/modern-card";
import Navigation from "@/components/Navigation";
import { 
  Play, 
  Calendar, 
  Users, 
  Heart, 
  MessageSquare, 
  Phone, 
  Mail, 
  ChevronRight, 
  Clock,
  ChevronDown
} from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";

const Index = () => {
  const { settings } = useSiteSettings();
  
  const whatsappLink = `https://wa.me/${settings.whatsapp}?text=Hello Global Power Church, I would like to...`;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navigation />
      
{/* Hero Section */}
       <section className="relative min-h-[95vh] flex items-center justify-center pt-16 overflow-hidden">
         {/* Animated Background Elements */}
         <div className="absolute inset-0 z-0">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
         </div>

         <div className="container mx-auto px-4 relative z-10">
           <div className="max-w-4xl mx-auto text-center space-y-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase animate-fade-in">
               <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
               Empowering Lives Through Faith
             </div>
             
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground animate-fade-in leading-[0.95]" style={{ animationDelay: '0.1s' }}>
               Experience <span className="gradient-text">Power</span> <br />& Transformation
             </h1>
             
             <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in leading-relaxed font-medium" style={{ animationDelay: '0.2s' }}>
               Join Bishop Paul Ndolo Mulu and the Global Power Church family in a journey of faith, worship, and community impact.
             </p>
             
<div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Link to="/about">
                  <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl transition-all duration-500 hover:scale-105 shadow-2xl shadow-primary/20">
                    Our Story <ChevronRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-primary/20 text-primary hover:bg-primary/5 rounded-2xl transition-all duration-500">
                    <Play className="mr-2 h-6 w-6 fill-current" /> Watch Live
                  </Button>
                </a>
                <Link to="/quote">
                  <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-primary/30 text-primary hover:bg-primary/10 rounded-2xl transition-all duration-500">
                    Get a Quote
                  </Button>
                </Link>
              </div>
           </div>
         </div>

         {/* World Animation */}
         <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-zinc-300/30 text-sm font-bold tracking-[0.3em] uppercase animate-world-invert">
           Let the World See
         </div>

         {/* Scroll Indicator */}
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
           <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Discover</span>
           <ChevronDown className="h-6 w-6 text-primary" />
         </div>
       </section>

      <div className="space-y-0">
        {/* Services Section */}
        <section className="py-32 bg-white dark:bg-zinc-950/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Weekly Gatherings</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">Join us for spirit-filled services throughout the week, designed to help you grow in your relationship with God.</p>
              </div>
              <div className="hidden md:block h-px flex-1 mx-12 bg-zinc-100 dark:bg-zinc-800 mb-6" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {settings.services?.map((service, index) => (
                <ModernCard 
                  key={index} 
                  variant="glow"
                  badge={service.day === 'Sunday' ? 'Main Service' : undefined}
                  icon={<Calendar className="w-6 h-6" />}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardTitle className="text-2xl font-bold tracking-tight">{service.title}</CardTitle>
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center text-muted-foreground font-semibold">
                      <Clock className="w-5 h-5 mr-3 text-primary opacity-50" /> 
                      <span className="text-foreground">{service.day}</span>
                    </div>
                    <div className="text-sm font-medium text-primary bg-primary/5 px-3 py-1 rounded-lg inline-block">
                      Starting at {service.time}
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Message */}
        {(settings as any).sermons?.length > 0 && (
          <section className="py-32 px-4 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900/20">
            <div className="container mx-auto relative z-10">
              <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Recent Word</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">Catch up on our latest sermons and be empowered by the life-changing truth of God's Word.</p>
                </div>
                <Link to="/sermons" className="story-link text-primary font-bold text-lg mb-4">View Full Library</Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {(settings as any).sermons?.slice(0, 3).map((s: any, i: number) => (
                  <ModernCard 
                    key={i} 
                    variant="default"
                    className="group"
                  >
                    <div className="aspect-video relative mb-8 rounded-[1.5rem] overflow-hidden bg-muted shadow-2xl">
                      {s.thumbnail ? (
                        <img src={s.thumbnail} alt={s.title} className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/20">
                          <Play className="w-16 h-16" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                      <div className="absolute bottom-6 left-6 right-6">
                         <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl inline-flex items-center text-white text-xs font-bold uppercase tracking-widest border border-white/20">
                            Watch Now
                         </div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{s.title}</CardTitle>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                        {s.preacher.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{s.preacher}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Speaker</p>
                      </div>
                    </div>
                    {s.video_url && (
                      <a href={s.video_url} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                          Watch Message
                        </Button>
                      </a>
                    )}
                  </ModernCard>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Ministries */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Our Ministries</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Discover a place where you can use your gifts to serve others and grow in your walk with Christ.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {settings.ministries?.slice(0, 4).map((item, i) => (
                <ModernCard 
                  key={i} 
                  variant="elevated"
                  icon={<Users className="w-6 h-6" />}
                  className="text-center"
                >
                  <CardTitle className="text-2xl font-bold mb-4 tracking-tight">{item.title}</CardTitle>
                  <p className="text-muted-foreground leading-relaxed font-medium">{item.description}</p>
                </ModernCard>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Link to="/ministries">
                <Button variant="outline" size="lg" className="h-16 px-12 text-lg border-primary/20 text-primary hover:bg-primary/5 rounded-2xl font-bold transition-all hover:scale-105">
                  Explore All Ministries
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Prayer Request CTA */}
        <section className="py-32 px-4 relative overflow-hidden bg-primary/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl mb-10 transform -rotate-6">
              <MessageSquare className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">How Can We Pray For You?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              We believe in the power of prayer. Share your request with our dedicated intercessors and let us stand with you.
            </p>
            <Link to="/prayer-request">
              <Button size="lg" className="h-18 px-12 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:-rotate-1">
                Submit Prayer Request
              </Button>
            </Link>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-32 px-4 bg-white dark:bg-zinc-950/50">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-10">
              <a href={`tel:+${settings.whatsapp}`} className="group">
                <ModernCard variant="glass" className="text-center h-full">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 transform group-hover:scale-110">
                    <Phone className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 tracking-tight">Call Us</CardTitle>
                  <p className="text-lg text-muted-foreground font-semibold">{settings.phone}</p>
                </ModernCard>
              </a>
              <a href={`mailto:${settings.email}`} className="group">
                <ModernCard variant="glass" className="text-center h-full">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 transform group-hover:scale-110">
                    <Mail className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 tracking-tight">Email Us</CardTitle>
                  <p className="text-lg text-muted-foreground font-semibold break-all">{settings.email}</p>
                </ModernCard>
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group">
                <ModernCard variant="glass" className="text-center h-full">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 transform group-hover:scale-110">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 tracking-tight">WhatsApp</CardTitle>
                  <p className="text-lg text-muted-foreground font-semibold">Live Chat Support</p>
                </ModernCard>
              </a>
            </div>
          </div>
        </section>

        {/* Give Section */}
        <section className="py-32 px-4 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2" />
          
          <div className="container mx-auto text-center relative z-10 max-w-4xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl mb-10">
               <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-tight">Partner With Us <br />in Giving</h2>
            <p className="text-xl md:text-2xl mb-14 opacity-90 leading-relaxed font-medium max-w-3xl mx-auto">
              Every contribution helps us reach more souls and impact lives for eternity. Thank you for your faithful support.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="h-20 px-16 text-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-all font-bold">
                Give Now via WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
