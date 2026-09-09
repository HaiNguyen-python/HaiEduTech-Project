/**
 * @file JapaneseVerbTrainer.tsx
 * @description Verb Trainer: conjugation reference table plus an answer-gated drill
 *  that asks for a target form of a random verb.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Volume2, RefreshCw, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JA_VERBS, JA_VERB_FORM_LABELS, type JaVerbFormKey, type JaVerb } from "@/data/japanese/verbForms";

interface Props {
  t: (vi: string, en: string) => string;
  lang: "vi" | "en";
  speak: (text: string, rate?: number) => void;
}

type GroupFilter = "all" | "1" | "2" | "irregular";

const groupLabel = (g: JaVerb["group"], t: Props["t"]) =>
  g === "1" ? t("Nhóm 1", "Group 1") : g === "2" ? t("Nhóm 2", "Group 2") : t("Bất quy tắc", "Irregular");

export default function JapaneseVerbTrainer({ t, lang, speak }: Props) {
  const [group, setGroup] = useState<GroupFilter>("all");
  const [formKey, setFormKey] = useState<JaVerbFormKey>("masu");
  const [index, setIndex] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);

  const pool = useMemo(
    () => (group === "all" ? JA_VERBS : JA_VERBS.filter((x) => x.group === group)),
    [group],
  );
  const verb = pool[index % pool.length];
  const form = JA_VERB_FORM_LABELS.find((f) => f.key === formKey)!;

  const optionsRef = useRef<{ key: string; options: string[]; answer: number }>({ key: "", options: [], answer: 0 });
  const stateKey = `${verb?.dict}-${formKey}`;
  if (verb && optionsRef.current.key !== stateKey) {
    const correct = verb.forms[formKey];
    const distractors = JA_VERBS.filter((x) => x.dict !== verb.dict)
      .map((x) => x.forms[formKey])
      .filter((x) => x !== correct);
    // Deterministic spread so choices never reshuffle while the student is deciding.
    const seed = verb.dict.length + formKey.length;
    const picked: string[] = [];
    for (let i = 0; picked.length < 3 && i < distractors.length; i++) {
      const cand = distractors[(seed * (i + 3)) % distractors.length];
      if (cand && !picked.includes(cand)) picked.push(cand);
    }
    const all = [correct, ...picked];
    const answer = seed % all.length;
    const ordered = [...all];
    ordered[0] = all[answer];
    ordered[answer] = all[0];
    optionsRef.current = { key: stateKey, options: ordered, answer };
  }
  const { options, answer } = optionsRef.current;

  const next = useCallback(() => {
    setPick(null);
    setShowHint(false);
    setIndex((i) => (i + 1) % pool.length);
  }, [pool.length]);

  useEffect(() => {
    setIndex(0);
    setPick(null);
    setShowHint(false);
  }, [group, formKey]);

  const choose = (i: number) => {
    if (pick !== null) return;
    setPick(i);
    setScore((s) => ({ right: s.right + (i === answer ? 1 : 0), total: s.total + 1 }));
    if (i === answer && verb) speak(verb.forms[formKey]);
  };

  if (!verb) return null;

  return (
    <div className="space-y-4">
      <Card className="border-rose-200 bg-white/85 p-4">
        <p className="text-base leading-relaxed text-slate-700">
          {t(
            "Chọn thể muốn luyện, xem quy tắc rồi làm bài. Đáp án và giải thích chỉ hiện sau khi bạn chọn.",
            "Pick the form you want to drill, read the rule, then answer. The answer and explanation appear only after you choose.",
          )}
        </p>
      </Card>

      <div className="flex flex-wrap gap-2">
        {(["all", "1", "2", "irregular"] as GroupFilter[]).map((g) => (
          <Button key={g} size="sm" variant={group === g ? "default" : "outline"} onClick={() => setGroup(g)}>
            {g === "all" ? t("Tất cả", "All") : groupLabel(g, t)}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {JA_VERB_FORM_LABELS.map((f) => (
          <Button
            key={f.key}
            size="sm"
            variant={formKey === f.key ? "secondary" : "outline"}
            className="whitespace-normal text-left text-sm"
            onClick={() => setFormKey(f.key)}
          >
            {lang === "vi" ? f.vi : f.en}
          </Button>
        ))}
      </div>

      <Card className="space-y-4 border-rose-200 bg-white/90 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-rose-700">
              {lang === "vi" ? form.vi : form.en} - {groupLabel(verb.group, t)}
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {verb.dict} <span className="text-base font-medium text-slate-500">({verb.kana})</span>
            </p>
            <p className="text-base text-slate-600">
              {verb.romaji} - {lang === "vi" ? verb.vi : verb.en}
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => speak(verb.dict)}>
              <Volume2 className="mr-1 h-4 w-4" /> {t("Nghe", "Listen")}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowHint((s) => !s)}>
              <Lightbulb className="mr-1 h-4 w-4" /> {t("Quy tắc", "Rule")}
            </Button>
          </div>
        </div>

        {showHint && (
          <p className="rounded-lg bg-amber-50 p-3 text-base leading-relaxed text-amber-900">
            {lang === "vi" ? form.hint_vi : form.hint_en}
          </p>
        )}

        <div className="grid gap-2">
          {options.map((op, i) => {
            const done = pick !== null;
            const isRight = i === answer;
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
                onClick={() => choose(i)}
                disabled={done}
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
              {t("Đáp án", "Answer")}: {"ABCD"[answer]}. {verb.forms[formKey]}
            </p>
            <p className="text-base leading-relaxed text-slate-700">
              {lang === "vi" ? form.hint_vi : form.hint_en}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button size="sm" variant="outline" onClick={() => speak(verb.forms[formKey], 0.6)}>
                <Volume2 className="mr-1 h-4 w-4" /> {t("Nghe chậm", "Listen slowly")}
              </Button>
              <Button size="sm" onClick={next}>
                <RefreshCw className="mr-1 h-4 w-4" /> {t("Câu tiếp theo", "Next verb")}
              </Button>
            </div>
          </div>
        )}

        <p className="text-sm font-medium text-slate-600">
          {t("Điểm", "Score")}: {score.right}/{score.total}
        </p>
      </Card>

      <Card className="border-rose-200 bg-white/90 p-4">
        <h4 className="mb-3 text-base font-semibold text-slate-900">
          {t("Bảng tra nhanh", "Quick reference table")}
        </h4>
        <div className="-mx-4 overflow-x-auto px-4">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="bg-rose-50 text-left text-slate-700">
                <th className="p-2">{t("Từ điển", "Dictionary")}</th>
                <th className="p-2">{t("Nghĩa", "Meaning")}</th>
                <th className="p-2">{t("Nhóm", "Group")}</th>
                <th className="p-2">{lang === "vi" ? form.vi : form.en}</th>
              </tr>
            </thead>
            <tbody>
              {pool.map((x) => (
                <tr key={x.dict} className="border-t border-slate-200">
                  <td className="p-2 text-base font-semibold text-slate-900">{x.dict}</td>
                  <td className="p-2 text-slate-700">{lang === "vi" ? x.vi : x.en}</td>
                  <td className="p-2 text-slate-600">{groupLabel(x.group, t)}</td>
                  <td className="p-2">
                    <button
                      type="button"
                      className="text-base font-semibold text-rose-700 underline-offset-2 hover:underline"
                      onClick={() => speak(x.forms[formKey])}
                    >
                      {x.forms[formKey]}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
