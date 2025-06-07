
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Book, Bell, Phone, Mail } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background pt-16 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Welcome Home
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Experience God's Love
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join our loving community where faith meets fellowship, and every person matters in God's story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Plan Your Visit
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch Online
            </Button>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us This Weekend</h2>
            <p className="text-lg text-muted-foreground">Multiple service times to fit your schedule</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Saturday Evening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">6:00 PM</p>
                <p className="text-muted-foreground">Contemporary Service</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Sunday Morning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">9:00 AM</p>
                <p className="text-muted-foreground">Traditional Service</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Sunday Evening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">6:00 PM</p>
                <p className="text-muted-foreground">Youth & Family</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Ministries */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Place</h2>
            <p className="text-lg text-muted-foreground">Discover meaningful ways to connect and grow</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Small Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">Connect deeply through Bible study and fellowship</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Book className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Discipleship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">Grow in your faith journey with guided learning</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Community Outreach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">Serve our neighbors and share God's love</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Special Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">Join us for seasonal celebrations and gatherings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Connected</h2>
            <p className="text-lg text-muted-foreground">We'd love to hear from you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground">(555) 123-4567</p>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground">info@churchname.org</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-muted-foreground">123 Faith Street<br />Your City, ST 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <Bell className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg mb-8 opacity-90">Get weekly updates, prayer requests, and event notifications</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-foreground"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
