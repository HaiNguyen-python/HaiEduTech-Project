/**
 * @file JapaneseKeigo.tsx
 * @description Keigo Lab: plain / polite / honorific / humble table, situational phrases
 *  by scene, and an answer-gated recall drill.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Volume2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JA_KEIGO_ROWS, JA_KEIGO_PHRASES } from "@/data/japanese/keigo";

interface Props {
  t: (vi: string, en: string) => string;
  lang: "vi" | "en";
  speak: (text: string, rate?: number) => void;
}

type Mode = "table" | "phrases" | "drill";

const shuffled = <T,>(items: T[]) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export default function JapaneseKeigo({ t, lang, speak }: Props) {
  const [mode, setMode] = useState<Mode>("table");
  const [scene, setScene] = useState<string>("all");
  const [drill, setDrill] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  const scenes = useMemo(() => {
    const set = new Map<string, string>();
    JA_KEIGO_PHRASES.forEach((p) => set.set(p.scene_en, lang === "vi" ? p.scene_vi : p.scene_en));
    return Array.from(set.entries());
  }, [lang]);

  const phrases = scene === "all" ? JA_KEIGO_PHRASES : JA_KEIGO_PHRASES.filter((p) => p.scene_en === scene);

  const quiz = useMemo(() => {
    const row = JA_KEIGO_ROWS[drill % JA_KEIGO_ROWS.length];
    const askHumble = drill % 2 === 0;
    const correct = askHumble ? row.kenjo : row.sonkei;
    const others = JA_KEIGO_ROWS.filter((r) => r.id !== row.id).map((r) => (askHumble ? r.kenjo : r.sonkei));
    const distractors = shuffled(Array.from(new Set(others.filter((item) => item && item !== correct)))).slice(0, 3);
    const options = shuffled([correct, ...distractors]);
    return { row, askHumble, options, answer: options.indexOf(correct), correct };
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
            "Kính ngữ có ba tầng: lịch sự (ます), tôn kính khi nói về người khác, và khiêm nhường khi nói về mình. Học bảng, xem mẫu câu theo tình huống, rồi luyện phần hỏi nhanh.",
            "Keigo has three layers: polite ます, honorific for the other person, and humble for yourself. Study the table, read the situational phrases, then take the quick drill.",
          )}
        </p>
      </Card>

      <div className="flex flex-wrap gap-2">
        {([["table", t("Bảng kính ngữ", "Keigo table")], ["phrases", t("Mẫu câu tình huống", "Situational phrases")], ["drill", t("Hỏi nhanh", "Quick drill")]] as Array<[Mode, string]>).map(
          ([m, label]) => (
            <Button key={m} size="sm" variant={mode === m ? "default" : "outline"} onClick={() => setMode(m)}>
              {label}
            </Button>
          ),
        )}
      </div>

      {mode === "table" && (
        <Card className="border-rose-200 bg-white/90 p-4">
          <div className="-mx-4 overflow-x-auto px-4">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-rose-50 text-slate-700">
                  <th className="p-2">{t("Thường", "Plain")}</th>
                  <th className="p-2">{t("Lịch sự", "Polite")}</th>
                  <th className="p-2">{t("Tôn kính", "Honorific")}</th>
                  <th className="p-2">{t("Khiêm nhường", "Humble")}</th>
                  <th className="p-2">{t("Nghĩa", "Meaning")}</th>
                </tr>
              </thead>
              <tbody>
                {JA_KEIGO_ROWS.map((r) => (
                  <tr key={r.id} className="border-t border-slate-200 align-top">
                    <td className="p-2 text-base font-semibold text-slate-900">
                      <button type="button" className="hover:underline" onClick={() => speak(r.plain)}>{r.plain}</button>
                    </td>
                    <td className="p-2 text-base text-slate-800">
                      <button type="button" className="hover:underline" onClick={() => speak(r.polite)}>{r.polite}</button>
                    </td>
                    <td className="p-2 text-base font-medium text-rose-700">
                      <button type="button" className="hover:underline" onClick={() => speak(r.sonkei)}>{r.sonkei}</button>
                    </td>
                    <td className="p-2 text-base font-medium text-indigo-700">
                      <button type="button" className="hover:underline" onClick={() => speak(r.kenjo)}>{r.kenjo}</button>
                    </td>
                    <td className="p-2 text-slate-700">
                      <p>{lang === "vi" ? r.vi : r.en}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {lang === "vi" ? r.note_vi : r.note_en}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {mode === "phrases" && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={scene === "all" ? "default" : "outline"} onClick={() => setScene("all")}>
              {t("Tất cả", "All")}
            </Button>
            {scenes.map(([key, label]) => (
              <Button key={key} size="sm" variant={scene === key ? "default" : "outline"} onClick={() => setScene(key)}>
                {label}
              </Button>
            ))}
          </div>
          <div className="grid gap-3">
            {phrases.map((p) => (
              <Card key={p.id} className="border-rose-200 bg-white/90 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                  {lang === "vi" ? p.scene_vi : p.scene_en}
                </p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <p className="text-lg font-medium leading-loose text-slate-900">{p.jp}</p>
                  <div className="flex shrink-0 gap-1">
                    <Button size="icon" variant="ghost" aria-label={t("Nghe", "Listen")} onClick={() => speak(p.jp)}>
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="mt-1 text-sm italic text-slate-500">{p.romaji}</p>
                <p className="mt-2 text-base leading-relaxed text-emerald-800">{lang === "vi" ? p.vi : p.en}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t("Dùng khi", "Use it when")}: {lang === "vi" ? p.when_vi : p.when_en}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {mode === "drill" && (
        <Card className="space-y-4 border-rose-200 bg-white/90 p-4 sm:p-6">
          <p className="text-lg font-medium leading-relaxed text-slate-900">
            {quiz.askHumble
              ? t(`Thể khiêm nhường của "${quiz.row.plain}" là gì?`, `What is the humble form of "${quiz.row.plain}"?`)
              : t(`Thể tôn kính của "${quiz.row.plain}" là gì?`, `What is the honorific form of "${quiz.row.plain}"?`)}
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
                {lang === "vi" ? quiz.row.note_vi : quiz.row.note_en}
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
      )}
    </div>
  );
}
