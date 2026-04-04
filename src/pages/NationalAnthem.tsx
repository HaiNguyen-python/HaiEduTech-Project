import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Music, Star, Flag, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import flagWaving from "@/assets/vietnam-flag-waving.jpg";
import soldierFlag from "@/assets/soldier-flag.png";

// Lyrics data with timestamps (approximate seconds for karaoke highlighting)
const lyricsLines = [
  { text: "Đoàn quân Việt Nam đi", start: 0, end: 4, icon: "⚔️" },
  { text: "Chung lòng cứu quốc", start: 4, end: 7, icon: "🛡️" },
  { text: "Bước chân dồn vang trên đường gập ghềnh xa", start: 7, end: 12, icon: "🥾" },
  { text: "Cờ in máu chiến thắng mang hồn nước", start: 12, end: 17, icon: "🚩" },
  { text: "Súng ngoài xa chen khúc quân hành ca", start: 17, end: 22, icon: "🎵" },
  { text: "Đường vinh quang xây xác quân thù", start: 22, end: 27, icon: "🏆" },
  { text: "Thắng gian lao cùng nhau lập chiến khu", start: 27, end: 32, icon: "⛰️" },
  { text: "Vì nhân dân chiến đấu không ngừng", start: 32, end: 37, icon: "✊" },
  { text: "Tiến mau ra sa trường", start: 37, end: 40, icon: "🔥" },
  { text: "Tiến lên! Cùng tiến lên!", start: 40, end: 44, icon: "🎺" },
  { text: "Nước non Việt Nam ta vững bền.", start: 44, end: 50, icon: "⭐" },
];

// Key vocabulary from the anthem
const vocabItems = [
  {
    word: "Đoàn quân",
    meaning: "Đội ngũ binh lính, lực lượng quân sự",
    english: "Army / Troops",
    context: "Chỉ đội quân giải phóng Việt Nam tiến bước.",
  },
  {
    word: "Cứu quốc",
    meaning: "Cứu đất nước khỏi nguy hiểm",
    english: "Save the nation",
    context: "Thể hiện tinh thần yêu nước, bảo vệ Tổ quốc.",
  },
  {
    word: "Chiến thắng",
    meaning: "Giành được thắng lợi trong chiến đấu",
    english: "Victory",
    context: "Niềm tin vào chiến thắng cuối cùng của dân tộc.",
  },
  {
    word: "Vinh quang",
    meaning: "Sự vẻ vang, danh dự cao quý",
    english: "Glory",
    context: "Con đường đấu tranh tuy gian khổ nhưng đầy vinh quang.",
  },
  {
    word: "Chiến khu",
    meaning: "Khu vực căn cứ quân sự trong kháng chiến",
    english: "War zone / Base",
    context: "Nơi lực lượng kháng chiến tập trung và hoạt động.",
  },
];

const VIDEO_ID = "SK6rHXlKC0A";
const LYRICS_DELAY_MS = 3000;

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

const NationalAnthem = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showSalute, setShowSalute] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, []);

  const createPlayer = () => {
    if (playerRef.current) return;
    playerRef.current = new window.YT.Player("yt-player", {
      videoId: VIDEO_ID,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        enablejsapi: 1,
      },
      events: {
        onReady: () => setPlayerReady(true),
      },
    });
  };

  // Determine which lyric line is active
  const activeLineIndex = lyricsLines.findIndex(
    (line) => currentTime >= line.start && currentTime < line.end
  );

  const startLyricsTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= 50) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.5;
      });
    }, 500);
    timerRef.current = interval;
  }, []);

  const handleStart = useCallback(() => {
    if (!playerRef.current) return;
    // Play YouTube video immediately
    playerRef.current.playVideo();
    setIsPlaying(true);
    setCurrentTime(0);

    // Clear any existing timers
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    // Start lyrics after 3s delay
    delayTimerRef.current = setTimeout(() => {
      startLyricsTimer();
    }, LYRICS_DELAY_MS);
  }, [startLyricsTimer]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (playerRef.current) playerRef.current.pauseVideo();
    if (timerRef.current) clearInterval(timerRef.current);
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
  }, []);

  const handleReplay = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(false);
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.pauseVideo();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    };
  }, []);

  // Salute animation with trumpet sound
  const handleSalute = useCallback(() => {
    setShowSalute(true);
    try {
      const ctx = new AudioContext();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.3 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.3);
        osc.stop(ctx.currentTime + i * 0.3 + 0.5);
      });
    } catch { /* audio not available */ }
    setTimeout(() => setShowSalute(false), 4000);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Salute fullscreen overlay */}
      <AnimatePresence>
        {showSalute && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: "linear-gradient(180deg, #da251d 0%, #c41e1a 100%)" }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-yellow-300 hover:text-white"
              onClick={() => setShowSalute(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <Star className="w-32 h-32 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-yellow-300 text-3xl md:text-5xl font-bold text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                🇻🇳 Chào cờ! 🇻🇳
              </motion.p>
              <p className="text-yellow-200/80 text-lg">Tổ quốc Việt Nam muôn năm!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ background: "linear-gradient(135deg, #da251d 0%, #da251d 100%)" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
          <Star className="w-[400px] h-[400px] text-yellow-500 fill-yellow-500" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-red-600/10 text-red-700 border-red-200 text-sm">
              <Flag className="w-3.5 h-3.5 mr-1" /> Quốc ca Việt Nam
            </Badge>
            <div className="flex items-center justify-center gap-4">
              <h1
                className="text-3xl md:text-5xl font-bold text-foreground"
                style={{ fontFamily: "'Playfair Display', 'Noto Serif', serif" }}
              >
                Tiến Quân Ca
              </h1>
              <motion.img
                src={soldierFlag}
                alt="Chú bộ đội cầm cờ Việt Nam"
                className="w-20 h-20 md:w-28 md:h-28 object-contain"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                width={112}
                height={112}
              />
            </div>
            <p className="text-muted-foreground text-lg md:text-xl">
              Quốc ca nước Cộng hòa Xã hội Chủ nghĩa Việt Nam
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">

          {/* Left column: Video + Controls */}
          <div className="lg:col-span-3 space-y-6">
            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.img
                src={flagWaving}
                alt="Quốc kỳ Việt Nam tung bay trên Quảng trường Ba Đình"
                className="w-full rounded-xl shadow-lg object-cover max-h-[360px]"
                width={1280}
                height={720}
                animate={{ scale: [1, 1.015, 1], y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Video Player */}
            <Card className="overflow-hidden border-red-100">
              <div className="aspect-video">
                <div id="yt-player" ref={playerContainerRef} className="w-full h-full" />
              </div>

              {/* Controls bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/50">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={isPlaying ? "secondary" : "default"}
                    onClick={isPlaying ? handlePause : handleStart}
                    disabled={!playerReady}
                    className="gap-1.5"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? "Tạm dừng" : "Bắt đầu"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleReplay} className="gap-1.5">
                    <RotateCcw className="w-4 h-4" /> Lại từ đầu
                  </Button>
                </div>
              </div>
            </Card>

            {/* Context box */}
            <Card className="p-6 border-amber-200 bg-amber-50/50">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-2">📜 Bối cảnh lịch sử</h3>
                  <p className="text-base text-foreground/90 leading-relaxed">
                    "Tiến Quân Ca" được nhạc sĩ <strong>Văn Cao</strong> sáng tác vào năm <strong>1944</strong>,
                    trong thời kỳ kháng chiến chống Pháp. Bài hát lần đầu được công bố trên báo
                    Độc Lập và sau đó được chọn làm Quốc ca của nước Việt Nam Dân chủ Cộng hòa
                    ngày <strong>13 tháng 8 năm 1945</strong>.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right column: Lyrics + Vocabulary */}
          <div className="lg:col-span-2 space-y-6">

            {/* Lyrics panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 border-red-100">
                <div className="flex items-center justify-between mb-5">
                  <h2
                    className="text-xl font-bold text-foreground flex items-center gap-2"
                    style={{ fontFamily: "'Playfair Display', 'Noto Serif', serif" }}
                  >
                    <Music className="w-5 h-5 text-red-600" />
                    Lời bài hát
                  </h2>
                  {isPlaying && (
                    <span className="flex items-center gap-1.5 text-sm text-red-600 font-medium">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Đang phát
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {lyricsLines.map((line, i) => {
                    const isActive = i === activeLineIndex;
                    return (
                      <motion.p
                        key={i}
                        className={`transition-all duration-300 rounded-md px-3 py-1.5 font-semibold ${
                          isActive
                            ? "bg-red-600 text-white font-bold scale-[1.02] shadow-md"
                            : "text-foreground"
                        }`}
                        style={{
                          fontFamily: "'Playfair Display', 'Noto Serif', serif",
                          fontSize: isActive ? "22px" : "20px",
                          lineHeight: 1.6,
                        }}
                      >
                        <span className="mr-1.5">{line.icon}</span>{line.text}
                      </motion.p>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Vocabulary section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="p-6 border-amber-100">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  📖 Từ vựng trọng tâm
                </h2>
                <div className="space-y-3">
                  {vocabItems.map((item) => (
                    <HoverCard key={item.word} openDelay={200}>
                      <HoverCardTrigger asChild>
                        <button className="w-full text-left p-3 rounded-lg border border-border hover:border-red-200 hover:bg-red-50/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">{item.word}</span>
                            <Badge variant="outline" className="text-xs">
                              {item.english}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.meaning}</p>
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-72">
                        <div className="space-y-2">
                          <p className="font-semibold text-foreground">{item.word}</p>
                          <p className="text-sm text-muted-foreground">{item.context}</p>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            {item.english}
                          </Badge>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Salute button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSalute}
                  className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white h-12 text-base"
                >
                  <Flag className="w-5 h-5" />
                  🎺 Chào cờ!
                </Button>
              </TooltipTrigger>
              <TooltipContent>Nhấn để chào cờ Tổ quốc</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NationalAnthem;
