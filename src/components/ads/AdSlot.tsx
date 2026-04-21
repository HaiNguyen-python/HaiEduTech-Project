import { useEffect, useRef } from "react";

interface AdSlotProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  layoutKey?: string;
  className?: string;
  minHeight?: number;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT = "ca-pub-6711722743054772";

const AdSlot = ({
  slot,
  format = "auto",
  responsive = true,
  layoutKey,
  className = "",
  minHeight = 120,
  label = "Quảng cáo",
}: AdSlotProps) => {
  const insRef = useRef<HTMLModElement | null>(null);
  const pushed = useRef(false);

  if (!slot) {
    return null;
  }

  useEffect(() => {
    if (!slot || pushed.current) return;
    if (typeof window === "undefined") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (err) {
      // Silent fail
    }
  }, [slot]);

  if (!slot) {
    return null;
  }

  return (
    <div
      className={`my-8 w-full max-w-3xl mx-auto rounded-xl border border-border/50 bg-muted/30 p-3 ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 text-center">
        {label}
      </div>
      <ins
        ref={insRef}
        className="adsbygoogle block"
        style={{ display: "block", minHeight }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(responsive ? { "data-full-width-responsive": "true" } : {})}
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      />
    </div>
  );
};

export default AdSlot;
