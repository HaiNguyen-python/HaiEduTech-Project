// Overall Vocabulary Leaderboard — aggregates all subjects (IELTS, HSK, SAT, TOEIC)
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { MASTERY_UPDATED_EVENT } from "@/hooks/useMasteredVocab";

interface Entry {
  user_id: string;
  score: number;
  display_name: string;
  subjects: string[];
}

const SUBJECT_LABEL: Record<string, string> = {
  ielts: "IELTS",
  hsk: "HSK",
  sat: "SAT",
  toeic: "TOEIC",
};

const OverallVocabLeaderboard = ({ label }: { label?: string }) => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
      const { data, error } = await (supabase as any).rpc("get_overall_vocab_leaderboard");
      if (error) throw error;
      setEntries(
        (data || []).map((r: any) => ({
          user_id: r.user_id,
          score: Number(r.score) || 0,
          display_name: r.display_name || t("Học viên", "Student"),
          subjects: Array.isArray(r.subjects) ? r.subjects : [],
        })),
      );
    } catch (e) {
      console.error("Failed to fetch overall leaderboard:", e);
    }
    setLoading(false);
  }, [t]);

  useEffect(() => {
    fetchData();
    let timer: number | undefined;
    const onLocal = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(fetchData, 400);
    };
    window.addEventListener(MASTERY_UPDATED_EVENT, onLocal);
    const ch = supabase
      .channel("overall-vocab-lb")
      .on("postgres_changes", { event: "*", schema: "public", table: "user_vocab_mastered" }, onLocal)
      .subscribe();
    return () => {
      window.removeEventListener(MASTERY_UPDATED_EVENT, onLocal);
      window.clearTimeout(timer);
      supabase.removeChannel(ch);
    };
  }, [fetchData]);

  const rankIcons = [
    <Crown key="1" className="w-4 h-4 text-amber-400" />,
    <Medal key="2" className="w-4 h-4 text-gray-400" />,
    <Medal key="3" className="w-4 h-4 text-amber-700" />,
  ];

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
      <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-amber-400" />
        {label || t("BXH Tổng từ vựng (tất cả hệ thống)", "Overall Vocabulary Ranking (all subjects)")}
      </h3>
      {loading ? (
        <p className="text-xs text-muted-foreground text-center py-4">{t("Đang tải...", "Loading...")}</p>
      ) : entries.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">
          {t("Chưa có ai. Hãy là người đầu tiên!", "No one yet. Be the first!")}
        </p>
      ) : (
        <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
          {entries.map((entry, i) => {
            const isMe = entry.user_id === currentUserId;
            return (
              <motion.div
                key={entry.user_id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(i, 10) * 0.03 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                  isMe
                    ? "bg-primary/10 border border-primary/30 ring-1 ring-primary/20"
                    : i === 0
                    ? "bg-amber-500/10 border border-amber-500/30"
                    : "bg-card/50 border border-border/50"
                }`}
              >
                <span className="w-5 flex-shrink-0">
                  {i < 3 ? rankIcons[i] : <span className="text-muted-foreground font-mono">#{i + 1}</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium text-foreground">
                    {entry.display_name}
                    {isMe && <span className="ml-1 text-primary">(you)</span>}
                  </div>
                  {entry.subjects.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {entry.subjects.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold">
                          {SUBJECT_LABEL[s] || s.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="font-bold text-primary flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {entry.score}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OverallVocabLeaderboard;
