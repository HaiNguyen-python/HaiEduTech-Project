/**
 * @file SwedishYkiB1.tsx
 * @description /swedish/yki-b1 — YKI Ruotsi Cấp 3 (B1 / Keskitaso) dashboard.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import Navbar from "@/components/Navbar";
import SwedishHeroBanner from "@/components/swedish/SwedishHeroBanner";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { SwedishTierView } from "@/components/swedish/SwedishTierView";

const SwedishYkiB1 = () => {
  const { t } = useLanguage();
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="YKI B1 Ruotsi Dashboard — Tiếng Thụy Điển Trung cấp | HaiEduTech"
        description="Luyện thi YKI Ruotsi B1 (Keskitaso): BIFF rule, liên từ logic, đọc Hbl & Yle, viết thư kiến nghị, phỏng vấn xin việc."
        path="/swedish/yki-b1"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28">
        <SwedishHeroBanner pickKey="SwedishYkiB1" compact />
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              {t("🎯 YKI B1 Ruotsi Dashboard (Keskitaso)", "🎯 YKI B1 Ruotsi Dashboard (Keskitaso)")}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t(
                "7 bài học B1: mệnh đề phụ (BIFF), liên từ logic, từ vựng môi trường/giáo dục/việc làm, đọc Hbl/Yle, viết thư kiến nghị, phỏng vấn.",
                "Seven B1 lessons: subordinate clauses (BIFF), logical connectors, environment/education/work vocabulary, Hbl/Yle reading, opinion letters, interviews."
              )}
            </p>
          </header>
          <SwedishTierView tierId="b1" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishYkiB1;
