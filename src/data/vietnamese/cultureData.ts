// Vietnamese Culture & Customs — Áo dài, Tết, weddings, ancestral worship, traditional crafts
export interface CultureTopic {
  id: string;
  emoji: string;
  title: string;
  titleEn: string;
  category: "attire" | "festival" | "ritual" | "craft" | "belief";
  summary: string;
  summaryEn: string;
  details: { heading: string; headingEn: string; body: string; bodyEn: string }[];
  vocabulary: { vi: string; en: string }[];
}

export const cultureTopics: CultureTopic[] = [
  {
    id: "ao-dai",
    emoji: "👘",
    title: "Áo dài — Trang phục truyền thống",
    titleEn: "Áo Dài — Traditional Dress",
    category: "attire",
    summary: "Áo dài là biểu tượng văn hóa Việt: ôm sát thân, hai tà dài bay tha thướt, mặc trong lễ cưới, khai giảng, tốt nghiệp.",
    summaryEn: "The áo dài is Vietnam's cultural icon: form-fitting silk gown with two flowing panels, worn at weddings, school openings, graduations.",
    details: [
      {
        heading: "Lịch sử",
        headingEn: "History",
        body: "Phát triển từ áo ngũ thân thời Nguyễn (1744), được nhà thiết kế Nguyễn Cát Tường (Lemur) hiện đại hóa năm 1934.",
        bodyEn: "Evolved from the 5-panel áo ngũ thân of the Nguyen era (1744), modernized by designer Nguyen Cat Tuong (Lemur) in 1934.",
      },
      {
        heading: "Ý nghĩa màu sắc",
        headingEn: "Color Symbolism",
        body: "Trắng: tinh khôi (nữ sinh). Đỏ: hỷ sự, cô dâu. Vàng: hoàng gia. Hồng: trẻ trung. Tím: sự thủy chung của cố đô Huế.",
        bodyEn: "White: purity (schoolgirls). Red: joy/brides. Yellow: royalty. Pink: youth. Purple: loyalty (Hue tradition).",
      },
    ],
    vocabulary: [
      { vi: "áo dài", en: "long dress" },
      { vi: "tà áo", en: "panel/flap" },
      { vi: "khăn đóng", en: "turban" },
      { vi: "may đo", en: "tailor-made" },
    ],
  },
  {
    id: "tet",
    emoji: "🧧",
    title: "Tết Nguyên Đán — Năm mới âm lịch",
    titleEn: "Tết — Lunar New Year",
    category: "festival",
    summary: "Lễ hội lớn nhất năm: dọn nhà, cúng tổ tiên, mừng tuổi, ăn bánh chưng/bánh tét, kiêng nói điều xui.",
    summaryEn: "The biggest festival: house cleaning, ancestor worship, lucky money, banh chung/banh tet cakes, avoiding bad omens.",
    details: [
      {
        heading: "Chuẩn bị Tết",
        headingEn: "Tết Preparation",
        body: "Tuần cuối năm: dọn nhà, mua hoa đào (Bắc) hoặc hoa mai (Nam), gói bánh chưng, mua quần áo mới, trả nợ.",
        bodyEn: "Final week: clean house, buy peach blossoms (North) or apricot blossoms (South), wrap rice cakes, buy new clothes, settle debts.",
      },
      {
        heading: "Phong tục đêm giao thừa",
        headingEn: "New Year's Eve Customs",
        body: "Cúng giao thừa lúc 0h, xông đất (người đầu tiên bước vào nhà), hái lộc đầu năm tại đình chùa.",
        bodyEn: "Midnight ancestor offering, 'first foot' visitor brings luck, picking blessed twigs at temples.",
      },
      {
        heading: "Lì xì",
        headingEn: "Red Envelope (Lucky Money)",
        body: "Người lớn mừng tuổi trẻ em & người già bằng phong bao đỏ. Số tiền chẵn (50k, 100k, 500k) tránh số 4.",
        bodyEn: "Elders give children and seniors red envelopes. Even amounts (50k, 100k, 500k VND), avoiding number 4.",
      },
    ],
    vocabulary: [
      { vi: "chúc mừng năm mới", en: "Happy New Year" },
      { vi: "lì xì", en: "lucky money" },
      { vi: "bánh chưng", en: "square sticky rice cake" },
      { vi: "xông đất", en: "first visitor of the year" },
      { vi: "mừng tuổi", en: "to give New Year wishes" },
    ],
  },
  {
    id: "wedding",
    emoji: "💍",
    title: "Đám cưới truyền thống",
    titleEn: "Traditional Wedding",
    category: "ritual",
    summary: "Gồm 3 nghi lễ chính: dạm ngõ, ăn hỏi (đính hôn), lễ cưới — nhà trai mang lễ vật sang nhà gái.",
    summaryEn: "Three main rites: proposal visit, engagement (ăn hỏi), wedding ceremony — groom's family brings gifts to bride's family.",
    details: [
      {
        heading: "Lễ ăn hỏi",
        headingEn: "Engagement Ceremony",
        body: "Nhà trai bưng tráp: trầu cau, rượu, bánh phu thê, trà, hoa quả, lợn quay (số mâm chẵn 5, 7, 9, 11).",
        bodyEn: "Groom's family carries trays: betel-areca, wine, husband-wife cakes, tea, fruit, roast pig (odd number: 5, 7, 9, 11 trays).",
      },
      {
        heading: "Lễ cưới",
        headingEn: "Wedding Day",
        body: "Cô dâu mặc áo dài đỏ, lạy bàn thờ tổ tiên, rót rượu mời cha mẹ, sau đó tiệc đãi khách 50–500 người.",
        bodyEn: "Bride wears red áo dài, bows at ancestor altar, pours wine for parents, then banquet for 50–500 guests.",
      },
    ],
    vocabulary: [
      { vi: "cô dâu / chú rể", en: "bride / groom" },
      { vi: "ăn hỏi", en: "engagement" },
      { vi: "tráp lễ", en: "ceremonial trays" },
      { vi: "trầu cau", en: "betel and areca nut" },
    ],
  },
  {
    id: "ancestor-worship",
    emoji: "🕯️",
    title: "Thờ cúng tổ tiên",
    titleEn: "Ancestor Worship",
    category: "belief",
    summary: "Tín ngưỡng nền tảng: bàn thờ trong mỗi gia đình, cúng giỗ, thắp hương đầu/giữa tháng âm lịch.",
    summaryEn: "Foundational belief: ancestor altar in every home, death anniversaries, incense on lunar 1st and 15th.",
    details: [
      {
        heading: "Bàn thờ gia tiên",
        headingEn: "Family Altar",
        body: "Đặt nơi trang trọng nhất, có ảnh tổ tiên, bát hương, đèn dầu, mâm ngũ quả. Không đặt dưới xà nhà, đối diện toilet.",
        bodyEn: "Placed in the most respected spot with ancestor photos, incense bowl, oil lamp, 5-fruit tray. Never under beams or facing bathrooms.",
      },
      {
        heading: "Ngày giỗ",
        headingEn: "Death Anniversary",
        body: "Con cháu tụ họp nấu mâm cỗ, cúng tổ tiên rồi cùng ăn. Là dịp duy trì tình cảm gia đình, dòng tộc.",
        bodyEn: "Descendants gather, prepare a feast, offer to ancestors, then share. Vital for maintaining family bonds.",
      },
    ],
    vocabulary: [
      { vi: "bàn thờ", en: "altar" },
      { vi: "thắp hương", en: "to burn incense" },
      { vi: "giỗ", en: "death anniversary" },
      { vi: "ông bà tổ tiên", en: "ancestors" },
    ],
  },
  {
    id: "craft-villages",
    emoji: "🏺",
    title: "Làng nghề truyền thống",
    titleEn: "Traditional Craft Villages",
    category: "craft",
    summary: "Hơn 5400 làng nghề khắp Việt Nam: gốm Bát Tràng, lụa Vạn Phúc, tranh Đông Hồ, nón lá Huế.",
    summaryEn: "Over 5,400 craft villages across Vietnam: Bat Trang ceramics, Van Phuc silk, Dong Ho woodblock prints, Hue conical hats.",
    details: [
      {
        heading: "Gốm Bát Tràng",
        headingEn: "Bat Trang Ceramics",
        body: "Hà Nội, hơn 700 năm tuổi. Nổi tiếng với men rạn, men lam, sản phẩm gia dụng và tâm linh xuất khẩu toàn cầu.",
        bodyEn: "Hanoi, 700+ years old. Famous for crackle and blue glazes, household and ceremonial pieces exported worldwide.",
      },
      {
        heading: "Tranh Đông Hồ",
        headingEn: "Dong Ho Folk Paintings",
        body: "Bắc Ninh, in từ ván gỗ trên giấy điệp. Tranh 'Vinh hoa', 'Đám cưới chuột' phản ánh đời sống dân gian, thường treo Tết.",
        bodyEn: "Bac Ninh, woodblock-printed on shell-coated paper. 'Prosperity' and 'Mouse wedding' depict folk life, hung at Tết.",
      },
    ],
    vocabulary: [
      { vi: "làng nghề", en: "craft village" },
      { vi: "gốm sứ", en: "ceramics" },
      { vi: "lụa tơ tằm", en: "mulberry silk" },
      { vi: "nón lá", en: "conical hat" },
    ],
  },
  {
    id: "table-manners",
    emoji: "🥢",
    title: "Văn hóa bàn ăn",
    titleEn: "Dining Etiquette",
    category: "ritual",
    summary: "Mời cơm theo thứ tự tuổi, không cắm đũa thẳng vào bát, người trẻ rót trà cho người lớn.",
    summaryEn: "Invite to eat by age order, never stick chopsticks vertically in rice, young pour tea for elders.",
    details: [
      {
        heading: "Quy tắc đũa",
        headingEn: "Chopstick Rules",
        body: "Không cắm đũa đứng (giống cúng người chết), không chỉ đũa vào người, không gõ đũa vào bát (gọi ma quỷ).",
        bodyEn: "Don't stand chopsticks upright (resembles funeral incense), don't point them at people, don't tap on bowls (calls ghosts).",
      },
      {
        heading: "Mời cơm",
        headingEn: "Inviting to Eat",
        body: "Trước khi ăn: 'Con/cháu mời ông bà, bố mẹ ăn cơm.' Theo thứ tự từ lớn đến nhỏ.",
        bodyEn: "Before eating, say: 'I invite grandparents/parents to eat.' From eldest to youngest.",
      },
    ],
    vocabulary: [
      { vi: "mời cơm", en: "invite to eat" },
      { vi: "đũa", en: "chopsticks" },
      { vi: "bát cơm", en: "rice bowl" },
      { vi: "rót trà", en: "to pour tea" },
    ],
  },
];
