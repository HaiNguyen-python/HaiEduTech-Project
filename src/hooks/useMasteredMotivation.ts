// Shared hook for "Study Motivation" system — shows motivational toast + confetti on mastering a word
import { useCallback } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

// Motivational phrases randomly shown when a student masters a word
const MOTIVATIONAL_PHRASES = [
  "Brilliant! You've mastered another word! 🌟",
  "Excellent progress! Keep it up, Mr. Hai is proud of you! 👏",
  "One step closer to your target band score! 🎯",
  "Your vocabulary is growing fast! Amazing! 🚀",
  "Fantastic! Consistency is the key to success. 💪",
  "You're doing great! Let's learn one more? 📚",
  "Keep going! You're becoming an English master. 🏆",
  "Awesome! Hard work always pays off. ⭐",
  "Superb! Your word bank just got stronger! 💎",
  "Well done! Every word counts on exam day! ✅",
  "Impressive dedication! You're on fire! 🔥",
  "Great job! Knowledge is your superpower! 🦸",
];

// Pick a random phrase from the list
const getRandomPhrase = () =>
  MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];

// Fire a subtle mini-confetti burst near the center of the screen
const fireMiniConfetti = () => {
  confetti({
    particleCount: 35,
    spread: 60,
    startVelocity: 20,
    gravity: 1.2,
    scalar: 0.7,
    origin: { x: 0.5, y: 0.45 },
    colors: ["#facc15", "#fbbf24", "#f59e0b", "#eab308"],
    ticks: 80,
    disableForReducedMotion: true,
  });
};

/**
 * Returns a wrapper around the original toggleMastered function
 * that shows a motivational toast + confetti when a word is newly mastered.
 */
export const useMasteredMotivation = (
  mastered: Set<string>,
  toggleMastered: (word: string) => void
) => {
  const handleToggleWithMotivation = useCallback(
    (word: string) => {
      const isCurrentlyMastered = mastered.has(word);
      toggleMastered(word);

      // Only show motivation when marking as mastered (not un-marking)
      if (!isCurrentlyMastered) {
        toast.success(getRandomPhrase(), {
          duration: 3500,
          style: {
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: 1.6,
            padding: "16px 24px",
            maxWidth: "420px",
          },
        });
        fireMiniConfetti();
      }
    },
    [mastered, toggleMastered]
  );

  return handleToggleWithMotivation;
};
