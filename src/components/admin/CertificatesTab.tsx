/**
 * Certificate centre: issue a completion certificate to any student, for any
 * course, and keep a searchable record of everything already issued.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Award, Download, Loader2, RotateCcw, Search, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import CertificateCanvas from "@/components/certificates/CertificateCanvas";
import { dedupeStudentProfiles, fetchAllProfiles, type AdminProfile } from "@/lib/adminStudents";
import {
  buildCertificateCode,
  issueCertificate,
  listCertificates,
  revokeCertificate,
  type CertificateCourseKey,
  type CertificateRecord,
} from "@/lib/certificateService";

const COURSES: Array<{ key: CertificateCourseKey; vi: string; en: string; levels?: string[] }> = [
  { key: "business", vi: "Business English", en: "Business English" },
  { key: "academic", vi: "Academic English", en: "Academic English" },
  { key: "vff", vi: "Tiếng Việt cho người nước ngoài", en: "Vietnamese for Foreigners", levels: ["A1", "A2", "B1"] },
  { key: "ai-academy", vi: "AI Academy", en: "AI Academy" },
  { key: "custom", vi: "Khóa tự do", en: "Custom course" },
];

const today = () => new Date().toISOString().slice(0, 10);

const CertificatesTab = () => {
  const { t, lang } = useLanguage();
  const { toast } = useToast();
  const certRef = useRef<HTMLDivElement>(null);

  const [students, setStudents] = useState<AdminProfile[]>([]);
  const [studentQuery, setStudentQuery] = useState("");
  const [studentId, setStudentId] = useState<string>("");
  const [name, setName] = useState("");
  const [courseKey, setCourseKey] = useState<CertificateCourseKey>("business");
  const [level, setLevel] = useState<string>("");
  const [customVi, setCustomVi] = useState("");
  const [customEn, setCustomEn] = useState("");
  const [score, setScore] = useState("");
  const [maxScore, setMaxScore] = useState("100");
  const [note, setNote] = useState("");
  const [issuedAt, setIssuedAt] = useState(today);
  const [saving, setSaving] = useState(false);

  const [records, setRecords] = useState<CertificateRecord[]>([]);
  const [recordQuery, setRecordQuery] = useState("");
  const [loadingRecords, setLoadingRecords] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchAllProfiles()
      .then((rows) => {
        if (!alive) return;
        setStudents(dedupeStudentProfiles(rows).students);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  const reloadRecords = useCallback(async () => {
    setLoadingRecords(true);
    try {
      setRecords(await listCertificates());
    } catch {
      toast({
        title: t("Không tải được danh sách chứng chỉ", "Could not load issued certificates"),
        variant: "destructive",
      });
    } finally {
      setLoadingRecords(false);
    }
  }, [t, toast]);

  useEffect(() => {
    void reloadRecords();
  }, [reloadRecords]);

  const filteredStudents = useMemo(() => {
    const q = studentQuery.trim().toLowerCase();
    const base = q ? students.filter((s) => (s.full_name ?? "").toLowerCase().includes(q)) : students;
    return base.slice(0, 40);
  }, [students, studentQuery]);

  const course = COURSES.find((c) => c.key === courseKey)!;
  const courseVi = courseKey === "custom" ? customVi.trim() || "Khóa học HaiEduTech" : course.vi;
  const courseEn = courseKey === "custom" ? customEn.trim() || customVi.trim() || "HaiEduTech course" : course.en;
  const courseName = lang === "vi" ? courseVi : courseEn;
  const learnerName = name.trim() || t("Tên học viên", "Learner name");
  const code = buildCertificateCode(courseKey, name.trim() || "learner", issuedAt, level || null);
  const issuedDate = new Date(`${issuedAt}T00:00:00`).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const scoreNum = score.trim() ? Number(score) : null;
  const maxNum = maxScore.trim() ? Number(maxScore) : null;
  const body = t(
    `đã hoàn thành khóa ${courseVi}${level ? ` - trình độ ${level}` : ""} tại HaiEduTech.`,
    `has completed the ${courseEn}${level ? ` - level ${level}` : ""} course at HaiEduTech.`,
  );
  const detailParts: string[] = [];
  if (scoreNum !== null && !Number.isNaN(scoreNum)) {
    detailParts.push(
      t(`Kết quả: ${scoreNum}${maxNum ? `/${maxNum}` : ""}`, `Result: ${scoreNum}${maxNum ? `/${maxNum}` : ""}`),
    );
  }
  if (note.trim()) detailParts.push(note.trim());

  const warning = useMemo(() => {
    if (courseKey === "business" || courseKey === "academic" || courseKey === "vff") {
      return t(
        "Tiến độ của khóa này được lưu trên thiết bị của học viên, nên không xác minh được từ máy này. Thầy vẫn cấp được chứng chỉ.",
        "This course stores progress on the learner's own device, so it cannot be verified from here. You can still issue the certificate.",
      );
    }
    if (courseKey === "ai-academy") {
      return t(
        "AI Academy yêu cầu 36/36 sao. Không kiểm tra được từ đây, thầy tự xác nhận trước khi cấp.",
        "AI Academy requires 36/36 stars. That cannot be checked here, so please confirm before issuing.",
      );
    }
    return "";
  }, [courseKey, t]);

  const exportPdf = async () => {
    if (!certRef.current) return;
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);
    const canvas = await html2canvas(certRef.current, { scale: 2, backgroundColor: "#ffffff" });
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${code}_${name.trim().replace(/\s+/g, "_") || "learner"}.pdf`);
  };

  const handleIssue = async () => {
    if (!name.trim()) {
      toast({ title: t("Hãy nhập tên học viên", "Please enter the learner name"), variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await issueCertificate({
        code,
        studentId: studentId || null,
        studentName: name.trim(),
        courseKey,
        courseLabelEn: courseEn,
        courseLabelVi: courseVi,
        level: level || null,
        score: scoreNum !== null && !Number.isNaN(scoreNum) ? scoreNum : null,
        maxScore: maxNum !== null && !Number.isNaN(maxNum) ? maxNum : null,
        note: note.trim() || null,
        issuedAt,
      });
      await exportPdf();
      await reloadRecords();
      toast({
        title: t("Đã cấp chứng chỉ", "Certificate issued"),
        description: t(`Mã ${code} đã được lưu và tải PDF.`, `Code ${code} was saved and the PDF downloaded.`),
      });
    } catch (error) {
      toast({
        title: t("Không cấp được chứng chỉ", "Could not issue the certificate"),
        description: error instanceof Error ? error.message : undefined,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const filteredRecords = useMemo(() => {
    const q = recordQuery.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (r) => r.student_name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q),
    );
  }, [records, recordQuery]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Award className="h-5 w-5 text-primary" />
            {t("Cấp chứng chỉ", "Issue a certificate")}
          </CardTitle>
          <CardDescription>
            {t(
              "Chọn học viên, chọn khóa học rồi cấp chứng chỉ. Bản ghi được lưu lại và mã QR dùng để xác thực.",
              "Pick a learner, pick a course, then issue. Every certificate is stored and the QR code verifies it.",
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cert-student-search">{t("Tìm học viên", "Find a learner")}</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="cert-student-search"
                  className="pl-9"
                  value={studentQuery}
                  onChange={(e) => setStudentQuery(e.target.value)}
                  placeholder={t("Nhập tên học viên", "Type a learner name")}
                />
              </div>
              <div className="max-h-40 overflow-y-auto rounded-md border">
                {filteredStudents.length === 0 ? (
                  <p className="p-3 text-sm text-muted-foreground">{t("Không có học viên phù hợp.", "No matching learner.")}</p>
                ) : (
                  filteredStudents.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setStudentId(s.id);
                        setName(s.full_name ?? "");
                      }}
                      aria-pressed={studentId === s.id}
                      className={`block w-full px-3 py-2 text-left text-sm transition-colors ${
                        studentId === s.id ? "bg-primary/10 font-semibold text-foreground" : "hover:bg-muted"
                      }`}
                    >
                      {s.full_name || t("(chưa có tên)", "(no name)")}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cert-name">{t("Tên in trên chứng chỉ", "Name on the certificate")}</Label>
                <Input id="cert-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t("Khóa học", "Course")}</Label>
                <Select
                  value={courseKey}
                  onValueChange={(v) => {
                    setCourseKey(v as CertificateCourseKey);
                    setLevel("");
                  }}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {COURSES.map((c) => (
                      <SelectItem key={c.key} value={c.key}>{lang === "vi" ? c.vi : c.en}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {course.levels && (
                <div className="space-y-2">
                  <Label>{t("Trình độ", "Level")}</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger><SelectValue placeholder={t("Chọn trình độ", "Select a level")} /></SelectTrigger>
                    <SelectContent>
                      {course.levels.map((l) => (
                        <SelectItem key={l} value={l}>{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {courseKey === "custom" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cert-course-vi">{t("Tên khóa (tiếng Việt)", "Course name (Vietnamese)")}</Label>
                <Input id="cert-course-vi" value={customVi} onChange={(e) => setCustomVi(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cert-course-en">{t("Tên khóa (tiếng Anh)", "Course name (English)")}</Label>
                <Input id="cert-course-en" value={customEn} onChange={(e) => setCustomEn(e.target.value)} />
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="cert-date">{t("Ngày cấp", "Date issued")}</Label>
              <Input id="cert-date" type="date" value={issuedAt} onChange={(e) => setIssuedAt(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cert-score">{t("Điểm (tùy chọn)", "Score (optional)")}</Label>
              <Input id="cert-score" inputMode="decimal" value={score} onChange={(e) => setScore(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cert-max">{t("Điểm tối đa", "Out of")}</Label>
              <Input id="cert-max" inputMode="decimal" value={maxScore} onChange={(e) => setMaxScore(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cert-note">{t("Ghi chú thành tích (tùy chọn)", "Achievement note (optional)")}</Label>
            <Textarea id="cert-note" rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          {warning && (
            <p className="rounded-md border border-amber-400/60 bg-amber-50 p-3 text-sm font-medium text-amber-800">
              {warning}
            </p>
          )}

          <CertificateCanvas
            ref={certRef}
            learnerName={learnerName}
            courseName={courseName}
            body={body}
            detail={detailParts.join(" · ") || undefined}
            issuedDate={issuedDate}
            code={code}
          />

          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="gap-2" onClick={handleIssue} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Award className="h-4 w-4" />}
              {t("Cấp chứng chỉ & tải PDF", "Issue certificate & download PDF")}
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => void exportPdf()}>
              <Download className="h-4 w-4" />{t("Chỉ tải PDF", "Download PDF only")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t("Chứng chỉ đã cấp", "Issued certificates")}</CardTitle>
          <CardDescription>{t("Tìm theo tên học viên hoặc mã chứng chỉ.", "Search by learner name or certificate code.")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Input
              value={recordQuery}
              onChange={(e) => setRecordQuery(e.target.value)}
              placeholder={t("Tên hoặc mã...", "Name or code...")}
              className="max-w-xs"
            />
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void reloadRecords()}>
              <RotateCcw className="h-4 w-4" />{t("Tải lại", "Refresh")}
            </Button>
          </div>

          {loadingRecords ? (
            <p className="py-6 text-center text-sm text-muted-foreground">{t("Đang tải...", "Loading...")}</p>
          ) : filteredRecords.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">{t("Chưa có chứng chỉ nào.", "No certificates yet.")}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="py-2 pr-3">{t("Học viên", "Learner")}</th>
                    <th className="py-2 pr-3">{t("Khóa", "Course")}</th>
                    <th className="py-2 pr-3">{t("Ngày cấp", "Issued")}</th>
                    <th className="py-2 pr-3">{t("Mã", "Code")}</th>
                    <th className="py-2 pr-3 text-right">{t("Thao tác", "Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r) => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="py-2 pr-3 font-semibold text-foreground">{r.student_name}</td>
                      <td className="py-2 pr-3">
                        {(lang === "vi" ? r.course_label_vi : r.course_label_en) ?? r.course_key}
                        {r.level ? ` · ${r.level}` : ""}
                      </td>
                      <td className="py-2 pr-3">{r.issued_at}</td>
                      <td className="py-2 pr-3 font-mono text-xs">{r.code}</td>
                      <td className="py-2 pr-3 text-right">
                        {r.revoked_at ? (
                          <div className="flex items-center justify-end gap-2">
                            <Badge variant="destructive">{t("Đã thu hồi", "Revoked")}</Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={async () => {
                                await revokeCertificate(r.id, false);
                                await reloadRecords();
                              }}
                            >
                              {t("Phục hồi", "Restore")}
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1 text-destructive"
                            onClick={async () => {
                              await revokeCertificate(r.id, true);
                              await reloadRecords();
                            }}
                          >
                            <ShieldOff className="h-4 w-4" />{t("Thu hồi", "Revoke")}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificatesTab;
