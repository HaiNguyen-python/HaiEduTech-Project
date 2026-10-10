import { forwardRef } from "react";
import { Award, BookOpen, Languages, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import "./curriculumCertificate.css";

interface Props {
  track: "chinese" | "interpersonal";
  learnerName: string;
  issuedDate: string;
  total: number;
  preview: boolean;
}
const CurriculumCertificateArtwork = forwardRef<HTMLDivElement, Props>(({ track, learnerName, issuedDate, total, preview }, ref) => {
  const { t } = useLanguage();
  const chinese = track === "chinese";
  const Icon = chinese ? Languages : Users;
  return <div ref={ref} className={`curriculum-certificate ${chinese ? "certificate-chinese" : "certificate-interpersonal"}`}>
    <div className="certificate-top"><span className="font-display text-xl font-bold">HaiEduTech</span><span className="text-xs font-semibold uppercase">{preview ? t("Bản xem trước", "Preview") : t("Hồ sơ hoàn thành", "Completion record")}</span></div>
    <div className="certificate-heading"><Icon className="mx-auto mb-4 h-9 w-9" /><p className="mb-2 text-xs font-bold uppercase">{chinese ? "中文 · Daily Life / Business / Social" : "Communication · Confidence · Growth"}</p><h2 className="font-display text-3xl font-bold">{t("CHỨNG NHẬN HOÀN THÀNH", "CERTIFICATE OF COMPLETION")}</h2><p className="mt-4 text-sm">{t("Chứng nhận học viên", "Presented to")}</p></div>
    <p className="certificate-name font-display text-4xl font-bold">{learnerName}</p>
    <p className="mx-auto max-w-2xl text-center text-base leading-7">{t(`đã hoàn thành toàn bộ ${total} bài học trong chương trình`, `has completed all ${total} lessons in the program`)}</p>
    <h3 className="certificate-course mt-3 text-center font-display text-2xl font-bold">{chinese ? "Interactive Chinese Curriculum" : "Interpersonal Skills"}</h3>
    <div className="certificate-footer"><div><p className="text-lg font-bold">Mr. Hai</p><p className="mt-1 text-xs">Instructor · HaiEduTech Founder</p></div><div className="certificate-seal"><Award className="h-9 w-9" /><BookOpen className="h-4 w-4" /></div><div className="text-right"><p className="font-semibold">{issuedDate}</p><p className="mt-1 text-xs">{t("Ngày tạo bản ghi", "Record date")}</p></div></div>
    <p className="certificate-disclaimer text-center text-xs leading-5">{t("Bản ghi hoàn thành dựa trên tiến độ học tập. Không phải chứng chỉ trình độ quốc tế hoặc chứng nhận có mã xác minh công khai.", "A completion record based on learning progress. Not an international proficiency qualification or a publicly verifiable issued certificate.")}</p>
  </div>;
});
CurriculumCertificateArtwork.displayName = "CurriculumCertificateArtwork";
export default CurriculumCertificateArtwork;