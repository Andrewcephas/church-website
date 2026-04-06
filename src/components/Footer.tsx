import { Link } from "react-router-dom";
import { Phone, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  const whatsappLink = "https://wa.me/254704129211?text=Hello%20Global%20Power%20Church";

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/gpc-logo.jpg" alt="GPC Logo" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-bold text-lg">Global Power Church</span>
            </div>
            <p className="text-accent-foreground/70 text-sm mb-4">
              A spirit-filled ministry led by Bishop Paul Ndolo Mulu. Jeremiah 1:10 — Experience God's power and transformation.
            </p>
            <div className="space-y-2 text-sm text-accent-foreground/70">
              <a href="tel:+254704129211" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="h-4 w-4" /> 0704 129 211
              </a>
              <a href="mailto:paulndolo1972@gmail.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Mail className="h-4 w-4" /> paulndolo1972@gmail.com
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm text-accent-foreground/70">
              <Link to="/about" className="block hover:text-secondary transition-colors">About Us</Link>
              <Link to="/ministries" className="block hover:text-secondary transition-colors">Ministries</Link>
              <Link to="/events" className="block hover:text-secondary transition-colors">Events</Link>
              <Link to="/sermons" className="block hover:text-secondary transition-colors">Sermons</Link>
              <Link to="/give" className="block hover:text-secondary transition-colors">Give</Link>
              <Link to="/contact" className="block hover:text-secondary transition-colors">Contact</Link>
              <Link to="/prayer-request" className="block hover:text-secondary transition-colors">Prayer Request</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Service Times</h3>
            <div className="space-y-2 text-sm text-accent-foreground/70">
              <p>Sunday Service — Every Sunday</p>
              <p>Thursday Prayers — 4:00–6:00 PM</p>
              <p>Friday Kesha — Night Service</p>
              <p>Saturday Devotion — 6:00–7:00 AM</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect With Us</h3>
            <div className="space-y-2 text-sm text-accent-foreground/70">
              <a href="https://www.youtube.com/@GLOBALPOWERCHURCH" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <ExternalLink className="h-4 w-4" /> YouTube
              </a>
              <a href="https://www.facebook.com/groups/1202497280341977" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <ExternalLink className="h-4 w-4" /> Facebook Group
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <ExternalLink className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-accent-foreground/20 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-accent-foreground/50">
          <p>© {new Date().getFullYear()} Global Power Church. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Designed by{" "}
            <a href="https://catech.co.ke" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 transition-colors">
              Catech Solutions & Graphics
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
