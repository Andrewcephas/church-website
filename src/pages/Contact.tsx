import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, ExternalLink, MessageSquare } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/254704129211?text=Hello%20Global%20Power%20Church";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">Contact Us</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">We'd love to hear from you!</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a href="tel:+254704129211"><Card className="text-center hover:shadow-lg transition-shadow h-full"><CardHeader><Phone className="h-12 w-12 mx-auto mb-4 text-primary" /><CardTitle className="text-foreground">Call Us</CardTitle></CardHeader><CardContent><p className="font-medium text-foreground">0704 129 211</p><p className="text-muted-foreground text-sm mt-2">Bishop Paul Ndolo Mulu</p></CardContent></Card></a>
            <a href="mailto:paulndolo1972@gmail.com"><Card className="text-center hover:shadow-lg transition-shadow h-full"><CardHeader><Mail className="h-12 w-12 mx-auto mb-4 text-primary" /><CardTitle className="text-foreground">Email Us</CardTitle></CardHeader><CardContent><p className="font-medium text-foreground">paulndolo1972@gmail.com</p></CardContent></Card></a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Card className="text-center hover:shadow-lg transition-shadow h-full"><CardHeader><MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" /><CardTitle className="text-foreground">WhatsApp</CardTitle></CardHeader><CardContent><p className="font-medium text-foreground">0704 129 211</p><p className="text-muted-foreground text-sm mt-2">Chat with us instantly</p></CardContent></Card></a>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12"><h2 className="text-3xl font-bold text-foreground"><Clock className="inline h-8 w-8 text-primary mr-2" />Service Times</h2></div>
          <Card><CardContent className="p-6"><div className="space-y-4">
            {[{ day: "Sunday", hours: "Main Sunday Service" },{ day: "Thursday", hours: "4:00 PM – 6:00 PM (Prayers)" },{ day: "Friday", hours: "Kesha – Night Service" },{ day: "Saturday", hours: "6:00 AM – 7:00 AM (Morning Devotion)" }].map((s, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-b-0"><span className="font-medium text-foreground">{s.day}</span><span className="text-muted-foreground">{s.hours}</span></div>
            ))}
          </div></CardContent></Card>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Connect Online</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <a href="https://www.youtube.com/@GLOBALPOWERCHURCH" target="_blank" rel="noopener noreferrer"><Card className="hover:shadow-lg transition-shadow"><CardContent className="p-6 text-center"><h3 className="font-bold text-foreground mb-2">YouTube</h3><p className="text-muted-foreground text-sm mb-4">Watch live services and sermons</p><Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Visit YouTube</Button></CardContent></Card></a>
            <a href="https://www.facebook.com/groups/1202497280341977" target="_blank" rel="noopener noreferrer"><Card className="hover:shadow-lg transition-shadow"><CardContent className="p-6 text-center"><h3 className="font-bold text-foreground mb-2">Facebook Group</h3><p className="text-muted-foreground text-sm mb-4">Join our online community</p><Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Join Group</Button></CardContent></Card></a>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Visit?</h2>
          <p className="text-lg mb-8 opacity-90">Join us this Sunday or reach out via WhatsApp</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button size="lg" variant="secondary">Chat on WhatsApp</Button></a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
