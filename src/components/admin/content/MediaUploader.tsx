/**
 * @file MediaUploader.tsx
 * @description Upload helper for Content Studio images and files.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { MEDIA_BUCKET, uploadContentFile, type UploadedFile } from "@/lib/contentStudio";

interface Props {
  bucket?: string;
  accept?: string;
  label?: string;
  onUploaded: (file: UploadedFile) => void;
}

export default function MediaUploader({
  bucket = MEDIA_BUCKET,
  accept = "image/*",
  label,
  onUploaded,
}: Props) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handle = async (file?: File | null) => {
    if (!file) return;
    setBusy(true);
    try {
      const uploaded = await uploadContentFile(file, bucket);
      onUploaded(uploaded);
      toast.success(t("Đã tải tệp lên", "File uploaded"));
    } catch (e: any) {
      toast.error(e?.message || t("Tải tệp thất bại", "Upload failed"));
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handle(e.target.files?.[0])}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        <span className="ml-2">{label || t("Tải tệp lên", "Upload")}</span>
      </Button>
    </>
  );
}
