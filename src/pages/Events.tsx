
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      title: "Christmas Eve Service",
      date: "December 24, 2023",
      time: "6:00 PM",
      location: "Main Sanctuary",
      category: "Worship",
      description: "Join us for a special Christmas Eve service celebrating the birth of Jesus Christ.",
      spots: "Unlimited"
    },
    {
      title: "New Year Prayer Service",
      date: "December 31, 2023",
      time: "11:00 PM",
      location: "Main Sanctuary",
      category: "Worship",
      description: "Ring in the new year with prayer, worship, and reflection on God's faithfulness.",
      spots: "Unlimited"
    },
    {
      title: "Men's Breakfast",
      date: "January 6, 2024",
      time: "8:00 AM",
      location: "Fellowship Hall",
      category: "Fellowship",
      description: "Monthly breakfast gathering for men with food, fellowship, and devotional time.",
      spots: "30 available"
    },
    {
      title: "Women's Bible Study",
      date: "January 9, 2024",
      time: "7:00 PM",
      location: "Room 201",
      category: "Study",
      description: "Weekly Bible study for women focusing on spiritual growth and community.",
      spots: "5 spots left"
    },
    {
      title: "Youth Winter Retreat",
      date: "January 12-14, 2024",
      time: "All Day",
      location: "Mountain View Camp",
      category: "Youth",
      description: "Three-day retreat for middle and high school students with fun activities and spiritual growth.",
      spots: "Registration required"
    },
    {
      title: "Community Service Day",
      date: "January 20, 2024",
      time: "9:00 AM",
      location: "Various Locations",
      category: "Outreach",
      description: "Join us in serving our community through various service projects.",
      spots: "50 volunteers needed"
    }
  ];

  const categories = ["All", "Worship", "Fellowship", "Study", "Youth", "Outreach"];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Events</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join us for meaningful events that build community and deepen faith
          </p>
        </div>
      </section>

      {/* Event Filters */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-red-600 hover:bg-red-700 text-white" : "border-red-600 text-red-600 hover:bg-red-50"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Upcoming Events</h2>
            <p className="text-lg text-gray-600">Don't miss these exciting opportunities to connect and grow</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant="secondary" 
                      className={`
                        ${event.category === 'Worship' ? 'bg-red-100 text-red-800' : ''}
                        ${event.category === 'Fellowship' ? 'bg-blue-100 text-blue-800' : ''}
                        ${event.category === 'Study' ? 'bg-green-100 text-green-800' : ''}
                        ${event.category === 'Youth' ? 'bg-purple-100 text-purple-800' : ''}
                        ${event.category === 'Outreach' ? 'bg-orange-100 text-orange-800' : ''}
                      `}
                    >
                      {event.category}
                    </Badge>
                    <span className="text-sm text-gray-500">{event.spots}</span>
                  </div>
                  <CardTitle className="text-black mb-3">{event.title}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-red-600" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-red-600" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-red-600" />
                      {event.location}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{event.description}</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                      Register
                    </Button>
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Full Event Calendar</h2>
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <div className="w-full h-64 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Calendar className="h-16 w-16 text-red-600 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive calendar view coming soon</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    View Full Calendar
                  </Button>
                  <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    Subscribe to Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Hosting */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Want to Host an Event?</h2>
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Have an idea for a church event or ministry gathering? We'd love to help you make it happen! 
                  Our facilities are available for church-related activities and community outreach.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    <Users className="h-5 w-5 mr-2" />
                    Submit Event Proposal
                  </Button>
                  <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    View Facility Guidelines
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

export default Events;
