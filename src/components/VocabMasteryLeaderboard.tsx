import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal, Star, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { MASTERY_UPDATED_EVENT } from "@/hooks/useMasteredVocab";
import { dedupeByDisplayName } from "@/lib/leaderboardDedup";

interface LeaderboardEntry {
  user_id: string;
  score: number;
  display_name: string;
}

interface VocabMasteryLeaderboardProps {
  subject: string;
  currentCount: number;
  label?: string;
}

/**
 * @deprecated Kept for backward compatibility. `useMasteredVocab` now syncs the
 * full word set to the database, so leaderboard counts are derived server-side.
 * Calls become no-ops.
 */
export async function syncMasteredCount(_subject: string, _count: number) {
  /* no-op */
}

// Hard timeout so a hung network call never leaves the UI stuck on "Loading..."
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    Promise.resolve(p).then(
      (v) => { clearTimeout(t); resolve(v); },
      (e) => { clearTimeout(t); reject(e); },
    );
  });
}

const VocabMasteryLeaderboard = ({ subject, currentCount, label }: VocabMasteryLeaderboardProps) => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const mountedRef = useRef(true);

  const fetchLeaderboard = useCallback(async () => {
    setError(false);
    let attempt = 0;
    while (attempt < 3) {
      attempt++;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!mountedRef.current) return;
        setCurrentUserId(user?.id || null);
        const { data, error: rpcError } = await withTimeout<any>(
          (supabase as any).rpc("get_mastery_leaderboard", { _subject: subject }),
          7000 + attempt * 3000,
        );
        if (rpcError) throw rpcError;
        if (!mountedRef.current) return;
        const merged = (data || []).map((row: any) => ({
          user_id: row.user_id,
          score: Number(row.score) || 0,
          display_name: row.display_name || t("Học viên", "Student"),
        })) as LeaderboardEntry[];
        setEntries(dedupeByDisplayName(merged));
        setLoading(false);
        return;
      } catch (e) {
        if (attempt >= 3) {
          console.error("Failed to fetch mastery leaderboard:", e);
          if (!mountedRef.current) return;
          setError(true);
          setLoading(false);
          return;
        }
        await new Promise((r) => setTimeout(r, 600 * attempt));
      }
    }
  }, [subject, t]);

  useEffect(() => {
    mountedRef.current = true;
    fetchLeaderboard();

    let timer: number | undefined;
    const onLocal = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.subject && detail.subject !== subject) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(fetchLeaderboard, 350);
    };
    window.addEventListener(MASTERY_UPDATED_EVENT, onLocal);

    const channel = supabase
      .channel(`mastery-lb-${subject}`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "user_vocab_mastered",
        filter: `subject=eq.${subject}`,
      }, () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(fetchLeaderboard, 350);
      })
      .subscribe();

    return () => {
      mountedRef.current = false;
      window.removeEventListener(MASTERY_UPDATED_EVENT, onLocal);
      window.clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, [subject, fetchLeaderboard]);

  const rankIcons = [
    <Crown key="1" className="w-4 h-4 text-amber-400" />,
    <Medal key="2" className="w-4 h-4 text-gray-400" />,
    <Medal key="3" className="w-4 h-4 text-amber-700" />,
  ];

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4">
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
          <RefreshCw className="w-4 h-4 animate-spin" />
          {t("Đang tải bảng xếp hạng...", "Loading leaderboard...")}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4 text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          {t("Không tải được bảng xếp hạng.", "Couldn't load the leaderboard.")}
        </p>
        <button
          onClick={() => { setLoading(true); fetchLeaderboard(); }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <RefreshCw className="w-3 h-3" /> {t("Thử lại", "Retry")}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
      <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-amber-400" />
        {label || t("BXH Từ vựng đã thuộc", "Mastered Words Ranking")}
      </h3>

      {entries.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">
          {t("Chưa có ai. Hãy là người đầu tiên!", "No one yet. Be the first!")}
        </p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1">
          {entries.map((entry, i) => {
            const isCurrentUser = entry.user_id === currentUserId;
            return (
              <motion.div
                key={entry.user_id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(i, 10) * 0.03 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                  isCurrentUser
                    ? "bg-primary/10 border border-primary/30 ring-1 ring-primary/20"
                    : i === 0
                    ? "bg-amber-500/10 border border-amber-500/30"
                    : "bg-card/50 border border-border/50"
                }`}
              >
                <span className="w-5 flex-shrink-0">
                  {i < 3 ? rankIcons[i] : <span className="text-muted-foreground font-mono">#{i + 1}</span>}
                </span>
                <span className="flex-1 truncate font-medium text-foreground">
                  {entry.display_name}
                  {isCurrentUser && <span className="ml-1 text-primary">(you)</span>}
                </span>
                <span className="font-bold text-primary flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {entry.score}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      {currentCount > 0 && (
        <div className="mt-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs">
          <span className="text-primary font-bold">
            {t("Bạn đã thuộc", "You mastered")}: {currentCount} {t("từ", "words")}
          </span>
        </div>
      )}
    </div>
  );
};

export default VocabMasteryLeaderboard;
