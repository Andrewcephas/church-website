import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/254704129211?text=Hello%2C%20I%20want%20to%20know%20more%20about%20events";

const Events = () => {
  const weeklyServices = [
    { title: "Sunday Main Service", day: "Every Sunday", time: "Main Service", category: "Worship", description: "Our main weekly gathering." },
    { title: "Thursday Prayers", day: "Every Thursday", time: "4:00 PM – 6:00 PM", category: "Prayer", description: "Midweek prayer meeting." },
    { title: "Friday Kesha", day: "Every Friday", time: "Night Service", category: "Prayer", description: "All-night prayer and worship." },
    { title: "Saturday Morning Devotion", day: "Every Saturday", time: "6:00 AM – 7:00 AM", category: "Devotion", description: "Early morning devotion." },
  ];
  const specialEvents = [
    { title: "Annual Conference", time: "Yearly", category: "Conference", description: "Our flagship yearly conference." },
    { title: "Crusades", time: "As Announced", category: "Evangelism", description: "Evangelistic crusades." },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">Events & Services</h1>
          <p className="text-xl text-muted-foreground mb-8">Join us for weekly services and special events</p>
          <p className="text-lg text-primary font-semibold">Daily & Weekly Themes with Spiritual Points</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Weekly Services</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {weeklyServices.map((e, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{e.category}</Badge>
                  <CardTitle className="text-foreground">{e.title}</CardTitle>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{e.day}</div>
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{e.time}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{e.description}</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Directions</Button></a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Special Events</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {specialEvents.map((e, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{e.category}</Badge>
                  <CardTitle className="text-foreground">{e.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4 text-primary" />{e.time}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{e.description}</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Learn More</Button></a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
