/**
 * @file PhdRoadmapChecklist.tsx
 * @description PhD research roadmap with status tracking + AI-suggested next actions.
 * Persisted in localStorage (per-user, client-side only).
 */
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen, Lightbulb, FileText, ShieldCheck, Database, BarChart3,
  PenTool, Send, CheckCircle2, Circle, Clock, AlertTriangle, Sparkles,
  ChevronDown, ChevronUp, Wand2, Loader2, Copy, Trash2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

type Status = "not_started" | "in_progress" | "done" | "blocked";

interface StepDef {
  id: string;
  icon: typeof BookOpen;
  vi: string;
  en: string;
  descVi: string;
  descEn: string;
  nextActions: { vi: string; en: string }[];
}

const STORAGE_KEY = "phd-roadmap-status-v1";

const STEPS: StepDef[] = [
  {
    id: "literature",
    icon: BookOpen,
    vi: "1. Literature Review",
    en: "1. Literature Review",
    descVi: "Đọc, tổng hợp, tìm research gap trong lĩnh vực EdTech của em.",
    descEn: "Read, synthesize, and find the research gap in your EdTech niche.",
    nextActions: [
      { vi: "Chọn 2–3 từ khoá hẹp + chạy Literature search ở tab bên cạnh.", en: "Pick 2–3 narrow keywords + run Literature search in the adjacent tab." },
      { vi: "Đọc 15–20 paper 2020+; ghi mỗi paper 5 dòng: RQ, method, finding, limitation, gap.", en: "Read 15–20 papers from 2020+; write 5 lines each: RQ, method, finding, limitation, gap." },
      { vi: "Viết 1 đoạn “Research gap” (3–5 câu) lưu vào Notebook tag #gap.", en: "Write a 3–5 sentence Research gap paragraph; save in Notebook with tag #gap." },
    ],
  },
  {
    id: "rq",
    icon: Lightbulb,
    vi: "2. Research Questions & Hypotheses",
    en: "2. Research Questions & Hypotheses",
    descVi: "Hình thành 1–3 RQ thoả FINER + H1/H0 testable.",
    descEn: "Form 1–3 FINER research questions with testable H1/H0.",
    nextActions: [
      { vi: "Mở tab RQ Generator, nhập topic, sinh 3 RQ ứng viên.", en: "Open the RQ Generator tab, enter your topic, generate 3 candidate RQs." },
      { vi: "Chọn 1 RQ chính + 1–2 phụ; viết rõ population, intervention, outcome.", en: "Pick 1 primary RQ + 1–2 secondary; specify population, intervention, outcome." },
      { vi: "Định nghĩa biến phụ thuộc + cách đo (instrument đã validated).", en: "Define the dependent variable + measurement instrument (already validated)." },
    ],
  },
  {
    id: "design",
    icon: BarChart3,
    vi: "3. Study Design & Method",
    en: "3. Study Design & Method",
    descVi: "Chọn RCT / quasi-exp / mixed-methods, tính sample size, pilot.",
    descEn: "Pick RCT / quasi-exp / mixed-methods, compute sample size, pilot.",
    nextActions: [
      { vi: "Vẽ sơ đồ design (groups, timeline, instruments).", en: "Sketch the design diagram (groups, timeline, instruments)." },
      { vi: "Power analysis (G*Power) để xác định N tối thiểu.", en: "Run a power analysis (G*Power) to fix the minimum N." },
      { vi: "Lên pre-registration draft (OSF) trước khi thu data.", en: "Draft a pre-registration on OSF before collecting data." },
    ],
  },
  {
    id: "proposal",
    icon: FileText,
    vi: "4. Proposal Writing",
    en: "4. Proposal Writing",
    descVi: "1500–2000 từ, đủ 7 mục, đạt Health Score ≥ 80.",
    descEn: "1500–2000 words, all 7 sections, Health Score ≥ 80.",
    nextActions: [
      { vi: "Mở tab Proposal Builder; lấp đủ 7 section + chạy Health Score.", en: "Open the Proposal Builder; fill all 7 sections + run Health Score." },
      { vi: "Nhờ 1 mentor + 1 peer review; cập nhật v0.2.", en: "Get 1 mentor + 1 peer review; update to v0.2." },
      { vi: "Snapshot vào Notebook để track version (tag #proposal-vN).", en: "Snapshot to Notebook for version tracking (tag #proposal-vN)." },
    ],
  },
  {
    id: "ethics",
    icon: ShieldCheck,
    vi: "5. Ethics & IRB",
    en: "5. Ethics & IRB",
    descVi: "Xin phê duyệt IRB, chuẩn bị consent form, data protection (GDPR).",
    descEn: "Get IRB approval, prepare consent forms, data protection (GDPR).",
    nextActions: [
      { vi: "Soạn Participant Information Sheet + Consent Form (EN+VI).", en: "Draft Participant Information Sheet + Consent Form (EN+VI)." },
      { vi: "Lên DPIA nếu có dữ liệu vị thành niên hoặc nhạy cảm.", en: "Run a DPIA if the data involves minors or sensitive information." },
      { vi: "Nộp IRB application; lưu approval letter ở Notebook tag #ethics.", en: "Submit the IRB application; save the approval in Notebook with tag #ethics." },
    ],
  },
  {
    id: "data",
    icon: Database,
    vi: "6. Data Collection",
    en: "6. Data Collection",
    descVi: "Pilot → main study, quản lý dropout, đảm bảo data quality.",
    descEn: "Pilot → main study, manage dropout, ensure data quality.",
    nextActions: [
      { vi: "Chạy pilot N=10–20, fix instrument issues trước khi launch.", en: "Run a pilot N=10–20 and fix instrument issues before launch." },
      { vi: "Setup data dictionary + backup hằng tuần.", en: "Set up a data dictionary + weekly backups." },
      { vi: "Theo dõi dropout/attrition; ghi log lý do.", en: "Track dropout/attrition; log the reasons." },
    ],
  },
  {
    id: "analysis",
    icon: BarChart3,
    vi: "7. Analysis",
    en: "7. Analysis",
    descVi: "Thống kê / qualitative coding theo pre-registration.",
    descEn: "Statistics / qualitative coding per the pre-registration.",
    nextActions: [
      { vi: "Bám đúng pre-registration; ghi rõ phần nào là exploratory.", en: "Stick to the pre-registration; clearly label exploratory analyses." },
      { vi: "Báo effect size + CI thay vì chỉ p-value.", en: "Report effect sizes + CIs, not just p-values." },
      { vi: "Triangulate qual + quant nếu mixed-methods.", en: "Triangulate qual + quant if mixed-methods." },
    ],
  },
  {
    id: "writeup",
    icon: PenTool,
    vi: "8. Thesis / Paper Writing",
    en: "8. Thesis / Paper Writing",
    descVi: "Viết theo IMRaD; target 1 conference + 1 journal.",
    descEn: "Write in IMRaD; target 1 conference + 1 journal.",
    nextActions: [
      { vi: "Outline IMRaD trước, viết Results trước Discussion.", en: "Outline IMRaD first, write Results before Discussion." },
      { vi: "Chọn venue (AIED, L@S, JLA, CHI EA…) theo fit.", en: "Pick a venue (AIED, L@S, JLA, CHI EA…) based on fit." },
      { vi: "Đặt deadline self-review mỗi 2 tuần.", en: "Set a self-review deadline every 2 weeks." },
    ],
  },
  {
    id: "submission",
    icon: Send,
    vi: "9. Submission & Defense",
    en: "9. Submission & Defense",
    descVi: "Submit, revise theo reviewer, chuẩn bị defense slides.",
    descEn: "Submit, revise per reviewers, prepare defense slides.",
    nextActions: [
      { vi: "Chuẩn bị response-to-reviewers template ngay khi submit.", en: "Prepare a response-to-reviewers template right after submission." },
      { vi: "Tập defense 3 lần với mentor + peers.", en: "Rehearse the defense 3 times with mentor + peers." },
      { vi: "Plan dissemination: blog, talk, dataset release.", en: "Plan dissemination: blog, talk, dataset release." },
    ],
  },
];

const STATUS_META: Record<Status, { vi: string; en: string; cls: string; icon: typeof Circle }> = {
  not_started: { vi: "Chưa bắt đầu", en: "Not started", cls: "bg-muted text-muted-foreground", icon: Circle },
  in_progress: { vi: "Đang làm", en: "In progress", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30", icon: Clock },
  done: { vi: "Hoàn thành", en: "Done", cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30", icon: CheckCircle2 },
  blocked: { vi: "Đang vướng", en: "Blocked", cls: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30", icon: AlertTriangle },
};

interface StepState { status: Status; note: string }
type StateMap = Record<string, StepState>;

const PhdRoadmapChecklist = () => {
  const { t, lang } = useLanguage();
  const isVi = lang === "vi";
  const [state, setState] = useState<StateMap>({});
  const [expanded, setExpanded] = useState<string | null>(STEPS[0].id);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const persist = (next: StateMap) => {
    setState(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const setStatus = (id: string, status: Status) =>
    persist({ ...state, [id]: { status, note: state[id]?.note ?? "" } });
  const setNote = (id: string, note: string) =>
    persist({ ...state, [id]: { status: state[id]?.status ?? "not_started", note } });

  const { doneCount, inProg, blocked, pct } = useMemo(() => {
    let d = 0, ip = 0, bk = 0;
    STEPS.forEach((s) => {
      const st = state[s.id]?.status ?? "not_started";
      if (st === "done") d++;
      else if (st === "in_progress") ip++;
      else if (st === "blocked") bk++;
    });
    return { doneCount: d, inProg: ip, blocked: bk, pct: Math.round((d / STEPS.length) * 100) };
  }, [state]);

  const nextFocus = useMemo(() => {
    const blockedStep = STEPS.find((s) => state[s.id]?.status === "blocked");
    if (blockedStep) return { step: blockedStep, reason: "blocked" as const };
    const inProgStep = STEPS.find((s) => state[s.id]?.status === "in_progress");
    if (inProgStep) return { step: inProgStep, reason: "in_progress" as const };
    const nextStep = STEPS.find((s) => (state[s.id]?.status ?? "not_started") === "not_started");
    if (nextStep) return { step: nextStep, reason: "next" as const };
    return null;
  }, [state]);

  const resetAll = () => {
    if (!confirm(isVi ? "Reset toàn bộ trạng thái roadmap?" : "Reset the entire roadmap status?")) return;
    persist({});
  };

  return (
    <div className="space-y-4">
      {/* Overview */}
      <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-indigo-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-600" />
            {t("Lộ trình PhD — Tổng quan", "PhD Roadmap — Overview")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              ✅ {doneCount}/{STEPS.length} {t("xong", "done")}
            </Badge>
            <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              ⏳ {inProg} {t("đang làm", "in progress")}
            </Badge>
            <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
              ⚠️ {blocked} {t("vướng", "blocked")}
            </Badge>
            <Badge variant="outline">{pct}%</Badge>
          </div>
          <Progress value={pct} className="h-2" />

          {nextFocus && (
            <div className="rounded-lg border-2 border-violet-500/40 bg-violet-500/10 p-3 text-sm">
              <div className="font-semibold mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-violet-600" />
                {nextFocus.reason === "blocked"
                  ? t("Ưu tiên gỡ vướng:", "Unblock first:")
                  : nextFocus.reason === "in_progress"
                    ? t("Tiếp tục đang dở:", "Continue in-progress:")
                    : t("Bước kế tiếp gợi ý:", "Suggested next step:")}
                <span className="text-violet-700 dark:text-violet-300">{t(nextFocus.step.vi, nextFocus.step.en)}</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {nextFocus.step.nextActions.slice(0, 2).map((a, i) => (
                  <li key={i}>{t(a.vi, a.en)}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={resetAll}>
              {t("Reset roadmap", "Reset roadmap")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-2">
        {STEPS.map((s) => {
          const st = state[s.id]?.status ?? "not_started";
          const note = state[s.id]?.note ?? "";
          const meta = STATUS_META[st];
          const Icon = s.icon;
          const StatusIcon = meta.icon;
          const isOpen = expanded === s.id;
          return (
            <Card key={s.id} className={st === "done" ? "opacity-80" : ""}>
              <button
                onClick={() => setExpanded(isOpen ? null : s.id)}
                className="w-full text-left p-4 flex items-start gap-3"
              >
                <div className="w-9 h-9 shrink-0 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{t(s.vi, s.en)}</span>
                    <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full ${meta.cls}`}>
                      <StatusIcon className="w-3 h-3" />
                      {t(meta.vi, meta.en)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(s.descVi, s.descEn)}</p>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>

              {isOpen && (
                <CardContent className="pt-0 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(STATUS_META) as Status[]).map((k) => (
                      <Button
                        key={k}
                        size="sm"
                        variant={st === k ? "default" : "outline"}
                        onClick={() => setStatus(s.id, k)}
                        className="text-xs h-7"
                      >
                        {t(STATUS_META[k].vi, STATUS_META[k].en)}
                      </Button>
                    ))}
                  </div>

                  <div className="rounded-md border bg-muted/30 p-3">
                    <div className="text-xs font-semibold mb-1.5 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      {t("Next actions gợi ý", "Suggested next actions")}
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                      {s.nextActions.map((a, i) => (
                        <li key={i}>{t(a.vi, a.en)}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="text-xs font-semibold block mb-1">
                      {t("Ghi chú của bạn cho bước này", "Your notes for this step")}
                    </label>
                    <Textarea
                      value={note}
                      onChange={(e) => setNote(s.id, e.target.value)}
                      placeholder={t("Trạng thái hiện tại, blocker, deadline...", "Current status, blockers, deadlines...")}
                      rows={3}
                      className="text-sm"
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PhdRoadmapChecklist;
