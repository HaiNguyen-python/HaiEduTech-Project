/**
 * @file Swedish.tsx
 * @description /swedish — YKI-testi ruotsi oriented learning hub (A1 → B1).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  BookOpen,
  Headphones,
  PencilLine,
  Mic,
  Sparkles,
  Compass,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Play,
  Square,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

/* -------------------------------------------------------------------------- */
/* Types & data                                                                */
/* -------------------------------------------------------------------------- */

type YkiSkill = "read" | "listen" | "write" | "speak";

interface Lesson {
  id: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  skills: YkiSkill[];
}

interface Tier {
  id: string;
  level: "A1" | "A2" | "B1";
  ykiLevel: 1 | 2 | 3;
  titleVi: string;
  titleEn: string;
  taglineVi: string;
  taglineEn: string;
  focusVi: string;
  focusEn: string;
  gradient: string;
  Icon: typeof Compass;
  lessons: Lesson[];
  focusCorner: { titleVi: string; titleEn: string; bullets: { vi: string; en: string; skills: YkiSkill[] }[] };
}

const SKILL_META: Record<YkiSkill, { vi: string; en: string; color: string; Icon: typeof BookOpen }> = {
  read:   { vi: "Đọc",  en: "Read",   color: "bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30",     Icon: BookOpen   },
  listen: { vi: "Nghe", en: "Listen", color: "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30", Icon: Headphones },
  write:  { vi: "Viết", en: "Write",  color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30", Icon: PencilLine },
  speak:  { vi: "Nói",  en: "Speak",  color: "bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30",     Icon: Mic        },
};

const TIERS: Tier[] = [
  {
    id: "a1",
    level: "A1",
    ykiLevel: 1,
    titleVi: "Chặng 1: YKI Cấp 1 (A1) — Nền tảng Sơ cấp",
    titleEn: "Stage 1: YKI Level 1 (A1) — Beginner Foundation",
    taglineVi: "Beginner Level",
    taglineEn: "Beginner Level",
    focusVi: "Làm quen với các tình huống giao tiếp cơ bản nhất trong đời sống Phần Lan.",
    focusEn: "Get familiar with the most basic everyday communication situations in Finland.",
    gradient: "from-sky-500 to-blue-500",
    Icon: Compass,
    lessons: [
      { id: "a1-pron",   titleVi: "Phát âm chuẩn Bắc Âu", titleEn: "Nordic pronunciation basics", descVi: "Nguyên âm dài/ngắn, sj-/tj-, trọng âm.", descEn: "Long/short vowels, sj-/tj- sounds, stress.", skills: ["listen", "speak"] },
      { id: "a1-self",   titleVi: "Bản thân & gia đình",   titleEn: "Self & family",               descVi: "Jag heter…, min familj, yrken.",           descEn: "Jag heter…, my family, professions.",       skills: ["speak", "write"] },
      { id: "a1-num",    titleVi: "Số đếm, ngày & giờ",    titleEn: "Numbers, dates & time",       descVi: "1–100, klockan, veckodagar.",              descEn: "1–100, telling the clock, weekdays.",       skills: ["read", "listen"] },
    ],
    focusCorner: {
      titleVi: "YKI Focus Corner — Nghe & Đọc thông báo ngắn",
      titleEn: "YKI Focus Corner — Listening & Reading short messages",
      bullets: [
        { vi: "Đọc bảng hiệu, biển báo, lời nhắn SMS ngắn.", en: "Read signs, notices, short SMS messages.", skills: ["read"] },
        { vi: "Nghe thông báo trên tàu/xe buýt và sân bay.",  en: "Listen to announcements on trains, buses and airports.", skills: ["listen"] },
      ],
    },
  },
  {
    id: "a2",
    level: "A2",
    ykiLevel: 2,
    titleVi: "Chặng 2: YKI Cấp 2 (A2) — Chuẩn Quốc tịch Sơ cấp",
    titleEn: "Stage 2: YKI Level 2 (A2) — Basic Citizenship Target",
    taglineVi: "Basic Citizenship Target",
    taglineEn: "Basic Citizenship Target",
    focusVi: "Xử lý giao dịch xã hội thường nhật: mua sắm, hỏi đường, công sở cơ bản.",
    focusEn: "Handle everyday social transactions: shopping, asking directions, basic office life.",
    gradient: "from-emerald-500 to-teal-500",
    Icon: GraduationCap,
    lessons: [
      { id: "a2-v2",     titleVi: "Trật tự từ V2 & đảo ngữ",       titleEn: "V2 word order & inversion",        descVi: "Quy tắc V2, vị trí trạng từ.",     descEn: "V2 rule, position of adverbs.",     skills: ["write", "read"] },
      { id: "a2-enett",  titleVi: "Danh từ En/Ett, xác định",       titleEn: "En/Ett nouns, definite forms",    descVi: "En bok / boken, ett hus / huset.", descEn: "En bok / boken, ett hus / huset.", skills: ["read", "write"] },
      { id: "a2-tense",  titleVi: "Thì Hiện tại & Quá khứ",         titleEn: "Present & past tense",            descVi: "Động từ nhóm 1–4, preteritum.",    descEn: "Verb groups 1–4, preteritum.",      skills: ["write", "speak"] },
    ],
    focusCorner: {
      titleVi: "YKI Focus Corner — Skriva & Tala",
      titleEn: "YKI Focus Corner — Skriva & Tala",
      bullets: [
        { vi: "Skriva: viết email xin nghỉ phép, thư cảm ơn, phản hồi tin nhắn dịch vụ.", en: "Skriva: write a short leave-of-absence email, thank-you note, reply to service messages.", skills: ["write"] },
        { vi: "Tala: phản xạ trả lời hội thoại ngắn trong phòng thi máy.",                 en: "Tala: respond to short conversational prompts in the recording booth.",                       skills: ["speak"] },
      ],
    },
  },
  {
    id: "b1",
    level: "B1",
    ykiLevel: 3,
    titleVi: "Chặng 3: YKI Cấp 3 (B1) — Quốc tịch Trung cấp & Việc làm",
    titleEn: "Stage 3: YKI Level 3 (B1) — Intermediate Citizenship & Employment",
    taglineVi: "Intermediate / Official Citizenship Level",
    taglineEn: "Intermediate / Official Citizenship Level",
    focusVi: "Trình bày quan điểm cá nhân, đọc hiểu báo chí và thảo luận chủ đề xã hội.",
    focusEn: "Express personal opinions, read the press and discuss social topics.",
    gradient: "from-amber-500 to-rose-500",
    Icon: Briefcase,
    lessons: [
      { id: "b1-sub",    titleVi: "Mệnh đề phụ nâng cao",                     titleEn: "Advanced subordinate clauses", descVi: "Bisatser với att, eftersom, fastän.", descEn: "Subordinate clauses with att, eftersom, fastän.", skills: ["write", "read"] },
      { id: "b1-inv",    titleVi: "Câu đảo ngữ & liên kết logic",             titleEn: "Inversion & cohesion",        descVi: "Liên từ däremot, dessutom, alltså.",  descEn: "Connectors däremot, dessutom, alltså.",          skills: ["write", "speak"] },
      { id: "b1-vocab",  titleVi: "Từ vựng: Môi trường, Giáo dục, Việc làm", titleEn: "Vocab: Environment, Education, Work", descVi: "Klimat, utbildning, arbetsmarknad.", descEn: "Klimat, utbildning, arbetsmarknad.",         skills: ["read", "listen"] },
    ],
    focusCorner: {
      titleVi: "YKI Focus Corner — Läsförståelse & Viết luận",
      titleEn: "YKI Focus Corner — Reading comprehension & Opinion writing",
      bullets: [
        { vi: "Läsförståelse: phân tích bài báo Yle text-TV và Hufvudstadsbladet.", en: "Läsförståelse: analyse Yle text-TV and Hufvudstadsbladet articles.", skills: ["read"] },
        { vi: "Viết luận: thư kiến nghị thể hiện đồng ý/phản đối về vấn đề công cộng.", en: "Opinion writing: feedback letter agreeing or disagreeing on a public issue.", skills: ["write"] },
      ],
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Small UI atoms                                                              */
/* -------------------------------------------------------------------------- */

const SkillBadge = ({ skill }: { skill: YkiSkill }) => {
  const { t } = useLanguage();
  const meta = SKILL_META[skill];
  const Icon = meta.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${meta.color}`}
    >
      <Icon className="h-3 w-3" />
      YKI: {t(meta.vi, meta.en)}
    </span>
  );
};

const GlobalIndicator = () => {
  const { t } = useLanguage();
  return (
    <div className="rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-emerald-500/10 px-4 py-2 text-center text-xs font-semibold text-primary sm:text-sm">
      <Sparkles className="mr-1 inline h-4 w-4" />
      {t(
        "Định hướng theo khung năng lực chuẩn YKI Testi Phần Lan (Cấp độ 1 – 3)",
        "Aligned with Finland's official YKI Testi proficiency framework (Levels 1 – 3)"
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Roadmap section                                                             */
/* -------------------------------------------------------------------------- */

const TierCard = ({ tier, index }: { tier: Tier; index: number }) => {
  const { t } = useLanguage();
  const Icon = tier.Icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="overflow-hidden border-border/60">
        <div className={`bg-gradient-to-r ${tier.gradient} p-4 text-white sm:p-5`}>
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white/20 p-2">
              <Icon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider opacity-90">
                YKI {tier.ykiLevel} · {tier.level} · {t(tier.taglineVi, tier.taglineEn)}
              </div>
              <h3 className="mt-1 font-display text-lg font-bold sm:text-xl">{t(tier.titleVi, tier.titleEn)}</h3>
              <p className="mt-1 text-sm leading-relaxed opacity-95">{t(tier.focusVi, tier.focusEn)}</p>
            </div>
          </div>
        </div>

        <CardContent className="space-y-4 p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-3">
            {tier.lessons.map((l) => (
              <div key={l.id} className="rounded-lg border border-border/60 bg-card/50 p-3">
                <div className="mb-2 flex flex-wrap gap-1">
                  {l.skills.map((s) => (
                    <SkillBadge key={s} skill={s} />
                  ))}
                </div>
                <h4 className="text-sm font-semibold text-foreground">{t(l.titleVi, l.titleEn)}</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(l.descVi, l.descEn)}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 sm:p-4">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              {t(tier.focusCorner.titleVi, tier.focusCorner.titleEn)}
            </div>
            <ul className="space-y-1.5">
              {tier.focusCorner.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground">{t(b.vi, b.en)}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {b.skills.map((s) => (
                        <SkillBadge key={s} skill={s} />
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* YKI Test Simulator widget                                                   */
/* -------------------------------------------------------------------------- */

const READING_Q = {
  passageVi:
    "Thông báo: 'Hissen i Mannerheimvägen 12 är ur funktion mellan 8.00 och 14.00 på fredag på grund av reparation. Använd trapporna.'",
  passageEn:
    "Notice: 'The lift at Mannerheimvägen 12 is out of order between 8.00 and 14.00 on Friday due to repair. Please use the stairs.'",
  question: { vi: "Có thể đi thang máy lúc 10 giờ sáng thứ Sáu.", en: "It is possible to use the lift at 10:00 on Friday." },
  options: [
    { id: "true", vi: "Đúng (Sant)", en: "True (Sant)" },
    { id: "false", vi: "Sai (Falskt)", en: "False (Falskt)" },
    { id: "nm", vi: "Không đề cập (Nämns inte)", en: "Not mentioned (Nämns inte)" },
  ],
  answer: "false",
};

const WRITING_PROMPT = {
  vi: "Viết một email bằng tiếng Thụy Điển gửi chủ nhà giải thích rằng đường ống nước trong bếp đang bị rò rỉ. Đề xuất thời gian thợ có thể đến sửa. (60–80 từ)",
  en: "Write an email in Swedish to your landlord explaining that a pipe in the kitchen is leaking. Suggest a time when a plumber can visit. (60–80 words)",
};

const SimulatorReading = () => {
  const { t } = useLanguage();
  const [choice, setChoice] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const correct = choice === READING_Q.answer;
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/40 p-4">
        <div className="mb-1 text-xs font-semibold text-muted-foreground">Läsförståelse · Hörförståelse</div>
        <p className="text-sm leading-relaxed text-foreground">{t(READING_Q.passageVi, READING_Q.passageEn)}</p>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">{t(READING_Q.question.vi, READING_Q.question.en)}</p>
        <RadioGroup value={choice} onValueChange={(v) => { setChoice(v); setSubmitted(false); }}>
          {READING_Q.options.map((o) => (
            <div key={o.id} className="flex items-center gap-2 rounded-md border border-border/60 p-2">
              <RadioGroupItem id={`r-${o.id}`} value={o.id} />
              <Label htmlFor={`r-${o.id}`} className="cursor-pointer text-sm">{t(o.vi, o.en)}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Button disabled={!choice} onClick={() => setSubmitted(true)}>{t("Kiểm tra", "Check answer")}</Button>
      {submitted && (
        <div className={`rounded-md border p-3 text-sm ${correct ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300"}`}>
          {correct
            ? t("Chính xác! Thợ sửa đang làm việc từ 8–14h.", "Correct! The lift is being repaired 8–14.")
            : t("Chưa đúng. Thang máy hỏng từ 8–14h.", "Not quite. The lift is out of order 8–14.")}
        </div>
      )}
    </div>
  );
};

const SimulatorWriting = () => {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const onTarget = words >= 60 && words <= 80;
  return (
    <div className="space-y-3">
      <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed">
        <div className="mb-1 text-xs font-semibold text-muted-foreground">Skriftlig färdighet</div>
        {t(WRITING_PROMPT.vi, WRITING_PROMPT.en)}
      </div>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder={t("Viết câu trả lời bằng tiếng Thụy Điển…", "Write your reply in Swedish…")} />
      <div className="flex items-center justify-between text-xs">
        <span className={onTarget ? "text-emerald-600" : "text-muted-foreground"}>
          {words} {t("từ", "words")} {onTarget && "✓"}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={words < 30}
          onClick={() => toast({ title: t("Đã lưu nháp", "Draft saved"), description: t("Tiếp tục luyện trên trang YKI B1.", "Keep practising on the YKI B1 page.") })}
        >
          {t("Lưu nháp", "Save draft")}
        </Button>
      </div>
    </div>
  );
};

const SimulatorSpeaking = () => {
  const { t } = useLanguage();
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const TOTAL = 30;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!recording) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= TOTAL) {
          setRecording(false);
          return TOTAL;
        }
        return e + 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [recording]);

  const start = () => { setElapsed(0); setRecording(true); };
  const stop = () => setRecording(false);
  const pct = (elapsed / TOTAL) * 100;
  const remaining = TOTAL - elapsed;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed">
        <div className="mb-1 text-xs font-semibold text-muted-foreground">Muntlig färdighet</div>
        {t(
          "Prompt: 'Berätta om dina fritidsintressen. Du har 30 sekunder.' (Hãy nói về sở thích cá nhân trong 30 giây.)",
          "Prompt: 'Berätta om dina fritidsintressen. Du har 30 sekunder.' (Talk about your hobbies for 30 seconds.)"
        )}
      </div>
      <div className="rounded-xl border bg-card p-5 text-center">
        <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full ${recording ? "animate-pulse bg-rose-500/20 text-rose-500" : "bg-muted text-muted-foreground"}`}>
          <Mic className="h-7 w-7" />
        </div>
        <Progress value={pct} className="h-2" />
        <div className="mt-2 text-xs text-muted-foreground">
          {recording
            ? t(`Đang ghi… còn ${remaining}s`, `Recording… ${remaining}s left`)
            : elapsed >= TOTAL
              ? t("Đã hết thời gian. Phòng thi tự nộp.", "Time's up. The booth has auto-submitted.")
              : t("Sẵn sàng — nhấn để mô phỏng ghi âm.", "Ready — press to simulate the recording.")}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {!recording ? (
            <Button onClick={start} className="gap-2"><Play className="h-4 w-4" />{t("Bắt đầu", "Start")}</Button>
          ) : (
            <Button variant="destructive" onClick={stop} className="gap-2"><Square className="h-4 w-4" />{t("Dừng", "Stop")}</Button>
          )}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          {t(
            "Mô phỏng định dạng phòng thi YKI: ghi âm có giới hạn thời gian, không thể tạm dừng.",
            "Simulates the YKI booth format: timed recording, no pause allowed."
          )}
        </p>
      </div>
    </div>
  );
};

const SimulatorWidget = () => {
  const { t } = useLanguage();
  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          {t("YKI Thử Thách 4 Kỹ Năng", "YKI 4-Skills Challenge")}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t(
            "Mô phỏng cấu trúc đề thi YKI Ruotsi với 4 kỹ năng riêng biệt.",
            "Simulates the YKI Swedish exam structure across the four separate skills."
          )}
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="read">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="read" className="text-xs sm:text-sm">
              <BookOpen className="mr-1 h-4 w-4" />
              {t("Đọc & Nghe", "Read & Listen")}
            </TabsTrigger>
            <TabsTrigger value="write" className="text-xs sm:text-sm">
              <PencilLine className="mr-1 h-4 w-4" />
              {t("Viết", "Write")}
            </TabsTrigger>
            <TabsTrigger value="speak" className="text-xs sm:text-sm">
              <Mic className="mr-1 h-4 w-4" />
              {t("Nói", "Speak")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="read" className="mt-4"><SimulatorReading /></TabsContent>
          <TabsContent value="write" className="mt-4"><SimulatorWriting /></TabsContent>
          <TabsContent value="speak" className="mt-4"><SimulatorSpeaking /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

const SwedishPage = () => {
  const { t } = useLanguage();
  const tiers = useMemo(() => TIERS, []);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{t("Học Tiếng Thụy Điển YKI A1–B1 | HaiEduTech", "Learn Swedish YKI A1–B1 | HaiEduTech")}</title>
        <meta
          name="description"
          content={t(
            "Lộ trình học tiếng Thụy Điển định hướng theo kỳ thi YKI Testi Ruotsi của Phần Lan, từ A1 đến B1 với mô phỏng 4 kỹ năng.",
            "Swedish learning roadmap aligned with Finland's YKI Testi Ruotsi exam, A1 to B1, with 4-skill simulator."
          )}
        />
        <link rel="canonical" href="https://haiedutech.com/swedish" />
      </Helmet>

      <div className="container mx-auto max-w-5xl space-y-8 px-4 py-8 sm:py-12">
        <GlobalIndicator />

        <header className="text-center">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            {t("Học Tiếng Thụy Điển — Lộ trình YKI", "Learn Swedish — YKI Roadmap")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t(
              "Chương trình đồng bộ với chuẩn YKI Testi Ruotsi (Phần Lan) — 3 chặng A1 → A2 → B1, mỗi chặng có thẻ kỹ năng rõ ràng và YKI Focus Corner.",
              "Aligned with Finland's YKI Testi Ruotsi standard — three stages A1 → A2 → B1, every lesson tagged with the skill it trains, plus a YKI Focus Corner."
            )}
          </p>
        </header>

        <section className="space-y-4">
          {tiers.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} />
          ))}
        </section>

        <section>
          <SimulatorWidget />
        </section>
      </div>
    </main>
  );
};

export default SwedishPage;
