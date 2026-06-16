import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, Flame, Star, Award, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { MASTERY_UPDATED_EVENT } from "@/hooks/useMasteredVocab";

interface Achiever {
  user_id: string;
  display_name: string;
  weekly_count: number;
  total_count: number;
}

interface Props {
  subject: string;
  threshold?: number;
  className?: string;
}

const medal = (i: number) => {
  if (i === 0) return "🥇";
  if (i === 1) return "🥈";
  if (i === 2) return "🥉";
  return `#${i + 1}`;
};

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    Promise.resolve(p).then(
      (v) => { clearTimeout(t); resolve(v); },
      (e) => { clearTimeout(t); reject(e); },
    );
  });
}

const WeeklyVocabAchievers = ({ subject, threshold = 20, className }: Props) => {
  const { t } = useLanguage();
  const [list, setList] = useState<Achiever[]>([]);
  const [me, setMe] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const mountedRef = useRef(true);

  const fetchList = useCallback(async () => {
    setError(false);
    let attempt = 0;
    while (attempt < 3) {
      attempt++;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!mountedRef.current) return;
        setMe(user?.id || null);
        const { data, error: rpcError } = await withTimeout<any>(
          (supabase as any).rpc("get_weekly_vocab_achievers", {
            _subject: subject,
            _threshold: threshold,
          }),
          7000 + attempt * 3000,
        );
        if (rpcError) throw rpcError;
        if (!mountedRef.current) return;
        setList((data || []) as Achiever[]);
        setLoading(false);
        return;
      } catch (e) {
        if (attempt >= 3) {
          console.error("Failed to fetch weekly achievers", e);
          if (!mountedRef.current) return;
          setError(true);
          setLoading(false);
          return;
        }
        await new Promise((r) => setTimeout(r, 600 * attempt));
      }
    }
  }, [subject, threshold]);

  useEffect(() => {
    mountedRef.current = true;
    fetchList();
    let timer: number | undefined;
    const onLocal = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.subject && detail.subject !== subject) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(fetchList, 500);
    };
    window.addEventListener(MASTERY_UPDATED_EVENT, onLocal);
    return () => {
      mountedRef.current = false;
      window.removeEventListener(MASTERY_UPDATED_EVENT, onLocal);
      window.clearTimeout(timer);
    };
  }, [subject, fetchList]);

  return (
    <div
      className={
        "relative overflow-hidden rounded-2xl border border-amber-300/50 dark:border-amber-500/30 shadow-md " +
        "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-orange-950/30 " +
        (className || "")
      }
    >
      {/* sparkle accents */}
      <div className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full bg-amber-300/30 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-orange-300/30 blur-2xl" />

      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-extrabold text-amber-900 dark:text-amber-200 leading-tight">
                {t("🏆 Bảng Vinh Danh Tuần", "🏆 Weekly Honors Board")}
              </h3>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-amber-800/80 dark:text-amber-200/70 leading-snug mt-0.5">
              {t(
                `Học viên đã chinh phục ≥ ${threshold} từ mới trong 7 ngày qua`,
                `Students who mastered ≥ ${threshold} new words this week`
              )}
            </p>
          </div>
        </div>

        {/* Body */}
        {loading ? (
          <div className="text-xs text-center text-amber-700/70 dark:text-amber-200/60 py-4">
            {t("Đang tải...", "Loading...")}
          </div>
        ) : list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-amber-300 dark:border-amber-700/50 bg-white/50 dark:bg-amber-950/20 p-4 text-center">
            <div className="text-3xl mb-1">🌟</div>
            <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">
              {t("Hãy là người đầu tiên!", "Be the first!")}
            </p>
            <p className="text-[11px] text-amber-800/70 dark:text-amber-200/60 mt-1 leading-snug">
              {t(
                `Học ${threshold} từ mới trong tuần để xuất hiện ở đây 💪`,
                `Master ${threshold} new words this week to appear here 💪`
              )}
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
            <AnimatePresence initial={false}>
              {list.map((a, i) => {
                const mine = a.user_id === me;
                return (
                  <motion.div
                    key={a.user_id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i, 8) * 0.03 }}
                    className={
                      "group relative flex items-center gap-2 rounded-xl px-2.5 py-2 border transition-all " +
                      (mine
                        ? "bg-gradient-to-r from-amber-200/80 to-orange-200/80 dark:from-amber-800/40 dark:to-orange-800/40 border-amber-500/60 ring-1 ring-amber-400/40 shadow-sm"
                        : i === 0
                        ? "bg-white/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/40 shadow-sm"
                        : "bg-white/60 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/30 hover:bg-white/90 dark:hover:bg-amber-950/40")
                    }
                  >
                    <span className="w-7 flex-shrink-0 text-center text-base font-bold text-amber-700 dark:text-amber-300">
                      {medal(i)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="truncate text-xs font-bold text-amber-950 dark:text-amber-100">
                          {a.display_name}
                        </span>
                        {mine && (
                          <span className="text-[10px] font-semibold text-orange-700 dark:text-orange-300">
                            ({t("bạn", "you")})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-amber-800/80 dark:text-amber-200/70">
                        <span className="inline-flex items-center gap-0.5 font-semibold text-orange-700 dark:text-orange-300">
                          <Flame className="w-2.5 h-2.5" /> +{a.weekly_count} {t("tuần này", "this week")}
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5" /> {a.total_count} {t("tổng", "total")}
                        </span>
                      </div>
                    </div>
                    {i === 0 && (
                      <Award className="w-4 h-4 text-amber-500 flex-shrink-0 drop-shadow" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Motivational footer */}
        <div className="mt-3 rounded-lg bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-amber-300/40 px-3 py-2">
          <p className="text-[11px] leading-snug text-amber-900 dark:text-amber-200 font-medium">
            💡 {t(
              "Mỗi tuần học đủ 20 từ mới = bạn đang đi đúng hướng Band 7.0+!",
              "20 new words a week keeps you on track for Band 7.0+!"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyVocabAchievers;
