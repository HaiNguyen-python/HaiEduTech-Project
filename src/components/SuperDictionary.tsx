// Shared Super Dictionary component - used in IELTS Writing Practice and National Exam Room
import { useState } from "react";
import { BookMarked, Search, ExternalLink, Volume2, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const SuperDictionary = () => {
  const { t } = useLanguage();
  const [dictSearchWord, setDictSearchWord] = useState("");
  const [dictResult, setDictResult] = useState<any>(null);
  const [dictViTranslations, setDictViTranslations] = useState<Record<string, string>>({});
  const [dictLoading, setDictLoading] = useState(false);
  const [thesaurusWord, setThesaurusWord] = useState("");
  const [thesaurusResult, setThesaurusResult] = useState<{ word: string; score: number }[]>([]);
  const [thesaurusLoading, setThesaurusLoading] = useState(false);
  const [collocationWord, setCollocationWord] = useState("");
  const [collocationResult, setCollocationResult] = useState<{ left: string[]; right: string[] }>({ left: [], right: [] });
  const [collocationLoading, setCollocationLoading] = useState(false);

  // Translate text to Vietnamese using MyMemory API
  const translateToVi = async (text: string): Promise<string> => {
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`);
      if (res.ok) {
        const data = await res.json();
        return data.responseData?.translatedText || "";
      }
    } catch { /* silent */ }
    return "";
  };

  // Dictionary lookup with Vietnamese translations
  const handleDictLookup = async (word: string) => {
    if (!word.trim()) return;
    setDictLoading(true);
    setDictResult(null);
    setDictViTranslations({});
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim().toLowerCase()}`);
      if (res.ok) {
        const data = await res.json();
        const entry = data[0];
        setDictResult(entry);
        const translations: Record<string, string> = {};
        const toTranslate: { key: string; text: string }[] = [];
        entry.meanings?.forEach((m: any, mIdx: number) => {
          m.definitions?.slice(0, 3).forEach((def: any, dIdx: number) => {
            toTranslate.push({ key: `def-${mIdx}-${dIdx}`, text: def.definition });
            if (def.example) {
              toTranslate.push({ key: `ex-${mIdx}-${dIdx}`, text: def.example });
            }
          });
        });
        const chunks = toTranslate.slice(0, 6);
        const results = await Promise.allSettled(
          chunks.map(async (item) => {
            const viText = await translateToVi(item.text);
            return { key: item.key, vi: viText };
          })
        );
        results.forEach((r) => {
          if (r.status === "fulfilled" && r.value.vi) {
            translations[r.value.key] = r.value.vi;
          }
        });
        setDictViTranslations(translations);
      } else {
        setDictResult({ error: true });
      }
    } catch {
      setDictResult({ error: true });
    }
    setDictLoading(false);
  };

  // Collocation lookup using Datamuse API
  const handleCollocationLookup = async (word: string) => {
    if (!word.trim()) return;
    setCollocationLoading(true);
    setCollocationResult({ left: [], right: [] });
    try {
      const w = word.trim().toLowerCase();
      const [followRes, precedeRes, adjRes, trigRes] = await Promise.all([
        fetch(`https://api.datamuse.com/words?lc=${w}&max=10`),
        fetch(`https://api.datamuse.com/words?rc=${w}&max=10`),
        fetch(`https://api.datamuse.com/words?rel_jja=${w}&max=8`),
        fetch(`https://api.datamuse.com/words?rel_trg=${w}&max=8`),
      ]);
      const followData = followRes.ok ? await followRes.json() : [];
      const precedeData = precedeRes.ok ? await precedeRes.json() : [];
      const adjData = adjRes.ok ? await adjRes.json() : [];
      const trigData = trigRes.ok ? await trigRes.json() : [];

      const leftWords = [...new Set([
        ...precedeData.map((d: any) => d.word),
        ...adjData.map((d: any) => d.word),
      ])].slice(0, 12);

      const rightWords = [...new Set([
        ...followData.map((d: any) => d.word),
        ...trigData.map((d: any) => d.word),
      ])].slice(0, 12);

      setCollocationResult({ left: leftWords, right: rightWords });
    } catch {
      setCollocationResult({ left: [], right: [] });
    }
    setCollocationLoading(false);
  };

  // Thesaurus lookup with scores
  const handleThesaurusLookup = async (word: string) => {
    if (!word.trim()) return;
    setThesaurusLoading(true);
    setThesaurusResult([]);
    try {
      const res = await fetch(`https://api.datamuse.com/words?rel_syn=${word.trim().toLowerCase()}&max=20`);
      if (res.ok) {
        const data = await res.json();
        setThesaurusResult(data.map((d: any) => ({ word: d.word, score: d.score || 0 })));
      }
    } catch {
      setThesaurusResult([]);
    }
    setThesaurusLoading(false);
  };

  const getSynonymStyle = (score: number, maxScore: number) => {
    if (maxScore === 0) return { opacity: 1 };
    const ratio = score / maxScore;
    return { opacity: 0.35 + ratio * 0.65 };
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 left-6 z-40 rounded-full shadow-lg px-4 h-12 gap-2"
          variant="default"
        >
          <BookMarked className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">{t("Siêu từ điển", "Super Dictionary")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[450px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-primary" />
            {t("Siêu từ điển của bạn", "Your Super Dictionary")}
          </SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="dictionary" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="dictionary" className="flex-1 text-xs">📖 Dictionary</TabsTrigger>
            <TabsTrigger value="ozdic" className="flex-1 text-xs">🔗 Ozdic</TabsTrigger>
            <TabsTrigger value="thesaurus" className="flex-1 text-xs">📚 Thesaurus</TabsTrigger>
          </TabsList>

          {/* Dictionary Tab */}
          <TabsContent value="dictionary" className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {t("Tra cứu định nghĩa, phát âm, ví dụ (EN/VI) ngay tại đây.", "Look up definitions, pronunciation, examples (EN/VI) right here.")}
            </p>
            <div className="flex gap-2">
              <Input
                value={dictSearchWord}
                onChange={(e) => setDictSearchWord(e.target.value)}
                placeholder={t("Nhập từ cần tra...", "Enter a word...")}
                onKeyDown={(e) => { if (e.key === "Enter") handleDictLookup(dictSearchWord); }}
              />
              <Button size="sm" onClick={() => handleDictLookup(dictSearchWord)} disabled={dictLoading}>
                {dictLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
            {dictResult && !dictResult.error && (
              <div className="rounded-lg border bg-card p-3 space-y-3 max-h-[400px] overflow-y-auto">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground text-base">{dictResult.word}</h4>
                  {dictResult.phonetic && <span className="text-xs text-muted-foreground">{dictResult.phonetic}</span>}
                  {dictResult.phonetics?.find((p: any) => p.audio) && (
                    <button onClick={() => { const a = new Audio(dictResult.phonetics.find((p: any) => p.audio)?.audio); a.play(); }} className="text-primary hover:text-primary/80">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {dictResult.meanings?.map((meaning: any, mIdx: number) => (
                  <div key={mIdx} className="space-y-2">
                    <span className="text-xs font-medium text-primary italic">{meaning.partOfSpeech}</span>
                    {meaning.definitions?.slice(0, 3).map((def: any, dIdx: number) => (
                      <div key={dIdx} className="pl-2 border-l-2 border-primary/20 space-y-0.5">
                        <p className="text-sm text-foreground">{dIdx + 1}. {def.definition}</p>
                        {dictViTranslations[`def-${mIdx}-${dIdx}`] && (
                          <p className="text-xs text-muted-foreground ml-2">🇻🇳 {dictViTranslations[`def-${mIdx}-${dIdx}`]}</p>
                        )}
                        {def.example && (
                          <>
                            <p className="text-xs text-foreground/80 italic ml-2">{`📝 "${def.example}"`}</p>
                            {dictViTranslations[`ex-${mIdx}-${dIdx}`] && (
                              <p className="text-xs text-muted-foreground ml-2">{`🇻🇳 "${dictViTranslations[`ex-${mIdx}-${dIdx}`]}"`}</p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                    {meaning.synonyms?.length > 0 && (
                      <p className="text-xs text-muted-foreground"><strong>Synonyms:</strong> {meaning.synonyms.slice(0, 5).join(", ")}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            {dictResult?.error && (
              <div className="rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground text-center">
                {t("Không tìm thấy từ này. Hãy thử từ khác.", "Word not found. Try another word.")}
              </div>
            )}
            <a href={`https://dictionary.cambridge.org/dictionary/english/${dictSearchWord.trim().toLowerCase() || ""}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary hover:underline">
              <ExternalLink className="w-3 h-3" />
              {t("Xem thêm trên Cambridge Dictionary", "See more on Cambridge Dictionary")}
            </a>
          </TabsContent>

          {/* Collocation Tab */}
          <TabsContent value="ozdic" className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {t("Tìm cụm từ kết hợp tự nhiên (collocations) ngay tại đây.", "Find natural word combinations (collocations) right here.")}
            </p>
            <div className="flex gap-2">
              <Input
                value={collocationWord}
                onChange={(e) => setCollocationWord(e.target.value)}
                placeholder={t("Nhập từ cần tìm collocation...", "Enter word for collocations...")}
                onKeyDown={(e) => { if (e.key === "Enter") handleCollocationLookup(collocationWord); }}
              />
              <Button size="sm" onClick={() => handleCollocationLookup(collocationWord)} disabled={collocationLoading}>
                {collocationLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
            {!collocationLoading && collocationWord && collocationResult.left.length === 0 && collocationResult.right.length === 0 && (
              <div className="rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground text-center">
                {t("Không tìm thấy collocation. Hãy thử từ khác.", "No collocations found. Try another word.")}
              </div>
            )}
            {(collocationResult.left.length > 0 || collocationResult.right.length > 0) && (
              <div className="rounded-lg border bg-card p-3 space-y-3 max-h-[350px] overflow-y-auto">
                <p className="text-xs font-medium text-foreground">
                  {t("Kết quả collocation cho", "Collocations for")} "<strong>{collocationWord}</strong>":
                </p>
                {collocationResult.left.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">___ + {collocationWord}:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {collocationResult.left.map((w) => (
                        <span key={w} className="rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">
                          {w} <span className="text-foreground">{collocationWord}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {collocationResult.right.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">{collocationWord} + ___:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {collocationResult.right.map((w) => (
                        <span key={w} className="rounded-md bg-accent/60 text-accent-foreground px-2 py-0.5 text-xs font-medium">
                          <span className="text-foreground">{collocationWord}</span> {w}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs font-medium text-foreground mb-2">{t("Ví dụ collocations hữu ích:", "Useful collocation examples:")}</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• <strong>make</strong> a decision (đưa ra quyết định)</li>
                <li>• <strong>exert</strong> pressure on (gây áp lực lên)</li>
                <li>• <strong>pose</strong> a threat to (đe dọa)</li>
                <li>• <strong>draw</strong> a conclusion (rút ra kết luận)</li>
                <li>• <strong>raise</strong> awareness (nâng cao nhận thức)</li>
              </ul>
            </div>
          </TabsContent>

          {/* Thesaurus Tab */}
          <TabsContent value="thesaurus" className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {t("Tìm từ đồng nghĩa — màu đậm = sát nghĩa nhất, nhạt = ít sát hơn.", "Find synonyms — darker = most relevant, lighter = less relevant.")}
            </p>
            <div className="flex gap-2">
              <Input
                value={thesaurusWord}
                onChange={(e) => setThesaurusWord(e.target.value)}
                placeholder={t("Nhập từ cần tìm đồng nghĩa...", "Enter word for synonyms...")}
                onKeyDown={(e) => { if (e.key === "Enter") handleThesaurusLookup(thesaurusWord); }}
              />
              <Button size="sm" onClick={() => handleThesaurusLookup(thesaurusWord)} disabled={thesaurusLoading}>
                {thesaurusLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
            {thesaurusResult.length > 0 && (
              <div className="rounded-lg border bg-card p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-foreground">
                    {t("Từ đồng nghĩa của", "Synonyms of")} "<strong>{thesaurusWord}</strong>":
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="inline-block w-3 h-3 rounded bg-primary" style={{ opacity: 1 }} />
                    {t("Sát nghĩa", "Closest")}
                    <span className="inline-block w-3 h-3 rounded bg-primary ml-1" style={{ opacity: 0.35 }} />
                    {t("Ít sát", "Less")}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {thesaurusResult.map((syn) => {
                    const maxScore = thesaurusResult[0]?.score || 1;
                    return (
                      <span
                        key={syn.word}
                        className="rounded-md bg-primary text-primary-foreground px-2 py-0.5 text-xs font-medium"
                        style={getSynonymStyle(syn.score, maxScore)}
                      >
                        {syn.word}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs font-medium text-foreground mb-2">{t("Thay thế từ phổ biến:", "Common word replacements:")}</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• good → beneficial, advantageous, favorable</li>
                <li>• bad → detrimental, adverse, harmful</li>
                <li>• important → crucial, vital, significant</li>
                <li>• many → numerous, a plethora of, countless</li>
                <li>• think → argue, contend, maintain, assert</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default SuperDictionary;
