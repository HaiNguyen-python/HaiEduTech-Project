/**
 * @file PhdCostCulture.tsx
 * @description Cost of Living + Culture Notes panel shown inside each country tab
 *   of the PhD Global Pathway. Reads from PHD_COUNTRY_EXTRAS by country id.
 */
import { Home, Utensils, Bus, Coins, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PHD_COUNTRY_EXTRAS } from "@/data/phdCountryExtras";

interface Props {
  countryId: string;
}

const PhdCostCulture = ({ countryId }: Props) => {
  const { t, lang } = useLanguage();
  const extras = PHD_COUNTRY_EXTRAS[countryId];
  if (!extras) return null;
  const { costOfLiving: cost, cultureNotesVi, cultureNotesEn } = extras;
  const notes = lang === "vi" ? cultureNotesVi : cultureNotesEn;

  const items = [
    { icon: Home, label: t("Thuê nhà", "Rent"), value: cost.rentUsd },
    { icon: Utensils, label: t("Ăn uống", "Food"), value: cost.foodUsd },
    { icon: Bus, label: t("Đi lại", "Transport"), value: cost.transportUsd },
    { icon: Coins, label: t("Tổng/tháng", "Total/mo"), value: cost.totalUsd, highlight: true },
  ];

  return (
    <div className="mt-5 grid lg:grid-cols-2 gap-4">
      <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
        <h4 className="text-sm font-bold mb-3 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
          💰 {t("Chi phí sinh hoạt (USD/tháng)", "Cost of Living (USD/month)")}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {items.map((it) => (
            <div
              key={it.label}
              className={`p-3 rounded-lg border flex items-center gap-2 ${
                it.highlight
                  ? "bg-emerald-500/10 border-emerald-500/40"
                  : "bg-background/60 border-border/60"
              }`}
            >
              <it.icon className={`w-4 h-4 ${it.highlight ? "text-emerald-600" : "text-muted-foreground"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{it.label}</div>
                <div className={`font-bold ${it.highlight ? "text-emerald-700 dark:text-emerald-400 text-lg" : "text-sm"}`}>
                  ${it.value.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
          {t(
            "Số liệu tham khảo 2024 cho một sinh viên độc thân tại thành phố chính. Thực tế dao động ±20%.",
            "2024 reference data for a single student in a major city. Real spend varies ±20%.",
          )}
        </p>
      </div>

      <div className="p-4 rounded-lg bg-gradient-to-br from-fuchsia-50 to-rose-50 dark:from-fuchsia-950/30 dark:to-rose-950/20 border border-fuchsia-200/60 dark:border-fuchsia-900/40">
        <h4 className="text-sm font-bold mb-3 flex items-center gap-1.5 text-fuchsia-700 dark:text-fuchsia-400">
          <Sparkles className="w-4 h-4" /> {t("Ghi chú văn hoá", "Culture Notes")}
        </h4>
        <ul className="space-y-2">
          {notes.map((n, i) => (
            <li key={i} className="text-sm flex gap-2 leading-relaxed">
              <span className="text-fuchsia-500 font-bold flex-shrink-0">•</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhdCostCulture;
