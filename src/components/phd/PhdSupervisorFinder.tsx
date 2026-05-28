/**
 * @file PhdSupervisorFinder.tsx
 * @description Supervisor Finder Studio - deep-link academic search + 8-step
 *   evaluation checklist (persisted in localStorage) + copy-able Markdown shortlist.
 */
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Copy, Check, Telescope } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const CHECK_KEY = "phd-supervisor-checklist";

const COUNTRY_SITES: Record<string, { label: string; site: string }[]> = {
  any: [],
  usa: [
    { label: "MIT EECS", site: "eecs.mit.edu" },
    { label: "Stanford CS", site: "cs.stanford.edu" },
    { label: "CMU SCS", site: "scs.cmu.edu" },
  ],
  uk: [
    { label: "Oxford", site: "ox.ac.uk" },
    { label: "Cambridge", site: "cam.ac.uk" },
    { label: "Imperial", site: "imperial.ac.uk" },
  ],
  germany: [
    { label: "TUM", site: "tum.de" },
    { label: "ETH Zurich", site: "ethz.ch" },
    { label: "Max Planck", site: "mpg.de" },
  ],
  finland: [
    { label: "Aalto", site: "aalto.fi" },
    { label: "Helsinki", site: "helsinki.fi" },
  ],
  singapore: [
    { label: "NUS", site: "nus.edu.sg" },
    { label: "NTU", site: "ntu.edu.sg" },
  ],
  japan: [
    { label: "Tokyo", site: "u-tokyo.ac.jp" },
    { label: "Kyoto", site: "kyoto-u.ac.jp" },
  ],
  korea: [
    { label: "KAIST", site: "kaist.ac.kr" },
    { label: "SNU", site: "snu.ac.kr" },
  ],
  australia: [
    { label: "Melbourne", site: "unimelb.edu.au" },
    { label: "ANU", site: "anu.edu.au" },
  ],
};

const COUNTRY_OPTIONS: { id: string; vi: string; en: string }[] = [
  { id: "any", vi: "Mọi quốc gia", en: "Any country" },
  { id: "usa", vi: "Hoa Kỳ", en: "USA" },
  { id: "uk", vi: "Anh Quốc", en: "UK" },
  { id: "germany", vi: "Đức / EU", en: "Germany / EU" },
  { id: "finland", vi: "Phần Lan", en: "Finland" },
  { id: "singapore", vi: "Singapore", en: "Singapore" },
  { id: "japan", vi: "Nhật Bản", en: "Japan" },
  { id: "korea", vi: "Hàn Quốc", en: "South Korea" },
  { id: "australia", vi: "Úc", en: "Australia" },
];

const EVAL_CHECKS = [
  { id: "h-index", vi: "h-index ≥ 15 hoặc tăng đều 3 năm gần đây", en: "h-index ≥ 15 or steadily growing in the last 3 years" },
  { id: "funding", vi: "Có grant đang chạy (NSF/ERC/JSPS…) đủ phủ 4 năm PhD", en: "Has an active grant (NSF/ERC/JSPS…) covering the full 4-year PhD" },
  { id: "alumni", vi: "PhD alumni gần đây có vị trí tốt (industry R&D / postdoc top)", en: "Recent PhD alumni placed well (industry R&D / top postdoc)" },
  { id: "recent-paper", vi: "Có ≥ 1 paper hạng A trong 12 tháng qua", en: "Has ≥ 1 A-tier paper in the past 12 months" },
  { id: "lab-size", vi: "Lab size hợp lý (4–10 PhD): không quá đông, không quá ít", en: "Healthy lab size (4–10 PhDs): not too crowded, not too sparse" },
  { id: "english", vi: "Working language là English (kiểm tra qua website lab/group meeting)", en: "Working language is English (check lab website/group meeting notes)" },
  { id: "complaint", vi: "Search '<name> + reddit/quora/csstipendrankings' không thấy red flag lớn", en: "Search '<name> + reddit/quora/csstipendrankings' shows no major red flags" },
  { id: "contact", vi: "Có kênh liên hệ rõ ràng (email cá nhân + faculty page cập nhật)", en: "Clear contact channel (personal email + up-to-date faculty page)" },
];

const PhdSupervisorFinder = () => {
  const { t, lang } = useLanguage();
  const vi = lang === "vi";
  const [keywords, setKeywords] = useState("");
  const [country, setCountry] = useState("any");
  const [level, setLevel] = useState<"phd" | "postdoc" | "msc">("phd");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHECK_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(CHECK_KEY, JSON.stringify(next));
      return next;
    });
  };

  const links = useMemo(() => {
    const k = encodeURIComponent(keywords.trim() || "PhD position");
    const cSites = COUNTRY_SITES[country] || [];
    const siteFilter = cSites.length
      ? " " + cSites.map((s) => `site:${s.site}`).join(" OR ")
      : "";
    return [
      { name: "Google Scholar", url: `https://scholar.google.com/scholar?q=${k}` },
      { name: "Semantic Scholar", url: `https://www.semanticscholar.org/search?q=${k}` },
      { name: "dblp", url: `https://dblp.org/search?q=${k}` },
      { name: "OpenReview", url: `https://openreview.net/search?query=${k}` },
      { name: "ORCID", url: `https://orcid.org/orcid-search/search?searchQuery=${k}` },
      { name: "ResearchGate", url: `https://www.researchgate.net/search/researcher?q=${k}` },
      { name: "Academic Positions", url: `https://academicpositions.com/find-jobs/search?utf8=%E2%9C%93&query=${k}&category=${level}` },
      { name: "EURAXESS Jobs", url: `https://euraxess.ec.europa.eu/jobs/search?keywords=${k}` },
      { name: "FindAPhD", url: `https://www.findaphd.com/phds/?Keywords=${k}` },
      ...(siteFilter
        ? [{ name: t("Google site:", "Google site:") + " " + (cSites[0]?.label || ""), url: `https://www.google.com/search?q=${k}+supervisor${encodeURIComponent(siteFilter)}` }]
        : []),
    ];
  }, [keywords, country, level, t]);

  const completedCount = Object.values(checked).filter(Boolean).length;

  const copyShortlistTemplate = () => {
    const headers = vi
      ? "| # | Tên giáo sư | Trường | Chủ đề | Email | Paper gần nhất | Ghi chú |"
      : "| # | Professor | University | Topic | Email | Latest paper | Notes |";
    const sep = "|---|---|---|---|---|---|---|";
    const rows = Array.from({ length: 10 }).map((_, i) => `| ${i + 1} |  |  |  |  |  |  |`).join("\n");
    const md = [headers, sep, rows].join("\n");
    navigator.clipboard.writeText(md);
    toast({ title: t("Đã copy template shortlist", "Shortlist template copied"), description: t("Dán vào Notion / Excel để bắt đầu", "Paste into Notion / Excel to start") });
  };

  return (
    <Card className="mt-12 border-sky-300 dark:border-sky-800 shadow-xl">
      <CardContent className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
            <Telescope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold">{t("Supervisor Finder Studio", "Supervisor Finder Studio")}</h3>
            <p className="text-xs text-muted-foreground">
              {t("Deep-link tìm giáo sư + checklist đánh giá 8 bước", "Deep-link academic search + 8-step supervisor evaluation")}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <div className="sm:col-span-1">
            <Label className="text-xs">{t("Từ khoá nghiên cứu", "Research keywords")}</Label>
            <Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="graph neural networks" />
          </div>
          <div>
            <Label className="text-xs">{t("Quốc gia mục tiêu", "Target country")}</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {COUNTRY_OPTIONS.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{vi ? c.vi : c.en}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">{t("Cấp độ", "Level")}</Label>
            <Select value={level} onValueChange={(v) => setLevel(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="msc">MSc</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="postdoc">Postdoc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/30 hover:bg-sky-500/20 transition-colors">
              <Search className="w-3.5 h-3.5" /> {l.name} <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="p-4 rounded-lg bg-muted/40 border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm">
                ✅ {t("Checklist đánh giá supervisor", "Supervisor evaluation checklist")}
              </h4>
              <Badge variant="secondary">{completedCount}/{EVAL_CHECKS.length}</Badge>
            </div>
            <ul className="space-y-2">
              {EVAL_CHECKS.map((c) => {
                const active = !!checked[c.id];
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => toggle(c.id)}
                      className={`w-full text-left flex gap-2 items-start p-2 rounded-md border-2 transition-colors ${active ? "bg-emerald-500/10 border-emerald-500" : "bg-background border-border hover:border-sky-400"}`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${active ? "bg-emerald-500 text-white" : "border-2 border-muted-foreground/30"}`}>
                        {active && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs leading-relaxed">{t(c.vi, c.en)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/30 dark:to-indigo-950/30 border border-sky-200/60 dark:border-sky-800/40">
            <h4 className="font-bold text-sm mb-2">
              📋 {t("Shortlist template", "Shortlist template")}
            </h4>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {t(
                "Tạo bảng theo dõi 10 supervisor đầu tiên. Copy template Markdown dưới đây và dán vào Notion / Excel / Google Sheets.",
                "Build a tracker for your first 10 candidates. Copy the Markdown template and paste into Notion / Excel / Google Sheets.",
              )}
            </p>
            <Button size="sm" variant="outline" className="gap-2" onClick={copyShortlistTemplate}>
              <Copy className="w-4 h-4" /> {t("Copy template", "Copy template")}
            </Button>
            <div className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
              <div className="font-semibold mb-1">{t("Mục tiêu khuyến nghị", "Recommended goal")}</div>
              <ul className="space-y-0.5 list-disc pl-4">
                <li>{t("25–40 supervisor để loại dần", "25–40 candidates to filter down")}</li>
                <li>{t("10 email gửi đi → 2–4 phản hồi tích cực", "10 cold emails sent → 2–4 positive replies")}</li>
                <li>{t("6–10 program submitted", "6–10 programs submitted")}</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhdSupervisorFinder;
