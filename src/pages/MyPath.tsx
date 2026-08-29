/**
 * @file MyPath.tsx
 * @description "Lộ trình của tôi" - the personalized study dashboard: per-subject
 *   level vs target, readiness forecast, weekly task plan, ranked weaknesses and
 *   an AI coach note (with a rule-based fallback so numbers never depend on AI).
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Loader2, Plus, RefreshCw, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { SUBJECTS } from "@/lib/personalization/subjectRegistry";
import { useLearningPath } from "@/hooks/useLearningPath";
import PathSubjectCard from "@/components/personalization/PathSubjectCard";
import WeeklyPlanList from "@/components/personalization/WeeklyPlanList";
import WeaknessList from "@/components/personalization/WeaknessList";
import { useNavigate } from "react-router-dom";

const MyPath = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { userId, views, loading, removePath, toggleStepDone, isStepDone, reload } = useLearningPath();
  const [active, setActive] = useState<string>("");
  const [coach, setCoach] = useState<string>("");
  const [coachLoading, setCoachLoading] = useState(false);

  useEffect(() => {
    if (!active && views.length > 0) setActive(views[0].path.subject);
  }, [views, active]);

  const current = views.find((v) => v.path.subject === active) ?? views[0];

  const fallbackNote = useMemo(() => {
    if (!current) return "";
    const def = SUBJECTS[current.path.subject];
    const weak = current.weaknesses[0];
    const label = weak ? weak.skill : "";
    return t(
      `Bạn đang ở ${current.currentLevel} môn ${def.labelVi}, hoàn thành ${current.readiness.progressPct}% chặng đường tới mục tiêu. Tuần này hãy tập trung vào ${label} và giữ đủ ${current.path.hours_per_week} giờ học. Với nhịp hiện tại, mục tiêu nằm trong khoảng ${current.readiness.weeks} tuần nữa.`,
      `You are at ${current.currentLevel} in ${def.labelEn}, ${current.readiness.progressPct}% of the way to your target. This week, focus on ${label} and keep your ${current.path.hours_per_week} study hours. At this pace the target is about ${current.readiness.weeks} weeks away.`,
    );
  }, [current, t]);

  const askCoach = async () => {
    if (!current) return;
    setCoachLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("learning-path-coach", {
        body: {
          language,
          subject: current.path.subject,
          subjectLabel: SUBJECTS[current.path.subject].labelEn,
          currentLevel: current.currentLevel,
          targetLevel: current.path.target_level,
          masteryPct: current.masteryPct,
          progressPct: current.readiness.progressPct,
          weeksToTarget: current.readiness.weeks,
          hoursPerWeek: current.path.hours_per_week,
          minutesLast7: current.minutesLast7,
          activeDays30: current.activeDays30,
          vocabMastered: current.vocabMastered,
          dueReviews: current.dueReviews,
          weaknesses: current.weaknesses.slice(0, 4),
          plan: current.plan.map((p) => ({ title: p.titleEn, minutes: p.minutes, skill: p.skill })),
        },
      });
      if (error || !data?.success || !data?.note) throw new Error("coach unavailable");
      setCoach(String(data.note));
    } catch {
      setCoach(fallbackNote);
    } finally {
      setCoachLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="My Learning Path - Personalized Study Plan | HaiEduTech"
        description="A personalized learning path for every subject you study: your current level, target, weekly tasks, skill gaps and how long until you are ready."
        path="/my-path"
      />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="w-5 h-5 text-primary" />
                  <h1 className="text-xl sm:text-3xl font-bold">
                    {t("Lộ trình của tôi", "My Learning Path")}
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  {t(
                    "Kế hoạch học cá nhân hóa dựa trên kết quả thật của bạn ở mọi môn: trình độ hiện tại, mục tiêu, việc cần làm tuần này và phần cần cải thiện.",
                    "A personalized plan built from your real results in every subject: current level, target, this week's tasks and the skills to improve.",
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => void reload()}>
                  <RefreshCw className="w-4 h-4 mr-1" />
                  {t("Làm mới", "Refresh")}
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/my-path/start")}
                  className="bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {t("Thêm môn", "Add subject")}
                </Button>
              </div>
            </div>
            {!userId && (
              <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
                {t(
                  "Bạn đang ở chế độ khách - lộ trình lưu trên thiết bị này. Đăng nhập để đồng bộ và dùng dữ liệu học tập thật.",
                  "Guest mode - your path is stored on this device. Sign in to sync and use your real study data.",
                )}
              </p>
            )}
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("Đang tải dữ liệu học tập...", "Loading your study data...")}
            </div>
          )}

          {!loading && views.length === 0 && (
            <Card className="border-2 border-dashed">
              <CardContent className="py-12 text-center space-y-3">
                <Compass className="w-12 h-12 mx-auto text-primary" />
                <h2 className="text-lg font-bold">
                  {t("Chưa có lộ trình nào", "No path yet")}
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {t(
                    "Trả lời 4 câu hỏi ngắn để HaiEduTech tạo kế hoạch học riêng cho bạn.",
                    "Answer four short questions and HaiEduTech will build a study plan just for you.",
                  )}
                </p>
                <Button asChild className="bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground">
                  <Link to="/my-path/start">{t("Bắt đầu thiết lập", "Start setup")}</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {!loading && views.length > 0 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                {views.map((v) => (
                  <PathSubjectCard
                    key={v.path.subject}
                    view={v}
                    onEdit={() => navigate(`/my-path/start?subject=${v.path.subject}`)}
                    onRemove={() => void removePath(v.path.subject)}
                  />
                ))}
              </div>

              <Tabs value={active} onValueChange={setActive} className="w-full">
                <TabsList className="flex flex-wrap h-auto justify-start gap-1">
                  {views.map((v) => (
                    <TabsTrigger key={v.path.subject} value={v.path.subject} className="text-xs">
                      {SUBJECTS[v.path.subject].emoji}{" "}
                      {t(SUBJECTS[v.path.subject].labelVi, SUBJECTS[v.path.subject].labelEn)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {views.map((v) => (
                  <TabsContent key={v.path.subject} value={v.path.subject} className="mt-4">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <WeeklyPlanList
                        view={v}
                        isStepDone={isStepDone}
                        onToggle={(step, done) => void toggleStepDone(v.path.subject, step, done)}
                      />
                      <div className="space-y-4">
                        <WeaknessList view={v} />
                        <Card className="border-2 border-primary/20">
                          <CardContent className="pt-5 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-base font-bold flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-primary" />
                                {t("Nhận xét từ AI", "AI coach note")}
                              </h3>
                              <Button size="sm" variant="outline" onClick={askCoach} disabled={coachLoading}>
                                {coachLoading ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  t("Phân tích", "Analyze")
                                )}
                              </Button>
                            </div>
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">
                              {coach || fallbackNote}
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <Badge variant="secondary">
                                {t("Tuần qua", "Last 7 days")}: {v.minutesLast7} {t("phút", "min")}
                              </Badge>
                              <Badge variant="secondary">
                                {t("Từ đã thuộc", "Words mastered")}: {v.vocabMastered}
                              </Badge>
                              <Badge variant="secondary">
                                {t("Cần ôn", "Due reviews")}: {v.dueReviews}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyPath;
