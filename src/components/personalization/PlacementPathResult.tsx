/**
 * @file PlacementPathResult.tsx
 * @description Result screen shown right after a placement test: the level the
 *   student reached, per-skill scores, the suggested class and a concrete
 *   personalized study path (goal, weekly hours, this week's tasks) that is
 *   saved into "My Learning Path" automatically.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, Compass, GraduationCap, Loader2, Target, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLearningPath } from "@/hooks/useLearningPath";
import { SKILL_LABEL, SUBJECTS, type SubjectId } from "@/lib/personalization/subjectRegistry";
import { nextStep, weeklyLoadSummary } from "@/lib/personalization/pathModel";
import { fourWeekOutline, subjectsForBank, weaknessLinks } from "@/lib/personalization/placementBridge";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { CalendarClock, History } from "lucide-react";
import type { Cefr } from "@/data/placementTest";

export interface PlacementResultSummary {
  total: number;
  cefr: string;
  skills?: Record<string, number>;
  confidence?: "high" | "medium" | "low";
  recommendedClass?: string;
  weakestAreas?: string[];
  notes?: string[];
}

interface Props {
  /** Bank slug: english | chinese | vietnamese | finnish | japanese | swedish | programming. */
  bank: string;
  result: PlacementResultSummary;
}

const CONFIDENCE_LABEL: Record<string, { vi: string; en: string }> = {
  high: { vi: "Độ tin cậy cao", en: "High confidence" },
  medium: { vi: "Độ tin cậy trung bình", en: "Medium confidence" },
  low: { vi: "Cần thêm dữ liệu", en: "Needs more data" },
};

const PlacementPathResult = ({ bank, result }: Props) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    views, loading, savePath, seedFromPlacement, isStepDone,
  } = useLearningPath();
  const [seeding, setSeeding] = useState(true);
  const [hours, setHours] = useState(5);
  const seededRef = useRef(false);

  const targets = useMemo(() => subjectsForBank(bank), [bank]);
  const primary: SubjectId = targets[0];
  const def = SUBJECTS[primary];

  // Save the path once, as soon as the result screen appears.
  useEffect(() => {
    if (seededRef.current || loading) return;
    seededRef.current = true;
    void (async () => {
      await seedFromPlacement(bank, result.cefr as Cefr, result.total);
      setSeeding(false);
    })();
  }, [bank, loading, result.cefr, result.total, seedFromPlacement]);

  const view = views.find((v) => v.path.subject === primary);

  useEffect(() => {
    if (view) setHours(view.path.hours_per_week);
  }, [view]);

  const applyHours = async (next: number) => {
    setHours(next);
    if (!view) return;
    await savePath({ ...view.path, hours_per_week: next });
  };

  const weaknesses = useMemo(
    () => weaknessLinks(primary, result.skills ?? {}, def),
    [primary, result.skills, def],
  );

  // Previous run of the same bank, so the student sees progress over time.
  const [previous, setPrevious] = useState<{ total: number; cefr: string; at: string } | null>(null);
  useEffect(() => {
    void (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;
      const { data } = await supabase
        .from("placement_test_results")
        .select("total_score, cefr_band, created_at, answers")
        .eq("user_id", auth.user.id)
        .order("created_at", { ascending: false })
        .limit(12);
      const runs = (data ?? []).filter((r) => {
        const a = r.answers as { __subject?: string } | null;
        return (a?.__subject ?? "english") === bank;
      });
      const prior = runs[1];
      if (prior) {
        setPrevious({
          total: prior.total_score ?? 0,
          cefr: String(prior.cefr_band ?? ""),
          at: String(prior.created_at ?? "").slice(0, 10),
        });
      }
    })();
  }, [bank]);

  const outline = useMemo(
    () => fourWeekOutline(primary, result.skills ?? {}, hours, def),
    [primary, result.skills, hours, def],
  );

  const applyTargetDate = async (next: string) => {
    if (!view || !next) return;
    await savePath({ ...view.path, target_date: next });
  };

  const plan = view?.plan ?? [];
  const load = view ? weeklyLoadSummary(plan, isStepDone, view.path.hours_per_week) : null;
  const first = nextStep(plan);

  return (
    <div className="space-y-5">
      {/* Level card */}
      <div className="rounded-2xl border-2 border-primary/20 bg-card p-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">
          {t("Bạn đã hoàn thành bài kiểm tra trình độ", "Placement test completed")}
        </h1>
        <p className="text-muted-foreground text-sm mb-4">
          {t(
            "Đây là trình độ hiện tại và lộ trình học được xây riêng cho bạn.",
            "Here is your current level and the study path built for you.",
          )}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge className="text-base px-4 py-1.5 bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground">
            {t("Trình độ", "Level")}: {result.cefr}
          </Badge>
          <Badge variant="outline" className="text-base px-4 py-1.5">
            {t("Điểm", "Score")}: {result.total}/100
          </Badge>
          {result.confidence && (
            <Badge variant="secondary" className="px-3 py-1.5">
              {t(
                CONFIDENCE_LABEL[result.confidence].vi,
                CONFIDENCE_LABEL[result.confidence].en,
              )}
            </Badge>
          )}
        </div>
        {view && (
          <p className="text-sm mt-4">
            {def.emoji} {t(def.labelVi, def.labelEn)}:{" "}
            <b>{view.path.current_level}</b> {"->"}{" "}
            <b>{view.path.target_level}</b>{" "}
            <span className="text-muted-foreground">
              ({t("mục tiêu", "target")} {view.path.target_date})
            </span>
          </p>
        )}
      </div>

      {/* Progress against the previous attempt */}
      {previous && (
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-bold mb-2 flex items-center gap-2">
            <History className="w-4 h-4 text-primary" />
            {t("So với lần kiểm tra trước", "Compared with your last attempt")}
          </h2>
          <p className="text-sm">
            {previous.at}: <b>{previous.cefr}</b> · {previous.total}/100 {"->"}{" "}
            {t("hôm nay", "today")}: <b>{result.cefr}</b> · {result.total}/100{" "}
            <span className={result.total >= previous.total ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>
              ({result.total >= previous.total ? "+" : ""}{result.total - previous.total})
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {result.total >= previous.total
              ? t("Bạn đang tiến bộ, hãy giữ nhịp học mỗi tuần.", "You are improving, keep the weekly rhythm.")
              : t("Điểm thấp hơn lần trước, hãy tập trung vào kỹ năng yếu bên dưới.", "Lower than last time, focus on the weak skills below.")}
          </p>
        </div>
      )}

      {/* Skills */}
      {result.skills && Object.keys(result.skills).length > 0 && (
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            {t("Điểm từng kỹ năng", "Score by skill")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.entries(result.skills).map(([skill, pct]) => {
              const label = SKILL_LABEL[skill] ?? { vi: skill, en: skill };
              return (
                <div key={skill}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{t(label.vi, label.en)}</span>
                    <span className="text-muted-foreground">{pct}/100</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Class + teacher notes */}
      {result.recommendedClass && (
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-bold mb-2 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            {t("Lớp học phù hợp", "Suggested class")}
          </h2>
          <p className="text-sm">{result.recommendedClass}</p>
          {result.weakestAreas && result.weakestAreas.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {t("Cần cải thiện trước", "Focus first on")}: {result.weakestAreas.join(", ")}
            </p>
          )}
          {result.notes?.map((note) => (
            <p key={note} className="text-xs text-muted-foreground mt-1">{note}</p>
          ))}
          <p className="text-xs text-muted-foreground mt-2">
            {t(
              "Thầy Hải sẽ xem lại phần nói và viết của bạn rồi xác nhận lớp.",
              "Teacher Hai will review your speaking and writing answers and confirm the class.",
            )}
          </p>
        </div>
      )}

      {/* Weak skills with practice links */}
      {weaknesses.length > 0 && (
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-bold mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-500" />
            {t("Bắt đầu cải thiện từ đây", "Start improving here")}
          </h2>
          <ul className="space-y-2">
            {weaknesses.map((w) => {
              const label = SKILL_LABEL[w.skill] ?? { vi: w.skill, en: w.skill };
              return (
                <li key={w.skill} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span>
                    <b>{t(label.vi, label.en)}</b>{" "}
                    <span className="text-muted-foreground">{w.pct}/100</span>
                  </span>
                  <Link to={w.route} className="text-primary hover:underline inline-flex items-center gap-1">
                    {t(w.titleVi, w.titleEn)} <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Weekly plan */}
      <div className="rounded-2xl border-2 border-emerald-500/20 bg-card p-5">
        <h2 className="font-bold mb-1 flex items-center gap-2">
          <Compass className="w-4 h-4 text-primary" />
          {t("Lộ trình tuần này", "This week's plan")}
        </h2>
        {seeding || loading ? (
          <p className="text-sm text-muted-foreground flex items-center gap-2 py-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("Đang tạo lộ trình cho bạn...", "Building your path...")}
          </p>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">
                  {t("Thời gian học mỗi tuần", "Study hours per week")}
                </span>
                <span className="font-bold">{hours}h</span>
              </div>
              <Slider
                value={[hours]}
                min={2}
                max={20}
                step={1}
                onValueChange={(v) => setHours(v[0])}
                onValueCommit={(v) => void applyHours(v[0])}
              />
              {load && (
                <p className="text-xs text-muted-foreground mt-1">
                  {t("Tổng thời lượng kế hoạch", "Planned load")}: {load.plannedMinutes}
                  {t(" phút", " min")}
                </p>
              )}
            </div>
            <ol className="space-y-2">
              {plan.map((step, i) => (
                <li key={`${step.route}-${step.titleEn}`} className="text-sm">
                  <Link to={step.route} className="hover:text-primary transition-colors">
                    <span className="font-bold mr-1">{i + 1}.</span>
                    {t(step.titleVi, step.titleEn)}{" "}
                    <span className="text-muted-foreground">
                      ({step.minutes}
                      {t(" phút", " min")})
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            {targets.length > 1 && (
              <p className="text-xs text-muted-foreground mt-3">
                {t(
                  `Lộ trình cũng được tạo cho: ${targets.slice(1).map((s) => SUBJECTS[s].labelVi).join(", ")}.`,
                  `Paths were also created for: ${targets.slice(1).map((s) => SUBJECTS[s].labelEn).join(", ")}.`,
                )}
              </p>
            )}
          </>
        )}
      </div>

      {/* Target date + four-week outline */}
      {view && !seeding && (
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-bold mb-3 flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-primary" />
            {t("Kế hoạch 4 tuần đầu", "Your first four weeks")}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
            <span className="text-muted-foreground">{t("Ngày mục tiêu", "Target date")}</span>
            <Input
              type="date"
              className="w-auto"
              defaultValue={view.path.target_date ?? ""}
              onChange={(e) => void applyTargetDate(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            {outline.map((w) => (
              <div key={w.week} className="rounded-xl border bg-muted/30 p-3">
                <div className="text-sm font-semibold mb-1">
                  {t(`Tuần ${w.week}`, `Week ${w.week}`)}: {t(w.focusVi, w.focusEn)}
                </div>
                <ul className="space-y-1">
                  {w.items.map((it, i) => (
                    <li key={`${w.week}-${it.route}-${i}`} className="text-sm">
                      <Link to={it.route} className="hover:text-primary transition-colors">
                        {t(it.titleVi, it.titleEn)}{" "}
                        <span className="text-muted-foreground">({it.minutes}{t(" phút", " min")})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {t(
              "Hãy làm lại bài kiểm tra trình độ sau khoảng 8 tuần để cập nhật lộ trình.",
              "Retake the placement test after about 8 weeks to refresh your path.",
            )}
          </p>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        {first && (
          <Button
            className="bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground"
            onClick={() => navigate(first.route)}
          >
            {t("Học ngay", "Start learning")} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
        <Button variant="outline" asChild>
          <Link to="/my-path">{t("Xem lộ trình đầy đủ", "Open full path")}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/my-path/start">{t("Điều chỉnh mục tiêu", "Adjust my goals")}</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/dashboard">{t("Về Dashboard", "Go to dashboard")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default PlacementPathResult;
