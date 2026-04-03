
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock, ExternalLink } from "lucide-react";

const YOUTUBE_URL = "https://www.youtube.com/@GLOBALPOWERCHURCH";
const FACEBOOK_URL = "https://www.facebook.com/groups/1202497280341977";

const LiveStream = () => {
  const services = [
    { title: "Sunday Main Service", day: "Every Sunday", time: "Main Service", speaker: "Bishop Paul Ndolo Mulu" },
    { title: "Thursday Prayers", day: "Every Thursday", time: "4:00 – 6:00 PM", speaker: "Bishop Paul Ndolo Mulu" },
    { title: "Friday Kesha", day: "Every Friday", time: "Night Service", speaker: "Bishop Paul Ndolo Mulu" },
    { title: "Saturday Devotion", day: "Every Saturday", time: "6:00 – 7:00 AM", speaker: "Bishop Paul Ndolo Mulu" },
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Watch Live</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join Global Power Church online — experience God's power from anywhere in the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Play className="h-5 w-5 mr-2" />
                Watch on YouTube
              </Button>
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                <ExternalLink className="h-5 w-5 mr-2" />
                Join Facebook Group
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* YouTube Embed */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-gray-200 mb-8">
            <CardContent className="p-0">
              <div className="w-full aspect-video bg-black rounded-t-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed?listType=user_uploads&list=GLOBALPOWERCHURCH"
                  title="Global Power Church - YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black">Global Power Church Live</h3>
                    <p className="text-gray-600">Bishop Paul Ndolo Mulu</p>
                  </div>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">YouTube</Badge>
                </div>
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Play className="h-4 w-4 mr-2" />
                    Open YouTube Channel
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Service Schedule */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Service Schedule</h2>
            <p className="text-lg text-gray-600">Tune in for these services on our YouTube channel</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <CardTitle className="text-black text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 text-red-600" /> {service.day}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                    <Clock className="h-4 w-4 text-red-600" /> {service.time}
                  </div>
                  <p className="text-sm text-red-600 font-medium">{service.speaker}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Can't Join Us in Person?</h2>
          <p className="text-lg mb-8 opacity-90 leading-relaxed">
            Watch our services live on YouTube and connect with us through our Facebook group. 
            Experience God's power and transformation from anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                Subscribe on YouTube
              </Button>
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                Join Facebook Group
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveStream;
