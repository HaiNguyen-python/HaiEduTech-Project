/**
 * @file VocabBadgeCelebration.tsx
 * @description Full-screen celebration when a learner crosses a vocabulary
 *              milestone. Mounted once in App; listens for VOCAB_BADGE_EVENT.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  VOCAB_BADGES,
  VOCAB_BADGE_EVENT,
  type VocabBadge,
  type VocabBadgeEventDetail,
} from "@/lib/vocabBadges";
import { useLanguage } from "@/contexts/LanguageContext";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const fireConfetti = (colors: string[]) => {
  if (prefersReduced()) return;
  const common = { particleCount: 60, spread: 70, ticks: 160, colors, disableForReducedMotion: true };
  confetti({ ...common, angle: 60, origin: { x: 0, y: 0.8 } });
  confetti({ ...common, angle: 120, origin: { x: 1, y: 0.8 } });
  setTimeout(() => confetti({ ...common, particleCount: 90, spread: 110, origin: { x: 0.5, y: 0.7 } }), 250);
};

const VocabBadgeCelebration = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<{ badge: VocabBadge; count: number } | null>(null);

  useEffect(() => {
    const onEarned = (e: Event) => {
      const detail = (e as CustomEvent<VocabBadgeEventDetail>).detail;
      const badge = VOCAB_BADGES.find((b) => b.id === detail?.badgeId);
      if (!badge) return;
      setActive({ badge, count: detail.count });
      fireConfetti(badge.colors);
      window.setTimeout(() => setActive(null), 3600);
    };
    window.addEventListener(VOCAB_BADGE_EVENT, onEarned);
    return () => window.removeEventListener(VOCAB_BADGE_EVENT, onEarned);
  }, []);

  const reduced = prefersReduced();

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActive(null)}
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={reduced ? { opacity: 0 } : { y: 220, scale: 0.5, rotate: -12, opacity: 0 }}
            animate={{ y: 0, scale: 1, rotate: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
            transition={reduced ? { duration: 0.2 } : { type: "spring", stiffness: 120, damping: 14 }}
            className="relative rounded-3xl border border-primary/30 bg-card/95 px-8 py-10 text-center shadow-2xl max-w-sm w-full"
          >
            {!reduced && (
              <motion.span
                className="absolute inset-0 -z-10 rounded-3xl"
                style={{ boxShadow: `0 0 90px 20px ${active.badge.colors[1]}66` }}
                animate={{ opacity: [0.4, 1, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
            <motion.div
              className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-5xl"
              style={{ background: `radial-gradient(circle, ${active.badge.colors[0]}55, transparent 70%)` }}
              animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <span aria-hidden="true">{active.badge.emoji}</span>
            </motion.div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("Huy hiệu mới", "New badge")}
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-foreground">
              {t(active.badge.nameVi, active.badge.name)}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                `Bạn vừa đạt huy hiệu ${active.badge.nameVi}! ${active.count} từ đã thuộc.`,
                `You just earned the ${active.badge.name} badge! ${active.count} words mastered.`,
              )}
            </p>
            <p className="mt-4 text-[11px] text-muted-foreground">
              {t("Bấm bất kỳ đâu để tiếp tục", "Tap anywhere to continue")}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VocabBadgeCelebration;
