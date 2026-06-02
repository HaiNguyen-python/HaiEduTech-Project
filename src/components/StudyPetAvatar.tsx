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
  skinSrc?: string;     // optional override for the pet skin
}

const stageRing: Record<PetStage, string> = {
  baby:        "ring-1 ring-sky-200",
  apprentice:  "ring-2 ring-cyan-300/70 shadow-[0_0_24px_rgba(34,211,238,0.55)]",
  master:      "ring-2 ring-fuchsia-300 shadow-[0_0_36px_rgba(217,70,239,0.65)]",
  legendary:   "ring-2 ring-amber-300 shadow-[0_0_44px_rgba(251,191,36,0.75)]",
  mythic:      "ring-[3px] ring-rose-400 shadow-[0_0_56px_rgba(244,63,94,0.85)]",
};

const stageBg: Record<PetStage, string> = {
  baby:       "bg-gradient-to-br from-sky-50 to-white",
  apprentice: "bg-gradient-to-br from-cyan-100 via-white to-sky-50",
  master:     "bg-gradient-to-br from-fuchsia-100 via-white to-violet-100",
  legendary:  "bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100",
  mythic:     "bg-[conic-gradient(from_0deg,_#fde68a,_#fca5a5,_#c4b5fd,_#67e8f9,_#fde68a)]",
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

const StudyPetAvatar = ({ pet, size = 56, className, showMoodBadge = true, skinSrc }: Props) => {
  const isMaster = pet.stage === "master";
  const isApprentice = pet.stage === "apprentice";
  const isLegendary = pet.stage === "legendary";
  const isMythic = pet.stage === "mythic";
  const hasRings = isApprentice || isMaster || isLegendary || isMythic;

  // Particle positions for legendary+ sparkle aura (deterministic per render)
  const sparkles = isLegendary || isMythic ? [0, 1, 2, 3, 4, 5] : [];

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Holographic orbiting rings */}
      {hasRings && (
        <>
          <motion.span
            aria-hidden
            className={cn(
              "absolute inset-[-6px] rounded-full border",
              isMythic ? "border-rose-400/80" :
              isLegendary ? "border-amber-400/80" :
              isMaster ? "border-fuchsia-400/70" : "border-cyan-300/80"
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: isMythic ? 6 : 9, ease: "linear", repeat: Infinity }}
            style={{ borderStyle: "dashed" }}
          />
          {(isMaster || isLegendary || isMythic) && (
            <motion.span
              aria-hidden
              className={cn(
                "absolute inset-[-12px] rounded-full border",
                isMythic ? "border-fuchsia-400/60" :
                isLegendary ? "border-orange-300/60" : "border-violet-300/50"
              )}
              animate={{ rotate: -360 }}
              transition={{ duration: isMythic ? 8 : 14, ease: "linear", repeat: Infinity }}
              style={{ borderStyle: "dotted" }}
            />
          )}
          {isMythic && (
            <motion.span
              aria-hidden
              className="absolute inset-[-20px] rounded-full border border-cyan-300/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 11, ease: "linear", repeat: Infinity }}
              style={{ borderStyle: "dashed" }}
            />
          )}
        </>
      )}

      {/* Sparkle particles for legendary & mythic */}
      {sparkles.map((i) => {
        const angle = (i / sparkles.length) * Math.PI * 2;
        const radius = size * 0.65;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <motion.span
            key={i}
            aria-hidden
            className={cn(
              "absolute h-1.5 w-1.5 rounded-full",
              isMythic ? "bg-rose-400" : "bg-amber-300"
            )}
            style={{ left: "50%", top: "50%" }}
            animate={{
              x: [0, x, 0],
              y: [0, y, 0],
              opacity: [0, 1, 0],
              scale: [0.6, 1.2, 0.6],
            }}
            transition={{
              duration: 2.4,
              delay: i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

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
          src={skinSrc ?? chatbotIcon}
          alt="AI Study Pet"
          className={cn(
            "object-cover",
            pet.mood === "sleepy" && "opacity-80 saturate-75",
            pet.mood === "hungry" && "opacity-90 grayscale-[20%]",
            isLegendary && "drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]",
            isMythic && "drop-shadow-[0_0_8px_rgba(244,63,94,1)]"
          )}
          style={{ width: size * 0.86, height: size * 0.86 }}
        />

        {/* Stage crown / aura emoji */}
        {(isMaster || isLegendary || isMythic) && (
          <span
            aria-hidden
            className="absolute -top-1 left-1/2 -translate-x-1/2 text-[16px] drop-shadow"
          >
            {isMythic ? "🔮" : isLegendary ? "⭐" : "👑"}
          </span>
        )}
        {isMythic && (
          <motion.span
            aria-hidden
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[12px]"
            animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            ✨
          </motion.span>
        )}
      </motion.div>

      {showMoodBadge && <MoodBadge mood={pet.mood} />}
    </div>
  );
};

export default StudyPetAvatar;
