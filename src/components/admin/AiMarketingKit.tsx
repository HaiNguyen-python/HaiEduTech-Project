// AI Marketing Kit — Admin tool that generates 3 ad copy variations + matching illustration
// Uses Lovable AI (Gemini Pro for copy + Nano Banana for image)

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Wand2,
  RefreshCcw,
  Copy as CopyIcon,
  Download,
  Save,
  Trash2,
  Heart,
  Brain,
  Zap,
  Image as ImageIcon,
  Loader2,
  Megaphone,
  Facebook,
  Instagram,
  MessageCircle,
  Globe,
  Video,
  Film,
  Music2,
  Mic,
  Clapperboard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CopyVariation {
  label: string;
  headline: string;
  body: string;
  benefits: string[];
  cta: string;
  hashtags?: string[];
}

interface SavedCampaign {
  id: string;
  campaign_label: string;
  course: string;
  audience: string;
  platform: string;
  goal: string;
  copy_variations: CopyVariation[];
  image_url: string | null;
  image_prompt: string | null;
  created_at: string;
}

interface VideoShot {
  shotNumber: number;
  timing: string;
  visual: string;
  onScreenText: string;
  voiceover: string;
  broll: string;
}

interface VideoScript {
  title: string;
  hook: string;
  totalSeconds: number;
  format: string;
  aspectRatio: string;
  musicMood: string;
  shots: VideoShot[];
  cta: string;
  captionForUpload: string;
  hashtags: string[];
  productionTips: string[];
}

const COURSES = [
  { value: "PTE Intensive 79+", label: "🎯 PTE Intensive 79+" },
  { value: "IELTS Foundation 6.5+", label: "📚 IELTS Foundation 6.5+" },
  { value: "IELTS Advanced 7.5+", label: "🏆 IELTS Advanced 7.5+" },
  { value: "TOEIC 750+", label: "💼 TOEIC 750+" },
  { value: "Conversational English", label: "💬 Conversational English" },
  { value: "English Grammar Master", label: "✍️ English Grammar Master" },
  { value: "Conversational Chinese HSK 1-3", label: "🐉 Chinese HSK 1-3" },
  { value: "Chinese HSK 4-6 Advanced", label: "🏮 Chinese HSK 4-6" },
  { value: "Finnish YKI A2 Prep", label: "❄️ Finnish YKI A2" },
  { value: "Python for Beginners", label: "💻 Python for Beginners" },
  { value: "AI & Machine Learning", label: "🤖 AI & Machine Learning" },
  { value: "Data Engineering Pathway", label: "📊 Data Engineering" },
];

const AUDIENCES = [
  { value: "Students", label: "🎓 Học sinh / Sinh viên" },
  { value: "Professionals", label: "💼 Người đi làm" },
  { value: "Study Abroad Aspirants", label: "✈️ Du học sinh tương lai" },
  { value: "Language Enthusiasts", label: "🌍 Người đam mê ngoại ngữ" },
];

const PLATFORMS = [
  { value: "Facebook Post", label: "Facebook Post", icon: Facebook },
  { value: "Instagram Story", label: "Instagram Story", icon: Instagram },
  { value: "Zalo Message", label: "Zalo Message", icon: MessageCircle },
  { value: "Google Ads", label: "Google Ads", icon: Globe },
];

const GOALS = [
  { value: "Brand Awareness", label: "🌟 Brand Awareness" },
  { value: "Lead Generation", label: "📞 Lead Generation (Đăng ký)" },
  { value: "Flash Sale", label: "⚡ Flash Sale" },
];

const VIDEO_FORMATS = [
  { value: "tiktok", label: "🎵 TikTok (9:16)" },
  { value: "reels", label: "📸 Instagram Reels (9:16)" },
  { value: "shorts", label: "▶️ YouTube Shorts (9:16)" },
];

const VARIATION_META: Record<
  string,
  { icon: typeof Heart; color: string; bg: string }
> = {
  Emotional: {
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900",
  },
  Rational: {
    icon: Brain,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
  },
  Urgency: {
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900",
  },
};

export default function AiMarketingKit() {
  const [course, setCourse] = useState(COURSES[0].value);
  const [audience, setAudience] = useState(AUDIENCES[0].value);
  const [platform, setPlatform] = useState(PLATFORMS[0].value);
  const [goal, setGoal] = useState(GOALS[1].value);

  const [variations, setVariations] = useState<CopyVariation[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [regenImage, setRegenImage] = useState(false);
  const [regenText, setRegenText] = useState(false);
  const [saving, setSaving] = useState(false);

  // Video script state
  const [videoFormat, setVideoFormat] = useState<"tiktok" | "reels" | "shorts">("tiktok");
  const [videoScript, setVideoScript] = useState<VideoScript | null>(null);
  const [generatingVideo, setGeneratingVideo] = useState(false);

  const [savedCampaigns, setSavedCampaigns] = useState<SavedCampaign[]>([]);
  const [activeTab, setActiveTab] = useState("studio");

  useEffect(() => {
    void loadSavedCampaigns();
  }, []);

  const loadSavedCampaigns = async () => {
    const { data, error } = await supabase
      .from("marketing_campaigns")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (!error && data) {
      setSavedCampaigns(data as unknown as SavedCampaign[]);
    }
  };

  const generate = async () => {
    setGenerating(true);
    setVariations([]);
    setImageUrl("");
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-marketing-kit",
        {
          body: { course, audience, platform, goal, generateImage: true },
        },
      );
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed");
      setVariations(data.variations || []);
      setImageUrl(data.imageUrl || "");
      setImagePrompt(data.imagePrompt || "");
      toast.success("✨ Marketing kit generated!");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      if (msg.includes("429")) toast.error("Rate limited. Please wait.");
      else if (msg.includes("402")) toast.error("AI credits exhausted.");
      else toast.error(`Generation failed: ${msg}`);
    } finally {
      setGenerating(false);
    }
  };

  const regenerateImage = async () => {
    setRegenImage(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-marketing-kit",
        {
          body: { course, audience, platform, goal, imageOnly: true },
        },
      );
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed");
      setImageUrl(data.imageUrl || "");
      setImagePrompt(data.imagePrompt || "");
      toast.success("🎨 New image generated!");
    } catch (e) {
      toast.error(`Image regen failed: ${e instanceof Error ? e.message : ""}`);
    } finally {
      setRegenImage(false);
    }
  };

  const regenerateCopy = async () => {
    setRegenText(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-marketing-kit",
        {
          body: { course, audience, platform, goal, textOnly: true },
        },
      );
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed");
      setVariations(data.variations || []);
      toast.success("✍️ New copy generated!");
    } catch (e) {
      toast.error(`Copy regen failed: ${e instanceof Error ? e.message : ""}`);
    } finally {
      setRegenText(false);
    }
  };

  const formatCopy = (v: CopyVariation): string => {
    let txt = `${v.headline}\n\n${v.body}\n\n`;
    if (v.benefits?.length) {
      txt += v.benefits.map((b) => `✅ ${b}`).join("\n") + "\n\n";
    }
    txt += `👉 ${v.cta}`;
    if (v.hashtags?.length) txt += `\n\n${v.hashtags.join(" ")}`;
    return txt;
  };

  const copyVariation = (v: CopyVariation) => {
    void navigator.clipboard.writeText(formatCopy(v));
    toast.success(`📋 ${v.label} copy copied!`);
  };

  const downloadImage = async () => {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `haiedutech-${course.replace(/\s+/g, "-")}-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("⬇️ Image downloaded!");
    } catch {
      toast.error("Download failed");
    }
  };

  const saveCampaign = async (label: string) => {
    if (!variations.length) return;
    setSaving(true);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes?.user) throw new Error("Not authenticated");

      const { error } = await supabase.from("marketing_campaigns").insert({
        created_by: userRes.user.id,
        campaign_label: label,
        course,
        audience,
        platform,
        goal,
        copy_variations: variations as unknown as never,
        image_url: imageUrl || null,
        image_prompt: imagePrompt || null,
      });
      if (error) throw error;
      toast.success(`💾 Saved as ${label}!`);
      await loadSavedCampaigns();
    } catch (e) {
      toast.error(`Save failed: ${e instanceof Error ? e.message : ""}`);
    } finally {
      setSaving(false);
    }
  };

  const deleteCampaign = async (id: string) => {
    const { error } = await supabase
      .from("marketing_campaigns")
      .delete()
      .eq("id", id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Deleted");
      await loadSavedCampaigns();
    }
  };

  const PlatformIcon = PLATFORMS.find((p) => p.value === platform)?.icon ||
    Megaphone;

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <div className="rounded-lg bg-gradient-to-br from-primary to-accent p-2">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          AI Marketing Kit Studio
          <Badge variant="outline" className="ml-2 text-xs">
            Lovable AI · Gemini Pro + Nano Banana
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tự động sinh 3 biến thể quảng cáo + ảnh minh họa cho mọi khóa học. A/B
          test ready.
        </p>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="studio">
              <Wand2 className="mr-2 h-4 w-4" /> Studio
            </TabsTrigger>
            <TabsTrigger value="library">
              <Save className="mr-2 h-4 w-4" /> Saved ({savedCampaigns.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="studio" className="space-y-4">
            {/* Input Panel */}
            <div className="grid grid-cols-1 gap-3 rounded-xl border bg-card p-4 md:grid-cols-4">
              <div className="space-y-1">
                <Label className="text-xs uppercase">Course</Label>
                <Select value={course} onValueChange={setCourse}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase">Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AUDIENCES.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase">Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GOALS.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={generate}
                disabled={generating}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang sáng
                    tạo...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" /> Generate Marketing Kit
                  </>
                )}
              </Button>
              {variations.length > 0 && (
                <>
                  <Button
                    onClick={regenerateCopy}
                    variant="outline"
                    disabled={regenText}
                  >
                    {regenText ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCcw className="mr-2 h-4 w-4" />
                    )}
                    Regenerate Copy
                  </Button>
                  <Button
                    onClick={() => saveCampaign("Campaign A")}
                    variant="secondary"
                    disabled={saving}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save as A
                  </Button>
                  <Button
                    onClick={() => saveCampaign("Campaign B")}
                    variant="secondary"
                    disabled={saving}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save as B
                  </Button>
                </>
              )}
            </div>

            {/* Output Grid */}
            {(variations.length > 0 || imageUrl) && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Image + Mockup */}
                <div className="space-y-3 lg:col-span-1">
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ImageIcon className="h-4 w-4" /> AI Illustration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {imageUrl ? (
                        <motion.img
                          key={imageUrl}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          src={imageUrl}
                          alt="AI generated marketing illustration"
                          className="w-full rounded-lg border shadow-md"
                        />
                      ) : (
                        <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed bg-muted/30">
                          <ImageIcon className="h-12 w-12 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          onClick={regenerateImage}
                          variant="outline"
                          size="sm"
                          disabled={regenImage}
                          className="flex-1"
                        >
                          {regenImage ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <RefreshCcw className="h-3 w-3" />
                          )}
                          <span className="ml-1">Regenerate</span>
                        </Button>
                        <Button
                          onClick={downloadImage}
                          variant="outline"
                          size="sm"
                          disabled={!imageUrl}
                          className="flex-1"
                        >
                          <Download className="h-3 w-3" />
                          <span className="ml-1">PNG</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Platform Mockup */}
                  {variations[0] && (
                    <Card className="border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
                          <PlatformIcon className="h-3 w-3" /> {platform} Preview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 rounded-lg bg-background p-3 text-sm">
                          <div className="flex items-center gap-2 border-b pb-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent" />
                            <div>
                              <div className="text-xs font-bold">
                                HaiEduTech
                              </div>
                              <div className="text-[10px] text-muted-foreground">
                                Sponsored · 🌐
                              </div>
                            </div>
                          </div>
                          <p className="line-clamp-4 whitespace-pre-wrap text-xs">
                            {variations[0].body}
                          </p>
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt=""
                              className="w-full rounded"
                            />
                          )}
                          <div className="rounded bg-primary/10 p-2 text-center text-xs font-semibold text-primary">
                            {variations[0].cta}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Copy Variations */}
                <div className="space-y-3 lg:col-span-2">
                  <AnimatePresence>
                    {variations.map((v, i) => {
                      const meta = VARIATION_META[v.label] ||
                        VARIATION_META.Rational;
                      const Icon = meta.icon;
                      return (
                        <motion.div
                          key={`${v.label}-${i}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Card className={`border-2 ${meta.bg}`}>
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-base">
                                  <Icon className={`h-4 w-4 ${meta.color}`} />
                                  Variation {i + 1}: {v.label}
                                </CardTitle>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyVariation(v)}
                                >
                                  <CopyIcon className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <h4 className="text-lg font-bold leading-tight">
                                {v.headline}
                              </h4>
                              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                {v.body}
                              </p>
                              {v.benefits?.length > 0 && (
                                <ul className="space-y-1 text-sm">
                                  {v.benefits.map((b, bi) => (
                                    <li key={bi} className="flex gap-2">
                                      <span>✅</span>
                                      <span>{b}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              <div className="rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground">
                                👉 {v.cta}
                              </div>
                              {v.hashtags && v.hashtags.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {v.hashtags.map((h, hi) => (
                                    <span
                                      key={hi}
                                      className="text-xs text-muted-foreground"
                                    >
                                      {h}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="library">
            <ScrollArea className="h-[600px] pr-3">
              {savedCampaigns.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  Chưa có campaign nào được lưu
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {savedCampaigns.map((c) => (
                    <Card key={c.id} className="overflow-hidden">
                      <div className="flex items-start gap-3 p-3">
                        {c.image_url && (
                          <img
                            src={c.image_url}
                            alt=""
                            className="h-20 w-20 flex-shrink-0 rounded object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <Badge>{c.campaign_label}</Badge>
                            <Badge variant="outline" className="text-xs">
                              {c.platform}
                            </Badge>
                          </div>
                          <h4 className="truncate text-sm font-semibold">
                            {c.course}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {c.audience} · {c.goal}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs">
                            {c.copy_variations?.[0]?.headline}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteCampaign(c.id)}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
