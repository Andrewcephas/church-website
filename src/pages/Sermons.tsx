
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";

const YOUTUBE_URL = "https://www.youtube.com/@GLOBALPOWERCHURCH";
const FACEBOOK_URL = "https://www.facebook.com/groups/1202497280341977";

const Sermons = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Sermons</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Be encouraged and transformed by powerful sermons from Bishop Paul Ndolo Mulu
          </p>
          <p className="text-lg text-red-600 font-semibold mb-8">Daily & Weekly Themes with Spiritual Points</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Play className="h-5 w-5 mr-2" />
                Watch on YouTube
              </Button>
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                <ExternalLink className="h-5 w-5 mr-2" />
                Join Facebook Group
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* YouTube Embed */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Latest Sermons</h2>
            <p className="text-lg text-gray-600">Watch our latest messages from Bishop Paul Ndolo Mulu</p>
          </div>

          <Card className="border-gray-200 mb-8">
            <CardContent className="p-0">
              <div className="w-full aspect-video bg-black rounded-t-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed?listType=user_uploads&list=GLOBALPOWERCHURCH"
                  title="Global Power Church Sermons"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6 text-center">
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    <Play className="h-5 w-5 mr-2" />
                    View All Sermons on YouTube
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Where to Watch */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Where to Watch & Connect</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Play className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-bold text-black mb-2">YouTube</h3>
                <p className="text-gray-600 mb-6">Watch live services, sermons, and special events on our YouTube channel.</p>
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Subscribe on YouTube
                  </Button>
                </a>
              </CardContent>
            </Card>
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <ExternalLink className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-bold text-black mb-2">Facebook Group</h3>
                <p className="text-gray-600 mb-6">Join our Facebook community for discussions, prayer, and sermon highlights.</p>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Join Facebook Group
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sermons;
