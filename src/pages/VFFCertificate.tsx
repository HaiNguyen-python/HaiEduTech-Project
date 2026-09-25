/**
 * @file VFFCertificate.tsx
 * @description Certificate viewer + PDF export for passed checkpoints.
 */
import { openUpgradeModal, usePremium } from "@/hooks/usePremium";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Download, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useVFFProgress } from "@/hooks/useVFFProgress";

const VFFCertificate = () => {
  const { t } = useLanguage();
  const { progress } = useVFFProgress();
  const [name, setName] = useState("");
  const [level, setLevel] = useState<"A1" | "A2" | "B1">("A1");
  const certRef = useRef<HTMLDivElement>(null);

  const passedLevels: ("A1" | "A2" | "B1")[] = (["A1", "A2", "B1"] as const).filter(l => (progress.checkpointsPassed[l] ?? 0) >= 80);
  const score = progress.checkpointsPassed[level] ?? 0;
  const eligible = score >= 80;
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const { isPremium: certPremium } = usePremium();
  const download = async () => {
    if (!certRef.current) return;
    if (!certPremium) { openUpgradeModal(); return; }
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(certRef.current, { scale: 2, backgroundColor: "#ffffff" });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(img, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Vietnamese_${level}_Certificate_${name || "student"}.pdf`);
    } catch (e) {
      console.error(e);
      alert(t("Không thể tạo PDF. Thử lại nhé.", "Failed to generate PDF. Please retry."));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Vietnamese Certificate | HaiEduTech" description="Download your Vietnamese CEFR completion certificate." path="/learn-vietnamese/for-foreigners/certificate" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl bg-gradient-to-br from-amber-500/15 to-yellow-500/15 border border-amber-500/30 p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-6 h-6 text-amber-600" />
                <Badge className="bg-amber-500 text-white">Certificate</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-1">{t("Chứng chỉ hoàn thành", "Completion Certificate")}</h1>
              <p className="text-muted-foreground">{t("Vượt qua checkpoint ≥80% để mở khoá chứng chỉ. Tải PDF, in ra, khoe ngay!", "Pass a checkpoint with ≥80% to unlock a certificate. Download PDF, print, and share!")}</p>
            </div>
          </motion.div>

          {passedLevels.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="pt-10 pb-10 text-center">
                <div className="text-5xl mb-3">🔒</div>
                <h2 className="text-xl font-bold mb-2">{t("Chưa có chứng chỉ nào", "No certificates yet")}</h2>
                <p className="text-sm text-muted-foreground mb-4">{t("Hãy hoàn thành ít nhất 1 checkpoint với ≥80% để mở khoá.", "Complete at least one checkpoint with ≥80% to unlock.")}</p>
                <Link to="/learn-vietnamese/for-foreigners/a1"><Button>{t("Bắt đầu học A1", "Start A1")}</Button></Link>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="mb-4">
                <CardContent className="pt-5 space-y-3">
                  <div>
                    <label className="text-sm font-semibold mb-1 block">{t("Tên hiển thị trên chứng chỉ", "Name on certificate")}</label>
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">{t("Chọn cấp độ", "Select level")}</label>
                    <div className="flex gap-2">
                      {(["A1", "A2", "B1"] as const).map(l => (
                        <Button key={l} size="sm" variant={level === l ? "default" : "outline"} disabled={!passedLevels.includes(l)} onClick={() => setLevel(l)}>
                          {l} {passedLevels.includes(l) && `✓ ${progress.checkpointsPassed[l]}%`}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div ref={certRef} className="bg-white rounded-xl p-10 border-8 border-double border-amber-500 shadow-2xl">
                <div className="text-center space-y-4" style={{ color: "#1a1a2e" }}>
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-8 h-8" style={{ color: "#d97706" }} />
                    <div className="text-sm font-bold tracking-widest" style={{ color: "#0f766e" }}>HAIEDUTECH</div>
                    <Sparkles className="w-8 h-8" style={{ color: "#d97706" }} />
                  </div>
                  <div className="text-3xl font-serif" style={{ color: "#0f172a" }}>Certificate of Completion</div>
                  <div className="text-sm italic">This is to certify that</div>
                  <div className="text-4xl font-bold py-2 border-y-2 max-w-xl mx-auto" style={{ color: "#059669", borderColor: "#d97706" }}>
                    {name || "Your Name"}
                  </div>
                  <div className="text-sm max-w-2xl mx-auto">
                    has successfully completed the <strong>Vietnamese for Foreigners - Level {level}</strong> course under the CEFR framework, achieving a checkpoint score of <strong style={{ color: "#059669" }}>{score}%</strong>.
                  </div>
                  <div className="pt-4 flex justify-around items-end max-w-2xl mx-auto text-sm">
                    <div>
                      <div className="font-bold text-xl italic" style={{ fontFamily: "cursive", color: "#0f766e" }}>Mr. Hai</div>
                      <div className="border-t border-slate-400 mt-1 pt-1 text-xs">Instructor · HaiEduTech Founder</div>
                    </div>
                    <div>
                      <img
                        alt="Verify QR"
                        width={80}
                        height={80}
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`https://haiedutech.com/verify/vff-${level}-${(name || "student").replace(/\s+/g, "-").toLowerCase()}`)}`}
                      />
                      <div className="text-[10px] text-slate-500 mt-1">Scan to verify</div>
                    </div>
                    <div>
                      <div className="font-bold text-xl" style={{ color: "#0f766e" }}>{today}</div>
                      <div className="border-t border-slate-400 mt-1 pt-1 text-xs">Date issued</div>
                    </div>
                  </div>
                  <div className="pt-3 text-[10px] text-slate-500">Certificate ID: VFF-{level}-{Date.now().toString(36).toUpperCase()}</div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Button size="lg" onClick={download} disabled={!eligible} className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
                  <Download className="w-4 h-4 mr-2" />{t("Tải chứng chỉ PDF", "Download Certificate PDF")}
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

export default VFFCertificate;
