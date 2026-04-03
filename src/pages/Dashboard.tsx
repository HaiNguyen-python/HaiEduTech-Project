import { Link } from "react-router-dom";
import FloatingParticles from "@/components/FloatingParticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Target, TrendingUp, Calendar, Flame, LogIn, BookOpen,
  BarChart3, Clock, Award, ArrowRight, Activity, Trophy,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar,
} from "recharts";

// Types for processed dashboard data
interface DashboardStats {
  totalActivities: number;
  totalTimeMinutes: number;
  avgScore: number;
  studyStreak: number;
  domainBreakdown: { domain: string; count: number; avgScore: number }[];
  skillRadar: { skill: string; value: number }[];
  weeklyTrend: { week: string; activities: number; avgScore: number }[];
  heatmap: number[][]; // 52 weeks x 7 days
  recentActivities: {
    type: string;
    domain: string;
    score: number | null;
    maxScore: number | null;
    date: string;
    timeSpent: number | null;
  }[];
}

const DOMAIN_LABELS: Record<string, string> = {
  english: "English",
  chinese: "Chinese",
  programming: "Programming",
};

const SKILL_MAP: Record<string, string[]> = {
  english: ["Grammar", "Vocabulary", "Reading", "Writing", "Speaking"],
  chinese: ["Pinyin", "Hanzi", "Grammar", "Reading", "Vocabulary"],
  programming: ["Syntax", "Logic", "SQL", "Data", "Algorithms"],
};

const heatColors = ["bg-secondary", "bg-primary/20", "bg-primary/40", "bg-primary/60", "bg-primary"];

const Dashboard = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'SIGNED_IN' && session?.user) {
        const meta = session.user.user_metadata;
        if (meta?.full_name || meta?.avatar_url) {
          setTimeout(async () => {
            await supabase.from('profiles').upsert({
              id: session.user.id,
              full_name: meta.full_name || meta.name || null,
              avatar_url: meta.avatar_url || meta.picture || null,
            }, { onConflict: 'id' });
          }, 0);
        }
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fetch real data when user is available
  const fetchDashboardData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);

    // Get display name from profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();
    setDisplayName(
      profile?.full_name ||
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Student"
    );

    // Fetch all activities for this user
    const { data: activities } = await supabase
      .from("student_activity_log")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });
    const acts = activities || [];

    // Fetch writing attempts
    const { data: writings } = await supabase
      .from("writing_attempts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });
    const writingAttempts = writings || [];

    // Fetch lesson feedback count
    const { count: feedbackCount } = await supabase
      .from("lesson_feedback")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    // Combine all activity sources
    const allEvents = [
      ...acts.map((a) => ({
        type: a.activity_type,
        domain: (a.domain as string) || "english",
        score: a.score as number | null,
        maxScore: a.max_score as number | null,
        date: a.created_at,
        timeSpent: a.time_spent_seconds as number | null,
        metadata: a.metadata as Record<string, any> | null,
      })),
      ...writingAttempts.map((w) => ({
        type: `writing_task_${w.task_type}`,
        domain: "english" as string,
        score: w.overall_score as number | null,
        maxScore: 9 as number | null,
        date: w.created_at,
        timeSpent: null as number | null,
        metadata: null as Record<string, any> | null,
      })),
    ];

    // Total activities
    const totalActivities = allEvents.length + (feedbackCount || 0);

    // Total time
    const totalTimeMinutes = Math.round(
      allEvents.reduce((s, e) => s + (e.timeSpent || 0), 0) / 60
    );

    // Average score (only scored activities)
    const scoredEvents = allEvents.filter((e) => e.score !== null && e.maxScore);
    const avgScore =
      scoredEvents.length > 0
        ? Math.round(
            (scoredEvents.reduce((s, e) => s + ((e.score! / e.maxScore!) * 100), 0) /
              scoredEvents.length) *
              10
          ) / 10
        : 0;

    // Study streak (consecutive days with activity, counting backwards from today)
    const activityDates = new Set(
      allEvents.map((e) => new Date(e.date).toISOString().split("T")[0])
    );
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      if (activityDates.has(key)) {
        streak++;
      } else if (i > 0) {
        break; // streak broken
      }
    }

    // Domain breakdown
    const domainMap = new Map<string, { count: number; totalPct: number; scored: number }>();
    for (const e of allEvents) {
      const d = e.domain;
      if (!domainMap.has(d)) domainMap.set(d, { count: 0, totalPct: 0, scored: 0 });
      const entry = domainMap.get(d)!;
      entry.count++;
      if (e.score !== null && e.maxScore) {
        entry.totalPct += (e.score / e.maxScore) * 100;
        entry.scored++;
      }
    }
    const domainBreakdown = Array.from(domainMap.entries()).map(([domain, data]) => ({
      domain: DOMAIN_LABELS[domain] || domain,
      count: data.count,
      avgScore: data.scored > 0 ? Math.round((data.totalPct / data.scored) * 10) / 10 : 0,
    }));

    // Skill radar — aggregate scores by skill tag from metadata
    const skillScores = new Map<string, { total: number; count: number }>();
    for (const e of allEvents) {
      if (e.score === null || !e.maxScore) continue;
      const pct = (e.score / e.maxScore) * 100;

      // Use metadata skill if available
      const skill = (e.metadata as any)?.skill || e.type;
      const domainSkills = SKILL_MAP[e.domain] || [];

      // Map activity type to skill category
      let skillName = skill;
      if (e.type.includes("writing")) skillName = "Writing";
      else if (e.type.includes("speaking")) skillName = "Speaking";
      else if (e.type.includes("assessment")) {
        // For assessments, distribute score across domain skills
        for (const ds of domainSkills) {
          if (!skillScores.has(ds)) skillScores.set(ds, { total: 0, count: 0 });
          const s = skillScores.get(ds)!;
          s.total += pct;
          s.count++;
        }
        continue;
      }

      if (!skillScores.has(skillName)) skillScores.set(skillName, { total: 0, count: 0 });
      const s = skillScores.get(skillName)!;
      s.total += pct;
      s.count++;
    }

    // Build radar from all domains' skills
    const allSkillNames = new Set<string>();
    for (const domain of Object.keys(SKILL_MAP)) {
      for (const s of SKILL_MAP[domain]) allSkillNames.add(s);
    }
    const skillRadar = Array.from(allSkillNames).map((skill) => ({
      skill,
      value: skillScores.has(skill)
        ? Math.round(skillScores.get(skill)!.total / skillScores.get(skill)!.count)
        : 0,
    })).filter((s) => s.value > 0);

    // If no skill data, create a placeholder from domain scores
    if (skillRadar.length === 0 && domainBreakdown.length > 0) {
      for (const db of domainBreakdown) {
        skillRadar.push({ skill: db.domain, value: db.avgScore });
      }
    }

    // Weekly trend — last 8 weeks
    const weeklyTrend: { week: string; activities: number; avgScore: number }[] = [];
    for (let w = 7; w >= 0; w--) {
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - w * 7 - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const weekEvents = allEvents.filter((e) => {
        const d = new Date(e.date);
        return d >= weekStart && d < weekEnd;
      });

      const weekScored = weekEvents.filter((e) => e.score !== null && e.maxScore);
      const weekAvg =
        weekScored.length > 0
          ? Math.round(
              (weekScored.reduce((s, e) => s + ((e.score! / e.maxScore!) * 100), 0) /
                weekScored.length) *
                10
            ) / 10
          : 0;

      weeklyTrend.push({
        week: `W${8 - w}`,
        activities: weekEvents.length,
        avgScore: weekAvg,
      });
    }

    // Heatmap — last 52 weeks of daily activity counts
    const heatmap: number[][] = [];
    for (let w = 51; w >= 0; w--) {
      const week: number[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - w * 7 - (6 - d));
        const key = date.toISOString().split("T")[0];
        const count = allEvents.filter(
          (e) => new Date(e.date).toISOString().split("T")[0] === key
        ).length;
        week.push(Math.min(count, 4)); // cap at 4 for color intensity
      }
      heatmap.push(week);
    }

    // Recent activities (last 10)
    const recentActivities = [...allEvents]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    setStats({
      totalActivities,
      totalTimeMinutes,
      avgScore,
      studyStreak: streak,
      domainBreakdown,
      skillRadar,
      weeklyTrend,
      heatmap,
      recentActivities,
    });

    setDataLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user, fetchDashboardData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 flex items-center justify-center">
          <div className="text-muted-foreground">{t("Đang tải...", "Loading...")}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-lg mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-12">
                <LogIn className="w-16 h-16 text-primary mx-auto mb-6" />
                <h1 className="text-3xl font-display font-bold text-foreground mb-4">
                  {t("Đăng nhập để xem Dashboard", "Login to View Dashboard")}
                </h1>
                <p className="text-muted-foreground mb-8">
                  {t(
                    "Bạn cần đăng nhập để xem dữ liệu học tập và tiến độ cá nhân của mình.",
                    "You need to log in to view your personal learning data and progress."
                  )}
                </p>
                <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all shadow-lg">
                  <LogIn className="w-5 h-5" />
                  {t("Đăng Nhập", "Login")}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const hasData = stats && stats.totalActivities > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
            {/* Welcome header with floating background particles */}
            <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8">
              <FloatingParticles count={30} />
              <div className="relative z-10">
                <h1 className="text-4xl font-display font-bold mb-1 text-foreground">
                  {t(`Xin chào, `, `Hello, `)}
                  <span className="text-gradient">{displayName}</span> 👋
                </h1>
                <p className="text-muted-foreground">
                  {t("Dữ liệu học tập thực tế của bạn", "Your real learning analytics")}
                </p>
              </div>
            </div>

            {dataLoading ? (
              <div className="text-center py-20 text-muted-foreground">
                <Activity className="w-8 h-8 mx-auto mb-3 animate-pulse text-primary" />
                {t("Đang tải dữ liệu...", "Loading data...")}
              </div>
            ) : !hasData ? (
              /* Empty state — no activity yet */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-12 text-center"
              >
                <BookOpen className="w-16 h-16 text-primary/40 mx-auto mb-6" />
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                  {t("Chưa có dữ liệu học tập", "No Learning Data Yet")}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {t(
                    "Bắt đầu học để xem dữ liệu phân tích thực tế tại đây. Hoàn thành bài đánh giá năng lực, luyện viết IELTS, hoặc giải thử thách Python để tạo dữ liệu đầu tiên.",
                    "Start learning to see real analytics here. Complete a skill assessment, practice IELTS writing, or solve Python challenges to generate your first data."
                  )}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/english" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all">
                    <BookOpen className="w-4 h-4" /> {t("Học Tiếng Anh", "Learn English")}
                  </Link>
                  <Link to="/chinese" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-all">
                    {t("Học Tiếng Trung", "Learn Chinese")}
                  </Link>
                  <Link to="/programming" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-all">
                    {t("Lập Trình", "Programming")}
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* Dashboard with real data */
              <>
                {/* Summary stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    {
                      icon: BarChart3,
                      label: t("Hoạt động", "Activities"),
                      value: stats!.totalActivities.toString(),
                      color: "text-primary",
                    },
                    {
                      icon: Flame,
                      label: t("Chuỗi ngày", "Study Streak"),
                      value: stats!.studyStreak > 0
                        ? `${stats!.studyStreak} ${t("ngày", "days")}`
                        : t("Chưa có", "None"),
                      color: "text-orange-500",
                    },
                    {
                      icon: Clock,
                      label: t("Thời gian học", "Study Time"),
                      value: stats!.totalTimeMinutes > 60
                        ? `${Math.round(stats!.totalTimeMinutes / 60)}h ${stats!.totalTimeMinutes % 60}m`
                        : `${stats!.totalTimeMinutes}m`,
                      color: "text-sky-500",
                    },
                    {
                      icon: Award,
                      label: t("Điểm TB", "Avg Score"),
                      value: stats!.avgScore > 0 ? `${stats!.avgScore}%` : "—",
                      color: "text-primary",
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="glass-card rounded-xl p-4"
                    >
                      <s.icon className={`w-4 h-4 ${s.color} mb-2`} />
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                      <div className="text-xl font-display font-bold text-foreground">{s.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Domain breakdown bar chart */}
                {stats!.domainBreakdown.length > 0 && (
                  <div className="glass-card rounded-xl p-6 mb-6">
                    <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      {t("Phân bố theo lĩnh vực", "Domain Breakdown")}
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats!.domainBreakdown}>
                          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                          <XAxis dataKey="domain" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
                          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                          <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name={t("Hoạt động", "Activities")} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Skill radar */}
                  {stats!.skillRadar.length >= 3 && (
                    <div className="glass-card rounded-xl p-6">
                      <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" /> {t("Biểu đồ kỹ năng", "Skill Radar")}
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={stats!.skillRadar}>
                            <PolarGrid stroke="hsl(var(--border))" />
                            <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                            <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* Weekly activity trend */}
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" /> {t("Xu hướng hoạt động", "Activity Trend")}
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats!.weeklyTrend}>
                          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                          <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
                          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                          <Line type="monotone" dataKey="activities" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 4 }} name={t("Hoạt động", "Activities")} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Consistency heatmap */}
                <div className="glass-card rounded-xl p-6 mb-6">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" /> {t("Biểu đồ chuyên cần", "Consistency Heatmap")}
                  </h3>
                  <div className="overflow-x-auto">
                    <div className="flex gap-[3px] min-w-[700px]">
                      {stats!.heatmap.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {week.map((val, di) => (
                            <div
                              key={di}
                              className={`w-3 h-3 rounded-sm ${heatColors[val]}`}
                              title={`${val} ${t("hoạt động", "activities")}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <span>{t("Ít", "Less")}</span>
                    {heatColors.map((c, i) => (
                      <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                    ))}
                    <span>{t("Nhiều", "More")}</span>
                  </div>
                </div>

                {/* Recent activities */}
                {stats!.recentActivities.length > 0 && (
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> {t("Hoạt động gần đây", "Recent Activities")}
                    </h3>
                    <div className="space-y-2">
                      {stats!.recentActivities.map((act, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                              act.domain === "english" ? "bg-blue-500/10 text-blue-600" :
                              act.domain === "chinese" ? "bg-red-500/10 text-red-600" :
                              "bg-emerald-500/10 text-emerald-600"
                            }`}>
                              {act.domain === "english" ? "EN" : act.domain === "chinese" ? "CN" : "PR"}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {act.type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(act.date).toLocaleDateString()}
                                {act.timeSpent ? ` · ${Math.round(act.timeSpent / 60)}m` : ""}
                              </p>
                            </div>
                          </div>
                          {act.score !== null && act.maxScore && (
                            <span className={`text-sm font-bold ${
                              (act.score / act.maxScore) >= 0.7 ? "text-emerald-600" :
                              (act.score / act.maxScore) >= 0.5 ? "text-amber-600" :
                              "text-red-600"
                            }`}>
                              {act.score}/{act.maxScore}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick links */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <Link to="/english" className="glass-card rounded-xl p-4 text-center hover:border-primary/30 transition-all group">
                    <BookOpen className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{t("Tiếng Anh", "English")}</span>
                  </Link>
                  <Link to="/chinese" className="glass-card rounded-xl p-4 text-center hover:border-primary/30 transition-all group">
                    <BookOpen className="w-5 h-5 text-red-500 mx-auto mb-2" />
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{t("Tiếng Trung", "Chinese")}</span>
                  </Link>
                  <Link to="/programming" className="glass-card rounded-xl p-4 text-center hover:border-primary/30 transition-all group">
                    <BookOpen className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{t("Lập Trình", "Programming")}</span>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
