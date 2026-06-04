/**
 * @file StudentMotivationModal.tsx
 * @description Once-per-day motivational dialog shown to logged-in students.
 *              Summarizes their monthly activity (exams completed, study hours,
 *              mastered words, monthly rank) with a Mr. Hai mascot and a
 *              motivational title + quote. Inspired by FLYER's monthly recap.
 * @author HaiEduTech
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Clock, Star, Share2, Rocket, X } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import { useLanguage } from "@/contexts/LanguageContext";
import mrHai from "@/assets/teacher-hai-chibi-traveler.png";

interface Summary {
  activities_total: number;
  mastered_words_period: number;
  mastered_words_total: number;
  online_minutes: number;
  monthly_rank: number | null;
}

const QUOTES_VI = [
  "Mỗi ngày một chút, một tháng là cả bầu trời tri thức! 🌟",
  "Thầy Hải tự hào về sự kiên trì của em! Tiếp tục cố lên nhé 💪",
  "Học thông minh • Dẫn đầu kỷ nguyên số — em đang đi đúng hướng! 🚀",
  "Mỗi bài học là một viên gạch xây giấc mơ du học của em 🌍",
  "Không có nỗ lực nào là lãng phí. Cố lên nào! ⭐",
];
const QUOTES_EN = [
  "Small steps every day build a sky full of knowledge! 🌟",
  "Mr. Hai is proud of your consistency. Keep going! 💪",
  "Learn smart • Lead the digital era — you're on track! 🚀",
  "Every lesson is a brick toward your study-abroad dream 🌍",
  "No effort is wasted. Keep pushing! ⭐",
];

const titleFor = (lang: "vi" | "en", points: number) => {
  const tiers = lang === "vi"
    ? [
        [500, "THỦ LĨNH ĐƯỜNG ĐUA"],
        [200, "CHIẾN BINH KIÊN CƯỜNG"],
        [50, "TÂN BINH TRIỂN VỌNG"],
        [0, "NGÔI SAO MỚI NỔI"],
      ] as const
    : [
        [500, "RACING CHAMPION"],
        [200, "RESILIENT WARRIOR"],
        [50, "RISING ROOKIE"],
        [0, "NEW SHINING STAR"],
      ] as const;
  return tiers.find(([p]) => points >= p)![1] as string;
};

const STORAGE_PREFIX = "haiedu_motivation_shown_";
const todayKey = () => new Date().toISOString().slice(0, 10);

const StudentMotivationModal = () => {
  const { user, isStudent, isTeacher, loading } = useUserRole();
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [quote] = useState(() => {
    const pool = lang === "vi" ? QUOTES_VI : QUOTES_EN;
    return pool[Math.floor(Math.random() * pool.length)];
  });

  // Trigger once per day per user
  useEffect(() => {
    if (loading || !user?.id) return;
    if (isTeacher || !isStudent) return;
    const key = `${STORAGE_PREFIX}${user.id}_${todayKey()}`;
    if (localStorage.getItem(key)) return;

    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await (supabase as any).rpc("get_student_summary", {
          _user_id: user.id,
          _period: "month",
        });
        if (cancelled || error || !data) return;
        setSummary({
          activities_total: Number(data.activities_total ?? 0),
          mastered_words_period: Number(data.mastered_words_period ?? 0),
          mastered_words_total: Number(data.mastered_words_total ?? 0),
          online_minutes: Number(data.online_minutes ?? 0),
          monthly_rank: data.monthly_rank ?? null,
        });
        // Small delay so it doesn't compete with first paint
        setTimeout(() => {
          if (cancelled) return;
          setOpen(true);
          localStorage.setItem(key, "1");
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.3 },
            colors: ["#3B82F6", "#10B981", "#a78bfa", "#facc15"],
            disableForReducedMotion: true,
          });
        }, 1600);
      } catch {
        /* silent — never block app */
      }
    })();
    return () => { cancelled = true; };
  }, [loading, user?.id, isStudent, isTeacher]);

  if (!summary) return null;

  const points = summary.mastered_words_period * 3 + summary.activities_total * 5;
  const hours = Math.round((summary.online_minutes / 60) * 10) / 10;
  const monthLabel = new Date().getMonth() + 1;
  const title = titleFor(lang, points);

  const handleShare = async () => {
    const text = t(
      `🎓 HaiEduTech — Tháng ${monthLabel}: ${summary.activities_total} hoạt động, ${hours}h học, ${summary.mastered_words_period} từ mới${summary.monthly_rank ? `, hạng #${summary.monthly_rank}` : ""}. ${quote}`,
      `🎓 HaiEduTech — Month ${monthLabel}: ${summary.activities_total} activities, ${hours}h studied, ${summary.mastered_words_period} new words${summary.monthly_rank ? `, rank #${summary.monthly_rank}` : ""}. ${quote}`
    );
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("Đã sao chép! Gửi cho phụ huynh nhé 📋", "Copied! Share with your parents 📋"));
    } catch {
      toast.error(t("Không thể sao chép", "Could not copy"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-3xl p-0 border-0 bg-transparent shadow-none [&>button]:hidden"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="relative rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-slate-900/95 p-6 md:p-8 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {/* Glow accents */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-500/30 rounded-full blur-3xl" />

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            {/* Left: title + stats */}
            <div className="text-white">
              <p className="text-base md:text-lg font-semibold text-white/80 mb-1">
                {t("Bạn chính là", "You are")}
              </p>
              <h2 className="text-3xl md:text-4xl font-black leading-tight bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent mb-4">
                {title}
              </h2>
              <p className="text-base text-white/90 mb-4">
                {t(`Trong tháng ${monthLabel}, em đã…`, `In month ${monthLabel}, you have…`)}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <StatBox
                  icon={<Sparkles className="w-4 h-4" />}
                  label={t("HOẠT ĐỘNG", "ACTIVITIES")}
                  value={summary.activities_total}
                  unit={t("lần", "")}
                />
                <StatBox
                  icon={<Star className="w-4 h-4" />}
                  label={t("ĐẠT TỚI", "REACHED")}
                  value={points}
                  unit={t("điểm", "pts")}
                />
              </div>
            </div>

            {/* Right: mascot + rank + hours + quote */}
            <div className="flex flex-col items-center text-center text-white">
              <motion.img
                src={mrHai}
                alt="Mr. Hai"
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              />
              <div className="grid grid-cols-2 gap-3 w-full mt-3">
                <StatBox
                  icon={<Trophy className="w-4 h-4 text-yellow-300" />}
                  label={t("XẾP HẠNG", "RANK")}
                  value={summary.monthly_rank ? `#${summary.monthly_rank}` : "—"}
                  unit={t("học sinh", "students")}
                  accent
                />
                <StatBox
                  icon={<Clock className="w-4 h-4 text-emerald-300" />}
                  label={t("ÔN LUYỆN", "STUDIED")}
                  value={hours}
                  unit={t("giờ", "h")}
                  accent
                />
              </div>
              <p className="mt-4 text-sm md:text-base text-white/90 italic leading-relaxed">
                {quote}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="relative mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white font-bold px-6"
              size="lg"
            >
              <Rocket className="w-4 h-4 mr-2" />
              {t("Tiếp tục học", "Keep learning")}
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/5 text-white hover:bg-white/15"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {t("Chia sẻ với phụ huynh", "Share with parents")}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

const StatBox = ({
  icon, label, value, unit, accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  accent?: boolean;
}) => (
  <div
    className={`rounded-2xl border ${
      accent
        ? "border-yellow-400/40 bg-gradient-to-br from-yellow-500/15 to-amber-500/10"
        : "border-white/20 bg-white/5"
    } p-3 backdrop-blur`}
  >
    <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white/70 uppercase">
      {icon}
      {label}
    </div>
    <div className="mt-1 flex items-baseline gap-1">
      <span className="text-2xl md:text-3xl font-black text-white">{value}</span>
      {unit && <span className="text-xs text-white/70">{unit}</span>}
    </div>
  </div>
);

export default StudentMotivationModal;
