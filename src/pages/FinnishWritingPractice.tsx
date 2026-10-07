import { useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle2, ChevronRight, Clock3, Keyboard, Languages, Link2, PenLine, Puzzle, Save, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import IllustratedPageHeader from "@/components/common/IllustratedPageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { toast } from "@/hooks/use-toast";
import { YKI_SKILL_BANK, YKI_WRITING_KINDS, YKI_WRITING_SENTENCES, YKI_WRITING_TASKS, type YkiWritingKind } from "@/data/finnishYkiWriting";

type FilterKind = "all" | YkiWritingKind;
type SkillKind = keyof typeof YKI_SKILL_BANK;

const TABS = [
  { value: "tasks", icon: PenLine, vi: "Đề YKI", en: "YKI Tasks" },
  { value: "vocabulary", icon: BookOpen, vi: "Từ vựng", en: "Vocabulary" },
  { value: "grammar", icon: Puzzle, vi: "Ngữ pháp", en: "Grammar" },
  { value: "connectors", icon: Link2, vi: "Liên kết", en: "Connectors" },
  { value: "translation", icon: Languages, vi: "Dịch", en: "Translation" },
  { value: "paraphrase", icon: Sparkles, vi: "Nâng cấp câu", en: "Paraphrase" },
  { value: "typing", icon: Keyboard, vi: "Gõ câu", en: "Typing" },
] as const;

const countWords = (text: string) => text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
const normalize = (text: string) => text.toLocaleLowerCase("fi-FI").replace(/[^a-zåäö0-9]+/gi, " ").trim();

function SkillCards({ kind }: { kind: SkillKind }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const items = YKI_SKILL_BANK[kind];
  const item = items[index % items.length];
  const next = () => { setIndex((value) => (value + 1) % items.length); setAnswer(""); setRevealed(false); };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="outline">{index + 1} / {items.length}</Badge>
            <CardTitle className="mt-3 text-xl">{item[0]}</CardTitle>
          </div>
          <Button size="sm" variant="outline" onClick={next}>{t("Tiếp theo", "Next")}<ChevronRight className="ml-1 h-4 w-4" /></Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{item[1]}</p>
        <Textarea value={answer} onChange={(event) => setAnswer(event.target.value)} className="min-h-28 text-base" placeholder={t("Tự viết một câu tiếng Phần Lan...", "Write your own Finnish sentence...")} />
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setRevealed((value) => !value)}>{revealed ? t("Ẩn ví dụ", "Hide example") : t("Xem ví dụ", "Show example")}</Button>
          {answer.trim() && <Button variant="outline" onClick={next}>{t("Hoàn thành & tiếp tục", "Complete & continue")}</Button>}
        </div>
        {revealed && <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-base font-medium">{item[2]}</div>}
      </CardContent>
    </Card>
  );
}

function SentencePractice({ mode }: { mode: "translation" | "paraphrase" | "typing" }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const poolSize = mode === "translation" ? YKI_WRITING_TASKS.length : YKI_WRITING_SENTENCES.length;
  const sentenceItem = YKI_WRITING_SENTENCES[index % YKI_WRITING_SENTENCES.length];
  const translationItem = YKI_WRITING_TASKS[index % YKI_WRITING_TASKS.length];
  const source = mode === "translation" ? translationItem.promptVi : sentenceItem.fi;
  const target = mode === "translation" ? translationItem.promptFi : sentenceItem.fi;
  const meaning = mode === "translation" ? translationItem.promptVi : sentenceItem.vi;
  const next = () => { setIndex((value) => (value + 1) % poolSize); setAnswer(""); setRevealed(false); };
  const typingScore = target ? Math.round((normalize(answer).split(" ").filter((word, i) => word === normalize(target).split(" ")[i]).length / Math.max(1, normalize(target).split(" ").length)) * 100) : 0;
  const labels = {
    translation: t("Dịch ý tiếng Việt sau sang tiếng Phần Lan", "Translate the Vietnamese idea into Finnish"),
    paraphrase: t("Viết lại câu theo cách khác nhưng giữ nguyên nghĩa", "Rewrite the sentence without changing its meaning"),
    typing: t("Gõ lại chính xác câu tiếng Phần Lan", "Type the Finnish sentence exactly"),
  };
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <Badge variant="outline">{index + 1} / {poolSize}</Badge>
          <Button size="sm" variant="outline" onClick={next}>{t("Tiếp theo", "Next")}<ChevronRight className="ml-1 h-4 w-4" /></Button>
        </div>
        <CardTitle className="pt-2 text-lg">{labels[mode]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted/60 p-4 text-lg leading-relaxed">{source}</div>
        <Textarea value={answer} onChange={(event) => setAnswer(event.target.value)} className="min-h-32 text-base" lang="fi" placeholder="Kirjoita tähän..." />
        {mode === "typing" && answer && <p className="text-sm font-semibold text-primary">{t("Độ chính xác theo từ", "Word accuracy")}: {typingScore}%</p>}
        <Button variant="secondary" onClick={() => setRevealed((value) => !value)}>{revealed ? t("Ẩn đáp án", "Hide answer") : t("Xem đáp án", "Show answer")}</Button>
        {revealed && <div className="rounded-lg border border-primary/20 bg-primary/5 p-4"><p className="font-semibold" lang="fi">{target}</p>{mode !== "typing" && <p className="mt-2 text-sm text-muted-foreground">{meaning}</p>}</div>}
      </CardContent>
    </Card>
  );
}

export default function FinnishWritingPractice() {
  const { t } = useLanguage();
  const [tab, setTab] = useState("tasks");
  const [filter, setFilter] = useState<FilterKind>("all");
  const [taskId, setTaskId] = useState(YKI_WRITING_TASKS[0].id);
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(YKI_WRITING_TASKS[0].minutes * 60);

  const filtered = useMemo(() => YKI_WRITING_TASKS.filter((item) => filter === "all" || item.kind === filter), [filter]);
  const active = filtered.find((item) => item.id === taskId) ?? filtered[0] ?? YKI_WRITING_TASKS[0];
  const wordCount = countWords(draft);
  const lowerDraft = draft.toLocaleLowerCase("fi-FI");
  const keywordHits = active.keywords.filter((word) => lowerDraft.includes(word.toLocaleLowerCase("fi-FI")));
  const coveredPoints = active.pointsFi.filter((_, index) => {
    const candidates = active.keywords.slice(Math.max(0, index), index + 2);
    return candidates.some((word) => lowerDraft.includes(word.toLocaleLowerCase("fi-FI")));
  }).length;

  useEffect(() => {
    const saved = localStorage.getItem(`yki-writing-draft:${active.id}`) ?? "";
    setDraft(saved);
    setShowModel(false);
    setSubmitted(false);
    setTimerActive(false);
    setTimeLeft(active.minutes * 60);
  }, [active.id, active.minutes]);

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;
    const timer = window.setInterval(() => setTimeLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [timerActive, timeLeft]);

  const chooseFilter = (value: FilterKind) => {
    const first = YKI_WRITING_TASKS.find((item) => value === "all" || item.kind === value);
    setFilter(value);
    if (first) setTaskId(first.id);
  };

  const nextTask = () => {
    const currentIndex = filtered.findIndex((item) => item.id === active.id);
    const next = filtered[(currentIndex + 1) % filtered.length];
    if (next) setTaskId(next.id);
  };

  const saveDraft = () => {
    localStorage.setItem(`yki-writing-draft:${active.id}`, draft);
    toast({ title: t("Đã lưu bản nháp", "Draft saved"), description: t("Bạn có thể tiếp tục bài này trên thiết bị hiện tại.", "You can continue this task on this device.") });
  };

  const submit = () => {
    if (wordCount < 10) {
      toast({ title: t("Bài viết còn quá ngắn", "Your response is too short"), description: t("Hãy viết ít nhất một đoạn hoàn chỉnh.", "Please write at least one complete paragraph."), variant: "destructive" });
      return;
    }
    setSubmitted(true);
    setTimerActive(false);
    const lengthScore = wordCount >= active.minWords && wordCount <= active.maxWords ? 2 : wordCount >= active.minWords * 0.7 ? 1 : 0;
    const contentScore = Math.min(2, Math.round((keywordHits.length / Math.max(1, active.keywords.length)) * 2));
    const structureScore = /[.!?]\s+[A-ZÅÄÖ]/.test(draft) || draft.includes("\n") ? 1 : 0;
    const score = lengthScore + contentScore + structureScore;
    void logStudentActivity({ activityType: "finnish_yki_writing", activityId: active.id, score, maxScore: 5, domain: "english", metadata: { subject: "finnish", set: active.set, task: active.task, kind: active.kind, wordCount } });
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="finnish" />
      <SEO title="YKI Finnish Writing Practice | HaiEduTech" description="Luyện viết YKI tiếng Phần Lan với 9 bộ đề, 27 nhiệm vụ thực tế và các bài luyện từ vựng, ngữ pháp, liên kết, dịch, paraphrase và typing." path="/finnish/writing" />
      <Navbar />
      <main className="container mx-auto max-w-6xl space-y-6 px-4 pb-16 pt-28 sm:px-6">
        <IllustratedPageHeader variant="finnish">
          <div className="text-center">
            <Badge className="mb-3">YKI · Kirjoittaminen</Badge>
            <h1 className="text-3xl font-bold md:text-4xl">{t("Luyện viết YKI tiếng Phần Lan", "Finnish YKI Writing Practice")}</h1>
            <p className="mx-auto mt-3 max-w-3xl text-foreground/80">{t("9 bộ đề, 27 nhiệm vụ từ tài liệu YKI thực tế cùng 7 phần luyện kỹ năng viết.", "Nine exam sets, 27 tasks from real YKI materials, and seven focused writing modes.")}</p>
          </div>
        </IllustratedPageHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-7">
            {TABS.map(({ value, icon: Icon, vi, en }) => <TabsTrigger key={value} value={value} className="gap-1.5 py-2.5"><Icon className="h-4 w-4" />{t(vi, en)}</TabsTrigger>)}
          </TabsList>

          <TabsContent value="tasks" className="mt-5 space-y-5">
            <div className="flex flex-wrap gap-2">
              {YKI_WRITING_KINDS.map((kind) => <Button key={kind.value} size="sm" variant={filter === kind.value ? "default" : "outline"} onClick={() => chooseFilter(kind.value)}>{t(kind.vi, kind.en)}</Button>)}
            </div>
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-5">
                <Card className="border-primary/20">
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="mb-2 flex flex-wrap gap-2"><Badge>{t("Bộ", "Set")} {active.set}</Badge><Badge variant="secondary">Tehtävä {active.task}</Badge>{active.date && <Badge variant="outline">{active.date}</Badge>}</div>
                        <CardTitle>{active.titleFi}</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">{active.titleVi}</p>
                      </div>
                      <Button variant="outline" onClick={nextTask}>{t("Tiếp theo", "Next")}<ChevronRight className="ml-1 h-4 w-4" /></Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-primary/5 p-4"><p className="font-semibold leading-relaxed" lang="fi">{active.promptFi}</p><p className="mt-2 text-sm text-muted-foreground">{active.promptVi}</p></div>
                    <ul className="space-y-2">{active.pointsFi.map((point, index) => <li key={point} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span><strong>{point}</strong><span className="block text-muted-foreground">{active.pointsVi[index]}</span></span></li>)}</ul>
                    <div className="flex flex-wrap gap-2">{active.starters.map((starter) => <Button key={starter} type="button" size="sm" variant="outline" onClick={() => setDraft((value) => value ? `${value}\n${starter}` : starter)} className="h-auto whitespace-normal rounded-full py-1.5 text-left font-normal">{starter}</Button>)}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-3"><CardTitle>{t("Bài viết của bạn", "Your response")}</CardTitle><div className="flex gap-2"><Badge variant="outline">{wordCount} / {active.minWords}-{active.maxWords}</Badge><Badge variant={timeLeft === 0 ? "destructive" : "secondary"}><Clock3 className="mr-1 h-3.5 w-3.5" />{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</Badge></div></div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} lang="fi" className="min-h-64 text-base leading-relaxed" placeholder="Kirjoita vastauksesi tähän..." />
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => setTimerActive((value) => !value)}><Clock3 className="mr-2 h-4 w-4" />{timerActive ? t("Tạm dừng", "Pause") : t("Bắt đầu giờ", "Start timer")}</Button>
                      <Button variant="outline" onClick={saveDraft}><Save className="mr-2 h-4 w-4" />{t("Lưu nháp", "Save draft")}</Button>
                      <Button className="ml-auto" onClick={submit}><Sparkles className="mr-2 h-4 w-4" />{t("Kiểm tra bài", "Check response")}</Button>
                    </div>
                  </CardContent>
                </Card>

                {submitted && <Card className="border-primary/30 bg-primary/5"><CardHeader><CardTitle>{t("Phản hồi YKI", "YKI feedback")}</CardTitle></CardHeader><CardContent className="space-y-4"><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-lg bg-card p-4 text-center"><strong className="text-2xl text-primary">{wordCount}</strong><p className="text-xs text-muted-foreground">{t("Số từ", "Words")}</p></div><div className="rounded-lg bg-card p-4 text-center"><strong className="text-2xl text-primary">{keywordHits.length}/{active.keywords.length}</strong><p className="text-xs text-muted-foreground">{t("Từ khóa chủ đề", "Topic words")}</p></div><div className="rounded-lg bg-card p-4 text-center"><strong className="text-2xl text-primary">{coveredPoints}/{active.pointsFi.length}</strong><p className="text-xs text-muted-foreground">{t("Ý đã bao phủ", "Points covered")}</p></div></div><p className="text-sm text-muted-foreground">{wordCount < active.minWords ? t("Bài còn ngắn. Hãy phát triển từng ý bắt buộc bằng một lý do hoặc ví dụ.", "Your response is short. Develop each required point with a reason or example.") : wordCount > active.maxWords ? t("Bài vượt độ dài mục tiêu. Hãy bỏ chi tiết lặp và giữ ý chính.", "Your response exceeds the target. Remove repetition and keep the key points.") : t("Độ dài phù hợp. Hãy kiểm tra cách chia đoạn, dạng từ và dấu câu trước khi hoàn tất.", "The length is appropriate. Check paragraphing, word forms, and punctuation before finishing.")}</p></CardContent></Card>}

                <Card className="border-amber-500/20"><CardHeader><div className="flex items-center justify-between gap-3"><CardTitle className="text-lg">{t("Bài mẫu tham khảo", "Model answer")}</CardTitle><Button variant="secondary" onClick={() => setShowModel((value) => !value)}>{showModel ? t("Ẩn", "Hide") : t("Hiện", "Show")}</Button></div></CardHeader>{showModel && <CardContent className="space-y-3"><p className="whitespace-pre-wrap leading-relaxed" lang="fi">{active.modelFi}</p><p className="border-t pt-3 text-sm text-muted-foreground">{active.modelVi}</p></CardContent>}</Card>
              </div>

              <aside className="space-y-3 lg:sticky lg:top-28 lg:self-start">
                <Card><CardHeader><CardTitle className="text-base">9 YKI sets · 27 tasks</CardTitle></CardHeader><CardContent className="grid grid-cols-3 gap-2 lg:grid-cols-1">{filtered.map((item) => <Button key={item.id} size="sm" variant={item.id === active.id ? "default" : "ghost"} onClick={() => setTaskId(item.id)} className="h-auto justify-start py-2 text-left"><span className="truncate">{item.set}.{item.task} {item.titleFi}</span></Button>)}</CardContent></Card>
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="vocabulary" className="mt-5"><SkillCards kind="vocabulary" /></TabsContent>
          <TabsContent value="grammar" className="mt-5"><SkillCards kind="grammar" /></TabsContent>
          <TabsContent value="connectors" className="mt-5"><SkillCards kind="connectors" /></TabsContent>
          <TabsContent value="translation" className="mt-5"><SentencePractice mode="translation" /></TabsContent>
          <TabsContent value="paraphrase" className="mt-5"><SentencePractice mode="paraphrase" /></TabsContent>
          <TabsContent value="typing" className="mt-5"><SentencePractice mode="typing" /></TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}