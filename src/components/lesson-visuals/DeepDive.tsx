// Always-expanded callout block (previously a collapsible "Deep Dive" accordion).
// Content is shown immediately so learners see the full lesson without extra clicks.
import { ReactNode } from "react";
import { BookOpen } from "lucide-react";

interface DeepDiveProps {
  title: string;
  children: ReactNode;
  /** kept for backwards compat; ignored — content is always open now */
  defaultOpen?: boolean;
}

const DeepDive = ({ title, children }: DeepDiveProps) => {
  return (
    <div className="not-prose my-5 rounded-xl border border-violet-500/30 bg-violet-500/5 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-violet-500/20 bg-violet-500/10">
        <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
          <BookOpen className="w-4 h-4 text-violet-700 dark:text-violet-300" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">
            In-Depth
          </div>
          <div className="text-sm font-semibold text-foreground">{title}</div>
        </div>
      </div>
      <div className="px-4 py-4 text-sm leading-relaxed [&>p:first-child]:mt-0">
        {children}
      </div>
    </div>
  );
};

export default DeepDive;
