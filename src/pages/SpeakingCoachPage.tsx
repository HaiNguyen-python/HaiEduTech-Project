// Standalone AI Speaking Coach page with gamification integration
import { useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AISpeakingCoach from "@/components/AISpeakingCoach";
import MountainClimber from "@/components/MountainClimber";
import FinnishSkier from "@/components/FinnishSkier";
import GreatWallClimber from "@/components/GreatWallClimber";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic } from "lucide-react";
import { motion } from "framer-motion";

interface FlyingStar {
  id: number;
  startX: number;
  startY: number;
}

const SpeakingCoachPage = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const lang = (language === "chinese" ? "chinese" : language === "finnish" ? "finnish" : "english") as "english" | "finnish" | "chinese";

  // Gamification state
  const [excellentCount, setExcellentCount] = useState(0);
  const [flyingStars, setFlyingStars] = useState<FlyingStar[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const starIdRef = useRef(0);

  const titles: Record<string, { title: string; subtitle: string; back: string }> = {
    english: {
      title: "AI Speaking Coach — English",
      subtitle: t("Luyện phát âm tiếng Anh với trí tuệ nhân tạo", "Practice English pronunciation with AI"),
      back: "/english",
    },
    chinese: {
      title: "AI Speaking Coach — 中文",
      subtitle: t("Luyện phát âm tiếng Trung với trí tuệ nhân tạo", "Practice Chinese pronunciation with AI"),
      back: "/chinese",
    },
    finnish: {
      title: "AI Speaking Coach — Suomi",
      subtitle: t("Luyện phát âm tiếng Phần Lan với trí tuệ nhân tạo", "Practice Finnish pronunciation with AI"),
      back: "/finnish/yki-dashboard",
    },
  };

  const config = titles[lang] || titles.english;

  // Launch a flying star toward the climber
  const handlePerfectScore = useCallback(() => {
    setExcellentCount((c) => c + 1);
    const id = ++starIdRef.current;
    // Start from center of viewport
    setFlyingStars((prev) => [...prev, { id, startX: window.innerWidth / 2, startY: window.innerHeight / 2 }]);
  }, []);

  const handleStarLanded = useCallback((id: number) => {
    setFlyingStars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Total sentences as progress target (approximate)
  const totalTarget = 50;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(config.back)}
          className="mb-4 gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Quay lại", "Go back")}
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            {config.title}
          </h1>
          <p className="text-muted-foreground mt-2">{config.subtitle}</p>
        </motion.div>

        {/* Gamification progress visualizer */}
        {excellentCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6"
          >
            {lang === "english" && (
              <MountainClimber
                mastered={excellentCount}
                total={totalTarget}
                flyingStars={flyingStars}
                onStarLanded={handleStarLanded}
                containerRef={containerRef}
              />
            )}
            {lang === "finnish" && (
              <FinnishSkier
                mastered={excellentCount}
                total={totalTarget}
                flyingStars={flyingStars}
                onStarLanded={handleStarLanded}
                containerRef={containerRef}
              />
            )}
            {lang === "chinese" && (
              <GreatWallClimber
                mastered={excellentCount}
                total={totalTarget}
                flyingStars={flyingStars}
                onStarLanded={handleStarLanded}
                containerRef={containerRef}
              />
            )}
          </motion.div>
        )}

        <AISpeakingCoach language={lang} onPerfectScore={handlePerfectScore} />
      </main>
      <Footer />
    </div>
  );
};

export default SpeakingCoachPage;
