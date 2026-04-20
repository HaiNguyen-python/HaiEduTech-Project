import { Link } from "react-router-dom";
import FloatingParticles from "@/components/FloatingParticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudentScheduleWidget from "@/components/StudentScheduleWidget";
import CounselingHub from "@/components/counseling/CounselingHub";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Target, TrendingUp, Calendar, Flame, LogIn, BookOpen,
  BarChart3, Clock, Award, ArrowRight, Activity, Heart,
  Mic, PenTool, Code, Sparkles, Quote,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar,
} from "recharts";

// Types for processed dashboard data
interface ActivityItem {
  type: string;
  domain: string;
  score: number | null;
  maxScore: number | null;
  date: string;
  timeSpent: number | null;
}

interface CourseProgress {
  id: string;
  title: string;
  domain: string;
  completed: number;
  total: number;
  pct: number;
  lastLessonHref: string;
  nextGoal: string;
}

interface DashboardStats {
  totalActivities: number;
  totalTimeMinutes: number;
  avgScore: number;
  studyStreak: number;
  domainBreakdown: { domain: string; count: number; avgScore: number }[];
  // Skill radar across 4 main programs
  skillRadar: { skill: string; value: number; fullMark: number }[];
  // Last 7 days study minutes
  weeklyMinutes: { day: string; minutes: number }[];
  recentActivities: ActivityItem[];
  courses: CourseProgress[];
  // AI summary text
  aiSummary: string;
}

const DOMAIN_LABELS: Record<string, string> = {
  english: "English",
  chinese: "Chinese",
  programming: "Programming",
  finnish: "Finnish",
};

// Pick the right icon for an activity type
const getActivityIcon = (type: string) => {
  if (type.includes("speaking")) return Mic;
  if (type.includes("writing")) return PenTool;
  if (type.includes("python") || type.includes("code") || type.includes("programming")) return Code;
  if (type.includes("game") || type.includes("hsk") || type.includes("vocab")) return Award;
  if (type.includes("reading") || type.includes("lecture") || type.includes("lesson")) return BookOpen;
  return Activity;
};

// Format relative timestamps
const formatRelativeTime = (date: string, isVi: boolean) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 1) return isVi ? "Vừa xong" : "Just now";
  if (mins < 60) return isVi ? `${mins} phút trước` : `${mins}m ago`;
  if (hours < 24) return isVi ? `${hours} giờ trước` : `${hours}h ago`;
  if (days < 7) return isVi ? `${days} ngày trước` : `${days}d ago`;
  return new Date(date).toLocaleDateString();
};

// Daily motivation pool — picked deterministically by name + date
const MOTIVATIONS_VI = [
  "Mỗi bước nhỏ hôm nay là bước nhảy lớn của ngày mai.",
  "Học không phải là cuộc đua, mà là hành trình của riêng em.",
  "Sự kiên trì luôn chiến thắng tài năng đơn thuần.",
  "Hôm nay học một chút, mai vững vàng hơn nhiều.",
  "Em làm tốt hơn em nghĩ. Tin vào bản thân nhé!",
  "Không có gì là không thể với sự cố gắng mỗi ngày.",
  "Thầy Hải tin rằng em sẽ làm được điều tuyệt vời.",
];
const MOTIVATIONS_EN = [
  "Small steps today become giant leaps tomorrow.",
  "Learning is not a race — it's your unique journey.",
  "Consistency beats raw talent every time.",
  "A little today, much stronger tomorrow.",
  "You're doing better than you think. Trust yourself!",
  "Nothing is impossible when you show up daily.",
  "Teacher Hai believes you will achieve great things.",
];

const pickMotivation = (name: string, isVi: boolean) => {
  const pool = isVi ? MOTIVATIONS_VI : MOTIVATIONS_EN;
  const seed = (name + new Date().toDateString()).split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  return pool[seed % pool.length];
};

const Dashboard = () => {
  const { t, lang } = useLanguage();
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

    // Fetch game scores
    const { data: gameScores } = await supabase
      .from("game_scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });
    const games = gameScores || [];

    // Fetch lecture progress (completed lectures count as activities)
    const { count: ieltsLectureCount } = await supabase
      .from("ielts_lecture_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_completed", true);

    const { count: toeicLectureCount } = await supabase
      .from("toeic_lecture_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_completed", true);

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
      ...games.map((g) => ({
        type: g.game_type,
        domain: (g.game_type.includes("hsk") ? "chinese" : "english") as string,
        score: g.score as number | null,
        maxScore: 100 as number | null,
        date: g.created_at,
        timeSpent: g.time_spent_seconds as number | null,
        metadata: g.metadata as Record<string, any> | null,
      })),
    ];

    // Total activities
    const totalActivities = allEvents.length + (feedbackCount || 0) + (ieltsLectureCount || 0) + (toeicLectureCount || 0);

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

    // Build skill radar across 4 main programs (English/Finnish/Chinese/Programming)
    const programDomains: { skill: string; key: string }[] = [
      { skill: "English (PTE)", key: "english" },
      { skill: "Finnish (YKI)", key: "finnish" },
      { skill: "Chinese (HSK)", key: "chinese" },
      { skill: "Programming", key: "programming" },
    ];
    const skillRadar = programDomains.map(({ skill, key }) => {
      const evs = allEvents.filter((e) => e.domain === key && e.score !== null && e.maxScore);
      const avg = evs.length > 0
        ? Math.round((evs.reduce((s, e) => s + (e.score! / e.maxScore!) * 100, 0) / evs.length))
        : 0;
      return { skill, value: avg, fullMark: 100 };
    });

    // Weekly study minutes — last 7 days
    const weeklyMinutes: { day: string; minutes: number }[] = [];
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];
      const dayEvents = allEvents.filter(
        (e) => new Date(e.date).toISOString().split("T")[0] === key
      );
      const minutes = Math.round(
        dayEvents.reduce((s, e) => s + (e.timeSpent || 0), 0) / 60
      );
      weeklyMinutes.push({ day: dayLabels[date.getDay()], minutes });
    }

    // Active course cards — derived from progress in major systems
    const courses: CourseProgress[] = [];

    // IELTS Lectures — total ~80
    if ((ieltsLectureCount || 0) > 0) {
      const total = 80;
      const c = Math.min(ieltsLectureCount || 0, total);
      courses.push({
        id: "ielts",
        title: "IELTS Lectures",
        domain: "english",
        completed: c,
        total,
        pct: Math.round((c / total) * 100),
        lastLessonHref: "/ielts-lectures",
        nextGoal: `Lecture ${c + 1}/${total}`,
      });
    }

    // TOEIC Lectures — total ~50
    if ((toeicLectureCount || 0) > 0) {
      const total = 50;
      const c = Math.min(toeicLectureCount || 0, total);
      courses.push({
        id: "toeic",
        title: "TOEIC Masterclass",
        domain: "english",
        completed: c,
        total,
        pct: Math.round((c / total) * 100),
        lastLessonHref: "/toeic-lectures",
        nextGoal: `Lecture ${c + 1}/${total}`,
      });
    }

    // Programming activities → Python pathway (47 lessons)
    const programmingActs = allEvents.filter((e) => e.domain === "programming").length;
    if (programmingActs > 0) {
      const total = 47;
      const c = Math.min(programmingActs, total);
      courses.push({
        id: "python",
        title: "Introduction to Programming",
        domain: "programming",
        completed: c,
        total,
        pct: Math.round((c / total) * 100),
        lastLessonHref: "/programming?pillar=python-pathway",
        nextGoal: `Lesson ${c + 1}/${total}`,
      });
    }

    // Finnish (YKI A2)
    const finnishActs = allEvents.filter((e) => e.domain === "finnish").length;
    if (finnishActs > 0) {
      const total = 18;
      const c = Math.min(finnishActs, total);
      courses.push({
        id: "yki",
        title: "Finnish YKI A2 Prep",
        domain: "finnish",
        completed: c,
        total,
        pct: Math.round((c / total) * 100),
        lastLessonHref: "/finnish",
        nextGoal: `Module ${c + 1}/${total}`,
      });
    }

    // Chinese
    const chineseActs = allEvents.filter((e) => e.domain === "chinese").length;
    if (chineseActs > 0) {
      const total = 30;
      const c = Math.min(chineseActs, total);
      courses.push({
        id: "chinese",
        title: "Chinese HSK Track",
        domain: "chinese",
        completed: c,
        total,
        pct: Math.round((c / total) * 100),
        lastLessonHref: "/chinese",
        nextGoal: `Lesson ${c + 1}/${total}`,
      });
    }

    // Recent activities (last 5 only — full log on /activity-log page)
    const recentActivities = [...allEvents]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    // AI summary — find biggest improvement domain over the last 14 days
    let aiSummary = "Keep going! Every small step builds your future.";
    const last14 = allEvents.filter(
      (e) => Date.now() - new Date(e.date).getTime() < 14 * 86400000
    );
    if (last14.length >= 3) {
      const recentAvg = last14
        .filter((e) => e.score !== null && e.maxScore)
        .reduce((s, e, _, arr) => s + (e.score! / e.maxScore!) * 100 / arr.length, 0);
      if (recentAvg > 0) {
        const topDomain = programDomains.find((p) =>
          last14.some((e) => e.domain === p.key)
        );
        if (topDomain) {
          aiSummary = `Great progress in ${topDomain.skill}! You've completed ${last14.length} activities recently with an average of ${Math.round(recentAvg)}%.`;
        }
      }
    }

    setStats({
      totalActivities,
      totalTimeMinutes,
      avgScore,
      studyStreak: streak,
      domainBreakdown,
      skillRadar,
      weeklyMinutes,
      recentActivities,
      courses: courses.slice(0, 3),
      aiSummary,
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

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
                <TabsTrigger value="overview" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  {t("Tổng quan", "Overview")}
                </TabsTrigger>
                <TabsTrigger value="counseling" className="gap-2">
                  <Heart className="w-4 h-4" />
                  {t("Tư vấn AI", "Counseling")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
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

                {/* Daily Motivation — personalized by name */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="rounded-2xl p-5 mb-6 bg-gradient-to-br from-primary/10 via-accent/5 to-background border border-primary/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Quote className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                        {t("Lời chúc hôm nay", "Daily Motivation")}
                      </p>
                      <p className="text-base text-foreground font-medium leading-relaxed">
                        "{pickMotivation(displayName, lang === "vi")}" — {displayName}.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* AI Achievement Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-2xl p-5 mb-6 bg-emerald-500/5 border border-emerald-500/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                        {t("AI nhận xét", "AI Insight")}
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">{stats!.aiSummary}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Active Course Cards */}
                {stats!.courses.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      {t("Khóa học đang theo", "Active Courses")}
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {stats!.courses.map((course, i) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 + i * 0.08 }}
                          className="rounded-2xl bg-card p-5 border border-border hover:border-primary/40 hover:shadow-lg transition-all"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                              course.domain === "english" ? "bg-blue-500/10 text-blue-600" :
                              course.domain === "chinese" ? "bg-red-500/10 text-red-600" :
                              course.domain === "finnish" ? "bg-sky-500/10 text-sky-600" :
                              "bg-emerald-500/10 text-emerald-600"
                            }`}>
                              {DOMAIN_LABELS[course.domain] || course.domain}
                            </span>
                            <span className="text-xs font-mono text-muted-foreground">
                              {course.completed}/{course.total}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-foreground mb-3 leading-snug">{course.title}</h4>
                          {/* Animated progress bar */}
                          <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${course.pct}%` }}
                              transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            />
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                            <span className="font-bold text-primary">{course.pct}%</span>
                            <span>{course.nextGoal}</span>
                          </div>
                          <Link
                            to={course.lastLessonHref}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
                          >
                            {t("Tiếp tục học", "Continue learning")} <ArrowRight className="w-3 h-3" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Skill Radar — 4 programs */}
                  <div className="rounded-2xl bg-card p-6 border border-border">
                    <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" /> {t("Biểu đồ kỹ năng", "Skill Radar")}
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={stats!.skillRadar}>
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                          <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Weekly Study Hours bar chart */}
                  <div className="rounded-2xl bg-card p-6 border border-border">
                    <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" /> {t("Giờ học trong tuần", "Weekly Study Hours")}
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats!.weeklyMinutes}>
                          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                          <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
                          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
                          <Tooltip
                            formatter={(v: number) => [`${v} ${t("phút", "min")}`, t("Thời gian", "Time")]}
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                          <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Recent activities — 5 most recent + View All */}
                {stats!.recentActivities.length > 0 && (
                  <div className="rounded-2xl bg-card p-6 border border-border mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" /> {t("Hoạt động gần đây", "Recent Activities")}
                      </h3>
                      <Link
                        to="/activity-log"
                        className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {t("Xem tất cả", "View All")} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="space-y-1">
                      {stats!.recentActivities.map((act, i) => {
                        const Icon = getActivityIcon(act.type);
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.05 }}
                            className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-secondary/50 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                act.domain === "english" ? "bg-blue-500/10 text-blue-600" :
                                act.domain === "chinese" ? "bg-red-500/10 text-red-600" :
                                act.domain === "finnish" ? "bg-sky-500/10 text-sky-600" :
                                "bg-emerald-500/10 text-emerald-600"
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground capitalize truncate">
                                  {act.type.replace(/_/g, " ")}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatRelativeTime(act.date, lang === "vi")}
                                  {act.timeSpent ? ` · ${Math.round(act.timeSpent / 60)}m` : ""}
                                </p>
                              </div>
                            </div>
                            {act.score !== null && act.maxScore && (
                              <span className={`text-sm font-bold flex-shrink-0 ml-2 ${
                                (act.score / act.maxScore) >= 0.7 ? "text-emerald-600" :
                                (act.score / act.maxScore) >= 0.5 ? "text-amber-600" :
                                "text-red-600"
                              }`}>
                                {act.score}/{act.maxScore}
                              </span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Class schedule (read-only for students) */}
                <div className="mt-6">
                  <StudentScheduleWidget userId={user?.id ?? null} />
                </div>
              </>
            )}
              </TabsContent>

              <TabsContent value="counseling">
                {user ? (
                  <CounselingHub userId={user.id} />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    {t("Vui lòng đăng nhập để truy cập.", "Please sign in to access.")}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
