import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reactionMap, type ReactionType } from "@/lib/yourCornerReactions";

type Reactor = { user_id: string; full_name: string | null; avatar_url: string | null; type: string };

interface Props {
  postId: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

/** Shows who reacted to a post, grouped nothing fancy - newest first. */
export default function ReactorsDialog({ postId, open, onOpenChange }: Props) {
  const [rows, setRows] = useState<Reactor[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    setLoading(true);
    (async () => {
      const { data } = await (supabase.rpc as any)("get_post_reactors", { _post_id: postId });
      if (!alive) return;
      setRows((data ?? []) as Reactor[]);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [open, postId]);

  const counts = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.type] = (acc[r.type] ?? 0) + 1;
    return acc;
  }, {});
  const list = filter ? rows.filter((r) => r.type === filter) : rows;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Ai đã thả cảm xúc ({rows.length})</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${filter === null ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            Tất cả {rows.length}
          </button>
          {Object.entries(counts).map(([type, n]) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${filter === type ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              {reactionMap.get(type as ReactionType)?.emoji ?? "👍"} {n}
            </button>
          ))}
        </div>

        <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
          {loading && <p className="text-sm text-muted-foreground">Đang tải...</p>}
          {!loading && list.length === 0 && <p className="text-sm text-muted-foreground">Chưa có ai.</p>}
          {list.map((r) => {
            const name = r.full_name?.trim() || "Học viên";
            const meta = reactionMap.get(r.type as ReactionType);
            return (
              <div key={r.user_id + r.type} className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {r.avatar_url && <AvatarImage src={r.avatar_url} alt={name} />}
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-xs">
                    {name.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm flex-1 truncate">{name}</span>
                <span className="text-base leading-none" title={meta?.label}>{meta?.emoji ?? "👍"}</span>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
