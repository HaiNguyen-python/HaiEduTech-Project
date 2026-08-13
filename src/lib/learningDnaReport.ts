/**
 * @file learningDnaReport.ts
 * @description Builds the bilingual "Learning DNA" progress report (HTML pages ->
 *              multi-page A4 PDF) for a single student, using only real rows from
 *              public.student_activity_log. Nothing is invented: any missing metric
 *              is rendered as "Chưa có dữ liệu / No data".
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import { supabase } from "@/integrations/supabase/client";
import { SPEAKING_ACTIVITY_TYPES, WRITING_ACTIVITY_TYPES, isLearningActivity } from "@/lib/adminData";

export type ReportPeriod = "30d" | "90d" | "all";

const BRAND_BLUE = "#3B82F6";
const BRAND_EMERALD = "#10B981";
const INK = "#0F172A";
const MUTED = "#64748B";
const BORDER = "#E2E8F0";

// A4 at 96dpi -> 794 x 1123 px.
const PAGE_W = 794;
const PAGE_H = 1123;

interface RawRow {
  activity_type: string;
  domain: string | null;
  score: number | null;
  max_score: number | null;
  time_spent_seconds: number | null;
  created_at: string;
}

export interface ReportData {
  studentName: string;
  period: ReportPeriod;
  periodLabelVi: string;
  periodLabelEn: string;
  generatedAt: Date;
  totalActivities: number;
  avgScore10: number | null;
  studySeconds: number;
  activeDays: number;
  bestStreak: number;
  trend: "improving" | "declining" | "stable" | "unknown";
  trendDelta: number;
  lastActiveAt: Date | null;
  domains: Array<{ key: string; labelVi: string; labelEn: string; count: number; avg: number | null; color: string }>;
  skills: Array<{ type: string; count: number; avg: number | null; lastAt: Date | null }>;
  radar: Array<{ label: string; value: number }>;
  timeline: Array<{ label: string; avg: number | null; count: number }>;
  speakingCount: number;
  writingCount: number;
  ieltsSpeakingBand: number | null;
  ieltsWritingBand: number | null;
  strengths: Array<{ type: string; avg: number }>;
  weaknesses: Array<{ type: string; avg: number }>;
  notesVi: string[];
  notesEn: string[];
}

const DOMAIN_META: Record<string, { vi: string; en: string; color: string }> = {
  english: { vi: "Tiếng Anh", en: "English", color: BRAND_BLUE },
  chinese: { vi: "Tiếng Trung", en: "Chinese", color: "#EF4444" },
  programming: { vi: "Lập trình", en: "Programming", color: BRAND_EMERALD },
};

function periodStart(period: ReportPeriod): Date | null {
  if (period === "all") return null;
  const days = period === "30d" ? 30 : 90;
  return new Date(Date.now() - days * 86400000);
}

export function prettyType(type: string): string {
  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bIelts\b/g, "IELTS")
    .replace(/\bToeic\b/g, "TOEIC")
    .replace(/\bHsk\b/g, "HSK")
    .replace(/\bHskk\b/g, "HSKK")
    .replace(/\bSat\b/g, "SAT")
    .replace(/\bPte\b/g, "PTE")
    .replace(/\bThpt\b/g, "THPT")
    .replace(/\bVff\b/g, "VFF")
    .replace(/\bYki\b/g, "YKI")
    .replace(/\bAi\b/g, "AI");
}

function fmtDuration(sec: number): string {
  if (!sec || sec < 60) return sec > 0 ? "<1m" : "0m";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function fmtDate(d: Date | null): string {
  return d ? d.toLocaleDateString("vi-VN") : "-";
}

/** Fetch every logged row for the student and aggregate the report metrics. */
export async function buildReportData(
  userId: string,
  studentName: string,
  period: ReportPeriod,
): Promise<ReportData> {
  const start = periodStart(period);
  let query = supabase
    .from("student_activity_log")
    .select("activity_type,domain,score,max_score,time_spent_seconds,created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(20000);
  if (start) query = query.gte("created_at", start.toISOString());

  const { data, error } = await query;
  if (error) throw error;

  const all = (data || []) as RawRow[];
  const learning = all.filter((r) => isLearningActivity(r.activity_type));

  // Rows with a usable numeric score (same rule as the RL engine).
  const scored = learning.filter(
    (r) => r.score != null && r.max_score != null && (r.max_score ?? 0) > 0 && !(r.max_score === 1 && r.score === 0),
  );
  const norm = (r: RawRow) => ((r.score as number) / (r.max_score as number)) * 10;

  const avgScore10 = scored.length ? Math.round((scored.reduce((s, r) => s + norm(r), 0) / scored.length) * 10) / 10 : null;
  const studySeconds = all.reduce((s, r) => s + (r.time_spent_seconds || 0), 0);

  const dayKeys = Array.from(new Set(all.map((r) => r.created_at.slice(0, 10)))).sort();
  const activeDays = dayKeys.length;

  // Longest consecutive-day streak inside the period.
  let bestStreak = 0;
  let run = 0;
  let prev: number | null = null;
  for (const key of dayKeys) {
    const ts = new Date(key + "T00:00:00Z").getTime();
    run = prev !== null && ts - prev === 86400000 ? run + 1 : 1;
    prev = ts;
    if (run > bestStreak) bestStreak = run;
  }

  // Trend: second half average vs first half average of scored rows.
  let trend: ReportData["trend"] = "unknown";
  let trendDelta = 0;
  if (scored.length >= 6) {
    const mid = Math.floor(scored.length / 2);
    const first = scored.slice(0, mid);
    const second = scored.slice(mid);
    const a = first.reduce((s, r) => s + norm(r), 0) / first.length;
    const b = second.reduce((s, r) => s + norm(r), 0) / second.length;
    trendDelta = Math.round((b - a) * 10) / 10;
    trend = trendDelta > 0.4 ? "improving" : trendDelta < -0.4 ? "declining" : "stable";
  }

  // Domain aggregation.
  const domainAgg: Record<string, { count: number; total: number; scoredCount: number }> = {
    english: { count: 0, total: 0, scoredCount: 0 },
    chinese: { count: 0, total: 0, scoredCount: 0 },
    programming: { count: 0, total: 0, scoredCount: 0 },
  };
  for (const r of learning) {
    const key = r.domain && r.domain in domainAgg ? r.domain : "english";
    domainAgg[key].count++;
    if (scored.includes(r)) {
      domainAgg[key].total += norm(r);
      domainAgg[key].scoredCount++;
    }
  }
  const domains = Object.entries(domainAgg).map(([key, v]) => ({
    key,
    labelVi: DOMAIN_META[key].vi,
    labelEn: DOMAIN_META[key].en,
    color: DOMAIN_META[key].color,
    count: v.count,
    avg: v.scoredCount ? Math.round((v.total / v.scoredCount) * 10) / 10 : null,
  }));

  // Skill (activity type) aggregation.
  const skillAgg: Record<string, { count: number; total: number; scoredCount: number; lastAt: number }> = {};
  for (const r of learning) {
    const s = (skillAgg[r.activity_type] ||= { count: 0, total: 0, scoredCount: 0, lastAt: 0 });
    s.count++;
    s.lastAt = Math.max(s.lastAt, new Date(r.created_at).getTime());
    if (scored.includes(r)) {
      s.total += norm(r);
      s.scoredCount++;
    }
  }
  const skills = Object.entries(skillAgg)
    .map(([type, v]) => ({
      type,
      count: v.count,
      avg: v.scoredCount ? Math.round((v.total / v.scoredCount) * 10) / 10 : null,
      lastAt: v.lastAt ? new Date(v.lastAt) : null,
    }))
    .sort((a, b) => b.count - a.count);

  const radar = skills
    .filter((s) => s.avg != null)
    .slice(0, 8)
    .map((s) => ({ label: prettyType(s.type), value: s.avg as number }));

  // Timeline: average score per calendar week (last 10 weeks with data).
  const weekAgg: Record<string, { total: number; scoredCount: number; count: number }> = {};
  for (const r of learning) {
    const d = new Date(r.created_at);
    const ws = new Date(d);
    ws.setDate(d.getDate() - d.getDay());
    const key = ws.toISOString().slice(0, 10);
    const w = (weekAgg[key] ||= { total: 0, scoredCount: 0, count: 0 });
    w.count++;
    if (scored.includes(r)) {
      w.total += norm(r);
      w.scoredCount++;
    }
  }
  const timeline = Object.entries(weekAgg)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-10)
    .map(([key, v]) => ({
      label: key.slice(5).replace("-", "/"),
      avg: v.scoredCount ? Math.round((v.total / v.scoredCount) * 10) / 10 : null,
      count: v.count,
    }));

  const speakSet = new Set(SPEAKING_ACTIVITY_TYPES);
  const writeSet = new Set(WRITING_ACTIVITY_TYPES);
  const speakingCount = learning.filter((r) => speakSet.has(r.activity_type)).length;
  const writingCount = learning.filter((r) => writeSet.has(r.activity_type)).length;

  const bandOf = (type: string) => {
    const rows = scored.filter((r) => r.activity_type === type);
    if (!rows.length) return null;
    const avg = rows.reduce((s, r) => s + norm(r), 0) / rows.length;
    return Math.round(((avg / 10) * 9) * 10) / 10;
  };

  const ranked = skills.filter((s) => s.avg != null && s.count >= 2) as Array<{ type: string; avg: number; count: number }>;
  const strengths = [...ranked].sort((a, b) => b.avg - a.avg).slice(0, 3).map((s) => ({ type: s.type, avg: s.avg }));
  const weaknesses = [...ranked].sort((a, b) => a.avg - b.avg).slice(0, 3).map((s) => ({ type: s.type, avg: s.avg }));

  const lastAt = learning.length ? new Date(learning[learning.length - 1].created_at) : null;

  const notesVi: string[] = [];
  const notesEn: string[] = [];
  const push = (vi: string, en: string) => {
    notesVi.push(vi);
    notesEn.push(en);
  };

  if (!learning.length) {
    push(
      "Chưa có hoạt động học nào được ghi lại trong kỳ báo cáo này.",
      "No learning activity was recorded during this reporting period.",
    );
  } else {
    push(
      `Đã hoàn thành ${learning.length} hoạt động học trong ${activeDays} ngày, tổng thời gian ${fmtDuration(studySeconds)}.`,
      `Completed ${learning.length} learning activities across ${activeDays} active days, total time ${fmtDuration(studySeconds)}.`,
    );
    if (avgScore10 != null) {
      push(
        `Điểm trung bình ${avgScore10}/10 trên ${scored.length} bài có chấm điểm.`,
        `Average score ${avgScore10}/10 over ${scored.length} graded attempts.`,
      );
    }
    if (trend === "improving") {
      push(
        `Kết quả đang tiến bộ (+${Math.abs(trendDelta)} điểm so với nửa đầu kỳ) - nên giữ nhịp học hiện tại.`,
        `Results are improving (+${Math.abs(trendDelta)} points vs the first half) - keep the current rhythm.`,
      );
    } else if (trend === "declining") {
      push(
        `Kết quả đang giảm (-${Math.abs(trendDelta)} điểm so với nửa đầu kỳ) - nên ôn lại phần kiến thức yếu trước khi học bài mới.`,
        `Results are declining (-${Math.abs(trendDelta)} points vs the first half) - review weak areas before new lessons.`,
      );
    }
    if (weaknesses.length) {
      push(
        `Cần cải thiện: ${weaknesses.map((w) => `${prettyType(w.type)} (${w.avg}/10)`).join(", ")}.`,
        `Needs improvement: ${weaknesses.map((w) => `${prettyType(w.type)} (${w.avg}/10)`).join(", ")}.`,
      );
    }
    if (strengths.length) {
      push(
        `Điểm mạnh: ${strengths.map((s) => `${prettyType(s.type)} (${s.avg}/10)`).join(", ")}.`,
        `Strengths: ${strengths.map((s) => `${prettyType(s.type)} (${s.avg}/10)`).join(", ")}.`,
      );
    }
    if (!writingCount) {
      push(
        "Chưa có bài Writing nào trong kỳ - nên đặt mục tiêu 2 bài viết mỗi tuần.",
        "No writing attempt in this period - aim for 2 writing tasks per week.",
      );
    }
    if (!speakingCount) {
      push(
        "Chưa có bài Speaking nào trong kỳ - nên luyện nói 10 phút mỗi ngày.",
        "No speaking attempt in this period - practise speaking 10 minutes daily.",
      );
    }
    if (lastAt) {
      const idle = Math.floor((Date.now() - lastAt.getTime()) / 86400000);
      if (idle >= 7) {
        push(
          `Đã ${idle} ngày chưa vào học - nên quay lại với 1 bài ngắn để giữ chuỗi ngày học.`,
          `Inactive for ${idle} days - restart with a short lesson to rebuild the streak.`,
        );
      }
    }
  }

  const labels: Record<ReportPeriod, { vi: string; en: string }> = {
    "30d": { vi: "30 ngày gần nhất", en: "Last 30 days" },
    "90d": { vi: "90 ngày gần nhất", en: "Last 90 days" },
    all: { vi: "Toàn bộ quá trình học", en: "All time" },
  };

  return {
    studentName,
    period,
    periodLabelVi: labels[period].vi,
    periodLabelEn: labels[period].en,
    generatedAt: new Date(),
    totalActivities: learning.length,
    avgScore10,
    studySeconds,
    activeDays,
    bestStreak,
    trend,
    trendDelta,
    lastActiveAt: lastAt,
    domains,
    skills,
    radar,
    timeline,
    speakingCount,
    writingCount,
    ieltsSpeakingBand: bandOf("ielts_speaking"),
    ieltsWritingBand: bandOf("ielts_writing"),
    strengths,
    weaknesses,
    notesVi,
    notesEn,
  };
}

/* ---------------------------------------------------------------------------
 * HTML rendering (inline styles so it renders identically inside html2canvas)
 * ------------------------------------------------------------------------- */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const NO_DATA = "Chưa có dữ liệu / No data";

function pageOpen(): string {
  return `<section style="width:${PAGE_W}px;height:${PAGE_H}px;box-sizing:border-box;padding:0;background:#ffffff;color:${INK};font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;position:relative;overflow:hidden;">`;
}

function header(data: ReportData, subtitleVi: string, subtitleEn: string): string {
  return `<div style="background:linear-gradient(135deg,${BRAND_BLUE},${BRAND_EMERALD});padding:26px 40px;color:#ffffff;">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;">
      <div>
        <div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;opacity:.9;">HaiEduTech</div>
        <div style="font-size:26px;font-weight:700;margin-top:4px;">Báo cáo học tập / Learning Report</div>
        <div style="font-size:15px;margin-top:6px;opacity:.95;">${esc(subtitleVi)} · ${esc(subtitleEn)}</div>
      </div>
      <div style="text-align:right;font-size:12px;line-height:1.7;opacity:.95;">
        <div style="font-size:17px;font-weight:700;">${esc(data.studentName)}</div>
        <div>${esc(data.periodLabelVi)} / ${esc(data.periodLabelEn)}</div>
        <div>Xuất ngày / Issued: ${data.generatedAt.toLocaleDateString("vi-VN")}</div>
      </div>
    </div>
  </div>`;
}

function footer(pageNo: number, total: number): string {
  return `<div style="position:absolute;left:40px;right:40px;bottom:22px;border-top:1px solid ${BORDER};padding-top:10px;display:flex;justify-content:space-between;font-size:11px;color:${MUTED};">
    <span>© 2026 HaiEduTech · Số liệu lấy từ nhật ký học tập thực tế trên haiedutech.com</span>
    <span>Trang ${pageNo}/${total}</span>
  </div>`;
}

function statCard(labelVi: string, labelEn: string, value: string, color: string): string {
  return `<div style="flex:1;border:1px solid ${BORDER};border-radius:12px;padding:14px 16px;background:#F8FAFC;">
    <div style="font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:.6px;">${esc(labelEn)}</div>
    <div style="font-size:12px;color:${MUTED};margin-top:1px;">${esc(labelVi)}</div>
    <div style="font-size:25px;font-weight:700;color:${color};margin-top:8px;">${esc(value)}</div>
  </div>`;
}

function sectionTitle(vi: string, en: string): string {
  return `<div style="margin:0 0 12px;">
    <div style="font-size:17px;font-weight:700;">${esc(vi)}</div>
    <div style="font-size:12px;color:${MUTED};">${esc(en)}</div>
  </div>`;
}

/** Inline SVG radar chart (max 8 axes). */
function radarSvg(points: Array<{ label: string; value: number }>): string {
  if (points.length < 3) {
    return `<div style="height:270px;display:flex;align-items:center;justify-content:center;color:${MUTED};font-size:13px;">${NO_DATA}</div>`;
  }
  const cx = 175;
  const cy = 150;
  const r = 105;
  const n = points.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const at = (i: number, rad: number) => [cx + Math.cos(angle(i)) * rad, cy + Math.sin(angle(i)) * rad];

  let grid = "";
  for (const ring of [0.25, 0.5, 0.75, 1]) {
    const pts = points.map((_, i) => at(i, r * ring).map((v) => v.toFixed(1)).join(",")).join(" ");
    grid += `<polygon points="${pts}" fill="none" stroke="${BORDER}" stroke-width="1"/>`;
  }
  let spokes = "";
  let labels = "";
  points.forEach((p, i) => {
    const [x, y] = at(i, r);
    spokes += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${BORDER}" stroke-width="1"/>`;
    const [lx, ly] = at(i, r + 24);
    const anchor = lx > cx + 6 ? "start" : lx < cx - 6 ? "end" : "middle";
    const text = p.label.length > 20 ? p.label.slice(0, 19) + "…" : p.label;
    labels += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" font-size="10" fill="${MUTED}" text-anchor="${anchor}">${esc(text)} ${p.value}</text>`;
  });
  const shape = points
    .map((p, i) => at(i, (Math.max(0, Math.min(10, p.value)) / 10) * r).map((v) => v.toFixed(1)).join(","))
    .join(" ");

  return `<svg width="350" height="300" viewBox="0 0 350 300">${grid}${spokes}
    <polygon points="${shape}" fill="${BRAND_BLUE}33" stroke="${BRAND_BLUE}" stroke-width="2"/>
    ${points.map((p, i) => {
      const [x, y] = at(i, (Math.max(0, Math.min(10, p.value)) / 10) * r);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${BRAND_BLUE}"/>`;
    }).join("")}
    ${labels}</svg>`;
}

function domainBars(data: ReportData): string {
  const rows = data.domains
    .map((d) => {
      const pct = d.avg != null ? Math.max(3, d.avg * 10) : 0;
      const value = d.avg != null ? `${d.avg}/10` : "-";
      return `<div style="margin-bottom:13px;">
        <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:5px;">
          <span>${esc(d.labelVi)} / ${esc(d.labelEn)} <span style="color:${MUTED};">· ${d.count} hoạt động</span></span>
          <span style="font-weight:700;">${value}</span>
        </div>
        <div style="height:9px;background:#EEF2F7;border-radius:99px;overflow:hidden;">
          <div style="height:9px;width:${pct}%;background:${d.color};border-radius:99px;"></div>
        </div>
      </div>`;
    })
    .join("");
  return rows;
}

/** Inline SVG line chart of weekly average score. */
function timelineSvg(points: ReportData["timeline"]): string {
  const usable = points.filter((p) => p.avg != null) as Array<{ label: string; avg: number; count: number }>;
  if (usable.length < 2) {
    return `<div style="height:200px;display:flex;align-items:center;justify-content:center;color:${MUTED};font-size:13px;">${NO_DATA}</div>`;
  }
  const w = 660;
  const h = 200;
  const padL = 34;
  const padB = 28;
  const padT = 12;
  const innerW = w - padL - 14;
  const innerH = h - padB - padT;
  const x = (i: number) => padL + (usable.length === 1 ? innerW / 2 : (innerW * i) / (usable.length - 1));
  const y = (v: number) => padT + innerH - (Math.max(0, Math.min(10, v)) / 10) * innerH;

  let grid = "";
  for (const v of [0, 2.5, 5, 7.5, 10]) {
    grid += `<line x1="${padL}" y1="${y(v).toFixed(1)}" x2="${w - 14}" y2="${y(v).toFixed(1)}" stroke="${BORDER}" stroke-width="1"/>
      <text x="${padL - 6}" y="${(y(v) + 3).toFixed(1)}" font-size="9" fill="${MUTED}" text-anchor="end">${v}</text>`;
  }
  const path = usable.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.avg).toFixed(1)}`).join(" ");
  const dots = usable
    .map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.avg).toFixed(1)}" r="3.5" fill="${BRAND_EMERALD}"/>`)
    .join("");
  const xLabels = usable
    .map((p, i) => `<text x="${x(i).toFixed(1)}" y="${h - 8}" font-size="9" fill="${MUTED}" text-anchor="middle">${esc(p.label)}</text>`)
    .join("");

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${grid}
    <path d="${path}" fill="none" stroke="${BRAND_EMERALD}" stroke-width="2.5"/>${dots}${xLabels}</svg>`;
}

function bandBlock(data: ReportData): string {
  const row = (labelVi: string, labelEn: string, band: number | null, count: number) => {
    if (band == null) {
      return `<div style="display:flex;justify-content:space-between;font-size:12.5px;padding:7px 0;color:${MUTED};">
        <span>${esc(labelVi)} / ${esc(labelEn)}</span><span>${NO_DATA}</span></div>`;
    }
    const color = band >= 7 ? BRAND_EMERALD : band >= 5.5 ? "#F59E0B" : "#F97316";
    return `<div style="padding:7px 0;">
      <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:5px;">
        <span>${esc(labelVi)} / ${esc(labelEn)} <span style="color:${MUTED};">· ${count} lượt</span></span>
        <span style="font-weight:700;color:${color};">Band ${band}</span>
      </div>
      <div style="height:8px;background:#EEF2F7;border-radius:99px;overflow:hidden;">
        <div style="height:8px;width:${(band / 9) * 100}%;background:${color};border-radius:99px;"></div>
      </div>
    </div>`;
  };
  return `<div style="border:1px solid ${BORDER};border-radius:12px;padding:14px 16px;background:#F8FAFC;">
    <div style="font-size:13px;font-weight:700;margin-bottom:4px;">Band IELTS ước tính / Estimated IELTS band</div>
    <div style="font-size:11px;color:${MUTED};margin-bottom:6px;">Quy đổi từ điểm chấm trên hệ thống, mang tính tham khảo.</div>
    ${row("Nói", "Speaking", data.ieltsSpeakingBand, data.skills.find((s) => s.type === "ielts_speaking")?.count || 0)}
    ${row("Viết", "Writing", data.ieltsWritingBand, data.skills.find((s) => s.type === "ielts_writing")?.count || 0)}
  </div>`;
}

function skillTable(skills: ReportData["skills"]): string {
  if (!skills.length) {
    return `<div style="font-size:13px;color:${MUTED};padding:16px 0;">${NO_DATA}</div>`;
  }
  const rows = skills
    .slice(0, 16)
    .map(
      (s, i) => `<tr style="background:${i % 2 ? "#F8FAFC" : "#FFFFFF"};">
      <td style="padding:7px 10px;font-size:12px;border-bottom:1px solid ${BORDER};">${esc(prettyType(s.type))}</td>
      <td style="padding:7px 10px;font-size:12px;text-align:center;border-bottom:1px solid ${BORDER};">${s.count}</td>
      <td style="padding:7px 10px;font-size:12px;text-align:center;font-weight:700;border-bottom:1px solid ${BORDER};">${s.avg != null ? `${s.avg}/10` : "-"}</td>
      <td style="padding:7px 10px;font-size:12px;text-align:right;color:${MUTED};border-bottom:1px solid ${BORDER};">${fmtDate(s.lastAt)}</td>
    </tr>`,
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;border:1px solid ${BORDER};border-radius:10px;overflow:hidden;">
    <thead><tr style="background:#EEF2F7;">
      <th style="padding:8px 10px;font-size:11px;text-align:left;color:${MUTED};text-transform:uppercase;">Kỹ năng / Skill</th>
      <th style="padding:8px 10px;font-size:11px;text-align:center;color:${MUTED};text-transform:uppercase;">Số lượt</th>
      <th style="padding:8px 10px;font-size:11px;text-align:center;color:${MUTED};text-transform:uppercase;">Điểm TB</th>
      <th style="padding:8px 10px;font-size:11px;text-align:right;color:${MUTED};text-transform:uppercase;">Gần nhất</th>
    </tr></thead><tbody>${rows}</tbody></table>`;
}

function chipList(items: Array<{ type: string; avg: number }>, color: string): string {
  if (!items.length) return `<div style="font-size:12.5px;color:${MUTED};">${NO_DATA}</div>`;
  return items
    .map(
      (i) => `<span style="display:inline-block;margin:0 6px 6px 0;padding:5px 11px;border-radius:99px;font-size:12px;background:${color}1A;color:${color};font-weight:600;">${esc(prettyType(i.type))} · ${i.avg}/10</span>`,
    )
    .join("");
}

/** Build the full report as an array of A4-sized HTML pages. */
export function buildReportPages(data: ReportData): string[] {
  const trendText: Record<ReportData["trend"], string> = {
    improving: "Tiến bộ / Improving",
    declining: "Giảm / Declining",
    stable: "Ổn định / Stable",
    unknown: "-",
  };

  const page1 = `${pageOpen()}
    ${header(data, "Tổng quan tiến độ", "Progress overview")}
    <div style="padding:24px 40px 0;">
      <div style="display:flex;gap:12px;margin-bottom:14px;">
        ${statCard("Tổng hoạt động", "Activities", String(data.totalActivities), BRAND_BLUE)}
        ${statCard("Điểm trung bình", "Average score", data.avgScore10 != null ? `${data.avgScore10}/10` : "-", BRAND_EMERALD)}
        ${statCard("Thời gian học", "Study time", fmtDuration(data.studySeconds), "#8B5CF6")}
      </div>
      <div style="display:flex;gap:12px;margin-bottom:22px;">
        ${statCard("Ngày có học", "Active days", String(data.activeDays), "#0EA5E9")}
        ${statCard("Chuỗi ngày dài nhất", "Best streak", `${data.bestStreak}`, "#F59E0B")}
        ${statCard("Xu hướng", "Trend", trendText[data.trend], data.trend === "declining" ? "#EF4444" : INK)}
      </div>

      <div style="display:flex;gap:24px;align-items:flex-start;">
        <div style="width:350px;">
          ${sectionTitle("Learning DNA", "Skill radar (0-10)")}
          ${radarSvg(data.radar)}
        </div>
        <div style="flex:1;padding-top:2px;">
          ${sectionTitle("Hiệu suất theo lĩnh vực", "Performance by domain")}
          ${domainBars(data)}
          <div style="margin-top:14px;">${bandBlock(data)}</div>
        </div>
      </div>

      <div style="margin-top:20px;">
        ${sectionTitle("Điểm trung bình theo tuần", "Weekly average score")}
        ${timelineSvg(data.timeline)}
      </div>
    </div>
    ${footer(1, 2)}
  </section>`;

  const page2 = `${pageOpen()}
    ${header(data, "Chi tiết kỹ năng & nhận xét", "Skill detail & teacher notes")}
    <div style="padding:24px 40px 0;">
      ${sectionTitle("Bảng chi tiết từng kỹ năng", "Skill-by-skill breakdown")}
      ${skillTable(data.skills)}

      <div style="display:flex;gap:20px;margin-top:22px;">
        <div style="flex:1;">
          ${sectionTitle("Điểm mạnh", "Strengths")}
          ${chipList(data.strengths, BRAND_EMERALD)}
        </div>
        <div style="flex:1;">
          ${sectionTitle("Cần cải thiện", "Needs improvement")}
          ${chipList(data.weaknesses, "#EF4444")}
        </div>
      </div>

      <div style="margin-top:22px;">
        ${sectionTitle("Nhận xét & gợi ý luyện tập", "Notes & practice suggestions")}
        <div style="border:1px solid ${BORDER};border-radius:12px;padding:16px 18px;background:#F8FAFC;">
          ${data.notesVi
            .map(
              (vi, i) => `<div style="margin-bottom:11px;">
            <div style="font-size:13px;line-height:1.5;">• ${esc(vi)}</div>
            <div style="font-size:11.5px;color:${MUTED};line-height:1.5;padding-left:12px;">${esc(data.notesEn[i] || "")}</div>
          </div>`,
            )
            .join("")}
        </div>
      </div>

      <div style="margin-top:18px;font-size:11.5px;color:${MUTED};line-height:1.6;">
        Số lượt học gần nhất: ${fmtDate(data.lastActiveAt)} · Số lượt luyện Speaking: ${data.speakingCount} · Số lượt luyện Writing: ${data.writingCount}<br/>
        Mọi số liệu trong báo cáo được lấy trực tiếp từ nhật ký hoạt động của học viên trên hệ thống HaiEduTech, không có số liệu ước lượng ngoài phần band IELTS quy đổi.
      </div>
    </div>
    ${footer(2, 2)}
  </section>`;

  return [page1, page2];
}

/** Render the HTML pages into a downloadable multi-page A4 PDF. */
export async function exportLearningDnaPdf(data: ReportData): Promise<void> {
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
  holder.innerHTML = buildReportPages(data).join("");
  document.body.appendChild(holder);

  try {
    const pdf = new jsPDF("p", "mm", "a4");
    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();
    const pages = Array.from(holder.children) as HTMLElement[];

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: PAGE_W,
        windowHeight: PAGE_H,
      });
      const img = canvas.toDataURL("image/jpeg", 0.94);
      if (i > 0) pdf.addPage();
      pdf.addImage(img, "JPEG", 0, 0, pw, ph);
    }

    const safeName = data.studentName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-");
    pdf.save(`HaiEduTech-LearningDNA-${safeName}-${data.generatedAt.toISOString().slice(0, 10)}.pdf`);
  } finally {
    document.body.removeChild(holder);
  }
}
