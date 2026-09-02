/**
 * @file ToneDrillRoom.tsx
 * @description Chinese tone training - 3 modes: Single Tone ID, Minimal Pair, Sandhi explainer.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, Volume2, RefreshCw, Trophy, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import ToneRecorder from "@/components/chinese/ToneRecorder";
import {
  SINGLE_TONE_BANK,
  MINIMAL_PAIR_BANK,
  SANDHI_BANK,
  TONE_PAIR_BANK,
  type SingleToneItem,
  type MinimalPairItem,
  type SandhiItem,
  type TonePairItem,
  type ToneNumber,
} from "@/data/toneDrillBank";

type Mode = "identify" | "pairs" | "minimal" | "sandhi";

type ToneStats = Record<string, { c: number; t: number }>;

const EMPTY_STATS: ToneStats = { "1": { c: 0, t: 0 }, "2": { c: 0, t: 0 }, "3": { c: 0, t: 0 }, "4": { c: 0, t: 0 }, "0": { c: 0, t: 0 } };


const TONE_META: Record<ToneNumber, { label: string; labelEn: string; color: string; contour: string }> = {
  1: { label: "Thanh 1 (cao bằng)", labelEn: "Tone 1 (high level)", color: "bg-rose-500", contour: "ˉ" },
  2: { label: "Thanh 2 (đi lên)", labelEn: "Tone 2 (rising)", color: "bg-amber-500", contour: "ˊ" },
  3: { label: "Thanh 3 (xuống-lên)", labelEn: "Tone 3 (dipping)", color: "bg-emerald-500", contour: "ˇ" },
  4: { label: "Thanh 4 (đi xuống)", labelEn: "Tone 4 (falling)", color: "bg-sky-500", contour: "ˋ" },
  0: { label: "Thanh nhẹ", labelEn: "Neutral tone", color: "bg-slate-400", contour: "·" },
};

/** Tiny SVG showing pitch contour for a tone. */
const ToneContour = ({ tone }: { tone: ToneNumber }) => {
  const paths: Record<ToneNumber, string> = {
    1: "M 4 8 L 36 8",
    2: "M 4 28 L 36 6",
    3: "M 4 12 Q 20 36 36 8",
    4: "M 4 4 L 36 30",
    0: "M 4 18 L 36 18",
  };
  return (
    <svg width="40" height="36" viewBox="0 0 40 36" className="inline-block">
      <path d={paths[tone]} stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
};

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ToneDrillRoom = () => {
  const { t, lang } = useLanguage();
  const [mode, setMode] = useState<Mode>("identify");
  const [streak, setStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [picked, setPicked] = useState<string | number | null>(null);
  const [revealSandhi, setRevealSandhi] = useState(false);

  // Per-mode current item
  const [singleQueue, setSingleQueue] = useState<SingleToneItem[]>(() => shuffle(SINGLE_TONE_BANK));
  const [minQueue, setMinQueue] = useState<MinimalPairItem[]>(() => shuffle(MINIMAL_PAIR_BANK));
  const [sandhiQueue, setSandhiQueue] = useState<SandhiItem[]>(() => shuffle(SANDHI_BANK));
  const [singleIdx, setSingleIdx] = useState(0);
  const [minIdx, setMinIdx] = useState(0);
  const [sandhiIdx, setSandhiIdx] = useState(0);

  // Persist progress lightweight
  useEffect(() => {
    const raw = localStorage.getItem("tone-drill-stats-v1");
    if (raw) {
      try {
        const s = JSON.parse(raw);
        setCorrect(s.correct ?? 0);
        setTotal(s.total ?? 0);
      } catch { /* noop */ }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tone-drill-stats-v1", JSON.stringify({ correct, total }));
  }, [correct, total]);

  const single = singleQueue[singleIdx % singleQueue.length];
  const mPair = minQueue[minIdx % minQueue.length];
  const sandhi = sandhiQueue[sandhiIdx % sandhiQueue.length];

  const switchMode = (m: Mode) => {
    setMode(m);
    setPicked(null);
    setRevealSandhi(false);
  };

  const nextSingle = useCallback(() => {
    setPicked(null);
    const ni = singleIdx + 1;
    if (ni >= singleQueue.length) {
      setSingleQueue(shuffle(SINGLE_TONE_BANK));
      setSingleIdx(0);
    } else {
      setSingleIdx(ni);
    }
  }, [singleIdx, singleQueue.length]);

  const nextMin = useCallback(() => {
    setPicked(null);
    const ni = minIdx + 1;
    if (ni >= minQueue.length) {
      setMinQueue(shuffle(MINIMAL_PAIR_BANK));
      setMinIdx(0);
    } else {
      setMinIdx(ni);
    }
  }, [minIdx, minQueue.length]);

  const nextSandhi = useCallback(() => {
    setRevealSandhi(false);
    const ni = sandhiIdx + 1;
    if (ni >= sandhiQueue.length) {
      setSandhiQueue(shuffle(SANDHI_BANK));
      setSandhiIdx(0);
    } else {
      setSandhiIdx(ni);
    }
  }, [sandhiIdx, sandhiQueue.length]);

  const checkSingle = (toneGuess: ToneNumber) => {
    if (picked !== null) return;
    setPicked(toneGuess);
    setTotal((x) => x + 1);
    if (toneGuess === single.tone) {
      setCorrect((x) => x + 1);
      setStreak((s) => s + 1);
      if (streak + 1 > 0 && (streak + 1) % 5 === 0) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        toast({ title: t("Chuỗi đúng!", "Streak!"), description: t(`Bạn đã đúng ${streak + 1} câu liên tiếp 🎉`, `${streak + 1} in a row 🎉`) });
      }
    } else {
      setStreak(0);
    }
  };

  // Build identify options shuffled (always 5 tone choices)
  const toneOptions = useMemo<ToneNumber[]>(() => [1, 2, 3, 4, 0], [single?.hanzi]);

  // Minimal pair: user hears `pick` then identifies which side
  const [mPick, setMPick] = useState<"a" | "b" | null>(null);
  const [mTarget, setMTarget] = useState<"a" | "b">("a");

  useEffect(() => {
    setMPick(null);
    setMTarget(Math.random() < 0.5 ? "a" : "b");
  }, [minIdx]);

  const playMinimal = () => {
    if (!mPair) return;
    speak(mPair[mTarget].hanzi);
  };

  const checkMinimal = (guess: "a" | "b") => {
    if (mPick !== null) return;
    setMPick(guess);
    setTotal((x) => x + 1);
    if (guess === mTarget) {
      setCorrect((x) => x + 1);
      setStreak((s) => s + 1);
      if ((streak + 1) % 5 === 0) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      setStreak(0);
    }
  };

  // Auto-play on new question
  useEffect(() => {
    if (mode === "identify" && single) {
      const id = setTimeout(() => speak(single.hanzi), 250);
      return () => clearTimeout(id);
    }
  }, [single?.hanzi, mode]);

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("Tone Drill 四声训练 - Luyện Thanh Điệu Tiếng Trung | HaiEduTech", "Tone Drill 四声训练 - Chinese Tone Trainer | HaiEduTech")}
        description={t(
          "Luyện 4 thanh điệu + thanh nhẹ tiếng Trung qua 3 chế độ: nhận diện thanh, minimal pair, và quy tắc biến điệu (sandhi).",
          "Master Chinese tones through 3 modes: tone identification, minimal pairs, and tone sandhi rules.",
        )}
        path="/chinese/tone-drill"
      />
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link to="/chinese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại Tiếng Trung", "Back to Chinese")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 sm:p-8 mb-6 bg-gradient-to-br from-amber-500/15 via-red-500/10 to-rose-500/10 border-2 border-amber-500/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center text-2xl shadow-lg">
                🎯
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                  Tone Drill <span className="text-amber-500">四声训练</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("Luyện 4 thanh + thanh nhẹ với 3 chế độ tương tác", "Train 4 tones + neutral with 3 interactive modes")}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> {correct}/{total} ({accuracy}%)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-semibold">
                <Trophy className="w-4 h-4" /> {t("Chuỗi", "Streak")}: {streak}
              </span>
            </div>
          </motion.div>

          {/* Mode tabs */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {(["identify", "minimal", "sandhi"] as Mode[]).map((m) => {
              const labels: Record<Mode, [string, string, string]> = {
                identify: ["🎧 Nhận diện thanh", "🎧 Identify Tone", "Listen & pick tone"],
                minimal: ["🔁 Minimal Pair", "🔁 Minimal Pair", "Distinguish near pairs"],
                sandhi: ["📐 Biến điệu", "📐 Sandhi Rules", "3-3, bù, yī rules"],
              };
              return (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={cn(
                    "rounded-xl p-3 text-sm font-semibold transition-all border-2 active:scale-95",
                    mode === m
                      ? "bg-gradient-to-br from-amber-500/20 to-red-500/15 border-amber-500/50 text-foreground shadow-md"
                      : "bg-card border-border text-muted-foreground hover:border-amber-500/30",
                  )}
                >
                  {t(labels[m][0], labels[m][1])}
                </button>
              );
            })}
          </div>

          {/* Body */}
          {mode === "identify" && single && (
            <motion.div
              key={`s-${singleIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 sm:p-10"
            >
              <p className="text-center text-sm text-muted-foreground mb-4">
                {t("Nhấn 🔊 để nghe, sau đó chọn thanh điệu bạn nghe được:", "Tap 🔊 to hear, then pick the tone you heard:")}
              </p>
              <div className="flex flex-col items-center gap-4 mb-6">
                <button
                  onClick={() => speak(single.hanzi)}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-red-500 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
                  aria-label={t("Phát âm", "Play")}
                >
                  <Volume2 className="w-9 h-9" />
                </button>
                <div className="text-center">
                  <div className="text-7xl font-bold text-foreground mb-1" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {single.hanzi}
                  </div>
                  {picked !== null && (
                    <div className="mt-2">
                      <div className="text-2xl text-amber-600 font-semibold">{single.pinyin}</div>
                      <div className="text-sm text-muted-foreground mt-1">{single.meaning}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {toneOptions.map((tn) => {
                  const isPicked = picked === tn;
                  const correctTone = single.tone;
                  const isCorrect = picked !== null && tn === correctTone;
                  const isWrongPick = isPicked && tn !== correctTone;
                  return (
                    <button
                      key={tn}
                      onClick={() => checkSingle(tn)}
                      disabled={picked !== null}
                      className={cn(
                        "rounded-xl p-3 text-center transition-all border-2 active:scale-95",
                        picked === null && "hover:border-amber-500/40 hover:bg-amber-500/5 border-border",
                        isCorrect && "border-emerald-500 bg-emerald-500/15",
                        isWrongPick && "border-rose-500 bg-rose-500/15",
                        picked !== null && !isCorrect && !isWrongPick && "opacity-50 border-border",
                      )}
                    >
                      <div className={cn("w-9 h-9 rounded-full mx-auto mb-1 flex items-center justify-center text-white font-bold", TONE_META[tn].color)}>
                        {tn === 0 ? "·" : tn}
                      </div>
                      <ToneContour tone={tn} />
                      <div className="text-[10px] mt-1 text-muted-foreground leading-tight">
                        {lang === "vi" ? TONE_META[tn].label : TONE_META[tn].labelEn}
                      </div>
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <div className="flex justify-center mt-4">
                  <Button onClick={nextSingle} className="bg-gradient-to-r from-amber-500 to-red-500 text-white">
                    {picked === single.tone ? <CheckCircle2 className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
                    {t("Câu tiếp theo", "Next")}
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {mode === "minimal" && mPair && (
            <motion.div
              key={`m-${minIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 sm:p-10"
            >
              <p className="text-center text-sm text-muted-foreground mb-4">
                {t("Nghe rồi chọn chữ đúng bạn vừa nghe:", "Listen, then pick the character you heard:")}
              </p>
              <div className="flex justify-center mb-6">
                <button
                  onClick={playMinimal}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-red-500 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
                >
                  <Volume2 className="w-9 h-9" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(["a", "b"] as const).map((side) => {
                  const item = mPair[side];
                  const isPicked = mPick === side;
                  const isCorrect = mPick !== null && side === mTarget;
                  const isWrong = isPicked && side !== mTarget;
                  return (
                    <button
                      key={side}
                      onClick={() => checkMinimal(side)}
                      disabled={mPick !== null}
                      className={cn(
                        "rounded-2xl p-6 text-center transition-all border-2 active:scale-95",
                        mPick === null && "hover:border-amber-500/40 hover:bg-amber-500/5 border-border",
                        isCorrect && "border-emerald-500 bg-emerald-500/15",
                        isWrong && "border-rose-500 bg-rose-500/15",
                        mPick !== null && !isCorrect && !isWrong && "opacity-50 border-border",
                      )}
                    >
                      <div className="text-6xl font-bold text-foreground mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                        {item.hanzi}
                      </div>
                      {mPick !== null && (
                        <>
                          <div className="text-lg text-amber-600 font-semibold flex items-center justify-center gap-1">
                            {item.pinyin}
                            <span className={cn("inline-flex w-5 h-5 rounded-full text-white text-xs items-center justify-center", TONE_META[item.tone].color)}>
                              {item.tone === 0 ? "·" : item.tone}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">{item.meaning}</div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              {mPick !== null && (
                <div className="flex justify-center mt-6">
                  <Button onClick={nextMin} className="bg-gradient-to-r from-amber-500 to-red-500 text-white">
                    {t("Cặp tiếp theo", "Next pair")}
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {mode === "sandhi" && sandhi && (
            <motion.div
              key={`sa-${sandhiIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 sm:p-10"
            >
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  {sandhi.rule === "3-3" ? t("Quy tắc 3+3", "3+3 Rule") : sandhi.rule === "bu" ? t("Biến điệu 不", "不 sandhi") : t("Biến điệu 一", "一 sandhi")}
                </span>
              </div>

              <div className="text-center mb-6">
                <div className="text-7xl font-bold text-foreground mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  {sandhi.hanzi}
                </div>
                <div className="text-sm text-muted-foreground">{sandhi.meaning}</div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl p-4 bg-slate-500/8 border border-slate-500/20">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                    {t("Cách viết (sách)", "Written (textbook)")}
                  </div>
                  <div className="text-2xl font-semibold text-foreground">{sandhi.pinyinWritten}</div>
                </div>
                <div className={cn("rounded-xl p-4 border-2 transition-all", revealSandhi ? "bg-emerald-500/10 border-emerald-500/40" : "bg-card border-border opacity-60")}>
                  <div className="text-[10px] uppercase tracking-wider text-emerald-600 mb-1 font-semibold">
                    {t("Cách phát âm thật", "Actually spoken")}
                  </div>
                  <div className="text-2xl font-semibold text-foreground">
                    {revealSandhi ? sandhi.pinyinSpoken : "•••"}
                  </div>
                </div>
              </div>

              {revealSandhi && (
                <div className="rounded-xl p-4 bg-amber-500/8 border border-amber-500/25 text-sm text-foreground mb-4">
                  💡 {sandhi.ruleNote}
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" onClick={() => speak(sandhi.hanzi)}>
                  <Volume2 className="w-4 h-4 mr-1" /> {t("Nghe phát âm", "Listen")}
                </Button>
                {!revealSandhi ? (
                  <Button onClick={() => setRevealSandhi(true)} className="bg-gradient-to-r from-amber-500 to-red-500 text-white">
                    <Sparkles className="w-4 h-4 mr-1" /> {t("Mở quy tắc biến điệu", "Reveal rule")}
                  </Button>
                ) : (
                  <Button onClick={nextSandhi} className="bg-gradient-to-r from-amber-500 to-red-500 text-white">
                    <RefreshCw className="w-4 h-4 mr-1" /> {t("Ví dụ khác", "Next example")}
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Tone reference */}
          <div className="mt-8 rounded-2xl p-5 bg-card border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              📚 {t("Bảng tham khảo 5 thanh điệu", "5-Tone Reference")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {([1, 2, 3, 4, 0] as ToneNumber[]).map((tn) => (
                <div key={tn} className="rounded-xl p-3 bg-secondary/40 border border-border text-center">
                  <div className={cn("w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-white font-bold text-sm", TONE_META[tn].color)}>
                    {tn === 0 ? "·" : tn}
                  </div>
                  <ToneContour tone={tn} />
                  <div className="text-[10px] text-muted-foreground leading-tight mt-1">
                    {lang === "vi" ? TONE_META[tn].label : TONE_META[tn].labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ToneDrillRoom;
