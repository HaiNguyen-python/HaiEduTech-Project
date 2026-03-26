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
  sampleDialogue: { speaker: string; line: string; pinyin: string }[];
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
    description: "Practical Chinese for everyday situations — greetings, food, shopping, transport",
    descriptionVi: "Tiếng Trung thực tế cho các tình huống hàng ngày — chào hỏi, ăn uống, mua sắm, di chuyển",
    lessons: [
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
              { speaker: "A", line: "你好！我叫王明。你叫什么名字？", pinyin: "Nǐ hǎo! Wǒ jiào Wáng Míng. Nǐ jiào shénme míngzi?" },
              { speaker: "B", line: "你好！我叫李华。很高兴认识你！", pinyin: "Nǐ hǎo! Wǒ jiào Lǐ Huá. Hěn gāoxìng rènshi nǐ!" },
              { speaker: "A", line: "你是哪里人？", pinyin: "Nǐ shì nǎlǐ rén?" },
              { speaker: "B", line: "我是越南人。我在这里工作。", pinyin: "Wǒ shì Yuènán rén. Wǒ zài zhèlǐ gōngzuò." },
              { speaker: "A", line: "太好了！我们交换一下微信吧。", pinyin: "Tài hǎo le! Wǒmen jiāohuàn yíxià Wēixìn ba." },
            ],
          },
          {
            title: "Greeting a Colleague",
            titleVi: "Chào đồng nghiệp",
            description: "Daily greetings at work or school",
            descriptionVi: "Chào hỏi hàng ngày tại công ty hoặc trường học",
            sampleDialogue: [
              { speaker: "A", line: "早上好！今天天气不错。", pinyin: "Zǎoshang hǎo! Jīntiān tiānqì búcuò." },
              { speaker: "B", line: "是啊！你吃早饭了吗？", pinyin: "Shì a! Nǐ chī zǎofàn le ma?" },
              { speaker: "A", line: "吃了。你呢？", pinyin: "Chī le. Nǐ ne?" },
              { speaker: "B", line: "我还没吃。一会儿去食堂吃。", pinyin: "Wǒ hái méi chī. Yīhuìr qù shítáng chī." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào", meaningEn: "Hello", type: "phrase", example: "你好，很高兴认识你！", examplePinyin: "Nǐ hǎo, hěn gāoxìng rènshi nǐ!", exampleVi: "Xin chào, rất vui được gặp bạn!" },
          { hanzi: "请问", pinyin: "qǐng wèn", meaning: "Xin hỏi", meaningEn: "Excuse me / May I ask", type: "expression", example: "请问，你叫什么名字？", examplePinyin: "Qǐng wèn, nǐ jiào shénme míngzi?", exampleVi: "Xin hỏi, bạn tên gì?" },
          { hanzi: "认识", pinyin: "rènshi", meaning: "Quen biết", meaningEn: "To know / meet", type: "phrase", example: "很高兴认识你。", examplePinyin: "Hěn gāoxìng rènshi nǐ.", exampleVi: "Rất vui được quen bạn." },
          { hanzi: "交换", pinyin: "jiāohuàn", meaning: "Trao đổi", meaningEn: "To exchange", type: "phrase", example: "我们交换微信号吧。", examplePinyin: "Wǒmen jiāohuàn Wēixìn hào ba.", exampleVi: "Chúng ta trao đổi số WeChat nhé." },
          { hanzi: "哪里人", pinyin: "nǎlǐ rén", meaning: "Người ở đâu", meaningEn: "Where are you from", type: "expression", example: "你是哪里人？", examplePinyin: "Nǐ shì nǎlǐ rén?", exampleVi: "Bạn là người ở đâu?" },
          { hanzi: "名片", pinyin: "míngpiàn", meaning: "Danh thiếp", meaningEn: "Business card", type: "phrase", example: "这是我的名片。", examplePinyin: "Zhè shì wǒ de míngpiàn.", exampleVi: "Đây là danh thiếp của tôi." },
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
          "Exchange contact information",
        ],
      },
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
              { speaker: "服务员", line: "欢迎光临！请问几位？", pinyin: "Huānyíng guānglín! Qǐng wèn jǐ wèi?" },
              { speaker: "You", line: "两位。请给我们一个菜单。", pinyin: "Liǎng wèi. Qǐng gěi wǒmen yí ge càidān." },
              { speaker: "服务员", line: "好的，请稍等。", pinyin: "Hǎo de, qǐng shāo děng." },
              { speaker: "You", line: "我想要一个宫保鸡丁和一碗米饭。", pinyin: "Wǒ xiǎng yào yí ge gōngbǎo jīdīng hé yī wǎn mǐfàn." },
              { speaker: "服务员", line: "好的。要不要来点饮料？", pinyin: "Hǎo de. Yào bu yào lái diǎn yǐnliào?" },
              { speaker: "You", line: "来一瓶啤酒吧。谢谢！", pinyin: "Lái yī píng píjiǔ ba. Xièxie!" },
            ],
          },
          {
            title: "Expressing Food Preferences",
            titleVi: "Bày tỏ sở thích ăn uống",
            description: "Tell others what you like and don't like to eat",
            descriptionVi: "Nói cho người khác biết bạn thích và không thích ăn gì",
            sampleDialogue: [
              { speaker: "A", line: "你喜欢吃什么？", pinyin: "Nǐ xǐhuan chī shénme?" },
              { speaker: "B", line: "我喜欢吃火锅，但是我不能吃太辣的。", pinyin: "Wǒ xǐhuan chī huǒguō, dànshì wǒ bù néng chī tài là de." },
              { speaker: "A", line: "那我们去吃鸳鸯锅吧，一半辣一半不辣。", pinyin: "Nà wǒmen qù chī yuānyāng guō ba, yī bàn là yī bàn bú là." },
              { speaker: "B", line: "好主意！我请客。", pinyin: "Hǎo zhǔyi! Wǒ qǐngkè." },
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
        ],
      },
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
              { speaker: "You", line: "老板，这个多少钱？", pinyin: "Lǎobǎn, zhège duōshao qián?" },
              { speaker: "老板", line: "这个一百块。", pinyin: "Zhège yī bǎi kuài." },
              { speaker: "You", line: "太贵了！能不能便宜一点？", pinyin: "Tài guì le! Néng bu néng piányi yīdiǎn?" },
              { speaker: "老板", line: "最低八十块。", pinyin: "Zuìdī bāshí kuài." },
              { speaker: "You", line: "五十块行不行？", pinyin: "Wǔshí kuài xíng bu xíng?" },
              { speaker: "老板", line: "六十块吧，最低了。", pinyin: "Liùshí kuài ba, zuìdī le." },
              { speaker: "You", line: "好，成交！", pinyin: "Hǎo, chéngjiāo!" },
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
        ],
      },
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
            culturalNote: "In China, use DiDi (滴滴 Dīdī) app instead of hailing taxis. If you take a regular taxi, make sure they use the meter (打表 dǎ biǎo). Mobile payments (WeChat Pay, Alipay) are ubiquitous.",
            culturalNoteVi: "Ở Trung Quốc, dùng app DiDi (滴滴) thay vì vẫy taxi. Nếu đi taxi thường, nhớ yêu cầu bật đồng hồ (打表). Thanh toán di động rất phổ biến.",
            sampleDialogue: [
              { speaker: "You", line: "师傅，去天安门，请打表。", pinyin: "Shīfu, qù Tiān'ānmén, qǐng dǎ biǎo." },
              { speaker: "司机", line: "好的，大概二十分钟到。", pinyin: "Hǎo de, dàgài èrshí fēnzhōng dào." },
              { speaker: "You", line: "好的，谢谢。可以微信付款吗？", pinyin: "Hǎo de, xièxie. Kěyǐ Wēixìn fùkuǎn ma?" },
              { speaker: "司机", line: "可以，扫码就行。", pinyin: "Kěyǐ, sǎo mǎ jiù xíng." },
            ],
          },
          {
            title: "Asking for Directions",
            titleVi: "Hỏi đường",
            description: "Ask and understand directions in Chinese",
            descriptionVi: "Hỏi và hiểu chỉ dẫn đường bằng tiếng Trung",
            sampleDialogue: [
              { speaker: "You", line: "请问，地铁站在哪里？", pinyin: "Qǐng wèn, dìtiě zhàn zài nǎlǐ?" },
              { speaker: "路人", line: "一直往前走，到路口左转就到了。", pinyin: "Yīzhí wǎng qián zǒu, dào lùkǒu zuǒ zhuǎn jiù dào le." },
              { speaker: "You", line: "大概走多长时间？", pinyin: "Dàgài zǒu duō cháng shíjiān?" },
              { speaker: "路人", line: "五分钟左右。", pinyin: "Wǔ fēnzhōng zuǒyòu." },
            ],
          },
        ],
        vocabulary: [
          { hanzi: "地铁", pinyin: "dìtiě", meaning: "Tàu điện ngầm", meaningEn: "Subway / Metro", type: "phrase", example: "我坐地铁去上班。", examplePinyin: "Wǒ zuò dìtiě qù shàngbān.", exampleVi: "Tôi đi tàu điện ngầm đi làm." },
          { hanzi: "出租车", pinyin: "chūzū chē", meaning: "Taxi", meaningEn: "Taxi", type: "phrase", example: "我们打个出租车吧。", examplePinyin: "Wǒmen dǎ ge chūzū chē ba.", exampleVi: "Chúng ta bắt taxi đi." },
          { hanzi: "左转", pinyin: "zuǒ zhuǎn", meaning: "Rẽ trái", meaningEn: "Turn left", type: "phrase", example: "到路口左转。", examplePinyin: "Dào lùkǒu zuǒ zhuǎn.", exampleVi: "Đến ngã tư rẽ trái." },
          { hanzi: "右转", pinyin: "yòu zhuǎn", meaning: "Rẽ phải", meaningEn: "Turn right", type: "phrase", example: "前面右转就是。", examplePinyin: "Qiánmiàn yòu zhuǎn jiù shì.", exampleVi: "Phía trước rẽ phải là tới." },
          { hanzi: "一直走", pinyin: "yīzhí zǒu", meaning: "Đi thẳng", meaningEn: "Go straight", type: "expression", example: "一直走，不要转弯。", examplePinyin: "Yīzhí zǒu, bú yào zhuǎn wān.", exampleVi: "Đi thẳng, không rẽ." },
          { hanzi: "到了", pinyin: "dào le", meaning: "Đã đến", meaningEn: "Arrived", type: "expression", example: "我们到了！", examplePinyin: "Wǒmen dào le!", exampleVi: "Chúng ta đến rồi!" },
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
            culturalNoteVi: "Trong văn hóa kinh doanh Trung Quốc, xây dựng mối quan hệ (关系) quan trọng hơn thương vụ. Nói chuyện phiếm trước cuộc họp là bình thường. Đừng bao giờ từ chối trà — thể hiện sự tin tưởng.",
            sampleDialogue: [
              { speaker: "主持", line: "各位，会议现在开始。今天我们讨论第三季度的销售报告。", pinyin: "Gè wèi, huìyì xiànzài kāishǐ. Jīntiān wǒmen tǎolùn dì sān jìdù de xiāoshòu bàogào." },
              { speaker: "You", line: "好的。我先汇报一下我们部门的情况。", pinyin: "Hǎo de. Wǒ xiān huìbào yíxià wǒmen bùmén de qíngkuàng." },
              { speaker: "经理", line: "好，请说。", pinyin: "Hǎo, qǐng shuō." },
              { speaker: "You", line: "第三季度我们的销售额增长了百分之十五。", pinyin: "Dì sān jìdù wǒmen de xiāoshòu é zēngzhǎng le bǎi fēn zhī shíwǔ." },
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
          "Schedule and confirm a meeting",
        ],
      },
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
            culturalNoteVi: "'面子' (thể diện) rất quan trọng trong đàm phán. Không bao giờ phản đối gay gắt trước mặt mọi người. Dùng ngôn ngữ gián tiếp thay vì nói 'Không' trực tiếp.",
            sampleDialogue: [
              { speaker: "You", line: "关于价格，我们觉得可以再商量一下。", pinyin: "Guānyú jiàgé, wǒmen juéde kěyǐ zài shāngliáng yíxià." },
              { speaker: "对方", line: "我们的价格已经很优惠了。", pinyin: "Wǒmen de jiàgé yǐjīng hěn yōuhuì le." },
              { speaker: "You", line: "如果订单量大的话，能不能再给我们一个折扣？", pinyin: "Rúguǒ dìngdān liàng dà de huà, néng bu néng zài gěi wǒmen yí ge zhékòu?" },
              { speaker: "对方", line: "如果订单超过一千件，我可以给你打九折。", pinyin: "Rúguǒ dìngdān chāoguò yī qiān jiàn, wǒ kěyǐ gěi nǐ dǎ jiǔ zhé." },
              { speaker: "You", line: "好的，我们回去考虑一下，明天给你答复。", pinyin: "Hǎo de, wǒmen huíqù kǎolǜ yíxià, míngtiān gěi nǐ dáfù." },
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
        ],
      },
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
              { speaker: "You", line: "不好意思，打扰一下。你能帮我看看这份报告吗？", pinyin: "Bù hǎo yìsi, dǎrǎo yíxià. Nǐ néng bāng wǒ kànkan zhè fèn bàogào ma?" },
              { speaker: "同事", line: "没问题，什么时候要？", pinyin: "Méi wèntí, shénme shíhou yào?" },
              { speaker: "You", line: "下午五点之前可以吗？", pinyin: "Xiàwǔ wǔ diǎn zhīqián kěyǐ ma?" },
              { speaker: "同事", line: "可以，我一会儿就看。", pinyin: "Kěyǐ, wǒ yīhuìr jiù kàn." },
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
              { speaker: "A", line: "你平时有什么爱好？", pinyin: "Nǐ píngshí yǒu shénme àihào?" },
              { speaker: "B", line: "我喜欢打篮球和看电影。你呢？", pinyin: "Wǒ xǐhuan dǎ lánqiú hé kàn diànyǐng. Nǐ ne?" },
              { speaker: "A", line: "我喜欢弹吉他，周末还会去爬山。", pinyin: "Wǒ xǐhuan tán jítā, zhōumò hái huì qù pá shān." },
              { speaker: "B", line: "太酷了！下次一起去爬山吧！", pinyin: "Tài kù le! Xià cì yīqǐ qù pá shān ba!" },
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
        ],
      },
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
              { speaker: "A", line: "你觉得学中文难不难？", pinyin: "Nǐ juéde xué Zhōngwén nán bu nán?" },
              { speaker: "B", line: "我觉得发音比较难，但是语法其实没那么复杂。", pinyin: "Wǒ juéde fāyīn bǐjiào nán, dànshì yǔfǎ qíshí méi nàme fùzá." },
              { speaker: "A", line: "我不太同意。我觉得汉字最难。", pinyin: "Wǒ bú tài tóngyì. Wǒ juéde Hànzì zuì nán." },
              { speaker: "B", line: "你说的也有道理。每个人的感觉不一样。", pinyin: "Nǐ shuō de yě yǒu dàolǐ. Měi ge rén de gǎnjué bù yīyàng." },
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
        ],
      },
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
              { speaker: "A", line: "今天的考试怎么样？", pinyin: "Jīntiān de kǎoshì zěnmeyàng?" },
              { speaker: "B", line: "OMG，太难了！我觉得我要凉凉了。😭", pinyin: "OMG, tài nán le! Wǒ juéde wǒ yào liáng liáng le." },
              { speaker: "A", line: "别担心啦，你太卷了，肯定没问题的。", pinyin: "Bié dānxīn la, nǐ tài juǎn le, kěndìng méi wèntí de." },
              { speaker: "B", line: "哈哈，希望吧。今晚一起吃鸡？", pinyin: "Hāhā, xīwàng ba. Jīn wǎn yīqǐ chī jī?" },
              { speaker: "A", line: "冲！88～", pinyin: "Chōng! Bā bā~" },
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
