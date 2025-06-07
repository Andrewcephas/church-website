
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Book, Heart, Phone, Mail, Play, MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-50 to-white pt-16 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-red-100 text-red-800 border-red-200">
            Welcome Home
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            Experience God's Love
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our loving community where faith meets fellowship, and every person matters in God's story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 bg-red-600 hover:bg-red-700 text-white">
                Plan Your Visit
              </Button>
            </Link>
            <Link to="/live">
              <Button size="lg" variant="outline" className="text-lg px-8 border-red-600 text-red-600 hover:bg-red-50">
                <Play className="h-5 w-5 mr-2" />
                Watch Online
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Join Us This Weekend</h2>
            <p className="text-lg text-gray-600">Multiple service times to fit your schedule</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-black">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Saturday Evening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2 text-red-600">6:00 PM</p>
                <p className="text-gray-600">Contemporary Service</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-black">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Sunday Morning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2 text-red-600">9:00 AM</p>
                <p className="text-gray-600">Traditional Service</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-black">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Sunday Evening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2 text-red-600">6:00 PM</p>
                <p className="text-gray-600">Youth & Family</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Ministries */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Find Your Place</h2>
            <p className="text-lg text-gray-600">Discover meaningful ways to connect and grow</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/ministries">
              <Card className="hover:shadow-lg transition-shadow border-gray-200 h-full">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <CardTitle className="text-black">Small Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Connect deeply through Bible study and fellowship</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/sermons">
              <Card className="hover:shadow-lg transition-shadow border-gray-200 h-full">
                <CardHeader className="text-center">
                  <Book className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <CardTitle className="text-black">Discipleship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Grow in your faith journey with guided learning</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/ministries">
              <Card className="hover:shadow-lg transition-shadow border-gray-200 h-full">
                <CardHeader className="text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <CardTitle className="text-black">Community Outreach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Serve our neighbors and share God's love</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/events">
              <Card className="hover:shadow-lg transition-shadow border-gray-200 h-full">
                <CardHeader className="text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <CardTitle className="text-black">Special Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Join us for seasonal celebrations and gatherings</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Get Connected</h2>
            <p className="text-lg text-gray-600">We'd love to hear from you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2 text-black">Call Us</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2 text-black">Email Us</h3>
              <p className="text-gray-600">info@churchname.org</p>
            </div>
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2 text-black">Visit Us</h3>
              <p className="text-gray-600">123 Faith Street<br />Your City, ST 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="container mx-auto text-center">
          <Heart className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg mb-8 opacity-90">Get weekly updates, prayer requests, and event notifications</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-black"
            />
            <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
