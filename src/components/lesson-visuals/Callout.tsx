import { ReactNode } from "react";
import { Lightbulb, AlertTriangle, Info, Quote, CheckCircle2 } from "lucide-react";

// Adds 'success' (green) variant for optimization tips per 2026 design spec
type Variant = "tip" | "warning" | "note" | "quote" | "info" | "success";

interface CalloutProps {
  variant: Variant;
  children: ReactNode;
}

const config: Record<Variant, { Icon: typeof Lightbulb; cls: string; label: string }> = {
  tip: {
    Icon: Lightbulb,
    cls: "border-l-amber-400 bg-amber-50/70 dark:bg-amber-500/10 text-amber-900 dark:text-amber-100",
    label: "Tip",
  },
  warning: {
    Icon: AlertTriangle,
    cls: "border-l-red-500 bg-red-50/70 dark:bg-red-500/10 text-red-900 dark:text-red-100",
    label: "Warning",
  },
  note: {
    Icon: Info,
    cls: "border-l-sky-500 bg-sky-50/70 dark:bg-sky-500/10 text-sky-900 dark:text-sky-100",
    label: "Note",
  },
  info: {
    Icon: Info,
    cls: "border-l-blue-500 bg-blue-50/70 dark:bg-blue-500/10 text-blue-900 dark:text-blue-100",
    label: "Info",
  },
  success: {
    Icon: CheckCircle2,
    cls: "border-l-emerald-500 bg-emerald-50/70 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
    label: "Optimization",
  },
  quote: {
    Icon: Quote,
    cls: "border-l-violet-500 bg-violet-50/70 dark:bg-violet-500/10 text-violet-900 dark:text-violet-100",
    label: "Note",
  },
};

const Callout = ({ variant, children }: CalloutProps) => {
  const { Icon, cls, label } = config[variant];
  return (
    <div className={`not-prose theory-callout my-4 rounded-r-lg border-l-4 ${cls} px-4 py-3 flex gap-3`}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold uppercase tracking-wide opacity-80 mb-1">{label}</div>
        <div className="text-sm leading-relaxed [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Callout;
