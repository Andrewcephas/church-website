import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/gpc-logo.png" alt="GPC Logo" className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <span className="font-bold text-lg">Global Power Church</span>
            </div>
          </div>
          
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} Global Power Church. All rights reserved.
          </p>
          
          <a 
            href="https://catech.co.ke" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-primary transition-colors text-sm font-medium flex items-center gap-1"
          >
            <Heart className="w-3 h-3" />
            Catech Solutions & Graphics
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
