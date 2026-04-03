
import { Link } from "react-router-dom";
import { Phone, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  const whatsappLink = "https://wa.me/254704129211?text=Hello%20Global%20Power%20Church";

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Church Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-bold text-lg">Global Power Church</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A spirit-filled ministry led by Bishop Paul Ndolo Mulu. Experience God's power and transformation.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="tel:+254704129211" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <Phone className="h-4 w-4" /> 0704 129 211
              </a>
              <a href="mailto:paulndolo1972@gmail.com" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <Mail className="h-4 w-4" /> paulndolo1972@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link to="/about" className="block hover:text-red-500 transition-colors">About Us</Link>
              <Link to="/ministries" className="block hover:text-red-500 transition-colors">Ministries</Link>
              <Link to="/events" className="block hover:text-red-500 transition-colors">Events</Link>
              <Link to="/sermons" className="block hover:text-red-500 transition-colors">Sermons</Link>
              <Link to="/give" className="block hover:text-red-500 transition-colors">Give</Link>
              <Link to="/contact" className="block hover:text-red-500 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="font-bold mb-4">Service Times</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Sunday Service — Every Sunday</p>
              <p>Thursday Prayers — 4:00–6:00 PM</p>
              <p>Friday Kesha — Night Service</p>
              <p>Saturday Devotion — 6:00–7:00 AM</p>
            </div>
          </div>

          {/* Social & Connect */}
          <div>
            <h3 className="font-bold mb-4">Connect With Us</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="https://www.youtube.com/@GLOBALPOWERCHURCH" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <ExternalLink className="h-4 w-4" /> YouTube
              </a>
              <a href="https://www.facebook.com/groups/1202497280341977" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <ExternalLink className="h-4 w-4" /> Facebook Group
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <ExternalLink className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Global Power Church. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Designed by{" "}
            <a href="https://catech.co.ke" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
              Catech Solutions & Graphics
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
