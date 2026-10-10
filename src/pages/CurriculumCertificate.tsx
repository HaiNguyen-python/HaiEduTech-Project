import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Download, Lock, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import CurriculumCertificateArtwork from "@/components/certificates/CurriculumCertificateArtwork";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLifestyleProgress } from "@/hooks/useLifestyleProgress";
import { chineseConversationalPillars } from "@/data/chineseConversationalCurriculum";
import { CHINESE_CURRICULUM_PROGRESS_EVENT, flattenChineseLessons, readChineseProgress } from "@/lib/chineseCurriculumProgress";
import { interpersonalLessonIds, passedInterpersonalIds } from "@/lib/interpersonalCurriculum";
import { isCurriculumComplete } from "@/lib/curriculumCompletion";
import { toast } from "@/hooks/use-toast";

export default function CurriculumCertificate({ track }: { track: "chinese" | "interpersonal" }) {
  const { t, lang } = useLanguage();
  const chinese = track === "chinese";
  const lessons = useMemo(() => flattenChineseLessons(chineseConversationalPillars), []);
  const [chineseCompleted, setChineseCompleted] = useState(() => readChineseProgress(lessons));
  const { results, loading } = useLifestyleProgress();
  const [name, setName] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [issuedAt] = useState(() => new Date());
  const artwork = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sync = () => setChineseCompleted(readChineseProgress(lessons));
    window.addEventListener("storage", sync);
    window.addEventListener(CHINESE_CURRICULUM_PROGRESS_EVENT, sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener(CHINESE_CURRICULUM_PROGRESS_EVENT, sync); };
  }, [lessons]);
  const ids = chinese ? lessons.map(lesson => lesson.id) : interpersonalLessonIds;
  const completed = chinese ? chineseCompleted : passedInterpersonalIds(results);
  const ready = chinese || !loading;
  const eligible = ready && isCurriculumComplete(ids, completed);
  const back = chinese ? "/chinese/conversational/curriculum" : "/lifestyle-academy#lessons";
  const title = chinese ? "Interactive Chinese Curriculum" : "Interpersonal Skills";
  const download = async () => {
    if (!artwork.current || !eligible || !name.trim() || downloading) return;
    setDownloading(true);
    try {
      await document.fonts.ready;
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const canvas = await html2canvas(artwork.current, { scale: 2, windowWidth: 1280 });
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const width = 277;
      const height = canvas.height / canvas.width * width;
      const fittedHeight = Math.min(height, 190);
      const fittedWidth = width * fittedHeight / height;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", (297 - fittedWidth) / 2, (210 - fittedHeight) / 2, fittedWidth, fittedHeight);
      pdf.save(`HaiEduTech_${track}_certificate.pdf`);
    } catch {
      toast({ title: t("Không tạo được PDF. Vui lòng thử lại.", "Could not create PDF. Please try again."), variant: "destructive" });
    } finally { setDownloading(false); }
  };
  return <div className="min-h-screen bg-background text-foreground"><Navbar /><main className="container mx-auto max-w-5xl px-4 py-8"><Button asChild variant="outline" className="mb-6"><Link to={back}><ArrowLeft className="mr-2 h-4 w-4" />{t("Về chương trình", "Back to curriculum")}</Link></Button><header className="mb-8"><p className="mb-2 flex items-center gap-2 font-semibold text-primary"><Award className="h-5 w-5" />{t("Chứng nhận hoàn thành", "Completion certificate")}</p><h1 className="font-display text-3xl font-bold">{title}</h1></header><div className="mb-8 border-y border-border py-5"><div className="mb-3 flex justify-between gap-3"><span className="font-semibold">{t("Tiến độ hoàn thành", "Completion progress")}</span><span>{ready ? completed.length : "…"}/{ids.length}</span></div><Progress value={completed.length / ids.length * 100} />{!eligible && <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Lock className="h-4 w-4" />{chinese ? t("Hoàn thành tất cả bài học để tải chứng nhận.", "Complete every lesson to download your certificate.") : t("Đạt bài quiz của tất cả bài học (ít nhất 75%) để tải chứng nhận.", "Pass every lesson quiz (at least 75%) to download your certificate.")}</p>}</div>{eligible && <div className="mb-6"><label htmlFor="curriculum-certificate-name" className="mb-2 block font-semibold">{t("Họ và tên trên chứng nhận", "Full name on certificate")}</label><Input id="curriculum-certificate-name" value={name} onChange={event => setName(event.target.value)} maxLength={100} placeholder={t("Nhập họ và tên", "Enter your full name")} /></div>}<CurriculumCertificateArtwork ref={artwork} track={track} learnerName={name.trim() || t("Tên học viên", "Learner name")} total={ids.length} preview={!eligible || !name.trim()} issuedDate={issuedAt.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-GB", { day: "numeric", month: "long", year: "numeric" })} /><div className="mt-6 flex justify-center"><Button onClick={download} disabled={!eligible || !name.trim() || downloading} className="gap-2">{downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}{t("Tải chứng nhận PDF", "Download certificate PDF")}</Button></div></main><Footer /></div>;
}