/**
 * @file SwedishA1DailyPlan.tsx
 * @description Hiển thị lộ trình tự học tiếng Thụy Điển A1 trong 30 ngày,
 *              theo dõi tiến độ qua localStorage, nhóm theo tuần và mở rộng
 *              chi tiết từng ngày.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CalendarDays,
  Clock,
  Sparkles,
  Target,
  Trophy,
  CheckCircle2,
  Headphones,
  Mic,
  BookOpen,
  PencilLine,
  Repeat,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SWEDISH_A1_DAILY_PLAN, type DailyLesson, type DailyFocus } from "@/data/swedishA1DailyPlan";
import { toast } from "@/hooks/use-toast";
import { SwedishAudioButton } from "@/components/swedish/SwedishAudioButton";
import { SWEDISH_A1_DAILY_EXTRAS } from "@/data/swedishA1DailyExtras";
import { getDailyDeep } from "@/data/swedishA1DailyDeep";
import { SwedishA1DeepTheory } from "@/components/swedish/SwedishA1DeepTheory";

const STORAGE_KEY = "haiedu_swedish_a1_daily_v1";

const FOCUS_META: Record<DailyFocus, { vi: string; en: string; cls: string; Icon: typeof BookOpen }> = {
  listen: { vi: "Nghe", en: "Listen", cls: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30", Icon: Headphones },
  speak: { vi: "Nói", en: "Speak", cls: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30", Icon: Mic },
  read: { vi: "Đọc", en: "Read", cls: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30", Icon: BookOpen },
  write: { vi: "Viết", en: "Write", cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30", Icon: PencilLine },
  vocab: { vi: "Từ vựng", en: "Vocab", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30", Icon: Sparkles },
  review: { vi: "Ôn tập", en: "Review", cls: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30", Icon: Repeat },
};

const loadCompleted = (): Set<number> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as number[];
    return new Set(arr);
  } catch {
    return new Set();
  }
};

const saveCompleted = (set: Set<number>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    /* noop */
  }
};

export const SwedishA1DailyPlan = () => {
  const { t, lang } = useLanguage();
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  useEffect(() => {
    setCompleted(loadCompleted());
  }, []);

  const toggleDay = (day: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
        toast({
          title: t("Tuyệt vời!", "Great job!"),
          description: t(`Đã hoàn thành ngày ${day}/30.`, `Day ${day}/30 completed.`),
        });
      }
      saveCompleted(next);
      return next;
    });
  };

  const resetAll = () => {
    setCompleted(new Set());
    saveCompleted(new Set());
    toast({ title: t("Đã đặt lại tiến độ.", "Progress reset.") });
  };

  const totalDays = SWEDISH_A1_DAILY_PLAN.length;
  const doneCount = completed.size;
  const percent = Math.round((doneCount / totalDays) * 100);

  const weeks = useMemo(() => {
    const map: Record<number, DailyLesson[]> = {};
    for (const l of SWEDISH_A1_DAILY_PLAN) {
      if (!map[l.week]) map[l.week] = [];
      map[l.week].push(l);
    }
    return Object.entries(map)
      .map(([w, list]) => ({ week: Number(w), list }))
      .sort((a, b) => a.week - b.week);
  }, []);

  const weekTitles: Record<number, { vi: string; en: string }> = {
    1: { vi: "Tuần 1 · Làm quen âm & chào hỏi", en: "Week 1 · Sounds & greetings" },
    2: { vi: "Tuần 2 · Sinh hoạt & mua sắm", en: "Week 2 · Daily life & shopping" },
    3: { vi: "Tuần 3 · Cơ thể, nhà ở & sức khoẻ", en: "Week 3 · Body, home & health" },
    4: { vi: "Tuần 4 · Văn hoá Bắc Âu & giao tiếp", en: "Week 4 · Nordic culture & comms" },
    5: { vi: "Tuần 5 · Chặng nước rút & tốt nghiệp A1", en: "Week 5 · Final sprint & A1 graduation" },
  };

  return (
    <section className="space-y-6">
      {/* Hero */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-emerald-500/5 to-transparent">
        <CardContent className="space-y-3 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            <h2 className="font-display text-xl font-bold sm:text-2xl">
              {t("🗓️ Lộ trình tự học A1 trong 30 ngày", "🗓️ Self-Study A1 in 30 Days")}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t(
              "Treo máy không kịp? Cứ mỗi ngày 25-40 phút theo lộ trình này, sau 1 tháng bạn sẽ tự tin giới thiệu bản thân, đi siêu thị, hỏi đường, gọi điện đặt hẹn — đủ tự tin cho YKI Cấp 1.",
              "Only 25-40 minutes a day — after a month you'll confidently introduce yourself, shop, ask directions and book appointments. Solid YKI Level 1 footing."
            )}
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold">
                {t(`Hoàn thành: ${doneCount}/${totalDays} ngày`, `Completed: ${doneCount}/${totalDays} days`)}
              </span>
              <span>{percent}%</span>
            </div>
            <Progress value={percent} className="h-2" />
          </div>
          {doneCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={resetAll} className="gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" />
                {t("Đặt lại tiến độ", "Reset progress")}
              </Button>
              {doneCount === totalDays && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                  <Trophy className="h-3.5 w-3.5" /> {t("Đã tốt nghiệp A1!", "A1 graduated!")}
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Week sections */}
      {weeks.map(({ week, list }) => {
        const weekDone = list.filter((l) => completed.has(l.day)).length;
        const title = weekTitles[week];
        return (
          <Card key={week} className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold sm:text-xl">
                  {t(title.vi, title.en)}
                </h3>
                <span className="text-xs font-semibold text-muted-foreground">
                  {weekDone}/{list.length} ✓
                </span>
              </div>

              <Accordion type="multiple" className="space-y-2">
                {list.map((d) => {
                  const isDone = completed.has(d.day);
                  return (
                    <AccordionItem
                      key={d.day}
                      value={`day-${d.day}`}
                      className={`overflow-hidden rounded-lg border ${isDone ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-card"}`}
                    >
                      <AccordionTrigger className="px-3 py-3 hover:no-underline sm:px-4">
                        <div className="flex flex-1 flex-wrap items-center gap-2 pr-2 text-left">
                          <span
                            className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              isDone
                                ? "bg-emerald-500 text-white"
                                : "bg-blue-500/15 text-blue-700 dark:text-blue-300"
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="h-4 w-4" /> : d.day}
                          </span>
                          <span className="flex-1 min-w-0 text-sm font-semibold sm:text-base">
                            {t(d.titleVi, d.titleEn)}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Clock className="h-3 w-3" /> {d.minutes}'
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-4 sm:px-4">
                        <div className="space-y-4 pt-1">
                          {/* skills */}
                          <div className="flex flex-wrap gap-1.5">
                            {d.focus.map((f) => {
                              const meta = FOCUS_META[f];
                              const Icon = meta.Icon;
                              return (
                                <span
                                  key={f}
                                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${meta.cls}`}
                                >
                                  <Icon className="h-3 w-3" /> {t(meta.vi, meta.en)}
                                </span>
                              );
                            })}
                          </div>

                          {/* goal */}
                          <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
                            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
                              <Target className="h-3.5 w-3.5" /> {t("Mục tiêu hôm nay", "Today's goal")}
                            </div>
                            <p className="text-sm leading-relaxed">{t(d.goalVi, d.goalEn)}</p>
                          </div>

                          {/* study steps */}
                          <div>
                            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              {t("📚 Học (15-25 phút)", "📚 Study (15-25 min)")}
                            </p>
                            <ul className="space-y-1.5 text-sm leading-relaxed">
                              {(lang === "vi" ? d.studyVi : d.studyEn).map((s, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="shrink-0 text-blue-500">{i + 1}.</span>
                                  <span>{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* phrases */}
                          <div>
                            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              {t("🗣️ 5 câu gối đầu giường", "🗣️ Bedside 5 phrases")}
                            </p>
                            <div className="overflow-x-auto">
                              <table className="w-full min-w-[480px] border-collapse text-sm">
                                <thead>
                                  <tr className="text-left text-xs text-muted-foreground">
                                    <th className="border-b border-border py-1 pr-3 font-semibold">Svenska</th>
                                    <th className="border-b border-border py-1 pr-3 font-semibold">{t("Tiếng Việt", "Vietnamese")}</th>
                                    <th className="border-b border-border py-1 font-semibold">English</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {d.phrases.map((p, i) => (
                                    <tr key={i} className="align-top">
                                      <td className="border-b border-border/50 py-1.5 pr-3 font-medium text-blue-700 dark:text-blue-300">
                                        <div className="flex items-center gap-1.5">
                                          <SwedishAudioButton text={p.sv} size="xs" />
                                          <span>{p.sv}</span>
                                        </div>
                                      </td>
                                      <td className="border-b border-border/50 py-1.5 pr-3 text-muted-foreground">{p.vi}</td>
                                      <td className="border-b border-border/50 py-1.5 text-muted-foreground">{p.en}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* output + challenge */}
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                              <div className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                ✍️ {t("Bài tập đầu ra (10 phút)", "Output task (10 min)")}
                              </div>
                              <p className="text-sm leading-relaxed">{t(d.outputVi, d.outputEn)}</p>
                            </div>
                            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                              <div className="mb-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                                ⚡ {t("Thử thách 5 phút", "5-min challenge")}
                              </div>
                              <p className="text-sm leading-relaxed">{t(d.challengeVi, d.challengeEn)}</p>
                            </div>
                          </div>

                          {/* success criteria */}
                          <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-3">
                            <div className="mb-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                              🎯 {t("Tiêu chí 'hôm nay đạt yêu cầu'", "Today's success bar")}
                            </div>
                            <p className="text-sm leading-relaxed">{t(d.successVi, d.successEn)}</p>
                          </div>

                          {/* extras: grammar focus, mini-dialog, extra vocab, cultural note */}
                          {SWEDISH_A1_DAILY_EXTRAS[d.day] && (
                            <div className="space-y-3">
                              {SWEDISH_A1_DAILY_EXTRAS[d.day].grammarVi && (
                                <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-3">
                                  <div className="mb-1 text-xs font-semibold text-violet-700 dark:text-violet-300">
                                    📐 {t("Điểm ngữ pháp trọng tâm", "Grammar focus")}
                                  </div>
                                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {t(SWEDISH_A1_DAILY_EXTRAS[d.day].grammarVi!, SWEDISH_A1_DAILY_EXTRAS[d.day].grammarEn!)}
                                  </p>
                                </div>
                              )}
                              {SWEDISH_A1_DAILY_EXTRAS[d.day].dialog && (
                                <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
                                  <div className="mb-2 text-xs font-semibold text-sky-700 dark:text-sky-300">
                                    🎭 {t("Mini hội thoại (nghe & lặp)", "Mini dialog (listen & repeat)")}
                                  </div>
                                  <ul className="space-y-1.5 text-sm">
                                    {SWEDISH_A1_DAILY_EXTRAS[d.day].dialog!.map((line, i) => (
                                      <li key={i} className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-sky-700 dark:text-sky-300">
                                          {line.who}
                                        </span>
                                        <SwedishAudioButton text={line.sv} size="xs" />
                                        <span className="font-medium text-foreground">{line.sv}</span>
                                        <span className="text-muted-foreground">— {t(line.vi, line.en)}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {SWEDISH_A1_DAILY_EXTRAS[d.day].extraVocab && (
                                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                                  <div className="mb-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                    📚 {t("10 từ vựng mở rộng", "10 extra vocabulary")}
                                  </div>
                                  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                                    {SWEDISH_A1_DAILY_EXTRAS[d.day].extraVocab!.map((v, i) => (
                                      <div key={i} className="flex items-center gap-2 text-sm">
                                        <SwedishAudioButton text={v.sv} size="xs" />
                                        <span className="font-semibold">{v.sv}</span>
                                        <span className="text-muted-foreground">— {t(v.vi, v.en)}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {SWEDISH_A1_DAILY_EXTRAS[d.day].cultureVi && (
                                <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3">
                                  <div className="mb-1 text-xs font-semibold text-rose-700 dark:text-rose-300">
                                    🇸🇪 {t("Góc văn hoá Bắc Âu", "Nordic culture corner")}
                                  </div>
                                  <p className="text-sm leading-relaxed">
                                    {t(SWEDISH_A1_DAILY_EXTRAS[d.day].cultureVi!, SWEDISH_A1_DAILY_EXTRAS[d.day].cultureEn!)}
                                  </p>
                                </div>
                              )}
                              {SWEDISH_A1_DAILY_EXTRAS[d.day].pitfallsVi && (
                                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                                  <div className="mb-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                                    ⚠️ {t("Lỗi hay gặp", "Common mistakes")}
                                  </div>
                                  <ul className="ml-4 list-disc space-y-0.5 text-sm leading-relaxed">
                                    {(lang === "vi"
                                      ? SWEDISH_A1_DAILY_EXTRAS[d.day].pitfallsVi!
                                      : SWEDISH_A1_DAILY_EXTRAS[d.day].pitfallsEn!).map((p, i) => (
                                      <li key={i}>{p}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                          {/* DEEP DIVE: patterns, listening, writing, self-check */}
                          {(() => {
                            const deep = getDailyDeep(d.day);
                            if (!deep.patterns && !deep.listening && !deep.writing && !deep.selfCheck) return null;
                            return (
                              <div className="space-y-3 rounded-xl border-2 border-dashed border-blue-500/40 bg-gradient-to-br from-blue-500/5 via-emerald-500/5 to-transparent p-3 sm:p-4">
                                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                                  <Sparkles className="h-3.5 w-3.5" />
                                  {t("🚀 Đào sâu chuyên gia (Deep Dive)", "🚀 Expert Deep Dive")}
                                </div>

                                {deep.patterns && (
                                  <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
                                    <div className="mb-2 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                                      🧩 {t("Mẫu câu khung - tự ghép", "Sentence patterns - build your own")}
                                    </div>
                                    <div className="space-y-3">
                                      {deep.patterns.map((pt, i) => (
                                        <div key={i} className="space-y-1.5">
                                          <div className="flex flex-wrap items-center gap-2 text-sm">
                                            <code className="rounded bg-cyan-500/15 px-2 py-0.5 font-mono text-cyan-800 dark:text-cyan-200">{pt.frame}</code>
                                            <span className="text-xs text-muted-foreground">— {t(pt.vi, pt.en)}</span>
                                          </div>
                                          <ul className="ml-4 space-y-1 text-sm">
                                            {pt.examples.map((ex, j) => (
                                              <li key={j} className="flex flex-wrap items-center gap-2">
                                                <SwedishAudioButton text={ex.sv} size="xs" />
                                                <span className="font-medium">{ex.sv}</span>
                                                <span className="text-muted-foreground">— {t(ex.vi, ex.en)}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {deep.listening && (
                                  <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-3">
                                    <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300">
                                      <Headphones className="h-3.5 w-3.5" />
                                      {t("Đoạn nghe ngắn + câu hỏi hiểu", "Mini listening + comprehension")}
                                    </div>
                                    <div className="mb-2 flex items-start gap-2">
                                      <SwedishAudioButton text={deep.listening.sv} size="sm" />
                                      <div className="flex-1">
                                        <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-foreground">{deep.listening.sv}</p>
                                        <p className="mt-1 text-xs italic text-muted-foreground">{t(deep.listening.vi, deep.listening.en)}</p>
                                      </div>
                                    </div>
                                    <ol className="ml-5 list-decimal space-y-1 text-sm">
                                      {deep.listening.questions.map((q, i) => (
                                        <li key={i}>
                                          <span className="font-medium">{q.q}</span>
                                          <details className="mt-0.5">
                                            <summary className="cursor-pointer text-xs text-purple-600 hover:text-purple-800 dark:text-purple-300">
                                              {t("Xem đáp án", "Show answer")}
                                            </summary>
                                            <p className="mt-1 rounded bg-purple-500/10 px-2 py-1 text-xs text-purple-800 dark:text-purple-200">→ {q.a}</p>
                                          </details>
                                        </li>
                                      ))}
                                    </ol>
                                  </div>
                                )}

                                {deep.writing && (
                                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                                    <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                      <PencilLine className="h-3.5 w-3.5" />
                                      {t("Bài viết có đáp án mẫu", "Writing prompt + model answer")}
                                    </div>
                                    <p className="mb-2 text-sm leading-relaxed">
                                      <span className="font-semibold">📝 {t("Đề:", "Prompt:")}</span>{" "}
                                      {t(deep.writing.promptVi, deep.writing.promptEn)}
                                    </p>
                                    <details className="rounded-md bg-emerald-500/10 p-2">
                                      <summary className="cursor-pointer text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                        {t("📖 Xem đáp án mẫu (sau khi tự viết)", "📖 Reveal model answer (try first!)")}
                                      </summary>
                                      <div className="mt-2 space-y-1.5">
                                        <div className="flex items-start gap-2">
                                          <SwedishAudioButton text={deep.writing.sampleSv} size="xs" />
                                          <p className="whitespace-pre-wrap text-sm font-medium">{deep.writing.sampleSv}</p>
                                        </div>
                                        <p className="whitespace-pre-wrap text-xs italic text-muted-foreground">
                                          {t(deep.writing.sampleVi, deep.writing.sampleEn)}
                                        </p>
                                      </div>
                                    </details>
                                  </div>
                                )}

                                {deep.selfCheck && (
                                  <div className="rounded-lg border border-pink-500/30 bg-pink-500/5 p-3">
                                    <div className="mb-2 text-xs font-semibold text-pink-700 dark:text-pink-300">
                                      ✅ {t("Tự kiểm tra cuối ngày", "End-of-day self-check")}
                                    </div>
                                    <ol className="ml-5 list-decimal space-y-1 text-sm">
                                      {deep.selfCheck.map((qa, i) => (
                                        <li key={i}>
                                          <span className="font-medium">{qa.q}</span>
                                          <details className="mt-0.5">
                                            <summary className="cursor-pointer text-xs text-pink-600 hover:text-pink-800 dark:text-pink-300">
                                              {t("Xem đáp án", "Show answer")}
                                            </summary>
                                            <p className="mt-1 rounded bg-pink-500/10 px-2 py-1 text-xs text-pink-800 dark:text-pink-200">→ {qa.a}</p>
                                          </details>
                                        </li>
                                      ))}
                                    </ol>
                                  </div>
                                )}
                              </div>
                            );
                          })()}

                          {/* complete checkbox */}
                          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 transition-colors hover:bg-secondary/70">
                            <Checkbox
                              checked={isDone}
                              onCheckedChange={() => toggleDay(d.day)}
                              aria-label={t("Đánh dấu hoàn thành", "Mark as complete")}
                            />
                            <span className="text-sm font-semibold">
                              {isDone
                                ? t(`✅ Đã hoàn thành ngày ${d.day}`, `✅ Day ${d.day} completed`)
                                : t(`Đánh dấu hoàn thành ngày ${d.day}`, `Mark day ${d.day} complete`)}
                            </span>
                          </label>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default SwedishA1DailyPlan;
