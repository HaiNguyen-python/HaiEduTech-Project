/**
 * @file PremiumGate.tsx
 * @description Full-page Premium lock used for mock exams beyond the free first paper.
 */
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Crown, Lock, Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { openUpgradeModal, usePremium } from "@/hooks/usePremium";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  free: boolean;
  kind?: "exam" | "lesson";
  backTo: string;
  children: ReactNode;
}

export const PremiumLockPanel = ({ backTo, kind = "exam", previewTitle }: { backTo?: string; kind?: "exam" | "lesson"; previewTitle?: string }) => {
  const { t } = useLanguage();
  const { user } = usePremium();
  return (
    <div className="mx-auto max-w-xl rounded-2xl border-2 border-primary/30 bg-card p-8 text-center shadow-lg">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <Lock className="h-8 w-8" />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-foreground">
        {kind === "exam" ? t("Đề thi này dành cho Premium", "This mock exam is Premium") : t("Bài học này dành cho Premium", "This lesson is Premium")}
      </h1>
      {previewTitle && (
        <div className="relative mb-4 overflow-hidden rounded-xl border border-border bg-muted/40 p-4 text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t("Bài tiếp theo", "Up next")}</p>
          <p className="text-lg font-bold text-foreground">{previewTitle}</p>
          <p className="mt-1 text-sm text-muted-foreground blur-[2px] select-none">{t("Lý thuyết chi tiết, ví dụ minh họa, bài tập tương tác và quiz cuối bài đang chờ bạn...", "Detailed theory, worked examples, interactive practice and an end-of-lesson quiz are waiting for you...")}</p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent" />
        </div>
      )}
      <p className="mb-6 text-base text-muted-foreground">
        {kind === "exam"
          ? t("Nâng cấp hoặc nhập mã kích hoạt để luyện trọn bộ 125+ đề thi có giải thích chi tiết.", "Upgrade or enter your activation code to practise the full library of 125+ mock exams with detailed explanations.")
          : t("Nâng cấp hoặc nhập mã kích hoạt để mở khóa toàn bộ lộ trình.", "Upgrade or enter your activation code to unlock the whole path.")}
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {user ? (
          <Button size="lg" onClick={openUpgradeModal} className="gap-2">
            <Crown className="h-5 w-5" /> {t("Nâng cấp - chỉ 29 EUR/năm", "Upgrade - only 29 EUR/year")}
          </Button>
        ) : (
          <Button size="lg" asChild className="gap-2">
            <Link to="/login"><Crown className="h-5 w-5" /> {t("Đăng nhập để nâng cấp", "Sign in to upgrade")}</Link>
          </Button>
        )}
        {backTo !== undefined && backTo !== "" && (
          <Button size="lg" variant="outline" asChild className="gap-2">
            <Link to={backTo}><ArrowLeft className="h-4 w-4" /> {t("Quay lại", "Back")}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

const PremiumGate = ({ free, backTo, kind = "exam", children }: Props) => {
  const { isPremium, loading } = usePremium();
  if (free || isPremium) return <>{children}</>;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pb-16 pt-28">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <PremiumLockPanel backTo={backTo} kind={kind} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PremiumGate;
