/**
 * @file SwedishA1DeepTheory.tsx
 * @description Interactive deep-theory + 3 drills block (fill-in-blank,
 *              translate VI→SV, matching pairs) for each A1 30-day lesson.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { BookOpen, CheckCircle2, XCircle, Languages, Shuffle, GraduationCap, Lightbulb, Sparkles, AlertTriangle, Quote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SwedishAudioButton } from "@/components/swedish/SwedishAudioButton";
import { getDailyExpansion, type FillBlank, type TranslatePair, type MatchPair } from "@/data/swedishA1DailyExpansion";
import { getDailyEnhancement, WEEK_HERO, getDayTopicImage } from "@/data/swedishA1DailyEnhancement";
import { getDailyDeepPlus } from "@/data/swedishA1DailyDeepPlus";

interface Props {
  day: number;
  week?: number;
  lang: string;
  t: (vi: string, en: string) => string;
}

const norm = (s: string) =>
  (s || "").toString().toLowerCase().normalize("NFC").replace(/[.,!?;:]/g, "").trim();

export const SwedishA1DeepTheory = ({ day, week, lang, t }: Props) => {
  const ex = getDailyExpansion(day);
  if (!ex) return null;
  const enh = getDailyEnhancement(day);
  const hero = week ? WEEK_HERO[week] : undefined;
  const topic = getDayTopicImage(day);
  const plus = getDailyDeepPlus(day);


  return (
    <div className="space-y-3 rounded-xl border-2 border-dashed border-indigo-500/40 bg-gradient-to-br from-indigo-500/5 via-fuchsia-500/5 to-transparent p-3 sm:p-4">
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        <GraduationCap className="h-3.5 w-3.5" />
        {t("📘 Lý thuyết chuyên sâu + Bài tập theo sau", "📘 Deep theory + follow-up drills")}
      </div>

      {/* Week hero illustration */}
      {hero && (
        <figure className="overflow-hidden rounded-xl border border-indigo-500/30 bg-white/40 dark:bg-white/5">
          <img
            src={hero.src}
            alt={t(hero.captionVi, hero.captionEn)}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-40 w-full object-cover sm:h-52"
          />
          <figcaption className="px-3 py-1.5 text-center text-[11px] italic text-muted-foreground">
            {t(hero.captionVi, hero.captionEn)}
          </figcaption>
        </figure>
      )}

      {/* Why this matters */}
      {enh && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            {t("Vì sao điểm này quan trọng?", "Why does this matter?")}
          </div>
          <p className="text-sm leading-relaxed text-foreground">{t(enh.whyVi, enh.whyEn)}</p>
        </div>
      )}

      {/* Theory */}
      <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-3">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <BookOpen className="h-3.5 w-3.5" />
          {t(ex.theoryTitleVi, ex.theoryTitleEn)}
        </div>
        <ul className="space-y-1.5 text-sm leading-relaxed">
          {(lang === "vi" ? ex.theoryVi : ex.theoryEn).map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className="shrink-0 font-semibold text-indigo-500">{i + 1}.</span>
              <span className="whitespace-pre-wrap">{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Topical illustration for this specific day */}
      {topic && (
        <figure className="overflow-hidden rounded-xl border border-fuchsia-500/30 bg-white/40 dark:bg-white/5">
          <img
            src={topic.src}
            alt={t(topic.captionVi, topic.captionEn)}
            loading="lazy"
            width={1280}
            height={800}
            className="h-48 w-full object-cover sm:h-64"
          />
          <figcaption className="px-3 py-1.5 text-center text-[11px] italic text-muted-foreground">
            🎨 {t(topic.captionVi, topic.captionEn)}
          </figcaption>
        </figure>
      )}


      {/* Memory trick */}
      {enh && (
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <Lightbulb className="h-3.5 w-3.5" />
            {t("Mẹo nhớ nhanh cho người mới", "Quick memory trick for beginners")}
          </div>
          <p className="text-sm leading-relaxed text-foreground">{t(enh.mnemonicVi, enh.mnemonicEn)}</p>
        </div>
      )}

      {ex.fill && ex.fill.length > 0 && <FillDrill items={ex.fill} t={t} lang={lang} />}
      {ex.translate && ex.translate.length > 0 && <TranslateDrill items={ex.translate} t={t} lang={lang} />}
      {ex.match && ex.match.length > 0 && <MatchDrill items={ex.match} t={t} />}
    </div>
  );
};

/* ---------- Fill in blank ---------- */
const FillDrill = ({ items, t, lang }: { items: FillBlank[]; t: Props["t"]; lang: string }) => {
  const [values, setValues] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const score = useMemo(() => {
    if (!checked) return 0;
    return items.reduce((n, it, i) => {
      const accepted = it.a.split("|").map((x) => norm(x));
      return n + (accepted.includes(norm(values[i] || "")) ? 1 : 0);
    }, 0);
  }, [checked, values, items]);

  return (
    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <Shuffle className="h-3.5 w-3.5" />
          {t("✍️ Điền vào chỗ trống (5 câu)", "✍️ Fill in the blanks (5)")}
        </div>
        {checked && (
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {score}/{items.length} ✓
          </span>
        )}
      </div>
      <ol className="space-y-2">
        {items.map((it, i) => {
          const accepted = it.a.split("|").map((x) => norm(x));
          const isCorrect = checked && accepted.includes(norm(values[i] || ""));
          return (
            <li key={i} className="rounded-md bg-card/60 border border-border/40 p-2 text-sm">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <SwedishAudioButton text={it.sv.replace(/___/g, it.a.split("|")[0])} size="xs" />
                <span className="font-medium">
                  {it.sv.split("___").map((seg, idx, arr) => (
                    <span key={idx}>
                      {seg}
                      {idx < arr.length - 1 && (
                        <Input
                          value={values[i] || ""}
                          onChange={(e) => setValues((p) => ({ ...p, [i]: e.target.value }))}
                          disabled={checked}
                          className="mx-1 inline-block h-7 w-28 px-2 text-sm"
                          aria-label="fill"
                        />
                      )}
                    </span>
                  ))}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {t(`💡 ${it.vi}`, `💡 ${it.en}`)}
              </div>
              {checked && (
                <div
                  className={`mt-1 flex items-center gap-1 text-xs ${
                    isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"
                  }`}
                >
                  {isCorrect ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                  {isCorrect ? t("Đúng!", "Correct!") : t(`Đáp án: ${it.a}`, `Answer: ${it.a}`)}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-2 flex gap-2">
        {!checked ? (
          <Button size="sm" onClick={() => setChecked(true)} className="bg-emerald-600 hover:bg-emerald-700">
            {t("Chấm bài", "Check")}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setChecked(false);
              setValues({});
            }}
          >
            {t("Làm lại", "Retry")}
          </Button>
        )}
      </div>
    </div>
  );
};

/* ---------- Translate VI/EN → SV ---------- */
const TranslateDrill = ({ items, t, lang }: { items: TranslatePair[]; t: Props["t"]; lang: string }) => {
  const [values, setValues] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const isCorrect = (i: number) => norm(values[i] || "") === norm(items[i].sv);

  return (
    <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
        <Languages className="h-3.5 w-3.5" />
        {t("🌐 Dịch sang Thuỵ Điển", "🌐 Translate into Swedish")}
      </div>
      <ol className="space-y-2">
        {items.map((it, i) => {
          const ok = isCorrect(i);
          const wasChecked = checked[i];
          return (
            <li key={i} className="rounded-md bg-card/60 border border-border/40 p-2 text-sm space-y-1.5">
              <div className="font-medium">
                {i + 1}. {lang === "vi" ? it.vi : it.en}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Input
                  value={values[i] || ""}
                  onChange={(e) => {
                    setValues((p) => ({ ...p, [i]: e.target.value }));
                    if (checked[i]) setChecked((p) => ({ ...p, [i]: false }));
                  }}
                  placeholder={t("Viết câu tiếng Thuỵ Điển…", "Type the Swedish sentence…")}
                  className="h-8 flex-1 min-w-[200px] text-sm"
                  disabled={revealed[i]}
                />
                <Button
                  size="sm"
                  onClick={() => setChecked((p) => ({ ...p, [i]: true }))}
                  disabled={!values[i]?.trim() || revealed[i]}
                  className="h-8 text-xs"
                >
                  {t("Kiểm tra", "Check")}
                </Button>
                {!revealed[i] && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setRevealed((p) => ({ ...p, [i]: true }))}
                    className="h-8 text-xs"
                  >
                    {t("Hiện đáp án", "Reveal")}
                  </Button>
                )}
              </div>
              {wasChecked && !revealed[i] && (
                <div className={`flex items-center gap-1.5 text-xs font-medium ${ok ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                  {ok
                    ? t("Chính xác!", "Correct!")
                    : t("Chưa đúng, thử lại hoặc xem đáp án.", "Not quite — try again or reveal.")}
                </div>
              )}
              {(revealed[i] || (wasChecked && ok)) && (
                <div className="flex items-start gap-2 rounded-md bg-blue-500/10 p-2">
                  <SwedishAudioButton text={it.sv} size="xs" />
                  <span className="font-semibold text-blue-800 dark:text-blue-100">{it.sv}</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

/* ---------- Match pairs ---------- */
const MatchDrill = ({ items, t }: { items: MatchPair[]; t: Props["t"] }) => {
  const [shuffledVi] = useState(() => [...items].map((x) => x.vi).sort(() => Math.random() - 0.5));
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const score = useMemo(() => {
    if (!checked) return 0;
    return items.reduce((n, it, i) => n + (picks[i] === it.vi ? 1 : 0), 0);
  }, [checked, picks, items]);

  return (
    <div className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/5 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-300">
          🔗 {t("Ghép cặp Svenska - Tiếng Việt", "🔗 Match Svenska - Vietnamese")}
        </div>
        {checked && (
          <span className="text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-300">
            {score}/{items.length} ✓
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        {items.map((it, i) => {
          const isRight = checked && picks[i] === it.vi;
          return (
            <div key={i} className="flex flex-wrap items-center gap-2 rounded-md border border-border/40 bg-card/60 p-2 text-sm">
              <SwedishAudioButton text={it.sv} size="xs" />
              <span className="min-w-[100px] font-semibold text-fuchsia-700 dark:text-fuchsia-200">{it.sv}</span>
              <span className="text-muted-foreground">→</span>
              <select
                className="flex-1 min-w-[140px] rounded-md border border-border bg-background px-2 py-1 text-sm"
                value={picks[i] || ""}
                onChange={(e) => setPicks((p) => ({ ...p, [i]: e.target.value }))}
                disabled={checked}
                aria-label="match"
              >
                <option value="">{t("-- chọn --", "-- pick --")}</option>
                {shuffledVi.map((v, vi) => (
                  <option key={vi} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              {checked && (isRight ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              ) : (
                <span className="flex items-center gap-1 text-xs text-rose-600">
                  <XCircle className="h-3.5 w-3.5" /> {it.vi}
                </span>
              ))}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-2">
        {!checked ? (
          <Button size="sm" onClick={() => setChecked(true)} className="bg-fuchsia-600 hover:bg-fuchsia-700">
            {t("Chấm bài", "Check")}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setChecked(false);
              setPicks({});
            }}
          >
            {t("Làm lại", "Retry")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SwedishA1DeepTheory;
