import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type StreakUser = { display_name: string; streak_days: number; user_id: string; avatar_url?: string | null };

export default function StoryBar() {
  const [users, setUsers] = useState<StreakUser[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("get_streak_leaderboard");
      const list = ((data as StreakUser[] | null) ?? []).filter((u) => u.streak_days > 0).slice(0, 10);
      if (list.length === 0) {
        setUsers([]);
        return;
      }
      const ids = list.map((u) => u.user_id);
      const { data: profs } = await supabase.rpc("get_public_profiles", { _ids: ids });
      const map = new Map<string, string | null>();
      (profs ?? []).forEach((p: any) => map.set(p.id, p.avatar_url));
      setUsers(list.map((u) => ({ ...u, avatar_url: map.get(u.user_id) ?? null })));
    })();
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
          const shortName = (u.display_name || "Học viên").split(/\s+/).slice(-1)[0];
          return (
            <div key={u.user_id} className="flex flex-col items-center gap-1 flex-shrink-0 w-16">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 p-0.5 animate-pulse">
                  <Avatar className="w-full h-full border-2 border-background">
                    {u.avatar_url && <AvatarImage src={u.avatar_url} alt={u.display_name} />}
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-sm font-bold">
                      {init}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
                  {u.streak_days}d
                </span>
              </div>
              <p className="text-[11px] text-center text-muted-foreground truncate w-full" title={u.display_name}>
                {shortName}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
