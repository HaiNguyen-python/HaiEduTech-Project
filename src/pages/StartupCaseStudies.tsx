import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Compass, Lightbulb, Sparkles, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import elsaImage from "@/assets/cases/elsa-speak.jpg";
import vinaiImage from "@/assets/cases/vinai.jpg";
import misaImage from "@/assets/cases/misa-ava.jpg";
import gotItImage from "@/assets/cases/got-it.jpg";
import trustingSocialImage from "@/assets/cases/trusting-social.jpg";
import kikiAutoImage from "@/assets/cases/kiki-auto.jpg";
import airbnbImage from "@/assets/cases/airbnb.jpg";
import notionImage from "@/assets/cases/notion.jpg";
import figmaImage from "@/assets/cases/figma.jpg";
import duolingoImage from "@/assets/cases/duolingo.jpg";
import openaiImage from "@/assets/cases/openai.jpg";
import perplexityImage from "@/assets/cases/perplexity.jpg";

interface Case {
  name: string;
  flag: string;
  vertical: string;
  problem: string;
  insight: string;
  gtm: string;
  metric: string;
  lesson: string;
  image: string;
  featured?: boolean;
}

const CASES: Case[] = [
  { name: "ELSA Speak", flag: "🇻🇳", vertical: "EdTech AI",
    problem: "Người Việt nói tiếng Anh khó được máy/native hiểu.",
    insight: "Lỗi phát âm khác nhau theo native language - cần model riêng cho VN.",
    gtm: "Freemium app + KOC + Facebook groups ôn IELTS.",
    metric: "$23M Series C (Google, Monk's Hill), 40M+ downloads.",
    lesson: "Vertical AI + dataset theo L1 (ngôn ngữ mẹ đẻ) = moat.", image: elsaImage, featured: true},
  { name: "VinAI", flag: "🇻🇳", vertical: "Foundation NLP",
    problem: "NLP tiếng Việt yếu, không model chất lượng.",
    insight: "Corp-backed research + open source (PhoBERT, ViT5) tạo credibility.",
    gtm: "Enterprise VinGroup + license + xuất khẩu.",
    metric: "Model tiếng Việt SOTA, spin-off từ VinGroup.",
    lesson: "Corp-backed research là con đường Việt cho deep tech.", image: vinaiImage},
  { name: "Misa AVA", flag: "🇻🇳", vertical: "Fintech/SME",
    problem: "Kế toán SME tốn 5h/ngày nhập hoá đơn.",
    insight: "OCR + phân loại chi phí auto giảm 80% thời gian.",
    gtm: "B2B SME 5-30 người, ARPU cao, cross-sell từ Misa core.",
    metric: "Triển khai 200k+ SME VN.",
    lesson: "B2B đi sau flagship (Misa Accounting) mở cross-sell dễ.", image: misaImage},
  { name: "Got It", flag: "🇻🇳", vertical: "EdTech marketplace",
    problem: "Học sinh Mỹ cần gia sư 24/7.",
    insight: "Marketplace expert + AI assist đưa response < 10 phút.",
    gtm: "Xuất khẩu VN→US, subscription B2C.",
    metric: "Series C $9M, expert network 100k+.",
    lesson: "Founder VN có thể build cho market Mỹ nếu operations tại VN.", image: gotItImage},
  { name: "Trusting Social", flag: "🇻🇳", vertical: "Fintech",
    problem: "500M người SEA không có credit history.",
    insight: "Alt data (SMS, telco, social) predict credit tốt hơn score truyền thống.",
    gtm: "B2B banks + telco SEA.",
    metric: "$65M Series C, 5 markets.",
    lesson: "Data thay thế là moat khi data truyền thống thiếu.", image: trustingSocialImage},
  { name: "Kiki Auto", flag: "🇻🇳", vertical: "Voice AI",
    problem: "Tài xế VN không rảnh tay để bấm điện thoại.",
    insight: "Trợ lý giọng nói tiếng Việt + hiểu ngữ cảnh xe.",
    gtm: "In-car app + partner OEM.",
    metric: "1M+ users, backed by Zalo/VNG.",
    lesson: "Voice-first cho use case rảnh tay là niche còn trống.", image: kikiAutoImage},
  { name: "Airbnb", flag: "🌍", vertical: "Marketplace",
    problem: "Khách sạn đắt, không authentic.",
    insight: "Chụp ảnh chuyên nghiệp cho host tăng booking 5x.",
    gtm: "Craigslist arbitrage đầu tiên + guerilla NYC/SF.",
    metric: "$100B IPO.",
    lesson: "Do things that don't scale ở giai đoạn 0-1.", image: airbnbImage, featured: true},
  { name: "Notion", flag: "🌍", vertical: "Productivity SaaS",
    problem: "Doc + wiki + DB rời rạc.",
    insight: "Blocks composable như Lego.",
    gtm: "Product-led + Twitter community + templates.",
    metric: "$10B valuation, 30M+ users.",
    lesson: "Product-led growth qua template ecosystem.", image: notionImage},
  { name: "Figma", flag: "🌍", vertical: "Design SaaS",
    problem: "Sketch chỉ Mac, no realtime collab.",
    insight: "WebGL đủ mạnh chạy design tool trên browser.",
    gtm: "Freemium + design community + FigJam.",
    metric: "$20B Adobe acquisition offer (2022).",
    lesson: "Đặt cược vào công nghệ nền tảng sắp chín.", image: figmaImage},
  { name: "Duolingo", flag: "🌍", vertical: "EdTech consumer",
    problem: "Học ngôn ngữ tốn tiền/thời gian.",
    insight: "Gamification + streak = habit loop mạnh.",
    gtm: "Freemium + SEO + streak notification.",
    metric: "$500M+ revenue, IPO 2021.",
    lesson: "Habit loop + gamification thắng B2C EdTech.", image: duolingoImage},
  { name: "OpenAI", flag: "🌍", vertical: "AI foundation",
    problem: "AI chưa reasoning tốt.",
    insight: "Scale = intelligence (Chinchilla + GPT scaling laws).",
    gtm: "API developer-first, ChatGPT viral B2C.",
    metric: "$150B+ valuation, $3.4B ARR (2024).",
    lesson: "Foundation model cần chục tỷ USD - vertical là con đường VN.", image: openaiImage},
  { name: "Perplexity", flag: "🌍", vertical: "AI search",
    problem: "Google trả 10 link không trả lời.",
    insight: "LLM + citation làm search tin cậy hơn.",
    gtm: "Product-led + Twitter + partner Snapdragon/Rabbit.",
    metric: "$3B valuation trong 2 năm.",
    lesson: "Focus 1 vertical (search), làm 10x tốt hơn incumbent.", image: perplexityImage},
];

const CaseCard = ({ item, index }: { item: Case; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.42, delay: Math.min(index * 0.04, 0.2) }}
    className={`case-study-card ${item.featured ? "case-study-card--featured lg:col-span-2 lg:row-span-2" : ""}`}
  >
    <div className="case-study-card__visual">
      <img src={item.image} alt={`${item.name} case study illustration`} width={768} height={512} loading="lazy" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
        <span className="rounded-md border border-card/80 bg-card/90 px-2.5 py-1 text-xs font-extrabold text-foreground shadow-sm backdrop-blur-sm">{item.flag === "🇻🇳" ? "VN" : "GLOBAL"} · {item.vertical}</span>
      </div>
    </div>
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="mb-5">
        <p className="mb-2 text-xs font-extrabold uppercase text-primary">Case {String(index + 1).padStart(2, "0")}</p>
        <h3 className={`${item.featured ? "text-2xl sm:text-3xl" : "text-xl"} font-extrabold leading-tight text-foreground`}>{item.name}</h3>
      </div>
      <dl className="grid gap-4 text-sm leading-relaxed sm:grid-cols-2">
        <div><dt className="mb-1 flex items-center gap-2 font-extrabold text-foreground"><Target className="h-4 w-4 text-primary" /> Problem</dt><dd className="text-muted-foreground">{item.problem}</dd></div>
        <div><dt className="mb-1 flex items-center gap-2 font-extrabold text-foreground"><Lightbulb className="h-4 w-4 text-accent" /> Insight</dt><dd className="text-muted-foreground">{item.insight}</dd></div>
        <div><dt className="mb-1 flex items-center gap-2 font-extrabold text-foreground"><Compass className="h-4 w-4 text-primary" /> GTM</dt><dd className="text-muted-foreground">{item.gtm}</dd></div>
        <div className="case-study-card__metric rounded-md p-3"><dt className="mb-1 flex items-center gap-2 font-extrabold text-foreground"><BarChart3 className="h-4 w-4 text-primary" /> Metric</dt><dd className="font-semibold text-foreground">{item.metric}</dd></div>
      </dl>
      <div className="case-study-card__lesson mt-5 rounded-md p-4"><p className="flex items-start gap-2 text-sm font-bold leading-relaxed text-foreground"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span><span className="font-extrabold">Lesson:</span> {item.lesson}</span></p></div>
    </div>
  </motion.article>
);

const StartupCaseStudies = () => {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <main className="case-studies-page min-h-screen">
      <Helmet><title>{t("Case Studies Startup - HaiEduTech", "Startup Case Studies - HaiEduTech")}</title><meta name="description" content={t("12 case study startup Việt Nam và quốc tế với bài học về sản phẩm, tăng trưởng và công nghệ.", "12 Vietnamese and global startup case studies covering product, growth, and technology lessons.")} /></Helmet>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link to="/programming/startup" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Về Hub", "Back to Hub")}
        </Link>
        <header className="mb-12 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-extrabold text-primary"><Sparkles className="h-4 w-4" /> Founder field notes</div>
          <h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">{t("12 câu chuyện startup, 12 bài học thực chiến", "12 startup stories, 12 field-tested lessons")}</h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">{t("Khám phá cách 6 startup Việt Nam và 6 công ty toàn cầu tìm ra lợi thế, tiếp cận thị trường và biến insight thành tăng trưởng.", "See how 6 Vietnamese startups and 6 global companies found an edge, reached their market, and turned insight into growth.")}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold"><span className="rounded-md bg-primary/10 px-3 py-2 text-primary">6 Vietnam</span><span className="rounded-md bg-accent/15 px-3 py-2 text-foreground">6 Global</span><span className="rounded-md bg-secondary px-3 py-2 text-secondary-foreground">Problem · Insight · GTM · Metric</span></div>
        </header>
        {[
          { key: "vietnam", title: t("Từ Việt Nam ra thế giới", "Built in Vietnam, ready for the world"), subtitle: t("Các lợi thế địa phương trở thành sản phẩm có sức cạnh tranh toàn cầu.", "Local advantages transformed into globally competitive products."), items: CASES.slice(0, 6) },
          { key: "global", title: t("Những cú bứt phá toàn cầu", "Global breakthrough plays"), subtitle: t("Những quyết định sản phẩm và tăng trưởng đã thay đổi cả thị trường.", "The product and growth decisions that reshaped entire markets."), items: CASES.slice(6) },
        ].map((section) => (
          <section key={section.key} className={`case-section--${section.key} mb-16`} aria-labelledby={`${section.key}-cases`}>
            <div className="mb-6 flex flex-col justify-between gap-3 border-b border-border pb-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-sm font-extrabold uppercase text-primary">{section.key === "vietnam" ? "Vietnam collection" : "Global collection"}</p><h2 id={`${section.key}-cases`} className="text-2xl font-extrabold text-foreground sm:text-3xl">{section.title}</h2></div><p className="max-w-xl text-sm font-medium leading-relaxed text-muted-foreground sm:text-right">{section.subtitle}</p></div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{section.items.map((item, index) => <CaseCard key={item.name} item={item} index={index + (section.key === "global" ? 6 : 0)} />)}</div>
          </section>
        ))}
      </div>
    </main>
    <Footer />
  </>
  );
};

export default StartupCaseStudies;
