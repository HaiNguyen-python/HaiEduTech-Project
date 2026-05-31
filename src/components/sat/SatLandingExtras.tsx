/**
 * @file SatLandingExtras.tsx
 * @description Professional landing sections for the SAT course page:
 * trust stats, Digital SAT 2026 format snapshot, band-score roadmap,
 * pain points + Mr. Hai's solutions, testimonials carousel, and FAQ.
 * Always visible above the heavy SatExamFormat curriculum (which stays toggled).
 */
import { motion } from "framer-motion";
import {
  TrendingUp, Trophy,
  BookOpen, Calculator, Sparkles, ShieldCheck,
  AlertTriangle, Lightbulb, ChevronRight, Target,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const SatLandingExtras = () => {
  const { t } = useLanguage();


  const formatCards = [
    {
      icon: BookOpen,
      title: t("Reading & Writing", "Reading & Writing"),
      time: t("64 phút · 54 câu · 2 module", "64 min · 54 Qs · 2 modules"),
      gradient: "from-violet-500/20 to-indigo-500/20 border-violet-500/70",
      bullets: [
        t("Đoạn văn ngắn 25–150 từ, mỗi câu 1 passage", "Short passages 25–150 words, one question each"),
        t("Information & Ideas, Craft & Structure, Expression of Ideas, Standard English", "Information & Ideas, Craft & Structure, Expression of Ideas, Standard English"),
        t("Module 2 adaptive theo kết quả Module 1", "Module 2 adapts based on Module 1 performance"),
      ],
    },
    {
      icon: Calculator,
      title: t("Math", "Math"),
      time: t("70 phút · 44 câu · Desmos tích hợp", "70 min · 44 Qs · Built-in Desmos"),
      gradient: "from-sky-500/20 to-emerald-500/20 border-sky-500/70",
      bullets: [
        t("Algebra · Advanced Math · Problem Solving · Geometry/Trig", "Algebra · Advanced Math · Problem Solving · Geometry/Trig"),
        t("75% trắc nghiệm + 25% student-produced response", "75% multiple choice + 25% student-produced response"),
        t("Máy tính Desmos đồ thị + solver dùng cả bài thi", "Desmos graphing calculator + solver throughout"),
      ],
    },
  ];

  const bandTiers = [
    { range: "1000–1199", label: t("Khởi đầu", "Starter"), action: t("Vững ngữ pháp cơ bản, Algebra I & 500 từ cao tần", "Solid basic grammar, Algebra I & 500 high-freq words"), color: "from-slate-500 to-slate-600", icon: BookOpen },
    { range: "1200–1349", label: t("Trung cấp", "Intermediate"), action: t("Chiến lược Evidence pairing, Desmos cơ bản, 4 mock test", "Evidence pairing strategy, basic Desmos, 4 mock tests"), color: "from-sky-500 to-blue-600", icon: TrendingUp },
    { range: "1350–1499", label: t("Cao", "Advanced"), action: t("Words in Context nâng cao, time-pressure drills, Rhetorical Synthesis", "Advanced Words in Context, time-pressure drills, Rhetorical Synthesis"), color: "from-violet-500 to-indigo-600", icon: Target },
    { range: "1500–1600", label: t("Đỉnh cao", "Elite"), action: t("Mastery 10 mock full-length, error-log < 3 lỗi/bài, tâm lý phòng thi", "Mastery 10 full-length mocks, error-log <3/test, test-day mindset"), color: "from-fuchsia-500 to-rose-600", icon: Trophy },
  ];

  const painPoints = [
    {
      icon: AlertTriangle,
      title: t("Reading quá dài & academic", "Reading too long & academic"),
      pain: t("Học sinh Việt mất 2–3 phút đọc đoạn 150 từ vì vocab học thuật xa lạ.", "Vietnamese students take 2–3 min on 150-word passages due to unfamiliar academic vocab."),
      solution: t("Thầy Hải dạy 500 từ Latin/Greek roots + kỹ thuật scanning theo dạng câu hỏi.", "Mr. Hai teaches 500 Latin/Greek roots + question-type scanning techniques."),
    },
    {
      icon: AlertTriangle,
      title: t("Math wording bẫy", "Tricky Math wording"),
      pain: t("Đề Math SAT dùng tiếng Anh đảo cấu trúc, học sinh hiểu sai đề dù biết công thức.", "SAT Math uses inverted English; students misread questions despite knowing formulas."),
      solution: t("Bóc tách 20 dạng wording pattern + dịch nhanh sang phương trình trong 15 giây.", "Decode 20 wording patterns + translate to equations in 15 seconds."),
    },
    {
      icon: AlertTriangle,
      title: t("Áp lực thời gian 1 phút/câu", "1-minute-per-question pressure"),
      pain: t("R&W chỉ 71 giây/câu - nhiều em làm hết Module 1 không kịp soát lại.", "R&W gives only 71s/question - many never finish Module 1 with time to review."),
      solution: t("Luyện skip-strategy + flag system trên Bluebook giả lập, tăng tốc 30%.", "Train skip-strategy + flag system on Bluebook simulator, +30% speed."),
    },
  ];



  const faqs = [
    { q: t("Digital SAT khác SAT giấy cũ thế nào?", "How is Digital SAT different from paper SAT?"), a: t("Digital SAT ngắn hơn (2h14 vs 3h), thi trên laptop qua app Bluebook, có Desmos tích hợp, Module 2 adaptive theo điểm Module 1, và đoạn văn ngắn (25–150 từ) thay vì passage dài.", "Digital SAT is shorter (2h14 vs 3h), taken on laptop via Bluebook app, includes built-in Desmos, Module 2 adapts to Module 1, and uses short passages (25–150 words) instead of long ones.") },
    { q: t("Học bao lâu thì đạt 1400+?", "How long to reach 1400+?"), a: t("Trung bình 4–6 tháng nếu bắt đầu từ 1100, với 8–10h học/tuần. Học sinh chăm có thể rút xuống 3 tháng.", "Typically 4–6 months from 1100, with 8–10 hrs/week. Dedicated students can do it in 3 months.") },
    { q: t("Có cần điểm SAT để du học Mỹ không?", "Is SAT required for US study?"), a: t("Phần lớn trường top vẫn yêu cầu hoặc khuyến khích nộp SAT 2025–2026 (MIT, Harvard, Yale, Brown đã quay lại bắt buộc). 1400+ giúp hồ sơ cạnh tranh ở top 50.", "Most top schools still require or recommend SAT 2025–2026 (MIT, Harvard, Yale, Brown have reinstated mandatory). 1400+ makes you competitive at top 50.") },
    { q: t("Trường nào nhận học bổng với SAT 1300?", "Which schools offer scholarships at SAT 1300?"), a: t("SAT 1300 đủ điều kiện học bổng merit ở nhiều public universities (Arizona, Alabama, Iowa) và liberal arts colleges hạng trung. Kết hợp GPA tốt có thể nhận 30–60% học phí.", "SAT 1300 qualifies for merit aid at many public universities (Arizona, Alabama, Iowa) and mid-tier liberal arts colleges. Combined with strong GPA: 30–60% tuition.") },
    { q: t("Có được dùng máy tính riêng không?", "Can I bring my own calculator?"), a: t("Có - bạn được mang máy tính được phép (TI-84, Casio fx-CG50…), nhưng Desmos tích hợp sẵn trên Bluebook thường nhanh và mạnh hơn nhiều cho graphing & solver.", "Yes - you may bring an approved calculator (TI-84, Casio fx-CG50…), but built-in Desmos on Bluebook is usually faster and more powerful for graphing & solver.") },
    { q: t("Học phí lộ trình SAT bao nhiêu?", "How much is the SAT track tuition?"), a: t("Vui lòng inbox thầy Hải qua mục Liên hệ để được tư vấn lộ trình cá nhân hóa và bảng giá theo từng mục tiêu điểm.", "Please message Mr. Hai via Contact for a personalized track and tuition aligned with your target score.") },
    { q: t("Bao lâu nên thi lại lần 2?", "How long before retaking?"), a: t("Tối thiểu 6–8 tuần giữa 2 lần thi để kịp xử lý error log và nâng band. Trong 1 năm nên thi tối đa 3 lần để giữ chất lượng từng lần.", "Min 6–8 weeks between attempts to process the error log and lift the band. Max 3 attempts per year keeps each one quality.") },
  ];

  const Section = ({ delay = 0, children }: { delay?: number; children: React.ReactNode }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="mb-8">
      {children}
    </motion.div>
  );

  return (
    <>

      {/* 2 · Digital SAT 2026 format */}
      <Section delay={0.1}>
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              {t("Digital SAT 2026 ở mức nào?", "What does Digital SAT 2026 look like?")}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {t("Định dạng mới: 2 phần, mỗi phần 2 module, tổng 2h14 phút. Bài thi adaptive - Module 2 thay đổi theo điểm Module 1.", "New format: 2 sections, 2 modules each, total 2h14. Adaptive - Module 2 adjusts to your Module 1 score.")}
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {formatCards.map((f, i) => (
              <div key={i} className={`rounded-2xl border-2 bg-gradient-to-br p-6 shadow-sm ${f.gradient}`}>
                <div className="flex items-center gap-3 mb-3">
                  <f.icon className="w-7 h-7 text-foreground" />
                  <h3 className="text-lg font-display font-bold text-foreground">{f.title}</h3>
                </div>
                <p className="text-sm font-semibold text-foreground/80 mb-4">{f.time}</p>
                <ul className="space-y-2">
                  {f.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground/90">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 3 · Band score roadmap */}
      <Section delay={0.15}>
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-rose-600 flex items-center justify-center shadow-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              {t("Lộ trình điểm SAT 1000 → 1600", "SAT score roadmap 1000 → 1600")}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {t("Xác định bạn đang ở cấp nào và việc cần làm để leo lên cấp tiếp theo.", "Find where you stand and what to do to climb the next tier.")}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bandTiers.map((b, i) => (
              <div key={i} className="relative rounded-2xl p-5 border-2 border-slate-300 dark:border-slate-600 bg-background hover:border-primary/70 hover:shadow-lg transition-all">
                <div className={`absolute -top-3 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${b.color} text-white text-xs font-bold shadow`}>
                  {b.range}
                </div>
                <div className="flex items-center gap-2 mt-2 mb-2">
                  <b.icon className="w-5 h-5 text-primary shrink-0" />
                  <h3 className="font-display font-bold text-foreground text-base">{b.label}</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{b.action}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4 · Pain points + solutions */}
      <Section delay={0.2}>
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                {t("Tại sao SAT khó với học sinh Việt?", "Why SAT is hard for Vietnamese students?")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("3 rào cản phổ biến và cách thầy Hải giải quyết.", "3 common roadblocks and how Mr. Hai tackles them.")}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {painPoints.map((p, i) => (
              <div key={i} className="rounded-2xl p-5 border-2 border-amber-500/60 bg-gradient-to-br from-amber-500/10 to-orange-500/10 shadow-sm">
                <div className="flex items-start gap-2 mb-3">
                  <p.icon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <h3 className="font-display font-bold text-foreground text-[15px] leading-snug">{p.title}</h3>
                </div>
                <p className="text-sm text-foreground/80 mb-3 leading-relaxed">{p.pain}</p>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/15 border-2 border-emerald-500/40">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{p.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* 6 · FAQ */}
      <Section delay={0.3}>
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center shadow-sm">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg md:text-xl font-display font-semibold text-foreground tracking-tight">
              {t("Câu hỏi thường gặp về SAT", "SAT - Frequently asked questions")}
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2.5">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`q${i}`}
                className="border-2 border-slate-300 dark:border-slate-600 rounded-2xl px-4 bg-background data-[state=open]:bg-background data-[state=open]:border-primary/60 transition-colors"
              >
                <AccordionTrigger className="text-left text-[15px] font-semibold text-foreground tracking-tight hover:no-underline py-3.5 gap-3">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] text-foreground/80 leading-7 pb-4">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </Section>
    </>
  );
};

export default SatLandingExtras;
