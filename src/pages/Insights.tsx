/**
 * @file Insights.tsx
 * @description Teacher Notes: public listing of published articles, lessons and
 * resources created in the admin Content Studio. Supports ?subject= filtering
 * so each subject dropdown can link straight to its own notes.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

/** Subjects that belong to the same dropdown are shown together. */
const SUBJECT_ALIASES: Record<string, string[]> = {
  english: ["english", "ielts", "toeic"],
};

const matchesSubject = (rowSubject: string | null, filter: string) => {
  if (!filter) return true;
  const wanted = SUBJECT_ALIASES[filter.toLowerCase()] ?? [filter.toLowerCase()];
  return wanted.includes((rowSubject ?? "").toLowerCase());
};

export default function Insights() {
  const { t, lang } = useLanguage();
  const [params, setParams] = useSearchParams();
  const subject = params.get("subject") ?? "";
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

  const subjectsAvailable = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => {
      if (r.subject) set.add(r.subject);
    });
    return Array.from(set).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (kind !== "all" && r.kind !== kind) return false;
      if (!matchesSubject(r.subject, subject)) return false;
      if (!needle) return true;
      return (
        r.title.toLowerCase().includes(needle) ||
        (r.title_en ?? "").toLowerCase().includes(needle) ||
        (r.tags ?? []).some((tag) => tag.toLowerCase().includes(needle))
      );
    });
  }, [rows, q, kind, subject]);

  const kindName = (k: ContentKind) => (lang === "vi" ? KIND_LABEL[k].vi : KIND_LABEL[k].en);

  const setSubject = (next: string) => {
    const draft = new URLSearchParams(params);
    if (next) draft.set("subject", next);
    else draft.delete("subject");
    setParams(draft, { replace: true });
  };

  const heading = subject
    ? `${t("Ghi chú của thầy", "Teacher Notes")} · ${subject}`
    : t("Ghi chú của thầy", "Teacher Notes");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t("Teacher Notes | HaiEduTech", "Teacher Notes | HaiEduTech")}</title>
        <meta
          name="description"
          content={t(
            "Teacher Notes: bài viết, bài giảng và tài liệu học tập mới nhất từ thầy Hải và HaiEduTech.",
            "Teacher Notes: latest articles, lessons and study resources from Teacher Hai and HaiEduTech.",
          )}
        />
        <link rel="canonical" href="https://haiedutech.com/insights" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold sm:text-3xl">{heading}</h1>
          <p className="text-[16px] text-muted-foreground">
            {t(
              "Nội dung mới nhất do thầy Hải và đội ngũ HaiEduTech biên soạn.",
              "The newest content written by Teacher Hai and the HaiEduTech team.",
            )}
          </p>
        </header>

        <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
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

        {(subjectsAvailable.length > 0 || subject) && (
          <div className="mb-6 flex flex-wrap gap-2">
            <Button size="sm" variant={subject ? "outline" : "default"} onClick={() => setSubject("")}>
              {t("Mọi môn học", "All subjects")}
            </Button>
            {subjectsAvailable.map((s) => (
              <Button key={s} size="sm" variant={subject.toLowerCase() === s.toLowerCase() ? "default" : "outline"}
                onClick={() => setSubject(s)}>
                {s}
              </Button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 p-6 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("Đang tải...", "Loading...")}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-10 text-center">
            <p className="text-muted-foreground">
              {subject
                ? t(`Chưa có Teacher Notes cho ${subject}.`, `No Teacher Notes for ${subject} yet.`)
                : t("Chưa có nội dung được đăng.", "No published content yet.")}
            </p>
            {subject && (
              <Button className="mt-4" size="sm" variant="outline" onClick={() => setSubject("")}>
                {t("Xem tất cả Teacher Notes", "View all Teacher Notes")}
              </Button>
            )}
          </div>
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
