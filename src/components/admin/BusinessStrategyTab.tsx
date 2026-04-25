// Business Strategy Tab - full BI dashboard for HaiEduTech admin
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, DollarSign, Calendar, Target, Sparkles, Download, Loader2,
  AlertCircle, Briefcase, Users, Zap, Award, ArrowUpRight, FileSpreadsheet,
  FileText, Brain, Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, BarChart, LineChart,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import {
  COMPETITOR_PRICING, MONTHLY_COSTS_PER_STUDENT, SEASONAL_DEMAND,
  CAC_BASELINES, LTV_BASELINES, RESOURCE_BUDGET,
  getRecruitmentRecommendation, formatVnd,
} from "@/data/marketIntelligenceData";
import { exportStrategyToPdf, exportStrategyToExcel } from "@/lib/strategyExport";
import AiStrategyOptimizer from "./AiStrategyOptimizer";
import AiMarketingKit from "./AiMarketingKit";
import AiPedagogicalCenter from "./AiPedagogicalCenter";

interface AiInsight {
  expansionOpportunity?: { title: string; rationale: string; estimatedRevenue: string };
  recruitmentTimeline?: { action: string; timeline: string; expectedRoi: string };
  marketTrend?: string;
}

const SECTOR_COLORS = {
  english: "hsl(217, 91%, 60%)",
  chinese: "hsl(0, 72%, 56%)",
  programming: "hsl(160, 84%, 39%)",
};

export default function BusinessStrategyTab() {
  const [studentCounts, setStudentCounts] = useState({ english: 0, chinese: 0, programming: 0 });
  const [revenueByCategory, setRevenueByCategory] = useState({ english: 0, chinese: 0, programming: 0 });
  const [aiInsight, setAiInsight] = useState<AiInsight | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Fetch domain enrollment + revenue
  useEffect(() => {
    (async () => {
      const { data: activities } = await supabase
        .from("student_activity_log")
        .select("user_id, domain")
        .limit(5000);
      const counts = { english: 0, chinese: 0, programming: 0 };
      const seen: Record<string, Set<string>> = { english: new Set(), chinese: new Set(), programming: new Set() };
      (activities || []).forEach((a: any) => {
        const d = (a.domain || "english") as keyof typeof counts;
        if (counts[d] !== undefined && !seen[d].has(a.user_id)) {
          seen[d].add(a.user_id);
          counts[d]++;
        }
      });
      setStudentCounts(counts);

      const { data: tuition } = await supabase.from("tuition_records").select("course, amount");
      const rev = { english: 0, chinese: 0, programming: 0 };
      (tuition || []).forEach((t: any) => {
        const c = (t.course || "").toUpperCase();
        if (c.includes("HSK") || c.includes("CHINESE") || c.includes("TRUNG")) rev.chinese += Number(t.amount) || 0;
        else if (c.includes("PYTHON") || c.includes("CODE") || c.includes("PROG") || c.includes("DATA")) rev.programming += Number(t.amount) || 0;
        else rev.english += Number(t.amount) || 0;
      });
      setRevenueByCategory(rev);
    })();
  }, []);

  // Market share combo data
  const marketShareData = useMemo(() => ([
    { sector: "English", students: studentCounts.english, revenue: revenueByCategory.english / 1_000_000 },
    { sector: "Chinese", students: studentCounts.chinese, revenue: revenueByCategory.chinese / 1_000_000 },
    { sector: "Programming", students: studentCounts.programming, revenue: revenueByCategory.programming / 1_000_000 },
  ]), [studentCounts, revenueByCategory]);

  // Profit margin calculations
  const marginData = useMemo(() => COMPETITOR_PRICING.map((p) => {
    const cost = MONTHLY_COSTS_PER_STUDENT[p.category];
    const totalCost = (cost.perplexityCost + cost.lovableAiCost + cost.storageCost + cost.serverCost) * (p.hours / 8);
    const netProfit = p.haiPrice - totalCost;
    const marginPct = (netProfit / p.haiPrice) * 100;
    return { course: p.course, revenue: p.haiPrice, cost: totalCost, netProfit, marginPct: Number(marginPct.toFixed(1)) };
  }), []);

  // Recruitment recommendation
  const recommendation = useMemo(() => getRecruitmentRecommendation(), []);

  // CAC + LTV
  const totalStudents = studentCounts.english + studentCounts.chinese + studentCounts.programming;
  const blendedLtv = LTV_BASELINES.reduce((s, l) => s + l.avgRevenue, 0) / LTV_BASELINES.length;
  const ltvCacRatio = (blendedLtv / CAC_BASELINES.blended).toFixed(1);
  const churnRate = (100 - LTV_BASELINES.reduce((s, l) => s + l.retention90d, 0) / LTV_BASELINES.length).toFixed(1);

  // Resource allocation
  const resourceData = useMemo(() => {
    const aiUsedPct = Math.min(100, ((studentCounts.english + studentCounts.chinese + studentCounts.programming) * 50000) / RESOURCE_BUDGET.monthlyAiBudgetVnd * 100);
    return [
      { resource: "AI Quota", used: Number(aiUsedPct.toFixed(0)), demand: 75 },
      { resource: "Server", used: 45, demand: 60 },
      { resource: "Staff Hours", used: 70, demand: 90 },
    ];
  }, [studentCounts]);

  const generateInsight = async () => {
    setLoadingInsight(true);
    try {
      const { data, error } = await supabase.functions.invoke("business-insight", {
        body: {
          context: {
            studentCounts,
            revenueByCategory,
            topMarginCourse: marginData.sort((a, b) => b.marginPct - a.marginPct)[0]?.course,
            ltvCacRatio,
            churnRate,
          },
        },
      });
      if (error) throw error;
      if (data?.success) {
        setAiInsight(data.insight);
        toast.success("AI insight generated");
      } else {
        throw new Error(data?.error || "Unknown error");
      }
    } catch (e) {
      toast.error("Failed to generate AI insight");
      console.error(e);
    } finally {
      setLoadingInsight(false);
    }
  };

  const handleExportPdf = async () => {
    setExporting(true);
    try {
      await exportStrategyToPdf("business-strategy-report");
      toast.success("PDF exported");
    } catch (e) {
      toast.error("PDF export failed");
    } finally {
      setExporting(false);
    }
  };

  const handleExportExcel = () => {
    try {
      exportStrategyToExcel({
        marketShare: marketShareData,
        pricing: COMPETITOR_PRICING,
        margin: marginData,
        seasonal: SEASONAL_DEMAND,
        ltv: LTV_BASELINES,
        kpis: {
          "Total Students": totalStudents,
          "Total Revenue (VND)": revenueByCategory.english + revenueByCategory.chinese + revenueByCategory.programming,
          "LTV/CAC Ratio": ltvCacRatio,
          "Churn Rate %": churnRate,
          "Avg Margin %": (marginData.reduce((s, m) => s + m.marginPct, 0) / marginData.length).toFixed(1),
        },
      });
      toast.success("Excel exported");
    } catch {
      toast.error("Excel export failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Business Intelligence & Strategy
          </h2>
          <p className="text-sm text-muted-foreground">Market analysis, pricing intelligence & forecasting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportPdf} disabled={exporting}>
            {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1" /> Excel
          </Button>
        </div>
      </div>

      <div id="business-strategy-report" className="space-y-6 bg-background">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Active Students", value: totalStudents, color: "text-sky-500" },
            { icon: DollarSign, label: "Total Revenue", value: `${formatVnd(revenueByCategory.english + revenueByCategory.chinese + revenueByCategory.programming)} VND`, color: "text-emerald-500" },
            { icon: TrendingUp, label: "LTV / CAC", value: `${ltvCacRatio}x`, color: "text-amber-500" },
            { icon: Activity, label: "Churn Rate", value: `${churnRate}%`, color: "text-rose-500" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                  <p className="text-2xl font-bold tabular-nums">{s.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Market Share + Profit Margin */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Market Share by Sector
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={marketShareData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="sector" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11 }} label={{ value: "Students", angle: -90, position: "insideLeft", fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} label={{ value: "Revenue (M)", angle: 90, position: "insideRight", fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar yAxisId="left" dataKey="students" fill="hsl(217, 91%, 60%)" name="Students" radius={[6, 6, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="hsl(160, 84%, 39%)" strokeWidth={3} name="Revenue (M VND)" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" /> Profit Margin per Course
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={marginData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis type="number" tick={{ fontSize: 11 }} unit="%" />
                  <YAxis dataKey="course" type="category" tick={{ fontSize: 10 }} width={140} />
                  <Tooltip formatter={(v: any) => `${v}%`} />
                  <Bar dataKey="marginPct" fill="hsl(160, 84%, 39%)" radius={[0, 6, 6, 0]} name="Net Margin" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Competitor Pricing Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-500" /> Competitor Pricing Benchmark
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>HaiEdu (VND)</TableHead>
                  <TableHead>Market Avg</TableHead>
                  <TableHead>Top Competitor</TableHead>
                  <TableHead>Savings</TableHead>
                  <TableHead>Value Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPETITOR_PRICING.map((p) => {
                  const savings = ((1 - p.haiPrice / p.marketAvg) * 100).toFixed(0);
                  return (
                    <TableRow key={p.course}>
                      <TableCell className="font-medium text-sm">{p.course}</TableCell>
                      <TableCell className="text-sm tabular-nums text-emerald-600 font-semibold">{formatVnd(p.haiPrice)}</TableCell>
                      <TableCell className="text-sm tabular-nums text-muted-foreground">{formatVnd(p.marketAvg)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{p.topCompetitor} ({formatVnd(p.topCompetitorPrice)})</TableCell>
                      <TableCell><Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">-{savings}%</Badge></TableCell>
                      <TableCell><Badge variant="secondary">⭐ {p.valueScore}/10</Badge></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Seasonal Heatmap + Recruitment Timeline */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-500" /> Seasonal Demand Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[600px] space-y-2">
                  {(["english", "chinese", "programming"] as const).map((cat) => (
                    <div key={cat} className="flex items-center gap-2">
                      <div className="w-24 text-xs font-medium capitalize">{cat}</div>
                      <div className="flex gap-1 flex-1">
                        {SEASONAL_DEMAND.map((s) => {
                          const intensity = s[cat];
                          const opacity = intensity / 100;
                          return (
                            <div
                              key={s.month}
                              title={`${s.month}: ${intensity}/100 - ${s.reason}`}
                              className="flex-1 h-10 rounded flex items-center justify-center text-[10px] font-bold text-white cursor-help"
                              style={{ backgroundColor: SECTOR_COLORS[cat], opacity: 0.2 + opacity * 0.8 }}
                            >
                              {s.month}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">Darker = higher demand. Hover for context.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Recruitment Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge className={recommendation.priority === "high" ? "bg-rose-500/15 text-rose-600" : "bg-amber-500/15 text-amber-600"}>
                  {recommendation.priority.toUpperCase()} PRIORITY
                </Badge>
                <p className="font-bold text-foreground">{recommendation.action}</p>
                <p className="text-sm text-muted-foreground">
                  Launch in <span className="font-bold text-primary">{recommendation.daysAhead} days</span> to hit{" "}
                  <span className="font-bold">{recommendation.targetMonth}</span> window.
                </p>
                <p className="text-xs italic text-muted-foreground">{recommendation.rationale}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CAC / LTV / Churn */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-500" /> Customer Acquisition Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={Object.entries(CAC_BASELINES).map(([channel, cost]) => ({ channel, cost: cost / 1000 }))}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="channel" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} unit="K" />
                  <Tooltip formatter={(v: any) => `${v}K VND`} />
                  <Bar dataKey="cost" fill="hsl(217, 91%, 60%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Lifetime Value & Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cohort</TableHead>
                    <TableHead>Avg Months</TableHead>
                    <TableHead>LTV (VND)</TableHead>
                    <TableHead>90d Retention</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {LTV_BASELINES.map((l) => (
                    <TableRow key={l.category}>
                      <TableCell className="text-sm font-medium">{l.category}</TableCell>
                      <TableCell className="text-sm tabular-nums">{l.avgMonths}m</TableCell>
                      <TableCell className="text-sm tabular-nums text-emerald-600 font-semibold">{formatVnd(l.avgRevenue)}</TableCell>
                      <TableCell><Badge variant="secondary">{l.retention90d}%</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-3 p-2 rounded bg-amber-500/10 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Re-engagement tip: students churning after month 1 - send personalized "Free 1-week refresher" email + AI study plan.</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resource Allocation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Resource Allocation: Capacity vs Demand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={resourceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="resource" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit="%" />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="used" fill="hsl(217, 91%, 60%)" name="Currently Used" radius={[4, 4, 0, 0]} />
                <Bar dataKey="demand" fill="hsl(0, 72%, 56%)" name="Predicted Demand" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Expansion Opportunity */}
        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-emerald-500/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" /> AI Expansion Opportunity
              </CardTitle>
              <Button size="sm" onClick={generateInsight} disabled={loadingInsight}>
                {loadingInsight ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
                {aiInsight ? "Regenerate" : "Generate Insight"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!aiInsight ? (
              <p className="text-sm text-muted-foreground italic">Click "Generate Insight" to get AI-powered expansion + campaign recommendations based on your current data.</p>
            ) : (
              <div className="space-y-4">
                {aiInsight.expansionOpportunity && (
                  <div className="p-3 rounded-lg bg-card border">
                    <div className="flex items-center gap-2 mb-1">
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                      <span className="font-bold text-foreground">{aiInsight.expansionOpportunity.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{aiInsight.expansionOpportunity.rationale}</p>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">📈 {aiInsight.expansionOpportunity.estimatedRevenue}</p>
                  </div>
                )}
                {aiInsight.recruitmentTimeline && (
                  <div className="p-3 rounded-lg bg-card border">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-violet-500" />
                      <span className="font-bold text-foreground">Campaign Recommendation</span>
                    </div>
                    <p className="text-sm">{aiInsight.recruitmentTimeline.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">⏱ {aiInsight.recruitmentTimeline.timeline} · 💰 {aiInsight.recruitmentTimeline.expectedRoi}</p>
                  </div>
                )}
                {aiInsight.marketTrend && (
                  <p className="text-xs italic text-muted-foreground border-l-2 border-primary pl-2">
                    💡 Market trend: {aiInsight.marketTrend}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Strategy Optimizer - Perplexity-powered consultant */}
      <AiStrategyOptimizer
        metrics={{ studentCounts, revenueByCategory }}
      />

      {/* AI Marketing Kit - Lovable AI ad generator */}
      <AiMarketingKit />

      {/* AI Pedagogical Center - Teacher coaching hub */}
      <AiPedagogicalCenter />
    </div>
  );
}
