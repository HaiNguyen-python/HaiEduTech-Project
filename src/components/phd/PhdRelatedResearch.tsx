/**
 * @file PhdRelatedResearch.tsx
 * @description Related Research Explorer - deep-link search across 10+ academic
 *   databases + curated topic shortcuts + reading list tracker (localStorage).
 *   Helps PhD candidates discover and follow papers in their research area.
 */
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Search, ExternalLink, Plus, Trash2, Library, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const READING_LIST_KEY = "phd-related-research-reading-list";

interface ReadingItem {
  id: string;
  title: string;
  source: string;
  url?: string;
  note?: string;
  addedAt: number;
}

const TOPIC_PRESETS: { id: string; emoji: string; vi: string; en: string; query: string }[] = [
  { id: "ai-edu", emoji: "🤖", vi: "AI trong Giáo dục", en: "AI in Education", query: "large language models intelligent tutoring system adaptive learning" },
  { id: "nlp", emoji: "💬", vi: "Xử lý ngôn ngữ tự nhiên", en: "Natural Language Processing", query: "transformer attention low-resource language vietnamese" },
  { id: "cv", emoji: "👁️", vi: "Thị giác máy tính", en: "Computer Vision", query: "vision transformer self-supervised representation learning" },
  { id: "rl", emoji: "🎮", vi: "Học tăng cường", en: "Reinforcement Learning", query: "deep reinforcement learning policy gradient RLHF" },
  { id: "graph", emoji: "🕸️", vi: "Graph Neural Networks", en: "Graph Neural Networks", query: "graph neural network message passing knowledge graph" },
  { id: "health", emoji: "🩺", vi: "AI Y tế", en: "Healthcare AI", query: "medical imaging deep learning clinical decision support" },
  { id: "fintech", emoji: "💹", vi: "AI Tài chính", en: "Finance & FinTech", query: "deep learning time series forecasting algorithmic trading" },
  { id: "climate", emoji: "🌱", vi: "Khí hậu & Bền vững", en: "Climate & Sustainability", query: "machine learning climate change sustainability remote sensing" },
  { id: "robotics", emoji: "🦾", vi: "Robotics", en: "Robotics", query: "robot learning manipulation sim2real imitation learning" },
  { id: "hci", emoji: "🖱️", vi: "HCI & UX", en: "HCI & UX Research", query: "human computer interaction user experience qualitative study" },
  { id: "security", emoji: "🛡️", vi: "An ninh mạng", en: "Cybersecurity", query: "adversarial machine learning network intrusion detection privacy" },
  { id: "data-eng", emoji: "🗄️", vi: "Data Engineering", en: "Data Engineering", query: "stream processing data lakehouse vector database scalability" },
];

const buildLinks = (keywords: string, lang: "vi" | "en") => {
  const k = encodeURIComponent(keywords.trim() || "machine learning");
  return [
    { name: "Google Scholar", desc: lang === "vi" ? "Tìm paper + citation count" : "Search papers + citation count", url: `https://scholar.google.com/scholar?q=${k}` },
    { name: "Semantic Scholar", desc: lang === "vi" ? "AI tóm tắt + paper liên quan" : "AI summary + related papers", url: `https://www.semanticscholar.org/search?q=${k}` },
    { name: "arXiv", desc: lang === "vi" ? "Preprint mới nhất (CS, Math, Physics)" : "Latest preprints (CS, Math, Physics)", url: `https://arxiv.org/search/?searchtype=all&query=${k}` },
    { name: "Connected Papers", desc: lang === "vi" ? "Bản đồ trực quan paper liên quan" : "Visual map of related papers", url: `https://www.connectedpapers.com/search?q=${k}` },
    { name: "Papers with Code", desc: lang === "vi" ? "Paper + source code + benchmark" : "Papers + source code + benchmarks", url: `https://paperswithcode.com/search?q_meta=&q_type=&q=${k}` },
    { name: "OpenReview", desc: lang === "vi" ? "Peer review công khai (ICLR, NeurIPS)" : "Open peer review (ICLR, NeurIPS)", url: `https://openreview.net/search?query=${k}` },
    { name: "ACM Digital Library", desc: lang === "vi" ? "Computing & HCI" : "Computing & HCI", url: `https://dl.acm.org/action/doSearch?AllField=${k}` },
    { name: "IEEE Xplore", desc: lang === "vi" ? "Engineering & EECS" : "Engineering & EECS", url: `https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=${k}` },
    { name: "SpringerLink", desc: lang === "vi" ? "Journal & sách khoa học" : "Journals & scientific books", url: `https://link.springer.com/search?query=${k}` },
    { name: "ScienceDirect", desc: lang === "vi" ? "Elsevier journals đa ngành" : "Elsevier multi-discipline journals", url: `https://www.sciencedirect.com/search?qs=${k}` },
    { name: "PubMed", desc: lang === "vi" ? "Y khoa & sinh học" : "Medicine & biology", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${k}` },
    { name: "SSRN", desc: lang === "vi" ? "Social science & business" : "Social science & business", url: `https://www.ssrn.com/index.cfm/en/janda/?txtKey_Words=${k}` },
    { name: "CORE", desc: lang === "vi" ? "200M+ open-access paper" : "200M+ open-access papers", url: `https://core.ac.uk/search?q=${k}` },
    { name: "ResearchGate", desc: lang === "vi" ? "Mạng xã hội nhà nghiên cứu" : "Researcher social network", url: `https://www.researchgate.net/search/publication?q=${k}` },
  ];
};

const PhdRelatedResearch = () => {
  const { t, lang } = useLanguage();
  const vi = lang === "vi";
  const [keywords, setKeywords] = useState("");
  const [readingList, setReadingList] = useState<ReadingItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newSource, setNewSource] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(READING_LIST_KEY);
      if (raw) setReadingList(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const persist = (list: ReadingItem[]) => {
    setReadingList(list);
    localStorage.setItem(READING_LIST_KEY, JSON.stringify(list));
  };

  const addItem = () => {
    if (!newTitle.trim()) {
      toast({ title: t("Cần nhập tiêu đề paper", "Paper title is required"), variant: "destructive" });
      return;
    }
    const item: ReadingItem = {
      id: Date.now().toString(36),
      title: newTitle.trim(),
      source: newSource.trim() || "-",
      url: newUrl.trim() || undefined,
      note: newNote.trim() || undefined,
      addedAt: Date.now(),
    };
    persist([item, ...readingList]);
    setNewTitle(""); setNewSource(""); setNewUrl(""); setNewNote("");
    toast({ title: t("Đã thêm vào reading list", "Added to reading list") });
  };

  const removeItem = (id: string) => persist(readingList.filter((x) => x.id !== id));

  const links = useMemo(() => buildLinks(keywords, lang as "vi" | "en"), [keywords, lang]);

  return (
    <Card className="mt-12 border-violet-300 dark:border-violet-800 shadow-xl">
      <CardContent className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
            <Library className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold">{t("Khám phá bài nghiên cứu liên quan", "Related Research Explorer")}</h3>
            <p className="text-xs text-muted-foreground">
              {t(
                "Tìm paper cùng chủ đề trên 14 cơ sở dữ liệu học thuật + reading list cá nhân",
                "Discover papers across 14 academic databases + personal reading list",
              )}
            </p>
          </div>
        </div>

        {/* Keyword input */}
        <div className="mb-4">
          <Label className="text-xs">{t("Từ khoá nghiên cứu của bạn", "Your research keywords")}</Label>
          <Input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder={t("VD: graph neural network knowledge tracing", "e.g., graph neural network knowledge tracing")}
          />
        </div>

        {/* Topic presets */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> {t("Chủ đề gợi ý (click để điền nhanh)", "Suggested topics (click to autofill)")}
          </div>
          <div className="flex flex-wrap gap-2">
            {TOPIC_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setKeywords(p.query)}
                className="text-xs px-3 py-1.5 rounded-full bg-violet-500/10 hover:bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/30 transition-colors"
              >
                {p.emoji} {vi ? p.vi : p.en}
              </button>
            ))}
          </div>
        </div>

        {/* Database links */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            🔗 {t("Mở tìm kiếm trên các cơ sở dữ liệu", "Open search on databases")}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2 p-2.5 rounded-lg border border-border hover:border-violet-400 hover:bg-violet-500/5 transition-colors"
              >
                <Search className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold flex items-center gap-1">
                    {l.name} <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug">{l.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Reading list */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 border border-violet-200/60 dark:border-violet-800/40">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> {t("Reading list cá nhân", "Personal reading list")}
            </h4>
            <Badge variant="secondary">{readingList.length} {t("paper", "papers")}</Badge>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 mb-3">
            <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder={t("Tiêu đề paper *", "Paper title *")} className="text-sm" />
            <Input value={newSource} onChange={(e) => setNewSource(e.target.value)} placeholder={t("Tác giả / Tạp chí", "Author / Journal")} className="text-sm" />
            <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://arxiv.org/abs/..." className="text-sm sm:col-span-2" />
            <Textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder={t("Ghi chú ngắn (tại sao quan trọng, idea chính...)", "Short note (why it matters, key idea...)")} className="text-sm sm:col-span-2 min-h-[60px]" />
          </div>
          <Button size="sm" onClick={addItem} className="gap-2 mb-4">
            <Plus className="w-4 h-4" /> {t("Thêm vào reading list", "Add to reading list")}
          </Button>

          {readingList.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">
              {t("Chưa có paper nào. Hãy bắt đầu với 5-10 paper nền tảng cho hướng nghiên cứu của bạn.", "No papers yet. Start with 5-10 foundational papers for your research direction.")}
            </p>
          ) : (
            <ul className="space-y-2">
              {readingList.map((item) => (
                <li key={item.id} className="p-3 rounded-md bg-background border border-border">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm leading-tight">{item.title}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{item.source}</div>
                      {item.note && <div className="text-xs mt-1.5 text-muted-foreground italic">"{item.note}"</div>}
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1.5">
                          {t("Mở paper", "Open paper")} <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)} className="h-7 w-7 flex-shrink-0">
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs leading-relaxed">
          <strong>💡 {t("Mẹo của Thầy Hải", "Teacher Hai's tip")}:</strong>{" "}
          {t(
            "Đọc theo phương pháp 3-pass: (1) skim abstract + figures trong 5 phút, (2) đọc kỹ method + results nếu liên quan, (3) reproduce code nếu cần thiết. Mỗi tuần thêm 3-5 paper mới và xoá paper không còn liên quan.",
            "Use the 3-pass reading method: (1) skim abstract + figures in 5 min, (2) read method + results carefully if relevant, (3) reproduce code if essential. Add 3-5 new papers weekly and remove ones no longer relevant.",
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhdRelatedResearch;
