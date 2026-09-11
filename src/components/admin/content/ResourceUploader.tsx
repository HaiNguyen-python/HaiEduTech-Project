/**
 * @file ResourceUploader.tsx
 * @description Downloadable resource editor for the Content Studio.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { FileDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { FILES_BUCKET, type ContentDraft, type ResourceBody } from "@/lib/contentStudio";
import MediaUploader from "./MediaUploader";

interface Props {
  draft: ContentDraft;
  onChange: (patch: Partial<ContentDraft>) => void;
}

const prettySize = (bytes?: number) => {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

export default function ResourceUploader({ draft, onChange }: Props) {
  const { t } = useLanguage();
  const body = (draft.body || { bucket: FILES_BUCKET, path: "", file_name: "" }) as ResourceBody;
  const setBody = (patch: Partial<ResourceBody>) => onChange({ body: { ...body, ...patch } });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t("Tệp tài liệu", "Resource file")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {body.path ? (
            <div className="flex flex-wrap items-center gap-2 rounded-md border border-border p-3">
              <FileDown className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{body.file_name}</span>
              <span className="text-xs text-muted-foreground">{prettySize(body.size_bytes)}</span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {t("Chưa tải tệp lên (PDF, DOCX, PPTX, ZIP...).", "No file uploaded yet (PDF, DOCX, PPTX, ZIP...).")}
            </p>
          )}
          <MediaUploader
            bucket={FILES_BUCKET}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.txt,.csv,.mp3"
            label={body.path ? t("Thay tệp khác", "Replace file") : t("Tải tệp lên", "Upload file")}
            onUploaded={(f) =>
              setBody({
                bucket: f.bucket,
                path: f.path,
                file_name: f.file_name,
                size_bytes: f.size_bytes,
                mime_type: f.mime_type,
              })
            }
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="res-desc-vi">{t("Mô tả (Tiếng Việt)", "Description (Vietnamese)")}</Label>
          <Textarea id="res-desc-vi" rows={4} value={body.description ?? ""}
            onChange={(e) => setBody({ description: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="res-desc-en">{t("Mô tả (English)", "Description (English)")}</Label>
          <Textarea id="res-desc-en" rows={4} value={body.description_en ?? ""}
            onChange={(e) => setBody({ description_en: e.target.value })} />
        </div>
      </div>
    </div>
  );
}
