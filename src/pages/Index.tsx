/**
 * @file Index.tsx
 * @description Home page for HaiEduTech Platform — lazy loads below-fold sections.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { lazy, Suspense, useEffect, useState, useRef, ComponentType } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursesOverview from "@/components/CoursesOverview";
import Footer from "@/components/Footer";

// Lazy load heavy below-fold components
const UpcomingCourses = lazy(() => import("@/components/UpcomingCourses"));
const LearningRoadmaps = lazy(() => import("@/components/LearningRoadmaps"));
const SuccessMetrics = lazy(() => import("@/components/SuccessMetrics"));
const SocialProof = lazy(() => import("@/components/SocialProof"));
const KnowledgeHub = lazy(() => import("@/components/KnowledgeHub"));
const AssessmentTool = lazy(() => import("@/components/AssessmentTool"));
const AIGradingPreview = lazy(() => import("@/components/AIGradingPreview"));
const DashboardPreview = lazy(() => import("@/components/DashboardPreview"));

const SectionPlaceholder = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="animate-spin w-6 h-6 border-3 border-primary border-t-transparent rounded-full" />
  </div>
);

/** Renders children only when the wrapper scrolls into view */
const LazySection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible ? (
        <Suspense fallback={<SectionPlaceholder />}>{children}</Suspense>
      ) : (
        <SectionPlaceholder />
      )}
    </div>
  );
};

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <CoursesOverview />
    <LazySection><UpcomingCourses /></LazySection>
    <LazySection><LearningRoadmaps /></LazySection>
    <LazySection><SuccessMetrics /></LazySection>
    <LazySection><SocialProof /></LazySection>
    <LazySection><KnowledgeHub /></LazySection>
    <LazySection><AssessmentTool /></LazySection>
    <LazySection><AIGradingPreview /></LazySection>
    <LazySection><DashboardPreview /></LazySection>
    <Footer />
  </div>
);

export default Index;
