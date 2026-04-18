// Redesigned Super Dictionary — side panel with size modes, recent searches, keyboard shortcut
import { useState, useEffect, useCallback, useRef } from "react";
import {
  BookMarked,
  Search,
  ExternalLink,
  Volume2,
  Loader2,
  X,
  Maximize2,
  Minimize2,
  PanelRight,
  RefreshCw,
  Clock,
  Sparkles,
  BookmarkPlus,
  Check,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type LookupErrorKind = "notFound" | "busy" | null;
type SizeMode = "compact" | "wide" | "fullscreen";
type ActiveTab = "dictionary" | "ozdic" | "thesaurus";

const SIZE_KEY = "super-dict-size";
const RECENT_KEY = "super-dict-recent";
const MAX_RECENT = 5;
const SUGGESTIONS = ["ambiguous", "perspective", "significant"];

// Colored chip per part-of-speech for fast scanning
const posChip = (pos: string): string => {
  const p = pos?.toLowerCase() || "";
  if (p.startsWith("noun")) return "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30";
  if (p.startsWith("verb")) return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
  if (p.startsWith("adj")) return "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30";
  if (p.startsWith("adv")) return "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";
  return "bg-muted text-muted-foreground border-border";
};

const SuperDictionary = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [sizeMode, setSizeMode] = useState<SizeMode>("compact");
  const [activeTab, setActiveTab] = useState<ActiveTab>("dictionary");

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
  const [collocationGroups, setCollocationGroups] = useState<{ label: string; items: { phrase: string; vi: string }[] }[]>([]);
  const [collocationLoading, setCollocationLoading] = useState(false);
  const [collocationError, setCollocationError] = useState<LookupErrorKind>(null);

  const [recent, setRecent] = useState<string[]>([]);
  const [savingNotebook, setSavingNotebook] = useState(false);
  const [savedWord, setSavedWord] = useState<string | null>(null);
  const dictInputRef = useRef<HTMLInputElement>(null);

  // Restore size mode + recent searches
  useEffect(() => {
    const savedSize = localStorage.getItem(SIZE_KEY) as SizeMode | null;
    if (savedSize === "compact" || savedSize === "wide" || savedSize === "fullscreen") {
      setSizeMode(savedSize);
    }
    try {
      const r = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      if (Array.isArray(r)) setRecent(r.slice(0, MAX_RECENT));
    } catch {
      // ignore
    }
  }, []);

  const persistSize = (m: SizeMode) => {
    setSizeMode(m);
    localStorage.setItem(SIZE_KEY, m);
  };

  const pushRecent = useCallback((word: string) => {
    const w = word.trim().toLowerCase();
    if (!w) return;
    setRecent((prev) => {
      const next = [w, ...prev.filter((x) => x !== w)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // Dictionary lookup
  const handleDictLookup = useCallback(async (word: string) => {
    if (!word.trim()) return;
    setDictLoading(true);
    setDictResult(null);
    setDictViTranslations({});
    setDictError(null);
    setSavedWord(null);
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
        pushRecent(word);
      } else {
        setDictError("notFound");
      }
    } catch {
      setDictError("busy");
    }
    setDictLoading(false);
  }, [pushRecent]);

  // Save current dictionary entry to Student Notebook
  const handleSaveToNotebook = async () => {
    if (!dictResult || savingNotebook) return;
    const word: string = dictResult.word;

    // Build a readable plaintext + lightweight HTML body
    const lines: string[] = [];
    lines.push(`📖 ${word}${dictResult.phonetic ? `  ${dictResult.phonetic}` : ""}`);
    lines.push("");
    dictResult.meanings?.forEach((meaning: any, mIdx: number) => {
      lines.push(`【 ${meaning.partOfSpeech} 】`);
      meaning.definitions?.forEach((def: any, dIdx: number) => {
        lines.push(`  ${dIdx + 1}. ${def.definition}`);
        const viDef = dictViTranslations[`def-${mIdx}-${dIdx}`];
        if (viDef) lines.push(`     🇻🇳 ${viDef}`);
        if (def.example) {
          lines.push(`     📝 "${def.example}"`);
          const viEx = dictViTranslations[`ex-${mIdx}-${dIdx}`];
          if (viEx) lines.push(`     🇻🇳 "${viEx}"`);
        }
      });
      lines.push("");
    });
    const content = lines.join("\n");

    setSavingNotebook(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        toast.error(t("Vui lòng đăng nhập để lưu vào sổ tay.", "Please sign in to save to your notebook."));
        setSavingNotebook(false);
        return;
      }

      const { error } = await supabase.from("student_notebooks").insert({
        user_id: auth.user.id,
        title: `📖 ${word}`,
        subject: "vocabulary",
        content,
        is_public: false,
      });

      if (error) {
        toast.error(t("Không thể lưu, hãy thử lại.", "Could not save, please retry."));
      } else {
        setSavedWord(word);
        toast.success(t(`Đã lưu "${word}" vào Sổ tay!`, `Saved "${word}" to Notebook!`));
      }
    } catch {
      toast.error(t("Không thể lưu, hãy thử lại.", "Could not save, please retry."));
    }
    setSavingNotebook(false);
  };

  // Collocation lookup
  const handleCollocationLookup = async (word: string) => {
    if (!word.trim()) return;
    setCollocationLoading(true);
    setCollocationGroups([]);
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
        const groups = Array.isArray(data.groups) ? data.groups : [];
        setCollocationGroups(groups);
        if (groups.length === 0) {
          setCollocationError("notFound");
        }
      }
    } catch {
      setCollocationError("busy");
    }
    setCollocationLoading(false);
  };

  // Thesaurus lookup
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

  // Cmd/Ctrl + K toggles panel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Autofocus dictionary input on open
  useEffect(() => {
    if (isOpen && activeTab === "dictionary") {
      setTimeout(() => dictInputRef.current?.focus(), 150);
    }
  }, [isOpen, activeTab]);

  // Click a thesaurus synonym → switch to Dictionary tab and look it up
  const handleSynonymClick = (word: string) => {
    setActiveTab("dictionary");
    setDictSearchWord(word);
    handleDictLookup(word);
  };

  // From recent / suggestion click
  const handleQuickLookup = (word: string) => {
    setActiveTab("dictionary");
    setDictSearchWord(word);
    handleDictLookup(word);
  };

  const renderErrorBox = (
    kind: LookupErrorKind,
    onRetry: () => void,
    notFoundText: string,
  ) => {
    if (!kind) return null;
    if (kind === "notFound") {
      return (
        <div className="rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground text-center">
          {notFoundText}
        </div>
      );
    }
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 flex items-center justify-between gap-2">
        <span className="text-sm text-destructive">
          {t("Dịch vụ tra cứu đang bận, hãy thử lại.", "Lookup service is busy, please retry.")}
        </span>
        <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={onRetry}>
          <RefreshCw className="w-3 h-3 mr-1" />
          {t("Thử lại", "Retry")}
        </Button>
      </div>
    );
  };

  const getSynonymStyle = (score: number, maxScore: number) => {
    if (maxScore === 0) return { opacity: 1 };
    const ratio = score / maxScore;
    return { opacity: 0.5 + ratio * 0.5 };
  };

  const highlightTarget = (phrase: string, target: string) => {
    if (!target) return phrase;
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped}\\w*)`, "ig");
    const parts = phrase.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <strong key={i} className="text-primary font-semibold">{part}</strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  // Panel sizing — desktop side panel by default, mobile = bottom sheet
  // Fullscreen = centered modal
  const panelClasses =
    sizeMode === "fullscreen"
      ? "fixed inset-x-2 top-4 bottom-4 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-[min(900px,92vw)] lg:h-[88vh] lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto z-[60] bg-card rounded-2xl border-2 border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col"
      : sizeMode === "wide"
      ? "fixed inset-x-0 bottom-0 h-[85vh] lg:inset-x-auto lg:left-3 lg:top-20 lg:bottom-3 lg:h-auto lg:w-[520px] z-[60] bg-card rounded-t-2xl lg:rounded-2xl border-2 border-primary/30 shadow-[0_-4px_30px_rgba(0,0,0,0.2)] lg:shadow-[0_10px_40px_rgba(0,0,0,0.18)] flex flex-col"
      : "fixed inset-x-0 bottom-0 h-[80vh] lg:inset-x-auto lg:left-3 lg:top-20 lg:bottom-3 lg:h-auto lg:w-[400px] z-[60] bg-card rounded-t-2xl lg:rounded-2xl border-2 border-primary/30 shadow-[0_-4px_30px_rgba(0,0,0,0.2)] lg:shadow-[0_10px_40px_rgba(0,0,0,0.18)] flex flex-col";

  // Slide animation: from left on desktop, from bottom on mobile / fullscreen
  const motionProps =
    sizeMode === "fullscreen"
      ? {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.96 },
          transition: { type: "spring" as const, damping: 24, stiffness: 280 },
        }
      : {
          initial: { opacity: 0, x: -40 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -40 },
          transition: { type: "spring" as const, damping: 26, stiffness: 280 },
        };

  return (
    <>
      {/* Floating trigger button */}
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
              title={t("Mở từ điển (Ctrl/Cmd+K)", "Open dictionary (Ctrl/Cmd+K)")}
            >
              <BookMarked className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">{t("Từ điển", "Dictionary")}</span>
              <kbd className="hidden md:inline text-[10px] bg-primary-foreground/20 rounded px-1 py-0.5">⌘K</kbd>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side panel / modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim backdrop only in fullscreen mode */}
            {sizeMode === "fullscreen" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[55]"
                onClick={() => setIsOpen(false)}
              />
            )}

            <motion.div {...motionProps} className={panelClasses}>
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 shrink-0 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <BookMarked className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {t("Siêu từ điển", "Super Dictionary")}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {t("Anh - Việt • Collocations • Synonyms", "EN-VI • Collocations • Synonyms")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {/* Compact */}
                  <Button
                    variant={sizeMode === "compact" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => persistSize("compact")}
                    title={t("Thu gọn", "Compact")}
                  >
                    <PanelRight className="w-3.5 h-3.5" />
                  </Button>
                  {/* Wide */}
                  <Button
                    variant={sizeMode === "wide" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => persistSize("wide")}
                    title={t("Mở rộng", "Wide")}
                  >
                    <Minimize2 className="w-3.5 h-3.5 rotate-45" />
                  </Button>
                  <div className="w-px h-5 bg-border mx-1" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                    title={t("Đóng (Esc)", "Close")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ActiveTab)}>
                  <TabsList className="w-full h-9 mb-3 sticky top-0 z-10">
                    <TabsTrigger value="dictionary" className="flex-1 text-sm h-8">📖 {t("Từ điển", "Dictionary")}</TabsTrigger>
                    <TabsTrigger value="ozdic" className="flex-1 text-sm h-8">🔗 {t("Kết hợp từ", "Collocation")}</TabsTrigger>
                    <TabsTrigger value="thesaurus" className="flex-1 text-sm h-8">📚 {t("Đồng nghĩa", "Thesaurus")}</TabsTrigger>
                  </TabsList>

                  {/* Dictionary Tab */}
                  <TabsContent value="dictionary" className="space-y-3 mt-0">
                    <div className="relative">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input
                            ref={dictInputRef}
                            value={dictSearchWord}
                            onChange={(e) => setDictSearchWord(e.target.value)}
                            placeholder={t("Nhập từ tiếng Anh...", "Enter an English word...")}
                            onKeyDown={(e) => { if (e.key === "Enter") handleDictLookup(dictSearchWord); }}
                            className="h-10 text-sm pr-8"
                          />
                          {dictSearchWord && (
                            <button
                              onClick={() => { setDictSearchWord(""); setDictResult(null); setDictError(null); dictInputRef.current?.focus(); }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              title={t("Xoá", "Clear")}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <Button size="sm" className="h-10 px-4" onClick={() => handleDictLookup(dictSearchWord)} disabled={dictLoading}>
                          {dictLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Recent searches */}
                    {recent.length > 0 && !dictResult && !dictLoading && (
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {t("Gần đây", "Recent")}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {recent.map((w) => (
                            <button
                              key={w}
                              onClick={() => handleQuickLookup(w)}
                              className="rounded-full bg-muted hover:bg-primary/10 hover:text-primary border border-border px-2.5 py-1 text-xs transition-colors"
                            >
                              {w}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty state suggestions */}
                    {!dictResult && !dictLoading && !dictError && recent.length === 0 && (
                      <div className="rounded-xl border border-dashed bg-muted/30 p-4 space-y-2">
                        <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                          {t("Thử ngay", "Try a word")}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {SUGGESTIONS.map((w) => (
                            <button
                              key={w}
                              onClick={() => handleQuickLookup(w)}
                              className="rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-3 py-1 text-xs font-medium transition-colors"
                            >
                              {w}
                            </button>
                          ))}
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          💡 {t("Mẹo: nhấn Ctrl/Cmd + K để bật/tắt từ điển nhanh.", "Tip: press Ctrl/Cmd + K to toggle this dictionary.")}
                        </p>
                      </div>
                    )}

                    {dictResult && !dictResult.error && (
                      <div className="rounded-xl border bg-background overflow-hidden">
                        {/* Sticky word header */}
                        <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-2 z-10 flex-wrap">
                          <h4 className="font-bold text-foreground text-lg">{dictResult.word}</h4>
                          {dictResult.phonetic && (
                            <span className="text-sm text-muted-foreground font-mono">{dictResult.phonetic}</span>
                          )}
                          <div className="ml-auto flex items-center gap-1">
                            {dictResult.phonetics?.find((p: any) => p.audio) && (
                              <button
                                onClick={() => { const a = new Audio(dictResult.phonetics.find((p: any) => p.audio)?.audio); a.play().catch(() => {}); }}
                                className="p-1.5 rounded-full hover:bg-primary/10 text-primary"
                                title={t("Nghe phát âm", "Play audio")}
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            )}
                            <Button
                              size="sm"
                              variant={savedWord === dictResult.word ? "secondary" : "default"}
                              className="h-8 px-2.5 gap-1 text-xs"
                              onClick={handleSaveToNotebook}
                              disabled={savingNotebook || savedWord === dictResult.word}
                              title={t("Lưu từ này vào Sổ tay", "Save this word to Notebook")}
                            >
                              {savingNotebook ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : savedWord === dictResult.word ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  {t("Đã lưu", "Saved")}
                                </>
                              ) : (
                                <>
                                  <BookmarkPlus className="w-3.5 h-3.5" />
                                  {t("Lưu vào Sổ tay", "Save to Notebook")}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                        {/* All meanings, no cap */}
                        <div className="p-4 space-y-4">
                          {dictResult.meanings?.map((meaning: any, mIdx: number) => (
                            <div key={mIdx} className="space-y-2">
                              <span className={`inline-block text-xs font-semibold uppercase tracking-wide italic px-2 py-0.5 rounded border ${posChip(meaning.partOfSpeech)}`}>
                                {meaning.partOfSpeech}
                              </span>
                              {meaning.definitions?.map((def: any, dIdx: number) => (
                                <div key={dIdx} className="pl-3 border-l-2 border-primary/30 space-y-1.5">
                                  <p className="text-sm leading-relaxed text-foreground">
                                    <span className="text-muted-foreground font-medium mr-1">{dIdx + 1}.</span>
                                    {def.definition}
                                  </p>
                                  {dictViTranslations[`def-${mIdx}-${dIdx}`] && (
                                    <div className="bg-emerald-500/10 border-l-2 border-emerald-500 rounded-r px-2.5 py-1.5 text-sm text-emerald-900 dark:text-emerald-200">
                                      🇻🇳 {dictViTranslations[`def-${mIdx}-${dIdx}`]}
                                    </div>
                                  )}
                                  {def.example && (
                                    <div className="space-y-1">
                                      <p className="text-sm text-foreground/80 italic">{`📝 "${def.example}"`}</p>
                                      {dictViTranslations[`ex-${mIdx}-${dIdx}`] && (
                                        <p className="text-sm text-emerald-700 dark:text-emerald-300 italic">{`🇻🇳 "${dictViTranslations[`ex-${mIdx}-${dIdx}`]}"`}</p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!dictResult && renderErrorBox(
                      dictError,
                      () => handleDictLookup(dictSearchWord),
                      t("Không tìm thấy từ này.", "Word not found."),
                    )}

                    <a
                      href={`https://dictionary.cambridge.org/dictionary/english/${dictSearchWord.trim().toLowerCase() || ""}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {t("Mở tại Cambridge Dictionary", "Open in Cambridge Dictionary")}
                    </a>
                  </TabsContent>

                  {/* Collocation Tab */}
                  <TabsContent value="ozdic" className="space-y-3 mt-0">
                    <div className="flex gap-2">
                      <Input
                        value={collocationWord}
                        onChange={(e) => setCollocationWord(e.target.value)}
                        placeholder={t("Nhập từ tìm collocation...", "Word for collocations...")}
                        onKeyDown={(e) => { if (e.key === "Enter") handleCollocationLookup(collocationWord); }}
                        className="h-10 text-sm"
                      />
                      <Button size="sm" className="h-10 px-4" onClick={() => handleCollocationLookup(collocationWord)} disabled={collocationLoading}>
                        {collocationLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      </Button>
                    </div>
                    {collocationGroups.length > 0 && (
                      <div className="rounded-xl border bg-background p-4 space-y-4">
                        <p className="text-sm font-medium text-foreground">
                          {t("Collocations cho", "Collocations for")} "<strong className="text-primary">{collocationWord}</strong>":
                        </p>
                        {collocationGroups.map((group) => (
                          <div key={group.label} className="space-y-2">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wide">{group.label}</p>
                            <div className="space-y-1.5">
                              {group.items.map((item) => (
                                <div
                                  key={item.phrase}
                                  className="rounded-lg border border-border bg-muted/40 px-3 py-2 hover:bg-muted/70 transition-colors"
                                >
                                  <div className="text-sm font-medium text-foreground">
                                    {highlightTarget(item.phrase, collocationWord)}
                                  </div>
                                  {item.vi && (
                                    <div className="text-xs text-muted-foreground italic mt-0.5">
                                      {item.vi}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {!collocationLoading && collocationGroups.length === 0 && renderErrorBox(
                      collocationError,
                      () => handleCollocationLookup(collocationWord),
                      t("Không tìm thấy collocation.", "No collocations found."),
                    )}
                  </TabsContent>

                  {/* Thesaurus Tab */}
                  <TabsContent value="thesaurus" className="space-y-3 mt-0">
                    <div className="flex gap-2">
                      <Input
                        value={thesaurusWord}
                        onChange={(e) => setThesaurusWord(e.target.value)}
                        placeholder={t("Nhập từ tìm đồng nghĩa...", "Word for synonyms...")}
                        onKeyDown={(e) => { if (e.key === "Enter") handleThesaurusLookup(thesaurusWord); }}
                        className="h-10 text-sm"
                      />
                      <Button size="sm" className="h-10 px-4" onClick={() => handleThesaurusLookup(thesaurusWord)} disabled={thesaurusLoading}>
                        {thesaurusLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      </Button>
                    </div>
                    {thesaurusResult.length > 0 && (
                      <div className="rounded-xl border bg-background p-4">
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                          <p className="text-sm font-medium text-foreground">
                            {t("Đồng nghĩa của", "Synonyms of")} "<strong className="text-primary">{thesaurusWord}</strong>":
                          </p>
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span className="inline-block w-3 h-3 rounded bg-primary" style={{ opacity: 1 }} />
                            {t("Sát nghĩa", "Closer")}
                            <span className="inline-block w-3 h-3 rounded bg-primary ml-1" style={{ opacity: 0.5 }} />
                            {t("Xa nghĩa", "Looser")}
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground mb-2">
                          💡 {t("Bấm vào từ để tra nghĩa.", "Click any word to look it up.")}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {thesaurusResult.map((syn) => {
                            const maxScore = thesaurusResult[0]?.score || 1;
                            return (
                              <button
                                key={syn.word}
                                onClick={() => handleSynonymClick(syn.word)}
                                className="rounded-lg bg-primary text-primary-foreground hover:scale-105 transition-transform px-2.5 py-1 text-sm font-medium"
                                style={getSynonymStyle(syn.score, maxScore)}
                                title={t("Tra từ này", "Look up this word")}
                              >
                                {syn.word}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {!thesaurusLoading && thesaurusResult.length === 0 && renderErrorBox(
                      thesaurusError,
                      () => handleThesaurusLookup(thesaurusWord),
                      t("Không tìm thấy từ đồng nghĩa.", "No synonyms found."),
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SuperDictionary;
