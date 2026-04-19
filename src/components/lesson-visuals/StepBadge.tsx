import { LucideIcon } from "lucide-react";

interface StepBadgeProps {
  number: string;
  Icon?: LucideIcon;
}

const StepBadge = ({ number, Icon }: StepBadgeProps) => (
  <span
    className="inline-flex items-center justify-center shrink-0 w-9 h-9 rounded-full text-white font-bold text-sm shadow-md ring-2 ring-white"
    style={{
      background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(160 84% 39%))",
    }}
    aria-hidden="true"
  >
    {Icon ? <Icon className="w-4 h-4" /> : <span>{number}</span>}
  </span>
);

export default StepBadge;
