import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursesOverview from "@/components/CoursesOverview";
import UpcomingCourses from "@/components/UpcomingCourses";
import LearningRoadmaps from "@/components/LearningRoadmaps";
import SuccessMetrics from "@/components/SuccessMetrics";
import SocialProof from "@/components/SocialProof";
import KnowledgeHub from "@/components/KnowledgeHub";
import AssessmentTool from "@/components/AssessmentTool";
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
    <SocialProof />
    <KnowledgeHub />
    <AssessmentTool />
    <AIGradingPreview />
    <DashboardPreview />
    <Footer />
  </div>
);

export default Index;
