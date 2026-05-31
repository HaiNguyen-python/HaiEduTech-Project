/**
 * @file JourneyDashboard.tsx
 * @description Aggregate dashboard for the full Study Abroad journey:
 * 7 milestones, deadline counter, shortlist size, document count, motivation drafts.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Compass, CheckCircle2, Circle, Clock, FileText, GraduationCap, Calendar, BookOpen, Plane, Award, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const MILESTONES = [
  { key: "profile_built", icon: GraduationCap, vi: "Hoàn thiện hồ sơ học thuật", en: "Academic profile built", to: "/study-abroad/cv" },
  { key: "language_certified", icon: BookOpen, vi: "Có chứng chỉ ngôn ngữ", en: "Language certified", to: "/ielts" },
  { key: "exam_done", icon: Award, vi: "Hoàn thành SAT/GRE/GMAT", en: "Standardized test done", to: "/study-abroad/sat" },
  { key: "docs_ready", icon: FileText, vi: "Hồ sơ apply hoàn chỉnh", en: "Application docs ready", to: "/study-abroad/documents" },
  { key: "app_submitted", icon: Calendar, vi: "Nộp đơn ứng tuyển", en: "Application submitted", to: "/study-abroad/documents" },
  { key: "visa_approved", icon: CheckCircle2, vi: "Đậu visa", en: "Visa approved", to: "/study-abroad/checklist" },
  { key: "departed", icon: Plane, vi: "Lên đường du học", en: "Departed", to: "/study-abroad/checklist" },
];

interface Stats {
  documents: number; deadlines: number; nextDeadline: any; shortlist: number; drafts: number;
}

const JourneyDashboard = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [milestones, setMilestones] = useState<Record<string, string>>({});
  const [stats, setStats] = useState<Stats>({ documents: 0, deadlines: 0, nextDeadline: null, shortlist: 0, drafts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) { setLoading(false); return; }
      const [m, docs, dls, sl] = await Promise.all([
        supabase.from("study_journey_milestones").select("milestone_key, status").eq("user_id", user.id),
        supabase.from("student_documents").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("application_deadlines").select("*").eq("user_id", user.id).order("deadline_date", { ascending: true }),
        supabase.from("university_shortlist").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      const mm: Record<string, string> = {};
      m.data?.forEach((r: any) => { mm[r.milestone_key] = r.status; });
      setMilestones(mm);
      const future = (dls.data || []).filter((d: any) => new Date(d.deadline_date) >= new Date());
      setStats({
        documents: docs.count || 0,
        deadlines: dls.data?.length || 0,
        nextDeadline: future[0] || null,
        shortlist: sl.count || 0,
        drafts: 0,
      });
      setLoading(false);
    })();
  }, []);

  const toggleMilestone = async (key: string) => {
    if (!user) return;
    const current = milestones[key];
    const next = current === "done" ? "pending" : "done";
    const { error } = await supabase.from("study_journey_milestones").upsert({
      user_id: user.id, milestone_key: key, status: next,
      completed_at: next === "done" ? new Date().toISOString() : null,
    }, { onConflict: "user_id,milestone_key" });
    if (error) { toast({ title: "Lỗi", description: error.message, variant: "destructive" }); return; }
    setMilestones((m) => ({ ...m, [key]: next }));
  };

  const doneCount = MILESTONES.filter(m => milestones[m.key] === "done").length;
  const pct = Math.round((doneCount / MILESTONES.length) * 100);

  const daysToNext = stats.nextDeadline
    ? Math.ceil((new Date(stats.nextDeadline.deadline_date).getTime() - Date.now()) / 86400000)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Journey Dashboard - HaiEduTech Study Abroad" description="Bảng tổng quan hành trình du học: 7 mốc lớn, deadline gần nhất, shortlist trường, hồ sơ." path="/study-abroad/journey" />
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-28 lg:pt-32 pb-16">
        <Link to="/study-abroad" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="w-4 h-4" /> {t("Quay lại Cổng du học", "Back to Study Abroad")}
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{t("Journey Dashboard", "Journey Dashboard")}</h1>
              <p className="text-sm text-muted-foreground">{t("Tổng quan hành trình du học của bạn - cập nhật realtime.", "Your study abroad journey at a glance.")}</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : !user ? (
            <Card><CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">{t("Đăng nhập để theo dõi hành trình của bạn.", "Sign in to track your journey.")}</p>
              <Button asChild><Link to="/login">{t("Đăng nhập", "Sign in")}</Link></Button>
            </CardContent></Card>
          ) : (
            <>
              {/* Progress hero */}
              <Card className="mb-6 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600" />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                    <div>
                      <div className="text-xs text-muted-foreground">{t("Tiến độ hành trình", "Journey progress")}</div>
                      <div className="text-2xl font-bold">{doneCount}/{MILESTONES.length} {t("mốc", "milestones")}</div>
                    </div>
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-base px-3 py-1">{pct}%</Badge>
                  </div>
                  <Progress value={pct} className="h-2" />
                </CardContent>
              </Card>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <StatCard icon={FileText} label={t("Tài liệu", "Documents")} value={stats.documents} to="/study-abroad/documents" />
                <StatCard icon={Calendar} label={t("Deadline đã lưu", "Deadlines")} value={stats.deadlines} to="/study-abroad/documents" />
                <StatCard icon={GraduationCap} label={t("Trường shortlist", "Shortlist")} value={stats.shortlist} to="/study-abroad/shortlister" />
                <StatCard
                  icon={Clock}
                  label={t("Hạn gần nhất", "Next deadline")}
                  value={daysToNext != null ? `${daysToNext}d` : "-"}
                  highlight={daysToNext != null && daysToNext <= 7}
                  to="/study-abroad/documents"
                />
              </div>

              {stats.nextDeadline && daysToNext != null && daysToNext <= 14 && (
                <Card className={`mb-6 border-2 ${daysToNext <= 3 ? "border-rose-500/50 bg-rose-500/5" : "border-amber-500/50 bg-amber-500/5"}`}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Clock className={`w-5 h-5 ${daysToNext <= 3 ? "text-rose-500" : "text-amber-500"}`} />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">
                        {t("Còn", "In")} <span className={daysToNext <= 3 ? "text-rose-600" : "text-amber-600"}>{daysToNext} {t("ngày", "days")}</span>: {stats.nextDeadline.university}
                      </div>
                      <div className="text-xs text-muted-foreground">{stats.nextDeadline.program} · {stats.nextDeadline.deadline_date}</div>
                    </div>
                    <Button size="sm" variant="outline" asChild><Link to="/study-abroad/documents">{t("Xem", "View")}</Link></Button>
                  </CardContent>
                </Card>
              )}

              {/* Milestones */}
              <h2 className="text-lg font-bold mb-3">{t("7 mốc hành trình", "7 Milestones")}</h2>
              <div className="space-y-2">
                {MILESTONES.map((m, i) => {
                  const status = milestones[m.key] || "pending";
                  const done = status === "done";
                  const Icon = m.icon;
                  return (
                    <Card key={m.key} className={done ? "bg-emerald-500/5 border-emerald-500/30" : ""}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <button onClick={() => toggleMilestone(m.key)} className="shrink-0">
                          {done ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6 text-muted-foreground" />}
                        </button>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${done ? "bg-emerald-500/15 text-emerald-600" : "bg-primary/10 text-primary"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground">{t("Bước", "Step")} {i + 1}</div>
                          <div className={`font-semibold text-sm ${done ? "line-through text-muted-foreground" : ""}`}>{t(m.vi, m.en)}</div>
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={m.to}>{t("Đi", "Go")} <ChevronRight className="w-4 h-4 ml-0.5" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, to, highlight }: any) => (
  <Link to={to}>
    <Card className={`hover:shadow-md transition-all ${highlight ? "border-rose-500/40 bg-rose-500/5" : ""}`}>
      <CardContent className="p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Icon className="w-3.5 h-3.5" />{label}</div>
        <div className={`text-2xl font-bold ${highlight ? "text-rose-600" : ""}`}>{value}</div>
      </CardContent>
    </Card>
  </Link>
);

export default JourneyDashboard;
