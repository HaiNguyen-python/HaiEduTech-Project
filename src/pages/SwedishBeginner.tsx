/**
 * @file SwedishBeginner.tsx
 * @description /swedish/beginner - A1 starter lessons + 30-day self-study plan.
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
import { SwedishA1DailyPlan } from "@/components/swedish/SwedishA1DailyPlan";
import { SwedishAlphabet } from "@/components/swedish/SwedishAlphabet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CalendarDays, Languages } from "lucide-react";

const SwedishBeginner = () => {
  const { t } = useLanguage();
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="Tiếng Thụy Điển A1 + Lộ trình 30 ngày tự học | HaiEduTech"
        description="24 bài học A1 tiếng Thụy Điển và lộ trình tự học 30 ngày: phát âm, bảng chữ cái, en/ett, đại từ, mua sắm, fika, sức khoẻ - sẵn sàng cho YKI Cấp 1."
        path="/swedish/beginner"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28">
        <SwedishHeroBanner pickKey="SwedishBeginner" compact />
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              {t("🌱 Tiếng Thụy Điển Cho Người Mới (A1)", "🌱 Swedish for Beginners (A1)")}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t(
                "24 bài chuyên sâu + lộ trình tự học 30 ngày: bảng chữ cái 29 chữ, đại từ, en/ett, mua sắm, fika, sức khoẻ, đi tàu - chuẩn bị vững cho YKI Ruotsi Cấp 1.",
                "24 in-depth lessons + 30-day self-study plan: 29-letter alphabet, pronouns, en/ett, shopping, fika, health, transport - solid YKI Ruotsi Level 1 prep."
              )}
            </p>
          </header>

          <Tabs defaultValue="alphabet" className="w-full">
            <TabsList className="mx-auto mb-6 grid w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="alphabet" className="gap-1.5">
                <Languages className="h-4 w-4" />
                {t("Bảng chữ cái", "Alphabet")}
              </TabsTrigger>
              <TabsTrigger value="plan" className="gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {t("Lộ trình 30 ngày", "30-Day Plan")}
              </TabsTrigger>
              <TabsTrigger value="lessons" className="gap-1.5">
                <BookOpen className="h-4 w-4" />
                {t("24 bài học", "24 Lessons")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="alphabet" className="mt-0">
              <SwedishAlphabet />
            </TabsContent>

            <TabsContent value="plan" className="mt-0">
              <SwedishA1DailyPlan />
            </TabsContent>

            <TabsContent value="lessons" className="mt-0">
              <SwedishTierView tierId="a1" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishBeginner;
