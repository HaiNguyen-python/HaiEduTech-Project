import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Volume2, Eraser, Pen, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { vietnameseAlphabet, vietnameseTones, type AlphabetLetter } from "@/data/vietnamese/alphabetData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { playVietnameseTts } from "@/lib/vietnameseTts";

// ── Congrats messages ──
const CONGRATS = [
  "Tuyệt vời! 🎉",
  "Giỏi lắm! ⭐",
  "Viết đẹp quá! 🌟",
  "Xuất sắc! 🏆",
  "Chính xác! ✨",
  "Rất tốt! 👏",
  "Cố lên! 💪",
];

// ── Pitch Contour SVG for tones ──
const PitchContour = ({ direction }: { direction: string }) => {
  const pathMap: Record<string, string> = {
    flat: "M10,30 L90,30",
    rising: "M10,45 L90,15",
    falling: "M10,15 L90,45",
    dipping: "M10,20 Q50,50 90,20",
    "rising-broken": "M10,40 L40,25 M50,30 L90,10",
    "falling-heavy": "M10,15 L60,45 L90,50",
  };
  return (
    <svg viewBox="0 0 100 60" className="w-20 h-10">
      <line x1="5" y1="55" x2="95" y2="55" stroke="hsl(var(--muted-foreground))" strokeWidth={0.5} />
      <motion.path
        d={pathMap[direction]}
        stroke="hsl(var(--primary))"
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
    </svg>
  );
};

// ── Writing Canvas with check ──
const WritingCanvas = ({ letter, onClose }: { letter: string; onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsMsg, setCongratsMsg] = useState("");

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "hsl(var(--foreground))";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const drawGuide = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "hsl(var(--muted-foreground))";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(150, 0); ctx.lineTo(150, 300);
    ctx.moveTo(0, 150); ctx.lineTo(300, 150);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = "160px serif";
    ctx.fillStyle = "hsla(var(--muted-foreground), 0.15)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, 150, 155);
  }, [letter]);

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 300, 300);
    drawGuide(ctx);
  };

  const checkWriting = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create a reference canvas with just the ghost letter
    const refCanvas = document.createElement("canvas");
    refCanvas.width = 300;
    refCanvas.height = 300;
    const refCtx = refCanvas.getContext("2d")!;
    refCtx.font = "160px serif";
    refCtx.fillStyle = "black";
    refCtx.textAlign = "center";
    refCtx.textBaseline = "middle";
    refCtx.fillText(letter, 150, 155);

    const refData = refCtx.getImageData(0, 0, 300, 300).data;
    const userData = ctx.getImageData(0, 0, 300, 300).data;

    // Count pixels where the reference letter exists
    let letterPixels = 0;
    let coveredPixels = 0;

    for (let i = 3; i < refData.length; i += 4) {
      if (refData[i] > 50) {
        letterPixels++;
        if (userData[i] > 30) {
          coveredPixels++;
        }
      }
    }

    const coverage = letterPixels > 0 ? coveredPixels / letterPixels : 0;

    if (coverage > 0.15) {
      // Success!
      setCongratsMsg(CONGRATS[Math.floor(Math.random() * CONGRATS.length)]);
      setShowCongrats(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff"],
      });
    } else {
      // Not enough coverage - encourage retry
      setCongratsMsg("Thử lại nhé! Hãy viết theo nét chữ mờ 💪");
      setShowCongrats(true);
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 300, 300);
      drawGuide(ctx);
    }
  }, [letter, drawGuide]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-4 mt-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-foreground flex items-center gap-2">
          <Pen className="w-4 h-4" /> Luyện viết: {letter.toUpperCase()}
        </h4>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={clearCanvas}>
            <Eraser className="w-4 h-4 mr-1" /> Xóa
          </Button>
          <Button size="sm" variant="ghost" onClick={onClose}>Đóng</Button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border-2 border-dashed border-border rounded-lg w-full max-w-[300px] mx-auto aspect-square cursor-crosshair touch-none bg-background"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      <Button className="w-full mt-3" onClick={checkWriting}>
        <CheckCircle className="w-4 h-4 mr-2" /> Kiểm tra
      </Button>

      <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
        <DialogContent className="text-center max-w-xs">
          <p className="text-2xl font-bold py-4">{congratsMsg}</p>
          <Button onClick={() => { setShowCongrats(false); clearCanvas(); }}>
            Viết tiếp
          </Button>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

// ── Main Page ──
const VietnameseAlphabet = () => {
  const { t } = useLanguage();
  const [selectedLetter, setSelectedLetter] = useState<AlphabetLetter | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);

  const playSound = (text: string) => {
    void playVietnameseTts(text, { playbackRate: 0.85, speechRate: 0.7 });
  };

  const selectLetter = (letter: AlphabetLetter) => {
    setSelectedLetter(letter);
    setShowCanvas(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link to="/learn-vietnamese" className="hover:text-foreground transition-colors">
            {t("Học Tiếng Việt", "Learn Vietnamese")}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{t("Bảng chữ cái", "Alphabet")}</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link to="/learn-vietnamese" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              {t("Bảng Chữ Cái Tiếng Việt", "Vietnamese Alphabet")}
            </h1>
          </div>
          <p className="text-muted-foreground ml-12">
            {t("29 chữ cái + 6 dấu thanh — bấm vào để nghe phát âm và luyện viết",
               "29 letters + 6 tone marks — click to hear pronunciation and practice writing")}
          </p>
        </motion.div>

        {/* ══════ LETTERS SECTION ══════ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {t("Chữ cái", "Letters")} (29)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: letter grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2">
                {vietnameseAlphabet.map((l, idx) => (
                  <motion.button
                    key={l.letter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    onClick={() => selectLetter(l)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all hover:shadow-md cursor-pointer ${
                      selectedLetter?.letter === l.letter
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <span className="text-3xl md:text-4xl font-bold text-foreground leading-none">
                      {l.uppercase}
                    </span>
                    <span className="text-lg text-muted-foreground">{l.letter}</span>
                    
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right: detail panel */}
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                {selectedLetter ? (
                  <motion.div
                    key={selectedLetter.letter}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="sticky top-24"
                  >
                    <Card className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-5xl font-bold text-foreground">
                            {selectedLetter.uppercase} {selectedLetter.letter}
                          </h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            {t(selectedLetter.name, selectedLetter.nameEn)} — {selectedLetter.ipa}
                          </p>
                        </div>
                        <Button size="icon" variant="outline" onClick={() => playSound(selectedLetter.letter)}>
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Example word */}
                      <div className="bg-primary/5 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-foreground">
                          {t("Ví dụ", "Example")}:{" "}
                          <span className="text-primary font-bold">{selectedLetter.exampleWord}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t(selectedLetter.exampleMeaning, selectedLetter.exampleMeaningEn)}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="mt-1 h-7 text-xs"
                          onClick={() => playSound(selectedLetter.exampleWord)}
                        >
                          <Volume2 className="w-3 h-3 mr-1" /> {t("Nghe", "Listen")}
                        </Button>
                      </div>

                      {/* Practice button */}
                      <Button
                        className="w-full"
                        variant={showCanvas ? "secondary" : "default"}
                        onClick={() => setShowCanvas(!showCanvas)}
                      >
                        <Pen className="w-4 h-4 mr-2" />
                        {showCanvas
                          ? t("Ẩn bảng viết", "Hide writing pad")
                          : t("Luyện viết", "Practice writing")}
                      </Button>

                      {showCanvas && (
                        <WritingCanvas
                          letter={selectedLetter.letter}
                          onClose={() => setShowCanvas(false)}
                        />
                      )}
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center p-8 text-muted-foreground"
                  >
                    <Pen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">
                      {t("Chọn một chữ cái để xem chi tiết", "Select a letter to see details")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ══════ TONES SECTION ══════ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {t("Dấu thanh", "Tones")} (6)
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vietnameseTones.map((tone, idx) => (
              <motion.div
                key={tone.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card className="p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-foreground text-sm">
                        {t(tone.name, tone.nameEn)}
                      </h3>
                      <span className="inline-block mt-1 text-lg font-mono border border-border rounded px-2 py-0.5">
                        {tone.mark}
                      </span>
                    </div>
                    <PitchContour direction={tone.pitchDirection} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {t(tone.description, tone.descriptionEn)}
                  </p>
                  <div className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
                    <div>
                      <span className="text-xl font-bold text-primary">{tone.example}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        = {t(tone.exampleMeaning, tone.exampleMeaningEn)}
                      </span>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => playSound(tone.example)}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tone comparison */}
          <Card className="mt-6 p-5">
            <h3 className="font-bold text-foreground mb-4">
              {t('So sánh 6 thanh điệu với từ "ma"', 'Compare 6 tones with the word "ma"')}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {vietnameseTones.map((tone) => (
                <button
                  key={tone.example}
                  onClick={() => playSound(tone.example)}
                  className="flex flex-col items-center p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <span className="text-2xl font-bold text-foreground">{tone.example}</span>
                  <span className="text-[10px] text-muted-foreground mt-1">
                    {t(tone.exampleMeaning, tone.exampleMeaningEn)}
                  </span>
                  <Volume2 className="w-3 h-3 text-primary mt-1" />
                </button>
              ))}
            </div>
          </Card>
        </section>

        {/* ══════ VIETNAM BEAUTY GALLERY ══════ */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-2 text-center">
            {t("Những nét đẹp của Việt Nam", "The Beauty of Vietnam")}
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6 italic">
            {t("Đất nước con người — từ đồng quê đến thành phố", "Land and people — from countryside to city")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { src: "/vietnam-beauty-1.webp", alt: "Trẻ em chăn trâu trên đồng lúa" },
              { src: "/vietnam-beauty-2.webp", alt: "Ruộng bậc thang Mù Cang Chải" },
              { src: "/vietnam-beauty-4.webp", alt: "Vịnh Hạ Long" },
              { src: "/vietnam-beauty-5.webp", alt: "Bắc Sơn bình minh" },
              { src: "/vietnam-beauty-7.webp", alt: "Khinh khí cầu trên Kinh thành Huế" },
              { src: "/vietnam-beauty-9.webp", alt: "Ngư dân quăng lưới" },
              { src: "/vietnam-beauty-3.webp", alt: "Thành phố Nha Trang về đêm" },
              { src: "/vietnam-beauty-6.webp", alt: "Landmark 81 Sài Gòn" },
              { src: "/vietnam-beauty-8.webp", alt: "Quốc kỳ Việt Nam" },
            ].map((img, idx) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-xl overflow-hidden shadow-md ${
                  idx === 0 || idx === 8 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseAlphabet;
