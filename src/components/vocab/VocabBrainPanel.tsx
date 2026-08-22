/**
 * @file VocabBrainPanel.tsx
 * @description "Memory brain" panel at the bottom of the vocabulary page.
 * Every mastered word becomes a neuron in a rotating 3D brain: words reviewed
 * recently glow, words untouched for weeks fade away, so learners literally see
 * their memory decay and know what to revise.
 *
 * Data sources (read-only, no schema changes):
 *  - public.user_vocab_mastered -> word + reviewed_at / created_at (own rows via RLS)
 *  - public.game_scores         -> average practice accuracy
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Brain, CalendarDays, Crosshair, Flame, Pause, Play, RotateCcw, Search, Sparkles, Target, TrendingUp, Type, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { playEnglishTts } from "@/lib/englishTts";
import { buildNeurons, TIER_ORDER, tierForDays, tierInfo, type BrainNeuron, type DecayTier } from "./vocabBrainModel";
import VocabBrain2D from "./VocabBrain2D";

type LabelDensity = "low" | "medium" | "high" | "all";


const VocabBrain3D = lazy(() => import("./VocabBrain3D"));

const VN_TZ = "Asia/Ho_Chi_Minh";

/** Local (Vietnam) day key for a timestamp, e.g. 2026-08-22. */
const vnDayKey = (iso: string): string =>
  new Intl.DateTimeFormat("en-CA", { timeZone: VN_TZ, year: "numeric", month: "2-digit", day: "2-digit" })
    .format(new Date(iso));

const daysBetween = (dayKey: string, todayKey: string): number => {
  const a = new Date(`${dayKey}T00:00:00Z`).getTime();
  const b = new Date(`${todayKey}T00:00:00Z`).getTime();
  return Math.max(0, Math.round((b - a) / 86_400_000));
};

const BAND_MILESTONES = [
  { words: 100, band: "5.5" },
  { words: 300, band: "6.5" },
  { words: 500, band: "7.5" },
  { words: 800, band: "8.0" },
];

type Filter = "all" | "fresh" | "fading" | "revise" | `tier:${DecayTier}`;

interface LookupResult {
  word: string;
  phonetic?: string;
  definitionVi?: string;
  definitionEn?: string;
}

interface Props {
  subject?: string;
  /** Words the learner has starred locally (works for guests / offline). */
  localWords: string[];
  t: (vi: string, en: string) => string;
  lookupWord?: (word: string) => LookupResult | null;
  /** Jump to the practice tab so learners can revise fading words. */
  onPractice?: () => void;
}

interface MasteredRow { word: string; reviewed_at: string | null; created_at: string | null }

/** WebGL support probe (cached once per session). */
const hasWebGL = (): boolean => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
};

const VocabBrainPanel = ({ subject = "ielts", localWords, t, lookupWord, onPractice }: Props) => {
  const [rows, setRows] = useState<MasteredRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [avgAccuracy, setAvgAccuracy] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [webgl] = useState<boolean>(() => hasWebGL());
  const [glFailed, setGlFailed] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [density, setDensity] = useState<LabelDensity>("medium");
  const [paused, setPaused] = useState(false);
  const [viewKey, setViewKey] = useState(0);
  const [query, setQuery] = useState("");


  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      const uid = auth?.user?.id;
      if (!uid) { if (!cancelled) { setSignedIn(false); setLoading(false); } return; }
      if (!cancelled) setSignedIn(true);

      const [vocabRes, scoreRes] = await Promise.all([
        (supabase as any)
          .from("user_vocab_mastered")
          .select("word, reviewed_at, created_at")
          .eq("user_id", uid)
          .eq("subject", subject)
          .limit(5000),
        (supabase as any)
          .from("game_scores")
          .select("accuracy, created_at")
          .eq("user_id", uid)
          .eq("game_type", `vocab-${subject}`)
          .order("created_at", { ascending: false })
          .limit(20),
      ]);
      if (cancelled) return;
      setRows((vocabRes.data || []) as MasteredRow[]);
      const accs = ((scoreRes.data || []) as { accuracy: number | null }[])
        .map(r => r.accuracy)
        .filter((a): a is number => typeof a === "number");
      setAvgAccuracy(accs.length ? Math.round(accs.reduce((s, a) => s + a, 0) / accs.length) : null);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [subject]);

  const todayKey = useMemo(() => vnDayKey(new Date().toISOString()), []);

  /** word -> days since last review (DB rows first, local stars as "today"). */
  const wordDays = useMemo(() => {
    const map = new Map<string, number>();
    rows.forEach(r => {
      const iso = r.reviewed_at || r.created_at;
      if (!iso) return;
      const d = daysBetween(vnDayKey(iso), todayKey);
      const prev = map.get(r.word);
      map.set(r.word, prev === undefined ? d : Math.min(prev, d));
    });
    localWords.forEach(w => { if (!map.has(w)) map.set(w, 0); });
    return map;
  }, [rows, localWords, todayKey]);

  const allNeurons: BrainNeuron[] = useMemo(
    () => buildNeurons([...wordDays.entries()].map(([word, days]) => ({ word, days }))),
    [wordDays],
  );

  const neurons = useMemo(() => {
    if (filter === "all") return allNeurons;
    if (filter.startsWith("tier:")) {
      const wanted = filter.slice(5) as DecayTier;
      return allNeurons.filter(n => tierForDays(n.days).tier === wanted);
    }
    if (filter === "fresh") return allNeurons.filter(n => n.days <= 6);
    if (filter === "fading") return allNeurons.filter(n => n.days > 6 && n.days <= 20);
    return allNeurons.filter(n => n.days > 20);
  }, [allNeurons, filter]);

  const tierCounts = useMemo(() => {
    const c: Record<string, number> = {};
    allNeurons.forEach(n => {
      const { tier } = tierForDays(n.days);
      c[tier] = (c[tier] || 0) + 1;
    });
    return c;
  }, [allNeurons]);

  const totalMastered = allNeurons.length;
  const last7 = allNeurons.filter(n => n.days <= 7).length;
  const needRevise = allNeurons.filter(n => n.days > 20).length;

  // Consecutive vocabulary study days ending today or yesterday (Vietnam time).
  const streak = useMemo(() => {
    const days = new Set<string>();
    rows.forEach(r => {
      const iso = r.reviewed_at || r.created_at;
      if (iso) days.add(vnDayKey(iso));
    });
    if (localWords.length > 0) days.add(todayKey);
    if (days.size === 0) return 0;
    const cursor = new Date(`${todayKey}T00:00:00Z`);
    if (!days.has(todayKey)) {
      cursor.setUTCDate(cursor.getUTCDate() - 1);
      if (!days.has(cursor.toISOString().slice(0, 10))) return 0;
    }
    let count = 0;
    while (days.has(cursor.toISOString().slice(0, 10))) {
      count += 1;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    return count;
  }, [rows, localWords, todayKey]);

  const nextMilestone = BAND_MILESTONES.find(m => m.words > totalMastered);

  const selectedInfo = useMemo(() => {
    if (!selected) return null;
    const days = wordDays.get(selected) ?? 0;
    return { days, tier: tierForDays(days), meta: lookupWord?.(selected) || null };
  }, [selected, wordDays, lookupWord]);

  const stat = (icon: React.ReactNode, value: string, label: string, tone: string) => (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className={`mb-1 flex items-center gap-2 text-xs font-semibold ${tone}`}>{icon}{label}</div>
      <p className="text-2xl font-extrabold text-foreground">{value}</p>
    </div>
  );

  const FILTERS: { key: Filter; vi: string; en: string }[] = [
    { key: "all", vi: "Tất cả", en: "All" },
    { key: "fresh", vi: "Còn tươi", en: "Fresh" },
    { key: "fading", vi: "Đang phai", en: "Fading" },
    { key: "revise", vi: "Cần ôn lại ngay", en: "Revise now" },
  ];

  const DENSITIES: { key: LabelDensity; vi: string; en: string }[] = [
    { key: "low", vi: "Ít", en: "Few" },
    { key: "medium", vi: "Vừa", en: "Some" },
    { key: "high", vi: "Nhiều", en: "Many" },
    { key: "all", vi: "Tất cả", en: "All" },
  ];

  const use3D = webgl && !glFailed;

  const focusWord = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const hit = allNeurons.find(n => n.word.toLowerCase() === q)
      || allNeurons.find(n => n.word.toLowerCase().startsWith(q));
    return hit?.word ?? null;
  }, [query, allNeurons]);

  const brainProps = {
    neurons,
    onSelect: setSelected,
    selected,
    showLabels,
    density,
    paused,
    focusWord,
  };

  return (
    <section className="mt-10 rounded-2xl border border-border bg-card/60 p-4 sm:p-6">
      <div className="mb-5">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Brain className="h-5 w-5 text-primary" />
          {t("Bộ não từ vựng của bạn", "Your vocabulary brain")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("Mỗi từ đã thuộc là một neuron có chữ hiện ngay trên bộ não. Từ mới ôn sẽ sáng rực, từ lâu không ôn sẽ mờ dần - đúng như cách bộ não lưu và quên thông tin.",
             "Each mastered word is a labelled neuron on the brain. Recently reviewed words glow; words left alone fade away - just like human memory.")}
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stat(<Target className="h-3.5 w-3.5" />, String(totalMastered), t("Tổng từ đã thuộc", "Total mastered"), "text-primary")}
        {stat(<TrendingUp className="h-3.5 w-3.5" />, String(last7), t("Từ mới 7 ngày", "New in 7 days"), "text-emerald-600")}
        {stat(<Flame className="h-3.5 w-3.5" />, String(streak), t("Chuỗi ngày học từ", "Vocab study streak"), "text-orange-500")}
        {stat(<CalendarDays className="h-3.5 w-3.5" />, avgAccuracy === null ? "-" : `${avgAccuracy}%`, t("Độ chính xác Practice", "Practice accuracy"), "text-indigo-500")}
      </div>

      {nextMilestone && (
        <div className="mb-3">
          <Badge variant="outline">
            {t(
              `Còn ${nextMilestone.words - totalMastered} từ nữa để đạt mốc ${nextMilestone.words} từ (Band ${nextMilestone.band})`,
              `${nextMilestone.words - totalMastered} words to reach ${nextMilestone.words} words (Band ${nextMilestone.band})`,
            )}
          </Badge>
        </div>
      )}

      {/* Brain viewport */}
      <div className="relative h-[520px] overflow-hidden rounded-2xl border border-border bg-[radial-gradient(ellipse_at_center,theme(colors.slate.800),theme(colors.slate.950)_70%)] lg:h-[620px]">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-300">
            {t("Đang tải bộ não...", "Loading your brain...")}
          </div>
        ) : totalMastered === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <Brain className="h-12 w-12 text-slate-600" />
            <p className="text-sm font-semibold text-slate-200">
              {t("Đánh dấu ⭐ từ đầu tiên để thắp sáng bộ não của bạn.",
                 "Mark ⭐ on your first word to light up your brain.")}
            </p>
            {!signedIn && (
              <p className="text-xs text-slate-400">
                {t("Đăng nhập để lưu tiến độ trên mọi thiết bị.", "Sign in to save progress across devices.")}
              </p>
            )}
          </div>
        ) : use3D ? (
          <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-slate-300">{t("Đang dựng mô hình 3D...", "Building the 3D model...")}</div>}>
            <ErrorSafe onError={() => setGlFailed(true)}>
              <VocabBrain3D key={viewKey} {...brainProps} />
            </ErrorSafe>
          </Suspense>
        ) : (
          <VocabBrain2D {...brainProps} />
        )}

        {totalMastered > 0 && !loading && (
          <>
            {/* Floating control bar */}
            <div className="absolute inset-x-3 top-3 flex flex-wrap items-center gap-2 rounded-xl bg-black/45 p-2 backdrop-blur">
              {FILTERS.map(f => (
                <Button
                  key={f.key}
                  size="sm"
                  variant={filter === f.key ? "default" : "secondary"}
                  className="h-8"
                  onClick={() => setFilter(f.key)}
                >
                  {t(f.vi, f.en)}
                </Button>
              ))}
              <span className="mx-1 h-6 w-px bg-white/20" />
              <Button size="sm" variant="secondary" className="h-8 gap-1.5" onClick={() => setShowLabels(v => !v)}>
                {showLabels ? <Type className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                {showLabels ? t("Đang hiện chữ", "Labels on") : t("Chỉ chấm sáng", "Dots only")}
              </Button>
              {showLabels && (
                <div className="flex items-center gap-1 rounded-lg bg-white/10 p-0.5">
                  {DENSITIES.map(d => (
                    <button
                      key={d.key}
                      onClick={() => setDensity(d.key)}
                      className={`rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                        density === d.key ? "bg-primary text-primary-foreground" : "text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      {t(d.vi, d.en)}
                    </button>
                  ))}
                </div>
              )}
              <Button size="sm" variant="secondary" className="h-8 gap-1.5" onClick={() => setPaused(v => !v)}>
                {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                {paused ? t("Xoay tiếp", "Rotate") : t("Tạm dừng", "Pause")}
              </Button>
              <Button size="sm" variant="secondary" className="h-8 gap-1.5" onClick={() => setViewKey(k => k + 1)}>
                <Crosshair className="h-3.5 w-3.5" />
                {t("Góc nhìn gốc", "Reset view")}
              </Button>
              <div className="relative ml-auto">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={t("Tìm từ...", "Find a word...")}
                  className="h-8 w-40 rounded-lg border border-white/15 bg-white/10 pl-7 pr-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-black/45 px-2.5 py-1.5 text-[11px] text-slate-200 backdrop-blur">
              {t("Kéo để xoay · cuộn để zoom · bấm vào từ để xem chi tiết",
                 "Drag to rotate · scroll to zoom · click a word for details")}
            </div>

            {/* Colour legend inside the viewport - click a level to filter it */}
            <div className="absolute bottom-3 right-3 hidden flex-col gap-1 rounded-xl bg-black/50 p-2.5 text-[11px] backdrop-blur sm:flex">
              {TIER_ORDER.map(tier => {
                const info = tierInfo(tier);
                const active = filter === `tier:${tier}`;
                return (
                  <button
                    key={tier}
                    onClick={() => setFilter(active ? "all" : `tier:${tier}`)}
                    className={`flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-left transition ${
                      active ? "bg-white/20 text-white" : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: info.color, boxShadow: `0 0 8px ${info.color}` }}
                    />
                    {t(info.vi, info.en)}
                    <span className="ml-auto pl-2 font-semibold text-white">{tierCounts[tier] || 0}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Legend (mobile) */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:hidden">
        {TIER_ORDER.map(tier => {
          const info = tierInfo(tier);
          const active = filter === `tier:${tier}`;
          return (
            <button
              key={tier}
              onClick={() => setFilter(active ? "all" : `tier:${tier}`)}
              className={`flex items-center gap-1.5 rounded-full border px-2 py-1 ${
                active ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground"
              }`}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: info.color }}
              />
              {t(info.vi, info.en)} <span className="font-semibold text-foreground">{tierCounts[tier] || 0}</span>
            </button>
          );
        })}
      </div>



      {needRevise > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-amber-300/60 bg-amber-50 p-3 text-sm dark:border-amber-500/30 dark:bg-amber-500/10">
          <RotateCcw className="h-4 w-4 text-amber-600" />
          <span className="text-foreground">
            {t(`${needRevise} từ đang phai dần - hãy luyện lại ngay để giữ ký ức.`,
               `${needRevise} words are fading - revise them now to keep the memory.`)}
          </span>
          {onPractice && (
            <Button size="sm" onClick={onPractice}>{t("Luyện lại ngay", "Practice now")}</Button>
          )}
        </div>
      )}

      {/* Selected neuron card */}
      {selectedInfo && selected && (
        <div className="mt-4 rounded-xl border border-border bg-background p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg font-bold text-foreground">{selected}</span>
            {selectedInfo.meta?.phonetic && (
              <span className="text-sm text-muted-foreground">/{selectedInfo.meta.phonetic.replace(/^\/|\/$/g, "")}/</span>
            )}
            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => playEnglishTts(selected)}>
              <Volume2 className="h-4 w-4" />
            </Button>
            <Badge style={{ backgroundColor: selectedInfo.tier.color }} className="text-white">
              {t(selectedInfo.tier.vi, selectedInfo.tier.en)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {selectedInfo.days === 0
                ? t("Ôn hôm nay", "Reviewed today")
                : t(`Ôn ${selectedInfo.days} ngày trước`, `Reviewed ${selectedInfo.days} days ago`)}
            </span>
            {onPractice && (
              <Button size="sm" variant="outline" className="ml-auto" onClick={onPractice}>
                {t("Ôn lại từ này", "Practise this word")}
              </Button>
            )}
          </div>

          {selectedInfo.meta?.definitionVi && (
            <p className="mt-2 text-sm text-foreground">{selectedInfo.meta.definitionVi}</p>
          )}
          {selectedInfo.meta?.definitionEn && (
            <p className="text-sm text-muted-foreground">{selectedInfo.meta.definitionEn}</p>
          )}
        </div>
      )}
    </section>
  );
};

/**
 * Minimal error boundary: if WebGL context creation throws we silently fall back
 * to the 2D brain instead of blanking the page.
 */
class ErrorSafe extends React.Component<{ onError: () => void; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default VocabBrainPanel;
