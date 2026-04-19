/**
 * @file GlobalScholarBadge.tsx
 * @description Displays the user's "Global Scholar" badge if earned. Compact pill UI.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  userId: string | null;
  className?: string;
}

const GlobalScholarBadge = ({ userId, className = "" }: Props) => {
  const { t } = useLanguage();
  const [earned, setEarned] = useState<{ at: string } | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("player_badges")
        .select("earned_at")
        .eq("user_id", userId)
        .eq("badge_id", "global-scholar")
        .maybeSingle();
      if (!cancelled && data) setEarned({ at: data.earned_at });
    })();
    return () => { cancelled = true; };
  }, [userId]);

  if (!earned) return null;

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-md ${className}`}
      title={t(
        `Bạn đạt huy hiệu Global Scholar ngày ${new Date(earned.at).toLocaleDateString()}`,
        `Earned Global Scholar on ${new Date(earned.at).toLocaleDateString()}`
      )}
    >
      <Globe2 className="w-3.5 h-3.5" />
      🌍 Global Scholar
    </motion.div>
  );
};

export default GlobalScholarBadge;
