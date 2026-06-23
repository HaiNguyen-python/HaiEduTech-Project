import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BarChart3, Check, Vote, Trophy } from "lucide-react";
import type { PollData } from "@/hooks/useYourCornerFeed";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";


interface Props {
  postId: string;
  userId: string;
  poll: PollData;
  votes: Record<string, number> | null;
  myVote: number | null;
  onChanged: () => void;
}

export default function PollBlock({ postId, userId, poll, votes, myVote, onChanged }: Props) {
  const [pending, setPending] = useState<number | null>(null);
  const [localVote, setLocalVote] = useState<number | null>(myVote);
  const [localVotes, setLocalVotes] = useState<Record<string, number>>(votes ?? {});

  const total = useMemo(
    () => Object.values(localVotes).reduce((s, n) => s + (n || 0), 0),
    [localVotes]
  );
  const allowChange = poll.allow_change ?? true;
  const hasVoted = localVote !== null && localVote !== undefined;

  const vote = async (idx: number) => {
    if (pending !== null) return;
    if (hasVoted && !allowChange) return;
    setPending(idx);

    // Optimistic
    const prev = localVote;
    const next = { ...localVotes };
    if (prev !== null && prev !== undefined) {
      next[prev] = Math.max((next[prev] ?? 0) - 1, 0);
    }
    next[idx] = (next[idx] ?? 0) + 1;
    setLocalVotes(next);
    setLocalVote(idx);

    const { error } = await supabase
      .from("your_corner_poll_votes")
      .upsert(
        { post_id: postId, user_id: userId, option_index: idx },
        { onConflict: "post_id,user_id" }
      );
    setPending(null);
    if (error) {
      toast.error("Không gửi được phiếu");
      setLocalVotes(votes ?? {});
      setLocalVote(myVote);
      return;
    }
    onChanged();
  };

  return (
    <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-blue-50/60 to-emerald-50/60 dark:from-blue-950/30 dark:to-emerald-950/30 p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <Vote className="w-3.5 h-3.5" /> Câu hỏi ôn tập
        {poll.subject && (
          <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10">
            {poll.subject}
          </span>
        )}
      </div>
      <p className="font-semibold text-base leading-snug">{poll.question}</p>
      <div className="space-y-1.5">
        {poll.options.map((opt, idx) => {
          const count = localVotes[String(idx)] ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const isMine = localVote === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => vote(idx)}
              disabled={pending !== null || (hasVoted && !allowChange)}
              className={`relative w-full text-left rounded-lg border overflow-hidden transition group ${
                isMine
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-border bg-background/60 hover:border-primary/40"
              } ${hasVoted && !allowChange ? "cursor-default" : "cursor-pointer"} disabled:opacity-80`}
            >
              {hasVoted && (
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                  aria-hidden
                />
              )}
              <div className="relative flex items-center gap-2 px-3 py-2 text-sm">
                {isMine && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                <span className="flex-1 break-words">{opt}</span>
                {hasVoted && (
                  <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                    {pct}% · {count}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <BarChart3 className="w-3 h-3" />
        {total} lượt bình chọn
        {hasVoted && allowChange && <span>· Bạn có thể đổi đáp án</span>}
      </div>
    </div>
  );
}
