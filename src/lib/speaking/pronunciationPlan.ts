/**
 * @file pronunciationPlan.ts
 * @description Personalised pronunciation roadmap for the Speaking Coach.
 * It reads the local pronunciation-error log (top missed words, miss
 * frequency, error rate, recency) plus the 14-day trend and turns them into
 * an ordered list of practice steps, so the learner always knows what to do
 * next. Pure functions, no backend, no personal data.
 */
import {
  type PronStatsStore,
  type PronWordStat,
  allPronWords,
  dailyTrend,
  errorRate,
  summarize,
  todayISO,
} from "@/lib/speaking/pronunciationStats";

export type PlanMode = "drill" | "shadow" | "sentence" | "freetalk" | "review";

export interface ScoredWord extends PronWordStat {
  score: number;
  rate: number;
  daysSince: number;
}

export interface PlanStep {
  id: string;
  mode: PlanMode;
  titleVi: string;
  titleEn: string;
  reasonVi: string;
  reasonEn: string;
  words: ScoredWord[];
  minutes: number;
}

export type PronTrend = "improving" | "worsening" | "steady" | "new";

export interface PronPlan {
  focus: ScoredWord[];
  steps: PlanStep[];
  trend: PronTrend;
  /** Misses in the last 7 days minus the 7 days before that. */
  trendDelta: number;
  recentMisses: number;
  previousMisses: number;
  intensity: "light" | "standard" | "intensive";
  dailyTargetWords: number;
  dailyTargetMinutes: number;
  activeWords: number;
  accuracy: number;
}

const daysBetween = (isoA: string, isoB: string): number => {
  const a = new Date(`${isoA}T00:00:00Z`).getTime();
  const b = new Date(`${isoB}T00:00:00Z`).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(0, Math.round((b - a) / 86_400_000));
};

/**
 * Priority score. Frequent misses weigh most, a high error rate and a recent
 * mistake push a word up, and words already cleared from the queue sink.
 */
export function scoreWord(w: PronWordStat, today = todayISO()): ScoredWord {
  const rate = errorRate(w);
  const daysSince = daysBetween(w.lastSeen, today);
  const recency = daysSince <= 1 ? 4 : daysSince <= 3 ? 3 : daysSince <= 7 ? 1.5 : 0;
  const stubborn = w.attempts >= 4 && rate >= 50 ? 2 : 0;
  const score =
    w.misses * 2 + rate / 12 + recency + stubborn - (w.fixed ? 6 : 0);
  return { ...w, rate, daysSince, score: Math.round(score * 100) / 100 };
}

export const scoreAll = (store: PronStatsStore, today = todayISO()): ScoredWord[] =>
  allPronWords(store)
    .map((w) => scoreWord(w, today))
    .sort((a, b) => b.score - a.score || b.misses - a.misses);

const syllableGuess = (word: string): number => {
  const m = word.toLowerCase().match(/[aeiouyàáâãèéêìíòóôõùúăđĩũơưăâêôơư]+/g);
  return m ? m.length : Math.max(1, Math.round(word.length / 3));
};

function windowMisses(store: PronStatsStore, from: number, to: number): number {
  // from/to are day offsets counted back from today (inclusive range).
  const trend = dailyTrend(store, 28);
  const total = trend.length;
  let sum = 0;
  for (let i = 0; i < total; i++) {
    const offset = total - 1 - i; // 0 = today
    if (offset >= from && offset <= to) sum += trend[i].misses;
  }
  return sum;
}

/** Build the ordered roadmap. */
export function buildPronPlan(store: PronStatsStore, today = todayISO()): PronPlan {
  const scored = scoreAll(store, today);
  const active = scored.filter((w) => !w.fixed);
  const summary = summarize(store);

  const recentMisses = windowMisses(store, 0, 6);
  const previousMisses = windowMisses(store, 7, 13);
  const trendDelta = recentMisses - previousMisses;
  let trend: PronTrend = "steady";
  if (recentMisses === 0 && previousMisses === 0) trend = "new";
  else if (trendDelta <= -2) trend = "improving";
  else if (trendDelta >= 2) trend = "worsening";

  const focus = (active.length > 0 ? active : scored).slice(0, 10);

  const intensity: PronPlan["intensity"] =
    active.length >= 12 || trend === "worsening"
      ? "intensive"
      : active.length >= 5
        ? "standard"
        : "light";
  const dailyTargetWords = intensity === "intensive" ? 8 : intensity === "standard" ? 5 : 3;
  const dailyTargetMinutes = intensity === "intensive" ? 20 : intensity === "standard" ? 12 : 8;

  const steps: PlanStep[] = [];

  // 1. Hardest sounds first: high error rate, short words -> isolated drilling.
  const drillWords = focus
    .filter((w) => w.rate >= 50 && syllableGuess(w.word) <= 3)
    .slice(0, 4);
  if (drillWords.length > 0) {
    steps.push({
      id: "drill",
      mode: "drill",
      titleVi: "Luyện âm riêng lẻ",
      titleEn: "Isolate the hardest sounds",
      reasonVi: `${drillWords.length} từ vẫn sai trên ${Math.min(...drillWords.map((w) => w.rate))}% số lần thử - cần tách âm ra luyện chậm.`,
      reasonEn: `${drillWords.length} ${drillWords.length === 1 ? "word is" : "words are"} still wrong in over ${Math.min(...drillWords.map((w) => w.rate))}% of attempts - slow, isolated drilling fixes them fastest.`,
      words: drillWords,
      minutes: 5,
    });
  }

  // 2. Weak-word review is the spaced-repetition backbone.
  const reviewWords = focus.slice(0, dailyTargetWords);
  if (reviewWords.length > 0) {
    steps.push({
      id: "review",
      mode: "review",
      titleVi: `Ôn ${reviewWords.length} từ ưu tiên`,
      titleEn: `Review your ${reviewWords.length} priority words`,
      reasonVi: "Đây là các từ sai nhiều nhất và mới sai gần đây - ôn lại theo lịch giãn cách để ghi nhớ lâu.",
      reasonEn: "These are your most-missed and most-recent errors - spaced review locks them in.",
      words: reviewWords,
      minutes: intensity === "intensive" ? 8 : 5,
    });
  }

  // 3. Long words / phrases benefit from shadowing at natural speed.
  const shadowWords = focus.filter((w) => syllableGuess(w.word) >= 3).slice(0, 4);
  if (shadowWords.length > 0) {
    steps.push({
      id: "shadow",
      mode: "shadow",
      titleVi: "Nói theo câu chứa từ dài",
      titleEn: "Shadow sentences with your long words",
      reasonVi: "Các từ nhiều âm tiết cần luyện trong câu để đúng trọng âm và nhịp điệu.",
      reasonEn: "Multi-syllable words need sentence context to get stress and rhythm right.",
      words: shadowWords,
      minutes: 5,
    });
  }

  // 4. Sentence mode keeps overall pronunciation broad.
  steps.push({
    id: "sentence",
    mode: "sentence",
    titleVi: "Luyện câu mẫu theo chủ đề",
    titleEn: "Practise themed model sentences",
    reasonVi:
      trend === "worsening"
        ? "Số lỗi 7 ngày qua đang tăng - quay lại câu mẫu chậm để lấy lại độ chính xác."
        : "Duy trì luyện câu mẫu để phát âm ổn định trong ngữ cảnh thật.",
    reasonEn:
      trend === "worsening"
        ? "Misses rose over the last 7 days - go back to slow model sentences to rebuild accuracy."
        : "Keep practising model sentences so your pronunciation holds up in real context.",
    words: [],
    minutes: 5,
  });

  // 5. Free Talk is the reward step once the trend improves (or nothing is broken).
  if (trend === "improving" || trend === "new" || active.length <= 4) {
    steps.push({
      id: "freetalk",
      mode: "freetalk",
      titleVi: "Nói tự do 60 giây",
      titleEn: "60-second Free Talk",
      reasonVi:
        trend === "improving"
          ? `Bạn đã giảm ${Math.abs(trendDelta)} lỗi so với tuần trước - hãy thử nói tự do để kiểm tra thực tế.`
          : "Ít từ yếu - hãy nói tự do để phát hiện lỗi mới.",
      reasonEn:
        trend === "improving"
          ? `You cut ${Math.abs(trendDelta)} misses versus last week - test it in free speech.`
          : "Few weak words left - free speech surfaces new ones.",
      words: [],
      minutes: 4,
    });
  }

  return {
    focus,
    steps,
    trend,
    trendDelta,
    recentMisses,
    previousMisses,
    intensity,
    dailyTargetWords,
    dailyTargetMinutes,
    activeWords: summary.activeWords,
    accuracy: summary.accuracy,
  };
}
