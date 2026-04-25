/**
 * @file lifeInFinlandExpansion2.ts
 * @description Phase-2 mở rộng Life in Finland (2026): giao thông công cộng,
 *              ngân hàng & BankID, phong cách giao tiếp & sisu, gia đình &
 *              chăm sóc trẻ em (Neuvola), nha khoa, sức khỏe tâm thần.
 *              Bổ sung 6 guide mới + 8 checklist items.
 * @author HaiEduTech
 */

import type { NewcomerGuide, ChecklistItem } from "./lifeInFinlandData";

// ============================================================
// GIAO THÔNG CÔNG CỘNG (Daily pillar)
// ============================================================
export const TRANSPORT_GUIDES: NewcomerGuide[] = [
  {
    id: "public-transport-2026",
    icon: "Bus",
    emoji: "🚌",
    title: "Giao thông công cộng (HSL, Nysse, Föli)",
    titleEn: "Public Transport (HSL, Nysse, Föli)",
    summary:
      "Phần Lan có hệ thống giao thông công cộng đúng giờ tuyệt vời. Vé tháng sinh viên Helsinki ~37€/tháng (2026), bao gồm bus, tram, metro, ferry và xe đạp HSL.",
    summaryEn:
      "Finland's public transport runs like clockwork. Helsinki student monthly pass ~€37/month (2026) covers bus, tram, metro, ferry, and HSL city bikes.",
    steps: [
      {
        vi: "📱 Cài app HSL (Helsinki) / Nysse (Tampere) / Föli (Turku) - mua vé bằng MobilePay hoặc thẻ ngân hàng trong 30 giây.",
        en: "📱 Install HSL (Helsinki) / Nysse (Tampere) / Föli (Turku) - buy tickets with MobilePay or card in 30 seconds.",
      },
      {
        vi: "🎟️ Loại vé: Đơn (3.10€/80 phút), Ngày (9€), Tháng người lớn (75€), Tháng sinh viên (37€). Trẻ <7 tuổi miễn phí.",
        en: "🎟️ Ticket types: Single (€3.10/80 min), Day (€9), Adult monthly (€75), Student monthly (€37). Kids under 7 free.",
      },
      {
        vi: "🚲 Xe đạp công cộng HSL Citybike: 35€/cả mùa (5–10), không giới hạn 30 phút mỗi lần. Tuyệt vời cho đi học/đi làm.",
        en: "🚲 HSL Citybike: €35/whole season (May–Oct), unlimited 30-min rides. Perfect for commuting.",
      },
      {
        vi: "🚆 Tàu liên tỉnh VR.fi: Helsinki–Tampere 1h45 (giá 9–25€ nếu đặt sớm). Sinh viên giảm 50%.",
        en: "🚆 Long-distance trains VR.fi: Helsinki–Tampere 1h45 (€9–25 if booked early). 50% off for students.",
      },
      {
        vi: "✈️ Vé bay nội địa rẻ: Norwegian, Finnair Helsinki–Lapland từ 39€ nếu đặt 6 tuần trước.",
        en: "✈️ Cheap domestic flights: Norwegian, Finnair Helsinki–Lapland from €39 if booked 6 weeks ahead.",
      },
      {
        vi: "🚊 Quy tắc Phần Lan: lên xe phải có vé hợp lệ, kiểm soát viên (lipuntarkastaja) phạt 80€ nếu trốn vé.",
        en: "🚊 Finnish rule: always have a valid ticket, ticket inspectors (lipuntarkastaja) fine €80 for fare-dodging.",
      },
    ],
    keyTerms: [
      { fi: "Lippu", vi: "Vé", en: "Ticket" },
      { fi: "Aikataulu", vi: "Thời gian biểu", en: "Schedule" },
      { fi: "Pysäkki", vi: "Trạm dừng", en: "Stop" },
      { fi: "Vaihto", vi: "Chuyển tuyến", en: "Transfer / change" },
      { fi: "Lähijuna", vi: "Tàu ngoại ô", en: "Commuter train" },
    ],
    phrases: [
      { fi: "Mistä saan kuukausilipun?", vi: "Tôi mua vé tháng ở đâu?", en: "Where can I get a monthly pass?" },
      { fi: "Mille pysäkille jäätte?", vi: "Bạn xuống trạm nào?", en: "Which stop are you getting off at?" },
      { fi: "Onko tämä juna Tampereelle?", vi: "Tàu này có đi Tampere không?", en: "Is this train going to Tampere?" },
    ],
    proTip: {
      vi: "💡 Sinh viên dưới 30 tuổi mua thẻ HSL có ảnh + chứng minh sinh viên một lần - sau đó chỉ cần nạp vé tháng 37€ thay vì 75€. Tiết kiệm 456€/năm.",
      en: "💡 Students under 30: get an HSL card with photo + student proof once - then top up at €37/month instead of €75. Saves €456/year.",
    },
    mapLinks: [
      { label: "HSL Helsinki", url: "https://www.hsl.fi/en" },
      { label: "VR Train Tickets", url: "https://www.vr.fi/en" },
    ],
  },
];

// ============================================================
// NGÂN HÀNG & BANKID NÂNG CAO (Admin pillar)
// ============================================================
export const BANKING_GUIDES: NewcomerGuide[] = [
  {
    id: "banking-bankid-2026",
    icon: "Landmark",
    emoji: "🏦",
    title: "Ngân hàng & BankID (Pankkitunnukset)",
    titleEn: "Banking & BankID (Pankkitunnukset)",
    summary:
      "BankID (pankkitunnukset) là chìa khóa số ở Phần Lan - đăng nhập Kela, Vero, Migri, OmaPosti, OmaKanta đều cần. Mở tài khoản cần Henkilötunnus + hợp đồng thuê nhà/lao động.",
    summaryEn:
      "BankID (pankkitunnukset) is your digital key in Finland - Kela, Vero, Migri, OmaPosti, OmaKanta all require it. Opening an account needs Henkilötunnus + rental/employment contract.",
    steps: [
      {
        vi: "🏛️ 4 ngân hàng chính: OP (lớn nhất, app tốt), Nordea (đa quốc gia), Danske Bank, S-Pankki (S-Group, dễ duyệt nhất cho người mới).",
        en: "🏛️ 4 main banks: OP (largest, best app), Nordea (international), Danske Bank, S-Pankki (S-Group, easiest approval for newcomers).",
      },
      {
        vi: "📅 Đặt lịch hẹn online - KHÔNG đến quầy bừa. S-Pankki & Nordea thường duyệt nhanh hơn cho non-EU.",
        en: "📅 Book online - don't walk in. S-Pankki & Nordea usually approve faster for non-EU residents.",
      },
      {
        vi: "📋 Mang theo: passport + Henkilötunnus + hợp đồng thuê nhà + thư mời học/làm + 50€ phí mở thẻ.",
        en: "📋 Bring: passport + Henkilötunnus + rental contract + admission/employment letter + ~€50 card fee.",
      },
      {
        vi: "🔐 Sau 1–2 tuần nhận: thẻ Visa Debit + mã BankID gửi 2 thư riêng (vì lý do bảo mật).",
        en: "🔐 In 1–2 weeks you receive: Visa Debit + BankID codes sent in 2 separate envelopes (for security).",
      },
      {
        vi: "📲 Cài app ngân hàng + MobilePay (~98% người Phần Lan dùng) - chuyển tiền giữa bạn bè miễn phí, tức thì.",
        en: "📲 Install your bank app + MobilePay (~98% of Finns use it) - instant free transfers between friends.",
      },
      {
        vi: "💳 Phần Lan ~99% cashless. Nhiều cửa hàng KHÔNG nhận tiền mặt. Ưu tiên thẻ contactless / Apple Pay / Google Pay.",
        en: "💳 Finland is ~99% cashless. Many shops REJECT cash. Use contactless card / Apple Pay / Google Pay.",
      },
    ],
    keyTerms: [
      { fi: "Pankkitili", vi: "Tài khoản ngân hàng", en: "Bank account" },
      { fi: "Pankkitunnukset", vi: "Mã BankID", en: "BankID codes" },
      { fi: "Tilisiirto", vi: "Chuyển khoản", en: "Bank transfer" },
      { fi: "Pankkikortti", vi: "Thẻ ngân hàng", en: "Debit card" },
      { fi: "Lainahakemus", vi: "Đơn xin vay", en: "Loan application" },
    ],
    phrases: [
      { fi: "Haluaisin avata pankkitilin.", vi: "Tôi muốn mở tài khoản ngân hàng.", en: "I'd like to open a bank account." },
      { fi: "Milloin saan pankkitunnukset?", vi: "Khi nào tôi nhận được BankID?", en: "When will I receive my BankID codes?" },
      { fi: "Voinko maksaa MobilePaylla?", vi: "Tôi trả bằng MobilePay được không?", en: "Can I pay with MobilePay?" },
    ],
    proTip: {
      vi: "💡 ĐỪNG bao giờ chia sẻ mã BankID. Lừa đảo phổ biến: 'Cảnh sát/ngân hàng gọi xin mã để xác minh' - cảnh sát thật KHÔNG BAO GIỜ hỏi mã. Báo ngay 0295 419 800.",
      en: "💡 NEVER share your BankID codes. Common scam: 'Police/bank calling for verification' - real police NEVER ask for codes. Report immediately: 0295 419 800.",
    },
  },
];

// ============================================================
// PHONG CÁCH GIAO TIẾP & SISU (Work pillar)
// ============================================================
export const CULTURE_GUIDES: NewcomerGuide[] = [
  {
    id: "social-etiquette-sisu",
    icon: "Sparkle",
    emoji: "🤫",
    title: "Văn hóa giao tiếp Phần Lan & Sisu",
    titleEn: "Finnish Social Etiquette & Sisu",
    summary:
      "Phần Lan = im lặng tôn trọng + bình đẳng tuyệt đối + đúng giờ tuyệt đối. 'Sisu' là tinh thần kiên cường đặc trưng - bạn càng hiểu, càng được tôn trọng.",
    summaryEn:
      "Finland = respectful silence + radical equality + radical punctuality. 'Sisu' is the legendary grit - the more you grasp it, the more you're respected.",
    steps: [
      {
        vi: "🤐 Im lặng KHÔNG phải khó xử - đó là tôn trọng. Người Phần Lan thoải mái với 5–10 giây im lặng giữa câu.",
        en: "🤐 Silence is NOT awkward - it's respect. Finns are fine with 5–10s pauses mid-conversation.",
      },
      {
        vi: "👋 Bắt tay chắc + nhìn mắt khi gặp lần đầu. KHÔNG ôm/hôn má dù thân quen, kể cả với người nhà.",
        en: "👋 Firm handshake + eye contact on first meeting. NO hugs or cheek-kisses even with friends/family.",
      },
      {
        vi: "⏰ Đúng giờ ± 0 phút. Trễ 5 phút = thiếu tôn trọng. Đến sớm 10 phút = lý tưởng.",
        en: "⏰ On time ± 0 min. 5 min late = disrespectful. 10 min early = ideal.",
      },
      {
        vi: "🛁 Sauna là VĂN HÓA, không tình dục. Đi tắm sauna khỏa thân với đồng nghiệp/sếp là chuyện bình thường (nam riêng, nữ riêng).",
        en: "🛁 Sauna is CULTURE, not sexual. Going naked with colleagues/boss is totally normal (separated by gender).",
      },
      {
        vi: "🪪 Khoảng cách cá nhân: 1.5–2m khi xếp hàng. Đứng quá gần = bất lịch sự (theo nghiên cứu Aalto 2023).",
        en: "🪪 Personal space: 1.5–2m in queues. Standing closer = rude (per Aalto 2023 study).",
      },
      {
        vi: "💪 'Sisu' - tinh thần kiên trì: làm xong việc dù khó, không than vãn, tự lực, hoàn thành lời hứa. Cốt lõi văn hóa Phần Lan.",
        en: "💪 'Sisu' - grit: finish the job, no whining, self-reliance, keep promises. Core Finnish value.",
      },
      {
        vi: "🍻 Drinks sau giờ làm: thân tình hơn nhiều so với trong văn phòng. Đây là lúc người Phần Lan mở lòng.",
        en: "🍻 After-work drinks: way warmer than office hours. This is when Finns open up.",
      },
      {
        vi: "🎁 Quà tặng: nhỏ, ý nghĩa (chocolate, trà, đặc sản VN). Mở quà ngay trước mặt người tặng = lịch sự.",
        en: "🎁 Gifts: small, meaningful (chocolate, tea, VN specialties). Open immediately in front of giver = polite.",
      },
    ],
    keyTerms: [
      { fi: "Sisu", vi: "Tinh thần kiên cường", en: "Finnish grit / perseverance" },
      { fi: "Hiljaisuus", vi: "Sự im lặng", en: "Silence" },
      { fi: "Tasa-arvo", vi: "Bình đẳng", en: "Equality" },
      { fi: "Täsmällisyys", vi: "Đúng giờ", en: "Punctuality" },
      { fi: "Sauna", vi: "Phòng xông hơi", en: "Sauna" },
    ],
    phrases: [
      { fi: "Anteeksi häiriö.", vi: "Xin lỗi vì làm phiền.", en: "Sorry for the disturbance." },
      { fi: "Mennäänkö saunaan?", vi: "Đi tắm sauna nhé?", en: "Shall we go to the sauna?" },
      { fi: "Pidetään yhteyttä.", vi: "Giữ liên lạc nhé.", en: "Let's stay in touch." },
    ],
    proTip: {
      vi: "💡 Quy tắc vàng cho người Việt: ĐỪNG nói to ở nơi công cộng (bus, tram), ĐỪNG hỏi mức lương lần đầu gặp, LUÔN gõ cửa trước khi vào, LUÔN tháo giày khi vào nhà người Phần Lan.",
      en: "💡 Golden rules for Vietnamese: DON'T talk loudly in public (bus, tram), DON'T ask salary on first meeting, ALWAYS knock before entering, ALWAYS remove shoes inside Finnish homes.",
    },
  },
];

// ============================================================
// GIA ĐÌNH & TRẺ EM - NEUVOLA (Health pillar)
// ============================================================
export const FAMILY_HEALTH_GUIDES: NewcomerGuide[] = [
  {
    id: "neuvola-family-2026",
    icon: "Baby",
    emoji: "👶",
    title: "Neuvola - Trung tâm chăm sóc mẹ và bé miễn phí",
    titleEn: "Neuvola - Free Maternal & Child Health Center",
    summary:
      "Neuvola là dịch vụ Phần Lan độc đáo: theo dõi mẹ + bé MIỄN PHÍ từ thai 8 tuần đến 6 tuổi. Bao gồm khám thai, vaccine, dinh dưỡng, hỗ trợ tâm lý sau sinh.",
    summaryEn:
      "Neuvola is uniquely Finnish: FREE care for mother + child from 8 weeks pregnancy to age 6. Covers prenatal, vaccines, nutrition, postnatal mental health.",
    steps: [
      {
        vi: "🤰 Thai 8–10 tuần: gọi Neuvola (số ở omakanta.fi) đặt buổi đầu tiên - y tá sẽ là người đồng hành suốt thai kỳ.",
        en: "🤰 Week 8–10 pregnancy: call your Neuvola (number on omakanta.fi) - the nurse becomes your partner through pregnancy.",
      },
      {
        vi: "🎁 Tuần 22: nhận 'Äitiyspakkaus' (Maternity Box) MIỄN PHÍ từ Kela - hộp nhu yếu phẩm cho bé (quần áo, tã, sách) trị giá ~400€. Hoặc nhận 170€ tiền mặt.",
        en: "🎁 Week 22: receive the famous 'Maternity Box' (Äitiyspakkaus) FREE from Kela - baby essentials worth ~€400. Or take €170 cash instead.",
      },
      {
        vi: "🏥 Sinh con: bệnh viện công MIỄN PHÍ (chỉ trả ~50€ phí ngày đầu nếu ở phòng riêng).",
        en: "🏥 Childbirth: public hospital is FREE (only ~€50 first-day fee for private room).",
      },
      {
        vi: "💸 Trợ cấp Kela: Äitiysraha (4 tháng), Vanhempainraha (cha/mẹ chia 6.5 tháng), Lapsilisä (~95€/tháng/con đến 17 tuổi).",
        en: "💸 Kela benefits: Maternity allowance (4 months), Parental allowance (parents share 6.5 months), Child benefit (~€95/month/child until 17).",
      },
      {
        vi: "🍼 Sau sinh: 13 buổi khám Neuvola từ 0–6 tuổi, vaccine theo lịch quốc gia (đều miễn phí), tư vấn dinh dưỡng + ngủ.",
        en: "🍼 Postnatal: 13 Neuvola checkups from 0–6 yrs, national vaccines (all free), nutrition + sleep counseling.",
      },
      {
        vi: "🏫 Nhà trẻ công (päiväkoti): max 295€/tháng/trẻ (giảm theo thu nhập), từ 9 tháng tuổi. Bữa ăn + hoạt động đầy đủ.",
        en: "🏫 Public daycare (päiväkoti): max €295/month/child (income-based), from 9 months. Full meals + activities included.",
      },
    ],
    keyTerms: [
      { fi: "Neuvola", vi: "Trung tâm chăm sóc mẹ và bé", en: "Maternal & child clinic" },
      { fi: "Äitiyspakkaus", vi: "Hộp đồ sơ sinh Kela", en: "Maternity box" },
      { fi: "Päiväkoti", vi: "Nhà trẻ", en: "Daycare" },
      { fi: "Lapsilisä", vi: "Tiền trợ cấp con", en: "Child benefit" },
      { fi: "Vanhempainraha", vi: "Trợ cấp cha mẹ", en: "Parental allowance" },
    ],
    phrases: [
      { fi: "Olen raskaana, haluaisin varata ajan neuvolaan.", vi: "Tôi đang mang thai, muốn đặt lịch Neuvola.", en: "I'm pregnant, I'd like to book a Neuvola appointment." },
      { fi: "Milloin saan äitiyspakkauksen?", vi: "Khi nào tôi nhận được Maternity Box?", en: "When will I receive the maternity box?" },
    ],
    proTip: {
      vi: "💡 Người Việt thường ngại nhờ trợ cấp - đừng. Đây là quyền của bạn, đã đóng thuế. Áp dụng đầy đủ Kela giúp gia đình Việt tại Phần Lan tiết kiệm 5,000–10,000€/năm.",
      en: "💡 Vietnamese parents often hesitate to claim benefits - don't. It's your right and you paid taxes for it. Full Kela use saves Vietnamese families €5,000–10,000/year.",
    },
  },
];

// ============================================================
// NHA KHOA & SỨC KHỎE TÂM THẦN (Health pillar)
// ============================================================
export const ADVANCED_HEALTH_GUIDES: NewcomerGuide[] = [
  {
    id: "dental-care-2026",
    icon: "Smile",
    emoji: "🦷",
    title: "Nha khoa công + tư (Hammashoito)",
    titleEn: "Dental Care - Public + Private",
    summary:
      "Nha khoa Phần Lan đắt nhưng chất lượng cao. Công (Terveyskeskus) rẻ + chờ lâu (1–6 tháng). Tư (Mehiläinen, Terveystalo) nhanh + đắt 2–3 lần.",
    summaryEn:
      "Finnish dentistry is pricey but top quality. Public (Terveyskeskus) cheap + long wait (1–6 months). Private (Mehiläinen, Terveystalo) fast + 2–3× more expensive.",
    steps: [
      {
        vi: "🏛️ Nha khoa công: gọi Terveyskeskus đặt lịch. Khám tổng quát ~38€, lấy cao răng ~58€, trám răng ~80–120€.",
        en: "🏛️ Public dentist: call Terveyskeskus. Checkup ~€38, scaling ~€58, filling ~€80–120.",
      },
      {
        vi: "🏥 Nha khoa tư: walk-in cùng ngày, khám ~95€, trám ~180€. Sinh viên FSHS/YTHS chỉ 0–25€.",
        en: "🏥 Private dentist: same-day, checkup ~€95, filling ~€180. FSHS/YTHS students pay €0–25.",
      },
      {
        vi: "💳 Kela hoàn 30–50% chi phí khám + tia X tại tư nhân. Lấy biên lai để nộp tại kela.fi/omakela.",
        en: "💳 Kela reimburses 30–50% of checkups + X-rays at private clinics. Save receipts and file at kela.fi/omakela.",
      },
      {
        vi: "👶 Trẻ em <18 tuổi: miễn phí HOÀN TOÀN tại nha khoa công, kể cả niềng răng.",
        en: "👶 Children <18: 100% FREE at public dentist, including braces.",
      },
      {
        vi: "✈️ Du lịch nha khoa: nhiều người Phần Lan bay sang Estonia (Tallinn ferry 2h) - rẻ 50–70%, chất lượng tương đương.",
        en: "✈️ Dental tourism: many Finns ferry to Tallinn, Estonia (2h) - 50–70% cheaper, similar quality.",
      },
    ],
    keyTerms: [
      { fi: "Hammashoito", vi: "Khám nha khoa", en: "Dental care" },
      { fi: "Hammaslääkäri", vi: "Bác sĩ nha khoa", en: "Dentist" },
      { fi: "Paikkaus", vi: "Trám răng", en: "Filling" },
      { fi: "Hammaskivi", vi: "Cao răng", en: "Tartar / scaling" },
      { fi: "Oikomishoito", vi: "Niềng răng", en: "Orthodontics / braces" },
    ],
    phrases: [
      { fi: "Hammasta särkee.", vi: "Tôi đau răng.", en: "I have a toothache." },
      { fi: "Tarvitsen hammaslääkärin tarkastuksen.", vi: "Tôi cần khám răng định kỳ.", en: "I need a dental checkup." },
    ],
    proTip: {
      vi: "💡 Khám răng đầu tiên SAU KHI nhận Henkilötunnus - Kela mới hoàn tiền. Đặt lịch sớm, chờ 1–3 tháng là bình thường.",
      en: "💡 Book your first dental visit AFTER receiving Henkilötunnus - Kela only reimburses then. Book early, 1–3 month wait is normal.",
    },
  },
  {
    id: "mental-health-support-2026",
    icon: "HeartHandshake",
    emoji: "🧠",
    title: "Hỗ trợ sức khỏe tâm thần (Mielenterveys)",
    titleEn: "Mental Health Support (Mielenterveys)",
    summary:
      "Phần Lan hàng đầu thế giới về phá bỏ stigma sức khỏe tâm thần. Có nhiều kênh hỗ trợ MIỄN PHÍ bằng tiếng Anh, đặc biệt cho du học sinh chống cô đơn + SAD mùa đông.",
    summaryEn:
      "Finland leads the world in destigmatizing mental health. Multiple FREE English-language support channels - especially valuable for students fighting loneliness + winter SAD.",
    steps: [
      {
        vi: "📞 Mieli Crisis Helpline: 09 2525 0113 (tiếng Anh, T2-T6 9:00–15:00). Khẩn cấp 24/7: 09 2525 0111 (tiếng Phần).",
        en: "📞 Mieli Crisis Helpline: 09 2525 0113 (English, Mon–Fri 9–15). 24/7: 09 2525 0111 (Finnish).",
      },
      {
        vi: "🎓 Sinh viên FSHS/YTHS: tâm lý online + offline MIỄN PHÍ. Đặt qua app Self.fi sau khi đóng phí học kỳ.",
        en: "🎓 Students FSHS/YTHS: free online + offline therapy. Book via Self.fi app after paying semester fee.",
      },
      {
        vi: "🌐 Mielenterveystalo.fi: tự đánh giá miễn phí + chương trình điều trị online cho lo âu, trầm cảm, mất ngủ. Có tiếng Anh.",
        en: "🌐 Mielenterveystalo.fi: free self-assessment + online therapy programs for anxiety, depression, insomnia. English available.",
      },
      {
        vi: "💊 Bác sĩ tâm lý/tâm thần: yêu cầu giới thiệu (lähete) tại Terveysasema. Kela hoàn 60% chi phí trị liệu (max 80 buổi/2 năm).",
        en: "💊 Therapist/psychiatrist: get a referral (lähete) at Terveysasema. Kela reimburses 60% (up to 80 sessions in 2 years).",
      },
      {
        vi: "🌞 Chống SAD (kaamosmasennus): đèn 10,000 lux 30 phút/sáng, vitamin D 100µg, đi bộ ngoài trời 30 phút (kể cả khi lạnh).",
        en: "🌞 Beat SAD: 10,000 lux lamp 30 min/morning, vitamin D 100µg, 30 min outdoor walk (even when cold).",
      },
      {
        vi: "🤝 Cộng đồng: Vietnamese Students Association (VSAF) + nhóm 'Vietnamese Mental Health in Finland' (FB) - chia sẻ + hỗ trợ ngang hàng.",
        en: "🤝 Community: VSAF + 'Vietnamese Mental Health in Finland' FB group - peer sharing + support.",
      },
    ],
    keyTerms: [
      { fi: "Mielenterveys", vi: "Sức khỏe tâm thần", en: "Mental health" },
      { fi: "Terapeutti", vi: "Nhà trị liệu", en: "Therapist" },
      { fi: "Masennus", vi: "Trầm cảm", en: "Depression" },
      { fi: "Ahdistus", vi: "Lo âu", en: "Anxiety" },
      { fi: "Kaamos", vi: "Mùa đêm dài (cực Bắc)", en: "Polar night" },
    ],
    phrases: [
      { fi: "Tunnen oloni masentuneeksi.", vi: "Tôi cảm thấy buồn chán.", en: "I feel depressed." },
      { fi: "Tarvitsen apua.", vi: "Tôi cần giúp đỡ.", en: "I need help." },
      { fi: "Voinko saada lähetteen terapeutille?", vi: "Tôi xin giấy giới thiệu đến nhà trị liệu được không?", en: "Can I get a referral to a therapist?" },
    ],
    proTip: {
      vi: "💡 Quan trọng: nhờ giúp KHÔNG phải yếu đuối - Phần Lan tôn trọng người dám đi khám tâm lý. 'Sisu' không phải chịu đựng một mình mà là biết khi nào cần giúp đỡ.",
      en: "💡 Crucial: asking for help is NOT weakness - Finns respect those who seek therapy. True 'sisu' isn't suffering alone; it's knowing when to ask for help.",
    },
  },
];

// ============================================================
// CHECKLIST V2 (8 items mới)
// ============================================================
export const FIRST_30_DAYS_CHECKLIST_V2: ChecklistItem[] = [
  { key: "hsl-app", vi: "Cài app HSL/Nysse/Föli", en: "Install HSL/Nysse/Föli app", category: "daily", week: 1 },
  { key: "mobilepay", vi: "Cài MobilePay (chuyển tiền P2P)", en: "Install MobilePay (P2P transfers)", category: "admin", week: 2 },
  { key: "vsaf-join", vi: "Đăng ký Vietnamese Students Association (VSAF)", en: "Register with Vietnamese Students Association (VSAF)", category: "daily", week: 2 },
  { key: "neuvola-register", vi: "Đăng ký Neuvola (nếu có thai/em bé)", en: "Register at Neuvola (if pregnant/with baby)", category: "health", week: 3 },
  { key: "dental-checkup", vi: "Đặt lịch khám răng định kỳ đầu tiên", en: "Book first dental checkup", category: "health", week: 4 },
  { key: "self-app", vi: "Cài Self.fi (sinh viên FSHS) cho dịch vụ y tế", en: "Install Self.fi (FSHS students) for healthcare", category: "health", week: 2 },
  { key: "sauna-experience", vi: "Trải nghiệm sauna công cộng đầu tiên", en: "First public sauna experience", category: "daily", week: 3 },
  { key: "mielenterveystalo", vi: "Bookmark Mielenterveystalo.fi", en: "Bookmark Mielenterveystalo.fi", category: "health", week: 4 },
];
