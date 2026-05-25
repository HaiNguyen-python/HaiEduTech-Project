import { ReactNode } from "react";
import { useTilt } from "@/hooks/useTilt";

interface Props {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

/**
 * Apple-style card wrapper:
 * - Optional 3D tilt on hover (desktop)
 * - Diagonal shine sweep on hover via gradient overlay
 * Caller controls all padding/border/bg via className.
 */
const ShineCard = ({ children, className = "", tilt = true }: Props) => {
  const ref = useTilt(5);

  return (
    <div
      ref={tilt ? (ref as any) : undefined}
      className={`group/shine relative overflow-visible ${className}`}
    >
      {/* Shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-[900ms] ease-out group-hover/shine:left-[110%] group-hover/shine:opacity-100 dark:via-white/10"
      />
      {children}
    </div>
  );
};

export default ShineCard;
