import { forwardRef, type FocusEvent } from "react";
import { EUR_TO_VND, type CourseNoticeData } from "@/lib/courseNotice";

const money = (n: number, currency: "EUR" | "VND") => currency === "EUR"
  ? `${new Intl.NumberFormat("en-IE", { maximumFractionDigits: 2 }).format(n)} EUR`
  : `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n)} VND`;
const date = (value: string) => value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-GB") : "-";

interface Props {
  code: string;
  data: CourseNoticeData;
  editable?: boolean;
  onChange?: <K extends keyof CourseNoticeData>(key: K, value: CourseNoticeData[K]) => void;
}

const textFrom = (event: FocusEvent<HTMLElement>) => event.currentTarget.innerText.trim();
const hasExtraFee = (data: CourseNoticeData) => (data.extraFeeVnd ?? 0) > 0 || (data.extraFeeEur ?? 0) > 0;

const CourseNoticeDocument = forwardRef<HTMLDivElement, Props>(({ code, data, editable = false, onChange }, ref) => {
  const editableProps = <K extends keyof CourseNoticeData>(key: K) => editable ? {
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: (event: FocusEvent<HTMLElement>) => onChange?.(key, textFrom(event) as CourseNoticeData[K]),
    title: "Click to edit",
  } : {};

  const isVi = data.language === "vi";
  const copy = isVi ? {
    center: "Trung tâm Ngoại ngữ & Tin học",
    title: "Thông Tin Khóa Học", learner: "Tên học viên",
    programme: "Chương trình học", course: "Tên khóa học", private: "Kèm 1-1", group: "Lớp nhóm",
    schedule: "Lịch học", scheduleFallback: "Thỏa thuận với học viên", duration: "Thời lượng", start: "Bắt đầu", end: "Kết thúc",
    weeks: "tuần", sessions: "buổi", hours: "giờ", tuition: "Học phí", standard: "Học phí tiêu chuẩn", discount: "Ưu đãi",
    final: "Học phí chính thức", otherFee: "Khoản phí khác", total: "Tổng thanh toán", paymentNote: "Quý PHHS vui lòng đóng HP đầu khóa học",
    vietnam: "Việt Nam · VND", finland: "Phần Lan · EUR", bank: "Ngân hàng", accountNumber: "Số tài khoản", accountHolder: "Chủ tài khoản",
    paymentReference: "Nội dung chuyển khoản", paymentFallback: "Nhập nội dung chuyển khoản", instructor: "Giảng viên", phone: "Điện thoại", website: "Website", email: "Email", note: "Ghi chú",
    slogan: "Học thông minh • Dẫn đầu kỷ nguyên số",
  } : {
    center: "Language & Information Technology Center",
    title: "Course Information", learner: "Student name",
    programme: "Study programme", course: "Course name", private: "One-to-one", group: "Group class",
    schedule: "Schedule", scheduleFallback: "To be agreed with the learner", duration: "Duration", start: "Start", end: "End",
    weeks: "weeks", sessions: "sessions", hours: "hours", tuition: "Tuition", standard: "Standard tuition", discount: "Discount",
    final: "Final tuition", otherFee: "Other fee", total: "Total due", paymentNote: "Tuition is payable at the start of the course.",
    vietnam: "Vietnam · VND", finland: "Finland · EUR", bank: "Bank", accountNumber: "Account number", accountHolder: "Account holder",
    paymentReference: "Payment reference", paymentFallback: "Enter payment reference", instructor: "Instructor", phone: "Phone", website: "Website", email: "Email", note: "Note",
    slogan: "Learn smart • Lead the digital era",
  };
  const cur: "EUR" | "VND" = data.currency === "eur" ? "EUR" : "VND";
  const amount = (n: number) => money(n, cur);
  const toEur = (n: number) => Math.round(n / EUR_TO_VND * 100) / 100;
  const extraAmount = cur === "EUR" ? (data.extraFeeEur ?? toEur(data.extraFeeVnd ?? 0)) : (data.extraFeeVnd ?? 0);
  const finalAmount = cur === "EUR" ? data.finalEur : data.finalVnd;

  return (
  <article ref={ref} id="course-notice-print" className="course-notice mx-auto w-full max-w-[794px] overflow-hidden bg-card text-foreground shadow-xl print:max-w-none print:shadow-none">
    <div className="course-notice-top-rule" />

    <header className="course-notice-letterhead px-8 pb-5 pt-16 sm:px-11">
      <div className="flex items-center gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <img src="/haiedutech-logo.jpg" alt="HaiEduTech" className="h-[76px] w-[76px] shrink-0 object-contain" />
          <div className="min-w-0">
            <p className="course-notice-brand leading-none">HaiEduTech</p>
            <p className="mt-1 text-[11px] font-bold uppercase text-muted-foreground sm:text-sm">{copy.center}</p>
          </div>
        </div>
      </div>
    </header>

    <div className="px-8 pb-7 sm:px-11">
      <div className="course-notice-title-block border-y py-5 text-center">
        <h1 className="text-[28px] font-black sm:text-[32px]">{copy.title}</h1>
      </div>

      <section className="course-notice-recipient pb-5 pt-7">
        <h2 className="text-xl font-extrabold sm:text-[22px]" {...editableProps("recipientName")}>{data.recipientName || copy.learner}</h2>
        <p className="mt-1 text-xs text-muted-foreground"><span {...editableProps("recipientEmail")}>{data.recipientEmail}</span>{data.recipientEmail && data.recipientPhone ? " · " : ""}<span {...editableProps("recipientPhone")}>{data.recipientPhone}</span></p>
      </section>

      <section className="course-notice-section break-inside-avoid border-t pt-4">
        <div className="course-notice-section-heading"><span>01</span><p>{copy.programme}</p></div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
          <div><h3 className="text-2xl font-extrabold" {...editableProps(isVi ? "courseNameVi" : "courseNameEn")}>{(isVi ? data.courseNameVi : data.courseNameEn) || copy.course}</h3></div>
          <p className="course-notice-format px-3 py-1 text-sm font-bold">{data.classType === "private" ? copy.private : copy.group}</p>
        </div>
        <div className="course-notice-facts mt-4 grid grid-cols-2 border text-sm sm:grid-cols-[1.6fr_1.2fr_1fr_1fr]">
          <div><span>{copy.schedule}</span><strong className="course-notice-schedule" {...editableProps("schedule")}>{data.schedule || copy.scheduleFallback}</strong></div>
          <div><span>{copy.duration}</span><strong>{data.weeks} {copy.weeks}</strong></div>
          <div><span>{copy.start}</span><strong>{date(data.startDate)}</strong></div>
          <div><span>{copy.end}</span><strong>{date(data.endDate)}</strong></div>
        </div>
      </section>

      <section className="course-notice-fee mt-5 break-inside-avoid border p-4">
        <div className="course-notice-section-heading"><span>02</span><p>{copy.tuition}</p></div>
        <table className="mt-3 w-full table-fixed text-sm">
          <tbody>
            <tr className="border-b"><td className="py-2 font-semibold">{copy.standard}</td><td className="py-2 text-right">{amount(cur === "EUR" ? data.baseEur : data.baseVnd)}</td></tr>
            <tr className="border-b"><td className="py-2 font-semibold">{copy.discount} {data.discountReason ? `(${data.discountReason})` : ""}</td><td className="py-2 text-right">{data.discountType === "percent" ? `${data.discountValue}%` : amount(data.discountValue)}</td></tr>
            {hasExtraFee(data)
              ? <tr className="border-b"><td className="py-2 font-semibold">{copy.final}</td><td className="py-2 text-right font-semibold">{amount(finalAmount)}</td></tr>
              : <tr><td className="py-2.5 text-base font-extrabold">{copy.final}</td><td className="course-notice-total py-2.5 text-right text-base font-extrabold">{amount(finalAmount)}</td></tr>}
            {hasExtraFee(data) && <tr className="border-t"><td className="py-2 font-semibold" {...editableProps("extraFeeLabel")}>{data.extraFeeLabel?.trim() || copy.otherFee}</td><td className="py-2 text-right">{amount(extraAmount)}</td></tr>}
            {hasExtraFee(data) && <tr className="border-t"><td className="py-2.5 text-base font-extrabold">{copy.total}</td><td className="course-notice-total py-2.5 text-right text-base font-extrabold">{amount(finalAmount + extraAmount)}</td></tr>}
          </tbody>
        </table>
        <p className="course-notice-payment-note mt-2 border-l-4 px-3 py-2 text-sm font-bold">{copy.paymentNote}</p>
        <div className="course-notice-payment-grid mt-3 grid gap-2 text-sm">
          {cur === "VND" ? <div className="course-notice-bank"><strong>{copy.vietnam}</strong><div className="flex flex-wrap items-center gap-3"><dl className="min-w-[150px] flex-1"><div><dt>{copy.bank}</dt><dd>Vietcombank</dd></div><div><dt>{copy.accountNumber}</dt><dd>1025536199</dd></div><div><dt>{copy.accountHolder}</dt><dd>NGUYEN TRAN THANH HAI</dd></div></dl><img src="/vietcombank-qr.png" alt="Vietcombank VietQR" className="course-notice-qr h-[76px] w-[76px] shrink-0 self-center" /></div></div>
            : <div className="course-notice-bank"><strong>{copy.finland}</strong><dl><div><dt>{copy.bank}</dt><dd>Nordea</dd></div><div><dt>IBAN</dt><dd>FI09 1040 3500 5258 23</dd></div><div><dt>{copy.accountHolder}</dt><dd>Nguyen Tran Thanh Hai</dd></div></dl></div>}
          <div className="course-notice-reference"><span>{copy.paymentReference}</span><strong {...editableProps("paymentReference")}>{data.paymentReference || copy.paymentFallback}</strong></div>
        </div>
      </section>

      <section className="course-notice-section mt-5 break-inside-avoid border-t pt-4">
        <div className="course-notice-section-heading"><span>03</span><p>{copy.instructor}</p></div>
        <div className="mt-3 grid gap-3 text-sm sm:grid-cols-[1.15fr_1fr]">
          <div><h3 className="text-base font-extrabold" {...editableProps("instructorName")}>{data.instructorName}</h3><p className="mt-1" {...editableProps("instructorCredentials")}>{data.instructorCredentials}</p><p className="whitespace-pre-wrap" {...editableProps("instructorExpertise")}>{data.instructorExpertise}</p></div>
          <div className="sm:border-l sm:pl-5"><p><strong>{copy.phone}:</strong> <span {...editableProps("instructorPhone")}>{data.instructorPhone}</span></p><p><strong>{copy.website}:</strong> <span {...editableProps("instructorWebsite")}>{data.instructorWebsite}</span></p><p><strong>{copy.email}:</strong> <span {...editableProps("instructorEmail")}>{data.instructorEmail}</span></p></div>
        </div>
      </section>

      {data.note && <section className="course-notice-note mt-4 break-inside-avoid border-l-4 px-4 py-2 text-sm leading-6"><strong>{copy.note}:</strong> <span {...editableProps("note")}>{data.note}</span></section>}
      <footer className="course-notice-footer mt-5 border-t pt-4 text-center text-xs leading-5 text-muted-foreground">HaiEduTech · {copy.slogan}<br />haiedutech.com · contact@haiedutech.com · 0962.823.800</footer>
    </div>
    <div className="course-notice-bottom-rule" />
  </article>
  );
});
CourseNoticeDocument.displayName = "CourseNoticeDocument";
export default CourseNoticeDocument;
