/**
 * @file PurposeEnglishCertificate.tsx
 * @description Completion certificate for the Business English and Academic
 *   English tracks. Eligibility is computed from the same local progress keys
 *   the course pages use, so no new backend contract is introduced.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Download, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { academicCommunicationLessons, professionalCommunicationLessons } from "@/data/conversationalCurriculum";
import { academicTopicsPart1 } from "@/data/academicEnglishLessons";
import { academicTopicsPart2 } from "@/data/academicEnglishLessons2";
import { businessTopicsPart1 } from "@/data/businessEnglishLessons";
import { businessTopicsPart2 } from "@/data/businessEnglishLessons2";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { useUserRole } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";
import {
  buildCertificateStatus,
  buildReadinessSnapshot,
  certificateCode,
  emptyReadinessScores,
  type ReadinessScores,
  type ReadinessTrack,
} from "@/lib/purposeEnglishReadiness";
import { safeStorage } from "@/lib/safeStorage";

interface Props {
  track: ReadinessTrack;
}

const TRACK_CONFIG = {
  business: {
    storageKey: "haiedu-business-english-v1",
    activityType: "business_english_lesson",
    courseEn: "Business English",
    courseVi: "Business English",
    hub: "/english/business",
  },
  academic: {
    storageKey: "haiedu-academic-english-v1",
    activityType: "academic_english_lesson",
    courseEn: "Academic English",
    courseVi: "Academic English",
    hub: "/english/academic",
  },
} as const;

const PurposeEnglishCertificate = ({ track }: Props) => {
  const { t, lang } = useLanguage();
  const { toast } = useToast();
  const { isTeacher, isAdmin } = useUserRole();
  const preview = isTeacher || isAdmin;
  const config = TRACK_CONFIG[track];
  const certRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [coreDone, setCoreDone] = useState<string[]>([]);
  const [labDone, setLabDone] = useState<string[]>([]);
  const [practised, setPractised] = useState<string[]>([]);
  const [scores, setScores] = useState<ReadinessScores>(emptyReadinessScores);

  const topics = useMemo(
    () => (track === "business" ? [...businessTopicsPart1, ...businessTopicsPart2] : [...academicTopicsPart1, ...academicTopicsPart2]),
    [track],
  );
  const labs = useMemo(
    () => (track === "business" ? professionalCommunicationLessons : academicCommunicationLessons),
    [track],
  );

  useEffect(() => {
    setCoreDone(safeStorage.get<string[]>(config.storageKey, []) ?? []);
    setLabDone(safeStorage.get<string[]>(`${config.storageKey}-communication`, []) ?? []);
    setPractised(safeStorage.get<string[]>(`${config.storageKey}-phrases`, []) ?? []);
    setScores(safeStorage.get<ReadinessScores>(`${config.storageKey}-readiness-scores`, emptyReadinessScores()) ?? emptyReadinessScores());
  }, [config.storageKey]);

  const snapshot = buildReadinessSnapshot({ track, topics, labs, coreDone, labDone, practised, scores });
  const certificate = buildCertificateStatus({ topics, labs, coreDone, labDone, overall: snapshot.overall });
  const stageLabel = {
    foundation: t("Đang xây nền", "Building foundations"),
    developing: t("Đang phát triển", "Developing"),
    "nearly-ready": t("Gần sẵn sàng", "Nearly ready"),
    ready: t("Sẵn sàng áp dụng", "Ready to apply"),
  }[snapshot.stage];
  const learnerName = name.trim() || t("Tên học viên", "Learner name");
  const code = certificateCode(track, name.trim() || "learner");
  const today = new Date().toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  const courseName = t(config.courseVi, config.courseEn);
  const canDownload = certificate.eligible || preview;

  const download = async () => {
    if (!certRef.current) return;
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const canvas = await html2canvas(certRef.current, { scale: 2, backgroundColor: "#ffffff" });
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${config.courseEn.replace(/\s+/g, "_")}_Certificate_${name.trim().replace(/\s+/g, "_") || "learner"}.pdf`);
      if (certificate.eligible) {
        void logStudentActivity({
          activityType: config.activityType,
          activityId: `${track}-certificate`,
          score: snapshot.overall,
          maxScore: 100,
          metadata: { track, mode: "certificate", code },
        });
      }
    } catch {
      toast({
        title: t("Không tạo được PDF", "Could not create the PDF"),
        description: t("Hãy thử lại sau vài giây.", "Please try again in a moment."),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${config.courseEn} Certificate | HaiEduTech`}
        description={`Download your ${config.courseEn} completion certificate from HaiEduTech.`}
        path={`/english/${track}/certificate`}
      />
      <Navbar />
      <main className="pb-16 pt-6">
        <div className="container mx-auto max-w-4xl px-4">
          <Link to={config.hub} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />{t("Về khóa học", "Back to the course")}
          </Link>

          <div className="mb-6 rounded-xl border border-secondary/40 bg-secondary/10 p-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <Badge>{courseName}</Badge>
              {preview && !certificate.eligible && (
                <Badge variant="outline" className="gap-1"><ShieldCheck className="h-3.5 w-3.5" />{t("Bản xem trước của giáo viên", "Teacher preview")}</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-foreground">{t("Chứng chỉ hoàn thành khóa học", "Course completion certificate")}</h1>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              {t(
                `Cần hoàn thành toàn bộ bài nền tảng và Communication Lab, đồng thời đạt tối thiểu ${certificate.required}/100 điểm readiness.`,
                `Complete every core lesson and Communication Lab, and reach at least ${certificate.required}/100 readiness points.`,
              )}
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground/70">
              {t(
                `Bài nền tảng ${certificate.coreCompleted}/${certificate.coreTotal} · Lab ${certificate.labCompleted}/${certificate.labTotal} · Readiness ${certificate.overall}/100`,
                `Core ${certificate.coreCompleted}/${certificate.coreTotal} · Labs ${certificate.labCompleted}/${certificate.labTotal} · Readiness ${certificate.overall}/100`,
              )}
            </p>
          </div>

          {!canDownload ? (
            <Card className="border-2 border-dashed">
              <CardContent className="py-12 text-center">
                <Award className="mx-auto h-10 w-10 text-muted-foreground" />
                <h2 className="mt-3 text-xl font-bold text-foreground">{t("Chưa đủ điều kiện nhận chứng chỉ", "Not eligible yet")}</h2>
                <p className="mx-auto mt-2 max-w-xl text-base leading-7 text-muted-foreground">
                  {t(
                    `Còn thiếu ${certificate.missingCore} bài nền tảng, ${certificate.missingLab} Communication Lab và ${certificate.missingPoints} điểm readiness.`,
                    `You still need ${certificate.missingCore} core lessons, ${certificate.missingLab} Communication Labs and ${certificate.missingPoints} readiness points.`,
                  )}
                </p>
                <Button asChild className="mt-5"><Link to={config.hub}>{t("Học tiếp", "Keep learning")}</Link></Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="mb-4">
                <CardContent className="space-y-2 pt-5">
                  <label htmlFor="cert-name" className="block text-sm font-bold text-foreground">{t("Tên in trên chứng chỉ", "Name on the certificate")}</label>
                  <Input id="cert-name" value={name} onChange={(event) => setName(event.target.value)} placeholder={t("Nhập họ và tên", "Enter your full name")} />
                </CardContent>
              </Card>

              <CertificateCanvas
                ref={certRef}
                learnerName={learnerName}
                courseName={courseName}
                preview={preview && !certificate.eligible}
                body={t(
                  `đã hoàn thành toàn bộ khóa ${courseName} tại HaiEduTech với ${certificate.coreTotal} bài nền tảng và ${certificate.labTotal} Communication Lab, đạt ${snapshot.overall}/100 điểm readiness (${stageLabel}).`,
                  `has completed the full ${courseName} course at HaiEduTech, covering ${certificate.coreTotal} core lessons and ${certificate.labTotal} Communication Labs, with a readiness score of ${snapshot.overall}/100 (${stageLabel}).`,
                )}
                issuedDate={today}
                code={code}
              />

              <div className="mt-5 flex justify-center">
                <Button size="lg" className="gap-2" onClick={download}>
                  <Download className="h-4 w-4" />{t("Tải chứng chỉ PDF", "Download certificate PDF")}
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PurposeEnglishCertificate;
