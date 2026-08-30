/**
 * @file pathReport.ts
 * @description One-page bilingual PDF of a subject's learning path, for parents
 *   and teachers. Only real numbers from the dashboard are rendered.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { SUBJECTS } from "./subjectRegistry";
import type { PathView } from "@/hooks/useLearningPath";
import type { PlanStep } from "./pathModel";

const PAGE_W = 794;
const PAGE_H = 1123;
const BRAND_BLUE = "#3B82F6";
const BRAND_EMERALD = "#10B981";
const INK = "#0F172A";
const MUTED = "#64748B";
const BORDER = "#E2E8F0";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const row = (labelVi: string, labelEn: string, value: string) => `
  <tr>
    <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};color:${MUTED};font-size:13px;width:45%">
      ${esc(labelVi)} / ${esc(labelEn)}
    </td>
    <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};color:${INK};font-size:14px;font-weight:600">
      ${esc(value)}
    </td>
  </tr>`;

function buildPage(view: PathView, studentName: string, doneKeys: Set<string>): string {
  const def = SUBJECTS[view.path.subject];
  const generated = new Date().toISOString().slice(0, 10);
  const planRows = view.plan
    .map((step: PlanStep) => {
      const done = doneKeys.has(`${step.route}|${step.titleEn}`);
      return `<li style="margin-bottom:6px;font-size:13px;color:${INK}">
        ${done ? "[x]" : "[ ]"} ${esc(step.titleVi)} / ${esc(step.titleEn)} - ${step.minutes} phút / min
      </li>`;
    })
    .join("");
  const weakRows = view.weaknesses
    .slice(0, 5)
    .map(
      (w) =>
        `<li style="margin-bottom:5px;font-size:13px;color:${INK}">${esc(w.skill)} - ${
          w.pct == null ? "chưa luyện / not practised" : `${Math.round(w.pct)}%`
        }</li>`,
    )
    .join("");

  return `
  <div style="width:${PAGE_W}px;height:${PAGE_H}px;background:#ffffff;padding:44px 48px;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid ${BRAND_BLUE};padding-bottom:12px">
      <div>
        <div style="font-size:22px;font-weight:800;color:${INK}">HaiEduTech</div>
        <div style="font-size:13px;color:${MUTED}">Lộ trình học cá nhân / Personalized learning path</div>
      </div>
      <div style="text-align:right;font-size:12px;color:${MUTED}">${esc(generated)}</div>
    </div>

    <div style="margin-top:22px">
      <div style="font-size:18px;font-weight:700;color:${INK}">${esc(studentName)} - ${esc(def.labelVi)} / ${esc(def.labelEn)}</div>
      <div style="font-size:13px;color:${MUTED};margin-top:4px">${esc(view.path.goal_label || "Chưa đặt mục tiêu / No goal set")}</div>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-top:18px">
      ${row("Trình độ hiện tại", "Current level", view.currentLevel)}
      ${row("Mục tiêu", "Target", view.path.target_level || "-")}
      ${row("Tiến tới mục tiêu", "Progress to target", `${view.readiness.progressPct}%`)}
      ${row("Dự kiến sẵn sàng", "Estimated readiness", view.readiness.weeks === 0 ? "Đã đạt / reached" : `${view.readiness.weeks} tuần / weeks (~${view.readiness.date})`)}
      ${row("Độ tin cậy dự đoán", "Forecast confidence", view.readiness.confidence)}
      ${row("Giờ học cam kết mỗi tuần", "Committed hours per week", `${view.path.hours_per_week}h`)}
      ${row("Số phút học 7 ngày qua", "Minutes in last 7 days", String(view.minutesLast7))}
      ${row("Số ngày học trong 30 ngày", "Active days in 30 days", String(view.activeDays30))}
      ${row("Từ vựng đã thuộc", "Words mastered", String(view.vocabMastered))}
      ${row("Mục cần ôn", "Items due for review", String(view.dueReviews))}
    </table>

    <div style="margin-top:22px">
      <div style="font-size:15px;font-weight:700;color:${BRAND_EMERALD};margin-bottom:8px">Kế hoạch tuần này / This week's plan</div>
      <ul style="margin:0;padding-left:18px">${planRows || "<li style='font-size:13px'>-</li>"}</ul>
    </div>

    <div style="margin-top:20px">
      <div style="font-size:15px;font-weight:700;color:${BRAND_EMERALD};margin-bottom:8px">Cần cải thiện / Focus areas</div>
      <ul style="margin:0;padding-left:18px">${weakRows || "<li style='font-size:13px'>-</li>"}</ul>
    </div>

    <div style="margin-top:20px;padding:12px 14px;border:1px solid ${BORDER};border-radius:8px">
      <div style="font-size:12px;color:${MUTED};margin-bottom:4px">Cách tính / How this is calculated</div>
      <div style="font-size:13px;color:${INK}">${esc(view.explain.vi)}</div>
      <div style="font-size:13px;color:${MUTED};margin-top:4px">${esc(view.explain.en)}</div>
    </div>

    <div style="position:absolute;bottom:36px;font-size:11px;color:${MUTED}">
      © 2026 HaiEduTech, ILC. Học thông minh - Dẫn đầu kỷ nguyên số.
    </div>
  </div>`;
}

export async function exportPathPdf(
  view: PathView,
  studentName: string,
  doneKeys: Set<string>,
): Promise<void> {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ]);

  const holder = document.createElement("div");
  holder.style.position = "fixed";
  holder.style.left = "-10000px";
  holder.style.top = "0";
  holder.style.width = `${PAGE_W}px`;
  holder.style.background = "#ffffff";
  holder.innerHTML = buildPage(view, studentName, doneKeys);
  document.body.appendChild(holder);

  try {
    const pdf = new jsPDF("p", "mm", "a4");
    const canvas = await html2canvas(holder.firstElementChild as HTMLElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      windowWidth: PAGE_W,
      windowHeight: PAGE_H,
    });
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 0.94),
      "JPEG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight(),
    );
    const safe = studentName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-");
    pdf.save(`HaiEduTech-LearningPath-${view.path.subject}-${safe}.pdf`);
  } finally {
    document.body.removeChild(holder);
  }
}
