/**
 * @file SwedishSvenskfinland.tsx
 * @description /swedish/svenskfinland — Integration guide for Swedish-speakers in Finland.
 *              Mirrors the structure of /finnish/life-in-finland but tailored to Svenskfinland.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { motion } from "framer-motion";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { CheckCircle2, MapPin, Newspaper, Radio, Briefcase, Heart, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Section {
  Icon: typeof MapPin;
  titleVi: string;
  titleEn: string;
  itemsVi: string[];
  itemsEn: string[];
}

const SECTIONS: Section[] = [
  {
    Icon: MapPin,
    titleVi: "Bản đồ Svenskfinland",
    titleEn: "The Svenskfinland map",
    itemsVi: [
      "Helsingfors (Helsinki) — thủ đô song ngữ, ~6% nói tiếng Thụy Điển.",
      "Vasa (Vaasa) — trung tâm bờ biển phía Tây, tỷ lệ tiếng Thụy Điển cao.",
      "Åbo (Turku) — thành phố cổ, gốc Thụy Điển mạnh.",
      "Åland — quần đảo tự trị, hoàn toàn dùng tiếng Thụy Điển.",
    ],
    itemsEn: [
      "Helsingfors (Helsinki) — bilingual capital, ~6% Swedish-speakers.",
      "Vasa (Vaasa) — west-coast hub with a high Swedish ratio.",
      "Åbo (Turku) — historic city with strong Swedish roots.",
      "Åland — autonomous archipelago, entirely Swedish-speaking.",
    ],
  },
  {
    Icon: Briefcase,
    titleVi: "Thủ tục bằng tiếng Thụy Điển",
    titleEn: "Paperwork in Swedish",
    itemsVi: [
      "DVV (Myndigheten för digitalisering): mã số cá nhân, cư trú — có form svenska.",
      "FPA (Kela): bảo hiểm xã hội, trợ cấp con nhỏ, hỗ trợ học sinh.",
      "Skatteverket / Skatt.fi: thẻ thuế (skattekort), khai thuế hàng năm.",
      "Migri: visa, giấy phép cư trú và quốc tịch.",
    ],
    itemsEn: [
      "DVV (Digital Agency): personal ID, residence — Swedish forms available.",
      "FPA (Kela): social insurance, child benefit, student support.",
      "Skatteverket / Skatt.fi: tax card (skattekort) and annual tax return.",
      "Migri: visa, residence permits and citizenship.",
    ],
  },
  {
    Icon: Newspaper,
    titleVi: "Truyền thông & nguồn tin Thụy Điển",
    titleEn: "Swedish media & news",
    itemsVi: [
      "Hufvudstadsbladet (Hbl) — báo lớn nhất bằng tiếng Thụy Điển.",
      "Yle Svenska — kênh tin online tiếng Thụy Điển của đài quốc gia.",
      "Östnyland, Vasabladet — báo địa phương song ngữ.",
      "Svensk YLE app — tin tức, podcast và radio trực tiếp.",
    ],
    itemsEn: [
      "Hufvudstadsbladet (Hbl) — Finland's largest Swedish-language daily.",
      "Yle Svenska — national broadcaster's Swedish online channel.",
      "Östnyland, Vasabladet — regional bilingual papers.",
      "Svensk YLE app — news, podcasts and live radio.",
    ],
  },
  {
    Icon: Radio,
    titleVi: "Đài & podcast luyện nghe",
    titleEn: "Radio & podcasts for listening",
    itemsVi: [
      "Yle Vega — kênh radio chính bằng tiếng Thụy Điển.",
      "Yle Vega Eftermiddag — chương trình buổi chiều tốc độ vừa.",
      "Podcast 'Lugn och fin' — chậm, rất hợp YKI A2.",
      "Podcast 'Svenska nyheter på lätt svenska' — bản tin chậm.",
    ],
    itemsEn: [
      "Yle Vega — main Swedish-language radio channel.",
      "Yle Vega Eftermiddag — moderate-pace afternoon show.",
      "'Lugn och fin' podcast — slow, perfect for YKI A2.",
      "'Svenska nyheter på lätt svenska' — slow news bulletin.",
    ],
  },
  {
    Icon: Users,
    titleVi: "Cộng đồng & sự kiện",
    titleEn: "Communities & events",
    itemsVi: [
      "Folkhälsan, Luckan — trung tâm cộng đồng tiếng Thụy Điển.",
      "Svenska litteratursällskapet (SLS) — hội văn học Thụy Điển.",
      "Lễ Svenska dagen — 6/11 hàng năm, ngày tiếng Thụy Điển ở Phần Lan.",
      "Hội sinh viên Nylands Nation, Östra Finlands Nation (Helsinki).",
    ],
    itemsEn: [
      "Folkhälsan, Luckan — Swedish-language community centres.",
      "Svenska litteratursällskapet (SLS) — Swedish literary society.",
      "Svenska dagen — every 6 November, the Swedish Day in Finland.",
      "Student nations Nylands Nation, Östra Finlands Nation (Helsinki).",
    ],
  },
  {
    Icon: Heart,
    titleVi: "Checklist 30 ngày đầu",
    titleEn: "First 30 days checklist",
    itemsVi: [
      "Đăng ký DVV → nhận hetu (personnummer).",
      "Mở tài khoản ngân hàng + bật BankID/Mobilbank.",
      "Đăng ký Kela & thẻ Kela-kort.",
      "Lấy skattekort tại Skatt.fi.",
      "Đăng ký terveysasema (trạm y tế) khu vực.",
      "Đăng ký khóa tiếng Thụy Điển miễn phí qua TE-byrå (TE-toimisto).",
    ],
    itemsEn: [
      "Register at DVV → receive your hetu (personal ID).",
      "Open a bank account + activate BankID / mobile bank.",
      "Register with Kela & receive your Kela-kort.",
      "Get your tax card at Skatt.fi.",
      "Register with the local terveysasema (health centre).",
      "Sign up for free Swedish classes via TE-byrå (TE-toimisto).",
    ],
  },
];

const SwedishSvenskfinland = () => {
  const { t } = useLanguage();
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="Svenskfinland — Sống bằng tiếng Thụy Điển ở Phần Lan | HaiEduTech"
        description="Hướng dẫn hội nhập cho người dùng tiếng Thụy Điển tại Phần Lan: DVV, Kela, FPA, Hbl, Yle Vega, cộng đồng Helsingfors/Vasa/Åbo/Åland."
        path="/swedish/svenskfinland"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
          <header className="text-center">
            <Badge className="mb-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0">
              {t("Hướng dẫn hội nhập", "Integration Guide")}
            </Badge>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              {t("🇸🇪 Svenskfinland — Sống bằng tiếng Thụy Điển ở Phần Lan", "🇸🇪 Svenskfinland — Living in Swedish-speaking Finland")}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t(
                "Tổng hợp thủ tục, truyền thông, cộng đồng và checklist 30 ngày đầu cho người dùng tiếng Thụy Điển tại Phần Lan.",
                "A consolidated guide to paperwork, media, communities and a 30-day checklist for Swedish-speakers settling in Finland."
              )}
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {SECTIONS.map((s, i) => {
              const Icon = s.Icon;
              return (
                <motion.div key={s.titleEn} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Icon className="h-5 w-5 text-primary" />
                        {t(s.titleVi, s.titleEn)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {(t(s.itemsVi.join("|"), s.itemsEn.join("|")) as string).split("|").map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishSvenskfinland;
