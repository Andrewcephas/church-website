import { Link } from "react-router-dom";
import { CardTitle } from "@/components/ui/card";
import { ModernCard } from "@/components/ui/modern-card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Book, ChevronRight, Star, Shield, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
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
            Discover Our Heart
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-foreground animate-fade-in leading-tight">
            About <span className="gradient-text">Global Power</span> Church
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed font-medium">
            A spirit-filled ministry led by Bishop Paul Ndolo Mulu, dedicated to transforming lives through the power of God.
          </p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { to: "/about/our-story", icon: <Book />, title: "Our Story", desc: "The journey of Global Power Church", text: "Discover how Bishop Paul Ndolo Mulu founded this ministry and the miracles along the way.", btn: "Read Our Story" },
              { to: "/about/mission", icon: <Zap />, title: "Mission & Vision", desc: "Our purpose and direction", text: "Learn about our mission to spread God's power and our vision for the global church.", btn: "Our Mission" },
              { to: "/about/leadership", icon: <Users />, title: "Leadership", desc: "Meet Bishop Paul Ndolo Mulu", text: "Get to know our Bishop and the dedicated team leading our various ministries.", btn: "Meet Our Team" },
            ].map((item, i) => (
              <Link to={item.to} key={i} className="group">
                <ModernCard variant="glow" icon={item.icon} className="h-full">
                  <div className="space-y-4">
                    <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{item.title}</CardTitle>
                    <p className="text-sm font-bold text-primary/60 uppercase tracking-widest">{item.desc}</p>
                    <p className="text-muted-foreground leading-relaxed font-medium">{item.text}</p>
                    <div className="pt-4">
                      <Button variant="ghost" className="p-0 text-primary font-bold hover:bg-transparent group-hover:pl-2 transition-all">
                        {item.btn} <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </ModernCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-32 px-4 bg-zinc-50 dark:bg-zinc-900/20 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">These principles guide everything we do as a church family.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Power", icon: <Zap className="w-5 h-5" />, desc: "We believe in the transformative power of the Holy Spirit to change any life." },
              { title: "Faith", icon: <Star className="w-5 h-5" />, desc: "Walking by faith and trusting God completely in every season and situation." },
              { title: "Integrity", icon: <Shield className="w-5 h-5" />, desc: "Upholding the highest standards of biblical truth and honesty in all we do." },
              { title: "Love", icon: <Heart className="w-5 h-5" />, desc: "Serving God by serving others with unconditional love and compassion." },
            ].map((v, i) => (
              <ModernCard key={i} variant="elevated" className="text-center">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6">
                  {v.icon}
                </div>
                <CardTitle className="text-2xl font-bold mb-4 tracking-tight">{v.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed font-medium">{v.desc}</p>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-zinc-950 text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Be Part of the Story</h2>
          <p className="text-xl text-muted-foreground mb-12 font-medium leading-relaxed">
            Whether you're looking for a church home or just visiting, we'd love to have you experience the power of God with us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact">
              <Button size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-2xl shadow-primary/20">
                Join Us This Sunday
              </Button>
            </Link>
            <Link to="/ministries">
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-primary/20 text-primary hover:bg-primary/5 rounded-2xl font-bold">
                Explore Ministries
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
