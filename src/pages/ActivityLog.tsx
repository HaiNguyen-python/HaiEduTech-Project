// Full activity log page — all student activities with filters
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Activity, Mic, Code, BookOpen, PenTool, Trophy, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface ActivityRow {
  type: string;
  domain: string;
  score: number | null;
  maxScore: number | null;
  date: string;
  timeSpent: number | null;
}

const getActivityIcon = (type: string) => {
  if (type.includes("speaking")) return Mic;
  if (type.includes("writing")) return PenTool;
  if (type.includes("python") || type.includes("code") || type.includes("programming")) return Code;
  if (type.includes("game") || type.includes("hsk") || type.includes("vocab")) return Trophy;
  if (type.includes("reading") || type.includes("lecture") || type.includes("lesson")) return BookOpen;
  return Activity;
};

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

const ActivityLog = () => {
  const { t, language } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      setLoading(true);
      const [{ data: acts }, { data: writings }, { data: games }] = await Promise.all([
        supabase.from("student_activity_log").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("writing_attempts").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("game_scores").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      const all: ActivityRow[] = [
        ...(acts || []).map((a) => ({
          type: a.activity_type,
          domain: a.domain || "english",
          score: a.score,
          maxScore: a.max_score,
          date: a.created_at,
          timeSpent: a.time_spent_seconds,
        })),
        ...(writings || []).map((w) => ({
          type: `writing_task_${w.task_type}`,
          domain: "english",
          score: w.overall_score,
          maxScore: 9,
          date: w.created_at,
          timeSpent: null,
        })),
        ...(games || []).map((g) => ({
          type: g.game_type,
          domain: g.game_type.includes("hsk") ? "chinese" : "english",
          score: g.score,
          maxScore: 100,
          date: g.created_at,
          timeSpent: g.time_spent_seconds,
        })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setActivities(all);
      setLoading(false);
    };
    fetchAll();
  }, [user]);

  const filtered = filter === "all" ? activities : activities.filter((a) => a.domain === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại Dashboard", "Back to Dashboard")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              <Calendar className="w-7 h-7 text-primary" />
              {t("Nhật ký hoạt động", "Activity Log")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("Toàn bộ lịch sử học tập của bạn", "Your complete learning history")} · {filtered.length} {t("hoạt động", "activities")}
            </p>
          </motion.div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["all", "english", "chinese", "programming"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? t("Tất cả", "All") : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">
              <Activity className="w-8 h-8 mx-auto mb-3 animate-pulse text-primary" />
              {t("Đang tải...", "Loading...")}
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Activity className="w-12 h-12 text-primary/30 mx-auto mb-4" />
              <p className="text-muted-foreground">{t("Chưa có hoạt động nào.", "No activities yet.")}</p>
            </div>
          ) : (
            <div className="glass-card rounded-2xl divide-y divide-border">
              {filtered.map((act, i) => {
                const Icon = getActivityIcon(act.type);
                const pct = act.score !== null && act.maxScore ? (act.score / act.maxScore) : null;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(i * 0.02, 0.3) }}
                    className="flex items-center gap-4 p-4 hover:bg-secondary/40 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      act.domain === "english" ? "bg-blue-500/10 text-blue-600" :
                      act.domain === "chinese" ? "bg-red-500/10 text-red-600" :
                      "bg-emerald-500/10 text-emerald-600"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground capitalize">
                        {act.type.replace(/_/g, " ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(act.date, language === "vi")}
                        {act.timeSpent ? ` · ${Math.round(act.timeSpent / 60)}m` : ""}
                      </p>
                    </div>
                    {pct !== null && (
                      <span className={`text-sm font-bold ${
                        pct >= 0.7 ? "text-emerald-600" : pct >= 0.5 ? "text-amber-600" : "text-red-600"
                      }`}>
                        {act.score}/{act.maxScore}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActivityLog;
