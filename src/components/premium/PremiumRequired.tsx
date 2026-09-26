/**
 * Route-level Premium lock. Signed-in learners without Premium (activation
 * code, card payment or approved bank transfer) see an upgrade screen instead
 * of the learning content. Staff always pass.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Crown, KeyRound, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { openUpgradeModal, usePremium } from "@/hooks/usePremium";
import { sectionLabel } from "@/lib/publicRoutes";

const PremiumRequired = ({ pathname, children }: { pathname: string; children: ReactNode }) => {
  const { isPremium, loading } = usePremium();
  const { t, lang } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isPremium) return <>{children}</>;

  const label = sectionLabel(pathname, lang === "vi");

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-14 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
      <section className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-xl p-6 sm:p-9 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground shadow-md">
          <Lock className="h-7 w-7" />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">{label}</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">
          {t("Nội dung dành cho Premium", "Premium required")}
        </h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          {t(
            "Toàn bộ bài học, đề thi, trò chơi và công cụ AI chỉ mở cho tài khoản Premium. Học viên của thầy Hải hãy nhập mã kích hoạt; học viên khác có thể nâng cấp chỉ 29 EUR/năm.",
            "Every lesson, mock exam, game and AI tool is for Premium accounts. Teacher Hai's students can enter their activation code; everyone else can upgrade for only 29 EUR/year.",
          )}
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Button size="lg" variant="outline" className="flex-1 gap-2" onClick={openUpgradeModal}>
            <KeyRound className="w-4 h-4" />
            {t("Nhập mã kích hoạt", "Enter activation code")}
          </Button>
          <Button size="lg" className="flex-1 gap-2" onClick={openUpgradeModal}>
            <Crown className="w-4 h-4" />
            {t("Nâng cấp Premium", "Upgrade")}
          </Button>
        </div>
        <Link to="/" className="mt-5 inline-block text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          {t("Về trang chủ", "Back to home")}
        </Link>
      </section>
    </main>
  );
};

export default PremiumRequired;
