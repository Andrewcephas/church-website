
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/254704129211?text=Hello%2C%20I%20want%20to%20know%20more%20about%20events";

const Events = () => {
  const weeklyServices = [
    { title: "Sunday Main Service", day: "Every Sunday", time: "Main Service", category: "Worship", description: "Our main weekly gathering for powerful preaching, praise & worship, and fellowship." },
    { title: "Thursday Prayers", day: "Every Thursday", time: "4:00 PM – 6:00 PM", category: "Prayer", description: "Midweek prayer meeting for intercession, spiritual warfare, and seeking God's face." },
    { title: "Friday Kesha", day: "Every Friday", time: "Night Service", category: "Prayer", description: "All-night prayer and worship service — a powerful encounter with God's presence." },
    { title: "Saturday Morning Devotion", day: "Every Saturday", time: "6:00 AM – 7:00 AM", category: "Devotion", description: "Start your weekend with early morning devotion and spiritual nourishment." },
  ];

  const specialEvents = [
    { title: "Annual Conference", time: "Yearly", category: "Conference", description: "Our flagship yearly conference featuring anointed speakers, powerful worship, and life-changing encounters." },
    { title: "Crusades", time: "As Announced", category: "Evangelism", description: "Evangelistic crusades bringing the gospel to communities with signs, wonders, and miracles." },
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Events & Services</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join us for weekly services and special events at Global Power Church
          </p>
          <p className="text-lg text-red-600 font-semibold">Daily & Weekly Themes with Spiritual Points</p>
        </div>
      </section>

      {/* Weekly Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Weekly Services</h2>
            <p className="text-lg text-gray-600">Join us throughout the week</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {weeklyServices.map((event, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2 bg-red-100 text-red-800">{event.category}</Badge>
                  <CardTitle className="text-black mb-3">{event.title}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-red-600" /> {event.day}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-red-600" /> {event.time}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Get Directions</Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Events */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Special Events</h2>
            <p className="text-lg text-gray-600">Don't miss these powerful gatherings</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {specialEvents.map((event, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2 bg-red-100 text-red-800">{event.category}</Badge>
                  <CardTitle className="text-black mb-3">{event.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-red-600" /> {event.time}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Learn More via WhatsApp</Button>
                  </a>
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
