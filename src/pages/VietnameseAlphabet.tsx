import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Volume2, Eraser, Pen, CheckCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  vietnameseAlphabet,
  vietnameseAlphabetExamples,
  vietnameseAlphabetPronunciationByLetter,
  vietnameseTones,
  type AlphabetLetter,
} from "@/data/vietnamese/alphabetData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  playVietnameseAlphabetTts,
  stopVietnameseAlphabetTts,
  type AlphabetAudioKind,
} from "@/lib/vietnameseAlphabetTts";

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

// ── Vietnam Beauty gallery data (bilingual) ──
const VIETNAM_BEAUTY = [
  { src: "/vietnam-beauty-2.webp", titleVi: "Ruộng bậc thang Mù Cang Chải", titleEn: "Mu Cang Chai rice terraces", captionVi: "Những thửa ruộng bậc thang uốn lượn trên sườn núi Yên Bái, đẹp nhất vào mùa lúa chín.", captionEn: "Terraced fields curving along the mountains of Yen Bai, most stunning in harvest season." },
  { src: "/vietnam-beauty-11.webp", titleVi: "Thung lũng Sa Pa", titleEn: "Sa Pa valley", captionVi: "Ruộng bậc thang Sa Pa soi bóng núi Fansipan - nóc nhà Đông Dương.", captionEn: "Sa Pa terraces below Fansipan, the highest peak of Indochina." },
  { src: "/vietnam-beauty-13.webp", titleVi: "Phố cổ Hà Nội", titleEn: "Hanoi Old Quarter", captionVi: "Xích lô qua Hồ Gươm - nhịp sống ngàn năm của Thủ đô.", captionEn: "Cyclos passing Hoan Kiem lake - the thousand-year rhythm of the capital." },
  { src: "/vietnam-beauty-4.webp", titleVi: "Vịnh Hạ Long", titleEn: "Ha Long Bay", captionVi: "Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi giữa làn nước xanh ngọc.", captionEn: "A UNESCO World Heritage site with thousands of limestone islands in emerald water." },
  { src: "/vietnam-beauty-5.webp", titleVi: "Bình minh Bắc Sơn", titleEn: "Bac Son sunrise", captionVi: "Thung lũng Bắc Sơn (Lạng Sơn) chìm trong sương sớm và ánh nắng đầu ngày.", captionEn: "Bac Son valley (Lang Son) wrapped in morning mist and first light." },
  { src: "/vietnam-beauty-14.webp", titleVi: "Tràng An, Ninh Bình", titleEn: "Trang An, Ninh Binh", captionVi: "Thuyền nhỏ len qua các hang đá vôi ở quần thể danh thắng Tràng An.", captionEn: "Boats gliding through limestone caves at the Trang An landscape complex." },
  { src: "/vietnam-beauty-7.webp", titleVi: "Kinh thành Huế", titleEn: "Hue Imperial City", captionVi: "Khinh khí cầu bay trên cố đô Huế - nơi lưu giữ dấu ấn triều Nguyễn.", captionEn: "Hot-air balloons above the former capital Hue, home of the Nguyen dynasty heritage." },
  { src: "/vietnam-beauty-10.webp", titleVi: "Đèn lồng Hội An", titleEn: "Hoi An lanterns", captionVi: "Phố cổ Hội An lung linh đèn lồng mỗi tối - Di sản Văn hóa Thế giới.", captionEn: "Hoi An Ancient Town glowing with lanterns every evening - a UNESCO World Heritage site." },
  { src: "/vietnam-beauty-3.webp", titleVi: "Nha Trang về đêm", titleEn: "Nha Trang at night", captionVi: "Thành phố biển rực rỡ ánh đèn bên vịnh Nha Trang.", captionEn: "The seaside city glowing with lights along Nha Trang Bay." },
  { src: "/vietnam-beauty-9.webp", titleVi: "Ngư dân quăng lưới", titleEn: "Fisherman casting a net", captionVi: "Nghề chài lưới truyền thống gắn bó với đời sống các làng ven biển.", captionEn: "Traditional net fishing, part of daily life in coastal villages." },
  { src: "/vietnam-beauty-12.webp", titleVi: "Chợ nổi miền Tây", titleEn: "Mekong floating market", captionVi: "Ghe thuyền đầy trái cây trên sông - nhịp sống sông nước của miền Tây Nam Bộ.", captionEn: "Boats loaded with fruit on the river - the waterway life of the Mekong Delta." },
  { src: "/vietnam-beauty-6.webp", titleVi: "Landmark 81, Sài Gòn", titleEn: "Landmark 81, Saigon", captionVi: "Tòa nhà cao nhất Việt Nam, biểu tượng của TP. Hồ Chí Minh hiện đại.", captionEn: "Vietnam's tallest building, a symbol of modern Ho Chi Minh City." },
  { src: "/vietnam-beauty-15.webp", titleVi: "Hoàng hôn Phú Quốc", titleEn: "Phu Quoc sunset", captionVi: "Bãi cát trắng và nước biển xanh ngọc trên đảo ngọc Phú Quốc.", captionEn: "White sand and turquoise water on the pearl island of Phu Quoc." },
  { src: "/vietnam-beauty-1.webp", titleVi: "Tuổi thơ đồng quê", titleEn: "Countryside childhood", captionVi: "Trẻ em chăn trâu trên cánh đồng lúa xanh - hình ảnh quen thuộc của làng quê Việt Nam.", captionEn: "Children herding buffalo across green rice fields - a classic scene of rural Vietnam." },
  { src: "/vietnam-beauty-8.webp", titleVi: "Quốc kỳ Việt Nam", titleEn: "Flag of Vietnam", captionVi: "Cờ đỏ sao vàng - niềm tự hào của người Việt Nam.", captionEn: "The red flag with a yellow star - a source of national pride." },
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
      className="bg-card border-2 border-emerald-500/50 rounded-xl p-4 mt-4"
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
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [galleryApi, setGalleryApi] = useState<CarouselApi | undefined>(undefined);
  const [galleryPage, setGalleryPage] = useState(0);
  const [galleryPageCount, setGalleryPageCount] = useState(1);

  useEffect(() => () => stopVietnameseAlphabetTts(), []);

  useEffect(() => {
    if (!galleryApi) return;
    const updatePagination = (api: CarouselApi) => {
      const inView = api.slidesInView().length || 1;
      const total = api.scrollSnapList().length || 1;
      setGalleryPage(Math.floor(api.selectedScrollSnap() / inView));
      setGalleryPageCount(Math.max(1, Math.ceil(total / inView)));
    };
    updatePagination(galleryApi);
    galleryApi.on("select", updatePagination).on("reInit", updatePagination);
    return () => {
      galleryApi.off("select", updatePagination).off("reInit", updatePagination);
    };
  }, [galleryApi]);

  const playSound = async (text: string, kind: AlphabetAudioKind, key: string) => {
    stopVietnameseAlphabetTts();
    setPlayingKey(key);
    try {
      await playVietnameseAlphabetTts(text, kind);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error(t(
        "Không thể phát âm thanh lúc này. Vui lòng thử lại sau.",
        "Audio is unavailable right now. Please try again later.",
      ));
    } finally {
      setPlayingKey((current) => current === key ? null : current);
    }
  };

  const selectLetter = (letter: AlphabetLetter) => {
    setSelectedLetter(letter);
    setShowCanvas(false);
    const pronunciation = vietnameseAlphabetPronunciationByLetter.get(letter.letter);
    if (pronunciation) {
      void playSound(pronunciation.soundText, "letter-sound", `sound:${letter.letter}`);
    }
  };

  const AudioIcon = ({ audioKey }: { audioKey: string }) => playingKey === audioKey
    ? <Loader2 className="h-4 w-4 animate-spin" />
    : <Volume2 className="h-4 w-4" />;

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

        {/* Header hero - Vietnamese landscape */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 overflow-hidden rounded-3xl border-2 border-emerald-500/40 shadow-lg"
        >
          <img
            src="/vietnam-alphabet-hero.webp"
            alt={t("Ruộng bậc thang Việt Nam buổi bình minh", "Vietnamese rice terraces at sunrise")}
            width={1920}
            height={640}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/45 to-foreground/10" />
          <div className="relative flex flex-col justify-center px-5 py-10 md:px-10 md:py-14">
            <div className="flex items-center gap-3">
              <Link
                to="/learn-vietnamese"
                aria-label={t("Quay lại Học Tiếng Việt", "Back to Learn Vietnamese")}
                className="rounded-lg bg-background/20 p-2 backdrop-blur-sm transition-colors hover:bg-background/30"
              >
                <ArrowLeft className="w-5 h-5 text-background" />
              </Link>
              <h1 className="text-2xl md:text-4xl font-bold font-display text-background drop-shadow">
                {t("Bảng Chữ Cái Tiếng Việt", "Vietnamese Alphabet")}
              </h1>
            </div>
            <p className="mt-2 ml-12 text-sm md:text-base text-background/90">
              {t("29 chữ cái + 6 dấu thanh - bấm vào để nghe phát âm và luyện viết",
                 "29 letters + 6 tone marks - click to hear pronunciation and practice writing")}
            </p>
          </div>
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
                      {(() => {
                        const pronunciation = vietnameseAlphabetPronunciationByLetter.get(selectedLetter.letter);
                        if (!pronunciation) return null;
                        return (
                          <>
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-5xl font-bold text-foreground">
                          {selectedLetter.uppercase} {selectedLetter.letter}
                        </h2>
                        <Button
                          size="icon"
                          variant="outline"
                          aria-label={t(`Nghe cách đọc chữ ${selectedLetter.uppercase}`, `Hear the primary-school reading of ${selectedLetter.uppercase}`)}
                          disabled={playingKey !== null}
                          onClick={() => void playSound(pronunciation.soundText, "letter-sound", `sound:${selectedLetter.letter}`)}
                        >
                          <AudioIcon audioKey={`sound:${selectedLetter.letter}`} />
                        </Button>
                      </div>

                      {/* Example words */}
                      <div className="space-y-2 bg-primary/5 rounded-lg p-3 mb-4">
                        {(vietnameseAlphabetExamples[selectedLetter.letter] ?? []).map((example) => {
                          const audioKey = `example:${selectedLetter.letter}:${example.word}`;
                          return (
                            <div key={example.word} className="flex min-h-9 items-center gap-2">
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 shrink-0 text-primary"
                                aria-label={t(`Nghe từ ${example.word}`, `Hear ${example.word}`)}
                                disabled={playingKey !== null}
                                onClick={() => void playSound(example.word, "example", audioKey)}
                              >
                                <AudioIcon audioKey={audioKey} />
                              </Button>
                              <p className="min-w-0 text-sm font-medium text-foreground">
                                <span className="font-bold text-primary">{example.word}</span>
                                <span className="text-muted-foreground"> - {example.meaningEn}</span>
                              </p>
                            </div>
                          );
                        })}
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
                          </>
                        );
                      })()}
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
                      <span className="inline-block mt-1 text-lg font-mono border-2 border-emerald-500/50 rounded px-2 py-0.5">
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
                      disabled={playingKey !== null}
                      onClick={() => void playSound(tone.example, "tone", `tone:${tone.example}`)}
                    >
                      <AudioIcon audioKey={`tone:${tone.example}`} />
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
                  disabled={playingKey !== null}
                  onClick={() => void playSound(tone.example, "tone", `tone:${tone.example}`)}
                  className="flex flex-col items-center p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <span className="text-2xl font-bold text-foreground">{tone.example}</span>
                  <span className="text-[10px] text-muted-foreground mt-1">
                    {t(tone.exampleMeaning, tone.exampleMeaningEn)}
                  </span>
                  {playingKey === `tone:${tone.example}`
                    ? <Loader2 className="w-3 h-3 text-primary mt-1 animate-spin" />
                    : <Volume2 className="w-3 h-3 text-primary mt-1" />}
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
            {t("Đất nước con người - từ đồng quê đến thành phố", "Land and people - from countryside to city")}
          </p>
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]}
            className="mx-auto max-w-5xl px-10"
          >
            <CarouselContent>
              {[
                { src: "/vietnam-beauty-2.webp", title: t("Ruộng bậc thang Mù Cang Chải", "Mu Cang Chai rice terraces"), caption: t("Những thửa ruộng bậc thang uốn lượn trên sườn núi Yên Bái, đẹp nhất vào mùa lúa chín.", "Terraced fields curving along the mountains of Yen Bai, most stunning in harvest season.") },
                { src: "/vietnam-beauty-11.webp", title: t("Thung lũng Sa Pa", "Sa Pa valley"), caption: t("Ruộng bậc thang Sa Pa soi bóng núi Fansipan - nóc nhà Đông Dương.", "Sa Pa terraces below Fansipan, the highest peak of Indochina.") },
                { src: "/vietnam-beauty-13.webp", title: t("Phố cổ Hà Nội", "Hanoi Old Quarter"), caption: t("Xích lô qua Hồ Gươm - nhịp sống ngàn năm của Thủ đô.", "Cyclos passing Hoan Kiem lake - the thousand-year rhythm of the capital.") },
                { src: "/vietnam-beauty-4.webp", title: t("Vịnh Hạ Long", "Ha Long Bay"), caption: t("Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi giữa làn nước xanh ngọc.", "A UNESCO World Heritage site with thousands of limestone islands in emerald water.") },
                { src: "/vietnam-beauty-5.webp", title: t("Bình minh Bắc Sơn", "Bac Son sunrise"), caption: t("Thung lũng Bắc Sơn (Lạng Sơn) chìm trong sương sớm và ánh nắng đầu ngày.", "Bac Son valley (Lang Son) wrapped in morning mist and first light.") },
                { src: "/vietnam-beauty-14.webp", title: t("Tràng An, Ninh Bình", "Trang An, Ninh Binh"), caption: t("Thuyền nhỏ len qua các hang đá vôi ở quần thể danh thắng Tràng An.", "Boats gliding through limestone caves at the Trang An landscape complex.") },
                { src: "/vietnam-beauty-7.webp", title: t("Kinh thành Huế", "Hue Imperial City"), caption: t("Khinh khí cầu bay trên cố đô Huế - nơi lưu giữ dấu ấn triều Nguyễn.", "Hot-air balloons above the former capital Hue, home of the Nguyen dynasty heritage.") },
                { src: "/vietnam-beauty-10.webp", title: t("Đèn lồng Hội An", "Hoi An lanterns"), caption: t("Phố cổ Hội An lung linh đèn lồng mỗi tối - Di sản Văn hóa Thế giới.", "Hoi An Ancient Town glowing with lanterns every evening - a UNESCO World Heritage site.") },
                { src: "/vietnam-beauty-3.webp", title: t("Nha Trang về đêm", "Nha Trang at night"), caption: t("Thành phố biển rực rỡ ánh đèn bên vịnh Nha Trang.", "The seaside city glowing with lights along Nha Trang Bay.") },
                { src: "/vietnam-beauty-9.webp", title: t("Ngư dân quăng lưới", "Fisherman casting a net"), caption: t("Nghề chài lưới truyền thống gắn bó với đời sống các làng ven biển.", "Traditional net fishing, part of daily life in coastal villages.") },
                { src: "/vietnam-beauty-12.webp", title: t("Chợ nổi miền Tây", "Mekong floating market"), caption: t("Ghe thuyền đầy trái cây trên sông - nhịp sống sông nước của miền Tây Nam Bộ.", "Boats loaded with fruit on the river - the waterway life of the Mekong Delta.") },
                { src: "/vietnam-beauty-6.webp", title: t("Landmark 81, Sài Gòn", "Landmark 81, Saigon"), caption: t("Tòa nhà cao nhất Việt Nam, biểu tượng của TP. Hồ Chí Minh hiện đại.", "Vietnam's tallest building, a symbol of modern Ho Chi Minh City.") },
                { src: "/vietnam-beauty-15.webp", title: t("Hoàng hôn Phú Quốc", "Phu Quoc sunset"), caption: t("Bãi cát trắng và nước biển xanh ngọc trên đảo ngọc Phú Quốc.", "White sand and turquoise water on the pearl island of Phu Quoc.") },
                { src: "/vietnam-beauty-1.webp", title: t("Tuổi thơ đồng quê", "Countryside childhood"), caption: t("Trẻ em chăn trâu trên cánh đồng lúa xanh - hình ảnh quen thuộc của làng quê Việt Nam.", "Children herding buffalo across green rice fields - a classic scene of rural Vietnam.") },
                { src: "/vietnam-beauty-8.webp", title: t("Quốc kỳ Việt Nam", "Flag of Vietnam"), caption: t("Cờ đỏ sao vàng - niềm tự hào của người Việt Nam.", "The red flag with a yellow star - a source of national pride.") },
              ].map((img) => (
                <CarouselItem key={img.src} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <figure className="overflow-hidden rounded-xl border bg-card shadow-md h-full">
                    <img src={img.src} alt={img.title} loading="lazy" className="h-56 w-full object-cover" />
                    <figcaption className="p-4">
                      <p className="font-semibold text-foreground">{img.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{img.caption}</p>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseAlphabet;
