/**
 * @file CurrencyConverter.tsx
 * @description Mini static currency converter shown in the Pre-Departure
 *   Checklist. Users type a VND amount and instantly see equivalents in 8
 *   major currencies. Hidden from print output.
 */
import { useMemo, useState } from "react";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { CURRENCY_RATES, CURRENCY_RATES_UPDATED } from "@/data/currencyRates";

const formatNumber = (n: number) => {
  if (!isFinite(n)) return "—";
  if (n >= 100000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 100) return n.toLocaleString("en-US", { maximumFractionDigits: 1 });
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

const CurrencyConverter = () => {
  const { t } = useLanguage();
  const [base, setBase] = useState<"VND" | "USD">("VND");
  const [amount, setAmount] = useState("10000000");

  const numeric = parseFloat(amount.replace(/[,_\s]/g, "")) || 0;

  const rows = useMemo(() => {
    const vnd = base === "VND"
      ? numeric
      : numeric * (CURRENCY_RATES.find((c) => c.code === "USD")?.vndPerUnit ?? 25400);
    return CURRENCY_RATES.map((c) => ({
      ...c,
      value: vnd / c.vndPerUnit,
    }));
  }, [numeric, base]);

  return (
    <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-50/60 to-teal-50/60 dark:from-emerald-950/30 dark:to-teal-950/30 print:hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">
                {t("Đổi tiền nhanh", "Quick currency converter")}
              </div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                <RefreshCw className="w-2.5 h-2.5" />
                {t("Cập nhật thủ công", "Manually updated")}: {CURRENCY_RATES_UPDATED} ·
                {" "}
                {t("Chỉ tham khảo, không dùng cho giao dịch thật.", "Reference only — not for real transactions.")}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex-1 min-w-[180px]">
            <Input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10000000"
              className="font-mono text-base"
            />
          </div>
          <div className="inline-flex rounded-lg bg-background border border-border/60 p-1 text-xs font-semibold">
            {(["VND", "USD"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBase(b)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  base === b ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-2">
          <div className="min-w-[420px] px-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {rows.map((r) => (
              <div
                key={r.code}
                className="rounded-lg border border-border/60 bg-background/70 p-2.5"
              >
                <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span>{r.flag}</span>
                  <span>{r.code}</span>
                </div>
                <div className="text-sm font-bold font-mono tabular-nums">{formatNumber(r.value)}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
