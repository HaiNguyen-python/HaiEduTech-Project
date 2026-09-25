/**
 * @file ConversionBits.tsx
 * @description Small Premium conversion helpers: trial progress bar, AI quota badge,
 * free-vs-premium comparison table and renewal reminder.
 */
import { useEffect, useState } from "react";
import { Crown, Sparkles, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FREE_LESSONS, openUpgradeModal, usePremium } from "@/hooks/usePremium";
import { AI_QUOTA_EVENT, FREE_AI_GRADES, getAiGradesUsed } from "@/lib/aiQuota";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

export const TrialProgressBar = ({ total, completedFree = 0 }: { total: number; completedFree?: number }) => {
  const { t } = useLanguage();
  const { isPremium, loading } = usePremium();
  if (loading || isPremium || total <= FREE_LESSONS) return null;
  const locked = total - FREE_LESSONS;
  const pct = Math.round((FREE_LESSONS / total) * 100);
  const trialDone = completedFree >= FREE_LESSONS;
  return (
    <div className="mb-6 rounded-2xl border-2 border-primary/25 bg-card p-4 shadow-sm">
      {trialDone && (
        <p className="mb-2 text-base font-bold text-foreground">
          {t(`Bạn đã hoàn thành phần học thử! Còn ${locked} bài nữa trong khóa này.`, `You've finished the free trial! ${locked} more lessons are waiting in this course.`)}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="mb-1.5 text-sm font-semibold text-foreground">
            {t(`Đã mở ${FREE_LESSONS}/${total} bài`, `${FREE_LESSONS}/${total} lessons unlocked`)}
          </p>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <Button onClick={openUpgradeModal} className="gap-2">
          <Crown className="h-4 w-4" />
          {t(`Mở khóa ${locked} bài còn lại`, `Unlock the other ${locked} lessons`)}
        </Button>
      </div>
    </div>
  );
};

export const AiQuotaBadge = () => {
  const { t } = useLanguage();
  const { user, isPremium, loading } = usePremium();
  const [used, setUsed] = useState(0);
  useEffect(() => {
    const sync = () => setUsed(getAiGradesUsed(user?.id ?? null));
    sync();
    window.addEventListener(AI_QUOTA_EVENT, sync);
    return () => window.removeEventListener(AI_QUOTA_EVENT, sync);
  }, [user]);
  if (loading || isPremium) return null;
  const left = Math.max(0, FREE_AI_GRADES - used);
  return (
    <button
      type="button"
      onClick={openUpgradeModal}
      className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/15"
    >
      <Sparkles className="h-3.5 w-3.5" />
      {left > 0
        ? t(`Còn ${left}/${FREE_AI_GRADES} lượt chấm AI miễn phí`, `${left}/${FREE_AI_GRADES} free AI gradings left`)
        : t("Hết lượt chấm AI miễn phí - Nâng cấp", "No free AI gradings left - Upgrade")}
    </button>
  );
};

const ROWS: { vi: string; en: string; free: string | boolean; freeEn?: string }[] = [
  { vi: "Bài học mỗi khóa", en: "Lessons per course", free: "3 bài", freeEn: "3 lessons" },
  { vi: "Đề thi thử", en: "Mock exams", free: "1 đề/loại", freeEn: "1 per test" },
  { vi: "Chấm AI Writing/Speaking", en: "AI Writing/Speaking grading", free: "3 lượt", freeEn: "3 total" },
  { vi: "Tải chứng chỉ có mã xác thực", en: "Verified certificate download", free: false },
  { vi: "Nội dung nâng cao (Kanji, JLPT, YKI...)", en: "Advanced content (Kanji, JLPT, YKI...)", free: false },
  { vi: "Hỗ trợ ưu tiên từ thầy Hải", en: "Priority support from Teacher Hai", free: false },
];

export const PlanComparison = () => {
  const { t } = useLanguage();
  const [students, setStudents] = useState<number | null>(null);
  useEffect(() => {
    supabase.rpc("get_public_student_count").then(({ data }) => {
      if (typeof data === "number" && data > 0) setStudents(data);
    });
  }, []);
  return (
    <div className="space-y-3">
      <p className="text-center text-sm font-semibold text-foreground">
        {t("Chỉ 19 EUR/năm - rẻ hơn một buổi học gia sư", "Only 19 EUR/year - less than one private tutoring session")}
        {students ? t(` · ${students.toLocaleString()} học viên đang học cùng HaiEduTech`, ` · ${students.toLocaleString()} learners study with HaiEduTech`) : ""}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-2 font-semibold text-muted-foreground">{t("Tính năng", "Feature")}</th>
              <th className="py-2 px-2 text-center font-semibold text-muted-foreground">{t("Miễn phí", "Free")}</th>
              <th className="py-2 pl-2 text-center font-bold text-primary">Premium</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.en} className="border-b border-border/60">
                <td className="py-2 pr-2 text-foreground">{t(r.vi, r.en)}</td>
                <td className="py-2 px-2 text-center text-muted-foreground">
                  {r.free === false ? <X className="mx-auto h-4 w-4" /> : t(String(r.free), r.freeEn ?? String(r.free))}
                </td>
                <td className="py-2 pl-2 text-center"><Check className="mx-auto h-4 w-4 text-secondary" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const RenewalReminder = () => {
  const { t } = useLanguage();
  const { isStaff, isPremium, daysLeft, source } = usePremium();
  const [hidden, setHidden] = useState(false);
  if (hidden || isStaff || !isPremium || daysLeft == null || daysLeft > 14 || !source) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-[70] flex w-[min(92vw,560px)] -translate-x-1/2 items-center gap-3 rounded-xl border border-primary/30 bg-card px-4 py-3 shadow-lg">
      <Clock className="h-5 w-5 shrink-0 text-primary" />
      <p className="flex-1 text-sm text-foreground">
        {t(`Premium của bạn còn ${daysLeft} ngày. Gia hạn để không bị gián đoạn.`, `Your Premium ends in ${daysLeft} days. Renew to keep learning without interruption.`)}
      </p>
      <Button size="sm" onClick={openUpgradeModal}>{t("Gia hạn", "Renew")}</Button>
      <button type="button" onClick={() => setHidden(true)} className="text-muted-foreground hover:text-foreground" aria-label="Close">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
