import { ReactNode } from "react";
import { Lightbulb, AlertTriangle, Info, Quote } from "lucide-react";

type Variant = "tip" | "warning" | "note" | "quote";

interface CalloutProps {
  variant: Variant;
  children: ReactNode;
}

const config: Record<Variant, { Icon: typeof Lightbulb; cls: string; label: string }> = {
  tip: {
    Icon: Lightbulb,
    cls: "border-l-amber-400 bg-amber-50/70 dark:bg-amber-500/10 text-amber-900 dark:text-amber-100",
    label: "Mẹo",
  },
  warning: {
    Icon: AlertTriangle,
    cls: "border-l-red-500 bg-red-50/70 dark:bg-red-500/10 text-red-900 dark:text-red-100",
    label: "Cảnh báo",
  },
  note: {
    Icon: Info,
    cls: "border-l-sky-500 bg-sky-50/70 dark:bg-sky-500/10 text-sky-900 dark:text-sky-100",
    label: "Lưu ý",
  },
  quote: {
    Icon: Quote,
    cls: "border-l-violet-500 bg-violet-50/70 dark:bg-violet-500/10 text-violet-900 dark:text-violet-100",
    label: "Ghi chú",
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
