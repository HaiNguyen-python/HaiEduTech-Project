/**
 * @file SwedishReadingNotes.tsx
 * @description Post-reading study panel shown under each Swedish passage:
 *              grammar structures used in the text (with an example sentence
 *              from that very passage, playable via TTS) and a hard-word
 *              glossary. Presentation only - analysis lives in swedishReadingNotes.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo } from "react";
import { GraduationCap, BookMarked } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { SwedishAudioButton } from "@/components/swedish/SwedishAudioButton";
import { buildGrammarNotes, buildHardWords } from "@/lib/swedishReadingNotes";

interface Props {
  textSv: string;
  keyVocab: { sv: string; vi: string }[];
}

const SwedishReadingNotes = ({ textSv, keyVocab }: Props) => {
  const { t } = useLanguage();
  const grammar = useMemo(() => buildGrammarNotes(textSv), [textSv]);
  const words = useMemo(() => buildHardWords(textSv, keyVocab), [textSv, keyVocab]);

  if (grammar.length === 0 && words.length === 0) return null;

  return (
    <div className="mb-6 grid gap-4 lg:grid-cols-2">
      {grammar.length > 0 && (
        <Card className="border-indigo-500/25 bg-indigo-500/[0.04]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
              {t("Ngữ pháp dùng trong bài", "Grammar used in this text")}
              <Badge variant="outline" className="ml-auto text-[10px]">
                {grammar.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {grammar.map((g, i) => (
              <div
                key={g.id}
                className="rounded-lg border border-indigo-500/20 bg-card/70 p-3"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-[11px] font-bold text-indigo-700 dark:text-indigo-200">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-indigo-700 dark:text-indigo-200">
                      {g.labelSv}
                    </div>
                    <div className="text-[13px] font-semibold text-foreground">
                      {t(g.titleVi, g.titleEn)}
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                      {t(g.explainVi, g.explainEn)}
                    </p>
                    <div className="mt-2 flex items-start gap-2 rounded-md border border-border/60 bg-muted/50 p-2">
                      <SwedishAudioButton text={g.exampleSv} size="xs" />
                      <p className="text-[13px] italic text-foreground">
                        🇸🇪 {g.exampleSv}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {words.length > 0 && (
        <Card className="border-amber-500/25 bg-amber-500/[0.04]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-amber-600 dark:text-amber-300" />
              {t("Từ vựng khó trong bài", "Difficult words in this text")}
              <Badge variant="outline" className="ml-auto text-[10px]">
                {words.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border/60">
              {words.map((w) => (
                <li key={w.sv} className="flex items-start gap-2 py-2">
                  <SwedishAudioButton text={w.sv} size="xs" />
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-bold text-amber-700 dark:text-amber-200">
                      {w.sv}
                    </span>
                    <span className="ml-2 text-[13px] text-foreground">
                      {w.en || w.vi}
                    </span>

                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SwedishReadingNotes;
