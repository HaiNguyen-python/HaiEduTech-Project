// Feedback Analytics Tab - visualizes student post-lesson feedback for Teacher Hai.
// Combines two data sources:
//   1. Legacy like/dislike rows (like => 5★, dislike => 1★)
//   2. New Likert ratings: rating_clarity, rating_ai_tool, rating_confidence (1–5) + suggestion text
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, AlertTriangle, MessageSquare, TrendingDown, BarChart3 } from "lucide-react";
import { fetchAllRows } from "@/lib/adminData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface FeedbackRow {
  id: string;
  created_at: string;
  lesson_id: string;
  lesson_type: string;
  subject: string | null;
  feedback_type: string;
  user_id: string | null;
  rating_clarity: number | null;
  rating_ai_tool: number | null;
  rating_confidence: number | null;
  suggestion: string | null;
  lesson_title: string | null;
  profiles?: { full_name: string | null } | null;
}

// Compute per-row aggregate score (1–5) blending Likert ratings + like/dislike fallback.
const rowAvg = (r: FeedbackRow): number | null => {
  const likerts = [r.rating_clarity, r.rating_ai_tool, r.rating_confidence].filter(
    (v): v is number => typeof v === "number",
  );
  if (likerts.length > 0) return likerts.reduce((a, b) => a + b, 0) / likerts.length;
  if (r.feedback_type === "like") return 5;
  if (r.feedback_type === "dislike") return 1;
  return null;
};

const SUBJECT_LABELS: Record<string, string> = {
  english: "English",
  chinese: "Chinese",
  finnish: "Finnish",
  vietnamese: "Vietnamese",
  programming: "Programming",
};

const FeedbackAnalyticsTab = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [profileMap, setProfileMap] = useState<Record<string, string>>({});

  // Filters for the qualitative table
  const [filter, setFilter] = useState<"all" | "critical" | string>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const list = await fetchAllRows<FeedbackRow>((from, to) =>
        supabase
          .from("lesson_feedback")
          .select(
            "id,created_at,lesson_id,lesson_type,subject,feedback_type,user_id,rating_clarity,rating_ai_tool,rating_confidence,suggestion,lesson_title",
          )
          .order("created_at", { ascending: false })
          .range(from, to)
      );
      setRows(list);

      // Fetch profile names in one query
      const userIds = Array.from(new Set(list.map((r) => r.user_id).filter(Boolean))) as string[];
      if (userIds.length > 0) {
        const { data: profs } = await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", userIds);
        const map: Record<string, string> = {};
        (profs || []).forEach((p: any) => {
          map[p.id] = p.full_name || "Student";
        });
        setProfileMap(map);
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  // ───────────── Key metrics ─────────────
  const metrics = useMemo(() => {
    const scored = rows.map(rowAvg).filter((v): v is number => v !== null);
    const avg = scored.length ? scored.reduce((a, b) => a + b, 0) / scored.length : 0;
    const negatives = rows.filter((r) => {
      const a = rowAvg(r);
      return a !== null && a <= 2.5;
    }).length;
    const withSuggestion = rows.filter((r) => (r.suggestion || "").trim().length > 0).length;
    return { total: rows.length, avg, negatives, withSuggestion };
  }, [rows]);

  // ───────────── Chart 1: trend over time (last 14 days) ─────────────
  const trendData = useMemo(() => {
    const days = 14;
    const buckets: Record<string, { clarity: number[]; ai: number[]; conf: number[] }> = {};
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      buckets[key] = { clarity: [], ai: [], conf: [] };
    }
    rows.forEach((r) => {
      const key = r.created_at.slice(0, 10);
      if (!buckets[key]) return;
      // Fallback: map like/dislike to all three dimensions when granular ratings missing
      const fb = r.feedback_type === "like" ? 5 : r.feedback_type === "dislike" ? 1 : null;
      const c = r.rating_clarity ?? fb;
      const a = r.rating_ai_tool ?? fb;
      const cf = r.rating_confidence ?? fb;
      if (typeof c === "number") buckets[key].clarity.push(c);
      if (typeof a === "number") buckets[key].ai.push(a);
      if (typeof cf === "number") buckets[key].conf.push(cf);
    });
    const avg = (arr: number[]) => (arr.length ? arr.reduce((x, y) => x + y, 0) / arr.length : null);
    return Object.entries(buckets).map(([date, v]) => ({
      date: date.slice(5),
      clarity: avg(v.clarity),
      ai: avg(v.ai),
      confidence: avg(v.conf),
    }));
  }, [rows]);

  // ───────────── Chart 2: top 5 hardest / lowest-rated lessons ─────────────
  const hardestLessons = useMemo(() => {
    const map = new Map<string, { id: string; title: string; scores: number[] }>();
    rows.forEach((r) => {
      const s = rowAvg(r);
      if (s === null) return;
      const key = r.lesson_id;
      if (!map.has(key)) {
        map.set(key, {
          id: key,
          title: r.lesson_title || r.lesson_id,
          scores: [],
        });
      }
      map.get(key)!.scores.push(s);
    });
    return Array.from(map.values())
      .filter((m) => m.scores.length >= 2) // need at least 2 votes for signal
      .map((m) => ({
        id: m.id,
        title: m.title.length > 38 ? m.title.slice(0, 36) + "…" : m.title,
        avg: Number((m.scores.reduce((a, b) => a + b, 0) / m.scores.length).toFixed(2)),
        votes: m.scores.length,
      }))
      .sort((a, b) => a.avg - b.avg)
      .slice(0, 5);
  }, [rows]);

  // ───────────── Chart 3: rating distribution 1–5 ─────────────
  const distribution = useMemo(() => {
    const buckets = [0, 0, 0, 0, 0]; // index = stars-1
    rows.forEach((r) => {
      const s = rowAvg(r);
      if (s === null) return;
      const star = Math.max(1, Math.min(5, Math.round(s)));
      buckets[star - 1] += 1;
    });
    return buckets.map((count, i) => ({ stars: `${i + 1}★`, count, idx: i + 1 }));
  }, [rows]);

  // ───────────── Qualitative table ─────────────
  const filteredRows = useMemo(() => {
    let out = rows;
    if (filter === "critical") {
      out = out.filter((r) => {
        const s = rowAvg(r);
        return s !== null && s <= 2;
      });
    } else if (filter !== "all") {
      out = out.filter((r) => (r.subject || r.lesson_type) === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (r) =>
          (r.lesson_title || r.lesson_id).toLowerCase().includes(q) ||
          (r.suggestion || "").toLowerCase().includes(q) ||
          (r.user_id ? (profileMap[r.user_id] || "").toLowerCase().includes(q) : false),
      );
    }
    return out;
  }, [rows, filter, search, profileMap]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const pageRows = filteredRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  // ───────────── Render ─────────────
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-72 rounded-lg" />
          <Skeleton className="h-72 rounded-lg" />
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    );
  }

  const KPI = ({
    icon: Icon,
    label,
    value,
    sub,
    tone,
  }: {
    icon: any;
    label: string;
    value: string;
    sub?: string;
    tone: "teal" | "amber" | "red" | "cyan";
  }) => {
    const tones = {
      teal: "from-teal-500/15 to-emerald-500/5 text-teal-600 border-teal-500/20",
      cyan: "from-cyan-500/15 to-sky-500/5 text-cyan-600 border-cyan-500/20",
      amber: "from-amber-500/15 to-orange-500/5 text-amber-600 border-amber-500/20",
      red: "from-rose-500/15 to-red-500/5 text-rose-600 border-rose-500/20",
    }[tone];
    return (
      <Card className={`bg-gradient-to-br ${tones} border`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4" />
            <span className="text-xs font-medium">{label}</span>
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI
          icon={Star}
          tone="teal"
          label={t("Điểm trung bình", "Average Rating")}
          value={metrics.avg ? `${metrics.avg.toFixed(2)} / 5` : "—"}
          sub={t("Toàn bộ bài học", "Across all lessons")}
        />
        <KPI
          icon={MessageSquare}
          tone="cyan"
          label={t("Tổng phản hồi", "Total Feedbacks")}
          value={metrics.total.toLocaleString()}
          sub={t("Lượt phản hồi đã nhận", "Responses received")}
        />
        <KPI
          icon={AlertTriangle}
          tone="red"
          label={t("Cảnh báo tiêu cực", "Negative Alerts")}
          value={metrics.negatives.toLocaleString()}
          sub={t("Điểm ≤ 2.5", "Score ≤ 2.5")}
        />
        <KPI
          icon={TrendingDown}
          tone="amber"
          label={t("Có góp ý chữ", "With Suggestions")}
          value={metrics.withSuggestion.toLocaleString()}
          sub={t("Phản hồi định tính", "Qualitative input")}
        />
      </div>

      {/* Chart 1: Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-500" />
            {t("Xu hướng hài lòng theo ngày (14 ngày gần nhất)", "Satisfaction trend (last 14 days)")}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[1, 5]} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="clarity"
                name={t("Độ rõ nội dung", "Content Clarity")}
                stroke="#14b8a6"
                strokeWidth={2}
                dot={{ r: 3 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="ai"
                name={t("Mức độ hấp dẫn bài học", "Lesson Engagement")}
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ r: 3 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="confidence"
                name={t("Tự tin sau bài", "Confidence")}
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 3 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 2: Hardest lessons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              {t("Top 5 bài có điểm thấp nhất", "Top 5 lowest-rated lessons")}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {hardestLessons.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                {t("Chưa đủ dữ liệu", "Not enough data yet")}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={hardestLessons} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} horizontal={false} />
                  <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="title" tick={{ fontSize: 11 }} width={160} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                    formatter={(v: any, _n: any, p: any) => [`${v} / 5 (${p.payload.votes} votes)`, "Avg"]}
                  />
                  <Bar dataKey="avg" radius={[0, 6, 6, 0]} fill="#f43f5e" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Chart 3: Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              {t("Phân bố đánh giá", "Rating distribution")}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribution} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="stars" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {distribution.map((d) => (
                    <Cell
                      key={d.stars}
                      fill={
                        d.idx <= 2 ? "#f43f5e" : d.idx === 3 ? "#f59e0b" : d.idx === 4 ? "#06b6d4" : "#14b8a6"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Qualitative table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-500" />
            {t("Bảng góp ý của học viên", "Student feedback comments")}
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Select value={filter} onValueChange={(v) => setFilter(v)}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("Tất cả phản hồi", "All Feedback")}</SelectItem>
                <SelectItem value="critical">
                  {t("Chỉ phản hồi tiêu cực (≤ 2★)", "Only critical (≤ 2★)")}
                </SelectItem>
                <SelectItem value="english">English Hub</SelectItem>
                <SelectItem value="chinese">Chinese Hub</SelectItem>
                <SelectItem value="finnish">Finnish Hub</SelectItem>
                <SelectItem value="vietnamese">Vietnamese Hub</SelectItem>
                <SelectItem value="programming">Programming Hub</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder={t("Tìm theo bài học, học viên, từ khoá…", "Search lesson, student, keyword…")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filteredRows.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              {t("Chưa có phản hồi nào khớp bộ lọc", "No feedback matches the filter")}
            </p>
          ) : (
            <>
              <div className="min-w-[720px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("Ngày", "Date")}</TableHead>
                      <TableHead>{t("Học viên", "Student")}</TableHead>
                      <TableHead>{t("Bài học", "Lesson")}</TableHead>
                      <TableHead>Hub</TableHead>
                      <TableHead className="text-right">{t("Điểm", "Score")}</TableHead>
                      <TableHead>{t("Góp ý", "Suggestion")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageRows.map((r) => {
                      const score = rowAvg(r);
                      const tone =
                        score === null
                          ? "secondary"
                          : score <= 2
                          ? "destructive"
                          : score >= 4
                          ? "default"
                          : "secondary";
                      const hub = SUBJECT_LABELS[r.subject || r.lesson_type] || r.subject || r.lesson_type;
                      return (
                        <TableRow key={r.id}>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(r.created_at).toLocaleDateString("vi-VN")}
                          </TableCell>
                          <TableCell className="text-sm">
                            {r.user_id ? profileMap[r.user_id] || "—" : t("Khách", "Guest")}
                          </TableCell>
                          <TableCell className="text-sm max-w-[260px] truncate" title={r.lesson_title || r.lesson_id}>
                            {r.lesson_title || r.lesson_id}
                          </TableCell>
                          <TableCell className="text-xs">{hub}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={tone as any}>{score === null ? "—" : `${score.toFixed(1)}★`}</Badge>
                          </TableCell>
                          <TableCell className="text-sm max-w-[320px]">
                            {r.suggestion?.trim() ? (
                              <span className="text-foreground">{r.suggestion}</span>
                            ) : (
                              <span className="text-muted-foreground italic text-xs">
                                {r.feedback_type === "like"
                                  ? "👍 Helpful"
                                  : r.feedback_type === "dislike"
                                  ? "👎 Needs improvement"
                                  : "—"}
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between pt-4 text-xs text-muted-foreground">
                <span>
                  {t("Hiển thị", "Showing")} {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, filteredRows.length)} / {filteredRows.length}
                </span>
                <div className="flex gap-1">
                  <button
                    className="px-3 py-1 rounded-md border border-border disabled:opacity-40"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    ‹ {t("Trước", "Prev")}
                  </button>
                  <span className="px-3 py-1">
                    {page} / {totalPages}
                  </span>
                  <button
                    className="px-3 py-1 rounded-md border border-border disabled:opacity-40"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                  >
                    {t("Sau", "Next")} ›
                  </button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackAnalyticsTab;
