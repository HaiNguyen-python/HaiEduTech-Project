/**
 * @file lifeInFinlandExpansion3.ts
 * @description Phase-3 expansion (2026): integration courses, libraries & free
 *              culture, Finnish working culture deep-dive, recycling system,
 *              winter driving safety, and extra checklist items.
 * @author HaiEduTech
 */

import type { NewcomerGuide, ChecklistItem } from "./lifeInFinlandData";

// ============================================================
// WORK / EDUCATION pillar additions
// ============================================================
export const INTEGRATION_GUIDES: NewcomerGuide[] = [
  {
    id: "kotoutumiskoulutus-2026",
    icon: "GraduationCap",
    emoji: "🎓",
    title: "Kotoutumiskoulutus - Khóa hòa nhập miễn phí",
    titleEn: "Integration training (free Finnish course)",
    summary:
      "Khóa Finnish + kỹ năng việc làm 6-12 tháng do TE-toimisto tài trợ. Nhận trợ cấp ~32€/ngày trong khi học. Đầu ra A2-B1.",
    summaryEn:
      "6-12 month TE-financed Finnish + employment skills course. ~€32/day allowance while studying. Exit level A2-B1.",
    steps: [
      { vi: "Đăng ký TE-palvelut.fi và đặt lịch tư vấn 'kotoutumissuunnitelma'.", en: "Register at TE-palvelut.fi and book a kotoutumissuunnitelma appointment." },
      { vi: "Làm bài Placement Test (kielitesti) tại Testipiste để chia lớp.", en: "Take the Testipiste placement test to be assigned a level." },
      { vi: "Học 5 ngày/tuần. Mỗi mô-đun 8 tuần: kielitaito + työelämätaidot + harjoittelu.", en: "Study 5 days/week. Each 8-week module: language + work skills + internship." },
      { vi: "Cuối khoá thi YKI Yleinen B1 - cần để xin quốc tịch Phần Lan.", en: "Final YKI Yleinen B1 - required for Finnish citizenship." },
    ],
    keyTerms: [
      { fi: "Kotoutumiskoulutus", vi: "Khóa hòa nhập", en: "Integration training" },
      { fi: "TE-toimisto", vi: "Văn phòng việc làm", en: "Employment office" },
      { fi: "Työharjoittelu", vi: "Thực tập", en: "Work placement" },
      { fi: "Kielitaito", vi: "Trình độ tiếng", en: "Language proficiency" },
    ],
    phrases: [
      { fi: "Haluaisin aloittaa kotoutumiskoulutuksen.", vi: "Tôi muốn bắt đầu khóa hòa nhập.", en: "I'd like to start integration training." },
      { fi: "Milloin seuraava kurssi alkaa?", vi: "Khoá tiếp theo bắt đầu khi nào?", en: "When does the next course start?" },
    ],
    proTip: {
      vi: "Sau 8h học mỗi ngày, hãy nói tiếng Phần ở quán cà phê - tốc độ tiến bộ tăng gấp 3.",
      en: "After 8h of study, practise Finnish at cafés - progress speeds up 3x.",
    },
  },
];

// ============================================================
// DAILY pillar additions
// ============================================================
export const LIBRARY_GUIDES: NewcomerGuide[] = [
  {
    id: "library-helmet",
    icon: "BookOpen",
    emoji: "📚",
    title: "Thư viện Helmet & Yle Areena (miễn phí 100%)",
    titleEn: "Helmet libraries & Yle Areena (100% free)",
    summary:
      "Thư viện Phần Lan miễn phí: mượn sách/ebook, máy in, phòng họp, đàn piano, hàng nghìn phim. Yle Areena phát phim & series Phần Lan kèm phụ đề.",
    summaryEn:
      "Finnish libraries are free: borrow books/ebooks, printers, meeting rooms, even pianos. Yle Areena streams Finnish films & series with subtitles.",
    steps: [
      { vi: "Đăng ký thẻ thư viện tại helmet.fi (Helsinki) - mang passport + giấy đăng ký cư trú.", en: "Register at helmet.fi (Helsinki) with passport + residence proof." },
      { vi: "Mượn 50 đầu sách/lần, miễn phí. Trả qua máy tự động 24/7.", en: "Borrow 50 items at a time, free. Return via 24/7 self-service." },
      { vi: "Đặt phòng học/họp miễn phí qua ứng dụng Helmet.", en: "Book quiet study/meeting rooms via the Helmet app." },
      { vi: "Xem Yle Areena (areena.yle.fi) - phụ đề tiếng Anh/Phần để học song song.", en: "Watch Yle Areena (areena.yle.fi) - English/Finnish subs to learn while watching." },
    ],
    keyTerms: [
      { fi: "Kirjasto", vi: "Thư viện", en: "Library" },
      { fi: "Lainata", vi: "Mượn", en: "To borrow" },
      { fi: "Palauttaa", vi: "Trả lại", en: "To return" },
      { fi: "Tekstitys", vi: "Phụ đề", en: "Subtitles" },
    ],
    phrases: [
      { fi: "Haluaisin tehdä kirjastokortin.", vi: "Tôi muốn làm thẻ thư viện.", en: "I'd like to make a library card." },
      { fi: "Onko teillä suomenkielisiä helppolukuisia kirjoja?", vi: "Có sách dễ đọc tiếng Phần không?", en: "Do you have easy-reading Finnish books?" },
    ],
    proTip: {
      vi: "Tìm dòng sách 'Selkokirja' - viết bằng tiếng Phần đơn giản, hoàn hảo cho người học A2-B1.",
      en: "Look for 'Selkokirja' shelves - simplified Finnish, perfect for A2-B1 learners.",
    },
  },
  {
    id: "recycling-2026",
    icon: "Recycle",
    emoji: "♻️",
    title: "Hệ thống tái chế Rinki & Pantti",
    titleEn: "Rinki recycling & Pantti deposits",
    summary:
      "Phần Lan đứng top thế giới về tái chế. Chai PET/lon = 0.10-0.40€ hoàn lại tại siêu thị. 8 dòng phân loại rác cơ bản.",
    summaryEn:
      "Finland leads global recycling. PET/cans = €0.10-0.40 refund at supermarkets. 8 main waste streams.",
    steps: [
      { vi: "Phân loại: biojäte (hữu cơ), muovi, paperi, kartonki, lasi, metalli, paristot, sähkölaitteet.", en: "Sort: biojäte (bio), plastic, paper, cardboard, glass, metal, batteries, electronics." },
      { vi: "Lưu chai/lon riêng → mang đến Pantti-automaatti (S-market, K-market) → nhận voucher trừ tiền.", en: "Save bottles/cans → use Pantti machine in supermarkets → get a money-off receipt." },
      { vi: "Đồ điện tử cũ → mang đến HSY Sortti-asema hoặc Verkkokauppa.com (miễn phí).", en: "Old electronics → HSY Sortti-asema or Verkkokauppa.com (free)." },
      { vi: "Quần áo cũ còn tốt → UFF, Fida hoặc thùng tái chế (vaaterekka).", en: "Used clothes in good condition → UFF, Fida or street collection bins." },
    ],
    keyTerms: [
      { fi: "Kierrätys", vi: "Tái chế", en: "Recycling" },
      { fi: "Lajittelu", vi: "Phân loại", en: "Sorting" },
      { fi: "Pantti", vi: "Đặt cọc vỏ chai", en: "Bottle deposit" },
      { fi: "Biojäte", vi: "Rác hữu cơ", en: "Bio waste" },
    ],
    phrases: [
      { fi: "Missä on lähin Sortti-asema?", vi: "Trạm phân loại gần nhất ở đâu?", en: "Where is the nearest sorting station?" },
      { fi: "Voinko palauttaa nämä pullot tänne?", vi: "Tôi có thể trả vỏ chai ở đây không?", en: "Can I return these bottles here?" },
    ],
    proTip: {
      vi: "Mỗi tháng 1 gia đình có thể tiết kiệm 15-30€ chỉ nhờ Pantti vỏ chai/lon.",
      en: "A family can save €15-30/month from Pantti bottle deposits alone.",
    },
  },
];

// ============================================================
// HEALTH pillar additions
// ============================================================
export const WINTER_SAFETY_GUIDES: NewcomerGuide[] = [
  {
    id: "winter-driving",
    icon: "Snowflake",
    emoji: "❄️",
    title: "Lái xe & đi bộ an toàn mùa đông",
    titleEn: "Winter driving & walking safety",
    summary:
      "Từ 1/12 đến 28/2 BẮT BUỘC dùng lốp đông. Đi bộ trên băng cần đinh hỗ trợ (jääpiikki).",
    summaryEn:
      "From Dec 1-Feb 28 winter tyres are MANDATORY. Walking on ice safer with ice-grip studs (jääpiikki).",
    steps: [
      { vi: "Thay lốp đông trước 1/12 (kitkarengas hoặc nastarengas). Phí 80-150€/lần thay.", en: "Switch to winter tyres before Dec 1 (kitkarengas or studded). €80-150 per change." },
      { vi: "Mua jääpiikki cho giày (5-15€) - giảm 90% nguy cơ ngã trên băng.", en: "Buy ice-grip studs for shoes (€5-15) - cuts ice-fall risk 90%." },
      { vi: "Luôn mang đèn phản quang (heijastin) khi đi bộ tối - LUẬT bắt buộc.", en: "Always wear a reflector (heijastin) when walking in the dark - it's the law." },
      { vi: "Đường trơn? App 'Foreca' báo nhiệt độ + cảnh báo đóng băng theo giờ.", en: "Slippery roads? The Foreca app shows hourly ice warnings." },
    ],
    keyTerms: [
      { fi: "Talvirengas", vi: "Lốp đông", en: "Winter tyre" },
      { fi: "Jääpiikki", vi: "Đinh chống trượt", en: "Ice-grip stud" },
      { fi: "Heijastin", vi: "Đèn phản quang", en: "Reflector" },
      { fi: "Liukastua", vi: "Trượt ngã", en: "To slip" },
    ],
    phrases: [
      { fi: "Onko tie liukas tänään?", vi: "Hôm nay đường có trơn không?", en: "Is the road slippery today?" },
      { fi: "Tarvitsen talvirenkaat autooni.", vi: "Tôi cần lốp đông cho xe.", en: "I need winter tyres for my car." },
    ],
    proTip: {
      vi: "Sau khi té ngã trên băng, đến terveysasema ngay - bảo hiểm KELA chi trả 100%.",
      en: "After falling on ice, go to terveysasema immediately - KELA covers it 100%.",
    },
  },
];

// ============================================================
// EXTRA CHECKLIST ITEMS
// ============================================================
export const FIRST_30_DAYS_CHECKLIST_V3: ChecklistItem[] = [
  { key: "library-helmet-card", vi: "Đăng ký thẻ thư viện Helmet/Vaski/Piki", en: "Sign up for Helmet/Vaski/Piki library card", category: "daily", week: 2 },
  { key: "te-palvelut", vi: "Tạo tài khoản TE-palvelut.fi", en: "Create a TE-palvelut.fi account", category: "work", week: 3 },
  { key: "integration-plan", vi: "Đặt lịch kotoutumissuunnitelma với TE", en: "Book kotoutumissuunnitelma meeting with TE", category: "work", week: 3 },
  { key: "winter-tyres", vi: "Đổi lốp đông trước 1/12 (nếu có xe)", en: "Switch to winter tyres before Dec 1 (if you drive)", category: "daily", week: 4 },
  { key: "reflector", vi: "Mua đèn phản quang (heijastin) cho áo khoác", en: "Buy a reflector (heijastin) for your jacket", category: "daily", week: 2 },
  { key: "pantti-routine", vi: "Bắt đầu lưu chai để hoàn Pantti", en: "Start saving bottles for Pantti refunds", category: "daily", week: 3 },
  { key: "yle-areena", vi: "Tạo tài khoản Yle Areena (miễn phí, có phụ đề)", en: "Create a free Yle Areena account (with subtitles)", category: "daily", week: 2 },
];
