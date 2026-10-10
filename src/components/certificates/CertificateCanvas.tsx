/**
 * Shared printable certificate artwork used by the learner certificate pages
 * and the admin certificate centre, so every issued certificate looks the same.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { forwardRef } from "react";
import logoAsset from "@/assets/certificate-logo.jpg.asset.json";
import "./certificateCanvas.css";
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
      <div ref={ref} className="certificate-canvas">
        <div className="certificate-canvas__brand">
          <img className="certificate-canvas__logo" src={new URL(logoAsset.url, "https://haiedutech.com").href} alt="HaiEduTech" width={84} height={84} crossOrigin="anonymous" />
          <span className="certificate-canvas__brand-name">HaiEduTech</span>
          {preview && <span className="certificate-canvas__preview">{t("Bản xem trước", "Preview")}</span>}
        </div>
        <div className="certificate-canvas__title">{t("Chứng chỉ hoàn thành khóa học", "Certificate of Completion")}</div>
        <div className="certificate-canvas__intro">{t("Chứng nhận rằng", "This is to certify that")}</div>
        <div className="certificate-canvas__name">{learnerName}</div>
        <div className="certificate-canvas__body">{body}</div>
        {detail && <div className="certificate-canvas__detail">{detail}</div>}
        <div className="certificate-canvas__signatures">
          <div><div className="certificate-canvas__signature">Mr. Hai</div><div className="certificate-canvas__caption">Instructor · HaiEduTech Founder</div></div>
          <div><div className="certificate-canvas__date">{issuedDate}</div><div className="certificate-canvas__caption">{t("Ngày cấp", "Date issued")}</div></div>
          <div className="certificate-canvas__qr">
            <img alt="Verify QR" width={78} height={78} src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`https://haiedutech.com/verify/${code}`)}`} />
            <div>Scan to verify</div>
          </div>
        </div>
        <div className="certificate-canvas__footer">
          {t("Mã chứng chỉ", "Certificate ID")}: {code} · {courseName} · {t("Chứng nhận hoàn thành khóa học của HaiEduTech, không phải chứng chỉ trình độ quốc tế.", "A HaiEduTech course completion record, not an international proficiency certificate.")}
        </div>
      </div>
    );
  },
);
CertificateCanvas.displayName = "CertificateCanvas";

export default CertificateCanvas;
