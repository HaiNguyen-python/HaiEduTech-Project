import { Children, cloneElement, isValidElement, ReactNode } from "react";
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

const PREFIX_PATTERN = /^\s*(?:💡|⚠️|🚨|📝|ℹ️|🔵|✅|🟢)?\s*(?:pro\s+tip|tip|warning|note|info|optimization)\s*:\s*/i;

function removeRepeatedPrefix(node: ReactNode, state = { cleaned: false }): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string" && !state.cleaned) {
      const cleaned = child.replace(PREFIX_PATTERN, "");
      if (cleaned !== child) state.cleaned = true;
      return cleaned;
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
      return cloneElement(child, undefined, removeRepeatedPrefix(child.props.children, state));
    }
    return child;
  });
}

const Callout = ({ variant, children }: CalloutProps) => {
  const { Icon, cls, label } = config[variant];
  return (
    <div
      data-callout-variant={variant}
      className={`not-prose theory-callout my-2 rounded-md border-l-[3px] ${cls} px-3 py-2.5 flex items-start gap-2.5`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1 sm:flex sm:items-start sm:gap-2.5">
        <span className="mb-1 inline-flex shrink-0 text-[11px] font-bold uppercase text-current/75 sm:mb-0 sm:w-[76px]">
          {label}
        </span>
        <div className="text-sm leading-6 text-foreground/90 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {removeRepeatedPrefix(children)}
        </div>
      </div>
    </div>
  );
};

export default Callout;
