// Collapsible wrapper around LanguageDataDashboard to keep language pages compact.
import { useState } from "react";
import { ChevronDown, BarChart3 } from "lucide-react";
import LanguageDataDashboard, { type DashboardLanguage } from "@/components/LanguageDataDashboard";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  language: DashboardLanguage;
  defaultOpen?: boolean;
  className?: string;
}

export default function CollapsibleDataDashboard({ language, defaultOpen = false, className = "" }: Props) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`my-6 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border border-border bg-card hover:bg-muted/40 transition-colors shadow-sm"
      >
        <span className="flex items-center gap-3 text-left">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </span>
          <span className="flex flex-col">
            <span className="font-display font-semibold text-foreground text-base md:text-lg">
              {t("📊 Bảng dữ liệu tương tác", "📊 Interactive Data Dashboard")}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground">
              {t(
                "Số liệu thị trường, điểm số & xu hướng học tập (2024-2025)",
                "Market stats, scores & learning trends (2024-2025)"
              )}
            </span>
          </span>
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <LanguageDataDashboard language={language} />
        </div>
      )}
    </div>
  );
}
