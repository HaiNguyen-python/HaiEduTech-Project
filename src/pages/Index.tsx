import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursesOverview from "@/components/CoursesOverview";
import UpcomingCourses from "@/components/UpcomingCourses";
import LearningRoadmaps from "@/components/LearningRoadmaps";
import SuccessMetrics from "@/components/SuccessMetrics";
import AIGradingPreview from "@/components/AIGradingPreview";
import DashboardPreview from "@/components/DashboardPreview";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <CoursesOverview />
    <UpcomingCourses />
    <LearningRoadmaps />
    <SuccessMetrics />
    <AIGradingPreview />
    <DashboardPreview />
    <Footer />
  </div>
);

export default Index;
