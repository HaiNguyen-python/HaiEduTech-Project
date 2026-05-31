/**
 * @file AICodeReviewer.tsx
 * @description Inline AI review panel - score 0-100, issues, suggestions, refactored code.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import { Sparkles, Loader2, AlertTriangle, Info, XCircle, Lightbulb, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ReviewIssue {
  severity: "info" | "warning" | "error";
  line?: number;
  message: string;
}

interface ReviewResult {
  score: number;
  summary: string;
  issues: ReviewIssue[];
  suggestions: string[];
  refactored?: string;
}

interface Props {
  code: string;
  lessonContext?: string;
  onApplyRefactor?: (code: string) => void;
}

const severityStyles: Record<ReviewIssue["severity"], string> = {
  info: "text-sky-500 bg-sky-500/10 border-sky-500/30",
  warning: "text-amber-500 bg-amber-500/10 border-amber-500/30",
  error: "text-rose-500 bg-rose-500/10 border-rose-500/30",
};

const SeverityIcon = ({ s }: { s: ReviewIssue["severity"] }) => {
  if (s === "error") return <XCircle className="w-4 h-4" />;
  if (s === "warning") return <AlertTriangle className="w-4 h-4" />;
  return <Info className="w-4 h-4" />;
};

const RATE_LIMIT_KEY = "ai-code-reviewer-uses-v1";
const MAX_PER_HOUR = 20;

function recordUse(): boolean {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const arr: number[] = raw ? JSON.parse(raw) : [];
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const recent = arr.filter((t) => t > oneHourAgo);
    if (recent.length >= MAX_PER_HOUR) return false;
    recent.push(Date.now());
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
    return true;
  } catch {
    return true;
  }
}

const AICodeReviewer = ({ code, lessonContext, onApplyRefactor }: Props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem("ai-code-reviewer-total") || "0", 10);
    } catch {
      return 0;
    }
  });

  const runReview = async () => {
    if (!code.trim()) {
      toast({ title: "Empty code", description: "Viết code trước khi review nhé.", variant: "destructive" });
      return;
    }
    if (!recordUse()) {
      toast({ title: "Rate limit", description: "Tối đa 20 lượt review/giờ - thử lại sau.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("review-python-code", {
        body: { code, lessonContext },
      });
      if (error) throw error;
      const d = data as ReviewResult & { error?: string };
      if (d.error) throw new Error(d.error);
      setResult(d);
      const newCount = reviewCount + 1;
      setReviewCount(newCount);
      try {
        localStorage.setItem("ai-code-reviewer-total", String(newCount));
      } catch { /* noop */ }
      if (newCount === 5) {
        toast({
          title: "🏆 Huy hiệu: Code Reviewer",
          description: "Bạn đã review 5 đoạn code - Mr. Hai tự hào!",
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to review";
      toast({ title: "AI Review failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const scoreColor =
    !result ? "text-muted-foreground"
    : result.score >= 90 ? "text-emerald-500"
    : result.score >= 70 ? "text-sky-500"
    : result.score >= 50 ? "text-amber-500"
    : "text-rose-500";

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/40 border-b border-border">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="w-4 h-4 text-fuchsia-500" />
          AI Code Reviewer
          {reviewCount >= 5 && (
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600">
              <Award className="w-3 h-3" /> Code Reviewer
            </span>
          )}
        </div>
        <Button
          size="sm"
          onClick={runReview}
          disabled={loading}
          className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
          {loading ? "Reviewing…" : "Review Code"}
        </Button>
      </div>

      {!result && !loading && (
        <div className="p-5 text-sm text-muted-foreground text-center">
          Nhấn <b>Review Code</b> để Mr. Hai chấm điểm 0-100, chỉ ra lỗi, và đề xuất cải thiện.
        </div>
      )}

      {loading && (
        <div className="p-8 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin text-fuchsia-500" />
          <span>Đang phân tích code...</span>
        </div>
      )}

      {result && (
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border">
            <div className="text-center">
              <div className={cn("text-4xl font-bold", scoreColor)}>{result.score}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</div>
            </div>
            <div className="flex-1 text-sm text-foreground">{result.summary}</div>
          </div>

          {result.issues.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">
                Issues ({result.issues.length})
              </h4>
              <div className="space-y-2">
                {result.issues.map((iss, i) => (
                  <div
                    key={i}
                    className={cn("flex items-start gap-2 p-3 rounded-lg border text-sm", severityStyles[iss.severity])}
                  >
                    <SeverityIcon s={iss.severity} />
                    <div className="flex-1">
                      {iss.line && <span className="font-mono text-[10px] mr-1 opacity-70">L{iss.line}</span>}
                      <span className="text-foreground">{iss.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.suggestions.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" /> Suggestions
              </h4>
              <ul className="space-y-1.5">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-foreground flex gap-2">
                    <span className="text-fuchsia-500 shrink-0">→</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.refactored && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Refactored</h4>
                {onApplyRefactor && (
                  <Button size="sm" variant="outline" onClick={() => onApplyRefactor(result.refactored!)}>
                    Apply
                  </Button>
                )}
              </div>
              <pre className="text-xs p-3 rounded-lg bg-[#282a36] text-[#f8f8f2] overflow-x-auto font-mono whitespace-pre-wrap">
                {result.refactored}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AICodeReviewer;
