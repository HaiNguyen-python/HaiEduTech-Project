/**
 * @file ArticleEditor.tsx
 * @description Bilingual article/blog editor for the Content Studio.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ArticleBody, ContentDraft } from "@/lib/contentStudio";
import RichTextEditor from "./RichTextEditor";
import MediaUploader from "./MediaUploader";

interface Props {
  draft: ContentDraft;
  onChange: (patch: Partial<ContentDraft>) => void;
}

export default function ArticleEditor({ draft, onChange }: Props) {
  const { t } = useLanguage();
  const body = (draft.body || {}) as ArticleBody;
  const setBody = (patch: Partial<ArticleBody>) =>
    onChange({ body: { ...body, ...patch } });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t("Ảnh bìa", "Cover image")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {draft.cover_url ? (
            <img
              src={draft.cover_url}
              alt={draft.title || t("Ảnh bìa", "Cover image")}
              className="max-h-48 w-full rounded-md object-cover"
              loading="lazy"
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              {t("Chưa có ảnh bìa.", "No cover image yet.")}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <MediaUploader
              label={t("Tải ảnh bìa", "Upload cover")}
              onUploaded={(f) => onChange({ cover_url: f.url })}
            />
            {draft.cover_url && (
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange({ cover_url: null })}>
                {t("Xoá ảnh bìa", "Remove cover")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="art-sum-vi">{t("Tóm tắt (Tiếng Việt)", "Summary (Vietnamese)")}</Label>
          <Textarea
            id="art-sum-vi"
            rows={3}
            value={draft.summary ?? ""}
            onChange={(e) => onChange({ summary: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="art-sum-en">{t("Tóm tắt (English)", "Summary (English)")}</Label>
          <Textarea
            id="art-sum-en"
            rows={3}
            value={draft.summary_en ?? ""}
            onChange={(e) => onChange({ summary_en: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t("Nội dung (Tiếng Việt)", "Content (Vietnamese)")}</Label>
        <RichTextEditor value={body.html || ""} onChange={(html) => setBody({ html })} />
      </div>

      <div className="space-y-2">
        <Label>{t("Nội dung (English) - không bắt buộc", "Content (English) - optional")}</Label>
        <RichTextEditor value={body.html_en || ""} onChange={(html_en) => setBody({ html_en })} />
      </div>
    </div>
  );
}
