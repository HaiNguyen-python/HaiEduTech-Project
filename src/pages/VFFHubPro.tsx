/**
 * @file VFFHubPro.tsx
 * @description Professional Vietnamese for Foreigners hub with CEFR level roadmap.
 */
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Flame, GraduationCap, Trophy, Route, Sparkles, Mic, BookOpen, Award, CheckCircle2, Lock, Headphones, PenLine, MessageCircle, Compass, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { vffLevelA1, vffLevelB1 } from "@/data/vietnamese/vffLevels";
import { vffLevelA2 } from "@/data/vietnamese/vffLevelA2";
import { useVFFProgress } from "@/hooks/useVFFProgress";

const A2_LESSON_COUNT = vffLevelA2.lessons.length;




const VFFHubPro = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { progress } = useVFFProgress();

  const a1Done = vffLevelA1.lessons.filter(l => (progress.lessonsCompleted[l.id] ?? 0) >= 80).length;
  const b1Done = vffLevelB1.lessons.filter(l => (progress.lessonsCompleted[l.id] ?? 0) >= 80).length;
  const a2Done = vffLevelA2.lessons.filter(l => (progress.lessonsCompleted[l.id] ?? 0) >= 80).length;

  const overallPct = Math.round(
    ((a1Done + Math.min(a2Done, A2_LESSON_COUNT) + b1Done) / (vffLevelA1.lessons.length + A2_LESSON_COUNT + vffLevelB1.lessons.length)) * 100
  );

  const levels = [
    {
      key: "A1" as const,
      cefr: "A1",
      title: vffLevelA1.title,
      titleEn: vffLevelA1.titleEn,
      tagline: vffLevelA1.tagline,
      taglineEn: vffLevelA1.taglineEn,
      hours: vffLevelA1.hours,
      color: vffLevelA1.color,
      lessons: vffLevelA1.lessons.length,
      done: a1Done,
      to: "/learn-vietnamese/for-foreigners/a1",
      unlocked: progress.levelUnlocked.A1,
      checkpoint: progress.checkpointsPassed.A1 ?? 0,
    },
    {
      key: "A2" as const,
      cefr: "A2",
      title: vffLevelA2.title,
      titleEn: vffLevelA2.titleEn,
      tagline: vffLevelA2.tagline,
      taglineEn: vffLevelA2.taglineEn,
      hours: vffLevelA2.hours,
      color: vffLevelA2.color,

      lessons: A2_LESSON_COUNT,
      done: Math.min(a2Done, A2_LESSON_COUNT),
      to: "/learn-vietnamese/for-foreigners/a2",
      unlocked: progress.levelUnlocked.A2,
      checkpoint: progress.checkpointsPassed.A2 ?? 0,
    },
    {
      key: "B1" as const,
      cefr: "B1",
      title: vffLevelB1.title,
      titleEn: vffLevelB1.titleEn,
      tagline: vffLevelB1.tagline,
      taglineEn: vffLevelB1.taglineEn,
      hours: vffLevelB1.hours,
      color: vffLevelB1.color,
      lessons: vffLevelB1.lessons.length,
      done: b1Done,
      to: "/learn-vietnamese/for-foreigners/b1",
      unlocked: progress.levelUnlocked.B1,
      checkpoint: progress.checkpointsPassed.B1 ?? 0,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Learn Vietnamese - A1/A2/B1 Course for Foreigners | HaiEduTech"
        description="Professional Vietnamese course for foreigners. CEFR A1-B1 roadmap: alphabet & tones, pronouns, everyday scenarios, work Vietnamese. Placement test + certificate."
        path="/learn-vietnamese/for-foreigners"
      />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Back")}
          </Link>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-emerald-500/10 border border-primary/20 p-8 mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge className="bg-gradient-to-r from-primary to-emerald-500 text-white">CEFR A1 → B1</Badge>
                <Badge variant="outline"><Flame className="w-3 h-3 mr-1" />{progress.streakDays} {t("ngày liên tiếp", "day streak")}</Badge>
                <Badge variant="outline"><Trophy className="w-3 h-3 mr-1" />{overallPct}% {t("hoàn thành", "complete")}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-emerald-500 to-blue-600 bg-clip-text text-transparent">
                {t("Tiếng Việt cho người nước ngoài", "Vietnamese for Foreigners")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mb-6">
                {t(
                  "Lộ trình chuẩn quốc tế 3 cấp độ. Bảng chữ cái, 6 thanh, ngữ pháp có hệ thống, tình huống văn hóa - kèm phòng luyện phát âm, bài kiểm tra và chứng chỉ.",
                  "Internationally-structured 3-level roadmap. Alphabet, 6 tones, systematic grammar, cultural scenarios - with pronunciation lab, checkpoint tests, and certificate."
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={() => navigate("/learn-vietnamese/for-foreigners/placement")} className="bg-gradient-to-r from-primary to-emerald-500 text-white">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t("Làm bài kiểm tra xếp lớp", "Take Placement Test")}
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/learn-vietnamese/for-foreigners/lab/pronunciation")}>
                  <Mic className="w-4 h-4 mr-2" />
                  {t("Phòng luyện phát âm", "Pronunciation Lab")}
                </Button>
              </div>
              {progress.placementCompleted && progress.recommendedLevel && (
                <div className="mt-5 p-4 rounded-lg bg-background/60 border border-primary/20 inline-flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">
                    {t("Cấp độ được đề xuất:", "Recommended level:")}{" "}
                    <strong className="text-primary">{progress.recommendedLevel}</strong>
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Overall progress */}
          <Card className="mb-8 border-2 border-primary/25">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{t("Tiến độ tổng thể", "Overall Progress")}</span>
                <span className="text-sm text-muted-foreground">{a1Done + a2Done + b1Done} / {vffLevelA1.lessons.length + A2_LESSON_COUNT + vffLevelB1.lessons.length} {t("bài", "lessons")}</span>
              </div>
              <Progress value={overallPct} className="h-2" />
            </CardContent>
          </Card>

          {/* Level roadmap */}
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Route className="w-6 h-6 text-primary" />
            {t("Lộ trình 3 cấp độ", "3-Level Roadmap")}
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {levels.map((lvl, i) => {
              const pct = Math.round((lvl.done / lvl.lessons) * 100);
              return (
                <motion.div key={lvl.key} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className={`h-full border-2 ${lvl.unlocked ? "hover:shadow-xl cursor-pointer transition-all" : "opacity-70"}`} onClick={() => lvl.unlocked && navigate(lvl.to)}>
                    <div className={`h-2 rounded-t bg-gradient-to-r ${lvl.color}`} />
                    <CardContent className="pt-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-3xl font-bold bg-gradient-to-br bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--accent)))` }}>
                            {lvl.cefr}
                          </div>
                          <div className="text-sm text-muted-foreground">{lvl.hours}h · {lvl.lessons} {t("bài", "lessons")}</div>
                        </div>
                        {lvl.unlocked ? (
                          <GraduationCap className="w-6 h-6 text-primary" />
                        ) : (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-1">{t(lvl.title, lvl.titleEn)}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{t(lvl.tagline, lvl.taglineEn)}</p>
                      <Progress value={pct} className="h-1.5 mb-2" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{lvl.done}/{lvl.lessons} {t("hoàn thành", "done")}</span>
                        {lvl.checkpoint > 0 && (
                          <Badge variant="secondary" className="text-[10px]">
                            {t("Kiểm tra", "Test")}: {lvl.checkpoint}%
                          </Badge>
                        )}
                      </div>
                      {!lvl.unlocked && (
                        <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
                          {t("Hoàn thành cấp trước với ≥80% để mở khoá.", "Score ≥80% on the previous checkpoint to unlock.")}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Skill Labs */}
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            {t("Phòng luyện kỹ năng", "Skill Labs")}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { to: "/learn-vietnamese/for-foreigners/lab/pronunciation", icon: Mic, color: "text-emerald-500", vi: "Luyện phát âm", en: "Pronunciation Lab", desc: ["6 thanh + cặp đối lập + ghi âm chấm điểm.", "6 tones + minimal pairs + record-and-score."] },
              { to: "/learn-vietnamese/for-foreigners/lab/listening", icon: Headphones, color: "text-blue-500", vi: "Luyện nghe", en: "Listening Lab", desc: ["8 bài nghe A1-B1, 3 tốc độ, gap-fill.", "8 A1-B1 dialogues, 3 speeds, gap-fill."] },
              { to: "/learn-vietnamese/for-foreigners/lab/reading", icon: BookOpen, color: "text-amber-600", vi: "Luyện đọc", en: "Reading Lab", desc: ["Bài đọc phân cấp có glossary + câu hỏi.", "Graded passages with glossary + Qs."] },
              { to: "/learn-vietnamese/for-foreigners/lab/writing", icon: PenLine, color: "text-fuchsia-500", vi: "Luyện viết", en: "Writing Lab", desc: ["Gõ dấu Telex/VNI + ghép câu.", "Telex/VNI typing + sentence builder."] },
              { to: "/learn-vietnamese/for-foreigners/lab/roleplay", icon: MessageCircle, color: "text-rose-500", vi: "Đóng vai", en: "Speaking Roleplay", desc: ["4 kịch bản: cà phê, Grab, chợ, phòng khám.", "4 scenarios: cafe, Grab, market, clinic."] },
              { to: "/learn-vietnamese/for-foreigners/lab/flashcards", icon: Layers, color: "text-violet-500", vi: "Thẻ ghi nhớ SRS", en: "SRS Flashcards", desc: ["Ôn từ vựng theo lặp lại ngắt quãng.", "Vocab spaced-repetition review."] },
              { to: "/learn-vietnamese/for-foreigners/lab/culture", icon: Compass, color: "text-amber-500", vi: "Cẩm nang văn hóa", en: "Culture Guide", desc: ["Tết, cà phê, chợ, gia đình - Do & Don't.", "Tet, coffee, markets, family - Do & Don't."] },
              { to: "/learn-vietnamese/for-foreigners/lab/grammar", icon: BookOpen, color: "text-sky-500", vi: "Tham chiếu ngữ pháp", en: "Grammar Reference", desc: ["25 điểm ngữ pháp cốt lõi A1-B1.", "25 core grammar points A1-B1."] },
              { to: "/learn-vietnamese/for-foreigners/certificate", icon: Award, color: "text-amber-500", vi: "Chứng chỉ", en: "My Certificate", desc: ["Nhận chứng chỉ khi checkpoint ≥80%.", "Certificate when checkpoint ≥80%."] },
            ].map(({ to, icon: Icon, color, vi, en, desc }) => (
              <Link key={to} to={to}>
                <Card className="h-full hover:shadow-lg hover:border-primary/40 transition-all cursor-pointer">
                  <CardContent className="pt-5">
                    <Icon className={`w-8 h-8 mb-2 ${color}`} />
                    <h3 className="font-bold mb-1">{t(vi, en)}</h3>
                    <p className="text-sm text-muted-foreground">{t(desc[0], desc[1])}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>


          {/* Learning approach */}
          <div className="rounded-xl border-2 border-dashed border-primary/25 p-6 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="font-bold mb-2 flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" />{t("Phương pháp học", "Learning Approach")}</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li>{t("Theo chuẩn CEFR (giống IELTS/TOEIC): A1 sinh tồn → A2 đời sống → B1 công việc.", "CEFR-aligned (like IELTS/TOEIC): A1 survival → A2 everyday → B1 work.")}</li>
              <li>{t("Mỗi bài có: mục tiêu, từ vựng + IPA, hội thoại thực tế, 2 điểm ngữ pháp, luyện phát âm, mini-quiz, mẹo văn hóa.", "Each lesson has: goal, vocab + IPA, real dialogue, 2 grammar points, pronunciation drill, quiz, cultural tip.")}</li>
              <li>{t("Bài kiểm tra cuối cấp ≥80% để mở cấp kế tiếp và nhận chứng chỉ.", "Checkpoint ≥80% unlocks the next level and grants a certificate.")}</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFHubPro;
