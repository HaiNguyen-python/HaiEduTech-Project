/**
 * @file LifeInFinland.tsx
 * @description Newcomer guide hub for life in Finland - admin, daily life, work, health.
 *              Bilingual VI/EN with key Finnish terms, interactive 30-day checklist,
 *              PDF download, and "Integrated Resident" badge award.
 * @author HaiEduTech
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight, Download, ExternalLink, MessageCircle, MapPin,
  CheckCircle2, Circle, FileText, ShoppingBag, Briefcase, HeartPulse,
  Sparkles,
} from "lucide-react";
import jsPDF from "jspdf";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  NEWCOMER_CATEGORIES, FIRST_30_DAYS_CHECKLIST, COMMUNITY_RESOURCES, NEWCOMER_BADGE,
} from "@/data/lifeInFinlandData";

const PILLAR_ICON_MAP = {
  admin: FileText,
  daily: ShoppingBag,
  work: Briefcase,
  health: HeartPulse,
} as const;

const PILLAR_GRADIENTS: Record<string, string> = {
  admin: "from-blue-600 to-indigo-700",
  daily: "from-emerald-500 to-teal-600",
  work: "from-amber-500 to-orange-600",
  health: "from-rose-500 to-pink-600",
};

const STORAGE_KEY = "haiedu_life_in_finland_progress";
const READ_KEY = "haiedu_life_in_finland_read";

const LifeInFinland = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("admin");
  const [completed, setCompleted] = useState<string[]>([]);
  const [readGuides, setReadGuides] = useState<string[]>([]);

  // Load progress
  useEffect(() => {
    try {
      setCompleted(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
      setReadGuides(JSON.parse(localStorage.getItem(READ_KEY) || "[]"));
    } catch {
      // Reset corrupt data
      setCompleted([]);
      setReadGuides([]);
    }
  }, []);

  // Persist checklist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  // Persist read guides + auto-award badge
  useEffect(() => {
    localStorage.setItem(READ_KEY, JSON.stringify(readGuides));
    const totalGuides = NEWCOMER_CATEGORIES.flatMap((c) => c.guides).length;
    if (readGuides.length >= totalGuides) {
      void awardBadge();
    }
  }, [readGuides]);

  const awardBadge = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: existing } = await supabase
      .from("player_badges")
      .select("id")
      .eq("user_id", user.id)
      .eq("badge_id", NEWCOMER_BADGE.badgeId)
      .maybeSingle();
    if (existing) return;
    const { error } = await supabase.from("player_badges").insert({
      user_id: user.id,
      badge_id: NEWCOMER_BADGE.badgeId,
      badge_name: NEWCOMER_BADGE.badgeName,
      badge_icon: NEWCOMER_BADGE.badgeIcon,
    });
    if (!error) {
      toast({
        title: t("🎉 Huy hiệu mới!", "🎉 New Badge!"),
        description: t(
          "Bạn đã trở thành Integrated Resident - chúc mừng đã làm chủ cuộc sống ở Phần Lan!",
          "You're now an Integrated Resident - congrats on mastering life in Finland!"
        ),
      });
    }
  };

  const toggleTask = (key: string) => {
    setCompleted((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  const markGuideRead = (guideId: string) => {
    if (!readGuides.includes(guideId)) {
      setReadGuides([...readGuides, guideId]);
      toast({
        title: t("✅ Đã đánh dấu", "✅ Marked as read"),
        description: t("Hướng dẫn đã được thêm vào tiến độ của bạn.", "Guide added to your progress."),
      });
    }
  };

  const progressPct = useMemo(
    () => Math.round((completed.length / FIRST_30_DAYS_CHECKLIST.length) * 100),
    [completed]
  );

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("First 30 Days in Finland - HaiEduTech", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("Personalised checklist generated for your move to Finland", 14, 28);

    let y = 40;
    [1, 2, 3, 4].forEach((week) => {
      doc.setFontSize(13);
      doc.setTextColor(0, 53, 128);
      doc.text(`Week ${week}`, 14, y);
      y += 7;
      doc.setFontSize(10);
      doc.setTextColor(30);
      FIRST_30_DAYS_CHECKLIST.filter((it) => it.week === week).forEach((it) => {
        const mark = completed.includes(it.key) ? "[x]" : "[ ]";
        const line = `${mark} ${it.en}`;
        const split = doc.splitTextToSize(line, 180);
        doc.text(split, 16, y);
        y += split.length * 5 + 1;
        if (y > 270) { doc.addPage(); y = 20; }
      });
      y += 4;
    });

    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("© HaiEduTech - haiedutech.com", 14, 290);
    doc.save("first-30-days-finland.pdf");
  };

  const askChatbot = (question: string) => {
    // Open chatbot via custom event listened by ChatBot.tsx
    window.dispatchEvent(new CustomEvent("haiedu:open-chatbot", { detail: { prompt: question } }));
    toast({
      title: t("💬 Đang mở trợ lý", "💬 Opening assistant"),
      description: t("Mr. Hai sẽ trả lời chi tiết câu hỏi của bạn.", "Mr. Hai will answer your question in detail."),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 lg:pt-28 pb-12">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518790317894-3a35e0e0deef?w=1600')] opacity-10 bg-cover bg-center" />
          <div className="relative container mx-auto px-4 sm:px-6 py-12 md:py-16">
            <Link to="/finnish" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4">
              <ChevronRight className="w-4 h-4 rotate-180" />
              {t("Quay lại Finnish Hub", "Back to Finnish Hub")}
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">🇫🇮</span>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                {t("Hướng dẫn cho người mới", "Newcomer Guide")}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              {t("Cuộc sống ở Phần Lan", "Life in Finland")}
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-3xl leading-relaxed">
              {t(
                "Mọi điều cần biết để hòa nhập: thủ tục hành chính, đời sống, công việc & thuế, y tế. Học song ngữ Việt – Phần và lưu lại các từ khóa quan trọng.",
                "Everything you need to integrate: paperwork, daily life, work & tax, healthcare. Learn bilingually in Vietnamese–Finnish and keep the key terms."
              )}
            </p>

            {/* Progress strip */}
            <div className="mt-6 max-w-md bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between text-sm text-white mb-2">
                <span className="font-semibold">{t("Đã đọc:", "Guides read:")} {readGuides.length} / {NEWCOMER_CATEGORIES.flatMap((c) => c.guides).length}</span>
                <span className="text-white/80">{t("Checklist:", "Checklist:")} {completed.length}/{FIRST_30_DAYS_CHECKLIST.length}</span>
              </div>
              <Progress value={progressPct} className="h-2 bg-white/20" />
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="container mx-auto px-4 sm:px-6 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-6 gap-1 h-auto p-1 mb-8">
              {NEWCOMER_CATEGORIES.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} className="text-xs sm:text-sm py-2">
                  <span className="mr-1">{cat.emoji}</span>
                  <span className="hidden sm:inline">{t(cat.title, cat.titleEn)}</span>
                  <span className="sm:hidden">{t(cat.title.split(" ")[0], cat.titleEn.split(" ")[0])}</span>
                </TabsTrigger>
              ))}
              <TabsTrigger value="checklist" className="text-xs sm:text-sm py-2">
                ✅ <span className="hidden sm:inline ml-1">{t("Checklist 30 ngày", "30-Day Checklist")}</span>
                <span className="sm:hidden ml-1">30 {t("ngày", "days")}</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="text-xs sm:text-sm py-2">
                🌐 <span className="hidden sm:inline ml-1">{t("Cộng đồng", "Community")}</span>
                <span className="sm:hidden ml-1">{t("CĐ", "Comm.")}</span>
              </TabsTrigger>
            </TabsList>

            {/* Category tabs */}
            {NEWCOMER_CATEGORIES.map((cat) => {
              const PillarIcon = PILLAR_ICON_MAP[cat.pillar];
              return (
                <TabsContent key={cat.id} value={cat.id} className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${PILLAR_GRADIENTS[cat.pillar]} flex items-center justify-center text-white`}>
                      <PillarIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{t(cat.title, cat.titleEn)}</h2>
                      <p className="text-sm text-muted-foreground">{t(cat.description, cat.descriptionEn)}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {cat.guides.map((guide, i) => (
                      <motion.div
                        key={guide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Card className="h-full border-2 hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <span className="text-2xl">{guide.emoji}</span>
                                  {t(guide.title, guide.titleEn)}
                                </CardTitle>
                                <CardDescription className="mt-2 text-sm leading-relaxed">
                                  {t(guide.summary, guide.summaryEn)}
                                </CardDescription>
                              </div>
                              {readGuides.includes(guide.id) && (
                                <Badge className="bg-emerald-500 text-white shrink-0">✓</Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Steps */}
                            <div>
                              <h4 className="font-semibold text-sm mb-2 text-foreground">
                                {t("Các bước thực hiện", "Step-by-step")}
                              </h4>
                              <ol className="space-y-2">
                                {guide.steps.map((step, idx) => (
                                  <li key={idx} className="flex gap-2 text-sm leading-relaxed">
                                    <span className={`shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${PILLAR_GRADIENTS[cat.pillar]} text-white text-xs font-bold flex items-center justify-center`}>
                                      {idx + 1}
                                    </span>
                                    <span className="text-foreground/90">{t(step.vi, step.en)}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            {/* Key Finnish terms */}
                            <div>
                              <h4 className="font-semibold text-sm mb-2 text-foreground">
                                🔑 {t("Từ khóa tiếng Phần", "Key Finnish Terms")}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {guide.keyTerms.map((term) => (
                                  <div key={term.fi} className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg px-2 py-1 text-xs">
                                    <span className="font-bold text-blue-700 dark:text-blue-300">{term.fi}</span>
                                    <span className="text-muted-foreground"> - {t(term.vi, term.en)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Survival phrases */}
                            <div>
                              <h4 className="font-semibold text-sm mb-2 text-foreground">
                                💬 {t("Câu sinh tồn", "Survival Phrases")}
                              </h4>
                              <ul className="space-y-1.5">
                                {guide.phrases.map((p) => (
                                  <li key={p.fi} className="text-sm bg-muted/50 rounded-lg p-2">
                                    <p className="font-semibold text-foreground italic">"{p.fi}"</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{t(p.vi, p.en)}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Pro tip */}
                            {guide.proTip && (
                              <div className="bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-500 rounded-r-lg p-3">
                                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" /> Pro Tip
                                </p>
                                <p className="text-sm text-foreground/90">{t(guide.proTip.vi, guide.proTip.en)}</p>
                              </div>
                            )}

                            {/* Map links */}
                            {guide.mapLinks && guide.mapLinks.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {guide.mapLinks.map((m) => (
                                  <a key={m.url} href={m.url} target="_blank" rel="noopener noreferrer">
                                    <Badge variant="outline" className="gap-1 hover:bg-muted cursor-pointer">
                                      <MapPin className="w-3 h-3" /> {m.label}
                                    </Badge>
                                  </a>
                                ))}
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 pt-2 border-t">
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1"
                                onClick={() => askChatbot(`${guide.titleEn}: ${guide.summaryEn} - what documents and steps do I need?`)}
                              >
                                <MessageCircle className="w-3.5 h-3.5" /> {t("Hỏi Mr. Hai", "Ask Mr. Hai")}
                              </Button>
                              <Button
                                size="sm"
                                variant={readGuides.includes(guide.id) ? "secondary" : "default"}
                                onClick={() => markGuideRead(guide.id)}
                                disabled={readGuides.includes(guide.id)}
                                className="gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {readGuides.includes(guide.id) ? t("Đã đọc", "Read") : t("Đánh dấu đã đọc", "Mark as read")}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              );
            })}

            {/* Checklist tab */}
            <TabsContent value="checklist">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <CardTitle className="text-2xl">
                        ✅ {t("30 ngày đầu tại Phần Lan", "First 30 Days in Finland")}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {t("Đánh dấu mỗi nhiệm vụ khi hoàn thành - tiến độ được lưu tự động.", "Tick each task as you finish - progress saves automatically.")}
                      </CardDescription>
                    </div>
                    <Button onClick={handleDownloadPdf} className="gap-2">
                      <Download className="w-4 h-4" /> {t("Tải PDF Checklist", "Download PDF Checklist")}
                    </Button>
                  </div>
                  <Progress value={progressPct} className="mt-3 h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {progressPct}% - {completed.length} / {FIRST_30_DAYS_CHECKLIST.length} {t("hoàn thành", "completed")}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[1, 2, 3, 4].map((week) => (
                    <div key={week}>
                      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Badge className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                          {t(`Tuần ${week}`, `Week ${week}`)}
                        </Badge>
                      </h3>
                      <div className="space-y-2">
                        {FIRST_30_DAYS_CHECKLIST.filter((it) => it.week === week).map((it) => {
                          const isDone = completed.includes(it.key);
                          return (
                            <label
                              key={it.key}
                              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                isDone ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300" : "bg-card hover:bg-muted/50 border-border"
                              }`}
                            >
                              <Checkbox
                                checked={isDone}
                                onCheckedChange={() => toggleTask(it.key)}
                                className="mt-0.5"
                              />
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                  {t(it.vi, it.en)}
                                </p>
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {it.category}
                                </Badge>
                              </div>
                              {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <Circle className="w-4 h-4 text-muted-foreground shrink-0" />}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Community resources tab */}
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    🌐 {t("Cập nhật & Cộng đồng", "Latest Updates & Community")}
                  </CardTitle>
                  <CardDescription>
                    {t(
                      "Theo dõi tin tức từ Migri và kết nối với cộng đồng người Việt tại Phần Lan.",
                      "Follow Migri news and connect with the Vietnamese community in Finland."
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {COMMUNITY_RESOURCES.map((res) => (
                      <a
                        key={res.url}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                      >
                        <span className="text-2xl">{res.emoji}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{res.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{res.url.replace(/^https?:\/\//, "")}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      🏆 {t("Huy hiệu Integrated Resident", "Integrated Resident Badge")}
                    </h3>
                    <p className="text-sm text-foreground/80 mb-3">
                      {t(
                        `Đọc đủ ${NEWCOMER_CATEGORIES.flatMap((c) => c.guides).length} hướng dẫn để mở khóa huy hiệu danh giá này. Nhân vật Finnish Skier sẽ nhận thêm 'City Outfit'!`,
                        `Read all ${NEWCOMER_CATEGORIES.flatMap((c) => c.guides).length} guides to unlock this prestigious badge. Your Finnish Skier character will gain a 'City Outfit'!`
                      )}
                    </p>
                    <Progress value={(readGuides.length / NEWCOMER_CATEGORIES.flatMap((c) => c.guides).length) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {readGuides.length} / {NEWCOMER_CATEGORIES.flatMap((c) => c.guides).length} {t("đã đọc", "guides read")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LifeInFinland;
