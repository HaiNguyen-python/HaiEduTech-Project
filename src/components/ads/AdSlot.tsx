import { useEffect, useRef } from "react";

interface AdSlotProps {
  /** Google AdSense ad slot ID (data-ad-slot). Leave empty to show a placeholder during setup. */
  slot?: string;
  /** Layout format. "auto" works for most responsive placements. */
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  /** Whether the ad should be full-width responsive. */
  responsive?: boolean;
  /** Optional layout key for in-feed/in-article ads. */
  layoutKey?: string;
  /** Optional className applied to the wrapper. */
  className?: string;
  /** Minimum height to prevent CLS while ad loads. */
  minHeight?: number;
  /** Caption shown above the ad ("Quảng cáo"). */
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT = "ca-pub-6711722743054772";

/**
 * AdSlot — Single Google AdSense unit.
 *
 * Usage policy on HaiEduTech:
 * - ONLY render on static / informational pages (About, Contact, Knowledge Hub, Mentor Hub, blog-style content).
 * - DO NOT render on interactive learning pages (dashboards, exercises, games, speaking coach, code editors).
 * - Always wrap in design-system spacing; never overlay learning content.
 */
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

  useEffect(() => {
    if (!slot || pushed.current) return;
    if (typeof window === "undefined") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (err) {
      // Silent fail — AdSense often throws when blocked or already initialized.
    }
  }, [slot]);

  return (
    <div
      className={`my-8 w-full max-w-3xl mx-auto rounded-xl border border-border/50 bg-muted/30 p-3 ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 text-center">
        {label}
      </div>
      {slot ? (
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
      ) : (
        <div
          className="flex items-center justify-center text-xs text-muted-foreground rounded-md bg-background/50 border border-dashed border-border"
          style={{ minHeight }}
        >
          Ad slot — chưa cấu hình ID (sẽ hiển thị sau khi AdSense duyệt)
        </div>
      )}
    </div>
  );
};

export default AdSlot;
