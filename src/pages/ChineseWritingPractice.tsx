import { useMemo, useState } from "react";
import { PenLine, BookOpen, Puzzle, Link2, Languages, Sparkles, Keyboard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import IllustratedPageHeader from "@/components/common/IllustratedPageHeader";
import {
  ZH_LEVELS, ZH_TOPICS, ZH_ESSAYS, ZH_VOCAB, ZH_GRAMMAR, ZH_CONNECTORS, ZH_TRANSLATION, ZH_PARAPHRASE, ZH_PARAPHRASE_GUIDES, ZH_TYPING,
  type ZhLevel,
} from "@/data/chineseWritingBank";
import ZhSentenceTask, { type ZhTaskItem } from "@/components/chineseWriting/ZhSentenceTask";
import ZhEssayTask from "@/components/chineseWriting/ZhEssayTask";
import ZhTypingTask from "@/components/chineseWriting/ZhTypingTask";

export default function ChineseWritingPractice() {
  const { t } = useLanguage();
  const [level, setLevel] = useState<ZhLevel>("1-2");
  const [topic, setTopic] = useState<string>("all");
  const [tab, setTab] = useState("essay");
  const tp = <T extends { topic: string; level: string }>(xs: T[]) => xs.filter((x) => x.level === level && (topic === "all" || x.topic === topic));

  const essays = useMemo(() => tp(ZH_ESSAYS), [level, topic]);
  const vocab: ZhTaskItem[] = useMemo(() => tp(ZH_VOCAB).map((v) => ({
     id: v.id, level: v.level, heading: v.word, pinyin: v.pinyin, meaning: `${v.vi} · ${v.en}`,
     instructionVi: "Đặt câu với từ này", instructionEn: "Write a sentence with this word", target: v.word, model: v.ex, modelPinyin: v.exPinyin, modelVi: v.exVi ?? `${v.vi} · ${v.en}`,
  })), [level, topic]);
  const toPattern = (xs: typeof ZH_GRAMMAR, vi: string, en: string): ZhTaskItem[] => xs.filter((x) => x.level === level).map((g) => ({
    id: g.id, level: g.level, heading: g.pattern, pinyin: g.pinyin, meaning: g.vi, instructionVi: vi, instructionEn: en,
    target: g.pattern, model: g.ex, modelPinyin: g.exPinyin, modelVi: g.exVi,
  }));
  const grammar = useMemo(() => toPattern(ZH_GRAMMAR, "Đặt câu với cấu trúc", "Write a sentence with this structure"), [level]);
  const connectors = useMemo(() => toPattern(ZH_CONNECTORS, "Viết câu dùng từ nối", "Write a sentence with this connector"), [level]);
  const translation: ZhTaskItem[] = useMemo(() => tp(ZH_TRANSLATION).map((s) => ({
    id: s.id, level: s.level, heading: s.vi, meaning: "", instructionVi: "Dịch sang tiếng Trung", instructionEn: "Translate into Chinese",
    target: s.vi, reference: s.zh, model: s.zh, modelPinyin: s.pinyin,
  })), [level, topic]);
  const paraLevel = level === "1-2" ? "3-4" : level;
  const paraphrase: ZhTaskItem[] = useMemo(() => ZH_PARAPHRASE.filter((s) => s.level === paraLevel && (topic === "all" || s.topic === topic)).map((s) => ({
    id: s.id, level: s.level, heading: s.zh, pinyin: s.pinyin, meaning: s.vi,
    instructionVi: `Viết lại câu ở mức HSK ${s.level}`, instructionEn: `Rewrite at HSK ${s.level} level`, target: s.zh, reference: s.up, model: s.up,
    modelPinyin: ZH_PARAPHRASE_GUIDES[s.id]?.pinyin, modelVi: ZH_PARAPHRASE_GUIDES[s.id]?.vi,
  })), [paraLevel, topic]);
  const typing = useMemo(() => ZH_TYPING.filter((s) => s.level === level), [level]);

  const tabs = [
    { v: "essay", icon: PenLine, vi: "Viết đoạn", en: "Essay" },
    { v: "vocab", icon: BookOpen, vi: "Từ vựng", en: "Vocabulary" },
    { v: "grammar", icon: Puzzle, vi: "Ngữ pháp", en: "Grammar" },
    { v: "connector", icon: Link2, vi: "Liên kết", en: "Connectors" },
    { v: "translation", icon: Languages, vi: "Dịch", en: "Translation" },
    { v: "paraphrase", icon: Sparkles, vi: "Nâng cấp câu", en: "Paraphrase" },
    { v: "typing", icon: Keyboard, vi: "Gõ chữ", en: "Typing" },
  ];
  const usesTopic = ["essay", "vocab", "translation", "paraphrase"].includes(tab);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-5xl space-y-5">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("Luyện viết tiếng Trung", "Chinese Writing Practice")}</h1>
          <p className="text-muted-foreground mt-1">{t("Luyện viết câu, cấu trúc và từ vựng theo chủ đề, chấm bằng AI.", "Practise sentences, structures and vocabulary by topic, graded by HaiEduTech smart system")}</p>
        </header>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">{t("Cấp độ:", "Level:")}</span>
          {ZH_LEVELS.map((l) => <Button key={l} size="sm" variant={level === l ? "default" : "outline"} onClick={() => setLevel(l)}>HSK {l}</Button>)}
        </div>
        {usesTopic && (
          <div className="flex flex-wrap gap-2">
            {[{ key: "all", vi: "Tất cả", en: "All" }, ...ZH_TOPICS].map((x) => (
              <Button key={x.key} size="sm" variant={topic === x.key ? "secondary" : "ghost"} onClick={() => setTopic(x.key)}>{t(x.vi, x.en)}</Button>
            ))}
          </div>
        )}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-4 md:grid-cols-7 h-auto w-full">
            {tabs.map(({ v, icon: I, vi, en }) => <TabsTrigger key={v} value={v} className="gap-1.5 py-2"><I className="w-4 h-4" />{t(vi, en)}</TabsTrigger>)}
          </TabsList>
          <TabsContent value="essay"><ZhEssayTask essays={essays} level={level} /></TabsContent>
          <TabsContent value="vocab"><ZhSentenceTask items={vocab} mode="vocab" poolKey={`zhw-vocab-${level}-${topic}`} /></TabsContent>
          <TabsContent value="grammar"><ZhSentenceTask items={grammar} mode="grammar" poolKey={`zhw-grammar-${level}`} /></TabsContent>
          <TabsContent value="connector"><ZhSentenceTask items={connectors} mode="connector" poolKey={`zhw-conn-${level}`} /></TabsContent>
          <TabsContent value="translation"><ZhSentenceTask items={translation} mode="translation" poolKey={`zhw-tr-${level}-${topic}`} /></TabsContent>
          <TabsContent value="paraphrase"><ZhSentenceTask items={paraphrase} mode="paraphrase" poolKey={`zhw-para-${paraLevel}-${topic}`} /></TabsContent>
          <TabsContent value="typing"><ZhTypingTask items={typing} poolKey={`zhw-type-${level}`} /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
