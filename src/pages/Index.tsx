import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Book, Heart, Phone, Mail, Play, Music, MessageSquare } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/254704129211?text=Hello%20Global%20Power%20Church";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-16 pb-20 px-4">
        <div className="container mx-auto text-center">
          <img src="/images/gpc-logo.jpg" alt="Global Power Church Logo" className="w-28 h-28 mx-auto rounded-full object-cover mb-6 shadow-lg border-4 border-secondary" />
          <Badge variant="secondary" className="mb-4">Welcome to Global Power Church</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Experience God's Power & Transformation
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Led by Bishop Paul Ndolo Mulu — Jeremiah 1:10
          </p>
          <p className="text-lg text-primary font-semibold mb-8">Daily & Weekly Themes with Spiritual Points</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90 text-primary-foreground">Plan Your Visit</Button>
            </Link>
            <a href="https://www.youtube.com/@GLOBALPOWERCHURCH" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary text-primary hover:bg-primary/10">
                <Play className="h-5 w-5 mr-2" />Watch Online
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Join Us This Week</h2>
            <p className="text-lg text-muted-foreground">Multiple services throughout the week</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Sunday Service", time: "Every Sunday", desc: "Main Sunday Service" },
              { title: "Thursday Prayers", time: "4:00–6:00 PM", desc: "Prayer Meeting" },
              { title: "Friday Kesha", time: "Night Service", desc: "All-Night Prayer" },
              { title: "Saturday Devotion", time: "6:00–7:00 AM", desc: "Morning Devotion" },
            ].map((s, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-foreground">
                    <Calendar className="h-5 w-5 text-primary" />{s.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-2 text-secondary">{s.time}</p>
                  <p className="text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Ministries</h2>
            <p className="text-lg text-muted-foreground">Find your place and grow in faith</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Music, title: "Choir & Praise", desc: "Worship through music and song" },
              { icon: Users, title: "Youth Ministry", desc: "Empowering the next generation" },
              { icon: Heart, title: "Women Ministry", desc: "Growing together in faith" },
              { icon: Book, title: "Crusades", desc: "Evangelism and outreach" },
            ].map((item, i) => (
              <Link to="/ministries" key={i}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="text-center">
                    <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <CardTitle className="text-foreground">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/ministries">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">View All Ministries</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Prayer Request CTA */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Need Prayer?</h2>
          <p className="text-lg text-muted-foreground mb-8">Submit your prayer request and our team will pray for you</p>
          <Link to="/prayer-request">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">Submit Prayer Request</Button>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Get Connected</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a href="tel:+254704129211" className="text-center group">
              <Phone className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2 text-foreground">Call Us</h3>
              <p className="text-muted-foreground group-hover:text-primary transition-colors">0704 129 211</p>
            </a>
            <a href="mailto:paulndolo1972@gmail.com" className="text-center group">
              <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2 text-foreground">Email Us</h3>
              <p className="text-muted-foreground group-hover:text-primary transition-colors">paulndolo1972@gmail.com</p>
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-center group">
              <MessageSquare className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2 text-foreground">WhatsApp</h3>
              <p className="text-muted-foreground group-hover:text-primary transition-colors">Chat with us</p>
            </a>
          </div>
        </div>
      </section>

      {/* Give CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <Heart className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support the Ministry</h2>
          <p className="text-lg mb-8 opacity-90">Partner with Global Power Church through your generous giving</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary">Give via WhatsApp</Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
