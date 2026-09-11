/**
 * PublishedContentStrip
 * @description Shows published Content Studio items (lessons or resources)
 * inside existing library pages, linking to the public Insights reader.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface Row {
  id: string;
  slug: string;
  kind: string;
  title: string | null;
  title_en: string | null;
  summary: string | null;
  summary_en: string | null;
  subject: string | null;
  level: string | null;
  published_at: string | null;
}

export default function PublishedContentStrip({
  kind,
  titleVi,
  titleEn,
  limit = 6,
}: {
  kind: "lesson" | "resource" | "article";
  titleVi: string;
  titleEn: string;
  limit?: number;
}) {
  const { t } = useLanguage();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    let active = true;
    supabase
      .from("content_items")
      .select("id, slug, kind, title, title_en, summary, summary_en, subject, level, published_at")
      .eq("kind", kind)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit)
      .then(({ data }) => {
        if (active && data) setRows(data as Row[]);
      });
    return () => {
      active = false;
    };
  }, [kind, limit]);

  if (rows.length === 0) return null;

  const Icon = kind === "resource" ? FileText : GraduationCap;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-primary" />
        <h2 className="text-base font-semibold text-foreground">{t(titleVi, titleEn)}</h2>
        <Badge variant="outline" className="text-[10px]">
          {rows.length}
        </Badge>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((row) => {
          const title = t(row.title || row.title_en || "", row.title_en || row.title || "");
          const summary = t(row.summary || row.summary_en || "", row.summary_en || row.summary || "");
          return (
            <Link
              key={row.id}
              to={`/insights/${row.slug}`}
              className="block glass-card rounded-xl p-5 hover:border-primary/30 transition-all h-full group"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {row.level && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                    {row.level}
                  </span>
                )}
                {row.subject && <span className="text-[10px] text-muted-foreground">{row.subject}</span>}
              </div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-2 break-words">
                {title}
              </h3>
              {summary && <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{summary}</p>}
              <span className="text-xs text-primary font-medium flex items-center gap-1">
                {t("Xem", "Open")} <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
