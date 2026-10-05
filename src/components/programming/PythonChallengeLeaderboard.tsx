import { useEffect, useState } from "react";
import { Crown, Medal, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

interface LeaderboardRow {
  user_id: string;
  display_name: string;
  completed_count: number;
  is_current_user: boolean;
}

interface PythonChallengeLeaderboardProps {
  refreshKey: number;
}

interface PythonLeaderboardRpcClient {
  rpc(
    name: "get_python_challenge_leaderboard",
    args: { _limit: number },
  ): PromiseLike<{ data: LeaderboardRow[] | null; error: { message: string } | null }>;
}

const rankIcon = (index: number) => {
  if (index === 0) return <Crown className="h-4 w-4 text-accent" aria-hidden="true" />;
  if (index < 3) return <Medal className={index === 1 ? "h-4 w-4 text-muted-foreground" : "h-4 w-4 text-accent"} aria-hidden="true" />;
  return <span className="text-xs font-bold tabular-nums text-muted-foreground">#{index + 1}</span>;
};

const PythonChallengeLeaderboard = ({ refreshKey }: PythonChallengeLeaderboardProps) => {
  const { t } = useLanguage();
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        const rpcClient = supabase as unknown as PythonLeaderboardRpcClient;
        const { data, error } = await rpcClient.rpc("get_python_challenge_leaderboard", { _limit: 10 });
        if (!active) return;
        setFailed(Boolean(error));
        if (!error) setRows(data ?? []);
      } catch { if (active) setFailed(true); }
      finally { if (active) setLoading(false); }
    };

    void load();
    return () => {
      active = false;
    };
  }, [refreshKey, retry]);

  return (
    <aside className="rounded-lg border border-border bg-card p-4 shadow-sm" aria-label={t("Bảng xếp hạng Python", "Python leaderboard")}>
      <div className="mb-1 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
          <Trophy className="h-4 w-4 text-accent" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-bold text-foreground">{t("Top thử thách", "Challenge leaders")}</h2>
          <p className="text-xs text-muted-foreground">{t("Số bài đã hoàn thành", "Challenges completed")}</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2 pt-4" aria-label={t("Đang tải", "Loading")}>
          {[0, 1, 2, 3].map((item) => <div key={item} className="h-10 animate-pulse rounded-lg bg-muted" />)}
        </div>
      ) : failed ? (
        <div className="py-4 text-center"><p className="mb-2 text-sm text-muted-foreground" role="status">{t("Chưa tải được bảng xếp hạng.", "Leaderboard unavailable.")}</p><Button variant="outline" size="sm" onClick={() => setRetry(r => r + 1)}>{t("Thử lại", "Try again")}</Button></div>
      ) : rows.length === 0 ? (
        <p className="py-6 text-center text-xs leading-relaxed text-muted-foreground">
          {t("Hãy hoàn thành challenge đầu tiên để xuất hiện tại đây!", "Complete the first challenge to join the leaderboard!")}
        </p>
      ) : (
        <ol className="mt-4 space-y-1.5">
          {rows.map((row, index) => (
            <li
              key={row.user_id}
              className={`flex min-h-11 items-center gap-2 rounded-lg border px-2.5 py-2 ${
                row.is_current_user
                  ? "border-primary/40 bg-primary/10"
                  : index === 0
                    ? "border-accent/50 bg-accent/10"
                    : "border-transparent bg-muted/55"
              }`}
            >
              <span className="flex w-6 shrink-0 justify-center">{rankIcon(index)}</span>
              <span className="min-w-0 flex-1 truncate text-xs font-semibold text-foreground" title={row.display_name}>
                {row.display_name}
                {row.is_current_user && <span className="ml-1 font-normal text-primary">({t("Bạn", "You")})</span>}
              </span>
              <span className="shrink-0 rounded-md bg-background px-2 py-1 text-xs font-bold tabular-nums text-primary">
                {row.completed_count}
              </span>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
};

export default PythonChallengeLeaderboard;