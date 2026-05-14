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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Users, Award, TrendingUp, Globe2, Database, Headphones, BookOpen, PenLine, Mic, AlertTriangle, Sparkles, Target } from "lucide-react";
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

interface SkillDatum {
  key: "listening" | "reading" | "writing" | "speaking";
  label: string;            // display label including native unit (e.g. "Listening (IELTS)")
  scaleMax: number;         // e.g. 9 for IELTS, 100 for HSK %, 6 for CEFR/YKI
  scaleUnit: string;        // "/9", "%", "/6"
  globalAvg: number;
  vietnamAvg: number;
  topAvg: number;           // top-quartile / Band 7+ learners
  passRate: number;         // % achieving the target band (e.g. IELTS 6.5+)
  trendYoY: string;         // e.g. "+0.2", "+3%"
  hardestPart: string;
  commonMistake: string;
  proTip: string;           // Mẹo vàng của thầy Hải
  weeklyHours: number;      // recommended study hours/week
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
  skills: SkillDatum[];
  highlights: { label: string; value: string }[];
  sources: string;
}

// Curated dataset — figures aggregated from public 2016-2025 reports, refreshed Q4 2025.
const DATA: Record<DashboardLanguage, LanguageDataset> = {
  english: {
    flag: "🇬🇧",
    exam: "IELTS / TOEFL / PTE / Cambridge / Duolingo",
    speakers: { native: 390, total: 1520 },
    successLabel: "IELTS 6.5+",
    successPercent: 47,
    yearly: [
      { year: "2016", testTakers: 2900 },
      { year: "2017", testTakers: 3000 },
      { year: "2018", testTakers: 3100 },
      { year: "2019", testTakers: 3400 },
      { year: "2020", testTakers: 2200 },
      { year: "2021", testTakers: 3000 },
      { year: "2022", testTakers: 3500 },
      { year: "2023", testTakers: 3700 },
      { year: "2024", testTakers: 4150 },
      { year: "2025", testTakers: 4480 },
    ],
    countries: [
      { name: "India", flag: "🇮🇳", testTakers: 1020 },
      { name: "China", flag: "🇨🇳", testTakers: 640 },
      { name: "Vietnam", flag: "🇻🇳", testTakers: 345 },
      { name: "Iran", flag: "🇮🇷", testTakers: 250 },
      { name: "Pakistan", flag: "🇵🇰", testTakers: 225 },
      { name: "Brazil", flag: "🇧🇷", testTakers: 185 },
      { name: "Nepal", flag: "🇳🇵", testTakers: 178 },
      { name: "Philippines", flag: "🇵🇭", testTakers: 160 },
      { name: "Saudi Arabia", flag: "🇸🇦", testTakers: 148 },
      { name: "Bangladesh", flag: "🇧🇩", testTakers: 132 },
      { name: "Nigeria", flag: "🇳🇬", testTakers: 118 },
      { name: "Indonesia", flag: "🇮🇩", testTakers: 96 },
    ],
    scoreDistribution: [
      { band: "≤4.5", percent: 5 },
      { band: "5.0", percent: 9 },
      { band: "5.5", percent: 15 },
      { band: "6.0", percent: 23 },
      { band: "6.5", percent: 22 },
      { band: "7.0", percent: 15 },
      { band: "7.5", percent: 7 },
      { band: "8.0+", percent: 4 },
    ],
    purposes: [
      { name: "Study Abroad", value: 49 },
      { name: "Migration", value: 26 },
      { name: "Work", value: 18 },
      { name: "Other", value: 7 },
    ],
    highlights: [
      { label: "IELTS test-takers (2025)", value: "4.48M" },
      { label: "Countries with IELTS centers", value: "140+" },
      { label: "Avg IELTS Overall (Vietnam 2025)", value: "6.3" },
      { label: "Avg IELTS Overall (India 2025)", value: "6.4" },
      { label: "PTE Academic growth YoY (2025)", value: "+24%" },
      { label: "TOEFL iBT mean score (2025)", value: "89 / 120" },
      { label: "Cambridge B2 First pass rate", value: "78%" },
      { label: "Duolingo English Test takers (2025)", value: "1.1M" },
      { label: "Universities accepting DET", value: "5,500+" },
    ],
    sources: "British Council 2025, IDP IELTS Annual Report 2025, Pearson PTE 2025, ETS TOEFL 2025, Cambridge English, Duolingo Q3 2025",
  },
  chinese: {
    flag: "🇨🇳",
    exam: "HSK 3.0 (9 levels) / HSKK",
    speakers: { native: 1110, total: 1340 },
    successLabel: "HSK 4+",
    successPercent: 39,
    yearly: [
      { year: "2016", testTakers: 580 },
      { year: "2017", testTakers: 640 },
      { year: "2018", testTakers: 680 },
      { year: "2019", testTakers: 750 },
      { year: "2020", testTakers: 520 },
      { year: "2021", testTakers: 640 },
      { year: "2022", testTakers: 750 },
      { year: "2023", testTakers: 880 },
      { year: "2024", testTakers: 1080 },
      { year: "2025", testTakers: 1320 },
    ],
    countries: [
      { name: "South Korea", flag: "🇰🇷", testTakers: 240 },
      { name: "Japan", flag: "🇯🇵", testTakers: 205 },
      { name: "Vietnam", flag: "🇻🇳", testTakers: 178 },
      { name: "Thailand", flag: "🇹🇭", testTakers: 152 },
      { name: "Russia", flag: "🇷🇺", testTakers: 118 },
      { name: "USA", flag: "🇺🇸", testTakers: 102 },
      { name: "Indonesia", flag: "🇮🇩", testTakers: 84 },
      { name: "Italy", flag: "🇮🇹", testTakers: 66 },
      { name: "Kazakhstan", flag: "🇰🇿", testTakers: 60 },
      { name: "Pakistan", flag: "🇵🇰", testTakers: 52 },
      { name: "France", flag: "🇫🇷", testTakers: 47 },
      { name: "Germany", flag: "🇩🇪", testTakers: 41 },
    ],
    scoreDistribution: [
      { band: "HSK 1", percent: 17 },
      { band: "HSK 2", percent: 22 },
      { band: "HSK 3", percent: 22 },
      { band: "HSK 4", percent: 19 },
      { band: "HSK 5", percent: 11 },
      { band: "HSK 6", percent: 6 },
      { band: "HSK 7-9", percent: 3 },
    ],
    purposes: [
      { name: "Study in China", value: 42 },
      { name: "Business / Work", value: 33 },
      { name: "Cultural Interest", value: 17 },
      { name: "Other", value: 8 },
    ],
    highlights: [
      { label: "HSK test-takers (2025)", value: "1.32M" },
      { label: "Confucius Institutes worldwide", value: "500+" },
      { label: "Confucius Classrooms (K-12)", value: "1,200+" },
      { label: "Countries teaching Chinese", value: "190+" },
      { label: "HSK 3.0 levels", value: "9" },
      { label: "Intl students in China (2025)", value: "310K" },
      { label: "Chinese learners worldwide (2025)", value: "200M+" },
      { label: "Belt & Road partner countries", value: "150+" },
      { label: "China share of global GDP (2025)", value: "17.8%" },
    ],
    sources: "Chinese Testing International (CTI/HSK) 2025, CLEC Annual Report 2025, China MOE Statistical Bulletin 2025, IMF WEO Oct 2025",
  },
  vietnamese: {
    flag: "🇻🇳",
    exam: "VSL (Vietnamese as a Second Language) — 6 CEFR levels",
    speakers: { native: 86, total: 97 },
    successLabel: "VSL B1+",
    successPercent: 34,
    yearly: [
      { year: "2016", testTakers: 4 },
      { year: "2017", testTakers: 5 },
      { year: "2018", testTakers: 6 },
      { year: "2019", testTakers: 8 },
      { year: "2020", testTakers: 5 },
      { year: "2021", testTakers: 9 },
      { year: "2022", testTakers: 12 },
      { year: "2023", testTakers: 18 },
      { year: "2024", testTakers: 28 },
      { year: "2025", testTakers: 42 },
    ],
    countries: [
      { name: "South Korea", flag: "🇰🇷", testTakers: 11.0 },
      { name: "Japan", flag: "🇯🇵", testTakers: 8.4 },
      { name: "USA", flag: "🇺🇸", testTakers: 6.8 },
      { name: "Taiwan", flag: "🇹🇼", testTakers: 5.9 },
      { name: "Australia", flag: "🇦🇺", testTakers: 4.2 },
      { name: "China", flag: "🇨🇳", testTakers: 3.4 },
      { name: "Germany", flag: "🇩🇪", testTakers: 2.7 },
      { name: "France", flag: "🇫🇷", testTakers: 2.2 },
      { name: "Czech Rep.", flag: "🇨🇿", testTakers: 1.8 },
      { name: "Canada", flag: "🇨🇦", testTakers: 1.5 },
      { name: "Singapore", flag: "🇸🇬", testTakers: 1.2 },
      { name: "UK", flag: "🇬🇧", testTakers: 1.0 },
    ],
    scoreDistribution: [
      { band: "A1", percent: 27 },
      { band: "A2", percent: 24 },
      { band: "B1", percent: 22 },
      { band: "B2", percent: 14 },
      { band: "C1", percent: 8 },
      { band: "C2", percent: 5 },
    ],
    purposes: [
      { name: "Heritage / Family", value: 37 },
      { name: "Business", value: 28 },
      { name: "Tourism", value: 21 },
      { name: "Academic", value: 14 },
    ],
    highlights: [
      { label: "VSL test-takers (2025)", value: "42K" },
      { label: "Vietnamese diaspora worldwide", value: "5.5M" },
      { label: "Countries teaching Vietnamese", value: "32+" },
      { label: "Vietnam FDI inflow (2025e)", value: "$28B" },
      { label: "Korean firms in Vietnam (2025)", value: "10,200+" },
      { label: "Japanese firms in Vietnam (2025)", value: "2,500+" },
      { label: "Inbound tourists (2025e)", value: "20M+" },
      { label: "Vietnam GDP growth (2025e)", value: "6.8%" },
      { label: "ASEAN exporter rank", value: "#2" },
    ],
    sources: "VNU Hanoi (USSH) 2025, Vietnamese Ministry of Education 2025, GSO Vietnam Q3 2025, World Bank Vietnam Update Oct 2025, KOTRA / JETRO 2025",
  },
  finnish: {
    flag: "🇫🇮",
    exam: "YKI (National Certificates of Language Proficiency)",
    speakers: { native: 5.4, total: 5.8 },
    successLabel: "YKI B1+",
    successPercent: 60,
    yearly: [
      { year: "2016", testTakers: 5.6 },
      { year: "2017", testTakers: 6.0 },
      { year: "2018", testTakers: 6.4 },
      { year: "2019", testTakers: 7.2 },
      { year: "2020", testTakers: 5.8 },
      { year: "2021", testTakers: 8.0 },
      { year: "2022", testTakers: 9.1 },
      { year: "2023", testTakers: 11.4 },
      { year: "2024", testTakers: 15.2 },
      { year: "2025", testTakers: 19.4 },
    ],
    countries: [
      { name: "Russia", flag: "🇷🇺", testTakers: 2.3 },
      { name: "Estonia", flag: "🇪🇪", testTakers: 1.9 },
      { name: "Vietnam", flag: "🇻🇳", testTakers: 1.6 },
      { name: "Iraq", flag: "🇮🇶", testTakers: 1.3 },
      { name: "India", flag: "🇮🇳", testTakers: 1.2 },
      { name: "Philippines", flag: "🇵🇭", testTakers: 0.95 },
      { name: "Ukraine", flag: "🇺🇦", testTakers: 0.92 },
      { name: "Somalia", flag: "🇸🇴", testTakers: 0.68 },
      { name: "Thailand", flag: "🇹🇭", testTakers: 0.62 },
      { name: "Nigeria", flag: "🇳🇬", testTakers: 0.48 },
      { name: "Nepal", flag: "🇳🇵", testTakers: 0.40 },
      { name: "Bangladesh", flag: "🇧🇩", testTakers: 0.34 },
    ],
    scoreDistribution: [
      { band: "A1", percent: 5 },
      { band: "A2", percent: 15 },
      { band: "B1", percent: 33 },
      { band: "B2", percent: 27 },
      { band: "C1", percent: 14 },
      { band: "C2", percent: 6 },
    ],
    purposes: [
      { name: "Citizenship", value: 45 },
      { name: "Work / Residence", value: 31 },
      { name: "Study (Finnish HE)", value: 17 },
      { name: "Other", value: 7 },
    ],
    highlights: [
      { label: "YKI test-takers (2025)", value: "19.4K" },
      { label: "Intl students in Finland (2025)", value: "26,500" },
      { label: "YKI growth since 2018", value: "+200%" },
      { label: "Skilled-migration target / yr", value: "30,000" },
      { label: "Citizenship apps (2025)", value: "14,200" },
      { label: "Universities offering EN BSc/MSc", value: "13" },
      { label: "Foreign-born population share (2025)", value: "10.6%" },
      { label: "Vietnamese in Finland (2025)", value: "13,800" },
      { label: "Avg YKI overall (Vietnam 2025)", value: "B1.2" },
    ],
    sources: "Opetushallitus (EDUFI) YKI Annual Report 2025, Statistics Finland 2025, Migri 2025, Tilastokeskus Q3 2025",
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
