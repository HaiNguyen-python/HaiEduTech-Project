import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Case {
  name: string;
  flag: string;
  vertical: string;
  problem: string;
  insight: string;
  gtm: string;
  metric: string;
  lesson: string;
}

const CASES: Case[] = [
  { name: "ELSA Speak", flag: "🇻🇳", vertical: "EdTech AI",
    problem: "Người Việt nói tiếng Anh khó được máy/native hiểu.",
    insight: "Lỗi phát âm khác nhau theo native language - cần model riêng cho VN.",
    gtm: "Freemium app + KOC + Facebook groups ôn IELTS.",
    metric: "$23M Series C (Google, Monk's Hill), 40M+ downloads.",
    lesson: "Vertical AI + dataset theo L1 (ngôn ngữ mẹ đẻ) = moat."},
  { name: "VinAI", flag: "🇻🇳", vertical: "Foundation NLP",
    problem: "NLP tiếng Việt yếu, không model chất lượng.",
    insight: "Corp-backed research + open source (PhoBERT, ViT5) tạo credibility.",
    gtm: "Enterprise VinGroup + license + xuất khẩu.",
    metric: "Model tiếng Việt SOTA, spin-off từ VinGroup.",
    lesson: "Corp-backed research là con đường Việt cho deep tech."},
  { name: "Misa AVA", flag: "🇻🇳", vertical: "Fintech/SME",
    problem: "Kế toán SME tốn 5h/ngày nhập hoá đơn.",
    insight: "OCR + phân loại chi phí auto giảm 80% thời gian.",
    gtm: "B2B SME 5-30 người, ARPU cao, cross-sell từ Misa core.",
    metric: "Triển khai 200k+ SME VN.",
    lesson: "B2B đi sau flagship (Misa Accounting) mở cross-sell dễ."},
  { name: "Got It", flag: "🇻🇳", vertical: "EdTech marketplace",
    problem: "Học sinh Mỹ cần gia sư 24/7.",
    insight: "Marketplace expert + AI assist đưa response < 10 phút.",
    gtm: "Xuất khẩu VN→US, subscription B2C.",
    metric: "Series C $9M, expert network 100k+.",
    lesson: "Founder VN có thể build cho market Mỹ nếu operations tại VN."},
  { name: "Trusting Social", flag: "🇻🇳", vertical: "Fintech",
    problem: "500M người SEA không có credit history.",
    insight: "Alt data (SMS, telco, social) predict credit tốt hơn score truyền thống.",
    gtm: "B2B banks + telco SEA.",
    metric: "$65M Series C, 5 markets.",
    lesson: "Data thay thế là moat khi data truyền thống thiếu."},
  { name: "Kiki Auto", flag: "🇻🇳", vertical: "Voice AI",
    problem: "Tài xế VN không rảnh tay để bấm điện thoại.",
    insight: "Trợ lý giọng nói tiếng Việt + hiểu ngữ cảnh xe.",
    gtm: "In-car app + partner OEM.",
    metric: "1M+ users, backed by Zalo/VNG.",
    lesson: "Voice-first cho use case rảnh tay là niche còn trống."},
  { name: "Airbnb", flag: "🌍", vertical: "Marketplace",
    problem: "Khách sạn đắt, không authentic.",
    insight: "Chụp ảnh chuyên nghiệp cho host tăng booking 5x.",
    gtm: "Craigslist arbitrage đầu tiên + guerilla NYC/SF.",
    metric: "$100B IPO.",
    lesson: "Do things that don't scale ở giai đoạn 0-1."},
  { name: "Notion", flag: "🌍", vertical: "Productivity SaaS",
    problem: "Doc + wiki + DB rời rạc.",
    insight: "Blocks composable như Lego.",
    gtm: "Product-led + Twitter community + templates.",
    metric: "$10B valuation, 30M+ users.",
    lesson: "Product-led growth qua template ecosystem."},
  { name: "Figma", flag: "🌍", vertical: "Design SaaS",
    problem: "Sketch chỉ Mac, no realtime collab.",
    insight: "WebGL đủ mạnh chạy design tool trên browser.",
    gtm: "Freemium + design community + FigJam.",
    metric: "$20B Adobe acquisition offer (2022).",
    lesson: "Đặt cược vào công nghệ nền tảng sắp chín."},
  { name: "Duolingo", flag: "🌍", vertical: "EdTech consumer",
    problem: "Học ngôn ngữ tốn tiền/thời gian.",
    insight: "Gamification + streak = habit loop mạnh.",
    gtm: "Freemium + SEO + streak notification.",
    metric: "$500M+ revenue, IPO 2021.",
    lesson: "Habit loop + gamification thắng B2C EdTech."},
  { name: "OpenAI", flag: "🌍", vertical: "AI foundation",
    problem: "AI chưa reasoning tốt.",
    insight: "Scale = intelligence (Chinchilla + GPT scaling laws).",
    gtm: "API developer-first, ChatGPT viral B2C.",
    metric: "$150B+ valuation, $3.4B ARR (2024).",
    lesson: "Foundation model cần chục tỷ USD - vertical là con đường VN."},
  { name: "Perplexity", flag: "🌍", vertical: "AI search",
    problem: "Google trả 10 link không trả lời.",
    insight: "LLM + citation làm search tin cậy hơn.",
    gtm: "Product-led + Twitter + partner Snapdragon/Rabbit.",
    metric: "$3B valuation trong 2 năm.",
    lesson: "Focus 1 vertical (search), làm 10x tốt hơn incumbent."},
];

const StartupCaseStudies = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-950 dark:to-slate-900">
      <Helmet><title>{t("Case Studies - Startup Tech", "Case Studies - Startup Tech")}</title></Helmet>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Link to="/programming/startup" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Về Hub", "Back to Hub")}
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
          {t("12 Case Studies: 6 Việt Nam + 6 Global", "12 Case Studies: 6 Vietnam + 6 Global")}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t("Mỗi case: Problem · Insight · GTM · Metric · Bài học rút ra.", "Each case: Problem · Insight · GTM · Metric · Lesson learned.")}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {CASES.map((c) => (
            <div key={c.name} className="rounded-2xl border-2 border-border bg-card p-5 hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{c.flag}</span>
                <div>
                  <h3 className="text-lg font-black text-foreground">{c.name}</h3>
                  <div className="text-xs text-muted-foreground">{c.vertical}</div>
                </div>
              </div>
              <dl className="space-y-1.5 text-sm">
                <div><dt className="inline font-bold text-orange-600">Problem: </dt><dd className="inline text-foreground">{c.problem}</dd></div>
                <div><dt className="inline font-bold text-rose-600">Insight: </dt><dd className="inline text-foreground">{c.insight}</dd></div>
                <div><dt className="inline font-bold text-fuchsia-600">GTM: </dt><dd className="inline text-foreground">{c.gtm}</dd></div>
                <div><dt className="inline font-bold text-blue-600">Metric: </dt><dd className="inline text-foreground">{c.metric}</dd></div>
                <div className="pt-1.5 border-t border-border/50 mt-2">
                  <dt className="inline font-bold text-emerald-600">💡 Lesson: </dt><dd className="inline text-foreground">{c.lesson}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartupCaseStudies;
