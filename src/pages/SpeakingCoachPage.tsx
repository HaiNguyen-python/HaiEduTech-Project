// Standalone AI Speaking Coach page with gamification integration
import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AISpeakingCoach from "@/components/AISpeakingCoach";
import ShadowingMode from "@/components/speaking/ShadowingMode";
import SoundDrillMode from "@/components/speaking/SoundDrillMode";
import FreeTalkMode from "@/components/speaking/FreeTalkMode";
import WeakWordReview from "@/components/speaking/WeakWordReview";
import SpeakWithMrHaiMode from "@/components/speaking/SpeakWithMrHaiMode";
import SpeakingOverview from "@/components/speaking/SpeakingOverview";
import { ActivityChips, type SpeakingActivity } from "@/components/speaking/ActivityPicker";
import type { PlanMode } from "@/lib/speaking/pronunciationPlan";
import { allPronWords, loadPronStats } from "@/lib/speaking/pronunciationStats";
import { countWeakWords, SPEAKING_PROGRESS_EVENT } from "@/lib/speakingWeakWords";
import { stopSpeakingTts } from "@/lib/speakingModeShared";
import { Badge } from "@/components/ui/badge";
import MountainClimber from "@/components/MountainClimber";
import FinnishSkier from "@/components/FinnishSkier";
import GreatWallClimber from "@/components/GreatWallClimber";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import speakingCoachBanner from "@/assets/speaking-coach-mr-hai-banner.jpg";


interface FlyingStar {
  id: number;
  startX: number;
  startY: number;
}

const SpeakingCoachPage = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const lang = (language === "japanese" ? "japanese" : language === "chinese" ? "chinese" : language === "finnish" ? "finnish" : language === "swedish" ? "swedish" : language === "vietnamese" ? "vietnamese" : "english") as "english" | "finnish" | "swedish" | "chinese" | "vietnamese" | "japanese";

  // Gamification state
  const [excellentCount, setExcellentCount] = useState(0);
  const [flyingStars, setFlyingStars] = useState<FlyingStar[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const starIdRef = useRef(0);
  const [view, setView] = useState<"overview" | "practice">("overview");
  const [activity, setActivity] = useState<SpeakingActivity>("sentences");
  const [weakCount, setWeakCount] = useState(() => countWeakWords(lang));
  const [hasStats, setHasStats] = useState(() => allPronWords(loadPronStats(lang)).length > 0);

  useEffect(() => {
    setHasStats(allPronWords(loadPronStats(lang)).length > 0);
    setWeakCount(countWeakWords(lang));
  }, [lang, view]);

  useEffect(() => {
    const refreshProgress = (event: Event) => {
      const detail = (event as CustomEvent<{ language?: string }>).detail;
      if (detail?.language && detail.language !== lang) return;
      setHasStats(allPronWords(loadPronStats(lang)).length > 0);
      setWeakCount(countWeakWords(lang));
    };
    window.addEventListener(SPEAKING_PROGRESS_EVENT, refreshProgress);
    return () => window.removeEventListener(SPEAKING_PROGRESS_EVENT, refreshProgress);
  }, [lang]);

  const pickActivity = useCallback((next: SpeakingActivity) => {
    stopSpeakingTts(lang);
    setActivity(next);
    setView("practice");
    if (next === "review") setWeakCount(countWeakWords(lang));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [lang]);

  // Jump from a roadmap step into the matching practice activity.
  const goToPlanMode = useCallback((planMode: PlanMode) => {
    pickActivity(planMode === "sentence" ? "sentences" : planMode);
  }, [pickActivity]);


  const titles: Record<string, { title: string; subtitle: string; back: string }> = {
    english: {
      title: "Speaking Coach - English",
      subtitle: t("Luyện phát âm tiếng Anh thông minh", "Smart English pronunciation practice"),
      back: "/english",
    },
    chinese: {
      title: "Speaking Coach - 中文",
      subtitle: t("Luyện phát âm tiếng Trung thông minh", "Smart Chinese pronunciation practice"),
      back: "/chinese",
    },
    finnish: {
      title: "Speaking Coach - Suomi",
      subtitle: t("Luyện phát âm tiếng Phần Lan thông minh", "Smart Finnish pronunciation practice"),
      back: "/finnish/yki-dashboard",
    },
    swedish: {
      title: "Speaking Coach - Svenska",
      subtitle: t("Luyện phát âm tiếng Thụy Điển — sj-/tj- & ngữ điệu Bắc Âu", "Swedish pronunciation — sj-/tj- and Nordic intonation"),
      back: "/swedish",
    },
    japanese: {
      title: "Speaking Coach - 日本語",
      subtitle: t("Luyện phát âm tiếng Nhật - romaji, trường âm và âm ngắt", "Japanese pronunciation - romaji, long vowels and small tsu"),
      back: "/japanese",
    },
    vietnamese: {
      title: "Speaking Coach - Tiếng Việt",
      subtitle: t("Luyện phát âm tiếng Việt thông minh", "Smart Vietnamese pronunciation practice"),
      back: "/learn-vietnamese",
    },
  };

  const config = titles[lang] || titles.english;

  // Launch a flying star toward the climber
  const handlePerfectScore = useCallback(() => {
    setExcellentCount((c) => c + 1);
    const id = ++starIdRef.current;
    // Start from center of viewport
    setFlyingStars((prev) => [...prev, { id, startX: window.innerWidth / 2, startY: window.innerHeight / 2 }]);
    // Log to admin dashboard so teacher sees speaking practice frequency
    (async () => {
      try {
        const { logStudentActivity } = await import("@/hooks/useActivityLogger");
        const domain = lang === "chinese" || lang === "japanese" ? "chinese" : "english";
        await logStudentActivity({
          activityType: `speaking_coach_${lang}`,
          score: 10,
          maxScore: 10,
          domain,
          metadata: { language: lang },
        });
      } catch (e) { console.error("log speaking coach failed", e); }
    })();
  }, [lang]);

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

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6 min-h-[220px] overflow-hidden rounded-md border border-primary/20 bg-card shadow-lg sm:min-h-[260px]"
        >
          <img src={speakingCoachBanner} alt={t("Thầy Hải và học viên luyện nói", "Mr. Hai practising speaking with a learner")} width={1600} height={720} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20" />
          <div className="relative z-10 flex min-h-[220px] max-w-2xl flex-col justify-center p-5 sm:min-h-[260px] sm:p-8">
            <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground sm:text-3xl">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-md">
                <Mic className="h-6 w-6" />
              </div>
              {config.title}
            </h1>
            <p className="mt-3 max-w-lg text-base font-medium text-foreground/80">{config.subtitle}</p>
            <Button size="sm" className="mt-5 w-fit" onClick={() => pickActivity("mrhai")}>{t("Nói với thầy Hải", "Speak with Mr. Hai")}</Button>
          </div>
        </motion.section>

        {/* Gamification progress visualizer */}
        {excellentCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6"
          >
            {/* English no longer shows MountainClimber per request - stars still fly via handlePerfectScore but no climber UI */}
            {(lang === "finnish" || lang === "swedish") && (
              <FinnishSkier
                mastered={excellentCount}
                total={totalTarget}
                flyingStars={flyingStars}
                onStarLanded={handleStarLanded}
                containerRef={containerRef}
              />
            )}
            {lang === "japanese" && (
              <GreatWallClimber
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
            {lang === "vietnamese" && (
              <MountainClimber
                mastered={excellentCount}
                total={totalTarget}
                flyingStars={flyingStars}
                onStarLanded={handleStarLanded}
                containerRef={containerRef}
              />
            )}
          </motion.div>
        )}

        {/* Two entry points only: overview (charts first) and practice */}
        <div className="mb-4 flex flex-wrap gap-2">
          {([
            { key: "overview", label: t("Tổng quan", "Overview"), icon: BarChart3 },
            { key: "practice", label: t("Luyện tập", "Practice"), icon: Mic },
          ] as const).map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              size="sm"
              variant={view === key ? "default" : "outline"}
              onClick={() => {
                setView(key);
                setWeakCount(countWeakWords(lang));
              }}
              className="gap-1"
            >
              <Icon className="w-4 h-4" />
              {label}
              {key === "practice" && weakCount > 0 && (
                <Badge variant="secondary" className="ml-1">{weakCount}</Badge>
              )}
            </Button>
          ))}
        </div>

        {view === "overview" && (
          <SpeakingOverview
            language={lang}
            weakCount={weakCount}
            hasData={hasStats}
            onGoMode={goToPlanMode}
            onPickActivity={pickActivity}
          />
        )}

        {view === "practice" && (
          <div className="space-y-4">
            <ActivityChips active={activity} weakCount={weakCount} onPick={pickActivity} />
            {activity === "shadow" && <ShadowingMode language={lang} onPerfectScore={handlePerfectScore} />}
            {activity === "drill" && <SoundDrillMode language={lang} onPerfectScore={handlePerfectScore} />}
            {activity === "freetalk" && <FreeTalkMode language={lang} onPerfectScore={handlePerfectScore} />}
            {activity === "mrhai" && <SpeakWithMrHaiMode language={lang} />}
            {activity === "review" && (
              <WeakWordReview language={lang} onChange={() => setWeakCount(countWeakWords(lang))} />
            )}
          </div>
        )}

        {/* Kept mounted so the sentence quiz keeps its state between views */}
        <div className={view === "practice" && activity === "sentences" ? "mt-4" : "hidden"}>
          <AISpeakingCoach language={lang} onPerfectScore={handlePerfectScore} />
        </div>


      </main>
      <Footer />
    </div>
  );
};

export default SpeakingCoachPage;
