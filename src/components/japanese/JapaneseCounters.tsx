/**
 * @file JapaneseCounters.tsx
 * @description Counters module: reading tables 1-10 for each counter, usage notes,
 *  example sentences with audio and an answer-gated recall drill.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Volume2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JA_COUNTERS } from "@/data/japanese/counters";

interface Props {
  t: (vi: string, en: string) => string;
  lang: "vi" | "en";
  speak: (text: string, rate?: number) => void;
}

export default function JapaneseCounters({ t, lang, speak }: Props) {
  const [openId, setOpenId] = useState(JA_COUNTERS[0].id);
  const [drill, setDrill] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  const current = JA_COUNTERS.find((c) => c.id === openId)!;

  // Deterministic drill: "how do you read <n> + <counter>?"
  const quiz = useMemo(() => {
    const c = JA_COUNTERS[drill % JA_COUNTERS.length];
    const n = (drill * 3) % 10; // 0..9 -> number n+1
    const correct = c.readings[n];
    const others = JA_COUNTERS.filter((x) => x.id !== c.id).map((x) => x.readings[n]);
    const picked: string[] = [];
    for (let i = 0; picked.length < 3 && i < others.length; i++) {
      const cand = others[(n + i * 4 + 1) % others.length];
      if (cand && cand !== correct && !picked.includes(cand)) picked.push(cand);
    }
    const all = [correct, ...picked];
    const answer = (n + c.id.length) % all.length;
    const ordered = [...all];
    ordered[0] = all[answer];
    ordered[answer] = all[0];
    return { counter: c, num: n + 1, options: ordered, answer, correct };
  }, [drill]);

  const choose = (i: number) => {
    if (pick !== null) return;
    setPick(i);
    setScore((s) => ({ right: s.right + (i === quiz.answer ? 1 : 0), total: s.total + 1 }));
    if (i === quiz.answer) speak(quiz.correct);
  };

  return (
    <div className="space-y-4">
      <Card className="border-rose-200 bg-white/85 p-4">
        <p className="text-base leading-relaxed text-slate-700">
          {t(
            "Lượng từ là phần rất dễ mất điểm khi nói. Học bảng đọc 1 - 10, chú ý các số biến âm, rồi luyện phần hỏi nhanh phía dưới.",
            "Counters trip up most speakers. Learn the readings from one to ten, watch the irregular numbers, then try the quick drill below.",
          )}
        </p>
      </Card>

      <div className="flex flex-wrap gap-2">
        {JA_COUNTERS.map((c) => (
          <Button
            key={c.id}
            size="sm"
            variant={openId === c.id ? "secondary" : "outline"}
            onClick={() => setOpenId(c.id)}
          >
            <span className="text-base font-semibold">{c.counter}</span>
            <span className="ml-1 text-xs text-slate-500">{c.romaji}</span>
          </Button>
        ))}
      </div>

      <Card className="space-y-4 border-rose-200 bg-white/90 p-4 sm:p-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {current.counter} <span className="text-base font-medium text-slate-500">{current.romaji}</span>
          </h3>
          <p className="mt-1 text-base leading-relaxed text-slate-700">
            {lang === "vi" ? current.use_vi : current.use_en}
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4">
          <table className="w-full min-w-[600px] border-collapse text-center text-sm">
            <thead>
              <tr className="bg-rose-50 text-slate-700">
                {current.readings.map((_, i) => (
                  <th key={i} className="p-2 font-semibold">{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {current.readings.map((r, i) => (
                  <td key={i} className="border-t border-slate-200 p-2">
                    <button
                      type="button"
                      className="text-base font-semibold text-rose-700 underline-offset-2 hover:underline"
                      onClick={() => speak(r)}
                    >
                      {r}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="rounded-lg bg-amber-50 p-3 text-base leading-relaxed text-amber-900">
          {lang === "vi" ? current.note_vi : current.note_en}
        </p>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 sm:p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-lg font-medium leading-loose text-slate-900">{current.example_jp}</p>
            <Button size="icon" variant="ghost" aria-label={t("Nghe ví dụ", "Listen to example")} onClick={() => speak(current.example_jp)}>
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-1 text-sm italic text-slate-500">{current.example_romaji}</p>
          <p className="mt-2 text-base leading-relaxed text-emerald-800">
            {lang === "vi" ? current.example_vi : current.example_en}
          </p>
        </div>
      </Card>

      <Card className="space-y-4 border-rose-200 bg-white/90 p-4 sm:p-6">
        <h4 className="text-base font-semibold text-slate-900">{t("Hỏi nhanh", "Quick drill")}</h4>
        <p className="text-lg font-medium text-slate-900">
          {t("Đọc thế nào", "How do you read")}: {quiz.num} + {quiz.counter.counter} ?
        </p>
        <div className="grid gap-2">
          {quiz.options.map((op, i) => {
            const done = pick !== null;
            const isRight = i === quiz.answer;
            const isPick = pick === i;
            const tone = !done
              ? "border-slate-200 bg-white hover:border-rose-300"
              : isRight
                ? "border-emerald-400 bg-emerald-50"
                : isPick
                  ? "border-red-400 bg-red-50"
                  : "border-slate-200 bg-white";
            return (
              <button
                key={op + i}
                type="button"
                disabled={done}
                onClick={() => choose(i)}
                className={`flex items-center gap-2 rounded-lg border p-3 text-left text-lg font-medium text-slate-900 transition-colors ${tone}`}
              >
                <span className="text-sm font-bold text-slate-500">{"ABCD"[i]}.</span>
                {op}
                {done && isRight && <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-600" />}
                {done && isPick && !isRight && <XCircle className="ml-auto h-5 w-5 text-red-600" />}
              </button>
            );
          })}
        </div>
        {pick !== null && (
          <div className="space-y-2 rounded-lg bg-slate-50 p-3">
            <p className="text-base font-semibold text-slate-900">
              {t("Đáp án", "Answer")}: {"ABCD"[quiz.answer]}. {quiz.correct}
            </p>
            <p className="text-base leading-relaxed text-slate-700">
              {lang === "vi" ? quiz.counter.note_vi : quiz.counter.note_en}
            </p>
            <Button
              size="sm"
              onClick={() => {
                setPick(null);
                setDrill((d) => d + 1);
              }}
            >
              <RefreshCw className="mr-1 h-4 w-4" /> {t("Câu tiếp theo", "Next question")}
            </Button>
          </div>
        )}
        <p className="text-sm font-medium text-slate-600">
          {t("Điểm", "Score")}: {score.right}/{score.total}
        </p>
      </Card>
    </div>
  );
}
