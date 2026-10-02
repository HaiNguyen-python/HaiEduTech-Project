import { forwardRef } from "react";
import type { CourseNoticeData } from "@/lib/courseNotice";

const money = (n: number, currency: "EUR" | "VND") => currency === "EUR"
  ? `${new Intl.NumberFormat("en-IE", { maximumFractionDigits: 0 }).format(n)} EUR`
  : `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(n)}đ`;
const date = (value: string) => value ? new Date(`${value}T00:00:00`).toLocaleDateString("vi-VN") : "-";

interface Props { code: string; data: CourseNoticeData }

const CourseNoticeDocument = forwardRef<HTMLDivElement, Props>(({ code, data }, ref) => (
  <article ref={ref} id="course-notice-print" className="mx-auto w-full max-w-[794px] bg-background text-foreground shadow-xl print:max-w-none print:shadow-none">
    <header className="border-b-4 border-primary bg-primary px-8 py-7 text-primary-foreground sm:px-12">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-extrabold uppercase">HaiEduTech</p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">GIẤY BÁO CHƯƠNG TRÌNH & KHÓA HỌC</h1>
          <p className="mt-1 text-sm font-semibold">PROGRAMME & COURSE OFFER</p>
        </div>
        <div className="text-right text-xs leading-5"><strong>{code}</strong><br />Ngày / Date: {date(data.issuedAt)}</div>
      </div>
    </header>

    <div className="space-y-7 px-8 py-8 sm:px-12">
      <section>
        <p className="text-xs font-black uppercase text-primary">Kính gửi / Dear</p>
        <h2 className="mt-1 text-2xl font-black">{data.recipientName || "Tên học viên / Student name"}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{[data.recipientEmail, data.recipientPhone].filter(Boolean).join(" · ")}</p>
        <p className="mt-4 text-sm leading-6">HaiEduTech trân trọng gửi đến học viên thông tin chương trình học được thiết kế theo mục tiêu cá nhân. / HaiEduTech is pleased to present the programme designed around the learner's goals.</p>
      </section>

      <section className="break-inside-avoid border-y py-5">
        <p className="text-xs font-black uppercase text-primary">Chương trình học / Study programme</p>
        <h3 className="mt-2 text-xl font-black">{data.courseNameVi || "Tên khóa học"}</h3>
        <p className="font-semibold text-muted-foreground">{data.courseNameEn}</p>
        <div className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          <p><strong>Hình thức / Format:</strong> {data.classType === "private" ? "Kèm 1-1 / One-to-one" : "Lớp nhóm / Group class"}</p>
          <p><strong>Trình độ / Level:</strong> {data.level || "Theo đánh giá đầu vào"}</p>
          <p><strong>Thời gian / Duration:</strong> {data.weeks} tuần · {data.sessions} buổi · {data.hours} giờ</p>
          <p><strong>Ngày học / Dates:</strong> {date(data.startDate)} - {date(data.endDate)}</p>
          <p className="sm:col-span-2"><strong>Lịch học / Schedule:</strong> {data.schedule || "Thống nhất cùng học viên"} ({data.timezone})</p>
          {data.objective && <p className="sm:col-span-2"><strong>Mục tiêu / Outcome:</strong> {data.objective}</p>}
        </div>
      </section>

      <section className="grid gap-6 break-inside-avoid sm:grid-cols-2">
        <div>
          <p className="text-xs font-black uppercase text-primary">Lộ trình / Curriculum</p>
          <ol className="mt-3 space-y-2 text-sm leading-5">{data.modules.filter(Boolean).map((item, i) => <li key={`${item}-${i}`}><strong>{i + 1}.</strong> {item}</li>)}</ol>
        </div>
        <div>
          <p className="text-xs font-black uppercase text-primary">Quyền lợi / Included</p>
          <ul className="mt-3 space-y-2 text-sm leading-5">{data.benefits.filter(Boolean).map((item, i) => <li key={`${item}-${i}`}>✓ {item}</li>)}</ul>
        </div>
      </section>

      <section className="break-inside-avoid border bg-muted/30 p-5">
        <p className="text-xs font-black uppercase text-primary">Học phí / Tuition</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <tbody>
              <tr className="border-b"><td className="py-2 font-semibold">Học phí niêm yết / Standard tuition</td><td className="py-2 text-right">{money(data.baseEur, "EUR")}</td><td className="py-2 text-right">{money(data.baseVnd, "VND")}</td></tr>
              <tr className="border-b"><td className="py-2 font-semibold">Ưu đãi / Discount {data.discountReason ? `(${data.discountReason})` : ""}</td><td className="py-2 text-right" colSpan={2}>{data.discountType === "percent" ? `${data.discountValue}%` : money(data.discountValue, "VND")}</td></tr>
              <tr><td className="py-3 text-base font-black">Học phí chính thức / Final tuition</td><td className="py-3 text-right text-base font-black text-primary">{money(data.finalEur, "EUR")}</td><td className="py-3 text-right text-base font-black text-primary">{money(data.finalVnd, "VND")}</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm"><strong>Hạn thanh toán / Payment deadline:</strong> {date(data.paymentDeadline)}</p>
        {(data.paymentMethod === "vietnam" || data.paymentMethod === "both") && <p className="mt-2 text-sm"><strong>Việt Nam:</strong> Vietcombank · 1025536199 · NGUYEN TRAN THANH HAI</p>}
        {(data.paymentMethod === "finland" || data.paymentMethod === "both") && <p className="mt-1 text-sm"><strong>Finland:</strong> Nordea · FI09 1040 3500 5258 23 · Nguyen Tran Thanh Hai</p>}
        <p className="mt-1 text-sm"><strong>Nội dung / Reference:</strong> {data.courseNameEn.replace(/\s+/g, "_")}_{data.recipientName.replace(/\s+/g, "_")}</p>
      </section>

      <section className="break-inside-avoid">
        <p className="text-xs font-black uppercase text-primary">Thông tin giảng viên / Instructor</p>
        <h3 className="mt-2 text-lg font-black">{data.instructorName}</h3>
        <p className="mt-1 text-sm">{data.instructorCredentials}</p>
        <p className="text-sm">{data.instructorExpertise}</p>
        <p className="mt-2 text-sm">Zalo: {data.instructorPhone} · {data.instructorWebsite} · {data.instructorEmail}</p>
      </section>

      {data.note && <section className="break-inside-avoid border-l-4 border-primary pl-4 text-sm leading-6"><strong>Ghi chú / Note:</strong> {data.note}</section>}
      <footer className="border-t pt-5 text-center text-xs leading-5 text-muted-foreground">HaiEduTech · Học thông minh • Dẫn đầu kỷ nguyên số<br />haiedutech.com · contact@haiedutech.com · 0962.823.800</footer>
    </div>
  </article>
));
CourseNoticeDocument.displayName = "CourseNoticeDocument";
export default CourseNoticeDocument;
