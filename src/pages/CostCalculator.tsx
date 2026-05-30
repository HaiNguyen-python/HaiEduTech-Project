/**
 * @file CostCalculator.tsx
 * @description Comprehensive study-abroad cost calculator for 4 popular destinations.
 * Static estimates; user can adjust tuition + lifestyle level. No backend required.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calculator, Banknote, Home, Plane, Utensils, BookOpen, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Country {
  code: string; flag: string; name: string; currency: string;
  tuition: { low: number; mid: number; high: number }; // USD/year
  rent: { low: number; mid: number; high: number };    // USD/mo
  food: number; transport: number; misc: number;       // USD/mo
  insurance: number; visa: number; flight: number;     // USD one-time/year
}

const COUNTRIES: Country[] = [
  { code: "fi", flag: "🇫🇮", name: "Finland", currency: "EUR",
    tuition: { low: 0, mid: 12000, high: 18000 },
    rent: { low: 350, mid: 550, high: 850 },
    food: 280, transport: 60, misc: 150, insurance: 350, visa: 400, flight: 900 },
  { code: "us", flag: "🇺🇸", name: "USA", currency: "USD",
    tuition: { low: 20000, mid: 40000, high: 65000 },
    rent: { low: 700, mid: 1300, high: 2200 },
    food: 450, transport: 120, misc: 250, insurance: 2200, visa: 510, flight: 1400 },
  { code: "uk", flag: "🇬🇧", name: "UK", currency: "GBP",
    tuition: { low: 15000, mid: 25000, high: 40000 },
    rent: { low: 600, mid: 1100, high: 1800 },
    food: 350, transport: 130, misc: 200, insurance: 750, visa: 600, flight: 1000 },
  { code: "cn", flag: "🇨🇳", name: "China", currency: "CNY",
    tuition: { low: 3000, mid: 6000, high: 12000 },
    rent: { low: 200, mid: 400, high: 800 },
    food: 220, transport: 40, misc: 120, insurance: 250, visa: 140, flight: 600 },
];

const VND_PER_USD = 25400;

const CostCalculator = () => {
  const { t } = useLanguage();
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [years, setYears] = useState(2);
  const [tuitionTier, setTuitionTier] = useState<"low" | "mid" | "high">("mid");
  const [rentTier, setRentTier] = useState<"low" | "mid" | "high">("mid");
  const [scholarship, setScholarship] = useState(0);
  const [tuitionOverride, setTuitionOverride] = useState("");

  const calc = useMemo(() => {
    const tuitionYear = tuitionOverride ? parseFloat(tuitionOverride) || 0 : country.tuition[tuitionTier];
    const rent = country.rent[rentTier];
    const monthlyLiving = rent + country.food + country.transport + country.misc;
    const yearlyLiving = monthlyLiving * 12;
    const oneTime = country.insurance + country.visa + country.flight * years; // flight round-trip per year
    const tuitionTotal = tuitionYear * years;
    const livingTotal = yearlyLiving * years;
    const scholarshipTotal = (scholarship / 100) * tuitionTotal;
    const total = tuitionTotal + livingTotal + oneTime - scholarshipTotal;
    return { tuitionYear, monthlyLiving, yearlyLiving, tuitionTotal, livingTotal, oneTime, scholarshipTotal, total };
  }, [country, years, tuitionTier, rentTier, scholarship, tuitionOverride]);

  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const fmtVnd = (n: number) => (n * VND_PER_USD).toLocaleString("vi-VN", { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Cost Calculator du học - HaiEduTech" description="Ước tính tổng chi phí du học Phần Lan, Mỹ, Anh, Trung Quốc — bao gồm học phí, nhà ở, sinh hoạt, visa, vé máy bay." path="/study-abroad/cost-calculator" />
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-28 lg:pt-32 pb-16">
        <Link to="/study-abroad" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="w-4 h-4" /> {t("Quay lại Cổng du học", "Back to Study Abroad")}
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{t("Cost Calculator du học", "Study Abroad Cost Calculator")}</h1>
              <p className="text-sm text-muted-foreground">
                {t("Ước tính tổng chi phí 4 năm/2 năm — học phí, nhà ở, sinh hoạt, visa, vé máy bay.", "Estimate full cost — tuition, housing, living, visa, flights.")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Controls */}
            <Card className="md:col-span-1">
              <CardContent className="p-5 space-y-4">
                <div>
                  <Label>{t("Quốc gia", "Country")}</Label>
                  <Select value={country.code} onValueChange={(v) => setCountry(COUNTRIES.find(c => c.code === v)!)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map(c => <SelectItem key={c.code} value={c.code}>{c.flag} {c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t("Số năm học", "Years")}: <strong>{years}</strong></Label>
                  <Slider min={1} max={6} step={1} value={[years]} onValueChange={([v]) => setYears(v)} />
                </div>
                <div>
                  <Label>{t("Mức học phí", "Tuition tier")}</Label>
                  <Select value={tuitionTier} onValueChange={(v: any) => { setTuitionTier(v); setTuitionOverride(""); }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{t("Thấp", "Low")} (${fmt(country.tuition.low)})</SelectItem>
                      <SelectItem value="mid">{t("Trung bình", "Mid")} (${fmt(country.tuition.mid)})</SelectItem>
                      <SelectItem value="high">{t("Cao", "High")} (${fmt(country.tuition.high)})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t("Hoặc nhập học phí (USD/năm)", "Or override tuition (USD/yr)")}</Label>
                  <Input type="number" placeholder={String(country.tuition[tuitionTier])} value={tuitionOverride} onChange={(e) => setTuitionOverride(e.target.value)} />
                </div>
                <div>
                  <Label>{t("Mức nhà ở", "Housing tier")}</Label>
                  <Select value={rentTier} onValueChange={(v: any) => setRentTier(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{t("Ký túc/share", "Dorm/share")} (${country.rent.low}/mo)</SelectItem>
                      <SelectItem value="mid">{t("Studio nhỏ", "Small studio")} (${country.rent.mid}/mo)</SelectItem>
                      <SelectItem value="high">{t("Apartment riêng", "Private apt")} (${country.rent.high}/mo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t("Học bổng (% học phí)", "Scholarship (% tuition)")}: <strong>{scholarship}%</strong></Label>
                  <Slider min={0} max={100} step={5} value={[scholarship]} onValueChange={([v]) => setScholarship(v)} />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="md:col-span-2 space-y-4">
              <Card className="overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600" />
                <CardContent className="p-5">
                  <div className="text-xs text-muted-foreground mb-1">{t("Tổng chi phí dự kiến", "Estimated total cost")}</div>
                  <div className="text-3xl sm:text-4xl font-bold text-foreground">${fmt(calc.total)}</div>
                  <div className="text-sm text-muted-foreground">≈ {fmtVnd(calc.total)} VND</div>
                  {scholarship > 0 && (
                    <Badge variant="outline" className="mt-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                      −${fmt(calc.scholarshipTotal)} {t("học bổng", "scholarship")}
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <div className="grid sm:grid-cols-2 gap-3">
                <Row icon={BookOpen} label={t("Học phí", "Tuition")} value={`$${fmt(calc.tuitionTotal)}`} sub={`$${fmt(calc.tuitionYear)}/yr × ${years}`} />
                <Row icon={Home} label={t("Nhà ở", "Housing")} value={`$${fmt(country.rent[rentTier] * 12 * years)}`} sub={`$${country.rent[rentTier]}/mo × ${years * 12}`} />
                <Row icon={Utensils} label={t("Sinh hoạt (ăn+đi lại+khác)", "Living (food+transport+misc)")} value={`$${fmt((country.food + country.transport + country.misc) * 12 * years)}`} sub={`$${country.food + country.transport + country.misc}/mo`} />
                <Row icon={Plane} label={t("Vé máy bay", "Flights")} value={`$${fmt(country.flight * years)}`} sub={`$${country.flight}/yr round-trip`} />
                <Row icon={Shield} label={t("Bảo hiểm", "Insurance")} value={`$${fmt(country.insurance)}`} sub={t("1 lần", "one-time")} />
                <Row icon={Banknote} label={t("Visa", "Visa")} value={`$${fmt(country.visa)}`} sub={t("1 lần", "one-time")} />
              </div>

              <Card>
                <CardContent className="p-4 text-xs text-muted-foreground">
                  {t(
                    "⚠️ Số liệu mang tính tham khảo dựa trên trung bình 2026. Học phí thực tế dao động theo trường, ngành và năm. Hãy đối chiếu trang chính thức của trường trước khi quyết định.",
                    "⚠️ Reference numbers based on 2026 averages. Actual tuition varies by school/program/year. Always verify on official program pages."
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Row = ({ icon: Icon, label, value, sub }: any) => (
  <Card><CardContent className="p-3 flex items-center gap-3">
    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Icon className="w-4 h-4" /></div>
    <div className="flex-1 min-w-0">
      <div className="text-xs text-muted-foreground truncate">{label}</div>
      <div className="font-bold">{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground">{sub}</div>}
    </div>
  </CardContent></Card>
);

export default CostCalculator;
