/**
 * @file ScratchAdventure.tsx
 * @description Scratch Coding Adventure — 12 progressive game-building missions for middle-school
 * students. All missions are fully unlocked. Each card opens a detail modal with learning goals,
 * step-by-step block instructions, an "Open in Scratch" launcher, and a star-earning button.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Star,
  Sparkles,
  ArrowLeft,
  Apple,
  Cat,
  Map,
  BookOpen,
  Zap,
  Trophy,
  Play,
  X,
  ExternalLink,
  CheckCircle2,
  Music,
  Ghost,
  Paintbrush,
  Timer,
  Bug,
  Bot,
  Gamepad2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { toast } from "sonner";

// ---------- Mission data ----------
interface Mission {
  id: number;
  title: string;
  subLabel: string;
  description: string;
  icon: typeof Apple;
  emoji: string;
  gradient: string;       // header gradient
  goals: string[];        // learning goals (Vietnamese)
  steps: string[];        // step-by-step block instructions
  scratchUrl: string;     // Scratch project or editor URL
}

// Each mission links to a curated Scratch starter project / tutorial
// so learners land on a relevant example instead of an empty editor.

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Hứng táo rơi",
    subLabel: "BIẾN SỐ ĐẦU TAY",
    description: "Tập làm quen với việc tính điểm khi hứng vật thể.",
    icon: Apple,
    emoji: "🍎",
    gradient: "from-[#FF8C1A] to-[#FFB347]",
    goals: [
      "Hiểu biến (variable) và cách +1 điểm",
      "Dùng khối cảm biến chạm",
      "Khái niệm tọa độ X/Y cơ bản",
    ],
    steps: [
      "Tạo nhân vật Giỏ ở đáy màn hình, di chuyển theo phím Trái/Phải.",
      "Tạo Sprite Quả Táo, dùng 'go to random position' và 'glide' xuống.",
      "Tạo biến 'Điểm'. Khi táo chạm giỏ → 'change Điểm by 1'.",
      "Khi táo chạm mép dưới → 'change Điểm by -1' (trừ mạng).",
      "Trang trí nền và thêm âm thanh 'pop' khi hứng được.",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/10128067/",
  },
  {
    id: 2,
    title: "Mèo bay vượt chướng ngại vật",
    subLabel: "TỌA ĐỘ & TRỌNG LỰC",
    description: "Tự chế tạo một tựa game giống Flappy Bird.",
    icon: Cat,
    emoji: "🐱",
    gradient: "from-[#1E90FF] to-[#38BDF8]",
    goals: [
      "Mô phỏng trọng lực bằng biến vận tốc",
      "Sinh chướng ngại di chuyển liên tục",
      "Phát hiện va chạm với ống cản",
    ],
    steps: [
      "Tạo Mèo. Khi nhấn phím Space → đặt 'velocity = 8'.",
      "Lặp mãi: 'change y by velocity' và 'change velocity by -1' (trọng lực).",
      "Tạo Sprite Ống xanh, clone mỗi 1.5s và glide từ phải sang trái.",
      "Khi Mèo chạm ống hoặc rơi xuống đáy → 'stop all' và hiện 'Game Over'.",
      "Cộng điểm mỗi lần ống biến mất khỏi màn hình.",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/121633270/",
  },
  {
    id: 3,
    title: "Đấu trường mê cung",
    subLabel: "ĐIỀU KHIỂN HƯỚNG",
    description: "Lập trình phím mũi tên để dẫn đường cho nhân vật.",
    icon: Map,
    emoji: "🗺️",
    gradient: "from-[#FFD400] to-[#FFA500]",
    goals: [
      "Điều khiển 4 hướng bằng phím mũi tên",
      "Dò va chạm theo màu (tường mê cung)",
      "Mục tiêu thắng/thua rõ ràng",
    ],
    steps: [
      "Vẽ phông nền mê cung bằng các bức tường màu đen.",
      "Tạo Sprite chính nhỏ. Khi mũi tên Phải → 'change x by 4'… (4 hướng).",
      "Sau mỗi bước, nếu 'touching color đen' → 'change x/y' ngược lại.",
      "Đặt một ngôi sao 🌟 đích. Khi chạm sao → hiện 'Bạn thắng!'.",
      "Thêm đồng hồ đếm ngược 30s để tăng độ căng thẳng.",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/10015963/",
  },
  {
    id: 4,
    title: "Vòng quay tiếng Anh",
    subLabel: "GAME TỪ VỰNG",
    description: "Chế tạo trò chơi trắc nghiệm tiếng Anh tương tác vui nhộn.",
    icon: BookOpen,
    emoji: "🎡",
    gradient: "from-[#10B981] to-[#34D399]",
    goals: [
      "Dùng danh sách (list) chứa từ vựng",
      "Dùng khối 'ask … and wait' để nhận câu trả lời",
      "Đếm số câu đúng / sai",
    ],
    steps: [
      "Tạo 2 list: 'Từ EN' và 'Nghĩa VN' (cùng thứ tự).",
      "Tạo biến 'i' = ngẫu nhiên trong khoảng số từ.",
      "'ask (item i of Từ EN) and wait' rồi so sánh với 'item i of Nghĩa VN'.",
      "Nếu đúng → cộng điểm và phát tiếng vỗ tay; sai → hiệu ứng buồn.",
      "Tạo vòng lặp 10 câu rồi hiện điểm tổng kết.",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/352620051/",
  },
  {
    id: 5,
    title: "Né thiên thạch",
    subLabel: "CLONE BULLETS",
    description: "Học cách nhân bản thực thể để làm game bắn tàu vũ trụ.",
    icon: Zap,
    emoji: "☄️",
    gradient: "from-[#A855F7] to-[#EC4899]",
    goals: [
      "Sử dụng 'create clone of myself'",
      "Quản lý nhiều thực thể cùng lúc",
      "Game vòng lặp với HP và điểm số",
    ],
    steps: [
      "Tạo Tàu vũ trụ, di chuyển ngang bằng phím mũi tên.",
      "Khi nhấn Space → 'create clone of Đạn'. Clone bay lên trên.",
      "Tạo Thiên thạch ở trên, clone mỗi 1s và rơi xuống.",
      "Khi đạn chạm thiên thạch → 'delete this clone' + cộng điểm.",
      "Khi tàu chạm thiên thạch → mất HP, HP=0 thì 'Game Over'.",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/11414041/",
  },
  {
    id: 6,
    title: "Sáng tạo tự do",
    subLabel: "ĐỒ ÁN CUỐI KHÓA",
    description: "Nơi học sinh tự nộp link sản phẩm game của riêng mình.",
    icon: Trophy,
    emoji: "🏆",
    gradient: "from-[#F43F5E] to-[#FB7185]",
    goals: [
      "Tự lên ý tưởng game",
      "Áp dụng kỹ năng đã học từ 5 nhiệm vụ trước",
      "Trình bày & chia sẻ link sản phẩm",
    ],
    steps: [
      "Chọn 1 thể loại: arcade, mê cung, quiz, platformer…",
      "Vẽ ít nhất 2 sprite và 2 phông nền riêng.",
      "Có biến điểm số + điều kiện thắng/thua rõ ràng.",
      "Thêm âm thanh và hiệu ứng đẹp mắt.",
      "Bấm 'Share' trên Scratch rồi gửi link cho Thầy Hải.",
    ],
    scratchUrl: "https://scratch.mit.edu/ideas",
  },
  {
    id: 7,
    title: "Ban nhạc Scratch",
    subLabel: "ÂM NHẠC & LẶP",
    description: "Lập trình một dàn trống tự động phát giai điệu vui tai.",
    icon: Music,
    emoji: "🥁",
    gradient: "from-[#06B6D4] to-[#0EA5E9]",
    goals: [
      "Sử dụng extension Music của Scratch",
      "Vòng lặp 'repeat' để tạo nhịp",
      "Phối hợp nhiều sprite cùng lúc",
    ],
    steps: [
      "Bật extension 'Music' ở góc dưới trái.",
      "Tạo 3 sprite: Trống, Phách, Piano. Mỗi sprite có vòng lặp riêng.",
      "Dùng 'play drum (1) for 0.25 beats' theo mẫu nhịp 4/4.",
      "Cho Piano chơi giai điệu C-D-E-F-G bằng 'play note'.",
      "Khi nhấn cờ xanh → cả 3 sprite cùng phát nhạc liên tục.",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/editor/?tutorial=music",
  },
  {
    id: 8,
    title: "Săn ma trong đêm",
    subLabel: "HIỆN/ẨN & ĐIỂM",
    description: "Game whack-a-mole phiên bản Halloween đầy bí ẩn.",
    icon: Ghost,
    emoji: "👻",
    gradient: "from-[#7C3AED] to-[#A855F7]",
    goals: [
      "Dùng 'show' / 'hide' và 'go to random position'",
      "Lắng nghe sự kiện click chuột",
      "Đồng hồ đếm ngược",
    ],
    steps: [
      "Tạo Sprite Ma. Lặp: hiện, đợi 0.8s, ẩn, đợi ngẫu nhiên.",
      "Mỗi lần hiện, 'go to random position' trong khung sân.",
      "Khi 'this sprite clicked' → cộng điểm + phát âm 'boom'.",
      "Tạo biến 'Thời gian' = 30, mỗi giây giảm 1.",
      "Khi Thời gian = 0 → 'stop all' và hiện điểm cuối.",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/22162144/",
  },
  {
    id: 9,
    title: "Studio vẽ tự do",
    subLabel: "BÚT VẼ (PEN)",
    description: "Biến chuột thành cây cọ vẽ với bảng màu cầu vồng.",
    icon: Paintbrush,
    emoji: "🎨",
    gradient: "from-[#F59E0B] to-[#EF4444]",
    goals: [
      "Sử dụng extension Pen",
      "Theo dõi vị trí chuột",
      "Thay đổi màu và độ dày nét vẽ",
    ],
    steps: [
      "Bật extension 'Pen'. Tạo Sprite Cọ nhỏ.",
      "Lặp mãi: 'go to mouse pointer'.",
      "Nếu 'mouse down?' → 'pen down', ngược lại → 'pen up'.",
      "Mỗi tick → 'change pen color by 2' để có cầu vồng.",
      "Phím C → 'erase all' để xóa toàn bộ tranh.",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/editor/?tutorial=pen",
  },
  {
    id: 10,
    title: "Đua xe đếm giờ",
    subLabel: "TIMER & TỐC ĐỘ",
    description: "Lập trình một game đua xe tính thời gian về đích nhanh nhất.",
    icon: Timer,
    emoji: "🏎️",
    gradient: "from-[#EF4444] to-[#F97316]",
    goals: [
      "Dùng 'timer' và 'reset timer'",
      "Cập nhật tốc độ theo gia tốc",
      "Phát hiện vạch đích bằng màu",
    ],
    steps: [
      "Vẽ đường đua hình bầu dục với vạch xuất phát màu trắng.",
      "Tạo Xe với biến 'tốc độ' = 0; phím Lên → 'change tốc độ by 0.5'.",
      "Lặp: 'move (tốc độ) steps' và 'change tốc độ by -0.05' (ma sát).",
      "Mũi tên Trái/Phải → 'turn ±5 degrees'.",
      "Sau khi rời vạch, khi chạm lại vạch → hiện 'timer' rồi 'reset timer'.",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/148628377/",
  },
  {
    id: 11,
    title: "Toán Ninja",
    subLabel: "TOÁN HỌC TRONG GAME",
    description: "Trò chơi rèn nhẩm phép tính cho người chơi mọi lứa tuổi.",
    icon: Bug,
    emoji: "🧮",
    gradient: "from-[#22C55E] to-[#16A34A]",
    goals: [
      "Sinh số ngẫu nhiên",
      "So sánh đáp án người dùng nhập",
      "Quản lý điểm & combo",
    ],
    steps: [
      "Tạo biến 'a', 'b' = random 1..20; chọn ngẫu nhiên phép +, −, ×.",
      "Hiển thị 'a ? b = ?' và 'ask … and wait'.",
      "Tự tính đáp án đúng và so với câu trả lời.",
      "Đúng → +10 điểm, combo +1; Sai → reset combo về 0.",
      "Lặp 10 câu rồi tổng kết điểm theo cấp bậc (Ninja Trắng → Đỏ).",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/120796408/",
  },
  {
    id: 12,
    title: "Chatbot mèo thông minh",
    subLabel: "AI ĐẦU TAY",
    description: "Lập trình một chatbot biết trả lời những câu hỏi đơn giản.",
    icon: Bot,
    emoji: "🤖",
    gradient: "from-[#0EA5E9] to-[#6366F1]",
    goals: [
      "Dùng cấu trúc 'if/else if'",
      "Nhận đầu vào từ người dùng",
      "Khái niệm 'pattern matching' đơn giản",
    ],
    steps: [
      "Mèo nói 'Xin chào! Bạn muốn hỏi gì?' rồi 'ask … and wait'.",
      "Nếu 'answer contains tên' → trả lời 'Tớ tên là Scratchy'.",
      "Nếu 'contains thời tiết' → 'Hôm nay nắng đẹp lắm!'.",
      "Nếu không khớp → 'Xin lỗi, tớ chưa hiểu, hỏi lại nhé.'",
      "Lặp lại vòng hỏi-đáp cho tới khi người dùng gõ 'bye'.",
    ],
    scratchUrl: "https://scratch.mit.edu/projects/532898299/",
  },
];

const STORAGE_KEY = "haiedu_scratch_adventure_stars_v2";
type StarsMap = Record<number, number>;

const ScratchAdventure = () => {
  const [stars, setStars] = useState<StarsMap>({});
  const [openMission, setOpenMission] = useState<Mission | null>(null);

  // Load locally-saved stars
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStars(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (openMission) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [openMission]);

  const persist = (next: StarsMap) => {
    setStars(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const totalStars = useMemo(
    () => Object.values(stars).reduce((a, b) => a + Math.min(3, b || 0), 0),
    [stars],
  );
  const completedMissions = useMemo(
    () => Object.values(stars).filter((s) => (s || 0) >= 1).length,
    [stars],
  );
  const progressPct = (completedMissions / MISSIONS.length) * 100;

  const handleEarnStar = (m: Mission) => {
    const current = stars[m.id] || 0;
    if (current >= 3) {
      toast.success("Bạn đã đạt 3 sao tối đa cho nhiệm vụ này! 🌟");
      return;
    }
    persist({ ...stars, [m.id]: current + 1 });
    toast.success(`+1 sao cho "${m.title}"! 🌟`);
  };

  const handleResetMission = (m: Mission) => {
    const next = { ...stars };
    delete next[m.id];
    persist(next);
    toast.message("Đã đặt lại tiến độ nhiệm vụ.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7EC] via-background to-background dark:from-[#1a120a]">
      <SEO
        title="Scratch Coding Adventure | HaiEduTech"
        description="12 nhiệm vụ lập trình Scratch sáng tạo cho học sinh cấp 2: từ hứng táo, Flappy Cat, mê cung, vòng quay từ vựng, né thiên thạch đến chatbot và đồ án tự do."
        path="/programming/scratch-adventure"
      />
      <Navbar />

      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Back link */}
          <Link
            to="/programming"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-[#FF8C1A] transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Programming Hub
          </Link>

          {/* ===== Progress Banner ===== */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border-2 border-[#FF8C1A]/40 bg-gradient-to-r from-[#FF8C1A] via-[#FFB347] to-[#FFD400] text-white p-5 sm:p-7 shadow-xl mb-8"
          >
            <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 w-56 h-56 rounded-full bg-[#1E90FF]/30 blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-center gap-5">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center text-4xl sm:text-5xl shrink-0 ring-4 ring-white/30"
                aria-hidden
              >
                🐱
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/25 backdrop-blur text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" /> Scratch Coding Adventure · Cấp 2
                </div>
                <h1 className="font-display font-black text-2xl sm:text-4xl leading-tight mb-1 drop-shadow">
                  Phiêu lưu lập trình Scratch{" "}
                  <Rocket className="inline-block w-7 h-7 sm:w-9 sm:h-9 -mt-1" />
                </h1>
                <p className="text-white/95 text-xs sm:text-sm max-w-xl">
                  {MISSIONS.length} nhiệm vụ chế tạo game thật — tất cả đã mở khóa hoàn toàn! Bấm vào bất kỳ thẻ nào để bắt đầu.
                </p>

                <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-[#FF8C1A] font-extrabold text-xs sm:text-sm shadow-md">
                    <Rocket className="w-4 h-4" />
                    Nhiệm vụ hoàn thành: {completedMissions}/{MISSIONS.length}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-[#1E40AF] font-extrabold text-xs sm:text-sm shadow-md">
                    <Star className="w-4 h-4 fill-[#FFD400] text-[#FFB300]" />
                    Sao Scratch: {totalStars}/{MISSIONS.length * 3}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md">
                    <Gamepad2 className="w-4 h-4" />
                    100% MIỄN PHÍ
                  </div>
                </div>

                <div className="mt-3 h-2.5 w-full rounded-full bg-white/30 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-white to-[#FFD400] rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* ===== Missions Grid ===== */}
          <section aria-label="Coding missions">
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF8C1A]" />
              {MISSIONS.length} Nhiệm vụ chế tạo game
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {MISSIONS.map((m, idx) => {
                const earned = Math.min(3, stars[m.id] || 0);
                const Icon = m.icon;

                return (
                  <motion.button
                    key={m.id}
                    type="button"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: Math.min(idx, 6) * 0.06,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOpenMission(m)}
                    className="group relative text-left rounded-3xl overflow-hidden border-2 border-white/60 dark:border-white/10 bg-white dark:bg-card shadow-md hover:shadow-2xl transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8C1A]/40"
                  >
                    {/* Color header */}
                    <div className={`relative h-28 bg-gradient-to-br ${m.gradient} p-4 flex items-start justify-between`}>
                      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_20%,white_0%,transparent_45%)]" />
                      <div className="relative flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/30 backdrop-blur flex items-center justify-center text-2xl ring-2 ring-white/50">
                          <span aria-hidden>{m.emoji}</span>
                        </div>
                        <div className="text-white">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-95">
                            Nhiệm vụ {m.id}
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-wider bg-black/15 inline-block px-1.5 py-0.5 rounded mt-0.5">
                            {m.subLabel}
                          </div>
                        </div>
                      </div>

                      <span className="relative inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white text-[#10B981] text-[10px] font-black uppercase shadow">
                        <Play className="w-3 h-3 fill-current" /> FREE
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start gap-2 mb-2">
                        <Icon className="w-5 h-5 text-[#FF8C1A] shrink-0 mt-0.5" />
                        <h3 className="font-display font-extrabold text-base sm:text-lg text-foreground leading-tight">
                          {m.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed min-h-[40px]">
                        {m.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex gap-1" aria-label={`Đã đạt ${earned} trên 3 sao`}>
                          {[0, 1, 2].map((i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 transition ${
                                i < earned
                                  ? "fill-[#FFD400] text-[#FFB300] drop-shadow"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold text-[#FF8C1A] group-hover:translate-x-0.5 transition">
                          Bắt đầu →
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* ===== Mission Detail Modal ===== */}
      <AnimatePresence>
        {openMission && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpenMission(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 24, stiffness: 280 }}
              className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl"
            >
              {/* Header */}
              <div className={`relative rounded-t-3xl bg-gradient-to-r ${openMission.gradient} text-white px-5 sm:px-7 py-5`}>
                <button
                  onClick={() => setOpenMission(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center text-3xl ring-2 ring-white/40">
                    {openMission.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-95">
                      Nhiệm vụ {openMission.id} · {openMission.subLabel}
                    </div>
                    <h3 className="font-display font-black text-xl sm:text-2xl leading-tight">
                      {openMission.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 sm:px-7 py-5 space-y-5">
                <p className="text-sm text-foreground leading-relaxed">
                  {openMission.description}
                </p>

                {/* Goals */}
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#FF8C1A] mb-2">
                    🎯 Mục tiêu học tập
                  </div>
                  <ul className="space-y-1.5">
                    {openMission.goals.map((g, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#1E90FF] mb-2">
                    🧱 Hướng dẫn từng bước
                  </div>
                  <ol className="space-y-2">
                    {openMission.steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF8C1A] to-[#F43F5E] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed pt-0.5">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Stars row */}
                <div className="rounded-2xl border-2 border-amber-300/50 bg-amber-50 dark:bg-amber-950/20 p-4 flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-xs font-bold text-foreground">Tiến độ của bạn</div>
                    <div className="flex gap-1 mt-1">
                      {[0, 1, 2].map((i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.min(3, stars[openMission.id] || 0)
                              ? "fill-[#FFD400] text-[#FFB300]"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(stars[openMission.id] || 0) > 0 && (
                      <button
                        onClick={() => handleResetMission(openMission)}
                        className="px-3 py-2 rounded-xl border border-border bg-background text-xs font-bold text-muted-foreground hover:text-foreground transition"
                      >
                        Đặt lại
                      </button>
                    )}
                    <button
                      onClick={() => handleEarnStar(openMission)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold shadow hover:brightness-110 transition flex items-center gap-1.5"
                    >
                      <Star className="w-4 h-4 fill-white" /> +1 Sao
                    </button>
                  </div>
                </div>

                {/* CTA: Open in Scratch */}
                <a
                  href={openMission.scratchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF8C1A] to-[#F43F5E] text-white font-extrabold text-sm shadow-lg hover:brightness-110 active:scale-[0.98] transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Mở Scratch & bắt đầu code
                </a>
                <p className="text-[11px] text-center text-muted-foreground -mt-2">
                  Sẽ mở trình soạn thảo Scratch chính thức trong tab mới.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScratchAdventure;
