import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";

type StreakUser = { display_name: string; streak_days: number; user_id: string };

export default function StoryBar() {
  const [users, setUsers] = useState<StreakUser[]>([]);

  useEffect(() => {
    supabase.rpc("get_streak_leaderboard").then(({ data }) => {
      const list = (data as StreakUser[] | null) ?? [];
      setUsers(list.filter((u) => u.streak_days > 0).slice(0, 10));
    });
  }, []);

  if (users.length === 0) return null;

  return (
    <Card className="p-4 backdrop-blur-md bg-white/80 dark:bg-card/80 border-primary/10 shadow-sm">
      <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
        <Flame className="w-3.5 h-3.5 text-orange-500" /> Học viên đang giữ streak 🔥
      </p>
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
        {users.map((u) => {
          const init = (u.display_name || "?").split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";
          return (
            <div key={u.user_id} className="flex flex-col items-center gap-1 flex-shrink-0 w-16">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 p-0.5 animate-pulse">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-sm font-bold text-foreground">
                    {init}
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
                  {u.streak_days}d
                </span>
              </div>
              <p className="text-[11px] text-center text-muted-foreground truncate w-full">{u.display_name.split(/\s+/).slice(-1)[0]}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
