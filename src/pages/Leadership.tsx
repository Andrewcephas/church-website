
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const Leadership = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Our Leadership</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Meet the anointed leaders who guide Global Power Church
          </p>
        </div>
      </section>

      {/* Bishop */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-3xl">PNM</span>
                </div>
                <div className="text-center md:text-left">
                  <CardTitle className="text-2xl text-black">Bishop Paul Ndolo Mulu</CardTitle>
                  <p className="text-red-600 font-medium text-lg">Founder & Senior Bishop</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Bishop Paul Ndolo Mulu is the founder and spiritual leader of Global Power Church. 
                Called by God to demonstrate His power and transform lives, Bishop Mulu has dedicated 
                his life to preaching the uncompromised Gospel, conducting powerful crusades, and raising 
                a generation of spirit-filled believers. Under his leadership, the church has grown into 
                a vibrant community with multiple ministries, yearly conferences, and a strong digital presence 
                reaching believers worldwide through YouTube and Facebook.
              </p>
              <div className="space-y-2">
                <a href="mailto:paulndolo1972@gmail.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                  <Mail className="h-4 w-4 text-red-600" /> paulndolo1972@gmail.com
                </a>
                <a href="tel:+254704129211" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                  <Phone className="h-4 w-4 text-red-600" /> 0704 129 211
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ministry Leaders */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Ministry Leaders</h2>
            <p className="text-lg text-gray-600">Dedicated servants leading each ministry department</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { dept: "Choir Ministry", role: "Choir Director" },
              { dept: "Praise & Worship", role: "Worship Leader" },
              { dept: "Dance Ministry", role: "Dance Coordinator" },
              { dept: "Youth Ministry", role: "Youth Leader" },
              { dept: "Women Ministry", role: "Women Leader" },
              { dept: "Men Ministry", role: "Men Leader" },
              { dept: "Hospitality", role: "Hospitality Coordinator" },
              { dept: "Crusades & Outreach", role: "Outreach Director" },
            ].map((leader, i) => (
              <Card key={i} className="text-center border-gray-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-red-600 font-bold">{leader.dept[0]}</span>
                  </div>
                  <CardTitle className="text-lg text-black">{leader.dept}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-600 font-medium">{leader.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Our Leadership Philosophy</h2>
          <Card className="border-gray-200">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Global Power Church, we believe in servant leadership modeled after Jesus Christ. 
                Our leaders are anointed, accountable, and dedicated to equipping every believer 
                to walk in their God-given purpose and power.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Under Bishop Paul Ndolo Mulu's guidance, every ministry leader operates with integrity, 
                spiritual authority, and a heart for God's people.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
