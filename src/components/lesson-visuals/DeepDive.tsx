// Collapsible "Deep Dive" accordion for advanced theory snippets
import { useState, ReactNode } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

interface DeepDiveProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const DeepDive = ({ title, children, defaultOpen = false }: DeepDiveProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="not-prose my-5 rounded-xl border border-violet-500/30 bg-violet-500/5 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-violet-500/10 transition-colors"
        aria-expanded={open}
      >
        <span className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">
            Deep Dive
          </div>
          <div className="text-sm font-semibold text-foreground truncate">{title}</div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-violet-600 dark:text-violet-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 text-sm leading-relaxed [&>p:first-child]:mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default DeepDive;
