/**
 * @file ModuleProgressBar.tsx
 * @description Shows % complete + Python Certified badge per module.
 */
import { Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Props {
  completed: number;
  total: number;
  moduleEmoji: string;
  moduleTitle: string;
  certified?: boolean;
}

const ModuleProgressBar = ({ completed, total, moduleEmoji, moduleTitle, certified }: Props) => {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground flex items-center gap-1">
          <span>{moduleEmoji}</span>
          <span className="truncate">{moduleTitle}</span>
        </span>
        <span className={cn("font-mono shrink-0 ml-2", certified ? "text-emerald-600 font-bold" : "text-muted-foreground")}>
          {completed}/{total}
          {certified && <Award className="inline w-3.5 h-3.5 ml-1 -mt-0.5" />}
        </span>
      </div>
      <Progress value={pct} className="h-2" />
    </div>
  );
};

export default ModuleProgressBar;
