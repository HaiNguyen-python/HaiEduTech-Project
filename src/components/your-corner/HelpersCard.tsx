import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeartHandshake } from "lucide-react";

type Helper = {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  helpful_count: number;
  heart_count: number;
  score: number;
};

const MEDALS = ["🥇", "🥈", "🥉"];

/** Weekly top helpers: answers marked helpful (x5) plus hearts on their comments. */
export default function HelpersCard() {
  const [rows, setRows] = useState<Helper[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await (supabase.rpc as any)("get_your_corner_helpers");
      if (alive) setRows((data ?? []) as Helper[]);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (rows.length === 0) return null;

  return (
    <Card className="p-5 backdrop-blur-md bg-white/80 dark:bg-card/80 border-primary/10 shadow-sm space-y-3">
      <h3 className="font-bold text-sm flex items-center gap-2">
        <HeartHandshake className="w-4 h-4 text-emerald-500" /> Người giúp đỡ tuần này
      </h3>
      <div className="space-y-2">
        {rows.map((h, i) => {
          const name = h.full_name?.trim() || "Học viên";
          return (
            <div key={h.user_id} className="flex items-center gap-2">
              <span className="w-5 text-center text-sm">{MEDALS[i] ?? i + 1}</span>
              <Avatar className="h-7 w-7">
                {h.avatar_url && <AvatarImage src={h.avatar_url} alt={name} />}
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-[10px]">
                  {name.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm flex-1 truncate">{name}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                ✅ {h.helpful_count} · ❤️ {h.heart_count}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-muted-foreground">
        Trả lời câu hỏi ngôn ngữ của bạn học và được đánh dấu "Hữu ích" để lên bảng này.
      </p>
    </Card>
  );
}
