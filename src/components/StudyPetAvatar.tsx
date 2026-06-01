/**
 * StudyPetAvatar - Visual renderer for the AI Study Pet.
 *
 * Renders one of three evolution stages (baby / apprentice / master) plus
 * a mood overlay (celebrating / hungry / sleepy / happy / neutral).
 * Pure CSS + Tailwind animation so it is light enough to run inside the
 * floating chatbot launcher.
 */
import { motion } from "framer-motion";
import { Sparkles, Frown, Moon, Heart } from "lucide-react";
import type { PetStage, StudyPetState } from "@/hooks/useStudyPet";
import chatbotIcon from "@/assets/chatbot-icon.png";
import { cn } from "@/lib/utils";

interface Props {
  pet: StudyPetState;
  size?: number;        // px, the visual diameter of the pet
  className?: string;
  showMoodBadge?: boolean;
}

const stageRing: Record<PetStage, string> = {
  baby:        "ring-1 ring-sky-200",
  apprentice:  "ring-2 ring-cyan-300/70 shadow-[0_0_24px_rgba(34,211,238,0.55)]",
  master:      "ring-2 ring-fuchsia-300 shadow-[0_0_36px_rgba(217,70,239,0.65)]",
};

const stageBg: Record<PetStage, string> = {
  baby:       "bg-gradient-to-br from-sky-50 to-white",
  apprentice: "bg-gradient-to-br from-cyan-100 via-white to-sky-50",
  master:     "bg-gradient-to-br from-fuchsia-100 via-white to-violet-100",
};

const MoodBadge = ({ mood }: { mood: StudyPetState["mood"] }) => {
  if (mood === "neutral") return null;
  const map = {
    celebrating: { icon: Sparkles, bg: "bg-amber-400", label: "🎉" },
    happy:       { icon: Heart,    bg: "bg-rose-400",  label: "💚" },
    sleepy:      { icon: Moon,     bg: "bg-indigo-400",label: "💤" },
    hungry:      { icon: Frown,    bg: "bg-orange-500",label: "🍞" },
  } as const;
  const m = map[mood];
  const Icon = m.icon;
  return (
    <span
      className={cn(
        "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-white shadow-md",
        m.bg
      )}
      title={mood}
    >
      <Icon className="h-3 w-3" />
    </span>
  );
};

const StudyPetAvatar = ({ pet, size = 56, className, showMoodBadge = true }: Props) => {
  const isMaster = pet.stage === "master";
  const isApprentice = pet.stage === "apprentice";

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Holographic orbiting rings — apprentice & master only */}
      {(isApprentice || isMaster) && (
        <>
          <motion.span
            aria-hidden
            className={cn(
              "absolute inset-[-6px] rounded-full border",
              isMaster ? "border-fuchsia-400/70" : "border-cyan-300/80"
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 9, ease: "linear", repeat: Infinity }}
            style={{ borderStyle: "dashed" }}
          />
          {isMaster && (
            <motion.span
              aria-hidden
              className="absolute inset-[-12px] rounded-full border border-violet-300/50"
              animate={{ rotate: -360 }}
              transition={{ duration: 14, ease: "linear", repeat: Infinity }}
              style={{ borderStyle: "dotted" }}
            />
          )}
        </>
      )}

      {/* Celebration burst */}
      {pet.mood === "celebrating" && (
        <motion.span
          aria-hidden
          initial={{ scale: 0.6, opacity: 0.9 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 1.1, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-amber-300/40"
        />
      )}

      {/* Pet body */}
      <motion.div
        animate={
          pet.mood === "sleepy" || pet.mood === "hungry"
            ? { y: [0, 1.5, 0] }
            : { y: [0, -2, 0] }
        }
        transition={{
          duration: pet.mood === "sleepy" ? 3.6 : 2.2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-full border border-border",
          stageBg[pet.stage],
          stageRing[pet.stage]
        )}
        style={{ width: size, height: size }}
      >
        <img
          src={chatbotIcon}
          alt="AI Study Pet"
          className={cn(
            "object-cover",
            pet.mood === "sleepy" && "opacity-80 saturate-75",
            pet.mood === "hungry" && "opacity-90 grayscale-[20%]"
          )}
          style={{ width: size * 0.86, height: size * 0.86 }}
        />

        {/* Master crown */}
        {isMaster && (
          <span
            aria-hidden
            className="absolute -top-1 left-1/2 -translate-x-1/2 text-[14px] drop-shadow"
          >
            👑
          </span>
        )}
      </motion.div>

      {showMoodBadge && <MoodBadge mood={pet.mood} />}
    </div>
  );
};

export default StudyPetAvatar;
