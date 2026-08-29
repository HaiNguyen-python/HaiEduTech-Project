/**
 * @file MyPathOnboarding.tsx
 * @description 4-step wizard that sets up a personalized path: subjects, goals
 *   and target dates, weekly commitment, and the starting level.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Compass, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { SUBJECTS, SUBJECT_IDS, type SubjectId } from "@/lib/personalization/subjectRegistry";
import { useLearningPath } from "@/hooks/useLearningPath";

const DAYS = [
  { key: "mon", vi: "T2", en: "Mon" },
  { key: "tue", vi: "T3", en: "Tue" },
  { key: "wed", vi: "T4", en: "Wed" },
  { key: "thu", vi: "T5", en: "Thu" },
  { key: "fri", vi: "T6", en: "Fri" },
  { key: "sat", vi: "T7", en: "Sat" },
  { key: "sun", vi: "CN", en: "Sun" },
];

const MyPathOnboarding = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [params] = useSearchParams();
  const { rows, savePath } = useLearningPath();

  const editSubject = params.get("subject") as SubjectId | null;
  const existing = rows.find((r) => r.subject === editSubject);

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<SubjectId[]>(editSubject ? [editSubject] : []);
  const [targets, setTargets] = useState<Record<string, string>>(
    existing?.target_level ? { [existing.subject]: existing.target_level } : {},
  );
  const [dates, setDates] = useState<Record<string, string>>(
    existing?.target_date ? { [existing.subject]: existing.target_date } : {},
  );
  const [hours, setHours] = useState<number>(existing?.hours_per_week ?? 6);
  const [days, setDays] = useState<string[]>(existing?.available_days ?? ["mon", "wed", "fri", "sun"]);
  const [startLevels, setStartLevels] = useState<Record<string, string>>(
    existing?.start_level ? { [existing.subject]: existing.start_level } : {},
  );
  const [saving, setSaving] = useState(false);

  const steps = useMemo(
    () => [
      t("Chọn môn", "Choose subjects"),
      t("Mục tiêu", "Goals"),
      t("Thời gian", "Time"),
      t("Trình độ", "Level"),
    ],
    [t],
  );

  const toggleSubject = (id: SubjectId) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const canNext =
    step === 0 ? selected.length > 0 : step === 2 ? days.length > 0 && hours > 0 : true;

  const finish = async () => {
    setSaving(true);
    try {
      for (const id of selected) {
        const def = SUBJECTS[id];
        const target = targets[id] ?? def.ladder[Math.min(2, def.ladder.length - 1)];
        await savePath({
          subject: id,
          goal_label: t(`Đạt ${target} môn ${def.labelVi}`, `Reach ${target} in ${def.labelEn}`),
          target_level: target,
          target_date: dates[id] || null,
          hours_per_week: Math.round(hours / selected.length) || 1,
          available_days: days,
          start_level: startLevels[id] ?? def.ladder[0],
          current_level: startLevels[id] ?? def.ladder[0],
          status: "active",
        });
      }
      toast({
        title: t("Đã tạo lộ trình", "Path created"),
        description: t("Kế hoạch tuần đầu đã sẵn sàng.", "Your first weekly plan is ready."),
      });
      navigate("/my-path");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Set Up My Learning Path | HaiEduTech"
        description="Answer four short questions and get a personalized study path with weekly tasks for every subject you learn."
        path="/my-path/start"
      />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <Link
            to="/my-path"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Về lộ trình của tôi", "Back to my path")}
          </Link>

          <div className="rounded-2xl p-5 bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5 text-primary" />
              <h1 className="text-xl sm:text-2xl font-bold">
                {t("Thiết lập lộ trình của tôi", "Set up my learning path")}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {t(
                "4 bước ngắn. Bạn có thể sửa lại bất cứ lúc nào.",
                "Four short steps. You can change everything later.",
              )}
            </p>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-xs mb-2">
              {steps.map((label, i) => (
                <span key={label} className={i <= step ? "text-primary font-semibold" : "text-muted-foreground"}>
                  {i + 1}. {label}
                </span>
              ))}
            </div>
            <Progress value={((step + 1) / steps.length) * 100} className="h-1.5" />
          </div>

          <Card className="border-2">
            <CardContent className="pt-5 space-y-4">
              {step === 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUBJECT_IDS.map((id) => {
                    const def = SUBJECTS[id];
                    const on = selected.includes(id);
                    return (
                      <button
                        key={id}
                        onClick={() => toggleSubject(id)}
                        className={`text-left p-3 rounded-xl border-2 transition ${
                          on ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50"
                        }`}
                      >
                        <div className="text-lg">{def.emoji}</div>
                        <div className="text-sm font-semibold">{t(def.labelVi, def.labelEn)}</div>
                        {on && <Check className="w-4 h-4 text-primary mt-1" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 1 &&
                selected.map((id) => {
                  const def = SUBJECTS[id];
                  return (
                    <div key={id} className="rounded-xl border p-3 space-y-2">
                      <div className="text-sm font-semibold">
                        {def.emoji} {t(def.labelVi, def.labelEn)}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {def.ladder.map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setTargets((p) => ({ ...p, [id]: lvl }))}
                            className={`px-2.5 py-1 rounded-lg text-xs border-2 ${
                              targets[id] === lvl ? "border-primary bg-primary/10 font-semibold" : "border-muted"
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          {t("Ngày mong muốn đạt được", "Target date")}
                        </label>
                        <Input
                          type="date"
                          value={dates[id] ?? ""}
                          onChange={(e) => setDates((p) => ({ ...p, [id]: e.target.value }))}
                          className="mt-1 text-sm"
                        />
                      </div>
                    </div>
                  );
                })}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{t("Số giờ học mỗi tuần", "Hours per week")}</span>
                      <Badge variant="outline">{hours}h</Badge>
                    </div>
                    <Slider
                      value={[hours]}
                      min={2}
                      max={20}
                      step={1}
                      onValueChange={(v) => setHours(v[0])}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">{t("Ngày rảnh", "Available days")}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {DAYS.map((d) => {
                        const on = days.includes(d.key);
                        return (
                          <button
                            key={d.key}
                            onClick={() =>
                              setDays((p) => (on ? p.filter((x) => x !== d.key) : [...p, d.key]))
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs border-2 ${
                              on ? "border-primary bg-primary/10 font-semibold" : "border-muted"
                            }`}
                          >
                            {t(d.vi, d.en)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 &&
                selected.map((id) => {
                  const def = SUBJECTS[id];
                  return (
                    <div key={id} className="rounded-xl border p-3 space-y-2">
                      <div className="text-sm font-semibold">
                        {def.emoji} {t(def.labelVi, def.labelEn)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t("Bạn đang ở mức nào?", "Where are you now?")}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {def.ladder.map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setStartLevels((p) => ({ ...p, [id]: lvl }))}
                            className={`px-2.5 py-1 rounded-lg text-xs border-2 ${
                              startLevels[id] === lvl ? "border-primary bg-primary/10 font-semibold" : "border-muted"
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                      {def.placement && (
                        <Link
                          to={def.placement}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <Sparkles className="w-3 h-3" />
                          {t("Không rõ? Làm bài kiểm tra xếp lớp", "Not sure? Take the placement test")}
                        </Link>
                      )}
                    </div>
                  );
                })}

              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                >
                  {t("Quay lại", "Back")}
                </Button>
                {step < steps.length - 1 ? (
                  <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
                    {t("Tiếp tục", "Continue")}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={finish}
                    disabled={saving || selected.length === 0}
                    className="bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground"
                  >
                    {saving ? t("Đang lưu...", "Saving...") : t("Tạo lộ trình", "Create my path")}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyPathOnboarding;
