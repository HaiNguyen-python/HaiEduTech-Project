/**
 * @file expansionV10Culture.ts
 * @description Đợt 10 mở rộng cho nhóm "Văn hoá & Đời sống": 3 món ăn, 2 điểm du lịch,
 * 2 chủ đề văn hoá, 2 clip hội thoại. Tất cả song ngữ Việt - Anh.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CuisineDish } from "./cuisineData";
import type { CultureTopic } from "./cultureData";
import type { FilmClip } from "./filmsData";
import type { TravelDestination } from "./regionsExpansion";

/* ── Ẩm thực: 3 món mới ─────────────────────────────────────────────────── */
export const cuisineExpansionV10: CuisineDish[] = [
  {
    id: "banh-cuon",
    emoji: "🥟",
    name: "Bánh cuốn Thanh Trì",
    nameEn: "Steamed Rice Rolls",
    region: "Bắc", regionEn: "North",
    description: "Lá bánh tráng mỏng như tờ giấy được hấp trên nồi nước sôi, cuộn nhân thịt băm và mộc nhĩ, rắc hành phi, ăn kèm chả quế và nước mắm pha chua ngọt.",
    descriptionEn: "Paper-thin rice sheets steamed over boiling water, rolled around minced pork and wood-ear mushroom, showered with fried shallots and served with cinnamon pork roll and sweet-sour fish sauce.",
    ingredients: ["Bột gạo", "Thịt băm", "Mộc nhĩ", "Hành phi", "Chả quế", "Rau mùi", "Nước mắm", "Giấm"],
    ingredientsEn: ["Rice flour", "Minced pork", "Wood-ear mushroom", "Fried shallots", "Cinnamon pork roll", "Coriander", "Fish sauce", "Vinegar"],
    funFact: "Người Thanh Trì (Hà Nội) tráng bánh mỏng đến mức có thể đọc chữ qua lá bánh - đó là thước đo tay nghề.",
    funFactEn: "Thanh Tri artisans in Hanoi spread the batter so thin you can read print through it - the traditional test of skill.",
  },
  {
    id: "com-hen",
    emoji: "🍚",
    name: "Cơm hến",
    nameEn: "Baby Clam Rice",
    region: "Trung", regionEn: "Central",
    description: "Món ăn dân dã của Huế: cơm nguội trộn hến xào, rau thơm, bắp chuối, tóp mỡ, đậu phộng và ruốc, cay nồng đúng vị người Huế.",
    descriptionEn: "A humble Hue dish: cold rice tossed with stir-fried baby clams, herbs, banana blossom, crispy pork fat, peanuts and fermented shrimp paste - fiery hot, exactly as Hue likes it.",
    ingredients: ["Cơm nguội", "Hến", "Bắp chuối", "Rau thơm", "Tóp mỡ", "Đậu phộng", "Ruốc Huế", "Ớt"],
    ingredientsEn: ["Cold rice", "Baby clams", "Banana blossom", "Herbs", "Crispy pork fat", "Peanuts", "Hue shrimp paste", "Chilli"],
    funFact: "Cơm hến dùng cơm nguội chứ không phải cơm nóng - người Huế nói cơm nóng sẽ làm mất vị thanh của hến.",
    funFactEn: "Cơm hến must use day-old cold rice; locals insist hot rice would drown the delicate clam flavour.",
  },
  {
    id: "banh-khot",
    emoji: "🥞",
    name: "Bánh khọt Vũng Tàu",
    nameEn: "Mini Savoury Pancakes",
    region: "Nam", regionEn: "South",
    description: "Bánh nhỏ bằng miệng chén, vỏ giòn rụm nhờ chảo khuôn nhiều dầu, trên mặt là tôm tươi và tôm cháy, cuốn với rau sống chấm nước mắm chua ngọt.",
    descriptionEn: "Coin-sized pancakes fried crisp in a dimpled pan, each topped with a fresh prawn and dried shrimp floss, wrapped in lettuce and herbs and dipped in sweet-sour fish sauce.",
    ingredients: ["Bột gạo", "Nước cốt dừa", "Tôm tươi", "Tôm cháy", "Hành lá", "Rau sống", "Đu đủ chua", "Nước mắm"],
    ingredientsEn: ["Rice flour", "Coconut milk", "Fresh prawns", "Dried shrimp floss", "Spring onion", "Fresh herbs", "Pickled papaya", "Fish sauce"],
    funFact: "Tên 'khọt' bắt nguồn từ tiếng muôi gõ vào khuôn khi lấy bánh ra: khọt khọt khọt.",
    funFactEn: "The name 'khọt' imitates the knocking sound of the ladle against the mould as each cake is lifted out.",
  },
];

/* ── Du lịch: 2 điểm đến mới ────────────────────────────────────────────── */
export const travelDestinationsV10: TravelDestination[] = [
  {
    id: "phu-quoc",
    name: "Phú Quốc",
    nameEn: "Phu Quoc Island",
    emoji: "🏝️",
    region: "south",
    type: "beach",
    bestTime: "Tháng 11 đến tháng 4 (biển lặng, ít mưa)",
    bestTimeEn: "November to April (calm sea, little rain)",
    duration: "3-4 ngày",
    duringEn: "3-4 days",
    highlights: [
      { vi: "Bãi Sao cát trắng mịn như bột", en: "Sao Beach with powder-white sand" },
      { vi: "Cáp treo Hòn Thơm dài gần 8 km vượt biển", en: "Hon Thom cable car, nearly 8 km over the sea" },
      { vi: "Làng nghề nước mắm và vườn tiêu truyền thống", en: "Traditional fish-sauce workshops and pepper farms" },
      { vi: "Chợ đêm Dương Đông và hải sản tươi", en: "Duong Dong night market and fresh seafood" },
    ],
    mustEat: [
      { vi: "Gỏi cá trích", en: "Herring salad" },
      { vi: "Bún quậy Kiến Xây", en: "Kien Xay 'bun quay' noodle soup" },
      { vi: "Ghẹ hấp bia", en: "Beer-steamed blue crab" },
    ],
    tip: "Thuê xe máy khoảng 150k một ngày để đi Bắc đảo; mang kem chống nắng vì nắng rất gắt sau 10 giờ sáng.",
    tipEn: "Rent a motorbike for about 150k VND/day to explore the north of the island; bring strong sunscreen, the sun bites after 10am.",
  },
  {
    id: "ninh-binh",
    name: "Ninh Bình - Tràng An",
    nameEn: "Ninh Binh - Trang An",
    emoji: "⛰️",
    region: "north",
    type: "heritage",
    bestTime: "Tháng 5 đến tháng 6 (mùa lúa vàng) hoặc tháng 9 đến tháng 11",
    bestTimeEn: "May to June (golden rice season) or September to November",
    duration: "2 ngày",
    duringEn: "2 days",
    highlights: [
      { vi: "Thuyền nan xuyên hang động Tràng An - di sản kép UNESCO", en: "Rowboat through Trang An caves, a dual UNESCO heritage site" },
      { vi: "Hang Múa với 500 bậc thang lên đỉnh ngắm toàn cảnh", en: "Mua Cave: 500 steps to a panoramic summit" },
      { vi: "Cố đô Hoa Lư - kinh đô thế kỷ 10", en: "Hoa Lu, Vietnam's 10th-century capital" },
      { vi: "Vườn quốc gia Cúc Phương và trung tâm cứu hộ linh trưởng", en: "Cuc Phuong National Park and its primate rescue centre" },
    ],
    mustEat: [
      { vi: "Cơm cháy Ninh Bình", en: "Ninh Binh crispy rice crust" },
      { vi: "Thịt dê núi", en: "Mountain goat meat" },
      { vi: "Ốc núi hấp gừng", en: "Ginger-steamed mountain snails" },
    ],
    tip: "Đi Tràng An trước 8 giờ sáng để tránh nắng và đông; người lái thuyền thường là bà con địa phương, nên chuẩn bị tiền tip nhỏ.",
    tipEn: "Start Trang An before 8am to dodge heat and crowds; boats are rowed by local villagers, so keep a small tip ready.",
  },
];

/* ── Văn hoá: 2 chủ đề mới ──────────────────────────────────────────────── */
export const cultureExpansionV10: CultureTopic[] = [
  {
    id: "tea-culture",
    emoji: "🍵",
    title: "Văn hoá uống trà và mời trà",
    titleEn: "Tea Culture and the Art of Offering Tea",
    category: "ritual",
    summary: "Trà mở đầu mọi cuộc gặp ở Việt Nam: từ bàn tiếp khách trong nhà, quán trà đá vỉa hè, tới lễ ăn hỏi. Cách rót và mời trà thể hiện thứ bậc và sự tôn trọng.",
    summaryEn: "Tea opens every Vietnamese encounter: the family reception table, the pavement iced-tea stall, the engagement ceremony. How you pour and offer it signals hierarchy and respect.",
    details: [
      {
        heading: "Mời trà đúng thứ bậc",
        headingEn: "Offering tea by seniority",
        body: "Người nhỏ tuổi nhất thường rót trà. Rót cho người lớn tuổi nhất trước, đưa bằng hai tay, hơi khom người và nói 'Cháu mời bác uống trà ạ'. Không rót đầy tràn miệng chén - chỉ khoảng bảy phần.",
        bodyEn: "The youngest person usually pours. Serve the eldest first, present the cup with both hands, bow slightly and say 'Cháu mời bác uống trà ạ'. Never fill to the brim - about seven-tenths is correct.",
      },
      {
        heading: "Trà đá vỉa hè - phòng khách của cả phố",
        headingEn: "Pavement iced tea - the neighbourhood living room",
        body: "Một cốc trà đá chỉ 3.000 đến 5.000 đồng, nhiều nơi còn miễn phí kèm bữa ăn. Đây là nơi người ta bàn chuyện bóng đá, giá vàng và chuyện hàng xóm. Câu quen tai: 'Cho em cốc trà đá!'",
        bodyEn: "A glass of iced tea costs 3,000-5,000 VND and is often free with a meal. This is where football, gold prices and neighbourhood news get discussed. The classic line: 'Cho em cốc trà đá!'",
      },
      {
        heading: "Trà trong nghi lễ",
        headingEn: "Tea in ceremonies",
        body: "Trong lễ ăn hỏi và lễ cưới, cô dâu chú rể rót trà mời cha mẹ hai bên để tỏ lòng biết ơn. Trên bàn thờ gia tiên cũng luôn có chén trà, vì người Việt tin rằng mời tổ tiên chén trà là mời các cụ về chung vui.",
        bodyEn: "At engagement and wedding ceremonies the couple pour tea for both sets of parents as a gesture of gratitude. Ancestral altars always hold a cup of tea: offering tea invites the ancestors to share the occasion.",
      },
      {
        heading: "Các loại trà phổ biến",
        headingEn: "Common teas",
        body: "Trà xanh Thái Nguyên đậm và chát hậu ngọt, trà sen Tây Hồ ướp hàng nghìn bông sen, trà nhài, trà atiso Đà Lạt và trà vối dân dã ở vùng quê Bắc Bộ.",
        bodyEn: "Thai Nguyen green tea is strong with a sweet finish; West Lake lotus tea is scented with thousands of blossoms; there are also jasmine tea, Da Lat artichoke tea and rustic 'vối' leaf tea in northern villages.",
      },
    ],
    vocabulary: [
      { vi: "mời trà", en: "to offer tea" },
      { vi: "chén trà", en: "tea cup" },
      { vi: "trà đá", en: "iced tea" },
      { vi: "rót trà", en: "to pour tea" },
      { vi: "hai tay", en: "with both hands (respectful)" },
      { vi: "bàn thờ gia tiên", en: "ancestral altar" },
    ],
  },
  {
    id: "market-culture",
    emoji: "🧺",
    title: "Văn hoá chợ và cách trả giá",
    titleEn: "Market Culture and Bargaining Etiquette",
    category: "belief",
    summary: "Chợ Việt Nam không chỉ để mua bán mà là mạng xã hội ngoài đời: người bán nhớ tên khách, khách được nếm thử, và trả giá là một cuộc trò chuyện vui vẻ chứ không phải tranh chấp.",
    summaryEn: "A Vietnamese market is a social network in the flesh: vendors remember your name, you get to taste before buying, and bargaining is a cheerful conversation rather than a dispute.",
    details: [
      {
        heading: "Mở hàng - vị khách đầu tiên",
        headingEn: "'Mở hàng' - the first customer",
        body: "Người bán tin rằng khách đầu tiên trong ngày quyết định vận may cả buổi. Vì vậy họ thường bán rẻ hơn cho khách 'mở hàng', nhưng khách cũng không nên trả giá quá thấp rồi bỏ đi - điều đó bị coi là mang lại điều không may.",
        bodyEn: "Vendors believe the first sale sets the luck for the whole day. They often give the 'mở hàng' customer a better price, but walking away after haggling hard is considered bad luck for them - so bargain fairly.",
      },
      {
        heading: "Trả giá thế nào cho lịch sự",
        headingEn: "How to bargain politely",
        body: "Hỏi giá bằng 'Cái này bao nhiêu ạ?', rồi chào lại khoảng 60 đến 70 phần trăm và luôn cười. Nếu người bán nói 'không được đâu em', hãy tăng nhẹ hoặc mua nhiều hơn để được giá tốt: 'Em lấy ba cái, chị tính rẻ nhé.'",
        bodyEn: "Ask 'Cái này bao nhiêu ạ?', counter at roughly 60-70 percent, and keep smiling. If the seller says 'không được đâu em', nudge up slightly or buy more for a better rate: 'Em lấy ba cái, chị tính rẻ nhé.'",
      },
      {
        heading: "Cách gọi người bán",
        headingEn: "Addressing the seller",
        body: "Gọi theo tuổi: 'cô', 'chị', 'bác', 'anh'. Gọi đúng vai giúp bạn được đối xử như người quen. Tránh gọi 'bà' với người phụ nữ trung niên vì nghe già hơn thực tế.",
        bodyEn: "Use age-based terms: 'cô', 'chị', 'bác', 'anh'. Getting it right makes you feel like a regular. Avoid 'bà' for a middle-aged woman - it sounds older than intended.",
      },
      {
        heading: "Chợ nào cho việc gì",
        headingEn: "Which market for what",
        body: "Chợ sáng sớm cho rau cá tươi nhất, chợ đêm cho quà và ăn uống, chợ đầu mối cho giá sỉ. Ở siêu thị và cửa hàng dán giá thì không trả giá.",
        bodyEn: "Early-morning markets have the freshest produce, night markets are for gifts and street food, wholesale markets give bulk prices. In supermarkets and price-tagged shops, do not bargain.",
      },
    ],
    vocabulary: [
      { vi: "mở hàng", en: "first sale of the day" },
      { vi: "trả giá", en: "to bargain" },
      { vi: "bớt chút", en: "come down a little" },
      { vi: "chợ đầu mối", en: "wholesale market" },
      { vi: "khách quen", en: "regular customer" },
      { vi: "niêm yết giá", en: "fixed, posted price" },
    ],
  },
];

/* ── Phim & Hội thoại: 2 clip mới ───────────────────────────────────────── */
export const filmsExpansionV10: FilmClip[] = [
  {
    id: "renting-a-room",
    title: "Đi xem phòng cho thuê",
    titleEn: "Viewing a Room for Rent",
    type: "vlog",
    level: "B1",
    duration: "2:20",
    thumbnail: "🏠",
    synopsis: "Một người nước ngoài đi xem phòng trọ ở Sài Gòn, hỏi giá, tiền điện nước và đặt cọc.",
    synopsisEn: "A foreigner views a rental room in Saigon, asking about rent, utilities and the deposit.",
    dialogue: [
      { speaker: "Người thuê", vi: "Chị ơi, phòng này giá bao nhiêu một tháng ạ?", en: "Excuse me, how much is this room per month?" },
      { speaker: "Chủ nhà", vi: "Sáu triệu, chưa bao gồm điện nước em nhé.", en: "Six million, not including electricity and water." },
      { speaker: "Người thuê", vi: "Điện nước tính thế nào chị?", en: "How are utilities calculated?" },
      { speaker: "Chủ nhà", vi: "Điện bốn nghìn một số, nước một trăm nghìn một người.", en: "Four thousand per unit of electricity, one hundred thousand per person for water." },
      { speaker: "Người thuê", vi: "Em phải đặt cọc mấy tháng ạ?", en: "How many months' deposit do I need?" },
      { speaker: "Chủ nhà", vi: "Cọc một tháng, hợp đồng sáu tháng.", en: "One month's deposit, six-month contract." },
      { speaker: "Người thuê", vi: "Phòng có được nấu ăn không chị?", en: "Am I allowed to cook in the room?" },
      { speaker: "Chủ nhà", vi: "Được, nhưng nhớ đóng cửa sau mười một giờ đêm.", en: "Yes, but remember the gate closes after eleven at night." },
      { speaker: "Người thuê", vi: "Vậy em suy nghĩ rồi chiều nhắn lại chị nhé.", en: "I'll think it over and message you this afternoon." },
      { speaker: "Chủ nhà", vi: "Ừ, em nhắn sớm giúp chị, phòng này nhiều người hỏi lắm.", en: "Sure, let me know soon - many people are asking about it." },
    ],
    vocabHighlight: [
      { vi: "đặt cọc", en: "to pay a deposit" },
      { vi: "chưa bao gồm", en: "not including" },
      { vi: "một số điện", en: "one unit (kWh) of electricity" },
      { vi: "hợp đồng", en: "contract" },
      { vi: "nhắn lại", en: "to message back" },
    ],
    comprehensionQ: [
      { q: "Giá phòng một tháng là bao nhiêu?", qEn: "What is the monthly rent?", a: "Sáu triệu đồng, chưa gồm điện nước", aEn: "Six million VND, utilities excluded" },
      { q: "Phải đặt cọc bao lâu?", qEn: "How long is the deposit?", a: "Một tháng", aEn: "One month" },
      { q: "Cổng đóng lúc mấy giờ?", qEn: "What time does the gate close?", a: "Mười một giờ đêm", aEn: "Eleven at night" },
    ],
  },
  {
    id: "clinic-visit-clip",
    title: "Ở phòng khám: mô tả triệu chứng",
    titleEn: "At the Clinic: Describing Symptoms",
    type: "drama",
    level: "A2",
    duration: "1:40",
    thumbnail: "🩺",
    synopsis: "Bệnh nhân kể triệu chứng với bác sĩ, nghe hướng dẫn uống thuốc và hẹn tái khám.",
    synopsisEn: "A patient describes symptoms to a doctor, receives dosage instructions and books a follow-up.",
    dialogue: [
      { speaker: "Bác sĩ", vi: "Em bị sao? Kể cho bác sĩ nghe.", en: "What's wrong? Tell me about it." },
      { speaker: "Bệnh nhân", vi: "Dạ, em bị đau họng và sốt hai ngày rồi ạ.", en: "I've had a sore throat and fever for two days." },
      { speaker: "Bác sĩ", vi: "Có ho không? Ho khan hay có đờm?", en: "Any cough? Dry or with phlegm?" },
      { speaker: "Bệnh nhân", vi: "Em ho khan, ban đêm ho nhiều hơn ạ.", en: "A dry cough, worse at night." },
      { speaker: "Bác sĩ", vi: "Em có dị ứng thuốc gì không?", en: "Are you allergic to any medication?" },
      { speaker: "Bệnh nhân", vi: "Dạ không ạ.", en: "No, I'm not." },
      { speaker: "Bác sĩ", vi: "Viêm họng thôi. Bác kê thuốc, ngày ba lần sau khi ăn.", en: "It's just throat inflammation. I'll prescribe medicine, three times a day after meals." },
      { speaker: "Bệnh nhân", vi: "Em uống mấy ngày ạ?", en: "For how many days?" },
      { speaker: "Bác sĩ", vi: "Năm ngày. Nếu còn sốt thì quay lại tái khám.", en: "Five days. Come back for a check-up if the fever persists." },
      { speaker: "Bệnh nhân", vi: "Dạ, em cảm ơn bác sĩ ạ.", en: "Thank you, doctor." },
    ],
    vocabHighlight: [
      { vi: "đau họng", en: "sore throat" },
      { vi: "ho khan", en: "dry cough" },
      { vi: "có đờm", en: "with phlegm" },
      { vi: "kê thuốc", en: "to prescribe" },
      { vi: "tái khám", en: "follow-up visit" },
    ],
    comprehensionQ: [
      { q: "Bệnh nhân bị gì?", qEn: "What is wrong with the patient?", a: "Đau họng và sốt hai ngày", aEn: "Sore throat and fever for two days" },
      { q: "Uống thuốc mấy lần một ngày?", qEn: "How many times a day is the medicine?", a: "Ba lần, sau khi ăn", aEn: "Three times, after meals" },
      { q: "Khi nào cần tái khám?", qEn: "When should the patient return?", a: "Nếu vẫn còn sốt", aEn: "If the fever persists" },
    ],
  },
];
