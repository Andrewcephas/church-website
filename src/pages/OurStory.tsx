
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Heart, Book } from "lucide-react";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Our Story</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A journey of faith, community, and God's amazing grace
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 text-black">How It All Began</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our church was founded in 1985 with a simple vision: to create a place where people could 
                encounter God's love and find authentic community. What started as a small group of families 
                meeting in a living room has grown into a vibrant congregation of over 500 members.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-black">
                    <Calendar className="h-6 w-6 text-red-600" />
                    1985 - The Beginning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Pastor John and Mary Smith felt called to plant a church in our community. 
                    They began with Bible studies in their home, gathering neighbors and friends 
                    who were seeking spiritual growth and fellowship.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-black">
                    <Users className="h-6 w-6 text-red-600" />
                    1987 - First Building
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    As our congregation grew to 50 members, we purchased our first building - 
                    a small warehouse that we converted into a sanctuary. Every member 
                    contributed their time and skills to make it a beautiful place of worship.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-black">
                    <Heart className="h-6 w-6 text-red-600" />
                    1995 - Community Outreach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We launched our first community outreach programs, including a food bank 
                    and youth mentorship program. This marked the beginning of our commitment 
                    to serving our neighbors beyond the church walls.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-black">
                    <Book className="h-6 w-6 text-red-600" />
                    2010 - New Sanctuary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    With a growing congregation of 300 members, we built our current sanctuary. 
                    This modern facility allows us to worship together, host community events, 
                    and continue expanding our ministries.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-black">
                    <Users className="h-6 w-6 text-red-600" />
                    Today - Growing Strong
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Today, we are a thriving community of over 500 members, with multiple 
                    ministries, weekly small groups, and ongoing mission work both locally 
                    and internationally. Our story continues as God writes new chapters 
                    through each person who joins our family.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Become Part of Our Story</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            We believe that God is still writing amazing chapters in our church's story, 
            and we'd love for you to be part of what comes next.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
