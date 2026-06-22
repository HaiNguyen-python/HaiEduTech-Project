/**
 * @file SwedishAudioButton.tsx
 * @description Nút phát âm tiếng Thụy Điển dùng chung cho toàn bộ phần
 *              từ vựng / câu mẫu / hội thoại của khóa Swedish. Bấm vào sẽ
 *              gọi `playSwedishTts` (Google sv proxy → fallback sv-SE).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { playSwedishTts, stopSwedishTts } from "@/lib/swedishTts";
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

export const SwedishAudioButton = ({
  text,
  size = "sm",
  variant = "soft",
  className,
  rate,
  ariaLabel,
  slow = false,
}: Props) => {
  const [playing, setPlaying] = useState(false);
  const s = SIZE_MAP[size];

  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing) {
      stopSwedishTts();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    try {
      await playSwedishTts(text, {
        playbackRate: rate ?? (slow ? 0.65 : 0.9),
        speechRate: slow ? 0.6 : 0.85,
      });
    } finally {
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={ariaLabel ?? `Phát âm: ${text}`}
      title={slow ? "Phát chậm (sv-SE)" : "Phát âm (sv-SE)"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full transition-colors",
        variant === "soft"
          ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-300"
          : "text-blue-600 hover:bg-blue-500/10 dark:text-blue-300",
        s.btn,
        className,
      )}
    >
      {playing ? <VolumeX className={s.icon} /> : <Volume2 className={s.icon} />}
    </button>
  );
};

export default SwedishAudioButton;
