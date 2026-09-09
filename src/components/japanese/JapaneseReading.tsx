/**
 * @file JapaneseReading.tsx
 * @description Reading Lab: N5 - N3 passages with paragraph-by-paragraph audio,
 *  hidden translations, key vocabulary and answer-gated comprehension questions.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Volume2, Turtle, Eye, EyeOff, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JA_READING, type JaReadingPassage } from "@/data/japanese/reading";

type Level = "all" | "N5" | "N4" | "N3";

interface Props {
  t: (vi: string, en: string) => string;
  lang: "vi" | "en";
  speak: (text: string, rate?: number) => void;
}

export default function JapaneseReading({ t, lang, speak }: Props) {
  const [level, setLevel] = useState<Level>("all");
  const [openId, setOpenId] = useState<string>(JA_READING[0]?.id ?? "");
  const [showTrans, setShowTrans] = useState<Record<string, boolean>>({});
  const [picks, setPicks] = useState<Record<string, number>>({});

  const items: JaReadingPassage[] = useMemo(
    () => (level === "all" ? JA_READING : JA_READING.filter((p) => p.level === level)),
    [level],
  );
  const current = items.find((p) => p.id === openId) ?? items[0];

  const answeredCount = current
    ? current.questions.filter((_, i) => picks[`${current.id}-${i}`] !== undefined).length
    : 0;
  const correctCount = current
    ? current.questions.filter((q, i) => picks[`${current.id}-${i}`] === q.answer).length
    : 0;

  return (
    <div className="space-y-4">
      <Card className="border-rose-200 bg-white/85 p-4">
        <p className="text-base leading-relaxed text-slate-700">
          {t(
            "Đọc từng đoạn, bấm loa để nghe, tự dịch thử rồi mới mở bản dịch. Chọn đáp án xong sẽ thấy câu dẫn chứng trong bài.",
            "Read each paragraph, tap the speaker to listen, try translating yourself, then reveal the translation. After you answer, the supporting sentence from the passage appears.",
          )}
        </p>
      </Card>

      <div className="flex flex-wrap gap-2">
        {(["all", "N5", "N4", "N3"] as Level[]).map((lv) => (
          <Button
            key={lv}
            size="sm"
            variant={level === lv ? "default" : "outline"}
            onClick={() => {
              setLevel(lv);
              const first = lv === "all" ? JA_READING[0] : JA_READING.find((p) => p.level === lv);
              if (first) setOpenId(first.id);
            }}
          >
            {lv === "all" ? t("Tất cả", "All") : lv}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((p) => (
          <Button
            key={p.id}
            size="sm"
            variant={current?.id === p.id ? "secondary" : "outline"}
            className="max-w-full whitespace-normal text-left"
            onClick={() => setOpenId(p.id)}
          >
            <BookOpen className="mr-1 h-4 w-4 shrink-0" />
            <span className="text-sm">
              [{p.level}] {lang === "vi" ? p.title_vi : p.title_en}
            </span>
          </Button>
        ))}
      </div>

      {current && (
        <Card className="space-y-5 border-rose-200 bg-white/90 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
              {lang === "vi" ? current.title_vi : current.title_en}
              <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                {current.level}
              </span>
            </h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => speak(current.body.join(" "))}>
                <Volume2 className="mr-1 h-4 w-4" /> {t("Nghe cả bài", "Listen to all")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowTrans((s) => ({ ...s, [current.id]: !s[current.id] }))}
              >
                {showTrans[current.id] ? <EyeOff className="mr-1 h-4 w-4" /> : <Eye className="mr-1 h-4 w-4" />}
                {showTrans[current.id] ? t("Ẩn bản dịch", "Hide translation") : t("Hiện bản dịch", "Show translation")}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {current.body.map((para, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 sm:p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="whitespace-pre-wrap text-[1.05rem] font-medium leading-loose text-slate-900">
                    {para}
                  </p>
                  <div className="flex shrink-0 gap-1">
                    <Button size="icon" variant="ghost" aria-label={t("Nghe đoạn", "Listen to paragraph")} onClick={() => speak(para)}>
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label={t("Nghe chậm", "Listen slowly")} onClick={() => speak(para, 0.6)}>
                      <Turtle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-sm italic leading-relaxed text-slate-500">{current.romaji[i]}</p>
                {showTrans[current.id] && (
                  <p className="mt-2 text-base leading-relaxed text-emerald-800">
                    {lang === "vi" ? current.trans_vi[i] : current.trans_en[i]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div>
            <h4 className="mb-2 text-base font-semibold text-slate-900">{t("Từ khoá trong bài", "Key words")}</h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {current.vocab.map((v) => (
                <div key={v.jp} className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white p-2">
                  <div>
                    <p className="text-base font-semibold text-slate-900">{v.jp}</p>
                    <p className="text-sm text-slate-600">
                      {v.romaji} - {lang === "vi" ? v.vi : v.en}
                    </p>
                  </div>
                  <Button size="icon" variant="ghost" aria-label={t("Nghe từ", "Listen to word")} onClick={() => speak(v.jp)}>
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-slate-900">{t("Câu hỏi đọc hiểu", "Comprehension questions")}</h4>
              <span className="text-sm font-medium text-slate-600">
                {t("Đúng", "Correct")}: {correctCount}/{answeredCount}
              </span>
            </div>
            {current.questions.map((q, qi) => {
              const key = `${current.id}-${qi}`;
              const pick = picks[key];
              const done = pick !== undefined;
              return (
                <div key={key} className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
                  <p className="text-base font-medium leading-relaxed text-slate-900">
                    {qi + 1}. {lang === "vi" ? q.q_vi : q.q_en}
                  </p>
                  <div className="mt-3 grid gap-2">
                    {q.options.map((op, oi) => {
                      const isPick = pick === oi;
                      const isRight = oi === q.answer;
                      const tone = !done
                        ? "border-slate-200 bg-white hover:border-rose-300"
                        : isRight
                          ? "border-emerald-400 bg-emerald-50"
                          : isPick
                            ? "border-red-400 bg-red-50"
                            : "border-slate-200 bg-white";
                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={done}
                          onClick={() => setPicks((s) => ({ ...s, [key]: oi }))}
                          className={`flex items-start gap-2 rounded-lg border p-2.5 text-left text-[0.98rem] leading-relaxed text-slate-800 transition-colors ${tone}`}
                        >
                          <span className="font-bold text-slate-500">{"ABCD"[oi]}.</span>
                          <span>{op}</span>
                          {done && isRight && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-600" />}
                          {done && isPick && !isRight && <XCircle className="ml-auto h-4 w-4 shrink-0 text-red-600" />}
                        </button>
                      );
                    })}
                  </div>
                  {done && (
                    <div className="mt-3 space-y-1 rounded-lg bg-slate-50 p-3">
                      <p className="text-sm font-semibold text-slate-700">
                        {t("Dẫn chứng trong bài", "Evidence in the passage")}:
                      </p>
                      <p className="text-base leading-relaxed text-slate-900">{q.evidence}</p>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {lang === "vi" ? q.explain_vi : q.explain_en}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
