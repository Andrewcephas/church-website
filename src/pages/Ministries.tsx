
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Book, Music, Globe, Utensils, Sparkles } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/254704129211?text=Hello%2C%20I%20want%20to%20learn%20more%20about%20ministries";

const Ministries = () => {
  const ministries = [
    { icon: Music, title: "Choir Ministry", description: "Our choir lifts hearts through anointed songs and hymns, leading the congregation in powerful worship.", contact: "Join the Choir" },
    { icon: Sparkles, title: "Praise & Worship", description: "Spirit-filled praise and worship that ushers in God's presence during every service.", contact: "Join Praise Team" },
    { icon: Users, title: "Dance Ministry", description: "Expressing worship through anointed dance that glorifies God and inspires the congregation.", contact: "Join Dance Ministry" },
    { icon: Users, title: "Youth Ministry", description: "Empowering the next generation to walk in faith, purpose, and God's power.", contact: "Join Youth" },
    { icon: Heart, title: "Women Ministry", description: "Building strong, faith-filled women through fellowship, prayer, and discipleship.", contact: "Join Women Ministry" },
    { icon: Users, title: "Men Ministry", description: "Raising godly men who lead with integrity and serve their families and communities.", contact: "Join Men Ministry" },
    { icon: Globe, title: "Crusades", description: "Evangelistic crusades that bring the gospel to communities, with signs, wonders, and miracles.", contact: "Learn More" },
    { icon: Utensils, title: "Hospitality Ministry", description: "Welcoming guests with warmth and ensuring every visitor feels at home in God's house.", contact: "Join Hospitality" },
    { icon: Book, title: "Conferences (Yearly)", description: "Annual conferences featuring powerful speakers, worship, and life-changing encounters with God.", contact: "Learn More" },
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Ministries</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find your place of service and grow in God's power at Global Power Church
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => {
              const Icon = ministry.icon;
              return (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-8 w-8 text-red-600" />
                      <CardTitle className="text-black">{ministry.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-600 mb-4 flex-1">{ministry.description}</p>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        {ministry.contact}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Ready to Get Involved?</h2>
          <Card className="border-gray-200">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Every member of Global Power Church has a God-given gift and a place to serve. 
                Contact Bishop Paul Ndolo Mulu or reach out via WhatsApp to find the right ministry for you.
              </p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  Contact Us on WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Ministries;
