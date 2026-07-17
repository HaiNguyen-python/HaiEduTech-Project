/**
 * SwedishPerformance - overall performance dashboard for Swedish learners.
 * Route: /swedish/performance
 * @copyright 2026 HaiEduTech, ILC.
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, CartesianGrid } from "recharts";
import { Sparkles, Trophy, BookOpen, Clock, Flame, Activity, ArrowRight, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSwedishPerformance } from "@/hooks/useSwedishPerformance";

const SwedishPerformance = () => {
  const { t } = useLanguage();
  const { result, extras, loading } = useSwedishPerformance();

  const radarData = result ? [
    { skill: t("Từ vựng", "Vocab"), value: Math.round(result.breakdown.vocabulary) },
    { skill: t("Đọc", "Reading"), value: Math.round(result.breakdown.reading) },
    { skill: t("Nghe", "Listening"), value: Math.round(result.breakdown.listening) },
    { skill: t("Nói", "Speaking"), value: Math.round(result.breakdown.speaking) },
    { skill: t("Viết", "Writing"), value: Math.round(result.breakdown.writing) },
  ] : [];

  const vocabBarData = result ? (["A1", "A2", "B1"] as const).map(lv => ({
    level: lv,
    mastered: result.vocabByLevel[lv].mastered,
    remaining: Math.max(0, result.vocabByLevel[lv].total - result.vocabByLevel[lv].mastered),
  })) : [];

  const recommendations: { key: string; text: string; to: string; cta: string }[] = [];
  if (result) {
    const skills: [keyof typeof result.breakdown, string, string][] = [
      ["vocabulary", t("Từ vựng", "Vocabulary"), "/swedish/vocabulary"],
      ["reading", t("Đọc", "Reading"), "/swedish/reading"],
      ["listening", t("Nghe", "Listening"), "/swedish/listening"],
      ["speaking", t("Nói", "Speaking"), "/swedish/speaking"],
      ["writing", t("Viết", "Writing"), "/swedish/writing"],
    ];
    const weakest = skills
      .map(([k, label, to]) => ({ k, label, to, v: result.breakdown[k] }))
      .sort((a, b) => a.v - b.v)[0];
    recommendations.push({
      key: "weakest",
      text: t(
        `Kỹ năng yếu nhất: ${weakest.label} (${Math.round(weakest.v)}/100). Tập trung luyện mục này để lên level nhanh nhất.`,
        `Weakest skill: ${weakest.label} (${Math.round(weakest.v)}/100). Focus here to level up fastest.`
      ),
      to: weakest.to,
      cta: t("Luyện ngay", "Practice now"),
    });
    if (result.overallScore >= 45 && result.overallScore < 65) {
      recommendations.push({
        key: "yki2",
        text: t("Bạn đã đủ nền tảng để thử đề YKI Cấp 2 (A2). Làm thử để canh chỉnh mục tiêu.", "You have enough to attempt a YKI Level 2 (A2) mock. Try it to calibrate."),
        to: "/swedish/yki-a2", cta: t("Vào YKI A2", "Go to YKI A2"),
      });
    }
    if (result.overallScore >= 65) {
      recommendations.push({
        key: "yki3",
        text: t("Đủ điều kiện luyện YKI Cấp 3 (B1). Ưu tiên writing/speaking để đạt điểm ≥ 3.5.", "Ready for YKI Level 3 (B1). Prioritize writing & speaking to score ≥ 3.5."),
        to: "/swedish/yki-b1", cta: t("Vào YKI B1", "Go to YKI B1"),
      });
    }
    if (result.masteredCount < 100) {
      recommendations.push({
        key: "vocab-push",
        text: t(`Mới thuộc ${result.masteredCount} từ. Đặt mục tiêu +10 từ/ngày để chạm mốc A2.`, `Only ${result.masteredCount} words mastered. Aim for +10/day to reach A2.`),
        to: "/swedish/vocabulary", cta: t("Học từ vựng", "Study vocab"),
      });
    }
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="Trình độ tiếng Thụy Điển của tôi | HaiEduTech"
        description="Bảng đo lường tổng quan tiếng Thụy Điển: điểm 5 kỹ năng, phân bổ từ vựng theo CEFR/YKI và gợi ý luyện tập cá nhân hoá."
        path="/swedish/performance"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <header className="text-center mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold flex items-center justify-center gap-2">
              🇸🇪 {t("Trình độ tiếng Thụy Điển của tôi", "My Swedish Level")}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              {t("Đo lường tự động dựa trên từ vựng đã thuộc và bài tập bạn đã hoàn thành.", "Auto-computed from your mastered vocab and completed exercises.")}
            </p>
          </header>

          {loading || !result ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <>
              {/* Level hero */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-3xl p-6 sm:p-8 mb-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="text-center md:text-left flex-1">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                      {t("Trình độ hiện tại", "Current level")}
                    </div>
                    <div className="flex items-baseline gap-3 justify-center md:justify-start">
                      <span className="font-display text-5xl sm:text-6xl font-black bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                        {result.cefr}
                      </span>
                      {result.yki !== "-" && (
                        <span className="text-lg font-semibold text-muted-foreground">
                          / YKI {t("Cấp", "Level")} {result.yki}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      {t("Điểm tổng hợp", "Overall score")}: <strong className="text-foreground text-lg">{result.overallScore}</strong>/100
                    </div>
                    {result.nextCefr && (
                      <div className="mt-3">
                        <div className="text-xs text-muted-foreground mb-1">
                          {t(`Còn ${result.pointsToNext} điểm nữa để đạt ${result.nextCefr}`, `${result.pointsToNext} points to reach ${result.nextCefr}`)}
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all"
                            style={{ width: `${Math.min(100, (result.overallScore / (result.overallScore + result.pointsToNext)) * 100)}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 shrink-0">
                    <Kpi icon={BookOpen} color="text-emerald-500" label={t("Từ đã thuộc", "Mastered")} value={`${result.masteredCount}/${result.totalWords}`} />
                    <Kpi icon={Flame} color="text-orange-500" label={t("Ngày học (90d)", "Active days")} value={String(extras.streakDays)} />
                    <Kpi icon={Activity} color="text-primary" label={t("Bài đã làm", "Activities")} value={String(extras.activityCount)} />
                    <Kpi icon={Clock} color="text-sky-500" label={t("Phút online", "Online min")} value={String(extras.onlineMinutes)} />
                  </div>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Radar */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5">
                  <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" /> {t("Biểu đồ 5 kỹ năng", "5-skill radar")}
                  </h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="hsl(var(--border))" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                        <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} strokeWidth={2} />
                        <RTooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Vocab by level bar */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5">
                  <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-500" /> {t("Từ vựng theo cấp YKI", "Vocab by YKI level")}
                  </h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={vocabBarData}>
                        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                        <XAxis dataKey="level" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <RTooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                        <Bar dataKey="mastered" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} name={t("Đã thuộc", "Mastered")} />
                        <Bar dataKey="remaining" stackId="a" fill="hsl(var(--muted))" radius={[6, 6, 0, 0]} name={t("Còn lại", "Remaining")} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* Skill breakdown detail */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5 mb-6">
                <h3 className="font-display font-bold text-lg mb-4">{t("Chi tiết từng kỹ năng", "Skill breakdown")}</h3>
                <div className="space-y-3">
                  {radarData.map(s => (
                    <div key={s.skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-foreground">{s.skill}</span>
                        <span className="tabular-nums text-muted-foreground">{s.value}/100</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all" style={{ width: `${s.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5">
                  <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" /> {t("Gợi ý cho bạn", "Recommendations")}
                  </h3>
                  <div className="grid gap-3">
                    {recommendations.map(r => (
                      <Link key={r.key} to={r.to}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group">
                        <div className="flex-1 text-sm text-foreground">{r.text}</div>
                        <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                          {r.cta} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Kpi = ({ icon: Icon, color, label, value }: { icon: typeof Sparkles; color: string; label: string; value: string }) => (
  <div className="p-3 rounded-xl bg-card/60 border border-border/60 min-w-[120px]">
    <Icon className={`w-4 h-4 ${color} mb-1`} />
    <div className="text-[10px] text-muted-foreground leading-tight">{label}</div>
    <div className="text-base font-display font-bold text-foreground tabular-nums">{value}</div>
  </div>
);

export default SwedishPerformance;
