
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Index from "@/pages/Index";
import About from "@/pages/About";
import OurStory from "@/pages/OurStory";
import Mission from "@/pages/Mission";
import Leadership from "@/pages/Leadership";
import Ministries from "@/pages/Ministries";
import Sermons from "@/pages/Sermons";
import Events from "@/pages/Events";
import Give from "@/pages/Give";
import LiveStream from "@/pages/LiveStream";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/our-story" element={<OurStory />} />
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/leadership" element={<Leadership />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/events" element={<Events />} />
            <Route path="/give" element={<Give />} />
            <Route path="/live" element={<LiveStream />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
