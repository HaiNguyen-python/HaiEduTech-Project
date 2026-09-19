/**
 * Public certificate verification page. Only shows the minimum needed to
 * confirm a certificate is genuine.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BadgeCheck, ShieldAlert, ShieldOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { verifyCertificate, type VerifiedCertificate } from "@/lib/certificateService";

const CertificateVerify = () => {
  const { code = "" } = useParams();
  const { t, lang } = useLanguage();
  const [state, setState] = useState<"loading" | "found" | "missing" | "error">("loading");
  const [record, setRecord] = useState<VerifiedCertificate | null>(null);

  useEffect(() => {
    let alive = true;
    verifyCertificate(code)
      .then((row) => {
        if (!alive) return;
        setRecord(row);
        setState(row ? "found" : "missing");
      })
      .catch(() => alive && setState("error"));
    return () => {
      alive = false;
    };
  }, [code]);

  const courseName = record ? ((lang === "vi" ? record.course_label_vi : record.course_label_en) ?? record.course_key) : "";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${t("Xác thực chứng chỉ", "Verify certificate")} ${code} | HaiEduTech`}
        description="Verify a HaiEduTech course completion certificate."
        path={`/verify/${code}`}
      />
      <Navbar />
      <main className="pb-16 pt-10">
        <div className="container mx-auto max-w-2xl px-4">
          <h1 className="mb-6 text-3xl font-bold text-foreground">{t("Xác thực chứng chỉ", "Certificate verification")}</h1>
          <Card>
            <CardContent className="space-y-4 py-8 text-center">
              {state === "loading" && <p className="text-muted-foreground">{t("Đang kiểm tra...", "Checking...")}</p>}

              {state === "error" && (
                <>
                  <ShieldAlert className="mx-auto h-10 w-10 text-destructive" />
                  <p className="text-base font-semibold">{t("Không kiểm tra được lúc này. Hãy thử lại sau.", "Could not check right now. Please try again later.")}</p>
                </>
              )}

              {state === "missing" && (
                <>
                  <ShieldAlert className="mx-auto h-10 w-10 text-destructive" />
                  <p className="text-lg font-bold">{t("Không tìm thấy chứng chỉ này", "No certificate found")}</p>
                  <p className="text-sm text-muted-foreground">{t("Mã", "Code")}: <span className="font-mono">{code}</span></p>
                </>
              )}

              {state === "found" && record && (
                <>
                  {record.revoked ? (
                    <ShieldOff className="mx-auto h-10 w-10 text-destructive" />
                  ) : (
                    <BadgeCheck className="mx-auto h-10 w-10 text-emerald-600" />
                  )}
                  <p className="text-lg font-bold">
                    {record.revoked
                      ? t("Chứng chỉ đã bị thu hồi", "This certificate has been revoked")
                      : t("Chứng chỉ hợp lệ", "Valid certificate")}
                  </p>
                  <div className="mx-auto max-w-sm space-y-1 text-left text-sm">
                    <p><span className="text-muted-foreground">{t("Học viên", "Learner")}: </span><strong>{record.student_name}</strong></p>
                    <p><span className="text-muted-foreground">{t("Khóa học", "Course")}: </span><strong>{courseName}{record.level ? ` · ${record.level}` : ""}</strong></p>
                    <p><span className="text-muted-foreground">{t("Ngày cấp", "Issued")}: </span><strong>{record.issued_at}</strong></p>
                    <p><span className="text-muted-foreground">{t("Mã", "Code")}: </span><span className="font-mono">{record.code}</span></p>
                  </div>
                </>
              )}

              <Button asChild variant="outline" className="mt-2">
                <Link to="/">{t("Về trang chủ", "Back to home")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CertificateVerify;
