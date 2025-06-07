
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Book, Music, Baby, Gamepad2, Globe, Utensils } from "lucide-react";

const Ministries = () => {
  const ministries = [
    {
      icon: Users,
      title: "Small Groups",
      description: "Connect with others in intimate Bible study and fellowship groups that meet throughout the week.",
      details: "Various times and locations available",
      contact: "Contact: groups@church.org"
    },
    {
      icon: Music,
      title: "Worship Ministry",
      description: "Join our worship team and use your musical gifts to lead others in praising God.",
      details: "Rehearsals: Wednesdays 7 PM",
      contact: "Contact: worship@church.org"
    },
    {
      icon: Baby,
      title: "Children's Ministry",
      description: "Nurturing children from birth through 5th grade in a safe, fun, and faith-building environment.",
      details: "Sundays during all services",
      contact: "Contact: kids@church.org"
    },
    {
      icon: Gamepad2,
      title: "Youth Ministry",
      description: "Engaging middle and high school students with relevant teaching and authentic community.",
      details: "Wednesdays 6:30 PM",
      contact: "Contact: youth@church.org"
    },
    {
      icon: Heart,
      title: "Community Outreach",
      description: "Serving our neighbors through food banks, community service, and mission projects.",
      details: "Various opportunities monthly",
      contact: "Contact: outreach@church.org"
    },
    {
      icon: Book,
      title: "Bible Study",
      description: "Deep dive into God's Word with weekly Bible studies for all ages and experience levels.",
      details: "Multiple times available",
      contact: "Contact: study@church.org"
    },
    {
      icon: Users,
      title: "Men's Ministry",
      description: "Building strong Christian men through fellowship, accountability, and service opportunities.",
      details: "Saturdays 7 AM",
      contact: "Contact: men@church.org"
    },
    {
      icon: Heart,
      title: "Women's Ministry",
      description: "Empowering women to grow in faith and build meaningful relationships with other women.",
      details: "Tuesdays 7 PM",
      contact: "Contact: women@church.org"
    },
    {
      icon: Globe,
      title: "Missions",
      description: "Supporting global missions and organizing mission trips to serve communities worldwide.",
      details: "Monthly meetings",
      contact: "Contact: missions@church.org"
    },
    {
      icon: Utensils,
      title: "Hospitality Ministry",
      description: "Welcoming guests and providing meals for church events and families in need.",
      details: "As needed",
      contact: "Contact: hospitality@church.org"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Ministries</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover meaningful ways to connect, grow, and serve in our church community
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
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
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-red-600">{ministry.details}</p>
                      <p className="text-sm text-gray-500">{ministry.contact}</p>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Ready to Get Involved?</h2>
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We believe everyone has a place to serve and grow in our church family. 
                  Whether you're new to faith or have been walking with God for years, 
                  there's a ministry where you can use your gifts and passions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    Contact Us About Ministries
                  </Button>
                  <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    Download Ministry Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ministry Leadership */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Ministry Leadership</h2>
            <p className="text-lg text-gray-600">Our dedicated ministry leaders are here to help you get connected</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg text-black">Small Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tom Wilson</p>
                <p className="text-sm text-red-600">Director</p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Music className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg text-black">Worship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Sarah Johnson</p>
                <p className="text-sm text-red-600">Worship Pastor</p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Baby className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg text-black">Children</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Lisa Williams</p>
                <p className="text-sm text-red-600">Children's Pastor</p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gamepad2 className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg text-black">Youth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Mike Davis</p>
                <p className="text-sm text-red-600">Youth Pastor</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ministries;
