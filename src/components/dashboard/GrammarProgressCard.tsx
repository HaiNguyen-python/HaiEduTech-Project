import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { GrammarProgressSnapshot } from "@/lib/grammarProgress";

interface GrammarProgressCardProps {
  snapshot: GrammarProgressSnapshot;
  isVi: boolean;
}

const GrammarProgressCard = ({ snapshot, isVi }: GrammarProgressCardProps) => {
  const practicedPct = snapshot.totalLessons
    ? Math.round((snapshot.practicedLessons / snapshot.totalLessons) * 100)
    : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {isVi ? "Grammar Progress" : "Grammar Progress"}
          </p>
          <h3 className="text-lg font-bold text-foreground">
            {isVi ? "Theo dõi quy tắc đã luyện" : "Track the grammar rules you’ve practiced"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {isVi
              ? "Xem bài đã luyện, độ chính xác theo từng bài và gợi ý học tiếp."
              : "See practiced lessons, per-lesson accuracy, and your clearest next step."}
          </p>
        </div>
        <div className="rounded-xl bg-primary/10 px-3 py-2 text-right">
          <div className="text-xs text-muted-foreground">{isVi ? "Độ chính xác TB" : "Avg accuracy"}</div>
          <div className="text-lg font-bold text-foreground">{snapshot.averageAccuracy}%</div>
        </div>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-secondary p-4">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium text-foreground">
            <BookOpen className="h-4 w-4 text-primary" />
            {isVi ? "Bài đã luyện" : "Lessons practiced"}
          </div>
          <div className="text-2xl font-bold text-foreground">
            {snapshot.practicedLessons}/{snapshot.totalLessons}
          </div>
        </div>

        <div className="rounded-xl bg-secondary p-4">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium text-foreground">
            <Target className="h-4 w-4 text-primary" />
            {isVi ? "Module đã chạm" : "Modules covered"}
          </div>
          <div className="text-2xl font-bold text-foreground">{snapshot.practicedModules}</div>
        </div>

        <div className="rounded-xl bg-secondary p-4">
          <div className="mb-2 text-sm font-medium text-foreground">
            {isVi ? "Tiến độ tổng" : "Overall progress"}
          </div>
          <Progress value={practicedPct} className="h-2" />
          <div className="mt-2 text-xs text-muted-foreground">{practicedPct}%</div>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-border bg-secondary/40 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          {isVi ? "Bài nên học tiếp" : "Next recommended lesson"}
        </div>
        {snapshot.nextRecommendation ? (
          <>
            <p className="text-base font-semibold text-foreground">{snapshot.nextRecommendation.lessonTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">{snapshot.nextRecommendation.moduleTitle}</p>
            <p className="mt-2 text-sm text-foreground">
              {isVi ? snapshot.nextRecommendation.reasonVi : snapshot.nextRecommendation.reason}
            </p>
            <Link
              to={snapshot.nextRecommendation.href}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2"
            >
              {isVi ? "Mở bài học" : "Open lesson"} <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            {isVi ? "Chưa có dữ liệu để gợi ý bài tiếp theo." : "No recommendation yet."}
          </p>
        )}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h4 className="text-sm font-semibold text-foreground">
            {isVi ? "Độ chính xác theo bài" : "Accuracy by lesson"}
          </h4>
          <Link to="/english/grammar" className="text-xs font-semibold text-primary hover:underline">
            {isVi ? "Xem toàn bộ grammar" : "View all grammar"}
          </Link>
        </div>

        {snapshot.perLesson.length > 0 ? (
          <div className="space-y-3">
            {snapshot.perLesson.slice(0, 5).map((lesson) => (
              <Link
                key={lesson.lessonId}
                to={lesson.href}
                className="block rounded-xl border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{lesson.lessonTitle}</p>
                    <p className="text-xs text-muted-foreground">{lesson.moduleTitle}</p>
                  </div>
                  <div className="shrink-0 text-right text-sm font-bold text-foreground">{lesson.accuracy}%</div>
                </div>
                <Progress value={lesson.accuracy} className="h-2" />
                <div className="mt-2 text-xs text-muted-foreground">
                  {isVi ? `${lesson.attempts} lần luyện` : `${lesson.attempts} attempt${lesson.attempts > 1 ? "s" : ""}`}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
            {isVi
              ? "Làm quiz ở các bài Grammar để hệ thống bắt đầu theo dõi tiến độ chi tiết."
              : "Complete grammar quizzes to start tracking detailed lesson accuracy."}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarProgressCard;