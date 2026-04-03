
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Book, Globe } from "lucide-react";

const Mission = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Mission & Vision</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our God-given purpose and direction as Global Power Church
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Our Mission</h2>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-8">
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed">
                  "To demonstrate God's power, transform lives through the Gospel of Jesus Christ, 
                  and raise a generation of empowered believers who impact their communities and the world."
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Worship God", desc: "We worship with passion and power through praise, dance, and prayer." },
              { icon: Users, title: "Build Community", desc: "We nurture authentic relationships through our ministries and fellowship." },
              { icon: Book, title: "Teach the Word", desc: "We equip believers with daily and weekly themes grounded in Scripture." },
              { icon: Globe, title: "Reach the World", desc: "We spread the gospel through crusades, conferences, YouTube, and social media." },
            ].map((item, i) => (
              <Card key={i} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <CardTitle className="text-black">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Our Vision</h2>
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  "To be a powerhouse of God's glory — a church where every believer walks in divine power, 
                  purpose, and destiny, impacting nations for Christ."
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Under Bishop Paul Ndolo Mulu's leadership, we envision a church that raises leaders, 
                  transforms communities, and demonstrates the supernatural power of God in everyday life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
