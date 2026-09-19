/**
 * Shared printable certificate artwork used by the learner certificate pages
 * and the admin certificate centre, so every issued certificate looks the same.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { forwardRef } from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface CertificateCanvasProps {
  learnerName: string;
  courseName: string;
  /** Main achievement sentence, already localized. */
  body: string;
  issuedDate: string;
  code: string;
  /** Extra line shown under the body, e.g. score or teacher note. */
  detail?: string;
  preview?: boolean;
}

const CertificateCanvas = forwardRef<HTMLDivElement, CertificateCanvasProps>(
  ({ learnerName, courseName, body, issuedDate, code, detail, preview }, ref) => {
    const { t } = useLanguage();
    return (
      <div
        ref={ref}
        className="relative rounded-xl border-8 border-double p-8 shadow-lg sm:p-10"
        style={{ backgroundColor: "#ffffff", borderColor: "#f59e0b" }}
      >
        {preview && (
          <div
            className="absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ backgroundColor: "#fef3c7", color: "#92400e" }}
          >
            {t("Bản xem trước", "Preview")}
          </div>
        )}
        <div className="space-y-4 text-center" style={{ color: "#0f172a" }}>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-7 w-7" style={{ color: "#f59e0b" }} />
            <span className="text-sm font-bold tracking-[0.3em]" style={{ color: "#3b82f6" }}>HAIEDUTECH</span>
            <Sparkles className="h-7 w-7" style={{ color: "#f59e0b" }} />
          </div>
          <div className="text-3xl font-bold">{t("Chứng chỉ hoàn thành khóa học", "Certificate of Completion")}</div>
          <div className="text-sm italic">{t("Chứng nhận rằng", "This is to certify that")}</div>
          <div
            className="mx-auto max-w-xl border-y-2 py-2 text-4xl font-bold"
            style={{ color: "#10b981", borderColor: "#f59e0b" }}
          >
            {learnerName}
          </div>
          <div className="mx-auto max-w-2xl text-base leading-7">{body}</div>
          {detail ? (
            <div className="mx-auto max-w-2xl text-sm font-semibold" style={{ color: "#3b82f6" }}>{detail}</div>
          ) : null}
          <div className="mx-auto grid max-w-2xl items-end gap-4 pt-4 text-sm sm:grid-cols-3">
            <div>
              <div className="text-xl font-bold italic" style={{ color: "#3b82f6" }}>Mr. Hai</div>
              <div className="mt-1 border-t pt-1 text-xs" style={{ borderColor: "#94a3b8" }}>Instructor · HaiEduTech Founder</div>
            </div>
            <div className="flex flex-col items-center">
              <img
                alt="Verify QR"
                width={78}
                height={78}
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`https://haiedutech.com/verify/${code}`)}`}
              />
              <div className="mt-1 text-[10px]" style={{ color: "#64748b" }}>Scan to verify</div>
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: "#3b82f6" }}>{issuedDate}</div>
              <div className="mt-1 border-t pt-1 text-xs" style={{ borderColor: "#94a3b8" }}>{t("Ngày cấp", "Date issued")}</div>
            </div>
          </div>
          <div className="pt-3 text-[11px]" style={{ color: "#64748b" }}>
            {t("Mã chứng chỉ", "Certificate ID")}: {code} · {courseName} ·{" "}
            {t(
              "Chứng nhận hoàn thành khóa học của HaiEduTech, không phải chứng chỉ trình độ quốc tế.",
              "A HaiEduTech course completion record, not an international proficiency certificate.",
            )}
          </div>
        </div>
      </div>
    );
  },
);
CertificateCanvas.displayName = "CertificateCanvas";

export default CertificateCanvas;
