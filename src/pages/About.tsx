
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Book } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">About Global Power Church</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A spirit-filled ministry led by Bishop Paul Ndolo Mulu, dedicated to transforming lives through the power of God.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/about/our-story">
              <Card className="hover:shadow-lg transition-shadow border-gray-200 h-full">
                <CardHeader className="text-center">
                  <Book className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <CardTitle className="text-black">Our Story</CardTitle>
                  <CardDescription>The journey of Global Power Church</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center mb-4">
                    Discover how Bishop Paul Ndolo Mulu founded this ministry and the amazing journey God has taken us on.
                  </p>
                  <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">Read Our Story</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/about/mission">
              <Card className="hover:shadow-lg transition-shadow border-gray-200 h-full">
                <CardHeader className="text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <CardTitle className="text-black">Mission & Vision</CardTitle>
                  <CardDescription>Our purpose and direction</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center mb-4">
                    Learn about our mission to spread God's power and transform lives across the nations.
                  </p>
                  <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">Our Mission</Button>
                </CardContent>
              </Card>
            </Link>
            <Link to="/about/leadership">
              <Card className="hover:shadow-lg transition-shadow border-gray-200 h-full">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <CardTitle className="text-black">Leadership</CardTitle>
                  <CardDescription>Meet Bishop Paul Ndolo Mulu</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center mb-4">
                    Get to know our Bishop and the ministry leaders who guide our church with wisdom and love.
                  </p>
                  <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">Meet Our Team</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Power", desc: "We believe in the transformative power of the Holy Spirit" },
              { title: "Faith", desc: "Walking by faith and trusting God in all things" },
              { title: "Community", desc: "Growing together as a family of believers" },
              { title: "Service", desc: "Serving God by serving others with love" },
            ].map((v, i) => (
              <Card key={i} className="text-center border-gray-200">
                <CardHeader><CardTitle className="text-red-600">{v.title}</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">{v.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
