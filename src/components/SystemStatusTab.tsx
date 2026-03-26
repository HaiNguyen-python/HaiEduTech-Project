import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Activity, DollarSign, Server, Wifi, WifiOff, RefreshCw,
  AlertTriangle, TrendingUp, Clock, Zap, ExternalLink, ShieldAlert
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";

// Edge function registry: maps function names to their details
const FUNCTION_REGISTRY: Record<string, { label: string; model: string; domain: string; provider: string }> = {
  "chat": { label: "AI Chatbot", model: "sonar", domain: "english", provider: "Perplexity" },
  "grade-writing": { label: "IELTS Writing Grader", model: "sonar", domain: "english", provider: "Perplexity" },
  "grade-speaking": { label: "IELTS Speaking Grader", model: "sonar", domain: "english", provider: "Perplexity" },
  "generate-writing-prompt": { label: "Writing Prompt Generator", model: "sonar", domain: "english", provider: "Perplexity" },
  "generate-lesson": { label: "Lesson Generator", model: "sonar", domain: "english", provider: "Perplexity" },
  "generate-exercise": { label: "Exercise Generator", model: "sonar", domain: "english", provider: "Perplexity" },
  "generate-and-store-lesson": { label: "Auto Lesson Creator", model: "sonar", domain: "english", provider: "Perplexity" },
  "generate-code-challenge": { label: "Code Challenge Generator", model: "sonar", domain: "programming", provider: "Perplexity" },
  "debug-python": { label: "Python Debugger", model: "sonar", domain: "programming", provider: "Perplexity" },
  "fetch-knowledge-articles": { label: "Knowledge Hub Fetcher", model: "sonar", domain: "english", provider: "Perplexity" },
  "roleplay-chat": { label: "Conversational Roleplay", model: "gemini-3-flash", domain: "english", provider: "Lovable AI" },
};

const DOMAIN_COLORS: Record<string, string> = {
  english: "#10b981",
  chinese: "#f59e0b",
  programming: "#6366f1",
};

interface UsageLog {
  id: string;
  created_at: string;
  function_name: string;
  model: string;
  domain: string;
  tokens_used: number;
  estimated_cost: number;
  status: string;
  error_message: string | null;
}

interface BalanceRecord {
  id: string;
  balance: number;
  updated_at: string;
  note: string | null;
}

interface ModerationLog {
  id: string;
  user_id: string;
  created_at: string;
  blocked_content: string;
  reason: string;
}

const SystemStatusTab = () => {
  const { t } = useLanguage();
  const [usageLogs, setUsageLogs] = useState<UsageLog[]>([]);
  const [balance, setBalance] = useState<BalanceRecord | null>(null);
  const [moderationLogs, setModerationLogs] = useState<ModerationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBalance, setNewBalance] = useState("");
  const [balanceNote, setBalanceNote] = useState("");
  const [savingBalance, setSavingBalance] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    // Fetch usage logs (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const [logsRes, balanceRes, modRes] = await Promise.all([
      supabase
        .from("api_usage_log")
        .select("*")
        .gte("created_at", thirtyDaysAgo.toISOString())
        .order("created_at", { ascending: false })
        .limit(1000),
      supabase
        .from("api_balance")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1),
      supabase
        .from("moderation_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

    setUsageLogs((logsRes.data || []) as unknown as UsageLog[]);
    const balData = balanceRes.data as unknown as BalanceRecord[];
    setBalance(balData?.[0] || null);
    setModerationLogs((modRes.data || []) as unknown as ModerationLog[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Save manual balance
  const handleSaveBalance = async () => {
    const val = parseFloat(newBalance);
    if (isNaN(val) || val < 0) return;
    setSavingBalance(true);

    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("api_balance").insert({
      balance: val,
      updated_by: user?.id || null,
      note: balanceNote || `Manual update: $${val}`,
    });

    setNewBalance("");
    setBalanceNote("");
    await fetchData();
    setSavingBalance(false);
  };

  // Compute stats
  const totalTokens = usageLogs.reduce((s, l) => s + (l.tokens_used || 0), 0);
  const totalCost = usageLogs.reduce((s, l) => s + (l.estimated_cost || 0), 0);
  const totalCalls = usageLogs.length;
  const errorCount = usageLogs.filter(l => l.status !== "success").length;
  const successRate = totalCalls > 0 ? Math.round(((totalCalls - errorCount) / totalCalls) * 100) : 100;

  // Estimated remaining balance
  const currentBalance = balance ? balance.balance - totalCost : null;
  const isLowBalance = currentBalance !== null && currentBalance < 10;

  // Cost per domain
  const domainCosts: Record<string, number> = {};
  const domainCalls: Record<string, number> = {};
  for (const log of usageLogs) {
    const d = log.domain || "english";
    domainCosts[d] = (domainCosts[d] || 0) + (log.estimated_cost || 0);
    domainCalls[d] = (domainCalls[d] || 0) + 1;
  }
  const domainCostData = Object.entries(domainCosts).map(([domain, cost]) => ({
    name: domain === "english" ? t("Tiếng Anh", "English") : domain === "chinese" ? t("Tiếng Trung", "Chinese") : t("Lập trình", "Programming"),
    cost: Math.round(cost * 1000000) / 1000000,
    calls: domainCalls[domain] || 0,
    fill: DOMAIN_COLORS[domain] || "#94a3b8",
  }));

  // Cost per function
  const fnCosts: Record<string, { cost: number; calls: number; errors: number }> = {};
  for (const log of usageLogs) {
    if (!fnCosts[log.function_name]) fnCosts[log.function_name] = { cost: 0, calls: 0, errors: 0 };
    fnCosts[log.function_name].cost += log.estimated_cost || 0;
    fnCosts[log.function_name].calls++;
    if (log.status !== "success") fnCosts[log.function_name].errors++;
  }
  const fnCostData = Object.entries(fnCosts)
    .sort((a, b) => b[1].calls - a[1].calls)
    .map(([fn, data]) => ({
      name: FUNCTION_REGISTRY[fn]?.label || fn,
      calls: data.calls,
      cost: Math.round(data.cost * 1000000) / 1000000,
      errors: data.errors,
    }));

  // Daily usage trend (last 14 days)
  const dailyUsage: Record<string, { tokens: number; cost: number; calls: number }> = {};
  for (const log of usageLogs) {
    const day = log.created_at.slice(0, 10);
    if (!dailyUsage[day]) dailyUsage[day] = { tokens: 0, cost: 0, calls: 0 };
    dailyUsage[day].tokens += log.tokens_used || 0;
    dailyUsage[day].cost += log.estimated_cost || 0;
    dailyUsage[day].calls++;
  }
  const dailyTrend = Object.entries(dailyUsage)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14)
    .map(([date, data]) => ({ date: date.slice(5), ...data }));

  // Yesterday's summary
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = yesterday.toISOString().slice(0, 10);
  const yesterdayData = dailyUsage[yKey] || { tokens: 0, cost: 0, calls: 0 };

  // Recent errors
  const recentErrors = usageLogs.filter(l => l.status !== "success").slice(0, 10);

  return (
    <div className="space-y-6">
      {/* System Status Header */}
      <Card className="border-emerald-500/30 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Server className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{t("Trạng thái hệ thống", "System Status")}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {t("AI Provider: Perplexity API | Model: sonar | Trạng thái: Hoạt động", "AI Provider: Perplexity API | Model: sonar | Status: Online")}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={fetchData} className="gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> {t("Làm mới", "Refresh")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { icon: Zap, label: t("Tổng lượt gọi", "Total API Calls"), value: totalCalls.toLocaleString(), color: "text-sky-500" },
          { icon: Activity, label: t("Tổng token", "Total Tokens"), value: totalTokens.toLocaleString(), color: "text-emerald-500" },
          { icon: DollarSign, label: t("Chi phí ước tính", "Est. Cost"), value: `$${totalCost.toFixed(4)}`, color: "text-amber-500" },
          { icon: TrendingUp, label: t("Tỷ lệ thành công", "Success Rate"), value: `${successRate}%`, color: successRate >= 95 ? "text-emerald-500" : "text-red-500" },
          { icon: DollarSign, label: t("Số dư còn lại", "Remaining Balance"), value: currentBalance !== null ? `$${currentBalance.toFixed(2)}` : "—", color: isLowBalance ? "text-red-500" : "text-emerald-500" },
        ].map((m, i) => (
          <Card key={i} className={isLowBalance && i === 4 ? "border-destructive/50 bg-destructive/5" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <m.icon className={`w-4 h-4 ${m.color}`} />
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground tabular-nums">{loading ? "—" : m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Low Balance Warning */}
      {isLowBalance && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="font-bold text-destructive">
                  {t("⚠️ Cảnh báo: Số dư API thấp!", "⚠️ Warning: Low API Balance!")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(`Còn lại $${currentBalance?.toFixed(2)}. Vui lòng nạp thêm.`, `Only $${currentBalance?.toFixed(2)} remaining. Please top up.`)}
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="gap-1.5"
              onClick={() => window.open("https://www.perplexity.ai/settings/api", "_blank")}
            >
              <ExternalLink className="w-3.5 h-3.5" /> {t("Nạp tiền", "Top Up")}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Yesterday's Summary */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{t("Báo cáo hôm qua", "Yesterday's Report")}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(
              `Hôm qua: ${yesterdayData.calls} lượt gọi AI | ${yesterdayData.tokens.toLocaleString()} tokens | Chi phí ước tính: $${yesterdayData.cost.toFixed(4)} | Số dư: ${currentBalance !== null ? `$${currentBalance.toFixed(2)}` : "chưa cập nhật"}`,
              `Yesterday: ${yesterdayData.calls} AI calls | ${yesterdayData.tokens.toLocaleString()} tokens | Est. cost: $${yesterdayData.cost.toFixed(4)} | Balance: ${currentBalance !== null ? `$${currentBalance.toFixed(2)}` : "not set"}`
            )}
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Cost by Domain Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              {t("Chi phí AI theo lĩnh vực", "AI Spend per Subject")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {domainCostData.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">{t("Chưa có dữ liệu", "No data yet")}</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={domainCostData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                    formatter={(value: number, name: string) => [
                      name === "calls" ? `${value} calls` : `$${value.toFixed(6)}`,
                      name === "calls" ? t("Lượt gọi", "Calls") : t("Chi phí", "Cost")
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="calls" fill="#10b981" name={t("Lượt gọi", "Calls")} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Daily Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-500" />
              {t("Xu hướng sử dụng 14 ngày", "14-Day Usage Trend")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dailyTrend.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">{t("Chưa có dữ liệu", "No data yet")}</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="calls" stroke="#10b981" strokeWidth={2} name={t("Lượt gọi", "Calls")} />
                  <Line type="monotone" dataKey="tokens" stroke="#6366f1" strokeWidth={2} name="Tokens" yAxisId="right" hide />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Function Usage Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              {t("Chi tiết theo chức năng", "Usage by Function")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Chức năng", "Function")}</TableHead>
                    <TableHead className="text-center">{t("Lượt gọi", "Calls")}</TableHead>
                    <TableHead className="text-center">{t("Lỗi", "Errors")}</TableHead>
                    <TableHead className="text-right">{t("Chi phí", "Cost")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fnCostData.map((fn) => (
                    <TableRow key={fn.name}>
                      <TableCell className="font-medium text-sm">{fn.name}</TableCell>
                      <TableCell className="text-center tabular-nums">{fn.calls}</TableCell>
                      <TableCell className="text-center">
                        {fn.errors > 0 ? (
                          <Badge variant="destructive" className="text-xs">{fn.errors}</Badge>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-sm">${fn.cost.toFixed(6)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Balance Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-500" />
              {t("Quản lý số dư API", "API Balance Management")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {balance && (
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">{t("Số dư gần nhất", "Last recorded balance")}</p>
                <p className="text-2xl font-bold text-foreground tabular-nums">${balance.balance.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("Cập nhật", "Updated")}: {new Date(balance.updated_at).toLocaleString()}
                  {balance.note && ` — ${balance.note}`}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("Cập nhật số dư mới", "Update Balance")}</p>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="$50.00"
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  className="w-32"
                />
                <Input
                  placeholder={t("Ghi chú (tuỳ chọn)", "Note (optional)")}
                  value={balanceNote}
                  onChange={(e) => setBalanceNote(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSaveBalance} disabled={savingBalance || !newBalance} size="sm">
                  {savingBalance ? t("Đang lưu...", "Saving...") : t("Lưu", "Save")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Errors */}
      {recentErrors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              {t("Lỗi gần đây", "Recent Errors")}
              <Badge variant="destructive">{recentErrors.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Thời gian", "Time")}</TableHead>
                    <TableHead>{t("Chức năng", "Function")}</TableHead>
                    <TableHead>{t("Trạng thái", "Status")}</TableHead>
                    <TableHead>{t("Chi tiết", "Details")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentErrors.map((err) => (
                    <TableRow key={err.id}>
                      <TableCell className="text-xs tabular-nums">{new Date(err.created_at).toLocaleString()}</TableCell>
                      <TableCell className="text-sm">{FUNCTION_REGISTRY[err.function_name]?.label || err.function_name}</TableCell>
                      <TableCell><Badge variant="destructive" className="text-xs">{err.status}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{err.error_message || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* All Functions Registry */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            {t("Danh sách AI Functions", "AI Functions Registry")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Tên chức năng", "Function Name")}</TableHead>
                <TableHead>{t("Provider", "Provider")}</TableHead>
                <TableHead>{t("Model", "Model")}</TableHead>
                <TableHead>{t("Lĩnh vực", "Domain")}</TableHead>
                <TableHead className="text-center">{t("Trạng thái", "Status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(FUNCTION_REGISTRY).map(([fn, info]) => (
                <TableRow key={fn}>
                  <TableCell className="font-medium">{info.label}</TableCell>
                  <TableCell>
                    <Badge variant={info.provider === "Perplexity" ? "default" : "secondary"} className="text-xs">
                      {info.provider}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{info.model}</TableCell>
                  <TableCell>
                    <span className="text-sm">{info.domain === "english" ? "🇬🇧" : info.domain === "chinese" ? "🇨🇳" : "💻"}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Online</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatusTab;