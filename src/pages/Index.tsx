/**
 * @file Index.tsx
 * @description Home page for HaiEduTech Platform - focused on programs + modern AI tools.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { lazy, Suspense, useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursesOverview from "@/components/CoursesOverview";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SectionDivider from "@/components/SectionDivider";
import HomeChibiFunFacts from "@/components/decorations/HomeChibiFunFacts";
const LearningRoadmaps = lazy(() => import("@/components/LearningRoadmaps"));
const ModernTechTools = lazy(() => import("@/components/ModernTechTools"));
const SuccessMetrics = lazy(() => import("@/components/SuccessMetrics"));


const SectionPlaceholder = () => (
  <div className="w-full h-20 flex items-center justify-center">
    <div className="animate-spin w-6 h-6 border-3 border-primary border-t-transparent rounded-full" />
  </div>
);

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
  <div className="min-h-screen bg-background relative">
    <SEO
      title="HaiEduTech | AI-Powered Learning for IELTS, HSK, AI Academy & Coding"
      description="AI-powered personalized learning for IELTS, TOEIC, HSK, Finnish YKI, Python, and AI Academy for grades 6–12 — by HaiEduTech."
      path="/"
      locale="en_US"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "HaiEduTech Learning Programs",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "English Program (IELTS/TOEIC/Cambridge)", "url": "https://haiedutech.com/english" },
          { "@type": "ListItem", "position": 2, "name": "Chinese Program (HSK)", "url": "https://haiedutech.com/chinese" },
          { "@type": "ListItem", "position": 3, "name": "Programming Program", "url": "https://haiedutech.com/programming" },
          { "@type": "ListItem", "position": 4, "name": "AI Academy (Grades 6–12)", "url": "https://haiedutech.com/programming/ai-academy" }
        ]
      }}
    />
    <ScrollProgressBar />
    <Navbar />
    <HeroSection />
    <HomeChibiFunFacts />
    <SectionDivider />
    <CoursesOverview />
    <SectionDivider flip />
    <LazySection><LearningRoadmaps /></LazySection>
    <SectionDivider />
    <LazySection><ModernTechTools /></LazySection>
    <SectionDivider flip />
    <LazySection><SuccessMetrics /></LazySection>
    
    <Footer />
  </div>
);

export default Index;
