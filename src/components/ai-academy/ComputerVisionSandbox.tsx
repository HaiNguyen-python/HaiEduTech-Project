/**
 * ComputerVisionSandbox — "Siêu thám tử AI".
 * Student dresses an avatar with accessories (kính râm / râu giả / mũ / khẩu trang),
 * then a scanline radar effect sweeps the face and outputs a recognition
 * confidence. Each successful scan triggers a star-worthy bounce + chime.
 */
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, RefreshCcw, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  playSuccessSound,
  playFailureSound,
  bounceVariant,
  shakeVariant,
} from "@/lib/aiAcademyFx";
import MiniCVChallenges from "./MiniCVChallenges";
import lanFace from "@/assets/ai-academy-lan-face.png";

type AccessoryId = "glasses" | "beard" | "hat" | "mask";

const ACCESSORIES: {
  id: AccessoryId;
  emoji: string;
  label: string;
  /** Each accessory hides a few face landmarks → drops the AI confidence. */
  penalty: number;
}[] = [
  { id: "glasses", emoji: "🕶️", label: "Kính râm", penalty: 6 },
  { id: "beard", emoji: "🧔", label: "Râu giả", penalty: 4 },
  { id: "hat", emoji: "🎩", label: "Mũ", penalty: 3 },
  { id: "mask", emoji: "😷", label: "Khẩu trang", penalty: 14 },
];

interface Props {
  onSuccess?: () => void;
}

const CVSandbox: React.FC<Props> = ({ onSuccess }) => {
  const [worn, setWorn] = useState<Record<AccessoryId, boolean>>({
    glasses: false,
    beard: false,
    hat: false,
    mask: false,
  });
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ name: string; conf: number } | null>(
    null
  );
  const [shake, setShake] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const toggle = (id: AccessoryId) =>
    setWorn((p) => ({ ...p, [id]: !p[id] }));

  const scan = () => {
    if (scanning) return;
    setScanning(true);
    setResult(null);
    // Base confidence 99% minus penalties from each accessory worn.
    const penalty = ACCESSORIES.reduce(
      (s, a) => s + (worn[a.id] ? a.penalty : 0),
      0
    );
    const conf = Math.max(38, 99 - penalty - Math.floor(Math.random() * 3));
    setTimeout(() => {
      setScanning(false);
      setResult({ name: "Học sinh A", conf });
      if (conf >= 75) {
        playSuccessSound();
        onSuccess?.();
      } else {
        playFailureSound();
        setShake(true);
        setTimeout(() => setShake(false), 450);
      }
    }, 1300);
  };

  const reset = () => {
    setWorn({ glasses: false, beard: false, hat: false, mask: false });
    setResult(null);
  };

  return (
    <div className="space-y-3">
      <motion.div
        ref={stageRef}
        animate={shake ? shakeVariant : undefined}
        className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-cyan-400/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-inner"
      >
        {/* Scanner grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-100 text-[10px] font-bold">
          <Camera className="w-3 h-3" /> LIVE • FACE ID SCANNER
        </div>

        {/* Avatar in centre — semi-realistic human face built with SVG so accessories overlay precisely. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={result && result.conf >= 75 ? bounceVariant : undefined}
            className="relative w-52 h-52 sm:w-60 sm:h-60"
          >
            <svg
              viewBox="0 0 200 220"
              className="absolute inset-0 w-full h-full drop-shadow-[0_8px_18px_rgba(34,211,238,0.35)]"
            >
              <defs>
                <radialGradient id="cv-skin" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#fbd9b6" />
                  <stop offset="70%" stopColor="#f0b48a" />
                  <stop offset="100%" stopColor="#c98b65" />
                </radialGradient>
                <radialGradient id="cv-cheek" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff8a8a" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#ff8a8a" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="cv-hair" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2a1a10" />
                  <stop offset="100%" stopColor="#4a2c1a" />
                </linearGradient>
                <radialGradient id="cv-iris" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6b4a2a" />
                  <stop offset="100%" stopColor="#2d1a08" />
                </radialGradient>
              </defs>

              {/* Neck */}
              <path d="M78 178 Q78 200 100 204 Q122 200 122 178 Z" fill="url(#cv-skin)" />
              {/* Ears */}
              <ellipse cx="38" cy="112" rx="10" ry="16" fill="url(#cv-skin)" />
              <ellipse cx="162" cy="112" rx="10" ry="16" fill="url(#cv-skin)" />
              {/* Face shape */}
              <path
                d="M100 28 C145 28 162 66 162 110 C162 156 135 188 100 188 C65 188 38 156 38 110 C38 66 55 28 100 28 Z"
                fill="url(#cv-skin)"
              />
              {/* Cheeks */}
              <ellipse cx="62" cy="130" rx="14" ry="10" fill="url(#cv-cheek)" />
              <ellipse cx="138" cy="130" rx="14" ry="10" fill="url(#cv-cheek)" />
              {/* Hair */}
              <path
                d="M40 92 C40 50 70 22 100 22 C130 22 160 50 160 92 C150 70 140 62 122 60 C110 50 90 50 78 60 C60 62 50 70 40 92 Z"
                fill="url(#cv-hair)"
              />
              {/* Eyebrows */}
              <path d="M58 92 Q72 84 86 92" stroke="#2a1a10" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M114 92 Q128 84 142 92" stroke="#2a1a10" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Eyes — sclera + iris + pupil + highlight */}
              <ellipse cx="72" cy="108" rx="10" ry="6" fill="#fff" />
              <ellipse cx="128" cy="108" rx="10" ry="6" fill="#fff" />
              <circle cx="72" cy="108" r="5" fill="url(#cv-iris)" />
              <circle cx="128" cy="108" r="5" fill="url(#cv-iris)" />
              <circle cx="72" cy="108" r="2.2" fill="#0a0a0a" />
              <circle cx="128" cy="108" r="2.2" fill="#0a0a0a" />
              <circle cx="73.5" cy="106" r="1" fill="#fff" />
              <circle cx="129.5" cy="106" r="1" fill="#fff" />
              {/* Nose */}
              <path
                d="M100 116 Q96 138 92 148 Q100 154 108 148 Q104 138 100 116"
                fill="none"
                stroke="#b07a55"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <ellipse cx="96" cy="150" rx="2" ry="1.2" fill="#8a5a3a" opacity="0.5" />
              <ellipse cx="104" cy="150" rx="2" ry="1.2" fill="#8a5a3a" opacity="0.5" />
              {/* Lips */}
              <path d="M86 164 Q100 158 114 164 Q100 168 86 164 Z" fill="#c64a55" />
              <path d="M86 164 Q100 174 114 164 Q100 172 86 164 Z" fill="#a83444" />
              <path d="M86 164 Q100 162 114 164" stroke="#7a2030" strokeWidth="0.8" fill="none" />
            </svg>

            {/* Accessory overlays — pinned to exact face regions */}
            <AnimatePresence>
              {worn.hat && (
                <motion.span
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-6xl pointer-events-none"
                >
                  🎩
                </motion.span>
              )}
              {worn.glasses && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[44px] leading-none pointer-events-none"
                >
                  🕶️
                </motion.span>
              )}
              {worn.beard && (
                <motion.span
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  className="absolute top-[72%] left-1/2 -translate-x-1/2 text-[44px] leading-none pointer-events-none"
                >
                  🧔
                </motion.span>
              )}
              {worn.mask && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-[62%] left-1/2 -translate-x-1/2 text-[54px] leading-none pointer-events-none"
                >
                  😷
                </motion.span>
              )}
            </AnimatePresence>

            {/* Bounding box */}
            {(scanning || result) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -inset-3 border-2 border-emerald-400 rounded-md shadow-[0_0_18px_2px_rgba(52,211,153,0.5)]"
              />
            )}
          </motion.div>
        </div>

        {/* Scanline */}
        {scanning && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 1.2, ease: "linear" }}
            className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_24px_4px_rgba(34,211,238,0.8)]"
          />
        )}

        {/* Result chip */}
        <AnimatePresence>
          {result && !scanning && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                result.conf >= 75
                  ? "bg-emerald-500/20 border-emerald-400/60 text-emerald-100"
                  : "bg-rose-500/20 border-rose-400/60 text-rose-100"
              }`}
            >
              <ScanFace className="inline w-3.5 h-3.5 mr-1" />
              Nhận diện: {result.name} · Độ tự tin: {result.conf}%
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Accessory toggles — large touch targets for mobile */}
      <div className="flex flex-wrap items-center gap-2">
        {ACCESSORIES.map((a) => {
          const active = worn[a.id];
          return (
            <button
              key={a.id}
              onClick={() => toggle(a.id)}
              className={`min-h-[48px] px-3 rounded-xl border-2 text-sm font-bold transition active:scale-95 flex items-center gap-2 ${
                active
                  ? "border-cyan-500 bg-cyan-500/90 text-white shadow-[0_0_12px_2px_rgba(34,211,238,0.45)]"
                  : "border-cyan-500/50 bg-white dark:bg-slate-800 text-slate-900 dark:text-cyan-100 hover:bg-cyan-50 dark:hover:bg-slate-700"
              }`}
            >
              <span className="text-xl">{a.emoji}</span> {a.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={scan}
          disabled={scanning}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white min-h-[44px]"
        >
          <Sparkles className="w-4 h-4 mr-1" />
          {scanning ? "Đang quét…" : "Quét khuôn mặt"}
        </Button>
        <Button onClick={reset} variant="outline" className="min-h-[44px]">
          <RefreshCcw className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        💡 Mỗi phụ kiện che một số <b>điểm mốc khuôn mặt</b> (mắt, mũi, miệng).
        Càng che nhiều, độ tự tin của AI càng giảm — y hệt FaceID đời thực.
      </p>

      {/* Bonus mini-games to fill remaining space below the main scanner */}
      <MiniCVChallenges />
    </div>
  );
};

export default CVSandbox;
