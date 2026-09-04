/**
 * @file PlacementCta.tsx
 * @description Banner shown on each subject hub: take the placement test and
 *   get a level plus a personalized study path straight away.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  /** Placement bank slug: english | chinese | vietnamese | finnish | japanese | swedish | programming. */
  subject: string;
  className?: string;
}

const PlacementCta = ({ subject, className = "" }: Props) => {
  const { t } = useLanguage();

  return (
    <div
      className={`rounded-2xl border-2 border-primary/25 bg-card/80 backdrop-blur-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${className}`}
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-bold flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4 text-primary" />
          {t("Kiểm tra trình độ và nhận lộ trình riêng", "Check your level and get your own path")}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t(
            "Làm bài kiểm tra ngắn, hệ thống sẽ cho biết trình độ hiện tại và tạo lộ trình học từng tuần cho bạn.",
            "Take a short test: you get your current level and a week-by-week study path built for you.",
          )}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        <Button asChild className="bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground">
          <Link to={`/placement-test?subject=${subject}`}>
            {t("Làm bài kiểm tra", "Take the test")}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/my-path">
            <Compass className="w-4 h-4 mr-1" />
            {t("Lộ trình của tôi", "My path")}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PlacementCta;
