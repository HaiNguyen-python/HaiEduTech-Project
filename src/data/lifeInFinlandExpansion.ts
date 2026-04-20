/**
 * @file lifeInFinlandExpansion.ts
 * @description Bài học mở rộng cho Life in Finland — chợ, đồ cũ, nhà ở,
 *              mùa đông, SIM/internet, tips du học sinh. Dữ liệu cập nhật 2026.
 * @author HaiEduTech
 */

import type { NewcomerGuide, ChecklistItem } from "./lifeInFinlandData";

// ============================================================
// CHỢ & MUA SẮM (Daily pillar)
// ============================================================

export const SHOPPING_GUIDES: NewcomerGuide[] = [
  {
    id: "grocery-shopping-2026",
    icon: "ShoppingCart",
    emoji: "🛒",
    title: "Hướng dẫn đi chợ siêu thị (2026)",
    titleEn: "Grocery Shopping Guide (2026)",
    summary:
      "Phần Lan có 3 chuỗi siêu thị chính: S-Ryhmä (rẻ + bonus), K-Ryhmä (chất lượng cao), và Lidl (giá thấp nhất). Năm 2026 lạm phát thực phẩm giảm còn ~2.1%, giá ổn định nhưng vẫn cần chiến lược.",
    summaryEn:
      "Finland has 3 main grocery chains: S-Ryhmä (cheap + bonus), K-Ryhmä (premium), and Lidl (lowest prices). In 2026 food inflation has cooled to ~2.1%, prices are stable but smart shopping still matters.",
    steps: [
      {
        vi: "Lập kế hoạch tuần: trung bình 1 sinh viên tiêu 200–280€/tháng tiền chợ (2026). Ghi danh sách trước khi đi.",
        en: "Weekly meal plan: avg student spends €200–280/month on groceries (2026). Always make a list first.",
      },
      {
        vi: "Đi siêu thị sau 20:00 — thực phẩm gần hết hạn giảm 30%–60% (sticker vàng/đỏ). Sáng thứ Hai cũng có hàng giảm.",
        en: "Shop after 20:00 — items near expiry get 30%–60% off (yellow/red stickers). Monday mornings also have markdowns.",
      },
      {
        vi: "App tiết kiệm: 'S-mobiili' (cá nhân hóa coupon S-Ryhmä), 'K-Ruoka' (đặt online K-Ryhmä), 'ResQ Club' (đồ ăn cuối ngày 3–5€).",
        en: "Money-saving apps: 'S-mobiili' (personalized S-Ryhmä coupons), 'K-Ruoka' (K-online ordering), 'ResQ Club' (end-of-day meals €3–5).",
      },
      {
        vi: "Mua thịt/cá đông lạnh ở Lidl rẻ hơn 20–30%. Rau củ theo mùa: dưa chuột Phần Lan giá tốt nhất tháng 6–9.",
        en: "Buy frozen meat/fish at Lidl — 20–30% cheaper. Seasonal produce: Finnish cucumbers cheapest June–Sept.",
      },
      {
        vi: "Mang túi vải — túi nilon ở quầy thanh toán mất 0.30€/túi (2026). Xe đẩy cần đồng xu 1€ (đặt cọc).",
        en: "Bring fabric bags — plastic bags cost €0.30 each (2026). Shopping carts need a €1 coin (refundable).",
      },
    ],
    keyTerms: [
      { fi: "Ruokakauppa", vi: "Cửa hàng tạp hóa", en: "Grocery store" },
      { fi: "Tarjous", vi: "Khuyến mãi", en: "Special offer" },
      { fi: "Päiväys", vi: "Hạn sử dụng", en: "Expiry date" },
      { fi: "Ostoskärry", vi: "Xe đẩy", en: "Shopping cart" },
      { fi: "Kassa", vi: "Quầy thanh toán", en: "Checkout counter" },
    ],
    phrases: [
      { fi: "Missä on maitotuotteet?", vi: "Khu sản phẩm sữa ở đâu?", en: "Where are the dairy products?" },
      { fi: "Onko tämä alennuksessa?", vi: "Cái này có đang giảm giá không?", en: "Is this on discount?" },
      { fi: "Saanko kuitin, kiitos?", vi: "Cho tôi hóa đơn nhé.", en: "Can I have the receipt, please?" },
    ],
    proTip: {
      vi: "💡 Mẹo vàng: Mua thịt halal/Á tại 'Hakaniemen Halli' (Helsinki) hoặc 'Tampereen Kauppahalli'. Gạo, mì, gia vị Việt rẻ ở chợ Á 'Vii Voan' & 'Hoan Nam Market'.",
      en: "💡 Pro tip: Get halal/Asian meat at 'Hakaniemen Halli' (Helsinki) or 'Tampereen Kauppahalli'. Cheap Vietnamese rice/noodles/spices at 'Vii Voan' & 'Hoan Nam Market'.",
    },
    mapLinks: [
      { label: "Vii Voan Asian Market Helsinki", url: "https://www.google.com/maps/search/Vii+Voan+Helsinki" },
      { label: "Hoan Nam Market", url: "https://www.google.com/maps/search/Hoan+Nam+Market+Helsinki" },
      { label: "Hakaniemi Market Hall", url: "https://www.google.com/maps/search/Hakaniemen+Kauppahalli" },
    ],
  },
  {
    id: "market-types-finland",
    icon: "Store",
    emoji: "🏪",
    title: "Các loại chợ ở Phần Lan",
    titleEn: "Types of Markets in Finland",
    summary:
      "Phần Lan có 5 loại chợ chính: siêu thị (ruokakauppa), chợ truyền thống (kauppahalli), chợ ngoài trời (tori), chợ nông sản (lähiruokatori) và chợ Á (aasialainen kauppa).",
    summaryEn:
      "Finland has 5 main market types: supermarkets (ruokakauppa), traditional indoor markets (kauppahalli), outdoor markets (tori), farmers' markets (lähiruokatori), and Asian markets (aasialainen kauppa).",
    steps: [
      {
        vi: "🏬 Siêu thị (Prisma, Citymarket, Lidl, K-Market, Alepa, Sale): mở 7:00–23:00, có tất cả mọi thứ.",
        en: "🏬 Supermarkets (Prisma, Citymarket, Lidl, K-Market, Alepa, Sale): open 7:00–23:00, sell everything.",
      },
      {
        vi: "🏛️ Kauppahalli (Chợ trong nhà): Hakaniemi (Helsinki), Tampere, Turku, Oulu — thịt cá tươi, đặc sản, giá cao hơn nhưng chất lượng đỉnh.",
        en: "🏛️ Kauppahalli (indoor halls): Hakaniemi (Helsinki), Tampere, Turku, Oulu — fresh meat/fish, gourmet, premium price.",
      },
      {
        vi: "🌞 Tori (Chợ quảng trường): Helsinki Kauppatori, Hakaniemi Tori — rau củ, hoa quả, đồ thủ công. Mùa hè 6:30–18:00.",
        en: "🌞 Tori (square markets): Helsinki Kauppatori, Hakaniemi Tori — produce, flowers, crafts. Summer 6:30–18:00.",
      },
      {
        vi: "🌾 Lähiruokatori (Chợ nông sản địa phương): cuối tuần ở các quận — REKO Ring (đặt qua Facebook, nhận tận tay từ nông dân).",
        en: "🌾 Lähiruokatori (local farmers' markets): weekends in neighborhoods — REKO Rings (Facebook orders, farmer hand-off).",
      },
      {
        vi: "🥢 Aasialainen kauppa (Chợ Á): Vii Voan, Hoan Nam, Tokyokan, K-Citymarket có khu Á — gạo Việt, nước mắm, bánh tráng, lá chanh.",
        en: "🥢 Asian markets: Vii Voan, Hoan Nam, Tokyokan, K-Citymarket Asian sections — Vietnamese rice, fish sauce, rice paper, lime leaves.",
      },
    ],
    keyTerms: [
      { fi: "Tori", vi: "Chợ ngoài trời", en: "Outdoor market square" },
      { fi: "Kauppahalli", vi: "Chợ trong nhà", en: "Indoor market hall" },
      { fi: "Lähiruoka", vi: "Thực phẩm địa phương", en: "Local food" },
      { fi: "Aasialainen kauppa", vi: "Chợ châu Á", en: "Asian market" },
    ],
    phrases: [
      { fi: "Onko tämä lähiruokaa?", vi: "Đây có phải đồ địa phương không?", en: "Is this local food?" },
      { fi: "Mistä löydän aasialaisen kaupan?", vi: "Tôi tìm chợ Á ở đâu?", en: "Where can I find an Asian market?" },
    ],
    proTip: {
      vi: "💡 Tham gia 'REKO' Facebook group ở thành phố bạn — đặt rau, thịt, trứng trực tiếp từ nông dân, nhận hàng 1 lần/tuần ở bãi đỗ xe. Tươi & rẻ hơn siêu thị.",
      en: "💡 Join your city's 'REKO' Facebook group — order produce, meat, eggs directly from farmers, weekly pickup at a parking lot. Fresher and cheaper than supermarkets.",
    },
  },
  {
    id: "second-hand-shopping",
    icon: "Recycle",
    emoji: "♻️",
    title: "Mua đồ cũ (Kirpputori) — Tiết kiệm 60–80%",
    titleEn: "Second-hand Shopping (Kirpputori) — Save 60–80%",
    summary:
      "Văn hóa đồ cũ ở Phần Lan rất phát triển và KHÔNG bị kỳ thị. 70% người Phần Lan mua đồ cũ ít nhất 1 lần/năm. Đồ nội thất, đồ điện tử, quần áo, sách — tất cả đều có thể mua secondhand chất lượng tốt.",
    summaryEn:
      "Finland's second-hand culture is huge and carries ZERO stigma. 70% of Finns buy used items at least yearly. Furniture, electronics, clothes, books — all available used at great quality.",
    steps: [
      {
        vi: "🏪 Kirpputori (Chợ đồ cũ vật lý): UFF, Fida, Pelastusarmeijan kirppis, Relove (vintage cao cấp). Mở 10:00–18:00, có hàng mới mỗi tuần.",
        en: "🏪 Physical thrift stores: UFF, Fida, Salvation Army (Pelastusarmeijan kirppis), Relove (premium vintage). Open 10:00–18:00, new stock weekly.",
      },
      {
        vi: "📱 App đồ cũ #1: 'Tori.fi' — chợ online lớn nhất, gặp người bán trực tiếp. 'Huuto.net' — đấu giá kiểu eBay.",
        en: "📱 Top used apps: 'Tori.fi' — biggest online marketplace, meet sellers in person. 'Huuto.net' — eBay-style auctions.",
      },
      {
        vi: "🛋️ Nội thất miễn phí: nhóm Facebook 'Roskalavalle vai kierrätykseen?' — đồ chủ nhà bỏ đi. 'Nappi Naapuri' — hàng xóm cho/đổi đồ.",
        en: "🛋️ Free furniture: Facebook 'Roskalavalle vai kierrätykseen?' — items being thrown out. 'Nappi Naapuri' — neighbors give/swap.",
      },
      {
        vi: "🎒 Tự bán đồ: thuê quầy ở 'kirppis itsepalvelu' (1 tuần ~25–40€), bán quần áo/sách dư của bạn — kiếm 50–200€.",
        en: "🎒 Sell your stuff: rent a shelf at self-service flea market (1 week ~€25–40), offload extra clothes/books — earn €50–200.",
      },
      {
        vi: "🌐 'Joulukirppis' (chợ đồ cũ Giáng sinh tháng 11–12) là sự kiện lớn — đồ trang trí, quà tặng giảm 80%.",
        en: "🌐 'Joulukirppis' (Christmas flea market Nov–Dec) is huge — decorations and gifts up to 80% off.",
      },
    ],
    keyTerms: [
      { fi: "Kirpputori", vi: "Chợ đồ cũ", en: "Flea market" },
      { fi: "Käytetty", vi: "Đã qua sử dụng", en: "Used / second-hand" },
      { fi: "Ilmainen", vi: "Miễn phí", en: "Free" },
      { fi: "Hyväkuntoinen", vi: "Tình trạng tốt", en: "In good condition" },
      { fi: "Nouto", vi: "Tự đến lấy", en: "Pickup (buyer collects)" },
    ],
    phrases: [
      { fi: "Onko tämä vielä myynnissä?", vi: "Cái này còn bán không?", en: "Is this still for sale?" },
      { fi: "Voinko tulla katsomaan?", vi: "Tôi đến xem được không?", en: "Can I come and see it?" },
      { fi: "Onko hinta neuvoteltavissa?", vi: "Giá có thương lượng được không?", en: "Is the price negotiable?" },
      { fi: "Otan sen!", vi: "Tôi lấy nó!", en: "I'll take it!" },
    ],
    proTip: {
      vi: "💡 Tip vàng cho du học sinh: 80% đồ trong căn hộ đầu tiên (giường, bàn, ghế, nồi, đèn) có thể mua trên Tori.fi với 200–400€. Mới mua ở Ikea sẽ tốn 1500€+. Tìm key 'opiskelijan muutto' (sinh viên dọn nhà).",
      en: "💡 Golden tip for students: 80% of your first apartment (bed, desk, chairs, pots, lamps) can come from Tori.fi for €200–400. New from IKEA costs €1500+. Search 'opiskelijan muutto' (student moving out).",
    },
    mapLinks: [
      { label: "Tori.fi (online)", url: "https://www.tori.fi" },
      { label: "UFF Helsinki stores", url: "https://www.google.com/maps/search/UFF+Helsinki" },
      { label: "Fida second-hand", url: "https://www.google.com/maps/search/Fida+second+hand" },
    ],
  },
];

// ============================================================
// HOUSING & UTILITIES (Admin pillar)
// ============================================================

export const HOUSING_GUIDES: NewcomerGuide[] = [
  {
    id: "finding-housing-2026",
    icon: "Home",
    emoji: "🏠",
    title: "Tìm nhà ở Phần Lan (2026)",
    titleEn: "Finding Housing in Finland (2026)",
    summary:
      "Thị trường nhà 2026: Helsinki khan hiếm (chờ HOAS 6–12 tháng), Tampere/Turku/Oulu dễ hơn. Sinh viên ưu tiên ký túc xá HOAS/TOAS/TYS — rẻ nhất (250–450€/tháng).",
    summaryEn:
      "2026 housing market: Helsinki is tight (HOAS waitlist 6–12 months), Tampere/Turku/Oulu are easier. Students should prioritize HOAS/TOAS/TYS dorms — cheapest (€250–450/month).",
    steps: [
      {
        vi: "🎓 Đăng ký NGAY khi nhận giấy báo nhập học: HOAS (Helsinki), TOAS (Tampere), TYS (Turku), PSOAS (Oulu) — ưu tiên sinh viên quốc tế.",
        en: "🎓 Apply IMMEDIATELY upon admission: HOAS (Helsinki), TOAS (Tampere), TYS (Turku), PSOAS (Oulu) — international students get priority.",
      },
      {
        vi: "🏘️ Nhà tư nhân: Vuokraovi.com, Oikotie.fi, Tori.fi 'Vuokra-asunnot'. Helsinki studio 30m² ~750–950€/tháng (2026).",
        en: "🏘️ Private rentals: Vuokraovi.com, Oikotie.fi, Tori.fi 'Vuokra-asunnot'. Helsinki studio 30m² ~€750–950/month (2026).",
      },
      {
        vi: "🤝 Sublet (kimppakämppä): chia phòng với 2–4 sinh viên, 350–500€/tháng. Tìm trong group FB 'Vietnamese in Finland Housing'.",
        en: "🤝 Shared apartments (kimppakämppä): split with 2–4 students, €350–500/month. Try FB group 'Vietnamese in Finland Housing'.",
      },
      {
        vi: "📄 Hợp đồng PHẢI có: tên chủ nhà, địa chỉ, giá thuê, đặt cọc (max 3 tháng), thời hạn báo trước (1 tháng). Lưu ý đọc kỹ trước khi ký.",
        en: "📄 Contract MUST include: landlord name, address, rent, deposit (max 3 months), notice period (1 month). Read carefully before signing.",
      },
      {
        vi: "💰 Xin trợ cấp nhà Kela 'Yleinen asumistuki' — sinh viên có thể được hỗ trợ 200–400€/tháng (tùy thu nhập).",
        en: "💰 Apply for Kela housing benefit 'Yleinen asumistuki' — students can get €200–400/month (income-based).",
      },
    ],
    keyTerms: [
      { fi: "Vuokra-asunto", vi: "Căn hộ cho thuê", en: "Rental apartment" },
      { fi: "Vuokrasopimus", vi: "Hợp đồng thuê nhà", en: "Rental contract" },
      { fi: "Vuokravakuus", vi: "Tiền đặt cọc", en: "Security deposit" },
      { fi: "Kimppakämppä", vi: "Nhà ở chung", en: "Shared apartment" },
      { fi: "Yhtiövastike", vi: "Phí quản lý chung cư", en: "Building maintenance fee" },
    ],
    phrases: [
      { fi: "Onko asunto vielä vapaana?", vi: "Căn hộ còn trống không?", en: "Is the apartment still available?" },
      { fi: "Milloin voin tulla katsomaan?", vi: "Khi nào tôi có thể đến xem?", en: "When can I come to view it?" },
      { fi: "Sisältyykö vuokraan vesi ja sähkö?", vi: "Tiền thuê có bao gồm điện nước không?", en: "Does the rent include water and electricity?" },
    ],
    proTip: {
      vi: "💡 ⚠️ Cẩn thận lừa đảo nhà ở: KHÔNG BAO GIỜ chuyển khoản trước khi xem nhà thật. Lừa đảo phổ biến nhất: 'Tôi đang ở Anh, gửi tiền cho tôi qua Western Union'. Báo cảnh sát nếu nghi ngờ: 0295 419 800.",
      en: "💡 ⚠️ Beware housing scams: NEVER transfer money before viewing in person. Most common: 'I'm in the UK, send money via Western Union'. Report to police if suspicious: 0295 419 800.",
    },
  },
  {
    id: "sim-internet-2026",
    icon: "Wifi",
    emoji: "📶",
    title: "SIM điện thoại & Internet (2026)",
    titleEn: "Phone SIM & Internet (2026)",
    summary:
      "Phần Lan có internet/4G/5G nhanh nhất thế giới với giá rẻ. SIM trả trước miễn phí tại sân bay; SIM trả sau cần Henkilötunnus.",
    summaryEn:
      "Finland has the world's fastest and cheapest mobile internet. Prepaid SIMs are free at the airport; postpaid needs a Henkilötunnus.",
    steps: [
      {
        vi: "📞 3 nhà mạng: DNA (rẻ nhất), Telia (phủ sóng tốt nhất), Elisa (nhanh nhất). 5G unlimited ~20–30€/tháng (2026).",
        en: "📞 3 carriers: DNA (cheapest), Telia (best coverage), Elisa (fastest). 5G unlimited ~€20–30/month (2026).",
      },
      {
        vi: "🛬 Tại sân bay Helsinki có cây ATM SIM miễn phí 'Welcome SIM' — gọi 100 phút + 5GB miễn phí trong 7 ngày để sống sót những ngày đầu.",
        en: "🛬 At Helsinki airport, free 'Welcome SIM' kiosks — 100 mins + 5GB free for 7 days, perfect for surviving your first week.",
      },
      {
        vi: "📱 SIM trả sau (postpaid): cần Henkilötunnus + thẻ ngân hàng. Đăng ký online tại dna.fi, telia.fi, elisa.fi — SIM gửi qua bưu điện 2–3 ngày.",
        en: "📱 Postpaid SIM: need Henkilötunnus + bank card. Sign up online at dna.fi, telia.fi, elisa.fi — SIM mailed in 2–3 days.",
      },
      {
        vi: "🌐 Internet nhà: thường đã có sẵn trong căn hộ (free Wifi). Nếu không, lắp riêng ~25–35€/tháng cho 1Gbps.",
        en: "🌐 Home internet: usually included in apartments (free WiFi). If not, install separate ~€25–35/month for 1Gbps.",
      },
      {
        vi: "🌍 Roaming EU miễn phí — SIM Phần Lan dùng được ở 27 nước EU + Iceland, Na Uy, Liechtenstein không phụ phí.",
        en: "🌍 EU roaming is free — your Finnish SIM works in 27 EU countries + Iceland, Norway, Liechtenstein at no extra cost.",
      },
    ],
    keyTerms: [
      { fi: "Liittymä", vi: "Gói cước", en: "Phone subscription" },
      { fi: "Prepaid", vi: "Trả trước", en: "Prepaid" },
      { fi: "Datapaketti", vi: "Gói dữ liệu", en: "Data package" },
      { fi: "Kuukausimaksu", vi: "Phí hàng tháng", en: "Monthly fee" },
    ],
    phrases: [
      { fi: "Haluaisin liittymän, jossa on rajaton data.", vi: "Tôi muốn gói data không giới hạn.", en: "I'd like a plan with unlimited data." },
      { fi: "Toimiiko tämä SIM EU:ssa?", vi: "SIM này dùng được ở EU không?", en: "Does this SIM work in the EU?" },
    ],
    proTip: {
      vi: "💡 Sinh viên: DNA Super 5G 19.90€/tháng có data unlimited + gọi nội mạng miễn phí. Đăng ký online, không cần ràng buộc 12 tháng.",
      en: "💡 Students: DNA Super 5G €19.90/month gives unlimited data + free in-network calls. Sign up online, no 12-month commitment.",
    },
  },
];

// ============================================================
// MÙA ĐÔNG & MÙA HÈ (Daily pillar)
// ============================================================

export const SEASONAL_GUIDES: NewcomerGuide[] = [
  {
    id: "winter-survival-2026",
    icon: "Snowflake",
    emoji: "❄️",
    title: "Sống sót mùa đông Phần Lan",
    titleEn: "Surviving Finnish Winter",
    summary:
      "Mùa đông Phần Lan kéo dài 5–7 tháng (tháng 10–4), nhiệt độ -5°C đến -25°C ở miền Nam, -40°C ở Lapland. Chuẩn bị đúng quần áo, vitamin D và tinh thần là chìa khóa.",
    summaryEn:
      "Finnish winter lasts 5–7 months (Oct–April), -5°C to -25°C in the south, -40°C in Lapland. Right clothing, vitamin D, and mindset are key.",
    steps: [
      {
        vi: "🧥 Quần áo lớp (kerrospukeutuminen): áo lót merino + áo len + áo khoác phao chống nước. Bộ đôi đắt nhất nhưng đáng giá: bốt 'Sorel' hoặc 'Kuoma'.",
        en: "🧥 Layer dressing (kerrospukeutuminen): merino base + wool sweater + waterproof down jacket. Best investment: Sorel or Kuoma boots.",
      },
      {
        vi: "💊 Vitamin D 50–100µg/ngày từ tháng 10 đến tháng 3 — Phần Lan thiếu nắng nghiêm trọng, Kela khuyến cáo.",
        en: "💊 Vitamin D 50–100µg daily Oct–March — Finland's sun is scarce, Kela officially recommends supplementation.",
      },
      {
        vi: "🥾 Bốt chống trượt + đinh sắt (liukuesteet, ~15€) gắn vào đế giày khi đường đóng băng. Ngã trên băng là tai nạn #1 ở Phần Lan.",
        en: "🥾 Anti-slip ice grippers (liukuesteet, ~€15) clip onto your soles. Slipping on ice is Finland's #1 winter injury.",
      },
      {
        vi: "💡 Đèn chống trầm cảm mùa đông (kirkasvalolamppu) ~50–100€ — dùng 30 phút mỗi sáng để tránh SAD (kaamosmasennus).",
        en: "💡 SAD lamp (kirkasvalolamppu) ~€50–100 — use 30 mins each morning to fight winter depression (kaamosmasennus).",
      },
      {
        vi: "🚗 Lốp đinh (nastarenkaat) bắt buộc 1/12–31/3 nếu tự lái xe. Phạt 100–200€ nếu vi phạm.",
        en: "🚗 Studded tires (nastarenkaat) mandatory 1 Dec–31 Mar if driving. €100–200 fine if not.",
      },
      {
        vi: "🌌 Đi ngắm Bắc cực quang (revontulet) tháng 11–3 ở Lapland (Rovaniemi, Saariselkä) — trải nghiệm không thể bỏ qua.",
        en: "🌌 Chase Northern Lights (revontulet) Nov–Mar in Lapland (Rovaniemi, Saariselkä) — a must-do experience.",
      },
    ],
    keyTerms: [
      { fi: "Talvi", vi: "Mùa đông", en: "Winter" },
      { fi: "Pakkanen", vi: "Lạnh giá (dưới 0°C)", en: "Frost / sub-zero cold" },
      { fi: "Lumi", vi: "Tuyết", en: "Snow" },
      { fi: "Liukastuminen", vi: "Trượt ngã", en: "Slipping" },
      { fi: "Kaamosmasennus", vi: "Trầm cảm mùa đông", en: "Winter depression (SAD)" },
    ],
    phrases: [
      { fi: "On todella kylmä tänään!", vi: "Hôm nay lạnh kinh khủng!", en: "It's really cold today!" },
      { fi: "Onko tiet liukkaat?", vi: "Đường có trơn không?", en: "Are the roads slippery?" },
    ],
    proTip: {
      vi: "💡 Mantra Phần Lan: 'Ei ole huonoa säätä, on vain huonoja vaatteita' (Không có thời tiết xấu, chỉ có quần áo xấu). Đầu tư đúng đồ là sống sót mùa đông.",
      en: "💡 Finnish mantra: 'Ei ole huonoa säätä, on vain huonoja vaatteita' (No bad weather, only bad clothes). Invest right and winter is fine.",
    },
  },
];

// ============================================================
// TIPS RIÊNG CHO DU HỌC SINH (Work pillar)
// ============================================================

export const STUDENT_TIPS_GUIDES: NewcomerGuide[] = [
  {
    id: "student-life-hacks-2026",
    icon: "GraduationCap",
    emoji: "🎓",
    title: "20 Tips vàng cho du học sinh mới sang (2026)",
    titleEn: "20 Golden Tips for New Students (2026)",
    summary:
      "Tổng hợp 20 mẹo thực tế giúp du học sinh Việt tiết kiệm tiền, hòa nhập nhanh và tránh sai lầm phổ biến. Cập nhật cho năm học 2025–2026.",
    summaryEn:
      "20 practical hacks for Vietnamese students to save money, integrate fast, and avoid rookie mistakes. Updated for 2025–2026 academic year.",
    steps: [
      {
        vi: "🆔 Lấy ngay thẻ sinh viên Frank Slammer hoặc Tuudo — giảm 30–50% cho VR, HSL, bảo tàng, rạp phim, gym.",
        en: "🆔 Get your Frank Slammer or Tuudo student ID — 30–50% off VR, HSL, museums, cinemas, gyms.",
      },
      {
        vi: "🍱 Bữa trưa sinh viên Kela 2.95€ — căng tin trường (UniCafe, Sodexo, Compass) cung cấp bữa nóng đầy đủ chỉ ~2.95€ (2026).",
        en: "🍱 Kela student lunch €2.95 — campus cafeterias (UniCafe, Sodexo, Compass) serve full hot meal for ~€2.95 (2026).",
      },
      {
        vi: "📚 Sách giáo trình: dùng app 'LibGen', mượn tại thư viện trường, mua cũ trên Tori.fi (giảm 70%). Đừng mua mới.",
        en: "📚 Textbooks: use 'LibGen', borrow from university library, buy used on Tori.fi (70% off). Never buy new.",
      },
      {
        vi: "💼 Làm thêm: sinh viên non-EU được làm 30h/tuần (2026, tăng từ 25h). Quán cafe, dọn dẹp, đưa đồ ăn (Wolt, Foodora) phổ biến nhất.",
        en: "💼 Part-time work: non-EU students can work 30h/week (2026, up from 25h). Cafes, cleaning, food delivery (Wolt, Foodora) are most common.",
      },
      {
        vi: "🏋️ Gym sinh viên Unisport (Helsinki) hoặc Sykettä (Tampere): ~95–125€/học kỳ (5 tháng) — rẻ hơn 60% gym thường.",
        en: "🏋️ Student gyms Unisport (Helsinki) or Sykettä (Tampere): ~€95–125/semester (5 months) — 60% cheaper than commercial gyms.",
      },
      {
        vi: "📖 Thẻ thư viện công cộng MIỄN PHÍ — mượn sách (cả tiếng Việt, Anh), DVD, board game, dụng cụ làm bánh, máy in 3D.",
        en: "📖 Public library card is FREE — borrow books (incl. Vietnamese, English), DVDs, board games, baking tools, even 3D printers.",
      },
      {
        vi: "🚲 Xe đạp cũ trên Tori.fi 50–100€ — giải pháp di chuyển rẻ nhất mùa hè. Mua đèn LED bắt buộc theo luật.",
        en: "🚲 Used bike on Tori.fi €50–100 — cheapest summer transport. Buy LED lights, legally required.",
      },
      {
        vi: "🌐 Học tiếng Phần Lan MIỄN PHÍ: 'kotoutumiskoulutus' (Kela tài trợ), 'Suomen kieli ja kulttuuri' tại trường đại học.",
        en: "🌐 Free Finnish lessons: 'kotoutumiskoulutus' (Kela-funded), 'Suomen kieli ja kulttuuri' at universities.",
      },
      {
        vi: "🎉 Tham gia hội sinh viên Việt Nam (VSAF — Vietnamese Students Association in Finland) — tiệc Tết, hỗ trợ cộng đồng, networking.",
        en: "🎉 Join VSAF (Vietnamese Students Association in Finland) — Tết parties, community support, networking.",
      },
      {
        vi: "💸 Chuyển tiền về VN rẻ: Wise (phí ~0.5%), Revolut, Remitly. ĐỪNG dùng Western Union (phí 5–10%).",
        en: "💸 Cheap VN remittance: Wise (~0.5% fee), Revolut, Remitly. DON'T use Western Union (5–10% fees).",
      },
      {
        vi: "📞 Gọi VN miễn phí: WhatsApp, Zalo, Messenger — Phần Lan có mạng tốc độ cao, chất lượng video call siêu mượt.",
        en: "📞 Free calls home: WhatsApp, Zalo, Messenger — Finland's high-speed network gives crystal-clear video.",
      },
      {
        vi: "🍜 Nồi cơm điện + chảo + dao Việt: mua tại Vii Voan (Helsinki) hoặc Hoan Nam — đầu tư 1 lần, dùng 4 năm.",
        en: "🍜 Rice cooker + wok + Vietnamese knife: buy at Vii Voan (Helsinki) or Hoan Nam — one-time investment, 4 years use.",
      },
      {
        vi: "🌡️ Cài app 'Foreca' hoặc 'Yle Säätutka' — dự báo thời tiết Phần Lan chính xác nhất (Yandex/Google không chính xác).",
        en: "🌡️ Install 'Foreca' or 'Yle Säätutka' — most accurate Finnish weather (Yandex/Google often wrong).",
      },
      {
        vi: "🚇 App giao thông: Reittiopas (HSL), Nysse (Tampere), Föli (Turku) — tích hợp vé + chỉ đường thời gian thực.",
        en: "🚇 Transit apps: Reittiopas (HSL), Nysse (Tampere), Föli (Turku) — combined tickets + real-time directions.",
      },
      {
        vi: "🛏️ Phòng kí túc xá: tự sắm chăn ga gối! HOAS/TOAS chỉ cung cấp giường trống. Mua bộ giường ở IKEA hoặc Tori.fi.",
        en: "🛏️ Dorm rooms: BYO bedding! HOAS/TOAS only provide an empty bed. Buy linens at IKEA or Tori.fi.",
      },
      {
        vi: "💉 Tiêm vaccine miễn phí: cúm mùa đông (lokakuussa), HPV (dưới 26 tuổi). Đăng ký tại Terveysasema.",
        en: "💉 Free vaccines: winter flu (October), HPV (under 26). Sign up at your Terveysasema.",
      },
      {
        vi: "🧘 Hỗ trợ tâm lý sinh viên FREE: FSHS (YTHS) — tư vấn tâm lý, nha khoa, sức khỏe — phí dịch vụ ~74€/học kỳ.",
        en: "🧘 Free student mental health: FSHS (YTHS) — counseling, dental, healthcare — service fee ~€74/semester.",
      },
      {
        vi: "🛂 Gia hạn Oleskelulupa: nộp ĐƠN trước 3 tháng hết hạn qua enterfinland.fi. Phí 480€ (2026), xử lý 2–4 tháng.",
        en: "🛂 Renew residence permit: apply 3 months before expiry via enterfinland.fi. Fee €480 (2026), processing 2–4 months.",
      },
      {
        vi: "🏆 Networking: LinkedIn Finland rất mạnh — kết nối với cựu sinh viên Việt qua group 'Vietnamese Professionals in Finland'.",
        en: "🏆 Networking: Finnish LinkedIn is huge — connect with Vietnamese alumni via 'Vietnamese Professionals in Finland' group.",
      },
      {
        vi: "❤️ Đừng cô đơn! Tham gia 1 club/đội thể thao trong trường — sinh viên Phần Lan ngại bắt chuyện trước nhưng rất thân thiện khi làm quen.",
        en: "❤️ Don't isolate! Join one club/sports team — Finns are shy at first but warm friends once you connect.",
      },
    ],
    keyTerms: [
      { fi: "Opiskelija", vi: "Sinh viên", en: "Student" },
      { fi: "Opiskelijakortti", vi: "Thẻ sinh viên", en: "Student ID" },
      { fi: "Opintotuki", vi: "Trợ cấp học tập", en: "Study allowance" },
      { fi: "Asuntola", vi: "Ký túc xá", en: "Student dorm" },
      { fi: "Lukukausimaksu", vi: "Học phí học kỳ", en: "Tuition fee per semester" },
    ],
    phrases: [
      { fi: "Olen vaihto-opiskelija.", vi: "Tôi là sinh viên trao đổi.", en: "I'm an exchange student." },
      { fi: "Onko opiskelija-alennusta?", vi: "Có giảm giá sinh viên không?", en: "Is there a student discount?" },
      { fi: "Voitko auttaa minua suomen kielen kanssa?", vi: "Bạn giúp tôi tiếng Phần Lan được không?", en: "Can you help me with Finnish?" },
    ],
    proTip: {
      vi: "💡 ⭐ Quy tắc 1-3-12 cho du học sinh: 1 tháng đầu tập trung thủ tục, 3 tháng đầu xây dựng routine + bạn bè, 12 tháng đầu đạt B1 tiếng Phần Lan. Theo đúng = thành công 90%.",
      en: "💡 ⭐ The 1-3-12 rule for students: month 1 = paperwork, months 1–3 = routine + friends, months 1–12 = reach B1 Finnish. Follow this = 90% success rate.",
    },
  },
  {
    id: "vietnamese-community-2026",
    icon: "Users",
    emoji: "🇻🇳",
    title: "Cộng đồng Việt tại Phần Lan",
    titleEn: "Vietnamese Community in Finland",
    summary:
      "~12,000 người Việt sinh sống tại Phần Lan (2026), tập trung ở Helsinki, Espoo, Vantaa, Turku, Tampere. Cộng đồng đoàn kết, hỗ trợ tốt cho người mới sang.",
    summaryEn:
      "~12,000 Vietnamese live in Finland (2026), mostly in Helsinki, Espoo, Vantaa, Turku, Tampere. Tight-knit community offering strong support for newcomers.",
    steps: [
      {
        vi: "👥 Tham gia FB Group: 'Người Việt tại Phần Lan' (~25,000 thành viên), 'Vietnam in Finland', 'Vietnamese Students in Finland' — hỏi đáp 24/7.",
        en: "👥 Join FB groups: 'Người Việt tại Phần Lan' (~25k members), 'Vietnam in Finland', 'Vietnamese Students in Finland' — 24/7 Q&A.",
      },
      {
        vi: "🏛️ Đại sứ quán Việt Nam tại Helsinki: Kulosaarentie 12, hỗ trợ hộ chiếu, công chứng, khai sinh, kết hôn.",
        en: "🏛️ Vietnamese Embassy in Helsinki: Kulosaarentie 12 — passport, notarization, birth/marriage certificates.",
      },
      {
        vi: "🍜 Nhà hàng Việt nổi tiếng: Saigon (Helsinki), Pho Vietnam (Tampere), Lemon Grass — đặt bàn cuối tuần.",
        en: "🍜 Famous Vietnamese restaurants: Saigon (Helsinki), Pho Vietnam (Tampere), Lemon Grass — book ahead on weekends.",
      },
      {
        vi: "🎊 Sự kiện cộng đồng: Tết Nguyên Đán (tháng 1–2) tại Helsinki, Trung Thu (tháng 9), Quốc khánh (2/9) — networking & hỗ trợ.",
        en: "🎊 Community events: Lunar New Year (Jan–Feb) in Helsinki, Mid-Autumn (Sept), National Day (Sept 2) — networking + support.",
      },
      {
        vi: "💼 Việc làm cộng đồng: nhà hàng Việt thường nhận sinh viên không cần B1 tiếng Phần Lan, lương 11–13€/giờ + tip.",
        en: "💼 Community jobs: Vietnamese restaurants often hire students without B1 Finnish, pay €11–13/hour + tips.",
      },
    ],
    keyTerms: [
      { fi: "Vietnamilainen", vi: "Người Việt", en: "Vietnamese (person)" },
      { fi: "Yhteisö", vi: "Cộng đồng", en: "Community" },
      { fi: "Suurlähetystö", vi: "Đại sứ quán", en: "Embassy" },
      { fi: "Tapahtuma", vi: "Sự kiện", en: "Event" },
    ],
    phrases: [
      { fi: "Olen vietnamilainen.", vi: "Tôi là người Việt Nam.", en: "I am Vietnamese." },
      { fi: "Onko täällä vietnamilaista yhteisöä?", vi: "Ở đây có cộng đồng Việt không?", en: "Is there a Vietnamese community here?" },
    ],
    proTip: {
      vi: "💡 Tham gia VSAF (Vietnamese Students Association in Finland) ngay khi sang — họ tổ chức 'buddy system' ghép bạn với senior Việt giúp bạn 6 tháng đầu.",
      en: "💡 Join VSAF (Vietnamese Students Association) right away — they run a buddy system pairing you with a Vietnamese senior for your first 6 months.",
    },
    mapLinks: [
      { label: "Vietnamese Embassy Helsinki", url: "https://www.google.com/maps/search/Vietnam+Embassy+Helsinki+Kulosaarentie" },
      { label: "Saigon Restaurant Helsinki", url: "https://www.google.com/maps/search/Saigon+Restaurant+Helsinki" },
    ],
  },
];

// ============================================================
// CHECKLIST MỞ RỘNG (week 4 + week 5–8 long-term)
// ============================================================

export const FIRST_30_DAYS_CHECKLIST_EXPANSION: ChecklistItem[] = [
  { key: "tori-account", vi: "Tạo tài khoản Tori.fi để mua đồ cũ", en: "Create Tori.fi account for second-hand", category: "daily", week: 1 },
  { key: "welcome-sim", vi: "Lấy Welcome SIM miễn phí ở sân bay (nếu mới đến)", en: "Pick up free Welcome SIM at airport (if just arrived)", category: "daily", week: 1 },
  { key: "vitamin-d", vi: "Mua Vitamin D 50–100µg (Oct–Mar)", en: "Buy Vitamin D 50–100µg (Oct–Mar)", category: "health", week: 2 },
  { key: "ice-grippers", vi: "Mua liukuesteet (đinh chống trượt) cho mùa đông", en: "Buy ice grippers (liukuesteet) for winter", category: "daily", week: 2 },
  { key: "frank-app", vi: "Cài app Frank/Tuudo (thẻ sinh viên số)", en: "Install Frank/Tuudo (digital student ID)", category: "work", week: 2 },
  { key: "asian-market", vi: "Tìm chợ Á gần nhất (Vii Voan, Hoan Nam, Tokyokan)", en: "Locate nearest Asian market (Vii Voan, Hoan Nam, Tokyokan)", category: "daily", week: 3 },
  { key: "reko-group", vi: "Tham gia REKO Facebook group ở thành phố bạn", en: "Join your city's REKO Facebook group", category: "daily", week: 3 },
  { key: "asumistuki", vi: "Nộp đơn xin trợ cấp nhà Yleinen asumistuki", en: "Apply for Kela housing benefit (Yleinen asumistuki)", category: "admin", week: 3 },
  { key: "winter-jacket", vi: "Đầu tư áo khoác mùa đông + bốt chống trượt", en: "Invest in winter jacket + waterproof boots", category: "daily", week: 4 },
  { key: "vietnamese-community", vi: "Tham gia FB 'Người Việt tại Phần Lan' & VSAF", en: "Join 'Vietnamese in Finland' FB & VSAF", category: "daily", week: 4 },
  { key: "remittance-app", vi: "Cài Wise/Revolut để chuyển tiền về VN rẻ", en: "Install Wise/Revolut for cheap VN remittance", category: "admin", week: 4 },
  { key: "weather-app", vi: "Cài Foreca / Yle Säätutka (dự báo thời tiết)", en: "Install Foreca / Yle Säätutka (weather)", category: "daily", week: 4 },
];
