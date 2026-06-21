/**
 * @file SwedishBeginner.tsx
 * @description /swedish/beginner - A1 starter lessons + 30-day self-study plan.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { SwedishTierView } from "@/components/swedish/SwedishTierView";
import { SwedishA1DailyPlan } from "@/components/swedish/SwedishA1DailyPlan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CalendarDays } from "lucide-react";

const SwedishBeginner = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Tiếng Thụy Điển A1 + Lộ trình 30 ngày tự học | HaiEduTech"
        description="16 bài học A1 tiếng Thụy Điển và lộ trình tự học 30 ngày: phát âm, chào hỏi, mua sắm, fika, lagom — sẵn sàng cho YKI Cấp 1."
        path="/swedish/beginner"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              {t("🌱 Tiếng Thụy Điển Cho Người Mới (A1)", "🌱 Swedish for Beginners (A1)")}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t(
                "16 bài nền tảng + lộ trình tự học 30 ngày: phát âm Bắc Âu, chào hỏi, mua sắm, fika, hỏi đường - chuẩn bị cho YKI Ruotsi Cấp 1.",
                "16 foundation lessons + 30-day self-study plan: Nordic pronunciation, greetings, shopping, fika, directions - YKI Ruotsi Level 1 prep."
              )}
            </p>
          </header>

          <Tabs defaultValue="plan" className="w-full">
            <TabsList className="mx-auto mb-6 grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="plan" className="gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {t("Lộ trình 30 ngày", "30-Day Plan")}
              </TabsTrigger>
              <TabsTrigger value="lessons" className="gap-1.5">
                <BookOpen className="h-4 w-4" />
                {t("16 bài học", "16 Lessons")}
              </TabsTrigger>
            </TabsList>

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
