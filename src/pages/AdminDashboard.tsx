import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield, Users, BookOpen, TrendingUp, Loader2, BarChart3,
  Brain, AlertTriangle, ChevronRight, ArrowUpRight, ArrowDownRight, Minus,
  Target, Sparkles, Clock, Zap, ShieldCheck, Download, Search, Globe,
  Activity, DollarSign, Server, Wifi, WifiOff, RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeacherAdmin from "@/pages/TeacherAdmin";
import CourseAccessManager from "@/components/CourseAccessManager";
import SystemStatusTab from "@/components/SystemStatusTab";
import IncomeManagement from "@/components/IncomeManagement";
import ClassScheduleManager from "@/components/admin/ClassScheduleManager";
import BusinessStrategyTab from "@/components/admin/BusinessStrategyTab";
import UserInsightsTab from "@/components/admin/UserInsightsTab";

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

// Export data as CSV or JSON
function exportData(data: any[], format: "csv" | "json", filename: string) {
  let blob: Blob;
  if (format === "json") {
    blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  } else {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(","),
      ...data.map(row => headers.map(h => {
        const val = row[h];
        return typeof val === "object" ? `"${JSON.stringify(val)}"` : `"${val}"`;
      }).join(","))
    ].join("\n");
    blob = new Blob([csv], { type: "text/csv" });
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
  const { user, isTeacher, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [studentStates, setStudentStates] = useState<StudentState[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentState | null>(null);
  const [recommendations, setRecommendations] = useState<RLRecommendation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [classStats, setClassStats] = useState({
    totalStudents: 0,
    totalActivities: 0,
    classAvg: 0,
    activeThisWeek: 0,
    domainCounts: { english: 0, chinese: 0, programming: 0 } as Record<LearningDomain, number>,
  });

  // Redirect non-teachers
  useEffect(() => {
    if (!roleLoading && !isTeacher) navigate("/", { replace: true });
  }, [roleLoading, isTeacher, navigate]);

  // Fetch all data
  const fetchAll = useCallback(async () => {
    if (!isTeacher) return;
    // Fetch students (exclude teachers/admins) and deduplicate by id
    const { data: profiles } = await supabase.from("profiles").select("id, full_name, created_at");
    const { data: teacherRoles } = await supabase
      .from("user_roles")
      .select("user_id")
      .in("role", ["teacher", "admin"]);
    const teacherIds = new Set((teacherRoles || []).map((r) => r.user_id));
    // Deduplicate by id and exclude teachers
    const seenIds = new Set<string>();
    const studentList = (profiles || []).filter((p) => {
      if (teacherIds.has(p.id) || seenIds.has(p.id)) return false;
      seenIds.add(p.id);
      return true;
    });
    setStudents(studentList);

    // Fetch all activity logs
    const { data: activityData } = await supabase
      .from("student_activity_log")
      .select("*")
      .order("created_at", { ascending: true });
    const allActivities = activityData || [];
    setActivities(allActivities);

    // Compute student states
    const states: StudentState[] = [];
    const studentMap = new Map(studentList.map(s => [s.id, s.full_name || "Unknown"]));

    // Group activities by user
    const activityByUser = new Map<string, typeof allActivities>();
    for (const act of allActivities) {
      if (!activityByUser.has(act.user_id)) activityByUser.set(act.user_id, []);
      activityByUser.get(act.user_id)!.push(act);
    }

    for (const [userId, userActivities] of activityByUser) {
      const name = studentMap.get(userId) || "Unknown";
      states.push(computeStudentState(userId, name, userActivities));
    }

    // Also include students with no activity
    for (const student of studentList) {
      if (!activityByUser.has(student.id)) {
        states.push(computeStudentState(student.id, student.full_name || "Unknown", []));
      }
    }

    states.sort((a, b) => b.totalActivities - a.totalActivities);
    setStudentStates(states);

    // Class stats with domain breakdown
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const activeThisWeek = new Set(
      allActivities.filter(a => new Date(a.created_at) > oneWeekAgo).map(a => a.user_id)
    ).size;

    const classAvg = states.length > 0
      ? states.filter(s => s.totalActivities > 0).reduce((s, st) => s + st.avgScore, 0) /
        Math.max(states.filter(s => s.totalActivities > 0).length, 1)
      : 0;

    // Domain counts (map unknown domains to "english")
    const domainCounts: Record<LearningDomain, number> = { english: 0, chinese: 0, programming: 0 };
    for (const act of allActivities) {
      const raw = (act.domain as string) || "english";
      const d = (raw in domainCounts ? raw : "english") as LearningDomain;
      domainCounts[d]++;
    }

    setClassStats({
      totalStudents: studentList.length,
      totalActivities: allActivities.length,
      classAvg: Math.round(classAvg * 10) / 10,
      activeThisWeek,
      domainCounts,
    });

    setLoadingData(false);
  }, [isTeacher]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Realtime subscription for live updates
  useEffect(() => {
    if (!isTeacher) return;
    const channel = supabase
      .channel("admin-activity-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "student_activity_log" },
        () => {
          // Refetch all data on new activity
          fetchAll();
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isTeacher, fetchAll]);

  // Select student and generate recommendations
  const handleSelectStudent = (state: StudentState) => {
    setSelectedStudent(state);
    setRecommendations(generateRecommendations(state));
  };

  // Build heatmap data from all student states
  const buildHeatmapData = () => {
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
  };

  // Build domain pie chart data
  const domainPieData = Object.entries(classStats.domainCounts)
    .filter(([, count]) => count > 0)
    .map(([domain, count]) => ({
      name: DOMAIN_LABELS[domain as LearningDomain]?.[t("vi", "en") === "vi" ? "vi" : "en"] || domain,
      value: count,
      fill: DOMAIN_LABELS[domain as LearningDomain]?.color || "hsl(var(--primary))",
    }));

  // Build weekly trend data from activities
  const buildWeeklyTrend = () => {
    const weeks: Record<string, Record<LearningDomain, number>> = {};
    for (const act of activities) {
      const date = new Date(act.created_at);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const key = weekStart.toISOString().slice(0, 10);
      if (!weeks[key]) weeks[key] = { english: 0, chinese: 0, programming: 0 };
      const domain = (act.domain as LearningDomain) || "english";
      weeks[key][domain]++;
    }
    return Object.entries(weeks)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-8) // Last 8 weeks
      .map(([week, data]) => ({
        week: week.slice(5), // MM-DD
        ...data,
      }));
  };

  // Filtered student list
  const filteredStudents = searchQuery
    ? studentStates.filter(s => s.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    : studentStates;

  // Students needing intervention (score < 5)
  const interventionNeeded = studentStates.filter(
    s => s.totalActivities >= 3 && (s.avgScore < 5 || s.recentTrend === "declining")
  );

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isTeacher) return null;

  const heatmapData = buildHeatmapData();
  const weeklyTrend = buildWeeklyTrend();

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

            {/* Main Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-secondary/50 flex-wrap h-auto gap-1 p-1">
                <TabsTrigger value="overview" className="gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> {t("Tổng quan", "Overview")}
                </TabsTrigger>
                <TabsTrigger value="insights" className="gap-1.5">
                  <Search className="w-3.5 h-3.5" /> {t("Quan tâm người dùng", "User Insights")}
                </TabsTrigger>
                <TabsTrigger value="students" className="gap-1.5">
                  <Users className="w-3.5 h-3.5" /> {t("Học sinh", "Students")}
                </TabsTrigger>
                <TabsTrigger value="heatmap" className="gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" /> {t("Bản đồ kỹ năng", "Skill Heatmap")}
                </TabsTrigger>
                <TabsTrigger value="rl-engine" className="gap-1.5">
                  <Brain className="w-3.5 h-3.5" /> {t("Hệ thống can thiệp", "RL Engine")}
                </TabsTrigger>
                <TabsTrigger value="income" className="gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> {t("Thu nhập", "Income")}
                </TabsTrigger>
                <TabsTrigger value="schedule" className="gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {t("Lịch học", "Schedule")}
                </TabsTrigger>
                <TabsTrigger value="system" className="gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> {t("Hệ thống API", "System Status")}
                </TabsTrigger>
                <TabsTrigger value="strategy" className="gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> {t("Chiến lược", "Strategy")}
                </TabsTrigger>
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
                              const recs = generateRecommendations(s);
                              const topRec = recs[0];
                              return (
                                <TableRow key={s.userId} className="cursor-pointer hover:bg-muted/50" onClick={() => handleSelectStudent(s)}>
                                  <TableCell className="font-medium">{s.fullName}</TableCell>
                                  <TableCell className="text-center">
                                    <span className="font-bold text-destructive">{s.avgScore}</span>
                                  </TableCell>
                                  <TableCell className="text-center">{TREND_ICONS[s.recentTrend]}</TableCell>
                                  <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                      {s.weakestAreas.slice(0, 2).map(a => (
                                        <Badge key={a} variant="outline" className="text-xs">{getCategoryLabel(a, t("vi", "en") === "vi")}</Badge>
                                      ))}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-1">
                                      {(Object.entries(s.domainBreakdown) as [LearningDomain, { count: number }][])
                                        .filter(([, d]) => d.count > 0)
                                        .map(([domain]) => (
                                          <span key={domain} title={DOMAIN_LABELS[domain].en}>{DOMAIN_LABELS[domain].icon}</span>
                                        ))}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                                    {topRec ? t(topRec.actionVi, topRec.action) : "-"}
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
                          <ScrollArea className="h-[500px]">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>{t("Học sinh", "Student")}</TableHead>
                                  <TableHead className="text-center">{t("Hoạt động", "Activities")}</TableHead>
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
                                  return (
                                    <TableRow
                                      key={state.userId}
                                      className={`cursor-pointer transition-colors ${selectedStudent?.userId === state.userId ? "bg-primary/5" : "hover:bg-muted/50"} ${needsIntervention ? "border-l-2 border-l-destructive" : ""}`}
                                      onClick={() => handleSelectStudent(state)}
                                    >
                                      <TableCell className="font-medium">{state.fullName}</TableCell>
                                      <TableCell className="text-center tabular-nums">{state.totalActivities}</TableCell>
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

              {/* ===== HEATMAP TAB ===== */}
              <TabsContent value="heatmap">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      {t("Bản đồ kỹ năng toàn lớp", "Class-Wide Skill Heatmap")}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {t("Các chủ đề có điểm thấp nhất cần được ưu tiên trong giáo trình", "Topics with lowest scores should be prioritized in the syllabus")}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {heatmapData.length === 0 ? (
                      <p className="text-muted-foreground py-8 text-center">{t("Chưa có dữ liệu", "No data yet")}</p>
                    ) : (
                      <ResponsiveContainer width="100%" height={Math.max(300, heatmapData.length * 45)}>
                        <BarChart data={heatmapData} layout="vertical" margin={{ left: 120, right: 20, top: 10, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 12 }} />
                          <YAxis type="category" dataKey="category" tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }} width={110} />
                          <Tooltip
                            contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                            formatter={(value: number) => [`${value}/10`, t("Điểm TB", "Avg Score")]}
                          />
                          <Bar dataKey="avgScore" radius={[0, 4, 4, 0]}>
                            {heatmapData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.avgScore >= 7 ? "hsl(142, 76%, 36%)" : entry.avgScore >= 5 ? "hsl(48, 96%, 53%)" : "hsl(0, 84%, 60%)"}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
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



              {/* ===== INCOME MANAGEMENT TAB ===== */}
              <TabsContent value="income">
                <IncomeManagement />
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
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
