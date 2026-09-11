import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BarChart3, Check, Vote, Trophy, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import type { PollData } from "@/hooks/useYourCornerFeed";
import { stripOptionPrefix } from "@/lib/yourCornerMeta";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const chartData = useMemo(
    () =>
      poll.options.map((opt, idx) => {
        const count = localVotes[String(idx)] ?? 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        const label = opt.length > 22 ? opt.slice(0, 21) + "…" : opt;
        return { label, pct, count, isMine: localVote === idx };
      }),
    [poll.options, localVotes, total, localVote]
  );
  const topOption = useMemo(() => {
    if (total === 0) return null;
    return chartData.reduce((a, b) => (b.pct > a.pct ? b : a), chartData[0]);
  }, [chartData, total]);

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
          const hasQuiz = typeof poll.correct_index === "number";
          const isCorrect = hasQuiz && poll.correct_index === idx;
          const revealCorrect = hasVoted && hasQuiz && isCorrect;
          const revealWrongPick = hasVoted && hasQuiz && isMine && !isCorrect;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => vote(idx)}
              disabled={pending !== null || (hasVoted && !allowChange)}
              className={`relative w-full text-left rounded-lg border overflow-hidden transition group ${
                revealCorrect
                  ? "border-emerald-500 bg-emerald-500/15 ring-1 ring-emerald-500/40"
                  : revealWrongPick
                    ? "border-red-500 bg-red-500/10"
                    : isMine
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
                {revealCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : revealWrongPick ? (
                  <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                ) : isMine ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : null}
                <span className="flex-1 break-words">
                  <span className="font-semibold mr-1">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </span>
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

      {hasVoted && typeof poll.correct_index === "number" && (
        <div
          className={`rounded-lg border p-3 text-sm space-y-1 animate-in fade-in slide-in-from-bottom-1 ${
            localVote === poll.correct_index
              ? "border-emerald-500/40 bg-emerald-500/10"
              : "border-amber-500/40 bg-amber-500/10"
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold">
            {localVote === poll.correct_index ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 dark:text-emerald-400">Chính xác!</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-amber-700 dark:text-amber-400">
                  Chưa đúng - Đáp án: {String.fromCharCode(65 + poll.correct_index)}. {poll.options[poll.correct_index]}
                </span>
              </>
            )}
          </div>
          {poll.explanation && (
            <div className="flex items-start gap-1.5 text-foreground/85 leading-relaxed">
              <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>{poll.explanation}</span>
            </div>
          )}
        </div>
      )}


      {hasVoted && (
        <div className="rounded-lg border border-border/60 bg-background/80 p-3 space-y-2 animate-in fade-in slide-in-from-bottom-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
            <BarChart3 className="w-3.5 h-3.5" /> Kết quả trực quan
            {topOption && total > 0 && (
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 normal-case tracking-normal">
                <Trophy className="w-3 h-3" /> Dẫn đầu: {topOption.label} ({topOption.pct}%)
              </span>
            )}
          </div>
          <div className="w-full" style={{ height: Math.max(120, poll.options.length * 36) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 36, bottom: 4, left: 8 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={110}
                  tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
                  contentStyle={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v: number, _n, p: any) => [`${v}% (${p.payload.count} phiếu)`, "Tỉ lệ"]}
                />
                <Bar dataKey="pct" radius={[4, 4, 4, 4]} barSize={18}>
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={d.isMine ? "#10b981" : "hsl(var(--primary))"} fillOpacity={d.isMine ? 1 : 0.75} />
                  ))}
                  <LabelList
                    dataKey="pct"
                    position="right"
                    formatter={(v: number) => `${v}%`}
                    style={{ fontSize: 11, fontWeight: 600, fill: "hsl(var(--foreground))" }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <BarChart3 className="w-3 h-3" />
        {total} lượt bình chọn
        {hasVoted && allowChange && <span>· Bạn có thể đổi đáp án</span>}
      </div>

    </div>
  );
}
