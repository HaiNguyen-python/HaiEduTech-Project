import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Copy, Download, Eye, FilePlus2, Loader2, Mail, RefreshCw, Save, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { dedupeStudentProfiles, fetchAllProfiles, type AdminProfile } from "@/lib/adminStudents";
import { tuitionBySubject } from "@/components/courses/CourseTuitionSection";
import ParentLetterTemplates from "@/components/admin/ParentLetterTemplates";
import CourseNoticeDocument from "@/components/course-notices/CourseNoticeDocument";
import { buildNoticeCode, duplicateCourseNotice, listCourseNotices, saveCourseNotice, EUR_TO_VND, type CourseNoticeData, type CourseNoticeRecord } from "@/lib/courseNotice";

const today = () => new Date().toISOString().slice(0, 10);
const addDays = (days: number) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); };
const catalog = Object.entries(tuitionBySubject).flatMap(([subject, courses]) => courses.map((course) => ({ ...course, subject })));
/** Parse "Thứ 3 - Thứ 5" / "T2, T4, T6" / "Chủ nhật" into JS weekdays (0=Sun). */
const parseWeekdays = (schedule: string): number[] => {
  const s = schedule.toLowerCase();
  const days = new Set<number>();
  for (const m of s.matchAll(/(?:thứ|thu|t)\s*([2-7])/g)) days.add(Number(m[1]) - 1);
  if (/chủ\s*nhật|cn\b|sunday/.test(s)) days.add(0);
  const en: Record<string, number> = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
  for (const [k, v] of Object.entries(en)) if (new RegExp(`\\b${k}`).test(s)) days.add(v);
  return [...days].sort();
};
/** End date = date of the last scheduled session after `weeks` weeks from start. */
const computeEndDate = (startDate: string, weeks: number, schedule: string): string | null => {
  if (!startDate || !weeks) return null;
  const start = new Date(`${startDate}T00:00:00`);
  if (isNaN(start.getTime())) return null;
  const days = parseWeekdays(schedule);
  if (!days.length) { const d = new Date(start); d.setDate(d.getDate() + weeks * 7 - 1); return fmtDate(d); }
  const total = weeks * days.length;
  const d = new Date(start); let count = 0; let last = d;
  for (let i = 0; i < 400 && count < total; i++) {
    if (days.includes(d.getDay())) { count++; last = new Date(d); }
    d.setDate(d.getDate() + 1);
  }
  return fmtDate(last);
};
const fmtDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const initialData = (): CourseNoticeData => ({
  language: "en",
  recipientName: "", recipientEmail: "", recipientPhone: "", courseKey: catalog[0]?.key ?? "custom",
  courseNameVi: catalog[0]?.nameVi ?? "", courseNameEn: catalog[0]?.nameEn ?? "", classType: "group", level: "",
  objective: "Build a solid foundation and apply it confidently in study, work and real-life communication.",
  startDate: addDays(7), endDate: addDays(91), schedule: "Tuesday - Thursday, 19:00 - 20:30", timezone: "",
  weeks: 12, sessions: 24, hours: 36,
  modules: ["Placement assessment and personalised learning plan", "Strengthening core knowledge by level", "Applied practice with in-depth feedback", "Review, progress assessment and next-step guidance"],
  benefits: ["All course materials included", "Personal feedback after each stage", "Progress tracking on the HaiEduTech platform"], note: "",
  currency: "vnd",
  baseEur: catalog[0]?.groupPrice ?? 210, baseVnd: (catalog[0]?.groupPrice ?? 210) * EUR_TO_VND,
  discountType: "percent", discountValue: 0, discountReason: "", finalEur: catalog[0]?.groupPrice ?? 210, finalVnd: (catalog[0]?.groupPrice ?? 210) * EUR_TO_VND,
  paymentReference: "", extraFeeLabel: "", extraFeeVnd: 0,
  paymentDeadline: addDays(5), paymentMethod: "both",
  instructorName: "Nguyen Tran Thanh Hai, M.A., M.Eng.", instructorCredentials: "Master's in English Language & Culture (Finland)",
  instructorExpertise: "Data & AI Engineer (Finland)\n15 years of teaching experience",
  instructorPhone: "0962.823.800", instructorEmail: "contact@haiedutech.com", instructorWebsite: "haiedutech.com", issuedAt: today(),
});

export default function CourseNoticesTab() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);
  const [students, setStudents] = useState<AdminProfile[]>([]);
  const [records, setRecords] = useState<CourseNoticeRecord[]>([]);
  const [data, setData] = useState<CourseNoticeData>(initialData);
  const [code, setCode] = useState(buildNoticeCode);
  const [recordId, setRecordId] = useState<string>();
  const [studentId, setStudentId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [confirmSend, setConfirmSend] = useState(false);

  const normalized = useMemo<CourseNoticeData>(() => {
    const currency = data.currency ?? "vnd";
    const enteredEur = Math.max(0, Number(data.baseEur) || 0);
    const enteredVnd = Math.max(0, Number(data.baseVnd) || 0);
    const baseEur = currency === "eur" ? enteredEur : Math.round(enteredVnd / EUR_TO_VND * 100) / 100;
    const baseVnd = currency === "eur" ? Math.round(enteredEur * EUR_TO_VND) : enteredVnd;
    const pct = Math.min(100, Math.max(0, data.discountValue || 0));
    const discountEur = data.discountType === "percent"
      ? baseEur * pct / 100
      : currency === "eur" ? Math.max(0, data.discountValue || 0) : Math.round(Math.max(0, data.discountValue || 0) / EUR_TO_VND * 100) / 100;
    const discountVnd = data.discountType === "percent"
      ? baseVnd * pct / 100
      : currency === "vnd" ? Math.max(0, data.discountValue || 0) : Math.round(Math.max(0, data.discountValue || 0) * EUR_TO_VND);
    const finalEur = Math.max(0, Math.round((baseEur - discountEur) * 100) / 100);
    const finalVnd = Math.max(0, Math.round(baseVnd - discountVnd));
    return { ...data, language: data.language ?? "en", currency, baseEur, baseVnd, finalEur, finalVnd, extraFeeVnd: Math.max(0, Math.round(Number(data.extraFeeVnd) || 0)), extraFeeEur: Math.max(0, Math.round((Number(data.extraFeeEur) || 0) * 100) / 100) };
  }, [data]);

  const reload = useCallback(async () => {
    setLoading(true);
    try { setRecords(await listCourseNotices()); }
    catch { toast({ title: t("Không tải được lịch sử giấy báo", "Could not load notice history"), variant: "destructive" }); }
    finally { setLoading(false); }
  }, [t, toast]);

  useEffect(() => {
    void reload();
    fetchAllProfiles().then((rows) => setStudents(dedupeStudentProfiles(rows).students)).catch(() => undefined);
  }, [reload]);

  const update = <K extends keyof CourseNoticeData>(key: K, value: CourseNoticeData[K]) => setData((prev) => {
    const next = { ...prev, [key]: value };
    if (key === "startDate" || key === "weeks" || key === "schedule") {
      const end = computeEndDate(next.startDate, Number(next.weeks) || 0, next.schedule);
      if (end) next.endDate = end;
    }
    return next;
  });
  const updateDocument = <K extends keyof CourseNoticeData>(key: K, value: CourseNoticeData[K]) => update(key, value);
  const selectCourse = (key: string) => {
    if (key === "custom") { update("courseKey", key); return; }
    const found = catalog.find((course) => course.key === key);
    if (!found) return;
    const price = found.groupPrice * (data.classType === "private" ? 3 : 1);
    setData((prev) => ({ ...prev, courseKey: key, courseNameVi: found.nameVi, courseNameEn: found.nameEn, baseEur: price, baseVnd: Math.round(price * EUR_TO_VND) }));
  };
  const selectClassType = (classType: "group" | "private") => {
    const found = catalog.find((course) => course.key === data.courseKey);
    setData((prev) => {
      if (!found) return { ...prev, classType };
      const price = found.groupPrice * (classType === "private" ? 3 : 1);
      return { ...prev, classType, baseEur: price, baseVnd: Math.round(price * EUR_TO_VND) };
    });
  };
  const setBaseAmount = (raw: string) => {
    const v = Math.max(0, Number(raw) || 0);
    setData((prev) => (prev.currency ?? "vnd") === "eur"
      ? { ...prev, baseEur: v, baseVnd: Math.round(v * EUR_TO_VND) }
      : { ...prev, baseVnd: v, baseEur: Math.round(v / EUR_TO_VND * 100) / 100 });
  };
  const [feeCurrency, setFeeCurrency] = useState<"vnd" | "eur" | null>(null);
  const setExtraFeeAmount = (raw: string) => {
    const v = Math.max(0, Number(raw) || 0);
    setData((prev) => (feeCurrency ?? prev.currency ?? "vnd") === "eur"
      ? { ...prev, extraFeeEur: v, extraFeeVnd: Math.round(v * EUR_TO_VND) }
      : { ...prev, extraFeeVnd: v, extraFeeEur: Math.round(v / EUR_TO_VND * 100) / 100 });
  };
  const setCurrency = (currency: "vnd" | "eur") => setData((prev) => {
    const current = prev.currency ?? "vnd";
    if (current === currency) return prev;
    const fee = current === "eur" ? (prev.extraFeeEur ?? Math.round((prev.extraFeeVnd ?? 0) / EUR_TO_VND * 100) / 100) : (prev.extraFeeVnd ?? 0);
    return { ...prev, currency,
      extraFeeEur: current === "eur" ? fee : Math.round(fee / EUR_TO_VND * 100) / 100,
      extraFeeVnd: current === "eur" ? Math.round(fee * EUR_TO_VND) : fee };
  });
  const setNoticeLanguage = (language: "en" | "vi") => setData((prev) => {
    const schedule = language === "vi" ? "Thứ 3 - Thứ 5, 19:00 - 20:30" : "Tuesday - Thursday, 19:00 - 20:30";
    return {
      ...prev,
      language,
      objective: language === "vi"
      ? "Xây dựng nền tảng vững chắc và vận dụng tự tin trong học tập, công việc và giao tiếp thực tế."
      : "Build a solid foundation and apply it confidently in study, work and real-life communication.",
      schedule,
      endDate: computeEndDate(prev.startDate, Number(prev.weeks) || 0, schedule) ?? prev.endDate,
      timezone: "",
      instructorCredentials: language === "vi" ? "Thạc sĩ Ngôn ngữ & Văn hóa Anh (Phần Lan)" : "Master's in English Language & Culture (Finland)",
      instructorExpertise: language === "vi" ? "Kỹ sư Dữ liệu & Trí tuệ nhân tạo (Phần Lan)\n15 năm kinh nghiệm giảng dạy" : "Data & AI Engineer (Finland)\n15 years of teaching experience",
    };
  });
  const chooseStudent = (id: string) => {
    if (id === "manual") { setStudentId(null); return; }
    const student = students.find((item) => item.id === id);
    setStudentId(id); if (student?.full_name) update("recipientName", student.full_name);
  };
  const reset = () => { const fresh = initialData(); setData(fresh); setCode(buildNoticeCode()); setRecordId(undefined); setStudentId(null); };
  const validate = (forSend: boolean) => {
    const email = normalized.recipientEmail.trim();
    if (forSend && (!normalized.recipientName.trim() || !/^\S+@\S+\.\S+$/.test(email))) { toast({ title: t("Cần tên và email hợp lệ để gửi email", "A valid name and email are needed to send"), variant: "destructive" }); return false; }
    if (!forSend && email && !/^\S+@\S+\.\S+$/.test(email)) { toast({ title: t("Email chưa đúng định dạng (có thể để trống)", "Email format is invalid (you may leave it empty)"), variant: "destructive" }); return false; }
    if (forSend && (!normalized.courseNameVi.trim() || !normalized.startDate || !normalized.endDate)) { toast({ title: t("Hãy hoàn tất thông tin khóa học", "Complete the course details"), variant: "destructive" }); return false; }
    if ((normalized.extraFeeVnd ?? 0) > 0 && !normalized.extraFeeLabel?.trim()) { toast({ title: t("Hãy nhập tên khoản phí khác", "Name the additional fee"), variant: "destructive" }); return false; }
    return true;
  };
  const persist = async (forSend = false) => {
    if (!validate(forSend)) return null;
    setSaving(true);
    try {
      const saved = await saveCourseNotice({ id: recordId, code, studentId, data: normalized });
      setRecordId(saved.id); await reload();
      toast({ title: t("Đã lưu giấy báo", "Course notice saved"), description: code });
      return saved;
    } catch (e) { toast({ title: t("Không thể lưu giấy báo", "Could not save the notice"), description: e instanceof Error ? e.message : undefined, variant: "destructive" }); return null; }
    finally { setSaving(false); }
  };
  const send = async () => {
    setConfirmSend(false);
    const saved = await persist(true); if (!saved) return;
    setSending(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("send-course-notice", { body: { noticeId: saved.id } });
      if (error) throw error;
      if (result?.suppressed) throw new Error(t("Địa chỉ này đang từ chối nhận email.", "This address is not accepting email."));
      await reload(); toast({ title: t("Đã gửi giấy báo", "Course notice sent"), description: normalized.recipientEmail });
    } catch (e) { toast({ title: t("Gửi email chưa thành công", "Email was not sent"), description: e instanceof Error ? e.message : undefined, variant: "destructive" }); }
    finally { setSending(false); }
  };
  const printPdf = () => {
    const source = printRef.current;
    if (!source) return;

    const previousTitle = document.title;
    const host = document.createElement("div");
    host.id = "course-notice-print-host";
    const printable = source.cloneNode(true) as HTMLElement;
    printable.removeAttribute("id");
    host.appendChild(printable);
    document.body.appendChild(host);
    // Measure at the actual A4 width; only shrink a notice if its contents exceed one page.
    const pageWidth = host.getBoundingClientRect().width;
    const pageHeight = pageWidth * 297 / 210;
    let scale = 1;
    for (let i = 0; i < 3; i++) {
      printable.style.width = `${210 / scale}mm`;
      printable.style.maxWidth = "none";
      printable.style.zoom = String(scale);
      const height = printable.getBoundingClientRect().height;
      if (height <= pageHeight - 8) break;
      scale = Math.max(0.55, Math.min(scale, scale * (pageHeight - 8) / height));
    }
    document.body.classList.add("course-notice-printing");
    document.title = `${code}_${normalized.recipientName.replace(/\s+/g, "_")}`;

    const cleanup = () => {
      document.body.classList.remove("course-notice-printing");
      host.remove();
      document.title = previousTitle;
    };
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
  };
  const openRecord = (record: CourseNoticeRecord) => { setRecordId(record.id); setCode(record.notice_code); setStudentId(record.student_id); setData({ ...record.snapshot, language: record.snapshot.language ?? "en" }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const duplicate = async (record: CourseNoticeRecord) => { try { const copy = await duplicateCourseNotice(record); await reload(); openRecord(copy); toast({ title: t("Đã nhân bản giấy báo", "Course notice duplicated") }); } catch { toast({ title: t("Không thể nhân bản", "Could not duplicate"), variant: "destructive" }); } };

  const filtered = records.filter((r) => {
    const q = query.trim().toLowerCase();
    return (statusFilter === "all" || r.status === statusFilter) && (!q || `${r.notice_code} ${r.recipient_name} ${r.recipient_email} ${r.snapshot.courseNameVi} ${r.snapshot.courseNameEn}`.toLowerCase().includes(q));
  });

  const noticeCurrency = normalized.currency ?? "vnd";
  const fmtNoticeMoney = (n: number) => noticeCurrency === "eur"
    ? `${new Intl.NumberFormat("en-IE", { maximumFractionDigits: 2 }).format(n)} EUR`
    : `${new Intl.NumberFormat("vi-VN").format(n)}đ`;
  const extraFeeAmount = noticeCurrency === "eur"
    ? (normalized.extraFeeEur ?? Math.round((normalized.extraFeeVnd ?? 0) / EUR_TO_VND * 100) / 100)
    : (normalized.extraFeeVnd ?? 0);

  return <div className="space-y-6">
    <style>{`#course-notice-print-host { position: absolute; left: -10000px; top: 0; visibility: hidden; width: 210mm; } #course-notice-print-host .course-notice { font-size: 12px; line-height: 1.35; } #course-notice-print-host .course-notice-letterhead { padding-top: 48px; padding-bottom: 10px; } #course-notice-print-host .course-notice-letterhead img { width: 56px; height: 56px; } #course-notice-print-host .course-notice > div:nth-last-child(2) { padding-bottom: 12px; } #course-notice-print-host .course-notice-title-block { padding-top: 10px; padding-bottom: 10px; } #course-notice-print-host .course-notice-title-block h1 { font-size: 22px; } #course-notice-print-host .course-notice-recipient { padding-top: 14px; padding-bottom: 10px; } #course-notice-print-host .course-notice-recipient h2 { font-size: 18px; line-height: 1.3; } #course-notice-print-host .course-notice-section { padding-top: 10px; margin-top: 10px; } #course-notice-print-host .course-notice-facts { margin-top: 8px; } #course-notice-print-host .course-notice-facts > div { padding: 6px; } #course-notice-print-host .course-notice-fee { padding: 10px; margin-top: 10px; } #course-notice-print-host .course-notice-fee td { padding-top: 4px; padding-bottom: 4px; } #course-notice-print-host .course-notice-payment-grid { margin-top: 6px; } #course-notice-print-host .course-notice-bank { padding: 6px 8px; } #course-notice-print-host .course-notice-bank > strong { margin-bottom: 3px; } #course-notice-print-host .course-notice-bank dl { gap: 1px; } #course-notice-print-host .course-notice-footer { margin-top: 10px; padding-top: 8px; } @media print { body.course-notice-printing > *:not(#course-notice-print-host) { display: none !important; } body.course-notice-printing { margin: 0 !important; overflow: visible !important; background: white !important; } body.course-notice-printing #course-notice-print-host { position: static; visibility: visible; width: 210mm; background: white !important; } body.course-notice-printing #course-notice-print-host > article { margin: 0 !important; min-height: 0 !important; box-shadow: none !important; } body.course-notice-printing #course-notice-print-host footer { display: block !important; } @page { size: A4; margin: 0; } }`}</style>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><h2 className="text-2xl font-black">{t("Giấy báo chương trình & khóa học", "Programme & course notices")}</h2><p className="mt-1 text-sm text-muted-foreground">{t("Soạn, lưu, tải PDF và gửi giấy báo cá nhân hóa cho từng học viên.", "Create, save, download and email a personalised notice to each learner.")}</p></div>
      <Button variant="outline" onClick={reset}><FilePlus2 className="h-4 w-4" />{t("Tạo giấy báo mới", "New notice")}</Button>
    </div>

    <div className="grid items-start gap-6 xl:grid-cols-[minmax(380px,0.9fr)_minmax(620px,1.35fr)]">
      <Card><CardHeader><CardTitle>{t("Nội dung giấy báo", "Notice details")}</CardTitle><CardDescription>{code}</CardDescription></CardHeader><CardContent className="space-y-5">
        <div className="space-y-2"><Label>{t("Nguồn học viên", "Learner source")}</Label><Select value={studentId ?? "manual"} onValueChange={chooseStudent}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="manual">{t("Nhập người nhận mới", "Enter a new recipient")}</SelectItem>{students.map((s) => <SelectItem key={s.id} value={s.id}>{s.full_name || t("Chưa có tên", "Unnamed")}</SelectItem>)}</SelectContent></Select></div>
        <div className="grid gap-3 sm:grid-cols-2"><div className="space-y-2"><Label>Họ tên / Full name</Label><Input value={data.recipientName} onChange={(e) => update("recipientName", e.target.value)} /></div><div className="space-y-2"><Label>Email</Label><Input type="email" value={data.recipientEmail} onChange={(e) => update("recipientEmail", e.target.value)} /></div></div>
        <div className="space-y-2"><Label>Số điện thoại / Phone</Label><Input value={data.recipientPhone} onChange={(e) => update("recipientPhone", e.target.value)} /></div>
        <div className="border-t pt-5"><p className="mb-3 text-sm font-black uppercase text-primary">{t("Chương trình", "Programme")}</p><div className="space-y-3">
          <Select value={data.courseKey} onValueChange={selectCourse}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{catalog.map((c) => <SelectItem key={c.key} value={c.key}>{c.nameVi} · {c.groupPrice} EUR</SelectItem>)}<SelectItem value="custom">{t("Khóa học tùy chỉnh", "Custom course")}</SelectItem></SelectContent></Select>
          <div className="grid gap-3 sm:grid-cols-2"><div className="space-y-2"><Label>Tên tiếng Việt</Label><Input value={data.courseNameVi} onChange={(e) => update("courseNameVi", e.target.value)} /></div><div className="space-y-2"><Label>English name</Label><Input value={data.courseNameEn} onChange={(e) => update("courseNameEn", e.target.value)} /></div></div>
          <div className="grid gap-3 sm:grid-cols-2"><div className="space-y-2"><Label>Ngôn ngữ phiếu / Notice language</Label><Select value={data.language ?? "en"} onValueChange={(v) => setNoticeLanguage(v as "en" | "vi")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="vi">Tiếng Việt</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Hình thức / Format</Label><Select value={data.classType} onValueChange={(v) => selectClassType(v as "group" | "private")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="group">Lớp nhóm / Group</SelectItem><SelectItem value="private">Kèm 1-1 / One-to-one</SelectItem></SelectContent></Select></div></div>
          <div className="space-y-2"><Label>Lịch học / Schedule</Label><Input value={data.schedule} onChange={(e) => update("schedule", e.target.value)} /></div>
          <div className="grid gap-3 sm:grid-cols-2"><div className="space-y-2"><Label>Ngày bắt đầu</Label><Input type="date" value={data.startDate} onChange={(e) => update("startDate", e.target.value)} /></div><div className="space-y-2"><Label>Ngày kết thúc</Label><Input type="date" value={data.endDate} onChange={(e) => update("endDate", e.target.value)} /></div></div>
          <div className="space-y-2"><Label>Tuần / Weeks</Label><Input type="number" min="0" value={data.weeks} onChange={(e) => update("weeks", Number(e.target.value))} /></div>
        </div></div>
        <div className="border-t pt-5"><p className="mb-3 text-sm font-black uppercase text-primary">{t("Học phí", "Tuition")}</p>
          <div className="grid gap-3 sm:grid-cols-2"><div className="space-y-2"><Label>Đơn vị tiền / Currency</Label><Select value={noticeCurrency} onValueChange={(v) => setCurrency(v as CourseNoticeData["currency"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="vnd">Việt Nam đồng / VND</SelectItem><SelectItem value="eur">Euro / EUR</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>{`Học phí / Tuition (${noticeCurrency.toUpperCase()})`}</Label><Input type="number" min="0" value={noticeCurrency === "eur" ? data.baseEur : data.baseVnd} onChange={(e) => setBaseAmount(e.target.value)} /></div></div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="space-y-2"><Label>Giảm học phí</Label><Input type="number" min="0" value={data.discountValue} onChange={(e) => update("discountValue", Number(e.target.value))} /></div><div className="space-y-2"><Select value={data.discountType} onValueChange={(v) => update("discountType", v as "percent" | "amount")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="percent">Phần trăm / Percent</SelectItem><SelectItem value="amount">Số tiền / Amount</SelectItem></SelectContent></Select></div></div>
          <div className="mt-3"><Input placeholder="Lý do ưu đãi / Reason" value={data.discountReason} onChange={(e) => update("discountReason", e.target.value)} /></div>
          {(() => { const fc = feeCurrency ?? noticeCurrency; return (
          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto_1fr] items-end"><div className="space-y-2"><Label htmlFor="extra-fee-label">Khoản phí khác / Other fee</Label><Input id="extra-fee-label" placeholder="Ví dụ: Phí phần mềm" value={data.extraFeeLabel ?? ""} onChange={(e) => update("extraFeeLabel", e.target.value)} /></div><div className="space-y-2"><Label>Đơn vị / Currency</Label><Select value={fc} onValueChange={(v) => setFeeCurrency(v as "vnd" | "eur")}><SelectTrigger className="w-28"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="vnd">VND</SelectItem><SelectItem value="eur">EUR</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label htmlFor="extra-fee-vnd">{`Số tiền / Amount (${fc.toUpperCase()})`}</Label><Input id="extra-fee-vnd" type="number" min="0" step={fc === "eur" ? "1" : "1000"} value={fc === "eur" ? (data.extraFeeEur ?? 0) : (data.extraFeeVnd ?? 0)} onChange={(e) => setExtraFeeAmount(e.target.value)} /></div></div>
          ); })()}
          {feeCurrency && feeCurrency !== noticeCurrency && extraFeeAmount > 0 && <p className="mt-1 text-xs text-muted-foreground">{`≈ ${fmtNoticeMoney(extraFeeAmount)} trên giấy báo (1 EUR = 31.000 VND)`}</p>}
          <p className="mt-3 text-xs text-muted-foreground">{noticeCurrency === "vnd" ? "VND: Vietcombank + VietQR" : "EUR: Nordea + IBAN"}</p>
          <div className="mt-3 space-y-2"><Label htmlFor="notice-payment-reference">Nội dung chuyển khoản / Payment reference</Label><Input id="notice-payment-reference" value={data.paymentReference ?? ""} onChange={(e) => update("paymentReference", e.target.value)} placeholder="Nhập nội dung riêng cho giấy báo" /></div>
          <p className="mt-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-foreground">Quý PHHS vui lòng đóng HP đầu khóa học</p>
          <p className="mt-3 border-l-4 border-primary pl-3 text-sm"><strong>{t("Học phí chính thức", "Final tuition")}:</strong> {fmtNoticeMoney(noticeCurrency === "eur" ? normalized.finalEur : normalized.finalVnd)}</p>
          {extraFeeAmount > 0 && <p className="mt-2 border-l-4 border-primary pl-3 text-sm"><strong>{t("Tổng thanh toán", "Total due")}:</strong> {fmtNoticeMoney((noticeCurrency === "eur" ? normalized.finalEur : normalized.finalVnd) + extraFeeAmount)}</p>}
        </div>
        <div className="border-t pt-5"><p className="mb-3 text-sm font-black uppercase text-primary">{t("Giảng viên", "Instructor")}</p><div className="space-y-3"><Input value={data.instructorName} onChange={(e) => update("instructorName", e.target.value)} /><Input value={data.instructorCredentials} onChange={(e) => update("instructorCredentials", e.target.value)} /><Textarea rows={2} value={data.instructorExpertise} onChange={(e) => update("instructorExpertise", e.target.value)} /></div></div>
        <div className="space-y-2"><Label>Ghi chú / Note</Label><Textarea rows={3} value={data.note} onChange={(e) => update("note", e.target.value)} /></div>
        <div className="flex flex-wrap gap-2"><Button onClick={() => void persist()} disabled={saving}><Save className="h-4 w-4" />{saving ? t("Đang lưu", "Saving") : t("Lưu bản nháp", "Save draft")}</Button><Button variant="outline" onClick={printPdf}><Download className="h-4 w-4" />PDF</Button><Button variant="secondary" onClick={() => setConfirmSend(true)} disabled={sending}><Mail className="h-4 w-4" />{t("Gửi email", "Send email")}</Button></div>
      </CardContent></Card>

      <div className="sticky top-4 min-w-0 overflow-auto rounded-md border bg-muted/30 p-3"><p className="mb-2 text-center text-xs font-semibold text-muted-foreground">{t("Nhấn trực tiếp vào phần chữ có viền chấm để chỉnh sửa", "Click dotted text directly to edit")}</p><CourseNoticeDocument ref={printRef} code={code} data={normalized} editable onChange={updateDocument} /></div>
    </div>

    <ParentLetterTemplates />

    <Card><CardHeader><CardTitle>{t("Lịch sử giấy báo", "Notice history")}</CardTitle><CardDescription>{t("Xem lại, tải lại, nhân bản hoặc gửi lại từng giấy báo.", "Review, download, duplicate or resend each notice.")}</CardDescription></CardHeader><CardContent className="space-y-4"><div className="flex flex-wrap gap-3"><div className="relative min-w-[240px] flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Tên, email, khóa học hoặc mã...", "Name, email, course or code...")} /></div><Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{t("Tất cả", "All")}</SelectItem><SelectItem value="draft">{t("Bản nháp", "Draft")}</SelectItem><SelectItem value="sent">{t("Đã gửi", "Sent")}</SelectItem></SelectContent></Select><Button variant="outline" size="icon" onClick={() => void reload()} aria-label={t("Tải lại", "Refresh")}><RefreshCw className="h-4 w-4" /></Button></div>
      {loading ? <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin" /></div> : filtered.length === 0 ? <p className="py-8 text-center text-sm text-muted-foreground">{t("Chưa có giấy báo phù hợp.", "No matching notices.")}</p> : <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-2">{t("Học viên", "Learner")}</th><th>{t("Khóa học", "Course")}</th><th>{t("Mã", "Code")}</th><th>{t("Trạng thái", "Status")}</th><th className="text-right">{t("Thao tác", "Actions")}</th></tr></thead><tbody>{filtered.map((r) => <tr key={r.id} className="border-b last:border-0"><td className="py-3"><strong>{r.recipient_name}</strong><br/><span className="text-xs text-muted-foreground">{r.recipient_email}</span></td><td>{r.snapshot.courseNameVi}</td><td className="font-mono text-xs">{r.notice_code}</td><td><Badge variant={r.status === "sent" ? "default" : "secondary"}>{r.status === "sent" ? t("Đã gửi", "Sent") : t("Bản nháp", "Draft")}</Badge>{r.send_count > 0 && <span className="ml-2 text-xs text-muted-foreground">×{r.send_count}</span>}</td><td><div className="flex justify-end gap-1"><Button size="icon" variant="ghost" onClick={() => openRecord(r)} aria-label={t("Mở", "Open")}><Eye className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={() => void duplicate(r)} aria-label={t("Nhân bản", "Duplicate")}><Copy className="h-4 w-4" /></Button></div></td></tr>)}</tbody></table></div>}
    </CardContent></Card>

    <AlertDialog open={confirmSend} onOpenChange={setConfirmSend}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{t("Xác nhận gửi giấy báo", "Confirm course notice")}</AlertDialogTitle><AlertDialogDescription>{t(`Giấy báo ${code} sẽ được gửi đến ${normalized.recipientName || "học viên"} qua ${normalized.recipientEmail || "email chưa nhập"}.`, `Notice ${code} will be sent to ${normalized.recipientName || "the learner"} at ${normalized.recipientEmail || "missing email"}.`)}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>{t("Xem lại", "Review")}</AlertDialogCancel><AlertDialogAction onClick={() => void send()}>{t("Lưu và gửi", "Save and send")}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </div>;
}
