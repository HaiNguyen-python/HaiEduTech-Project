/**
 * @file Insights.tsx
 * @description Public listing of published articles, lessons and resources
 * created in the admin Content Studio.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FileDown, FileText, GraduationCap, Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { KIND_LABEL, type ContentItem, type ContentKind } from "@/lib/contentStudio";

const KIND_ICON: Record<ContentKind, typeof FileText> = {
  article: FileText,
  lesson: GraduationCap,
  resource: FileDown,
};

export default function Insights() {
  const { t, lang } = useLanguage();
  const [rows, setRows] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<"all" | ContentKind>("all");

  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any)
        .from("content_items")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      setRows((data ?? []) as ContentItem[]);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (kind !== "all" && r.kind !== kind) return false;
      if (!needle) return true;
      return (
        r.title.toLowerCase().includes(needle) ||
        (r.title_en ?? "").toLowerCase().includes(needle) ||
        (r.tags ?? []).some((tag) => tag.toLowerCase().includes(needle))
      );
    });
  }, [rows, q, kind]);

  const kindName = (k: ContentKind) => (lang === "vi" ? KIND_LABEL[k].vi : KIND_LABEL[k].en);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t("Bài viết & Bài giảng | HaiEduTech", "Insights & Lessons | HaiEduTech")}</title>
        <meta
          name="description"
          content={t(
            "Bài viết, bài giảng và tài liệu học tập mới nhất từ HaiEduTech.",
            "Latest articles, lessons and study resources from HaiEduTech.",
          )}
        />
        <link rel="canonical" href="https://haiedutech.com/insights" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {t("Bài viết & Bài giảng", "Insights & Lessons")}
          </h1>
          <p className="text-[16px] text-muted-foreground">
            {t(
              "Nội dung mới nhất do thầy Hải và đội ngũ HaiEduTech biên soạn.",
              "The newest content written by Teacher Hai and the HaiEduTech team.",
            )}
          </p>
        </header>

        <div className="mb-6 grid gap-2 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder={t("Tìm nội dung...", "Search content...")} />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", "article", "lesson", "resource"] as const).map((k) => (
              <Button key={k} size="sm" variant={kind === k ? "default" : "outline"} onClick={() => setKind(k)}>
                {k === "all" ? t("Tất cả", "All") : kindName(k)}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 p-6 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("Đang tải...", "Loading...")}
          </div>
        ) : filtered.length === 0 ? (
          <p className="rounded-md border border-dashed border-border p-10 text-center text-muted-foreground">
            {t("Chưa có nội dung được đăng.", "No published content yet.")}
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((row) => {
              const Icon = KIND_ICON[row.kind];
              const title = (lang === "en" && row.title_en) || row.title;
              const summary = (lang === "en" && row.summary_en) || row.summary;
              return (
                <Link key={row.id} to={`/insights/${row.slug}`} className="group">
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    {row.cover_url && (
                      <img src={row.cover_url} alt={title} loading="lazy"
                        className="h-40 w-full rounded-t-lg object-cover" />
                    )}
                    <CardContent className="space-y-2 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <Badge variant="secondary">{kindName(row.kind)}</Badge>
                        {row.subject && <Badge variant="outline">{row.subject}</Badge>}
                        {row.visibility === "students" && (
                          <Badge variant="outline">{t("Học sinh", "Students")}</Badge>
                        )}
                      </div>
                      <h2 className="text-[17px] font-semibold leading-snug text-foreground group-hover:text-primary">
                        {title}
                      </h2>
                      {summary && (
                        <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
