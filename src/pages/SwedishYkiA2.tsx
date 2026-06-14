/**
 * @file SwedishYkiA2.tsx
 * @description /swedish/yki-a2 — YKI Ruotsi Cấp 2 (A2 / Perustaso) dashboard.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { SwedishTierView } from "@/components/swedish/SwedishTierView";

const SwedishYkiA2 = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="YKI A2 Ruotsi Dashboard — Luyện thi tiếng Thụy Điển | HaiEduTech"
        description="Luyện thi YKI Ruotsi cấp Perustaso (A2): V2 word order, En/Ett, thì quá khứ, email, modal verbs và đề thi thử 4 kỹ năng."
        path="/swedish/yki-a2"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              {t("❄️ YKI A2 Ruotsi Dashboard (Perustaso)", "❄️ YKI A2 Ruotsi Dashboard (Perustaso)")}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t(
                "7 bài học A2: V2 đảo ngữ, En/Ett, thì quá khứ, email công sở, modal verbs, công việc và sức khỏe — đúng chuẩn đề thi YKI Ruotsi.",
                "Seven A2 lessons: V2 inversion, En/Ett, past tense, work emails, modal verbs, workplace and health — matching the real YKI Ruotsi format."
              )}
            </p>
          </header>
          <SwedishTierView tierId="a2" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishYkiA2;
