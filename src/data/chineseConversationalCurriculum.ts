// Conversational Chinese curriculum data organized into 3 pillars
// Mirrors the English conversational curriculum structure adapted for Mandarin Chinese

export interface ChineseVocabEntry {
  hanzi: string;
  pinyin: string;
  meaning: string; // Vietnamese (legacy / fallback)
  meaningEn: string; // English — primary display
  type: "phrase" | "idiom" | "slang" | "grammar" | "expression";
  example: string; // Chinese sentence
  examplePinyin: string;
  exampleVi: string; // Vietnamese (legacy)
  exampleEn?: string; // English — primary display
}

export interface ChineseKeySituation {
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  culturalNote?: string;
  culturalNoteVi?: string;
  sampleDialogue: { speaker: string; line: string; pinyin: string; translationVi?: string; translationEn?: string }[];
}

export interface ChineseListeningChallenge {
  title: string;
  titleVi: string;
  transcript: string;
  transcriptPinyin: string;
  transcriptEn?: string;
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
  hskLevel: 1 | 2 | 3 | 4 | 5 | 6;
  keySituations: ChineseKeySituation[];
  vocabulary: ChineseVocabEntry[];
  commonStructures: { pattern: string; patternPinyin: string; explanation: string; explanationVi: string; examples: { zh: string; pinyin: string; vi: string; en?: string }[] }[];
  listeningChallenge: ChineseListeningChallenge;
  speakingTopics: string[];
  badge: string;
  badgeVi: string;
  fillInBlankExercises?: { sentence: string; pinyin: string; answer: string; translationVi: string; translationEn?: string; hint?: string }[];
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
    description: "Practical Chinese for everyday situations - greetings, food, shopping, transport, health",
    descriptionVi: "Tiếng Trung thực tế cho các tình huống hàng ngày - chào hỏi, ăn uống, mua sắm, di chuyển, sức khỏe",
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
            culturalNote: "In Chinese culture, exchanging business cards (名片 míngpiàn) with both hands shows respect. Age and titles matter - address people as 先生 (xiānsheng) or 女士 (nǚshì).",
            culturalNoteVi: "Trong văn hóa Trung Quốc, trao đổi danh thiếp (名片) bằng hai tay thể hiện sự tôn trọng. Tuổi tác và danh xưng rất quan trọng.",
            sampleDialogue: [
              { speaker: "A", line: "你好！我叫王明。你叫什么名字？", pinyin: "Nǐ hǎo! Wǒ jiào Wáng Míng. Nǐ jiào shénme míngzi?", translationVi: "Xin chào! Tôi tên Vương Minh. Bạn tên gì?", translationEn: "Hello! My name is Vuong Minh. What's your name?" },
              { speaker: "B", line: "你好！我叫李华。很高兴认识你！", pinyin: "Nǐ hǎo! Wǒ jiào Lǐ Huá. Hěn gāoxìng rènshi nǐ!", translationVi: "Xin chào! Tôi tên Lý Hoa. Rất vui được gặp bạn!", translationEn: "Hello! My name is Ly Hoa. Nice to meet you!" },
              { speaker: "A", line: "你是哪里人？", pinyin: "Nǐ shì nǎlǐ rén?", translationVi: "Bạn là người ở đâu?", translationEn: "Where are you from?" },
              { speaker: "B", line: "我是越南人。我在这里工作。", pinyin: "Wǒ shì Yuènán rén. Wǒ zài zhèlǐ gōngzuò.", translationVi: "Tôi là người Việt Nam. Tôi làm việc ở đây.", translationEn: "I'm Vietnamese. I work here." },
              { speaker: "A", line: "太好了！我们交换一下微信吧。", pinyin: "Tài hǎo le! Wǒmen jiāohuàn yíxià Wēixìn ba.", translationVi: "Tuyệt vời! Chúng ta trao đổi WeChat nhé.", translationEn: "Great! Let's exchange WeChat." },
            ],
          },
          {
            title: "Greeting a Colleague",
            titleVi: "Chào đồng nghiệp",
            description: "Daily greetings at work or school",
            descriptionVi: "Chào hỏi hàng ngày tại công ty hoặc trường học",
            sampleDialogue: [
              { speaker: "A", line: "早上好！今天天气不错。", pinyin: "Zǎoshang hǎo! Jīntiān tiānqì búcuò.", translationVi: "Chào buổi sáng! Hôm nay thời tiết đẹp.", translationEn: "Good morning! The weather is beautiful today." },
              { speaker: "B", line: "是啊！你吃早饭了吗？", pinyin: "Shì a! Nǐ chī zǎofàn le ma?", translationVi: "Đúng vậy! Bạn ăn sáng chưa?", translationEn: "Yes, it is! Have you had breakfast yet?" },
              { speaker: "A", line: "吃了。你呢？", pinyin: "Chī le. Nǐ ne?", translationVi: "Ăn rồi. Còn bạn?", translationEn: "I have. How about you?" },
              { speaker: "B", line: "我还没吃。一会儿去食堂吃。", pinyin: "Wǒ hái méi chī. Yīhuìr qù shítáng chī.", translationVi: "Tôi chưa ăn. Lát nữa đi nhà ăn.", translationEn: "I haven't eaten yet. I'll go to the cafeteria later." },
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
              { speaker: "A", line: "您好！我是华为公司的张经理。", pinyin: "Nín hǎo! Wǒ shì Huáwéi gōngsī de Zhāng jīnglǐ.", translationVi: "Xin chào! Tôi là giám đốc Trương của công ty Huawei.", translationEn: "Hello! I am Director Truong from Huawei company." },
              { speaker: "B", line: "您好，张经理！我是越南ABC公司的阿明。", pinyin: "Nín hǎo, Zhāng jīnglǐ! Wǒ shì Yuènán ABC gōngsī de Ā Míng.", translationVi: "Xin chào, giám đốc Trương! Tôi là Minh từ công ty ABC Việt Nam.", translationEn: "Hello, Director Truong! I am Minh from ABC Vietnam company." },
              { speaker: "A", line: "很高兴认识您。这是我的名片。", pinyin: "Hěn gāoxìng rènshi nín. Zhè shì wǒ de míngpiàn.", translationVi: "Rất vui được gặp ngài. Đây là danh thiếp của tôi.", translationEn: "It's a pleasure to meet you. This is my business card." },
              { speaker: "B", line: "谢谢！这是我的。希望以后多多合作。", pinyin: "Xièxie! Zhè shì wǒ de. Xīwàng yǐhòu duōduō hézuò.", translationVi: "Cảm ơn! Đây là của tôi. Hy vọng sau này hợp tác nhiều.", translationEn: "Thank you! Here's mine. I hope for more cooperation in the future." },
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
              { speaker: "服务员", line: "欢迎光临！请问几位？", pinyin: "Huānyíng guānglín! Qǐng wèn jǐ wèi?", translationVi: "Chào mừng quý khách! Xin hỏi mấy người ạ?", translationEn: "Welcome! How many people, please?" },
              { speaker: "You", line: "两位。请给我们一个菜单。", pinyin: "Liǎng wèi. Qǐng gěi wǒmen yí ge càidān.", translationVi: "Hai người. Cho chúng tôi xin thực đơn.", translationEn: "Two people. Could we have the menu, please?" },
              { speaker: "服务员", line: "好的，请稍等。", pinyin: "Hǎo de, qǐng shāo děng.", translationVi: "Vâng, xin chờ chút ạ.", translationEn: "Yes, please wait a moment." },
              { speaker: "You", line: "我想要一个宫保鸡丁和一碗米饭。", pinyin: "Wǒ xiǎng yào yí ge gōngbǎo jīdīng hé yī wǎn mǐfàn.", translationVi: "Tôi muốn một phần gà Cung Bảo và một bát cơm.", translationEn: "I'd like a portion of Kung Pao chicken and a bowl of rice." },
              { speaker: "服务员", line: "好的。要不要来点饮料？", pinyin: "Hǎo de. Yào bu yào lái diǎn yǐnliào?", translationVi: "Vâng. Có muốn gọi đồ uống không ạ?", translationEn: "Yes. Would you like to order any drinks?" },
              { speaker: "You", line: "来一瓶啤酒吧。谢谢！", pinyin: "Lái yī píng píjiǔ ba. Xièxie!", translationVi: "Cho một chai bia nhé. Cảm ơn!", translationEn: "A bottle of beer, please. Thank you!" },
            ],
          },
          {
            title: "Expressing Food Preferences",
            titleVi: "Bày tỏ sở thích ăn uống",
            description: "Tell others what you like and don't like to eat",
            descriptionVi: "Nói cho người khác biết bạn thích và không thích ăn gì",
            sampleDialogue: [
              { speaker: "A", line: "你喜欢吃什么？", pinyin: "Nǐ xǐhuan chī shénme?", translationVi: "Bạn thích ăn gì?", translationEn: "What kind of food do you like?" },
              { speaker: "B", line: "我喜欢吃火锅，但是我不能吃太辣的。", pinyin: "Wǒ xǐhuan chī huǒguō, dànshì wǒ bù néng chī tài là de.", translationVi: "Tôi thích ăn lẩu, nhưng tôi không ăn được quá cay.", translationEn: "I like hotpot, but I can't eat anything too spicy." },
              { speaker: "A", line: "那我们去吃鸳鸯锅吧，一半辣一半不辣。", pinyin: "Nà wǒmen qù chī yuānyāng guō ba, yī bàn là yī bàn bú là.", translationVi: "Vậy chúng ta đi ăn lẩu uyên ương nhé, nửa cay nửa không.", translationEn: "Then let's go for a 'yin-yang' hotpot, half spicy and half not." },
              { speaker: "B", line: "好主意！我请客。", pinyin: "Hǎo zhǔyi! Wǒ qǐngkè.", translationVi: "Ý hay! Tôi đãi.", translationEn: "Good idea! It's my treat." },
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
              { speaker: "A", line: "服务员，买单！", pinyin: "Fúwùyuán, mǎi dān!", translationVi: "Phục vụ ơi, tính tiền!", translationEn: "Excuse me, waiter, check please!" },
              { speaker: "B", line: "今天我请客，别跟我抢！", pinyin: "Jīntiān wǒ qǐngkè, bié gēn wǒ qiǎng!", translationVi: "Hôm nay tôi đãi, đừng tranh với tôi!", translationEn: "It's my treat today, don't argue with me!" },
              { speaker: "A", line: "不行不行，上次你请的，这次该我了。", pinyin: "Bù xíng bù xíng, shàng cì nǐ qǐng de, zhè cì gāi wǒ le.", translationVi: "Không được đâu, lần trước bạn đãi, lần này đến tôi rồi.", translationEn: "No way, you treated last time, it's my turn this time." },
              { speaker: "服务员", line: "一共两百三十八块。可以扫码支付。", pinyin: "Yígòng liǎng bǎi sānshí bā kuài. Kěyǐ sǎo mǎ zhīfù.", translationVi: "Tổng cộng 238 tệ. Có thể quét mã thanh toán.", translationEn: "That's 238 yuan in total. You can scan the code to pay." },
              { speaker: "A", line: "好，我扫。", pinyin: "Hǎo, wǒ sǎo.", translationVi: "Được, tôi quét.", translationEn: "Okay, I'll scan it." },
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
            culturalNote: "Bargaining (砍价 kǎnjià) is expected at markets and small shops in China. Start by offering 50-60% of the asking price. Always smile and be friendly - it's part of the fun!",
            culturalNoteVi: "Trả giá (砍价) là bình thường ở chợ và tiệm nhỏ tại Trung Quốc. Bắt đầu bằng 50-60% giá hỏi. Luôn mỉm cười - đó là một phần của niềm vui!",
            sampleDialogue: [
              { speaker: "You", line: "老板，这个多少钱？", pinyin: "Lǎobǎn, zhège duōshao qián?", translationVi: "Anh ơi, cái này bao nhiêu tiền?", translationEn: "Excuse me, sir, how much is this?" },
              { speaker: "老板", line: "这个一百块。", pinyin: "Zhège yī bǎi kuài.", translationVi: "Cái này 100 tệ.", translationEn: "This is 100 yuan." },
              { speaker: "You", line: "太贵了！能不能便宜一点？", pinyin: "Tài guì le! Néng bu néng piányi yīdiǎn?", translationVi: "Đắt quá! Bớt chút được không?", translationEn: "Too expensive! Can you give me a discount?" },
              { speaker: "老板", line: "最低八十块。", pinyin: "Zuìdī bāshí kuài.", translationVi: "Thấp nhất 80 tệ.", translationEn: "Lowest 80 yuan." },
              { speaker: "You", line: "五十块行不行？", pinyin: "Wǔshí kuài xíng bu xíng?", translationVi: "50 tệ được không?", translationEn: "How about 50 yuan?" },
              { speaker: "老板", line: "六十块吧，最低了。", pinyin: "Liùshí kuài ba, zuìdī le.", translationVi: "60 tệ nhé, thấp nhất rồi.", translationEn: "60 yuan, that's the lowest." },
              { speaker: "You", line: "好，成交！", pinyin: "Hǎo, chéngjiāo!", translationVi: "Được, thành giao!", translationEn: "Okay, it's a deal!" },
            ],
          },
          {
            title: "Shopping for Clothes",
            titleVi: "Mua quần áo",
            description: "Try on clothes, ask for sizes and colors",
            descriptionVi: "Thử đồ, hỏi kích cỡ và màu sắc",
            sampleDialogue: [
              { speaker: "You", line: "这件衣服有没有大号的？", pinyin: "Zhè jiàn yīfu yǒu méi yǒu dà hào de?", translationVi: "Chiếc áo này có size lớn không?", translationEn: "Does this shirt come in a larger size?" },
              { speaker: "店员", line: "有的，这个颜色有大号。你要试试吗？", pinyin: "Yǒu de, zhège yánsè yǒu dà hào. Nǐ yào shìshi ma?", translationVi: "Có, màu này có size lớn. Bạn muốn thử không?", translationEn: "Yes, this color has a large size. Would you like to try it on?" },
              { speaker: "You", line: "好的。试衣间在哪里？", pinyin: "Hǎo de. Shìyī jiān zài nǎlǐ?", translationVi: "Được. Phòng thử đồ ở đâu?", translationEn: "Okay. Where is the fitting room?" },
              { speaker: "店员", line: "在那边，右手边第二间。", pinyin: "Zài nàbiān, yòu shǒu biān dì èr jiān.", translationVi: "Ở đằng kia, phòng thứ hai bên phải.", translationEn: "Over there, the second room on the right." },
              { speaker: "You", line: "这件太紧了，有没有再大一号的？", pinyin: "Zhè jiàn tài jǐn le, yǒu méi yǒu zài dà yī hào de?", translationVi: "Chiếc này chật quá, có size lớn hơn không?", translationEn: "This one is too tight, do you have a larger size?" },
            ],
          },
          {
            title: "Online Shopping",
            titleVi: "Mua sắm trực tuyến",
            description: "Navigate Taobao/JD.com and handle delivery",
            descriptionVi: "Mua hàng trên Taobao/JD và nhận hàng giao",
            culturalNote: "Online shopping in China is dominated by 淘宝 (Táobǎo), 京东 (Jīngdōng/JD), and 拼多多 (Pīnduōduō). Double 11 (11/11) is the biggest shopping day - bigger than Black Friday!",
            culturalNoteVi: "Mua sắm online ở Trung Quốc chủ yếu trên 淘宝, 京东 và 拼多多. Ngày 11/11 là ngày mua sắm lớn nhất - lớn hơn cả Black Friday!",
            sampleDialogue: [
              { speaker: "A", line: "你在淘宝买过东西吗？", pinyin: "Nǐ zài Táobǎo mǎi guò dōngxi ma?", translationVi: "Bạn mua đồ trên Taobao bao giờ chưa?", translationEn: "Have you ever bought anything on Taobao?" },
              { speaker: "B", line: "买过啊，经常买。双十一的时候打折特别多。", pinyin: "Mǎi guò a, jīngcháng mǎi. Shuāng shíyī de shíhou dǎzhé tèbié duō.", translationVi: "Mua rồi, mua thường xuyên. Ngày 11/11 giảm giá đặc biệt nhiều.", translationEn: "Yes, I shop there regularly. There are especially great discounts on November 11th." },
              { speaker: "A", line: "快递一般几天到？", pinyin: "Kuàidì yībān jǐ tiān dào?", translationVi: "Ship thường mấy ngày đến?", translationEn: "How many days does shipping usually take?" },
              { speaker: "B", line: "一般两三天。你可以在APP上查物流。", pinyin: "Yībān liǎng sān tiān. Nǐ kěyǐ zài APP shàng chá wùliú.", translationVi: "Thường 2-3 ngày. Bạn có thể tra cứu vận chuyển trên app.", translationEn: "Usually 2-3 days. You can track the delivery on the app." },
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
              { speaker: "You", line: "师傅，去天安门，请打表。", pinyin: "Shīfu, qù Tiān'ānmén, qǐng dǎ biǎo.", translationVi: "Bác tài, đến Thiên An Môn, bật đồng hồ giúp tôi.", translationEn: "Driver, to Tiananmen Square, please turn on the meter." },
              { speaker: "司机", line: "好的，大概二十分钟到。", pinyin: "Hǎo de, dàgài èrshí fēnzhōng dào.", translationVi: "Được, khoảng 20 phút tới.", translationEn: "Okay, we'll be there in about 20 minutes." },
              { speaker: "You", line: "好的，谢谢。可以微信付款吗？", pinyin: "Hǎo de, xièxie. Kěyǐ Wēixìn fùkuǎn ma?", translationVi: "Được, cảm ơn. Trả bằng WeChat được không?", translationEn: "Alright, thank you. Can I pay with WeChat?" },
              { speaker: "司机", line: "可以，扫码就行。", pinyin: "Kěyǐ, sǎo mǎ jiù xíng.", translationVi: "Được, quét mã là xong.", translationEn: "Yes, just scan the code." },
            ],
          },
          {
            title: "Asking for Directions",
            titleVi: "Hỏi đường",
            description: "Ask and understand directions in Chinese",
            descriptionVi: "Hỏi và hiểu chỉ dẫn đường bằng tiếng Trung",
            sampleDialogue: [
              { speaker: "You", line: "请问，地铁站在哪里？", pinyin: "Qǐng wèn, dìtiě zhàn zài nǎlǐ?", translationVi: "Xin hỏi, ga tàu điện ngầm ở đâu?", translationEn: "Excuse me, where is the subway station?" },
              { speaker: "路人", line: "一直往前走，到路口左转就到了。", pinyin: "Yīzhí wǎng qián zǒu, dào lùkǒu zuǒ zhuǎn jiù dào le.", translationVi: "Đi thẳng về phía trước, đến ngã tư rẽ trái là tới.", translationEn: "Go straight ahead, then turn left at the intersection." },
              { speaker: "You", line: "大概走多长时间？", pinyin: "Dàgài zǒu duō cháng shíjiān?", translationVi: "Đi bộ khoảng bao lâu?", translationEn: "How long does it take to walk there?" },
              { speaker: "路人", line: "五分钟左右。", pinyin: "Wǔ fēnzhōng zuǒyòu.", translationVi: "Khoảng 5 phút.", translationEn: "About 5 minutes." },
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
              { speaker: "You", line: "你好，我想买一张去上海的高铁票。", pinyin: "Nǐ hǎo, wǒ xiǎng mǎi yī zhāng qù Shànghǎi de gāotiě piào.", translationVi: "Xin chào, tôi muốn mua một vé tàu cao tốc đi Thượng Hải.", translationEn: "Hello, I'd like to buy a high-speed train ticket to Shanghai." },
              { speaker: "售票员", line: "什么时候走？要一等座还是二等座？", pinyin: "Shénme shíhou zǒu? Yào yī děng zuò háishi èr děng zuò?", translationVi: "Khi nào đi? Muốn ghế hạng nhất hay hạng hai?", translationEn: "When do you want to leave? First class or second class?" },
              { speaker: "You", line: "明天上午的，二等座。", pinyin: "Míngtiān shàngwǔ de, èr děng zuò.", translationVi: "Sáng ngày mai, ghế hạng hai.", translationEn: "Tomorrow morning, second class." },
              { speaker: "售票员", line: "有一趟八点半的，票价五百五十三块。", pinyin: "Yǒu yī tàng bā diǎn bàn de, piàojià wǔ bǎi wǔshí sān kuài.", translationVi: "Có chuyến 8 giờ 30, giá vé 553 tệ.", translationEn: "There's a train at 8:30 AM, the ticket costs 553 yuan." },
              { speaker: "You", line: "好的，就这趟。", pinyin: "Hǎo de, jiù zhè tàng.", translationVi: "Được, lấy chuyến này.", translationEn: "Okay, I'll take that one." },
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
            culturalNote: "In China, hospitals are the primary place for healthcare - even for minor issues. You need to register (挂号 guàhào) first. Traditional Chinese Medicine (中医 zhōngyī) is also popular alongside Western medicine.",
            culturalNoteVi: "Ở Trung Quốc, bệnh viện là nơi chính để khám bệnh - ngay cả bệnh nhẹ. Bạn cần đăng ký (挂号) trước. Đông y (中医) cũng rất phổ biến bên cạnh Tây y.",
            sampleDialogue: [
              { speaker: "You", line: "医生，我头疼，还有点发烧。", pinyin: "Yīshēng, wǒ tóu téng, hái yǒudiǎn fā shāo.", translationVi: "Bác sĩ, tôi đau đầu và hơi sốt.", translationEn: "Doctor, I have a headache and a slight fever." },
              { speaker: "医生", line: "发烧多少度？", pinyin: "Fā shāo duōshao dù?", translationVi: "Sốt bao nhiêu độ?", translationEn: "How high is your fever?" },
              { speaker: "You", line: "三十八度五。", pinyin: "Sānshí bā dù wǔ.", translationVi: "38 độ 5.", translationEn: "38.5 degrees." },
              { speaker: "医生", line: "你可能感冒了。我给你开点药，多喝水，好好休息。", pinyin: "Nǐ kěnéng gǎnmào le. Wǒ gěi nǐ kāi diǎn yào, duō hē shuǐ, hǎohǎo xiūxi.", translationVi: "Bạn có thể bị cảm. Tôi kê thuốc cho bạn, uống nhiều nước, nghỉ ngơi tốt.", translationEn: "You might have a cold. I'll prescribe some medicine for you. Drink plenty of water and get good rest." },
              { speaker: "You", line: "好的，谢谢医生。药怎么吃？", pinyin: "Hǎo de, xièxie yīshēng. Yào zěnme chī?", translationVi: "Vâng, cảm ơn bác sĩ. Thuốc uống thế nào?", translationEn: "Yes, thank you, Doctor. How should I take the medicine?" },
              { speaker: "医生", line: "一天三次，每次两片，饭后吃。", pinyin: "Yī tiān sān cì, měi cì liǎng piàn, fàn hòu chī.", translationVi: "Ngày 3 lần, mỗi lần 2 viên, uống sau ăn.", translationEn: "Three times a day, two pills each time, after meals." },
            ],
          },
          {
            title: "Pharmacy Conversation",
            titleVi: "Mua thuốc tại nhà thuốc",
            description: "Buy medicine and understand instructions",
            descriptionVi: "Mua thuốc và hiểu hướng dẫn sử dụng",
            sampleDialogue: [
              { speaker: "You", line: "你好，我想买感冒药。", pinyin: "Nǐ hǎo, wǒ xiǎng mǎi gǎnmào yào.", translationVi: "Xin chào, tôi muốn mua thuốc cảm.", translationEn: "Hello, I'd like to buy cold medicine." },
              { speaker: "药剂师", line: "你有什么症状？流鼻涕还是咳嗽？", pinyin: "Nǐ yǒu shénme zhèngzhuàng? Liú bítì háishi késou?", translationVi: "Bạn có triệu chứng gì? Sổ mũi hay ho?", translationEn: "What are your symptoms? Runny nose or cough?" },
              { speaker: "You", line: "咳嗽比较严重，还有一点头疼。", pinyin: "Késou bǐjiào yánzhòng, hái yǒu yīdiǎn tóu téng.", translationVi: "Ho khá nặng, còn hơi đau đầu.", translationEn: "I have a pretty bad cough, and a slight headache." },
              { speaker: "药剂师", line: "这个药可以止咳，这个是退烧药。一天吃三次。", pinyin: "Zhège yào kěyǐ zhǐ ké, zhège shì tuì shāo yào. Yī tiān chī sān cì.", translationVi: "Thuốc này trị ho, thuốc này hạ sốt. Ngày uống 3 lần.", translationEn: "This medicine is for coughs, this one is for fever. Take them three times a day." },
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
              { speaker: "You", line: "快打120！有人受伤了！", pinyin: "Kuài dǎ yāo èr líng! Yǒu rén shòushāng le!", translationVi: "Gọi 120 nhanh! Có người bị thương!", translationEn: "Call 120 quickly! Someone is injured!" },
              { speaker: "接线员", line: "您好，请问在哪里？", pinyin: "Nín hǎo, qǐng wèn zài nǎlǐ?", translationVi: "Xin chào, xin hỏi ở đâu ạ?", translationEn: "Hello, where are you calling from?" },
              { speaker: "You", line: "在人民路和中山路的路口，有人摔倒了。", pinyin: "Zài Rénmín Lù hé Zhōngshān Lù de lùkǒu, yǒu rén shuāi dǎo le.", translationVi: "Ở ngã tư đường Nhân Dân và đường Trung Sơn, có người ngã.", translationEn: "At the intersection of Renmin Road and Zhongshan Road, someone fell." },
              { speaker: "接线员", line: "好的，救护车马上到。", pinyin: "Hǎo de, jiùhù chē mǎshàng dào.", translationVi: "Vâng, xe cấp cứu đến ngay.", translationEn: "Okay, an ambulance will be there right away." },
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
            culturalNote: "Weather is a universal conversation starter in China too. Northern China (北方 běifāng) has extreme winters while Southern China (南方 nánfāng) is humid and warm. The 梅雨季节 (méiyǔ jìjié - plum rain season) in June-July is a major seasonal event.",
            culturalNoteVi: "Thời tiết là chủ đề mở đầu cuộc trò chuyện phổ biến ở Trung Quốc. Miền Bắc 北方 có mùa đông khắc nghiệt, miền Nam 南方 ẩm ướt và ấm áp. Mùa mưa ngâu 梅雨季节 vào tháng 6-7 là sự kiện theo mùa quan trọng.",
            sampleDialogue: [
              { speaker: "A", line: "今天天气怎么样？", pinyin: "Jīntiān tiānqì zěnmeyàng?", translationVi: "Hôm nay thời tiết thế nào?", translationEn: "What's the weather like today?" },
              { speaker: "B", line: "今天很热，有三十五度。", pinyin: "Jīntiān hěn rè, yǒu sānshíwǔ dù.", translationVi: "Hôm nay rất nóng, 35 độ.", translationEn: "It's very hot today, 35 degrees Celsius." },
              { speaker: "A", line: "下午好像要下雨。", pinyin: "Xiàwǔ hǎoxiàng yào xià yǔ.", translationVi: "Chiều hình như sẽ mưa.", translationEn: "It looks like it might rain in the afternoon." },
              { speaker: "B", line: "那我带把伞出门。", pinyin: "Nà wǒ dài bǎ sǎn chūmén.", translationVi: "Vậy tôi mang ô đi.", translationEn: "Then I'll bring an umbrella." },
            ],
          },
          {
            title: "Discussing Seasons",
            titleVi: "Thảo luận về các mùa",
            description: "Talk about your favorite season and seasonal activities",
            descriptionVi: "Nói về mùa yêu thích và hoạt động theo mùa",
            sampleDialogue: [
              { speaker: "A", line: "你最喜欢什么季节？", pinyin: "Nǐ zuì xǐhuan shénme jìjié?", translationVi: "Bạn thích mùa nào nhất?", translationEn: "What's your favorite season?" },
              { speaker: "B", line: "我最喜欢秋天，天气很凉快。", pinyin: "Wǒ zuì xǐhuan qiūtiān, tiānqì hěn liángkuai.", translationVi: "Tôi thích nhất mùa thu, thời tiết mát mẻ.", translationEn: "I like autumn the most, the weather is cool and pleasant." },
              { speaker: "A", line: "秋天的风景也很美，树叶变红了。", pinyin: "Qiūtiān de fēngjǐng yě hěn měi, shùyè biàn hóng le.", translationVi: "Phong cảnh mùa thu cũng rất đẹp, lá cây chuyển đỏ.", translationEn: "The autumn scenery is also very beautiful, the leaves turn red." },
              { speaker: "B", line: "对，我们可以去爬山赏红叶！", pinyin: "Duì, wǒmen kěyǐ qù pá shān shǎng hóngyè!", translationVi: "Đúng, chúng ta có thể đi leo núi ngắm lá đỏ!", translationEn: "That's right, we can go hiking to see the red leaves!" },
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
            culturalNote: "In China, rent is usually paid monthly or quarterly (季付 jì fù). Deposits are typically '押一付三' - one month deposit + three months rent upfront. Apps like 贝壳 (Bèiké) and 自如 (Zìrú) are popular for finding rentals.",
            culturalNoteVi: "Ở Trung Quốc, tiền thuê thường trả theo tháng hoặc quý (季付). Tiền cọc thường '押一付三' - cọc 1 tháng + trả trước 3 tháng. App 贝壳 và 自如 rất phổ biến để tìm nhà.",
            sampleDialogue: [
              { speaker: "中介", line: "这套房子两室一厅，月租四千块。", pinyin: "Zhè tào fángzi liǎng shì yī tīng, yuè zū sì qiān kuài.", translationVi: "Căn hộ này 2 phòng ngủ 1 phòng khách, thuê tháng 4000 tệ.", translationEn: "This apartment has 2 bedrooms and 1 living room, the rent is 4000 yuan per month." },
              { speaker: "You", line: "包不包水电费？", pinyin: "Bāo bu bāo shuǐdiàn fèi?", translationVi: "Có bao tiền điện nước không?", translationEn: "Are utilities included?" },
              { speaker: "中介", line: "不包，水电费自己交。网费包了。", pinyin: "Bù bāo, shuǐdiàn fèi zìjǐ jiāo. Wǎngfèi bāo le.", translationVi: "Không bao, điện nước tự trả. Tiền mạng đã bao.", translationEn: "No, you pay for utilities yourself. Internet is included." },
              { speaker: "You", line: "押金怎么算？", pinyin: "Yājīn zěnme suàn?", translationVi: "Tiền cọc tính thế nào?", translationEn: "How does the deposit work?" },
              { speaker: "中介", line: "押一付三，一共一万六。", pinyin: "Yā yī fù sān, yígòng yī wàn liù.", translationVi: "Cọc 1 trả 3, tổng cộng 16 ngàn.", translationEn: "One month deposit, three months upfront, for a total of 16,000." },
            ],
          },
          {
            title: "Reporting a Problem",
            titleVi: "Báo cáo sự cố",
            description: "Tell your landlord about broken things",
            descriptionVi: "Thông báo cho chủ nhà về đồ hỏng",
            sampleDialogue: [
              { speaker: "You", line: "房东您好，空调坏了，不制冷了。", pinyin: "Fángdōng nín hǎo, kōngtiáo huài le, bù zhìlěng le.", translationVi: "Chào chủ nhà, máy lạnh hỏng rồi, không làm lạnh nữa.", translationEn: "Hello, landlord, the air conditioner is broken. It's not cooling anymore." },
              { speaker: "房东", line: "好的，我明天找人来修。你在家吗？", pinyin: "Hǎo de, wǒ míngtiān zhǎo rén lái xiū. Nǐ zài jiā ma?", translationVi: "Được, ngày mai tôi cho người đến sửa. Bạn ở nhà không?", translationEn: "Okay, I'll send someone to fix it tomorrow. Will you be home?" },
              { speaker: "You", line: "下午在。上午我要上班。", pinyin: "Xiàwǔ zài. Shàngwǔ wǒ yào shàngbān.", translationVi: "Chiều tôi ở nhà. Sáng tôi phải đi làm.", translationEn: "I'll be home in the afternoon. I have to work in the morning." },
              { speaker: "房东", line: "好，我让师傅下午两点过去。", pinyin: "Hǎo, wǒ ràng shīfu xiàwǔ liǎng diǎn guòqù.", translationVi: "Được, tôi bảo thợ 2 giờ chiều đến.", translationEn: "Okay, I'll tell the technician to come at 2 PM." },
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
      // ──── Lesson 8: Banking & Finance ────
      {
        id: "cn-dl-08-bank",
        title: "Banking & Finance",
        titleVi: "Ngân hàng & Tài chính",
        titleZh: "银行业务",
        icon: "Landmark",
        description: "Open accounts, exchange currency, and use ATMs in China",
        descriptionVi: "Mở tài khoản, đổi tiền và sử dụng ATM tại Trung Quốc",
        hskLevel: 3,
        badge: "理财能手",
        badgeVi: "Chuyên gia Tài chính",
        keySituations: [
          {
            title: "Opening a Bank Account",
            titleVi: "Mở tài khoản ngân hàng",
            description: "Open a new account at a Chinese bank",
            descriptionVi: "Mở tài khoản mới tại ngân hàng Trung Quốc",
            culturalNote: "Most banks require your passport and a Chinese phone number. 中国银行 (Bank of China) and 工商银行 (ICBC) are foreigner-friendly. Mobile payment (支付宝/微信支付) dominates daily transactions.",
            culturalNoteVi: "Phần lớn ngân hàng yêu cầu hộ chiếu và số điện thoại Trung Quốc. Bank of China và ICBC thân thiện với người nước ngoài. Thanh toán qua điện thoại (Alipay/WeChat Pay) thống trị giao dịch hàng ngày.",
            sampleDialogue: [
              { speaker: "A", line: "你好，我想开一个银行账户。", pinyin: "Nǐ hǎo, wǒ xiǎng kāi yí ge yínháng zhànghù.", translationVi: "Xin chào, tôi muốn mở một tài khoản ngân hàng.", translationEn: "Hello, I'd like to open a bank account." },
              { speaker: "B", line: "请出示您的护照和手机号码。", pinyin: "Qǐng chūshì nín de hùzhào hé shǒujī hàomǎ.", translationVi: "Vui lòng xuất trình hộ chiếu và số điện thoại.", translationEn: "Please show your passport and phone number." },
              { speaker: "A", line: "好的，给您。需要存多少钱？", pinyin: "Hǎo de, gěi nín. Xūyào cún duōshǎo qián?", translationVi: "Vâng, đây ạ. Cần gửi bao nhiêu tiền?", translationEn: "Yes, here you go. How much money do I need to deposit?" },
              { speaker: "B", line: "最低存一百块就可以。", pinyin: "Zuìdī cún yìbǎi kuài jiù kěyǐ.", translationVi: "Tối thiểu gửi 100 tệ là được.", translationEn: "A minimum deposit of 100 yuan is fine." },
            ],
          },
          {
            title: "Exchanging Currency",
            titleVi: "Đổi tiền",
            description: "Exchange foreign currency at a bank counter",
            descriptionVi: "Đổi ngoại tệ tại quầy ngân hàng",
            sampleDialogue: [
              { speaker: "A", line: "我想把美元换成人民币。", pinyin: "Wǒ xiǎng bǎ měiyuán huànchéng rénmínbì.", translationVi: "Tôi muốn đổi đô la Mỹ sang nhân dân tệ.", translationEn: "I want to exchange US dollars for yuan." },
              { speaker: "B", line: "今天的汇率是七点二。请问换多少？", pinyin: "Jīntiān de huìlǜ shì qī diǎn èr. Qǐngwèn huàn duōshǎo?", translationVi: "Tỷ giá hôm nay là 7,2. Đổi bao nhiêu ạ?", translationEn: "Today's exchange rate is 7.2. How much do you want to exchange?" },
              { speaker: "A", line: "换五百美元。", pinyin: "Huàn wǔbǎi měiyuán.", translationVi: "Đổi 500 đô la.", translationEn: "Exchange 500 dollars." },
              { speaker: "B", line: "好的，请在这里签名。", pinyin: "Hǎo de, qǐng zài zhèlǐ qiānmíng.", translationVi: "Vâng, xin ký tên ở đây.", translationEn: "Yes, please sign here." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "银行", pinyin: "yínháng", meaning: "Ngân hàng", meaningEn: "Bank", type: "phrase", example: "我去银行办事。", examplePinyin: "Wǒ qù yínháng bànshì.", exampleVi: "Tôi đi ngân hàng làm việc." },
          { hanzi: "账户", pinyin: "zhànghù", meaning: "Tài khoản", meaningEn: "Account", type: "phrase", example: "请输入账户密码。", examplePinyin: "Qǐng shūrù zhànghù mìmǎ.", exampleVi: "Vui lòng nhập mật khẩu tài khoản." },
          { hanzi: "存钱", pinyin: "cún qián", meaning: "Gửi tiền", meaningEn: "Deposit money", type: "phrase", example: "我每月存一千块。", examplePinyin: "Wǒ měi yuè cún yìqiān kuài.", exampleVi: "Mỗi tháng tôi gửi 1000 tệ." },
          { hanzi: "取钱", pinyin: "qǔ qián", meaning: "Rút tiền", meaningEn: "Withdraw money", type: "phrase", example: "我去ATM取钱。", examplePinyin: "Wǒ qù ATM qǔ qián.", exampleVi: "Tôi đi ATM rút tiền." },
          { hanzi: "汇率", pinyin: "huìlǜ", meaning: "Tỷ giá", meaningEn: "Exchange rate", type: "phrase", example: "今天的汇率不错。", examplePinyin: "Jīntiān de huìlǜ búcuò.", exampleVi: "Tỷ giá hôm nay khá tốt." },
          { hanzi: "转账", pinyin: "zhuǎnzhàng", meaning: "Chuyển khoản", meaningEn: "Transfer money", type: "phrase", example: "我给他转账了。", examplePinyin: "Wǒ gěi tā zhuǎnzhàng le.", exampleVi: "Tôi đã chuyển khoản cho anh ấy." },
          { hanzi: "信用卡", pinyin: "xìnyòngkǎ", meaning: "Thẻ tín dụng", meaningEn: "Credit card", type: "phrase", example: "可以刷信用卡吗？", examplePinyin: "Kěyǐ shuā xìnyòngkǎ ma?", exampleVi: "Quẹt thẻ tín dụng được không?" },
          { hanzi: "密码", pinyin: "mìmǎ", meaning: "Mật khẩu", meaningEn: "Password / PIN", type: "phrase", example: "请记住您的密码。", examplePinyin: "Qǐng jìzhù nín de mìmǎ.", exampleVi: "Vui lòng nhớ mật khẩu của bạn." },
          { hanzi: "贷款", pinyin: "dàikuǎn", meaning: "Vay tiền / Cho vay", meaningEn: "Loan", type: "phrase", example: "他向银行贷款买房。", examplePinyin: "Tā xiàng yínháng dàikuǎn mǎi fáng.", exampleVi: "Anh ấy vay ngân hàng để mua nhà." },
          { hanzi: "利息", pinyin: "lìxī", meaning: "Lãi suất", meaningEn: "Interest", type: "phrase", example: "这个账户利息高。", examplePinyin: "Zhège zhànghù lìxī gāo.", exampleVi: "Tài khoản này lãi suất cao." },
        ],
        commonStructures: [
          {
            pattern: "把 + Object + 换成 + New Form",
            patternPinyin: "Bǎ + Object + huànchéng + New Form",
            explanation: "Convert/exchange something into another form",
            explanationVi: "Đổi/chuyển thứ gì đó sang dạng khác",
            examples: [
              { zh: "把美元换成人民币。", pinyin: "Bǎ měiyuán huànchéng rénmínbì.", vi: "Đổi đô la sang nhân dân tệ." },
              { zh: "把现金换成支付宝余额。", pinyin: "Bǎ xiànjīn huànchéng Zhīfùbǎo yú'é.", vi: "Đổi tiền mặt thành số dư Alipay." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: At the Bank",
          titleVi: "Nghe: Ở ngân hàng",
          transcript: "我今天去中国银行开了一个新账户。工作人员让我出示护照和手机号。我存了五百块钱，还申请了一张银行卡。她说三天后可以来取卡。",
          transcriptPinyin: "Wǒ jīntiān qù Zhōngguó Yínháng kāi le yí ge xīn zhànghù. Gōngzuò rényuán ràng wǒ chūshì hùzhào hé shǒujī hào. Wǒ cún le wǔbǎi kuài qián, hái shēnqǐng le yì zhāng yínháng kǎ. Tā shuō sān tiān hòu kěyǐ lái qǔ kǎ.",
          questions: [
            { q: "Which bank did the speaker visit?", qVi: "Người nói đến ngân hàng nào?", options: ["工商银行", "中国银行", "建设银行", "招商银行"], answer: 1 },
            { q: "What documents were required?", qVi: "Cần giấy tờ gì?", options: ["驾照", "护照和手机号", "学生证", "身份证"], answer: 1 },
            { q: "How much money was deposited?", qVi: "Đã gửi bao nhiêu tiền?", options: ["100元", "300元", "500元", "1000元"], answer: 2 },
            { q: "When can the card be picked up?", qVi: "Khi nào lấy thẻ được?", options: ["明天", "三天后", "一周后", "两周后"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Describe how to open a bank account in your country",
          "Compare cash vs mobile payment in China",
          "Explain how to exchange currency at a bank",
        ],
        fillInBlankExercises: [
          { sentence: "我想___一个银行账户。", pinyin: "Wǒ xiǎng ___ yí ge yínháng zhànghù.", answer: "开", translationVi: "Tôi muốn mở một tài khoản ngân hàng.", translationEn: "I want to open a bank account.", hint: "开 = mở" },
          { sentence: "请输入您的___密码。", pinyin: "Qǐng shūrù nín de ___ mìmǎ.", answer: "银行卡", translationVi: "Vui lòng nhập mật khẩu thẻ ngân hàng.", translationEn: "Please enter your bank card password." },
          { sentence: "我要把钱___到他的账户。", pinyin: "Wǒ yào bǎ qián ___ dào tā de zhànghù.", answer: "转账", translationVi: "Tôi muốn chuyển khoản sang tài khoản anh ấy.", translationEn: "I want to transfer money to his account." },
          { sentence: "这家银行的___很高。", pinyin: "Zhè jiā yínháng de ___ hěn gāo.", answer: "利息", translationVi: "Lãi suất ngân hàng này khá cao.", translationEn: "The interest rate at this bank is quite high." },
        ],
      },
      // ──── Lesson 9: Post Office & Delivery ────
      {
        id: "cn-dl-09-post",
        title: "Post Office & Delivery",
        titleVi: "Bưu điện & Giao hàng",
        titleZh: "邮局快递",
        icon: "Package",
        description: "Send packages, track deliveries, and use express services",
        descriptionVi: "Gửi bưu phẩm, theo dõi đơn hàng và dùng dịch vụ chuyển phát nhanh",
        hskLevel: 2,
        badge: "快递达人",
        badgeVi: "Cao thủ Chuyển phát",
        keySituations: [
          {
            title: "Sending a Package",
            titleVi: "Gửi bưu kiện",
            description: "Send a package to another city",
            descriptionVi: "Gửi bưu kiện đến thành phố khác",
            culturalNote: "China's express delivery (快递 kuàidì) is famously fast and cheap. 顺丰 (SF Express), 圆通 (YTO), and 京东 (JD) are top brands. Most deliveries arrive within 1-3 days nationwide.",
            culturalNoteVi: "Dịch vụ chuyển phát nhanh ở Trung Quốc nổi tiếng nhanh và rẻ. SF Express, YTO và JD là các thương hiệu hàng đầu. Hầu hết đơn hàng đến trong 1-3 ngày.",
            sampleDialogue: [
              { speaker: "A", line: "你好，我想寄一个包裹去上海。", pinyin: "Nǐ hǎo, wǒ xiǎng jì yí ge bāoguǒ qù Shànghǎi.", translationVi: "Xin chào, tôi muốn gửi một bưu kiện đến Thượng Hải.", translationEn: "Hello, I'd like to send a parcel to Shanghai." },
              { speaker: "B", line: "请把包裹放在秤上。里面是什么？", pinyin: "Qǐng bǎ bāoguǒ fàng zài chèng shàng. Lǐmiàn shì shénme?", translationVi: "Xin đặt bưu kiện lên cân. Bên trong là gì?", translationEn: "Please place the parcel on the scale. What's inside?" },
              { speaker: "A", line: "是衣服和书。多少钱？", pinyin: "Shì yīfu hé shū. Duōshǎo qián?", translationVi: "Là quần áo và sách. Bao nhiêu tiền?", translationEn: "It's clothes and books. How much does it cost?" },
              { speaker: "B", line: "顺丰快递一共三十五块，明天到。", pinyin: "Shùnfēng kuàidì yígòng sānshíwǔ kuài, míngtiān dào.", translationVi: "SF Express tổng cộng 35 tệ, ngày mai tới.", translationEn: "SF Express is 35 yuan in total, it will arrive tomorrow." },
            ],
          },
          {
            title: "Tracking a Lost Package",
            titleVi: "Tra cứu bưu kiện thất lạc",
            description: "Ask about a delayed package",
            descriptionVi: "Hỏi về bưu kiện bị chậm trễ",
            sampleDialogue: [
              { speaker: "A", line: "我的包裹三天前应该到，但还没收到。", pinyin: "Wǒ de bāoguǒ sān tiān qián yīnggāi dào, dàn hái méi shōudào.", translationVi: "Bưu kiện của tôi đáng lẽ tới 3 ngày trước, nhưng chưa nhận được.", translationEn: "My parcel was supposed to arrive 3 days ago, but I haven't received it yet." },
              { speaker: "B", line: "请告诉我您的快递单号。", pinyin: "Qǐng gàosu wǒ nín de kuàidì dānhào.", translationVi: "Vui lòng cho tôi mã đơn hàng.", translationEn: "Please give me the tracking number." },
              { speaker: "A", line: "号码是SF1234567890。", pinyin: "Hàomǎ shì SF1234567890.", translationVi: "Mã là SF1234567890.", translationEn: "The number is SF1234567890." },
              { speaker: "B", line: "我帮您查一下。哦，包裹在分拣中心，今天就送到。", pinyin: "Wǒ bāng nín chá yíxià. Ò, bāoguǒ zài fēnjiǎn zhōngxīn, jīntiān jiù sòngdào.", translationVi: "Tôi tra giúp bạn. Ồ, bưu kiện đang ở trung tâm phân loại, hôm nay sẽ giao.", translationEn: "I'll check it for you. Oh, the parcel is at the sorting center and will be delivered today." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "快递", pinyin: "kuàidì", meaning: "Chuyển phát nhanh", meaningEn: "Express delivery", type: "phrase", example: "快递明天到。", examplePinyin: "Kuàidì míngtiān dào.", exampleVi: "Hàng nhanh ngày mai đến." },
          { hanzi: "包裹", pinyin: "bāoguǒ", meaning: "Bưu kiện", meaningEn: "Package", type: "phrase", example: "我收到了一个包裹。", examplePinyin: "Wǒ shōudào le yí ge bāoguǒ.", exampleVi: "Tôi đã nhận một bưu kiện." },
          { hanzi: "寄", pinyin: "jì", meaning: "Gửi (bưu phẩm)", meaningEn: "To mail / send", type: "phrase", example: "我寄信给妈妈。", examplePinyin: "Wǒ jì xìn gěi māma.", exampleVi: "Tôi gửi thư cho mẹ." },
          { hanzi: "签收", pinyin: "qiānshōu", meaning: "Ký nhận", meaningEn: "Sign for delivery", type: "phrase", example: "请签收快递。", examplePinyin: "Qǐng qiānshōu kuàidì.", exampleVi: "Vui lòng ký nhận hàng." },
          { hanzi: "单号", pinyin: "dānhào", meaning: "Mã đơn hàng", meaningEn: "Tracking number", type: "phrase", example: "你的单号是多少？", examplePinyin: "Nǐ de dānhào shì duōshǎo?", exampleVi: "Mã đơn hàng của bạn là gì?" },
          { hanzi: "收件人", pinyin: "shōujiànrén", meaning: "Người nhận", meaningEn: "Recipient", type: "phrase", example: "收件人是谁？", examplePinyin: "Shōujiànrén shì shéi?", exampleVi: "Người nhận là ai?" },
          { hanzi: "地址", pinyin: "dìzhǐ", meaning: "Địa chỉ", meaningEn: "Address", type: "phrase", example: "请写下您的地址。", examplePinyin: "Qǐng xiěxià nín de dìzhǐ.", exampleVi: "Vui lòng viết địa chỉ của bạn." },
          { hanzi: "运费", pinyin: "yùnfèi", meaning: "Phí vận chuyển", meaningEn: "Shipping fee", type: "phrase", example: "运费多少钱？", examplePinyin: "Yùnfèi duōshǎo qián?", exampleVi: "Phí ship bao nhiêu?" },
          { hanzi: "包装", pinyin: "bāozhuāng", meaning: "Đóng gói", meaningEn: "Packaging", type: "phrase", example: "包装很结实。", examplePinyin: "Bāozhuāng hěn jiēshí.", exampleVi: "Đóng gói rất chắc chắn." },
        ],
        commonStructures: [
          {
            pattern: "应该 + Verb + 但 + 还没",
            patternPinyin: "Yīnggāi + Verb + dàn + hái méi",
            explanation: "Should have done X but hasn't yet",
            explanationVi: "Đáng lẽ phải làm X nhưng vẫn chưa",
            examples: [
              { zh: "包裹应该到，但还没到。", pinyin: "Bāoguǒ yīnggāi dào, dàn hái méi dào.", vi: "Bưu kiện đáng lẽ tới rồi mà chưa tới." },
              { zh: "他应该来，但还没来。", pinyin: "Tā yīnggāi lái, dàn hái méi lái.", vi: "Anh ấy đáng lẽ đến rồi mà chưa đến." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Tracking a Package",
          titleVi: "Nghe: Tra cứu bưu kiện",
          transcript: "我昨天在淘宝买了一双鞋，今天用顺丰快递寄的。运费一共十二块。客服说包裹明天下午就能到我家。我可以在手机上随时查看快递的位置。",
          transcriptPinyin: "Wǒ zuótiān zài Táobǎo mǎi le yì shuāng xié, jīntiān yòng Shùnfēng kuàidì jì de. Yùnfèi yígòng shí'èr kuài. Kèfú shuō bāoguǒ míngtiān xiàwǔ jiù néng dào wǒ jiā. Wǒ kěyǐ zài shǒujī shàng suíshí chákàn kuàidì de wèizhì.",
          questions: [
            { q: "What did the speaker buy?", qVi: "Người nói đã mua gì?", options: ["衣服", "鞋", "书", "电脑"], answer: 1 },
            { q: "Which courier was used?", qVi: "Dùng hãng vận chuyển nào?", options: ["圆通", "顺丰", "京东", "中通"], answer: 1 },
            { q: "How much was the shipping fee?", qVi: "Phí ship bao nhiêu?", options: ["10元", "12元", "15元", "20元"], answer: 1 },
            { q: "When will the package arrive?", qVi: "Khi nào hàng đến?", options: ["今晚", "明天上午", "明天下午", "后天"], answer: 2 },
          ],
        },
        speakingTopics: [
          "Describe the express delivery system in China",
          "Explain how to send a package abroad",
          "Compare delivery services in China and your country",
        ],
        fillInBlankExercises: [
          { sentence: "我想___一个包裹去越南。", pinyin: "Wǒ xiǎng ___ yí ge bāoguǒ qù Yuènán.", answer: "寄", translationVi: "Tôi muốn gửi một bưu kiện đi Việt Nam.", translationEn: "I want to send a parcel to Vietnam." },
          { sentence: "请填写___地址。", pinyin: "Qǐng tiánxiě ___ dìzhǐ.", answer: "收件人", translationVi: "Vui lòng điền địa chỉ người nhận.", translationEn: "Please fill in the recipient's address." },
          { sentence: "我要选___，三天到。", pinyin: "Wǒ yào xuǎn ___, sān tiān dào.", answer: "快递", translationVi: "Tôi chọn chuyển phát nhanh, 3 ngày đến.", translationEn: "I'll choose express delivery, it will arrive in 3 days." },
          { sentence: "___费一共五十块。", pinyin: "___ fèi yígòng wǔshí kuài.", answer: "邮", translationVi: "Phí bưu chính tổng 50 tệ.", translationEn: "The total postage fee is 50 yuan." },
        ],
      },
      // ──── Lesson 10: Mobile & Internet ────
      {
        id: "cn-dl-10-mobile",
        title: "Mobile Phone & Internet",
        titleVi: "Điện thoại & Internet",
        titleZh: "手机网络",
        icon: "Smartphone",
        description: "Buy SIM cards, choose data plans, and troubleshoot internet issues",
        descriptionVi: "Mua SIM, chọn gói cước và xử lý sự cố mạng",
        hskLevel: 3,
        badge: "数字达人",
        badgeVi: "Cao thủ Số hóa",
        keySituations: [
          {
            title: "Buying a SIM Card",
            titleVi: "Mua SIM",
            description: "Buy a Chinese SIM card at a phone shop",
            descriptionVi: "Mua SIM Trung Quốc tại cửa hàng điện thoại",
            culturalNote: "Three major carriers: 中国移动 (China Mobile), 中国联通 (China Unicom), 中国电信 (China Telecom). Foreigners need passport for SIM registration. Most shops offer monthly packages with 30GB+ data for ~50元.",
            culturalNoteVi: "Ba nhà mạng lớn: China Mobile, China Unicom, China Telecom. Người nước ngoài cần hộ chiếu để đăng ký. Đa số cửa hàng có gói tháng 30GB+ với giá ~50 tệ.",
            sampleDialogue: [
              { speaker: "A", line: "你好，我想办一张电话卡。", pinyin: "Nǐ hǎo, wǒ xiǎng bàn yì zhāng diànhuà kǎ.", translationVi: "Xin chào, tôi muốn làm thẻ điện thoại.", translationEn: "Hello, I want to get a phone card." },
              { speaker: "B", line: "请出示护照。您要什么套餐？", pinyin: "Qǐng chūshì hùzhào. Nín yào shénme tàocān?", translationVi: "Xin xuất trình hộ chiếu. Bạn muốn gói gì?", translationEn: "Please show your passport. Which plan do you want?" },
              { speaker: "A", line: "我每月用很多流量，请推荐。", pinyin: "Wǒ měi yuè yòng hěn duō liúliàng, qǐng tuījiàn.", translationVi: "Mỗi tháng tôi dùng nhiều data, xin đề xuất.", translationEn: "I use a lot of data each month, please recommend a plan." },
              { speaker: "B", line: "这个套餐六十块，包含五十G流量和一百分钟通话。", pinyin: "Zhège tàocān liùshí kuài, bāohán wǔshí G liúliàng hé yìbǎi fēnzhōng tōnghuà.", translationVi: "Gói này 60 tệ, gồm 50GB data và 100 phút gọi.", translationEn: "This plan is 60 yuan, including 50GB of data and 100 minutes of calls." },
            ],
          },
          {
            title: "Slow Internet Issue",
            titleVi: "Mạng chậm",
            description: "Report slow Wi-Fi to customer service",
            descriptionVi: "Báo Wi-Fi chậm cho dịch vụ khách hàng",
            sampleDialogue: [
              { speaker: "A", line: "你好，我家的网络非常慢。", pinyin: "Nǐ hǎo, wǒ jiā de wǎngluò fēicháng màn.", translationVi: "Xin chào, mạng nhà tôi rất chậm.", translationEn: "Hello, my home internet is very slow." },
              { speaker: "B", line: "请重启路由器试试。", pinyin: "Qǐng chóngqǐ lùyóuqì shìshi.", translationVi: "Xin khởi động lại router thử xem.", translationEn: "Please try restarting your router." },
              { speaker: "A", line: "我试过了还是慢。", pinyin: "Wǒ shìguò le háishì màn.", translationVi: "Tôi đã thử rồi vẫn chậm.", translationEn: "I've tried that and it's still slow." },
              { speaker: "B", line: "好的，我们明天派师傅上门检查。", pinyin: "Hǎo de, wǒmen míngtiān pài shīfu shàngmén jiǎnchá.", translationVi: "Vâng, mai chúng tôi cử kỹ thuật viên đến kiểm tra.", translationEn: "Okay, tomorrow we'll send a technician to check it." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "手机", pinyin: "shǒujī", meaning: "Điện thoại di động", meaningEn: "Mobile phone", type: "phrase", example: "我的手机没电了。", examplePinyin: "Wǒ de shǒujī méi diàn le.", exampleVi: "Điện thoại tôi hết pin." },
          { hanzi: "电话卡", pinyin: "diànhuà kǎ", meaning: "SIM điện thoại", meaningEn: "SIM card", type: "phrase", example: "我需要一张电话卡。", examplePinyin: "Wǒ xūyào yì zhāng diànhuà kǎ.", exampleVi: "Tôi cần một SIM." },
          { hanzi: "套餐", pinyin: "tàocān", meaning: "Gói cước", meaningEn: "Plan / Package", type: "phrase", example: "这个套餐很便宜。", examplePinyin: "Zhège tàocān hěn piányi.", exampleVi: "Gói cước này rất rẻ." },
          { hanzi: "流量", pinyin: "liúliàng", meaning: "Dung lượng data", meaningEn: "Mobile data", type: "phrase", example: "我每月用三十G流量。", examplePinyin: "Wǒ měi yuè yòng sānshí G liúliàng.", exampleVi: "Mỗi tháng tôi dùng 30GB data." },
          { hanzi: "信号", pinyin: "xìnhào", meaning: "Tín hiệu", meaningEn: "Signal", type: "phrase", example: "这里信号不好。", examplePinyin: "Zhèlǐ xìnhào bù hǎo.", exampleVi: "Ở đây tín hiệu không tốt." },
          { hanzi: "网络", pinyin: "wǎngluò", meaning: "Mạng", meaningEn: "Network / Internet", type: "phrase", example: "网络很慢。", examplePinyin: "Wǎngluò hěn màn.", exampleVi: "Mạng rất chậm." },
          { hanzi: "无线网", pinyin: "wúxiàn wǎng", meaning: "Wi-Fi", meaningEn: "Wi-Fi", type: "phrase", example: "请告诉我无线网密码。", examplePinyin: "Qǐng gàosu wǒ wúxiàn wǎng mìmǎ.", exampleVi: "Xin cho tôi mật khẩu Wi-Fi." },
          { hanzi: "充电", pinyin: "chōngdiàn", meaning: "Sạc pin", meaningEn: "Charge", type: "phrase", example: "我需要充电。", examplePinyin: "Wǒ xūyào chōngdiàn.", exampleVi: "Tôi cần sạc pin." },
          { hanzi: "下载", pinyin: "xiàzài", meaning: "Tải xuống", meaningEn: "Download", type: "phrase", example: "下载这个APP。", examplePinyin: "Xiàzài zhège APP.", exampleVi: "Tải app này về." },
          { hanzi: "应用", pinyin: "yìngyòng", meaning: "Ứng dụng", meaningEn: "App / Application", type: "phrase", example: "我喜欢这个应用。", examplePinyin: "Wǒ xǐhuan zhège yìngyòng.", exampleVi: "Tôi thích ứng dụng này." },
        ],
        commonStructures: [
          {
            pattern: "包含 + Number + Quantity + Item",
            patternPinyin: "Bāohán + Number + Quantity + Item",
            explanation: "Includes a specific amount of something",
            explanationVi: "Bao gồm một lượng cụ thể của thứ gì đó",
            examples: [
              { zh: "套餐包含五十G流量。", pinyin: "Tàocān bāohán wǔshí G liúliàng.", vi: "Gói cước bao gồm 50GB data." },
              { zh: "门票包含一杯饮料。", pinyin: "Ménpiào bāohán yì bēi yǐnliào.", vi: "Vé vào cổng bao gồm 1 ly nước." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Choosing a Phone Plan",
          titleVi: "Nghe: Chọn gói cước",
          transcript: "我刚到中国，需要一张电话卡。中国移动的工作人员推荐了一个六十块的月套餐，里面有五十G流量和一百分钟通话。我觉得很合适，就办了一张。激活以后立刻就能用了。",
          transcriptPinyin: "Wǒ gāng dào Zhōngguó, xūyào yì zhāng diànhuà kǎ. Zhōngguó Yídòng de gōngzuò rényuán tuījiàn le yí ge liùshí kuài de yuè tàocān, lǐmiàn yǒu wǔshí G liúliàng hé yìbǎi fēnzhōng tōnghuà. Wǒ juéde hěn héshì, jiù bàn le yì zhāng. Jīhuó yǐhòu lìkè jiù néng yòng le.",
          questions: [
            { q: "Which carrier was recommended?", qVi: "Nhà mạng nào được đề xuất?", options: ["中国电信", "中国联通", "中国移动", "Apple"], answer: 2 },
            { q: "How much is the monthly plan?", qVi: "Gói tháng giá bao nhiêu?", options: ["30元", "50元", "60元", "100元"], answer: 2 },
            { q: "How much data is included?", qVi: "Gồm bao nhiêu data?", options: ["20G", "30G", "50G", "100G"], answer: 2 },
            { q: "When can the SIM be used?", qVi: "Khi nào dùng SIM được?", options: ["三天后", "激活后立刻", "一周后", "下个月"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Compare mobile plans in China vs your country",
          "Describe how to fix common Wi-Fi problems",
          "Talk about your favorite Chinese app",
        ],
        fillInBlankExercises: [
          { sentence: "我的手机___了，怎么办？", pinyin: "Wǒ de shǒujī ___ le, zěnme bàn?", answer: "坏", translationVi: "Điện thoại tôi hỏng rồi, làm sao đây?", translationEn: "My phone is broken, what should I do?" },
          { sentence: "我要充___套餐。", pinyin: "Wǒ yào chōng ___ tàocān.", answer: "流量", translationVi: "Tôi muốn nạp gói data.", translationEn: "I want to top up my data plan." },
          { sentence: "家里的___信号不好。", pinyin: "Jiā lǐ de ___ xìnhào bù hǎo.", answer: "WiFi", translationVi: "Tín hiệu WiFi ở nhà không tốt.", translationEn: "The WiFi signal at home is not good." },
          { sentence: "请帮我___一下手机。", pinyin: "Qǐng bāng wǒ ___ yíxià shǒujī.", answer: "修", translationVi: "Xin sửa giúp tôi điện thoại.", translationEn: "Please fix my phone." },
        ],
      },
      // ──── Lesson 11: Haircut & Beauty ────
      {
        id: "cn-dl-11-haircut",
        title: "Haircut & Beauty Services",
        titleVi: "Cắt tóc & Làm đẹp",
        titleZh: "理发美容",
        icon: "Scissors",
        description: "Request hairstyles, salon services, and basic beauty treatments",
        descriptionVi: "Yêu cầu kiểu tóc, dịch vụ salon và chăm sóc sắc đẹp cơ bản",
        hskLevel: 2,
        badge: "美丽达人",
        badgeVi: "Cao thủ Sắc đẹp",
        keySituations: [
          {
            title: "Getting a Haircut",
            titleVi: "Cắt tóc",
            description: "Describe your desired hairstyle to a hairdresser",
            descriptionVi: "Mô tả kiểu tóc mong muốn cho thợ cắt tóc",
            culturalNote: "Tipping is uncommon in Chinese salons. Many salons offer membership cards (会员卡) with discounts. 'Washing + cutting + blow-dry' (洗剪吹) is the standard combo.",
            culturalNoteVi: "Tip không phổ biến ở salon Trung Quốc. Nhiều nơi có thẻ thành viên 会员卡 với ưu đãi. Combo gội-cắt-sấy 洗剪吹 là tiêu chuẩn.",
            sampleDialogue: [
              { speaker: "A", line: "你好，我想剪头发。", pinyin: "Nǐ hǎo, wǒ xiǎng jiǎn tóufa.", translationVi: "Xin chào, tôi muốn cắt tóc.", translationEn: "Hello, I'd like a haircut." },
              { speaker: "B", line: "您想剪什么样的？", pinyin: "Nín xiǎng jiǎn shénme yàng de?", translationVi: "Bạn muốn cắt kiểu gì?", translationEn: "What kind of cut would you like?" },
              { speaker: "A", line: "两边短一点，上面留长。", pinyin: "Liǎng biān duǎn yìdiǎn, shàngmiàn liú cháng.", translationVi: "Hai bên ngắn một chút, phía trên để dài.", translationEn: "Short on the sides, long on top." },
              { speaker: "B", line: "好的，要洗头吗？", pinyin: "Hǎo de, yào xǐtóu ma?", translationVi: "Vâng, có cần gội đầu không?", translationEn: "Okay, do you need a hair wash?" },
              { speaker: "A", line: "要，洗剪吹一起。", pinyin: "Yào, xǐ jiǎn chuī yìqǐ.", translationVi: "Có, gội-cắt-sấy luôn.", translationEn: "Yes, wash, cut, and blow-dry." },
            ],
          },
          {
            title: "At a Massage Parlor",
            titleVi: "Tại tiệm massage",
            description: "Book a massage and describe pressure preferences",
            descriptionVi: "Đặt massage và yêu cầu lực phù hợp",
            sampleDialogue: [
              { speaker: "A", line: "我想做一个全身按摩。", pinyin: "Wǒ xiǎng zuò yí ge quánshēn ànmó.", translationVi: "Tôi muốn massage toàn thân.", translationEn: "I want a full body massage." },
              { speaker: "B", line: "六十分钟还是九十分钟？", pinyin: "Liùshí fēnzhōng háishì jiǔshí fēnzhōng?", translationVi: "60 phút hay 90 phút?", translationEn: "60 minutes or 90 minutes?" },
              { speaker: "A", line: "九十分钟，力度轻一点。", pinyin: "Jiǔshí fēnzhōng, lìdù qīng yìdiǎn.", translationVi: "90 phút, lực nhẹ một chút.", translationEn: "90 minutes, with light pressure." },
              { speaker: "B", line: "好的，请跟我来。", pinyin: "Hǎo de, qǐng gēn wǒ lái.", translationVi: "Vâng, xin theo tôi.", translationEn: "Okay, please follow me." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "理发", pinyin: "lǐfà", meaning: "Cắt tóc", meaningEn: "Haircut", type: "phrase", example: "我去理发店。", examplePinyin: "Wǒ qù lǐfà diàn.", exampleVi: "Tôi đi tiệm cắt tóc." },
          { hanzi: "头发", pinyin: "tóufa", meaning: "Tóc", meaningEn: "Hair", type: "phrase", example: "她的头发很长。", examplePinyin: "Tā de tóufa hěn cháng.", exampleVi: "Tóc cô ấy rất dài." },
          { hanzi: "洗头", pinyin: "xǐtóu", meaning: "Gội đầu", meaningEn: "Wash hair", type: "phrase", example: "请帮我洗头。", examplePinyin: "Qǐng bāng wǒ xǐtóu.", exampleVi: "Vui lòng gội đầu cho tôi." },
          { hanzi: "染发", pinyin: "rǎnfà", meaning: "Nhuộm tóc", meaningEn: "Dye hair", type: "phrase", example: "我想染头发。", examplePinyin: "Wǒ xiǎng rǎn tóufa.", exampleVi: "Tôi muốn nhuộm tóc." },
          { hanzi: "烫发", pinyin: "tàngfà", meaning: "Uốn tóc", meaningEn: "Perm hair", type: "phrase", example: "她去烫发了。", examplePinyin: "Tā qù tàngfà le.", exampleVi: "Cô ấy đi uốn tóc." },
          { hanzi: "按摩", pinyin: "ànmó", meaning: "Massage", meaningEn: "Massage", type: "phrase", example: "我喜欢按摩。", examplePinyin: "Wǒ xǐhuan ànmó.", exampleVi: "Tôi thích massage." },
          { hanzi: "美容", pinyin: "měiróng", meaning: "Làm đẹp", meaningEn: "Beauty / Skincare", type: "phrase", example: "她去美容院了。", examplePinyin: "Tā qù měiróng yuàn le.", exampleVi: "Cô ấy đi tiệm làm đẹp." },
          { hanzi: "刘海", pinyin: "liúhǎi", meaning: "Tóc mái", meaningEn: "Bangs / Fringe", type: "phrase", example: "我想剪刘海。", examplePinyin: "Wǒ xiǎng jiǎn liúhǎi.", exampleVi: "Tôi muốn cắt tóc mái." },
          { hanzi: "短", pinyin: "duǎn", meaning: "Ngắn", meaningEn: "Short", type: "phrase", example: "请剪短一点。", examplePinyin: "Qǐng jiǎn duǎn yìdiǎn.", exampleVi: "Xin cắt ngắn một chút." },
        ],
        commonStructures: [
          {
            pattern: "Adj + 一点",
            patternPinyin: "Adj + yìdiǎn",
            explanation: "A bit more [adjective] - softens requests",
            explanationVi: "Hơn một chút (cách yêu cầu nhẹ nhàng)",
            examples: [
              { zh: "短一点。", pinyin: "Duǎn yìdiǎn.", vi: "Ngắn một chút." },
              { zh: "轻一点。", pinyin: "Qīng yìdiǎn.", vi: "Nhẹ một chút." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: At the Salon",
          titleVi: "Nghe: Tại salon",
          transcript: "我今天去理发店剪头发。我告诉理发师两边剪短，前面留刘海。她还帮我洗头、按摩头皮，最后吹干。整个过程一个小时，一共五十块钱。我觉得很满意。",
          transcriptPinyin: "Wǒ jīntiān qù lǐfà diàn jiǎn tóufa. Wǒ gàosu lǐfàshī liǎng biān jiǎn duǎn, qiánmiàn liú liúhǎi. Tā hái bāng wǒ xǐtóu, ànmó tóupí, zuìhòu chuīgān. Zhěnggè guòchéng yí ge xiǎoshí, yígòng wǔshí kuài qián. Wǒ juéde hěn mǎnyì.",
          questions: [
            { q: "Where did the speaker go?", qVi: "Người nói đến đâu?", options: ["美容院", "理发店", "按摩店", "医院"], answer: 1 },
            { q: "What hairstyle was requested?", qVi: "Yêu cầu kiểu tóc gì?", options: ["全部剪短", "两边短，留刘海", "染色", "烫卷"], answer: 1 },
            { q: "How long did it take?", qVi: "Mất bao lâu?", options: ["半小时", "一小时", "两小时", "三小时"], answer: 1 },
            { q: "How much did it cost?", qVi: "Tốn bao nhiêu tiền?", options: ["30元", "50元", "80元", "100元"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Describe your favorite hairstyle in Chinese",
          "Compare salon prices between China and your country",
          "Talk about a haircut experience that went wrong",
        ],
        fillInBlankExercises: [
          { sentence: "我想___个头发。", pinyin: "Wǒ xiǎng ___ ge tóufà.", answer: "剪", translationVi: "Tôi muốn cắt tóc.", translationEn: "I want a haircut." },
          { sentence: "请帮我___头。", pinyin: "Qǐng bāng wǒ ___ tóu.", answer: "洗", translationVi: "Xin gội đầu giúp tôi.", translationEn: "Please wash my hair for me." },
          { sentence: "我要做___，染棕色。", pinyin: "Wǒ yào zuò ___, rǎn zōngsè.", answer: "染发", translationVi: "Tôi muốn nhuộm tóc, nhuộm màu nâu.", translationEn: "I want to dye my hair, brown." },
          { sentence: "短发让我看起来更___。", pinyin: "Duǎn fà ràng wǒ kàn qǐlái gèng ___.", answer: "精神", translationVi: "Tóc ngắn làm tôi trông tươi tỉnh hơn.", translationEn: "Short hair makes me look more refreshed." },
        ],
      },
      // ──── Lesson 12: Laundry & Repair ────
      {
        id: "cn-dl-12-laundry",
        title: "Laundry & Clothing Repair",
        titleVi: "Giặt là & Sửa quần áo",
        titleZh: "洗衣修补",
        icon: "Shirt",
        description: "Use laundry services and request basic clothing alterations",
        descriptionVi: "Dùng dịch vụ giặt là và yêu cầu sửa chữa quần áo cơ bản",
        hskLevel: 2,
        badge: "整洁达人",
        badgeVi: "Cao thủ Gọn gàng",
        keySituations: [
          {
            title: "Dropping Off Laundry",
            titleVi: "Gửi đồ giặt",
            description: "Send clothes to a dry cleaner",
            descriptionVi: "Gửi quần áo cho tiệm giặt khô",
            culturalNote: "Many residential complexes have self-service laundromats. Dry cleaning (干洗 gānxǐ) is common for suits and coats. Receipts are essential for pickup.",
            culturalNoteVi: "Nhiều khu chung cư có máy giặt tự phục vụ. Giặt khô 干洗 phổ biến cho vest và áo khoác. Hóa đơn rất quan trọng khi nhận đồ.",
            sampleDialogue: [
              { speaker: "A", line: "你好，我想干洗这件西装。", pinyin: "Nǐ hǎo, wǒ xiǎng gānxǐ zhè jiàn xīzhuāng.", translationVi: "Xin chào, tôi muốn giặt khô bộ vest này.", translationEn: "Hello, I'd like to dry clean this suit." },
              { speaker: "B", line: "好的，三十块。后天可以来取。", pinyin: "Hǎo de, sānshí kuài. Hòutiān kěyǐ lái qǔ.", translationVi: "Vâng, 30 tệ. Ngày kia có thể lấy.", translationEn: "Okay, 30 yuan. It will be ready the day after tomorrow." },
              { speaker: "A", line: "这是收据，请收好。", pinyin: "Zhè shì shōujù, qǐng shōuhǎo.", translationVi: "Đây là biên nhận, xin giữ kỹ.", translationEn: "Here's the receipt, please keep it safe." },
              { speaker: "B", line: "好的，谢谢。", pinyin: "Hǎo de, xièxie.", translationVi: "Vâng, cảm ơn.", translationEn: "Okay, thank you." },
            ],
          },
          {
            title: "Repairing a Zipper",
            titleVi: "Sửa khóa kéo",
            description: "Get a broken zipper fixed at a tailor",
            descriptionVi: "Sửa khóa kéo hỏng tại tiệm may",
            sampleDialogue: [
              { speaker: "A", line: "我的外套拉链坏了，能修吗？", pinyin: "Wǒ de wàitào lāliàn huài le, néng xiū ma?", translationVi: "Khóa kéo áo khoác tôi hỏng rồi, sửa được không?", translationEn: "The zipper on my jacket is broken, can it be fixed?" },
              { speaker: "B", line: "可以，换一条新的二十块。", pinyin: "Kěyǐ, huàn yì tiáo xīn de èrshí kuài.", translationVi: "Được, thay khóa mới 20 tệ.", translationEn: "Yes, a new zipper replacement is 20 yuan." },
              { speaker: "A", line: "多久能修好？", pinyin: "Duō jiǔ néng xiūhǎo?", translationVi: "Bao lâu sửa xong?", translationEn: "How long will it take to fix?" },
              { speaker: "B", line: "明天下午就好。", pinyin: "Míngtiān xiàwǔ jiù hǎo.", translationVi: "Chiều mai là xong.", translationEn: "It will be done by tomorrow afternoon." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "洗衣", pinyin: "xǐyī", meaning: "Giặt quần áo", meaningEn: "Do laundry", type: "phrase", example: "我每周洗衣一次。", examplePinyin: "Wǒ měi zhōu xǐyī yí cì.", exampleVi: "Tôi giặt đồ mỗi tuần một lần." },
          { hanzi: "干洗", pinyin: "gānxǐ", meaning: "Giặt khô", meaningEn: "Dry cleaning", type: "phrase", example: "西装要干洗。", examplePinyin: "Xīzhuāng yào gānxǐ.", exampleVi: "Vest phải giặt khô." },
          { hanzi: "洗衣机", pinyin: "xǐyī jī", meaning: "Máy giặt", meaningEn: "Washing machine", type: "phrase", example: "洗衣机坏了。", examplePinyin: "Xǐyī jī huài le.", exampleVi: "Máy giặt hỏng rồi." },
          { hanzi: "拉链", pinyin: "lāliàn", meaning: "Khóa kéo", meaningEn: "Zipper", type: "phrase", example: "拉链坏了。", examplePinyin: "Lāliàn huài le.", exampleVi: "Khóa kéo hỏng rồi." },
          { hanzi: "缝补", pinyin: "féngbǔ", meaning: "May vá", meaningEn: "Sew / Mend", type: "phrase", example: "我会缝补衣服。", examplePinyin: "Wǒ huì féngbǔ yīfu.", exampleVi: "Tôi biết may vá quần áo." },
          { hanzi: "修", pinyin: "xiū", meaning: "Sửa chữa", meaningEn: "Repair", type: "phrase", example: "请修一下。", examplePinyin: "Qǐng xiū yíxià.", exampleVi: "Vui lòng sửa giúp." },
          { hanzi: "收据", pinyin: "shōujù", meaning: "Biên nhận", meaningEn: "Receipt", type: "phrase", example: "请保留收据。", examplePinyin: "Qǐng bǎoliú shōujù.", exampleVi: "Xin giữ biên nhận." },
          { hanzi: "晾干", pinyin: "liànggān", meaning: "Phơi khô", meaningEn: "Air dry", type: "phrase", example: "把衣服晾干。", examplePinyin: "Bǎ yīfu liànggān.", exampleVi: "Phơi quần áo cho khô." },
          { hanzi: "改短", pinyin: "gǎi duǎn", meaning: "Sửa ngắn", meaningEn: "Shorten / Hem", type: "phrase", example: "请把裤子改短。", examplePinyin: "Qǐng bǎ kùzi gǎi duǎn.", exampleVi: "Vui lòng sửa ngắn cái quần." },
        ],
        commonStructures: [
          {
            pattern: "Object + 坏了，能 + Verb + 吗？",
            patternPinyin: "Object + huài le, néng + Verb + ma?",
            explanation: "X is broken - can you fix/do Y?",
            explanationVi: "X bị hỏng rồi - có thể làm/sửa Y không?",
            examples: [
              { zh: "拉链坏了，能修吗？", pinyin: "Lāliàn huài le, néng xiū ma?", vi: "Khóa kéo hỏng, sửa được không?" },
              { zh: "电脑坏了，能修吗？", pinyin: "Diànnǎo huài le, néng xiū ma?", vi: "Máy tính hỏng, sửa được không?" },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: At the Dry Cleaner",
          titleVi: "Nghe: Ở tiệm giặt khô",
          transcript: "我今天送了三件衣服去干洗：一件西装、一件大衣和一条裙子。一共一百二十块。老板说后天下午可以来取。我把收据放在钱包里，怕弄丢。",
          transcriptPinyin: "Wǒ jīntiān sòng le sān jiàn yīfu qù gānxǐ: yí jiàn xīzhuāng, yí jiàn dàyī hé yì tiáo qúnzi. Yígòng yìbǎi èrshí kuài. Lǎobǎn shuō hòutiān xiàwǔ kěyǐ lái qǔ. Wǒ bǎ shōujù fàng zài qiánbāo lǐ, pà nòng diū.",
          questions: [
            { q: "How many items were sent?", qVi: "Gửi bao nhiêu món đồ?", options: ["一件", "两件", "三件", "四件"], answer: 2 },
            { q: "What was NOT sent?", qVi: "Cái gì KHÔNG được gửi?", options: ["西装", "大衣", "裙子", "鞋子"], answer: 3 },
            { q: "Total cost?", qVi: "Tổng chi phí?", options: ["80元", "100元", "120元", "150元"], answer: 2 },
            { q: "When can items be picked up?", qVi: "Khi nào lấy đồ?", options: ["明天", "后天下午", "三天后", "一周后"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Describe how you do laundry at home",
          "Talk about a time you needed clothing repaired",
          "Compare laundry services in China vs your country",
        ],
        fillInBlankExercises: [
          { sentence: "这件衬衫需要___洗。", pinyin: "Zhè jiàn chènshān xūyào ___ xǐ.", answer: "干", translationVi: "Áo này cần giặt khô.", translationEn: "This shirt needs to be dry cleaned." },
          { sentence: "衣服上有一个___。", pinyin: "Yīfu shàng yǒu yí ge ___.", answer: "污渍", translationVi: "Trên áo có một vết bẩn.", translationEn: "There's a stain on the shirt." },
          { sentence: "请帮我___一下裤子。", pinyin: "Qǐng bāng wǒ ___ yíxià kùzi.", answer: "熨", translationVi: "Xin là giúp tôi cái quần.", translationEn: "Please iron my pants for me." },
          { sentence: "鞋子坏了，能___吗？", pinyin: "Xiézi huài le, néng ___ ma?", answer: "修", translationVi: "Giày hỏng rồi, có thể sửa không?", translationEn: "My shoes are broken, can they be fixed?" },
        ],
      },
      // ──── Lesson 13: Lost Items & Police ────
      {
        id: "cn-dl-13-emergency",
        title: "Lost Items & Reporting to Police",
        titleVi: "Mất đồ & Báo cảnh sát",
        titleZh: "报警寻物",
        icon: "Shield",
        description: "Report lost items, file a police report, and recover documents",
        descriptionVi: "Trình báo mất đồ, làm hồ sơ cảnh sát và lấy lại giấy tờ",
        hskLevel: 4,
        badge: "应急专家",
        badgeVi: "Chuyên gia Ứng phó",
        keySituations: [
          {
            title: "Reporting a Lost Wallet",
            titleVi: "Báo mất ví",
            description: "Report a lost wallet to the police",
            descriptionVi: "Báo mất ví cho cảnh sát",
            culturalNote: "Police stations (派出所 pàichūsuǒ) handle minor cases like lost items. For lost passports, foreigners must visit the local Public Security Bureau (公安局 gōng'ān jú). Always keep copies of important documents.",
            culturalNoteVi: "Đồn cảnh sát địa phương (派出所) xử lý các vụ nhỏ như mất đồ. Người nước ngoài mất hộ chiếu phải đến Cục Công an (公安局). Luôn giữ bản sao giấy tờ quan trọng.",
            sampleDialogue: [
              { speaker: "A", line: "你好，我想报案，我的钱包丢了。", pinyin: "Nǐ hǎo, wǒ xiǎng bào'àn, wǒ de qiánbāo diū le.", translationVi: "Xin chào, tôi muốn trình báo, ví tôi bị mất.", translationEn: "Hello, I'd like to report a lost wallet." },
              { speaker: "B", line: "在哪里丢的？什么时候？", pinyin: "Zài nǎlǐ diū de? Shénme shíhou?", translationVi: "Mất ở đâu? Khi nào?", translationEn: "Where and when did you lose it?" },
              { speaker: "A", line: "今天上午在地铁站，里面有身份证和银行卡。", pinyin: "Jīntiān shàngwǔ zài dìtiě zhàn, lǐmiàn yǒu shēnfènzhèng hé yínháng kǎ.", translationVi: "Sáng nay ở ga tàu điện, trong đó có CMND và thẻ ngân hàng.", translationEn: "This morning at the subway station, it contained my ID card and bank cards." },
              { speaker: "B", line: "请填这张表，我们会帮您查监控录像。", pinyin: "Qǐng tián zhè zhāng biǎo, wǒmen huì bāng nín chá jiānkòng lùxiàng.", translationVi: "Xin điền tờ này, chúng tôi sẽ giúp kiểm tra camera.", translationEn: "Please fill out this form, and we'll check the cameras." },
            ],
          },
          {
            title: "Lost Passport",
            titleVi: "Mất hộ chiếu",
            description: "Report a lost passport at the Public Security Bureau",
            descriptionVi: "Báo mất hộ chiếu tại Cục Công an",
            sampleDialogue: [
              { speaker: "A", line: "我是外国人，我的护照丢了。", pinyin: "Wǒ shì wàiguórén, wǒ de hùzhào diū le.", translationVi: "Tôi là người nước ngoài, hộ chiếu của tôi bị mất.", translationEn: "I'm a foreigner, and my passport is lost." },
              { speaker: "B", line: "请先去派出所开报案证明。", pinyin: "Qǐng xiān qù pàichūsuǒ kāi bào'àn zhèngmíng.", translationVi: "Xin đến đồn cảnh sát lấy giấy xác nhận trước.", translationEn: "Please go to the police station to get a certificate first." },
              { speaker: "A", line: "然后我应该做什么？", pinyin: "Ránhòu wǒ yīnggāi zuò shénme?", translationVi: "Sau đó tôi nên làm gì?", translationEn: "What should I do after that?" },
              { speaker: "B", line: "拿证明去您的大使馆补办护照。", pinyin: "Ná zhèngmíng qù nín de dàshǐguǎn bǔbàn hùzhào.", translationVi: "Mang giấy đến đại sứ quán làm lại hộ chiếu.", translationEn: "Bring the certificate to the embassy to get a new passport." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "丢", pinyin: "diū", meaning: "Mất / Đánh rơi", meaningEn: "Lose / Drop", type: "phrase", example: "我的钥匙丢了。", examplePinyin: "Wǒ de yàoshi diū le.", exampleVi: "Chìa khóa tôi mất rồi." },
          { hanzi: "报案", pinyin: "bào'àn", meaning: "Trình báo (cảnh sát)", meaningEn: "File a report", type: "phrase", example: "我要报案。", examplePinyin: "Wǒ yào bào'àn.", exampleVi: "Tôi muốn trình báo." },
          { hanzi: "派出所", pinyin: "pàichūsuǒ", meaning: "Đồn cảnh sát", meaningEn: "Police station", type: "phrase", example: "派出所在那边。", examplePinyin: "Pàichūsuǒ zài nàbiān.", exampleVi: "Đồn cảnh sát ở đằng kia." },
          { hanzi: "钱包", pinyin: "qiánbāo", meaning: "Ví tiền", meaningEn: "Wallet", type: "phrase", example: "钱包不见了。", examplePinyin: "Qiánbāo bú jiàn le.", exampleVi: "Ví không thấy đâu." },
          { hanzi: "护照", pinyin: "hùzhào", meaning: "Hộ chiếu", meaningEn: "Passport", type: "phrase", example: "请出示护照。", examplePinyin: "Qǐng chūshì hùzhào.", exampleVi: "Xin xuất trình hộ chiếu." },
          { hanzi: "身份证", pinyin: "shēnfènzhèng", meaning: "CMND/CCCD", meaningEn: "ID card", type: "phrase", example: "请带身份证。", examplePinyin: "Qǐng dài shēnfènzhèng.", exampleVi: "Vui lòng mang CMND." },
          { hanzi: "证明", pinyin: "zhèngmíng", meaning: "Giấy xác nhận", meaningEn: "Certificate / Proof", type: "phrase", example: "我需要证明。", examplePinyin: "Wǒ xūyào zhèngmíng.", exampleVi: "Tôi cần giấy xác nhận." },
          { hanzi: "监控", pinyin: "jiānkòng", meaning: "Camera giám sát", meaningEn: "Surveillance", type: "phrase", example: "查一下监控。", examplePinyin: "Chá yíxià jiānkòng.", exampleVi: "Kiểm tra camera." },
          { hanzi: "找回", pinyin: "zhǎohuí", meaning: "Tìm lại được", meaningEn: "Recover / Find back", type: "phrase", example: "希望能找回。", examplePinyin: "Xīwàng néng zhǎohuí.", exampleVi: "Hy vọng tìm lại được." },
          { hanzi: "补办", pinyin: "bǔbàn", meaning: "Cấp lại", meaningEn: "Reissue", type: "phrase", example: "我要补办护照。", examplePinyin: "Wǒ yào bǔbàn hùzhào.", exampleVi: "Tôi muốn cấp lại hộ chiếu." },
        ],
        commonStructures: [
          {
            pattern: "在 + Place + 丢 + 的",
            patternPinyin: "Zài + Place + diū + de",
            explanation: "Lost it at [place]",
            explanationVi: "Bị mất ở [địa điểm]",
            examples: [
              { zh: "我在地铁丢的钱包。", pinyin: "Wǒ zài dìtiě diū de qiánbāo.", vi: "Tôi mất ví ở tàu điện ngầm." },
              { zh: "在公园丢的手机。", pinyin: "Zài gōngyuán diū de shǒujī.", vi: "Mất điện thoại ở công viên." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Reporting a Lost Item",
          titleVi: "Nghe: Trình báo mất đồ",
          transcript: "今天上午我在出租车上把钱包落下了。里面有一千块现金、银行卡和身份证。我立刻给出租车公司打电话，但是司机说没看到。下午我去派出所报案，警察让我等一周看看监控。",
          transcriptPinyin: "Jīntiān shàngwǔ wǒ zài chūzū chē shàng bǎ qiánbāo là xià le. Lǐmiàn yǒu yìqiān kuài xiànjīn, yínháng kǎ hé shēnfènzhèng. Wǒ lìkè gěi chūzū chē gōngsī dǎ diànhuà, dànshì sījī shuō méi kàndào. Xiàwǔ wǒ qù pàichūsuǒ bào'àn, jǐngchá ràng wǒ děng yì zhōu kàn kàn jiānkòng.",
          questions: [
            { q: "Where was the wallet lost?", qVi: "Mất ví ở đâu?", options: ["地铁", "出租车", "公园", "餐厅"], answer: 1 },
            { q: "How much cash was inside?", qVi: "Trong ví có bao nhiêu tiền mặt?", options: ["500元", "1000元", "1500元", "2000元"], answer: 1 },
            { q: "Did the driver find it?", qVi: "Tài xế có tìm thấy không?", options: ["找到了", "没看到", "丢了", "送到警察局了"], answer: 1 },
            { q: "How long should the speaker wait?", qVi: "Người nói phải đợi bao lâu?", options: ["3天", "一周", "两周", "一个月"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Describe what you would do if you lost your passport in China",
          "Talk about a time you lost something important",
          "Explain the steps to report a lost item to the police",
        ],
        fillInBlankExercises: [
          { sentence: "快打___，火灾！", pinyin: "Kuài dǎ ___, huǒzāi!", answer: "119", translationVi: "Mau gọi 119, cháy!", translationEn: "Quickly call 119, fire!", hint: "119 là số cứu hỏa" },
          { sentence: "我的钱包___了。", pinyin: "Wǒ de qiánbāo ___ le.", answer: "丢", translationVi: "Ví tiền của tôi mất rồi.", translationEn: "My wallet is lost." },
          { sentence: "请叫___，有人受伤。", pinyin: "Qǐng jiào ___, yǒu rén shòushāng.", answer: "救护车", translationVi: "Xin gọi xe cấp cứu, có người bị thương.", translationEn: "Please call an ambulance, someone is injured." },
          { sentence: "我要去派出所___案。", pinyin: "Wǒ yào qù pàichūsuǒ ___ àn.", answer: "报", translationVi: "Tôi cần đến đồn cảnh sát trình báo.", translationEn: "I need to report to the police station." },
        ],
      },
      // ──── Lesson 14: Pets & Vet ────
      {
        id: "cn-dl-14-pets",
        title: "Pets & Veterinarian",
        titleVi: "Thú cưng & Bác sĩ thú y",
        titleZh: "宠物医院",
        icon: "Dog",
        description: "Care for pets, visit the vet, and discuss pet adoption",
        descriptionVi: "Chăm sóc thú cưng, đi bác sĩ thú y và bàn về nhận nuôi",
        hskLevel: 4,
        badge: "宠物达人",
        badgeVi: "Cao thủ Thú cưng",
        keySituations: [
          {
            title: "At the Vet Clinic",
            titleVi: "Tại phòng khám thú y",
            description: "Take your pet to the vet for a check-up",
            descriptionVi: "Đưa thú cưng đến bác sĩ kiểm tra",
            culturalNote: "Pet ownership has surged in Chinese cities. Common pets include dogs (狗), cats (猫), and rabbits (兔子). Apartment buildings often have rules about pet size and breed.",
            culturalNoteVi: "Nuôi thú cưng đang bùng nổ ở các thành phố Trung Quốc. Phổ biến là chó, mèo, thỏ. Chung cư thường có quy định về kích thước và giống vật nuôi.",
            sampleDialogue: [
              { speaker: "A", line: "我的狗最近不吃东西。", pinyin: "Wǒ de gǒu zuìjìn bù chī dōngxi.", translationVi: "Chó của tôi gần đây không chịu ăn.", translationEn: "My dog hasn't been eating lately." },
              { speaker: "B", line: "它精神怎么样？多大了？", pinyin: "Tā jīngshén zěnmeyàng? Duō dà le?", translationVi: "Tinh thần nó thế nào? Bao nhiêu tuổi?", translationEn: "How is he acting? How old is he?" },
              { speaker: "A", line: "三岁，看起来没有精神。", pinyin: "Sān suì, kàn qǐlái méiyǒu jīngshén.", translationVi: "Ba tuổi, trông uể oải.", translationEn: "He's three years old and looks lethargic." },
              { speaker: "B", line: "我先给它检查一下，可能需要打针。", pinyin: "Wǒ xiān gěi tā jiǎnchá yíxià, kěnéng xūyào dǎzhēn.", translationVi: "Tôi kiểm tra trước đã, có thể phải tiêm.", translationEn: "Let me check first, he might need an injection." },
            ],
          },
          {
            title: "Adopting a Cat",
            titleVi: "Nhận nuôi mèo",
            description: "Visit a pet adoption center",
            descriptionVi: "Đến trung tâm nhận nuôi thú cưng",
            sampleDialogue: [
              { speaker: "A", line: "我想领养一只猫，有什么要求吗？", pinyin: "Wǒ xiǎng lǐngyǎng yì zhī māo, yǒu shénme yāoqiú ma?", translationVi: "Tôi muốn nhận nuôi một con mèo, có yêu cầu gì không?", translationEn: "I want to adopt a cat, are there any requirements?" },
              { speaker: "B", line: "您需要填申请表，并保证给它一个温暖的家。", pinyin: "Nín xūyào tián shēnqǐng biǎo, bìng bǎozhèng gěi tā yí ge wēnnuǎn de jiā.", translationVi: "Bạn cần điền đơn và cam kết cho nó một mái ấm.", translationEn: "You need to fill out an application and commit to giving it a loving home." },
              { speaker: "A", line: "需要付钱吗？", pinyin: "Xūyào fù qián ma?", translationVi: "Có cần trả phí không?", translationEn: "Is there a fee?" },
              { speaker: "B", line: "免费领养，但要承担打疫苗的费用。", pinyin: "Miǎnfèi lǐngyǎng, dàn yào chéngdān dǎ yìmiáo de fèiyòng.", translationVi: "Nhận nuôi miễn phí, nhưng phải chi tiền tiêm vắc xin.", translationEn: "Adoption is free, but you'll have to pay for vaccinations." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "宠物", pinyin: "chǒngwù", meaning: "Thú cưng", meaningEn: "Pet", type: "phrase", example: "我家有三只宠物。", examplePinyin: "Wǒ jiā yǒu sān zhī chǒngwù.", exampleVi: "Nhà tôi có 3 thú cưng." },
          { hanzi: "狗", pinyin: "gǒu", meaning: "Chó", meaningEn: "Dog", type: "phrase", example: "我的狗很可爱。", examplePinyin: "Wǒ de gǒu hěn kě'ài.", exampleVi: "Chó của tôi rất dễ thương." },
          { hanzi: "猫", pinyin: "māo", meaning: "Mèo", meaningEn: "Cat", type: "phrase", example: "猫喜欢睡觉。", examplePinyin: "Māo xǐhuan shuìjiào.", exampleVi: "Mèo thích ngủ." },
          { hanzi: "兽医", pinyin: "shòuyī", meaning: "Bác sĩ thú y", meaningEn: "Veterinarian", type: "phrase", example: "我带狗去看兽医。", examplePinyin: "Wǒ dài gǒu qù kàn shòuyī.", exampleVi: "Tôi đưa chó đi khám thú y." },
          { hanzi: "疫苗", pinyin: "yìmiáo", meaning: "Vắc xin", meaningEn: "Vaccine", type: "phrase", example: "宠物要打疫苗。", examplePinyin: "Chǒngwù yào dǎ yìmiáo.", exampleVi: "Thú cưng phải tiêm vắc xin." },
          { hanzi: "领养", pinyin: "lǐngyǎng", meaning: "Nhận nuôi", meaningEn: "Adopt", type: "phrase", example: "我领养了一只猫。", examplePinyin: "Wǒ lǐngyǎng le yì zhī māo.", exampleVi: "Tôi đã nhận nuôi một con mèo." },
          { hanzi: "宠物食品", pinyin: "chǒngwù shípǐn", meaning: "Thức ăn thú cưng", meaningEn: "Pet food", type: "phrase", example: "我去买宠物食品。", examplePinyin: "Wǒ qù mǎi chǒngwù shípǐn.", exampleVi: "Tôi đi mua thức ăn cho thú cưng." },
          { hanzi: "散步", pinyin: "sànbù", meaning: "Đi dạo", meaningEn: "Walk", type: "phrase", example: "我每天带狗散步。", examplePinyin: "Wǒ měitiān dài gǒu sànbù.", exampleVi: "Mỗi ngày tôi dắt chó đi dạo." },
          { hanzi: "生病", pinyin: "shēngbìng", meaning: "Bị bệnh", meaningEn: "Get sick", type: "phrase", example: "我的猫生病了。", examplePinyin: "Wǒ de māo shēngbìng le.", exampleVi: "Mèo của tôi bị bệnh." },
        ],
        commonStructures: [
          {
            pattern: "看起来 + Adj",
            patternPinyin: "Kàn qǐlái + Adj",
            explanation: "Looks/seems [adjective]",
            explanationVi: "Trông có vẻ [tính từ]",
            examples: [
              { zh: "它看起来没精神。", pinyin: "Tā kàn qǐlái méi jīngshén.", vi: "Nó trông uể oải." },
              { zh: "你看起来很累。", pinyin: "Nǐ kàn qǐlái hěn lèi.", vi: "Bạn trông rất mệt." },
            ],
          },
        ],
        listeningChallenge: {
          title: "Listening: Vet Visit",
          titleVi: "Nghe: Đi khám thú y",
          transcript: "我的猫今年五岁了，最近三天都不吃饭，还经常吐。我很担心，所以带它去宠物医院。兽医检查后说是肠胃问题，给它打了一针，开了药。三天以后应该会好。",
          transcriptPinyin: "Wǒ de māo jīnnián wǔ suì le, zuìjìn sān tiān dōu bù chīfàn, hái jīngcháng tù. Wǒ hěn dānxīn, suǒyǐ dài tā qù chǒngwù yīyuàn. Shòuyī jiǎnchá hòu shuō shì chángwèi wèntí, gěi tā dǎ le yì zhēn, kāi le yào. Sān tiān yǐhòu yīnggāi huì hǎo.",
          questions: [
            { q: "How old is the cat?", qVi: "Mèo bao nhiêu tuổi?", options: ["3岁", "5岁", "7岁", "10岁"], answer: 1 },
            { q: "What is the symptom?", qVi: "Triệu chứng là gì?", options: ["发烧", "不吃饭和吐", "拉肚子", "睡不着"], answer: 1 },
            { q: "What was the diagnosis?", qVi: "Chẩn đoán là gì?", options: ["感冒", "肠胃问题", "皮肤病", "骨折"], answer: 1 },
            { q: "How long until recovery?", qVi: "Bao lâu thì khỏi?", options: ["1天", "3天", "1周", "1个月"], answer: 1 },
          ],
        },
        speakingTopics: [
          "Describe your pet (or a pet you would like)",
          "Talk about pet ownership culture in China vs your country",
          "Explain how to take care of a sick pet",
        ],
        fillInBlankExercises: [
          { sentence: "我家有一只___。", pinyin: "Wǒ jiā yǒu yì zhī ___.", answer: "狗", translationVi: "Nhà tôi có một con chó.", translationEn: "I have a dog at home." },
          { sentence: "请带宠物去___打疫苗。", pinyin: "Qǐng dài chǒngwù qù ___ dǎ yìmiáo.", answer: "兽医", translationVi: "Hãy đưa thú cưng đến bác sĩ thú y tiêm vắc-xin.", translationEn: "Please take your pet to the vet for vaccinations." },
          { sentence: "它最近不___东西。", pinyin: "Tā zuìjìn bù ___ dōngxi.", answer: "吃", translationVi: "Gần đây nó không ăn.", translationEn: "He hasn't been eating lately." },
          { sentence: "我想___一只猫。", pinyin: "Wǒ xiǎng ___ yì zhī māo.", answer: "领养", translationVi: "Tôi muốn nhận nuôi một con mèo.", translationEn: "I want to adopt a cat." },
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
            culturalNote: "In Chinese business culture, building relationships (关系 guānxi) is more important than the deal itself. Small talk before meetings is expected. Never refuse tea when offered - it shows trust.",
            culturalNoteVi: "Trong văn hóa kinh doanh Trung Quốc, xây dựng mối quan hệ (关系) quan trọng hơn thương vụ. Nói chuyện phiếm trước cuộc họp là bình thường.",
            sampleDialogue: [
              { speaker: "主持", line: "各位，会议现在开始。今天我们讨论第三季度的销售报告。", pinyin: "Gè wèi, huìyì xiànzài kāishǐ. Jīntiān wǒmen tǎolùn dì sān jìdù de xiāoshòu bàogào.", translationVi: "Các vị, cuộc họp bắt đầu. Hôm nay chúng ta thảo luận báo cáo bán hàng quý 3.", translationEn: "Everyone, the meeting is starting. Today we will discuss the Q3 sales report." },
              { speaker: "You", line: "好的。我先汇报一下我们部门的情况。", pinyin: "Hǎo de. Wǒ xiān huìbào yíxià wǒmen bùmén de qíngkuàng.", translationVi: "Vâng. Tôi báo cáo tình hình bộ phận chúng tôi trước.", translationEn: "Yes. I'll report on our department's situation first." },
              { speaker: "经理", line: "好，请说。", pinyin: "Hǎo, qǐng shuō.", translationVi: "Được, mời nói.", translationEn: "Okay, please proceed." },
              { speaker: "You", line: "第三季度我们的销售额增长了百分之十五。", pinyin: "Dì sān jìdù wǒmen de xiāoshòu é zēngzhǎng le bǎi fēn zhī shíwǔ.", translationVi: "Quý 3 doanh số của chúng tôi tăng 15%.", translationEn: "Our sales in Q3 increased by 15%." },
            ],
          },
          {
            title: "Proposing an Idea",
            titleVi: "Đề xuất ý kiến",
            description: "Present your suggestion and handle feedback",
            descriptionVi: "Trình bày đề xuất và xử lý phản hồi",
            sampleDialogue: [
              { speaker: "You", line: "我有一个建议。我们可以通过社交媒体来推广我们的产品。", pinyin: "Wǒ yǒu yí ge jiànyì. Wǒmen kěyǐ tōngguò shèjiāo méitǐ lái tuīguǎng wǒmen de chǎnpǐn.", translationVi: "Tôi có một đề xuất. Chúng ta có thể quảng bá sản phẩm qua mạng xã hội.", translationEn: "I have a suggestion. We could promote our products through social media." },
              { speaker: "同事", line: "这个主意不错。但是预算够吗？", pinyin: "Zhège zhǔyi búcuò. Dànshì yùsuàn gòu ma?", translationVi: "Ý tưởng hay. Nhưng ngân sách có đủ không?", translationEn: "That's a great idea. But is the budget sufficient?" },
              { speaker: "You", line: "我已经做了一个预算方案，可以发给大家看看。", pinyin: "Wǒ yǐjīng zuò le yí ge yùsuàn fāng'àn, kěyǐ fā gěi dàjiā kànkan.", translationVi: "Tôi đã làm một phương án ngân sách, có thể gửi cho mọi người xem.", translationEn: "I've prepared a budget plan, I can share it with everyone." },
              { speaker: "经理", line: "好的，会后发给我。我们下周一再讨论。", pinyin: "Hǎo de, huì hòu fā gěi wǒ. Wǒmen xià zhōuyī zài tǎolùn.", translationVi: "Được, họp xong gửi cho tôi. Chúng ta thứ Hai tuần sau thảo luận tiếp.", translationEn: "Okay, send it to me after the meeting. We'll discuss it again next Monday." },
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
              { speaker: "You", line: "关于价格，我们觉得可以再商量一下。", pinyin: "Guānyú jiàgé, wǒmen juéde kěyǐ zài shāngliáng yíxià.", translationVi: "Về giá cả, chúng tôi nghĩ có thể thương lượng thêm.", translationEn: "Regarding the price, we think we can negotiate further." },
              { speaker: "对方", line: "我们的价格已经很优惠了。", pinyin: "Wǒmen de jiàgé yǐjīng hěn yōuhuì le.", translationVi: "Giá của chúng tôi đã rất ưu đãi rồi.", translationEn: "Our price is already very competitive." },
              { speaker: "You", line: "如果订单量大的话，能不能再给我们一个折扣？", pinyin: "Rúguǒ dìngdān liàng dà de huà, néng bu néng zài gěi wǒmen yí ge zhékòu?", translationVi: "Nếu đơn hàng lớn, có thể cho chúng tôi thêm chiết khấu không?", translationEn: "If the order is large, can you give us an additional discount?" },
              { speaker: "对方", line: "如果订单超过一千件，我可以给你打九折。", pinyin: "Rúguǒ dìngdān chāoguò yī qiān jiàn, wǒ kěyǐ gěi nǐ dǎ jiǔ zhé.", translationVi: "Nếu đơn hàng trên 1000 cái, tôi có thể giảm 10% cho bạn.", translationEn: "If the order is over 1000 pieces, I can give you a 10% discount." },
              { speaker: "You", line: "好的，我们回去考虑一下，明天给你答复。", pinyin: "Hǎo de, wǒmen huíqù kǎolǜ yíxià, míngtiān gěi nǐ dáfù.", translationVi: "Được, chúng tôi về cân nhắc, ngày mai trả lời.", translationEn: "Okay, we'll consider it and let you know tomorrow." },
            ],
          },
          {
            title: "Signing a Contract",
            titleVi: "Ký hợp đồng",
            description: "Review terms and sign agreements",
            descriptionVi: "Xem xét điều khoản và ký thỏa thuận",
            sampleDialogue: [
              { speaker: "You", line: "合同我看了，有两个地方想确认一下。", pinyin: "Hétong wǒ kàn le, yǒu liǎng ge dìfang xiǎng quèrèn yíxià.", translationVi: "Hợp đồng tôi xem rồi, có hai chỗ muốn xác nhận.", translationEn: "I've reviewed the contract, and there are two points I'd like to confirm." },
              { speaker: "对方", line: "请说。", pinyin: "Qǐng shuō.", translationVi: "Mời nói.", translationEn: "Please tell me." },
              { speaker: "You", line: "交货日期是三月十五号，对吗？付款方式是什么？", pinyin: "Jiāo huò rìqī shì sān yuè shíwǔ hào, duì ma? Fùkuǎn fāngshì shì shénme?", translationVi: "Ngày giao hàng là 15/3, đúng không? Phương thức thanh toán là gì?", translationEn: "The delivery date is March 15th, right? What is the payment method?" },
              { speaker: "对方", line: "对的。付款方式是预付百分之三十，交货后付百分之七十。", pinyin: "Duì de. Fùkuǎn fāngshì shì yù fù bǎi fēn zhī sānshí, jiāo huò hòu fù bǎi fēn zhī qīshí.", translationVi: "Đúng vậy. Thanh toán trước 30%, sau giao hàng trả 70%.", translationEn: "That's correct. 30% payment upfront, and the remaining 70% after delivery." },
              { speaker: "You", line: "好的，没问题。我们可以签了。", pinyin: "Hǎo de, méi wèntí. Wǒmen kěyǐ qiān le.", translationVi: "Được, không vấn đề. Chúng ta có thể ký rồi.", translationEn: "Okay, no problem. We can sign it now." },
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
              { speaker: "You", line: "不好意思，打扰一下。你能帮我看看这份报告吗？", pinyin: "Bù hǎo yìsi, dǎrǎo yíxià. Nǐ néng bāng wǒ kànkan zhè fèn bàogào ma?", translationVi: "Xin lỗi, làm phiền chút. Bạn giúp tôi xem báo cáo này được không?", translationEn: "Excuse me, may I bother you for a moment? Could you help me look at this report?" },
              { speaker: "同事", line: "没问题，什么时候要？", pinyin: "Méi wèntí, shénme shíhou yào?", translationVi: "Không vấn đề, khi nào cần?", translationEn: "No problem, when do you need it by?" },
              { speaker: "You", line: "下午五点之前可以吗？", pinyin: "Xiàwǔ wǔ diǎn zhīqián kěyǐ ma?", translationVi: "Trước 5 giờ chiều được không?", translationEn: "Can I have it before 5 PM?" },
              { speaker: "同事", line: "可以，我一会儿就看。", pinyin: "Kěyǐ, wǒ yīhuìr jiù kàn.", translationVi: "Được, lát nữa tôi xem.", translationEn: "Okay, I'll take a look at it later." },
            ],
          },
          {
            title: "Writing a Work Email",
            titleVi: "Viết email công việc",
            description: "Common email phrases and formats",
            descriptionVi: "Các cụm từ và định dạng email phổ biến",
            culturalNote: "Chinese business emails often start with 尊敬的 (zūnjìng de - Dear/Respected) for formal contacts. End with 此致敬礼 (cǐzhì jìnglǐ - Best regards). WeChat is increasingly used alongside email for quick work communication.",
            culturalNoteVi: "Email công việc Trung Quốc thường bắt đầu bằng 尊敬的 (Kính gửi). Kết thúc bằng 此致敬礼 (Trân trọng). WeChat ngày càng được dùng song song với email.",
            sampleDialogue: [
              { speaker: "You", line: "我给客户发邮件了，但是还没收到回复。", pinyin: "Wǒ gěi kèhù fā yóujiàn le, dànshì hái méi shōu dào huífù.", translationVi: "Tôi đã gửi email cho khách hàng nhưng chưa nhận được phản hồi.", translationEn: "I've sent an email to the client but haven't received a response yet." },
              { speaker: "同事", line: "你发了多久了？", pinyin: "Nǐ fā le duō jiǔ le?", translationVi: "Bạn gửi bao lâu rồi?", translationEn: "How long ago did you send it?" },
              { speaker: "You", line: "已经三天了。要不要再发一封催一下？", pinyin: "Yǐjīng sān tiān le. Yào bu yào zài fā yī fēng cuī yíxià?", translationVi: "Đã 3 ngày rồi. Có nên gửi thêm email nhắc không?", translationEn: "It's been 3 days now. Should I send a reminder email?" },
              { speaker: "同事", line: "你可以在微信上先跟他说一声。", pinyin: "Nǐ kěyǐ zài Wēixìn shàng xiān gēn tā shuō yī shēng.", translationVi: "Bạn có thể nhắn trên WeChat trước.", translationEn: "You could try messaging them on WeChat first." },
            ],
          },
          {
            title: "Requesting Time Off",
            titleVi: "Xin nghỉ phép",
            description: "Ask your manager for leave",
            descriptionVi: "Xin phép sếp cho nghỉ",
            sampleDialogue: [
              { speaker: "You", line: "经理，我想请两天假，下周一和周二。", pinyin: "Jīnglǐ, wǒ xiǎng qǐng liǎng tiān jià, xià zhōuyī hé zhōu'èr.", translationVi: "Sếp, tôi muốn xin nghỉ 2 ngày, thứ Hai và thứ Ba tuần sau.", translationEn: "Boss, I'd like to request two days off, next Monday and Tuesday." },
              { speaker: "经理", line: "什么原因？", pinyin: "Shénme yuányīn?", translationVi: "Lý do gì?", translationEn: "What's the reason?" },
              { speaker: "You", line: "我家人从越南来，我想陪他们玩两天。", pinyin: "Wǒ jiārén cóng Yuènán lái, wǒ xiǎng péi tāmen wán liǎng tiān.", translationVi: "Gia đình tôi từ Việt Nam sang, tôi muốn đưa họ đi chơi 2 ngày.", translationEn: "My family is visiting from Vietnam, and I want to take them out for two days." },
              { speaker: "经理", line: "好的，你把手上的工作先交接一下。", pinyin: "Hǎo de, nǐ bǎ shǒu shàng de gōngzuò xiān jiāojiē yíxià.", translationVi: "Được, bạn bàn giao công việc đang làm trước.", translationEn: "Alright, but first, please hand over your current tasks." },
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
            culturalNote: "In Chinese business culture, 出差 (chūchāi - business trip) is very common. Many companies use 钉钉 (DīngDīng) or 飞书 (Fēishū) for travel requests. '差旅报销' (chāilǚ bàoxiāo) - travel expense reimbursement - is a key phrase to know.",
            culturalNoteVi: "Trong văn hóa kinh doanh Trung Quốc, 出差 rất phổ biến. Nhiều công ty dùng 钉钉 hoặc 飞书 để yêu cầu đi công tác. '差旅报销' (hoàn trả chi phí công tác) là cụm từ quan trọng cần biết.",
            sampleDialogue: [
              { speaker: "A", line: "下周我要去上海出差。", pinyin: "Xià zhōu wǒ yào qù Shànghǎi chūchāi.", translationVi: "Tuần sau tôi phải đi công tác ở Thượng Hải.", translationEn: "Next week I have to go on a business trip to Shanghai." },
              { speaker: "B", line: "出差几天？需要我帮你订酒店吗？", pinyin: "Chūchāi jǐ tiān? Xūyào wǒ bāng nǐ dìng jiǔdiàn ma?", translationVi: "Đi mấy ngày? Cần tôi đặt khách sạn giúp không?", translationEn: "How many days will you be gone? Do you need me to book a hotel for you?" },
              { speaker: "A", line: "三天两晚，订一个离客户公司近的酒店。", pinyin: "Sān tiān liǎng wǎn, dìng yī gè lí kèhù gōngsī jìn de jiǔdiàn.", translationVi: "Ba ngày hai đêm, đặt khách sạn gần công ty khách hàng.", translationEn: "Three days and two nights. Please book a hotel near the client's company." },
              { speaker: "B", line: "好的，机票也帮你订好了。", pinyin: "Hǎo de, jīpiào yě bāng nǐ dìng hǎo le.", translationVi: "Được, vé máy bay cũng đặt cho bạn rồi.", translationEn: "Alright, your flight tickets have also been booked." },
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
            culturalNote: "Chinese interviewers often ask about your 稳定性 (wěndìng xìng - stability). They value loyalty and long-term commitment. Hopping between jobs too frequently is viewed negatively.",
            culturalNoteVi: "Nhà tuyển dụng Trung Quốc thường hỏi về 稳定性 (sự ổn định). Họ đánh giá cao sự trung thành và cam kết lâu dài. Nhảy việc quá nhiều bị đánh giá tiêu cực.",
            sampleDialogue: [
              { speaker: "面试官", line: "请先自我介绍一下。", pinyin: "Qǐng xiān zìwǒ jièshào yíxià.", translationVi: "Xin hãy tự giới thiệu trước.", translationEn: "Please introduce yourself first." },
              { speaker: "You", line: "您好！我叫阿明，越南人。我在北京大学读了MBA，之前在一家外贸公司工作了三年。", pinyin: "Nín hǎo! Wǒ jiào Ā Míng, Yuènán rén. Wǒ zài Běijīng Dàxué dú le MBA, zhīqián zài yī jiā wàimào gōngsī gōngzuò le sān nián.", translationVi: "Xin chào! Tôi tên Minh, người Việt Nam. Tôi học MBA tại Đại học Bắc Kinh, trước đó làm ở công ty ngoại thương 3 năm.", translationEn: "Hello! My name is Minh, and I'm from Vietnam. I studied for an MBA at Peking University, and before that, I worked in a foreign trade company for three years." },
              { speaker: "面试官", line: "你为什么想来我们公司？", pinyin: "Nǐ wèi shénme xiǎng lái wǒmen gōngsī?", translationVi: "Tại sao bạn muốn đến công ty chúng tôi?", translationEn: "Why do you want to work for our company?" },
              { speaker: "You", line: "因为贵公司在行业里很有影响力，我希望能在这里学到更多。", pinyin: "Yīnwèi guì gōngsī zài hángyè lǐ hěn yǒu yǐngxiǎng lì, wǒ xīwàng néng zài zhèlǐ xué dào gèng duō.", translationVi: "Vì quý công ty rất có ảnh hưởng trong ngành, tôi hy vọng có thể học hỏi nhiều hơn ở đây.", translationEn: "Because your company has a strong influence in the industry, and I hope to learn more here." },
            ],
          },
          {
            title: "Discussing Salary & Benefits",
            titleVi: "Thảo luận lương và phúc lợi",
            description: "Navigate salary negotiation professionally",
            descriptionVi: "Thương lượng lương một cách chuyên nghiệp",
            sampleDialogue: [
              { speaker: "面试官", line: "你的期望薪资是多少？", pinyin: "Nǐ de qīwàng xīnzī shì duōshao?", translationVi: "Mức lương mong muốn của bạn là bao nhiêu?", translationEn: "What is your desired salary?" },
              { speaker: "You", line: "根据我的经验和能力，我期望月薪在一万五到两万之间。", pinyin: "Gēnjù wǒ de jīngyàn hé nénglì, wǒ qīwàng yuè xīn zài yī wàn wǔ dào liǎng wàn zhījiān.", translationVi: "Dựa trên kinh nghiệm và năng lực, tôi mong lương tháng từ 15 đến 20 ngàn.", translationEn: "Based on my experience and skills, I expect a monthly salary of 15,000 to 20,000." },
              { speaker: "面试官", line: "我们公司有五险一金，还有年终奖。", pinyin: "Wǒmen gōngsī yǒu wǔ xiǎn yī jīn, hái yǒu niánzhōng jiǎng.", translationVi: "Công ty chúng tôi có bảo hiểm xã hội và thưởng cuối năm.", translationEn: "Our company provides social insurance and an annual bonus." },
              { speaker: "You", line: "好的，请问有没有其他福利？", pinyin: "Hǎo de, qǐng wèn yǒu méi yǒu qítā fúlì?", translationVi: "Vâng, xin hỏi có phúc lợi nào khác không?", translationEn: "Yes, may I ask if there are any other benefits?" },
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
      // ──── Lesson 6: Business Email ────
      {
        id: "cn-bz-06-email", title: "Business Email", titleVi: "Email công việc", titleZh: "商务邮件", icon: "Mail",
        description: "Write formal business emails in Chinese", descriptionVi: "Viết email công việc trang trọng bằng tiếng Trung",
        hskLevel: 4, badge: "邮件高手", badgeVi: "Cao thủ Email",
        keySituations: [{
          title: "Sending a Formal Request", titleVi: "Gửi yêu cầu trang trọng",
          description: "Email a client to request information", descriptionVi: "Email khách hàng yêu cầu thông tin",
          culturalNote: "Chinese business emails use formal greetings like 您好 (nín hǎo) and end with 此致敬礼 (cǐzhì jìnglǐ).",
          culturalNoteVi: "Email công việc Trung Quốc dùng chào trang trọng 您好 và kết thúc bằng 此致敬礼.",
          sampleDialogue: [
            { speaker: "Email", line: "尊敬的王经理，您好！", pinyin: "Zūnjìng de Wáng jīnglǐ, nín hǎo!", translationVi: "Kính gửi giám đốc Vương, xin chào!", translationEn: "Dear Director Wang, hello!" },
            { speaker: "Email", line: "希望贵公司能提供报价单。", pinyin: "Xīwàng guì gōngsī néng tígōng bàojià dān.", translationVi: "Mong quý công ty cung cấp bảng báo giá.", translationEn: "Please provide a quotation." },
            { speaker: "Email", line: "如有疑问，请随时联系我。", pinyin: "Rú yǒu yíwèn, qǐng suíshí liánxì wǒ.", translationVi: "Nếu có thắc mắc, xin liên hệ tôi bất cứ lúc nào.", translationEn: "If you have any questions, please contact me anytime." },
            { speaker: "Email", line: "此致敬礼，李华", pinyin: "Cǐzhì jìnglǐ, Lǐ Huá", translationVi: "Trân trọng, Lý Hoa", translationEn: "Sincerely, Li Hua" },
          ],
        }],
        vocabulary: [
          { hanzi: "邮件", pinyin: "yóujiàn", meaning: "Email", meaningEn: "Email", type: "phrase", example: "请发邮件给我。", examplePinyin: "Qǐng fā yóujiàn gěi wǒ.", exampleVi: "Vui lòng gửi email cho tôi." },
          { hanzi: "尊敬的", pinyin: "zūnjìng de", meaning: "Kính gửi", meaningEn: "Dear (formal)", type: "phrase", example: "尊敬的客户。", examplePinyin: "Zūnjìng de kèhù.", exampleVi: "Kính gửi quý khách." },
          { hanzi: "贵公司", pinyin: "guì gōngsī", meaning: "Quý công ty", meaningEn: "Your esteemed company", type: "phrase", example: "贵公司的产品很好。", examplePinyin: "Guì gōngsī de chǎnpǐn hěn hǎo.", exampleVi: "Sản phẩm quý công ty rất tốt." },
          { hanzi: "报价单", pinyin: "bàojià dān", meaning: "Bảng báo giá", meaningEn: "Quotation", type: "phrase", example: "请发报价单。", examplePinyin: "Qǐng fā bàojià dān.", exampleVi: "Xin gửi báo giá." },
          { hanzi: "附件", pinyin: "fùjiàn", meaning: "Tệp đính kèm", meaningEn: "Attachment", type: "phrase", example: "请查看附件。", examplePinyin: "Qǐng chákàn fùjiàn.", exampleVi: "Vui lòng xem tệp đính kèm." },
          { hanzi: "回复", pinyin: "huífù", meaning: "Trả lời", meaningEn: "Reply", type: "phrase", example: "请尽快回复。", examplePinyin: "Qǐng jǐnkuài huífù.", exampleVi: "Vui lòng phản hồi sớm." },
          { hanzi: "联系", pinyin: "liánxì", meaning: "Liên hệ", meaningEn: "Contact", type: "phrase", example: "请联系我。", examplePinyin: "Qǐng liánxì wǒ.", exampleVi: "Xin liên hệ tôi." },
          { hanzi: "此致敬礼", pinyin: "cǐzhì jìnglǐ", meaning: "Trân trọng", meaningEn: "Sincerely", type: "phrase", example: "此致敬礼，张三。", examplePinyin: "Cǐzhì jìnglǐ, Zhāng Sān.", exampleVi: "Trân trọng, Trương Tam." },
        ],
        commonStructures: [{ pattern: "如有 + N，请 + Verb", patternPinyin: "Rú yǒu + N, qǐng + Verb", explanation: "If there is X, please do Y", explanationVi: "Nếu có X, vui lòng làm Y", examples: [{ zh: "如有疑问，请联系我。", pinyin: "Rú yǒu yíwèn, qǐng liánxì wǒ.", vi: "Nếu có thắc mắc, hãy liên hệ tôi." }] }],
        listeningChallenge: {
          title: "Listening: Email Reply", titleVi: "Nghe: Trả lời email",
          transcript: "尊敬的客户，您好！感谢您的咨询。报价单已经放在附件里。如有疑问，请回复邮件或致电我们。此致敬礼，销售部。",
          transcriptPinyin: "Zūnjìng de kèhù, nín hǎo! Gǎnxiè nín de zīxún. Bàojià dān yǐjīng fàng zài fùjiàn lǐ. Rú yǒu yíwèn, qǐng huífù yóujiàn huò zhì diàn wǒmen. Cǐzhì jìnglǐ, xiāoshòu bù.",
          questions: [
            { q: "What is in the attachment?", qVi: "Tệp đính kèm có gì?", options: ["合同", "报价单", "发票", "简历"], answer: 1 },
            { q: "How can the customer reply?", qVi: "Khách hàng có thể trả lời thế nào?", options: ["只能邮件", "邮件或致电", "只能上门", "微信"], answer: 1 },
            { q: "Who sent the email?", qVi: "Ai gửi email?", options: ["人事部", "销售部", "客户", "经理"], answer: 1 },
          ],
        },
        speakingTopics: ["Write a formal business email opening", "Compare email etiquette China vs your country"],
        fillInBlankExercises: [
          { sentence: "请查收___件。", pinyin: "Qǐng chá shōu ___ jiàn.", answer: "附", translationVi: "Vui lòng kiểm tra tệp đính kèm.", translationEn: "Please check the attachment." },
          { sentence: "___您百忙之中回复。", pinyin: "___ nín bǎi máng zhī zhōng huífù.", answer: "感谢", translationVi: "Cảm ơn anh đã trả lời trong lúc bận.", translationEn: "Thank you for your reply despite your busy schedule." },
          { sentence: "此致___礼。", pinyin: "Cǐ zhì ___ lǐ.", answer: "敬", translationVi: "Trân trọng kính chào.", translationEn: "Best regards." },
          { sentence: "请尽快___我。", pinyin: "Qǐng jǐnkuài ___ wǒ.", answer: "回复", translationVi: "Xin trả lời tôi sớm nhất có thể.", translationEn: "Please reply to me as soon as possible." },
        ],
      },
      // ──── Lesson 7: Presentations ────
      {
        id: "cn-bz-07-presentation", title: "Business Presentations", titleVi: "Thuyết trình", titleZh: "商务演讲", icon: "Presentation",
        description: "Open and close professional presentations confidently", descriptionVi: "Mở đầu và kết thúc thuyết trình chuyên nghiệp",
        hskLevel: 5, badge: "演讲专家", badgeVi: "Chuyên gia Thuyết trình",
        keySituations: [{
          title: "Opening a Presentation", titleVi: "Mở đầu thuyết trình",
          description: "Greet the audience and introduce your topic", descriptionVi: "Chào khán giả và giới thiệu chủ đề",
          culturalNote: "In China, audiences value humility - start with 谢谢大家 (thank you all) and acknowledge senior attendees by title.",
          culturalNoteVi: "Khán giả Trung Quốc đề cao sự khiêm tốn - bắt đầu bằng 谢谢大家 và chào những người cấp cao theo chức danh.",
          sampleDialogue: [
            { speaker: "A", line: "各位领导、各位同事，大家好！", pinyin: "Gèwèi lǐngdǎo, gèwèi tóngshì, dàjiā hǎo!", translationVi: "Kính thưa các vị lãnh đạo, các đồng nghiệp, xin chào!", translationEn: "Dear leaders, colleagues, hello!" },
            { speaker: "A", line: "今天我向大家汇报第三季度的销售情况。", pinyin: "Jīntiān wǒ xiàng dàjiā huìbào dì-sān jìdù de xiāoshòu qíngkuàng.", translationVi: "Hôm nay tôi báo cáo tình hình bán hàng quý 3.", translationEn: "Today I will report on the Q3 sales performance." },
            { speaker: "A", line: "请看屏幕上的图表。", pinyin: "Qǐng kàn píngmù shàng de túbiǎo.", translationVi: "Xin nhìn biểu đồ trên màn hình.", translationEn: "Please look at the chart on the screen." },
            { speaker: "A", line: "谢谢大家的聆听，请问有什么问题？", pinyin: "Xièxie dàjiā de língtīng, qǐngwèn yǒu shénme wèntí?", translationVi: "Cảm ơn mọi người đã lắng nghe, có câu hỏi nào không?", translationEn: "Thank you all for listening. Are there any questions?" },
          ],
        }],
        vocabulary: [
          { hanzi: "演讲", pinyin: "yǎnjiǎng", meaning: "Diễn thuyết", meaningEn: "Speech", type: "phrase", example: "他的演讲很精彩。", examplePinyin: "Tā de yǎnjiǎng hěn jīngcǎi.", exampleVi: "Bài thuyết trình của anh ấy rất hay." },
          { hanzi: "汇报", pinyin: "huìbào", meaning: "Báo cáo", meaningEn: "Report", type: "phrase", example: "向经理汇报。", examplePinyin: "Xiàng jīnglǐ huìbào.", exampleVi: "Báo cáo cho giám đốc." },
          { hanzi: "图表", pinyin: "túbiǎo", meaning: "Biểu đồ", meaningEn: "Chart", type: "phrase", example: "看这个图表。", examplePinyin: "Kàn zhège túbiǎo.", exampleVi: "Nhìn biểu đồ này." },
          { hanzi: "幻灯片", pinyin: "huàndēngpiàn", meaning: "Slide", meaningEn: "Slide", type: "phrase", example: "下一张幻灯片。", examplePinyin: "Xià yì zhāng huàndēngpiàn.", exampleVi: "Slide tiếp theo." },
          { hanzi: "数据", pinyin: "shùjù", meaning: "Dữ liệu", meaningEn: "Data", type: "phrase", example: "数据显示...", examplePinyin: "Shùjù xiǎnshì...", exampleVi: "Dữ liệu cho thấy..." },
          { hanzi: "聆听", pinyin: "língtīng", meaning: "Lắng nghe", meaningEn: "Listen attentively", type: "phrase", example: "感谢聆听。", examplePinyin: "Gǎnxiè língtīng.", exampleVi: "Cảm ơn đã lắng nghe." },
          { hanzi: "总结", pinyin: "zǒngjié", meaning: "Tổng kết", meaningEn: "Summarize", type: "phrase", example: "我来总结一下。", examplePinyin: "Wǒ lái zǒngjié yíxià.", exampleVi: "Tôi tổng kết một chút." },
          { hanzi: "提问", pinyin: "tíwèn", meaning: "Đặt câu hỏi", meaningEn: "Ask question", type: "phrase", example: "现在可以提问。", examplePinyin: "Xiànzài kěyǐ tíwèn.", exampleVi: "Bây giờ có thể đặt câu hỏi." },
        ],
        commonStructures: [{ pattern: "向 + Audience + 汇报 + Topic", patternPinyin: "Xiàng + Audience + huìbào + Topic", explanation: "Report [topic] to [audience]", explanationVi: "Báo cáo [chủ đề] cho [khán giả]", examples: [{ zh: "向大家汇报销售情况。", pinyin: "Xiàng dàjiā huìbào xiāoshòu qíngkuàng.", vi: "Báo cáo tình hình bán hàng cho mọi người." }] }],
        listeningChallenge: {
          title: "Listening: Q3 Report", titleVi: "Nghe: Báo cáo quý 3",
          transcript: "各位同事好！今天我汇报第三季度业绩。销售额增长了百分之十五，主要原因是新产品上市。下个季度的目标是增长百分之二十。谢谢大家。",
          transcriptPinyin: "Gèwèi tóngshì hǎo! Jīntiān wǒ huìbào dì-sān jìdù yèjì. Xiāoshòu é zēngzhǎng le bǎi fēn zhī shíwǔ, zhǔyào yuányīn shì xīn chǎnpǐn shàngshì. Xià ge jìdù de mùbiāo shì zēngzhǎng bǎi fēn zhī èrshí.",
          questions: [
            { q: "Which quarter is reported?", qVi: "Báo cáo quý nào?", options: ["Q1", "Q2", "Q3", "Q4"], answer: 2 },
            { q: "Sales growth rate?", qVi: "Tốc độ tăng trưởng?", options: ["10%", "15%", "20%", "25%"], answer: 1 },
            { q: "Next quarter target?", qVi: "Mục tiêu quý sau?", options: ["10%", "15%", "20%", "30%"], answer: 2 },
          ],
        },
        speakingTopics: ["Open a presentation in formal Chinese", "Present a chart showing growth"],
        fillInBlankExercises: [
          { sentence: "请看这张___。", pinyin: "Qǐng kàn zhè zhāng ___.", answer: "幻灯片", translationVi: "Xin xem slide này.", translationEn: "Please look at this slide." },
          { sentence: "销售额上升了百分之___。", pinyin: "Xiāoshòu é shàngshēng le bǎi fēn zhī ___.", answer: "二十", translationVi: "Doanh thu tăng 20%.", translationEn: "Revenue increased by 20%." },
          { sentence: "请问大家有什么___？", pinyin: "Qǐngwèn dàjiā yǒu shénme ___?", answer: "问题", translationVi: "Xin hỏi mọi người có câu hỏi gì?", translationEn: "Does anyone have any questions?" },
          { sentence: "我的___到此结束。", pinyin: "Wǒ de ___ dào cǐ jiéshù.", answer: "演讲", translationVi: "Bài thuyết trình của tôi kết thúc tại đây.", translationEn: "My presentation ends here." },
        ],
      },
      // ──── Lesson 8: Contracts & Legal ────
      {
        id: "cn-bz-08-contract", title: "Contracts & Legal Terms", titleVi: "Hợp đồng & Pháp lý", titleZh: "合同法律", icon: "FileText",
        description: "Discuss contract terms, signing, and basic legal language", descriptionVi: "Bàn về điều khoản, ký kết và ngôn ngữ pháp lý cơ bản",
        hskLevel: 5, badge: "法律顾问", badgeVi: "Cố vấn Pháp lý",
        keySituations: [{
          title: "Reviewing a Contract", titleVi: "Xem xét hợp đồng",
          description: "Discuss key terms before signing", descriptionVi: "Thảo luận điều khoản trước khi ký",
          culturalNote: "Chinese contracts often include 甲方 (Party A) and 乙方 (Party B). Always read carefully and consult a lawyer for major deals.",
          culturalNoteVi: "Hợp đồng Trung Quốc thường có 甲方 (Bên A) và 乙方 (Bên B). Luôn đọc kỹ và tham khảo luật sư cho hợp đồng lớn.",
          sampleDialogue: [
            { speaker: "A", line: "请仔细看一下合同条款。", pinyin: "Qǐng zǐxì kàn yíxià hétong tiáokuǎn.", translationVi: "Vui lòng xem kỹ điều khoản hợp đồng.", translationEn: "Please carefully review the terms of the contract." },
            { speaker: "B", line: "付款方式可以再商量吗？", pinyin: "Fùkuǎn fāngshì kěyǐ zài shāngliang ma?", translationVi: "Phương thức thanh toán có thể bàn lại không?", translationEn: "Is the payment method negotiable?" },
            { speaker: "A", line: "可以分三期付款。", pinyin: "Kěyǐ fēn sān qī fùkuǎn.", translationVi: "Có thể chia 3 đợt thanh toán.", translationEn: "Payment can be split into three installments." },
            { speaker: "B", line: "好的，那我们就签字吧。", pinyin: "Hǎo de, nà wǒmen jiù qiānzì ba.", translationVi: "Vâng, vậy chúng ta ký nhé.", translationEn: "Yes, in that case, let's sign it." },
          ],
        }],
        vocabulary: [
          { hanzi: "合同", pinyin: "hétong", meaning: "Hợp đồng", meaningEn: "Contract", type: "phrase", example: "请签合同。", examplePinyin: "Qǐng qiān hétong.", exampleVi: "Vui lòng ký hợp đồng." },
          { hanzi: "条款", pinyin: "tiáokuǎn", meaning: "Điều khoản", meaningEn: "Terms / Clause", type: "phrase", example: "条款很清楚。", examplePinyin: "Tiáokuǎn hěn qīngchu.", exampleVi: "Điều khoản rất rõ ràng." },
          { hanzi: "甲方", pinyin: "jiǎfāng", meaning: "Bên A", meaningEn: "Party A", type: "phrase", example: "甲方负责生产。", examplePinyin: "Jiǎfāng fùzé shēngchǎn.", exampleVi: "Bên A chịu trách nhiệm sản xuất." },
          { hanzi: "乙方", pinyin: "yǐfāng", meaning: "Bên B", meaningEn: "Party B", type: "phrase", example: "乙方负责销售。", examplePinyin: "Yǐfāng fùzé xiāoshòu.", exampleVi: "Bên B chịu trách nhiệm bán hàng." },
          { hanzi: "签字", pinyin: "qiānzì", meaning: "Ký tên", meaningEn: "Sign", type: "phrase", example: "请在这里签字。", examplePinyin: "Qǐng zài zhèlǐ qiānzì.", exampleVi: "Xin ký tên ở đây." },
          { hanzi: "付款", pinyin: "fùkuǎn", meaning: "Thanh toán", meaningEn: "Payment", type: "phrase", example: "请按时付款。", examplePinyin: "Qǐng ànshí fùkuǎn.", exampleVi: "Vui lòng thanh toán đúng hạn." },
          { hanzi: "违约", pinyin: "wéiyuē", meaning: "Vi phạm hợp đồng", meaningEn: "Breach of contract", type: "phrase", example: "违约要赔偿。", examplePinyin: "Wéiyuē yào péicháng.", exampleVi: "Vi phạm phải bồi thường." },
          { hanzi: "律师", pinyin: "lǜshī", meaning: "Luật sư", meaningEn: "Lawyer", type: "phrase", example: "请咨询律师。", examplePinyin: "Qǐng zīxún lǜshī.", exampleVi: "Vui lòng tham khảo luật sư." },
        ],
        commonStructures: [{ pattern: "可以分 + Number + 期 + Verb", patternPinyin: "Kěyǐ fēn + Number + qī + Verb", explanation: "Can be done in [number] installments", explanationVi: "Có thể chia [số] đợt", examples: [{ zh: "可以分三期付款。", pinyin: "Kěyǐ fēn sān qī fùkuǎn.", vi: "Có thể chia 3 đợt thanh toán." }] }],
        listeningChallenge: {
          title: "Listening: Contract Discussion", titleVi: "Nghe: Bàn hợp đồng",
          transcript: "我们昨天和客户讨论了合同。他们要求把付款方式改成分三期。我们同意了，但要求他们提供银行担保。律师明天会修改合同，下周可以签字。",
          transcriptPinyin: "Wǒmen zuótiān hé kèhù tǎolùn le hétong. Tāmen yāoqiú bǎ fùkuǎn fāngshì gǎichéng fēn sān qī. Wǒmen tóngyì le, dàn yāoqiú tāmen tígōng yínháng dānbǎo. Lǜshī míngtiān huì xiūgǎi hétong, xià zhōu kěyǐ qiānzì.",
          questions: [
            { q: "What did the client request?", qVi: "Khách hàng yêu cầu gì?", options: ["降价", "分三期付款", "延期", "换合同"], answer: 1 },
            { q: "What was required in return?", qVi: "Đổi lại yêu cầu gì?", options: ["押金", "银行担保", "保险", "推荐人"], answer: 1 },
            { q: "When can it be signed?", qVi: "Khi nào ký được?", options: ["明天", "本周", "下周", "下个月"], answer: 2 },
          ],
        },
        speakingTopics: ["Discuss contract payment terms", "Explain a breach of contract scenario"],
        fillInBlankExercises: [
          { sentence: "请仔细阅读___条款。", pinyin: "Qǐng zǐxì yuèdú ___ tiáokuǎn.", answer: "合同", translationVi: "Xin đọc kỹ các điều khoản hợp đồng.", translationEn: "Please read the contract terms carefully." },
          { sentence: "双方需要___合同。", pinyin: "Shuāngfāng xūyào ___ hétong.", answer: "签", translationVi: "Hai bên cần ký hợp đồng.", translationEn: "Both parties need to sign the contract." },
          { sentence: "如果违约要付___金。", pinyin: "Rúguǒ wéiyuē yào fù ___ jīn.", answer: "违约", translationVi: "Nếu vi phạm phải trả tiền phạt.", translationEn: "If there is a breach, a penalty must be paid." },
          { sentence: "合同___期是一年。", pinyin: "Hétong ___ qī shì yì nián.", answer: "有效", translationVi: "Thời hạn hiệu lực hợp đồng là 1 năm.", translationEn: "The contract's valid period is one year." },
        ],
      },
      // ──── Lesson 9: Marketing & Sales ────
      {
        id: "cn-bz-09-marketing", title: "Marketing & Sales", titleVi: "Tiếp thị & Bán hàng", titleZh: "市场销售", icon: "TrendingUp",
        description: "Pitch products, discuss KPIs, and close deals", descriptionVi: "Pitch sản phẩm, bàn KPI và chốt đơn",
        hskLevel: 4, badge: "销售之星", badgeVi: "Ngôi sao Bán hàng",
        keySituations: [{
          title: "Product Pitch", titleVi: "Pitch sản phẩm",
          description: "Introduce a product to potential clients", descriptionVi: "Giới thiệu sản phẩm cho khách hàng tiềm năng",
          culturalNote: "Building 关系 (guānxi - relationships) is critical in Chinese sales. Many deals close over dinner.",
          culturalNoteVi: "Xây dựng 关系 rất quan trọng trong bán hàng tại Trung Quốc. Nhiều giao dịch chốt qua bữa tối.",
          sampleDialogue: [
            { speaker: "A", line: "我们的新产品有三大优势。", pinyin: "Wǒmen de xīn chǎnpǐn yǒu sān dà yōushì.", translationVi: "Sản phẩm mới của chúng tôi có 3 lợi thế lớn.", translationEn: "Our new product has three major advantages." },
            { speaker: "B", line: "价格怎么样？", pinyin: "Jiàgé zěnmeyàng?", translationVi: "Giá thế nào?", translationEn: "How much does it cost?" },
            { speaker: "A", line: "比同类产品便宜百分之二十。", pinyin: "Bǐ tónglèi chǎnpǐn piányi bǎi fēn zhī èrshí.", translationVi: "Rẻ hơn 20% so với cùng loại.", translationEn: "It's 20% cheaper than similar products." },
            { speaker: "B", line: "听起来不错，可以给我详细资料吗？", pinyin: "Tīng qǐlái búcuò, kěyǐ gěi wǒ xiángxì zīliào ma?", translationVi: "Nghe hay đấy, cho tôi tài liệu chi tiết được không?", translationEn: "That sounds good, could you give me the detailed materials?" },
          ],
        }],
        vocabulary: [
          { hanzi: "市场", pinyin: "shìchǎng", meaning: "Thị trường", meaningEn: "Market", type: "phrase", example: "市场很大。", examplePinyin: "Shìchǎng hěn dà.", exampleVi: "Thị trường rất lớn." },
          { hanzi: "销售", pinyin: "xiāoshòu", meaning: "Bán hàng", meaningEn: "Sales", type: "phrase", example: "销售业绩很好。", examplePinyin: "Xiāoshòu yèjì hěn hǎo.", exampleVi: "Doanh số rất tốt." },
          { hanzi: "客户", pinyin: "kèhù", meaning: "Khách hàng", meaningEn: "Client", type: "phrase", example: "客户很重要。", examplePinyin: "Kèhù hěn zhòngyào.", exampleVi: "Khách hàng rất quan trọng." },
          { hanzi: "优势", pinyin: "yōushì", meaning: "Lợi thế", meaningEn: "Advantage", type: "phrase", example: "我们有价格优势。", examplePinyin: "Wǒmen yǒu jiàgé yōushì.", exampleVi: "Chúng tôi có lợi thế giá." },
          { hanzi: "竞争", pinyin: "jìngzhēng", meaning: "Cạnh tranh", meaningEn: "Compete", type: "phrase", example: "竞争很激烈。", examplePinyin: "Jìngzhēng hěn jīliè.", exampleVi: "Cạnh tranh khốc liệt." },
          { hanzi: "推广", pinyin: "tuīguǎng", meaning: "Quảng bá", meaningEn: "Promote", type: "phrase", example: "推广新产品。", examplePinyin: "Tuīguǎng xīn chǎnpǐn.", exampleVi: "Quảng bá sản phẩm mới." },
          { hanzi: "业绩", pinyin: "yèjì", meaning: "Thành tích / KPI", meaningEn: "Performance", type: "phrase", example: "业绩超标。", examplePinyin: "Yèjì chāobiāo.", exampleVi: "Vượt KPI." },
          { hanzi: "成交", pinyin: "chéngjiāo", meaning: "Chốt đơn", meaningEn: "Close deal", type: "phrase", example: "终于成交了。", examplePinyin: "Zhōngyú chéngjiāo le.", exampleVi: "Cuối cùng chốt được." },
        ],
        commonStructures: [{ pattern: "比 + N + Adj + 百分之 + Number", patternPinyin: "Bǐ + N + Adj + bǎi fēn zhī + Number", explanation: "X% more/less Adj than N", explanationVi: "Hơn/kém N X%", examples: [{ zh: "便宜百分之二十。", pinyin: "Piányi bǎi fēn zhī èrshí.", vi: "Rẻ hơn 20%." }] }],
        listeningChallenge: {
          title: "Listening: Sales Pitch", titleVi: "Nghe: Pitch bán hàng",
          transcript: "我们的产品有三大优势：质量好、价格便宜、售后服务完善。和竞争对手相比，我们便宜百分之二十。今年的销售目标是一千万，目前已完成八百万。",
          transcriptPinyin: "Wǒmen de chǎnpǐn yǒu sān dà yōushì: zhìliàng hǎo, jiàgé piányi, shòuhòu fúwù wánshàn. Hé jìngzhēng duìshǒu xiāng bǐ, wǒmen piányi bǎi fēn zhī èrshí. Jīnnián de xiāoshòu mùbiāo shì yìqiān wàn, mùqián yǐ wánchéng bābǎi wàn.",
          questions: [
            { q: "How many advantages?", qVi: "Có bao nhiêu lợi thế?", options: ["2", "3", "4", "5"], answer: 1 },
            { q: "How much cheaper?", qVi: "Rẻ hơn bao nhiêu?", options: ["10%", "20%", "30%", "50%"], answer: 1 },
            { q: "Sales target?", qVi: "Mục tiêu doanh số?", options: ["500万", "800万", "1000万", "2000万"], answer: 2 },
          ],
        },
        speakingTopics: ["Pitch your favorite product in Chinese", "Discuss sales KPIs"],
        fillInBlankExercises: [
          { sentence: "我们要做___调研。", pinyin: "Wǒmen yào zuò ___ diàoyán.", answer: "市场", translationVi: "Chúng ta cần làm nghiên cứu thị trường.", translationEn: "We need to conduct market research." },
          { sentence: "这个产品的___群是年轻人。", pinyin: "Zhège chǎnpǐn de ___ qún shì niánqīng rén.", answer: "客户", translationVi: "Nhóm khách hàng của sản phẩm này là người trẻ.", translationEn: "The target customers for this product are young people." },
          { sentence: "请提高___率。", pinyin: "Qǐng tígāo ___ lǜ.", answer: "转化", translationVi: "Hãy tăng tỷ lệ chuyển đổi.", translationEn: "Let's increase the conversion rate." },
          { sentence: "我们要做线上___。", pinyin: "Wǒmen yào zuò xiàn shàng ___.", answer: "推广", translationVi: "Chúng ta cần làm quảng bá online.", translationEn: "We need to do online promotion." },
        ],
      },
      // ──── Lesson 10: Startup & Funding ────
      {
        id: "cn-bz-10-startup", title: "Startup & Fundraising", titleVi: "Khởi nghiệp & Gọi vốn", titleZh: "创业融资", icon: "Rocket",
        description: "Pitch your startup to investors and discuss funding rounds", descriptionVi: "Pitch startup với nhà đầu tư và bàn vòng gọi vốn",
        hskLevel: 6, badge: "创业先锋", badgeVi: "Tiên phong Khởi nghiệp",
        keySituations: [{
          title: "Pitching to Investors", titleVi: "Pitch nhà đầu tư",
          description: "Present your startup to potential investors", descriptionVi: "Trình bày startup cho nhà đầu tư tiềm năng",
          culturalNote: "China's VC scene is huge - Sequoia China, Hillhouse, and Tencent are major players. A clear business model and traction matter most.",
          culturalNoteVi: "Giới VC Trung Quốc khổng lồ - Sequoia China, Hillhouse, Tencent là các tay chơi lớn. Mô hình kinh doanh rõ ràng và traction quan trọng nhất.",
          sampleDialogue: [
            { speaker: "A", line: "我们正在进行A轮融资。", pinyin: "Wǒmen zhèngzài jìnxíng A lún róngzī.", translationVi: "Chúng tôi đang gọi vốn vòng A.", translationEn: "We are currently raising Series A funding." },
            { speaker: "B", line: "估值多少？", pinyin: "Gūzhí duōshǎo?", translationVi: "Định giá bao nhiêu?", translationEn: "What's the valuation?" },
            { speaker: "A", line: "公司估值五千万人民币。", pinyin: "Gōngsī gūzhí wǔqiān wàn rénmínbì.", translationVi: "Công ty được định giá 50 triệu RMB.", translationEn: "The company is valued at 50 million RMB." },
            { speaker: "B", line: "你们的商业模式是什么？", pinyin: "Nǐmen de shāngyè móshì shì shénme?", translationVi: "Mô hình kinh doanh của các bạn là gì?", translationEn: "What is your business model?" },
          ],
        }],
        vocabulary: [
          { hanzi: "创业", pinyin: "chuàngyè", meaning: "Khởi nghiệp", meaningEn: "Start a business", type: "phrase", example: "我想创业。", examplePinyin: "Wǒ xiǎng chuàngyè.", exampleVi: "Tôi muốn khởi nghiệp." },
          { hanzi: "融资", pinyin: "róngzī", meaning: "Gọi vốn", meaningEn: "Fundraising", type: "phrase", example: "公司需要融资。", examplePinyin: "Gōngsī xūyào róngzī.", exampleVi: "Công ty cần gọi vốn." },
          { hanzi: "投资人", pinyin: "tóuzīrén", meaning: "Nhà đầu tư", meaningEn: "Investor", type: "phrase", example: "见投资人。", examplePinyin: "Jiàn tóuzīrén.", exampleVi: "Gặp nhà đầu tư." },
          { hanzi: "估值", pinyin: "gūzhí", meaning: "Định giá", meaningEn: "Valuation", type: "phrase", example: "公司估值很高。", examplePinyin: "Gōngsī gūzhí hěn gāo.", exampleVi: "Định giá công ty rất cao." },
          { hanzi: "商业模式", pinyin: "shāngyè móshì", meaning: "Mô hình kinh doanh", meaningEn: "Business model", type: "phrase", example: "商业模式很清晰。", examplePinyin: "Shāngyè móshì hěn qīngxī.", exampleVi: "Mô hình kinh doanh rõ ràng." },
          { hanzi: "股权", pinyin: "gǔquán", meaning: "Cổ phần", meaningEn: "Equity", type: "phrase", example: "出让百分之十股权。", examplePinyin: "Chūràng bǎi fēn zhī shí gǔquán.", exampleVi: "Nhượng 10% cổ phần." },
          { hanzi: "孵化器", pinyin: "fūhuàqì", meaning: "Vườn ươm khởi nghiệp", meaningEn: "Incubator", type: "phrase", example: "我们在孵化器里。", examplePinyin: "Wǒmen zài fūhuàqì lǐ.", exampleVi: "Chúng tôi trong vườn ươm." },
          { hanzi: "上市", pinyin: "shàngshì", meaning: "IPO / Lên sàn", meaningEn: "Go public / IPO", type: "phrase", example: "公司明年上市。", examplePinyin: "Gōngsī míngnián shàngshì.", exampleVi: "Công ty năm sau IPO." },
        ],
        commonStructures: [{ pattern: "估值 + Number + 人民币", patternPinyin: "Gūzhí + Number + rénmínbì", explanation: "Valued at [amount] RMB", explanationVi: "Định giá [số tiền] RMB", examples: [{ zh: "估值五千万人民币。", pinyin: "Gūzhí wǔqiān wàn rénmínbì.", vi: "Định giá 50 triệu RMB." }] }],
        listeningChallenge: {
          title: "Listening: Series A", titleVi: "Nghe: Vòng A",
          transcript: "我们公司成立两年，主要做人工智能教育产品。目前用户超过一百万，正在进行A轮融资，希望融到一千万人民币，估值五千万。",
          transcriptPinyin: "Wǒmen gōngsī chénglì liǎng nián, zhǔyào zuò réngōng zhìnéng jiàoyù chǎnpǐn. Mùqián yònghù chāoguò yìbǎi wàn, zhèngzài jìnxíng A lún róngzī, xīwàng róng dào yìqiān wàn rénmínbì, gūzhí wǔqiān wàn.",
          questions: [
            { q: "Company age?", qVi: "Tuổi công ty?", options: ["1 year", "2 years", "3 years", "5 years"], answer: 1 },
            { q: "User count?", qVi: "Số người dùng?", options: ["100k", "500k", "1M", "5M"], answer: 2 },
            { q: "Funding round?", qVi: "Vòng gọi vốn?", options: ["Seed", "A", "B", "C"], answer: 1 },
          ],
        },
        speakingTopics: ["Pitch a startup idea in 60 seconds", "Discuss fundraising strategies"],
        fillInBlankExercises: [
          { sentence: "我们公司在___阶段。", pinyin: "Wǒmen gōngsī zài ___ jiēduàn.", answer: "创业", translationVi: "Công ty chúng tôi ở giai đoạn khởi nghiệp.", translationEn: "Our company is in the startup phase." },
          { sentence: "需要___一千万。", pinyin: "Xūyào ___ yì qiān wàn.", answer: "融资", translationVi: "Cần gọi vốn 10 triệu.", translationEn: "We need to raise 10 million." },
          { sentence: "请看我们的商业___。", pinyin: "Qǐng kàn wǒmen de shāngyè ___.", answer: "计划", translationVi: "Xin xem kế hoạch kinh doanh của chúng tôi.", translationEn: "Please see our business plan." },
          { sentence: "这是我们的___产品。", pinyin: "Zhè shì wǒmen de ___ chǎnpǐn.", answer: "核心", translationVi: "Đây là sản phẩm cốt lõi của chúng tôi.", translationEn: "This is our core product." },
        ],
      },
      // ──── Lesson 11: HR & Benefits ────
      {
        id: "cn-bz-11-hr", title: "HR & Benefits", titleVi: "Nhân sự & Đãi ngộ", titleZh: "人事福利", icon: "UsersRound",
        description: "Discuss salary, benefits, and promotions", descriptionVi: "Bàn lương, phúc lợi và thăng tiến",
        hskLevel: 4, badge: "人事专家", badgeVi: "Chuyên gia Nhân sự",
        keySituations: [{
          title: "Discussing Benefits", titleVi: "Bàn về phúc lợi",
          description: "Talk about salary and insurance with HR", descriptionVi: "Trao đổi lương và bảo hiểm với HR",
          culturalNote: "Chinese employers must pay 五险一金 (5 insurances + housing fund). 13th-month bonuses (年终奖) are standard.",
          culturalNoteVi: "Doanh nghiệp Trung Quốc phải đóng 五险一金 (5 bảo hiểm + quỹ nhà ở). Thưởng tháng 13 (年终奖) là tiêu chuẩn.",
          sampleDialogue: [
            { speaker: "A", line: "公司的福利待遇怎么样？", pinyin: "Gōngsī de fúlì dàiyù zěnmeyàng?", translationVi: "Chế độ phúc lợi công ty thế nào?", translationEn: "What are the company's benefits like?" },
            { speaker: "B", line: "我们提供五险一金和年终奖。", pinyin: "Wǒmen tígōng wǔ xiǎn yī jīn hé niánzhōng jiǎng.", translationVi: "Chúng tôi có 5 bảo hiểm + quỹ nhà ở và thưởng cuối năm.", translationEn: "We have 5 insurances + housing fund and year-end bonuses." },
            { speaker: "A", line: "有没有带薪年假？", pinyin: "Yǒu méiyǒu dài xīn nián jià?", translationVi: "Có nghỉ phép có lương không?", translationEn: "Is there paid leave?" },
            { speaker: "B", line: "有，每年十五天。", pinyin: "Yǒu, měi nián shíwǔ tiān.", translationVi: "Có, mỗi năm 15 ngày.", translationEn: "Yes, 15 days per year." },
          ],
        }],
        vocabulary: [
          { hanzi: "工资", pinyin: "gōngzī", meaning: "Lương", meaningEn: "Salary", type: "phrase", example: "工资每月发。", examplePinyin: "Gōngzī měi yuè fā.", exampleVi: "Lương trả mỗi tháng." },
          { hanzi: "福利", pinyin: "fúlì", meaning: "Phúc lợi", meaningEn: "Benefits", type: "phrase", example: "福利很好。", examplePinyin: "Fúlì hěn hǎo.", exampleVi: "Phúc lợi rất tốt." },
          { hanzi: "保险", pinyin: "bǎoxiǎn", meaning: "Bảo hiểm", meaningEn: "Insurance", type: "phrase", example: "公司交保险。", examplePinyin: "Gōngsī jiāo bǎoxiǎn.", exampleVi: "Công ty đóng bảo hiểm." },
          { hanzi: "年终奖", pinyin: "niánzhōng jiǎng", meaning: "Thưởng cuối năm", meaningEn: "Year-end bonus", type: "phrase", example: "年终奖很多。", examplePinyin: "Niánzhōng jiǎng hěn duō.", exampleVi: "Thưởng cuối năm nhiều." },
          { hanzi: "升职", pinyin: "shēngzhí", meaning: "Thăng chức", meaningEn: "Promotion", type: "phrase", example: "他升职了。", examplePinyin: "Tā shēngzhí le.", exampleVi: "Anh ấy thăng chức." },
          { hanzi: "加薪", pinyin: "jiā xīn", meaning: "Tăng lương", meaningEn: "Raise", type: "phrase", example: "我想加薪。", examplePinyin: "Wǒ xiǎng jiā xīn.", exampleVi: "Tôi muốn tăng lương." },
          { hanzi: "年假", pinyin: "nián jià", meaning: "Nghỉ phép năm", meaningEn: "Annual leave", type: "phrase", example: "我有十天年假。", examplePinyin: "Wǒ yǒu shí tiān nián jià.", exampleVi: "Tôi có 10 ngày phép." },
          { hanzi: "辞职", pinyin: "cízhí", meaning: "Nghỉ việc", meaningEn: "Resign", type: "phrase", example: "他辞职了。", examplePinyin: "Tā cízhí le.", exampleVi: "Anh ấy nghỉ việc." },
        ],
        commonStructures: [{ pattern: "有没有 + N？", patternPinyin: "Yǒu méiyǒu + N?", explanation: "Is there X or not?", explanationVi: "Có X hay không?", examples: [{ zh: "有没有年假？", pinyin: "Yǒu méiyǒu nián jià?", vi: "Có nghỉ phép không?" }] }],
        listeningChallenge: {
          title: "Listening: HR Discussion", titleVi: "Nghe: HR trao đổi",
          transcript: "新员工的福利包括五险一金、十五天带薪年假、年终奖（一般是两个月工资）。表现优秀者每年可以加薪百分之十。每个员工都有培训机会。",
          transcriptPinyin: "Xīn yuángōng de fúlì bāokuò wǔ xiǎn yī jīn, shíwǔ tiān dài xīn nián jià, niánzhōng jiǎng (yìbān shì liǎng ge yuè gōngzī). Biǎoxiàn yōuxiù zhě měi nián kěyǐ jiā xīn bǎi fēn zhī shí.",
          questions: [
            { q: "Annual leave days?", qVi: "Phép năm bao nhiêu ngày?", options: ["10", "12", "15", "20"], answer: 2 },
            { q: "Year-end bonus?", qVi: "Thưởng cuối năm?", options: ["1 month", "2 months", "3 months", "6 months"], answer: 1 },
            { q: "Annual raise for top performers?", qVi: "Tăng lương cho người giỏi?", options: ["5%", "10%", "15%", "20%"], answer: 1 },
          ],
        },
        speakingTopics: ["Negotiate your salary and benefits", "Compare HR practices in China and your country"],
        fillInBlankExercises: [
          { sentence: "请问公司有什么___？", pinyin: "Qǐngwèn gōngsī yǒu shénme ___?", answer: "福利", translationVi: "Xin hỏi công ty có chế độ phúc lợi gì?", translationEn: "What benefits does the company offer?" },
          { sentence: "我想申请年___。", pinyin: "Wǒ xiǎng shēnqǐng nián ___.", answer: "假", translationVi: "Tôi muốn xin nghỉ phép năm.", translationEn: "I'd like to take my annual leave." },
          { sentence: "每月发___号？", pinyin: "Měi yuè fā ___ hào?", answer: "工资", translationVi: "Lương phát ngày bao nhiêu mỗi tháng?", translationEn: "What day of the month is payday?" },
          { sentence: "请填写___合同。", pinyin: "Qǐng tiánxiě ___ hétong.", answer: "劳动", translationVi: "Xin điền hợp đồng lao động.", translationEn: "Please fill out the employment contract." },
        ],
      },
      // ──── Lesson 12: Workplace Conflict ────
      {
        id: "cn-bz-12-conflict", title: "Workplace Conflict", titleVi: "Xử lý xung đột", titleZh: "职场冲突", icon: "AlertTriangle",
        description: "Handle disagreements with colleagues professionally", descriptionVi: "Xử lý bất đồng với đồng nghiệp chuyên nghiệp",
        hskLevel: 5, badge: "和谐使者", badgeVi: "Sứ giả Hòa giải",
        keySituations: [{
          title: "Resolving a Disagreement", titleVi: "Giải quyết bất đồng",
          description: "Address a project disagreement diplomatically", descriptionVi: "Xử lý bất đồng dự án ngoại giao",
          culturalNote: "Chinese workplaces value 和谐 (harmony) and 面子 (face). Avoid confrontation in public; address issues privately.",
          culturalNoteVi: "Nơi làm việc Trung Quốc trọng 和谐 (hòa hợp) và 面子 (thể diện). Tránh đối đầu nơi công cộng; nói chuyện riêng.",
          sampleDialogue: [
            { speaker: "A", line: "我觉得这个方案有问题。", pinyin: "Wǒ juéde zhège fāng'àn yǒu wèntí.", translationVi: "Tôi thấy phương án này có vấn đề.", translationEn: "I think there's a problem with this plan." },
            { speaker: "B", line: "您能具体说说吗？", pinyin: "Nín néng jùtǐ shuōshuo ma?", translationVi: "Anh có thể nói cụ thể không?", translationEn: "Could you be more specific?" },
            { speaker: "A", line: "成本可能超出预算。", pinyin: "Chéngběn kěnéng chāochū yùsuàn.", translationVi: "Chi phí có thể vượt ngân sách.", translationEn: "The costs might exceed the budget." },
            { speaker: "B", line: "我们再讨论一下吧。", pinyin: "Wǒmen zài tǎolùn yíxià ba.", translationVi: "Chúng ta thảo luận lại nhé.", translationEn: "Let's discuss it again." },
          ],
        }],
        vocabulary: [
          { hanzi: "冲突", pinyin: "chōngtū", meaning: "Xung đột", meaningEn: "Conflict", type: "phrase", example: "避免冲突。", examplePinyin: "Bìmiǎn chōngtū.", exampleVi: "Tránh xung đột." },
          { hanzi: "分歧", pinyin: "fēnqí", meaning: "Bất đồng", meaningEn: "Disagreement", type: "phrase", example: "我们有分歧。", examplePinyin: "Wǒmen yǒu fēnqí.", exampleVi: "Chúng ta có bất đồng." },
          { hanzi: "解决", pinyin: "jiějué", meaning: "Giải quyết", meaningEn: "Solve", type: "phrase", example: "解决问题。", examplePinyin: "Jiějué wèntí.", exampleVi: "Giải quyết vấn đề." },
          { hanzi: "妥协", pinyin: "tuǒxié", meaning: "Thỏa hiệp", meaningEn: "Compromise", type: "phrase", example: "需要妥协。", examplePinyin: "Xūyào tuǒxié.", exampleVi: "Cần thỏa hiệp." },
          { hanzi: "误会", pinyin: "wùhuì", meaning: "Hiểu lầm", meaningEn: "Misunderstanding", type: "phrase", example: "这是误会。", examplePinyin: "Zhè shì wùhuì.", exampleVi: "Đây là hiểu lầm." },
          { hanzi: "道歉", pinyin: "dàoqiàn", meaning: "Xin lỗi", meaningEn: "Apologize", type: "phrase", example: "我应该道歉。", examplePinyin: "Wǒ yīnggāi dàoqiàn.", exampleVi: "Tôi nên xin lỗi." },
          { hanzi: "沟通", pinyin: "gōutōng", meaning: "Giao tiếp", meaningEn: "Communicate", type: "phrase", example: "好好沟通。", examplePinyin: "Hǎohǎo gōutōng.", exampleVi: "Giao tiếp tốt." },
          { hanzi: "和谐", pinyin: "héxié", meaning: "Hòa hợp", meaningEn: "Harmony", type: "phrase", example: "团队和谐。", examplePinyin: "Tuánduì héxié.", exampleVi: "Nhóm hòa hợp." },
        ],
        commonStructures: [{ pattern: "您能 + Verb + 一下吗？", patternPinyin: "Nín néng + Verb + yíxià ma?", explanation: "Could you please [verb] briefly?", explanationVi: "Anh/chị có thể [động từ] một chút không?", examples: [{ zh: "您能解释一下吗？", pinyin: "Nín néng jiěshì yíxià ma?", vi: "Anh giải thích một chút được không?" }] }],
        listeningChallenge: {
          title: "Listening: Resolving Conflict", titleVi: "Nghe: Giải quyết xung đột",
          transcript: "昨天我和同事因为项目方案有分歧。我觉得应该先做市场调研，他认为可以直接开始。我们讨论了一个小时，最后达成妥协：先做两周调研，然后开始执行。",
          transcriptPinyin: "Zuótiān wǒ hé tóngshì yīnwèi xiàngmù fāng'àn yǒu fēnqí. Wǒ juéde yīnggāi xiān zuò shìchǎng diàoyán, tā rènwéi kěyǐ zhíjiē kāishǐ. Wǒmen tǎolùn le yí ge xiǎoshí, zuìhòu dáchéng tuǒxié.",
          questions: [
            { q: "What was the disagreement about?", qVi: "Bất đồng về gì?", options: ["薪资", "项目方案", "假期", "客户"], answer: 1 },
            { q: "How long did they discuss?", qVi: "Bàn bao lâu?", options: ["30分钟", "1小时", "2小时", "半天"], answer: 1 },
            { q: "Final compromise?", qVi: "Thỏa hiệp cuối?", options: ["放弃", "先调研两周", "直接开始", "请经理决定"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe how to handle workplace conflict", "Role-play resolving a project disagreement"],
        fillInBlankExercises: [
          { sentence: "我们之间有一些___。", pinyin: "Wǒmen zhī jiān yǒu yìxiē ___.", answer: "分歧", translationVi: "Giữa chúng ta có một vài bất đồng.", translationEn: "We have some disagreements." },
          { sentence: "请好好___一下。", pinyin: "Qǐng hǎohǎo ___ yíxià.", answer: "沟通", translationVi: "Xin giao tiếp tốt một chút.", translationEn: "Please communicate better." },
          { sentence: "这只是___，别生气。", pinyin: "Zhè zhǐ shì ___, bié shēngqì.", answer: "误会", translationVi: "Đây chỉ là hiểu lầm, đừng giận.", translationEn: "This is just a misunderstanding, don't be angry." },
          { sentence: "我们需要互相___。", pinyin: "Wǒmen xūyào hùxiāng ___.", answer: "妥协", translationVi: "Chúng ta cần thỏa hiệp lẫn nhau.", translationEn: "We need to compromise with each other." },
        ],
      },
    ],
  },
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
              { speaker: "A", line: "你平时有什么爱好？", pinyin: "Nǐ píngshí yǒu shénme àihào?", translationVi: "Bạn thường có sở thích gì?", translationEn: "What are your hobbies?" },
              { speaker: "B", line: "我喜欢打篮球和看电影。你呢？", pinyin: "Wǒ xǐhuan dǎ lánqiú hé kàn diànyǐng. Nǐ ne?", translationVi: "Tôi thích chơi bóng rổ và xem phim. Còn bạn?", translationEn: "I like playing basketball and watching movies. How about you?" },
              { speaker: "A", line: "我喜欢弹吉他，周末还会去爬山。", pinyin: "Wǒ xǐhuan tán jítā, zhōumò hái huì qù pá shān.", translationVi: "Tôi thích chơi guitar, cuối tuần còn đi leo núi.", translationEn: "I like playing guitar, and on weekends, I go hiking." },
              { speaker: "B", line: "太酷了！下次一起去爬山吧！", pinyin: "Tài kù le! Xià cì yīqǐ qù pá shān ba!", translationVi: "Tuyệt quá! Lần sau cùng đi leo núi nhé!", translationEn: "That's great! Let's go hiking together next time!" },
            ],
          },
          {
            title: "Making Plans with Friends",
            titleVi: "Lên kế hoạch với bạn bè",
            description: "Invite friends and make weekend plans",
            descriptionVi: "Rủ bạn bè và lên kế hoạch cuối tuần",
            sampleDialogue: [
              { speaker: "A", line: "这个周末有空吗？想不想一起去看电影？", pinyin: "Zhège zhōumò yǒu kòng ma? Xiǎng bu xiǎng yīqǐ qù kàn diànyǐng?", translationVi: "Cuối tuần này rảnh không? Muốn đi xem phim cùng không?", translationEn: "Are you free this weekend? Want to go watch a movie together?" },
              { speaker: "B", line: "周六可以。看什么电影？", pinyin: "Zhōu liù kěyǐ. Kàn shénme diànyǐng?", translationVi: "Thứ Bảy được. Xem phim gì?", translationEn: "Saturday works. What movie?" },
              { speaker: "A", line: "听说新出的那部科幻片很好看。下午两点的场次怎么样？", pinyin: "Tīng shuō xīn chū de nà bù kēhuàn piān hěn hǎokàn. Xiàwǔ liǎng diǎn de chǎng cì zěnmeyàng?", translationVi: "Nghe nói phim khoa học viễn tưởng mới ra rất hay. Suất chiếu 2 giờ chiều được không?", translationEn: "I heard the new sci-fi movie is very good. Is the 2 PM showing okay?" },
              { speaker: "B", line: "没问题！看完电影我们去吃火锅吧。", pinyin: "Méi wèntí! Kàn wán diànyǐng wǒmen qù chī huǒguō ba.", translationVi: "Không vấn đề! Xem phim xong đi ăn lẩu nhé.", translationEn: "No problem! After the movie, let's go eat hotpot." },
              { speaker: "A", line: "好主意！那我先买票。", pinyin: "Hǎo zhǔyi! Nà wǒ xiān mǎi piào.", translationVi: "Ý hay! Vậy tôi mua vé trước.", translationEn: "Good idea! I'll buy the tickets beforehand then." },
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
              { speaker: "A", line: "你觉得学中文难不难？", pinyin: "Nǐ juéde xué Zhōngwén nán bu nán?", translationVi: "Bạn thấy học tiếng Trung có khó không?", translationEn: "Do you find learning Chinese difficult?" },
              { speaker: "B", line: "我觉得发音比较难，但是语法其实没那么复杂。", pinyin: "Wǒ juéde fāyīn bǐjiào nán, dànshì yǔfǎ qíshí méi nàme fùzá.", translationVi: "Tôi thấy phát âm khá khó, nhưng ngữ pháp thực ra không phức tạp lắm.", translationEn: "I find the pronunciation quite difficult, but the grammar is actually not very complicated." },
              { speaker: "A", line: "我不太同意。我觉得汉字最难。", pinyin: "Wǒ bú tài tóngyì. Wǒ juéde Hànzì zuì nán.", translationVi: "Tôi không đồng ý lắm. Tôi thấy chữ Hán khó nhất.", translationEn: "I don't really agree. I find Chinese characters the most difficult." },
              { speaker: "B", line: "你说的也有道理。每个人的感觉不一样。", pinyin: "Nǐ shuō de yě yǒu dàolǐ. Měi ge rén de gǎnjué bù yīyàng.", translationVi: "Bạn nói cũng có lý. Mỗi người cảm nhận khác nhau.", translationEn: "You've got a point. Everyone perceives it differently." },
            ],
          },
          {
            title: "Debating a Topic",
            titleVi: "Tranh luận một chủ đề",
            description: "Discuss pros and cons of a topic",
            descriptionVi: "Thảo luận ưu nhược điểm của một chủ đề",
            sampleDialogue: [
              { speaker: "A", line: "你觉得住在大城市好还是小城市好？", pinyin: "Nǐ juéde zhù zài dà chéngshì hǎo háishi xiǎo chéngshì hǎo?", translationVi: "Bạn thấy sống ở thành phố lớn hay nhỏ tốt hơn?", translationEn: "Do you prefer living in a big city or a small city?" },
              { speaker: "B", line: "我觉得大城市好。工作机会多，生活丰富。", pinyin: "Wǒ juéde dà chéngshì hǎo. Gōngzuò jīhuì duō, shēnghuó fēngfù.", translationVi: "Tôi thấy thành phố lớn tốt hơn. Cơ hội việc làm nhiều, cuộc sống phong phú.", translationEn: "I prefer big cities. There are more job opportunities and life is richer." },
              { speaker: "A", line: "但是大城市房价太高了，而且压力很大。", pinyin: "Dànshì dà chéngshì fángjià tài gāo le, érqiě yālì hěn dà.", translationVi: "Nhưng giá nhà ở thành phố lớn quá cao, mà áp lực cũng lớn.", translationEn: "But housing prices in big cities are too high, and there's a lot of pressure." },
              { speaker: "B", line: "这倒是。不过年轻的时候在大城市闯一闯还是值得的。", pinyin: "Zhè dào shì. Búguò niánqīng de shíhou zài dà chéngshì chuǎng yī chuǎng háishi zhídé de.", translationVi: "Đúng thế. Nhưng lúc trẻ ra thành phố lớn phấn đấu vẫn đáng giá.", translationEn: "That's true. But it's still worth it to strive in a big city when you're young." },
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
              { speaker: "A", line: "今天的考试怎么样？", pinyin: "Jīntiān de kǎoshì zěnmeyàng?", translationVi: "Thi hôm nay thế nào?", translationEn: "How was the exam today?" },
              { speaker: "B", line: "OMG，太难了！我觉得我要凉凉了。😭", pinyin: "OMG, tài nán le! Wǒ juéde wǒ yào liáng liáng le.", translationVi: "OMG, khó quá! Tôi thấy mình xong đời rồi. 😭", translationEn: "OMG, it was so hard! I think I'm doomed. 😭" },
              { speaker: "A", line: "别担心啦，你太卷了，肯定没问题的。", pinyin: "Bié dānxīn la, nǐ tài juǎn le, kěndìng méi wèntí de.", translationVi: "Đừng lo, bạn chăm chỉ quá, chắc chắn không sao đâu.", translationEn: "Don't worry, you work so hard, you'll definitely be fine." },
              { speaker: "B", line: "哈哈，希望吧。今晚一起吃鸡？", pinyin: "Hāhā, xīwàng ba. Jīn wǎn yīqǐ chī jī?", translationVi: "Haha, hy vọng vậy. Tối nay cùng chơi PUBG không?", translationEn: "Haha, I hope so. Want to play PUBG tonight?" },
              { speaker: "A", line: "冲！88～", pinyin: "Chōng! Bā bā~", translationVi: "Xông! Bye bye~", translationEn: "Let's go! Bye bye~" },
            ],
          },
          {
            title: "Understanding Douyin/Weibo Trends",
            titleVi: "Hiểu xu hướng Douyin/Weibo",
            description: "Discuss trending topics and viral content",
            descriptionVi: "Thảo luận chủ đề thịnh hành và nội dung viral",
            sampleDialogue: [
              { speaker: "A", line: "你看了昨天抖音上那个视频吗？太搞笑了！", pinyin: "Nǐ kàn le zuótiān Dǒuyīn shàng nàge shìpín ma? Tài gǎoxiào le!", translationVi: "Bạn xem video trên Douyin hôm qua chưa? Buồn cười quá!", translationEn: "Have you seen the Douyin video from yesterday? It was so funny!" },
              { speaker: "B", line: "哪个？发给我看看。", pinyin: "Nǎ ge? Fā gěi wǒ kànkan.", translationVi: "Video nào? Gửi cho tôi xem.", translationEn: "Which video? Send it to me." },
              { speaker: "A", line: "就是那个'挖呀挖'的。已经被转发了几百万次。", pinyin: "Jiù shì nàge 'wā ya wā' de. Yǐjīng bèi zhuǎn fā le jǐ bǎi wàn cì.", translationVi: "Cái video 'đào đào đào' đó. Đã được chia sẻ hàng triệu lần.", translationEn: "That 'dig dig dig' video. It's been shared millions of times." },
              { speaker: "B", line: "哈哈，我看到了！评论区太好笑了，全是造梗的。", pinyin: "Hāhā, wǒ kàn dào le! Pínglùn qū tài hǎo xiào le, quán shì zào gěng de.", translationVi: "Haha, tôi thấy rồi! Phần bình luận buồn cười quá, toàn tạo meme.", translationEn: "Haha, I've seen it! The comments are hilarious, full of memes." },
            ],
          },
          {
            title: "Dating App Conversation",
            titleVi: "Chat trên app hẹn hò",
            description: "Modern dating vocabulary and expressions",
            descriptionVi: "Từ vựng và cách nói hẹn hò hiện đại",
            culturalNote: "Popular dating apps in China: 探探 (Tàntàn, like Tinder), 陌陌 (Mòmò). Chinese dating culture often involves parents' approval. '相亲' (xiāngqīn - arranged dating) is still common for adults over 25.",
            culturalNoteVi: "App hẹn hò phổ biến ở Trung Quốc: 探探 (như Tinder), 陌陌. Văn hóa hẹn hò Trung Quốc thường cần sự đồng ý của bố mẹ. '相亲' (mai mối) vẫn phổ biến cho người trên 25 tuổi.",
            sampleDialogue: [
              { speaker: "A", line: "你是做什么工作的？看你的照片，好像很喜欢旅游。", pinyin: "Nǐ shì zuò shénme gōngzuò de? Kàn nǐ de zhàopiàn, hǎoxiàng hěn xǐhuan lǚyóu.", translationVi: "Bạn làm nghề gì? Nhìn ảnh bạn có vẻ rất thích du lịch.", translationEn: "What do you do for a living? From your photos, you seem to really enjoy traveling." },
              { speaker: "B", line: "我是程序员。对，我超喜欢旅游！你呢？", pinyin: "Wǒ shì chéngxùyuán. Duì, wǒ chāo xǐhuan lǚyóu! Nǐ ne?", translationVi: "Tôi là lập trình viên. Đúng vậy, tôi siêu thích du lịch! Còn bạn?", translationEn: "I'm a programmer. Yes, I super love to travel! How about you?" },
              { speaker: "A", line: "我也是！那我们有空一起出去玩吧？", pinyin: "Wǒ yě shì! Nà wǒmen yǒu kòng yīqǐ chūqù wán ba?", translationVi: "Tôi cũng vậy! Vậy rảnh mình cùng đi chơi nhé?", translationEn: "Me too! So, when we're free, let's go out together?" },
              { speaker: "B", line: "好啊！加个微信吧。", pinyin: "Hǎo a! Jiā ge Wēixìn ba.", translationVi: "Được! Kết bạn WeChat nhé.", translationEn: "Okay! Let's add each other on WeChat." },
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
            culturalNote: "春节 (Chūnjié - Spring Festival) is the most important holiday. Families gather for 年夜饭 (niányè fàn - New Year's Eve dinner). Red envelopes (红包 hóngbāo) with money are given to children and unmarried adults.",
            culturalNoteVi: "春节 (Tết Nguyên đán) là ngày lễ quan trọng nhất. Gia đình sum họp ăn 年夜饭 (bữa cơm tất niên). 红包 (lì xì) được tặng cho trẻ em và người chưa kết hôn.",
            sampleDialogue: [
              { speaker: "A", line: "新年快乐！恭喜发财！", pinyin: "Xīn nián kuài lè! Gōngxǐ fā cái!", translationVi: "Chúc mừng năm mới! Cung hỷ phát tài!", translationEn: "Happy New Year! May you be prosperous!" },
              { speaker: "B", line: "新年快乐！你回家过年吗？", pinyin: "Xīn nián kuài lè! Nǐ huí jiā guò nián ma?", translationVi: "Chúc mừng năm mới! Bạn về nhà ăn Tết không?", translationEn: "Happy New Year! Are you going home for Tet?" },
              { speaker: "A", line: "回，我已经买好火车票了。你呢？", pinyin: "Huí, wǒ yǐjīng mǎi hǎo huǒchē piào le. Nǐ ne?", translationVi: "Có, tôi mua vé tàu rồi. Còn bạn?", translationEn: "Yes, I bought my train ticket. How about you?" },
              { speaker: "B", line: "我今年不回去了，太远了。和朋友一起吃年夜饭。", pinyin: "Wǒ jīnnián bú huíqù le, tài yuǎn le. Hé péngyǒu yīqǐ chī niányè fàn.", translationVi: "Năm nay tôi không về, xa quá. Ăn cơm tất niên với bạn bè.", translationEn: "I'm not going back this year, it's too far. I'm having New Year's Eve dinner with friends." },
              { speaker: "A", line: "那也不错！别忘了看春晚！", pinyin: "Nà yě búcuò! Bié wàng le kàn Chūn Wǎn!", translationVi: "Vậy cũng tốt! Đừng quên xem Gala Xuân!", translationEn: "That's good too! Don't forget to watch the Spring Festival Gala!" },
            ],
          },
          {
            title: "Mid-Autumn Festival",
            titleVi: "Tết Trung thu",
            description: "Mooncakes, family gatherings, and moon gazing",
            descriptionVi: "Bánh trung thu, sum họp gia đình và ngắm trăng",
            sampleDialogue: [
              { speaker: "A", line: "中秋节快乐！你吃月饼了吗？", pinyin: "Zhōngqiū Jié kuài lè! Nǐ chī yuèbǐng le ma?", translationVi: "Tết Trung thu vui vẻ! Bạn ăn bánh trung thu chưa?", translationEn: "Happy Mid-Autumn Festival! Have you eaten mooncakes yet?" },
              { speaker: "B", line: "吃了！我最喜欢吃五仁的。你喜欢什么馅的？", pinyin: "Chī le! Wǒ zuì xǐhuan chī wǔ rén de. Nǐ xǐhuan shénme xiàn de?", translationVi: "Ăn rồi! Tôi thích nhất nhân ngũ nhân. Bạn thích nhân gì?", translationEn: "Yes! I like the mixed nuts filling the most. What filling do you like?" },
              { speaker: "A", line: "我喜欢蛋黄莲蓉的。今晚一起去赏月吧！", pinyin: "Wǒ xǐhuan dàn huáng lián róng de. Jīn wǎn yīqǐ qù shǎng yuè ba!", translationVi: "Tôi thích nhân trứng muối sen. Tối nay cùng ngắm trăng nhé!", translationEn: "I like the salted egg yolk lotus seed paste filling. Let's admire the moon together tonight!" },
              { speaker: "B", line: "好啊！月亮应该很圆很亮。", pinyin: "Hǎo a! Yuèliang yīnggāi hěn yuán hěn liàng.", translationVi: "Được! Trăng chắc rất tròn và sáng.", translationEn: "Okay! The moon must be very round and bright." },
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
              { speaker: "A", line: "这周末你有空吗？", pinyin: "Zhè zhōumò nǐ yǒu kòng ma?", translationVi: "Cuối tuần này bạn rảnh không?", translationEn: "Are you free this weekend?" },
              { speaker: "B", line: "有啊，怎么了？", pinyin: "Yǒu a, zěnme le?", translationVi: "Rảnh, sao vậy?", translationEn: "Yes, why?" },
              { speaker: "A", line: "我想请你一起去看电影，你愿意吗？", pinyin: "Wǒ xiǎng qǐng nǐ yīqǐ qù kàn diànyǐng, nǐ yuànyì ma?", translationVi: "Tôi muốn mời bạn đi xem phim, bạn có muốn không?", translationEn: "I want to invite you to the movies, would you like to go?" },
              { speaker: "B", line: "好啊！看什么电影？", pinyin: "Hǎo a! Kàn shénme diànyǐng?", translationVi: "Được! Xem phim gì?", translationEn: "Sure! What movie?" },
              { speaker: "A", line: "有一部新的爱情片，评分很高。", pinyin: "Yǒu yī bù xīn de àiqíng piàn, píngfēn hěn gāo.", translationVi: "Có bộ phim tình cảm mới, điểm rất cao.", translationEn: "There's a new romance movie, with very high ratings." },
            ],
          },
          {
            title: "Expressing Feelings",
            titleVi: "Bày tỏ tình cảm",
            description: "How to express romantic interest and emotions",
            descriptionVi: "Cách bày tỏ sự quan tâm và tình cảm",
            sampleDialogue: [
              { speaker: "A", line: "我觉得我们在一起很开心。", pinyin: "Wǒ juéde wǒmen zài yīqǐ hěn kāixīn.", translationVi: "Tôi thấy chúng ta ở bên nhau rất vui.", translationEn: "I feel very happy when we're together." },
              { speaker: "B", line: "我也是，你对我很重要。", pinyin: "Wǒ yě shì, nǐ duì wǒ hěn zhòngyào.", translationVi: "Tôi cũng vậy, bạn rất quan trọng với tôi.", translationEn: "Me too, you're very important to me." },
              { speaker: "A", line: "我喜欢你，你愿意做我的女朋友吗？", pinyin: "Wǒ xǐhuan nǐ, nǐ yuànyì zuò wǒ de nǚ péngyǒu ma?", translationVi: "Tôi thích bạn, bạn có muốn làm bạn gái tôi không?", translationEn: "I like you, would you like to be my girlfriend?" },
              { speaker: "B", line: "我也喜欢你，我愿意。", pinyin: "Wǒ yě xǐhuan nǐ, wǒ yuànyì.", translationVi: "Tôi cũng thích bạn, tôi đồng ý.", translationEn: "I like you too, I accept." },
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
            culturalNote: "Fitness culture is booming in China. 健身房 (jiànshēn fáng) gyms and 瑜伽 (yújiā) yoga studios are very popular in cities. The concept of 打卡 (dǎkǎ - check-in) motivates people to post their workouts on social media.",
            culturalNoteVi: "Văn hóa tập luyện đang bùng nổ ở Trung Quốc. Phòng gym 健身房 và studio yoga 瑜伽 rất phổ biến ở thành phố. Khái niệm '打卡' (check-in) thúc đẩy mọi người đăng bài tập lên mạng xã hội.",
            sampleDialogue: [
              { speaker: "A", line: "你今天练什么？", pinyin: "Nǐ jīntiān liàn shénme?", translationVi: "Hôm nay bạn tập gì?", translationEn: "What are you exercising today?" },
              { speaker: "B", line: "我今天练腿，你呢？", pinyin: "Wǒ jīntiān liàn tuǐ, nǐ ne?", translationVi: "Hôm nay tôi tập chân, còn bạn?", translationEn: "I did leg day today, what about you?" },
              { speaker: "A", line: "我跑步半小时，然后做力量训练。", pinyin: "Wǒ pǎobù bàn xiǎoshí, ránhòu zuò lìliàng xùnliàn.", translationVi: "Tôi chạy bộ nửa tiếng, sau đó tập sức mạnh.", translationEn: "I ran for half an hour, then did strength training." },
              { speaker: "B", line: "不错！运动完了一起喝杯蛋白粉吧。", pinyin: "Búcuò! Yùndòng wán le yīqǐ hē bēi dànbái fěn ba.", translationVi: "Tốt! Tập xong cùng uống ly protein nhé.", translationEn: "Great! Let's have a protein shake together after training." },
            ],
          },
          {
            title: "Talking About Sports",
            titleVi: "Nói về thể thao",
            description: "Discuss your favorite sports and teams",
            descriptionVi: "Thảo luận về môn thể thao và đội bóng yêu thích",
            sampleDialogue: [
              { speaker: "A", line: "你喜欢什么运动？", pinyin: "Nǐ xǐhuan shénme yùndòng?", translationVi: "Bạn thích môn thể thao nào?", translationEn: "What sports do you like?" },
              { speaker: "B", line: "我最喜欢打篮球，我是NBA球迷。", pinyin: "Wǒ zuì xǐhuan dǎ lánqiú, wǒ shì NBA qiúmí.", translationVi: "Tôi thích nhất chơi bóng rổ, tôi là fan NBA.", translationEn: "I like playing basketball the most; I'm an NBA fan." },
              { speaker: "A", line: "你支持哪个队？", pinyin: "Nǐ zhīchí nǎge duì?", translationVi: "Bạn ủng hộ đội nào?", translationEn: "Which team do you support?" },
              { speaker: "B", line: "湖人队！勒布朗是我的偶像。", pinyin: "Húrén Duì! Lèbùlǎng shì wǒ de ǒuxiàng.", translationVi: "Đội Lakers! LeBron là thần tượng của tôi.", translationEn: "The Lakers! LeBron is my idol." },
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
      // ──── Lesson 7: Travel & Tourism ────
      {
        id: "cn-sc-07-travel",
        title: "Travel & Tourism",
        titleVi: "Du lịch & Tham quan",
        titleZh: "旅游",
        icon: "Plane",
        description: "Master conversation about du lịch & tham quan with dialogues, vocabulary, and listening practice.",
        descriptionVi: "Thành thạo hội thoại về du lịch & tham quan qua hội thoại, từ vựng và bài nghe.",
        hskLevel: 3,
        keySituations: [
          {
            title: "Booking a Tour",
            titleVi: "Đặt tour du lịch",
            description: "Practice essential dialogues for đặt tour du lịch.",
            descriptionVi: "Luyện hội thoại thực tế chủ đề đặt tour du lịch.",
            sampleDialogue: [
              { speaker: "游客", line: "您好，我想报一个北京三日游。", pinyin: "Nín hǎo, wǒ xiǎng bào yí ge Běijīng sān rì yóu.", translationVi: "Chào, tôi muốn đăng ký tour Bắc Kinh 3 ngày.", translationEn: "Hello, I'd like to book a 3-day Beijing tour." },
              { speaker: "客服", line: "好的，我们有标准团和高端团两种。", pinyin: "Hǎo de, wǒmen yǒu biāozhǔn tuán hé gāoduān tuán liǎng zhǒng.", translationVi: "Vâng, có tour tiêu chuẩn và cao cấp.", translationEn: "Yes, we have standard and premium tours." },
              { speaker: "游客", line: "高端团多少钱？包括什么景点？", pinyin: "Gāoduān tuán duōshǎo qián? Bāokuò shénme jǐngdiǎn?", translationVi: "Tour cao cấp bao nhiêu? Gồm điểm tham quan nào?", translationEn: "How much is the premium tour? What attractions does it include?" },
              { speaker: "客服", line: "三千八，包括长城、故宫和颐和园。", pinyin: "Sānqiān bā, bāokuò Chángchéng, Gùgōng hé Yíhéyuán.", translationVi: "3800 tệ, gồm Vạn Lý Trường Thành, Cố Cung, Di Hòa Viên.", translationEn: "It's 3800 yuan, including the Great Wall, the Forbidden City, and the Summer Palace." },
            ],
            culturalNote: "Group tours (跟团游) remain popular but free-and-easy travel (自由行) is rapidly growing among younger Chinese.",
          },
        ],
        vocabulary: [
          { hanzi: "旅游", pinyin: "lǚyóu", meaning: "Du lịch", meaningEn: "Travel", type: "phrase", example: "我喜欢旅游。", examplePinyin: "Wǒ xǐhuān lǚyóu.", exampleVi: "Tôi thích du lịch." },
          { hanzi: "景点", pinyin: "jǐngdiǎn", meaning: "Điểm tham quan", meaningEn: "Attraction", type: "phrase", example: "著名景点。", examplePinyin: "Zhùmíng jǐngdiǎn.", exampleVi: "Điểm nổi tiếng." },
          { hanzi: "签证", pinyin: "qiānzhèng", meaning: "Visa", meaningEn: "Visa", type: "phrase", example: "申请签证。", examplePinyin: "Shēnqǐng qiānzhèng.", exampleVi: "Xin visa." },
          { hanzi: "护照", pinyin: "hùzhào", meaning: "Hộ chiếu", meaningEn: "Passport", type: "phrase", example: "带好护照。", examplePinyin: "Dài hǎo hùzhào.", exampleVi: "Mang hộ chiếu." },
          { hanzi: "导游", pinyin: "dǎoyóu", meaning: "Hướng dẫn viên", meaningEn: "Tour guide", type: "phrase", example: "导游很专业。", examplePinyin: "Dǎoyóu hěn zhuānyè.", exampleVi: "HDV chuyên nghiệp." },
          { hanzi: "行程", pinyin: "xíngchéng", meaning: "Hành trình", meaningEn: "Itinerary", type: "phrase", example: "查看行程。", examplePinyin: "Chákàn xíngchéng.", exampleVi: "Xem hành trình." },
          { hanzi: "纪念品", pinyin: "jìniànpǐn", meaning: "Quà lưu niệm", meaningEn: "Souvenir", type: "phrase", example: "买纪念品。", examplePinyin: "Mǎi jìniànpǐn.", exampleVi: "Mua quà lưu niệm." },
          { hanzi: "民宿", pinyin: "mínsù", meaning: "Homestay", meaningEn: "Homestay", type: "phrase", example: "住民宿。", examplePinyin: "Zhù mínsù.", exampleVi: "Ở homestay." },
          { hanzi: "拍照", pinyin: "pāizhào", meaning: "Chụp ảnh", meaningEn: "Take photos", type: "phrase", example: "在这儿拍照。", examplePinyin: "Zài zhèr pāizhào.", exampleVi: "Chụp ảnh ở đây." },
          { hanzi: "出境", pinyin: "chūjìng", meaning: "Xuất cảnh", meaningEn: "Leave country", type: "phrase", example: "出境旅游。", examplePinyin: "Chūjìng lǚyóu.", exampleVi: "Du lịch nước ngoài." },
        ],
        commonStructures: [{ pattern: "我去过 + Place + 几次了", patternPinyin: "Wǒ qù guò + Place + jǐ cì le", explanation: "I have been to [place] several times", explanationVi: "Tôi đã đến [địa điểm] vài lần rồi", examples: [{ zh: "我去过北京三次了。", pinyin: "Wǒ qù guò Běijīng sān cì le.", vi: "Tôi đã đến Bắc Kinh 3 lần." }] }],
        listeningChallenge: {
          title: "Listening: Booking a Trip",
          titleVi: "Nghe: Đặt chuyến đi",
          transcript: "下个月我要去云南旅游一周。我已经订好了机票和酒店，还在网上预订了大理和丽江的导游。听说云南的少数民族文化很有特色，我特别期待。",
          transcriptPinyin: "Xià ge yuè wǒ yào qù Yúnnán lǚyóu yì zhōu. Wǒ yǐjīng dìng hǎo le jīpiào hé jiǔdiàn, hái zài wǎng shàng yùdìng le Dàlǐ hé Lìjiāng de dǎoyóu.",
          questions: [
            { q: "Where is the trip?", qVi: "Đi đâu?", options: ["北京", "上海", "云南", "西安"], answer: 2 },
            { q: "How long?", qVi: "Bao lâu?", options: ["3 ngày", "5 ngày", "1 tuần", "2 tuần"], answer: 2 },
            { q: "What is special about Yunnan?", qVi: "Vân Nam đặc biệt gì?", options: ["Đồ ăn", "Văn hóa dân tộc thiểu số", "Bãi biển", "Mua sắm"], answer: 1 },
          ],
        },
        speakingTopics: ["Describe your dream trip in China", "Discuss group tour vs free travel"],
        fillInBlankExercises: [
          { sentence: "我想报一个___三日游。", pinyin: "Wǒ xiǎng bào yí ge ___ sān rì yóu.", answer: "北京", translationVi: "Tôi muốn đăng ký tour Bắc Kinh 3 ngày.", translationEn: "I want to book a 3-day Beijing tour." },
          { sentence: "请带好你的___。", pinyin: "Qǐng dài hǎo nǐ de ___.", answer: "护照", translationVi: "Hãy mang theo hộ chiếu.", translationEn: "Please bring your passport." },
          { sentence: "___带我们参观长城。", pinyin: "___ dài wǒmen cānguān Chángchéng.", answer: "导游", translationVi: "Hướng dẫn viên dẫn chúng tôi tham quan Vạn Lý Trường Thành.", translationEn: "The tour guide led us to visit the Great Wall." },
          { sentence: "这家___又便宜又干净。", pinyin: "Zhè jiā ___ yòu piányi yòu gānjìng.", answer: "民宿", translationVi: "Homestay này vừa rẻ vừa sạch.", translationEn: "This homestay is both cheap and clean." },
        ],
        badge: "Du lịch & Tham quan Master",
        badgeVi: "Bậc thầy Du lịch & Tham quan",
      },
      // ──── Lesson 8: Music, Movies & TV ────
      {
        id: "cn-sc-08-entertainment",
        title: "Music, Movies & TV",
        titleVi: "Âm nhạc, Phim & TV",
        titleZh: "音乐电影",
        icon: "Music",
        description: "Master conversation about âm nhạc, phim & tv with dialogues, vocabulary, and listening practice.",
        descriptionVi: "Thành thạo hội thoại về âm nhạc, phim & tv qua hội thoại, từ vựng và bài nghe.",
        hskLevel: 4,
        keySituations: [
          {
            title: "Discussing Favorite Movies",
            titleVi: "Bàn về phim yêu thích",
            description: "Practice essential dialogues for bàn về phim yêu thích.",
            descriptionVi: "Luyện hội thoại thực tế chủ đề bàn về phim yêu thích.",
            sampleDialogue: [
              { speaker: "A", line: "你最近看了什么电影？", pinyin: "Nǐ zuìjìn kàn le shénme diànyǐng?", translationVi: "Gần đây bạn xem phim gì?", translationEn: "What movies have you seen recently?" },
              { speaker: "B", line: "我看了《流浪地球2》，特效很震撼。", pinyin: "Wǒ kàn le 《Liúlàng Dìqiú 2》, tèxiào hěn zhènhàn.", translationVi: "Tôi xem Lưu Lạc Địa Cầu 2, hiệu ứng rất ấn tượng.", translationEn: "I watched The Wandering Earth 2; the special effects were very impressive." },
              { speaker: "A", line: "我也喜欢科幻片，剧情怎么样？", pinyin: "Wǒ yě xǐhuān kēhuàn piàn, jùqíng zěnmeyàng?", translationVi: "Tôi cũng thích phim viễn tưởng, cốt truyện thế nào?", translationEn: "I also like sci-fi movies, what's the plot like?" },
              { speaker: "B", line: "剧情很紧凑，演员演技也不错。", pinyin: "Jùqíng hěn jǐncòu, yǎnyuán yǎnjì yě búcuò.", translationVi: "Cốt truyện chặt chẽ, diễn xuất cũng tốt.", translationEn: "The plot is well-structured, and the acting is good too." },
            ],
            culturalNote: "Chinese sci-fi (科幻) like 'The Wandering Earth' has gained global recognition. C-pop and C-dramas dominate streaming platforms iQiyi and Bilibili.",
          },
        ],
        vocabulary: [
          { hanzi: "电影", pinyin: "diànyǐng", meaning: "Phim", meaningEn: "Movie", type: "phrase", example: "看电影。", examplePinyin: "Kàn diànyǐng.", exampleVi: "Xem phim." },
          { hanzi: "音乐", pinyin: "yīnyuè", meaning: "Âm nhạc", meaningEn: "Music", type: "phrase", example: "听音乐。", examplePinyin: "Tīng yīnyuè.", exampleVi: "Nghe nhạc." },
          { hanzi: "演员", pinyin: "yǎnyuán", meaning: "Diễn viên", meaningEn: "Actor", type: "phrase", example: "知名演员。", examplePinyin: "Zhīmíng yǎnyuán.", exampleVi: "Diễn viên nổi tiếng." },
          { hanzi: "剧情", pinyin: "jùqíng", meaning: "Cốt truyện", meaningEn: "Plot", type: "phrase", example: "剧情精彩。", examplePinyin: "Jùqíng jīngcǎi.", exampleVi: "Cốt truyện hấp dẫn." },
          { hanzi: "特效", pinyin: "tèxiào", meaning: "Hiệu ứng", meaningEn: "Special effects", type: "phrase", example: "特效震撼。", examplePinyin: "Tèxiào zhènhàn.", exampleVi: "Hiệu ứng ấn tượng." },
          { hanzi: "歌手", pinyin: "gēshǒu", meaning: "Ca sĩ", meaningEn: "Singer", type: "phrase", example: "我最爱的歌手。", examplePinyin: "Wǒ zuì ài de gēshǒu.", exampleVi: "Ca sĩ tôi yêu thích." },
          { hanzi: "专辑", pinyin: "zhuānjí", meaning: "Album", meaningEn: "Album", type: "phrase", example: "新专辑。", examplePinyin: "Xīn zhuānjí.", exampleVi: "Album mới." },
          { hanzi: "演唱会", pinyin: "yǎnchànghuì", meaning: "Liveshow", meaningEn: "Concert", type: "phrase", example: "去演唱会。", examplePinyin: "Qù yǎnchànghuì.", exampleVi: "Đi xem liveshow." },
          { hanzi: "综艺", pinyin: "zōngyì", meaning: "Show truyền hình", meaningEn: "Variety show", type: "phrase", example: "看综艺节目。", examplePinyin: "Kàn zōngyì jiémù.", exampleVi: "Xem show truyền hình." },
          { hanzi: "字幕", pinyin: "zìmù", meaning: "Phụ đề", meaningEn: "Subtitle", type: "phrase", example: "中文字幕。", examplePinyin: "Zhōngwén zìmù.", exampleVi: "Phụ đề tiếng Trung." },
        ],
        commonStructures: [{ pattern: "Subject + 演技 / 剧情 + 怎么样？", patternPinyin: "Subject + yǎnjì / jùqíng + zěnmeyàng?", explanation: "How is the acting/plot?", explanationVi: "Diễn xuất/cốt truyện thế nào?", examples: [{ zh: "这部剧的剧情怎么样？", pinyin: "Zhè bù jù de jùqíng zěnmeyàng?", vi: "Cốt truyện phim này thế nào?" }] }],
        listeningChallenge: {
          title: "Listening: Concert Plan",
          titleVi: "Nghe: Kế hoạch xem liveshow",
          transcript: "周杰伦下个月在上海开演唱会，门票已经卖完了。我和朋友在二手平台上花了两千块买到了两张票。虽然贵，但是我们都是他的粉丝，觉得很值得。",
          transcriptPinyin: "Zhōu Jiélún xià ge yuè zài Shànghǎi kāi yǎnchànghuì, ménpiào yǐjīng mài wán le.",
          questions: [
            { q: "Who is performing?", qVi: "Ai biểu diễn?", options: ["王力宏", "周杰伦", "邓紫棋", "林俊杰"], answer: 1 },
            { q: "Where?", qVi: "Ở đâu?", options: ["北京", "广州", "上海", "深圳"], answer: 2 },
            { q: "Ticket price?", qVi: "Giá vé?", options: ["1000元", "1500元", "2000元/张", "3000元"], answer: 2 },
          ],
        },
        speakingTopics: ["Recommend a Chinese movie", "Discuss your favorite Chinese singer"],
        fillInBlankExercises: [
          { sentence: "这部电影的___很震撼。", pinyin: "Zhè bù diànyǐng de ___ hěn zhènhàn.", answer: "特效", translationVi: "Hiệu ứng phim này rất ấn tượng.", translationEn: "The special effects in this movie are very impressive." },
          { sentence: "我最喜欢的___是周杰伦。", pinyin: "Wǒ zuì xǐhuān de ___ shì Zhōu Jiélún.", answer: "歌手", translationVi: "Ca sĩ tôi thích nhất là Châu Kiệt Luân.", translationEn: "My favorite singer is Jay Chou." },
          { sentence: "我要去看他的___。", pinyin: "Wǒ yào qù kàn tā de ___.", answer: "演唱会", translationVi: "Tôi đi xem liveshow của anh ấy.", translationEn: "I'm going to his live show." },
          { sentence: "请打开中文___。", pinyin: "Qǐng dǎkāi Zhōngwén ___.", answer: "字幕", translationVi: "Xin bật phụ đề tiếng Trung.", translationEn: "Please turn on Chinese subtitles." },
        ],
        badge: "Âm nhạc, Phim & TV Master",
        badgeVi: "Bậc thầy Âm nhạc, Phim & TV",
      },
      // ──── Lesson 9: Tech & Social Media ────
      {
        id: "cn-sc-09-tech-social",
        title: "Tech & Social Media",
        titleVi: "Công nghệ & Mạng xã hội",
        titleZh: "科技社交",
        icon: "Smartphone",
        description: "Master conversation about công nghệ & mạng xã hội with dialogues, vocabulary, and listening practice.",
        descriptionVi: "Thành thạo hội thoại về công nghệ & mạng xã hội qua hội thoại, từ vựng và bài nghe.",
        hskLevel: 4,
        keySituations: [
          {
            title: "Discussing Apps",
            titleVi: "Bàn về ứng dụng",
            description: "Practice essential dialogues for bàn về ứng dụng.",
            descriptionVi: "Luyện hội thoại thực tế chủ đề bàn về ứng dụng.",
            sampleDialogue: [
              { speaker: "A", line: "你平时用什么社交软件？", pinyin: "Nǐ píngshí yòng shénme shèjiāo ruǎnjiàn?", translationVi: "Bạn dùng app xã hội nào?", translationEn: "Which social media apps do you use?" },
              { speaker: "B", line: "微信、小红书还有抖音。", pinyin: "Wēixìn, Xiǎohóngshū hái yǒu Dǒuyīn.", translationVi: "WeChat, Xiaohongshu và Douyin.", translationEn: "WeChat, Xiaohongshu, and Douyin." },
              { speaker: "A", line: "小红书上能找到很多攻略吧？", pinyin: "Xiǎohóngshū shàng néng zhǎodào hěn duō gōnglüè ba?", translationVi: "Xiaohongshu có nhiều bí kíp đúng không?", translationEn: "Does Xiaohongshu have a lot of tips and tricks?" },
              { speaker: "B", line: "对，旅游、美食、化妆都有。", pinyin: "Duì, lǚyóu, měishí, huàzhuāng dōu yǒu.", translationVi: "Đúng, du lịch, ẩm thực, makeup đều có.", translationEn: "Yes, it has everything from travel and food to makeup." },
            ],
            culturalNote: "China's super-apps: WeChat (微信), Douyin (抖音/TikTok), Xiaohongshu (小红书/RedNote), Weibo (微博). Each has distinct user culture.",
          },
        ],
        vocabulary: [
          { hanzi: "软件", pinyin: "ruǎnjiàn", meaning: "Phần mềm/App", meaningEn: "Software/App", type: "phrase", example: "下载软件。", examplePinyin: "Xiàzài ruǎnjiàn.", exampleVi: "Tải app." },
          { hanzi: "网红", pinyin: "wǎnghóng", meaning: "Hot trên mạng/KOL", meaningEn: "Influencer", type: "phrase", example: "她是网红。", examplePinyin: "Tā shì wǎnghóng.", exampleVi: "Cô ấy là KOL." },
          { hanzi: "直播", pinyin: "zhíbō", meaning: "Livestream", meaningEn: "Livestream", type: "phrase", example: "看直播。", examplePinyin: "Kàn zhíbō.", exampleVi: "Xem livestream." },
          { hanzi: "粉丝", pinyin: "fěnsī", meaning: "Fan/Người theo dõi", meaningEn: "Fan/Follower", type: "phrase", example: "粉丝很多。", examplePinyin: "Fěnsī hěn duō.", exampleVi: "Nhiều fan." },
          { hanzi: "点赞", pinyin: "diǎnzàn", meaning: "Like", meaningEn: "Like", type: "phrase", example: "给我点赞。", examplePinyin: "Gěi wǒ diǎnzàn.", exampleVi: "Like cho tôi." },
          { hanzi: "评论", pinyin: "pínglùn", meaning: "Bình luận", meaningEn: "Comment", type: "phrase", example: "留言评论。", examplePinyin: "Liúyán pínglùn.", exampleVi: "Để lại bình luận." },
          { hanzi: "刷视频", pinyin: "shuā shìpín", meaning: "Lướt video", meaningEn: "Scroll videos", type: "phrase", example: "我喜欢刷视频。", examplePinyin: "Wǒ xǐhuān shuā shìpín.", exampleVi: "Tôi thích lướt video." },
          { hanzi: "人工智能", pinyin: "réngōng zhìnéng", meaning: "AI", meaningEn: "AI", type: "phrase", example: "人工智能技术。", examplePinyin: "Réngōng zhìnéng jìshù.", exampleVi: "Công nghệ AI." },
          { hanzi: "隐私", pinyin: "yǐnsī", meaning: "Quyền riêng tư", meaningEn: "Privacy", type: "phrase", example: "保护隐私。", examplePinyin: "Bǎohù yǐnsī.", exampleVi: "Bảo vệ riêng tư." },
          { hanzi: "信息", pinyin: "xìnxī", meaning: "Thông tin", meaningEn: "Information", type: "phrase", example: "个人信息。", examplePinyin: "Gèrén xìnxī.", exampleVi: "Thông tin cá nhân." },
        ],
        commonStructures: [{ pattern: "你觉得 + Topic + 利大于弊还是弊大于利？", patternPinyin: "Nǐ juéde + Topic + lì dà yú bì háishì bì dà yú lì?", explanation: "Do you think the pros outweigh the cons?", explanationVi: "Bạn nghĩ lợi nhiều hơn hại hay ngược lại?", examples: [{ zh: "你觉得社交媒体利大于弊还是弊大于利？", pinyin: "Nǐ juéde shèjiāo méitǐ lì dà yú bì háishì bì dà yú lì?", vi: "Bạn nghĩ MXH lợi hay hại hơn?" }] }],
        listeningChallenge: {
          title: "Listening: Social Media Habits",
          titleVi: "Nghe: Thói quen MXH",
          transcript: "现在很多年轻人每天花三四个小时刷短视频，这影响了学习和工作效率。专家建议设置使用时间，多做户外运动，保持心理健康。",
          transcriptPinyin: "Xiànzài hěn duō niánqīngrén měitiān huā sān sì ge xiǎoshí shuā duǎn shìpín.",
          questions: [
            { q: "How many hours daily?", qVi: "Bao nhiêu giờ mỗi ngày?", options: ["1-2", "3-4", "5-6", "7-8"], answer: 1 },
            { q: "What is affected?", qVi: "Cái gì bị ảnh hưởng?", options: ["Sức khỏe", "Học tập và công việc", "Quan hệ", "Tài chính"], answer: 1 },
            { q: "Expert advice?", qVi: "Lời khuyên?", options: ["Cấm dùng", "Đặt giới hạn thời gian", "Đổi app", "Mua điện thoại mới"], answer: 1 },
          ],
        },
        speakingTopics: ["Discuss pros and cons of short videos", "Compare Chinese and Western social apps"],
        fillInBlankExercises: [
          { sentence: "她有一百万___。", pinyin: "Tā yǒu yì bǎi wàn ___.", answer: "粉丝", translationVi: "Cô ấy có 1 triệu fan.", translationEn: "She has a million followers." },
          { sentence: "请给我的视频___。", pinyin: "Qǐng gěi wǒ de shìpín ___.", answer: "点赞", translationVi: "Xin like video của tôi.", translationEn: "Please like my video." },
          { sentence: "我每天花两小时___视频。", pinyin: "Wǒ měi tiān huā liǎng xiǎoshí ___ shìpín.", answer: "刷", translationVi: "Tôi mỗi ngày dành 2 tiếng lướt video.", translationEn: "I spend 2 hours every day scrolling through videos." },
          { sentence: "要保护个人___。", pinyin: "Yào bǎohù gèrén ___.", answer: "隐私", translationVi: "Cần bảo vệ quyền riêng tư cá nhân.", translationEn: "Personal privacy needs to be protected." },
        ],
        badge: "Công nghệ & Mạng xã hội Master",
        badgeVi: "Bậc thầy Công nghệ & Mạng xã hội",
      },
      // ──── Lesson 10: Environment & Sustainability ────
      {
        id: "cn-sc-10-environment",
        title: "Environment & Sustainability",
        titleVi: "Môi trường & Bền vững",
        titleZh: "环保",
        icon: "Leaf",
        description: "Master conversation about môi trường & bền vững with dialogues, vocabulary, and listening practice.",
        descriptionVi: "Thành thạo hội thoại về môi trường & bền vững qua hội thoại, từ vựng và bài nghe.",
        hskLevel: 5,
        keySituations: [
          {
            title: "Discussing Pollution",
            titleVi: "Bàn về ô nhiễm",
            description: "Practice essential dialogues for bàn về ô nhiễm.",
            descriptionVi: "Luyện hội thoại thực tế chủ đề bàn về ô nhiễm.",
            sampleDialogue: [
              { speaker: "A", line: "今天的空气质量怎么样？", pinyin: "Jīntiān de kōngqì zhìliàng zěnmeyàng?", translationVi: "Chất lượng không khí hôm nay sao?", translationEn: "How's the air quality today?" },
              { speaker: "B", line: "PM2.5指数有点高，最好戴口罩。", pinyin: "PM2.5 zhǐshù yǒudiǎn gāo, zuì hǎo dài kǒuzhào.", translationVi: "Chỉ số PM2.5 hơi cao, nên đeo khẩu trang.", translationEn: "The PM2.5 index is a bit high, so you should wear a mask." },
              { speaker: "A", line: "政府在推广新能源车，应该会改善吧？", pinyin: "Zhèngfǔ zài tuīguǎng xīn néngyuán chē, yīnggāi huì gǎishàn ba?", translationVi: "Chính phủ thúc đẩy xe năng lượng mới, sẽ cải thiện chứ?", translationEn: "The government is promoting new energy vehicles, will it improve things?" },
              { speaker: "B", line: "希望如此，我们也要从自己做起，垃圾分类很重要。", pinyin: "Xīwàng rúcǐ, wǒmen yě yào cóng zìjǐ zuòqǐ, lājī fēnlèi hěn zhòngyào.", translationVi: "Hy vọng vậy. Chúng ta cũng phải bắt đầu từ mình, phân loại rác rất quan trọng.", translationEn: "I hope so. We also need to start with ourselves; waste sorting is very important." },
            ],
            culturalNote: "China leads global EV (新能源车) adoption. Mandatory waste sorting (垃圾分类) launched in Shanghai 2019, now nationwide.",
          },
        ],
        vocabulary: [
          { hanzi: "环境", pinyin: "huánjìng", meaning: "Môi trường", meaningEn: "Environment", type: "phrase", example: "保护环境。", examplePinyin: "Bǎohù huánjìng.", exampleVi: "Bảo vệ môi trường." },
          { hanzi: "污染", pinyin: "wūrǎn", meaning: "Ô nhiễm", meaningEn: "Pollution", type: "phrase", example: "空气污染。", examplePinyin: "Kōngqì wūrǎn.", exampleVi: "Ô nhiễm không khí." },
          { hanzi: "气候变化", pinyin: "qìhòu biànhuà", meaning: "Biến đổi khí hậu", meaningEn: "Climate change", type: "phrase", example: "应对气候变化。", examplePinyin: "Yìngduì qìhòu biànhuà.", exampleVi: "Ứng phó BĐKH." },
          { hanzi: "可再生能源", pinyin: "kě zàishēng néngyuán", meaning: "Năng lượng tái tạo", meaningEn: "Renewable energy", type: "phrase", example: "发展可再生能源。", examplePinyin: "Fāzhǎn kě zàishēng néngyuán.", exampleVi: "Phát triển NL tái tạo." },
          { hanzi: "垃圾分类", pinyin: "lājī fēnlèi", meaning: "Phân loại rác", meaningEn: "Waste sorting", type: "phrase", example: "实行垃圾分类。", examplePinyin: "Shíxíng lājī fēnlèi.", exampleVi: "Thực hiện phân loại rác." },
          { hanzi: "节能", pinyin: "jiénéng", meaning: "Tiết kiệm năng lượng", meaningEn: "Energy saving", type: "phrase", example: "节能减排。", examplePinyin: "Jiénéng jiǎn pái.", exampleVi: "Tiết kiệm NL, giảm phát thải." },
          { hanzi: "环保", pinyin: "huánbǎo", meaning: "Bảo vệ môi trường", meaningEn: "Eco-friendly", type: "phrase", example: "环保产品。", examplePinyin: "Huánbǎo chǎnpǐn.", exampleVi: "Sản phẩm thân thiện MT." },
          { hanzi: "可持续", pinyin: "kě chíxù", meaning: "Bền vững", meaningEn: "Sustainable", type: "phrase", example: "可持续发展。", examplePinyin: "Kě chíxù fāzhǎn.", exampleVi: "Phát triển bền vững." },
          { hanzi: "碳排放", pinyin: "tàn páifàng", meaning: "Phát thải carbon", meaningEn: "Carbon emission", type: "phrase", example: "减少碳排放。", examplePinyin: "Jiǎnshǎo tàn páifàng.", exampleVi: "Giảm phát thải." },
          { hanzi: "保护", pinyin: "bǎohù", meaning: "Bảo vệ", meaningEn: "Protect", type: "phrase", example: "保护地球。", examplePinyin: "Bǎohù dìqiú.", exampleVi: "Bảo vệ Trái Đất." },
        ],
        commonStructures: [{ pattern: "为了 + Goal，我们应该 + Action", patternPinyin: "Wèile + Goal, wǒmen yīnggāi + Action", explanation: "In order to [goal], we should [action]", explanationVi: "Để [mục tiêu], chúng ta nên [hành động]", examples: [{ zh: "为了保护环境，我们应该少用塑料袋。", pinyin: "Wèile bǎohù huánjìng, wǒmen yīnggāi shǎo yòng sùliào dài.", vi: "Để bảo vệ MT, nên dùng ít túi nilon." }] }],
        listeningChallenge: {
          title: "Listening: Green Lifestyle",
          titleVi: "Nghe: Lối sống xanh",
          transcript: "我们家最近开始践行环保生活：使用太阳能热水器、骑自行车上班、自带购物袋，还学会了垃圾分类。一个月下来，电费省了三分之一。",
          transcriptPinyin: "Wǒmen jiā zuìjìn kāishǐ jiànxíng huánbǎo shēnghuó.",
          questions: [
            { q: "What energy source?", qVi: "Nguồn NL gì?", options: ["风能", "太阳能", "水能", "煤"], answer: 1 },
            { q: "How to commute?", qVi: "Đi làm thế nào?", options: ["开车", "公交", "骑自行车", "步行"], answer: 2 },
            { q: "Electricity savings?", qVi: "Tiết kiệm điện bao nhiêu?", options: ["10%", "1/4", "1/3", "1/2"], answer: 2 },
          ],
        },
        speakingTopics: ["Suggest 3 ways to live more sustainably", "Discuss China's environmental policies"],
        fillInBlankExercises: [
          { sentence: "保护___人人有责。", pinyin: "Bǎohù ___ rén rén yǒu zé.", answer: "环境", translationVi: "Bảo vệ môi trường là trách nhiệm của mọi người.", translationEn: "Environmental protection is everyone's responsibility." },
          { sentence: "要减少碳___。", pinyin: "Yào jiǎnshǎo tàn ___.", answer: "排放", translationVi: "Cần giảm phát thải carbon.", translationEn: "We need to reduce carbon emissions." },
          { sentence: "我们要做___分类。", pinyin: "Wǒmen yào zuò ___ fēnlèi.", answer: "垃圾", translationVi: "Chúng ta phải phân loại rác.", translationEn: "We must sort our trash." },
          { sentence: "发展可___能源。", pinyin: "Fāzhǎn kě ___ néngyuán.", answer: "再生", translationVi: "Phát triển năng lượng tái tạo.", translationEn: "Develop renewable energy." },
        ],
        badge: "Môi trường & Bền vững Master",
        badgeVi: "Bậc thầy Môi trường & Bền vững",
      },
      // ──── Lesson 11: Philosophy & Religion ────
      {
        id: "cn-sc-11-philosophy",
        title: "Philosophy & Religion",
        titleVi: "Triết học & Tôn giáo",
        titleZh: "哲学宗教",
        icon: "BookOpen",
        description: "Master conversation about triết học & tôn giáo with dialogues, vocabulary, and listening practice.",
        descriptionVi: "Thành thạo hội thoại về triết học & tôn giáo qua hội thoại, từ vựng và bài nghe.",
        hskLevel: 5,
        keySituations: [
          {
            title: "Discussing Confucianism",
            titleVi: "Bàn về Nho giáo",
            description: "Practice essential dialogues for bàn về nho giáo.",
            descriptionVi: "Luyện hội thoại thực tế chủ đề bàn về nho giáo.",
            sampleDialogue: [
              { speaker: "A", line: "儒家思想对中国文化影响很深。", pinyin: "Rújiā sīxiǎng duì Zhōngguó wénhuà yǐngxiǎng hěn shēn.", translationVi: "Tư tưởng Nho gia ảnh hưởng sâu đến văn hóa TQ.", translationEn: "Confucian thought profoundly influences Chinese culture." },
              { speaker: "B", line: "对，比如尊老爱幼、注重家庭。", pinyin: "Duì, bǐrú zūn lǎo ài yòu, zhùzhòng jiātíng.", translationVi: "Đúng, ví dụ như kính già yêu trẻ, coi trọng gia đình.", translationEn: "Yes, for example, respecting the elderly and cherishing the young, and valuing family." },
              { speaker: "A", line: "你觉得这些价值观在现代还适用吗？", pinyin: "Nǐ juéde zhèxiē jiàzhíguān zài xiàndài hái shìyòng ma?", translationVi: "Bạn nghĩ giá trị này còn phù hợp với hiện đại không?", translationEn: "Do you think this value is still relevant today?" },
              { speaker: "B", line: "我认为核心精神依然有意义，但需要与时俱进。", pinyin: "Wǒ rènwéi héxīn jīngshén yīrán yǒu yìyì, dàn xūyào yǔ shí jù jìn.", translationVi: "Tôi nghĩ tinh thần cốt lõi vẫn ý nghĩa, nhưng cần theo thời đại.", translationEn: "I think the core spirit is still meaningful, but it needs to adapt to modern times." },
            ],
            culturalNote: "China has 'Three Teachings' (三教): Confucianism (儒), Taoism (道), Buddhism (佛). They coexist and shape Chinese values.",
          },
        ],
        vocabulary: [
          { hanzi: "哲学", pinyin: "zhéxué", meaning: "Triết học", meaningEn: "Philosophy", type: "phrase", example: "学习哲学。", examplePinyin: "Xuéxí zhéxué.", exampleVi: "Học triết học." },
          { hanzi: "宗教", pinyin: "zōngjiào", meaning: "Tôn giáo", meaningEn: "Religion", type: "phrase", example: "宗教信仰。", examplePinyin: "Zōngjiào xìnyǎng.", exampleVi: "Tín ngưỡng tôn giáo." },
          { hanzi: "儒家", pinyin: "Rújiā", meaning: "Nho gia", meaningEn: "Confucianism", type: "phrase", example: "儒家思想。", examplePinyin: "Rújiā sīxiǎng.", exampleVi: "Tư tưởng Nho gia." },
          { hanzi: "道家", pinyin: "Dàojiā", meaning: "Đạo gia", meaningEn: "Taoism", type: "phrase", example: "道家哲学。", examplePinyin: "Dàojiā zhéxué.", exampleVi: "Triết học Đạo gia." },
          { hanzi: "佛教", pinyin: "Fójiào", meaning: "Phật giáo", meaningEn: "Buddhism", type: "phrase", example: "信仰佛教。", examplePinyin: "Xìnyǎng Fójiào.", exampleVi: "Tin Phật giáo." },
          { hanzi: "信仰", pinyin: "xìnyǎng", meaning: "Niềm tin", meaningEn: "Belief", type: "phrase", example: "宗教信仰自由。", examplePinyin: "Zōngjiào xìnyǎng zìyóu.", exampleVi: "Tự do tín ngưỡng." },
          { hanzi: "价值观", pinyin: "jiàzhíguān", meaning: "Giá trị quan", meaningEn: "Values", type: "phrase", example: "传统价值观。", examplePinyin: "Chuántǒng jiàzhíguān.", exampleVi: "Giá trị truyền thống." },
          { hanzi: "道德", pinyin: "dàodé", meaning: "Đạo đức", meaningEn: "Morality", type: "phrase", example: "道德标准。", examplePinyin: "Dàodé biāozhǔn.", exampleVi: "Tiêu chuẩn đạo đức." },
          { hanzi: "智慧", pinyin: "zhìhuì", meaning: "Trí tuệ", meaningEn: "Wisdom", type: "phrase", example: "古人的智慧。", examplePinyin: "Gǔrén de zhìhuì.", exampleVi: "Trí tuệ người xưa." },
          { hanzi: "和谐", pinyin: "héxié", meaning: "Hài hòa", meaningEn: "Harmony", type: "phrase", example: "天人和谐。", examplePinyin: "Tiān rén héxié.", exampleVi: "Thiên nhân hài hòa." },
        ],
        commonStructures: [{ pattern: "我认为 + Statement + ，因为 + Reason", patternPinyin: "Wǒ rènwéi + Statement + , yīnwèi + Reason", explanation: "I believe... because...", explanationVi: "Tôi cho rằng... bởi vì...", examples: [{ zh: "我认为家庭很重要，因为它是我们的根。", pinyin: "Wǒ rènwéi jiātíng hěn zhòngyào, yīnwèi tā shì wǒmen de gēn.", vi: "Tôi nghĩ gia đình quan trọng vì là gốc rễ của ta." }] }],
        listeningChallenge: {
          title: "Listening: Ancient Wisdom Today",
          titleVi: "Nghe: Trí tuệ cổ trong thời nay",
          transcript: "孔子说\"己所不欲，勿施于人\"，这句话告诉我们要尊重他人。在现代社会，这种思想仍然非常有价值，能帮助我们建立和谐的人际关系。",
          transcriptPinyin: "Kǒngzǐ shuō 'Jǐ suǒ bú yù, wù shī yú rén'.",
          questions: [
            { q: "Whose quote?", qVi: "Câu của ai?", options: ["老子", "孟子", "孔子", "庄子"], answer: 2 },
            { q: "Core meaning?", qVi: "Ý chính?", options: ["Yêu mọi người", "Đừng làm điều mình không muốn cho người khác", "Tôn trọng người lớn", "Chăm chỉ học"], answer: 1 },
            { q: "Modern benefit?", qVi: "Lợi ích hiện đại?", options: ["Kiếm tiền", "Quan hệ hài hòa", "Học tốt hơn", "Sống lâu"], answer: 1 },
          ],
        },
        speakingTopics: ["Compare Confucian and Western values", "Discuss role of religion in modern China"],
        fillInBlankExercises: [
          { sentence: "___思想强调家庭。", pinyin: "___ sīxiǎng qiángdiào jiātíng.", answer: "儒家", translationVi: "Tư tưởng Nho gia nhấn mạnh gia đình.", translationEn: "Confucian thought emphasizes family." },
          { sentence: "我没有宗教___。", pinyin: "Wǒ méiyǒu zōngjiào ___.", answer: "信仰", translationVi: "Tôi không có tín ngưỡng tôn giáo.", translationEn: "I don't have religious beliefs." },
          { sentence: "这是古人的___。", pinyin: "Zhè shì gǔrén de ___.", answer: "智慧", translationVi: "Đây là trí tuệ của người xưa.", translationEn: "This is the wisdom of the ancients." },
          { sentence: "社会需要___。", pinyin: "Shèhuì xūyào ___.", answer: "和谐", translationVi: "Xã hội cần sự hài hòa.", translationEn: "Society needs harmony." },
        ],
        badge: "Triết học & Tôn giáo Master",
        badgeVi: "Bậc thầy Triết học & Tôn giáo",
      },
      // ──── Lesson 12: Debating & Argumentation ────
      {
        id: "cn-sc-12-debate",
        title: "Debating & Argumentation",
        titleVi: "Tranh luận & Lập luận",
        titleZh: "辩论",
        icon: "MessageSquare",
        description: "Master conversation about tranh luận & lập luận with dialogues, vocabulary, and listening practice.",
        descriptionVi: "Thành thạo hội thoại về tranh luận & lập luận qua hội thoại, từ vựng và bài nghe.",
        hskLevel: 6,
        keySituations: [
          {
            title: "Formal Debate",
            titleVi: "Tranh luận chính thức",
            description: "Practice essential dialogues for tranh luận chính thức.",
            descriptionVi: "Luyện hội thoại thực tế chủ đề tranh luận chính thức.",
            sampleDialogue: [
              { speaker: "正方", line: "我方认为人工智能将取代大部分工作。", pinyin: "Wǒ fāng rènwéi réngōng zhìnéng jiāng qǔdài dà bùfèn gōngzuò.", translationVi: "Bên tôi cho rằng AI sẽ thay thế phần lớn công việc.", translationEn: "My side believes that AI will replace most jobs." },
              { speaker: "反方", line: "我方持不同意见。AI虽然强大，但缺乏创造力和情感。", pinyin: "Wǒ fāng chí bùtóng yìjiàn. AI suīrán qiángdà, dàn quēfá chuàngzàolì hé qínggǎn.", translationVi: "Bên tôi không đồng ý. AI mạnh nhưng thiếu sáng tạo và cảm xúc.", translationEn: "My side disagrees. AI is powerful but lacks creativity and emotion." },
              { speaker: "正方", line: "请问对方有什么具体证据？", pinyin: "Qǐngwèn duìfāng yǒu shénme jùtǐ zhèngjù?", translationVi: "Xin hỏi bên đối phương có bằng chứng cụ thể nào?", translationEn: "May I ask if the opposing side has any specific evidence?" },
              { speaker: "反方", line: "根据最新研究，70%的创意工作仍需要人类。", pinyin: "Gēnjù zuìxīn yánjiū, bǎi fēn zhī qīshí de chuàngyì gōngzuò réng xūyào rénlèi.", translationVi: "Theo nghiên cứu mới, 70% công việc sáng tạo vẫn cần con người.", translationEn: "According to new research, 70% of creative jobs still require humans." },
            ],
            culturalNote: "Chinese university debate competitions (辩论赛) are highly competitive. Logic, evidence (证据), and rhetoric (修辞) are key.",
          },
        ],
        vocabulary: [
          { hanzi: "辩论", pinyin: "biànlùn", meaning: "Tranh luận", meaningEn: "Debate", type: "phrase", example: "参加辩论。", examplePinyin: "Cānjiā biànlùn.", exampleVi: "Tham gia tranh luận." },
          { hanzi: "观点", pinyin: "guāndiǎn", meaning: "Quan điểm", meaningEn: "Viewpoint", type: "phrase", example: "我的观点。", examplePinyin: "Wǒ de guāndiǎn.", exampleVi: "Quan điểm của tôi." },
          { hanzi: "证据", pinyin: "zhèngjù", meaning: "Bằng chứng", meaningEn: "Evidence", type: "phrase", example: "提供证据。", examplePinyin: "Tígōng zhèngjù.", exampleVi: "Cung cấp bằng chứng." },
          { hanzi: "反驳", pinyin: "fǎnbó", meaning: "Phản bác", meaningEn: "Refute", type: "phrase", example: "反驳对方。", examplePinyin: "Fǎnbó duìfāng.", exampleVi: "Phản bác đối phương." },
          { hanzi: "支持", pinyin: "zhīchí", meaning: "Ủng hộ", meaningEn: "Support", type: "phrase", example: "支持这个观点。", examplePinyin: "Zhīchí zhège guāndiǎn.", exampleVi: "Ủng hộ quan điểm này." },
          { hanzi: "反对", pinyin: "fǎnduì", meaning: "Phản đối", meaningEn: "Oppose", type: "phrase", example: "我反对。", examplePinyin: "Wǒ fǎnduì.", exampleVi: "Tôi phản đối." },
          { hanzi: "逻辑", pinyin: "luójí", meaning: "Logic", meaningEn: "Logic", type: "phrase", example: "逻辑清晰。", examplePinyin: "Luójí qīngxī.", exampleVi: "Logic rõ ràng." },
          { hanzi: "结论", pinyin: "jiélùn", meaning: "Kết luận", meaningEn: "Conclusion", type: "phrase", example: "得出结论。", examplePinyin: "Déchū jiélùn.", exampleVi: "Đưa ra kết luận." },
          { hanzi: "假设", pinyin: "jiǎshè", meaning: "Giả thiết", meaningEn: "Hypothesis", type: "phrase", example: "假设成立。", examplePinyin: "Jiǎshè chénglì.", exampleVi: "Giả thiết đúng." },
          { hanzi: "立场", pinyin: "lìchǎng", meaning: "Lập trường", meaningEn: "Stance", type: "phrase", example: "坚定立场。", examplePinyin: "Jiāndìng lìchǎng.", exampleVi: "Lập trường vững." },
        ],
        commonStructures: [{ pattern: "首先...其次...最后...", patternPinyin: "Shǒuxiān... Qícì... Zuìhòu...", explanation: "Firstly... Secondly... Finally...", explanationVi: "Trước hết... Thứ hai... Cuối cùng...", examples: [{ zh: "首先成本低，其次效率高，最后环保。", pinyin: "Shǒuxiān chéngběn dī, qícì xiàolǜ gāo, zuìhòu huánbǎo.", vi: "Trước là chi phí thấp, sau là hiệu quả cao, cuối là thân thiện MT." }] }],
        listeningChallenge: {
          title: "Listening: Debate Excerpt",
          titleVi: "Nghe: Đoạn tranh luận",
          transcript: "辩题是\"网络教育能否取代传统教育\"。正方认为网络教育灵活、便宜、资源丰富。反方反驳说，传统教育的师生互动和校园氛围是无可替代的。",
          transcriptPinyin: "Biàn tí shì 'Wǎngluò jiàoyù néng fǒu qǔdài chuántǒng jiàoyù'.",
          questions: [
            { q: "Debate topic?", qVi: "Chủ đề?", options: ["AI và việc làm", "GD online vs truyền thống", "Phim TQ", "Du lịch"], answer: 1 },
            { q: "Pro side argument?", qVi: "Lý lẽ phe ủng hộ?", options: ["Đắt", "Linh hoạt, rẻ, nhiều tài nguyên", "Khó", "Cô đơn"], answer: 1 },
            { q: "Con side point?", qVi: "Phe phản đối nhấn mạnh?", options: ["Chi phí", "Tương tác thầy trò và môi trường trường học", "Công nghệ", "Bằng cấp"], answer: 1 },
          ],
        },
        speakingTopics: ["Debate: Should social media have age limits?", "Argue for or against remote work"],
        fillInBlankExercises: [
          { sentence: "请提供你的___。", pinyin: "Qǐng tígōng nǐ de ___.", answer: "证据", translationVi: "Xin cung cấp bằng chứng của bạn.", translationEn: "Please provide your evidence." },
          { sentence: "我___对方的观点。", pinyin: "Wǒ ___ duìfāng de guāndiǎn.", answer: "反对", translationVi: "Tôi phản đối quan điểm đối phương.", translationEn: "I object to the opposing side's view." },
          { sentence: "他的___很清晰。", pinyin: "Tā de ___ hěn qīngxī.", answer: "逻辑", translationVi: "Logic của anh ấy rất rõ ràng.", translationEn: "His logic is very clear." },
          { sentence: "我坚定我的___。", pinyin: "Wǒ jiāndìng wǒ de ___.", answer: "立场", translationVi: "Tôi giữ vững lập trường của mình.", translationEn: "I stand firm on my position." },
        ],
        badge: "Tranh luận & Lập luận Master",
        badgeVi: "Bậc thầy Tranh luận & Lập luận",
      },
      // ──── Lesson 13: Storytelling & Narration ────
      {
        id: "cn-sc-13-storytelling",
        title: "Storytelling & Narration",
        titleVi: "Kể chuyện & Tường thuật",
        titleZh: "讲故事",
        icon: "BookText",
        description: "Master conversation about kể chuyện & tường thuật with dialogues, vocabulary, and listening practice.",
        descriptionVi: "Thành thạo hội thoại về kể chuyện & tường thuật qua hội thoại, từ vựng và bài nghe.",
        hskLevel: 6,
        keySituations: [
          {
            title: "Narrating a Memorable Trip",
            titleVi: "Kể về chuyến đi đáng nhớ",
            description: "Practice essential dialogues for kể về chuyến đi đáng nhớ.",
            descriptionVi: "Luyện hội thoại thực tế chủ đề kể về chuyến đi đáng nhớ.",
            sampleDialogue: [
              { speaker: "A", line: "给我讲讲你最难忘的一次经历吧。", pinyin: "Gěi wǒ jiǎng jiǎng nǐ zuì nánwàng de yí cì jīnglì ba.", translationVi: "Kể tôi nghe trải nghiệm đáng nhớ nhất của bạn đi.", translationEn: "Tell me about your most memorable experience." },
              { speaker: "B", line: "那是去年夏天，我独自去西藏旅行。一开始，因为高原反应差点放弃。", pinyin: "Nà shì qùnián xiàtiān, wǒ dúzì qù Xīzàng lǚxíng. Yī kāishǐ, yīnwèi gāoyuán fǎnyìng chà diǎn fàngqì.", translationVi: "Đó là mùa hè năm ngoái, tôi một mình đi Tây Tạng. Lúc đầu suýt bỏ cuộc vì sốc độ cao.", translationEn: "It was last summer, I traveled to Tibet alone. At first, I almost gave up due to altitude sickness." },
              { speaker: "A", line: "后来呢？怎么坚持下来的？", pinyin: "Hòulái ne? Zěnme jiānchí xiàlái de?", translationVi: "Sau đó thì sao? Làm sao kiên trì được?", translationEn: "What happened after that? How did you persevere?" },
              { speaker: "B", line: "幸亏遇到一位藏族大叔，他给了我酥油茶和鼓励。最终我登上了珠峰大本营，那一刻我哭了。", pinyin: "Xìngkuī yùdào yí wèi Zàngzú dàshū, tā gěi le wǒ sūyóu chá hé gǔlì. Zuìzhōng wǒ dēng shàng le Zhūfēng dà běn yíng, nà yí kè wǒ kū le.", translationVi: "May gặp chú người Tạng, chú cho trà bơ và động viên. Cuối cùng tôi lên được trại căn cứ Everest, khoảnh khắc đó tôi khóc.", translationEn: "Luckily, I met a Tibetan uncle who gave me butter tea and encouraged me. I eventually reached Everest Base Camp, and I cried at that moment." },
            ],
            culturalNote: "Chinese storytelling values structure: 起承转合 (setup, development, twist, conclusion). Personal anecdotes often include emotional reflection.",
          },
        ],
        vocabulary: [
          { hanzi: "故事", pinyin: "gùshì", meaning: "Câu chuyện", meaningEn: "Story", type: "phrase", example: "讲个故事。", examplePinyin: "Jiǎng ge gùshì.", exampleVi: "Kể câu chuyện." },
          { hanzi: "经历", pinyin: "jīnglì", meaning: "Trải nghiệm", meaningEn: "Experience", type: "phrase", example: "难忘的经历。", examplePinyin: "Nánwàng de jīnglì.", exampleVi: "Trải nghiệm đáng nhớ." },
          { hanzi: "回忆", pinyin: "huíyì", meaning: "Hồi ức", meaningEn: "Memory", type: "phrase", example: "美好的回忆。", examplePinyin: "Měihǎo de huíyì.", exampleVi: "Ký ức đẹp." },
          { hanzi: "情节", pinyin: "qíngjié", meaning: "Tình tiết", meaningEn: "Plot detail", type: "phrase", example: "情节曲折。", examplePinyin: "Qíngjié qūzhé.", exampleVi: "Tình tiết khúc khuỷu." },
          { hanzi: "主人公", pinyin: "zhǔréngōng", meaning: "Nhân vật chính", meaningEn: "Protagonist", type: "phrase", example: "故事的主人公。", examplePinyin: "Gùshì de zhǔréngōng.", exampleVi: "Nhân vật chính." },
          { hanzi: "结局", pinyin: "jiéjú", meaning: "Kết cục", meaningEn: "Ending", type: "phrase", example: "圆满结局。", examplePinyin: "Yuánmǎn jiéjú.", exampleVi: "Kết thúc viên mãn." },
          { hanzi: "感动", pinyin: "gǎndòng", meaning: "Cảm động", meaningEn: "Moved", type: "phrase", example: "我很感动。", examplePinyin: "Wǒ hěn gǎndòng.", exampleVi: "Tôi rất cảm động." },
          { hanzi: "意外", pinyin: "yìwài", meaning: "Bất ngờ", meaningEn: "Unexpected", type: "phrase", example: "意外的事。", examplePinyin: "Yìwài de shì.", exampleVi: "Việc bất ngờ." },
          { hanzi: "坚持", pinyin: "jiānchí", meaning: "Kiên trì", meaningEn: "Persist", type: "phrase", example: "坚持到底。", examplePinyin: "Jiānchí dàodǐ.", exampleVi: "Kiên trì đến cùng." },
          { hanzi: "感悟", pinyin: "gǎnwù", meaning: "Cảm ngộ", meaningEn: "Insight", type: "phrase", example: "深刻的感悟。", examplePinyin: "Shēnkè de gǎnwù.", exampleVi: "Cảm ngộ sâu sắc." },
        ],
        commonStructures: [{ pattern: "那时候 + Setting + ，突然 + Twist", patternPinyin: "Nà shíhòu + Setting + , tūrán + Twist", explanation: "At that time... suddenly...", explanationVi: "Lúc đó... thì đột nhiên...", examples: [{ zh: "那时候我正在散步，突然下起了大雨。", pinyin: "Nà shíhòu wǒ zhèngzài sànbù, tūrán xià qǐ le dà yǔ.", vi: "Lúc đó tôi đang đi dạo thì đột nhiên mưa to." }] }],
        listeningChallenge: {
          title: "Listening: A Childhood Memory",
          titleVi: "Nghe: Ký ức tuổi thơ",
          transcript: "记得小时候，奶奶常带我去河边钓鱼。有一次，我钓到一条很大的鱼，激动得跳了起来，结果鱼跑了。奶奶笑着说：\"耐心比力气更重要。\"这句话我一直记到今天。",
          transcriptPinyin: "Jìde xiǎoshíhòu, nǎinai cháng dài wǒ qù hé biān diàoyú.",
          questions: [
            { q: "Who took the speaker fishing?", qVi: "Ai dẫn đi câu cá?", options: ["爸爸", "妈妈", "奶奶", "爷爷"], answer: 2 },
            { q: "What happened to the big fish?", qVi: "Con cá lớn ra sao?", options: ["Bắt được", "Chạy mất", "Cho người khác", "Nấu ăn"], answer: 1 },
            { q: "Lesson learned?", qVi: "Bài học?", options: ["Sức mạnh quan trọng", "Kiên nhẫn quan trọng hơn sức mạnh", "Câu cá vui", "Nên bỏ cuộc"], answer: 1 },
          ],
        },
        speakingTopics: ["Tell the story of your most memorable trip", "Narrate a moment that changed your perspective"],
        fillInBlankExercises: [
          { sentence: "给我讲一个___。", pinyin: "Gěi wǒ jiǎng yí ge ___.", answer: "故事", translationVi: "Kể tôi nghe một câu chuyện.", translationEn: "Tell me a story." },
          { sentence: "那是一段难忘的___。", pinyin: "Nà shì yí duàn nánwàng de ___.", answer: "经历", translationVi: "Đó là một trải nghiệm đáng nhớ.", translationEn: "That was a memorable experience." },
          { sentence: "故事的___很感人。", pinyin: "Gùshì de ___ hěn gǎnrén.", answer: "结局", translationVi: "Kết thúc câu chuyện rất cảm động.", translationEn: "The end of the story is very touching." },
          { sentence: "我从中得到了深刻的___。", pinyin: "Wǒ cóng zhōng dédào le shēnkè de ___.", answer: "感悟", translationVi: "Tôi rút ra được cảm ngộ sâu sắc.", translationEn: "I gained a profound understanding." },
        ],
        badge: "Kể chuyện & Tường thuật Master",
        badgeVi: "Bậc thầy Kể chuyện & Tường thuật",
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

// Merge expansion lessons (English-only for international learners)
import { dailyLifeExpansion, businessExpansion, socialExpansion } from "./chineseConvExpansionLessons";
import { hsk1Expansion, hsk2Expansion } from "./chineseHskExpansion";

const _dailyPillar = chineseConversationalPillars.find(p => p.id === "daily-life");
if (_dailyPillar) _dailyPillar.lessons.push(...dailyLifeExpansion, ...hsk1Expansion, ...hsk2Expansion);

const _businessPillar = chineseConversationalPillars.find(p => p.id === "business");
if (_businessPillar) _businessPillar.lessons.push(...businessExpansion);

const _socialPillar = chineseConversationalPillars.find(p => p.id === "social");
if (_socialPillar) _socialPillar.lessons.push(...socialExpansion);

export const allChineseConvLessons: ChineseConvLesson[] =
  chineseConversationalPillars.flatMap(p => p.lessons);
