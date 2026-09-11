/**
 * @file InsightPost.tsx
 * @description Public detail page for a published Content Studio item.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { ArrowLeft, FileDown, Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ContentPreview from "@/components/admin/content/ContentPreview";
import { getContentFileUrl, type ContentItem, type ResourceBody } from "@/lib/contentStudio";

export default function InsightPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLanguage();
  const [item, setItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      setSignedIn(Boolean(auth?.user?.id));
      const { data } = await (supabase as any)
        .from("content_items")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      setItem((data ?? null) as ContentItem | null);
      setLoading(false);
    })();
  }, [slug]);

  const download = async () => {
    if (!item) return;
    const body = item.body as ResourceBody;
    try {
      const url = await getContentFileUrl(body.bucket, body.path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      toast.error(t("Không tải được tệp. Vui lòng đăng nhập.", "Cannot download the file. Please sign in."));
    }
  };

  const title = item ? (lang === "en" && item.title_en) || item.title : "";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title ? `${title} | HaiEduTech` : "HaiEduTech"}</title>
        <meta
          name="description"
          content={
            (item && ((lang === "en" && item.summary_en) || item.summary)) ||
            t("Nội dung học tập từ HaiEduTech.", "Study content from HaiEduTech.")
          }
        />
        {slug && <link rel="canonical" href={`https://haiedutech.com/insights/${slug}`} />}
      </Helmet>
      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link to="/insights">
            <ArrowLeft className="mr-1 h-4 w-4" />
            {t("Tất cả nội dung", "All content")}
          </Link>
        </Button>

        {loading ? (
          <div className="flex items-center gap-2 p-6 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("Đang tải...", "Loading...")}
          </div>
        ) : !item ? (
          <div className="space-y-3 rounded-md border border-dashed border-border p-10 text-center">
            <Lock className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="text-muted-foreground">
              {signedIn
                ? t("Không tìm thấy nội dung này.", "This content was not found.")
                : t(
                    "Nội dung này chỉ dành cho học sinh đã đăng nhập, hoặc không tồn tại.",
                    "This content is for signed-in students only, or it does not exist.",
                  )}
            </p>
            {!signedIn && (
              <Button asChild size="sm">
                <Link to="/auth">{t("Đăng nhập", "Sign in")}</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <ContentPreview draft={item} />
            {item.kind === "resource" && (item.body as ResourceBody)?.path && (
              <Button onClick={download}>
                <FileDown className="mr-2 h-4 w-4" />
                {t("Tải tài liệu", "Download resource")}
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
