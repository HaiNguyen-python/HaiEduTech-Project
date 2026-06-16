import { lazy, Suspense, useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Shield, Users, BookOpen, TrendingUp, Loader2, BarChart3,
  Brain, AlertTriangle, ChevronRight, ArrowUpRight, ArrowDownRight, Minus,
  Target, Sparkles, Clock, Zap, ShieldCheck, Download, Search, Globe,
  Activity, DollarSign, Server, Wifi, WifiOff, RefreshCw, ClipboardList, UserCog, Bell
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  PieChart, Pie, LineChart, Line
} from "recharts";
import {
  computeStudentState, generateRecommendations, getCategoryLabel,
  DOMAIN_LABELS,
  type StudentState, type RLRecommendation, type LearningDomain
} from "@/lib/rlEngine";
import {
  isLearningActivity,
  SPEAKING_ACTIVITY_TYPES,
  SYSTEM_ACTIVITY_TYPES,
  sumActivityTypeCounts,
  avgScoreForActivityTypes,
  WRITING_ACTIVITY_TYPES,
  normalizeForSearch,
  csvEscape,
} from "@/lib/adminData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SystemStatusTab = lazy(() => import("@/components/SystemStatusTab"));
const IncomeManagement = lazy(() => import("@/components/IncomeManagement"));
const ClassScheduleManager = lazy(() => import("@/components/admin/ClassScheduleManager"));
const BusinessStrategyTab = lazy(() => import("@/components/admin/BusinessStrategyTab"));
const UserInsightsTab = lazy(() => import("@/components/admin/UserInsightsTab"));
const FeedbackAnalyticsTab = lazy(() => import("@/components/admin/FeedbackAnalyticsTab"));
const ChatbotConversationsReview = lazy(() => import("@/components/admin/ChatbotConversationsReview"));
const AttendanceAnalyticsTab = lazy(() => import("@/components/admin/AttendanceAnalyticsTab"));
const ReportLogsTab = lazy(() => import("@/components/admin/ReportLogsTab"));
const AssistantManagementTab = lazy(() => import("@/components/admin/AssistantManagementTab"));
const RLInterventionsTab = lazy(() => import("@/components/admin/RLInterventionsTab"));
const EnglishDictionaryAdmin = lazy(() => import("@/components/admin/EnglishDictionaryAdmin"));
const ServiceRequestsTab = lazy(() => import("@/components/admin/ServiceRequestsTab"));
const HealthMonitorTab = lazy(() => import("@/components/admin/HealthMonitorTab"));
const PhdResearchTab = lazy(() => import("@/components/admin/PhdResearchTab"));
const EdTechResearchInsightsTab = lazy(() => import("@/components/admin/EdTechResearchInsightsTab"));
const ResearchProjectsAdminTab = lazy(() => import("@/components/admin/ResearchProjectsAdminTab"));

// Priority colors
const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const TREND_ICONS = {
  improving: <ArrowUpRight className="w-4 h-4 text-green-500" />,
  declining: <ArrowDownRight className="w-4 h-4 text-red-500" />,
  stable: <Minus className="w-4 h-4 text-muted-foreground" />,
};

type AdminStudent = { id: string; full_name: string | null; created_at: string };
type AdminActivity = {
  user_id: string;
  activity_type: string;
  domain: string | null;
  score: number | null;
  max_score: number | null;
  time_spent_seconds: number | null;
  created_at: string;
  metadata: unknown;
};
type AdminUserMeta = { user_id: string; last_login: string | null; total_seconds: number | string };

const TabLoading = () => (
  <div className="flex justify-center py-10">
    <Loader2 className="w-6 h-6 animate-spin text-primary" />
  </div>
);

// Format a seconds count as "Xh Ym" / "Ym" / "<1m"
function formatDuration(sec: number): string {
  if (!sec || sec < 60) return sec > 0 ? "<1m" : "-";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// Format a ms timestamp as relative "Today / Xd ago / DD/MM"
function formatLastLogin(ts: number, isVi: boolean): string {
  if (!ts) return "-";
  const diffDays = Math.floor((Date.now() - ts) / 86400000);
  if (diffDays <= 0) return isVi ? "Hôm nay" : "Today";
  if (diffDays === 1) return isVi ? "Hôm qua" : "1d ago";
  if (diffDays < 30) return `${diffDays}${isVi ? " ngày" : "d ago"}`;
  return new Date(ts).toLocaleDateString(isVi ? "vi-VN" : "en-GB");
}

// Export data as CSV or JSON (RFC-4180 compliant escaping)
function exportData(data: object[], format: "csv" | "json", filename: string) {
  let blob: Blob;
  if (format === "json") {
    blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  } else {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csv = [
      headers.map(csvEscape).join(","),
      ...data.map(row => headers.map(h => csvEscape((row as Record<string, unknown>)[h])).join(","))
    ].join("\n");
    blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }); // BOM for Excel UTF-8
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.${format}`;
  a.click();
  URL.revokeObjectURL(url);
}

const AdminDashboard = () => {
  const { t } = useLanguage();
  const { isTeacher, isPureAssistant, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [studentStates, setStudentStates] = useState<StudentState[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentState | null>(null);
  const [recommendations, setRecommendations] = useState<RLRecommendation[]>([]);
  // Per-user engagement meta: total study seconds + most recent login timestamp.
  // Computed from the full activity stream (including system heartbeats / daily_login)
  // so teachers can see "actual time on platform" not only graded learning attempts.
  const [userMeta, setUserMeta] = useState<Map<string, { lastLogin: number; totalSeconds: number }>>(new Map());
  const [tabGroup, setTabGroup] = useState<"overview" | "students" | "learning" | "operations">("overview");
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Deep-link support: /admin?tab=health (used by Health Monitor notifications)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab");
    if (!t) return;
    const groupMap: Record<string, "overview" | "students" | "learning" | "operations"> = {
      overview: "overview", system: "overview",
      students: "students", insights: "students", attendance: "students", feedback: "students", chatbot: "students",
      "rl-engine": "learning", "rl-interventions": "learning", strategy: "learning", dictionary: "learning",
      income: "operations", assistants: "operations", schedule: "operations",
      "report-logs": "operations", "service-requests": "operations", health: "operations",
    };
    if (groupMap[t]) {
      setTabGroup(groupMap[t]);
      setActiveTab(t);
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [classStats, setClassStats] = useState({
    totalStudents: 0,
    totalActivities: 0,
    classAvg: 0,
    activeThisWeek: 0,
    domainCounts: { english: 0, chinese: 0, programming: 0 } as Record<LearningDomain, number>,
  });

  // Access control:
  //  - Teachers / admins: full access (incl. Income).
  //  - Pure assistants (CTV): observation access — same tabs minus Income.
  //  - Everyone else: redirect home.
  const canAccessDashboard = isTeacher || isPureAssistant;
  useEffect(() => {
    if (roleLoading) return;
    if (!canAccessDashboard) navigate("/", { replace: true });
  }, [roleLoading, canAccessDashboard, navigate]);

  // Fetch compact admin snapshot in one backend round-trip.
  const fetchAll = useCallback(async () => {
    if (!canAccessDashboard) return;
    setLoadingData(true);
    const sinceIso = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString();
    try {
      const { data, error } = await supabase.rpc("get_admin_dashboard_snapshot", { _since: sinceIso });
      if (error) throw error;

      const snapshot = (data || {}) as {
        students?: AdminStudent[];
        activities?: AdminActivity[];
        userMeta?: AdminUserMeta[];
      };
      const studentList = snapshot.students || [];

      const studentIdSet = new Set(studentList.map((s) => s.id));
      const learningActivities = (snapshot.activities || [])
        .filter((a) => studentIdSet.has(a.user_id) && isLearningActivity(a.activity_type));
      setActivities(learningActivities);

      const metaMap = new Map<string, { lastLogin: number; totalSeconds: number }>();
      for (const row of snapshot.userMeta || []) {
        if (!studentIdSet.has(row.user_id)) continue;
        metaMap.set(row.user_id, {
          lastLogin: row.last_login ? new Date(row.last_login).getTime() : 0,
          totalSeconds: Number(row.total_seconds) || 0,
        });
      }
      setUserMeta(metaMap);

      const states: StudentState[] = [];
      const studentMap = new Map(studentList.map(s => [s.id, s.full_name || "Unknown"]));
      const activityByUser = new Map<string, typeof learningActivities>();
      for (const act of learningActivities) {
        if (!activityByUser.has(act.user_id)) activityByUser.set(act.user_id, []);
        activityByUser.get(act.user_id)!.push(act);
      }

      for (const [userId, userActivities] of activityByUser) {
        const name = studentMap.get(userId) || "Unknown";
        states.push(computeStudentState(userId, name, userActivities));
      }

      for (const student of studentList) {
        if (!activityByUser.has(student.id)) {
          states.push(computeStudentState(student.id, student.full_name || "Unknown", []));
        }
      }

      states.sort((a, b) => b.totalActivities - a.totalActivities);
      setStudentStates(states);

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const activeThisWeek = new Set(
        learningActivities.filter(a => new Date(a.created_at) > oneWeekAgo).map(a => a.user_id)
      ).size;
      const activeStates = states.filter(s => s.totalActivities > 0);
      const classAvg = activeStates.length > 0
        ? activeStates.reduce((s, st) => s + st.avgScore, 0) / activeStates.length
        : 0;

      const domainCounts: Record<LearningDomain, number> = { english: 0, chinese: 0, programming: 0 };
      for (const act of learningActivities) {
        const raw = (act.domain as string) || "english";
        if (!(raw in domainCounts)) continue;
        domainCounts[raw as LearningDomain]++;
      }

      setClassStats({
        totalStudents: studentList.length,
        totalActivities: learningActivities.length,
        classAvg: Math.round(classAvg * 10) / 10,
        activeThisWeek,
        domainCounts,
      });
    } catch (error) {
      toast.error(t("Không tải được dữ liệu admin", "Could not load admin data"));
    } finally {
      setLoadingData(false);
    }
  }, [canAccessDashboard, t]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Realtime subscription for live updates - ignore high-frequency system events
  // (heartbeat/daily_login) and debounce to prevent refetch storms.
  const refetchTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!canAccessDashboard) return;
    const channel = supabase
      .channel("admin-activity-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "student_activity_log" },
        (payload: { new?: { activity_type?: string | null } }) => {
          const t = payload?.new?.activity_type as string | undefined;
          if (!t || SYSTEM_ACTIVITY_TYPES.has(t)) return; // skip heartbeats
          if (refetchTimerRef.current) window.clearTimeout(refetchTimerRef.current);
          refetchTimerRef.current = window.setTimeout(() => fetchAll(), 4000);
        }
      )
      .subscribe();

    return () => {
      if (refetchTimerRef.current) window.clearTimeout(refetchTimerRef.current);
      supabase.removeChannel(channel);
    };
  }, [canAccessDashboard, fetchAll]);

  // Select student and generate recommendations
  const handleSelectStudent = (state: StudentState) => {
    setSelectedStudent(state);
    setRecommendations(generateRecommendations(state));
  };

  // Build heatmap data from all student states (memoized - heavy iteration)
  const heatmapData = useMemo(() => {
    const skillTotals: Record<string, { total: number; count: number }> = {};
    for (const state of studentStates) {
      for (const [cat, data] of Object.entries(state.skillBreakdown)) {
        if (!skillTotals[cat]) skillTotals[cat] = { total: 0, count: 0 };
        skillTotals[cat].total += data.score;
        skillTotals[cat].count++;
      }
    }
    return Object.entries(skillTotals)
      .map(([cat, data]) => ({
        category: getCategoryLabel(cat, t("vi", "en") === "vi"),
        categoryKey: cat,
        avgScore: Math.round((data.total / data.count) * 10) / 10,
        studentCount: data.count,
      }))
      .sort((a, b) => a.avgScore - b.avgScore);
  }, [studentStates, t]);

  // Build domain pie chart data (memoized)
  const domainPieData = useMemo(() => Object.entries(classStats.domainCounts)
    .filter(([, count]) => count > 0)
    .map(([domain, count]) => ({
      name: DOMAIN_LABELS[domain as LearningDomain]?.[t("vi", "en") === "vi" ? "vi" : "en"] || domain,
      value: count,
      fill: DOMAIN_LABELS[domain as LearningDomain]?.color || "hsl(var(--primary))",
    })), [classStats.domainCounts, t]);

  // Build weekly trend data from activities (memoized)
  const weeklyTrend = useMemo(() => {
    const weeks: Record<string, Record<LearningDomain, number>> = {};
    for (const act of activities) {
      const date = new Date(act.created_at);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const key = weekStart.toISOString().slice(0, 10);
      if (!weeks[key]) weeks[key] = { english: 0, chinese: 0, programming: 0 };
      const raw = (act.domain as string) || "english";
      const domain = (raw in weeks[key] ? raw : "english") as LearningDomain;
      weeks[key][domain]++;
    }
    return Object.entries(weeks)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-8) // Last 8 weeks
      .map(([week, data]) => ({
        week: week.slice(5), // MM-DD
        ...data,
      }));
  }, [activities]);

  // Last Speaking / Writing date per user (memoized)
  const lastActivityByUser = useMemo(() => {
    const m = new Map<string, { lastSpeak: number; lastWrite: number }>();
    const speakSet = new Set(SPEAKING_ACTIVITY_TYPES);
    const writeSet = new Set(WRITING_ACTIVITY_TYPES);
    for (const act of activities) {
      const ts = new Date(act.created_at).getTime();
      const cur = m.get(act.user_id) || { lastSpeak: 0, lastWrite: 0 };
      if (speakSet.has(act.activity_type) && ts > cur.lastSpeak) cur.lastSpeak = ts;
      if (writeSet.has(act.activity_type) && ts > cur.lastWrite) cur.lastWrite = ts;
      m.set(act.user_id, cur);
    }
    return m;
  }, [activities]);

  // Filtered student list (diacritic-insensitive, memoized)
  const filteredStudents = useMemo(() => {
    if (!searchQuery) return studentStates;
    const q = normalizeForSearch(searchQuery);
    return studentStates.filter(s => normalizeForSearch(s.fullName).includes(q));
  }, [studentStates, searchQuery]);

  // Students needing intervention (score < 5 OR declining OR silent on speak/write > 14 days)
  const interventionNeeded = useMemo(() => {
    const now = Date.now();
    const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
    return studentStates.filter((s) => {
      const last = lastActivityByUser.get(s.userId);
      const silentSpeak = last && last.lastSpeak > 0 && now - last.lastSpeak > FOURTEEN_DAYS;
      const silentWrite = last && last.lastWrite > 0 && now - last.lastWrite > FOURTEEN_DAYS;
      return (
        (s.totalActivities >= 3 && (s.avgScore < 5 || s.recentTrend === "declining")) ||
        silentSpeak ||
        silentWrite
      );
    });
  }, [studentStates, lastActivityByUser]);

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isTeacher) return null;


  // Spider chart data for selected student
  const spiderData = selectedStudent
    ? Object.entries(selectedStudent.skillBreakdown).map(([cat, data]) => ({
        subject: getCategoryLabel(cat, t("vi", "en") === "vi"),
        score: data.score,
        fullMark: 10,
      }))
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    {t("Bảng Điều Khiển Quản Trị", "Admin Dashboard")}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {t("Theo dõi tiến độ học sinh & hệ thống can thiệp thông minh", "Track student progress & intelligent intervention system")}
                  </p>
                </div>
              </div>
              {/* Export buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData(activities, "csv", "haiedu_activities")}
                  className="gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData(activities, "json", "haiedu_activities")}
                  className="gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> JSON
                </Button>
              </div>
            </div>

            {/* Class Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Users, label: t("Tổng học sinh", "Total Students"), value: classStats.totalStudents, color: "text-sky-500" },
                { icon: BarChart3, label: t("Tổng hoạt động", "Total Activities"), value: classStats.totalActivities, color: "text-emerald-500" },
                { icon: Target, label: t("Điểm TB lớp", "Class Average"), value: `${classStats.classAvg}/10`, color: "text-amber-500" },
                { icon: Zap, label: t("Hoạt động tuần này", "Active This Week"), value: classStats.activeThisWeek, color: "text-violet-500" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <s.icon className={`w-4 h-4 ${s.color}`} />
                        <span className="text-xs text-muted-foreground">{s.label}</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground tabular-nums">
                        {loadingData ? "-" : s.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Intervention Alert Banner */}
            {interventionNeeded.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl border border-destructive/30 bg-destructive/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span className="font-bold text-destructive">
                    {t(`⚠️ ${interventionNeeded.length} học sinh cần can thiệp`, `⚠️ ${interventionNeeded.length} students need intervention`)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {interventionNeeded.map(s => (
                    <Badge
                      key={s.userId}
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => handleSelectStudent(s)}
                    >
                      {s.fullName} ({s.avgScore}/10) {s.recentTrend === "declining" ? "↘" : ""}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Main Tabs - grouped */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              {/* Group selector (top row) */}
              <div className="flex flex-wrap gap-2 p-1 bg-secondary/50 rounded-lg">
                {([
                  { key: "overview", label: t("Tổng quan", "Overview"), icon: Globe, first: "overview" },
                  { key: "students", label: t("Học sinh", "Students"), icon: Users, first: "students" },
                  { key: "learning", label: t("Học tập & AI", "Learning & AI"), icon: Brain, first: "rl-engine" },
                  { key: "operations", label: t("Vận hành", "Operations"), icon: DollarSign, first: isPureAssistant ? "assistants" : "income" },
                ] as const).map((g) => {
                  const Icon = g.icon;
                  const active = tabGroup === g.key;
                  return (
                    <button
                      key={g.key}
                      onClick={() => { setTabGroup(g.key); setActiveTab(g.first); }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                        active
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" /> {g.label}
                    </button>
                  );
                })}
                {/* Direct link to standalone Assignment Management page */}
                <button
                  onClick={() => navigate("/admin/assignments")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-all text-foreground/70 hover:bg-secondary hover:text-foreground"
                >
                  <ClipboardList className="w-4 h-4" /> {t("Quản lý Bài tập", "Assignments")}
                </button>
                {/* Direct link to Class Management page */}
                <button
                  onClick={() => navigate("/admin/classes")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-all text-foreground/70 hover:bg-secondary hover:text-foreground"
                >
                  <Users className="w-4 h-4" /> {t("Quản lý Lớp học", "Class Management")}
                </button>
                {/* Direct link to Placement Test diagnostic results */}
                <button
                  onClick={() => navigate("/admin/placement-test-results")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-all text-foreground/70 hover:bg-secondary hover:text-foreground"
                >
                  <ClipboardList className="w-4 h-4" /> {t("Kết quả Test đầu vào", "Placement Results")}
                </button>
              </div>

              {/* Sub-tabs (filtered by group) */}
              <TabsList className="bg-secondary/30 flex-wrap h-auto gap-1 p-1 border border-border">
                {tabGroup === "overview" && (
                  <>
                    <TabsTrigger value="overview" className="gap-1.5"><Globe className="w-3.5 h-3.5" /> {t("Tổng quan", "Overview")}</TabsTrigger>
                    <TabsTrigger value="system" className="gap-1.5"><Activity className="w-3.5 h-3.5" /> {t("Hệ thống API", "System Status")}</TabsTrigger>
                  </>
                )}
                {tabGroup === "students" && (
                  <>
                    <TabsTrigger value="students" className="gap-1.5"><Users className="w-3.5 h-3.5" /> {t("Học sinh", "Students")}</TabsTrigger>
                    <TabsTrigger value="insights" className="gap-1.5"><Search className="w-3.5 h-3.5" /> {t("Quan tâm người dùng", "User Insights")}</TabsTrigger>
                    <TabsTrigger value="attendance" className="gap-1.5"><Users className="w-3.5 h-3.5" /> {t("Điểm danh", "Attendance")}</TabsTrigger>
                    <TabsTrigger value="feedback" className="gap-1.5"><Search className="w-3.5 h-3.5" /> {t("Phản hồi học viên", "Feedback")}</TabsTrigger>
                    <TabsTrigger value="chatbot" className="gap-1.5"><Search className="w-3.5 h-3.5" /> {t("Chat AI Pet", "AI Pet Chats")}</TabsTrigger>
                  </>
                )}
                {tabGroup === "learning" && (
                  <>
                    <TabsTrigger value="rl-engine" className="gap-1.5"><Brain className="w-3.5 h-3.5" /> {t("Hệ thống can thiệp", "RL Engine")}</TabsTrigger>
                    <TabsTrigger value="rl-interventions" className="gap-1.5"><Bell className="w-3.5 h-3.5" /> {t("Chuông RL tự động", "RL Bell Dispatcher")}</TabsTrigger>
                    <TabsTrigger value="strategy" className="gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> {t("Chiến lược", "Strategy")}</TabsTrigger>
                    <TabsTrigger value="dictionary" className="gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {t("Từ điển Anh", "English Dictionary")}</TabsTrigger>
                  </>
                )}
                {tabGroup === "operations" && (
                  <>
                    {!isPureAssistant && (
                      <TabsTrigger value="income" className="gap-1.5"><DollarSign className="w-3.5 h-3.5" /> {t("Thu nhập", "Income")}</TabsTrigger>
                    )}
                    <TabsTrigger value="assistants" className="gap-1.5"><UserCog className="w-3.5 h-3.5" /> {t("Cộng tác viên", "Assistants")}</TabsTrigger>
                    <TabsTrigger value="schedule" className="gap-1.5"><Clock className="w-3.5 h-3.5" /> {t("Lịch học", "Schedule")}</TabsTrigger>
                    <TabsTrigger value="report-logs" className="gap-1.5"><ClipboardList className="w-3.5 h-3.5" /> {t("Báo cáo Email", "Report Logs")}</TabsTrigger>
                    <TabsTrigger value="service-requests" className="gap-1.5"><ClipboardList className="w-3.5 h-3.5" /> {t("Đơn đăng ký Web", "Service Requests")}</TabsTrigger>
                    <TabsTrigger value="health" className="gap-1.5"><Activity className="w-3.5 h-3.5" /> 🩺 Health Monitor</TabsTrigger>
                    <TabsTrigger value="phd-research" className="gap-1.5"><Brain className="w-3.5 h-3.5" /> 🎓 PhD Research</TabsTrigger>
                    <TabsTrigger value="edtech-insights" className="gap-1.5"><Search className="w-3.5 h-3.5" /> 🧪 EdTech Research Insights</TabsTrigger>
                  </>
                )}
              </TabsList>

              {/* ===== GLOBAL OVERVIEW TAB ===== */}
              <TabsContent value="overview">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Domain Distribution Pie */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        {t("Phân bổ hoạt động theo lĩnh vực", "Activity Distribution by Domain")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {domainPieData.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">{t("Chưa có dữ liệu", "No data yet")}</p>
                      ) : (
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={domainPieData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}`}
                            >
                              {domainPieData.map((entry, i) => (
                                <Cell key={i} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                      {/* Domain summary cards */}
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {(Object.entries(DOMAIN_LABELS) as [LearningDomain, typeof DOMAIN_LABELS["english"]][]).map(([domain, label]) => (
                          <div key={domain} className="text-center p-3 rounded-lg bg-muted/50">
                            <span className="text-2xl">{label.icon}</span>
                            <p className="text-xs text-muted-foreground mt-1">{t(label.vi, label.en)}</p>
                            <p className="text-lg font-bold text-foreground tabular-nums">{classStats.domainCounts[domain]}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Weekly Trend Line Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        {t("Xu hướng hoạt động theo tuần", "Weekly Activity Trend")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {weeklyTrend.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">{t("Chưa có dữ liệu", "No data yet")}</p>
                      ) : (
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={weeklyTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip
                              contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="english" stroke={DOMAIN_LABELS.english.color} strokeWidth={2} name={t("Tiếng Anh", "English")} />
                            <Line type="monotone" dataKey="chinese" stroke={DOMAIN_LABELS.chinese.color} strokeWidth={2} name={t("Tiếng Hoa", "Chinese")} />
                            <Line type="monotone" dataKey="programming" stroke={DOMAIN_LABELS.programming.color} strokeWidth={2} name={t("Lập trình", "Programming")} />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </CardContent>
                  </Card>

                  {/* Intervention Needed Table */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        {t("Học sinh cần can thiệp", "Students Needing Intervention")}
                        {interventionNeeded.length > 0 && (
                          <Badge variant="destructive" className="ml-2">{interventionNeeded.length}</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {interventionNeeded.length === 0 ? (
                        <p className="text-muted-foreground text-center py-6">{t("🎉 Không có học sinh nào cần can thiệp!", "🎉 No students need intervention!")}</p>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>{t("Học sinh", "Student")}</TableHead>
                              <TableHead className="text-center">{t("Điểm TB", "Avg")}</TableHead>
                              <TableHead className="text-center">{t("Xu hướng", "Trend")}</TableHead>
                              <TableHead>{t("Điểm yếu", "Weak Areas")}</TableHead>
                              <TableHead>{t("Lĩnh vực", "Domains")}</TableHead>
                              <TableHead>{t("Hành động đề xuất", "Suggested Action")}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {interventionNeeded.map(s => {
                              const recs = generateRecommendations(s).slice(0, 3);
                              const isVi = t("vi", "en") === "vi";
                              return (
                                <TableRow key={s.userId} className="cursor-pointer hover:bg-muted/50 align-top" onClick={() => handleSelectStudent(s)}>
                                  <TableCell className="font-medium align-top pt-3">{s.fullName}</TableCell>
                                  <TableCell className="text-center align-top pt-3">
                                    <span className="font-bold text-destructive">{s.avgScore}</span>
                                  </TableCell>
                                  <TableCell className="text-center align-top pt-3">{TREND_ICONS[s.recentTrend]}</TableCell>
                                  <TableCell className="align-top pt-3">
                                    <div className="flex flex-wrap gap-1">
                                      {s.weakestAreas.slice(0, 2).map(a => (
                                        <Badge key={a} variant="outline" className="text-xs">{getCategoryLabel(a, isVi)}</Badge>
                                      ))}
                                    </div>
                                  </TableCell>
                                  <TableCell className="align-top pt-3">
                                    <div className="flex gap-1">
                                      {(Object.entries(s.domainBreakdown) as [LearningDomain, { count: number }][])
                                        .filter(([, d]) => d.count > 0)
                                        .map(([domain]) => (
                                          <span key={domain} title={DOMAIN_LABELS[domain].en}>{DOMAIN_LABELS[domain].icon}</span>
                                        ))}
                                    </div>
                                  </TableCell>
                                  <TableCell className="min-w-[320px] max-w-[420px] whitespace-normal break-words leading-snug align-top">
                                    {recs.length === 0 ? (
                                      <span className="text-muted-foreground text-xs">-</span>
                                    ) : (
                                      <ul className="space-y-2">
                                        {recs.map((r, idx) => (
                                          <li key={idx} className="flex gap-2 text-xs">
                                            <span className={`shrink-0 mt-0.5 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide text-[10px] ${PRIORITY_COLORS[r.priority]}`}>
                                              {r.priority}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                              <p className="font-semibold text-foreground leading-snug">
                                                {isVi ? r.actionVi : r.action}
                                              </p>
                                              <p className="text-muted-foreground mt-0.5 leading-snug">
                                                {isVi ? r.detailsVi : r.details}
                                              </p>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* ===== STUDENTS TAB ===== */}
              <TabsContent value="students">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Student List */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            {t("Danh sách học sinh", "Student Overview")}
                          </CardTitle>
                          <div className="relative w-48">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              placeholder={t("Tìm kiếm...", "Search...")}
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-9 h-8 text-sm"
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {loadingData ? (
                          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                        ) : filteredStudents.length === 0 ? (
                          <p className="text-muted-foreground py-4">{t("Chưa có dữ liệu học sinh", "No student data yet")}</p>
                        ) : (
                          <ScrollArea className="h-[500px] w-full">
                            <div className="min-w-[1180px]">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>{t("Học sinh", "Student")}</TableHead>
                                  <TableHead className="text-center">{t("Hoạt động", "Activities")}</TableHead>
                                 <TableHead className="text-center">{t("Speaking", "Speaking")}</TableHead>
                                 <TableHead className="text-center">{t("Writing", "Writing")}</TableHead>
                                 <TableHead className="text-center" title={t("Số ngày kể từ lần Speaking gần nhất", "Days since last speaking")}>{t("Speak (ngày)", "Last Speak")}</TableHead>
                                 <TableHead className="text-center" title={t("Số ngày kể từ lần Writing gần nhất", "Days since last writing")}>{t("Write (ngày)", "Last Write")}</TableHead>
                                  <TableHead className="text-center" title={t("Tổng thời gian học tích lũy", "Cumulative study time")}>{t("Thời lượng", "Duration")}</TableHead>
                                  <TableHead className="text-center" title={t("Lần đăng nhập / hoạt động gần nhất", "Most recent login / activity")}>{t("Đăng nhập gần nhất", "Last Login")}</TableHead>
                                  <TableHead className="text-center">{t("Điểm TB", "Avg Score")}</TableHead>
                                  <TableHead className="text-center">{t("Lĩnh vực", "Domains")}</TableHead>
                                  <TableHead className="text-center">{t("Xu hướng", "Trend")}</TableHead>
                                  <TableHead className="text-center">{t("Cảnh báo", "Flag")}</TableHead>
                                  <TableHead></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredStudents.map((state) => {
                                  const needsIntervention = state.totalActivities >= 3 && (state.avgScore < 5 || state.recentTrend === "declining");
                                  const last = lastActivityByUser.get(state.userId);
                                  const now = Date.now();
                                  const daysSpeak = last && last.lastSpeak > 0 ? Math.floor((now - last.lastSpeak) / 86400000) : null;
                                  const daysWrite = last && last.lastWrite > 0 ? Math.floor((now - last.lastWrite) / 86400000) : null;
                                  const speakClass = daysSpeak === null ? "text-muted-foreground" : daysSpeak > 14 ? "text-red-600 font-bold" : daysSpeak > 7 ? "text-yellow-600 font-semibold" : "text-green-600";
                                  const writeClass = daysWrite === null ? "text-muted-foreground" : daysWrite > 14 ? "text-red-600 font-bold" : daysWrite > 7 ? "text-yellow-600 font-semibold" : "text-green-600";
                                  const meta = userMeta.get(state.userId);
                                  const totalSec = meta?.totalSeconds || 0;
                                  const lastLoginTs = meta?.lastLogin || 0;
                                  const loginDays = lastLoginTs ? Math.floor((Date.now() - lastLoginTs) / 86400000) : null;
                                  const loginClass = loginDays === null ? "text-muted-foreground" : loginDays > 14 ? "text-red-600 font-bold" : loginDays > 7 ? "text-yellow-600 font-semibold" : "text-green-600";
                                  const durationClass = totalSec >= 3600 ? "text-green-600 font-semibold" : totalSec >= 600 ? "text-foreground" : "text-muted-foreground";
                                  return (
                                    <TableRow
                                      key={state.userId}
                                      className={`cursor-pointer transition-colors ${selectedStudent?.userId === state.userId ? "bg-primary/5" : "hover:bg-muted/50"} ${needsIntervention ? "border-l-2 border-l-destructive" : ""}`}
                                      onClick={() => handleSelectStudent(state)}
                                    >
                                      <TableCell className="font-medium">{state.fullName}</TableCell>
                                      <TableCell className="text-center tabular-nums">{state.totalActivities}</TableCell>
                                       <TableCell className="text-center tabular-nums">{sumActivityTypeCounts(state.skillBreakdown, SPEAKING_ACTIVITY_TYPES)}</TableCell>
                                       <TableCell className="text-center tabular-nums">{sumActivityTypeCounts(state.skillBreakdown, WRITING_ACTIVITY_TYPES)}</TableCell>
                                       <TableCell className={`text-center tabular-nums ${speakClass}`}>{daysSpeak === null ? "-" : daysSpeak === 0 ? t("Hôm nay", "today") : `${daysSpeak}d`}</TableCell>
                                       <TableCell className={`text-center tabular-nums ${writeClass}`}>{daysWrite === null ? "-" : daysWrite === 0 ? t("Hôm nay", "today") : `${daysWrite}d`}</TableCell>
                                       <TableCell className={`text-center tabular-nums ${durationClass}`}>{formatDuration(totalSec)}</TableCell>
                                       <TableCell className={`text-center tabular-nums text-xs ${loginClass}`}>{formatLastLogin(lastLoginTs, t("vi", "en") === "vi")}</TableCell>
                                      <TableCell className="text-center">
                                        <span className={`font-bold tabular-nums ${state.avgScore >= 7 ? "text-green-600" : state.avgScore >= 5 ? "text-yellow-600" : "text-red-600"}`}>
                                          {state.avgScore > 0 ? state.avgScore : "-"}
                                        </span>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className="flex justify-center gap-0.5">
                                          {(Object.entries(state.domainBreakdown) as [LearningDomain, { count: number }][])
                                            .filter(([, d]) => d.count > 0)
                                            .map(([domain]) => (
                                              <span key={domain} className="text-sm" title={`${DOMAIN_LABELS[domain].en}: ${state.domainBreakdown[domain].avgScore}/10`}>
                                                {DOMAIN_LABELS[domain].icon}
                                              </span>
                                            ))}
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center">{TREND_ICONS[state.recentTrend]}</TableCell>
                                      <TableCell className="text-center">
                                        {needsIntervention && <AlertTriangle className="w-4 h-4 text-destructive mx-auto" />}
                                      </TableCell>
                                      <TableCell><ChevronRight className="w-4 h-4 text-muted-foreground" /></TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                            </div>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Student Detail - Spider Chart + Domain Breakdown */}
                  <div>
                    <Card className="sticky top-24">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {selectedStudent
                            ? `${t("Hồ sơ học tập", "Learning DNA")}: ${selectedStudent.fullName}`
                            : t("Chọn học sinh", "Select a student")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedStudent && spiderData.length > 0 ? (
                          <>
                            <ResponsiveContainer width="100%" height={250}>
                              <RadarChart data={spiderData}>
                                <PolarGrid stroke="hsl(var(--border))" />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 9 }} />
                                <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                              </RadarChart>
                            </ResponsiveContainer>

                            {/* Domain performance bars */}
                            <div className="mt-4 space-y-2">
                              <p className="text-xs font-semibold text-muted-foreground mb-2">{t("Hiệu suất theo lĩnh vực", "Performance by Domain")}</p>
                              {(Object.entries(selectedStudent.domainBreakdown) as [LearningDomain, { count: number; avgScore: number }][]).map(([domain, data]) => (
                                <div key={domain} className="flex items-center gap-2">
                                  <span className="text-lg">{DOMAIN_LABELS[domain].icon}</span>
                                  <div className="flex-1">
                                    <div className="flex justify-between text-xs mb-0.5">
                                      <span className="text-muted-foreground">{t(DOMAIN_LABELS[domain].vi, DOMAIN_LABELS[domain].en)}</span>
                                      <span className="font-bold">{data.count > 0 ? `${data.avgScore}/10` : "-"}</span>
                                    </div>
                                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                      <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                          width: `${data.count > 0 ? data.avgScore * 10 : 0}%`,
                                          backgroundColor: DOMAIN_LABELS[domain].color,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 space-y-2 border-t border-border pt-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{t("Tổng hoạt động", "Activities")}</span>
                                <span className="font-bold">{selectedStudent.totalActivities}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{t("Điểm TB", "Avg Score")}</span>
                                <span className="font-bold">{selectedStudent.avgScore}/10</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{t("Xu hướng", "Trend")}</span>
                                <span className="flex items-center gap-1">
                                  {TREND_ICONS[selectedStudent.recentTrend]}
                                  {t(
                                    selectedStudent.recentTrend === "improving" ? "Tiến bộ" : selectedStudent.recentTrend === "declining" ? "Giảm sút" : "Ổn định",
                                    selectedStudent.recentTrend === "improving" ? "Improving" : selectedStudent.recentTrend === "declining" ? "Declining" : "Stable"
                                  )}
                                </span>
                              </div>
                              {(() => {
                                const ieltsSpeakingTypes = ["ielts_speaking"];
                                const ieltsWritingTypes = ["ielts_writing"];
                                const speakCount = sumActivityTypeCounts(selectedStudent.skillBreakdown, SPEAKING_ACTIVITY_TYPES);
                                const writeCount = sumActivityTypeCounts(selectedStudent.skillBreakdown, WRITING_ACTIVITY_TYPES);
                                const ieltsSpeakAvg = avgScoreForActivityTypes(selectedStudent.skillBreakdown, ieltsSpeakingTypes);
                                const ieltsWriteAvg = avgScoreForActivityTypes(selectedStudent.skillBreakdown, ieltsWritingTypes);
                                const ieltsSpeakCount = sumActivityTypeCounts(selectedStudent.skillBreakdown, ieltsSpeakingTypes);
                                const ieltsWriteCount = sumActivityTypeCounts(selectedStudent.skillBreakdown, ieltsWritingTypes);
                                // IELTS band: 0-10 score → 0-9 band scale (heuristic mapping)
                                const toBand = (s: number) => Math.round(((s / 10) * 9) * 10) / 10;
                                const bandColor = (s: number) => s >= 7 ? "bg-green-500" : s >= 5.5 ? "bg-yellow-500" : "bg-orange-500";
                                return (
                                  <>
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">{t("Số lần luyện speaking", "Speaking attempts")}</span>
                                      <span className="font-bold">{speakCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">{t("Số lần luyện writing", "Writing attempts")}</span>
                                      <span className="font-bold">{writeCount}</span>
                                    </div>
                                    {(ieltsSpeakCount > 0 || ieltsWriteCount > 0) && (
                                      <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-emerald-500/5 border border-primary/15 space-y-2">
                                        <p className="text-xs font-semibold text-foreground">{t("Điểm IELTS ước tính", "Estimated IELTS Band")}</p>
                                        {ieltsSpeakCount > 0 && (
                                          <div>
                                            <div className="flex justify-between text-xs mb-0.5">
                                              <span className="text-muted-foreground">{t("Speaking", "Speaking")} · {ieltsSpeakCount} {t("bài", "tries")}</span>
                                              <span className="font-bold tabular-nums">{t("Band", "Band")} {toBand(ieltsSpeakAvg)}</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                              <div className={`h-full ${bandColor(toBand(ieltsSpeakAvg))} rounded-full transition-all`} style={{ width: `${Math.min(100, (toBand(ieltsSpeakAvg) / 9) * 100)}%` }} />
                                            </div>
                                          </div>
                                        )}
                                        {ieltsWriteCount > 0 && (
                                          <div>
                                            <div className="flex justify-between text-xs mb-0.5">
                                              <span className="text-muted-foreground">{t("Writing", "Writing")} · {ieltsWriteCount} {t("bài", "tries")}</span>
                                              <span className="font-bold tabular-nums">{t("Band", "Band")} {toBand(ieltsWriteAvg)}</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                              <div className={`h-full ${bandColor(toBand(ieltsWriteAvg))} rounded-full transition-all`} style={{ width: `${Math.min(100, (toBand(ieltsWriteAvg) / 9) * 100)}%` }} />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                              {selectedStudent.weakestAreas.length > 0 && (
                                <div className="pt-2 border-t border-border">
                                  <p className="text-xs font-medium text-muted-foreground mb-1">{t("Điểm yếu", "Weak areas")}:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedStudent.weakestAreas.map(a => (
                                      <span key={a} className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                                        {getCategoryLabel(a, t("vi", "en") === "vi")}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-12 text-muted-foreground">
                            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">{t("Chọn học sinh để xem hồ sơ học tập", "Click a student to view their learning profile")}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* ===== RL ENGINE TAB ===== */}
              <TabsContent value="rl-engine">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Student selector */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        {t("Chọn học sinh để phân tích", "Select Student for Analysis")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-2">
                          {studentStates.filter(s => s.totalActivities > 0).map((state) => {
                            const recs = generateRecommendations(state);
                            const hasHighPriority = recs.some(r => r.priority === "high");
                            return (
                              <button
                                key={state.userId}
                                onClick={() => handleSelectStudent(state)}
                                className={`w-full text-left p-3 rounded-lg border transition-all ${
                                  selectedStudent?.userId === state.userId
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/30"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-foreground">{state.fullName}</span>
                                  <div className="flex items-center gap-2">
                                    {hasHighPriority && <AlertTriangle className="w-4 h-4 text-destructive" />}
                                    {TREND_ICONS[state.recentTrend]}
                                    <span className={`text-sm font-bold ${state.avgScore >= 7 ? "text-green-600" : state.avgScore >= 5 ? "text-yellow-600" : "text-red-600"}`}>
                                      {state.avgScore}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-1 mt-1.5">
                                  {state.weakestAreas.slice(0, 2).map(a => (
                                    <span key={a} className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                                      {getCategoryLabel(a, t("vi", "en") === "vi")}
                                    </span>
                                  ))}
                                </div>
                              </button>
                            );
                          })}
                          {studentStates.filter(s => s.totalActivities > 0).length === 0 && (
                            <p className="text-muted-foreground text-center py-8">{t("Chưa có dữ liệu hoạt động", "No activity data yet")}</p>
                          )}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        {t("Đề xuất can thiệp", "System Recommendations")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedStudent && recommendations.length > 0 ? (
                        <div className="space-y-3">
                          <div className="bg-primary/5 rounded-lg p-3 border border-primary/20 mb-4">
                            <p className="text-sm font-medium text-foreground">
                              {t("Phân tích RL cho", "RL Analysis for")} <strong>{selectedStudent.fullName}</strong>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {t(
                                `Trạng thái: ${selectedStudent.totalActivities} hoạt động, TB ${selectedStudent.avgScore}/10, xu hướng ${selectedStudent.recentTrend === "improving" ? "tiến bộ" : selectedStudent.recentTrend === "declining" ? "giảm sút" : "ổn định"}`,
                                `State: ${selectedStudent.totalActivities} activities, avg ${selectedStudent.avgScore}/10, trend ${selectedStudent.recentTrend}`
                              )}
                            </p>
                          </div>

                          {recommendations.map((rec, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="border border-border rounded-lg p-4"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[rec.priority]}`}>
                                  {rec.priority === "high" ? t("Cao", "High") : rec.priority === "medium" ? t("Trung bình", "Medium") : t("Thấp", "Low")}
                                </span>
                              </div>
                              <p className="font-medium text-foreground text-sm mb-1">
                                {t(rec.actionVi, rec.action)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {t(rec.detailsVi, rec.details)}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <Brain className="w-12 h-12 mx-auto mb-3 opacity-30" />
                          <p className="text-sm">{t("Chọn học sinh để xem đề xuất can thiệp", "Select a student to see intervention recommendations")}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>



              {/* ===== RL BELL DISPATCHER TAB ===== */}
              <TabsContent value="rl-interventions">
                <RLInterventionsTab />
              </TabsContent>

              {/* ===== INCOME MANAGEMENT TAB (admin/teacher only) ===== */}
              {!isPureAssistant && (
                <TabsContent value="income">
                  <IncomeManagement />
                </TabsContent>
              )}

              {/* ===== ASSISTANT MANAGEMENT TAB ===== */}
              <TabsContent value="assistants">
                <AssistantManagementTab />
              </TabsContent>

              {/* ===== CLASS SCHEDULE TAB ===== */}
              <TabsContent value="schedule">
                <ClassScheduleManager />
              </TabsContent>

              {/* ===== SYSTEM STATUS & API MONITORING TAB ===== */}
              <TabsContent value="system">
                <SystemStatusTab />
              </TabsContent>

              {/* ===== USER INSIGHTS TAB (Page View Analytics) ===== */}
              <TabsContent value="insights">
                <UserInsightsTab />
              </TabsContent>

              {/* ===== BUSINESS STRATEGY TAB (Admin BI) ===== */}
              <TabsContent value="strategy">
                <BusinessStrategyTab />
              </TabsContent>

              <TabsContent value="feedback">
                <FeedbackAnalyticsTab />
              </TabsContent>

              <TabsContent value="attendance">
                <AttendanceAnalyticsTab />
              </TabsContent>

              <TabsContent value="chatbot">
                <ChatbotConversationsReview />
              </TabsContent>

              <TabsContent value="report-logs">
                <ReportLogsTab />
              </TabsContent>

              <TabsContent value="service-requests">
                <ServiceRequestsTab />
              </TabsContent>

              <TabsContent value="health">
                <HealthMonitorTab />
              </TabsContent>

              <TabsContent value="phd-research">
                <PhdResearchTab />
              </TabsContent>

              <TabsContent value="edtech-insights">
                <Tabs defaultValue="projects" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 max-w-xl">
                    <TabsTrigger value="projects">🧪 Research Projects</TabsTrigger>
                    <TabsTrigger value="legacy">📋 Legacy Survey</TabsTrigger>
                  </TabsList>
                  <TabsContent value="projects" className="mt-4">
                    <ResearchProjectsAdminTab />
                  </TabsContent>
                  <TabsContent value="legacy" className="mt-4">
                    <EdTechResearchInsightsTab />
                  </TabsContent>
                </Tabs>
              </TabsContent>


              <TabsContent value="dictionary">
                <Tabs defaultValue="en" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 max-w-2xl">
                    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                    <TabsTrigger value="zh">🇨🇳 中文</TabsTrigger>
                    <TabsTrigger value="fi">🇫🇮 Suomi</TabsTrigger>
                    <TabsTrigger value="vi">🇻🇳 Tiếng Việt</TabsTrigger>
                  </TabsList>
                  <TabsContent value="en" className="mt-4"><EnglishDictionaryAdmin lang="en" /></TabsContent>
                  <TabsContent value="zh" className="mt-4"><EnglishDictionaryAdmin lang="zh" /></TabsContent>
                  <TabsContent value="fi" className="mt-4"><EnglishDictionaryAdmin lang="fi" /></TabsContent>
                  <TabsContent value="vi" className="mt-4"><EnglishDictionaryAdmin lang="vi" /></TabsContent>
                </Tabs>
              </TabsContent>

            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
