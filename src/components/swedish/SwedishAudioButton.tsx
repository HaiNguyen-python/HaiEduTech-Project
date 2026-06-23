/**
 * @file SwedishAudioButton.tsx
 * @description Nút phát âm tiếng Thụy Điển dùng chung. Hiển thị trạng thái
 *              loading / playing / error để người dùng biết vì sao không nghe được.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useRef, useState } from "react";
import { Volume2, VolumeX, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  playSwedishTts,
  stopSwedishTts,
  type SwedishTtsStatus,
  type SwedishTtsSource,
} from "@/lib/swedishTts";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  size?: "xs" | "sm" | "md";
  variant?: "ghost" | "soft";
  className?: string;
  rate?: number;
  ariaLabel?: string;
  /** Hiện chữ "Slow" và phát chậm hơn (0.65) khi true. */
  slow?: boolean;
}

const SIZE_MAP = {
  xs: { btn: "h-6 w-6", icon: "h-3 w-3" },
  sm: { btn: "h-7 w-7", icon: "h-3.5 w-3.5" },
  md: { btn: "h-8 w-8", icon: "h-4 w-4" },
} as const;

type UiState = "idle" | "loading" | "playing" | "error";

export const SwedishAudioButton = ({
  text,
  size = "sm",
  variant = "soft",
  className,
  rate,
  ariaLabel,
  slow = false,
}: Props) => {
  const [state, setState] = useState<UiState>("idle");
  const [source, setSource] = useState<SwedishTtsSource | null>(null);
  const s = SIZE_MAP[size];
  const lastErrRef = useRef<string>("");

  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state === "playing" || state === "loading") {
      stopSwedishTts();
      setState("idle");
      setSource(null);
      return;
    }
    setState("loading");
    setSource(null);
    let lastSource: SwedishTtsSource | null = null;
    const ok = await playSwedishTts(text, {
      playbackRate: rate ?? (slow ? 0.65 : 0.9),
      speechRate: slow ? 0.6 : 0.85,
      onStatus: (status: SwedishTtsStatus, info) => {
        if (info?.source) lastSource = info.source;
        if (status === "loading") {
          setState("loading");
          if (info?.source) setSource(info.source);
        } else if (status === "playing") {
          setState("playing");
          if (info?.source) setSource(info.source);
        } else if (status === "error") {
          lastErrRef.current = info?.reason || "unknown";
        }
      },
    });
    if (!ok) {
      setState("error");
      toast.error("Không phát được audio sv-SE", {
        description:
          (lastErrRef.current ? `Lý do: ${lastErrRef.current}. ` : "") +
          "Thử lại sau, hoặc cài giọng Swedish (sv-SE) trong hệ điều hành.",
        duration: 5000,
      });
      setTimeout(() => setState((cur) => (cur === "error" ? "idle" : cur)), 2500);
    } else {
      setState("idle");
      if (lastSource === "native") {
        toast.message("Đang dùng giọng hệ thống (sv-SE)", {
          description: "Proxy TTS không khả dụng, đã chuyển sang giọng cài sẵn của trình duyệt.",
          duration: 3500,
        });
      }
    }
  };

  const Icon =
    state === "loading" ? Loader2 :
    state === "error" ? AlertTriangle :
    state === "playing" ? VolumeX : Volume2;

  const title =
    state === "loading" ? "Đang tải audio…" :
    state === "playing" ? `Đang phát (${source ?? "sv"}) — bấm để dừng` :
    state === "error" ? "Lỗi audio — bấm để thử lại" :
    slow ? "Phát chậm (sv-SE)" : "Phát âm (sv-SE)";

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={ariaLabel ?? `Phát âm: ${text}`}
      aria-busy={state === "loading"}
      title={title}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full transition-colors",
        variant === "soft"
          ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-300"
          : "text-blue-600 hover:bg-blue-500/10 dark:text-blue-300",
        state === "error" && "bg-red-500/15 text-red-600 dark:text-red-300",
        state === "playing" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 ring-2 ring-emerald-400/40 animate-pulse",
        state === "loading" && "bg-amber-500/15 text-amber-600 dark:text-amber-300",
        s.btn,
        className,
      )}
    >
      <Icon className={cn(s.icon, state === "loading" && "animate-spin")} />
    </button>
  );
};

export default SwedishAudioButton;
