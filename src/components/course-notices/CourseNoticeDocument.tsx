import { forwardRef } from "react";
import type { CourseNoticeData } from "@/lib/courseNotice";
import logoAsset from "@/assets/haiedutech-course-notice-logo.png.asset.json";

const money = (n: number, currency: "EUR" | "VND") => currency === "EUR"
  ? `${new Intl.NumberFormat("en-IE", { maximumFractionDigits: 0 }).format(n)} EUR`
  : `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(n)}đ`;
const date = (value: string) => value ? new Date(`${value}T00:00:00`).toLocaleDateString("vi-VN") : "-";

interface Props { code: string; data: CourseNoticeData }

const CourseNoticeDocument = forwardRef<HTMLDivElement, Props>(({ code, data }, ref) => (
  <article ref={ref} id="course-notice-print" className="course-notice mx-auto w-full max-w-[794px] overflow-hidden bg-card text-foreground shadow-xl print:max-w-none print:shadow-none">
    <div className="course-notice-top-rule" />

    <header className="course-notice-letterhead px-8 pb-5 pt-6 sm:px-11">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 items-center gap-4">
          <img src={logoAsset.url} alt="HaiEduTech" className="h-[76px] w-[76px] shrink-0 object-contain" />
          <div className="min-w-0">
            <p className="course-notice-brand text-2xl font-black uppercase sm:text-3xl">HaiEduTech</p>
            <p className="mt-1 text-[10px] font-bold uppercase text-muted-foreground sm:text-xs">Trung tâm Ngoại ngữ & Tin học</p>
            <p className="mt-1 text-[10px] font-medium text-muted-foreground">Language & Information Technology Center</p>
          </div>
        </div>
        <div className="course-notice-meta shrink-0 border-l pl-4 text-right text-[11px] leading-5 sm:pl-6">
          <p className="font-bold uppercase text-muted-foreground">Mã giấy báo / Reference</p>
          <p className="font-mono font-bold text-foreground">{code}</p>
          <p className="mt-1 font-bold uppercase text-muted-foreground">Ngày phát hành / Issued</p>
          <p className="font-semibold text-foreground">{date(data.issuedAt)}</p>
        </div>
      </div>
    </header>

    <div className="px-8 pb-7 sm:px-11">
      <div className="course-notice-title-block border-y py-5 text-center">
        <p className="text-[11px] font-black uppercase">Thông báo chính thức / Official announcement</p>
        <h1 className="mt-2 text-2xl font-black uppercase sm:text-[28px]">Giấy báo chương trình & khóa học</h1>
        <p className="mt-1 text-sm font-bold uppercase">Programme & Course Announcement</p>
      </div>

      <section className="py-5">
        <p className="course-notice-kicker text-[11px] font-black uppercase">Kính gửi / Dear</p>
        <h2 className="mt-1 text-xl font-black">{data.recipientName || "Tên học viên / Student name"}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{[data.recipientEmail, data.recipientPhone].filter(Boolean).join(" · ")}</p>
        <p className="mt-3 text-sm leading-6">Trung tâm Ngoại ngữ & Tin học HaiEduTech trân trọng gửi đến quý PHHS thông tin chương trình học được thiết kế theo mục tiêu cá nhân.</p>
      </section>

      <section className="course-notice-section break-inside-avoid border-t pt-4">
        <div className="course-notice-section-heading"><span>01</span><p>Chương trình học / Study programme</p></div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
          <div><h3 className="text-xl font-black">{data.courseNameVi || "Tên khóa học"}</h3><p className="text-sm font-semibold text-muted-foreground">{data.courseNameEn}</p></div>
          <p className="course-notice-format px-3 py-1 text-xs font-bold">{data.classType === "private" ? "Kèm 1-1 / One-to-one" : "Lớp nhóm / Group class"}</p>
        </div>
        <div className="course-notice-facts mt-4 grid grid-cols-2 border text-xs sm:grid-cols-4">
          <div><span>Trình độ / Level</span><strong>{data.level || "Theo đánh giá đầu vào"}</strong></div>
          <div><span>Thời lượng / Duration</span><strong>{data.weeks} tuần · {data.sessions} buổi · {data.hours} giờ</strong></div>
          <div><span>Bắt đầu / Start</span><strong>{date(data.startDate)}</strong></div>
          <div><span>Kết thúc / End</span><strong>{date(data.endDate)}</strong></div>
        </div>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <p><strong>Lịch học / Schedule:</strong> {data.schedule || "Thống nhất cùng học viên"} ({data.timezone})</p>
          {data.objective && <p><strong>Mục tiêu / Outcome:</strong> {data.objective}</p>}
        </div>
      </section>

      <section className="course-notice-section mt-5 grid gap-5 break-inside-avoid border-t pt-4 sm:grid-cols-2">
        <div>
          <div className="course-notice-section-heading"><span>02</span><p>Lộ trình / Curriculum</p></div>
          <ol className="mt-3 space-y-1.5 text-xs leading-5">{data.modules.filter(Boolean).map((item, i) => <li key={`${item}-${i}`}><strong>{String(i + 1).padStart(2, "0")}.</strong> {item}</li>)}</ol>
        </div>
        <div className="sm:border-l sm:pl-5">
          <div className="course-notice-section-heading"><span>03</span><p>Quyền lợi / Included</p></div>
          <ul className="mt-3 space-y-1.5 text-xs leading-5">{data.benefits.filter(Boolean).map((item, i) => <li key={`${item}-${i}`} className="flex gap-2"><span className="course-notice-check">✓</span><span>{item}</span></li>)}</ul>
        </div>
      </section>

      <section className="course-notice-fee mt-5 break-inside-avoid border p-4">
        <div className="course-notice-section-heading"><span>04</span><p>Học phí / Tuition</p></div>
        <table className="mt-3 w-full table-fixed text-xs">
          <tbody>
            <tr className="border-b"><td className="py-2 font-semibold">Học phí niêm yết / Standard tuition</td><td className="py-2 text-right">{money(data.baseEur, "EUR")}</td><td className="py-2 text-right">{money(data.baseVnd, "VND")}</td></tr>
            <tr className="border-b"><td className="py-2 font-semibold">Ưu đãi / Discount {data.discountReason ? `(${data.discountReason})` : ""}</td><td className="py-2 text-right" colSpan={2}>{data.discountType === "percent" ? `${data.discountValue}%` : money(data.discountValue, "VND")}</td></tr>
            <tr><td className="py-2.5 text-sm font-black">Học phí chính thức / Final tuition</td><td className="course-notice-total py-2.5 text-right text-sm font-black">{money(data.finalEur, "EUR")}</td><td className="course-notice-total py-2.5 text-right text-sm font-black">{money(data.finalVnd, "VND")}</td></tr>
          </tbody>
        </table>
        <p className="course-notice-payment-note mt-2 border-l-4 px-3 py-2 text-xs font-bold">Học phí được đóng đầu khóa học.</p>
        <div className="mt-2 grid gap-x-4 gap-y-1 text-xs sm:grid-cols-2">
          {(data.paymentMethod === "vietnam" || data.paymentMethod === "both") && <p><strong>Việt Nam:</strong> Vietcombank · 1025536199 · NGUYEN TRAN THANH HAI</p>}
          {(data.paymentMethod === "finland" || data.paymentMethod === "both") && <p><strong>Finland:</strong> Nordea · FI09 1040 3500 5258 23 · Nguyen Tran Thanh Hai</p>}
          <p className="sm:col-span-2"><strong>Nội dung / Reference:</strong> {data.courseNameEn.replace(/\s+/g, "_")}_{data.recipientName.replace(/\s+/g, "_")}</p>
        </div>
      </section>

      <section className="course-notice-section mt-5 break-inside-avoid border-t pt-4">
        <div className="course-notice-section-heading"><span>05</span><p>Thông tin giảng viên / Instructor</p></div>
        <div className="mt-3 grid gap-3 text-xs sm:grid-cols-[1.15fr_1fr]">
          <div><h3 className="text-base font-black">{data.instructorName}</h3><p className="mt-1">{data.instructorCredentials}</p><p>{data.instructorExpertise}</p></div>
          <div className="sm:border-l sm:pl-5"><p><strong>Điện thoại / Phone:</strong> {data.instructorPhone}</p><p><strong>Website:</strong> {data.instructorWebsite}</p><p><strong>Email:</strong> {data.instructorEmail}</p></div>
        </div>
      </section>

      {data.note && <section className="course-notice-note mt-4 break-inside-avoid border-l-4 px-4 py-2 text-xs leading-5"><strong>Ghi chú / Note:</strong> {data.note}</section>}
      <footer className="course-notice-footer mt-5 border-t pt-4 text-center text-[10px] leading-4 text-muted-foreground">HaiEduTech · Học thông minh • Dẫn đầu kỷ nguyên số<br />haiedutech.com · contact@haiedutech.com · 0962.823.800</footer>
    </div>
    <div className="course-notice-bottom-rule" />
  </article>
));
CourseNoticeDocument.displayName = "CourseNoticeDocument";
export default CourseNoticeDocument;