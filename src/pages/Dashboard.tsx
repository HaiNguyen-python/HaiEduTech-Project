import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, TrendingUp, Calendar, Flame, LogIn } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

const radarData = [
  { skill: "Listening", value: 75 },
  { skill: "Reading", value: 82 },
  { skill: "Writing", value: 60 },
  { skill: "Speaking", value: 68 },
  { skill: "Coding", value: 85 },
];

const velocityData = [
  { month: "T1", score: 5.5 },
  { month: "T2", score: 5.5 },
  { month: "T3", score: 6.0 },
  { month: "T4", score: 6.0 },
  { month: "T5", score: 6.5 },
  { month: "T6", score: 6.5 },
  { month: "T7", score: 7.0 },
];

const heatmapData: number[][] = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0)
);

const heatColors = ["bg-secondary", "bg-primary/20", "bg-primary/40", "bg-primary/60", "bg-primary"];

const Dashboard = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 flex items-center justify-center">
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
        <div className="pt-28 pb-16">
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-display font-bold mb-2 text-foreground">
              {t("Bảng điều khiển ", "Student ")}
              <span className="text-gradient">{t("học sinh", "Dashboard")}</span>
            </h1>
            <p className="text-muted-foreground mb-8">{t("Phân tích học tập chuyên nghiệp", "Professional-grade learning analytics")}</p>

            <div className="glass-card rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{t("Tiến độ tổng quan", "Progress at a Glance")}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-display font-bold text-foreground">6.5</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-3xl font-display font-bold text-primary">7.5</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{t("IELTS Tổng · Mục tiêu T12/2026", "IELTS Overall · Target by Dec 2026")}</div>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-primary/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">87%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: TrendingUp, label: t("Tốc độ học", "Learning Velocity"), value: "+12%", color: "text-primary" },
                { icon: Flame, label: t("Chuỗi ngày", "Study Streak"), value: t("23 ngày", "23 days"), color: "text-orange-500" },
                { icon: Calendar, label: t("Buổi học", "Sessions"), value: "142", color: "text-sky-500" },
                { icon: Target, label: t("Hoàn thành", "Tasks Done"), value: "89%", color: "text-primary" },
              ].map((s, i) => (
                <div key={i} className="glass-card rounded-xl p-4">
                  <s.icon className={`w-4 h-4 ${s.color} mb-2`} />
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="text-xl font-display font-bold text-foreground">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> {t("Biểu đồ kỹ năng", "Skill Radar")}
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(214 32% 85%)" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(215 16% 47%)", fontSize: 11 }} />
                      <Radar dataKey="value" stroke="hsl(173 58% 39%)" fill="hsl(173 58% 39%)" fillOpacity={0.15} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> {t("Tốc độ tiến bộ", "Learning Velocity")}
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={velocityData}>
                      <CartesianGrid stroke="hsl(214 32% 91%)" strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(215 16% 47%)", fontSize: 11 }} axisLine={false} />
                      <YAxis domain={[4, 9]} tick={{ fill: "hsl(215 16% 47%)", fontSize: 11 }} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(0 0% 100%)",
                          border: "1px solid hsl(214 32% 91%)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Line type="monotone" dataKey="score" stroke="hsl(173 58% 39%)" strokeWidth={2} dot={{ fill: "hsl(173 58% 39%)", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" /> {t("Biểu đồ chuyên cần", "Consistency Heatmap")}
              </h3>
              <div className="overflow-x-auto">
                <div className="flex gap-[3px] min-w-[700px]">
                  {heatmapData.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((val, di) => (
                        <div
                          key={di}
                          className={`w-3 h-3 rounded-sm ${heatColors[val]}`}
                          title={`${val} ${t("buổi", "sessions")}`}
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
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
