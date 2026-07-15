import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, Coins, Timer, TrendingUp, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border-2 border-border bg-card p-5">
    <div className="flex items-center gap-2 mb-4"><Icon className="w-5 h-5 text-orange-600" /><h2 className="text-lg font-black">{title}</h2></div>
    {children}
  </div>
);

const NumInput = ({ label, value, setValue, suffix }: { label: string; value: number; setValue: (n: number) => void; suffix?: string }) => (
  <label className="block">
    <span className="text-xs text-muted-foreground">{label}</span>
    <div className="flex items-center gap-1">
      <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value) || 0)}
        className="flex-1 rounded-lg border-2 border-border bg-background px-3 py-2 text-sm font-bold text-foreground" />
      {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
    </div>
  </label>
);

const StartupToolkit = () => {
  const { t } = useLanguage();

  // Unit economics
  const [arpu, setArpu] = useState(99000);
  const [margin, setMargin] = useState(0.8);
  const [churn, setChurn] = useState(0.08);
  const [cac, setCac] = useState(200000);
  const econ = useMemo(() => {
    const lifetime = 1 / churn;
    const ltv = arpu * margin * lifetime;
    return { ltv, ratio: ltv / cac, payback: cac / (arpu * margin) };
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
    const investor = round / post;
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

  const fmt = (n: number) => n.toLocaleString("vi-VN");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-950 dark:to-slate-900">
      <Helmet><title>{t("Startup Toolkit - Calculators", "Startup Toolkit - Calculators")}</title></Helmet>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Link to="/programming/startup" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Về Hub", "Back to Hub")}
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">{t("Startup Toolkit", "Startup Toolkit")}</h1>
        <p className="text-muted-foreground mb-8">{t("4 công cụ tương tác: unit economics, runway, cap table, TAM/SAM/SOM.", "4 interactive tools: unit economics, runway, cap table, TAM/SAM/SOM.")}</p>

        <div className="grid md:grid-cols-2 gap-4">
          <Section icon={TrendingUp} title="Unit Economics">
            <div className="grid grid-cols-2 gap-3">
              <NumInput label="ARPU / tháng (VND)" value={arpu} setValue={setArpu} />
              <NumInput label="Gross margin (0-1)" value={margin} setValue={setMargin} />
              <NumInput label="Monthly churn (0-1)" value={churn} setValue={setChurn} />
              <NumInput label="CAC (VND)" value={cac} setValue={setCac} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-emerald-500/10 p-3"><div className="text-[10px] uppercase text-muted-foreground">LTV</div><div className="text-sm font-black text-emerald-600">{fmt(Math.round(econ.ltv))}</div></div>
              <div className={`rounded-xl p-3 ${econ.ratio >= 3 ? "bg-emerald-500/10" : "bg-rose-500/10"}`}><div className="text-[10px] uppercase text-muted-foreground">LTV/CAC</div><div className={`text-sm font-black ${econ.ratio >= 3 ? "text-emerald-600" : "text-rose-600"}`}>{econ.ratio.toFixed(2)}</div></div>
              <div className="rounded-xl bg-blue-500/10 p-3"><div className="text-[10px] uppercase text-muted-foreground">Payback</div><div className="text-sm font-black text-blue-600">{econ.payback.toFixed(1)} mo</div></div>
            </div>
          </Section>

          <Section icon={Timer} title="Runway Calculator">
            <div className="grid grid-cols-2 gap-3">
              <NumInput label="Cash on hand (VND)" value={cash} setValue={setCash} />
              <NumInput label="Monthly burn (VND)" value={burn} setValue={setBurn} />
              <NumInput label="Monthly revenue (VND)" value={rev} setValue={setRev} />
            </div>
            <div className="mt-4 text-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 p-4 text-white">
              <div className="text-xs uppercase opacity-90">Runway</div>
              <div className="text-3xl font-black">{runway} <span className="text-base">{t("tháng", "months")}</span></div>
              <div className="text-[11px] opacity-80 mt-1">{Number(runway) < 9 ? t("⚠️ Bắt đầu gọi vốn ngay", "⚠️ Start fundraising now") : t("✅ Còn thời gian", "✅ You have time")}</div>
            </div>
          </Section>

          <Section icon={Layers} title="Cap Table (Post-Money Dilution)">
            <div className="grid grid-cols-2 gap-3">
              <NumInput label="Founders %" value={founders} setValue={setFounders} />
              <NumInput label="ESOP %" value={esop} setValue={setEsop} />
              <NumInput label="Pre-money ($)" value={preMoney} setValue={setPreMoney} />
              <NumInput label="Round size ($)" value={round} setValue={setRound} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-orange-500/10 p-3"><div className="text-[10px] uppercase text-muted-foreground">Founders</div><div className="text-sm font-black text-orange-600">{(cap.founders * 100).toFixed(1)}%</div></div>
              <div className="rounded-xl bg-blue-500/10 p-3"><div className="text-[10px] uppercase text-muted-foreground">ESOP</div><div className="text-sm font-black text-blue-600">{(cap.esop * 100).toFixed(1)}%</div></div>
              <div className="rounded-xl bg-fuchsia-500/10 p-3"><div className="text-[10px] uppercase text-muted-foreground">Investors</div><div className="text-sm font-black text-fuchsia-600">{(cap.investor * 100).toFixed(1)}%</div></div>
            </div>
          </Section>

          <Section icon={Coins} title="TAM / SAM / SOM">
            <div className="grid grid-cols-2 gap-3">
              <NumInput label={t("# khách tiềm năng", "# potential customers")} value={customers} setValue={setCustomers} />
              <NumInput label={t("Giá / khách / năm (VND)", "Price / customer / year (VND)")} value={price} setValue={setPrice} />
              <NumInput label="SAM share (0-1)" value={samShare} setValue={setSamShare} />
              <NumInput label="SOM share Year 3 (0-1)" value={somShare} setValue={setSomShare} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-purple-500/10 p-3"><div className="text-[10px] uppercase text-muted-foreground">TAM</div><div className="text-xs font-black text-purple-600">{fmt(Math.round(market.tam))}</div></div>
              <div className="rounded-xl bg-indigo-500/10 p-3"><div className="text-[10px] uppercase text-muted-foreground">SAM</div><div className="text-xs font-black text-indigo-600">{fmt(Math.round(market.sam))}</div></div>
              <div className="rounded-xl bg-emerald-500/10 p-3"><div className="text-[10px] uppercase text-muted-foreground">SOM Y3</div><div className="text-xs font-black text-emerald-600">{fmt(Math.round(market.som))}</div></div>
            </div>
          </Section>
        </div>

        <div className="mt-8 rounded-xl border-2 border-orange-400/40 bg-orange-500/5 p-4 text-sm text-muted-foreground">
          💡 {t("Mọi con số ở đây là draft. Copy sang Google Sheet để share với co-founder và cập nhật hàng tuần.", "All numbers here are drafts. Copy to Google Sheets to share with co-founders and update weekly.")}
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default StartupToolkit;
