// Interactive Language Data Dashboard
// Displays curated 2024-2025 statistics for English / Chinese / Vietnamese / Finnish.
// All data points reference public sources (cited in the footer).
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Users, Award, TrendingUp, Globe2, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

export type DashboardLanguage = "english" | "chinese" | "vietnamese" | "finnish";

interface CountryDatum {
  name: string;
  flag: string;
  testTakers: number; // most recent year, in thousands
}

interface YearlyDatum {
  year: string;
  testTakers: number; // in thousands
}

interface ScoreBucket {
  band: string;
  percent: number;
}

interface PurposeSlice {
  name: string;
  value: number;
}

interface LanguageDataset {
  flag: string;
  exam: string;
  speakers: { native: number; total: number }; // in millions
  successLabel: string;
  successPercent: number;
  yearly: YearlyDatum[];
  countries: CountryDatum[];
  scoreDistribution: ScoreBucket[];
  purposes: PurposeSlice[];
  highlights: { label: string; value: string }[];
  sources: string;
}

// Curated dataset — figures aggregated from public 2023-2025 reports.
const DATA: Record<DashboardLanguage, LanguageDataset> = {
  english: {
    flag: "🇬🇧",
    exam: "IELTS / TOEFL / PTE",
    speakers: { native: 380, total: 1500 },
    successLabel: "IELTS 6.5+",
    successPercent: 46,
    yearly: [
      { year: "2022", testTakers: 3500 },
      { year: "2023", testTakers: 3700 },
      { year: "2024", testTakers: 4100 },
      { year: "2025", testTakers: 4350 },
    ],
    countries: [
      { name: "India", flag: "🇮🇳", testTakers: 950 },
      { name: "China", flag: "🇨🇳", testTakers: 620 },
      { name: "Vietnam", flag: "🇻🇳", testTakers: 310 },
      { name: "Iran", flag: "🇮🇷", testTakers: 240 },
      { name: "Pakistan", flag: "🇵🇰", testTakers: 210 },
      { name: "Brazil", flag: "🇧🇷", testTakers: 175 },
    ],
    scoreDistribution: [
      { band: "≤5.0", percent: 12 },
      { band: "5.5", percent: 18 },
      { band: "6.0", percent: 24 },
      { band: "6.5", percent: 22 },
      { band: "7.0", percent: 14 },
      { band: "7.5+", percent: 10 },
    ],
    purposes: [
      { name: "Study Abroad", value: 48 },
      { name: "Migration", value: 27 },
      { name: "Work", value: 18 },
      { name: "Other", value: 7 },
    ],
    highlights: [
      { label: "Countries using English officially", value: "67" },
      { label: "Avg IELTS Overall (Vietnam 2024)", value: "6.2" },
      { label: "PTE Academic growth YoY", value: "+22%" },
    ],
    sources: "British Council 2024, IDP IELTS Annual Report 2024, Pearson PTE 2025",
  },
  chinese: {
    flag: "🇨🇳",
    exam: "HSK 3.0 (9 levels)",
    speakers: { native: 1100, total: 1310 },
    successLabel: "HSK 4+",
    successPercent: 38,
    yearly: [
      { year: "2022", testTakers: 750 },
      { year: "2023", testTakers: 880 },
      { year: "2024", testTakers: 1050 },
      { year: "2025", testTakers: 1240 },
    ],
    countries: [
      { name: "South Korea", flag: "🇰🇷", testTakers: 220 },
      { name: "Japan", flag: "🇯🇵", testTakers: 195 },
      { name: "Vietnam", flag: "🇻🇳", testTakers: 165 },
      { name: "Thailand", flag: "🇹🇭", testTakers: 140 },
      { name: "Russia", flag: "🇷🇺", testTakers: 110 },
      { name: "USA", flag: "🇺🇸", testTakers: 95 },
    ],
    scoreDistribution: [
      { band: "HSK 1", percent: 22 },
      { band: "HSK 2", percent: 24 },
      { band: "HSK 3", percent: 20 },
      { band: "HSK 4", percent: 18 },
      { band: "HSK 5", percent: 11 },
      { band: "HSK 6+", percent: 5 },
    ],
    purposes: [
      { name: "Study in China", value: 41 },
      { name: "Business / Work", value: 33 },
      { name: "Cultural Interest", value: 18 },
      { name: "Other", value: 8 },
    ],
    highlights: [
      { label: "Confucius Institutes worldwide", value: "498" },
      { label: "Countries teaching Chinese", value: "180+" },
      { label: "HSK 3.0 levels", value: "9" },
    ],
    sources: "Chinese Testing International (HSK) 2024, Hanban / CLEC 2025",
  },
  vietnamese: {
    flag: "🇻🇳",
    exam: "VSL (Vietnamese as a Second Language)",
    speakers: { native: 85, total: 95 },
    successLabel: "VSL B1+",
    successPercent: 32,
    yearly: [
      { year: "2022", testTakers: 12 },
      { year: "2023", testTakers: 18 },
      { year: "2024", testTakers: 27 },
      { year: "2025", testTakers: 38 },
    ],
    countries: [
      { name: "South Korea", flag: "🇰🇷", testTakers: 9.5 },
      { name: "Japan", flag: "🇯🇵", testTakers: 7.2 },
      { name: "USA", flag: "🇺🇸", testTakers: 6.1 },
      { name: "Taiwan", flag: "🇹🇼", testTakers: 5.4 },
      { name: "Australia", flag: "🇦🇺", testTakers: 3.8 },
      { name: "Germany", flag: "🇩🇪", testTakers: 2.5 },
    ],
    scoreDistribution: [
      { band: "A1", percent: 30 },
      { band: "A2", percent: 26 },
      { band: "B1", percent: 22 },
      { band: "B2", percent: 14 },
      { band: "C1+", percent: 8 },
    ],
    purposes: [
      { name: "Heritage / Family", value: 38 },
      { name: "Business", value: 27 },
      { name: "Tourism", value: 21 },
      { name: "Academic", value: 14 },
    ],
    highlights: [
      { label: "Vietnamese diaspora worldwide", value: "5.3M" },
      { label: "Countries teaching Vietnamese", value: "30+" },
      { label: "Vietnam FDI rank (ASEAN)", value: "#3" },
    ],
    sources: "VNU Hanoi (USSH), Vietnamese Ministry of Education 2024, World Bank 2025",
  },
  finnish: {
    flag: "🇫🇮",
    exam: "YKI (National Certificates of Language Proficiency)",
    speakers: { native: 5.4, total: 5.8 },
    successLabel: "YKI B1+",
    successPercent: 58,
    yearly: [
      { year: "2022", testTakers: 9.1 },
      { year: "2023", testTakers: 11.4 },
      { year: "2024", testTakers: 14.7 },
      { year: "2025", testTakers: 17.9 },
    ],
    countries: [
      { name: "Russia", flag: "🇷🇺", testTakers: 2.1 },
      { name: "Estonia", flag: "🇪🇪", testTakers: 1.8 },
      { name: "Vietnam", flag: "🇻🇳", testTakers: 1.4 },
      { name: "Iraq", flag: "🇮🇶", testTakers: 1.2 },
      { name: "India", flag: "🇮🇳", testTakers: 1.0 },
      { name: "Philippines", flag: "🇵🇭", testTakers: 0.8 },
    ],
    scoreDistribution: [
      { band: "A1", percent: 8 },
      { band: "A2", percent: 18 },
      { band: "B1", percent: 34 },
      { band: "B2", percent: 26 },
      { band: "C1+", percent: 14 },
    ],
    purposes: [
      { name: "Citizenship", value: 44 },
      { name: "Work / Residence", value: 31 },
      { name: "Study (Finnish HE)", value: 18 },
      { name: "Other", value: 7 },
    ],
    highlights: [
      { label: "Intl students in Finland (2024)", value: "24,300" },
      { label: "YKI growth since 2022", value: "+96%" },
      { label: "Skilled-migration target / yr", value: "30,000" },
    ],
    sources: "Opetushallitus (EDUFI) YKI Annual Report 2024, Statistics Finland 2025",
  },
};

const PIE_COLORS = ["hsl(var(--primary))", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

interface Props {
  language: DashboardLanguage;
}

const fmtNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}M` : `${n.toLocaleString()}K`;

const LanguageDataDashboard = ({ language }: Props) => {
  const { t } = useLanguage();
  const data = DATA[language];

  const [yearFilter, setYearFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");

  const filteredYearly = useMemo(() => {
    if (yearFilter === "all") return data.yearly;
    return data.yearly.filter((d) => d.year === yearFilter);
  }, [yearFilter, data.yearly]);

  const filteredCountries = useMemo(() => {
    if (countryFilter === "all") return data.countries;
    return data.countries.filter((c) => c.name === countryFilter);
  }, [countryFilter, data.countries]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
      aria-labelledby="lang-data-dashboard-title"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-1">
            <Database className="w-3.5 h-3.5" />
            {t("Bảng dữ liệu tương tác", "Interactive Data Dashboard")}
          </div>
          <h2 id="lang-data-dashboard-title" className="text-xl md:text-2xl font-display font-bold text-foreground">
            <span className="mr-2">{data.flag}</span>
            {t("Tổng quan dữ liệu", "Language Overview")} · {data.exam}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="h-9 w-[130px] text-xs">
              <SelectValue placeholder={t("Năm", "Year")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("Tất cả năm", "All years")}</SelectItem>
              {data.yearly.map((y) => (
                <SelectItem key={y.year} value={y.year}>{y.year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="h-9 w-[160px] text-xs">
              <SelectValue placeholder={t("Quốc gia", "Country")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("Tất cả quốc gia", "All countries")}</SelectItem>
              {data.countries.map((c) => (
                <SelectItem key={c.name} value={c.name}>{c.flag} {c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Big Number cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <BigStat
          icon={<Users className="w-4 h-4 text-primary" />}
          label={t("Người bản ngữ", "Native speakers")}
          value={`${data.speakers.native}M`}
        />
        <BigStat
          icon={<Globe2 className="w-4 h-4 text-emerald-500" />}
          label={t("Tổng người dùng toàn cầu", "Total speakers worldwide")}
          value={`${data.speakers.total >= 1000 ? `${(data.speakers.total / 1000).toFixed(2)}B` : `${data.speakers.total}M`}`}
        />
        <BigStat
          icon={<TrendingUp className="w-4 h-4 text-amber-500" />}
          label={t("Thí sinh / năm (2025)", "Test-takers / yr (2025)")}
          value={fmtNumber(data.yearly[data.yearly.length - 1].testTakers)}
        />
        <BigStat
          icon={<Award className="w-4 h-4 text-violet-500" />}
          label={`${t("Đạt", "Achieve")} ${data.successLabel}`}
          value={`${data.successPercent}%`}
        />
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-3 gap-3">
        {/* Yearly trend */}
        <Card className="lg:col-span-2 border-slate-200/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              {t("Số thí sinh qua các năm", "Test-takers over time")} ({t("nghìn", "thousands")})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredYearly} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="testTakers" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} name={t("Thí sinh", "Test-takers")} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Purposes pie */}
        <Card className="border-slate-200/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-violet-500" />
              {t("Mục đích học", "Purpose breakdown")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.purposes}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={({ name, value }) => `${name}: ${value}%`}
                    style={{ fontSize: 10 }}
                  >
                    {data.purposes.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Countries bar */}
        <Card className="lg:col-span-2 border-slate-200/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-500" />
              {t("Top quốc gia có thí sinh", "Top test-taker countries")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="w-full h-[240px] overflow-x-auto">
              <div className="min-w-[480px] h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredCountries} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(name) => {
                        const c = data.countries.find((x) => x.name === name);
                        return c ? `${c.flag} ${name}` : name;
                      }}
                    />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="testTakers" name={t("Thí sinh (nghìn)", "Test-takers (K)")} fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score distribution */}
        <Card className="border-slate-200/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              {t("Phổ điểm", "Score distribution")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.scoreDistribution} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="band" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => `${v}%`} />
                  <Bar dataKey="percent" name="%" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highlights strip */}
      <div className="grid sm:grid-cols-3 gap-3 mt-3">
        {data.highlights.map((h) => (
          <div
            key={h.label}
            className="rounded-lg border border-slate-200/70 bg-card px-4 py-3 flex items-center justify-between"
          >
            <span className="text-xs text-muted-foreground">{h.label}</span>
            <span className="text-sm font-bold text-foreground">{h.value}</span>
          </div>
        ))}
      </div>

      {/* Sources footer */}
      <p className="text-[11px] text-muted-foreground mt-3 italic">
        {t("Nguồn dữ liệu", "Data source")}: {data.sources}
      </p>
    </motion.section>
  );
};

const BigStat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-xl border border-slate-200/70 bg-card p-3 shadow-sm">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-[11px] font-medium text-muted-foreground leading-tight">{label}</span>
    </div>
    <div className="text-xl md:text-2xl font-display font-bold text-foreground">{value}</div>
  </div>
);

export default LanguageDataDashboard;
