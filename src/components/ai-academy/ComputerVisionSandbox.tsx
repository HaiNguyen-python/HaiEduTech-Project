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
      setResult({ name: "Bé Lan", conf });
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
    <div className="space-y-2">
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

        {/* Avatar in centre — cute cartoon portrait of "Lan", a Vietnamese girl. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={result && result.conf >= 75 ? bounceVariant : undefined}
            className="relative w-56 h-56 sm:w-64 sm:h-64"
          >
            <img
              src={lanFace}
              alt="Bé Lan — học sinh trong ví dụ nhận diện khuôn mặt"
              width={512}
              height={512}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_8px_18px_rgba(34,211,238,0.35)]"
            />

            {/* Accessory overlays — outer wrapper handles centering, inner motion handles animation */}
            <AnimatePresence>
              {worn.hat && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ top: "-4%", width: "54%" }}
                >
                  <motion.div
                    initial={{ y: -24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, rotate: -5 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                  >
                    <svg viewBox="0 0 200 130" className="w-full h-auto drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]">
                      <ellipse cx="100" cy="118" rx="92" ry="10" fill="#1a1a1a" />
                      <rect x="38" y="38" width="124" height="78" rx="6" fill="#2a2438" />
                      <rect x="38" y="38" width="124" height="78" rx="6" fill="url(#hatShine)" opacity="0.35" />
                      <rect x="34" y="90" width="132" height="14" fill="#c8395c" />
                      <rect x="34" y="90" width="132" height="3" fill="#ff5c80" opacity="0.7" />
                      <defs>
                        <linearGradient id="hatShine" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                          <stop offset="50%" stopColor="#fff" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </div>
              )}

              {worn.glasses && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ top: "44%", width: "48%" }}
                >
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0, y: -8 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <svg viewBox="0 0 220 70" className="w-full h-auto drop-shadow-[0_3px_4px_rgba(0,0,0,0.4)]">
                      <path d="M4 30 L26 28" stroke="#111" strokeWidth="6" strokeLinecap="round" />
                      <path d="M216 30 L194 28" stroke="#111" strokeWidth="6" strokeLinecap="round" />
                      <path d="M96 30 Q110 22 124 30" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
                      <ellipse cx="62" cy="34" rx="38" ry="22" fill="#1a1133" stroke="#0a0a0a" strokeWidth="5" />
                      <ellipse cx="50" cy="24" rx="14" ry="6" fill="#fff" opacity="0.35" />
                      <ellipse cx="158" cy="34" rx="38" ry="22" fill="#1a1133" stroke="#0a0a0a" strokeWidth="5" />
                      <ellipse cx="146" cy="24" rx="14" ry="6" fill="#fff" opacity="0.35" />
                    </svg>
                  </motion.div>
                </div>
              )}

              {worn.mask && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ top: "55%", width: "52%" }}
                >
                  <motion.div
                    initial={{ y: 14, opacity: 0, scale: 0.85 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 14, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  >
                    <svg viewBox="0 0 220 130" className="w-full h-auto drop-shadow-[0_3px_5px_rgba(0,0,0,0.3)]">
                      <path d="M22 30 Q4 62 22 96" stroke="#cdd6e0" strokeWidth="3" fill="none" />
                      <path d="M198 30 Q216 62 198 96" stroke="#cdd6e0" strokeWidth="3" fill="none" />
                      <path
                        d="M22 28 Q60 14 110 14 Q160 14 198 28 L198 92 Q160 116 110 116 Q60 116 22 92 Z"
                        fill="#eaf3ff"
                        stroke="#9fb6cc"
                        strokeWidth="2"
                      />
                      <path d="M28 50 Q110 60 192 50" stroke="#b9c8d6" strokeWidth="1.5" fill="none" />
                      <path d="M28 70 Q110 80 192 70" stroke="#b9c8d6" strokeWidth="1.5" fill="none" />
                      <path d="M28 88 Q110 98 192 88" stroke="#b9c8d6" strokeWidth="1.5" fill="none" />
                      <path d="M70 22 Q110 16 150 22" stroke="#7892ad" strokeWidth="2" fill="none" />
                    </svg>
                  </motion.div>
                </div>
              )}

              {worn.beard && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ top: "60%", width: "44%" }}
                >
                  <motion.div
                    initial={{ y: 10, opacity: 0, scaleY: 0.5 }}
                    animate={{ y: 0, opacity: 1, scaleY: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    style={{ transformOrigin: "top center" }}
                  >
                    <svg viewBox="0 0 200 140" className="w-full h-auto drop-shadow-[0_4px_5px_rgba(0,0,0,0.35)]">
                      <defs>
                        <radialGradient id="beardG" cx="50%" cy="35%" r="65%">
                          <stop offset="0%" stopColor="#5a3a22" />
                          <stop offset="100%" stopColor="#2a1808" />
                        </radialGradient>
                      </defs>
                      <path
                        d="M40 30 Q70 12 100 30 Q130 12 160 30 Q150 46 130 42 Q115 38 100 44 Q85 38 70 42 Q50 46 40 30 Z"
                        fill="url(#beardG)"
                      />
                      <path
                        d="M22 40 Q14 90 50 120 Q80 138 100 134 Q120 138 150 120 Q186 90 178 40 Q170 70 150 78 Q130 84 130 96 Q120 118 100 120 Q80 118 70 96 Q70 84 50 78 Q30 70 22 40 Z"
                        fill="url(#beardG)"
                      />
                      <circle cx="55" cy="105" r="6" fill="#3a230f" opacity="0.6" />
                      <circle cx="145" cy="105" r="6" fill="#3a230f" opacity="0.6" />
                      <circle cx="100" cy="125" r="7" fill="#3a230f" opacity="0.6" />
                    </svg>
                  </motion.div>
                </div>
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
      </motion.div>

      {/* Result chip — placed OUTSIDE the overflow-hidden stage so it never clips */}
      <AnimatePresence>
        {result && !scanning && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className={`mx-auto mt-2 flex items-center justify-center px-4 py-2 rounded-xl text-sm font-extrabold border-2 shadow-[0_4px_14px_rgba(0,0,0,0.45)] whitespace-nowrap ${
              result.conf >= 75
                ? "bg-emerald-600/95 border-emerald-300 text-white"
                : "bg-rose-600/95 border-rose-300 text-white"
            }`}
          >
            <ScanFace className="inline w-4 h-4 mr-1.5 shrink-0" />
            Nhận diện: {result.name} · Độ tự tin: {result.conf}%
          </motion.div>
        )}
      </AnimatePresence>

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
