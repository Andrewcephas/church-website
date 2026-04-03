
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Book, Heart, Phone, Mail, Play, MapPin, Music } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/254704129211?text=Hello%20Global%20Power%20Church";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-50 to-white pt-16 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-red-100 text-red-800 border-red-200">
            Welcome to Global Power Church
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            Experience God's Power & Transformation
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Led by Bishop Paul Ndolo Mulu — a spirit-filled community where lives are transformed by God's power.
          </p>
          <p className="text-lg text-red-600 font-semibold mb-8">Daily & Weekly Themes with Spiritual Points</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 bg-red-600 hover:bg-red-700 text-white">
                Plan Your Visit
              </Button>
            </Link>
            <a href="https://www.youtube.com/@GLOBALPOWERCHURCH" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-lg px-8 border-red-600 text-red-600 hover:bg-red-50">
                <Play className="h-5 w-5 mr-2" />
                Watch Online
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Join Us This Week</h2>
            <p className="text-lg text-gray-600">Multiple services throughout the week</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-black">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Sunday Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2 text-red-600">Every Sunday</p>
                <p className="text-gray-600">Main Sunday Service</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-black">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Thursday Prayers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2 text-red-600">4:00–6:00 PM</p>
                <p className="text-gray-600">Prayer Meeting</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-black">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Friday Kesha
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2 text-red-600">Night Service</p>
                <p className="text-gray-600">All-Night Prayer</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-black">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Saturday Devotion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2 text-red-600">6:00–7:00 AM</p>
                <p className="text-gray-600">Morning Devotion</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ministries Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Our Ministries</h2>
            <p className="text-lg text-gray-600">Find your place and grow in faith</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Music, title: "Choir & Praise", desc: "Worship through music and song" },
              { icon: Users, title: "Youth Ministry", desc: "Empowering the next generation" },
              { icon: Heart, title: "Women Ministry", desc: "Growing together in faith" },
              { icon: Book, title: "Crusades", desc: "Evangelism and outreach" },
            ].map((item, i) => (
              <Link to="/ministries" key={i}>
                <Card className="hover:shadow-lg transition-shadow border-gray-200 h-full">
                  <CardHeader className="text-center">
                    <item.icon className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <CardTitle className="text-black">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/ministries">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                View All Ministries
              </Button>
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
            <a href="tel:+254704129211" className="text-center group">
              <Phone className="h-8 w-8 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2 text-black">Call Us</h3>
              <p className="text-gray-600 group-hover:text-red-600 transition-colors">0704 129 211</p>
            </a>
            <a href="mailto:paulndolo1972@gmail.com" className="text-center group">
              <Mail className="h-8 w-8 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2 text-black">Email Us</h3>
              <p className="text-gray-600 group-hover:text-red-600 transition-colors">paulndolo1972@gmail.com</p>
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-center group">
              <MapPin className="h-8 w-8 mx-auto mb-4 text-red-600" />
              <h3 className="font-semibold mb-2 text-black">WhatsApp</h3>
              <p className="text-gray-600 group-hover:text-red-600 transition-colors">Chat with us</p>
            </a>
          </div>
        </div>
      </section>

      {/* Give CTA */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="container mx-auto text-center">
          <Heart className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support the Ministry</h2>
          <p className="text-lg mb-8 opacity-90">Partner with Global Power Church through your generous giving</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              Give via WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
