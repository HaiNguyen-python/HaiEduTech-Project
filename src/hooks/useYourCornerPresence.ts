import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type OnlineUser = {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  online_at: string;
};

/**
 * Subscribes to a shared Supabase Realtime presence channel so we can show
 * who is currently studying on Your Corner and route DMs to them.
 */
export function useYourCornerPresence(
  userId: string | null,
  meta: { full_name: string | null; avatar_url: string | null }
) {
  const [online, setOnline] = useState<OnlineUser[]>([]);

  useEffect(() => {
    if (!userId) return;
    const channel = supabase.channel("your-corner-presence", {
      config: { presence: { key: userId } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState() as Record<string, OnlineUser[]>;
        const flat: OnlineUser[] = [];
        const seen = new Set<string>();
        Object.entries(state).forEach(([key, metas]) => {
          const m = metas[0];
          if (!m || seen.has(key)) return;
          seen.add(key);
          flat.push({
            user_id: key,
            full_name: m.full_name ?? null,
            avatar_url: m.avatar_url ?? null,
            online_at: m.online_at ?? new Date().toISOString(),
          });
        });
        setOnline(flat);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            user_id: userId,
            full_name: meta.full_name,
            avatar_url: meta.avatar_url,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, meta.full_name, meta.avatar_url]);

  return online;
}
