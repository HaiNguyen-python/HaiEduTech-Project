/**
 * @file SwedishBeginner.tsx
 * @description /swedish/beginner — A1 starter lessons with YKI 4-skills simulator.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { SwedishTierView } from "@/components/swedish/SwedishTierView";

const SwedishBeginner = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Tiếng Thụy Điển cho Người Mới (A1) — YKI Ruotsi | HaiEduTech"
        description="Lộ trình Beginner A1 tiếng Thụy Điển: phát âm Bắc Âu, En/Ett, chào hỏi, mua sắm, hỏi đường — chuẩn bị cho YKI Ruotsi Cấp 1."
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
                "6 bài học nền tảng: phát âm Bắc Âu, bản thân & gia đình, số/giờ/ngày, chào hỏi lịch sự, mua sắm, hỏi đường.",
                "Six foundation lessons: Nordic pronunciation, self & family, numbers/time/dates, greetings, shopping, directions."
              )}
            </p>
          </header>
          <SwedishTierView tierId="a1" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishBeginner;
