
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Download, Calendar, User } from "lucide-react";

const Sermons = () => {
  const recentSermons = [
    {
      title: "Walking in Faith",
      speaker: "Pastor John Smith",
      date: "December 3, 2023",
      series: "Faith Journey",
      description: "Exploring what it means to truly trust God in every season of life.",
      duration: "35 mins"
    },
    {
      title: "The Power of Prayer",
      speaker: "Pastor Sarah Johnson",
      date: "November 26, 2023",
      series: "Spiritual Disciplines",
      description: "Understanding how prayer transforms our hearts and our circumstances.",
      duration: "42 mins"
    },
    {
      title: "Love in Action",
      speaker: "Pastor John Smith",
      date: "November 19, 2023",
      series: "Living Like Jesus",
      description: "How to demonstrate Christ's love in practical, everyday ways.",
      duration: "38 mins"
    },
    {
      title: "Finding Hope in Difficult Times",
      speaker: "Pastor Mike Davis",
      date: "November 12, 2023",
      series: "Faith Journey",
      description: "Biblical principles for maintaining hope when life gets tough.",
      duration: "40 mins"
    }
  ];

  const seriesList = [
    {
      title: "Faith Journey",
      description: "A series exploring what it means to walk with God",
      sermons: 8,
      image: "faith-journey"
    },
    {
      title: "Spiritual Disciplines",
      description: "Building habits that draw us closer to God",
      sermons: 6,
      image: "spiritual-disciplines"
    },
    {
      title: "Living Like Jesus",
      description: "Practical applications of Christ's teachings",
      sermons: 10,
      image: "living-like-jesus"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Sermons</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Be encouraged and challenged by biblical teaching that transforms lives
          </p>
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
            <Play className="h-5 w-5 mr-2" />
            Watch Latest Sermon
          </Button>
        </div>
      </section>

      {/* Recent Sermons */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Recent Sermons</h2>
            <p className="text-lg text-gray-600">Catch up on our latest messages</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {recentSermons.map((sermon, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2 bg-red-100 text-red-800">
                        {sermon.series}
                      </Badge>
                      <CardTitle className="text-black mb-2">{sermon.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {sermon.speaker}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {sermon.date}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{sermon.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{sermon.description}</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sermon Series */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Sermon Series</h2>
            <p className="text-lg text-gray-600">Explore our teaching series on various topics</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {seriesList.map((series, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-full h-32 bg-red-100 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-lg">{series.title}</span>
                  </div>
                  <CardTitle className="text-black">{series.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{series.description}</p>
                  <p className="text-sm text-red-600 font-medium mb-4">
                    {series.sermons} sermons
                  </p>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    View Series
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Listen Anywhere</h2>
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Never miss a message! Subscribe to our podcast and listen to sermons on your favorite platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    Apple Podcasts
                  </Button>
                  <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    Spotify
                  </Button>
                  <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    Google Podcasts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sermons;
