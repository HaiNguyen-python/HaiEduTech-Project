import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursesOverview from "@/components/CoursesOverview";
import AIGradingPreview from "@/components/AIGradingPreview";
import DashboardPreview from "@/components/DashboardPreview";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <CoursesOverview />
    <AIGradingPreview />
    <DashboardPreview />
    <Footer />
  </div>
);

export default Index;
