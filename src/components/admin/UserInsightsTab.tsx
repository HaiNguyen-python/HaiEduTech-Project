import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, Legend, AreaChart, Area,
} from "recharts";
import {
  Eye, TrendingUp, Users, Clock, Loader2, RefreshCw, MousePointerClick, Lightbulb, CalendarRange,
} from "lucide-react";

type Range = "1d" | "7d" | "30d" | "90d" | "all";

interface PageView {
  id: string;
  user_id: string | null;
  session_id: string | null;
  path: string;
  title: string | null;
  referrer: string | null;
  time_on_page_seconds: number | null;
  created_at: string;
  metadata: any;
}

const RANGE_DAYS: Record<Range, number> = { "1d": 1, "7d": 7, "30d": 30, "90d": 90, "all": 0 };

// Friendly labels for top routes — used to translate /chinese/hsk-guide → "HSK Guide"
const ROUTE_LABELS: Record<string, { vi: string; en: string; group: string }> = {
  "/": { vi: "Trang chủ", en: "Home", group: "Home" },
  "/home": { vi: "Trang chủ", en: "Home", group: "Home" },
  "/about": { vi: "Giới thiệu", en: "About", group: "Info" },
  "/contact": { vi: "Liên hệ", en: "Contact", group: "Info" },
  "/dashboard": { vi: "Bảng điều khiển HS", en: "Student Dashboard", group: "Student" },
  "/english": { vi: "Tiếng Anh – Hub", en: "English Hub", group: "English" },
  "/chinese": { vi: "Tiếng Trung – Hub", en: "Chinese Hub", group: "Chinese" },
  "/finnish": { vi: "Tiếng Phần Lan – Hub", en: "Finnish Hub", group: "Finnish" },
  "/learn-vietnamese": { vi: "Học tiếng Việt – Hub", en: "Vietnamese Hub", group: "Vietnamese" },
  "/programming": { vi: "Lập trình – Hub", en: "Programming Hub", group: "Programming" },
  "/study-abroad": { vi: "Du học – Hub", en: "Study Abroad Hub", group: "Study Abroad" },
  "/global-scholarship": { vi: "Học bổng Toàn cầu", en: "Global Scholarship", group: "Study Abroad" },
  "/ielts-vocabulary": { vi: "Từ vựng IELTS", en: "IELTS Vocabulary", group: "IELTS" },
  "/ielts-lectures": { vi: "Bài giảng IELTS", en: "IELTS Lectures", group: "IELTS" },
  "/ielts-writing-practice": { vi: "Luyện viết IELTS", en: "IELTS Writing", group: "IELTS" },
  "/ielts-speaking-practice": { vi: "Luyện nói IELTS", en: "IELTS Speaking", group: "IELTS" },
  "/ielts-sample-essays": { vi: "Bài mẫu IELTS", en: "IELTS Sample Essays", group: "IELTS" },
  "/toeic-lectures": { vi: "Bài giảng TOEIC", en: "TOEIC Lectures", group: "TOEIC" },
  "/toeic-vocabulary": { vi: "Từ vựng TOEIC", en: "TOEIC Vocabulary", group: "TOEIC" },
  "/cambridge-lectures": { vi: "Bài giảng Cambridge", en: "Cambridge Lectures", group: "Cambridge" },
  "/chinese/hsk-guide": { vi: "Hướng dẫn HSK", en: "HSK Guide", group: "Chinese" },
  "/chinese/hsk/vocabulary": { vi: "Từ vựng HSK", en: "HSK Vocabulary", group: "Chinese" },
  "/pte": { vi: "PTE – Hub", en: "PTE Hub", group: "PTE" },
  "/national-exam": { vi: "Luyện thi THPT", en: "National Exam Prep", group: "Exam" },
  "/ai-grading": { vi: "Chấm bài AI", en: "AI Grading", group: "AI Tools" },
  "/ai-library": { vi: "Thư viện AI", en: "AI Library", group: "AI Tools" },
  "/vocab-arena": { vi: "Game Vocab Arena", en: "Vocab Arena", group: "Game" },
  "/admin-dashboard": { vi: "Quản trị", en: "Admin", group: "Admin" },
  "/login": { vi: "Đăng nhập", en: "Login", group: "Auth" },
  "/signup": { vi: "Đăng ký", en: "Signup", group: "Auth" },
};

function classifyPath(path: string): { label: string; group: string } {
  const base = path.split("?")[0];
  // Direct match
  if (ROUTE_LABELS[base]) return { label: "", group: ROUTE_LABELS[base].group };
  // Group by prefix
  if (base.startsWith("/ielts")) return { label: "", group: "IELTS" };
  if (base.startsWith("/toeic")) return { label: "", group: "TOEIC" };
  if (base.startsWith("/cambridge")) return { label: "", group: "Cambridge" };
  if (base.startsWith("/chinese")) return { label: "", group: "Chinese" };
  if (base.startsWith("/english")) return { label: "", group: "English" };
  if (base.startsWith("/finnish")) return { label: "", group: "Finnish" };
  if (base.startsWith("/learn-vietnamese")) return { label: "", group: "Vietnamese" };
  if (base.startsWith("/programming") || base.startsWith("/python")) return { label: "", group: "Programming" };
  if (base.startsWith("/pte")) return { label: "", group: "PTE" };
  if (base.startsWith("/study-abroad")) return { label: "", group: "Study Abroad" };
  if (base.startsWith("/national-exam")) return { label: "", group: "Exam" };
  if (base.startsWith("/songs")) return { label: "", group: "Songs" };
  return { label: "", group: "Other" };
}

const GROUP_COLORS: Record<string, string> = {
  IELTS: "hsl(220 90% 56%)",
  TOEIC: "hsl(199 89% 48%)",
  Cambridge: "hsl(280 65% 55%)",
  Chinese: "hsl(0 84% 60%)",
  English: "hsl(217 91% 60%)",
  Finnish: "hsl(195 80% 50%)",
  Vietnamese: "hsl(45 93% 47%)",
  Programming: "hsl(160 84% 39%)",
  PTE: "hsl(330 81% 60%)",
  "Study Abroad": "hsl(262 83% 58%)",
  Exam: "hsl(20 90% 55%)",
  Songs: "hsl(330 70% 60%)",
  Home: "hsl(var(--primary))",
  Info: "hsl(var(--muted-foreground))",
  Auth: "hsl(var(--muted-foreground))",
  Other: "hsl(var(--muted-foreground))",
  Admin: "hsl(var(--destructive))",
  Student: "hsl(var(--primary))",
  "AI Tools": "hsl(280 65% 55%)",
  Game: "hsl(45 93% 47%)",
};

export default function UserInsightsTab() {
  const { t } = useLanguage();
  const [range, setRange] = useState<Range>("all");
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState<PageView[]>([]);

  const fetchViews = async () => {
    setLoading(true);
    let q = supabase
      .from("page_view_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10000);
    if (range !== "all") {
      const since = new Date();
      since.setDate(since.getDate() - RANGE_DAYS[range]);
      q = q.gte("created_at", since.toISOString());
    }
    const { data, error } = await q;
    if (!error && data) setViews(data as any);
    setLoading(false);
  };

  useEffect(() => {
    fetchViews();
  }, [range]);

  // ===== Aggregations =====
  const totals = useMemo(() => {
    const uniqueSessions = new Set(views.map((v) => v.session_id).filter(Boolean));
    const uniqueUsers = new Set(views.map((v) => v.user_id).filter(Boolean));
    const validTimes = views.map((v) => v.time_on_page_seconds || 0).filter((s) => s > 0);
    const avgTime = validTimes.length
      ? Math.round(validTimes.reduce((a, b) => a + b, 0) / validTimes.length)
      : 0;
    return {
      pageviews: views.length,
      sessions: uniqueSessions.size,
      users: uniqueUsers.size,
      avgTime,
    };
  }, [views]);

  const topPages = useMemo(() => {
    const map = new Map<string, { views: number; users: Set<string>; totalTime: number; group: string }>();
    for (const v of views) {
      const key = v.path.split("?")[0];
      const cls = classifyPath(key);
      if (!map.has(key)) map.set(key, { views: 0, users: new Set(), totalTime: 0, group: cls.group });
      const entry = map.get(key)!;
      entry.views++;
      if (v.user_id) entry.users.add(v.user_id);
      else if (v.session_id) entry.users.add(v.session_id);
      entry.totalTime += v.time_on_page_seconds || 0;
    }
    return Array.from(map.entries())
      .map(([path, data]) => {
        const labelInfo = ROUTE_LABELS[path];
        return {
          path,
          label: labelInfo ? (t("vi", "en") === "vi" ? labelInfo.vi : labelInfo.en) : path,
          group: data.group,
          views: data.views,
          users: data.users.size,
          avgTime: data.views > 0 ? Math.round(data.totalTime / data.views) : 0,
        };
      })
      .sort((a, b) => b.views - a.views)
      .slice(0, 20);
  }, [views, t]);

  const topGroups = useMemo(() => {
    const map = new Map<string, number>();
    for (const v of views) {
      const cls = classifyPath(v.path.split("?")[0]);
      map.set(cls.group, (map.get(cls.group) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value, fill: GROUP_COLORS[name] || "hsl(var(--muted-foreground))" }))
      .sort((a, b) => b.value - a.value);
  }, [views]);

  const dailyTrend = useMemo(() => {
    const map = new Map<string, number>();
    for (const v of views) {
      const day = v.created_at.slice(0, 10);
      map.set(day, (map.get(day) || 0) + 1);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, count]) => ({ day: day.slice(5), views: count }));
  }, [views]);

  const recommendations = useMemo(() => {
    const recs: { type: "grow" | "drop" | "promote"; text: string }[] = [];
    if (topGroups.length === 0) return recs;
    const top = topGroups[0];
    const total = topGroups.reduce((s, g) => s + g.value, 0);
    const topShare = total > 0 ? (top.value / total) * 100 : 0;
    recs.push({
      type: "grow",
      text: t(
        `🚀 Mục "${top.name}" đang dẫn đầu (${topShare.toFixed(0)}% lượt xem). Nên mở rộng nội dung và tạo lộ trình chuyên sâu.`,
        `🚀 "${top.name}" leads with ${topShare.toFixed(0)}% of views. Expand content and add deeper roadmaps.`,
      ),
    });
    if (topGroups.length > 1) {
      const bottom = topGroups[topGroups.length - 1];
      recs.push({
        type: "promote",
        text: t(
          `📣 Mục "${bottom.name}" có ít lượt xem (${bottom.value}). Cần marketing mạnh hơn hoặc đặt liên kết nổi bật trên trang chủ.`,
          `📣 "${bottom.name}" has low traffic (${bottom.value}). Promote it on the homepage or via marketing.`,
        ),
      });
    }
    const longPages = topPages.filter((p) => p.avgTime > 120).slice(0, 3);
    if (longPages.length > 0) {
      recs.push({
        type: "grow",
        text: t(
          `⏱️ Người dùng dành nhiều thời gian trên: ${longPages.map((p) => p.label).join(", ")}. Đây là nội dung "sticky" — hãy nhân rộng.`,
          `⏱️ Users spend long time on: ${longPages.map((p) => p.label).join(", ")}. These are sticky pages — replicate the format.`,
        ),
      });
    }
    return recs;
  }, [topGroups, topPages, t]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {t("Phân tích quan tâm người dùng", "User Interest Analytics")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t(
              "Theo dõi lượt xem trang, mục được quan tâm và thời gian người dùng dành cho từng phần.",
              "Track page views, popular sections and time spent per page.",
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={(v) => setRange(v as Range)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">{t("24 giờ qua", "Last 24h")}</SelectItem>
              <SelectItem value="7d">{t("7 ngày qua", "Last 7 days")}</SelectItem>
              <SelectItem value="30d">{t("30 ngày qua", "Last 30 days")}</SelectItem>
              <SelectItem value="90d">{t("90 ngày qua", "Last 90 days")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={fetchViews} disabled={loading}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Eye, label: t("Tổng lượt xem", "Page Views"), value: totals.pageviews, color: "text-sky-500" },
          { icon: MousePointerClick, label: t("Phiên truy cập", "Sessions"), value: totals.sessions, color: "text-emerald-500" },
          { icon: Users, label: t("Người dùng đăng nhập", "Logged-in Users"), value: totals.users, color: "text-violet-500" },
          { icon: Clock, label: t("TG TB / trang", "Avg Time / Page"), value: `${totals.avgTime}s`, color: "text-amber-500" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <p className="text-2xl font-bold tabular-nums text-foreground">
                  {loading ? "—" : s.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              {t("Gợi ý hướng phát triển", "Growth Recommendations")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recommendations.map((r, i) => (
              <div key={i} className="text-sm text-foreground leading-relaxed">
                {r.text}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Top Categories Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-4 h-4 text-primary" />
            {t("Mục được quan tâm nhất", "Most Popular Sections")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-72 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : topGroups.length === 0 ? (
            <div className="h-72 flex items-center justify-center text-sm text-muted-foreground">
              {t("Chưa có dữ liệu trong khoảng thời gian này", "No data in this range yet")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={topGroups} layout="vertical" margin={{ left: 16, right: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {topGroups.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Daily Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="w-4 h-4 text-primary" />
            {t("Xu hướng theo ngày", "Daily Trend")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dailyTrend.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">
              {t("Chưa có dữ liệu", "No data")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Top Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="w-4 h-4 text-primary" />
            {t("Top 20 trang được xem nhiều nhất", "Top 20 Most-Viewed Pages")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="min-w-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>{t("Trang", "Page")}</TableHead>
                    <TableHead>{t("Mục", "Section")}</TableHead>
                    <TableHead className="text-right">{t("Lượt xem", "Views")}</TableHead>
                    <TableHead className="text-right">{t("Người", "Users")}</TableHead>
                    <TableHead className="text-right">{t("TG TB", "Avg Time")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ) : topPages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-sm text-muted-foreground">
                        {t("Chưa có lượt xem nào", "No page views yet")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    topPages.map((p, i) => (
                      <TableRow key={p.path}>
                        <TableCell className="font-mono text-xs text-muted-foreground">{i + 1}</TableCell>
                        <TableCell>
                          <div className="font-medium text-foreground text-sm">{p.label}</div>
                          <div className="text-xs text-muted-foreground font-mono truncate max-w-[280px]">{p.path}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            style={{
                              backgroundColor: `${GROUP_COLORS[p.group] || "hsl(var(--muted))"}20`,
                              color: GROUP_COLORS[p.group] || "hsl(var(--muted-foreground))",
                            }}
                          >
                            {p.group}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold tabular-nums">{p.views}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">{p.users}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">{p.avgTime}s</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
