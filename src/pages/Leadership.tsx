
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const Leadership = () => {
  const leaders = [
    {
      name: "Pastor John Smith",
      title: "Senior Pastor",
      bio: "Pastor John has been leading our church since 1985. He holds a Master of Divinity from Seminary and is passionate about expository preaching and discipleship.",
      email: "pastor.john@church.org",
      phone: "(555) 123-4567"
    },
    {
      name: "Pastor Sarah Johnson",
      title: "Associate Pastor",
      bio: "Pastor Sarah joined our team in 2010 and oversees our worship ministry and women's programs. She brings a heart for worship and community building.",
      email: "pastor.sarah@church.org",
      phone: "(555) 123-4568"
    },
    {
      name: "Pastor Mike Davis",
      title: "Youth Pastor",
      bio: "Pastor Mike leads our youth ministry and young adult programs. He's been with us since 2015 and has a passion for reaching the next generation.",
      email: "pastor.mike@church.org",
      phone: "(555) 123-4569"
    },
    {
      name: "Pastor Lisa Williams",
      title: "Children's Pastor",
      bio: "Pastor Lisa oversees our children's ministry and family programs. She joined our team in 2018 and loves helping kids discover God's love.",
      email: "pastor.lisa@church.org",
      phone: "(555) 123-4570"
    }
  ];

  const elders = [
    { name: "Robert Thompson", role: "Elder Chairman" },
    { name: "Mary Anderson", role: "Elder" },
    { name: "David Wilson", role: "Elder" },
    { name: "Jennifer Martinez", role: "Elder" }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Our Leadership</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Meet the passionate leaders who guide our church with wisdom, love, and dedication
          </p>
        </div>
      </section>

      {/* Pastoral Staff */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Pastoral Staff</h2>
            <p className="text-lg text-gray-600">Our dedicated pastors who serve our congregation</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {leaders.map((leader, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-xl">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-black">{leader.name}</CardTitle>
                      <p className="text-red-600 font-medium">{leader.title}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{leader.bio}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-red-600" />
                      {leader.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-red-600" />
                      {leader.phone}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Elders */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Board of Elders</h2>
            <p className="text-lg text-gray-600">Committed leaders who provide spiritual guidance and oversight</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {elders.map((elder, index) => (
              <Card key={index} className="text-center border-gray-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-red-600 font-bold">
                      {elder.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-black">{elder.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-600 font-medium">{elder.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Our Leadership Philosophy</h2>
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our leadership team is committed to servant leadership, following the example of Jesus Christ. 
                  We believe in leading with humility, transparency, and a heart for God's people.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Each member of our leadership team is called to equip the saints for the work of ministry, 
                  building up the body of Christ until we all reach unity in the faith and knowledge of the Son of God.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
