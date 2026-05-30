/**
 * @file SatTestDay.tsx
 * @description SAT Test-Day Checklist + Bluebook setup walkthrough. Pure
 * static + localStorage so students can tick items off and resume.
 */
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, CheckCircle2, ShieldCheck, Laptop, ListChecks, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const ITEMS_BEFORE: { id: string; vi: string; en: string }[] = [
  { id: "id", vi: "Giấy tờ tùy thân có ảnh (CCCD/hộ chiếu) còn hiệu lực", en: "Valid photo ID (passport/national ID)" },
  { id: "admission", vi: "In Admission Ticket từ College Board, kiểm tra tên đúng chính tả", en: "Print Admission Ticket from College Board, double-check spelling" },
  { id: "bluebook", vi: "Cài Bluebook ≥ 5 ngày trước thi, làm Exam Setup trên app", en: "Install Bluebook ≥5 days early, complete in-app Exam Setup" },
  { id: "laptop", vi: "Laptop/tablet sạc đầy + sạc dự phòng + cáp nguồn", en: "Fully-charged laptop/tablet + charger + power cable" },
  { id: "calc", vi: "Máy tính được phép (TI-84 / Casio fx-CG50) — không bắt buộc vì có Desmos", en: "Approved calculator (TI-84 / Casio fx-CG50) — optional since Desmos is built-in" },
  { id: "snack", vi: "Đồ ăn nhẹ + chai nước (uống ngoài phòng thi)", en: "Snacks + water bottle (consume outside testing room)" },
  { id: "watch", vi: "Đồng hồ analog không có sóng (không bắt buộc, Bluebook có timer)", en: "Analog watch — not required, Bluebook has a timer" },
  { id: "outfit", vi: "Mặc áo có lớp dễ cởi — phòng thi điều hòa có thể lạnh", en: "Wear layers — testing rooms can be cold" },
  { id: "sleep", vi: "Ngủ đủ 7-8 tiếng đêm trước, tránh học bài mới", en: "Sleep 7-8 hours the night before — no cramming" },
  { id: "early", vi: "Đến địa điểm thi sớm ít nhất 30 phút", en: "Arrive at the test center at least 30 minutes early" },
];

const BLUEBOOK_STEPS = [
  { vi: "Tải Bluebook từ bluebook.app.collegeboard.org cho Windows / macOS / iPad / school-managed Chromebook.", en: "Download Bluebook from bluebook.app.collegeboard.org for Windows / macOS / iPad / school-managed Chromebook." },
  { vi: "Đăng nhập tài khoản College Board (cùng tài khoản đã đăng ký SAT).", en: "Sign in with your College Board account (same one used to register)." },
  { vi: "Vào 'Test Preview' và 'Practice Tests' — làm ÍT NHẤT 1 full-length trên Bluebook.", en: "Open 'Test Preview' and 'Practice Tests' — finish AT LEAST one full-length on Bluebook." },
  { vi: "Trong vòng 5 ngày trước thi: hoàn thành 'Exam Setup' từ Bluebook để lấy Admission Ticket.", en: "Within 5 days of test day: complete 'Exam Setup' in Bluebook to receive your Admission Ticket." },
  { vi: "Test internet ở địa điểm dự định (Bluebook có thể chạy offline khi cúp mạng giữa bài).", en: "Test the internet at your planned location (Bluebook can run offline if Wi-Fi drops mid-test)." },
];

const DOS_DONTS = {
  do: [
    { vi: "Dùng Flag + Mark for Review để skip câu khó, quay lại sau.", en: "Use Flag + Mark for Review to skip hard questions and circle back." },
    { vi: "Mở Desmos cho mọi câu Math có biểu đồ/phương trình.", en: "Open Desmos for any Math question with graphs or equations." },
    { vi: "Đeo headphone CỦA BẠN cho phần Listening của Bluebook (nếu có).", en: "Bring your own headphones for Bluebook's listening sections (if any)." },
    { vi: "Kiểm tra pin & tắt Wi-Fi tự động ngủ trước khi bắt đầu.", en: "Check battery & disable Wi-Fi auto-sleep before starting." },
  ],
  dont: [
    { vi: "ĐỪNG mở app khác trong giờ thi — Bluebook sẽ flag.", en: "DON'T open other apps during the test — Bluebook will flag you." },
    { vi: "ĐỪNG mang điện thoại vào phòng (College Board cấm).", en: "DON'T bring a phone into the room (College Board prohibits it)." },
    { vi: "ĐỪNG đoán hoảng — Digital SAT KHÔNG trừ điểm sai, nhưng đoán không suy nghĩ phí time.", en: "DON'T panic-guess — Digital SAT has no penalty, but blind guessing wastes time." },
    { vi: "ĐỪNG huỷ điểm vội trừ khi bị bệnh — bạn có 'Score Cancel' đến hôm sau.", en: "DON'T cancel scores immediately unless ill — you have until the next day." },
  ],
};

const SatTestDay = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem("sat:test-day-checklist") || "{}"); } catch { return {}; }
  });
  useEffect(() => { localStorage.setItem("sat:test-day-checklist", JSON.stringify(checked)); }, [checked]);
  const doneCount = ITEMS_BEFORE.filter((i) => checked[i.id]).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Helmet>
        <title>{t("Test Day SAT — HaiEduTech", "SAT Test Day — HaiEduTech")}</title>
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <button onClick={() => navigate("/sat-curriculum")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại SAT Curriculum", "Back to SAT Curriculum")}
        </button>

        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {t("📋 Test Day & Bluebook Setup", "📋 Test Day & Bluebook Setup")}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(`Đã chuẩn bị: ${doneCount}/${ITEMS_BEFORE.length}`, `Ready: ${doneCount}/${ITEMS_BEFORE.length}`)}
          </p>
        </header>

        <section className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" /> {t("Checklist trước ngày thi", "Pre-test checklist")}
          </h2>
          <div className="space-y-2">
            {ITEMS_BEFORE.map((it) => (
              <label key={it.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!checked[it.id]}
                  onChange={(e) => setChecked((p) => ({ ...p, [it.id]: e.target.checked }))}
                  className="mt-1 w-4 h-4 accent-primary"
                />
                <span className={cn("text-sm leading-6", checked[it.id] && "line-through text-muted-foreground")}>
                  {t(it.vi, it.en)}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Laptop className="w-5 h-5 text-primary" /> {t("Cài Bluebook đúng cách", "Bluebook setup walkthrough")}
          </h2>
          <ol className="space-y-3">
            {BLUEBOOK_STEPS.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                <p className="text-sm leading-7">{t(s.vi, s.en)}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid md:grid-cols-2 gap-4">
          <section className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/5 p-5">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {t("NÊN làm", "DO")}
            </h3>
            <ul className="space-y-2">
              {DOS_DONTS.do.map((d, i) => (
                <li key={i} className="text-sm leading-6 flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>{t(d.vi, d.en)}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border-2 border-rose-500/50 bg-rose-500/5 p-5">
            <h3 className="font-bold text-rose-700 dark:text-rose-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> {t("KHÔNG nên", "DON'T")}
            </h3>
            <ul className="space-y-2">
              {DOS_DONTS.dont.map((d, i) => (
                <li key={i} className="text-sm leading-6 flex items-start gap-2">
                  <span className="text-rose-600 mt-1">•</span>{t(d.vi, d.en)}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SatTestDay;
