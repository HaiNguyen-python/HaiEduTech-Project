/**
 * @file Index.tsx
 * @description Home page for HaiEduTech Platform - lazy loads below-fold sections.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { lazy, Suspense, useEffect, useState, useRef, ComponentType } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursesOverview from "@/components/CoursesOverview";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

// Lazy load heavy below-fold components
// Upcoming Courses removed from home page per request
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
    <SEO
      title="HaiEduTech | Data-Driven Education & AI-Powered Learning"
      description="Master English, Chinese & Programming with an AI-powered personalized learning path. Data-driven education by HaiEduTech - IELTS, TOEIC, HSK, Finnish YKI, Python & global study abroad guidance."
      path="/"
      locale="en_US"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "HaiEduTech Learning Programs",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Learn IELTS", "url": "https://haiedutech.com/english/ielts" },
          { "@type": "ListItem", "position": 2, "name": "Learn HSK Chinese", "url": "https://haiedutech.com/chinese/hsk-guide" },
          { "@type": "ListItem", "position": 3, "name": "Learn TOEIC", "url": "https://haiedutech.com/english/toeic" },
          { "@type": "ListItem", "position": 4, "name": "Learn Finnish YKI", "url": "https://haiedutech.com/finnish" },
          { "@type": "ListItem", "position": 5, "name": "Learn Python Programming", "url": "https://haiedutech.com/programming" },
          { "@type": "ListItem", "position": 6, "name": "Study Abroad Consulting", "url": "https://haiedutech.com/study-abroad" }
        ]
      }}
    />
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
