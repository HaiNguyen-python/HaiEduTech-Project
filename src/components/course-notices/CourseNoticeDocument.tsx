import { forwardRef, type FocusEvent } from "react";
import { EUR_TO_VND, type CourseNoticeData } from "@/lib/courseNotice";

const money = (n: number, currency: "EUR" | "VND") => currency === "EUR"
  ? `${new Intl.NumberFormat("en-IE", { maximumFractionDigits: 0 }).format(n)} EUR`
  : `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n)} VND`;
const date = (value: string) => value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-GB") : "-";

interface Props {
  code: string;
  data: CourseNoticeData;
  editable?: boolean;
  onChange?: <K extends keyof CourseNoticeData>(key: K, value: CourseNoticeData[K]) => void;
}

const textFrom = (event: FocusEvent<HTMLElement>) => event.currentTarget.innerText.trim();
const hasExtraFee = (data: CourseNoticeData) => (data.extraFeeVnd ?? 0) > 0;

const CourseNoticeDocument = forwardRef<HTMLDivElement, Props>(({ code, data, editable = false, onChange }, ref) => {
  const editableProps = <K extends keyof CourseNoticeData>(key: K) => editable ? {
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: (event: FocusEvent<HTMLElement>) => onChange?.(key, textFrom(event) as CourseNoticeData[K]),
    title: "Click to edit",
  } : {};

  const updateList = (key: "modules" | "benefits", index: number, value: string) => {
    const next = [...data[key]];
    next[index] = value;
    onChange?.(key, next);
  };

  return (
  <article ref={ref} id="course-notice-print" className="course-notice mx-auto w-full max-w-[794px] overflow-hidden bg-card text-foreground shadow-xl print:max-w-none print:shadow-none">
    <div className="course-notice-top-rule" />

    <header className="course-notice-letterhead px-8 pb-5 pt-6 sm:px-11">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 items-center gap-4">
          <img src="/haiedutech-logo.jpg" alt="HaiEduTech" className="h-[76px] w-[76px] shrink-0 object-contain" />
          <div className="min-w-0">
            <p className="course-notice-brand text-2xl font-black uppercase sm:text-3xl">HaiEduTech</p>
            <p className="mt-1 text-[10px] font-bold uppercase text-muted-foreground sm:text-xs">Language & Information Technology Center</p>
          </div>
        </div>
        <div className="course-notice-meta shrink-0 border-l pl-4 text-right text-[11px] leading-5 sm:pl-6">
          <p className="font-bold uppercase text-muted-foreground">Reference</p>
          <p className="font-mono font-bold text-foreground">{code}</p>
          <p className="mt-1 font-bold uppercase text-muted-foreground">Issued</p>
          <p className="font-semibold text-foreground">{date(data.issuedAt)}</p>
        </div>
      </div>
    </header>

    <div className="px-8 pb-7 sm:px-11">
      <div className="course-notice-title-block border-y py-5 text-center">
        <p className="text-[11px] font-black uppercase">Official announcement</p>
        <h1 className="mt-2 text-2xl font-black uppercase sm:text-[28px]">Programme & Course Announcement</h1>
      </div>

      <section className="py-5">
        <p className="course-notice-kicker text-[11px] font-black uppercase">Dear</p>
        <h2 className="mt-1 text-xl font-extrabold" {...editableProps("recipientName")}>{data.recipientName || "Student name"}</h2>
        <p className="mt-1 text-xs text-muted-foreground"><span {...editableProps("recipientEmail")}>{data.recipientEmail}</span>{data.recipientEmail && data.recipientPhone ? " · " : ""}<span {...editableProps("recipientPhone")}>{data.recipientPhone}</span></p>
        <p className="mt-3 text-sm leading-6">HaiEduTech Language & Information Technology Center is pleased to share the details of a study programme designed around the learner's personal goals.</p>
      </section>

      <section className="course-notice-section break-inside-avoid border-t pt-4">
        <div className="course-notice-section-heading"><span>01</span><p>Study programme</p></div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
          <div><h3 className="text-xl font-extrabold" {...editableProps("courseNameEn")}>{data.courseNameEn || "Course name"}</h3></div>
          <p className="course-notice-format px-3 py-1 text-xs font-bold">{data.classType === "private" ? "One-to-one" : "Group class"}</p>
        </div>
        <div className="course-notice-facts mt-4 grid grid-cols-2 border text-xs sm:grid-cols-4">
          <div><span>Level</span><strong {...editableProps("level")}>{data.level || "Based on placement test"}</strong></div>
          <div><span>Duration</span><strong>{data.weeks} weeks · {data.sessions} sessions · {data.hours} hours</strong></div>
          <div><span>Start</span><strong>{date(data.startDate)}</strong></div>
          <div><span>End</span><strong>{date(data.endDate)}</strong></div>
        </div>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <p><strong>Schedule:</strong> <span {...editableProps("schedule")}>{data.schedule || "To be agreed with the learner"}</span> (<span {...editableProps("timezone")}>{data.timezone}</span>)</p>
          {data.objective && <p><strong>Outcome:</strong> <span {...editableProps("objective")}>{data.objective}</span></p>}
        </div>
      </section>

      <section className="course-notice-section mt-5 grid gap-5 break-inside-avoid border-t pt-4 sm:grid-cols-2">
        <div>
          <div className="course-notice-section-heading"><span>02</span><p>Curriculum</p></div>
          <ol className="mt-3 space-y-1.5 text-xs leading-5">{data.modules.filter(Boolean).map((item, i) => <li key={i}><strong>{String(i + 1).padStart(2, "0")}.</strong> <span contentEditable={editable} suppressContentEditableWarning onBlur={(event) => updateList("modules", i, textFrom(event))} className={editable ? "course-notice-editable" : undefined}>{item}</span></li>)}</ol>
        </div>
        <div className="sm:border-l sm:pl-5">
          <div className="course-notice-section-heading"><span>03</span><p>Included</p></div>
          <ul className="mt-3 space-y-1.5 text-xs leading-5">{data.benefits.filter(Boolean).map((item, i) => <li key={i} className="flex gap-2"><span className="course-notice-check">✓</span><span contentEditable={editable} suppressContentEditableWarning onBlur={(event) => updateList("benefits", i, textFrom(event))} className={editable ? "course-notice-editable" : undefined}>{item}</span></li>)}</ul>
        </div>
      </section>

      <section className="course-notice-fee mt-5 break-inside-avoid border p-4">
        <div className="course-notice-section-heading"><span>04</span><p>Tuition</p></div>
        <table className="mt-3 w-full table-fixed text-xs">
          <tbody>
            <tr className="border-b"><td className="py-2 font-semibold">Standard tuition</td><td className="py-2 text-right">{money(data.baseVnd, "VND")}</td><td className="py-2 text-right">{money(data.baseEur, "EUR")}</td></tr>
            <tr className="border-b"><td className="py-2 font-semibold">Discount {data.discountReason ? `(${data.discountReason})` : ""}</td><td className="py-2 text-right" colSpan={2}>{data.discountType === "percent" ? `${data.discountValue}%` : money(data.discountValue, "VND")}</td></tr>
            {hasExtraFee(data)
              ? <tr className="border-b"><td className="py-2 font-semibold">Final tuition</td><td className="py-2 text-right font-semibold">{money(data.finalVnd, "VND")}</td><td className="py-2 text-right font-semibold">{money(data.finalEur, "EUR")}</td></tr>
              : <tr><td className="py-2.5 text-sm font-extrabold">Final tuition</td><td className="course-notice-total py-2.5 text-right text-sm font-extrabold">{money(data.finalVnd, "VND")}</td><td className="course-notice-total py-2.5 text-right text-sm font-extrabold">{money(data.finalEur, "EUR")}</td></tr>}
            {hasExtraFee(data) && <tr className="border-t"><td className="py-2 font-semibold" {...editableProps("extraFeeLabel")}>{data.extraFeeLabel?.trim() || "Other fee"}</td><td className="py-2 text-right">{money(data.extraFeeVnd ?? 0, "VND")}</td><td className="py-2 text-right">{money(Math.round((data.extraFeeVnd ?? 0) / EUR_TO_VND), "EUR")}</td></tr>}
            {hasExtraFee(data) && <tr className="border-t"><td className="py-2.5 text-sm font-extrabold">Total due</td><td className="course-notice-total py-2.5 text-right text-sm font-extrabold">{money(data.finalVnd + (data.extraFeeVnd ?? 0), "VND")}</td><td className="course-notice-total py-2.5 text-right text-sm font-extrabold">{money(Math.round((data.finalVnd + (data.extraFeeVnd ?? 0)) / EUR_TO_VND), "EUR")}</td></tr>}
          </tbody>
        </table>
        <p className="course-notice-payment-note mt-2 border-l-4 px-3 py-2 text-xs font-bold">Tuition is payable at the start of the course.</p>
        <div className="course-notice-payment-grid mt-3 grid gap-2 text-xs sm:grid-cols-2">
          {(data.paymentMethod === "vietnam" || data.paymentMethod === "both") && <div className="course-notice-bank"><strong>Vietnam · VND</strong><div className="flex items-center gap-3"><dl className="min-w-0 flex-1"><div><dt>Bank</dt><dd>Vietcombank</dd></div><div><dt>Account number</dt><dd>1025536199</dd></div><div><dt>Account holder</dt><dd>NGUYEN TRAN THANH HAI</dd></div></dl><img src="/vietcombank-qr.png" alt="Vietcombank VietQR" className="course-notice-qr h-[68px] w-[68px] shrink-0 self-center" /></div></div>}
          {(data.paymentMethod === "finland" || data.paymentMethod === "both") && <div className="course-notice-bank"><strong>Finland · EUR</strong><dl><div><dt>Bank</dt><dd>Nordea</dd></div><div><dt>IBAN</dt><dd>FI09 1040 3500 5258 23</dd></div><div><dt>Account holder</dt><dd>Nguyen Tran Thanh Hai</dd></div></dl></div>}
          <div className="course-notice-reference sm:col-span-2"><span>Payment reference</span><strong {...editableProps("paymentReference")}>{data.paymentReference || "Enter payment reference"}</strong></div>
        </div>
      </section>

      <section className="course-notice-section mt-5 break-inside-avoid border-t pt-4">
        <div className="course-notice-section-heading"><span>05</span><p>Instructor</p></div>
        <div className="mt-3 grid gap-3 text-xs sm:grid-cols-[1.15fr_1fr]">
          <div><h3 className="text-base font-extrabold" {...editableProps("instructorName")}>{data.instructorName}</h3><p className="mt-1" {...editableProps("instructorCredentials")}>{data.instructorCredentials}</p><p className="whitespace-pre-wrap" {...editableProps("instructorExpertise")}>{data.instructorExpertise}</p></div>
          <div className="sm:border-l sm:pl-5"><p><strong>Phone:</strong> <span {...editableProps("instructorPhone")}>{data.instructorPhone}</span></p><p><strong>Website:</strong> <span {...editableProps("instructorWebsite")}>{data.instructorWebsite}</span></p><p><strong>Email:</strong> <span {...editableProps("instructorEmail")}>{data.instructorEmail}</span></p></div>
        </div>
      </section>

      {data.note && <section className="course-notice-note mt-4 break-inside-avoid border-l-4 px-4 py-2 text-xs leading-5"><strong>Note:</strong> <span {...editableProps("note")}>{data.note}</span></section>}
      <footer className="course-notice-footer mt-5 border-t pt-4 text-center text-[10px] leading-4 text-muted-foreground">HaiEduTech · Learn smart • Lead the digital era<br />haiedutech.com · contact@haiedutech.com · 0962.823.800</footer>
    </div>
    <div className="course-notice-bottom-rule" />
  </article>
  );
});
CourseNoticeDocument.displayName = "CourseNoticeDocument";
export default CourseNoticeDocument;