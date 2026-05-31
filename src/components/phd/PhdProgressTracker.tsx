/**
 * @file PhdProgressTracker.tsx
 * @description 5-step PhD journey checklist persisted in localStorage.
 */
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, Target, Search, FileText, Send, Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "phd-hub-progress";

const STEPS = [
  { id: "define", icon: Target, vi: "Khoanh vùng đề tài", en: "Define your niche",
    descVi: "Chọn 2–3 từ khoá em có thể bảo vệ trong 4 năm tới.",
    descEn: "Pick 2–3 keywords you can defend for the next 4 years." },
  { id: "supervisor", icon: Search, vi: "Tìm supervisor", en: "Find supervisor",
    descVi: "Liệt kê 25–40 supervisor tiềm năng + đọc paper của họ.",
    descEn: "List 25–40 candidate supervisors + read their papers." },
  { id: "proposal", icon: FileText, vi: "Viết proposal", en: "Write proposal",
    descVi: "Hoàn thành proposal 1500–2000 từ qua Builder bên dưới.",
    descEn: "Write a 1500–2000 word proposal with the Builder below." },
  { id: "apply", icon: Send, vi: "Nộp hồ sơ", en: "Submit applications",
    descVi: "Apply 6–10 chương trình; check kỹ deadline.",
    descEn: "Apply to 6–10 programs; double-check deadlines." },
  { id: "visa", icon: Plane, vi: "Visa & nhập học", en: "Visa & enrollment",
    descVi: "Khám sức khoẻ, chứng minh tài chính, đặt vé bay.",
    descEn: "Health check, financial proof, book your flight." },
];

const PhdProgressTracker = () => {
  const { t } = useLanguage();
  const [done, setDone] = useState<boolean[]>(() => new Array(STEPS.length).fill(false));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === STEPS.length) setDone(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  const toggle = (i: number) => {
    setDone((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const completed = done.filter(Boolean).length;
  const pct = Math.round((completed / STEPS.length) * 100);

  return (
    <Card className="mb-12 border-violet-200/60 dark:border-violet-800/40 bg-gradient-to-br from-violet-50/60 to-fuchsia-50/60 dark:from-violet-950/30 dark:to-fuchsia-950/20">
      <CardContent className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
              🎯 {t("Hành trình PhD của em", "Your PhD Journey")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("Tick mốc khi em hoàn thành - tự động lưu trong trình duyệt.",
                "Tick each milestone you finish - auto-saved in your browser.")}
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-0">
            {completed}/{STEPS.length} · {pct}%
          </Badge>
        </div>

        <Progress value={pct} className="mb-5 h-2.5" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = done[i];
            return (
              <button
                key={s.id}
                onClick={() => toggle(i)}
                className={`text-left p-3 rounded-lg border-2 transition-all ${
                  active
                    ? "bg-emerald-500/10 border-emerald-500 dark:bg-emerald-500/20"
                    : "bg-background/60 border-border hover:border-violet-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    active ? "bg-emerald-500 text-white" : "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                  }`}>
                    {active ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {t(`Bước ${i + 1}`, `Step ${i + 1}`)}
                  </span>
                </div>
                <div className="font-semibold text-sm leading-tight mb-1">
                  {t(s.vi, s.en)}
                </div>
                <div className="text-[11px] text-muted-foreground leading-snug">
                  {t(s.descVi, s.descEn)}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhdProgressTracker;
