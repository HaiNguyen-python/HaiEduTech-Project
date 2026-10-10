import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Award, Download, LockKeyhole } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import CertificateCanvas from "@/components/certificates/CertificateCanvas";
import { exportCertificatePdf } from "@/lib/certificatePdfExport";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { pythonLessons } from "@/data/curriculum/pythonPathway";
import { getPythonPathwayProgress } from "@/components/python/PythonPathwayHub";
import { usePythonChallengeProgress } from "@/hooks/usePythonChallengeProgress";
import { buildCertificateCode } from "@/lib/certificateService";
import { isPythonProgramComplete, PYTHON_CERT_CHALLENGES } from "@/lib/pythonPathwayLock";

const PythonCertificate = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const certRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(getPythonPathwayProgress());
  const { ids, loading } = usePythonChallengeProgress();
  useEffect(() => {
    const sync = () => setProgress(getPythonPathwayProgress());
    window.addEventListener("python-pathway-progress", sync);
    return () => window.removeEventListener("python-pathway-progress", sync);
  }, []);
  const lessonsDone = pythonLessons.filter(l => progress[l.id]).length;
  const eligible = isPythonProgramComplete(progress, ids.size);
  const today = new Date().toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  const learnerName = name.trim() || t("Tên học viên", "Learner name");
  const code = buildCertificateCode("custom", name || "learner", new Date().toISOString().slice(0, 10), "python").replace("HET-CRT", "HET-PY");

  const download = async () => {
    if (!certRef.current || !eligible) return;
    try {
      await exportCertificatePdf(certRef.current, `Python_Programming_Certificate_${name.trim().replace(/\s+/g, "_") || "learner"}.pdf`);
    } catch {
      toast({ title: t("Không tạo được PDF", "Could not create the PDF"), variant: "destructive" });
    }
  };

  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate("/programming?pillar=python-pathway"));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 pb-16 pt-6">
        <Button variant="outline" size="sm" onClick={goBack} className="mb-6 gap-1.5"><ArrowLeft className="h-4 w-4" />{t("Quay lại", "Back")}</Button>
        <div className="mb-6 flex items-center gap-3">
          <Award className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{t("Chứng nhận lập trình Python", "Python Programming Certificate")}</h1>
            <p className="text-sm text-muted-foreground">{t("Hoàn thành Introduction to Programming và 150 Python Challenges để nhận chứng nhận.", "Complete Introduction to Programming and all 150 Python Challenges to earn it.")}</p>
          </div>
        </div>
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4">
            <div className="mb-2 flex justify-between text-sm"><span>Introduction to Programming</span><span className="font-mono">{lessonsDone}/{pythonLessons.length}</span></div>
            <Progress value={lessonsDone / pythonLessons.length * 100} className="h-2" />
            {lessonsDone < pythonLessons.length && <Link to="/programming?pillar=python-pathway" className="mt-2 inline-block text-xs text-primary hover:underline">{t("Tiếp tục học", "Continue lessons")}</Link>}
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="mb-2 flex justify-between text-sm"><span>150 Python Challenges</span><span className="font-mono">{loading ? "…" : ids.size}/{PYTHON_CERT_CHALLENGES}</span></div>
            <Progress value={ids.size / PYTHON_CERT_CHALLENGES * 100} className="h-2" />
            {ids.size < PYTHON_CERT_CHALLENGES && <Link to="/python-challenges" className="mt-2 inline-block text-xs text-primary hover:underline">{t("Tiếp tục thử thách", "Continue challenges")}</Link>}
          </div>
        </div>
        {eligible ? <>
          <label htmlFor="py-cert-name" className="mb-1 block text-sm font-bold">{t("Tên in trên chứng nhận", "Name on the certificate")}</label>
          <Input id="py-cert-name" value={name} onChange={e => setName(e.target.value)} placeholder={t("Nhập họ và tên", "Enter your full name")} className="mb-5" />
          <CertificateCanvas ref={certRef} learnerName={learnerName} courseName="Introduction to Programming & 150 Python Challenges" issuedDate={today} code={code}
            body={t(`đã hoàn thành toàn bộ ${pythonLessons.length} chương Introduction to Programming và 150 Python Challenges tại HaiEduTech.`, `has completed all ${pythonLessons.length} chapters of Introduction to Programming and all 150 Python Challenges at HaiEduTech.`)} />
          <div className="mt-5 flex justify-center"><Button size="lg" className="gap-2" onClick={download} disabled={!name.trim()}><Download className="h-4 w-4" />{t("Tải chứng nhận PDF", "Download certificate PDF")}</Button></div>
        </> : <div className="rounded-xl border-2 border-dashed border-border p-10 text-center">
          <LockKeyhole className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-semibold text-foreground">{t("Chứng nhận đang khóa", "Certificate locked")}</p>
          <p className="text-sm text-muted-foreground">{t("Hoàn thành cả hai phần ở trên để mở khóa.", "Finish both parts above to unlock it.")}</p>
        </div>}
      </main>
      <Footer />
    </div>
  );
};
export default PythonCertificate;
