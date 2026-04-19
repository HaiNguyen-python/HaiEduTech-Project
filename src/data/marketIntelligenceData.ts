// Static benchmark and market intelligence data for HaiEduTech Business Strategy module.
// All prices in VND. Sources: aggregated from public competitor websites & internal estimates (2025).

export interface CompetitorPricing {
  course: string;
  category: "english" | "chinese" | "programming";
  haiPrice: number; // HaiEduTech price per course
  marketAvg: number; // Average market price
  topCompetitor: string;
  topCompetitorPrice: number;
  hours: number; // Total course hours
  valueScore: number; // 1-10 (features + hours + AI per dollar)
}

export const COMPETITOR_PRICING: CompetitorPricing[] = [
  {
    course: "IELTS Foundation (5.0-6.5)",
    category: "english",
    haiPrice: 4500000,
    marketAvg: 6200000,
    topCompetitor: "IELTS Mentor",
    topCompetitorPrice: 7500000,
    hours: 60,
    valueScore: 9.2,
  },
  {
    course: "IELTS Advanced (6.5-7.5+)",
    category: "english",
    haiPrice: 6800000,
    marketAvg: 9000000,
    topCompetitor: "IDP Premium",
    topCompetitorPrice: 12000000,
    hours: 80,
    valueScore: 9.5,
  },
  {
    course: "PTE Academic",
    category: "english",
    haiPrice: 5200000,
    marketAvg: 7000000,
    topCompetitor: "PTE Magic",
    topCompetitorPrice: 8500000,
    hours: 50,
    valueScore: 9.0,
  },
  {
    course: "TOEIC 700+",
    category: "english",
    haiPrice: 3800000,
    marketAvg: 5000000,
    topCompetitor: "Anh Ngữ MS",
    topCompetitorPrice: 5800000,
    hours: 48,
    valueScore: 8.7,
  },
  {
    course: "HSK 1-3 (Beginner Chinese)",
    category: "chinese",
    haiPrice: 3200000,
    marketAvg: 4500000,
    topCompetitor: "Tiếng Trung Thầy Vũ",
    topCompetitorPrice: 5200000,
    hours: 40,
    valueScore: 8.8,
  },
  {
    course: "HSK 4-6 (Advanced Chinese)",
    category: "chinese",
    haiPrice: 5500000,
    marketAvg: 7800000,
    topCompetitor: "Confucius Institute",
    topCompetitorPrice: 9500000,
    hours: 72,
    valueScore: 9.1,
  },
  {
    course: "Python for Beginners",
    category: "programming",
    haiPrice: 2800000,
    marketAvg: 4500000,
    topCompetitor: "CodeGym",
    topCompetitorPrice: 6000000,
    hours: 36,
    valueScore: 9.3,
  },
  {
    course: "Data Engineering & ML",
    category: "programming",
    haiPrice: 7500000,
    marketAvg: 11000000,
    topCompetitor: "MindX",
    topCompetitorPrice: 14000000,
    hours: 90,
    valueScore: 9.4,
  },
];

// AI API + infrastructure costs per active student per month (VND)
export interface CostStructure {
  category: string;
  perplexityCost: number;
  lovableAiCost: number;
  storageCost: number;
  serverCost: number;
}

export const MONTHLY_COSTS_PER_STUDENT: Record<string, CostStructure> = {
  english: { category: "English", perplexityCost: 35000, lovableAiCost: 22000, storageCost: 5000, serverCost: 8000 },
  chinese: { category: "Chinese", perplexityCost: 28000, lovableAiCost: 18000, storageCost: 4000, serverCost: 7000 },
  programming: { category: "Programming", perplexityCost: 45000, lovableAiCost: 30000, storageCost: 12000, serverCost: 10000 },
};

// Seasonal demand index (0-100). Based on Vietnamese education calendar.
export interface SeasonalPoint {
  month: string;
  monthIdx: number;
  english: number;
  chinese: number;
  programming: number;
  reason: string;
}

export const SEASONAL_DEMAND: SeasonalPoint[] = [
  { month: "Jan", monthIdx: 0, english: 85, chinese: 70, programming: 65, reason: "New Year resolutions" },
  { month: "Feb", monthIdx: 1, english: 80, chinese: 90, programming: 60, reason: "Tết + Chinese New Year" },
  { month: "Mar", monthIdx: 2, english: 60, chinese: 55, programming: 55, reason: "Mid-semester slow" },
  { month: "Apr", monthIdx: 3, english: 55, chinese: 50, programming: 50, reason: "Exam preparation" },
  { month: "May", monthIdx: 4, english: 88, chinese: 75, programming: 80, reason: "Summer break begins" },
  { month: "Jun", monthIdx: 5, english: 95, chinese: 80, programming: 90, reason: "Peak summer enrollment" },
  { month: "Jul", monthIdx: 6, english: 78, chinese: 70, programming: 85, reason: "Mid-summer momentum" },
  { month: "Aug", monthIdx: 7, english: 72, chinese: 68, programming: 75, reason: "Pre-school prep" },
  { month: "Sep", monthIdx: 8, english: 92, chinese: 85, programming: 80, reason: "New academic year" },
  { month: "Oct", monthIdx: 9, english: 98, chinese: 88, programming: 75, reason: "Study abroad deadlines" },
  { month: "Nov", monthIdx: 10, english: 75, chinese: 72, programming: 65, reason: "Quiet pre-exam" },
  { month: "Dec", monthIdx: 11, english: 65, chinese: 60, programming: 55, reason: "Year-end slowdown" },
];

// Customer Acquisition Cost baselines (VND per acquired student)
export const CAC_BASELINES = {
  organic: 180000,
  facebook: 420000,
  google: 380000,
  referral: 95000,
  blended: 280000,
};

// Lifetime Value baselines per category
export interface LtvBaseline {
  category: string;
  avgMonths: number;
  avgRevenue: number;
  retention90d: number; // % retained after 90 days
}

export const LTV_BASELINES: LtvBaseline[] = [
  { category: "English (IELTS/PTE)", avgMonths: 8, avgRevenue: 5200000, retention90d: 72 },
  { category: "Chinese (HSK)", avgMonths: 10, avgRevenue: 4400000, retention90d: 78 },
  { category: "Programming", avgMonths: 12, avgRevenue: 5800000, retention90d: 82 },
  { category: "Finnish (YKI)", avgMonths: 14, avgRevenue: 4800000, retention90d: 88 },
];

// Marketing recommendation engine (rule-based)
export function getRecruitmentRecommendation(today = new Date()): {
  action: string;
  daysAhead: number;
  targetMonth: string;
  rationale: string;
  priority: "high" | "medium" | "low";
} {
  const month = today.getMonth();
  // Find next peak month (>= 80 demand)
  const peaks = SEASONAL_DEMAND.filter(s => Math.max(s.english, s.chinese, s.programming) >= 85);
  const next = peaks.find(p => p.monthIdx > month) || peaks[0];
  const targetIdx = next.monthIdx > month ? next.monthIdx : next.monthIdx + 12;
  const daysAhead = (targetIdx - month) * 30 - today.getDate() + 15;
  const topDomain =
    next.english >= next.chinese && next.english >= next.programming
      ? "PTE/IELTS"
      : next.chinese >= next.programming
        ? "HSK Chinese"
        : "Python/Data";
  return {
    action: `Launch ${topDomain} campaign`,
    daysAhead: Math.max(7, daysAhead),
    targetMonth: next.month,
    rationale: next.reason,
    priority: daysAhead < 30 ? "high" : daysAhead < 60 ? "medium" : "low",
  };
}

// Resource allocation: AI quota vs predicted student demand
export const RESOURCE_BUDGET = {
  monthlyAiBudgetVnd: 8000000,
  monthlyServerVnd: 2500000,
  staffHoursAvailable: 160,
};

// Format VND helper
export function formatVnd(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value.toFixed(0);
}
