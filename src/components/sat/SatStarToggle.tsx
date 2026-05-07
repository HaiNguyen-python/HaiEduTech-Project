/**
 * @file SatStarToggle.tsx
 * @description Compact star-toggle button to mark a SAT lesson/exercise/exam as studied.
 * Persists to localStorage via useSatStar hook.
 */
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSatStar } from "@/hooks/useSatStars";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  storageKey: string;
  size?: "sm" | "md" | "lg";
  label?: { vi: string; en: string };
  className?: string;
  stopPropagation?: boolean;
}

const sizeMap = {
  sm: { btn: "h-7 px-2 text-[11px]", icon: "w-3.5 h-3.5" },
  md: { btn: "h-8 px-2.5 text-xs", icon: "w-4 h-4" },
  lg: { btn: "h-9 px-3 text-sm", icon: "w-4 h-4" },
};

const SatStarToggle = ({
  storageKey,
  size = "md",
  label,
  className,
  stopPropagation = true,
}: Props) => {
  const { t } = useLanguage();
  const { marked, toggle } = useSatStar(storageKey);
  const s = sizeMap[size];

  const handleClick = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggle();
    toast.success(
      marked
        ? t("Đã bỏ đánh dấu", "Unmarked")
        : t("Đã đánh dấu là đã học ⭐", "Marked as studied ⭐"),
      { duration: 1400 },
    );
  };

  const text = label
    ? t(label.vi, label.en)
    : marked
    ? t("Đã học", "Studied")
    : t("Đánh dấu đã học", "Mark as studied");

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.04 }}
      aria-pressed={marked}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-all",
        s.btn,
        marked
          ? "bg-amber-400/20 border-amber-400/60 text-amber-700 dark:text-amber-300 shadow-[0_0_0_3px_rgba(251,191,36,0.12)]"
          : "bg-card/70 border-border text-muted-foreground hover:text-amber-600 hover:border-amber-400/60",
        className,
      )}
    >
      <Star
        className={cn(
          s.icon,
          "transition-all",
          marked ? "fill-amber-400 text-amber-500" : "text-current",
        )}
      />
      <span>{text}</span>
    </motion.button>
  );
};

export default SatStarToggle;
