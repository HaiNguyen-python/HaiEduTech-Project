import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Upload, Plus, Loader2, Search, Trash2, FileJson, FileSpreadsheet, Sparkles, X, Wand2 } from "lucide-react";

interface DictRow {
  id: string;
  word: string;
  phonetic: string | null;
  part_of_speech: string | null;
  vietnamese_definition: string;
  english_definition: string | null;
  tag: string | null;
  created_at: string;
}

const TAGS = ["General", "IELTS", "TOEIC", "Academic", "Business", "Daily", "AI-Generated"];
const BATCH_SIZE = 100;

// Dictionary language config: same schema across 4 tables but with localised labels.
export type DictLang = "en" | "zh" | "fi" | "vi";

interface LangConfig {
  table: "english_dictionary" | "chinese_dictionary" | "finnish_dictionary" | "vietnamese_dictionary";
  titleVi: string;
  titleEn: string;
  wordLabelVi: string;
  wordLabelEn: string;
  placeholder: string;
  phoneticHint: string;
  lowercase: boolean; // Only English forces lowercase; others preserve diacritics/Hanzi
}

const LANG_CONFIGS: Record<DictLang, LangConfig> = {
  en: {
    table: "english_dictionary",
    titleVi: "Từ điển Anh - Việt (HaiEduTech Official)",
    titleEn: "English-Vietnamese Dictionary (HaiEduTech Official)",
    wordLabelVi: "Từ tiếng Anh *",
    wordLabelEn: "English Word *",
    placeholder: "artificial",
    phoneticHint: "/ˌɑːrtɪˈfɪʃəl/",
    lowercase: true,
  },
  zh: {
    table: "chinese_dictionary",
    titleVi: "Từ điển Trung - Việt (HaiEduTech Official)",
    titleEn: "Chinese-Vietnamese Dictionary (HaiEduTech Official)",
    wordLabelVi: "Từ tiếng Trung (Hán tự) *",
    wordLabelEn: "Chinese Word (Hanzi) *",
    placeholder: "人工智能",
    phoneticHint: "rén gōng zhì néng",
    lowercase: false,
  },
  fi: {
    table: "finnish_dictionary",
    titleVi: "Từ điển Phần Lan - Việt (HaiEduTech Official)",
    titleEn: "Finnish-Vietnamese Dictionary (HaiEduTech Official)",
    wordLabelVi: "Từ tiếng Phần Lan *",
    wordLabelEn: "Finnish Word *",
    placeholder: "kestävä",
    phoneticHint: "/ˈkestævæ/",
    lowercase: true,
  },
  vi: {
    table: "vietnamese_dictionary",
    titleVi: "Từ điển Việt (HaiEduTech Official)",
    titleEn: "Vietnamese Dictionary (HaiEduTech Official)",
    wordLabelVi: "Từ tiếng Việt *",
    wordLabelEn: "Vietnamese Word *",
    placeholder: "bền vững",
    phoneticHint: "(tùy chọn)",
    lowercase: false,
  },
};

// Minimal CSV parser supporting quoted fields with commas and newlines.
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { inQ = false; }
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { cur.push(field); field = ""; }
      else if (c === "\n") { cur.push(field); rows.push(cur); cur = []; field = ""; }
      else if (c === "\r") { /* skip */ }
      else field += c;
    }
  }
  if (field.length || cur.length) { cur.push(field); rows.push(cur); }
  return rows.filter(r => r.some(x => x.trim().length > 0));
}

interface Props { lang?: DictLang }

const EnglishDictionaryAdmin = ({ lang = "en" }: Props) => {
  const cfg = LANG_CONFIGS[lang];
  const { t } = useLanguage();
  const [word, setWord] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [pos, setPos] = useState("");
  const [viDef, setViDef] = useState("");
  const [enDef, setEnDef] = useState("");
  const [tag, setTag] = useState("General");
  const [examples, setExamples] = useState<{ en: string; vi: string }[]>([]);
  const [collocations, setCollocations] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);


  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<DictRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importTotal, setImportTotal] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  // Bulk AI Generation state
  const [bulkInput, setBulkInput] = useState("");
  const [bulkRunning, setBulkRunning] = useState(false);
  const [bulkDone, setBulkDone] = useState(0);
  const [bulkTotal, setBulkTotal] = useState(0);
  const [bulkCurrent, setBulkCurrent] = useState<string>("");
  const [bulkFailed, setBulkFailed] = useState<string[]>([]);

  const loadEntries = async () => {
    setLoading(true);
    const q = supabase
      .from(cfg.table as any)
      .select("id, word, phonetic, part_of_speech, vietnamese_definition, english_definition, tag, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(50);
    const { data, error, count } = search.trim()
      ? await q.ilike("word", `%${search.trim().toLowerCase()}%`)
      : await q;
    if (!error) {
      setRows(data as DictRow[] || []);
      setTotal(count || 0);
    }
    setLoading(false);
  };

  useEffect(() => { loadEntries(); /* eslint-disable-next-line */ }, []);

  // Generate structured entry from Perplexity AI and auto-fill the form
  const generateWithAI = async () => {
    const target = word.trim();
    if (!target) {
      toast.error(t("Vui lòng nhập từ trước", "Please enter a word first"));
      return;
    }
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("dictionary-ai-generate", {
        body: { word: target },
      });
      if (error || !data || (data as any).error) {
        throw new Error((data as any)?.error || error?.message || "AI error");
      }
      // Auto-fill form fields with sanitized AI output
      setPhonetic(String(data.phonetic || ""));
      setPos(String(data.part_of_speech || ""));
      setViDef(String(data.vietnamese_definition || ""));
      setEnDef(String(data.english_definition || ""));
      setExamples(Array.isArray(data.examples) ? data.examples : []);
      setCollocations(Array.isArray(data.collocations_synonyms) ? data.collocations_synonyms : []);
      toast.success(t("Đã tạo nội dung — hãy rà soát trước khi lưu", "Generated — please review before saving"));
    } catch (e: any) {
      console.error(e);
      toast.error(t(
        "Không thể tự động tạo từ vựng, vui lòng thử lại hoặc điền thủ công",
        "Could not auto-generate, please try again or fill manually"
      ));
    } finally {
      setAiLoading(false);
    }
  };

  const submitOne = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !viDef.trim()) {
      toast.error(t("Cần nhập từ và nghĩa tiếng Việt", "Word and Vietnamese definition are required"));
      return;
    }
    setSubmitting(true);
    const cleanExamples = examples
      .map(ex => ({ en: ex.en.trim(), vi: ex.vi.trim() }))
      .filter(ex => ex.en);
    const cleanCollocations = collocations.map(c => c.trim()).filter(Boolean);
    const { error } = await supabase.from(cfg.table as any).upsert(
      {
        word: cfg.lowercase ? word.trim().toLowerCase() : word.trim(),
        phonetic: phonetic.trim() || null,
        part_of_speech: pos.trim() || null,
        vietnamese_definition: viDef.trim(),
        english_definition: enDef.trim() || null,
        examples: cleanExamples,
        collocations_synonyms: cleanCollocations,
        tag: tag || "General",
      },
      { onConflict: "word" }
    );
    setSubmitting(false);
    if (error) {
      console.error(error);
      toast.error(t("Lỗi khi lưu", "Save failed") + ": " + error.message);
      return;
    }
    toast.success(t("Đã lưu từ vào từ điển!", "Word saved to dictionary!"));
    setWord(""); setPhonetic(""); setPos(""); setViDef(""); setEnDef("");
    setExamples([]); setCollocations([]);
    loadEntries();
  };


  const handleDelete = async (id: string) => {
    if (!confirm(t("Xóa từ này?", "Delete this entry?"))) return;
    const { error } = await supabase.from(cfg.table as any).delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(t("Đã xóa", "Deleted"));
    setRows(prev => prev.filter(r => r.id !== id));
    setTotal(p => Math.max(0, p - 1));
  };

  // Bulk import from CSV or JSON
  const onFile = async (file: File) => {
    setImporting(true); setImportProgress(0); setImportTotal(0);
    try {
      const text = await file.text();
      let items: any[] = [];
      const name = file.name.toLowerCase();

      if (name.endsWith(".json")) {
        const parsed = JSON.parse(text);
        items = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.entries) ? parsed.entries : []);
      } else {
        // CSV: first row = headers
        const rows = parseCSV(text);
        if (rows.length < 2) throw new Error("Empty file");
        const headers = rows[0].map(h => h.trim().toLowerCase());
        const idx = (k: string) => headers.indexOf(k);
        const wi = idx("word");
        const phi = idx("phonetic");
        const posi = idx("part_of_speech");
        const vi = idx("vietnamese_definition") !== -1 ? idx("vietnamese_definition") : idx("definition");
        const eni = idx("english_definition");
        const ti = idx("tag");
        if (wi === -1 || vi === -1) throw new Error("CSV must include 'word' and 'vietnamese_definition' (or 'definition') columns");
        for (let r = 1; r < rows.length; r++) {
          const row = rows[r];
          items.push({
            word: row[wi],
            phonetic: phi !== -1 ? row[phi] : "",
            part_of_speech: posi !== -1 ? row[posi] : "",
            vietnamese_definition: row[vi],
            english_definition: eni !== -1 ? row[eni] : "",
            tag: ti !== -1 ? row[ti] : "General",
          });
        }
      }

      // Normalize + filter
      const records = items
        .map((it: any) => ({
          word: String(it.word || "").trim().toLowerCase(),
          phonetic: String(it.phonetic || "").trim() || null,
          part_of_speech: String(it.part_of_speech || it.pos || "").trim() || null,
          vietnamese_definition: String(it.vietnamese_definition || it.definition || it.vi || "").trim(),
          english_definition: String(it.english_definition || it.en || "").trim() || null,
          examples: Array.isArray(it.examples) ? it.examples : [],
          collocations_synonyms: Array.isArray(it.collocations_synonyms) ? it.collocations_synonyms : (Array.isArray(it.collocations) ? it.collocations : []),
          tag: String(it.tag || "General").trim() || "General",
        }))
        .filter(r => r.word && r.vietnamese_definition);

      // De-duplicate within file (last wins)
      const map = new Map<string, any>();
      for (const r of records) map.set(r.word, r);
      const finalRecords = Array.from(map.values());

      if (finalRecords.length === 0) throw new Error("No valid rows found");

      setImportTotal(finalRecords.length);
      let done = 0;
      for (let i = 0; i < finalRecords.length; i += BATCH_SIZE) {
        const chunk = finalRecords.slice(i, i + BATCH_SIZE);
        const { error } = await supabase
          .from(cfg.table as any)
          .upsert(chunk, { onConflict: "word" });
        if (error) throw error;
        done += chunk.length;
        setImportProgress(done);
      }

      toast.success(t(`Đã nhập ${done} từ thành công!`, `Imported ${done} English words successfully!`));
      loadEntries();
    } catch (err: any) {
      console.error(err);
      toast.error(t("Lỗi nhập file", "Import failed") + ": " + (err?.message || "unknown"));
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  // Bulk AI Generation: generate full dictionary entries via Perplexity for a list of raw words
  const runBulkAI = async () => {
    // Parse: split by comma OR newline, trim, lowercase, dedupe
    const raw = bulkInput
      .split(/[\n,]+/)
      .map(w => w.trim().toLowerCase())
      .filter(w => w.length > 0 && w.length <= 100);
    const words = Array.from(new Set(raw));
    if (words.length === 0) {
      toast.error(t("Vui lòng nhập ít nhất một từ", "Please enter at least one word"));
      return;
    }
    if (words.length > 50) {
      toast.error(t("Tối đa 50 từ mỗi lượt để tránh quá tải", "Max 50 words per run to avoid overload"));
      return;
    }

    setBulkRunning(true);
    setBulkDone(0);
    setBulkTotal(words.length);
    setBulkFailed([]);
    setBulkCurrent("");

    const successRecords: any[] = [];
    const failed: string[] = [];
    const CONCURRENCY = 3; // Safe parallel calls to Perplexity to balance speed vs rate limits
    let cursor = 0;

    const worker = async () => {
      while (cursor < words.length) {
        const idx = cursor++;
        const w = words[idx];
        setBulkCurrent(w);
        try {
          const { data, error } = await supabase.functions.invoke("dictionary-ai-generate", {
            body: { word: w },
          });
          if (error || !data || (data as any).error) {
            throw new Error((data as any)?.error || error?.message || "AI error");
          }
          const viDefVal = String((data as any).vietnamese_definition || "").trim();
          if (!viDefVal) throw new Error("Empty Vietnamese definition");
          successRecords.push({
            word: w,
            phonetic: String((data as any).phonetic || "").trim() || null,
            part_of_speech: String((data as any).part_of_speech || "").trim() || null,
            vietnamese_definition: viDefVal,
            english_definition: String((data as any).english_definition || "").trim() || null,
            examples: Array.isArray((data as any).examples) ? (data as any).examples : [],
            collocations_synonyms: Array.isArray((data as any).collocations_synonyms) ? (data as any).collocations_synonyms : [],
            tag: "General",
          });
        } catch (err) {
          // Skip failed word but keep processing others
          console.warn("bulk AI gen failed for", w, err);
          failed.push(w);
        } finally {
          setBulkDone(prev => prev + 1);
        }
      }
    };

    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, words.length) }, () => worker()));

    // Bulk upsert all successful records in one call (safe atomic write)
    let savedCount = 0;
    if (successRecords.length > 0) {
      const { error: upsertErr } = await supabase
        .from(cfg.table as any)
        .upsert(successRecords, { onConflict: "word" });
      if (upsertErr) {
        console.error(upsertErr);
        toast.error(t("Lỗi khi lưu hàng loạt: ", "Bulk save failed: ") + upsertErr.message);
      } else {
        savedCount = successRecords.length;
      }
    }

    setBulkFailed(failed);
    setBulkCurrent("");
    setBulkRunning(false);

    if (savedCount > 0) {
      toast.success(
        t(`Đã tự động tạo và thêm thành công ${savedCount} từ vào từ điển!`,
          `Successfully generated and added ${savedCount} words to the dictionary!`)
      );
      setBulkInput("");
      loadEntries();
    }
    if (failed.length > 0) {
      toast.warning(
        t(`${failed.length} từ bị bỏ qua do lỗi API`, `${failed.length} words skipped due to API errors`)
      );
    }
  };


  const downloadTemplate = (kind: "csv" | "json") => {
    let content = "";
    let mime = "";
    let filename = "";
    if (kind === "csv") {
      content = `word,phonetic,part_of_speech,vietnamese_definition,english_definition,tag
artificial,/ˌɑːrtɪˈfɪʃəl/,adjective,"nhân tạo, không tự nhiên",made or produced by human beings rather than occurring naturally,IELTS
sustainable,/səˈsteɪnəbəl/,adjective,"bền vững, có thể duy trì",able to be maintained at a certain rate or level,IELTS
`;
      mime = "text/csv"; filename = "english_dictionary_template.csv";
    } else {
      content = JSON.stringify([
        { word: "artificial", phonetic: "/ˌɑːrtɪˈfɪʃəl/", part_of_speech: "adjective", vietnamese_definition: "nhân tạo", english_definition: "made by humans", tag: "IELTS", examples: [{ en: "Artificial intelligence is advancing.", vi: "Trí tuệ nhân tạo đang phát triển." }], collocations_synonyms: ["artificial intelligence", "synthetic"] }
      ], null, 2);
      mime = "application/json"; filename = "english_dictionary_template.json";
    }
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {t("Từ điển Anh - Việt (HaiEduTech Official)", "English-Vietnamese Dictionary (HaiEduTech Official)")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t(
              "Quản lý kho từ vựng tiếng Anh chính thức. Khi học sinh tra cứu, hệ thống ưu tiên kết quả tại chỗ (dưới 10ms) trước khi gọi AI bên ngoài.",
              "Manage the official English vocabulary store. Student lookups hit this database first (under 10ms) before falling back to external AI."
            )}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {t("Tổng số từ trong từ điển", "Total entries")}: <span className="font-bold text-foreground">{total}</span>
          </p>
        </CardContent>
      </Card>

      {/* Two-column on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Manual Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" />
              {t("Thêm từ thủ công", "Add Word Manually")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitOne} className="space-y-3">
              <div>
                <Label htmlFor="dict-word">{t("Từ tiếng Anh *", "English Word *")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="dict-word"
                    value={word}
                    onChange={e => setWord(e.target.value)}
                    placeholder="artificial"
                    maxLength={120}
                    required
                    disabled={aiLoading}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={generateWithAI}
                    disabled={aiLoading || !word.trim()}
                    className="shrink-0 bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground hover:brightness-110"
                    title={t("Tự động tạo bằng Perplexity AI", "Auto-generate with Perplexity AI")}
                  >
                    {aiLoading
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Sparkles className="w-4 h-4" />}
                    <span className="ml-1.5 hidden sm:inline">
                      {aiLoading
                        ? t("Đang tạo...", "Generating...")
                        : t("Tạo bằng Perplexity", "Generate with Perplexity")}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Loading overlay state inside form */}
              <fieldset disabled={aiLoading} className="space-y-3 contents">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="dict-ph">{t("Phiên âm IPA", "Phonetic (IPA)")}</Label>
                  <Input id="dict-ph" value={phonetic} onChange={e => setPhonetic(e.target.value)} placeholder="/ˌɑːrtɪˈfɪʃəl/" maxLength={80} />
                </div>
                <div>
                  <Label htmlFor="dict-pos">{t("Từ loại", "Part of Speech")}</Label>
                  <Input id="dict-pos" value={pos} onChange={e => setPos(e.target.value)} placeholder="adjective" maxLength={40} />
                </div>
              </div>
              <div>
                <Label htmlFor="dict-vi">{t("Nghĩa tiếng Việt *", "Vietnamese Definition *")}</Label>
                <Textarea id="dict-vi" value={viDef} onChange={e => setViDef(e.target.value)} rows={2} maxLength={500} required />
              </div>
              <div>
                <Label htmlFor="dict-en">{t("Định nghĩa tiếng Anh (tùy chọn)", "English Definition (optional)")}</Label>
                <Textarea id="dict-en" value={enDef} onChange={e => setEnDef(e.target.value)} rows={2} maxLength={500} />
              </div>

              {/* Examples (JSONB) editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label>{t("Câu ví dụ", "Examples")}</Label>
                  <button
                    type="button"
                    onClick={() => setExamples(prev => [...prev, { en: "", vi: "" }])}
                    className="text-xs text-primary hover:underline"
                  >
                    + {t("Thêm câu", "Add example")}
                  </button>
                </div>
                {examples.length === 0 && (
                  <p className="text-xs text-muted-foreground italic">
                    {t("Chưa có ví dụ. Bấm \"Tạo bằng Perplexity\" để tự sinh.", "No examples yet. Use \"Generate with Perplexity\".")}
                  </p>
                )}
                <div className="space-y-2">
                  {examples.map((ex, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 items-start bg-secondary/40 p-2 rounded-md">
                      <Input
                        value={ex.en}
                        onChange={e => setExamples(prev => prev.map((p, idx) => idx === i ? { ...p, en: e.target.value } : p))}
                        placeholder={t("Câu tiếng Anh", "English sentence")}
                        maxLength={300}
                      />
                      <Input
                        value={ex.vi}
                        onChange={e => setExamples(prev => prev.map((p, idx) => idx === i ? { ...p, vi: e.target.value } : p))}
                        placeholder={t("Bản dịch tiếng Việt", "Vietnamese translation")}
                        maxLength={300}
                      />
                      <button
                        type="button"
                        onClick={() => setExamples(prev => prev.filter((_, idx) => idx !== i))}
                        className="p-2 text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collocations / Synonyms (JSONB) editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label>{t("Collocations / Đồng nghĩa", "Collocations / Synonyms")}</Label>
                  <button
                    type="button"
                    onClick={() => setCollocations(prev => [...prev, ""])}
                    className="text-xs text-primary hover:underline"
                  >
                    + {t("Thêm", "Add")}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {collocations.map((c, i) => (
                    <div key={i} className="flex items-center gap-1 bg-primary/10 rounded-full pl-3 pr-1 py-0.5">
                      <input
                        value={c}
                        onChange={e => setCollocations(prev => prev.map((p, idx) => idx === i ? e.target.value : p))}
                        className="bg-transparent text-sm text-foreground outline-none w-32"
                        maxLength={80}
                      />
                      <button
                        type="button"
                        onClick={() => setCollocations(prev => prev.filter((_, idx) => idx !== i))}
                        className="p-1 text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {collocations.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">
                      {t("Chưa có. Sẽ tự điền khi dùng AI.", "None yet. Will auto-fill from AI.")}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="dict-tag">{t("Nhãn", "Tag")}</Label>
                <select id="dict-tag" value={tag} onChange={e => setTag(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {TAGS.map(tg => <option key={tg} value={tg}>{tg}</option>)}
                </select>
              </div>
              <Button type="submit" disabled={submitting || aiLoading} className="w-full">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {t("Lưu vào từ điển", "Save to Dictionary")}
              </Button>
              </fieldset>

            </form>
          </CardContent>
        </Card>

        {/* Bulk Import */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              {t("Nạp hàng loạt (CSV / JSON)", "Bulk Import (CSV / JSON)")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t(
                "Tải lên file CSV hoặc JSON. Các từ trùng sẽ được cập nhật thay vì tạo mới.",
                "Upload a CSV or JSON file. Duplicate words will be updated instead of creating new entries."
              )}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => downloadTemplate("csv")} className="flex-1">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                {t("Mẫu CSV", "CSV Template")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadTemplate("json")} className="flex-1">
                <FileJson className="w-4 h-4 mr-2" />
                {t("Mẫu JSON", "JSON Template")}
              </Button>
            </div>

            <label
              htmlFor="dict-file"
              className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:bg-secondary/50 transition-colors"
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f) onFile(f);
              }}
            >
              <Upload className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                {t("Kéo thả file hoặc bấm để chọn", "Drag & drop or click to browse")}
              </p>
              <p className="text-xs text-muted-foreground">.csv, .json</p>
              <input
                ref={fileRef}
                id="dict-file"
                type="file"
                accept=".csv,.json,application/json,text/csv"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }}
                disabled={importing}
              />
            </label>

            {importing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{t("Đang nhập...", "Importing...")}</span>
                  <span className="font-medium text-foreground">{importProgress}/{importTotal}</span>
                </div>
                <Progress value={importTotal ? (importProgress / importTotal) * 100 : 0} />
              </div>
            )}

            {/* Bulk AI Generation - generate full entries from a list of raw words */}
            <div className="pt-4 mt-2 border-t border-border space-y-3">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">
                  {t("Tạo hàng loạt bằng AI (Perplexity)", "Bulk AI Generation (Perplexity)")}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground">
                {t(
                  "Nhập danh sách từ vựng thô (phân cách bằng dấu phẩy hoặc xuống dòng). AI sẽ tự sinh phiên âm, nghĩa Việt, ví dụ, collocations và lưu vào từ điển.",
                  "Enter raw words (separated by commas or newlines). AI will auto-generate phonetic, Vietnamese meaning, examples, collocations, and save to the dictionary."
                )}
              </p>
              <Textarea
                value={bulkInput}
                onChange={e => setBulkInput(e.target.value)}
                disabled={bulkRunning || importing}
                rows={4}
                placeholder={t(
                  "Ví dụ: artificial, intelligence, machine learning\nsustainable\nresilient",
                  "Example: artificial, intelligence, machine learning\nsustainable\nresilient"
                )}
                maxLength={4000}
                className="font-mono text-sm"
              />
              <Button
                type="button"
                onClick={runBulkAI}
                disabled={bulkRunning || importing || !bulkInput.trim()}
                className="w-full bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground hover:brightness-110"
              >
                {bulkRunning
                  ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  : <Sparkles className="w-4 h-4 mr-2" />}
                {bulkRunning
                  ? t(`Đang xử lý ${bulkDone}/${bulkTotal}...`, `Processing ${bulkDone}/${bulkTotal}...`)
                  : t("✨ Tạo & Nhập tất cả với Perplexity", "✨ Generate & Import All with Perplexity")}
              </Button>

              {bulkRunning && (
                <div className="space-y-2">
                  <Progress value={bulkTotal ? (bulkDone / bulkTotal) * 100 : 0} />
                  {bulkCurrent && (
                    <p className="text-xs text-muted-foreground italic">
                      {t("Đang xử lý:", "Processing:")} <span className="font-mono text-foreground">{bulkCurrent}</span>
                    </p>
                  )}
                </div>
              )}

              {!bulkRunning && bulkFailed.length > 0 && (
                <div className="text-xs bg-destructive/10 border border-destructive/30 rounded-md p-2">
                  <p className="font-medium text-destructive mb-1">
                    {t(`${bulkFailed.length} từ bị bỏ qua:`, `${bulkFailed.length} words skipped:`)}
                  </p>
                  <p className="text-muted-foreground font-mono break-words">{bulkFailed.join(", ")}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List + search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <CardTitle className="text-base">{t("Từ vựng đã có", "Existing Entries")}</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-8 w-56"
                  placeholder={t("Tìm từ...", "Search word...")}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && loadEntries()}
                />
              </div>
              <Button size="sm" onClick={loadEntries} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("Lọc", "Filter")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : rows.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">{t("Chưa có từ nào", "No entries yet")}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b border-border">
                    <th className="py-2 pr-3">{t("Từ", "Word")}</th>
                    <th className="py-2 pr-3">{t("Phiên âm", "Phonetic")}</th>
                    <th className="py-2 pr-3">{t("Loại", "POS")}</th>
                    <th className="py-2 pr-3">{t("Nghĩa", "Definition")}</th>
                    <th className="py-2 pr-3">{t("Nhãn", "Tag")}</th>
                    <th className="py-2 pr-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.id} className="border-b border-border/40 hover:bg-secondary/30">
                      <td className="py-2 pr-3 font-medium text-foreground">{r.word}</td>
                      <td className="py-2 pr-3 text-muted-foreground font-mono text-xs">{r.phonetic}</td>
                      <td className="py-2 pr-3 text-muted-foreground text-xs italic">{r.part_of_speech}</td>
                      <td className="py-2 pr-3 text-foreground max-w-xs truncate">{r.vietnamese_definition}</td>
                      <td className="py-2 pr-3">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{r.tag || "General"}</span>
                      </td>
                      <td className="py-2 pr-3">
                        <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {total > rows.length && (
                <p className="text-xs text-muted-foreground mt-3">
                  {t(`Hiển thị ${rows.length} / ${total} từ. Dùng ô tìm để lọc.`, `Showing ${rows.length} of ${total}. Use search to filter.`)}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnglishDictionaryAdmin;
