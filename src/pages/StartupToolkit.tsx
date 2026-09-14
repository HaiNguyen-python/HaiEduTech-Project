import { useMemo, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BadgeDollarSign,
  CheckCircle2,
  CircleAlert,
  Coins,
  Layers,
  Lightbulb,
  Target,
  Timer,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type Accent = "blue" | "emerald" | "gold";

const Section = ({
  icon: Icon,
  title,
  description,
  accent,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: Accent;
  children: ReactNode;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    className={`toolkit-card toolkit-card--${accent}`}
  >
    <div className="mb-6 flex items-start gap-3">
      <div className="toolkit-icon" aria-hidden="true"><Icon className="h-5 w-5" /></div>
      <div className="min-w-0">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
    {children}
  </motion.section>
);

const NumInput = ({
  label,
  hint,
  value,
  setValue,
  unit,
  step = "any",
}: {
  label: string;
  hint?: string;
  value: number;
  setValue: (n: number) => void;
  unit?: string;
  step?: number | "any";
}) => (
  <label className="block min-w-0">
    <span className="block text-sm font-semibold text-foreground">{label}</span>
    {hint && <span className="mt-0.5 block min-h-5 text-xs leading-5 text-muted-foreground">{hint}</span>}
    <div className="relative mt-1.5">
      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(event) => setValue(Math.max(0, Number(event.target.value) || 0))}
        className="h-12 w-full rounded-lg border border-border bg-background px-3 pr-14 text-base font-bold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {unit && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">{unit}</span>}
    </div>
  </label>
);

const Metric = ({ label, value, note, tone = "blue" }: { label: string; value: string; note?: string; tone?: Accent }) => (
  <div className={`toolkit-metric toolkit-metric--${tone}`}>
    <span className="text-xs font-bold uppercase text-muted-foreground">{label}</span>
    <strong className="mt-1 block break-words text-lg font-extrabold sm:text-xl">{value}</strong>
    {note && <span className="mt-1 block text-xs leading-5 text-muted-foreground">{note}</span>}
  </div>
);

const StartupToolkit = () => {
  const { t } = useLanguage();

  // Unit economics
  const [arpu, setArpu] = useState(99000);
  const [margin, setMargin] = useState(0.8);
  const [churn, setChurn] = useState(0.08);
  const [cac, setCac] = useState(200000);
  const econ = useMemo(() => {
    const lifetime = churn > 0 ? 1 / churn : Infinity;
    const ltv = arpu * margin * lifetime;
    const contribution = arpu * margin;
    return {
      ltv,
      ratio: cac > 0 ? ltv / cac : Infinity,
      payback: contribution > 0 ? cac / contribution : Infinity,
    };
  }, [arpu, margin, churn, cac]);

  // Runway
  const [cash, setCash] = useState(3_000_000_000);
  const [burn, setBurn] = useState(350_000_000);
  const [rev, setRev] = useState(50_000_000);
  const runway = useMemo(() => {
    const net = burn - rev;
    return net <= 0 ? "∞" : (cash / net).toFixed(1);
  }, [cash, burn, rev]);

  // Cap table
  const [founders, setFounders] = useState(0.9);
  const [esop, setEsop] = useState(0.1);
  const [preMoney, setPreMoney] = useState(4_000_000);
  const [round, setRound] = useState(500_000);
  const cap = useMemo(() => {
    const post = preMoney + round;
    const investor = post > 0 ? round / post : 0;
    return { investor, founders: founders * (1 - investor), esop: esop * (1 - investor) };
  }, [founders, esop, preMoney, round]);

  // TAM/SAM/SOM
  const [customers, setCustomers] = useState(500_000);
  const [price, setPrice] = useState(3_000_000);
  const [samShare, setSamShare] = useState(0.4);
  const [somShare, setSomShare] = useState(0.03);
  const market = useMemo(() => {
    const tam = customers * price;
    const sam = tam * samShare;
    const som = sam * somShare;
    return { tam, sam, som };
  }, [customers, price, samShare, somShare]);

  const fmt = (n: number) => Number.isFinite(n) ? n.toLocaleString("vi-VN") : "∞";
  const decimal = (n: number, digits = 1) => Number.isFinite(n) ? n.toFixed(digits) : "∞";
  const runwayMonths = runway === "∞" ? Infinity : Number(runway);
  const runwayHealthy = runwayMonths >= 12;
  const runwayCritical = runwayMonths < 9;

  return (
    <>
      <Navbar />
      <main className="startup-toolkit-page min-h-screen bg-background">
        <Helmet>
          <title>{t("Startup Toolkit - Công cụ tài chính", "Startup Toolkit - Financial Calculators")}</title>
          <meta name="description" content={t("Bốn công cụ trực quan giúp tính hiệu quả khách hàng, runway, tỷ lệ sở hữu và quy mô thị trường.", "Four clear calculators for customer economics, runway, ownership and market size.")} />
        </Helmet>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Link to="/programming/startup" className="mb-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> {t("Về Startup Hub", "Back to Startup Hub")}
          </Link>

          <header className="mb-8 max-w-3xl">
            <span className="mb-3 block text-sm font-bold uppercase text-primary">{t("Bảng tài chính cho nhà sáng lập", "Founder's finance dashboard")}</span>
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">Startup Toolkit</h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
              {t("Điền các giả định của bạn để kiểm tra hiệu quả khách hàng, thời gian vận hành, tỷ lệ sở hữu và quy mô thị trường.", "Enter your assumptions to check customer economics, operating runway, ownership and market size.")}
            </p>
          </header>

          <section aria-label={t("Bốn câu hỏi chính", "Four key questions")} className="mb-8 grid grid-cols-1 border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              [TrendingUp, t("Khách hàng có sinh lời?", "Are customers profitable?")],
              [Timer, t("Tiền mặt còn bao lâu?", "How long will cash last?")],
              [Layers, t("Ai sở hữu bao nhiêu?", "Who owns how much?")],
              [Target, t("Thị trường lớn đến đâu?", "How large is the market?")],
            ].map(([Icon, label], index) => {
              const SummaryIcon = Icon as LucideIcon;
              return (
                <div key={label as string} className="flex min-h-20 items-center gap-3 border-border px-3 py-4 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0">
                  <span className="text-sm font-bold text-primary">0{index + 1}</span>
                  <SummaryIcon className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm font-semibold leading-5 text-foreground">{label as string}</span>
                </div>
              );
            })}
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
          <Section
            icon={TrendingUp}
            title="Unit Economics"
            description={t("Đo giá trị một khách hàng so với chi phí để có được khách hàng đó.", "Compare one customer's lifetime value with the cost to acquire them.")}
            accent="emerald"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <NumInput label="ARPU" hint={t("Doanh thu trung bình mỗi khách hàng/tháng", "Average monthly revenue per customer")} value={arpu} setValue={setArpu} unit="VND" />
              <NumInput label={t("Biên lợi nhuận gộp", "Gross margin")} hint={t("Nhập dạng thập phân, ví dụ 0,8 = 80%", "Use a decimal, for example 0.8 = 80%")} value={margin} setValue={setMargin} />
              <NumInput label={t("Tỷ lệ rời bỏ hàng tháng", "Monthly churn")} hint={t("Ví dụ 0,08 = 8% khách hàng rời đi", "For example 0.08 = 8% of customers leave")} value={churn} setValue={setChurn} />
              <NumInput label="CAC" hint={t("Chi phí thu hút một khách hàng mới", "Cost to acquire one new customer")} value={cac} setValue={setCac} unit="VND" />
            </div>
            <div className="toolkit-results mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Metric label="LTV" value={`${fmt(Math.round(econ.ltv))} VND`} note={t("Giá trị vòng đời", "Lifetime value")} tone="emerald" />
              <Metric label="LTV/CAC" value={`${decimal(econ.ratio, 2)}x`} note={econ.ratio >= 3 ? t("Tỷ lệ khỏe mạnh", "Healthy ratio") : t("Cần cải thiện", "Needs improvement")} tone={econ.ratio >= 3 ? "emerald" : "gold"} />
              <Metric label="Payback" value={`${decimal(econ.payback)} ${t("tháng", "months")}`} note={t("Thời gian hoàn vốn", "Time to recover CAC")} />
            </div>
          </Section>

          <Section
            icon={Timer}
            title={t("Runway - Thời gian vận hành", "Runway Calculator")}
            description={t("Ước tính startup có thể hoạt động bao lâu trước khi hết tiền mặt.", "Estimate how long the startup can operate before cash runs out.")}
            accent="blue"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <NumInput label={t("Tiền mặt hiện có", "Cash on hand")} hint={t("Số dư có thể sử dụng", "Available cash balance")} value={cash} setValue={setCash} unit="VND" />
              <NumInput label={t("Chi phí mỗi tháng", "Monthly expenses")} hint={t("Tổng tiền chi trong một tháng", "Total monthly cash outflow")} value={burn} setValue={setBurn} unit="VND" />
              <NumInput label={t("Doanh thu mỗi tháng", "Monthly revenue")} hint={t("Tiền thu về trong một tháng", "Monthly cash inflow")} value={rev} setValue={setRev} unit="VND" />
            </div>
            <div className={`toolkit-runway mt-6 ${runwayCritical ? "toolkit-runway--warning" : "toolkit-runway--healthy"}`}>
              <div>
                <span className="text-xs font-bold uppercase text-muted-foreground">Runway</span>
                <div className="mt-1 text-4xl font-extrabold text-foreground">{runway} <span className="text-base font-bold text-muted-foreground">{t("tháng", "months")}</span></div>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold">
                {runwayHealthy ? <CheckCircle2 className="h-5 w-5" /> : <CircleAlert className="h-5 w-5" />}
                {runwayCritical ? t("Cần lập kế hoạch gọi vốn", "Plan fundraising now") : runwayHealthy ? t("Khoảng đệm tốt", "Healthy buffer") : t("Theo dõi sát dòng tiền", "Watch cash flow closely")}
              </div>
            </div>
          </Section>

          <Section
            icon={Layers}
            title={t("Cap Table - Tỷ lệ sở hữu", "Cap Table - Ownership")}
            description={t("Xem vòng gọi vốn mới làm thay đổi tỷ lệ sở hữu như thế nào.", "See how a new funding round changes ownership percentages.")}
            accent="gold"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <NumInput label="Founders" hint={t("Tỷ lệ sở hữu trước vòng gọi vốn", "Ownership before the funding round")} value={founders} setValue={setFounders} />
              <NumInput label="ESOP" hint={t("Quỹ cổ phần dành cho nhân viên", "Employee stock option pool")} value={esop} setValue={setEsop} />
              <NumInput label="Pre-money" hint={t("Định giá trước khi nhận vốn", "Valuation before new investment")} value={preMoney} setValue={setPreMoney} unit="USD" />
              <NumInput label={t("Vốn gọi thêm", "Round size")} hint={t("Khoản đầu tư mới", "New investment amount")} value={round} setValue={setRound} unit="USD" />
            </div>
            <div className="mt-6" aria-label={t("Phân bổ tỷ lệ sở hữu sau gọi vốn", "Post-funding ownership allocation")}>
              <div className="toolkit-ownership-bar">
                <span className="toolkit-ownership-founders" style={{ width: `${Math.min(100, cap.founders * 100)}%` }} />
                <span className="toolkit-ownership-esop" style={{ width: `${Math.min(100, cap.esop * 100)}%` }} />
                <span className="toolkit-ownership-investor" style={{ width: `${Math.min(100, cap.investor * 100)}%` }} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Metric label="Founders" value={`${(cap.founders * 100).toFixed(1)}%`} tone="gold" />
                <Metric label="ESOP" value={`${(cap.esop * 100).toFixed(1)}%`} tone="blue" />
                <Metric label="Investors" value={`${(cap.investor * 100).toFixed(1)}%`} tone="emerald" />
              </div>
            </div>
          </Section>

          <Section
            icon={Coins}
            title="TAM / SAM / SOM"
            description={t("Đi từ toàn bộ thị trường đến phần doanh thu có thể đạt trong ba năm.", "Move from the total market to realistically attainable revenue in three years.")}
            accent="emerald"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <NumInput label={t("Khách hàng tiềm năng", "Potential customers")} hint={t("Tổng số người hoặc doanh nghiệp phù hợp", "Total relevant people or businesses")} value={customers} setValue={setCustomers} />
              <NumInput label={t("Giá mỗi khách hàng/năm", "Price per customer/year")} hint={t("Doanh thu trung bình mỗi năm", "Average annual revenue")} value={price} setValue={setPrice} unit="VND" />
              <NumInput label="SAM share" hint={t("Phần thị trường bạn có thể phục vụ, ví dụ 0,4 = 40%", "Serviceable share, for example 0.4 = 40%")} value={samShare} setValue={setSamShare} />
              <NumInput label="SOM share - Year 3" hint={t("Phần có thể đạt thực tế sau 3 năm", "Realistically attainable share after 3 years")} value={somShare} setValue={setSomShare} />
            </div>
            <div className="toolkit-market mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Metric label="TAM" value={fmt(Math.round(market.tam))} note={t("Toàn bộ thị trường", "Total market")} tone="blue" />
              <Metric label="SAM" value={fmt(Math.round(market.sam))} note={t("Có thể phục vụ", "Serviceable market")} tone="gold" />
              <Metric label="SOM Y3" value={fmt(Math.round(market.som))} note={t("Có thể đạt", "Obtainable market")} tone="emerald" />
            </div>
          </Section>
        </div>

          <aside className="mt-8 flex items-start gap-3 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <p>{t("Các con số là giả định để lập kế hoạch, không phải dự báo tài chính. Hãy chia sẻ với co-founder và cập nhật hàng tuần.", "These figures are planning assumptions, not financial forecasts. Share them with your co-founder and update them weekly.")}</p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default StartupToolkit;
