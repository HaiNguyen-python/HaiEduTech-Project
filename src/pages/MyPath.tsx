/**
 * @file MyPath.tsx
 * @description "Lộ trình của tôi" - the personalized study dashboard: the single
 *   next action, per-subject level vs target, readiness forecast with an
 *   explanation, this week's plan spread over free days, weekly pace, an
 *   eight-week history, ranked weaknesses, a cached AI coach note and a
 *   one-page PDF for parents.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, Download, Info, Loader2, Plus, RefreshCw, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { SUBJECTS } from "@/lib/personalization/subjectRegistry";
import { nextStep, stepKey } from "@/lib/personalization/pathModel";
import { useLearningPath, type PathView } from "@/hooks/useLearningPath";
import { getCachedDisplayName } from "@/hooks/useDisplayName";
import { exportPathPdf } from "@/lib/personalization/pathReport";
import PathSubjectCard from "@/components/personalization/PathSubjectCard";
import WeeklyPlanList from "@/components/personalization/WeeklyPlanList";
import WeaknessList from "@/components/personalization/WeaknessList";
import NextStepHero from "@/components/personalization/NextStepHero";
import PathHistoryChart from "@/components/personalization/PathHistoryChart";

const MyPath = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const {
    userId, views, history, loading, removePath, toggleStepDone, isStepDone,
    pushToTodo, readCoachNote, saveCoachNote, reload,
  } = useLearningPath();
  const [active, setActive] = useState<string>("");
  const [coachLoading, setCoachLoading] = useState(false);
  const [coachNotes, setCoachNotes] = useState<Record<string, string>>({});
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!active && views.length > 0) setActive(views[0].path.subject);
  }, [views, active]);

  const current = views.find((v) => v.path.subject === active) ?? views[0];

  const fallbackNote = (view: PathView): string => {
    const def = SUBJECTS[view.path.subject];
    const label = view.weaknesses[0]?.skill ?? "";
    if (!view.enoughData) {
      return t(
        `Chưa đủ dữ liệu để dự đoán chính xác cho môn ${def.labelVi}. Hãy làm 2-3 bài luyện tập hoặc một bài kiểm tra trình độ trong tuần này, sau đó lộ trình sẽ tự cập nhật.`,
        `Not enough data yet for a reliable ${def.labelEn} forecast. Do 2-3 practice sets or a placement test this week and the path will update itself.`,
      );
    }
    return t(
      `Bạn đang ở ${view.currentLevel} môn ${def.labelVi}, hoàn thành ${view.readiness.progressPct}% chặng đường tới mục tiêu. Tuần này hãy tập trung vào ${label} và giữ đủ ${view.path.hours_per_week} giờ học. Với nhịp hiện tại, mục tiêu nằm trong khoảng ${view.readiness.weeks} tuần nữa.`,
      `You are at ${view.currentLevel} in ${def.labelEn}, ${view.readiness.progressPct}% of the way to your target. This week, focus on ${label} and keep your ${view.path.hours_per_week} study hours. At this pace the target is about ${view.readiness.weeks} weeks away.`,
    );
  };

  /** Cached note first, so the AI is called at most once per subject per week. */
  const noteFor = (view: PathView): string =>
    coachNotes[view.path.subject] || readCoachNote(view.path.subject) || fallbackNote(view);

  const askCoach = async () => {
    if (!current) return;
    setCoachLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("learning-path-coach", {
        body: {
          language: lang,
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
          enoughData: current.enoughData,
          weaknesses: current.weaknesses.slice(0, 4),
          plan: current.plan.map((p) => ({ title: p.titleEn, minutes: p.minutes, skill: p.skill })),
        },
      });
      if (error || !data?.success || !data?.note) throw new Error("coach unavailable");
      const note = String(data.note);
      setCoachNotes((prev) => ({ ...prev, [current.path.subject]: note }));
      await saveCoachNote(current.path.subject, note);
    } catch {
      setCoachNotes((prev) => ({ ...prev, [current.path.subject]: fallbackNote(current) }));
      toast({
        title: t("Dùng nhận xét theo mẫu", "Using the built-in note"),
        description: t("AI đang không sẵn sàng, số liệu vẫn chính xác.", "The AI is unavailable; your numbers are still accurate."),
      });
    } finally {
      setCoachLoading(false);
    }
  };

  const downloadPdf = async (view: PathView) => {
    setExporting(true);
    try {
      const doneKeys = new Set(view.plan.filter((s) => isStepDone(s)).map((s) => stepKey(s)));
      await exportPathPdf(view, getCachedDisplayName(userId) || "Student", doneKeys);
    } catch {
      toast({ title: t("Không xuất được PDF", "Could not export the PDF") });
    } finally {
      setExporting(false);
    }
  };

  const heroSubject = useMemo(() => {
    // The subject furthest from its target that still has an unfinished step.
    const candidates = views
      .map((v) => ({ view: v, step: nextStep(v.plan.filter((s) => !isStepDone(s))) }))
      .filter((c) => c.step !== null);
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => a.view.readiness.progressPct - b.view.readiness.progressPct);
    return candidates[0] as { view: PathView; step: NonNullable<typeof candidates[0]["step"]> };
  }, [views, isStepDone]);

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
              {heroSubject && (
                <NextStepHero
                  view={heroSubject.view}
                  step={heroSubject.step}
                  done={isStepDone(heroSubject.step)}
                  onToggle={(done) =>
                    void toggleStepDone(heroSubject.view.path.subject, heroSubject.step, done)
                  }
                />
              )}

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
                  <TabsContent key={v.path.subject} value={v.path.subject} className="mt-4 space-y-4">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <WeeklyPlanList
                        view={v}
                        isStepDone={isStepDone}
                        onToggle={(step, done) => void toggleStepDone(v.path.subject, step, done)}
                        onPushToTodo={(step) => pushToTodo(v.path.subject, step)}
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
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{noteFor(v)}</p>
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

                        <Card className="border-2">
                          <CardContent className="pt-5 space-y-3">
                            <h3 className="text-base font-bold flex items-center gap-2">
                              <Info className="w-4 h-4 text-primary" />
                              {t("Dự đoán được tính thế nào", "How the forecast is built")}
                            </h3>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                              {t(v.explain.vi, v.explain.en)}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => void downloadPdf(v)}
                              disabled={exporting}
                            >
                              {exporting ? (
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              ) : (
                                <Download className="w-4 h-4 mr-1" />
                              )}
                              {t("Xuất PDF cho phụ huynh", "Export PDF for parents")}
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <PathHistoryChart history={history} />
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
