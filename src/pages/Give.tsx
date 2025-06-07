
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, CreditCard, Smartphone, DollarSign, Globe, Users } from "lucide-react";

const Give = () => {
  const givingOptions = [
    {
      icon: CreditCard,
      title: "Online Giving",
      description: "Safe and secure online donations with credit card or bank transfer",
      features: ["One-time or recurring", "Multiple payment options", "Instant confirmation"]
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Give on the go with our mobile giving app",
      features: ["Quick and easy", "Touch ID security", "Giving history"]
    },
    {
      icon: DollarSign,
      title: "Text to Give",
      description: "Text your donation amount to our secure giving number",
      features: ["Text GIVE to (555) 123-GIVE", "Instant setup", "Receipt via text"]
    }
  ];

  const givingImpact = [
    {
      title: "Local Missions",
      description: "Supporting families and individuals in our community",
      impact: "200+ families helped monthly"
    },
    {
      title: "Youth Programs",
      description: "Investing in the next generation through camps and activities",
      impact: "150+ youth impacted annually"
    },
    {
      title: "Global Missions",
      description: "Supporting missionaries and projects around the world",
      impact: "12 mission fields supported"
    },
    {
      title: "Building Fund",
      description: "Maintaining and improving our church facilities",
      impact: "Recent renovations completed"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Give</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Partner with us in advancing God's kingdom through generous giving
          </p>
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
            <Heart className="h-5 w-5 mr-2" />
            Give Now
          </Button>
        </div>
      </section>

      {/* Giving Philosophy */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Why We Give</h2>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-8">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  "Each of you should give what you have decided in your heart to give, not reluctantly 
                  or under compulsion, for God loves a cheerful giver."
                </p>
                <p className="text-red-600 font-medium">- 2 Corinthians 9:7</p>
              </CardContent>
            </Card>
            <p className="text-lg text-gray-600 leading-relaxed mt-8">
              We believe that giving is an act of worship and a way to participate in God's work 
              in our community and around the world. Your generous gifts help us fulfill our mission 
              and serve others in Jesus' name.
            </p>
          </div>

          {/* Giving Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {givingOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <CardTitle className="text-black">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-center">{option.description}</p>
                    <ul className="space-y-2 mb-6">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Give This Way
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Giving Impact */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Your Impact</h2>
            <p className="text-lg text-gray-600">See how your generosity is making a difference</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {givingImpact.map((item, index) => (
              <Card key={index} className="text-center border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {item.impact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Funds */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Special Giving Opportunities</h2>
            <p className="text-lg text-gray-600">Support specific ministries and projects</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="h-8 w-8 text-red-600" />
                  <CardTitle className="text-black">Mission Trip Fund</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Help sponsor our upcoming mission trip to Guatemala where we'll be building homes 
                  and sharing the Gospel with local communities.
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Raised: $8,500</span>
                    <span>Goal: $15,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '57%'}}></div>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Support Missions
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-8 w-8 text-red-600" />
                  <CardTitle className="text-black">Youth Scholarship Fund</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Provide scholarships for youth who want to attend summer camp but need financial assistance. 
                  Help us make camp accessible to every student.
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Raised: $3,200</span>
                    <span>Goal: $5,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '64%'}}></div>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Support Youth
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legacy Giving */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Legacy Giving</h2>
            <p className="text-lg mb-8 opacity-90 leading-relaxed">
              Consider including our church in your estate planning. Legacy gifts help ensure that 
              future generations will continue to experience God's love and grace through our ministry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                Learn About Legacy Giving
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                Contact Our Pastor
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Give;
