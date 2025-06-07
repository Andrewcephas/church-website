
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Calendar, Users } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["Office: (555) 123-4567", "Emergency: (555) 123-4568"],
      description: "Call us during office hours or for emergencies"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@churchname.org", "pastor@churchname.org"],
      description: "Send us a message and we'll get back to you"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Faith Street", "Your City, ST 12345"],
      description: "Come visit us at our main campus"
    }
  ];

  const officeHours = [
    { day: "Monday - Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 3:00 PM" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "Service Hours Only" }
  ];

  const staffContacts = [
    {
      name: "Pastor John Smith",
      title: "Senior Pastor",
      email: "pastor.john@church.org",
      phone: "(555) 123-4567 ext. 101"
    },
    {
      name: "Sarah Johnson",
      title: "Church Administrator",
      email: "admin@church.org",
      phone: "(555) 123-4567 ext. 102"
    },
    {
      name: "Pastor Mike Davis",
      title: "Youth Pastor",
      email: "youth@church.org",
      phone: "(555) 123-4567 ext. 103"
    },
    {
      name: "Pastor Lisa Williams",
      title: "Children's Pastor",
      email: "children@church.org",
      phone: "(555) 123-4567 ext. 104"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Contact Us</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We'd love to hear from you! Get in touch with questions, prayer requests, or to learn more about our church
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <CardTitle className="text-black">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="font-medium text-gray-800">{detail}</p>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm">{info.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Send Us a Message</h2>
              <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you soon</p>
            </div>
            
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option>General Information</option>
                      <option>Prayer Request</option>
                      <option>Pastoral Care</option>
                      <option>Ministry Information</option>
                      <option>Event Information</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea 
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Please share your message, questions, or prayer requests..."
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="newsletter"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                      I would like to receive church updates and newsletters
                    </label>
                  </div>

                  <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Hours & Staff */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Office Hours */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-black flex items-center gap-3">
                <Clock className="h-8 w-8 text-red-600" />
                Office Hours
              </h2>
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-800">{schedule.day}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Emergency Contact:</strong> For pastoral emergencies outside of office hours, 
                      please call our emergency line at (555) 123-4568.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Staff Directory */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-black flex items-center gap-3">
                <Users className="h-8 w-8 text-red-600" />
                Staff Directory
              </h2>
              <div className="space-y-4">
                {staffContacts.map((staff, index) => (
                  <Card key={index} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold">
                            {staff.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-black">{staff.name}</h3>
                          <p className="text-red-600 text-sm font-medium">{staff.title}</p>
                          <div className="mt-1 space-y-1">
                            <p className="text-xs text-gray-600">{staff.email}</p>
                            <p className="text-xs text-gray-600">{staff.phone}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Visit Us</h2>
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <div className="w-full h-64 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-red-600 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive map coming soon</p>
                    <p className="text-sm text-gray-500 mt-2">123 Faith Street, Your City, ST 12345</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    Get Directions
                  </Button>
                  <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    <Calendar className="h-5 w-5 mr-2" />
                    Plan Your Visit
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

export default Contact;
