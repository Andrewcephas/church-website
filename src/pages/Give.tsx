
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/254704129211?text=Hello%2C%20I%20would%20like%20to%20give%20to%20Global%20Power%20Church";

const Give = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Give</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Partner with Global Power Church in advancing God's kingdom through your generous giving
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Heart className="h-5 w-5 mr-2" />
              Give Now via WhatsApp
            </Button>
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Why We Give</h2>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-8">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  "Each of you should give what you have decided in your heart to give, not reluctantly 
                  or under compulsion, for God loves a cheerful giver."
                </p>
                <p className="text-red-600 font-medium">— 2 Corinthians 9:7</p>
              </CardContent>
            </Card>
            <p className="text-lg text-gray-600 leading-relaxed mt-8">
              Your giving supports the work of God through Global Power Church — from crusades and 
              conferences to youth programs and community outreach. Every contribution makes a difference 
              in advancing God's kingdom under Bishop Paul Ndolo Mulu's ministry.
            </p>
          </div>

          {/* How to Give */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">How to Give</h2>
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Heart className="h-16 w-16 mx-auto mb-6 text-red-600" />
                <h3 className="text-2xl font-bold text-black mb-4">Give via WhatsApp</h3>
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                  To give your tithes, offerings, or special donations, simply send a message via WhatsApp 
                  to receive giving instructions and confirmation.
                </p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    Send WhatsApp Message
                  </Button>
                </a>
                <p className="text-sm text-gray-500 mt-4">WhatsApp: 0704 129 211</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Your Giving Makes a Difference</h2>
          <p className="text-lg mb-8 opacity-90 leading-relaxed">
            Through your generosity, Global Power Church is able to conduct crusades, 
            hold yearly conferences, support our ministries, and reach more souls for Christ. 
            Thank you for being a faithful partner in God's work.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              Give Now
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Give;
