// AI Strategy Optimizer — integrated into BusinessStrategyTab
// Features: AI Forecaster, Dynamic Pricing, Market Intel (Perplexity), Executive Report, Chat, What-if slider, Hot Leads
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Sparkles, TrendingUp, DollarSign, Calendar, AlertTriangle,
  Send, Loader2, Lock, Zap, Target, Flame, BarChart3, MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatVnd, COMPETITOR_PRICING } from "@/data/marketIntelligenceData";

interface OptimizerProps {
  metrics: {
    studentCounts: Record<string, number>;
    revenueByCategory: Record<string, number>;
  };
}

interface ForecastMonth {
  month: string;
  marketingStartDate: string;
  earlyBirdStartDate: string;
  classLaunchDate: string;
  targetCourse: string;
  rationale: string;
  demandScore: number;
}

interface PricingRec {
  course: string;
  currentPrice: number;
  suggestedPrice: number;
  changePercent: number;
  action: string;
  reason: string;
  urgency: "high" | "medium" | "low";
}

interface MarketIntel {
  trends: { keyword: string; trendDirection: string; insight: string; actionForHaiEduTech: string }[];
  competitors: { name: string; recentNews: string; threat: string }[];
  uniqueSellingPoints: string[];
}

interface ExecutiveReport {
  month: string;
  targetRevenueVnd: number;
  starProduct: { name: string; reason: string; expectedRevenue: number };
  riskAlerts: { area: string; severity: string; action: string }[];
  topActions: string[];
  marketingFocus: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  actionItems?: string[];
}

// Weekly rate-limit key in localStorage
const RATE_LIMIT_KEY = "ai-optimizer-last-run";
const RATE_LIMIT_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getLastRun(mode: string): number {
  try {
    const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || "{}");
    return data[mode] || 0;
  } catch {
    return 0;
  }
}

function setLastRun(mode: string) {
  try {
    const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || "{}");
    data[mode] = Date.now();
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  } catch {}
}

function isRateLimited(mode: string): boolean {
  return Date.now() - getLastRun(mode) < RATE_LIMIT_MS;
}

function daysUntilNextRun(mode: string): number {
  const remaining = RATE_LIMIT_MS - (Date.now() - getLastRun(mode));
  return Math.ceil(remaining / (24 * 60 * 60 * 1000));
}

const URGENCY_COLORS: Record<string, string> = {
  high: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/40",
  medium: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40",
  low: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40",
};

export default function AiStrategyOptimizer({ metrics }: OptimizerProps) {
  const [forecast, setForecast] = useState<ForecastMonth[] | null>(null);
  const [pricing, setPricing] = useState<PricingRec[] | null>(null);
  const [marketIntel, setMarketIntel] = useState<MarketIntel | null>(null);
  const [execReport, setExecReport] = useState<ExecutiveReport | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatCitations, setChatCitations] = useState<string[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  // What-if slider state
  const [whatIfClassSize, setWhatIfClassSize] = useState(15);
  const [whatIfCourse, setWhatIfCourse] = useState(COMPETITOR_PRICING[0]);

  // Hot Leads state (from student_activity_log)
  const [hotLeads, setHotLeads] = useState<{ user_id: string; visits: number }[]>([]);

  const totalStudents = Object.values(metrics.studentCounts).reduce((a, b) => a + b, 0);
  const totalRevenue = Object.values(metrics.revenueByCategory).reduce((a, b) => a + b, 0);

  // Load hot leads on mount
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("student_activity_log")
        .select("user_id, activity_type")
        .eq("activity_type", "page_view")
        .gte("created_at", new Date(Date.now() - 14 * 86400000).toISOString())
        .limit(1000);
      if (!data) return;
      const counts: Record<string, number> = {};
      data.forEach((r: any) => {
        counts[r.user_id] = (counts[r.user_id] || 0) + 1;
      });
      const hot = Object.entries(counts)
        .filter(([, v]) => v >= 3)
        .map(([user_id, visits]) => ({ user_id, visits }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 5);
      setHotLeads(hot);
    })();
  }, []);

  const callOptimizer = async (mode: string, context: any, force = false) => {
    if (!force && isRateLimited(mode)) {
      toast.warning(`Rate-limited: next ${mode} run available in ${daysUntilNextRun(mode)} day(s). Use Force button to override.`);
      return null;
    }
    setLoading(mode);
    try {
      const { data, error } = await supabase.functions.invoke("ai-strategy-optimizer", {
        body: { mode, context },
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Unknown error");
      setLastRun(mode);
      toast.success(`${mode} insight generated`);
      return data;
    } catch (e: any) {
      console.error(`[AI Optimizer ${mode}]`, e);
      toast.error(`Failed: ${e.message}`);
      return null;
    } finally {
      setLoading(null);
    }
  };

  const runForecaster = async (force = false) => {
    const data = await callOptimizer("forecaster", { metrics, totalStudents }, force);
    if (data?.result?.months) setForecast(data.result.months);
  };

  const runPricing = async (force = false) => {
    const data = await callOptimizer("pricing", {
      counts: metrics.studentCounts,
      pricing: COMPETITOR_PRICING.map(c => ({ course: c.course, price: c.haiPrice, marketAvg: c.marketAvg })),
    }, force);
    if (data?.result?.recommendations) setPricing(data.result.recommendations);
  };

  const runMarketIntel = async (force = false) => {
    const data = await callOptimizer("market_intel", {}, force);
    if (data?.result) setMarketIntel(data.result);
  };

  const runExecReport = async (force = false) => {
    const data = await callOptimizer("executive_report", { metrics, totalRevenue }, force);
    if (data?.result) setExecReport(data.result);
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const question = chatInput.trim();
    setChatHistory(prev => [...prev, { role: "user", content: question }]);
    setChatInput("");
    setLoading("chat");
    try {
      const { data, error } = await supabase.functions.invoke("ai-strategy-optimizer", {
        body: { mode: "chat", context: { question, metrics } },
      });
      if (error) throw error;
      const result = data?.result || {};
      setChatHistory(prev => [...prev, {
        role: "assistant",
        content: result.answer || "No answer",
        actionItems: result.actionItems,
      }]);
      if (data?.citations) setChatCitations(data.citations);
    } catch (e: any) {
      toast.error(`Chat failed: ${e.message}`);
    } finally {
      setLoading(null);
    }
  };

  // What-if revenue calculation
  const whatIfRevenue = useMemo(() => {
    const baseRevenue = whatIfClassSize * whatIfCourse.haiPrice;
    const discounted = whatIfClassSize >= 18 ? baseRevenue * 0.95 : baseRevenue;
    return Math.round(discounted);
  }, [whatIfClassSize, whatIfCourse]);

  return (
    <div id="ai-optimizer-section" className="space-y-6 mt-8">
      <div className="flex items-center gap-3 pb-4 border-b border-primary/20">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/60">
          <Bot className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">🤖 AI Strategy Optimizer</h2>
          <p className="text-sm text-muted-foreground">Powered by Perplexity sonar-pro · Rate-limited to 1 deep analysis per week to save credits</p>
        </div>
      </div>

      {/* AI Chat Interface */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="w-5 h-5 text-primary" />
            Ask the AI Consultant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="min-h-[120px] max-h-[300px] overflow-y-auto space-y-2 p-3 rounded-lg bg-background/50 border">
            {chatHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                Ex: "How should I schedule classes for summer to maximize revenue?" or "Should I increase PTE prices?"
              </p>
            ) : (
              chatHistory.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-2 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-primary/10 text-foreground ml-8"
                      : "bg-card border mr-8"
                  }`}
                >
                  <div className="font-semibold text-xs mb-1 text-muted-foreground">
                    {msg.role === "user" ? "👤 You" : "🤖 AI Consultant"}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.actionItems && msg.actionItems.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs">
                      {msg.actionItems.map((a, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-primary">→</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))
            )}
            {loading === "chat" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendChat()}
              placeholder="Ask anything about strategy, pricing, marketing..."
              disabled={loading === "chat"}
            />
            <Button onClick={sendChat} disabled={loading === "chat" || !chatInput.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {chatCitations.length > 0 && (
            <div className="text-xs text-muted-foreground">
              Sources: {chatCitations.slice(0, 3).map((c, i) => (
                <a key={i} href={c} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mr-2">
                  [{i + 1}]
                </a>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 4 Optimizer Widgets */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Forecaster */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="w-5 h-5 text-violet-500" />
                AI Enrollment Forecaster
              </CardTitle>
              <Button
                size="sm"
                variant={isRateLimited("forecaster") ? "outline" : "default"}
                onClick={() => runForecaster(false)}
                disabled={loading === "forecaster"}
              >
                {loading === "forecaster" ? <Loader2 className="w-3 h-3 animate-spin" /> : isRateLimited("forecaster") ? <Lock className="w-3 h-3 mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                {isRateLimited("forecaster") ? `${daysUntilNextRun("forecaster")}d` : "Optimize"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!forecast ? (
              <p className="text-sm text-muted-foreground italic">Generate a 3-month enrollment calendar with marketing, early-bird, and launch dates.</p>
            ) : (
              <div className="space-y-3">
                {forecast.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-lg border bg-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground">{m.month}</span>
                      <Badge variant="outline" className="text-xs">
                        Demand {m.demandScore}/100
                      </Badge>
                    </div>
                    <p className="text-xs font-semibold text-primary mb-1">🎯 {m.targetCourse}</p>
                    <div className="grid grid-cols-3 gap-1 text-xs mb-2">
                      <div className="text-center p-1 rounded bg-blue-500/10">
                        <div className="text-[10px] text-muted-foreground">Marketing</div>
                        <div className="font-mono">{m.marketingStartDate}</div>
                      </div>
                      <div className="text-center p-1 rounded bg-amber-500/10">
                        <div className="text-[10px] text-muted-foreground">Early Bird</div>
                        <div className="font-mono">{m.earlyBirdStartDate}</div>
                      </div>
                      <div className="text-center p-1 rounded bg-emerald-500/10">
                        <div className="text-[10px] text-muted-foreground">Launch</div>
                        <div className="font-mono">{m.classLaunchDate}</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">{m.rationale}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dynamic Pricing */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                Dynamic Pricing & Capacity
              </CardTitle>
              <Button
                size="sm"
                variant={isRateLimited("pricing") ? "outline" : "default"}
                onClick={() => runPricing(false)}
                disabled={loading === "pricing"}
              >
                {loading === "pricing" ? <Loader2 className="w-3 h-3 animate-spin" /> : isRateLimited("pricing") ? <Lock className="w-3 h-3 mr-1" /> : <Zap className="w-3 h-3 mr-1" />}
                {isRateLimited("pricing") ? `${daysUntilNextRun("pricing")}d` : "Analyze"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!pricing ? (
              <p className="text-sm text-muted-foreground italic">AI suggests price adjustments and class openings based on demand.</p>
            ) : (
              <div className="space-y-2">
                {pricing.map((p, i) => (
                  <div key={i} className={`p-2 rounded-lg border ${URGENCY_COLORS[p.urgency] || URGENCY_COLORS.low}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{p.course}</span>
                      <Badge variant="outline" className="text-xs uppercase">{p.action}</Badge>
                    </div>
                    <div className="text-xs mt-1">
                      {formatVnd(p.currentPrice)} → <span className="font-bold">{formatVnd(p.suggestedPrice)}</span>{" "}
                      <span className={p.changePercent > 0 ? "text-emerald-600" : "text-rose-600"}>
                        ({p.changePercent > 0 ? "+" : ""}{p.changePercent}%)
                      </span>
                    </div>
                    <p className="text-xs mt-1 opacity-80">{p.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Market Intelligence */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Market Intelligence (Live Web)
              </CardTitle>
              <Button
                size="sm"
                variant={isRateLimited("market_intel") ? "outline" : "default"}
                onClick={() => runMarketIntel(false)}
                disabled={loading === "market_intel"}
              >
                {loading === "market_intel" ? <Loader2 className="w-3 h-3 animate-spin" /> : isRateLimited("market_intel") ? <Lock className="w-3 h-3 mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                {isRateLimited("market_intel") ? `${daysUntilNextRun("market_intel")}d` : "Scan"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!marketIntel ? (
              <p className="text-sm text-muted-foreground italic">Scans Vietnam EdTech news + Google Trends for "du học Phần Lan", "PTE 2026", etc.</p>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-bold text-foreground mb-1">📈 Trends</div>
                  {marketIntel.trends?.map((t, i) => (
                    <div key={i} className="p-2 rounded bg-card border mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{t.keyword}</span>
                        <Badge variant="outline" className="text-[10px]">{t.trendDirection}</Badge>
                      </div>
                      <p className="opacity-80 mt-1">{t.insight}</p>
                      <p className="text-primary mt-1">→ {t.actionForHaiEduTech}</p>
                    </div>
                  ))}
                </div>
                {marketIntel.uniqueSellingPoints && (
                  <div>
                    <div className="font-bold text-foreground mb-1">⭐ Your USPs to Highlight</div>
                    <ul className="space-y-1">
                      {marketIntel.uniqueSellingPoints.map((u, i) => (
                        <li key={i} className="flex gap-2"><span className="text-emerald-500">✓</span>{u}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Executive Report */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-5 h-5 text-amber-500" />
                Monthly Executive Report
              </CardTitle>
              <Button
                size="sm"
                variant={isRateLimited("executive_report") ? "outline" : "default"}
                onClick={() => runExecReport(false)}
                disabled={loading === "executive_report"}
              >
                {loading === "executive_report" ? <Loader2 className="w-3 h-3 animate-spin" /> : isRateLimited("executive_report") ? <Lock className="w-3 h-3 mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                {isRateLimited("executive_report") ? `${daysUntilNextRun("executive_report")}d` : "Generate"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!execReport ? (
              <p className="text-sm text-muted-foreground italic">One-click monthly business plan: target revenue, star product, risks, top actions.</p>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/30">
                  <div className="text-xs text-muted-foreground">{execReport.month} · Target Revenue</div>
                  <div className="text-2xl font-bold text-amber-600">{formatVnd(execReport.targetRevenueVnd)} VND</div>
                </div>
                {execReport.starProduct && (
                  <div className="p-2 rounded bg-card border">
                    <div className="font-semibold flex items-center gap-1">⭐ Star: {execReport.starProduct.name}</div>
                    <p className="text-xs text-muted-foreground mt-1">{execReport.starProduct.reason}</p>
                  </div>
                )}
                {execReport.riskAlerts && execReport.riskAlerts.length > 0 && (
                  <div>
                    <div className="font-bold text-xs mb-1">⚠️ Risks</div>
                    {execReport.riskAlerts.map((r, i) => (
                      <div key={i} className={`p-2 rounded mb-1 text-xs border ${URGENCY_COLORS[r.severity] || URGENCY_COLORS.low}`}>
                        <span className="font-semibold">{r.area}:</span> {r.action}
                      </div>
                    ))}
                  </div>
                )}
                {execReport.topActions && (
                  <div>
                    <div className="font-bold text-xs mb-1">🎯 Top Actions</div>
                    <ul className="text-xs space-y-1">
                      {execReport.topActions.map((a, i) => (
                        <li key={i} className="flex gap-2"><span className="text-primary">{i + 1}.</span>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* What-if Slider + Hot Leads */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              What-if Revenue Simulator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Course</label>
              <select
                className="w-full p-2 rounded-lg border bg-background text-sm"
                value={whatIfCourse.course}
                onChange={e => {
                  const c = COMPETITOR_PRICING.find(x => x.course === e.target.value);
                  if (c) setWhatIfCourse(c);
                }}
              >
                {COMPETITOR_PRICING.map(c => (
                  <option key={c.course} value={c.course}>{c.course}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-muted-foreground">Class size</label>
                <span className="text-sm font-bold text-primary">{whatIfClassSize} students</span>
              </div>
              <Slider
                value={[whatIfClassSize]}
                min={5}
                max={30}
                step={1}
                onValueChange={([v]) => setWhatIfClassSize(v)}
              />
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-primary/5 border border-indigo-500/20">
              <div className="text-xs text-muted-foreground">Projected revenue per cohort</div>
              <div className="text-3xl font-bold text-indigo-600">
                {formatVnd(whatIfRevenue)} VND
              </div>
              <div className="text-xs mt-1 text-muted-foreground">
                Per student: {formatVnd(whatIfCourse.haiPrice)}
                {whatIfClassSize >= 18 && <span className="text-amber-600 ml-2">· -5% group discount applied</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Flame className="w-5 h-5 text-orange-500" />
              Hot Leads (3+ visits in 14 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hotLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No hot leads detected yet. Need page_view events to identify high-intent users.</p>
            ) : (
              <div className="space-y-2">
                {hotLeads.map((lead, i) => (
                  <div key={lead.user_id} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-orange-500/10">#{i + 1}</Badge>
                      <span className="font-mono text-xs">{lead.user_id.slice(0, 8)}...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{lead.visits} visits</Badge>
                      <span className="text-xs text-emerald-600 font-semibold">→ Send 15% off</span>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground italic mt-2">
                  💡 AI suggestion: Email these {hotLeads.length} leads with a personalized 15% discount code.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
