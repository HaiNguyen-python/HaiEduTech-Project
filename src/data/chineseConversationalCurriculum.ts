// Conversational Chinese curriculum data organized into 3 pillars
// Mirrors the English conversational curriculum structure adapted for Mandarin Chinese

export interface ChineseVocabEntry {
  hanzi: string;
  pinyin: string;
  meaning: string; // Vietnamese
  meaningEn: string;
  type: "phrase" | "idiom" | "slang" | "grammar" | "expression";
  example: string; // Chinese sentence
  examplePinyin: string;
  exampleVi: string;
}

export interface ChineseKeySituation {
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  culturalNote?: string;
  culturalNoteVi?: string;
  sampleDialogue: { speaker: string; line: string; pinyin: string; translationVi?: string }[];
}

export interface ChineseListeningChallenge {
  title: string;
  titleVi: string;
  transcript: string;
  transcriptPinyin: string;
  questions: { q: string; qVi: string; options: string[]; answer: number }[];
}

export interface ChineseConvLesson {
  id: string;
  title: string;
  titleVi: string;
  titleZh: string;
  icon: string;
  description: string;
  descriptionVi: string;
  hskLevel: 1 | 2 | 3 | 4;
  keySituations: ChineseKeySituation[];
  vocabulary: ChineseVocabEntry[];
  commonStructures: { pattern: string; patternPinyin: string; explanation: string; explanationVi: string; examples: { zh: string; pinyin: string; vi: string }[] }[];
  listeningChallenge: ChineseListeningChallenge;
  speakingTopics: string[];
  badge: string;
  badgeVi: string;
}

export interface ChineseConvPillar {
  id: string;
  title: string;
  titleVi: string;
  titleZh: string;
  icon: string;
  color: string;
  description: string;
  descriptionVi: string;
  lessons: ChineseConvLesson[];
}

export const chineseConversationalPillars: ChineseConvPillar[] = [
  // ═══════════════════════════════════════════
  // PILLAR 1: ESSENTIAL DAILY LIFE (生活常用)
  // ═══════════════════════════════════════════
  {
    id: "daily-life",
    title: "Essential Daily Life",
    titleVi: "Giao tiếp Đời sống",
    titleZh: "生活常用",
    icon: "Coffee",
    color: "from-red-500 to-orange-500",
    description: "Practical Chinese for everyday situations — greetings, food, shopping, transport, health",
    descriptionVi: "Tiếng Trung thực tế cho các tình huống hàng ngày — chào hỏi, ăn uống, mua sắm, di chuyển, sức khỏe",
    lessons: [
      // ──── Lesson 1: Greetings ────
      {
        id: "cn-dl-01-greetings",
        title: "Greetings & Self-Introduction",
        titleVi: "Chào hỏi & Giới thiệu bản thân",
        titleZh: "自我介绍",
        icon: "HandMetal",
        description: "Master essential greetings and introduce yourself naturally",
        descriptionVi: "Thành thạo chào hỏi cơ bản và giới thiệu bản thân tự nhiên",
        hskLevel: 1,
        badge: "社交新星",
        badgeVi: "Ngôi sao Giao tiếp",
        keySituations: [
          {
            title: "Meeting Someone New",
            titleVi: "Gặp gỡ người mới",
            description: "Introducing yourself at a social gathering",
            descriptionVi: "Giới thiệu bản thân tại buổi gặp mặt xã hội",
            culturalNote: "In Chinese culture, exchanging business cards (名片 míngpiàn) with both hands shows respect. Age and titles matter — address people as 先生 (xiānsheng) or 女士 (nǚshì).",
            culturalNoteVi: "Trong văn hóa Trung Quốc, trao đổi danh thiếp (名片) bằng hai tay thể hiện sự tôn trọng. Tuổi tác và danh xưng rất quan trọng.",
            sampleDialogue: [
              { speaker: "A", line: "你好！我叫王明。你叫什么名字？", pinyin: "Nǐ hǎo! Wǒ jiào Wáng Míng. Nǐ jiào shénme míngzi?", translationVi: "Xin chào! Tôi tên Vương Minh. Bạn tên gì?" },
              { speaker: "B", line: "你好！我叫李华。很高兴认识你！", pinyin: "Nǐ hǎo! Wǒ jiào Lǐ Huá. Hěn gāoxìng rènshi nǐ!", translationVi: "Xin chào! Tôi tên Lý Hoa. Rất vui được gặp bạn!" },
              { speaker: "A", line: "你是哪里人？", pinyin: "Nǐ shì nǎlǐ rén?", translationVi: "Bạn là người ở đâu?" },
              { speaker: "B", line: "我是越南人。我在这里工作。", pinyin: "Wǒ shì Yuènán rén. Wǒ zài zhèlǐ gōngzuò.", translationVi: "Tôi là người Việt Nam. Tôi làm việc ở đây." },
              { speaker: "A", line: "太好了！我们交换一下微信吧。", pinyin: "Tài hǎo le! Wǒmen jiāohuàn yíxià Wēixìn ba.", translationVi: "Tuyệt vời! Chúng ta trao đổi WeChat nhé." },
            ],
          },
          {
            title: "Greeting a Colleague",
            titleVi: "Chào đồng nghiệp",
            description: "Daily greetings at work or school",
            descriptionVi: "Chào hỏi hàng ngày tại công ty hoặc trường học",
            sampleDialogue: [
              { speaker: "A", line: "早上好！今天天气不错。", pinyin: "Zǎoshang hǎo! Jīntiān tiānqì búcuò.", translationVi: "Chào buổi sáng! Hôm nay thời tiết đẹp." },
              { speaker: "B", line: "是啊！你吃早饭了吗？", pinyin: "Shì a! Nǐ chī zǎofàn le ma?", translationVi: "Đúng vậy! Bạn ăn sáng chưa?" },
              { speaker: "A", line: "吃了。你呢？", pinyin: "Chī le. Nǐ ne?", translationVi: "Ăn rồi. Còn bạn?" },
              { speaker: "B", line: "我还没吃。一会儿去食堂吃。", pinyin: "Wǒ hái méi chī. Yīhuìr qù shítáng chī.", translationVi: "Tôi chưa ăn. Lát nữa đi nhà ăn." },
            ],
          },
          {
            title: "Formal Introduction at a Business Event",
            titleVi: "Giới thiệu trang trọng tại sự kiện",
            description: "Introduce yourself and your company formally",
            descriptionVi: "Giới thiệu bản thân và công ty một cách trang trọng",
            culturalNote: "At formal events, always state your company name before your personal name. Use 您 (nín) instead of 你 (nǐ) to show extra respect.",
            culturalNoteVi: "Tại các sự kiện trang trọng, luôn nêu tên công ty trước tên cá nhân. Dùng 您 thay vì 你 để thể hiện sự tôn trọng hơn.",
            sampleDialogue: [
              { speaker: "A", line: "您好！我是华为公司的张经理。", pinyin: "Nín hǎo! Wǒ shì Huáwéi gōngsī de Zhāng jīnglǐ.", translationVi: "Xin chào! Tôi là giám đốc Trương của công ty Huawei." },
              { speaker: "B", line: "您好，张经理！我是越南ABC公司的阿明。", pinyin: "Nín hǎo, Zhāng jīnglǐ! Wǒ shì Yuènán ABC gōngsī de Ā Míng.", translationVi: "Xin chào, giám đốc Trương! Tôi là Minh từ công ty ABC Việt Nam." },
              { speaker: "A", line: "很高兴认识您。这是我的名片。", pinyin: "Hěn gāoxìng rènshi nín. Zhè shì wǒ de míngpiàn.", translationVi: "Rất vui được gặp ngài. Đây là danh thiếp của tôi." },
              { speaker: "B", line: "谢谢！这是我的。希望以后多多合作。", pinyin: "Xièxie! Zhè shì wǒ de. Xīwàng yǐhòu duōduō hézuò.", translationVi: "Cảm ơn! Đây là của tôi. Hy vọng sau này hợp tác nhiều." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào", meaningEn: "Hello", type: "phrase", example: "你好，很高兴认识你！", examplePinyin: "Nǐ hǎo, hěn gāoxìng rènshi nǐ!", exampleVi: "Xin chào, rất vui được gặp bạn!" },
          { hanzi: "您好", pinyin: "nín hǎo", meaning: "Xin chào (trang trọng)", meaningEn: "Hello (formal)", type: "phrase", example: "您好，请问您贵姓？", examplePinyin: "Nín hǎo, qǐng wèn nín guì xìng?", exampleVi: "Xin chào, xin hỏi quý tính?" },
          { hanzi: "请问", pinyin: "qǐng wèn", meaning: "Xin hỏi", meaningEn: "Excuse me / May I ask", type: "expression", example: "请问，你叫什么名字？", examplePinyin: "Qǐng wèn, nǐ jiào shénme míngzi?", exampleVi: "Xin hỏi, bạn tên gì?" },
          { hanzi: "认识", pinyin: "rènshi", meaning: "Quen biết", meaningEn: "To know / meet", type: "phrase", example: "很高兴认识你。", examplePinyin: "Hěn gāoxìng rènshi nǐ.", exampleVi: "Rất vui được quen bạn." },
          { hanzi: "交换", pinyin: "jiāohuàn", meaning: "Trao đổi", meaningEn: "To exchange", type: "phrase", example: "我们交换微信号吧。", examplePinyin: "Wǒmen jiāohuàn Wēixìn hào ba.", exampleVi: "Chúng ta trao đổi số WeChat nhé." },
          { hanzi: "哪里人", pinyin: "nǎlǐ rén", meaning: "Người ở đâu", meaningEn: "Where are you from", type: "expression", example: "你是哪里人？", examplePinyin: "Nǐ shì nǎlǐ rén?", exampleVi: "Bạn là người ở đâu?" },
          { hanzi: "名片", pinyin: "míngpiàn", meaning: "Danh thiếp", meaningEn: "Business card", type: "phrase", example: "这是我的名片。", examplePinyin: "Zhè shì wǒ de míngpiàn.", exampleVi: "Đây là danh thiếp của tôi." },
          { hanzi: "贵姓", pinyin: "guì xìng", meaning: "Quý tính (hỏi họ trang trọng)", meaningEn: "May I know your surname (formal)", type: "expression", example: "请问您贵姓？", examplePinyin: "Qǐng wèn nín guì xìng?", exampleVi: "Xin hỏi quý tính?" },
        ],
        commonStructures: [
          {
            pattern: "我叫...，是...人",
            patternPinyin: "Wǒ jiào..., shì... rén",
            explanation: "Basic self-introduction: name + nationality",
            explanationVi: "Giới thiệu bản thân cơ bản: tên + quốc tịch",
            examples: [
              { zh: "我叫阿明，是越南人。", pinyin: "Wǒ jiào Ā Míng, shì Yuènán rén.", vi: "Tôi tên Minh, là người Việt Nam." },
              { zh: "我叫大卫，是美国人。", pinyin: "Wǒ jiào Dàwèi, shì Měiguó rén.", vi: "Tôi tên David, là người Mỹ." },
            ],
          },
          {
            pattern: "在 + Place + Verb",
            patternPinyin: "zài + Place + Verb",
            explanation: "Indicating location of an action",
            explanationVi: "Chỉ vị trí của hành động",
            examples: [
              { zh: "我在北京学习。", pinyin: "Wǒ zài Běijīng xuéxí.", vi: "Tôi học tại Bắc Kinh." },
              { zh: "他在公司上班。", pinyin: "Tā zài gōngsī shàngbān.", vi: "Anh ấy làm việc ở công ty." },
            ],
          },
          {
            pattern: "希望以后多多 + Verb",
            patternPinyin: "Xīwàng yǐhòu duōduō + Verb",
            explanation: "Hoping to do more of something in the future (polite)",
            explanationVi: "Hy vọng trong tương lai sẽ làm nhiều hơn (lịch sự)",
            examples: [
              { zh: "希望以后多多合作。", pinyin: "Xīwàng yǐhòu duōduō hézuò.", vi: "Hy vọng sau này hợp tác nhiều hơn." },
              { zh: "希望以后多多交流。", pinyin: "Xīwàng yǐhòu duōduō jiāoliú.", vi: "Hy vọng sau này giao lưu nhiều hơn." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: A New Classmate",
          titleVi: "Nghe: Bạn học mới",
          transcript: "大家好，我叫张丽，今年二十五岁。我是上海人，现在在广州工作。我是一名老师，我教英语。我很喜欢看书和旅游。很高兴认识大家！",
          transcriptPinyin: "Dàjiā hǎo, wǒ jiào Zhāng Lì, jīnnián èrshí wǔ suì. Wǒ shì Shànghǎi rén, xiànzài zài Guǎngzhōu gōngzuò. Wǒ shì yī míng lǎoshī, wǒ jiāo Yīngyǔ. Wǒ hěn xǐhuan kàn shū hé lǚyóu. Hěn gāoxìng rènshi dàjiā!",
          questions: [
            { q: "How old is Zhang Li?", qVi: "Trương Lệ bao nhiêu tuổi?", options: ["22岁", "25岁", "28岁", "30岁"], answer: 1 },
            { q: "Where is she from?", qVi: "Cô ấy là người ở đâu?", options: ["北京", "广州", "上海", "深圳"], answer: 2 },
            { q: "What does she do?", qVi: "Cô ấy làm nghề gì?", options: ["医生", "老师", "工程师", "学生"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Introduce yourself to a new Chinese friend",
          "Ask about someone's hometown and family",
          "Exchange contact information at a formal event",
        ],
      },

      // ──── Lesson 2: Food & Dining ────
      {
        id: "cn-dl-02-food",
        title: "Food & Dining",
        titleVi: "Ẩm thực & Ăn uống",
        titleZh: "点餐",
        icon: "UtensilsCrossed",
        description: "Order food, express preferences, and navigate Chinese restaurant culture",
        descriptionVi: "Gọi món, bày tỏ sở thích và tìm hiểu văn hóa nhà hàng Trung Quốc",
        hskLevel: 1,
        badge: "美食家",
        badgeVi: "Nhà sành ăn",
        keySituations: [
          {
            title: "Ordering at a Restaurant",
            titleVi: "Gọi món tại nhà hàng",
            description: "How to read a menu and place your order",
            descriptionVi: "Cách đọc thực đơn và gọi món",
            culturalNote: "In China, the host typically orders for everyone. It's polite to order one more dish than the number of guests (多点一个菜). Leaving a little food on the plate shows the host was generous.",
            culturalNoteVi: "Ở Trung Quốc, chủ nhà thường gọi món cho tất cả. Lịch sự là gọi nhiều hơn 1 món so với số khách. Để lại chút đồ ăn thể hiện chủ nhà hào phóng.",
            sampleDialogue: [
              { speaker: "服务员", line: "欢迎光临！请问几位？", pinyin: "Huānyíng guānglín! Qǐng wèn jǐ wèi?", translationVi: "Chào mừng quý khách! Xin hỏi mấy người ạ?" },
              { speaker: "You", line: "两位。请给我们一个菜单。", pinyin: "Liǎng wèi. Qǐng gěi wǒmen yí ge càidān.", translationVi: "Hai người. Cho chúng tôi xin thực đơn." },
              { speaker: "服务员", line: "好的，请稍等。", pinyin: "Hǎo de, qǐng shāo děng.", translationVi: "Vâng, xin chờ chút ạ." },
              { speaker: "You", line: "我想要一个宫保鸡丁和一碗米饭。", pinyin: "Wǒ xiǎng yào yí ge gōngbǎo jīdīng hé yī wǎn mǐfàn.", translationVi: "Tôi muốn một phần gà Cung Bảo và một bát cơm." },
              { speaker: "服务员", line: "好的。要不要来点饮料？", pinyin: "Hǎo de. Yào bu yào lái diǎn yǐnliào?", translationVi: "Vâng. Có muốn gọi đồ uống không ạ?" },
              { speaker: "You", line: "来一瓶啤酒吧。谢谢！", pinyin: "Lái yī píng píjiǔ ba. Xièxie!", translationVi: "Cho một chai bia nhé. Cảm ơn!" },
            ],
          },
          {
            title: "Expressing Food Preferences",
            titleVi: "Bày tỏ sở thích ăn uống",
            description: "Tell others what you like and don't like to eat",
            descriptionVi: "Nói cho người khác biết bạn thích và không thích ăn gì",
            sampleDialogue: [
              { speaker: "A", line: "你喜欢吃什么？", pinyin: "Nǐ xǐhuan chī shénme?", translationVi: "Bạn thích ăn gì?" },
              { speaker: "B", line: "我喜欢吃火锅，但是我不能吃太辣的。", pinyin: "Wǒ xǐhuan chī huǒguō, dànshì wǒ bù néng chī tài là de.", translationVi: "Tôi thích ăn lẩu, nhưng tôi không ăn được quá cay." },
              { speaker: "A", line: "那我们去吃鸳鸯锅吧，一半辣一半不辣。", pinyin: "Nà wǒmen qù chī yuānyāng guō ba, yī bàn là yī bàn bú là.", translationVi: "Vậy chúng ta đi ăn lẩu uyên ương nhé, nửa cay nửa không." },
              { speaker: "B", line: "好主意！我请客。", pinyin: "Hǎo zhǔyi! Wǒ qǐngkè.", translationVi: "Ý hay! Tôi đãi." },
            ],
          },
          {
            title: "Paying the Bill",
            titleVi: "Thanh toán hóa đơn",
            description: "Handle payments, split bills, and tip etiquette",
            descriptionVi: "Xử lý thanh toán, chia tiền và quy tắc tip",
            culturalNote: "In China, 'fighting' to pay the bill (抢着买单 qiǎng zhe mǎi dān) is a common social ritual. Tipping is NOT expected in mainland China restaurants.",
            culturalNoteVi: "Ở Trung Quốc, 'tranh' trả tiền (抢着买单) là nghi thức xã hội phổ biến. KHÔNG cần tip ở nhà hàng Trung Quốc đại lục.",
            sampleDialogue: [
              { speaker: "A", line: "服务员，买单！", pinyin: "Fúwùyuán, mǎi dān!", translationVi: "Phục vụ ơi, tính tiền!" },
              { speaker: "B", line: "今天我请客，别跟我抢！", pinyin: "Jīntiān wǒ qǐngkè, bié gēn wǒ qiǎng!", translationVi: "Hôm nay tôi đãi, đừng tranh với tôi!" },
              { speaker: "A", line: "不行不行，上次你请的，这次该我了。", pinyin: "Bù xíng bù xíng, shàng cì nǐ qǐng de, zhè cì gāi wǒ le.", translationVi: "Không được đâu, lần trước bạn đãi, lần này đến tôi rồi." },
              { speaker: "服务员", line: "一共两百三十八块。可以扫码支付。", pinyin: "Yígòng liǎng bǎi sānshí bā kuài. Kěyǐ sǎo mǎ zhīfù.", translationVi: "Tổng cộng 238 tệ. Có thể quét mã thanh toán." },
              { speaker: "A", line: "好，我扫。", pinyin: "Hǎo, wǒ sǎo.", translationVi: "Được, tôi quét." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "菜单", pinyin: "càidān", meaning: "Thực đơn", meaningEn: "Menu", type: "phrase", example: "请给我菜单。", examplePinyin: "Qǐng gěi wǒ càidān.", exampleVi: "Xin cho tôi thực đơn." },
          { hanzi: "点菜", pinyin: "diǎn cài", meaning: "Gọi món", meaningEn: "To order food", type: "phrase", example: "我们可以点菜了。", examplePinyin: "Wǒmen kěyǐ diǎn cài le.", exampleVi: "Chúng ta có thể gọi món rồi." },
          { hanzi: "好吃", pinyin: "hǎochī", meaning: "Ngon", meaningEn: "Delicious", type: "expression", example: "这个菜太好吃了！", examplePinyin: "Zhège cài tài hǎochī le!", exampleVi: "Món này ngon quá!" },
          { hanzi: "买单", pinyin: "mǎi dān", meaning: "Thanh toán / Tính tiền", meaningEn: "To pay the bill", type: "expression", example: "服务员，买单！", examplePinyin: "Fúwùyuán, mǎi dān!", exampleVi: "Phục vụ ơi, tính tiền!" },
          { hanzi: "辣", pinyin: "là", meaning: "Cay", meaningEn: "Spicy", type: "phrase", example: "我不能吃辣的。", examplePinyin: "Wǒ bù néng chī là de.", exampleVi: "Tôi không ăn được đồ cay." },
          { hanzi: "请客", pinyin: "qǐngkè", meaning: "Mời/đãi khách", meaningEn: "To treat (pay for someone)", type: "expression", example: "今天我请客！", examplePinyin: "Jīntiān wǒ qǐngkè!", exampleVi: "Hôm nay tôi đãi!" },
          { hanzi: "扫码", pinyin: "sǎo mǎ", meaning: "Quét mã QR", meaningEn: "Scan QR code", type: "expression", example: "你可以扫码支付。", examplePinyin: "Nǐ kěyǐ sǎo mǎ zhīfù.", exampleVi: "Bạn có thể quét mã để thanh toán." },
          { hanzi: "外卖", pinyin: "wàimài", meaning: "Đồ ăn giao tận nơi", meaningEn: "Food delivery", type: "phrase", example: "今天不想做饭，点个外卖吧。", examplePinyin: "Jīntiān bù xiǎng zuò fàn, diǎn ge wàimài ba.", exampleVi: "Hôm nay không muốn nấu, đặt ship đồ ăn đi." },
        ],
        commonStructures: [
          {
            pattern: "我想要 + Noun",
            patternPinyin: "Wǒ xiǎng yào + Noun",
            explanation: "Express wanting something politely",
            explanationVi: "Bày tỏ mong muốn lịch sự",
            examples: [
              { zh: "我想要一杯咖啡。", pinyin: "Wǒ xiǎng yào yī bēi kāfēi.", vi: "Tôi muốn một ly cà phê." },
              { zh: "我想要两个包子。", pinyin: "Wǒ xiǎng yào liǎng ge bāozi.", vi: "Tôi muốn hai cái bánh bao." },
            ],
          },
          {
            pattern: "太...了",
            patternPinyin: "tài... le",
            explanation: "Expressing 'too much' or emphasis",
            explanationVi: "Diễn đạt 'quá' hoặc nhấn mạnh",
            examples: [
              { zh: "太好吃了！", pinyin: "Tài hǎochī le!", vi: "Ngon quá!" },
              { zh: "太辣了！", pinyin: "Tài là le!", vi: "Cay quá!" },
            ],
          },
          {
            pattern: "要不要 + Verb？",
            patternPinyin: "Yào bu yào + Verb?",
            explanation: "Would you like to...? (offering)",
            explanationVi: "Bạn có muốn...? (mời)",
            examples: [
              { zh: "要不要来杯茶？", pinyin: "Yào bu yào lái bēi chá?", vi: "Uống trà không?" },
              { zh: "要不要加点辣椒？", pinyin: "Yào bu yào jiā diǎn làjiāo?", vi: "Thêm ớt không?" },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: At a Hot Pot Restaurant",
          titleVi: "Nghe: Tại nhà hàng Lẩu",
          transcript: "服务员：欢迎光临！请问几位？客人：三个人。服务员：好的，要鸳鸯锅还是清汤锅？客人：鸳鸯锅吧。再点一份羊肉，一份蔬菜拼盘，还有三碗米饭。服务员：好的，一共一百二十块。",
          transcriptPinyin: "Fúwùyuán: Huānyíng guānglín! Qǐng wèn jǐ wèi? Kèrén: Sān ge rén. Fúwùyuán: Hǎo de, yào yuānyāng guō háishi qīngtāng guō? Kèrén: Yuānyāng guō ba. Zài diǎn yī fèn yángròu, yī fèn shūcài pīnpán, háiyǒu sān wǎn mǐfàn. Fúwùyuán: Hǎo de, yígòng yī bǎi èrshí kuài.",
          questions: [
            { q: "How many people are dining?", qVi: "Có bao nhiêu người ăn?", options: ["2人", "3人", "4人", "5人"], answer: 1 },
            { q: "What type of pot did they choose?", qVi: "Họ chọn loại nồi nào?", options: ["清汤锅", "鸳鸯锅", "红油锅", "番茄锅"], answer: 1 },
            { q: "How much is the total?", qVi: "Tổng cộng bao nhiêu tiền?", options: ["100块", "120块", "150块", "200块"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Order food at a Chinese restaurant",
          "Discuss your favorite Chinese dishes",
          "Recommend a restaurant to a friend",
          "Handle paying the bill in a group setting",
        ],
      },

      // ──── Lesson 3: Shopping & Bargaining ────
      {
        id: "cn-dl-03-shopping",
        title: "Shopping & Bargaining",
        titleVi: "Mua sắm & Trả giá",
        titleZh: "购物",
        icon: "ShoppingBag",
        description: "Navigate markets, bargain like a local, and handle transactions",
        descriptionVi: "Khám phá chợ, trả giá như người bản xứ và xử lý giao dịch",
        hskLevel: 2,
        badge: "砍价达人",
        badgeVi: "Cao thủ Trả giá",
        keySituations: [
          {
            title: "Bargaining at a Market",
            titleVi: "Trả giá ở chợ",
            description: "Negotiate prices at a traditional market",
            descriptionVi: "Thương lượng giá ở chợ truyền thống",
            culturalNote: "Bargaining (砍价 kǎnjià) is expected at markets and small shops in China. Start by offering 50-60% of the asking price. Always smile and be friendly — it's part of the fun!",
            culturalNoteVi: "Trả giá (砍价) là bình thường ở chợ và tiệm nhỏ tại Trung Quốc. Bắt đầu bằng 50-60% giá hỏi. Luôn mỉm cười — đó là một phần của niềm vui!",
            sampleDialogue: [
              { speaker: "You", line: "老板，这个多少钱？", pinyin: "Lǎobǎn, zhège duōshao qián?", translationVi: "Anh ơi, cái này bao nhiêu tiền?" },
              { speaker: "老板", line: "这个一百块。", pinyin: "Zhège yī bǎi kuài.", translationVi: "Cái này 100 tệ." },
              { speaker: "You", line: "太贵了！能不能便宜一点？", pinyin: "Tài guì le! Néng bu néng piányi yīdiǎn?", translationVi: "Đắt quá! Bớt chút được không?" },
              { speaker: "老板", line: "最低八十块。", pinyin: "Zuìdī bāshí kuài.", translationVi: "Thấp nhất 80 tệ." },
              { speaker: "You", line: "五十块行不行？", pinyin: "Wǔshí kuài xíng bu xíng?", translationVi: "50 tệ được không?" },
              { speaker: "老板", line: "六十块吧，最低了。", pinyin: "Liùshí kuài ba, zuìdī le.", translationVi: "60 tệ nhé, thấp nhất rồi." },
              { speaker: "You", line: "好，成交！", pinyin: "Hǎo, chéngjiāo!", translationVi: "Được, thành giao!" },
            ],
          },
          {
            title: "Shopping for Clothes",
            titleVi: "Mua quần áo",
            description: "Try on clothes, ask for sizes and colors",
            descriptionVi: "Thử đồ, hỏi kích cỡ và màu sắc",
            sampleDialogue: [
              { speaker: "You", line: "这件衣服有没有大号的？", pinyin: "Zhè jiàn yīfu yǒu méi yǒu dà hào de?", translationVi: "Chiếc áo này có size lớn không?" },
              { speaker: "店员", line: "有的，这个颜色有大号。你要试试吗？", pinyin: "Yǒu de, zhège yánsè yǒu dà hào. Nǐ yào shìshi ma?", translationVi: "Có, màu này có size lớn. Bạn muốn thử không?" },
              { speaker: "You", line: "好的。试衣间在哪里？", pinyin: "Hǎo de. Shìyī jiān zài nǎlǐ?", translationVi: "Được. Phòng thử đồ ở đâu?" },
              { speaker: "店员", line: "在那边，右手边第二间。", pinyin: "Zài nàbiān, yòu shǒu biān dì èr jiān.", translationVi: "Ở đằng kia, phòng thứ hai bên phải." },
              { speaker: "You", line: "这件太紧了，有没有再大一号的？", pinyin: "Zhè jiàn tài jǐn le, yǒu méi yǒu zài dà yī hào de?", translationVi: "Chiếc này chật quá, có size lớn hơn không?" },
            ],
          },
          {
            title: "Online Shopping",
            titleVi: "Mua sắm trực tuyến",
            description: "Navigate Taobao/JD.com and handle delivery",
            descriptionVi: "Mua hàng trên Taobao/JD và nhận hàng giao",
            culturalNote: "Online shopping in China is dominated by 淘宝 (Táobǎo), 京东 (Jīngdōng/JD), and 拼多多 (Pīnduōduō). Double 11 (11/11) is the biggest shopping day — bigger than Black Friday!",
            culturalNoteVi: "Mua sắm online ở Trung Quốc chủ yếu trên 淘宝, 京东 và 拼多多. Ngày 11/11 là ngày mua sắm lớn nhất — lớn hơn cả Black Friday!",
            sampleDialogue: [
              { speaker: "A", line: "你在淘宝买过东西吗？", pinyin: "Nǐ zài Táobǎo mǎi guò dōngxi ma?", translationVi: "Bạn mua đồ trên Taobao bao giờ chưa?" },
              { speaker: "B", line: "买过啊，经常买。双十一的时候打折特别多。", pinyin: "Mǎi guò a, jīngcháng mǎi. Shuāng shíyī de shíhou dǎzhé tèbié duō.", translationVi: "Mua rồi, mua thường xuyên. Ngày 11/11 giảm giá đặc biệt nhiều." },
              { speaker: "A", line: "快递一般几天到？", pinyin: "Kuàidì yībān jǐ tiān dào?", translationVi: "Ship thường mấy ngày đến?" },
              { speaker: "B", line: "一般两三天。你可以在APP上查物流。", pinyin: "Yībān liǎng sān tiān. Nǐ kěyǐ zài APP shàng chá wùliú.", translationVi: "Thường 2-3 ngày. Bạn có thể tra cứu vận chuyển trên app." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "多少钱", pinyin: "duōshao qián", meaning: "Bao nhiêu tiền", meaningEn: "How much", type: "expression", example: "这个多少钱？", examplePinyin: "Zhège duōshao qián?", exampleVi: "Cái này bao nhiêu tiền?" },
          { hanzi: "便宜", pinyin: "piányi", meaning: "Rẻ", meaningEn: "Cheap / inexpensive", type: "phrase", example: "能便宜一点吗？", examplePinyin: "Néng piányi yīdiǎn ma?", exampleVi: "Rẻ hơn chút được không?" },
          { hanzi: "贵", pinyin: "guì", meaning: "Đắt", meaningEn: "Expensive", type: "phrase", example: "这个太贵了。", examplePinyin: "Zhège tài guì le.", exampleVi: "Cái này quá đắt." },
          { hanzi: "砍价", pinyin: "kǎnjià", meaning: "Trả giá", meaningEn: "To bargain", type: "expression", example: "在中国市场可以砍价。", examplePinyin: "Zài Zhōngguó shìchǎng kěyǐ kǎnjià.", exampleVi: "Ở chợ Trung Quốc có thể trả giá." },
          { hanzi: "打折", pinyin: "dǎ zhé", meaning: "Giảm giá", meaningEn: "Discount", type: "phrase", example: "现在打八折。", examplePinyin: "Xiànzài dǎ bā zhé.", exampleVi: "Hiện giảm 20%." },
          { hanzi: "试试", pinyin: "shìshi", meaning: "Thử", meaningEn: "To try", type: "expression", example: "我可以试试吗？", examplePinyin: "Wǒ kěyǐ shìshi ma?", exampleVi: "Tôi có thể thử không?" },
          { hanzi: "快递", pinyin: "kuàidì", meaning: "Chuyển phát nhanh", meaningEn: "Express delivery", type: "phrase", example: "你的快递到了。", examplePinyin: "Nǐ de kuàidì dào le.", exampleVi: "Đồ ship của bạn đến rồi." },
          { hanzi: "退货", pinyin: "tuìhuò", meaning: "Trả hàng", meaningEn: "Return goods", type: "phrase", example: "不满意可以退货。", examplePinyin: "Bù mǎnyì kěyǐ tuìhuò.", exampleVi: "Không hài lòng có thể trả hàng." },
        ],
        commonStructures: [
          {
            pattern: "能不能 + Verb？",
            patternPinyin: "Néng bu néng + Verb?",
            explanation: "Politely asking 'Can you...?'",
            explanationVi: "Hỏi lịch sự 'Có thể... không?'",
            examples: [
              { zh: "能不能便宜一点？", pinyin: "Néng bu néng piányi yīdiǎn?", vi: "Có thể rẻ hơn không?" },
              { zh: "能不能用微信付款？", pinyin: "Néng bu néng yòng Wēixìn fùkuǎn?", vi: "Có thể trả bằng WeChat không?" },
            ],
          },
          {
            pattern: "有没有 + Noun/Adj + 的？",
            patternPinyin: "Yǒu méi yǒu + Noun/Adj + de?",
            explanation: "Do you have... (asking about availability)",
            explanationVi: "Có... không? (hỏi về sự có sẵn)",
            examples: [
              { zh: "有没有大号的？", pinyin: "Yǒu méi yǒu dà hào de?", vi: "Có size lớn không?" },
              { zh: "有没有红色的？", pinyin: "Yǒu méi yǒu hóngsè de?", vi: "Có màu đỏ không?" },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: At the Night Market",
          titleVi: "Nghe: Tại chợ đêm",
          transcript: "这件衣服很好看，原价两百块，现在打七折，只要一百四十块。如果买两件，再给你优惠，两件两百五十块。你可以试试看，不满意可以退货。",
          transcriptPinyin: "Zhè jiàn yīfu hěn hǎokàn, yuánjià liǎng bǎi kuài, xiànzài dǎ qī zhé, zhǐ yào yī bǎi sìshí kuài. Rúguǒ mǎi liǎng jiàn, zài gěi nǐ yōuhuì, liǎng jiàn liǎng bǎi wǔshí kuài. Nǐ kěyǐ shìshi kàn, bù mǎnyì kěyǐ tuìhuò.",
          questions: [
            { q: "What is the original price?", qVi: "Giá gốc là bao nhiêu?", options: ["100块", "140块", "200块", "250块"], answer: 2 },
            { q: "What discount is offered?", qVi: "Giảm giá bao nhiêu?", options: ["五折", "六折", "七折", "八折"], answer: 2 },
            { q: "How much for two items?", qVi: "Mua hai cái bao nhiêu?", options: ["200块", "250块", "280块", "300块"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Bargain for a souvenir at a Chinese market",
          "Ask about sizes and colors when shopping for clothes",
          "Compare prices between online and offline shopping",
          "Describe your experience with Taobao or JD",
        ],
      },

      // ──── Lesson 4: Transportation & Travel ────
      {
        id: "cn-dl-04-transport",
        title: "Transportation & Travel",
        titleVi: "Giao thông & Du lịch",
        titleZh: "旅游交通",
        icon: "MapPin",
        description: "Navigate taxis, subways, trains and ask for directions",
        descriptionVi: "Sử dụng taxi, tàu điện ngầm, tàu hỏa và hỏi đường",
        hskLevel: 2,
        badge: "旅行达人",
        badgeVi: "Chuyên gia Du lịch",
        keySituations: [
          {
            title: "Taking a Taxi",
            titleVi: "Đi Taxi",
            description: "Give directions, negotiate fares, and handle payment",
            descriptionVi: "Chỉ đường, thương lượng giá và thanh toán",
            culturalNote: "In China, use DiDi (滴滴 Dīdī) app instead of hailing taxis. If you take a regular taxi, make sure they use the meter (打表 dǎ biǎo). Mobile payments are ubiquitous.",
            culturalNoteVi: "Ở Trung Quốc, dùng app DiDi (滴滴) thay vì vẫy taxi. Nếu đi taxi thường, nhớ yêu cầu bật đồng hồ (打表). Thanh toán di động rất phổ biến.",
            sampleDialogue: [
              { speaker: "You", line: "师傅，去天安门，请打表。", pinyin: "Shīfu, qù Tiān'ānmén, qǐng dǎ biǎo.", translationVi: "Bác tài, đến Thiên An Môn, bật đồng hồ giúp tôi." },
              { speaker: "司机", line: "好的，大概二十分钟到。", pinyin: "Hǎo de, dàgài èrshí fēnzhōng dào.", translationVi: "Được, khoảng 20 phút tới." },
              { speaker: "You", line: "好的，谢谢。可以微信付款吗？", pinyin: "Hǎo de, xièxie. Kěyǐ Wēixìn fùkuǎn ma?", translationVi: "Được, cảm ơn. Trả bằng WeChat được không?" },
              { speaker: "司机", line: "可以，扫码就行。", pinyin: "Kěyǐ, sǎo mǎ jiù xíng.", translationVi: "Được, quét mã là xong." },
            ],
          },
          {
            title: "Asking for Directions",
            titleVi: "Hỏi đường",
            description: "Ask and understand directions in Chinese",
            descriptionVi: "Hỏi và hiểu chỉ dẫn đường bằng tiếng Trung",
            sampleDialogue: [
              { speaker: "You", line: "请问，地铁站在哪里？", pinyin: "Qǐng wèn, dìtiě zhàn zài nǎlǐ?", translationVi: "Xin hỏi, ga tàu điện ngầm ở đâu?" },
              { speaker: "路人", line: "一直往前走，到路口左转就到了。", pinyin: "Yīzhí wǎng qián zǒu, dào lùkǒu zuǒ zhuǎn jiù dào le.", translationVi: "Đi thẳng về phía trước, đến ngã tư rẽ trái là tới." },
              { speaker: "You", line: "大概走多长时间？", pinyin: "Dàgài zǒu duō cháng shíjiān?", translationVi: "Đi bộ khoảng bao lâu?" },
              { speaker: "路人", line: "五分钟左右。", pinyin: "Wǔ fēnzhōng zuǒyòu.", translationVi: "Khoảng 5 phút." },
            ],
          },
          {
            title: "Booking Train Tickets",
            titleVi: "Đặt vé tàu",
            description: "Buy tickets and navigate the train system",
            descriptionVi: "Mua vé và sử dụng hệ thống tàu hỏa",
            culturalNote: "China's high-speed rail (高铁 gāotiě) network is the world's largest. Use 12306 app to buy tickets. During holidays like Spring Festival (春节), tickets sell out weeks in advance!",
            culturalNoteVi: "Hệ thống tàu cao tốc (高铁) Trung Quốc là lớn nhất thế giới. Dùng app 12306 để mua vé. Vào dịp Tết (春节), vé hết trước hàng tuần!",
            sampleDialogue: [
              { speaker: "You", line: "你好，我想买一张去上海的高铁票。", pinyin: "Nǐ hǎo, wǒ xiǎng mǎi yī zhāng qù Shànghǎi de gāotiě piào.", translationVi: "Xin chào, tôi muốn mua một vé tàu cao tốc đi Thượng Hải." },
              { speaker: "售票员", line: "什么时候走？要一等座还是二等座？", pinyin: "Shénme shíhou zǒu? Yào yī děng zuò háishi èr děng zuò?", translationVi: "Khi nào đi? Muốn ghế hạng nhất hay hạng hai?" },
              { speaker: "You", line: "明天上午的，二等座。", pinyin: "Míngtiān shàngwǔ de, èr děng zuò.", translationVi: "Sáng ngày mai, ghế hạng hai." },
              { speaker: "售票员", line: "有一趟八点半的，票价五百五十三块。", pinyin: "Yǒu yī tàng bā diǎn bàn de, piàojià wǔ bǎi wǔshí sān kuài.", translationVi: "Có chuyến 8 giờ 30, giá vé 553 tệ." },
              { speaker: "You", line: "好的，就这趟。", pinyin: "Hǎo de, jiù zhè tàng.", translationVi: "Được, lấy chuyến này." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "地铁", pinyin: "dìtiě", meaning: "Tàu điện ngầm", meaningEn: "Subway / Metro", type: "phrase", example: "我坐地铁去上班。", examplePinyin: "Wǒ zuò dìtiě qù shàngbān.", exampleVi: "Tôi đi tàu điện ngầm đi làm." },
          { hanzi: "出租车", pinyin: "chūzū chē", meaning: "Taxi", meaningEn: "Taxi", type: "phrase", example: "我们打个出租车吧。", examplePinyin: "Wǒmen dǎ ge chūzū chē ba.", exampleVi: "Chúng ta bắt taxi đi." },
          { hanzi: "高铁", pinyin: "gāotiě", meaning: "Tàu cao tốc", meaningEn: "High-speed rail", type: "phrase", example: "坐高铁只要四个小时。", examplePinyin: "Zuò gāotiě zhǐ yào sì ge xiǎoshí.", exampleVi: "Đi tàu cao tốc chỉ mất 4 tiếng." },
          { hanzi: "左转", pinyin: "zuǒ zhuǎn", meaning: "Rẽ trái", meaningEn: "Turn left", type: "phrase", example: "到路口左转。", examplePinyin: "Dào lùkǒu zuǒ zhuǎn.", exampleVi: "Đến ngã tư rẽ trái." },
          { hanzi: "右转", pinyin: "yòu zhuǎn", meaning: "Rẽ phải", meaningEn: "Turn right", type: "phrase", example: "前面右转就是。", examplePinyin: "Qiánmiàn yòu zhuǎn jiù shì.", exampleVi: "Phía trước rẽ phải là tới." },
          { hanzi: "一直走", pinyin: "yīzhí zǒu", meaning: "Đi thẳng", meaningEn: "Go straight", type: "expression", example: "一直走，不要转弯。", examplePinyin: "Yīzhí zǒu, bú yào zhuǎn wān.", exampleVi: "Đi thẳng, không rẽ." },
          { hanzi: "到了", pinyin: "dào le", meaning: "Đã đến", meaningEn: "Arrived", type: "expression", example: "我们到了！", examplePinyin: "Wǒmen dào le!", exampleVi: "Chúng ta đến rồi!" },
          { hanzi: "导航", pinyin: "dǎoháng", meaning: "Dẫn đường/GPS", meaningEn: "Navigation/GPS", type: "phrase", example: "你可以用手机导航。", examplePinyin: "Nǐ kěyǐ yòng shǒujī dǎoháng.", exampleVi: "Bạn có thể dùng GPS điện thoại." },
        ],
        commonStructures: [
          {
            pattern: "从 A 到 B 怎么走？",
            patternPinyin: "Cóng A dào B zěnme zǒu?",
            explanation: "Asking for directions from A to B",
            explanationVi: "Hỏi đường từ A đến B",
            examples: [
              { zh: "从这里到火车站怎么走？", pinyin: "Cóng zhèlǐ dào huǒchē zhàn zěnme zǒu?", vi: "Từ đây đến nhà ga đi như thế nào?" },
              { zh: "从酒店到机场怎么走？", pinyin: "Cóng jiǔdiàn dào jīchǎng zěnme zǒu?", vi: "Từ khách sạn đến sân bay đi thế nào?" },
            ],
          },
          {
            pattern: "坐...去...",
            patternPinyin: "Zuò... qù...",
            explanation: "Take [transport] to go to [place]",
            explanationVi: "Đi [phương tiện] đến [nơi]",
            examples: [
              { zh: "坐地铁去公司。", pinyin: "Zuò dìtiě qù gōngsī.", vi: "Đi tàu điện ngầm đến công ty." },
              { zh: "坐高铁去北京。", pinyin: "Zuò gāotiě qù Běijīng.", vi: "Đi tàu cao tốc đến Bắc Kinh." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Taking the Subway",
          titleVi: "Nghe: Đi tàu điện ngầm",
          transcript: "请问，去故宫坐几号线？你先坐一号线到天安门东站，然后换二号线坐两站就到了。大概四十分钟。票价五块钱。",
          transcriptPinyin: "Qǐng wèn, qù Gùgōng zuò jǐ hào xiàn? Nǐ xiān zuò yī hào xiàn dào Tiān'ānmén Dōng zhàn, ránhòu huàn èr hào xiàn zuò liǎng zhàn jiù dào le. Dàgài sìshí fēnzhōng. Piàojià wǔ kuài qián.",
          questions: [
            { q: "Which line to take first?", qVi: "Đi tuyến nào trước?", options: ["二号线", "一号线", "三号线", "四号线"], answer: 1 },
            { q: "How long does it take?", qVi: "Mất bao lâu?", options: ["20分钟", "30分钟", "40分钟", "50分钟"], answer: 2 },
            { q: "How much is the ticket?", qVi: "Vé bao nhiêu?", options: ["3块", "5块", "7块", "10块"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Give directions to a tourist in Chinese",
          "Describe your daily commute",
          "Plan a trip to Beijing or Shanghai",
          "Compare transportation in China vs your country",
        ],
      },

      // ──── Lesson 5: Health & Emergencies ────
      {
        id: "cn-dl-05-health",
        title: "Health & Emergencies",
        titleVi: "Sức khỏe & Tình huống Khẩn cấp",
        titleZh: "健康急救",
        icon: "HeartPulse",
        description: "Describe symptoms, visit a doctor, and handle emergencies",
        descriptionVi: "Mô tả triệu chứng, đi khám bác sĩ và xử lý tình huống khẩn cấp",
        hskLevel: 2,
        badge: "健康卫士",
        badgeVi: "Chiến sĩ Sức khỏe",
        keySituations: [
          {
            title: "Visiting a Doctor",
            titleVi: "Đi khám bác sĩ",
            description: "Describe your symptoms and understand medical advice",
            descriptionVi: "Mô tả triệu chứng và hiểu lời khuyên y tế",
            culturalNote: "In China, hospitals are the primary place for healthcare — even for minor issues. You need to register (挂号 guàhào) first. Traditional Chinese Medicine (中医 zhōngyī) is also popular alongside Western medicine.",
            culturalNoteVi: "Ở Trung Quốc, bệnh viện là nơi chính để khám bệnh — ngay cả bệnh nhẹ. Bạn cần đăng ký (挂号) trước. Đông y (中医) cũng rất phổ biến bên cạnh Tây y.",
            sampleDialogue: [
              { speaker: "You", line: "医生，我头疼，还有点发烧。", pinyin: "Yīshēng, wǒ tóu téng, hái yǒudiǎn fā shāo.", translationVi: "Bác sĩ, tôi đau đầu và hơi sốt." },
              { speaker: "医生", line: "发烧多少度？", pinyin: "Fā shāo duōshao dù?", translationVi: "Sốt bao nhiêu độ?" },
              { speaker: "You", line: "三十八度五。", pinyin: "Sānshí bā dù wǔ.", translationVi: "38 độ 5." },
              { speaker: "医生", line: "你可能感冒了。我给你开点药，多喝水，好好休息。", pinyin: "Nǐ kěnéng gǎnmào le. Wǒ gěi nǐ kāi diǎn yào, duō hē shuǐ, hǎohǎo xiūxi.", translationVi: "Bạn có thể bị cảm. Tôi kê thuốc cho bạn, uống nhiều nước, nghỉ ngơi tốt." },
              { speaker: "You", line: "好的，谢谢医生。药怎么吃？", pinyin: "Hǎo de, xièxie yīshēng. Yào zěnme chī?", translationVi: "Vâng, cảm ơn bác sĩ. Thuốc uống thế nào?" },
              { speaker: "医生", line: "一天三次，每次两片，饭后吃。", pinyin: "Yī tiān sān cì, měi cì liǎng piàn, fàn hòu chī.", translationVi: "Ngày 3 lần, mỗi lần 2 viên, uống sau ăn." },
            ],
          },
          {
            title: "Pharmacy Conversation",
            titleVi: "Mua thuốc tại nhà thuốc",
            description: "Buy medicine and understand instructions",
            descriptionVi: "Mua thuốc và hiểu hướng dẫn sử dụng",
            sampleDialogue: [
              { speaker: "You", line: "你好，我想买感冒药。", pinyin: "Nǐ hǎo, wǒ xiǎng mǎi gǎnmào yào.", translationVi: "Xin chào, tôi muốn mua thuốc cảm." },
              { speaker: "药剂师", line: "你有什么症状？流鼻涕还是咳嗽？", pinyin: "Nǐ yǒu shénme zhèngzhuàng? Liú bítì háishi késou?", translationVi: "Bạn có triệu chứng gì? Sổ mũi hay ho?" },
              { speaker: "You", line: "咳嗽比较严重，还有一点头疼。", pinyin: "Késou bǐjiào yánzhòng, hái yǒu yīdiǎn tóu téng.", translationVi: "Ho khá nặng, còn hơi đau đầu." },
              { speaker: "药剂师", line: "这个药可以止咳，这个是退烧药。一天吃三次。", pinyin: "Zhège yào kěyǐ zhǐ ké, zhège shì tuì shāo yào. Yī tiān chī sān cì.", translationVi: "Thuốc này trị ho, thuốc này hạ sốt. Ngày uống 3 lần." },
            ],
          },
          {
            title: "Emergency Situation",
            titleVi: "Tình huống khẩn cấp",
            description: "Call for help and communicate in emergencies",
            descriptionVi: "Gọi cứu trợ và giao tiếp trong tình huống khẩn cấp",
            culturalNote: "Emergency numbers in China: 110 (Police), 120 (Ambulance), 119 (Fire). Unlike many countries, these are separate numbers, not a single 911-style number.",
            culturalNoteVi: "Số khẩn cấp Trung Quốc: 110 (Cảnh sát), 120 (Cấp cứu), 119 (Cứu hỏa). Khác với nhiều nước, đây là các số riêng biệt.",
            sampleDialogue: [
              { speaker: "You", line: "快打120！有人受伤了！", pinyin: "Kuài dǎ yāo èr líng! Yǒu rén shòushāng le!", translationVi: "Gọi 120 nhanh! Có người bị thương!" },
              { speaker: "接线员", line: "您好，请问在哪里？", pinyin: "Nín hǎo, qǐng wèn zài nǎlǐ?", translationVi: "Xin chào, xin hỏi ở đâu ạ?" },
              { speaker: "You", line: "在人民路和中山路的路口，有人摔倒了。", pinyin: "Zài Rénmín Lù hé Zhōngshān Lù de lùkǒu, yǒu rén shuāi dǎo le.", translationVi: "Ở ngã tư đường Nhân Dân và đường Trung Sơn, có người ngã." },
              { speaker: "接线员", line: "好的，救护车马上到。", pinyin: "Hǎo de, jiùhù chē mǎshàng dào.", translationVi: "Vâng, xe cấp cứu đến ngay." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "头疼", pinyin: "tóu téng", meaning: "Đau đầu", meaningEn: "Headache", type: "phrase", example: "我头疼得很厉害。", examplePinyin: "Wǒ tóu téng de hěn lìhai.", exampleVi: "Tôi đau đầu rất nặng." },
          { hanzi: "发烧", pinyin: "fā shāo", meaning: "Sốt", meaningEn: "Fever", type: "phrase", example: "孩子发烧了。", examplePinyin: "Háizi fā shāo le.", exampleVi: "Con bé bị sốt." },
          { hanzi: "感冒", pinyin: "gǎnmào", meaning: "Cảm cúm", meaningEn: "Cold / Flu", type: "phrase", example: "我感冒了。", examplePinyin: "Wǒ gǎnmào le.", exampleVi: "Tôi bị cảm." },
          { hanzi: "药", pinyin: "yào", meaning: "Thuốc", meaningEn: "Medicine", type: "phrase", example: "你吃药了吗？", examplePinyin: "Nǐ chī yào le ma?", exampleVi: "Bạn uống thuốc chưa?" },
          { hanzi: "医院", pinyin: "yīyuàn", meaning: "Bệnh viện", meaningEn: "Hospital", type: "phrase", example: "我们去医院吧。", examplePinyin: "Wǒmen qù yīyuàn ba.", exampleVi: "Chúng ta đi bệnh viện đi." },
          { hanzi: "挂号", pinyin: "guàhào", meaning: "Đăng ký khám bệnh", meaningEn: "Register (at hospital)", type: "phrase", example: "请先去挂号。", examplePinyin: "Qǐng xiān qù guàhào.", exampleVi: "Xin đi đăng ký trước." },
          { hanzi: "咳嗽", pinyin: "késou", meaning: "Ho", meaningEn: "Cough", type: "phrase", example: "我咳嗽了一个星期了。", examplePinyin: "Wǒ késou le yī ge xīngqī le.", exampleVi: "Tôi ho một tuần rồi." },
          { hanzi: "过敏", pinyin: "guòmǐn", meaning: "Dị ứng", meaningEn: "Allergy", type: "phrase", example: "我对花生过敏。", examplePinyin: "Wǒ duì huāshēng guòmǐn.", exampleVi: "Tôi bị dị ứng đậu phộng." },
        ],
        commonStructures: [
          {
            pattern: "我...疼/痛",
            patternPinyin: "Wǒ... téng/tòng",
            explanation: "My [body part] hurts",
            explanationVi: "Tôi bị đau [bộ phận]",
            examples: [
              { zh: "我肚子疼。", pinyin: "Wǒ dùzi téng.", vi: "Tôi đau bụng." },
              { zh: "我嗓子疼。", pinyin: "Wǒ sǎngzi téng.", vi: "Tôi đau họng." },
            ],
          },
          {
            pattern: "一天...次，每次...片/粒",
            patternPinyin: "Yī tiān... cì, měi cì... piàn/lì",
            explanation: "Dosage instructions: X times a day, Y tablets each",
            explanationVi: "Hướng dẫn liều lượng: X lần/ngày, mỗi lần Y viên",
            examples: [
              { zh: "一天三次，每次两片。", pinyin: "Yī tiān sān cì, měi cì liǎng piàn.", vi: "Ngày 3 lần, mỗi lần 2 viên." },
              { zh: "一天两次，每次一粒。", pinyin: "Yī tiān liǎng cì, měi cì yī lì.", vi: "Ngày 2 lần, mỗi lần 1 viên." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: At the Hospital",
          titleVi: "Nghe: Tại bệnh viện",
          transcript: "病人说他已经咳嗽三天了，还有点发烧。医生检查以后说他得了轻微的肺炎，需要吃药，而且要多休息，不能吃辛辣的食物。如果三天后还没有好转，就要再来复查。",
          transcriptPinyin: "Bìngrén shuō tā yǐjīng késou sān tiān le, hái yǒudiǎn fā shāo. Yīshēng jiǎnchá yǐhòu shuō tā dé le qīngwéi de fèiyán, xūyào chī yào, érqiě yào duō xiūxi, bù néng chī xīnlà de shíwù. Rúguǒ sān tiān hòu hái méiyǒu hǎo zhuǎn, jiù yào zài lái fùchá.",
          questions: [
            { q: "How long has the patient been coughing?", qVi: "Bệnh nhân ho bao lâu rồi?", options: ["1天", "2天", "3天", "5天"], answer: 2 },
            { q: "What did the doctor diagnose?", qVi: "Bác sĩ chẩn đoán gì?", options: ["感冒", "肺炎", "过敏", "胃病"], answer: 1 },
            { q: "When to return for follow-up?", qVi: "Khi nào tái khám?", options: ["1天后", "2天后", "3天后", "一周后"], answer: 2 },
          ],
        },
        speakingTopics: [
          "Describe symptoms to a doctor in Chinese",
          "Buy medicine at a pharmacy",
          "Explain your medical history",
          "Handle an emergency situation",
        ],
      },

      // ──── Lesson 7: Weather & Seasons ────
      {
        id: "cn-dl-07-weather",
        title: "Weather & Seasons",
        titleVi: "Thời tiết & Mùa",
        titleZh: "天气季节",
        icon: "CloudSun",
        description: "Discuss weather, seasons, and climate in everyday conversation",
        descriptionVi: "Thảo luận về thời tiết, mùa và khí hậu trong giao tiếp hàng ngày",
        hskLevel: 2,
        badge: "气象通",
        badgeVi: "Thông thạo Thời tiết",
        keySituations: [
          {
            title: "Talking About Today's Weather",
            titleVi: "Nói về thời tiết hôm nay",
            description: "Common phrases for discussing current weather",
            descriptionVi: "Cụm từ phổ biến để nói về thời tiết hiện tại",
            culturalNote: "Weather is a universal conversation starter in China too. Northern China (北方 běifāng) has extreme winters while Southern China (南方 nánfāng) is humid and warm. The 梅雨季节 (méiyǔ jìjié — plum rain season) in June-July is a major seasonal event.",
            culturalNoteVi: "Thời tiết là chủ đề mở đầu cuộc trò chuyện phổ biến ở Trung Quốc. Miền Bắc 北方 có mùa đông khắc nghiệt, miền Nam 南方 ẩm ướt và ấm áp. Mùa mưa ngâu 梅雨季节 vào tháng 6-7 là sự kiện theo mùa quan trọng.",
            sampleDialogue: [
              { speaker: "A", line: "今天天气怎么样？", pinyin: "Jīntiān tiānqì zěnmeyàng?", translationVi: "Hôm nay thời tiết thế nào?" },
              { speaker: "B", line: "今天很热，有三十五度。", pinyin: "Jīntiān hěn rè, yǒu sānshíwǔ dù.", translationVi: "Hôm nay rất nóng, 35 độ." },
              { speaker: "A", line: "下午好像要下雨。", pinyin: "Xiàwǔ hǎoxiàng yào xià yǔ.", translationVi: "Chiều hình như sẽ mưa." },
              { speaker: "B", line: "那我带把伞出门。", pinyin: "Nà wǒ dài bǎ sǎn chūmén.", translationVi: "Vậy tôi mang ô đi." },
            ],
          },
          {
            title: "Discussing Seasons",
            titleVi: "Thảo luận về các mùa",
            description: "Talk about your favorite season and seasonal activities",
            descriptionVi: "Nói về mùa yêu thích và hoạt động theo mùa",
            sampleDialogue: [
              { speaker: "A", line: "你最喜欢什么季节？", pinyin: "Nǐ zuì xǐhuan shénme jìjié?", translationVi: "Bạn thích mùa nào nhất?" },
              { speaker: "B", line: "我最喜欢秋天，天气很凉快。", pinyin: "Wǒ zuì xǐhuan qiūtiān, tiānqì hěn liángkuai.", translationVi: "Tôi thích nhất mùa thu, thời tiết mát mẻ." },
              { speaker: "A", line: "秋天的风景也很美，树叶变红了。", pinyin: "Qiūtiān de fēngjǐng yě hěn měi, shùyè biàn hóng le.", translationVi: "Phong cảnh mùa thu cũng rất đẹp, lá cây chuyển đỏ." },
              { speaker: "B", line: "对，我们可以去爬山赏红叶！", pinyin: "Duì, wǒmen kěyǐ qù pá shān shǎng hóngyè!", translationVi: "Đúng, chúng ta có thể đi leo núi ngắm lá đỏ!" },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "天气", pinyin: "tiānqì", meaning: "Thời tiết", meaningEn: "Weather", type: "phrase", example: "今天天气很好。", examplePinyin: "Jīntiān tiānqì hěn hǎo.", exampleVi: "Hôm nay thời tiết tốt." },
          { hanzi: "下雨", pinyin: "xià yǔ", meaning: "Mưa", meaningEn: "To rain", type: "phrase", example: "明天要下雨。", examplePinyin: "Míngtiān yào xià yǔ.", exampleVi: "Ngày mai sẽ mưa." },
          { hanzi: "凉快", pinyin: "liángkuai", meaning: "Mát mẻ", meaningEn: "Cool (weather)", type: "phrase", example: "秋天很凉快。", examplePinyin: "Qiūtiān hěn liángkuai.", exampleVi: "Mùa thu rất mát mẻ." },
          { hanzi: "温度", pinyin: "wēndù", meaning: "Nhiệt độ", meaningEn: "Temperature", type: "phrase", example: "今天温度很高。", examplePinyin: "Jīntiān wēndù hěn gāo.", exampleVi: "Hôm nay nhiệt độ rất cao." },
          { hanzi: "季节", pinyin: "jìjié", meaning: "Mùa", meaningEn: "Season", type: "phrase", example: "中国有四个季节。", examplePinyin: "Zhōngguó yǒu sì gè jìjié.", exampleVi: "Trung Quốc có bốn mùa." },
          { hanzi: "雪", pinyin: "xuě", meaning: "Tuyết", meaningEn: "Snow", type: "phrase", example: "冬天下雪了。", examplePinyin: "Dōngtiān xià xuě le.", exampleVi: "Mùa đông có tuyết rơi." },
        ],
        commonStructures: [
          {
            pattern: "好像要 + Verb",
            patternPinyin: "Hǎoxiàng yào + Verb",
            explanation: "It seems like it's going to...",
            explanationVi: "Hình như sắp...",
            examples: [
              { zh: "好像要下雨了。", pinyin: "Hǎoxiàng yào xià yǔ le.", vi: "Hình như sắp mưa rồi." },
              { zh: "好像要降温了。", pinyin: "Hǎoxiàng yào jiàngwēn le.", vi: "Hình như sắp hạ nhiệt độ rồi." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Weather Forecast",
          titleVi: "Nghe: Dự báo thời tiết",
          transcript: "各位听众好，今天北京天气晴朗，最高温度32度。明天开始有大雨，温度会下降到25度。请大家出门记得带伞。周末天气转晴，适合户外活动。",
          transcriptPinyin: "Gèwèi tīngzhòng hǎo, jīntiān Běijīng tiānqì qínglǎng, zuìgāo wēndù sānshí'èr dù. Míngtiān kāishǐ yǒu dà yǔ, wēndù huì xiàjiàng dào èrshíwǔ dù. Qǐng dàjiā chūmén jìde dài sǎn. Zhōumò tiānqì zhuǎn qíng, shìhé hùwài huódòng.",
          questions: [
            { q: "What is today's weather?", qVi: "Thời tiết hôm nay thế nào?", options: ["下雨", "阴天", "晴朗", "多云"], answer: 2 },
            { q: "What is tomorrow's high temperature?", qVi: "Nhiệt độ ngày mai là bao nhiêu?", options: ["20度", "25度", "30度", "32度"], answer: 1 },
            { q: "When will the weather clear up?", qVi: "Khi nào thời tiết hửng nắng?", options: ["明天", "后天", "周末", "下周"], answer: 2 },
          ],
        },
        speakingTopics: [
          "Describe the weather in your city today",
          "Talk about your favorite season and why",
          "Compare the climate of Vietnam and China",
          "Discuss how weather affects your daily routine",
        ],
      },

      // ──── Lesson 6: Renting & Housing ────
      {
        id: "cn-dl-06-housing",
        title: "Renting & Housing",
        titleVi: "Thuê nhà & Nhà ở",
        titleZh: "租房住宿",
        icon: "Home",
        description: "Find apartments, communicate with landlords, handle housing issues",
        descriptionVi: "Tìm căn hộ, giao tiếp với chủ nhà, xử lý vấn đề nhà ở",
        hskLevel: 3,
        badge: "安家达人",
        badgeVi: "Chuyên gia Thuê nhà",
        keySituations: [
          {
            title: "Apartment Viewing",
            titleVi: "Xem nhà",
            description: "Visit an apartment and ask about details",
            descriptionVi: "Đi xem nhà và hỏi chi tiết",
            culturalNote: "In China, rent is usually paid monthly or quarterly (季付 jì fù). Deposits are typically '押一付三' — one month deposit + three months rent upfront. Apps like 贝壳 (Bèiké) and 自如 (Zìrú) are popular for finding rentals.",
            culturalNoteVi: "Ở Trung Quốc, tiền thuê thường trả theo tháng hoặc quý (季付). Tiền cọc thường '押一付三' — cọc 1 tháng + trả trước 3 tháng. App 贝壳 và 自如 rất phổ biến để tìm nhà.",
            sampleDialogue: [
              { speaker: "中介", line: "这套房子两室一厅，月租四千块。", pinyin: "Zhè tào fángzi liǎng shì yī tīng, yuè zū sì qiān kuài.", translationVi: "Căn hộ này 2 phòng ngủ 1 phòng khách, thuê tháng 4000 tệ." },
              { speaker: "You", line: "包不包水电费？", pinyin: "Bāo bu bāo shuǐdiàn fèi?", translationVi: "Có bao tiền điện nước không?" },
              { speaker: "中介", line: "不包，水电费自己交。网费包了。", pinyin: "Bù bāo, shuǐdiàn fèi zìjǐ jiāo. Wǎngfèi bāo le.", translationVi: "Không bao, điện nước tự trả. Tiền mạng đã bao." },
              { speaker: "You", line: "押金怎么算？", pinyin: "Yājīn zěnme suàn?", translationVi: "Tiền cọc tính thế nào?" },
              { speaker: "中介", line: "押一付三，一共一万六。", pinyin: "Yā yī fù sān, yígòng yī wàn liù.", translationVi: "Cọc 1 trả 3, tổng cộng 16 ngàn." },
            ],
          },
          {
            title: "Reporting a Problem",
            titleVi: "Báo cáo sự cố",
            description: "Tell your landlord about broken things",
            descriptionVi: "Thông báo cho chủ nhà về đồ hỏng",
            sampleDialogue: [
              { speaker: "You", line: "房东您好，空调坏了，不制冷了。", pinyin: "Fángdōng nín hǎo, kōngtiáo huài le, bù zhìlěng le.", translationVi: "Chào chủ nhà, máy lạnh hỏng rồi, không làm lạnh nữa." },
              { speaker: "房东", line: "好的，我明天找人来修。你在家吗？", pinyin: "Hǎo de, wǒ míngtiān zhǎo rén lái xiū. Nǐ zài jiā ma?", translationVi: "Được, ngày mai tôi cho người đến sửa. Bạn ở nhà không?" },
              { speaker: "You", line: "下午在。上午我要上班。", pinyin: "Xiàwǔ zài. Shàngwǔ wǒ yào shàngbān.", translationVi: "Chiều tôi ở nhà. Sáng tôi phải đi làm." },
              { speaker: "房东", line: "好，我让师傅下午两点过去。", pinyin: "Hǎo, wǒ ràng shīfu xiàwǔ liǎng diǎn guòqù.", translationVi: "Được, tôi bảo thợ 2 giờ chiều đến." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "租房", pinyin: "zū fáng", meaning: "Thuê nhà", meaningEn: "Rent a house/apartment", type: "phrase", example: "我想在市中心租房。", examplePinyin: "Wǒ xiǎng zài shì zhōngxīn zū fáng.", exampleVi: "Tôi muốn thuê nhà ở trung tâm." },
          { hanzi: "房东", pinyin: "fángdōng", meaning: "Chủ nhà", meaningEn: "Landlord", type: "phrase", example: "房东人很好。", examplePinyin: "Fángdōng rén hěn hǎo.", exampleVi: "Chủ nhà rất tốt." },
          { hanzi: "押金", pinyin: "yājīn", meaning: "Tiền cọc", meaningEn: "Deposit", type: "phrase", example: "退房的时候退押金。", examplePinyin: "Tuì fáng de shíhou tuì yājīn.", exampleVi: "Khi trả nhà sẽ hoàn cọc." },
          { hanzi: "水电费", pinyin: "shuǐdiàn fèi", meaning: "Tiền điện nước", meaningEn: "Utilities (water + electricity)", type: "phrase", example: "水电费一个月多少？", examplePinyin: "Shuǐdiàn fèi yī ge yuè duōshao?", exampleVi: "Tiền điện nước mỗi tháng bao nhiêu?" },
          { hanzi: "空调", pinyin: "kōngtiáo", meaning: "Máy lạnh", meaningEn: "Air conditioning", type: "phrase", example: "房间里有空调吗？", examplePinyin: "Fángjiān lǐ yǒu kōngtiáo ma?", exampleVi: "Trong phòng có máy lạnh không?" },
          { hanzi: "中介", pinyin: "zhōngjiè", meaning: "Môi giới", meaningEn: "Agent / Broker", type: "phrase", example: "找中介帮忙租房。", examplePinyin: "Zhǎo zhōngjiè bāngmáng zū fáng.", exampleVi: "Tìm môi giới giúp thuê nhà." },
        ],
        commonStructures: [
          {
            pattern: "包不包...？",
            patternPinyin: "Bāo bu bāo...?",
            explanation: "Does it include...? (for rent/fees)",
            explanationVi: "Có bao gồm... không? (cho thuê/phí)",
            examples: [
              { zh: "包不包水电费？", pinyin: "Bāo bu bāo shuǐdiàn fèi?", vi: "Có bao tiền điện nước không?" },
              { zh: "包不包网费？", pinyin: "Bāo bu bāo wǎngfèi?", vi: "Có bao tiền mạng không?" },
            ],
          },
          {
            pattern: "...坏了，能不能修一下？",
            patternPinyin: "... huài le, néng bu néng xiū yíxià?",
            explanation: "[thing] is broken, can you fix it?",
            explanationVi: "[đồ] bị hỏng, sửa được không?",
            examples: [
              { zh: "热水器坏了，能不能修一下？", pinyin: "Rèshuǐqì huài le, néng bu néng xiū yíxià?", vi: "Máy nước nóng hỏng, sửa được không?" },
              { zh: "洗衣机坏了，能不能修一下？", pinyin: "Xǐyījī huài le, néng bu néng xiū yíxià?", vi: "Máy giặt hỏng, sửa được không?" },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Finding an Apartment",
          titleVi: "Nghe: Tìm thuê căn hộ",
          transcript: "这套公寓在地铁站旁边，走路五分钟。一室一厅一卫，面积四十平米。月租三千五百块，押一付三。房间里有空调、洗衣机和冰箱。可以养宠物。",
          transcriptPinyin: "Zhè tào gōngyù zài dìtiě zhàn pángbiān, zǒu lù wǔ fēnzhōng. Yī shì yī tīng yī wèi, miànjī sìshí píngmǐ. Yuè zū sān qiān wǔ bǎi kuài, yā yī fù sān. Fángjiān lǐ yǒu kōngtiáo, xǐyījī hé bīngxiāng. Kěyǐ yǎng chǒngwù.",
          questions: [
            { q: "How far from the metro?", qVi: "Cách ga tàu bao xa?", options: ["3分钟", "5分钟", "10分钟", "15分钟"], answer: 1 },
            { q: "Monthly rent?", qVi: "Tiền thuê hàng tháng?", options: ["3000块", "3500块", "4000块", "4500块"], answer: 1 },
            { q: "Can you have pets?", qVi: "Có được nuôi thú cưng không?", options: ["可以", "不可以", "要加钱", "不确定"], answer: 0 },
          ],
        },
        speakingTopics: [
          "Describe your ideal apartment in Chinese",
          "Negotiate rent with a landlord",
          "Report a maintenance issue to your landlord",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PILLAR 2: BUSINESS & PROFESSIONAL (职场商务)
  // ═══════════════════════════════════════════
  {
    id: "business",
    title: "Business & Professional",
    titleVi: "Công sở & Thương mại",
    titleZh: "职场商务",
    icon: "Briefcase",
    color: "from-blue-500 to-indigo-500",
    description: "Professional Chinese for meetings, negotiations, and office communication",
    descriptionVi: "Tiếng Trung chuyên nghiệp cho họp, đàm phán và giao tiếp văn phòng",
    lessons: [
      // ──── Lesson 1: Business Meetings ────
      {
        id: "cn-bz-01-meetings",
        title: "Business Meetings",
        titleVi: "Họp công tác",
        titleZh: "开会",
        icon: "Users",
        description: "Participate in meetings: present ideas, ask questions, follow up",
        descriptionVi: "Tham gia cuộc họp: trình bày ý kiến, đặt câu hỏi, theo dõi kết quả",
        hskLevel: 3,
        badge: "会议专家",
        badgeVi: "Chuyên gia Họp",
        keySituations: [
          {
            title: "Starting a Meeting",
            titleVi: "Bắt đầu cuộc họp",
            description: "Opening phrases and setting the agenda",
            descriptionVi: "Cụm từ mở đầu và thiết lập chương trình họp",
            culturalNote: "In Chinese business culture, building relationships (关系 guānxi) is more important than the deal itself. Small talk before meetings is expected. Never refuse tea when offered — it shows trust.",
            culturalNoteVi: "Trong văn hóa kinh doanh Trung Quốc, xây dựng mối quan hệ (关系) quan trọng hơn thương vụ. Nói chuyện phiếm trước cuộc họp là bình thường.",
            sampleDialogue: [
              { speaker: "主持", line: "各位，会议现在开始。今天我们讨论第三季度的销售报告。", pinyin: "Gè wèi, huìyì xiànzài kāishǐ. Jīntiān wǒmen tǎolùn dì sān jìdù de xiāoshòu bàogào.", translationVi: "Các vị, cuộc họp bắt đầu. Hôm nay chúng ta thảo luận báo cáo bán hàng quý 3." },
              { speaker: "You", line: "好的。我先汇报一下我们部门的情况。", pinyin: "Hǎo de. Wǒ xiān huìbào yíxià wǒmen bùmén de qíngkuàng.", translationVi: "Vâng. Tôi báo cáo tình hình bộ phận chúng tôi trước." },
              { speaker: "经理", line: "好，请说。", pinyin: "Hǎo, qǐng shuō.", translationVi: "Được, mời nói." },
              { speaker: "You", line: "第三季度我们的销售额增长了百分之十五。", pinyin: "Dì sān jìdù wǒmen de xiāoshòu é zēngzhǎng le bǎi fēn zhī shíwǔ.", translationVi: "Quý 3 doanh số của chúng tôi tăng 15%." },
            ],
          },
          {
            title: "Proposing an Idea",
            titleVi: "Đề xuất ý kiến",
            description: "Present your suggestion and handle feedback",
            descriptionVi: "Trình bày đề xuất và xử lý phản hồi",
            sampleDialogue: [
              { speaker: "You", line: "我有一个建议。我们可以通过社交媒体来推广我们的产品。", pinyin: "Wǒ yǒu yí ge jiànyì. Wǒmen kěyǐ tōngguò shèjiāo méitǐ lái tuīguǎng wǒmen de chǎnpǐn.", translationVi: "Tôi có một đề xuất. Chúng ta có thể quảng bá sản phẩm qua mạng xã hội." },
              { speaker: "同事", line: "这个主意不错。但是预算够吗？", pinyin: "Zhège zhǔyi búcuò. Dànshì yùsuàn gòu ma?", translationVi: "Ý tưởng hay. Nhưng ngân sách có đủ không?" },
              { speaker: "You", line: "我已经做了一个预算方案，可以发给大家看看。", pinyin: "Wǒ yǐjīng zuò le yí ge yùsuàn fāng'àn, kěyǐ fā gěi dàjiā kànkan.", translationVi: "Tôi đã làm một phương án ngân sách, có thể gửi cho mọi người xem." },
              { speaker: "经理", line: "好的，会后发给我。我们下周一再讨论。", pinyin: "Hǎo de, huì hòu fā gěi wǒ. Wǒmen xià zhōuyī zài tǎolùn.", translationVi: "Được, họp xong gửi cho tôi. Chúng ta thứ Hai tuần sau thảo luận tiếp." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "会议", pinyin: "huìyì", meaning: "Cuộc họp", meaningEn: "Meeting", type: "phrase", example: "下午三点有一个会议。", examplePinyin: "Xiàwǔ sān diǎn yǒu yí ge huìyì.", exampleVi: "3 giờ chiều có một cuộc họp." },
          { hanzi: "汇报", pinyin: "huìbào", meaning: "Báo cáo", meaningEn: "To report / brief", type: "phrase", example: "请汇报一下项目进度。", examplePinyin: "Qǐng huìbào yíxià xiàngmù jìndù.", exampleVi: "Xin báo cáo tiến độ dự án." },
          { hanzi: "讨论", pinyin: "tǎolùn", meaning: "Thảo luận", meaningEn: "To discuss", type: "phrase", example: "我们需要讨论这个方案。", examplePinyin: "Wǒmen xūyào tǎolùn zhège fāng'àn.", exampleVi: "Chúng ta cần thảo luận phương án này." },
          { hanzi: "同意", pinyin: "tóngyì", meaning: "Đồng ý", meaningEn: "To agree", type: "phrase", example: "我同意你的看法。", examplePinyin: "Wǒ tóngyì nǐ de kànfǎ.", exampleVi: "Tôi đồng ý quan điểm của bạn." },
          { hanzi: "建议", pinyin: "jiànyì", meaning: "Đề xuất", meaningEn: "Suggestion / to suggest", type: "phrase", example: "我有一个建议。", examplePinyin: "Wǒ yǒu yí ge jiànyì.", exampleVi: "Tôi có một đề xuất." },
          { hanzi: "关系", pinyin: "guānxi", meaning: "Mối quan hệ", meaningEn: "Relationship / connections", type: "expression", example: "在中国做生意，关系很重要。", examplePinyin: "Zài Zhōngguó zuò shēngyì, guānxi hěn zhòngyào.", exampleVi: "Kinh doanh ở Trung Quốc, mối quan hệ rất quan trọng." },
          { hanzi: "预算", pinyin: "yùsuàn", meaning: "Ngân sách", meaningEn: "Budget", type: "phrase", example: "这个项目的预算是多少？", examplePinyin: "Zhège xiàngmù de yùsuàn shì duōshao?", exampleVi: "Ngân sách dự án này là bao nhiêu?" },
          { hanzi: "推广", pinyin: "tuīguǎng", meaning: "Quảng bá", meaningEn: "To promote / marketing", type: "phrase", example: "我们要推广新产品。", examplePinyin: "Wǒmen yào tuīguǎng xīn chǎnpǐn.", exampleVi: "Chúng ta cần quảng bá sản phẩm mới." },
        ],
        commonStructures: [
          {
            pattern: "关于...，我想说...",
            patternPinyin: "Guānyú..., wǒ xiǎng shuō...",
            explanation: "Regarding..., I'd like to say...",
            explanationVi: "Về vấn đề..., tôi muốn nói...",
            examples: [
              { zh: "关于这个项目，我想说几点。", pinyin: "Guānyú zhège xiàngmù, wǒ xiǎng shuō jǐ diǎn.", vi: "Về dự án này, tôi muốn nói vài điểm." },
            ],
          },
          {
            pattern: "我已经...了，可以...",
            patternPinyin: "Wǒ yǐjīng... le, kěyǐ...",
            explanation: "I've already..., so we can...",
            explanationVi: "Tôi đã... rồi, có thể...",
            examples: [
              { zh: "我已经准备好了，可以开始了。", pinyin: "Wǒ yǐjīng zhǔnbèi hǎo le, kěyǐ kāishǐ le.", vi: "Tôi đã chuẩn bị xong, có thể bắt đầu." },
              { zh: "我已经写好报告了，可以发给大家。", pinyin: "Wǒ yǐjīng xiě hǎo bàogào le, kěyǐ fā gěi dàjiā.", vi: "Tôi đã viết xong báo cáo, có thể gửi cho mọi người." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Quarterly Review Meeting",
          titleVi: "Nghe: Họp đánh giá Quý",
          transcript: "经理说第三季度的销售额比上个季度增长了百分之十五。但是客户满意度下降了百分之三。他建议我们下个季度要加强客户服务，同时开发两个新产品。",
          transcriptPinyin: "Jīnglǐ shuō dì sān jìdù de xiāoshòu é bǐ shàng ge jìdù zēngzhǎng le bǎi fēn zhī shíwǔ. Dànshì kèhù mǎnyì dù xiàjiàng le bǎi fēn zhī sān. Tā jiànyì wǒmen xià ge jìdù yào jiāqiáng kèhù fúwù, tóngshí kāifā liǎng ge xīn chǎnpǐn.",
          questions: [
            { q: "Sales growth percentage?", qVi: "Tăng trưởng doanh số bao nhiêu %?", options: ["10%", "15%", "20%", "25%"], answer: 1 },
            { q: "Customer satisfaction change?", qVi: "Mức thay đổi hài lòng khách hàng?", options: ["上升3%", "下降3%", "下降5%", "不变"], answer: 1 },
            { q: "How many new products to develop?", qVi: "Phát triển bao nhiêu sản phẩm mới?", options: ["1个", "2个", "3个", "5个"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Present a quarterly report in Chinese",
          "Discuss project challenges with your team",
          "Propose a new marketing strategy",
          "Schedule and confirm a meeting",
        ],
      },

      // ──── Lesson 2: Negotiating & Deals ────
      {
        id: "cn-bz-02-negotiate",
        title: "Negotiating & Deals",
        titleVi: "Đàm phán & Hợp đồng",
        titleZh: "商务谈判",
        icon: "Handshake",
        description: "Negotiate prices, terms, and close business deals",
        descriptionVi: "Đàm phán giá, điều khoản và chốt giao dịch",
        hskLevel: 4,
        badge: "谈判高手",
        badgeVi: "Cao thủ Đàm phán",
        keySituations: [
          {
            title: "Price Negotiation",
            titleVi: "Đàm phán giá",
            description: "Discussing pricing and payment terms",
            descriptionVi: "Thảo luận giá cả và điều khoản thanh toán",
            culturalNote: "'面子' (miànzi / face) is crucial in negotiations. Never publicly disagree harshly. Use indirect language like '我们再考虑一下' (let's think about it) instead of a direct 'No'.",
            culturalNoteVi: "'面子' (thể diện) rất quan trọng trong đàm phán. Không bao giờ phản đối gay gắt. Dùng ngôn ngữ gián tiếp thay vì nói 'Không' trực tiếp.",
            sampleDialogue: [
              { speaker: "You", line: "关于价格，我们觉得可以再商量一下。", pinyin: "Guānyú jiàgé, wǒmen juéde kěyǐ zài shāngliáng yíxià.", translationVi: "Về giá cả, chúng tôi nghĩ có thể thương lượng thêm." },
              { speaker: "对方", line: "我们的价格已经很优惠了。", pinyin: "Wǒmen de jiàgé yǐjīng hěn yōuhuì le.", translationVi: "Giá của chúng tôi đã rất ưu đãi rồi." },
              { speaker: "You", line: "如果订单量大的话，能不能再给我们一个折扣？", pinyin: "Rúguǒ dìngdān liàng dà de huà, néng bu néng zài gěi wǒmen yí ge zhékòu?", translationVi: "Nếu đơn hàng lớn, có thể cho chúng tôi thêm chiết khấu không?" },
              { speaker: "对方", line: "如果订单超过一千件，我可以给你打九折。", pinyin: "Rúguǒ dìngdān chāoguò yī qiān jiàn, wǒ kěyǐ gěi nǐ dǎ jiǔ zhé.", translationVi: "Nếu đơn hàng trên 1000 cái, tôi có thể giảm 10% cho bạn." },
              { speaker: "You", line: "好的，我们回去考虑一下，明天给你答复。", pinyin: "Hǎo de, wǒmen huíqù kǎolǜ yíxià, míngtiān gěi nǐ dáfù.", translationVi: "Được, chúng tôi về cân nhắc, ngày mai trả lời." },
            ],
          },
          {
            title: "Signing a Contract",
            titleVi: "Ký hợp đồng",
            description: "Review terms and sign agreements",
            descriptionVi: "Xem xét điều khoản và ký thỏa thuận",
            sampleDialogue: [
              { speaker: "You", line: "合同我看了，有两个地方想确认一下。", pinyin: "Hétong wǒ kàn le, yǒu liǎng ge dìfang xiǎng quèrèn yíxià.", translationVi: "Hợp đồng tôi xem rồi, có hai chỗ muốn xác nhận." },
              { speaker: "对方", line: "请说。", pinyin: "Qǐng shuō.", translationVi: "Mời nói." },
              { speaker: "You", line: "交货日期是三月十五号，对吗？付款方式是什么？", pinyin: "Jiāo huò rìqī shì sān yuè shíwǔ hào, duì ma? Fùkuǎn fāngshì shì shénme?", translationVi: "Ngày giao hàng là 15/3, đúng không? Phương thức thanh toán là gì?" },
              { speaker: "对方", line: "对的。付款方式是预付百分之三十，交货后付百分之七十。", pinyin: "Duì de. Fùkuǎn fāngshì shì yù fù bǎi fēn zhī sānshí, jiāo huò hòu fù bǎi fēn zhī qīshí.", translationVi: "Đúng vậy. Thanh toán trước 30%, sau giao hàng trả 70%." },
              { speaker: "You", line: "好的，没问题。我们可以签了。", pinyin: "Hǎo de, méi wèntí. Wǒmen kěyǐ qiān le.", translationVi: "Được, không vấn đề. Chúng ta có thể ký rồi." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "谈判", pinyin: "tánpàn", meaning: "Đàm phán", meaningEn: "Negotiation", type: "phrase", example: "这次谈判很成功。", examplePinyin: "Zhè cì tánpàn hěn chénggōng.", exampleVi: "Cuộc đàm phán này rất thành công." },
          { hanzi: "合同", pinyin: "hétong", meaning: "Hợp đồng", meaningEn: "Contract", type: "phrase", example: "请签这份合同。", examplePinyin: "Qǐng qiān zhè fèn hétong.", exampleVi: "Xin ký hợp đồng này." },
          { hanzi: "订单", pinyin: "dìngdān", meaning: "Đơn đặt hàng", meaningEn: "Order", type: "phrase", example: "我们收到了一个大订单。", examplePinyin: "Wǒmen shōu dào le yí ge dà dìngdān.", exampleVi: "Chúng tôi nhận được đơn hàng lớn." },
          { hanzi: "面子", pinyin: "miànzi", meaning: "Thể diện", meaningEn: "Face (social reputation)", type: "expression", example: "给他留点面子。", examplePinyin: "Gěi tā liú diǎn miànzi.", exampleVi: "Để lại chút thể diện cho anh ấy." },
          { hanzi: "合作", pinyin: "hézuò", meaning: "Hợp tác", meaningEn: "Cooperation / to cooperate", type: "phrase", example: "希望我们能长期合作。", examplePinyin: "Xīwàng wǒmen néng chángqī hézuò.", exampleVi: "Hy vọng chúng ta có thể hợp tác lâu dài." },
          { hanzi: "考虑", pinyin: "kǎolǜ", meaning: "Cân nhắc", meaningEn: "To consider", type: "phrase", example: "我需要考虑一下。", examplePinyin: "Wǒ xūyào kǎolǜ yíxià.", exampleVi: "Tôi cần cân nhắc." },
          { hanzi: "交货", pinyin: "jiāo huò", meaning: "Giao hàng", meaningEn: "To deliver goods", type: "phrase", example: "交货日期是什么时候？", examplePinyin: "Jiāo huò rìqī shì shénme shíhou?", exampleVi: "Ngày giao hàng là khi nào?" },
          { hanzi: "付款", pinyin: "fùkuǎn", meaning: "Thanh toán", meaningEn: "Payment", type: "phrase", example: "付款方式可以商量。", examplePinyin: "Fùkuǎn fāngshì kěyǐ shāngliáng.", exampleVi: "Phương thức thanh toán có thể thương lượng." },
        ],
        commonStructures: [
          {
            pattern: "如果...的话，就...",
            patternPinyin: "Rúguǒ... de huà, jiù...",
            explanation: "If... then... (conditional)",
            explanationVi: "Nếu... thì... (câu điều kiện)",
            examples: [
              { zh: "如果价格合适的话，我们就签合同。", pinyin: "Rúguǒ jiàgé héshì de huà, wǒmen jiù qiān hétong.", vi: "Nếu giá hợp lý thì chúng tôi ký hợp đồng." },
            ],
          },
          {
            pattern: "...再...一下",
            patternPinyin: "...zài... yíxià",
            explanation: "Let's [verb] again / one more time (softening tone)",
            explanationVi: "Hãy [động từ] thêm lần nữa (giọng nhẹ nhàng)",
            examples: [
              { zh: "我们再商量一下。", pinyin: "Wǒmen zài shāngliáng yíxià.", vi: "Chúng ta thương lượng thêm một chút." },
              { zh: "让我再想一下。", pinyin: "Ràng wǒ zài xiǎng yíxià.", vi: "Để tôi nghĩ thêm một chút." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Business Deal",
          titleVi: "Nghe: Thương vụ kinh doanh",
          transcript: "我们公司想跟你们合作。第一批订单我们需要五百件产品。如果质量好的话，下个月会加到一千件。请问最快什么时候能发货？我们希望两个星期内收到货。",
          transcriptPinyin: "Wǒmen gōngsī xiǎng gēn nǐmen hézuò. Dì yī pī dìngdān wǒmen xūyào wǔ bǎi jiàn chǎnpǐn. Rúguǒ zhìliàng hǎo de huà, xià ge yuè huì jiā dào yī qiān jiàn. Qǐng wèn zuì kuài shénme shíhou néng fā huò? Wǒmen xīwàng liǎng ge xīngqī nèi shōu dào huò.",
          questions: [
            { q: "First order quantity?", qVi: "Số lượng đơn hàng đầu tiên?", options: ["200件", "500件", "800件", "1000件"], answer: 1 },
            { q: "What condition for increasing?", qVi: "Điều kiện để tăng đơn?", options: ["价格便宜", "质量好", "发货快", "服务好"], answer: 1 },
            { q: "Desired delivery time?", qVi: "Thời gian giao hàng mong muốn?", options: ["一周", "两周", "三周", "一个月"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Negotiate a supply contract in Chinese",
          "Discuss delivery terms and payment schedule",
          "Handle a complaint about product quality",
          "Present a counter-offer in a negotiation",
        ],
      },

      // ──── Lesson 3: Office Communication ────
      {
        id: "cn-bz-03-office",
        title: "Office Communication",
        titleVi: "Giao tiếp Văn phòng",
        titleZh: "职场交流",
        icon: "Building",
        description: "Daily office interactions: emails, requests, small talk with colleagues",
        descriptionVi: "Giao tiếp văn phòng hàng ngày: email, yêu cầu, chuyện phiếm với đồng nghiệp",
        hskLevel: 3,
        badge: "职场精英",
        badgeVi: "Tinh hoa Văn phòng",
        keySituations: [
          {
            title: "Asking for Help at Work",
            titleVi: "Nhờ giúp đỡ tại công sở",
            description: "Politely request assistance from colleagues",
            descriptionVi: "Lịch sự nhờ đồng nghiệp giúp đỡ",
            sampleDialogue: [
              { speaker: "You", line: "不好意思，打扰一下。你能帮我看看这份报告吗？", pinyin: "Bù hǎo yìsi, dǎrǎo yíxià. Nǐ néng bāng wǒ kànkan zhè fèn bàogào ma?", translationVi: "Xin lỗi, làm phiền chút. Bạn giúp tôi xem báo cáo này được không?" },
              { speaker: "同事", line: "没问题，什么时候要？", pinyin: "Méi wèntí, shénme shíhou yào?", translationVi: "Không vấn đề, khi nào cần?" },
              { speaker: "You", line: "下午五点之前可以吗？", pinyin: "Xiàwǔ wǔ diǎn zhīqián kěyǐ ma?", translationVi: "Trước 5 giờ chiều được không?" },
              { speaker: "同事", line: "可以，我一会儿就看。", pinyin: "Kěyǐ, wǒ yīhuìr jiù kàn.", translationVi: "Được, lát nữa tôi xem." },
            ],
          },
          {
            title: "Writing a Work Email",
            titleVi: "Viết email công việc",
            description: "Common email phrases and formats",
            descriptionVi: "Các cụm từ và định dạng email phổ biến",
            culturalNote: "Chinese business emails often start with 尊敬的 (zūnjìng de — Dear/Respected) for formal contacts. End with 此致敬礼 (cǐzhì jìnglǐ — Best regards). WeChat is increasingly used alongside email for quick work communication.",
            culturalNoteVi: "Email công việc Trung Quốc thường bắt đầu bằng 尊敬的 (Kính gửi). Kết thúc bằng 此致敬礼 (Trân trọng). WeChat ngày càng được dùng song song với email.",
            sampleDialogue: [
              { speaker: "You", line: "我给客户发邮件了，但是还没收到回复。", pinyin: "Wǒ gěi kèhù fā yóujiàn le, dànshì hái méi shōu dào huífù.", translationVi: "Tôi đã gửi email cho khách hàng nhưng chưa nhận được phản hồi." },
              { speaker: "同事", line: "你发了多久了？", pinyin: "Nǐ fā le duō jiǔ le?", translationVi: "Bạn gửi bao lâu rồi?" },
              { speaker: "You", line: "已经三天了。要不要再发一封催一下？", pinyin: "Yǐjīng sān tiān le. Yào bu yào zài fā yī fēng cuī yíxià?", translationVi: "Đã 3 ngày rồi. Có nên gửi thêm email nhắc không?" },
              { speaker: "同事", line: "你可以在微信上先跟他说一声。", pinyin: "Nǐ kěyǐ zài Wēixìn shàng xiān gēn tā shuō yī shēng.", translationVi: "Bạn có thể nhắn trên WeChat trước." },
            ],
          },
          {
            title: "Requesting Time Off",
            titleVi: "Xin nghỉ phép",
            description: "Ask your manager for leave",
            descriptionVi: "Xin phép sếp cho nghỉ",
            sampleDialogue: [
              { speaker: "You", line: "经理，我想请两天假，下周一和周二。", pinyin: "Jīnglǐ, wǒ xiǎng qǐng liǎng tiān jià, xià zhōuyī hé zhōu'èr.", translationVi: "Sếp, tôi muốn xin nghỉ 2 ngày, thứ Hai và thứ Ba tuần sau." },
              { speaker: "经理", line: "什么原因？", pinyin: "Shénme yuányīn?", translationVi: "Lý do gì?" },
              { speaker: "You", line: "我家人从越南来，我想陪他们玩两天。", pinyin: "Wǒ jiārén cóng Yuènán lái, wǒ xiǎng péi tāmen wán liǎng tiān.", translationVi: "Gia đình tôi từ Việt Nam sang, tôi muốn đưa họ đi chơi 2 ngày." },
              { speaker: "经理", line: "好的，你把手上的工作先交接一下。", pinyin: "Hǎo de, nǐ bǎ shǒu shàng de gōngzuò xiān jiāojiē yíxià.", translationVi: "Được, bạn bàn giao công việc đang làm trước." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "加班", pinyin: "jiā bān", meaning: "Làm thêm giờ", meaningEn: "Overtime", type: "phrase", example: "今天晚上我要加班。", examplePinyin: "Jīntiān wǎnshang wǒ yào jiā bān.", exampleVi: "Tối nay tôi phải làm thêm giờ." },
          { hanzi: "请假", pinyin: "qǐng jià", meaning: "Xin nghỉ phép", meaningEn: "To take leave", type: "phrase", example: "我明天想请假。", examplePinyin: "Wǒ míngtiān xiǎng qǐng jià.", exampleVi: "Ngày mai tôi muốn xin nghỉ phép." },
          { hanzi: "截止日期", pinyin: "jiézhǐ rìqī", meaning: "Hạn chót", meaningEn: "Deadline", type: "phrase", example: "截止日期是这个星期五。", examplePinyin: "Jiézhǐ rìqī shì zhège xīngqī wǔ.", exampleVi: "Hạn chót là thứ Sáu tuần này." },
          { hanzi: "同事", pinyin: "tóngshì", meaning: "Đồng nghiệp", meaningEn: "Colleague", type: "phrase", example: "我的同事们都很友好。", examplePinyin: "Wǒ de tóngshìmen dōu hěn yǒuhǎo.", exampleVi: "Đồng nghiệp của tôi đều rất thân thiện." },
          { hanzi: "打扰", pinyin: "dǎrǎo", meaning: "Làm phiền", meaningEn: "To disturb", type: "expression", example: "不好意思，打扰你了。", examplePinyin: "Bù hǎo yìsi, dǎrǎo nǐ le.", exampleVi: "Xin lỗi, làm phiền bạn rồi." },
          { hanzi: "邮件", pinyin: "yóujiàn", meaning: "Email", meaningEn: "Email", type: "phrase", example: "我给你发了一封邮件。", examplePinyin: "Wǒ gěi nǐ fā le yī fēng yóujiàn.", exampleVi: "Tôi đã gửi cho bạn một email." },
          { hanzi: "交接", pinyin: "jiāojiē", meaning: "Bàn giao", meaningEn: "Handover", type: "phrase", example: "离职前要做好工作交接。", examplePinyin: "Lí zhí qián yào zuò hǎo gōngzuò jiāojiē.", exampleVi: "Trước khi nghỉ việc cần bàn giao công việc." },
          { hanzi: "催", pinyin: "cuī", meaning: "Giục/Nhắc", meaningEn: "To urge / follow up", type: "phrase", example: "客户在催我们了。", examplePinyin: "Kèhù zài cuī wǒmen le.", exampleVi: "Khách hàng đang giục chúng ta." },
        ],
        commonStructures: [
          {
            pattern: "你能帮我...吗？",
            patternPinyin: "Nǐ néng bāng wǒ... ma?",
            explanation: "Could you help me...?",
            explanationVi: "Bạn có thể giúp tôi... không?",
            examples: [
              { zh: "你能帮我翻译一下吗？", pinyin: "Nǐ néng bāng wǒ fānyì yíxià ma?", vi: "Bạn có thể giúp tôi dịch không?" },
              { zh: "你能帮我打印这份文件吗？", pinyin: "Nǐ néng bāng wǒ dǎyìn zhè fèn wénjiàn ma?", vi: "Bạn có thể giúp tôi in tài liệu này không?" },
            ],
          },
          {
            pattern: "把 + Object + Verb",
            patternPinyin: "Bǎ + Object + Verb",
            explanation: "把-sentence: place the object before the verb to emphasize action on it",
            explanationVi: "Câu 把: đặt tân ngữ trước động từ để nhấn mạnh hành động lên nó",
            examples: [
              { zh: "把报告发给我。", pinyin: "Bǎ bàogào fā gěi wǒ.", vi: "Gửi báo cáo cho tôi." },
              { zh: "把工作交接好。", pinyin: "Bǎ gōngzuò jiāojiē hǎo.", vi: "Bàn giao công việc cho tốt." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Office Conversation",
          titleVi: "Nghe: Hội thoại Văn phòng",
          transcript: "小王，明天的会议你准备好了吗？PPT做完了吗？经理说这次会议很重要，所有部门的人都要参加。对了，会议室改到三楼的大会议室了。",
          transcriptPinyin: "Xiǎo Wáng, míngtiān de huìyì nǐ zhǔnbèi hǎo le ma? PPT zuò wán le ma? Jīnglǐ shuō zhè cì huìyì hěn zhòngyào, suǒyǒu bùmén de rén dōu yào cānjiā. Duì le, huìyì shì gǎi dào sān lóu de dà huìyì shì le.",
          questions: [
            { q: "Is the PPT ready?", qVi: "PPT đã làm xong chưa?", options: ["做完了", "还没做完", "不确定", "不需要PPT"], answer: 2 },
            { q: "Who needs to attend?", qVi: "Ai cần tham gia?", options: ["经理们", "所有部门", "新员工", "客户"], answer: 1 },
            { q: "Where is the meeting room?", qVi: "Phòng họp ở đâu?", options: ["一楼", "二楼", "三楼", "四楼"], answer: 2 },
          ],
        },
        speakingTopics: [
          "Ask your colleague for help with a task",
          "Request time off from your manager",
          "Give a status update on your project",
          "Write and discuss a work email",
        ],
      },

      // ──── Lesson 5: Business Trip ────
      {
        id: "cn-bz-05-trip",
        title: "Business Trip",
        titleVi: "Chuyến Công tác",
        titleZh: "出差",
        icon: "Plane",
        description: "Handle business travel: booking, hotel check-in, and reporting back",
        descriptionVi: "Xử lý công tác: đặt vé, nhận phòng khách sạn và báo cáo khi về",
        hskLevel: 3,
        badge: "出差能手",
        badgeVi: "Chuyên gia Công tác",
        keySituations: [
          {
            title: "Booking a Business Trip",
            titleVi: "Đặt chuyến công tác",
            description: "Arrange travel and accommodation for work",
            descriptionVi: "Sắp xếp di chuyển và chỗ ở cho công việc",
            culturalNote: "In Chinese business culture, 出差 (chūchāi — business trip) is very common. Many companies use 钉钉 (DīngDīng) or 飞书 (Fēishū) for travel requests. '差旅报销' (chāilǚ bàoxiāo) — travel expense reimbursement — is a key phrase to know.",
            culturalNoteVi: "Trong văn hóa kinh doanh Trung Quốc, 出差 rất phổ biến. Nhiều công ty dùng 钉钉 hoặc 飞书 để yêu cầu đi công tác. '差旅报销' (hoàn trả chi phí công tác) là cụm từ quan trọng cần biết.",
            sampleDialogue: [
              { speaker: "A", line: "下周我要去上海出差。", pinyin: "Xià zhōu wǒ yào qù Shànghǎi chūchāi.", translationVi: "Tuần sau tôi phải đi công tác ở Thượng Hải." },
              { speaker: "B", line: "出差几天？需要我帮你订酒店吗？", pinyin: "Chūchāi jǐ tiān? Xūyào wǒ bāng nǐ dìng jiǔdiàn ma?", translationVi: "Đi mấy ngày? Cần tôi đặt khách sạn giúp không?" },
              { speaker: "A", line: "三天两晚，订一个离客户公司近的酒店。", pinyin: "Sān tiān liǎng wǎn, dìng yī gè lí kèhù gōngsī jìn de jiǔdiàn.", translationVi: "Ba ngày hai đêm, đặt khách sạn gần công ty khách hàng." },
              { speaker: "B", line: "好的，机票也帮你订好了。", pinyin: "Hǎo de, jīpiào yě bāng nǐ dìng hǎo le.", translationVi: "Được, vé máy bay cũng đặt cho bạn rồi." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "出差", pinyin: "chūchāi", meaning: "Đi công tác", meaningEn: "Business trip", type: "phrase", example: "他经常出差。", examplePinyin: "Tā jīngcháng chūchāi.", exampleVi: "Anh ấy thường đi công tác." },
          { hanzi: "机票", pinyin: "jīpiào", meaning: "Vé máy bay", meaningEn: "Plane ticket", type: "phrase", example: "帮我订一张机票。", examplePinyin: "Bāng wǒ dìng yī zhāng jīpiào.", exampleVi: "Đặt giúp tôi một vé máy bay." },
          { hanzi: "酒店", pinyin: "jiǔdiàn", meaning: "Khách sạn", meaningEn: "Hotel", type: "phrase", example: "酒店在哪里？", examplePinyin: "Jiǔdiàn zài nǎlǐ?", exampleVi: "Khách sạn ở đâu?" },
          { hanzi: "报销", pinyin: "bàoxiāo", meaning: "Hoàn trả chi phí", meaningEn: "Reimbursement", type: "phrase", example: "这个可以报销吗？", examplePinyin: "Zhège kěyǐ bàoxiāo ma?", exampleVi: "Cái này có thể hoàn trả không?" },
          { hanzi: "行程", pinyin: "xíngchéng", meaning: "Lịch trình", meaningEn: "Itinerary", type: "phrase", example: "发一下你的行程。", examplePinyin: "Fā yīxià nǐ de xíngchéng.", exampleVi: "Gửi lịch trình của bạn đi." },
        ],
        commonStructures: [
          {
            pattern: "帮 + Someone + Verb",
            patternPinyin: "Bāng + Someone + Verb",
            explanation: "Help someone do something",
            explanationVi: "Giúp ai đó làm gì",
            examples: [
              { zh: "帮我订一间房。", pinyin: "Bāng wǒ dìng yī jiān fáng.", vi: "Đặt giúp tôi một phòng." },
              { zh: "帮他买一张火车票。", pinyin: "Bāng tā mǎi yī zhāng huǒchē piào.", vi: "Mua giúp anh ấy một vé tàu." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Business Trip Report",
          titleVi: "Nghe: Báo cáo chuyến công tác",
          transcript: "这次去上海出差三天，拜访了两个客户。第一个客户对我们的产品很感兴趣，准备签合同。第二个客户需要再考虑一下。我住的酒店不错，离地铁站很近。",
          transcriptPinyin: "Zhè cì qù Shànghǎi chūchāi sān tiān, bàifǎng le liǎng gè kèhù. Dì yī gè kèhù duì wǒmen de chǎnpǐn hěn gǎn xìngqù, zhǔnbèi qiān hétong. Dì èr gè kèhù xūyào zài kǎolǜ yīxià. Wǒ zhù de jiǔdiàn búcuò, lí dìtiě zhàn hěn jìn.",
          questions: [
            { q: "How many days was the trip?", qVi: "Chuyến đi bao nhiêu ngày?", options: ["两天", "三天", "四天", "五天"], answer: 1 },
            { q: "How many clients were visited?", qVi: "Bao nhiêu khách hàng được thăm?", options: ["一个", "两个", "三个", "四个"], answer: 1 },
            { q: "What was the hotel like?", qVi: "Khách sạn thế nào?", options: ["很贵", "不错", "很远", "很小"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Describe a business trip experience",
          "Plan a work trip itinerary in Chinese",
          "Discuss hotel preferences when traveling for work",
          "Report on a client meeting",
        ],
      },

      // ──── Lesson 4: Job Interview ────
      {
        id: "cn-bz-04-interview",
        title: "Job Interview",
        titleVi: "Phỏng vấn Xin việc",
        titleZh: "求职面试",
        icon: "GraduationCap",
        description: "Prepare for Chinese job interviews: questions, answers, and etiquette",
        descriptionVi: "Chuẩn bị phỏng vấn xin việc bằng tiếng Trung: câu hỏi, trả lời và phép tắc",
        hskLevel: 4,
        badge: "面试达人",
        badgeVi: "Cao thủ Phỏng vấn",
        keySituations: [
          {
            title: "Self-Introduction in Interview",
            titleVi: "Tự giới thiệu trong phỏng vấn",
            description: "Impress with a structured self-introduction",
            descriptionVi: "Gây ấn tượng với phần tự giới thiệu có cấu trúc",
            culturalNote: "Chinese interviewers often ask about your 稳定性 (wěndìng xìng — stability). They value loyalty and long-term commitment. Hopping between jobs too frequently is viewed negatively.",
            culturalNoteVi: "Nhà tuyển dụng Trung Quốc thường hỏi về 稳定性 (sự ổn định). Họ đánh giá cao sự trung thành và cam kết lâu dài. Nhảy việc quá nhiều bị đánh giá tiêu cực.",
            sampleDialogue: [
              { speaker: "面试官", line: "请先自我介绍一下。", pinyin: "Qǐng xiān zìwǒ jièshào yíxià.", translationVi: "Xin hãy tự giới thiệu trước." },
              { speaker: "You", line: "您好！我叫阿明，越南人。我在北京大学读了MBA，之前在一家外贸公司工作了三年。", pinyin: "Nín hǎo! Wǒ jiào Ā Míng, Yuènán rén. Wǒ zài Běijīng Dàxué dú le MBA, zhīqián zài yī jiā wàimào gōngsī gōngzuò le sān nián.", translationVi: "Xin chào! Tôi tên Minh, người Việt Nam. Tôi học MBA tại Đại học Bắc Kinh, trước đó làm ở công ty ngoại thương 3 năm." },
              { speaker: "面试官", line: "你为什么想来我们公司？", pinyin: "Nǐ wèi shénme xiǎng lái wǒmen gōngsī?", translationVi: "Tại sao bạn muốn đến công ty chúng tôi?" },
              { speaker: "You", line: "因为贵公司在行业里很有影响力，我希望能在这里学到更多。", pinyin: "Yīnwèi guì gōngsī zài hángyè lǐ hěn yǒu yǐngxiǎng lì, wǒ xīwàng néng zài zhèlǐ xué dào gèng duō.", translationVi: "Vì quý công ty rất có ảnh hưởng trong ngành, tôi hy vọng có thể học hỏi nhiều hơn ở đây." },
            ],
          },
          {
            title: "Discussing Salary & Benefits",
            titleVi: "Thảo luận lương và phúc lợi",
            description: "Navigate salary negotiation professionally",
            descriptionVi: "Thương lượng lương một cách chuyên nghiệp",
            sampleDialogue: [
              { speaker: "面试官", line: "你的期望薪资是多少？", pinyin: "Nǐ de qīwàng xīnzī shì duōshao?", translationVi: "Mức lương mong muốn của bạn là bao nhiêu?" },
              { speaker: "You", line: "根据我的经验和能力，我期望月薪在一万五到两万之间。", pinyin: "Gēnjù wǒ de jīngyàn hé nénglì, wǒ qīwàng yuè xīn zài yī wàn wǔ dào liǎng wàn zhījiān.", translationVi: "Dựa trên kinh nghiệm và năng lực, tôi mong lương tháng từ 15 đến 20 ngàn." },
              { speaker: "面试官", line: "我们公司有五险一金，还有年终奖。", pinyin: "Wǒmen gōngsī yǒu wǔ xiǎn yī jīn, hái yǒu niánzhōng jiǎng.", translationVi: "Công ty chúng tôi có bảo hiểm xã hội và thưởng cuối năm." },
              { speaker: "You", line: "好的，请问有没有其他福利？", pinyin: "Hǎo de, qǐng wèn yǒu méi yǒu qítā fúlì?", translationVi: "Vâng, xin hỏi có phúc lợi nào khác không?" },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "面试", pinyin: "miànshì", meaning: "Phỏng vấn", meaningEn: "Interview", type: "phrase", example: "我明天有一个面试。", examplePinyin: "Wǒ míngtiān yǒu yí ge miànshì.", exampleVi: "Ngày mai tôi có một cuộc phỏng vấn." },
          { hanzi: "简历", pinyin: "jiǎnlì", meaning: "Hồ sơ xin việc/CV", meaningEn: "Resume / CV", type: "phrase", example: "请把简历发给我。", examplePinyin: "Qǐng bǎ jiǎnlì fā gěi wǒ.", exampleVi: "Xin gửi CV cho tôi." },
          { hanzi: "薪资", pinyin: "xīnzī", meaning: "Lương", meaningEn: "Salary", type: "phrase", example: "薪资面议。", examplePinyin: "Xīnzī miàn yì.", exampleVi: "Lương trao đổi khi phỏng vấn." },
          { hanzi: "五险一金", pinyin: "wǔ xiǎn yī jīn", meaning: "Bảo hiểm XH & Quỹ nhà ở", meaningEn: "Five insurances + housing fund", type: "expression", example: "公司交五险一金。", examplePinyin: "Gōngsī jiāo wǔ xiǎn yī jīn.", exampleVi: "Công ty đóng bảo hiểm xã hội và quỹ nhà ở." },
          { hanzi: "经验", pinyin: "jīngyàn", meaning: "Kinh nghiệm", meaningEn: "Experience", type: "phrase", example: "你有几年工作经验？", examplePinyin: "Nǐ yǒu jǐ nián gōngzuò jīngyàn?", exampleVi: "Bạn có mấy năm kinh nghiệm?" },
          { hanzi: "优势", pinyin: "yōushì", meaning: "Ưu thế/Điểm mạnh", meaningEn: "Advantage / Strength", type: "phrase", example: "你的优势是什么？", examplePinyin: "Nǐ de yōushì shì shénme?", exampleVi: "Điểm mạnh của bạn là gì?" },
        ],
        commonStructures: [
          {
            pattern: "根据..., 我...",
            patternPinyin: "Gēnjù..., wǒ...",
            explanation: "Based on..., I...",
            explanationVi: "Dựa trên..., tôi...",
            examples: [
              { zh: "根据市场行情，我期望月薪两万。", pinyin: "Gēnjù shìchǎng hángqíng, wǒ qīwàng yuè xīn liǎng wàn.", vi: "Dựa trên thị trường, tôi mong lương tháng 20 ngàn." },
            ],
          },
          {
            pattern: "因为...，所以...",
            patternPinyin: "Yīnwèi..., suǒyǐ...",
            explanation: "Because..., therefore...",
            explanationVi: "Vì..., cho nên...",
            examples: [
              { zh: "因为我有三年经验，所以我对这个职位很有信心。", pinyin: "Yīnwèi wǒ yǒu sān nián jīngyàn, suǒyǐ wǒ duì zhège zhíwèi hěn yǒu xìnxīn.", vi: "Vì tôi có 3 năm kinh nghiệm, nên tôi rất tự tin với vị trí này." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Job Interview",
          titleVi: "Nghe: Phỏng vấn xin việc",
          transcript: "面试官问他有几年经验。他说有五年，之前在一家互联网公司做产品经理。面试官又问他的优势是什么。他说他很擅长团队合作，而且会说三种语言。最后面试官说下周通知结果。",
          transcriptPinyin: "Miànshì guān wèn tā yǒu jǐ nián jīngyàn. Tā shuō yǒu wǔ nián, zhīqián zài yī jiā hùliánwǎng gōngsī zuò chǎnpǐn jīnglǐ. Miànshì guān yòu wèn tā de yōushì shì shénme. Tā shuō tā hěn shàncháng tuánduì hézuò, érqiě huì shuō sān zhǒng yǔyán. Zuìhòu miànshì guān shuō xià zhōu tōngzhī jiéguǒ.",
          questions: [
            { q: "How many years of experience?", qVi: "Bao nhiêu năm kinh nghiệm?", options: ["3年", "4年", "5年", "6年"], answer: 2 },
            { q: "Previous job role?", qVi: "Vị trí công việc trước?", options: ["销售经理", "产品经理", "人事经理", "技术总监"], answer: 1 },
            { q: "When will results be announced?", qVi: "Khi nào thông báo kết quả?", options: ["明天", "这周", "下周", "下个月"], answer: 2 },
          ],
        },
        speakingTopics: [
          "Introduce yourself for a job interview in Chinese",
          "Discuss your strengths and weaknesses",
          "Negotiate salary and benefits",
          "Ask questions about company culture",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PILLAR 3: ADVANCED SOCIALIZING (社交进阶)
  // ═══════════════════════════════════════════
  {
    id: "social",
    title: "Advanced Socializing",
    titleVi: "Giao tiếp Xã hội nâng cao",
    titleZh: "社交进阶",
    icon: "MessageCircle",
    color: "from-purple-500 to-pink-500",
    description: "Express opinions, discuss hobbies, and use modern slang naturally",
    descriptionVi: "Bày tỏ quan điểm, thảo luận sở thích và sử dụng tiếng lóng hiện đại",
    lessons: [
      // ──── Lesson 1: Hobbies & Interests ────
      {
        id: "cn-sc-01-hobbies",
        title: "Hobbies & Interests",
        titleVi: "Sở thích & Thú vui",
        titleZh: "爱好",
        icon: "Heart",
        description: "Talk about hobbies, sports, entertainment, and free time activities",
        descriptionVi: "Nói về sở thích, thể thao, giải trí và hoạt động thời gian rảnh",
        hskLevel: 2,
        badge: "兴趣达人",
        badgeVi: "Bậc thầy Sở thích",
        keySituations: [
          {
            title: "Discussing Hobbies",
            titleVi: "Thảo luận sở thích",
            description: "Share what you like to do in your free time",
            descriptionVi: "Chia sẻ bạn thích làm gì khi rảnh",
            sampleDialogue: [
              { speaker: "A", line: "你平时有什么爱好？", pinyin: "Nǐ píngshí yǒu shénme àihào?", translationVi: "Bạn thường có sở thích gì?" },
              { speaker: "B", line: "我喜欢打篮球和看电影。你呢？", pinyin: "Wǒ xǐhuan dǎ lánqiú hé kàn diànyǐng. Nǐ ne?", translationVi: "Tôi thích chơi bóng rổ và xem phim. Còn bạn?" },
              { speaker: "A", line: "我喜欢弹吉他，周末还会去爬山。", pinyin: "Wǒ xǐhuan tán jítā, zhōumò hái huì qù pá shān.", translationVi: "Tôi thích chơi guitar, cuối tuần còn đi leo núi." },
              { speaker: "B", line: "太酷了！下次一起去爬山吧！", pinyin: "Tài kù le! Xià cì yīqǐ qù pá shān ba!", translationVi: "Tuyệt quá! Lần sau cùng đi leo núi nhé!" },
            ],
          },
          {
            title: "Making Plans with Friends",
            titleVi: "Lên kế hoạch với bạn bè",
            description: "Invite friends and make weekend plans",
            descriptionVi: "Rủ bạn bè và lên kế hoạch cuối tuần",
            sampleDialogue: [
              { speaker: "A", line: "这个周末有空吗？想不想一起去看电影？", pinyin: "Zhège zhōumò yǒu kòng ma? Xiǎng bu xiǎng yīqǐ qù kàn diànyǐng?", translationVi: "Cuối tuần này rảnh không? Muốn đi xem phim cùng không?" },
              { speaker: "B", line: "周六可以。看什么电影？", pinyin: "Zhōu liù kěyǐ. Kàn shénme diànyǐng?", translationVi: "Thứ Bảy được. Xem phim gì?" },
              { speaker: "A", line: "听说新出的那部科幻片很好看。下午两点的场次怎么样？", pinyin: "Tīng shuō xīn chū de nà bù kēhuàn piān hěn hǎokàn. Xiàwǔ liǎng diǎn de chǎng cì zěnmeyàng?", translationVi: "Nghe nói phim khoa học viễn tưởng mới ra rất hay. Suất chiếu 2 giờ chiều được không?" },
              { speaker: "B", line: "没问题！看完电影我们去吃火锅吧。", pinyin: "Méi wèntí! Kàn wán diànyǐng wǒmen qù chī huǒguō ba.", translationVi: "Không vấn đề! Xem phim xong đi ăn lẩu nhé." },
              { speaker: "A", line: "好主意！那我先买票。", pinyin: "Hǎo zhǔyi! Nà wǒ xiān mǎi piào.", translationVi: "Ý hay! Vậy tôi mua vé trước." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "爱好", pinyin: "àihào", meaning: "Sở thích", meaningEn: "Hobby", type: "phrase", example: "你的爱好是什么？", examplePinyin: "Nǐ de àihào shì shénme?", exampleVi: "Sở thích của bạn là gì?" },
          { hanzi: "运动", pinyin: "yùndòng", meaning: "Thể thao/Vận động", meaningEn: "Sports / Exercise", type: "phrase", example: "我每天都运动。", examplePinyin: "Wǒ měi tiān dōu yùndòng.", exampleVi: "Tôi tập thể dục mỗi ngày." },
          { hanzi: "追剧", pinyin: "zhuī jù", meaning: "Xem phim dài tập", meaningEn: "Binge-watch dramas", type: "slang", example: "最近在追一部韩剧。", examplePinyin: "Zuìjìn zài zhuī yī bù Hán jù.", exampleVi: "Gần đây đang xem một phim Hàn." },
          { hanzi: "刷手机", pinyin: "shuā shǒujī", meaning: "Lướt điện thoại", meaningEn: "Scroll through phone", type: "slang", example: "别一直刷手机了！", examplePinyin: "Bié yīzhí shuā shǒujī le!", exampleVi: "Đừng lướt điện thoại nữa!" },
          { hanzi: "旅游", pinyin: "lǚyóu", meaning: "Du lịch", meaningEn: "To travel / tourism", type: "phrase", example: "我很喜欢旅游。", examplePinyin: "Wǒ hěn xǐhuan lǚyóu.", exampleVi: "Tôi rất thích du lịch." },
          { hanzi: "打卡", pinyin: "dǎ kǎ", meaning: "Check-in (mạng xã hội)", meaningEn: "Check in (social media)", type: "slang", example: "我去网红店打卡了。", examplePinyin: "Wǒ qù wǎnghóng diàn dǎ kǎ le.", exampleVi: "Tôi đi check-in quán nổi tiếng rồi." },
          { hanzi: "有空", pinyin: "yǒu kòng", meaning: "Có rảnh", meaningEn: "Free / Available", type: "phrase", example: "你明天有空吗？", examplePinyin: "Nǐ míngtiān yǒu kòng ma?", exampleVi: "Ngày mai bạn rảnh không?" },
          { hanzi: "约", pinyin: "yuē", meaning: "Hẹn/Rủ", meaningEn: "To make plans / meet up", type: "phrase", example: "周末约出来玩吧。", examplePinyin: "Zhōumò yuē chūlái wán ba.", exampleVi: "Cuối tuần hẹn ra chơi nhé." },
        ],
        commonStructures: [
          {
            pattern: "我喜欢 + Verb + 也喜欢 + Verb",
            patternPinyin: "Wǒ xǐhuan + V + yě xǐhuan + V",
            explanation: "I like... and also like...",
            explanationVi: "Tôi thích... và cũng thích...",
            examples: [
              { zh: "我喜欢游泳，也喜欢跑步。", pinyin: "Wǒ xǐhuan yóuyǒng, yě xǐhuan pǎobù.", vi: "Tôi thích bơi và cũng thích chạy bộ." },
            ],
          },
          {
            pattern: "想不想 + Verb？",
            patternPinyin: "Xiǎng bu xiǎng + Verb?",
            explanation: "Would you like to...? (casual invitation)",
            explanationVi: "Bạn có muốn... không? (mời rủ nhẹ nhàng)",
            examples: [
              { zh: "想不想一起去吃饭？", pinyin: "Xiǎng bu xiǎng yīqǐ qù chī fàn?", vi: "Có muốn đi ăn cùng không?" },
              { zh: "想不想下周去爬山？", pinyin: "Xiǎng bu xiǎng xià zhōu qù pá shān?", vi: "Có muốn tuần sau đi leo núi không?" },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Weekend Plans",
          titleVi: "Nghe: Kế hoạch cuối tuần",
          transcript: "这个周末我想去看一场电影，听说新出的那部科幻片很好看。看完电影以后，我们可以去吃火锅。晚上我还想去KTV唱歌。你要不要一起来？",
          transcriptPinyin: "Zhège zhōumò wǒ xiǎng qù kàn yī chǎng diànyǐng, tīng shuō xīn chū de nà bù kēhuàn piān hěn hǎokàn. Kàn wán diànyǐng yǐhòu, wǒmen kěyǐ qù chī huǒguō. Wǎnshang wǒ hái xiǎng qù KTV chàng gē. Nǐ yào bu yào yīqǐ lái?",
          questions: [
            { q: "What type of movie?", qVi: "Thể loại phim gì?", options: ["喜剧片", "科幻片", "恐怖片", "爱情片"], answer: 1 },
            { q: "What to eat after the movie?", qVi: "Ăn gì sau phim?", options: ["烧烤", "火锅", "日本料理", "西餐"], answer: 1 },
            { q: "Evening activity?", qVi: "Hoạt động buổi tối?", options: ["打游戏", "看书", "唱歌", "运动"], answer: 2 },
          ],
        },
        speakingTopics: [
          "Describe your weekend hobbies",
          "Invite a friend to do an activity together",
          "Compare hobbies in your country vs China",
          "Plan a fun day out with friends",
        ],
      },

      // ──── Lesson 2: Expressing Opinions ────
      {
        id: "cn-sc-02-opinions",
        title: "Expressing Opinions",
        titleVi: "Bày tỏ Quan điểm",
        titleZh: "表达意见",
        icon: "Lightbulb",
        description: "Share your thoughts, agree/disagree, and debate topics politely",
        descriptionVi: "Chia sẻ suy nghĩ, đồng ý/không đồng ý và tranh luận lịch sự",
        hskLevel: 3,
        badge: "辩论家",
        badgeVi: "Nhà Tranh biện",
        keySituations: [
          {
            title: "Sharing Your Opinion",
            titleVi: "Chia sẻ quan điểm",
            description: "Express agreement, disagreement, and nuanced views",
            descriptionVi: "Bày tỏ đồng ý, không đồng ý và quan điểm tinh tế",
            culturalNote: "Chinese culture values harmony (和谐 héxié). When disagreeing, use softer expressions like '我觉得不一定' (I don't think necessarily) instead of blunt disagreement.",
            culturalNoteVi: "Văn hóa Trung Quốc coi trọng sự hài hòa (和谐). Khi không đồng ý, dùng cách nói nhẹ nhàng hơn thay vì phản đối trực tiếp.",
            sampleDialogue: [
              { speaker: "A", line: "你觉得学中文难不难？", pinyin: "Nǐ juéde xué Zhōngwén nán bu nán?", translationVi: "Bạn thấy học tiếng Trung có khó không?" },
              { speaker: "B", line: "我觉得发音比较难，但是语法其实没那么复杂。", pinyin: "Wǒ juéde fāyīn bǐjiào nán, dànshì yǔfǎ qíshí méi nàme fùzá.", translationVi: "Tôi thấy phát âm khá khó, nhưng ngữ pháp thực ra không phức tạp lắm." },
              { speaker: "A", line: "我不太同意。我觉得汉字最难。", pinyin: "Wǒ bú tài tóngyì. Wǒ juéde Hànzì zuì nán.", translationVi: "Tôi không đồng ý lắm. Tôi thấy chữ Hán khó nhất." },
              { speaker: "B", line: "你说的也有道理。每个人的感觉不一样。", pinyin: "Nǐ shuō de yě yǒu dàolǐ. Měi ge rén de gǎnjué bù yīyàng.", translationVi: "Bạn nói cũng có lý. Mỗi người cảm nhận khác nhau." },
            ],
          },
          {
            title: "Debating a Topic",
            titleVi: "Tranh luận một chủ đề",
            description: "Discuss pros and cons of a topic",
            descriptionVi: "Thảo luận ưu nhược điểm của một chủ đề",
            sampleDialogue: [
              { speaker: "A", line: "你觉得住在大城市好还是小城市好？", pinyin: "Nǐ juéde zhù zài dà chéngshì hǎo háishi xiǎo chéngshì hǎo?", translationVi: "Bạn thấy sống ở thành phố lớn hay nhỏ tốt hơn?" },
              { speaker: "B", line: "我觉得大城市好。工作机会多，生活丰富。", pinyin: "Wǒ juéde dà chéngshì hǎo. Gōngzuò jīhuì duō, shēnghuó fēngfù.", translationVi: "Tôi thấy thành phố lớn tốt hơn. Cơ hội việc làm nhiều, cuộc sống phong phú." },
              { speaker: "A", line: "但是大城市房价太高了，而且压力很大。", pinyin: "Dànshì dà chéngshì fángjià tài gāo le, érqiě yālì hěn dà.", translationVi: "Nhưng giá nhà ở thành phố lớn quá cao, mà áp lực cũng lớn." },
              { speaker: "B", line: "这倒是。不过年轻的时候在大城市闯一闯还是值得的。", pinyin: "Zhè dào shì. Búguò niánqīng de shíhou zài dà chéngshì chuǎng yī chuǎng háishi zhídé de.", translationVi: "Đúng thế. Nhưng lúc trẻ ra thành phố lớn phấn đấu vẫn đáng giá." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "觉得", pinyin: "juéde", meaning: "Cho rằng/Cảm thấy", meaningEn: "To think / feel", type: "phrase", example: "我觉得这个主意很好。", examplePinyin: "Wǒ juéde zhège zhǔyi hěn hǎo.", exampleVi: "Tôi cho rằng ý kiến này rất hay." },
          { hanzi: "有道理", pinyin: "yǒu dàolǐ", meaning: "Có lý", meaningEn: "Makes sense / reasonable", type: "expression", example: "你说的有道理。", examplePinyin: "Nǐ shuō de yǒu dàolǐ.", exampleVi: "Bạn nói có lý." },
          { hanzi: "不一定", pinyin: "bù yīdìng", meaning: "Chưa chắc", meaningEn: "Not necessarily", type: "expression", example: "我觉得不一定是这样。", examplePinyin: "Wǒ juéde bù yīdìng shì zhèyàng.", exampleVi: "Tôi cho rằng chưa chắc là như vậy." },
          { hanzi: "其实", pinyin: "qíshí", meaning: "Thực ra", meaningEn: "Actually / in fact", type: "expression", example: "其实我不太喜欢吃辣。", examplePinyin: "Qíshí wǒ bú tài xǐhuan chī là.", exampleVi: "Thực ra tôi không thích ăn cay lắm." },
          { hanzi: "不好意思", pinyin: "bù hǎo yìsi", meaning: "Ngại quá / Xin lỗi", meaningEn: "Embarrassed / Sorry", type: "expression", example: "不好意思，我迟到了。", examplePinyin: "Bù hǎo yìsi, wǒ chí dào le.", exampleVi: "Xin lỗi, tôi đến trễ." },
          { hanzi: "和谐", pinyin: "héxié", meaning: "Hài hòa", meaningEn: "Harmony / harmonious", type: "phrase", example: "中国文化很重视和谐。", examplePinyin: "Zhōngguó wénhuà hěn zhòngshì héxié.", exampleVi: "Văn hóa Trung Quốc rất coi trọng sự hài hòa." },
          { hanzi: "压力", pinyin: "yālì", meaning: "Áp lực", meaningEn: "Pressure / Stress", type: "phrase", example: "工作压力很大。", examplePinyin: "Gōngzuò yālì hěn dà.", exampleVi: "Áp lực công việc rất lớn." },
          { hanzi: "值得", pinyin: "zhídé", meaning: "Đáng giá", meaningEn: "Worth it", type: "phrase", example: "这趟旅行很值得。", examplePinyin: "Zhè tàng lǚxíng hěn zhídé.", exampleVi: "Chuyến đi này rất đáng giá." },
        ],
        commonStructures: [
          {
            pattern: "我觉得...，但是...",
            patternPinyin: "Wǒ juéde..., dànshì...",
            explanation: "I think..., but...",
            explanationVi: "Tôi cho rằng..., nhưng...",
            examples: [
              { zh: "我觉得学中文很有趣，但是汉字很难写。", pinyin: "Wǒ juéde xué Zhōngwén hěn yǒuqù, dànshì Hànzì hěn nán xiě.", vi: "Tôi cho rằng học tiếng Trung rất thú vị, nhưng chữ Hán rất khó viết." },
            ],
          },
          {
            pattern: "...还是...(好)？",
            patternPinyin: "...háishi...(hǎo)?",
            explanation: "...or...? (choosing between two options)",
            explanationVi: "...hay...? (chọn giữa hai phương án)",
            examples: [
              { zh: "吃中餐还是西餐好？", pinyin: "Chī Zhōngcān háishi xīcān hǎo?", vi: "Ăn đồ Trung hay đồ Tây?" },
              { zh: "住城市还是住农村好？", pinyin: "Zhù chéngshì háishi zhù nóngcūn hǎo?", vi: "Sống ở thành phố hay nông thôn?" },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: A Debate Among Friends",
          titleVi: "Nghe: Cuộc tranh luận giữa bạn bè",
          transcript: "小李觉得在大城市生活比较好，因为机会多。但是小张不同意，他觉得小城市的生活质量更高，空气好，压力小。最后他们都同意，每个人的选择不一样，最重要的是开心。",
          transcriptPinyin: "Xiǎo Lǐ juéde zài dà chéngshì shēnghuó bǐjiào hǎo, yīnwèi jīhuì duō. Dànshì Xiǎo Zhāng bù tóngyì, tā juéde xiǎo chéngshì de shēnghuó zhìliàng gèng gāo, kōngqì hǎo, yālì xiǎo. Zuìhòu tāmen dōu tóngyì, měi ge rén de xuǎnzé bù yīyàng, zuì zhòngyào de shì kāixīn.",
          questions: [
            { q: "Why does Xiao Li prefer big cities?", qVi: "Tại sao Tiểu Lý thích thành phố lớn?", options: ["空气好", "机会多", "房价低", "朋友多"], answer: 1 },
            { q: "What does Xiao Zhang think?", qVi: "Tiểu Trương nghĩ gì?", options: ["大城市更好", "小城市生活质量高", "都一样", "应该出国"], answer: 1 },
            { q: "What do they agree on?", qVi: "Họ đồng ý điều gì?", options: ["大城市好", "小城市好", "开心最重要", "钱最重要"], answer: 2 },
          ],
        },
        speakingTopics: [
          "Debate: Is learning Chinese harder than English?",
          "Share your opinion on social media culture",
          "Discuss advantages of city vs countryside living",
          "Express your views on work-life balance",
        ],
      },

      // ──── Lesson 3: Modern Slang & Internet Expressions ────
      {
        id: "cn-sc-03-slang",
        title: "Modern Slang & Internet Expressions",
        titleVi: "Tiếng lóng & Ngôn ngữ Mạng",
        titleZh: "网络热词",
        icon: "Zap",
        description: "Master popular internet slang, memes, and trendy expressions used by young Chinese",
        descriptionVi: "Thành thạo tiếng lóng mạng, meme và cách nói thời thượng của giới trẻ Trung Quốc",
        hskLevel: 3,
        badge: "网络达人",
        badgeVi: "Chuyên gia Mạng",
        keySituations: [
          {
            title: "Chatting Online",
            titleVi: "Chat online",
            description: "Use slang naturally in text messages and social media",
            descriptionVi: "Sử dụng tiếng lóng tự nhiên trong tin nhắn và mạng xã hội",
            culturalNote: "Chinese internet culture is incredibly creative with language. Numbers are often used as homophones: 666 (liù liù liù) = awesome, 520 (wǔ èr líng) = I love you, 88 (bā bā) = bye bye.",
            culturalNoteVi: "Văn hóa mạng Trung Quốc cực kỳ sáng tạo với ngôn ngữ. Số thường được dùng thay chữ: 666 = tuyệt vời, 520 = yêu bạn, 88 = tạm biệt.",
            sampleDialogue: [
              { speaker: "A", line: "今天的考试怎么样？", pinyin: "Jīntiān de kǎoshì zěnmeyàng?", translationVi: "Thi hôm nay thế nào?" },
              { speaker: "B", line: "OMG，太难了！我觉得我要凉凉了。😭", pinyin: "OMG, tài nán le! Wǒ juéde wǒ yào liáng liáng le.", translationVi: "OMG, khó quá! Tôi thấy mình xong đời rồi. 😭" },
              { speaker: "A", line: "别担心啦，你太卷了，肯定没问题的。", pinyin: "Bié dānxīn la, nǐ tài juǎn le, kěndìng méi wèntí de.", translationVi: "Đừng lo, bạn chăm chỉ quá, chắc chắn không sao đâu." },
              { speaker: "B", line: "哈哈，希望吧。今晚一起吃鸡？", pinyin: "Hāhā, xīwàng ba. Jīn wǎn yīqǐ chī jī?", translationVi: "Haha, hy vọng vậy. Tối nay cùng chơi PUBG không?" },
              { speaker: "A", line: "冲！88～", pinyin: "Chōng! Bā bā~", translationVi: "Xông! Bye bye~" },
            ],
          },
          {
            title: "Understanding Douyin/Weibo Trends",
            titleVi: "Hiểu xu hướng Douyin/Weibo",
            description: "Discuss trending topics and viral content",
            descriptionVi: "Thảo luận chủ đề thịnh hành và nội dung viral",
            sampleDialogue: [
              { speaker: "A", line: "你看了昨天抖音上那个视频吗？太搞笑了！", pinyin: "Nǐ kàn le zuótiān Dǒuyīn shàng nàge shìpín ma? Tài gǎoxiào le!", translationVi: "Bạn xem video trên Douyin hôm qua chưa? Buồn cười quá!" },
              { speaker: "B", line: "哪个？发给我看看。", pinyin: "Nǎ ge? Fā gěi wǒ kànkan.", translationVi: "Video nào? Gửi cho tôi xem." },
              { speaker: "A", line: "就是那个'挖呀挖'的。已经被转发了几百万次。", pinyin: "Jiù shì nàge 'wā ya wā' de. Yǐjīng bèi zhuǎn fā le jǐ bǎi wàn cì.", translationVi: "Cái video 'đào đào đào' đó. Đã được chia sẻ hàng triệu lần." },
              { speaker: "B", line: "哈哈，我看到了！评论区太好笑了，全是造梗的。", pinyin: "Hāhā, wǒ kàn dào le! Pínglùn qū tài hǎo xiào le, quán shì zào gěng de.", translationVi: "Haha, tôi thấy rồi! Phần bình luận buồn cười quá, toàn tạo meme." },
            ],
          },
          {
            title: "Dating App Conversation",
            titleVi: "Chat trên app hẹn hò",
            description: "Modern dating vocabulary and expressions",
            descriptionVi: "Từ vựng và cách nói hẹn hò hiện đại",
            culturalNote: "Popular dating apps in China: 探探 (Tàntàn, like Tinder), 陌陌 (Mòmò). Chinese dating culture often involves parents' approval. '相亲' (xiāngqīn — arranged dating) is still common for adults over 25.",
            culturalNoteVi: "App hẹn hò phổ biến ở Trung Quốc: 探探 (như Tinder), 陌陌. Văn hóa hẹn hò Trung Quốc thường cần sự đồng ý của bố mẹ. '相亲' (mai mối) vẫn phổ biến cho người trên 25 tuổi.",
            sampleDialogue: [
              { speaker: "A", line: "你是做什么工作的？看你的照片，好像很喜欢旅游。", pinyin: "Nǐ shì zuò shénme gōngzuò de? Kàn nǐ de zhàopiàn, hǎoxiàng hěn xǐhuan lǚyóu.", translationVi: "Bạn làm nghề gì? Nhìn ảnh bạn có vẻ rất thích du lịch." },
              { speaker: "B", line: "我是程序员。对，我超喜欢旅游！你呢？", pinyin: "Wǒ shì chéngxùyuán. Duì, wǒ chāo xǐhuan lǚyóu! Nǐ ne?", translationVi: "Tôi là lập trình viên. Đúng vậy, tôi siêu thích du lịch! Còn bạn?" },
              { speaker: "A", line: "我也是！那我们有空一起出去玩吧？", pinyin: "Wǒ yě shì! Nà wǒmen yǒu kòng yīqǐ chūqù wán ba?", translationVi: "Tôi cũng vậy! Vậy rảnh mình cùng đi chơi nhé?" },
              { speaker: "B", line: "好啊！加个微信吧。", pinyin: "Hǎo a! Jiā ge Wēixìn ba.", translationVi: "Được! Kết bạn WeChat nhé." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "666", pinyin: "liù liù liù", meaning: "Tuyệt vời / Quá đỉnh", meaningEn: "Awesome / Amazing", type: "slang", example: "你打游戏太666了！", examplePinyin: "Nǐ dǎ yóuxì tài liù liù liù le!", exampleVi: "Bạn chơi game đỉnh quá!" },
          { hanzi: "内卷", pinyin: "nèi juǎn", meaning: "Cạnh tranh khốc liệt", meaningEn: "Rat race / involution", type: "slang", example: "现在的工作太内卷了。", examplePinyin: "Xiànzài de gōngzuò tài nèi juǎn le.", exampleVi: "Công việc bây giờ cạnh tranh quá khốc liệt." },
          { hanzi: "摆烂", pinyin: "bǎi làn", meaning: "Mặc kệ / Bỏ cuộc", meaningEn: "Give up / let it rot", type: "slang", example: "考试太难了，我要摆烂了。", examplePinyin: "Kǎoshì tài nán le, wǒ yào bǎi làn le.", exampleVi: "Thi khó quá, tôi bỏ cuộc rồi." },
          { hanzi: "凉凉", pinyin: "liáng liáng", meaning: "Xong đời / Tiêu rồi", meaningEn: "It's over / doomed", type: "slang", example: "我的手机掉水里了，凉凉。", examplePinyin: "Wǒ de shǒujī diào shuǐ lǐ le, liáng liáng.", exampleVi: "Điện thoại rơi xuống nước, xong đời." },
          { hanzi: "冲", pinyin: "chōng", meaning: "Xông / Lên thôi!", meaningEn: "Let's go! / Charge!", type: "slang", example: "明天考试，冲！", examplePinyin: "Míngtiān kǎoshì, chōng!", exampleVi: "Ngày mai thi, xông lên!" },
          { hanzi: "吃鸡", pinyin: "chī jī", meaning: "Chơi game sinh tồn", meaningEn: "Play battle royale (PUBG)", type: "slang", example: "今晚一起吃鸡吗？", examplePinyin: "Jīn wǎn yīqǐ chī jī ma?", exampleVi: "Tối nay cùng chơi PUBG không?" },
          { hanzi: "造梗", pinyin: "zào gěng", meaning: "Tạo meme/nói dí dỏm", meaningEn: "Create memes / make jokes", type: "slang", example: "他很会造梗。", examplePinyin: "Tā hěn huì zào gěng.", exampleVi: "Anh ấy rất giỏi tạo meme." },
          { hanzi: "转发", pinyin: "zhuǎn fā", meaning: "Chia sẻ/Repost", meaningEn: "Repost / Share", type: "phrase", example: "这个视频被转发了一百万次。", examplePinyin: "Zhège shìpín bèi zhuǎn fā le yī bǎi wàn cì.", exampleVi: "Video này được chia sẻ 1 triệu lần." },
        ],
        commonStructures: [
          {
            pattern: "太...了吧！",
            patternPinyin: "Tài... le ba!",
            explanation: "Emphatic exclamation (slang tone)",
            explanationVi: "Câu cảm thán nhấn mạnh (giọng tiếng lóng)",
            examples: [
              { zh: "这也太好看了吧！", pinyin: "Zhè yě tài hǎokàn le ba!", vi: "Cái này cũng đẹp quá đi!" },
              { zh: "你也太强了吧！", pinyin: "Nǐ yě tài qiáng le ba!", vi: "Bạn cũng giỏi quá đi!" },
            ],
          },
          {
            pattern: "好像 + Verb/Adj",
            patternPinyin: "Hǎoxiàng + Verb/Adj",
            explanation: "It seems like... / looks like...",
            explanationVi: "Có vẻ như... / trông giống...",
            examples: [
              { zh: "你好像很喜欢旅游。", pinyin: "Nǐ hǎoxiàng hěn xǐhuan lǚyóu.", vi: "Trông bạn có vẻ rất thích du lịch." },
              { zh: "好像要下雨了。", pinyin: "Hǎoxiàng yào xià yǔ le.", vi: "Có vẻ sắp mưa." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Friends Chatting About Trends",
          titleVi: "Nghe: Bạn bè nói về xu hướng",
          transcript: "最近抖音上有一个特别火的视频，一个小姐姐跳舞跳得太好了，大家都在说666。但是下面有人说这是内卷，学跳舞也这么卷。哈哈，现在什么都卷。",
          transcriptPinyin: "Zuìjìn Dǒuyīn shàng yǒu yí ge tèbié huǒ de shìpín, yí ge xiǎojiějie tiào wǔ tiào de tài hǎo le, dàjiā dōu zài shuō liù liù liù. Dànshì xiàmiàn yǒu rén shuō zhè shì nèi juǎn, xué tiào wǔ yě zhème juǎn. Hāhā, xiànzài shénme dōu juǎn.",
          questions: [
            { q: "What platform is mentioned?", qVi: "Nền tảng nào được đề cập?", options: ["微博", "抖音", "微信", "小红书"], answer: 1 },
            { q: "What does 666 mean here?", qVi: "666 nghĩa là gì ở đây?", options: ["不好", "一般", "很棒", "很难"], answer: 2 },
            { q: "What do comments say about 内卷?", qVi: "Bình luận nói gì về 内卷?", options: ["跳舞不好", "现在什么都卷", "不喜欢", "太简单"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Explain popular Chinese internet slang to a foreigner",
          "Discuss your favorite social media platform in Chinese",
          "Talk about the 内卷 (rat race) culture",
          "Describe a viral trend you saw recently",
        ],
      },

      // ──── Lesson 4: Chinese Festivals & Traditions ────
      {
        id: "cn-sc-04-festivals",
        title: "Festivals & Traditions",
        titleVi: "Lễ hội & Phong tục",
        titleZh: "节日文化",
        icon: "PartyPopper",
        description: "Talk about Chinese holidays, festivals, and cultural traditions",
        descriptionVi: "Nói về ngày lễ, lễ hội và phong tục văn hóa Trung Quốc",
        hskLevel: 3,
        badge: "文化通",
        badgeVi: "Thông thạo Văn hóa",
        keySituations: [
          {
            title: "Celebrating Spring Festival",
            titleVi: "Đón Tết Nguyên đán",
            description: "Discuss Chinese New Year customs and greetings",
            descriptionVi: "Thảo luận phong tục và lời chúc Tết Nguyên đán",
            culturalNote: "春节 (Chūnjié — Spring Festival) is the most important holiday. Families gather for 年夜饭 (niányè fàn — New Year's Eve dinner). Red envelopes (红包 hóngbāo) with money are given to children and unmarried adults.",
            culturalNoteVi: "春节 (Tết Nguyên đán) là ngày lễ quan trọng nhất. Gia đình sum họp ăn 年夜饭 (bữa cơm tất niên). 红包 (lì xì) được tặng cho trẻ em và người chưa kết hôn.",
            sampleDialogue: [
              { speaker: "A", line: "新年快乐！恭喜发财！", pinyin: "Xīn nián kuài lè! Gōngxǐ fā cái!", translationVi: "Chúc mừng năm mới! Cung hỷ phát tài!" },
              { speaker: "B", line: "新年快乐！你回家过年吗？", pinyin: "Xīn nián kuài lè! Nǐ huí jiā guò nián ma?", translationVi: "Chúc mừng năm mới! Bạn về nhà ăn Tết không?" },
              { speaker: "A", line: "回，我已经买好火车票了。你呢？", pinyin: "Huí, wǒ yǐjīng mǎi hǎo huǒchē piào le. Nǐ ne?", translationVi: "Có, tôi mua vé tàu rồi. Còn bạn?" },
              { speaker: "B", line: "我今年不回去了，太远了。和朋友一起吃年夜饭。", pinyin: "Wǒ jīnnián bú huíqù le, tài yuǎn le. Hé péngyǒu yīqǐ chī niányè fàn.", translationVi: "Năm nay tôi không về, xa quá. Ăn cơm tất niên với bạn bè." },
              { speaker: "A", line: "那也不错！别忘了看春晚！", pinyin: "Nà yě búcuò! Bié wàng le kàn Chūn Wǎn!", translationVi: "Vậy cũng tốt! Đừng quên xem Gala Xuân!" },
            ],
          },
          {
            title: "Mid-Autumn Festival",
            titleVi: "Tết Trung thu",
            description: "Mooncakes, family gatherings, and moon gazing",
            descriptionVi: "Bánh trung thu, sum họp gia đình và ngắm trăng",
            sampleDialogue: [
              { speaker: "A", line: "中秋节快乐！你吃月饼了吗？", pinyin: "Zhōngqiū Jié kuài lè! Nǐ chī yuèbǐng le ma?", translationVi: "Tết Trung thu vui vẻ! Bạn ăn bánh trung thu chưa?" },
              { speaker: "B", line: "吃了！我最喜欢吃五仁的。你喜欢什么馅的？", pinyin: "Chī le! Wǒ zuì xǐhuan chī wǔ rén de. Nǐ xǐhuan shénme xiàn de?", translationVi: "Ăn rồi! Tôi thích nhất nhân ngũ nhân. Bạn thích nhân gì?" },
              { speaker: "A", line: "我喜欢蛋黄莲蓉的。今晚一起去赏月吧！", pinyin: "Wǒ xǐhuan dàn huáng lián róng de. Jīn wǎn yīqǐ qù shǎng yuè ba!", translationVi: "Tôi thích nhân trứng muối sen. Tối nay cùng ngắm trăng nhé!" },
              { speaker: "B", line: "好啊！月亮应该很圆很亮。", pinyin: "Hǎo a! Yuèliang yīnggāi hěn yuán hěn liàng.", translationVi: "Được! Trăng chắc rất tròn và sáng." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "春节", pinyin: "Chūnjié", meaning: "Tết Nguyên đán", meaningEn: "Spring Festival / Chinese New Year", type: "phrase", example: "春节是中国最重要的节日。", examplePinyin: "Chūnjié shì Zhōngguó zuì zhòngyào de jiérì.", exampleVi: "Tết Nguyên đán là ngày lễ quan trọng nhất ở Trung Quốc." },
          { hanzi: "红包", pinyin: "hóngbāo", meaning: "Lì xì / Bao lì xì", meaningEn: "Red envelope (with money)", type: "phrase", example: "过年要发红包。", examplePinyin: "Guò nián yào fā hóngbāo.", exampleVi: "Tết phải phát lì xì." },
          { hanzi: "月饼", pinyin: "yuèbǐng", meaning: "Bánh trung thu", meaningEn: "Mooncake", type: "phrase", example: "中秋节要吃月饼。", examplePinyin: "Zhōngqiū Jié yào chī yuèbǐng.", exampleVi: "Tết Trung thu phải ăn bánh trung thu." },
          { hanzi: "团圆", pinyin: "tuányuán", meaning: "Đoàn tụ", meaningEn: "Reunion", type: "phrase", example: "中秋节是团圆的日子。", examplePinyin: "Zhōngqiū Jié shì tuányuán de rìzi.", exampleVi: "Tết Trung thu là ngày đoàn tụ." },
          { hanzi: "放假", pinyin: "fàng jià", meaning: "Nghỉ lễ", meaningEn: "Holiday / vacation", type: "phrase", example: "国庆节放假七天。", examplePinyin: "Guóqìng Jié fàng jià qī tiān.", exampleVi: "Quốc khánh nghỉ 7 ngày." },
          { hanzi: "传统", pinyin: "chuántǒng", meaning: "Truyền thống", meaningEn: "Traditional / tradition", type: "phrase", example: "这是中国的传统文化。", examplePinyin: "Zhè shì Zhōngguó de chuántǒng wénhuà.", exampleVi: "Đây là văn hóa truyền thống Trung Quốc." },
        ],
        commonStructures: [
          {
            pattern: "别忘了 + Verb",
            patternPinyin: "Bié wàng le + Verb",
            explanation: "Don't forget to...",
            explanationVi: "Đừng quên...",
            examples: [
              { zh: "别忘了给爸妈打电话。", pinyin: "Bié wàng le gěi bà mā dǎ diànhuà.", vi: "Đừng quên gọi điện cho bố mẹ." },
              { zh: "别忘了买月饼。", pinyin: "Bié wàng le mǎi yuèbǐng.", vi: "Đừng quên mua bánh trung thu." },
            ],
          },
          {
            pattern: "...的时候 + Sentence",
            patternPinyin: "...de shíhou + Sentence",
            explanation: "When... (time clause)",
            explanationVi: "Khi... (mệnh đề thời gian)",
            examples: [
              { zh: "过年的时候，家家户户都贴春联。", pinyin: "Guò nián de shíhou, jiā jiā hù hù dōu tiē chūnlián.", vi: "Khi đón Tết, nhà nhà đều dán câu đối." },
              { zh: "中秋节的时候，我们一起赏月。", pinyin: "Zhōngqiū Jié de shíhou, wǒmen yīqǐ shǎng yuè.", vi: "Khi Trung thu, chúng ta cùng ngắm trăng." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Spring Festival Preparations",
          titleVi: "Nghe: Chuẩn bị đón Tết",
          transcript: "今年春节我打算回老家过年。妈妈已经开始准备年夜饭了，有鱼、饺子、还有我最爱吃的红烧肉。除夕晚上我们全家一起看春晚，十二点放鞭炮。初一早上要给长辈拜年，发红包。",
          transcriptPinyin: "Jīnnián Chūnjié wǒ dǎsuàn huí lǎojiā guò nián. Māma yǐjīng kāishǐ zhǔnbèi niányè fàn le, yǒu yú, jiǎozi, háiyǒu wǒ zuì ài chī de hóng shāo ròu. Chúxī wǎnshang wǒmen quán jiā yīqǐ kàn Chūn Wǎn, shí'èr diǎn fàng biānpào. Chūyī zǎoshang yào gěi zhǎngbèi bài nián, fā hóngbāo.",
          questions: [
            { q: "What food is NOT mentioned for dinner?", qVi: "Món nào KHÔNG được nhắc đến?", options: ["鱼", "饺子", "火锅", "红烧肉"], answer: 2 },
            { q: "What do they watch on New Year's Eve?", qVi: "Đêm giao thừa xem gì?", options: ["电影", "春晚", "比赛", "综艺"], answer: 1 },
            { q: "What happens on 初一 morning?", qVi: "Sáng mồng 1 làm gì?", options: ["放鞭炮", "吃饺子", "拜年", "看春晚"], answer: 2 },
          ],
        },
        speakingTopics: [
          "Compare Chinese New Year with Vietnamese Tet or your country's holidays",
          "Describe your favorite festival and traditions",
          "Explain the meaning of giving red envelopes",
          "Plan a festival celebration with friends",
        ],
      },

      // ──── Lesson 5: Dating & Relationships ────
      {
        id: "cn-sc-05-dating",
        title: "Dating & Relationships",
        titleVi: "Hẹn hò & Mối quan hệ",
        titleZh: "约会恋爱",
        icon: "Heart",
        description: "Talk about dating, relationships, and expressing feelings in Chinese",
        descriptionVi: "Nói về hẹn hò, mối quan hệ và bày tỏ tình cảm bằng tiếng Trung",
        hskLevel: 3,
        badge: "恋爱高手",
        badgeVi: "Cao thủ Tình yêu",
        keySituations: [
          {
            title: "Asking Someone Out",
            titleVi: "Rủ ai đi chơi",
            description: "How to ask someone on a date in Chinese",
            descriptionVi: "Cách rủ ai đó đi hẹn hò bằng tiếng Trung",
            culturalNote: "In China, dating culture has evolved rapidly. Apps like 探探 (Tàntàn) are popular. The term '约会' (yuēhuì) is the standard word for a date. '暧昧' (àimèi) describes the flirty, ambiguous stage before officially dating.",
            culturalNoteVi: "Văn hóa hẹn hò ở Trung Quốc phát triển nhanh chóng. Ứng dụng như 探探 rất phổ biến. '约会' là từ chuẩn cho buổi hẹn hò. '暧昧' mô tả giai đoạn tình cảm mập mờ trước khi chính thức hẹn hò.",
            sampleDialogue: [
              { speaker: "A", line: "这周末你有空吗？", pinyin: "Zhè zhōumò nǐ yǒu kòng ma?", translationVi: "Cuối tuần này bạn rảnh không?" },
              { speaker: "B", line: "有啊，怎么了？", pinyin: "Yǒu a, zěnme le?", translationVi: "Rảnh, sao vậy?" },
              { speaker: "A", line: "我想请你一起去看电影，你愿意吗？", pinyin: "Wǒ xiǎng qǐng nǐ yīqǐ qù kàn diànyǐng, nǐ yuànyì ma?", translationVi: "Tôi muốn mời bạn đi xem phim, bạn có muốn không?" },
              { speaker: "B", line: "好啊！看什么电影？", pinyin: "Hǎo a! Kàn shénme diànyǐng?", translationVi: "Được! Xem phim gì?" },
              { speaker: "A", line: "有一部新的爱情片，评分很高。", pinyin: "Yǒu yī bù xīn de àiqíng piàn, píngfēn hěn gāo.", translationVi: "Có bộ phim tình cảm mới, điểm rất cao." },
            ],
          },
          {
            title: "Expressing Feelings",
            titleVi: "Bày tỏ tình cảm",
            description: "How to express romantic interest and emotions",
            descriptionVi: "Cách bày tỏ sự quan tâm và tình cảm",
            sampleDialogue: [
              { speaker: "A", line: "我觉得我们在一起很开心。", pinyin: "Wǒ juéde wǒmen zài yīqǐ hěn kāixīn.", translationVi: "Tôi thấy chúng ta ở bên nhau rất vui." },
              { speaker: "B", line: "我也是，你对我很重要。", pinyin: "Wǒ yě shì, nǐ duì wǒ hěn zhòngyào.", translationVi: "Tôi cũng vậy, bạn rất quan trọng với tôi." },
              { speaker: "A", line: "我喜欢你，你愿意做我的女朋友吗？", pinyin: "Wǒ xǐhuan nǐ, nǐ yuànyì zuò wǒ de nǚ péngyǒu ma?", translationVi: "Tôi thích bạn, bạn có muốn làm bạn gái tôi không?" },
              { speaker: "B", line: "我也喜欢你，我愿意。", pinyin: "Wǒ yě xǐhuan nǐ, wǒ yuànyì.", translationVi: "Tôi cũng thích bạn, tôi đồng ý." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "约会", pinyin: "yuēhuì", meaning: "Hẹn hò", meaningEn: "Date", type: "phrase", example: "我们去约会吧。", examplePinyin: "Wǒmen qù yuēhuì ba.", exampleVi: "Chúng ta đi hẹn hò đi." },
          { hanzi: "喜欢", pinyin: "xǐhuan", meaning: "Thích", meaningEn: "To like", type: "phrase", example: "我很喜欢你。", examplePinyin: "Wǒ hěn xǐhuan nǐ.", exampleVi: "Tôi rất thích bạn." },
          { hanzi: "暧昧", pinyin: "àimèi", meaning: "Mập mờ (tình cảm)", meaningEn: "Ambiguous (romantic)", type: "expression", example: "他们的关系很暧昧。", examplePinyin: "Tāmen de guānxi hěn àimèi.", exampleVi: "Mối quan hệ của họ rất mập mờ." },
          { hanzi: "表白", pinyin: "biǎobái", meaning: "Tỏ tình", meaningEn: "To confess love", type: "phrase", example: "他向她表白了。", examplePinyin: "Tā xiàng tā biǎobái le.", exampleVi: "Anh ấy tỏ tình với cô ấy rồi." },
          { hanzi: "浪漫", pinyin: "làngmàn", meaning: "Lãng mạn", meaningEn: "Romantic", type: "phrase", example: "这个餐厅很浪漫。", examplePinyin: "Zhège cāntīng hěn làngmàn.", exampleVi: "Nhà hàng này rất lãng mạn." },
          { hanzi: "分手", pinyin: "fēnshǒu", meaning: "Chia tay", meaningEn: "To break up", type: "phrase", example: "他们分手了。", examplePinyin: "Tāmen fēnshǒu le.", exampleVi: "Họ chia tay rồi." },
        ],
        commonStructures: [
          {
            pattern: "愿意 + Verb + 吗？",
            patternPinyin: "Yuànyì + Verb + ma?",
            explanation: "Are you willing to...?",
            explanationVi: "Bạn có sẵn lòng...?",
            examples: [
              { zh: "你愿意和我一起去吗？", pinyin: "Nǐ yuànyì hé wǒ yīqǐ qù ma?", vi: "Bạn có sẵn lòng đi cùng tôi không?" },
              { zh: "你愿意做我的男朋友吗？", pinyin: "Nǐ yuànyì zuò wǒ de nán péngyǒu ma?", vi: "Bạn có muốn làm bạn trai tôi không?" },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: A First Date",
          titleVi: "Nghe: Buổi hẹn đầu tiên",
          transcript: "昨天我和小王第一次约会。我们先去了一家很浪漫的咖啡馆，聊了很多。她喜欢看书和旅行，跟我一样。后来我们去公园散步，看了日落。她说她玩得很开心，希望下次还能见面。",
          transcriptPinyin: "Zuótiān wǒ hé Xiǎo Wáng dì yī cì yuēhuì. Wǒmen xiān qù le yī jiā hěn làngmàn de kāfēi guǎn, liáo le hěn duō. Tā xǐhuan kàn shū hé lǚxíng, gēn wǒ yīyàng. Hòulái wǒmen qù gōngyuán sànbù, kàn le rìluò. Tā shuō tā wán de hěn kāixīn, xīwàng xià cì hái néng jiànmiàn.",
          questions: [
            { q: "Where did they go first?", qVi: "Họ đi đâu đầu tiên?", options: ["餐厅", "咖啡馆", "电影院", "公园"], answer: 1 },
            { q: "What hobby do they share?", qVi: "Họ có sở thích chung gì?", options: ["唱歌", "看书", "做饭", "游泳"], answer: 1 },
            { q: "What did they see in the park?", qVi: "Họ ngắm gì ở công viên?", options: ["月亮", "星星", "日落", "花"], answer: 2 },
          ],
        },
        speakingTopics: [
          "Describe your ideal date in Chinese",
          "Talk about what qualities you value in a partner",
          "Discuss dating culture differences between China and Vietnam",
          "Share a memorable love story",
        ],
      },

      // ──── Lesson 6: Sports & Fitness ────
      {
        id: "cn-sc-06-sports",
        title: "Sports & Fitness",
        titleVi: "Thể thao & Sức khỏe",
        titleZh: "体育健身",
        icon: "Dumbbell",
        description: "Discuss sports, exercise routines, and staying healthy",
        descriptionVi: "Thảo luận về thể thao, tập luyện và giữ gìn sức khỏe",
        hskLevel: 2,
        badge: "运动达人",
        badgeVi: "Người yêu Thể thao",
        keySituations: [
          {
            title: "At the Gym",
            titleVi: "Ở phòng tập",
            description: "Communicate at a gym or fitness center",
            descriptionVi: "Giao tiếp tại phòng tập gym",
            culturalNote: "Fitness culture is booming in China. 健身房 (jiànshēn fáng) gyms and 瑜伽 (yújiā) yoga studios are very popular in cities. The concept of 打卡 (dǎkǎ — check-in) motivates people to post their workouts on social media.",
            culturalNoteVi: "Văn hóa tập luyện đang bùng nổ ở Trung Quốc. Phòng gym 健身房 và studio yoga 瑜伽 rất phổ biến ở thành phố. Khái niệm '打卡' (check-in) thúc đẩy mọi người đăng bài tập lên mạng xã hội.",
            sampleDialogue: [
              { speaker: "A", line: "你今天练什么？", pinyin: "Nǐ jīntiān liàn shénme?", translationVi: "Hôm nay bạn tập gì?" },
              { speaker: "B", line: "我今天练腿，你呢？", pinyin: "Wǒ jīntiān liàn tuǐ, nǐ ne?", translationVi: "Hôm nay tôi tập chân, còn bạn?" },
              { speaker: "A", line: "我跑步半小时，然后做力量训练。", pinyin: "Wǒ pǎobù bàn xiǎoshí, ránhòu zuò lìliàng xùnliàn.", translationVi: "Tôi chạy bộ nửa tiếng, sau đó tập sức mạnh." },
              { speaker: "B", line: "不错！运动完了一起喝杯蛋白粉吧。", pinyin: "Búcuò! Yùndòng wán le yīqǐ hē bēi dànbái fěn ba.", translationVi: "Tốt! Tập xong cùng uống ly protein nhé." },
            ],
          },
          {
            title: "Talking About Sports",
            titleVi: "Nói về thể thao",
            description: "Discuss your favorite sports and teams",
            descriptionVi: "Thảo luận về môn thể thao và đội bóng yêu thích",
            sampleDialogue: [
              { speaker: "A", line: "你喜欢什么运动？", pinyin: "Nǐ xǐhuan shénme yùndòng?", translationVi: "Bạn thích môn thể thao nào?" },
              { speaker: "B", line: "我最喜欢打篮球，我是NBA球迷。", pinyin: "Wǒ zuì xǐhuan dǎ lánqiú, wǒ shì NBA qiúmí.", translationVi: "Tôi thích nhất chơi bóng rổ, tôi là fan NBA." },
              { speaker: "A", line: "你支持哪个队？", pinyin: "Nǐ zhīchí nǎge duì?", translationVi: "Bạn ủng hộ đội nào?" },
              { speaker: "B", line: "湖人队！勒布朗是我的偶像。", pinyin: "Húrén Duì! Lèbùlǎng shì wǒ de ǒuxiàng.", translationVi: "Đội Lakers! LeBron là thần tượng của tôi." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "运动", pinyin: "yùndòng", meaning: "Thể thao / Vận động", meaningEn: "Sport / Exercise", type: "phrase", example: "我每天运动一小时。", examplePinyin: "Wǒ měitiān yùndòng yī xiǎoshí.", exampleVi: "Tôi tập thể dục mỗi ngày một giờ." },
          { hanzi: "健身", pinyin: "jiànshēn", meaning: "Tập gym", meaningEn: "Fitness / Work out", type: "phrase", example: "他每天去健身。", examplePinyin: "Tā měitiān qù jiànshēn.", exampleVi: "Anh ấy đi tập gym mỗi ngày." },
          { hanzi: "跑步", pinyin: "pǎobù", meaning: "Chạy bộ", meaningEn: "Running", type: "phrase", example: "早上跑步很舒服。", examplePinyin: "Zǎoshang pǎobù hěn shūfu.", exampleVi: "Chạy bộ buổi sáng rất thoải mái." },
          { hanzi: "篮球", pinyin: "lánqiú", meaning: "Bóng rổ", meaningEn: "Basketball", type: "phrase", example: "我们去打篮球吧！", examplePinyin: "Wǒmen qù dǎ lánqiú ba!", exampleVi: "Chúng ta đi chơi bóng rổ đi!" },
          { hanzi: "足球", pinyin: "zúqiú", meaning: "Bóng đá", meaningEn: "Football / Soccer", type: "phrase", example: "世界杯足球赛很精彩。", examplePinyin: "Shìjiè Bēi zúqiú sài hěn jīngcǎi.", exampleVi: "World Cup bóng đá rất hấp dẫn." },
          { hanzi: "游泳", pinyin: "yóuyǒng", meaning: "Bơi lội", meaningEn: "Swimming", type: "phrase", example: "夏天我喜欢游泳。", examplePinyin: "Xiàtiān wǒ xǐhuan yóuyǒng.", exampleVi: "Mùa hè tôi thích bơi." },
        ],
        commonStructures: [
          {
            pattern: "每天 + Time + Verb",
            patternPinyin: "Měitiān + Time + Verb",
            explanation: "Every day at... do...",
            explanationVi: "Mỗi ngày lúc... làm...",
            examples: [
              { zh: "我每天早上六点跑步。", pinyin: "Wǒ měitiān zǎoshang liù diǎn pǎobù.", vi: "Tôi chạy bộ lúc 6 giờ sáng mỗi ngày." },
              { zh: "他每天晚上去健身房。", pinyin: "Tā měitiān wǎnshang qù jiànshēn fáng.", vi: "Anh ấy đi gym mỗi tối." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Morning Exercise Routine",
          titleVi: "Nghe: Thói quen tập buổi sáng",
          transcript: "我每天早上五点半起床，先喝一杯水，然后去公园跑步。跑完步以后做二十分钟的拉伸。周末我会去健身房练力量。我觉得运动让我的身体越来越好，精神也很好。",
          transcriptPinyin: "Wǒ měitiān zǎoshang wǔ diǎn bàn qǐchuáng, xiān hē yī bēi shuǐ, ránhòu qù gōngyuán pǎobù. Pǎo wán bù yǐhòu zuò èrshí fēnzhōng de lāshēn. Zhōumò wǒ huì qù jiànshēn fáng liàn lìliàng. Wǒ juéde yùndòng ràng wǒ de shēntǐ yuè lái yuè hǎo, jīngshén yě hěn hǎo.",
          questions: [
            { q: "What time does the speaker wake up?", qVi: "Người nói dậy lúc mấy giờ?", options: ["五点", "五点半", "六点", "六点半"], answer: 1 },
            { q: "How long is the stretching?", qVi: "Kéo giãn bao lâu?", options: ["十分钟", "二十分钟", "三十分钟", "一小时"], answer: 1 },
            { q: "When does the speaker go to the gym?", qVi: "Khi nào người nói đi gym?", options: ["每天", "周末", "晚上", "下午"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Describe your exercise routine in Chinese",
          "Talk about your favorite sport and why you like it",
          "Discuss the benefits of regular exercise",
          "Compare sports culture in China and your country",
        ],
      },
    ],
  },
];

// Helper functions
export const getChineseConvLessonById = (id: string): ChineseConvLesson | null => {
  for (const pillar of chineseConversationalPillars) {
    const lesson = pillar.lessons.find(l => l.id === id);
    if (lesson) return lesson;
  }
  return null;
};

export const getChinesePillarByLessonId = (id: string): ChineseConvPillar | null => {
  for (const pillar of chineseConversationalPillars) {
    if (pillar.lessons.some(l => l.id === id)) return pillar;
  }
  return null;
};

export const allChineseConvLessons: ChineseConvLesson[] =
  chineseConversationalPillars.flatMap(p => p.lessons);
