
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Book, Globe } from "lucide-react";

const Mission = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Mission & Vision</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our purpose, passion, and direction as a church community
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Our Mission</h2>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-8">
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed">
                  "To make disciples of Jesus Christ who love God, love others, and serve the world 
                  through authentic community, biblical teaching, and compassionate action."
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mission Breakdown */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <CardTitle className="text-black">Love God</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We worship God with all our heart, soul, mind, and strength through 
                  prayer, worship, and devotion.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <CardTitle className="text-black">Love Others</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We build authentic relationships and care for one another as family, 
                  creating a welcoming community for all.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Book className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <CardTitle className="text-black">Make Disciples</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We help people grow in their faith through biblical teaching, 
                  mentorship, and spiritual development.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <CardTitle className="text-black">Serve the World</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We reach out to our community and beyond with compassion, 
                  justice, and the good news of Jesus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Our Vision</h2>
            <Card className="border-gray-200">
              <CardContent className="p-8">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  "To be a church where every person experiences the transforming love of Jesus Christ 
                  and discovers their God-given purpose in life."
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We envision a community where people from all walks of life find hope, healing, 
                  and purpose. A place where families are strengthened, lives are transformed, 
                  and the love of Christ is demonstrated through our actions both within our 
                  congregation and throughout our community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-red-600">Scripture-Centered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe the Bible is God's Word and the foundation for all we believe and do.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-red-600">Grace-Filled</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We extend the same grace we've received from God to everyone we encounter.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-red-600">Community-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe life is better together and prioritize authentic relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-red-600">Mission-Minded</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We actively share God's love through service and evangelism locally and globally.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
