
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Users, Calendar, Book, Heart, Play, Phone, ChevronDown } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  const navItems = [
    { 
      name: "About", 
      href: "/about", 
      icon: Users,
      hasDropdown: true,
      dropdownItems: [
        { name: "Our Story", href: "/about/our-story" },
        { name: "Mission", href: "/about/mission" },
        { name: "Leadership", href: "/about/leadership" }
      ]
    },
    { name: "Ministries", href: "/ministries", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Sermons", href: "/sermons", icon: Book },
    { name: "Give", href: "/give", icon: Heart },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-xl text-black">Church Name</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowAboutDropdown(true)}
                    onMouseLeave={() => setShowAboutDropdown(false)}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-1 text-sm font-medium text-black hover:text-red-600 transition-colors"
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                    {showAboutDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-black hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="text-sm font-medium text-black hover:text-red-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/live">
              <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                <Play className="h-4 w-4 mr-2" />
                Watch Live
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                Visit Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="font-bold text-xl text-black">Church Name</span>
                </div>
                
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className="flex items-center gap-3 text-lg font-medium text-black hover:text-red-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                      {item.hasDropdown && (
                        <div className="ml-8 mt-2 space-y-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="block text-sm text-gray-600 hover:text-red-600 transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                <div className="border-t pt-6 space-y-3">
                  <Link to="/live" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Live
                    </Button>
                  </Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Visit Us
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
