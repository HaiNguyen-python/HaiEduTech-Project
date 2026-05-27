/**
 * @file ScratchAdventure.tsx
 * @description Scratch Coding Adventure dashboard — 6 progressive game-building missions
 * for middle-school students. Missions 1-2 are free; Missions 3-6 open the Premium upgrade modal.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Rocket,
  Star,
  Lock,
  Sparkles,
  ArrowLeft,
  Apple,
  Cat,
  Map,
  BookOpen,
  Zap,
  Trophy,
  Play,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import UpgradeAccountModal from "@/components/UpgradeAccountModal";
import { useUserRole } from "@/hooks/useUserRole";

// ---------- Mission data ----------
interface Mission {
  id: number;
  title: string;
  subLabel: string;
  description: string;
  icon: typeof Apple;
  emoji: string;
  gradient: string;     // card gradient (tailwind from-x to-y)
  ring: string;         // ring/border accent
  free: boolean;
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Hứng táo rơi",
    subLabel: "BIẾN SỐ ĐẦU TAY",
    description: "Tập làm quen với việc tính điểm khi hứng vật thể.",
    icon: Apple,
    emoji: "🍎",
    gradient: "from-[#FF8C1A] to-[#FFB347]",
    ring: "ring-[#FF8C1A]/40",
    free: true,
  },
  {
    id: 2,
    title: "Mèo bay vượt chướng ngại vật",
    subLabel: "TỌA ĐỘ & TRỌNG LỰC",
    description: "Tự chế tạo một tựa game giống Flappy Bird.",
    icon: Cat,
    emoji: "🐱",
    gradient: "from-[#1E90FF] to-[#38BDF8]",
    ring: "ring-[#1E90FF]/40",
    free: true,
  },
  {
    id: 3,
    title: "Đấu trường mê cung",
    subLabel: "ĐIỀU KHIỂN HƯỚNG",
    description: "Lập trình phím mũi tên để dẫn đường cho nhân vật.",
    icon: Map,
    emoji: "🗺️",
    gradient: "from-[#FFD400] to-[#FFA500]",
    ring: "ring-[#FFD400]/40",
    free: false,
  },
  {
    id: 4,
    title: "Vòng quay tiếng Anh",
    subLabel: "GAME TỪ VỰNG",
    description: "Chế tạo trò chơi trắc nghiệm tiếng Anh tương tác vui nhộn.",
    icon: BookOpen,
    emoji: "🎡",
    gradient: "from-[#10B981] to-[#34D399]",
    ring: "ring-[#10B981]/40",
    free: false,
  },
  {
    id: 5,
    title: "Né thiên thạch",
    subLabel: "CLONE BULLETS",
    description: "Học cách nhân bản thực thể để làm game bắn tàu vũ trụ.",
    icon: Zap,
    emoji: "☄️",
    gradient: "from-[#A855F7] to-[#EC4899]",
    ring: "ring-[#A855F7]/40",
    free: false,
  },
  {
    id: 6,
    title: "Sáng tạo tự do",
    subLabel: "ĐỒ ÁN CUỐI KHÓA",
    description: "Nơi học sinh tự nộp link sản phẩm game của riêng mình.",
    icon: Trophy,
    emoji: "🏆",
    gradient: "from-[#F43F5E] to-[#FB7185]",
    ring: "ring-[#F43F5E]/40",
    free: false,
  },
];

const STORAGE_KEY = "haiedu_scratch_adventure_stars_v1";

// Star count per mission (0..3)
type StarsMap = Record<number, number>;

const ScratchAdventure = () => {
  const { user } = useUserRole();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [stars, setStars] = useState<StarsMap>({});

  // Load locally-saved stars
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStars(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const totalStars = useMemo(
    () => Object.values(stars).reduce((a, b) => a + Math.min(3, b || 0), 0),
    [stars],
  );
  const completedMissions = useMemo(
    () => Object.values(stars).filter((s) => (s || 0) >= 1).length,
    [stars],
  );
  const progressPct = (completedMissions / MISSIONS.length) * 100;

  const handleMissionClick = (m: Mission) => {
    if (!m.free) {
      setUpgradeOpen(true);
      return;
    }
    // Free placeholder: mark first star earned (visit credit) so progress feels alive.
    setStars((prev) => {
      const next = { ...prev, [m.id]: Math.max(prev[m.id] || 0, 1) };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7EC] via-background to-background dark:from-[#1a120a]">
      <SEO
        title="Scratch Coding Adventure | HaiEduTech"
        description="6 nhiệm vụ lập trình Scratch sáng tạo cho học sinh cấp 2: từ hứng táo, Flappy Cat, mê cung, vòng quay từ vựng đến né thiên thạch và đồ án tự do."
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
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 w-56 h-56 rounded-full bg-[#1E90FF]/30 blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-center gap-5">
              {/* Mascot */}
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
                  6 nhiệm vụ chế tạo game thật từ con số 0 — kéo thả khối, học biến số, tọa độ, điều khiển và sáng tạo!
                </p>

                {/* Stats */}
                <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-[#FF8C1A] font-extrabold text-xs sm:text-sm shadow-md">
                    <Rocket className="w-4 h-4" />
                    Nhiệm vụ hoàn thành: {completedMissions}/{MISSIONS.length}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-[#1E40AF] font-extrabold text-xs sm:text-sm shadow-md">
                    <Star className="w-4 h-4 fill-[#FFD400] text-[#FFB300]" />
                    Sao Scratch: {totalStars}/{MISSIONS.length * 3}
                  </div>
                </div>

                {/* Progress bar */}
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
              6 Nhiệm vụ chế tạo game
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {MISSIONS.map((m, idx) => {
                const earned = Math.min(3, stars[m.id] || 0);
                const Icon = m.icon;
                const locked = !m.free;

                return (
                  <motion.button
                    key={m.id}
                    type="button"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: idx * 0.07,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMissionClick(m)}
                    className={`group relative text-left rounded-3xl overflow-hidden border-2 border-white/60 dark:border-white/10 bg-white dark:bg-card shadow-md hover:shadow-2xl transition-shadow ring-2 ring-transparent hover:${m.ring} focus:outline-none focus-visible:ring-4 focus-visible:${m.ring}`}
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

                      {/* Free / Lock badge */}
                      <div className="relative">
                        {m.free ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white text-[#10B981] text-[10px] font-black uppercase shadow">
                            <Play className="w-3 h-3 fill-current" /> FREE
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur text-white text-[10px] font-black uppercase shadow">
                            <Lock className="w-3 h-3" /> Premium
                          </span>
                        )}
                      </div>
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

                      {/* Stars */}
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
                          {locked ? "Mở khóa →" : "Bắt đầu →"}
                        </span>
                      </div>
                    </div>

                    {/* Lock overlay for premium missions */}
                    {locked && (
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 dark:to-black/40" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* Premium teaser CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 rounded-2xl border-2 border-amber-400/40 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 p-5 flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="text-4xl">🚀</div>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-display font-extrabold text-foreground">
                Mở khóa toàn bộ 6 nhiệm vụ Scratch (và hơn thế!)
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Chỉ với phí Premium VĨNH VIỄN — học trọn đời, làm trọn 6 game.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setUpgradeOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C1A] to-[#F43F5E] text-white font-extrabold text-sm shadow-lg hover:brightness-110 active:scale-[0.98] transition"
            >
              Nâng cấp Premium
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />

      <UpgradeAccountModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        user={user ? { id: user.id, email: user.email } : null}
      />
    </div>
  );
};

export default ScratchAdventure;
