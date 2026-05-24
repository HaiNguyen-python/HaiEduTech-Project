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

        {/* Avatar in centre — custom cartoon face so accessories overlay exactly. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={result && result.conf >= 75 ? bounceVariant : undefined}
            className="relative w-44 h-44 sm:w-48 sm:h-48"
          >
            {/* Face circle */}
            <div className="absolute inset-x-[10%] top-[12%] bottom-[6%] rounded-[45%] bg-gradient-to-b from-amber-200 to-amber-300 shadow-[0_8px_24px_rgba(34,211,238,0.35)]" />
            {/* Hair */}
            <div className="absolute top-[8%] left-[14%] right-[14%] h-[18%] rounded-t-full bg-slate-800" />
            {/* Eyes */}
            <div className="absolute top-[42%] left-[28%] w-3 h-3 rounded-full bg-slate-900" />
            <div className="absolute top-[42%] right-[28%] w-3 h-3 rounded-full bg-slate-900" />
            {/* Nose */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-full bg-amber-500/70" />
            {/* Mouth */}
            <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-8 h-2 rounded-b-full bg-rose-500" />

            {/* Accessory overlays — pinned to exact face regions */}
            <AnimatePresence>
              {worn.hat && (
                <motion.span
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-5xl pointer-events-none"
                >
                  🎩
                </motion.span>
              )}
              {worn.glasses && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-[36%] left-1/2 -translate-x-1/2 text-[44px] leading-none pointer-events-none"
                >
                  🕶️
                </motion.span>
              )}
              {worn.beard && (
                <motion.span
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  className="absolute top-[64%] left-1/2 -translate-x-1/2 text-[42px] leading-none pointer-events-none"
                >
                  🧔
                </motion.span>
              )}
              {worn.mask && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-[52%] left-1/2 -translate-x-1/2 text-[52px] leading-none pointer-events-none"
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
    </div>
  );
};

export default CVSandbox;
