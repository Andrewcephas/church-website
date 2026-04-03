
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Heart, Book } from "lucide-react";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Our Story</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The journey of Global Power Church — founded on faith, built by God's power
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black">How It All Began</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Global Power Church was founded by Bishop Paul Ndolo Mulu with a divine mandate to spread 
              the gospel and demonstrate God's power. What started as a small gathering of faithful believers 
              has grown into a vibrant, spirit-filled congregation reaching lives across the region and beyond 
              through YouTube and social media.
            </p>
          </div>

          <div className="space-y-8">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-black">
                  <Calendar className="h-6 w-6 text-red-600" />
                  The Foundation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Bishop Paul Ndolo Mulu received a calling from God to establish a ministry that would 
                  bring God's power to the people. With unwavering faith, he began preaching and gathering 
                  believers who were hungry for God's word and spiritual transformation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-black">
                  <Users className="h-6 w-6 text-red-600" />
                  Growing Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  As God's power manifested through healing, deliverance, and transformed lives, the church 
                  grew rapidly. Ministries were established — choir, praise and worship, dancers, youth, 
                  women, and men ministries — each serving a vital role in the body of Christ.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-black">
                  <Heart className="h-6 w-6 text-red-600" />
                  Crusades & Conferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The church expanded its reach through powerful crusades and yearly conferences, bringing 
                  the gospel to communities far and wide. Thousands have been touched by the ministry 
                  through these transformative events.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-black">
                  <Book className="h-6 w-6 text-red-600" />
                  Digital Ministry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Embracing technology, Global Power Church now streams services on YouTube and connects 
                  with believers worldwide through Facebook and social media. The word of God reaches 
                  beyond borders, touching lives across the globe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Become Part of Our Story</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            God is still writing amazing chapters through Global Power Church, and we'd love for you to be part of what He's doing.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
