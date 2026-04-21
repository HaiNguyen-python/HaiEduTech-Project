// Vietnamese major holidays — bilingual content for the Learn Vietnamese hub
// Each holiday includes lunar/solar date, story, customs, vocab, and quiz.

import imgTet from "@/assets/holidays/tet-nguyen-dan.jpg";
import imgRam from "@/assets/holidays/ram-thang-gieng.jpg";
import imgGioTo from "@/assets/holidays/gio-to-hung-vuong.jpg";
import imgGiaiPhong from "@/assets/holidays/giai-phong-mien-nam.jpg";
import imgLaoDong from "@/assets/holidays/quoc-te-lao-dong.jpg";
import imgDoanNgo from "@/assets/holidays/tet-doan-ngo.jpg";
import imgVuLan from "@/assets/holidays/le-vu-lan.jpg";
import imgQuocKhanh from "@/assets/holidays/quoc-khanh.jpg";
import imgTrungThu from "@/assets/holidays/tet-trung-thu.jpg";
import imgNhaGiao from "@/assets/holidays/ngay-nha-giao.jpg";
import imgPhuNu from "@/assets/holidays/ngay-phu-nu.jpg";
import imgThieuNhi from "@/assets/holidays/ngay-thieu-nhi.jpg";

export interface HolidayVocab {
  word: string;
  meaning: string;
  meaningEn: string;
  example: string;
  exampleEn: string;
}

export interface HolidayQuiz {
  question: string;
  questionEn: string;
  options: string[];
  optionsEn: string[];
  answer: number;
  explanation: string;
  explanationEn: string;
}

export interface VietnameseHoliday {
  id: string;
  name: string;
  nameEn: string;
  date: string;        // e.g. "Mùng 1 tháng 1 Âm lịch" or "30/4 Dương lịch"
  dateEn: string;
  type: "traditional" | "national" | "cultural" | "international";
  category: "spring" | "summer" | "autumn" | "winter" | "anytime";
  icon: string;        // emoji
  color: string;       // tailwind gradient stops, e.g. "from-rose-500 to-red-600"
  image?: string;      // chibi illustration url (imported asset)
  shortDesc: string;
  shortDescEn: string;
  story: string;       // 2-4 short paragraphs
  storyEn: string;
  customs: string[];
  customsEn: string[];
  foods: string[];
  foodsEn: string[];
  vocabulary: HolidayVocab[];
  quiz: HolidayQuiz[];
  funFact?: string;
  funFactEn?: string;
}

export const vietnameseHolidays: VietnameseHoliday[] = [
  // ===== 1. TẾT NGUYÊN ĐÁN =====
  {
    id: "tet-nguyen-dan",
    name: "Tết Nguyên Đán",
    nameEn: "Lunar New Year (Tết)",
    date: "Mùng 1 tháng Giêng Âm lịch (cuối tháng 1 – giữa tháng 2)",
    dateEn: "1st day of the 1st lunar month (late Jan – mid Feb)",
    type: "traditional",
    category: "spring",
    icon: "🧧",
    color: "from-rose-500 to-red-600",
    image: imgTet,
    shortDesc: "Lễ hội lớn nhất trong năm – đoàn tụ gia đình, đón năm mới với hy vọng may mắn, sức khoẻ và tài lộc.",
    shortDescEn: "The biggest festival of the year — family reunion welcoming the new year with hope for luck, health, and prosperity.",
    story: `Tết Nguyên Đán (gọi tắt là Tết) đánh dấu thời khắc giao thoa giữa năm cũ và năm mới theo Âm lịch. Đây là dịp lễ thiêng liêng nhất của người Việt, kéo dài chính thức 3 ngày nhưng thường được chuẩn bị và ăn mừng cả tuần.\n\nTrước Tết, mọi nhà dọn dẹp, lau bàn thờ, mua hoa đào (miền Bắc) hoặc hoa mai (miền Nam) để bày trong nhà. Đêm 30 (giao thừa), gia đình quây quần bên nồi bánh chưng, bánh tét – tượng trưng cho trời tròn và đất vuông theo truyền thuyết Lang Liêu.\n\nSáng mùng 1, con cháu chúc Tết ông bà, nhận lì xì (phong bao đỏ chứa tiền may mắn) và cùng nhau đi lễ chùa, đi chợ Tết. Mùng 1 Tết cha, mùng 2 Tết mẹ, mùng 3 Tết thầy – câu nói thể hiện đạo lý 'uống nước nhớ nguồn'.`,
    storyEn: `Tết Nguyên Đán (Tết) marks the transition between the old and new year on the lunar calendar. It is the most sacred holiday of the Vietnamese, officially lasting 3 days but typically celebrated for a whole week.\n\nBefore Tết, families clean the house, polish the ancestor altar, and decorate with peach blossoms (in the North) or yellow apricot flowers (in the South). On New Year's Eve, families gather around boiling pots of bánh chưng and bánh tét — symbolizing the round sky and square earth from the legend of Lang Liêu.\n\nOn the morning of the 1st day, children pay respects to grandparents, receive lì xì (red envelopes with lucky money), and visit pagodas and Tết markets. The saying "1st day for father, 2nd day for mother, 3rd day for teacher" reflects the philosophy of remembering one's roots.`,
    customs: [
      "Cúng giao thừa lúc nửa đêm – tiễn năm cũ, đón năm mới",
      "Xông đất: người đầu tiên bước vào nhà sáng mùng 1 mang lại vận khí cả năm",
      "Lì xì cho trẻ em và người lớn tuổi",
      "Đi chùa cầu may, hái lộc đầu năm",
      "Chúc Tết: 'An khang thịnh vượng', 'Vạn sự như ý'",
    ],
    customsEn: [
      "Midnight ritual to send off the old year and welcome the new",
      "Xông đất: the first visitor on the 1st day determines the year's luck",
      "Giving lì xì (red envelopes) to children and elders",
      "Visiting pagodas to pray for fortune and pluck a 'lộc' branch",
      "New Year greetings: 'Peace and prosperity', 'May all wishes come true'",
    ],
    foods: ["Bánh chưng / Bánh tét", "Thịt kho hột vịt", "Dưa hành", "Mứt Tết", "Canh măng"],
    foodsEn: ["Bánh chưng (square sticky rice cake) / Bánh tét (cylindrical version)", "Caramelized pork with eggs", "Pickled onions", "Candied fruits", "Bamboo shoot soup"],
    vocabulary: [
      { word: "Tết", meaning: "Tết Nguyên Đán", meaningEn: "Lunar New Year", example: "Chúc mừng năm mới! Chúc Tết vui vẻ!", exampleEn: "Happy New Year! Have a happy Tết!" },
      { word: "lì xì", meaning: "tiền mừng tuổi trong phong bao đỏ", meaningEn: "lucky money in red envelopes", example: "Trẻ em rất thích nhận lì xì.", exampleEn: "Children love receiving lì xì." },
      { word: "giao thừa", meaning: "thời khắc chuyển từ năm cũ sang năm mới", meaningEn: "New Year's Eve moment", example: "Cả nhà cùng đón giao thừa.", exampleEn: "The whole family welcomes the New Year together." },
      { word: "bánh chưng", meaning: "bánh truyền thống hình vuông gói lá dong", meaningEn: "square sticky rice cake wrapped in dong leaves", example: "Mẹ tôi gói bánh chưng rất khéo.", exampleEn: "My mother wraps bánh chưng very skillfully." },
      { word: "xông đất", meaning: "người đầu tiên bước vào nhà đầu năm", meaningEn: "the first visitor of the year", example: "Ai xông đất nhà tôi mùng 1 nhỉ?", exampleEn: "Who will be the first visitor on the 1st day?" },
    ],
    quiz: [
      {
        question: "Tết Nguyên Đán diễn ra vào ngày nào?",
        questionEn: "When does Tết Nguyên Đán take place?",
        options: ["Mùng 1 tháng 1 Dương lịch", "Mùng 1 tháng Giêng Âm lịch", "Ngày 30 tháng Chạp", "Rằm tháng Giêng"],
        optionsEn: ["1st January Solar", "1st day of 1st Lunar month", "30th of 12th Lunar month", "15th of 1st Lunar month"],
        answer: 1,
        explanation: "Tết theo Âm lịch, thường rơi vào cuối tháng 1 hoặc giữa tháng 2 Dương lịch.",
        explanationEn: "Tết follows the lunar calendar, usually falling in late January or mid-February.",
      },
      {
        question: "Loại bánh truyền thống nào tượng trưng cho mặt đất vuông?",
        questionEn: "Which traditional cake symbolizes the square earth?",
        options: ["Bánh dày", "Bánh chưng", "Bánh xèo", "Bánh trôi"],
        optionsEn: ["Bánh dày", "Bánh chưng", "Bánh xèo", "Bánh trôi"],
        answer: 1,
        explanation: "Bánh chưng vuông – đất; bánh dày tròn – trời, theo truyền thuyết Lang Liêu.",
        explanationEn: "Square bánh chưng = earth; round bánh dày = sky, per Lang Liêu's legend.",
      },
      {
        question: "Câu chúc Tết phổ biến 'An khang thịnh vượng' nghĩa là gì?",
        questionEn: "What does the popular greeting 'An khang thịnh vượng' mean?",
        options: ["Sức khoẻ tốt và giàu có", "May mắn cả năm", "Học giỏi và thành công", "Sống lâu trăm tuổi"],
        optionsEn: ["Good health and prosperity", "Luck all year", "Study well and succeed", "Live to a hundred"],
        answer: 0,
        explanation: "'An khang' = bình an khoẻ mạnh; 'thịnh vượng' = giàu có phát đạt.",
        explanationEn: "'An khang' = peace & health; 'thịnh vượng' = wealth & prosperity.",
      },
    ],
    funFact: "Theo phong tục, người ta kiêng quét nhà 3 ngày Tết vì sợ quét đi vận may!",
    funFactEn: "Tradition says you shouldn't sweep the house during the first 3 days of Tết — it sweeps away good luck!",
  },

  // ===== 2. RẰM THÁNG GIÊNG (TẾT NGUYÊN TIÊU) =====
  {
    id: "ram-thang-gieng",
    name: "Rằm Tháng Giêng (Tết Nguyên Tiêu)",
    nameEn: "First Full Moon Festival",
    date: "15 tháng Giêng Âm lịch",
    dateEn: "15th day of the 1st lunar month",
    type: "traditional",
    category: "spring",
    icon: "🏮",
    color: "from-amber-400 to-orange-500",
    image: imgRam,
    shortDesc: "Đêm rằm đầu tiên của năm mới – ngày lễ Phật quan trọng, người Việt đi chùa cầu an, thả đèn hoa đăng.",
    shortDescEn: "The first full moon of the year — an important Buddhist day when Vietnamese visit pagodas to pray for peace and release lotus lanterns.",
    story: `Tết Nguyên Tiêu là rằm đầu tiên trong năm Âm lịch, thường gọi là 'Tết Thượng Nguyên'. Câu nói 'Lễ Phật quanh năm không bằng Rằm tháng Giêng' cho thấy tầm quan trọng đặc biệt của ngày này trong đời sống tâm linh người Việt.\n\nTừ sáng sớm, các chùa lớn nhỏ đều tổ chức lễ cầu an, dâng sao giải hạn cho gia chủ. Chiều tối, gia đình cúng rằm tại nhà với mâm cỗ chay hoặc mặn tuỳ phong tục. Tại Hội An, đêm rằm tháng Giêng tắt điện, phố cổ chỉ thắp đèn lồng – tạo nên khung cảnh huyền ảo nổi tiếng.\n\nNgười Hoa và một số vùng Việt Nam còn gọi đây là Lễ hội Đèn Lồng (Lantern Festival), với truyền thống thả đèn hoa đăng trên sông và ăn bánh trôi tàu (chè trôi nước).`,
    storyEn: `Tết Nguyên Tiêu is the first full moon of the lunar year, also called 'Upper First Festival'. The proverb "Worshipping Buddha all year doesn't match the 1st-month full moon" shows its special importance in Vietnamese spiritual life.\n\nFrom early morning, pagodas hold ceremonies for peace and to ward off bad stars. In the evening, families perform full-moon rituals at home with vegetarian or meat dishes depending on tradition. In Hội An, lights are turned off on this night and the ancient town glows only with lanterns — creating its famous magical scene.\n\nEthnic Chinese and some Vietnamese regions call it the Lantern Festival, with traditions of releasing floating lanterns on rivers and eating sweet glutinous rice ball soup.`,
    customs: [
      "Đi chùa lễ Phật, dâng sao giải hạn",
      "Cúng rằm với hương hoa, trái cây",
      "Thả đèn hoa đăng trên sông cầu bình an",
      "Tham quan phố cổ Hội An đêm thả đèn",
      "Đọc thơ, ngắm trăng (truyền thống xưa của nho sĩ)",
    ],
    customsEn: [
      "Visiting pagodas to pray for peace and ward off ill fortune",
      "Full-moon ritual at home with incense, flowers, fruits",
      "Releasing floating lanterns on rivers",
      "Visiting Hội An's lantern night",
      "Reading poetry and moon-gazing (old scholar tradition)",
    ],
    foods: ["Chè trôi nước", "Xôi gấc", "Bánh trôi", "Mâm cỗ chay"],
    foodsEn: ["Sweet glutinous rice ball soup", "Red sticky rice", "Floating dumplings", "Vegetarian feast"],
    vocabulary: [
      { word: "rằm", meaning: "ngày 15 Âm lịch (trăng tròn)", meaningEn: "15th of lunar month (full moon)", example: "Đêm rằm trăng sáng vằng vặc.", exampleEn: "On the full moon night, the moon shines brightly." },
      { word: "đèn lồng", meaning: "đèn truyền thống bằng giấy hoặc lụa", meaningEn: "traditional paper or silk lantern", example: "Phố Hội An rực rỡ đèn lồng.", exampleEn: "Hội An glows with lanterns." },
      { word: "cầu an", meaning: "cầu xin sự bình an", meaningEn: "to pray for peace", example: "Mẹ đi chùa cầu an cho cả nhà.", exampleEn: "Mom goes to the pagoda to pray for the family's peace." },
      { word: "hoa đăng", meaning: "đèn nổi trên nước hình hoa sen", meaningEn: "floating lotus-shaped lantern", example: "Chúng tôi thả hoa đăng trên sông Hương.", exampleEn: "We released hoa đăng on the Hương River." },
    ],
    quiz: [
      {
        question: "Câu nói 'Lễ Phật quanh năm không bằng ___ tháng Giêng' điền từ gì?",
        questionEn: "Fill in: 'Worshipping Buddha all year doesn't match the ___ of the 1st month'?",
        options: ["mùng 1", "mùng 7", "rằm", "30"],
        optionsEn: ["1st", "7th", "full moon (15th)", "30th"],
        answer: 2,
        explanation: "Rằm tháng Giêng được xem là ngày lễ Phật linh thiêng nhất trong năm.",
        explanationEn: "The full moon of the 1st month is considered the most sacred Buddhist day of the year.",
      },
      {
        question: "Thành phố nào nổi tiếng với đêm thả đèn lồng rằm tháng Giêng?",
        questionEn: "Which city is famous for its 1st-month lantern night?",
        options: ["Hà Nội", "Hội An", "Đà Lạt", "Sa Pa"],
        optionsEn: ["Hà Nội", "Hội An", "Đà Lạt", "Sa Pa"],
        answer: 1,
        explanation: "Hội An tắt điện và thắp đèn lồng vào các đêm rằm hằng tháng, đặc biệt rằm tháng Giêng.",
        explanationEn: "Hội An turns off lights and lights lanterns on every full moon — especially the 1st-month one.",
      },
    ],
  },

  // ===== 3. GIỖ TỔ HÙNG VƯƠNG =====
  {
    id: "gio-to-hung-vuong",
    name: "Giỗ Tổ Hùng Vương",
    nameEn: "Hung Kings' Commemoration Day",
    date: "Mùng 10 tháng 3 Âm lịch",
    dateEn: "10th day of the 3rd lunar month",
    type: "national",
    category: "spring",
    icon: "👑",
    color: "from-yellow-500 to-amber-600",
    image: imgGioTo,
    shortDesc: "Quốc lễ tưởng nhớ các Vua Hùng – những người sáng lập nhà nước Văn Lang đầu tiên của dân tộc Việt.",
    shortDescEn: "National holiday honoring the Hung Kings — founders of Văn Lang, Vietnam's first state.",
    story: `'Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng Mười tháng Ba' – câu ca dao quen thuộc nhắc người Việt khắp nơi hướng về Đền Hùng (Phú Thọ) vào ngày 10/3 Âm lịch để tưởng nhớ 18 đời Vua Hùng.\n\nTheo truyền thuyết, Lạc Long Quân (giống Rồng) và Âu Cơ (giống Tiên) sinh ra bọc trăm trứng, nở thành 100 người con. 50 người theo cha xuống biển, 50 người theo mẹ lên núi. Người con cả lên ngôi, lập nước Văn Lang, xưng là Hùng Vương thứ nhất.\n\nLễ hội Đền Hùng được UNESCO công nhận là Di sản Văn hoá Phi vật thể đại diện của nhân loại năm 2012. Vào ngày này, hàng vạn người hành hương về núi Nghĩa Lĩnh dâng hương, dâng bánh chưng – bánh dày tưởng nhớ tổ tiên.`,
    storyEn: `"Wherever you go, north or south / Remember Ancestor's Day — the 10th of the 3rd month" — a familiar folk saying reminding Vietnamese to turn toward the Hùng Temples in Phú Thọ on the 10th day of the 3rd lunar month to honor the 18 generations of Hùng Kings.\n\nLegend says Lạc Long Quân (Dragon lineage) and Âu Cơ (Fairy lineage) bore a sack of 100 eggs, hatching 100 children. 50 followed the father to the sea, 50 followed the mother to the mountains. The eldest became the first Hùng King and founded Văn Lang.\n\nThe Hùng Temple Festival was recognized by UNESCO as Representative Intangible Cultural Heritage of Humanity in 2012. On this day, tens of thousands pilgrim to Nghĩa Lĩnh Mountain to offer incense and bánh chưng – bánh dày in honor of the ancestors.`,
    customs: [
      "Hành hương về Đền Hùng, Phú Thọ",
      "Dâng hương, dâng bánh chưng – bánh dày tại các đền",
      "Tổ chức lễ rước kiệu, hát xoan",
      "Cả nước được nghỉ một ngày để tưởng nhớ tổ tiên",
    ],
    customsEn: [
      "Pilgrimage to Hùng Temples in Phú Thọ",
      "Offering incense and traditional cakes at the temples",
      "Palanquin processions and Xoan singing",
      "National day off to honor the ancestors",
    ],
    foods: ["Bánh chưng", "Bánh dày", "Xôi gấc", "Thịt heo quay"],
    foodsEn: ["Bánh chưng (square cake)", "Bánh dày (round cake)", "Red sticky rice", "Roast pork"],
    vocabulary: [
      { word: "Vua Hùng", meaning: "các vị vua đầu tiên của nước Văn Lang", meaningEn: "Hung Kings, founders of Văn Lang", example: "Đền Hùng thờ 18 đời Vua Hùng.", exampleEn: "The Hùng Temples worship 18 generations of Hùng Kings." },
      { word: "tổ tiên", meaning: "ông bà các đời trước", meaningEn: "ancestors", example: "Người Việt rất tôn kính tổ tiên.", exampleEn: "Vietnamese deeply revere their ancestors." },
      { word: "hành hương", meaning: "đi đến nơi linh thiêng để lễ bái", meaningEn: "to pilgrimage", example: "Mỗi năm tôi hành hương về Đền Hùng.", exampleEn: "Every year I pilgrimage to the Hùng Temples." },
      { word: "bánh dày", meaning: "bánh tròn dẻo từ gạo nếp – tượng trưng trời", meaningEn: "round sticky rice cake — symbolizing the sky", example: "Bánh dày kẹp giò ăn rất ngon.", exampleEn: "Bánh dày with Vietnamese ham is delicious." },
    ],
    quiz: [
      {
        question: "Giỗ Tổ Hùng Vương được tổ chức vào ngày nào Âm lịch?",
        questionEn: "When is Hùng Kings' Day in the lunar calendar?",
        options: ["Mùng 3 tháng 3", "Mùng 10 tháng 3", "Rằm tháng 3", "Mùng 1 tháng 4"],
        optionsEn: ["3rd of 3rd month", "10th of 3rd month", "Full moon of 3rd month", "1st of 4th month"],
        answer: 1,
        explanation: "Câu ca dao: 'Nhớ ngày Giỗ Tổ mùng Mười tháng Ba'.",
        explanationEn: "The folk saying confirms: '10th of the 3rd month'.",
      },
      {
        question: "Theo truyền thuyết, ai là cha mẹ sinh ra bọc trăm trứng?",
        questionEn: "Per legend, who bore the sack of 100 eggs?",
        options: ["Sơn Tinh – Thuỷ Tinh", "Lạc Long Quân – Âu Cơ", "Hùng Vương – Mỵ Nương", "An Dương Vương – Mỵ Châu"],
        optionsEn: ["Sơn Tinh – Thuỷ Tinh", "Lạc Long Quân – Âu Cơ", "Hùng Vương – Mỵ Nương", "An Dương Vương – Mỵ Châu"],
        answer: 1,
        explanation: "Lạc Long Quân (Rồng) và Âu Cơ (Tiên) là tổ tiên của người Việt.",
        explanationEn: "Dragon Lạc Long Quân and Fairy Âu Cơ are the ancestors of the Vietnamese.",
      },
    ],
    funFact: "Đền Hùng nằm trên núi Nghĩa Lĩnh cao 175m, có 4 đền chính: Đền Hạ, Đền Trung, Đền Thượng và Đền Giếng.",
    funFactEn: "The Hùng Temples sit on Nghĩa Lĩnh Mountain (175m) with 4 main temples: Lower, Middle, Upper, and Well Temples.",
  },

  // ===== 4. NGÀY GIẢI PHÓNG MIỀN NAM 30/4 =====
  {
    id: "giai-phong-mien-nam",
    name: "Ngày Giải phóng Miền Nam",
    nameEn: "Reunification Day (Liberation of the South)",
    date: "30 tháng 4 Dương lịch",
    dateEn: "April 30 (solar)",
    type: "national",
    category: "spring",
    icon: "🇻🇳",
    color: "from-red-600 to-yellow-500",
    image: imgGiaiPhong,
    shortDesc: "Kỷ niệm ngày đất nước hoàn toàn thống nhất sau Chiến dịch Hồ Chí Minh lịch sử năm 1975.",
    shortDescEn: "Commemorates the day Vietnam was fully reunified after the historic Hồ Chí Minh Campaign in 1975.",
    story: `Vào lúc 11h30 ngày 30/4/1975, xe tăng 390 của Quân Giải phóng húc đổ cổng Dinh Độc Lập tại Sài Gòn, đánh dấu sự kết thúc của Chiến dịch Hồ Chí Minh và Chiến tranh Việt Nam. Tổng thống Dương Văn Minh tuyên bố đầu hàng vô điều kiện.\n\nĐây là sự kiện chấm dứt 21 năm chia cắt hai miền (1954–1975), thống nhất đất nước về một mối. Năm 1976, Quốc hội thống nhất chính thức đặt tên 'Cộng hoà Xã hội Chủ nghĩa Việt Nam' và chọn TP.HCM là tên gọi mới của Sài Gòn.\n\nNgày 30/4 cùng với 1/5 (Quốc tế Lao động) tạo thành kỳ nghỉ lễ quan trọng. Trên cả nước, đặc biệt tại TP.HCM, có các lễ diễu binh, bắn pháo hoa và các hoạt động văn hoá kỷ niệm.`,
    storyEn: `At 11:30 AM on April 30, 1975, Tank 390 of the Liberation Army crashed through the gate of the Independence Palace in Saigon, marking the end of the Hồ Chí Minh Campaign and the Vietnam War. President Dương Văn Minh announced unconditional surrender.\n\nThe event ended 21 years of division between North and South (1954–1975), reunifying the country. In 1976, the unified National Assembly officially named the country 'Socialist Republic of Vietnam' and renamed Saigon as Hồ Chí Minh City.\n\nApril 30, combined with May 1 (International Workers' Day), forms a major holiday. Across the country, especially in HCMC, parades, fireworks, and commemorative cultural events are held.`,
    customs: [
      "Treo cờ Tổ quốc tại nhà và cơ quan",
      "Bắn pháo hoa tại các thành phố lớn",
      "Diễu binh, diễu hành kỷ niệm",
      "Đi du lịch, nghỉ dưỡng (kỳ nghỉ lễ 30/4 – 1/5)",
    ],
    customsEn: [
      "Flying the national flag at homes and offices",
      "Fireworks in major cities",
      "Military parades and processions",
      "Travel and vacation (April 30 – May 1 holiday)",
    ],
    foods: ["Phở", "Bún bò Huế", "Cơm tấm", "Bánh mì"],
    foodsEn: ["Phở", "Bún bò Huế", "Broken rice", "Bánh mì"],
    vocabulary: [
      { word: "giải phóng", meaning: "đem lại tự do", meaningEn: "to liberate", example: "Ngày giải phóng miền Nam là 30/4/1975.", exampleEn: "The South was liberated on April 30, 1975." },
      { word: "thống nhất", meaning: "hợp nhất, gộp lại làm một", meaningEn: "to unify", example: "Đất nước thống nhất từ năm 1975.", exampleEn: "The country has been unified since 1975." },
      { word: "Dinh Độc Lập", meaning: "Phủ Tổng thống VNCH (TP.HCM)", meaningEn: "Independence Palace in HCMC", example: "Du khách thường tham quan Dinh Độc Lập.", exampleEn: "Tourists often visit the Independence Palace." },
      { word: "diễu binh", meaning: "duyệt binh trang trọng", meaningEn: "military parade", example: "Lễ diễu binh diễn ra hoành tráng.", exampleEn: "The parade was magnificent." },
    ],
    quiz: [
      {
        question: "Sự kiện 30/4/1975 đánh dấu điều gì?",
        questionEn: "What does April 30, 1975 mark?",
        options: ["Bắt đầu Chiến tranh VN", "Thống nhất đất nước", "Ngày Quốc khánh", "Giành lại Hà Nội"],
        optionsEn: ["Start of the war", "National reunification", "National Day", "Recapture of Hanoi"],
        answer: 1,
        explanation: "30/4/1975 chấm dứt chiến tranh và thống nhất hai miền Nam – Bắc.",
        explanationEn: "April 30, 1975 ended the war and reunified North and South.",
      },
      {
        question: "Sài Gòn được đổi tên thành gì sau 1976?",
        questionEn: "What was Saigon renamed after 1976?",
        options: ["Đà Nẵng", "TP. Hồ Chí Minh", "Cần Thơ", "Vũng Tàu"],
        optionsEn: ["Đà Nẵng", "Hồ Chí Minh City", "Cần Thơ", "Vũng Tàu"],
        answer: 1,
        explanation: "Năm 1976, Sài Gòn chính thức đổi tên thành Thành phố Hồ Chí Minh.",
        explanationEn: "In 1976, Saigon was officially renamed Hồ Chí Minh City.",
      },
    ],
  },

  // ===== 5. QUỐC TẾ LAO ĐỘNG 1/5 =====
  {
    id: "quoc-te-lao-dong",
    name: "Quốc tế Lao động",
    nameEn: "International Workers' Day",
    date: "1 tháng 5 Dương lịch",
    dateEn: "May 1 (solar)",
    type: "international",
    category: "spring",
    icon: "🛠️",
    color: "from-red-500 to-rose-600",
    image: imgLaoDong,
    shortDesc: "Ngày tôn vinh người lao động trên toàn thế giới – tại Việt Nam là ngày nghỉ chính thức tiếp nối 30/4.",
    shortDescEn: "A worldwide day honoring workers — in Vietnam, an official holiday following April 30.",
    story: `Quốc tế Lao động (May Day) ra đời từ phong trào đấu tranh đòi giảm giờ làm việc xuống còn 8 tiếng/ngày của công nhân Mỹ năm 1886. Sau cuộc biểu tình lớn ở Chicago, Quốc tế Cộng sản chọn ngày 1/5 hàng năm làm ngày đoàn kết của công nhân toàn thế giới.\n\nTại Việt Nam, ngày 1/5 được công nhận là ngày lễ chính thức từ năm 1946. Cùng với ngày 30/4, đây là kỳ nghỉ lễ dài thứ hai trong năm sau Tết, người dân thường tận dụng để đi du lịch trong nước.\n\nNgày này còn là dịp các tổ chức công đoàn vinh danh người lao động xuất sắc, tổ chức các hoạt động chăm lo đời sống công nhân.`,
    storyEn: `International Workers' Day (May Day) emerged from American workers' struggle for an 8-hour workday in 1886. After the large Chicago protests, the Communist International chose May 1 as the day of solidarity for workers worldwide.\n\nIn Vietnam, May 1 has been an official holiday since 1946. Together with April 30, it forms the second-longest holiday of the year after Tết, often used for domestic travel.\n\nIt is also when trade unions honor outstanding workers and organize activities supporting workers' welfare.`,
    customs: [
      "Nghỉ lễ 30/4 – 1/5 (thường được nối thành 4–5 ngày)",
      "Đi du lịch trong và ngoài nước",
      "Công đoàn tổ chức tôn vinh người lao động",
      "Treo cờ và áp phích tuyên truyền",
    ],
    customsEn: [
      "April 30 – May 1 holiday (often extended to 4–5 days)",
      "Domestic and international travel",
      "Trade unions honor outstanding workers",
      "Flag-raising and propaganda posters",
    ],
    foods: ["Đồ ăn du lịch", "Hải sản biển", "BBQ ngoài trời"],
    foodsEn: ["Travel snacks", "Seafood", "Outdoor BBQ"],
    vocabulary: [
      { word: "lao động", meaning: "công việc, làm việc", meaningEn: "labor, work", example: "Người lao động đáng được tôn vinh.", exampleEn: "Workers deserve to be honored." },
      { word: "công đoàn", meaning: "tổ chức bảo vệ quyền lợi người lao động", meaningEn: "trade union", example: "Công đoàn giúp công nhân giải quyết khó khăn.", exampleEn: "Unions help workers solve difficulties." },
      { word: "kỳ nghỉ", meaning: "khoảng thời gian được nghỉ", meaningEn: "vacation, holiday period", example: "Kỳ nghỉ 30/4 năm nay kéo dài 5 ngày.", exampleEn: "This year's April 30 holiday lasts 5 days." },
    ],
    quiz: [
      {
        question: "Quốc tế Lao động bắt nguồn từ phong trào ở đâu?",
        questionEn: "Where did International Workers' Day originate?",
        options: ["Anh – London", "Mỹ – Chicago", "Pháp – Paris", "Nga – Moscow"],
        optionsEn: ["UK – London", "USA – Chicago", "France – Paris", "Russia – Moscow"],
        answer: 1,
        explanation: "Phong trào đòi 8 giờ làm việc/ngày của công nhân Chicago năm 1886.",
        explanationEn: "The Chicago workers' 8-hour-day movement of 1886.",
      },
    ],
  },

  // ===== 6. TẾT ĐOAN NGỌ 5/5 ÂL =====
  {
    id: "tet-doan-ngo",
    name: "Tết Đoan Ngọ (Diệt Sâu Bọ)",
    nameEn: "Mid-year Festival (Killing Insects Day)",
    date: "Mùng 5 tháng 5 Âm lịch",
    dateEn: "5th day of the 5th lunar month",
    type: "traditional",
    category: "summer",
    icon: "🍑",
    color: "from-lime-500 to-green-600",
    image: imgDoanNgo,
    shortDesc: "Lễ giữa năm – ăn rượu nếp, hoa quả chua diệt sâu bọ trong người, cầu sức khoẻ mùa hè.",
    shortDescEn: "Mid-year festival — eat sticky rice wine and sour fruits to 'kill insects' in the body and ensure summer health.",
    story: `Tết Đoan Ngọ (mùng 5/5 Âm lịch) còn gọi là Tết Diệt Sâu Bọ vì người xưa tin rằng giữa mùa hè, sâu bọ trong người sinh sôi, gây bệnh. Vào sáng sớm ngày này, cả nhà ăn rượu nếp cẩm, mận, vải, xoài… để 'giết sâu bọ' khi bụng còn đói.\n\nGiờ Đoan Ngọ là giữa trưa (chính ngọ) – thời điểm dương khí mạnh nhất. Người ta hái lá mùng 5 (lá tía tô, ngải cứu, mơ) để làm thuốc, vì tin rằng lá hái giờ này có dược tính cao nhất.\n\nỞ một số vùng, trẻ em được nhuộm móng tay màu đỏ bằng lá móng để xua đuổi tà ma. Đoan Ngọ cũng là dịp gia đình sum họp, chuẩn bị mâm cúng tổ tiên với hoa quả, bánh tro, thịt vịt.`,
    storyEn: `Tết Đoan Ngọ (5th day of 5th lunar month) is also called 'Killing Insects Day'. Ancients believed that mid-summer, insects multiply in the body, causing illness. On this morning, families eat sticky rice wine, plums, lychee, and mango on an empty stomach to 'kill the insects'.\n\nĐoan Ngọ hour is noon (chính ngọ) — when yang energy peaks. People pick herbs like perilla, mugwort, and ngải cứu on this day, believing they have the strongest medicinal properties.\n\nIn some regions, children's nails are dyed red with henna leaves to ward off evil. Đoan Ngọ is also a family reunion with offerings of fruits, bánh tro, and duck meat to ancestors.`,
    customs: [
      "Ăn rượu nếp, mận, vải sáng sớm khi bụng đói",
      "Hái lá thuốc (ngải cứu, tía tô) vào giờ ngọ",
      "Cúng tổ tiên mâm hoa quả + thịt vịt",
      "Một số vùng: nhuộm móng tay đỏ cho trẻ em",
    ],
    customsEn: [
      "Eating sticky rice wine, plums, lychee on an empty stomach",
      "Picking medicinal herbs at noon",
      "Ancestor altar with fruits and duck",
      "Some regions: dyeing children's nails red",
    ],
    foods: ["Rượu nếp cẩm", "Mận, vải, xoài", "Bánh tro (bánh ú)", "Thịt vịt"],
    foodsEn: ["Black sticky rice wine", "Plums, lychee, mango", "Bánh tro (alkaline rice cake)", "Duck meat"],
    vocabulary: [
      { word: "sâu bọ", meaning: "côn trùng có hại", meaningEn: "insects, pests", example: "Sáng mùng 5 ăn rượu nếp diệt sâu bọ.", exampleEn: "On the 5th morning, eat sticky rice wine to kill insects." },
      { word: "rượu nếp", meaning: "cơm nếp lên men nhẹ", meaningEn: "fermented sticky rice (mild alcohol)", example: "Rượu nếp cẩm có vị ngọt thơm.", exampleEn: "Black sticky rice wine is sweet and fragrant." },
      { word: "đoan ngọ", meaning: "giờ chính ngọ giữa trưa", meaningEn: "exact noon hour", example: "Lá thuốc hái giờ Đoan Ngọ tốt nhất.", exampleEn: "Herbs picked at noon are best." },
    ],
    quiz: [
      {
        question: "Tết Đoan Ngọ vào ngày nào?",
        questionEn: "When is Tết Đoan Ngọ?",
        options: ["Mùng 3/3 ÂL", "Mùng 5/5 ÂL", "Mùng 7/7 ÂL", "15/8 ÂL"],
        optionsEn: ["3/3 lunar", "5/5 lunar", "7/7 lunar", "15/8 lunar"],
        answer: 1,
        explanation: "Tết Đoan Ngọ – mùng 5 tháng 5 Âm lịch, cũng gọi là Tết Diệt Sâu Bọ.",
        explanationEn: "Đoan Ngọ — 5th of 5th lunar month, also Killing Insects Day.",
      },
      {
        question: "Món ăn chính của Tết Đoan Ngọ là gì?",
        questionEn: "What is the main food of Đoan Ngọ?",
        options: ["Bánh chưng", "Rượu nếp + hoa quả chua", "Bánh trung thu", "Phở bò"],
        optionsEn: ["Bánh chưng", "Sticky rice wine + sour fruits", "Mooncake", "Beef phở"],
        answer: 1,
        explanation: "Người Việt ăn rượu nếp và hoa quả chua sáng sớm để 'diệt sâu bọ'.",
        explanationEn: "Vietnamese eat sticky rice wine and sour fruits in the morning to 'kill insects'.",
      },
    ],
  },

  // ===== 7. LỄ VU LAN (RẰM THÁNG 7) =====
  {
    id: "le-vu-lan",
    name: "Lễ Vu Lan Báo Hiếu",
    nameEn: "Vu Lan Festival (Filial Piety Day)",
    date: "Rằm tháng 7 Âm lịch",
    dateEn: "15th day of the 7th lunar month",
    type: "traditional",
    category: "summer",
    icon: "🌸",
    color: "from-pink-500 to-rose-600",
    image: imgVuLan,
    shortDesc: "Mùa báo hiếu cha mẹ – cài hoa hồng đỏ nếu mẹ còn, hoa trắng nếu mẹ đã khuất.",
    shortDescEn: "The season of filial piety — wear a red rose if your mother is alive, a white rose if she has passed.",
    story: `Lễ Vu Lan bắt nguồn từ tích Phật Mục Kiền Liên cứu mẹ ra khỏi địa ngục bằng lòng hiếu thảo và sự giúp đỡ của chư Tăng. Ngày Rằm tháng 7 trở thành ngày con cháu báo hiếu cha mẹ và cầu siêu cho ông bà tổ tiên.\n\nTại Việt Nam, vào ngày Vu Lan, các chùa tổ chức nghi lễ 'Bông hồng cài áo': ai còn mẹ cài hoa hồng đỏ, ai mất mẹ cài hoa hồng trắng – một nghi thức xúc động khiến nhiều người rơi nước mắt.\n\nĐây cũng là 'Tháng cô hồn' – nhiều gia đình cúng cô hồn, bố thí thức ăn cho những vong linh không nơi nương tựa. Một số người kiêng cưới hỏi, mua nhà, khởi sự lớn trong tháng này.`,
    storyEn: `Vu Lan originates from the Buddhist tale of Mục Kiền Liên saving his mother from hell through filial piety and the help of monks. The 15th of the 7th lunar month became a day for children to honor parents and pray for ancestors.\n\nIn Vietnam, pagodas hold the 'Rose Pinning' ritual: those whose mothers are alive wear a red rose; those whose mothers have passed wear a white rose — a touching ceremony that often brings tears.\n\nIt is also 'Ghost Month' — many families offer food to wandering spirits. Some avoid weddings, buying houses, or starting big ventures during this month.`,
    customs: [
      "Đi chùa nghe pháp, cài hoa hồng đỏ/trắng",
      "Cúng cô hồn ngoài sân (cháo trắng, gạo, muối, bánh kẹo)",
      "Phóng sinh chim, cá",
      "Thăm cha mẹ, biếu quà báo hiếu",
    ],
    customsEn: [
      "Visiting pagodas, wearing red/white roses",
      "Offering to wandering souls outdoors (rice porridge, salt, candy)",
      "Releasing birds and fish",
      "Visiting parents and giving gifts",
    ],
    foods: ["Mâm cỗ chay", "Cháo loãng cúng cô hồn", "Bánh kẹo, hoa quả"],
    foodsEn: ["Vegetarian feast", "Thin rice porridge for spirits", "Candy and fruits"],
    vocabulary: [
      { word: "báo hiếu", meaning: "đền đáp công ơn cha mẹ", meaningEn: "to repay parents' gratitude", example: "Vu Lan là dịp báo hiếu cha mẹ.", exampleEn: "Vu Lan is the occasion to repay parents." },
      { word: "cô hồn", meaning: "vong linh không nơi nương tựa", meaningEn: "wandering ghosts", example: "Tháng 7 là tháng cô hồn.", exampleEn: "The 7th month is Ghost Month." },
      { word: "phóng sinh", meaning: "thả chim cá để tích đức", meaningEn: "to release animals for merit", example: "Nhiều người phóng sinh vào ngày Vu Lan.", exampleEn: "Many release animals on Vu Lan." },
      { word: "bông hồng cài áo", meaning: "nghi thức gắn hoa hồng lên ngực", meaningEn: "ritual of pinning a rose on chest", example: "Tôi xúc động khi được cài bông hồng đỏ.", exampleEn: "I was moved to wear a red rose." },
    ],
    quiz: [
      {
        question: "Trong nghi thức Bông hồng cài áo, hoa màu trắng nghĩa là gì?",
        questionEn: "In the rose-pinning ritual, what does a white rose mean?",
        options: ["Mẹ còn sống", "Mẹ đã khuất", "Đã có gia đình", "Còn độc thân"],
        optionsEn: ["Mother is alive", "Mother has passed", "Married", "Single"],
        answer: 1,
        explanation: "Hoa trắng – tưởng nhớ mẹ đã khuất; hoa đỏ – mẹ còn sống.",
        explanationEn: "White rose — in memory of a deceased mother; red — mother alive.",
      },
      {
        question: "Lễ Vu Lan bắt nguồn từ tích Phật nào?",
        questionEn: "Vu Lan originates from which Buddhist story?",
        options: ["Phật Thích Ca", "Mục Kiền Liên cứu mẹ", "Quan Âm cứu nạn", "A Di Đà tiếp dẫn"],
        optionsEn: ["Shakyamuni", "Mục Kiền Liên saving his mother", "Quan Âm rescue", "Amitabha welcoming"],
        answer: 1,
        explanation: "Mục Kiền Liên dùng lòng hiếu thảo cứu mẹ ra khỏi địa ngục.",
        explanationEn: "Mục Kiền Liên used filial piety to save his mother from hell.",
      },
    ],
  },

  // ===== 8. QUỐC KHÁNH 2/9 =====
  {
    id: "quoc-khanh",
    name: "Quốc khánh",
    nameEn: "National Day",
    date: "2 tháng 9 Dương lịch",
    dateEn: "September 2 (solar)",
    type: "national",
    category: "autumn",
    icon: "⭐",
    color: "from-red-600 to-yellow-500",
    image: imgQuocKhanh,
    shortDesc: "Ngày Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình năm 1945.",
    shortDescEn: "The day President Hồ Chí Minh read the Declaration of Independence at Ba Đình Square in 1945.",
    story: `Sáng 2/9/1945, tại Quảng trường Ba Đình – Hà Nội, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh ra nước Việt Nam Dân chủ Cộng hoà – nhà nước công nông đầu tiên ở Đông Nam Á.\n\nMở đầu bản tuyên ngôn, Bác trích Tuyên ngôn Độc lập của Mỹ (1776) và Tuyên ngôn Nhân quyền và Dân quyền của Pháp (1791): 'Tất cả mọi người sinh ra đều có quyền bình đẳng…' – một thông điệp ngoại giao thông minh và sâu sắc.\n\nNgày 2/9 trở thành Quốc khánh chính thức của Việt Nam. Hằng năm, cả nước treo cờ, các cơ quan tổ chức lễ kỷ niệm, Hà Nội bắn pháo hoa tại nhiều điểm. Quảng trường Ba Đình – nơi đặt Lăng Bác – là điểm hành hương trang nghiêm.`,
    storyEn: `On the morning of September 2, 1945, at Ba Đình Square in Hanoi, President Hồ Chí Minh read the Declaration of Independence, founding the Democratic Republic of Vietnam — Southeast Asia's first worker-peasant state.\n\nThe declaration began by quoting the U.S. Declaration of Independence (1776) and France's Declaration of Rights of Man (1791): "All men are created equal…" — a brilliant diplomatic message.\n\nSeptember 2 became Vietnam's official National Day. Each year, the country flies flags, agencies hold ceremonies, and Hanoi launches fireworks at many sites. Ba Đình Square — where Hồ Chí Minh's Mausoleum stands — is a solemn pilgrimage site.`,
    customs: [
      "Treo cờ Tổ quốc tại nhà và cơ quan",
      "Bắn pháo hoa tại Hà Nội, TP.HCM và nhiều tỉnh",
      "Diễu binh, diễu hành (vào năm tròn kỷ niệm)",
      "Thăm Lăng Bác, Quảng trường Ba Đình",
      "Kỳ nghỉ lễ thường được kéo dài 3–4 ngày",
    ],
    customsEn: [
      "Flying the national flag at homes and offices",
      "Fireworks in Hanoi, HCMC and many provinces",
      "Military parade (anniversary years)",
      "Visiting Hồ Chí Minh Mausoleum, Ba Đình Square",
      "Holiday usually extended to 3–4 days",
    ],
    foods: ["Phở Hà Nội", "Bún chả", "Chả cá Lã Vọng"],
    foodsEn: ["Hanoi phở", "Bún chả", "Chả cá Lã Vọng"],
    vocabulary: [
      { word: "Quốc khánh", meaning: "ngày kỷ niệm thành lập đất nước", meaningEn: "National Day", example: "Quốc khánh Việt Nam là 2/9.", exampleEn: "Vietnam's National Day is September 2." },
      { word: "Tuyên ngôn Độc lập", meaning: "văn bản tuyên bố quốc gia độc lập", meaningEn: "Declaration of Independence", example: "Bác Hồ đọc Tuyên ngôn Độc lập năm 1945.", exampleEn: "Uncle Hồ read the Declaration of Independence in 1945." },
      { word: "Quảng trường Ba Đình", meaning: "quảng trường lịch sử ở Hà Nội", meaningEn: "Ba Đình Square in Hanoi", example: "Quảng trường Ba Đình rộng và uy nghi.", exampleEn: "Ba Đình Square is vast and majestic." },
      { word: "Lăng Bác", meaning: "Lăng Chủ tịch Hồ Chí Minh", meaningEn: "Hồ Chí Minh Mausoleum", example: "Tôi từng viếng Lăng Bác.", exampleEn: "I once visited Uncle Hồ's mausoleum." },
    ],
    quiz: [
      {
        question: "Bác Hồ đọc Tuyên ngôn Độc lập tại đâu?",
        questionEn: "Where did Uncle Hồ read the Declaration of Independence?",
        options: ["Bến Nhà Rồng", "Quảng trường Ba Đình", "Dinh Độc Lập", "Đền Hùng"],
        optionsEn: ["Nhà Rồng Wharf", "Ba Đình Square", "Independence Palace", "Hùng Temples"],
        answer: 1,
        explanation: "Quảng trường Ba Đình – Hà Nội là nơi diễn ra sự kiện lịch sử ngày 2/9/1945.",
        explanationEn: "Ba Đình Square in Hanoi is where the historic event took place on Sept 2, 1945.",
      },
      {
        question: "Quốc khánh Việt Nam là ngày nào?",
        questionEn: "When is Vietnam's National Day?",
        options: ["30/4", "1/5", "2/9", "20/11"],
        optionsEn: ["April 30", "May 1", "September 2", "November 20"],
        answer: 2,
        explanation: "Ngày 2/9/1945 – ngày khai sinh nước Việt Nam Dân chủ Cộng hoà.",
        explanationEn: "September 2, 1945 — the founding of the Democratic Republic of Vietnam.",
      },
    ],
  },

  // ===== 9. TẾT TRUNG THU =====
  {
    id: "tet-trung-thu",
    name: "Tết Trung Thu",
    nameEn: "Mid-Autumn Festival (Children's Festival)",
    date: "Rằm tháng 8 Âm lịch",
    dateEn: "15th day of the 8th lunar month",
    type: "traditional",
    category: "autumn",
    icon: "🥮",
    color: "from-orange-500 to-amber-500",
    image: imgTrungThu,
    shortDesc: "Tết của trẻ em – rước đèn ông sao, phá cỗ, ngắm trăng và thưởng thức bánh trung thu.",
    shortDescEn: "Children's festival — star-lantern parades, feast-breaking, moon-gazing, and mooncakes.",
    story: `Tết Trung Thu rơi vào đêm trăng tròn nhất năm – Rằm tháng 8 Âm lịch. Ở Việt Nam, đây trước tiên là 'Tết của trẻ em', khi cha mẹ tặng đèn lồng, bánh trung thu và tổ chức rước đèn quanh xóm.\n\nTruyền thuyết kể về chú Cuội ngồi gốc cây đa trên cung trăng vì vô tình kéo cây bay lên trời. Ngày nay, hình ảnh chú Cuội, chị Hằng, con thỏ ngọc xuất hiện khắp nơi vào dịp này.\n\nMâm cỗ Trung Thu gồm bánh nướng, bánh dẻo, bưởi, na, hồng. Trẻ em mặc đẹp, cầm đèn ông sao, đèn cá chép, đèn kéo quân đi rước trong tiếng trống lân rộn rã. Múa lân – sư – rồng là tiết mục không thể thiếu.`,
    storyEn: `Tết Trung Thu falls on the year's brightest full moon — the 15th of the 8th lunar month. In Vietnam, it is primarily 'Children's Festival', when parents give lanterns and mooncakes and organize neighborhood parades.\n\nLegend tells of Uncle Cuội sitting under a banyan tree on the moon after accidentally pulling the tree skyward. Today, images of Uncle Cuội, Lady Hằng, and the jade rabbit appear everywhere.\n\nThe Trung Thu altar features baked and sticky mooncakes, pomelo, custard apple, and persimmon. Children dress up, carry star, carp, or rotating-army lanterns through the streets to drum beats. Lion-unicorn-dragon dances are a must.`,
    customs: [
      "Rước đèn ông sao, đèn lồng quanh phố",
      "Múa lân, múa sư, múa rồng",
      "Phá cỗ trông trăng tại nhà / trường học",
      "Tặng bánh trung thu cho người thân, đối tác",
      "Kể chuyện chú Cuội, chị Hằng cho trẻ em",
    ],
    customsEn: [
      "Lantern parades through the streets",
      "Lion, unicorn, dragon dances",
      "Moon-gazing feast at home/schools",
      "Gifting mooncakes to family and partners",
      "Telling stories of Cuội and Hằng to children",
    ],
    foods: ["Bánh nướng", "Bánh dẻo", "Bưởi, na, hồng", "Trà sen"],
    foodsEn: ["Baked mooncake", "Sticky mooncake", "Pomelo, custard apple, persimmon", "Lotus tea"],
    vocabulary: [
      { word: "Trung Thu", meaning: "giữa mùa thu (rằm tháng 8)", meaningEn: "Mid-Autumn (full moon of 8th month)", example: "Trung Thu năm nay rơi vào tháng 9.", exampleEn: "This year's Trung Thu falls in September." },
      { word: "đèn ông sao", meaning: "đèn lồng hình ngôi sao 5 cánh", meaningEn: "5-pointed star lantern", example: "Bé thích đèn ông sao đỏ.", exampleEn: "The kid loves the red star lantern." },
      { word: "bánh trung thu", meaning: "bánh truyền thống dịp Trung Thu", meaningEn: "mooncake", example: "Bánh trung thu thập cẩm rất ngọt.", exampleEn: "Mixed-nut mooncakes are very sweet." },
      { word: "phá cỗ", meaning: "cùng ăn mâm cỗ", meaningEn: "feast-breaking", example: "Cả lớp phá cỗ rất vui.", exampleEn: "The whole class had a joyful feast." },
      { word: "múa lân", meaning: "điệu múa con lân truyền thống", meaningEn: "lion dance", example: "Múa lân rộn ràng cả khu phố.", exampleEn: "The lion dance livens up the whole street." },
    ],
    quiz: [
      {
        question: "Trung Thu là Tết của đối tượng nào?",
        questionEn: "Trung Thu is primarily a festival for whom?",
        options: ["Người cao tuổi", "Trẻ em", "Người lao động", "Sinh viên"],
        optionsEn: ["Elderly", "Children", "Workers", "Students"],
        answer: 1,
        explanation: "Tết Trung Thu được gọi là 'Tết của trẻ em' tại Việt Nam.",
        explanationEn: "Trung Thu is known as 'Children's Festival' in Vietnam.",
      },
      {
        question: "Loại bánh đặc trưng của Trung Thu là?",
        questionEn: "Which cake is iconic to Trung Thu?",
        options: ["Bánh chưng", "Bánh trung thu", "Bánh tro", "Bánh dày"],
        optionsEn: ["Bánh chưng", "Mooncake", "Bánh tro", "Bánh dày"],
        answer: 1,
        explanation: "Bánh trung thu (nướng và dẻo) là biểu tượng của lễ này.",
        explanationEn: "Baked and sticky mooncakes are the festival's symbol.",
      },
      {
        question: "Theo truyền thuyết, ai sống trên cung trăng cùng cây đa?",
        questionEn: "Per legend, who lives on the moon with the banyan tree?",
        options: ["Chị Hằng", "Chú Cuội", "Thỏ ngọc", "Ông Tơ"],
        optionsEn: ["Lady Hằng", "Uncle Cuội", "Jade rabbit", "Old Matchmaker"],
        answer: 1,
        explanation: "Chú Cuội bị kéo lên trời cùng cây đa thần.",
        explanationEn: "Uncle Cuội was pulled to the sky along with the magical banyan tree.",
      },
    ],
    funFact: "Bánh trung thu hiện đại có rất nhiều vị: thập cẩm truyền thống, trà xanh, sầu riêng, lava trứng muối, kem lạnh!",
    funFactEn: "Modern mooncakes come in many flavors: traditional mixed-nut, green tea, durian, salted-egg lava, and ice-cream!",
  },

  // ===== 10. NGÀY NHÀ GIÁO 20/11 =====
  {
    id: "ngay-nha-giao",
    name: "Ngày Nhà giáo Việt Nam",
    nameEn: "Vietnamese Teachers' Day",
    date: "20 tháng 11 Dương lịch",
    dateEn: "November 20 (solar)",
    type: "cultural",
    category: "autumn",
    icon: "🎓",
    color: "from-blue-500 to-indigo-600",
    image: imgNhaGiao,
    shortDesc: "Ngày tri ân thầy cô – truyền thống 'Tôn sư trọng đạo' đẹp đẽ của người Việt.",
    shortDescEn: "Teachers' Day — the beautiful Vietnamese tradition of honoring teachers.",
    story: `Ngày 20/11 được Hội đồng Bộ trưởng nước Việt Nam DCCH chọn làm Ngày Nhà giáo Việt Nam vào năm 1982, lấy cảm hứng từ Ngày Quốc tế Hiến chương các Nhà giáo (20/11/1958).\n\nTừ tháng 10, các trường học khắp cả nước rộn ràng chuẩn bị: học sinh tập văn nghệ, làm báo tường, viết thiệp tặng thầy cô. Ngày 20/11, học sinh đến trường thăm thầy cô cũ, mang hoa, quà nhỏ và những lời chúc chân thành.\n\nTriết lý 'Tôn sư trọng đạo' (kính trọng thầy, coi trọng đạo lý) là giá trị văn hoá lâu đời. Câu 'Mùng 1 Tết cha, mùng 2 Tết mẹ, mùng 3 Tết thầy' cho thấy người thầy được đặt ngang hàng với cha mẹ trong xã hội Việt.`,
    storyEn: `November 20 was chosen as Vietnamese Teachers' Day in 1982 by the Council of Ministers, inspired by the International Charter of Teachers' Day (Nov 20, 1958).\n\nFrom October, schools nationwide bustle with preparations: students rehearse performances, make wall newspapers, and write cards. On Nov 20, students visit former teachers with flowers, small gifts, and sincere wishes.\n\nThe philosophy 'Tôn sư trọng đạo' (respect teachers, value the way) is a long-standing cultural value. The saying "1st day for father, 2nd for mother, 3rd for teacher" shows teachers are placed alongside parents in Vietnamese society.`,
    customs: [
      "Học sinh tặng hoa, thiệp, quà nhỏ cho thầy cô",
      "Văn nghệ chào mừng tại trường",
      "Học sinh cũ về thăm trường, gặp thầy cô",
      "Báo, mạng xã hội đăng bài tri ân giáo viên",
    ],
    customsEn: [
      "Students gift flowers, cards, small gifts to teachers",
      "School performance ceremonies",
      "Alumni visit their old schools and teachers",
      "Newspapers and social media post tributes",
    ],
    foods: ["Bánh kem", "Hoa quả", "Trà bánh"],
    foodsEn: ["Cake", "Fruits", "Tea & pastries"],
    vocabulary: [
      { word: "nhà giáo", meaning: "thầy cô giáo", meaningEn: "teachers", example: "Nhà giáo là nghề cao quý.", exampleEn: "Teaching is a noble profession." },
      { word: "tri ân", meaning: "biết ơn, tỏ lòng cảm ơn", meaningEn: "to express gratitude", example: "Học sinh tri ân thầy cô.", exampleEn: "Students express gratitude to teachers." },
      { word: "tôn sư trọng đạo", meaning: "kính thầy, trọng đạo lý", meaningEn: "respect teachers, value virtue", example: "Người Việt có truyền thống tôn sư trọng đạo.", exampleEn: "Vietnamese have the tradition of respecting teachers." },
    ],
    quiz: [
      {
        question: "Ngày Nhà giáo Việt Nam là ngày nào?",
        questionEn: "When is Vietnamese Teachers' Day?",
        options: ["20/10", "20/11", "8/3", "1/6"],
        optionsEn: ["Oct 20", "Nov 20", "Mar 8", "Jun 1"],
        answer: 1,
        explanation: "Ngày 20/11 hằng năm – truyền thống tri ân thầy cô.",
        explanationEn: "November 20 each year — tradition of honoring teachers.",
      },
    ],
    funFact: "Câu 'Một chữ cũng là thầy, nửa chữ cũng là thầy' nói lên sự tôn kính tuyệt đối với người dạy mình.",
    funFactEn: "The saying 'One word a teacher, half a word still a teacher' reflects deep respect for educators.",
  },

  // ===== 11. NGÀY PHỤ NỮ VN 20/10 + QUỐC TẾ PHỤ NỮ 8/3 =====
  {
    id: "ngay-phu-nu",
    name: "Ngày Phụ nữ Việt Nam (20/10) & Quốc tế Phụ nữ (8/3)",
    nameEn: "Vietnamese Women's Day (Oct 20) & International Women's Day (Mar 8)",
    date: "20/10 và 8/3 Dương lịch",
    dateEn: "October 20 & March 8 (solar)",
    type: "cultural",
    category: "anytime",
    icon: "🌹",
    color: "from-pink-500 to-fuchsia-600",
    image: imgPhuNu,
    shortDesc: "Hai ngày tôn vinh phụ nữ – các nam giới tặng hoa, quà, lời chúc cho mẹ, vợ, chị em, đồng nghiệp nữ.",
    shortDescEn: "Two days honoring women — men give flowers, gifts, and wishes to mothers, wives, sisters, and female colleagues.",
    story: `Việt Nam có tới hai ngày tôn vinh phụ nữ trong năm. Ngày 8/3 là Quốc tế Phụ nữ – kỷ niệm phong trào đấu tranh vì quyền bình đẳng và quyền lao động của phụ nữ thế giới (từ 1910). Ngày 20/10 là Ngày Phụ nữ Việt Nam, kỷ niệm thành lập Hội Phụ nữ Việt Nam (1930) – tổ chức bảo vệ quyền lợi phụ nữ trong nước.\n\nVào hai ngày này, nam giới Việt thường tặng hoa hồng, hoa cẩm chướng cho mẹ, vợ, người yêu, đồng nghiệp nữ. Cơ quan, công ty tổ chức tiệc nhỏ, văn nghệ, tặng quà.\n\nTrong gia đình, đàn ông, con trai có thể vào bếp nấu ăn, làm việc nhà 'thay ca' để tỏ lòng biết ơn người phụ nữ thân yêu.`,
    storyEn: `Vietnam has two days honoring women each year. March 8 is International Women's Day — commemorating the global movement for women's equality and labor rights (since 1910). October 20 is Vietnamese Women's Day, marking the founding of the Vietnam Women's Union (1930), which protects women's rights nationally.\n\nOn both days, Vietnamese men typically gift roses or carnations to mothers, wives, partners, and female colleagues. Companies organize small parties, performances, and gifts.\n\nAt home, men and sons may cook and do housework as a 'shift change' to express gratitude to the women they love.`,
    customs: [
      "Tặng hoa hồng (đỏ, hồng, vàng) cho phụ nữ",
      "Cơ quan tổ chức liên hoan, tặng quà",
      "Đàn ông vào bếp / làm việc nhà thay vợ",
      "Tin nhắn, thiệp chúc mừng qua mạng xã hội",
    ],
    customsEn: [
      "Giving roses (red, pink, yellow)",
      "Office gatherings and gifts",
      "Men cooking and doing housework",
      "Social media messages and cards",
    ],
    foods: ["Bánh kem", "Sô-cô-la", "Tiệc buffet"],
    foodsEn: ["Cakes", "Chocolate", "Buffet party"],
    vocabulary: [
      { word: "phụ nữ", meaning: "người nữ giới", meaningEn: "women", example: "Phụ nữ Việt giỏi việc nước, đảm việc nhà.", exampleEn: "Vietnamese women excel in society and at home." },
      { word: "tặng hoa", meaning: "biếu hoa làm quà", meaningEn: "to give flowers", example: "Anh ấy tặng hoa vợ ngày 8/3.", exampleEn: "He gave flowers to his wife on March 8." },
      { word: "Hội Phụ nữ", meaning: "tổ chức bảo vệ quyền lợi phụ nữ", meaningEn: "Women's Union", example: "Hội Phụ nữ thành lập năm 1930.", exampleEn: "The Women's Union was founded in 1930." },
    ],
    quiz: [
      {
        question: "Ngày Phụ nữ Việt Nam là ngày nào?",
        questionEn: "When is Vietnamese Women's Day?",
        options: ["8/3", "20/10", "20/11", "1/6"],
        optionsEn: ["Mar 8", "Oct 20", "Nov 20", "Jun 1"],
        answer: 1,
        explanation: "20/10 – kỷ niệm thành lập Hội Phụ nữ Việt Nam (1930).",
        explanationEn: "Oct 20 — anniversary of the Vietnam Women's Union (1930).",
      },
      {
        question: "Quốc tế Phụ nữ 8/3 bắt nguồn từ phong trào nào?",
        questionEn: "International Women's Day (March 8) stems from which movement?",
        options: ["Đòi quyền bầu cử và lao động", "Phản chiến", "Bảo vệ môi trường", "Giải phóng nô lệ"],
        optionsEn: ["Suffrage and labor rights", "Anti-war", "Environmental", "Anti-slavery"],
        answer: 0,
        explanation: "Phong trào đòi quyền bầu cử và quyền lao động cho phụ nữ đầu thế kỷ 20.",
        explanationEn: "Early 20th-century movement for suffrage and labor rights for women.",
      },
    ],
  },

  // ===== 12. NGÀY THIẾU NHI 1/6 + TẾT TRUNG THU NHI ĐỒNG =====
  {
    id: "ngay-thieu-nhi",
    name: "Ngày Quốc tế Thiếu nhi",
    nameEn: "International Children's Day",
    date: "1 tháng 6 Dương lịch",
    dateEn: "June 1 (solar)",
    type: "international",
    category: "summer",
    icon: "🎈",
    color: "from-cyan-400 to-sky-500",
    image: imgThieuNhi,
    shortDesc: "Ngày của trẻ em – các gia đình tặng quà, tổ chức tiệc và đưa các em đi chơi công viên, sở thú.",
    shortDescEn: "A day for children — families give gifts, host parties, and take kids to parks and zoos.",
    story: `Ngày 1/6 được Liên đoàn Phụ nữ Quốc tế Dân chủ chọn làm Ngày Quốc tế Thiếu nhi vào năm 1949 nhằm bảo vệ quyền trẻ em sau Chiến tranh Thế giới thứ Hai. Việt Nam chính thức kỷ niệm ngày này từ năm 1950.\n\nVào dịp này, cha mẹ thường tặng quà, tổ chức sinh nhật nhỏ, đưa con đi nhà sách, công viên, sở thú, khu vui chơi. Các trường mẫu giáo, tiểu học tổ chức biểu diễn văn nghệ, phát quà.\n\nỞ Việt Nam, trẻ em được coi là 'mầm non tương lai của đất nước'. Bác Hồ từng viết thư cho thiếu nhi nhân ngày 1/6 với lời căn dặn nổi tiếng: 'Trẻ em như búp trên cành / Biết ăn ngủ, biết học hành là ngoan'.`,
    storyEn: `June 1 was chosen as International Children's Day by the Women's International Democratic Federation in 1949 to protect children's rights after WWII. Vietnam has officially celebrated since 1950.\n\nOn this day, parents give gifts, host small birthday parties, and take children to bookstores, parks, zoos, and play areas. Kindergartens and primary schools hold performances and distribute gifts.\n\nIn Vietnam, children are seen as 'the future buds of the nation'. Uncle Hồ wrote letters to children on June 1 with the famous lines: "Children like buds on a branch / Eat, sleep, study — that's being good".`,
    customs: [
      "Tặng quà, đồ chơi, sách cho con",
      "Đưa con đi công viên, sở thú, khu vui chơi",
      "Trường học tổ chức văn nghệ, phát quà",
      "Đoàn TNCS Hồ Chí Minh, Đội TNTP tổ chức hoạt động",
    ],
    customsEn: [
      "Giving gifts, toys, books",
      "Taking kids to parks, zoos, play areas",
      "School performances and gift distribution",
      "Youth Union and Children's Pioneer activities",
    ],
    foods: ["Kem", "Bánh kem", "Sô-cô-la", "Đồ ăn nhanh"],
    foodsEn: ["Ice cream", "Cake", "Chocolate", "Fast food"],
    vocabulary: [
      { word: "thiếu nhi", meaning: "trẻ em", meaningEn: "children", example: "Thiếu nhi là tương lai của đất nước.", exampleEn: "Children are the future of the nation." },
      { word: "đồ chơi", meaning: "vật để chơi cho trẻ em", meaningEn: "toys", example: "Bé thích đồ chơi mới.", exampleEn: "The kid loves new toys." },
      { word: "công viên", meaning: "khu vực vui chơi công cộng", meaningEn: "park", example: "Cuối tuần cả nhà đi công viên.", exampleEn: "On weekends, the whole family goes to the park." },
    ],
    quiz: [
      {
        question: "Ngày Quốc tế Thiếu nhi là ngày nào?",
        questionEn: "When is International Children's Day?",
        options: ["1/5", "1/6", "1/9", "20/11"],
        optionsEn: ["May 1", "June 1", "Sep 1", "Nov 20"],
        answer: 1,
        explanation: "1/6 – ngày dành cho trẻ em trên toàn thế giới.",
        explanationEn: "June 1 — a day for children worldwide.",
      },
    ],
  },
];
