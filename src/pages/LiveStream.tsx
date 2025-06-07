
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Calendar, Users, MessageCircle, Share2 } from "lucide-react";

const LiveStream = () => {
  const upcomingServices = [
    {
      title: "Saturday Evening Service",
      time: "6:00 PM",
      date: "December 9, 2023",
      type: "Contemporary Worship",
      speaker: "Pastor John Smith"
    },
    {
      title: "Sunday Morning Service",
      time: "9:00 AM",
      date: "December 10, 2023",
      type: "Traditional Worship",
      speaker: "Pastor John Smith"
    },
    {
      title: "Sunday Evening Service",
      time: "6:00 PM",
      date: "December 10, 2023",
      type: "Youth & Family",
      speaker: "Pastor Mike Davis"
    }
  ];

  const recentStreams = [
    {
      title: "Walking in Faith",
      date: "December 3, 2023",
      views: "324 views",
      duration: "1:45:32"
    },
    {
      title: "The Power of Prayer",
      date: "November 26, 2023",
      views: "287 views",
      duration: "1:42:15"
    },
    {
      title: "Love in Action",
      date: "November 19, 2023",
      views: "356 views",
      duration: "1:38:42"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Live Stream</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join us online for worship, teaching, and community from anywhere in the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Play className="h-5 w-5 mr-2" />
              Watch Live Now
            </Button>
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <Calendar className="h-5 w-5 mr-2" />
              Service Times
            </Button>
          </div>
        </div>
      </section>

      {/* Live Stream Player */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="border-gray-200 mb-8">
              <CardContent className="p-0">
                <div className="w-full h-64 md:h-96 bg-black rounded-t-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">Live Stream Currently Offline</p>
                    <p className="text-sm opacity-75">Next service starts Saturday at 6:00 PM</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-black">Church Live Stream</h3>
                      <p className="text-gray-600">Join us for worship and teaching</p>
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Offline
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      0 watching
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      Chat available during live
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Stream
                    </Button>
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                      Set Reminder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Upcoming Services</h2>
            <p className="text-lg text-gray-600">Mark your calendar for our live worship services</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {upcomingServices.map((service, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Badge variant="secondary" className="w-fit mx-auto mb-2 bg-red-100 text-red-800">
                    {service.type}
                  </Badge>
                  <CardTitle className="text-black">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4 text-red-600" />
                      {service.date}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-red-600" />
                      {service.time}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Users className="h-4 w-4 text-red-600" />
                      {service.speaker}
                    </div>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Set Reminder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Streams */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Recent Services</h2>
            <p className="text-lg text-gray-600">Catch up on messages you may have missed</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {recentStreams.map((stream, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-full h-32 bg-red-100 flex items-center justify-center">
                    <Play className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-black mb-2">{stream.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <p>{stream.date}</p>
                      <p>{stream.views} • {stream.duration}</p>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stream Info */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Can't Join Us in Person?</h2>
            <p className="text-lg mb-8 opacity-90 leading-relaxed">
              Our live stream makes it possible to worship with us from anywhere. Whether you're traveling, 
              sick at home, or simply prefer to worship online, you're always welcome to join our church family virtually.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-bold text-lg mb-2">What to Expect:</h3>
                <ul className="space-y-1 opacity-90">
                  <li>• High-quality video and audio</li>
                  <li>• Live chat with other viewers</li>
                  <li>• Full worship experience</li>
                  <li>• Online giving options</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Technical Requirements:</h3>
                <ul className="space-y-1 opacity-90">
                  <li>• Stable internet connection</li>
                  <li>• Modern web browser</li>
                  <li>• Mobile app available</li>
                  <li>• No registration required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveStream;
