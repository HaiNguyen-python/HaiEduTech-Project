/**
 * @file SwedishVocabQA.tsx
 * @description Quality-assurance panel for the Swedish vocabulary bank.
 *              Runs a set of heuristic rules over every SwedishWord entry and
 *              produces a filterable error report (ambiguous translations,
 *              ungrammatical example sentences, duplicates, etc.). Lets the
 *              teacher export the flagged rows as CSV / JSON before shipping.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { AlertTriangle, AlertCircle, Info, Download, FileJson, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { SWEDISH_WORDS, type SwedishWord } from "@/data/swedishVocabBank";

type Severity = "error" | "warning" | "info";

interface Issue {
  code: string;
  severity: Severity;
  message: string;        // bilingual via t() at render time? store EN; mapped below
  messageVi: string;
}

interface FlaggedWord {
  word: SwedishWord;
  issues: Issue[];
  topSeverity: Severity;
}

/* ─── Reference sets used by the rules ───────────────────────────────────── */

// Plural-only / collective nouns in Swedish — should not take "en/ett ... ny" in EN example.
const PLURAL_ONLY = new Set([
  "byxor", "jeans", "shorts", "glasögon", "solglasögon", "handskar", "vantar",
  "pyjamas", "kläder", "skor", "strumpor", "föräldrar", "syskon", "pengar",
  "möbler", "grönsaker", "frukter",
]);

// Modal / auxiliary verbs — template "Jag vill X" reads awkwardly ("I want to can").
const MODAL_VERBS = new Set([
  "kunna", "måste", "vilja", "skola", "böra", "behöva", "få", "låta", "töras", "lära",
]);

// Common templated example openings produced by the auto-generator. Used to
// detect entries that still rely on a generic template (lower QA confidence).
const GENERIC_TEMPLATES = [
  /^Jag gillar /,         // noun
  /^Jag vill /,            // verb
  /^Det är /,              // adjective
  /^Hon arbetar /,         // adverb
  /^Jag har \S+ vänner\./, // numeral
];

// Words sometimes used as their own "gloss" placeholder — flag if vi === sv.
function isLikelyPlaceholderGloss(value: string, fallback: string): boolean {
  if (!value) return true;
  const v = value.trim().toLowerCase();
  return v.length < 2 || v === fallback.trim().toLowerCase();
}

/* ─── Rule engine ────────────────────────────────────────────────────────── */

function analyze(words: SwedishWord[]): FlaggedWord[] {
  const seenId = new Map<string, number>();
  for (const w of words) seenId.set(w.id, (seenId.get(w.id) ?? 0) + 1);

  const flagged: FlaggedWord[] = [];

  for (const w of words) {
    const issues: Issue[] = [];
    const pos = (w.pos || "").toLowerCase();
    const sv = w.sv.toLowerCase();
    const vi = (w.vi || "").trim();
    const en = (w.en || "").trim();
    const ex = w.example || "";
    const exEn = w.exampleEn || "";
    const exVi = w.exampleVi || "";

    // ── Translation quality ──
    if (!vi) issues.push({ code: "VI_EMPTY", severity: "error",
      message: "Vietnamese gloss is empty", messageVi: "Nghĩa tiếng Việt trống" });
    if (!en) issues.push({ code: "EN_EMPTY", severity: "error",
      message: "English gloss is empty", messageVi: "Nghĩa tiếng Anh trống" });

    if (vi && en && vi.toLowerCase() === en.toLowerCase()) {
      issues.push({ code: "VI_EQ_EN", severity: "warning",
        message: "VI and EN gloss are identical — likely placeholder",
        messageVi: "Bản dịch Việt và Anh giống hệt — có thể là chỗ giữ chỗ" });
    }
    if (vi && isLikelyPlaceholderGloss(vi, w.sv)) {
      issues.push({ code: "VI_EQ_SV", severity: "warning",
        message: "VI gloss equals the Swedish word",
        messageVi: "Nghĩa Việt trùng với từ Thụy Điển" });
    }
    if (vi.includes("/") || vi.includes(" hoặc ") || vi.includes(" hay ")) {
      issues.push({ code: "VI_AMBIGUOUS", severity: "warning",
        message: "VI gloss offers multiple options — may be ambiguous",
        messageVi: "Nghĩa Việt có nhiều lựa chọn — có thể mơ hồ" });
    }
    if (en.includes("/")) {
      issues.push({ code: "EN_AMBIGUOUS", severity: "warning",
        message: "EN gloss offers multiple options — may be ambiguous",
        messageVi: "Nghĩa Anh có nhiều lựa chọn — có thể mơ hồ" });
    }
    if (vi.length > 60) issues.push({ code: "VI_LONG", severity: "info",
      message: "VI gloss is unusually long (>60 chars)",
      messageVi: "Nghĩa Việt quá dài (>60 ký tự)" });
    if (en.length > 60) issues.push({ code: "EN_LONG", severity: "info",
      message: "EN gloss is unusually long (>60 chars)",
      messageVi: "Nghĩa Anh quá dài (>60 ký tự)" });

    // ── Example sentence sanity ──
    if (!ex || !ex.includes(w.sv)) {
      issues.push({ code: "EX_MISSING_WORD", severity: "error",
        message: "Swedish example does not contain the headword",
        messageVi: "Câu ví dụ không chứa từ vựng" });
    }
    if (ex && !/[.!?]$/.test(ex.trim())) {
      issues.push({ code: "EX_NO_PUNCT", severity: "info",
        message: "Swedish example missing end punctuation",
        messageVi: "Câu ví dụ thiếu dấu kết thúc" });
    }
    if (exVi && !/[.!?…]$/.test(exVi.trim())) {
      issues.push({ code: "EX_VI_NO_PUNCT", severity: "info",
        message: "Vietnamese example missing end punctuation",
        messageVi: "Câu dịch Việt thiếu dấu kết thúc" });
    }

    // ── POS-specific grammar pitfalls ──
    if (pos.startsWith("v")) {
      if (MODAL_VERBS.has(sv)) {
        issues.push({ code: "MODAL_TEMPLATE", severity: "warning",
          message: `Modal verb '${w.sv}' produces awkward "I want to ${en}"`,
          messageVi: `Động từ tình thái '${w.sv}' tạo câu "I want to ${en}" gượng` });
      }
      if (/^to\s+/i.test(en)) {
        issues.push({ code: "EN_DOUBLE_TO", severity: "warning",
          message: `EN gloss already starts with "to " — template will produce "to to"`,
          messageVi: `Nghĩa Anh bắt đầu bằng "to " — sẽ tạo "to to" trong câu mẫu` });
      }
    }

    if (pos.startsWith("n") && PLURAL_ONLY.has(sv) && /\bnew\s/.test(exEn)) {
      issues.push({ code: "PLURAL_ARTICLE", severity: "warning",
        message: "Plural-only noun with singular article in EN example",
        messageVi: "Danh từ số nhiều dùng mạo từ số ít trong câu Anh" });
    }

    // Adjective + VI gloss that doesn't read as a predicate ("Nó <vi>." needs adj).
    if (pos.startsWith("adj") && vi && /[a-zà-ỹ]\s[a-zà-ỹ]{4,}/i.test(vi) && vi.split(" ").length > 3) {
      issues.push({ code: "ADJ_LONG_VI", severity: "info",
        message: "Adjective VI gloss is multi-word — may read awkwardly as predicate",
        messageVi: "Nghĩa Việt của tính từ nhiều từ — có thể đọc gượng" });
    }

    // ── Structural ──
    if ((seenId.get(w.id) ?? 0) > 1) {
      issues.push({ code: "DUP_ID", severity: "error",
        message: `Duplicate id '${w.id}'`,
        messageVi: `Trùng id '${w.id}'` });
    }
    if (!pos) {
      issues.push({ code: "POS_MISSING", severity: "warning",
        message: "Part of speech missing",
        messageVi: "Thiếu từ loại" });
    }

    // ── Template usage flag (informational) ──
    if (GENERIC_TEMPLATES.some(rx => rx.test(ex))) {
      issues.push({ code: "TEMPLATE_EXAMPLE", severity: "info",
        message: "Example uses generic template — consider hand-writing for realism",
        messageVi: "Câu ví dụ dùng mẫu chung — nên viết tay để tự nhiên hơn" });
    }

    if (issues.length === 0) continue;
    const top: Severity = issues.some(i => i.severity === "error")
      ? "error"
      : issues.some(i => i.severity === "warning") ? "warning" : "info";
    flagged.push({ word: w, issues, topSeverity: top });
  }

  return flagged;
}

/* ─── UI bits ────────────────────────────────────────────────────────────── */

const sevStyles: Record<Severity, string> = {
  error:   "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-800",
  warning: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800",
  info:    "bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-900/30 dark:text-sky-200 dark:border-sky-800",
};
const SevIcon = ({ s }: { s: Severity }) => s === "error"
  ? <AlertCircle className="w-3.5 h-3.5" />
  : s === "warning" ? <AlertTriangle className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />;

function download(filename: string, mime: string, content: string) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function csvEscape(v: string) {
  return /[",\n;]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

const SwedishVocabQA = () => {
  const { t, lang } = useLanguage();
  const [sevFilter, setSevFilter] = useState<"all" | Severity>("all");
  const [codeFilter, setCodeFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  const report = useMemo(() => analyze(SWEDISH_WORDS), []);

  const counts = useMemo(() => {
    const c = { error: 0, warning: 0, info: 0, clean: SWEDISH_WORDS.length - report.length };
    for (const r of report) c[r.topSeverity]++;
    return c;
  }, [report]);

  const codeBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of report) for (const i of r.issues) map.set(i.code, (map.get(i.code) ?? 0) + 1);
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [report]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return report.filter(r => {
      if (sevFilter !== "all" && r.topSeverity !== sevFilter) return false;
      if (codeFilter !== "all" && !r.issues.some(i => i.code === codeFilter)) return false;
      if (q && !(
        r.word.sv.toLowerCase().includes(q) ||
        r.word.vi.toLowerCase().includes(q) ||
        r.word.en.toLowerCase().includes(q) ||
        r.word.id.toLowerCase().includes(q)
      )) return false;
      return true;
    });
  }, [report, sevFilter, codeFilter, query]);

  const exportJson = () => {
    const payload = visible.map(r => ({
      id: r.word.id, sv: r.word.sv, pos: r.word.pos, vi: r.word.vi, en: r.word.en,
      level: r.word.level, category: r.word.category,
      example: r.word.example, exampleVi: r.word.exampleVi, exampleEn: r.word.exampleEn,
      issues: r.issues.map(i => ({ code: i.code, severity: i.severity, message: i.message })),
    }));
    download(`swedish-vocab-qa-${new Date().toISOString().slice(0, 10)}.json`,
      "application/json", JSON.stringify(payload, null, 2));
  };

  const exportCsv = () => {
    const header = ["id","sv","pos","level","category","vi","en","example","exampleVi","exampleEn","severity","issueCodes","issueMessages"];
    const rows = visible.map(r => [
      r.word.id, r.word.sv, r.word.pos, r.word.level, r.word.category,
      r.word.vi, r.word.en, r.word.example, r.word.exampleVi, r.word.exampleEn,
      r.topSeverity,
      r.issues.map(i => i.code).join("|"),
      r.issues.map(i => i.message).join(" | "),
    ].map(c => csvEscape(String(c ?? ""))).join(","));
    download(`swedish-vocab-qa-${new Date().toISOString().slice(0, 10)}.csv`,
      "text/csv", [header.join(","), ...rows].join("\n"));
  };

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryCard label={t("Sạch", "Clean")} value={counts.clean}
          icon={<ShieldCheck className="w-4 h-4" />} tone="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" />
        <SummaryCard label={t("Lỗi", "Errors")} value={counts.error}
          icon={<AlertCircle className="w-4 h-4" />} tone="bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800" />
        <SummaryCard label={t("Cảnh báo", "Warnings")} value={counts.warning}
          icon={<AlertTriangle className="w-4 h-4" />} tone="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800" />
        <SummaryCard label={t("Gợi ý", "Info")} value={counts.info}
          icon={<Info className="w-4 h-4" />} tone="bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800" />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t("Tìm theo từ, id, nghĩa…", "Search word, id, gloss…")}
          className="h-9 max-w-xs"
        />
        <select
          value={sevFilter}
          onChange={e => setSevFilter(e.target.value as any)}
          className="h-9 rounded-md border border-input bg-background px-2 text-sm"
        >
          <option value="all">{t("Mọi mức", "All severities")}</option>
          <option value="error">{t("Lỗi", "Errors")}</option>
          <option value="warning">{t("Cảnh báo", "Warnings")}</option>
          <option value="info">{t("Gợi ý", "Info")}</option>
        </select>
        <select
          value={codeFilter}
          onChange={e => setCodeFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-2 text-sm max-w-[14rem]"
        >
          <option value="all">{t("Mọi loại lỗi", "All rule codes")}</option>
          {codeBreakdown.map(([code, n]) => (
            <option key={code} value={code}>{code} ({n})</option>
          ))}
        </select>
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={exportCsv} disabled={visible.length === 0}>
            <FileSpreadsheet className="w-4 h-4 mr-1" /> CSV
          </Button>
          <Button size="sm" variant="outline" onClick={exportJson} disabled={visible.length === 0}>
            <FileJson className="w-4 h-4 mr-1" /> JSON
          </Button>
        </div>
      </div>

      {/* Rule breakdown chips */}
      {codeBreakdown.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {codeBreakdown.map(([code, n]) => (
            <button
              key={code}
              onClick={() => setCodeFilter(codeFilter === code ? "all" : code)}
              className={`text-[11px] px-2 py-1 rounded-full border transition-colors ${
                codeFilter === code
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {code} · {n}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-3 py-2 border-b border-border text-xs text-muted-foreground flex items-center justify-between">
          <span>{t("Hiển thị", "Showing")} <b>{visible.length}</b> / {report.length} {t("mục có vấn đề", "flagged entries")}</span>
          <span>{t("Tổng từ vựng", "Total words")}: {SWEDISH_WORDS.length}</span>
        </div>
        {visible.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {t("Không có mục nào khớp bộ lọc. 🎉", "No entries match the filter. 🎉")}
          </p>
        ) : (
          <ul className="divide-y divide-border max-h-[640px] overflow-y-auto">
            {visible.slice(0, 500).map(({ word, issues, topSeverity }) => (
              <li key={word.id} className="p-3 hover:bg-muted/30">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] border ${sevStyles[topSeverity]}`}>
                    <SevIcon s={topSeverity} /> {topSeverity.toUpperCase()}
                  </span>
                  <span className="font-bold text-primary">
                    {word.article && <span className="italic text-muted-foreground mr-1">{word.article}</span>}
                    {word.sv}
                  </span>
                  <span className="text-xs text-muted-foreground">{word.pos}</span>
                  <Badge variant="outline" className="text-[10px]">{word.level}</Badge>
                  <Badge variant="outline" className="text-[10px]">{word.category}</Badge>
                  <span className="text-[10px] text-muted-foreground ml-auto">#{word.id}</span>
                </div>
                <div className="mt-1 text-sm">
                  <span className="text-foreground/90">VI: <b>{word.vi || "—"}</b></span>
                  <span className="mx-3 text-muted-foreground">·</span>
                  <span className="text-foreground/90">EN: <b>{word.en || "—"}</b></span>
                </div>
                <div className="mt-1 text-xs italic text-foreground/80">"{word.example}"</div>
                <div className="text-[11px] text-muted-foreground">{lang === "vi" ? word.exampleVi : word.exampleEn}</div>
                <ul className="mt-2 space-y-1">
                  {issues.map((i, idx) => (
                    <li key={idx} className={`text-[11px] inline-flex items-start gap-1 mr-2 px-1.5 py-0.5 rounded border ${sevStyles[i.severity]}`}>
                      <SevIcon s={i.severity} />
                      <span><b>{i.code}</b> — {lang === "vi" ? i.messageVi : i.message}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        {visible.length > 500 && (
          <div className="px-3 py-2 border-t border-border text-xs text-muted-foreground text-center">
            {t("Đang hiển thị 500 mục đầu tiên. Hãy xuất CSV/JSON để xem đầy đủ.",
               "Showing first 500 entries. Export CSV/JSON to see all.")}
          </div>
        )}
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, icon, tone }: {
  label: string; value: number; icon: React.ReactNode; tone: string;
}) => (
  <div className={`rounded-xl border p-3 flex items-center gap-3 ${tone}`}>
    <div className="shrink-0">{icon}</div>
    <div>
      <div className="text-xs font-medium opacity-80">{label}</div>
      <div className="text-2xl font-bold leading-none">{value.toLocaleString()}</div>
    </div>
  </div>
);

export default SwedishVocabQA;
