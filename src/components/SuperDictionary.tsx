// Compact floating Super Dictionary - can be used while taking tests
import { useState } from "react";
import { BookMarked, Search, ExternalLink, Volume2, Loader2, X, ChevronUp, Minimize2, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type LookupErrorKind = "notFound" | "busy" | null;

const SuperDictionary = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dictSearchWord, setDictSearchWord] = useState("");
  const [dictResult, setDictResult] = useState<any>(null);
  const [dictViTranslations, setDictViTranslations] = useState<Record<string, string>>({});
  const [dictLoading, setDictLoading] = useState(false);
  const [dictError, setDictError] = useState<LookupErrorKind>(null);
  const [thesaurusWord, setThesaurusWord] = useState("");
  const [thesaurusResult, setThesaurusResult] = useState<{ word: string; score: number }[]>([]);
  const [thesaurusLoading, setThesaurusLoading] = useState(false);
  const [thesaurusError, setThesaurusError] = useState<LookupErrorKind>(null);
  const [collocationWord, setCollocationWord] = useState("");
  const [collocationResult, setCollocationResult] = useState<{ left: string[]; right: string[] }>({ left: [], right: [] });
  const [collocationLoading, setCollocationLoading] = useState(false);
  const [collocationError, setCollocationError] = useState<LookupErrorKind>(null);

  // Dictionary lookup via proxy edge function
  const handleDictLookup = async (word: string) => {
    if (!word.trim()) return;
    setDictLoading(true);
    setDictResult(null);
    setDictViTranslations({});
    setDictError(null);
    try {
      const { data, error } = await supabase.functions.invoke("dictionary-lookup", {
        body: { type: "dictionary", word: word.trim() },
      });
      if (error || !data) {
        setDictError("busy");
      } else if (data.notFound) {
        setDictError("notFound");
      } else if (data.error) {
        setDictError("busy");
      } else if (data.entry) {
        setDictResult(data.entry);
        setDictViTranslations(data.viTranslations || {});
      } else {
        setDictError("notFound");
      }
    } catch {
      setDictError("busy");
    }
    setDictLoading(false);
  };

  // Collocation lookup via proxy edge function
  const handleCollocationLookup = async (word: string) => {
    if (!word.trim()) return;
    setCollocationLoading(true);
    setCollocationResult({ left: [], right: [] });
    setCollocationError(null);
    try {
      const { data, error } = await supabase.functions.invoke("dictionary-lookup", {
        body: { type: "collocation", word: word.trim() },
      });
      if (error || !data) {
        setCollocationError("busy");
      } else if (data.error) {
        setCollocationError("busy");
      } else {
        const left = Array.isArray(data.left) ? data.left : [];
        const right = Array.isArray(data.right) ? data.right : [];
        setCollocationResult({ left, right });
        if (left.length === 0 && right.length === 0) {
          setCollocationError("notFound");
        }
      }
    } catch {
      setCollocationError("busy");
    }
    setCollocationLoading(false);
  };

  // Thesaurus lookup via proxy edge function
  const handleThesaurusLookup = async (word: string) => {
    if (!word.trim()) return;
    setThesaurusLoading(true);
    setThesaurusResult([]);
    setThesaurusError(null);
    try {
      const { data, error } = await supabase.functions.invoke("dictionary-lookup", {
        body: { type: "thesaurus", word: word.trim() },
      });
      if (error || !data) {
        setThesaurusError("busy");
      } else if (data.error) {
        setThesaurusError("busy");
      } else {
        const syns = Array.isArray(data.synonyms) ? data.synonyms : [];
        setThesaurusResult(syns);
        if (syns.length === 0) {
          setThesaurusError("notFound");
        }
      }
    } catch {
      setThesaurusError("busy");
    }
    setThesaurusLoading(false);
  };

  const renderErrorBox = (
    kind: LookupErrorKind,
    onRetry: () => void,
    notFoundText: string,
  ) => {
    if (!kind) return null;
    if (kind === "notFound") {
      return (
        <div className="rounded-lg border bg-muted/50 p-2 text-xs text-muted-foreground text-center">
          {notFoundText}
        </div>
      );
    }
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-2 flex items-center justify-between gap-2">
        <span className="text-xs text-destructive">
          {t("Dịch vụ tra cứu đang bận, hãy thử lại.", "Lookup service is busy, please retry.")}
        </span>
        <Button size="sm" variant="outline" className="h-6 px-2 text-[11px]" onClick={onRetry}>
          <RefreshCw className="w-3 h-3 mr-1" />
          {t("Thử lại", "Retry")}
        </Button>
      </div>
    );
  };

  const getSynonymStyle = (score: number, maxScore: number) => {
    if (maxScore === 0) return { opacity: 1 };
    const ratio = score / maxScore;
    return { opacity: 0.35 + ratio * 0.65 };
  };

  // Compact panel height: default ~280px, expanded ~450px
  const panelHeight = isExpanded ? "max-h-[450px]" : "max-h-[280px]";

  return (
    <>
      {/* Floating trigger button - only visible when panel is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-4 left-4 z-[60]"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full shadow-lg px-4 h-11 gap-2"
              variant="default"
            >
              <BookMarked className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">{t("Từ điển", "Dictionary")}</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact bottom panel - does NOT block test content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed bottom-0 left-0 right-0 z-[60] bg-card border-t-2 border-primary/30 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] ${panelHeight} flex flex-col`}
          >
            {/* Header bar - drag handle + controls */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50 shrink-0">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {t("Siêu từ điển", "Super Dictionary")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Minimize" : "Expand"}
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setIsOpen(false)}
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <Tabs defaultValue="dictionary">
                <TabsList className="w-full h-8 mb-2">
                  <TabsTrigger value="dictionary" className="flex-1 text-xs h-7">📖 Dictionary</TabsTrigger>
                  <TabsTrigger value="ozdic" className="flex-1 text-xs h-7">🔗 Ozdic</TabsTrigger>
                  <TabsTrigger value="thesaurus" className="flex-1 text-xs h-7">📚 Thesaurus</TabsTrigger>
                </TabsList>

                {/* Dictionary Tab */}
                <TabsContent value="dictionary" className="space-y-2 mt-0">
                  <div className="flex gap-2">
                    <Input
                      value={dictSearchWord}
                      onChange={(e) => setDictSearchWord(e.target.value)}
                      placeholder={t("Nhập từ cần tra...", "Enter a word...")}
                      onKeyDown={(e) => { if (e.key === "Enter") handleDictLookup(dictSearchWord); }}
                      className="h-8 text-sm"
                    />
                    <Button size="sm" className="h-8 px-3" onClick={() => handleDictLookup(dictSearchWord)} disabled={dictLoading}>
                      {dictLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    </Button>
                  </div>
                  {dictResult && !dictResult.error && (
                    <div className="rounded-lg border bg-background p-2.5 space-y-2 overflow-y-auto max-h-[200px]">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground text-sm">{dictResult.word}</h4>
                        {dictResult.phonetic && <span className="text-xs text-muted-foreground">{dictResult.phonetic}</span>}
                        {dictResult.phonetics?.find((p: any) => p.audio) && (
                          <button onClick={() => { const a = new Audio(dictResult.phonetics.find((p: any) => p.audio)?.audio); a.play(); }} className="text-primary hover:text-primary/80">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      {dictResult.meanings?.map((meaning: any, mIdx: number) => (
                        <div key={mIdx} className="space-y-1">
                          <span className="text-xs font-medium text-primary italic">{meaning.partOfSpeech}</span>
                          {meaning.definitions?.slice(0, 2).map((def: any, dIdx: number) => (
                            <div key={dIdx} className="pl-2 border-l-2 border-primary/20 space-y-0.5">
                              <p className="text-xs text-foreground">{dIdx + 1}. {def.definition}</p>
                              {dictViTranslations[`def-${mIdx}-${dIdx}`] && (
                                <p className="text-[11px] text-muted-foreground ml-1">🇻🇳 {dictViTranslations[`def-${mIdx}-${dIdx}`]}</p>
                              )}
                              {def.example && (
                                <>
                                  <p className="text-[11px] text-foreground/80 italic ml-1">{`📝 "${def.example}"`}</p>
                                  {dictViTranslations[`ex-${mIdx}-${dIdx}`] && (
                                    <p className="text-[11px] text-muted-foreground ml-1">{`🇻🇳 "${dictViTranslations[`ex-${mIdx}-${dIdx}`]}"`}</p>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                  {!dictResult && renderErrorBox(
                    dictError,
                    () => handleDictLookup(dictSearchWord),
                    t("Không tìm thấy từ này.", "Word not found."),
                  )}
                  <a href={`https://dictionary.cambridge.org/dictionary/english/${dictSearchWord.trim().toLowerCase() || ""}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary hover:underline">
                    <ExternalLink className="w-3 h-3" />
                    {t("Cambridge Dictionary", "Cambridge Dictionary")}
                  </a>
                </TabsContent>

                {/* Collocation Tab */}
                <TabsContent value="ozdic" className="space-y-2 mt-0">
                  <div className="flex gap-2">
                    <Input
                      value={collocationWord}
                      onChange={(e) => setCollocationWord(e.target.value)}
                      placeholder={t("Nhập từ tìm collocation...", "Word for collocations...")}
                      onKeyDown={(e) => { if (e.key === "Enter") handleCollocationLookup(collocationWord); }}
                      className="h-8 text-sm"
                    />
                    <Button size="sm" className="h-8 px-3" onClick={() => handleCollocationLookup(collocationWord)} disabled={collocationLoading}>
                      {collocationLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    </Button>
                  </div>
                  {(collocationResult.left.length > 0 || collocationResult.right.length > 0) && (
                    <div className="rounded-lg border bg-background p-2.5 space-y-2 overflow-y-auto max-h-[200px]">
                      <p className="text-xs font-medium text-foreground">
                        {t("Collocations cho", "Collocations for")} "<strong>{collocationWord}</strong>":
                      </p>
                      {collocationResult.left.length > 0 && (
                        <div>
                          <p className="text-[11px] font-medium text-primary mb-1">___ + {collocationWord}:</p>
                          <div className="flex flex-wrap gap-1">
                            {collocationResult.left.map((w) => (
                              <span key={w} className="rounded bg-primary/10 text-primary px-1.5 py-0.5 text-[11px] font-medium">
                                {w} <span className="text-foreground">{collocationWord}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {collocationResult.right.length > 0 && (
                        <div>
                          <p className="text-[11px] font-medium text-primary mb-1">{collocationWord} + ___:</p>
                          <div className="flex flex-wrap gap-1">
                            {collocationResult.right.map((w) => (
                              <span key={w} className="rounded bg-accent/60 text-accent-foreground px-1.5 py-0.5 text-[11px] font-medium">
                                <span className="text-foreground">{collocationWord}</span> {w}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {!collocationLoading && collocationWord && collocationResult.left.length === 0 && collocationResult.right.length === 0 && (
                    <div className="rounded-lg border bg-muted/50 p-2 text-xs text-muted-foreground text-center">
                      {t("Không tìm thấy.", "No collocations found.")}
                    </div>
                  )}
                </TabsContent>

                {/* Thesaurus Tab */}
                <TabsContent value="thesaurus" className="space-y-2 mt-0">
                  <div className="flex gap-2">
                    <Input
                      value={thesaurusWord}
                      onChange={(e) => setThesaurusWord(e.target.value)}
                      placeholder={t("Nhập từ tìm đồng nghĩa...", "Word for synonyms...")}
                      onKeyDown={(e) => { if (e.key === "Enter") handleThesaurusLookup(thesaurusWord); }}
                      className="h-8 text-sm"
                    />
                    <Button size="sm" className="h-8 px-3" onClick={() => handleThesaurusLookup(thesaurusWord)} disabled={thesaurusLoading}>
                      {thesaurusLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    </Button>
                  </div>
                  {thesaurusResult.length > 0 && (
                    <div className="rounded-lg border bg-background p-2.5 overflow-y-auto max-h-[200px]">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs font-medium text-foreground">
                          {t("Đồng nghĩa của", "Synonyms of")} "<strong>{thesaurusWord}</strong>":
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <span className="inline-block w-2.5 h-2.5 rounded bg-primary" style={{ opacity: 1 }} />
                          {t("Sát", "Close")}
                          <span className="inline-block w-2.5 h-2.5 rounded bg-primary ml-0.5" style={{ opacity: 0.35 }} />
                          {t("Xa", "Far")}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {thesaurusResult.map((syn) => {
                          const maxScore = thesaurusResult[0]?.score || 1;
                          return (
                            <span
                              key={syn.word}
                              className="rounded bg-primary text-primary-foreground px-1.5 py-0.5 text-[11px] font-medium"
                              style={getSynonymStyle(syn.score, maxScore)}
                            >
                              {syn.word}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SuperDictionary;
