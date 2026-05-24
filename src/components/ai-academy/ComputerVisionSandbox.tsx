/**
 * ComputerVisionSandbox
 * A simulated "camera" canvas where the student drops emojis and the mock AI
 * draws bounding boxes + a confidence score. No real ML — pure DOM physics so
 * younger students see the idea of object detection in a friendly way.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Detected = { id: string; emoji: string; label: string; x: number; y: number; conf: number };

const EMOJI_BANK: { emoji: string; label: string }[] = [
  { emoji: "😀", label: "Khuôn mặt vui" },
  { emoji: "😢", label: "Khuôn mặt buồn" },
  { emoji: "🐱", label: "Mèo" },
  { emoji: "🐶", label: "Chó" },
  { emoji: "🍎", label: "Quả táo" },
  { emoji: "⚽", label: "Quả bóng" },
  { emoji: "✋", label: "Bàn tay" },
  { emoji: "📱", label: "Điện thoại" },
];

const CVSandbox = () => {
  const [items, setItems] = useState<Detected[]>([]);
  const [scanning, setScanning] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const place = (e: { emoji: string; label: string }) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const x = 16 + Math.random() * (rect.width - 96);
    const y = 16 + Math.random() * (rect.height - 96);
    const conf = 0.7 + Math.random() * 0.29;
    setItems((prev) => [...prev, { id, emoji: e.emoji, label: e.label, x, y, conf }]);
  };

  const scan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 1100);
  };

  const reset = () => setItems([]);

  return (
    <div className="space-y-3">
      <div
        ref={stageRef}
        className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-cyan-400/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-inner"
      >
        {/* scan grid */}
        <div className="absolute inset-0 opacity-20"
             style={{ backgroundImage: "linear-gradient(rgba(34,211,238,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.4) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-100 text-[10px] font-bold">
          <Camera className="w-3 h-3" /> LIVE • AI VISION
        </div>
        {scanning && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 1.1, ease: "linear" }}
            className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_24px_4px_rgba(34,211,238,0.8)]"
          />
        )}

        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-cyan-100/70 text-sm text-center px-6">
            Chọn emoji bên dưới để thả vào "camera". AI sẽ vẽ khung và đoán nhãn.
          </div>
        )}

        {items.map((it) => (
          <motion.div
            key={it.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute"
            style={{ left: it.x, top: it.y }}
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-md border-2 border-emerald-400 shadow-[0_0_18px_2px_rgba(52,211,153,0.5)] flex items-center justify-center text-4xl bg-black/20">
                {it.emoji}
              </div>
              <div className="absolute -top-6 left-0 text-[10px] font-bold text-emerald-300 bg-slate-900/80 px-1.5 py-0.5 rounded whitespace-nowrap">
                {it.label} · {(it.conf * 100).toFixed(0)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {EMOJI_BANK.map((e) => (
          <button
            key={e.emoji}
            onClick={() => place(e)}
            className="w-11 h-11 text-2xl rounded-xl border-2 border-cyan-300/40 bg-cyan-500/5 hover:bg-cyan-500/15 active:scale-95 transition"
            title={`Thả ${e.label} vào camera`}
          >
            {e.emoji}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={scan} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          <Sparkles className="w-4 h-4 mr-1" /> Quét lại
        </Button>
        <Button onClick={reset} variant="outline">
          <RefreshCcw className="w-4 h-4 mr-1" /> Xoá hết
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        💡 Đây là <b>mô phỏng</b>: AI thật học từ hàng triệu ảnh để vẽ "bounding box" và đoán nhãn — y hệt cách FaceID nhận diện khuôn mặt khi điểm danh.
      </p>
    </div>
  );
};

export default CVSandbox;
